import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  get_dropdown_byid,
  update_user,
} from "../../config/services/api_calls";
const EditDropdown = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const param = useParams();
  const dropdownid = param.id;
  const [dropdown, setDropdowns] = useState({});
  const [dropdowncopy, setDropdownscopy] = useState({});

  //  functions
  const striper = (array, indx) => {
    const x = Object.keys(array);
    return x[indx];
  };
  const onchangeHandler = (e) => {
    // setDropdowns({
    //   ...dropdown,
    //   fields: { ...dropdown.fields, [e.target.name]: e.target.value },
    // });
    // console.log("my form data", dropdown);

    var index = dropdown.fields.findIndex((item) => item._id === e.target.id);
    console.log(index);
    if (index === -1) {
      console.log("no found");
    } else {
      setDropdownscopy(
        (dropdowncopy.fields[index] = { [e.target.name]: e.target.value })
      );
    }
    console.log("wwwww", dropdowncopy);
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

  const handleFormSubmit = (values) => {
    console.log("submitted data", values);

    // update_user(values.role, dropdownid).then((res) => {
    //   if (res.success && res.data) {
    //     console.log(res.data);
    //   } else {
    //     console.log(res.error);
    //   }
    // });
  };
  console.log(dropdown);
  return (
    <Box m="20px">
      <Header title="EDIT Dropdown" subtitle="Edit and Update Dropdowns" />

      <form>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="left"
          gap="30px"
          mt="50px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Dropdown name
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            type="string"
            name={dropdown?.name}
            onChange={onchangeHandler}
          />
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Fields
          </Typography>
          {dropdown?.fields?.map((drop) => (
            <Box
              key={drop?._id}
              display="grid"
              gridTemplateColumns="1fr 1fr"
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
