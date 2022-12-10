import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { login_with_otp } from "../../config/services/api_calls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const SignIn = (props) => {
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    props.isloading(10);
    login_with_otp(values.phone).then((res) => {
      if (res.success && res.data) {
        navigate(`otp/${res.data.data.user_id}`);
      } else {
        console.log(res.error);
      }
    });
    props.isloading(100);
  };

  const checkoutSchema = yup.object().shape({
    phone: yup.string().required("required"),
  });
  const initialValues = {
    phone: "",
  };

  return (
    <Box m="20vh">
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          alt="profile-user"
          width="200px"
          height="200px"
          src={"../../assets/logo.png"}
          style={{
            cursor: "pointer",
            borderRadius: "50%",
            objectFit: "contain",
          }}
        />
      </Box>
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
                type="text"
                label="Phone"
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

export default SignIn;
