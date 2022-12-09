import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { verify_account } from "../../config/services/api_calls";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../config/store/auth-context";
const OtpLogin = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const userid = useParams();

  const handleFormSubmit = (values) => {
    const otp = values.otp;
    verify_account(otp, userid.id).then((res) => {
      if (res.success && res.data) {
        authCtx.login(
          res.data.data.accessToken,
          res.data.data.user_typ,
          res.data.data.code_name
        );
        navigate("/dashboard");
      } else {
        console.log(res.error);
      }
    });
  };

  const checkoutSchema = yup.object().shape({
    otp: yup.string().required("required"),
  });
  const initialValues = {
    otp: "",
  };

  return (
    <Box m="20vh">
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          alt="logo"
          width="200px"
          height="200px"
          src={`../../assets/logo.png`}
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
                label="Otp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="otp"
                error={!!touched.otp && !!errors.otp}
                helperText={touched.otp && errors.otp}
              />

              <Button type="submit" color="secondary" variant="contained">
                Sign in
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OtpLogin;
