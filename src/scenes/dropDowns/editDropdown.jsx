import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  get_dropdown_byid,
  update_dropdown,
  update_field,
} from "../../config/services/api_calls";
const EditDropdown = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const param = useParams();
  const dropdownid = param.id;
  const [dropdown, setDropdowns] = useState({});
  const [dropdownName, setdropdownName] = useState(dropdown.name);
  const [dropdowncopy, setDropdownscopy] = useState({});

  //  functions
  const striper = (array, indx) => {
    const x = Object.keys(array);
    return x[indx];
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

    console.log("wwwww", dropdowncopy, dropdownName);
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
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < dropdowncopy.fields.length; i++) {
      delete dropdowncopy.fields[i].__v;
      delete dropdowncopy.fields[i].createdAt;
      delete dropdowncopy.fields[i].updatedAt;
      dropdowncopy.fields[i] = {
        ...dropdowncopy.fields[i],
        ["_id"]: dropdownid,
      };
    }

    console.log(dropdowncopy.fields);
    update_field(dropdowncopy.fields).then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
      } else {
        console.log(res.error);
      }
    });

    update_dropdown(dropdownName, dropdownid).then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
      } else {
        console.log(res.error);
      }
    });
  };

  return (
    <Box m="20px">
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
                label={drop?.field_name}
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
              <Button color="error" variant="outlined">
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

      {/* <Formik
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="left"
              gap="30px"
              mt="50px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Dropdown name
              </Typography>
              <TextField
                width="50%"
                variant="filled"
                type="text"
                label="Dropdown Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dropdown?.name}
                name="dropdown_name"
                error={!!touched.check && !!errors.check}
                helperText={touched.check && errors.check}
              />
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Fields
              </Typography>
              {dropdown.fields?.map((drop) => (
                <Box
                  key={drop?._id}
                  display="grid"
                  gridTemplateColumns="1fr 1fr"
                  gap="30px"
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={drop?.field_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.field_name}
                    name={drop?.field_name}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label={drop?.field_name_am}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.field_name_am}
                    name={drop?.field_name_am}
                  />
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
          </Form>
        )}
      </Formik> */}
    </Box>
  );
};

export default EditDropdown;
