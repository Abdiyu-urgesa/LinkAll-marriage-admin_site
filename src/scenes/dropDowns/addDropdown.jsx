import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { create_dropdown } from "../../config/services/api_calls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SimpleSnackbar from "../global/snackbar";
import Header from "../../components/Header";
const AddDropdown = (props) => {
  const navigate = useNavigate();
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });
  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };
  const handleFormSubmit = (values) => {
    props.isloading(10);
    create_dropdown(values.dropdown_name).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        navigate("/dropdowns");
      } else {
        setsnak({
          severity: "error",
          message: res.error,
          open: true,
        });
        console.log(res.error);
      }
    });
    props.isloading(10);
  };

  const checkoutSchema = yup.object().shape({
    dropdown_name: yup.string().required("required"),
  });
  const initialValues = {
    dropdown_name: "",
  };

  return (
    <Box
      m="20vh auto"
      width="500px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="Add Dropdown" subtitle="Add Dropdown to a dropdown List" />
      <Formik
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box
              width="500px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="30px"
              margin="auto"
            >
              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="DropDown Name "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dropdown_name}
                name="dropdown_name"
                error={!!touched.dropdown_name && !!errors.dropdown_name}
                helperText={touched.dropdown_name && errors.dropdown_name}
              />

              <Button type="submit" color="secondary" variant="contained">
                submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddDropdown;
