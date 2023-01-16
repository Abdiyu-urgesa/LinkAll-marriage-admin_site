import { Box, Button, TextField, FormControl, MenuItem, InputLabel, Select } from "@mui/material";

import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import SimpleSnackbar from "../global/snackbar";
import { fetchQuizeById, updateQuize } from "../../config/services/quizeService";


const UpdateQuize = () => {
  const param = useParams();
  const id = param.id;

  const navigate = useNavigate();
  const [initialValues, setIntialValues] = useState({});
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });


  useEffect(() => {
    fetchQuizeById(id).then((res) => {
      if (res.success && res.data) {
        console.log(res.data)
        setIntialValues({
          question: res.data.question, question_am: res.data.question_am,
          quize_type: res.data.quize_type
        });
      } else {
        console.log(res.error);
      }
    });
  }, [id]);

  const handleFormSubmit = (values) => {
    updateQuize(id, values).then(
      (res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          navigate("/quizes");
        } else {
          setsnak({
            severity: "error",
            message: res.error,
            open: true,
          });
        }
      }
    );
  };

  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };

  const checkoutSchema = yup.object().shape({
    // credit: yup.string().required("required"),
  });

  console.log(initialValues);

  return (
    <Box
      m="10vh auto"
      width="800px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="Update Quize Questions Here" subtitle="" />
      <Formik
        enableReinitialize={true}
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box
              width="800px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="30px"
              margin="auto"
            >
              <label htmlFor="question">Question In English</label>
              <TextField
                multiline={true}
                minRow={3}
                fullWidth
                variant="filled"
                type="text"
                label="Question in English"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.question}
                name="question"
                error={!!touched.question && !!errors.question}
                helperText={touched.question && errors.question}
              />
              <TextField
                multiline={true}
                minRow={3}
                fullWidth
                variant="filled"
                type="text"
                label="Question in Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.question_am}
                name="question_am"
                error={!!touched.question_am && !!errors.question_am}
                helperText={touched.question_am && errors.question_am}
              />
              <FormControl fullWidth>
                <InputLabel id="quize_type">Quize Type</InputLabel>
                <Select
                  fullWidth
                  labelId="quize_type"
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quize_type}
                  name="quize_type"
                >
                  <MenuItem value="basic_quize">Basic Quize</MenuItem>
                  <MenuItem value="advanced_quize">Advanced Quize</MenuItem>
                  <MenuItem value="special_quize">Special Quize</MenuItem>
                </Select>
              </FormControl>
              <Box m="10px"
                gap="40px"
                display="flex"
                justifyContent="center"
                alignItems="center">


                <Button type="button" onClick={() => navigate("/quizes")} m="10px" sx={{ width: "30%", height: "40px" }} color="error" variant="contained">
                  Cancel
                </Button>
                <Button type="submit" sx={{ width: "30%", height: "40px" }} color="secondary" variant="contained">
                  submit
                </Button>
              </Box>


            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateQuize;
