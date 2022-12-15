import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { create_tag } from "../../../config/services/api_calls";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/Header";
const CreatTag = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    create_tag(values.tag_name).then((res) => {
      if (res.success && res.data) {
        alert(res.data.message);
        navigate("/tags");
      } else {
        console.log(res.error);
      }
    });
  };

  const checkoutSchema = yup.object().shape({
    tag_name: yup.string().required("required"),
  });
  const initialValues = {
    tag_name: "",
  };

  return (
    <Box
      m="20vh auto"
      width="500px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Header title="Create Tag" subtitle="Create Post Tag" />
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
                label="Tag Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tag_name}
                name="tag_name"
                error={!!touched.tag_name && !!errors.tag_name}
                helperText={touched.tag_name && errors.tag_name}
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

export default CreatTag;
