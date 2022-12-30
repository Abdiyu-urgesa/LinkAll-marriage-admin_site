import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { updateCreditPackage } from "../../../config/services/point_service";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../../components/Header";
import SimpleSnackbar from "../../global/snackbar";


const UpdateCreditPackage = () => {
  const param = useParams();
  const id = param.id;

  const navigate = useNavigate();
  const initialValues = {};

  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

 
  const handleFormSubmit = (values) => {
    updateCreditPackage(values, id).then(
      (res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          navigate("/credit-packages");
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
    point: yup.string().required("required"),
  });

   
  
  return (
  <Box
      m="20vh auto"
      width="500px"
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
      <Header title="Edit Credit Packages Here" subtitle="" />
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
                label="Point Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point}
                name="point"
                error={!!touched.point && !!errors.point}
                helperText={touched.point && errors.point}
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

export default UpdateCreditPackage;