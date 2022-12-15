import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { create_catagory } from "../../config/services/api_calls";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
const CreatPost = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    // create_catagory(values.category, values.category_am).then((res) => {
    //   if (res.success && res.data) {
    //     alert(res.data.message);
    //     navigate("/catagories");
    //   } else {
    //     console.log(res.error);
    //   }
    // });

    console.log(values);
  };

  const checkoutSchema = yup.object().shape({
    photo: yup.string().required("required"),
    category_am: yup.string().required("required"),
  });
  const initialValues = {
    category: "",
    category_am: "",
  };

  return (
    <Box
      m="20vh auto"
      width="500px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Header title="Create Post" subtitle="Create Post Here" />
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
                type="file"
                label="Catagory Name English"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.photo}
                name="photo"
                error={!!touched.photo && !!errors.photo}
                helperText={touched.photo && errors.photo}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Catagory Name Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category_am}
                name="category_am"
                error={!!touched.category_am && !!errors.category_am}
                helperText={touched.category_am && errors.category_am}
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

export default CreatPost;
