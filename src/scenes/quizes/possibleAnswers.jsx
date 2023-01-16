import { Box, Button, TextField, Modal, Typography, useTheme } from "@mui/material";

import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import SimpleSnackbar from "../global/snackbar";
import { addPossibleAnswers, deletePossibleAnswer, fetchQuizeById } from "../../config/services/quizeService";
import { tokens } from "../../theme";


const PossibleQuizeAnswers = (props) => {
  const param = useParams();
  const id = param.id;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const [answerInitialValues, setAnswerInitialValues] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // Initialize Intial Values
  useEffect(() => {
    fetchQuizeById(id).then((res) => {
      if (res.success && res.data) {
        setAnswerInitialValues(res.data.possibleAnswers);
      } else {
        console.log(res.error);
      }
    });
  }, [id]);

  // Handle form submit for creating new answer to questions
  const handleFormSubmit = (values) => {

    addPossibleAnswers(id, values).then(
      (res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          handleModalClose();
          setAnswerInitialValues(answerInitialValues => answerInitialValues.concat(res.data.newAnswer));
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

  // Deleting Possible quize Answers
  const deleteAnswerHandler = (id) => {
    props.isloading(10);
    deletePossibleAnswer(id).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setAnswerInitialValues(
          answerInitialValues.filter((value) => {
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
    });
    props.isloading(100);
  };


  // Updating Multiple Possible quize Answers
  const updatePossibleAnswers = (event) => {
    event.preventDefault();
    props.isloading(10);
    updatePossibleAnswers(answerInitialValues).then((res) => {
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
    var index = answerInitialValues.findIndex(
      (item) =>  item._id === event.target.id
    );

    if (index === -1) {
      setsnak({
        severity: "error",
        message: "Nothing To Update",
        open: true,
      });
    } else {
      var newArr = [...answerInitialValues];
      newArr[index] = {
        ...answerInitialValues[index],
        [event.target.name]: event.target.value,
      };
      setAnswerInitialValues(newArr);
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


  const newInitialValues = { name: "", name_am: "" };

  const answerFieldsValidationSchema = yup.object().shape({
    name: yup.string().required("required"),
    name_am: yup.string().required("required")
  });

  // creates dynamic name for looped possible answers
  const striper = (array, indx) => {
    const x = Object.keys(array);
    return x[indx];
  };


  return (
    <Box  m="20px">
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

        <Header title="Possible Answers" subtitle="" />
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


      <form action="" onSubmit={updatePossibleAnswers}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="5px"
          m="50px 0">
        {
          answerInitialValues.map((initialValues, key) => {
            return (

              <Box
                key={initialValues._id}
                width="100%"
                display="grid"
                justifyContent="center"
                gridTemplateColumns="1fr 1fr 0.4fr"
                gap="20px"
                autoComplete="off"
                alignContent="center"
              >

                <TextField label="Answer" variant="filled"
                  value={initialValues.name}
                  id={initialValues?._id}
                  onChange={onchangeHandler}
                  name={striper(initialValues, 1)} />

                <TextField label="Answer Amharic" variant="filled" 
                  value={initialValues.name_am}
                  id={initialValues?._id}
                  onChange={onchangeHandler}
                  name={striper(initialValues, 2)} />

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

       
      <Button type="button" onClick={()=>navigate("/quizes")} m="10px" sx={{  width: "30%", height:"40px" }} color="error" variant="contained">
          Cancel
        </Button>
        <Button type="submit" m="10px" sx={{  width: "30%", height:"40px" }} color="secondary" variant="contained">
          Update Possible Answers
        </Button>
    </Box>
        
        </Box>


      </form>

      <Modal
        keepMounted
        open={open}
        onClose={handleModalClose}
        aria-labelledby="Create Possible Quize Answer"
        aria-describedby="Create Possible Quize Answer"
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
            Create Possible Quize Answer
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
                      label="Answer Name"
                      fullWidth
                      variant="filled"
                      type="text"
                      name="name"
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Box>

                  <Box component="div"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <TextField
                      label="Answer Name in Amharic"
                      fullWidth
                      variant="filled"
                      type="text"
                      name="name_am"
                      value={values.name_am}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name_am && !!errors.name_am}
                      helperText={touched.name_am && errors.name_am}
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

export default PossibleQuizeAnswers;
