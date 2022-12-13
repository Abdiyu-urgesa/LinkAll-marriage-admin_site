import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { create_admin } from "../../config/services/api_calls";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
const CreateAdminUser = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    create_admin(values.code_name, values.phone, values.age, "ADMIN").then(
      (res) => {
        if (res.success && res.data) {
          alert(res.data.message);
          navigate("/businessusers");
        } else {
          console.log(res.error);
        }
      }
    );
  };

  const checkoutSchema = yup.object().shape({
    code_name: yup.string().required("required"),
    phone: yup.string().required("required"),
    age: yup.number().required("required"),
  });
  const initialValues = {
    code_name: "",
    phone: "",
    age: "",
  };

  return (
    <Box
      m="20vh auto"
      width="500px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Header title="Add Admin" subtitle="Add Admin User To Users List" />
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
                label="Code Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code_name}
                name="code_name"
                error={!!touched.code_name && !!errors.code_name}
                helperText={touched.code_name && errors.code_name}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
              />
              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
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

export default CreateAdminUser;
