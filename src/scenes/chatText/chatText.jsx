/* eslint-disable no-restricted-globals */
import { Box, Button, TextField, Modal, Typography, useTheme } from "@mui/material";

import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import SimpleSnackbar from "../global/snackbar";
import { tokens } from "../../theme";
import { addChatTextToList, deleteChatText, fetchChatTextListByID, updateChatText } from "../../config/services/chatTextService";


const ChatTextDetail = (props) => {
  const param = useParams();
  const id = param.id;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const [chatTextInitialValues, setChatTextInitialValues] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // Initialize Intial Values
  useEffect(() => {
    fetchChatTextListByID(id).then((res) => {
      console.log(res.data)
      if (res.success && res.data) {
        setChatTextInitialValues(res.data.text);
      } else {
        console.log(res.error);
      }
    });
  }, [id]);

  // Handle form submit for creating new answer to questions
  const handleFormSubmit = (values) => {
    addChatTextToList(id, values).then(
      (res) => {
        if (res.success && res.data) {
          console.log(res.data);
          setsnak({ severity: "success", message: res.data.message, open: true });
          handleModalClose();
          setChatTextInitialValues(chatTextInitialValues => chatTextInitialValues.concat(res.data));
          // Alternative way of appending to list
          // setAnswerInitialValues(answerInitialValues => [...answerInitialValues, res.data]);
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

  // Deleting Chat Text Questions & Answers
  const deleteAnswerHandler = (id) => {
    props.isloading(10);
    if(confirm("Are you sure you want to delete this Ask & Reply Text ?") === true){
    deleteChatText(id).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setChatTextInitialValues(
          chatTextInitialValues.filter((value) => {
            return value._id !== id;
          })
        )
      } else {
        setsnak({
          severity: "error",
          message: res.error,
          open: true,
        });
        console.log(res.error);
      }
    });}
    props.isloading(100);
  };


  // Updating Multiple Possible chat Texts
  const updateChatTexts = (event) => {
    event.preventDefault();
    props.isloading(10);
    updateChatText(chatTextInitialValues).then((res) => {
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


  // handle on textfields update
  const onchangeHandler = (event) => {
    var index = chatTextInitialValues.findIndex(
      (item) => item._id === event.target.id
    );

    if (index === -1) {
      setsnak({
        severity: "error",
        message: "Nothing To Update",
        open: true,
      });
    } else {
      var newArr = [...chatTextInitialValues];
      newArr[index] = {
        ...chatTextInitialValues[index],
        [event.target.name]: event.target.value,
      };
      setChatTextInitialValues(newArr);
    }
  };


  // Handle Snack bart close
  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };


  const newInitialValues = { question: "", question_am: "", answer: "", answer_am: "" };

  const answerFieldsValidationSchema = yup.object().shape({
    question: yup.string().required("Question is required"),
    question_am: yup.string().required("Question in Amharic required"),
    answer: yup.string().required("Answer is required"),
    answer_am: yup.string().required("Answer in Amharic required")
  });

  // creates dynamic name for looped possible answers
  const striper = (array, indx) => {
    const x = Object.keys(array);
    return x[indx];
  };


  return (
    <Box m="20px">
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

        <Header title="Chat Text Question and Replies" subtitle="" />
        <Button
          onClick={handleModalOpen}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            position: "absolute",
            right: "20px",
          }}
        >Add New</Button>
      </Box>

      <form action="" onSubmit={updateChatTexts}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="5px"
          m="50px 0">
          {
            chatTextInitialValues.map((initialValues, key) => {
              return (

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '32ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField label="Question" variant="filled"
                    value={initialValues.question}
                    id={initialValues?._id}
                    onChange={onchangeHandler}
                    name={striper(initialValues, 1)} />

                  <TextField label="Question Amharic" variant="filled"
                    value={initialValues.question_am}
                    id={initialValues?._id}
                    onChange={onchangeHandler}
                    name={striper(initialValues, 2)} />

                  <TextField label="Answer/Reply" variant="filled"
                    value={initialValues.answer}
                    id={initialValues?._id}
                    onChange={onchangeHandler}
                    name={striper(initialValues, 3)} />

                  <TextField label="Answer/Reply Amharic" variant="filled"
                    value={initialValues.answer_am}
                    id={initialValues?._id}
                    onChange={onchangeHandler}
                    name={striper(initialValues, 4)} />

                  <Button color="error" sx={{ height: "50px" }} variant="outlined"
                    onClick={() => deleteAnswerHandler(initialValues?._id)}
                  >
                    Delete
                  </Button>
                </Box>
              )
            })
          }

          <Box m="10px"
            gap="40px"
            display="flex"
            justifyContent="center"
            alignItems="center">


            <Button type="button" onClick={() => navigate("/chat-text-list")} m="10px" sx={{ width: "30%", height: "40px" }} color="error" variant="contained">
              Cancel
            </Button>
            <Button type="submit" m="10px" sx={{ width: "30%", height: "40px" }} color="secondary" variant="contained">
              Update Chat Question & Reply
            </Button>
          </Box>

        </Box>


      </form>

      <Modal
        keepMounted
        open={open}
        onClose={handleModalClose}
        aria-labelledby="Create Chat Text Question & Answer"
        aria-describedby="Create Chat Text Question & Answer"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: colors.blueAccent[900],
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            Create Chat Text Question & Answer
          </Typography>

          <Formik
            onSubmit={(values) => {
              handleFormSubmit(values);
            }}
            initialValues={newInitialValues}
            validationSchema={answerFieldsValidationSchema}
          >
            {

              ({ values, errors, touched, handleBlur, handleChange, }) => (
                <Form>
                  <Box component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <TextField
                      label="Question"
                      fullWidth
                      variant="filled"
                      type="text"
                      name="question"
                      value={values.question}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.question && !!errors.question}
                      helperText={touched.question && errors.question}
                    />
                  </Box>

                  <Box component="div"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <TextField
                      label="Question in Amharic"
                      fullWidth
                      variant="filled"
                      type="text"
                      name="question_am"
                      value={values.question_am}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.question_am && !!errors.question_am}
                      helperText={touched.question_am && errors.question_am}
                    />
                  </Box>
                  <Box component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <TextField
                      label="Answer/Reply "
                      fullWidth
                      variant="filled"
                      type="text"
                      name="answer"
                      value={values.answer}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.answer && !!errors.answer}
                      helperText={touched.answer && errors.answer}
                    />
                  </Box>

                  <Box component="div"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <TextField
                      label="Answer/Reply in Amharic"
                      fullWidth
                      variant="filled"
                      type="text"
                      name="answer_am"
                      value={values.answer_am}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.answer_am && !!errors.answer_am}
                      helperText={touched.answer_am && errors.answer_am}
                    />
                  </Box>
                  <Box component="div"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <Button type="button" color="warning" onClick={handleModalClose} variant="contained">
                      Cancel
                    </Button>
                    <Button type="submit" color="secondary" variant="contained">
                      Submit
                    </Button>
                  </Box>

                </Form>
              )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChatTextDetail;
