import { Box, Button, TextField } from "@mui/material";

import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import SimpleSnackbar from "../global/snackbar";
import { fetchChatTextListByID, updateChattextList } from "../../config/services/chatTextService";


const UpdateChatTextList = () => {
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
    fetchChatTextListByID(id).then((res) => {
      if (res.success && res.data) {
        console.log(res.data)
        setIntialValues({
          text_type: res.data.text_type, 
          text_type_am: res.data.text_type_am,
          answer_type: res.data.answer_type,
          answer_type_am:res.data.answer_type_am
        });
      } else {
        console.log(res.error);
      }
    });
  }, [id]);

  const handleFormSubmit = (values) => {
    updateChattextList(id, values).then(
      (res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          navigate("/chat-text-list");
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
    text_type: yup.string().required("Question Category is Required"),
    text_type_am: yup.string().required("Question Category in Amharic is required"),
    answer_type: yup.string().required("Answer/Reply Category is Required"),
    answer_type_am: yup.string().required("Answer/Reply Category in Amharic is Required"),
  });


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
      <Header title="Update Ask/Reply ChatText List in Here" subtitle="" />
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

export default UpdateChatTextList;
