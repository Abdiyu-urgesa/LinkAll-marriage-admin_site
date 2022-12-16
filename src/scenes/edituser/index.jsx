import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
} from "@mui/material";
import SimpleSnackbar from "../global/snackbar";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_user_byid, update_user } from "../../config/services/api_calls";
const EditUser = (props) => {
  const param = useParams();
  const userid = param.id;
  const [userData, setUserData] = useState({});
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });
  const initialValues = {
    role: "",
    age: "",
    code_name: "",
    phone: "",
  };
  const checkoutSchema = yup.object().shape({
    age: yup.string().required("required"),
    code_name: yup.string().required("required"),
    phone: yup.string().required("required"),
    role: yup.string().required("required"),
  });
  //  functions

  useEffect(() => {
    get_user_byid(userid).then((res) => {
      if (res.success && res.data) {
        setUserData({ ...userData, ...res.data });
      } else {
        console.log(res.error);
      }
    });
  }, []);
  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };

  const handleFormSubmit = (values) => {
    props.isloading(10);
    update_user(values, userid).then((res) => {
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
  };

  return (
    <Box m="20px">
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="EDIT USER" subtitle="Edit and Update a User Profile" />

      <Formik
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
              margin="10% 0%"
              width="100%"
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap="30px"
            >
              <FormControl fullWidth>
                <InputLabel id="role">Role Of User</InputLabel>
                <Select
                  fullWidth
                  labelId="role"
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                >
                  <MenuItem value="ADMIN">ADMIN ACCOUNT</MenuItem>
                  <MenuItem value="USER">USER ACCOUNT</MenuItem>
                  <MenuItem value="BUSSINES_ACCOUNT">BUSINESS ACCOUNT</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="string"
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
                type="string"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
            </Box>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{
                display: "block",
                width: "50%",
                margin: "30px auto",
              }}
            >
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditUser;
