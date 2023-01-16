import {
  Box,
  Button,
  TextField, FormControl, MenuItem, InputLabel, Select
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";
import SimpleSnackbar from "../global/snackbar";
import { createQuize } from "../../config/services/quizeService";

const CreateQuizes = (props) => {
  const navigate = useNavigate();
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };


  const handleFormSubmit = (values) => {
    props.isloading(10);
    createQuize(values).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        navigate("/quizes");
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

  const checkoutSchema = yup.object().shape({
    question: yup.string().required("required"),
    question_am: yup.string().required("required"),
    quize_type: yup.string().required("required"),
  });

  const initialValues = {
    question: "",
    question_am: "",
    quize_type: ""
  };

  return (
    <Box m="20px" >
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Box m="10px"
      
      display="flex"
      justifyContent="space-between"
      alignItems="center">
      <Header title="Create Quize Questions" subtitle="Create Quizes with Questions and possible answers." />
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
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="50px"
          m="50px 0">
              <TextField
                multiline={true}
                minRow={5}
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
                minRow={5}
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

export default CreateQuizes;
