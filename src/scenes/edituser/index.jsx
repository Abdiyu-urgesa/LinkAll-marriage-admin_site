import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { Form, Formik } from "formik";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_user_byid, update_user } from "../../config/services/api_calls";
const EditUser = () => {
  const param = useParams();
  const userid = param.id;
  const [userData, setUserData] = useState({});
  const initialValues = {
    role: "",
  };
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

  const handleFormSubmit = (values) => {
    update_user(values.role, userid).then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
      } else {
        console.log(res.error);
      }
    });
  };

  return (
    <Box m="20px">
      <Header title="EDIT USER" subtitle="Edit and Update a User Profile" />

      <Formik
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
      >
        {({ values, handleBlur, handleChange }) => (
          <Form>
            <Box
              width="300px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="30px"
              margin="10% auto"
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
              <Button color="error" variant="contained">
                Deactivate User
              </Button>
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

export default EditUser;
