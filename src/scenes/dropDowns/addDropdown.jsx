import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { create_dropdown } from "../../config/services/api_calls";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
const AddDropdown = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    create_dropdown(values.dropdown_name).then((res) => {
      if (res.success && res.data) {
        navigate("/dropdowns");
      } else {
        console.log(res.error);
      }
    });
  };

  const checkoutSchema = yup.object().shape({
    dropdown_name: yup.string().required("required"),
  });
  const initialValues = {
    dropdown_name: "",
  };

  return (
    <Box m="20vh">
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
              width="300px"
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
