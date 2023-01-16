import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SimpleSnackbar from "../global/snackbar";
import {
  get_dropdown_byid,
  update_dropdown,
  update_field,
  delete_field,
} from "../../config/services/dropdownServices";
const EditDropdown = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const param = useParams();
  const dropdownid = param.id;
  const navigate = useNavigate();
  const [dropdown, setDropdowns] = useState({});
  const [dropdownName, setdropdownName] = useState(dropdown.name);
  const [dropdowncopy, setDropdownscopy] = useState({});
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });
  //  functions
  const striper = (array, indx) => {
    const x = Object.keys(array);
    return x[indx];
  };

  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };

  const onchangeHandler = (e) => {
    var index = dropdowncopy.fields.findIndex(
      (item) => item._id === e.target.id
    );
    console.log(index);
    if (index === -1) {
      alert("noting to update");
    } else {
      dropdowncopy.fields[index] = {
        ...dropdowncopy.fields[index],
        [e.target.name]: e.target.value,
      };
    }
  };

  useEffect(() => {
    get_dropdown_byid(dropdownid).then((res) => {
      if (res.success && res.data) {
        setDropdowns({ ...dropdown, ...res.data });
        setDropdownscopy({ ...dropdown, ...res.data });
      } else {
        console.log(res.error);
      }
    });
  }, [dropdown, dropdownid]);

  const handleFormSubmit = (event) => {
    props.isloading(10);
    event.preventDefault();
    for (let i = 0; i < dropdowncopy.fields.length; i++) {
      delete dropdowncopy.fields[i].__v;
      delete dropdowncopy.fields[i].createdAt;
      delete dropdowncopy.fields[i].updatedAt;
      dropdowncopy.fields[i] = {
        ...dropdowncopy.fields[i],
        "_id": dropdownid,
      };
    }
    update_field(dropdowncopy.fields).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        console.log(res.data);
      } else {
        setsnak({
          severity: "error",
          message: res.error,
          open: true,
        });
        console.log(res.error);
      }
    });
    props.isloading(70);
    update_dropdown(dropdownName, dropdownid).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        console.log(res.data);
      } else {
        setsnak({
          severity: "error",
          message: res.error,
          open: true,
        });
        console.log(res.error);
      }
    });
    props.isloading(100);
  };

  const deleteFieldHandler = (field_id) => {
    props.isloading(10);
    delete_field(field_id).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
      } else {
        setsnak({
          severity: "error",
          message: res.error,
          open: true,
        });
        console.log(res.error);
      }
    });
    props.isloading(100);
    navigate(0);
  };

  return (
    <Box m="20px">
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="EDIT Dropdown" subtitle="Edit and Update Dropdowns" />

      <form onSubmit={handleFormSubmit}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="left"
          gap="30px"
          m="50px 0"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Dropdown name
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            type="string"
            label={dropdown.name}
            name={dropdown?.name}
            onChange={(event) => setdropdownName(event.target.value)}
          />
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Fields
          </Typography>
          {dropdown?.fields?.map((drop) => (
            <Box
              key={drop?._id}
              display="grid"
              gridTemplateColumns="1fr 1fr 0.4fr"
              gap="30px"
            >
              <TextField
                fullWidth
                variant="filled"
                type="string"
                id={drop?._id}
                // label={drop?.field_name}
                placeholder={drop?.field_name}
                onChange={onchangeHandler}
                name={striper(drop, 1)}
              />
              <TextField
                fullWidth
                id={drop?._id}
                variant="filled"
                type="string"
                label={drop?.field_name_am}
                onChange={onchangeHandler}
                name={striper(drop, 2)}
              />
              <Button
                color="error"
                variant="outlined"
                onClick={() => deleteFieldHandler(drop?._id)}
              >
                Delete Field
              </Button>
            </Box>
          ))}

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              width: "50%",
              margin: "auto",
            }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditDropdown;
