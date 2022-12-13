import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { add_dropdown_field } from "../../config/services/api_calls";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
const AddField = () => {
  const navigate = useNavigate();
  const param = useParams();
  const dropdownid = param.id;
  const handleFormSubmit = (values) => {
    add_dropdown_field(
      values.field_name,
      values.field_name_am,
      dropdownid
    ).then((res) => {
      if (res.success && res.data) {
        navigate("/dropdowns");
      } else {
        console.log(res.error);
      }
    });
  };

  const checkoutSchema = yup.object().shape({
    field_name: yup.string().required("required"),
    field_name_am: yup.string().required("required"),
  });
  const initialValues = {
    field_name: "",
    field_name_am: "",
  };

  return (
    <Box
      m="20vh auto"
      width="500px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Header title="Add field" subtitle="Add fields to a dropdown" />
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
                label="Field Name English"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.field_name}
                name="field_name"
                error={!!touched.field_name && !!errors.field_name}
                helperText={touched.field_name && errors.field_name}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Field Name Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.field_name_am}
                name="field_name_am"
                error={!!touched.field_name_am && !!errors.field_name_am}
                helperText={touched.field_name_am && errors.field_name_am}
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

export default AddField;
