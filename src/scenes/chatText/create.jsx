import {
  Box,
  Button,
  TextField
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";
import SimpleSnackbar from "../global/snackbar";
import { createChatTextList } from "../../config/services/chatTextService";

const CreateChatTextList = (props) => {
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
    createChatTextList(values).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        navigate("/chat-text-list");
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
    text_type: yup.string().required("Question Category is Required"),
    text_type_am: yup.string().required("Question Category in Amharic is required"),
    answer_type: yup.string().required("Answer/Reply Category is Required"),
    answer_type_am: yup.string().required("Answer/Reply Category in Amharic is Required"),
  });

  const initialValues = {
    text_type: "",
    text_type_am: "",
    answer_type: "",
    answer_type_am:""
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
      <Header title="Create Ask & Reply Chat Text " subtitle="Create Ask and Reply Chat Texts here." />
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
                label="Question Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text_type}
                name="text_type"
                error={!!touched.text_type && !!errors.text_type}
                helperText={touched.text_type && errors.text_type}
              />
              <TextField
                multiline={true}
                minRow={5}
                fullWidth
                variant="filled"
                type="text"
                label="Question Type in Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text_type_am}
                name="text_type_am"
                error={!!touched.text_type_am && !!errors.text_type_am}
                helperText={touched.text_type_am && errors.text_type_am}
              />

              <TextField
                multiline={true}
                minRow={5}
                fullWidth
                variant="filled"
                type="text"
                label="Reply Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.answer_type}
                name="answer_type"
                error={!!touched.answer_type && !!errors.answer_type}
                helperText={touched.answer_type && errors.answer_type}
              />
              <TextField
                multiline={true}
                minRow={5}
                fullWidth
                variant="filled"
                type="text"
                label="Reply Type in Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.answer_type_am}
                name="answer_type_am"
                error={!!touched.answer_type_am && !!errors.answer_type_am}
                helperText={touched.answer_type_am && errors.answer_type_am}
              />
               
              <Box m="10px"
                gap="40px"
                display="flex"
                justifyContent="center"
                alignItems="center">


                <Button type="button" onClick={() => navigate("/chat-text-list")} m="10px" sx={{ width: "30%", height: "40px" }} color="error" variant="contained">
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

export default CreateChatTextList;
