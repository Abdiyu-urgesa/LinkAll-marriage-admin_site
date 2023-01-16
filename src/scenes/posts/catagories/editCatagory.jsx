import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { update_catagory } from "../../../config/services/postServices";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
const EditCatagory = () => {
  const navigate = useNavigate();
  const param = useParams();
  const catagoryid = param.id;
  const handleFormSubmit = (values) => {
    update_catagory(values.category, values.category_am, catagoryid).then(
      (res) => {
        if (res.success && res.data) {
          alert(res.data.message);
          navigate("/catagories");
        } else {
          console.log(res.error);
        }
      }
    );
  };

  const checkoutSchema = yup.object().shape({
    category: yup.string().required("required"),
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
      <Header title="Edit Catagory" subtitle="Edit Post Catagory" />
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
                label="Catagory Name English"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
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

export default EditCatagory;
