import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  createCreditPackage,
} from "../../../config/services/pointService";
import Header from "../../../components/Header";
import { useState } from "react";
import SimpleSnackbar from "../../global/snackbar";

const CreateCreditpackage = (props) => {
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

    createCreditPackage(values).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        navigate("/credit-packages");
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
    credit: yup.string().required("required"),
    cost_in_birr: yup.string().required("required"),
    cost_in_usd:yup.string().required("required"),
  });

  const initialValues = {
    credit: "",
    cost_in_birr: "",
    cost_in_usd:""
  };

  return (
    <Box
    m="5vh auto"
    width="500px"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    gap="60px"
    >
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="Create Credit Packages" subtitle="Create Credit Packages with prices in ETB and USD." />
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
                type="number"
                label="Credit Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.credit}
                name="credit"
                error={!!touched.credit && !!errors.credit}
                helperText={touched.credit && errors.credit}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Credit Cost in ETB/Birr"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cost_in_birr}
                name="cost_in_birr"
                error={!!touched.cost_in_birr && !!errors.cost_in_birr}
                helperText={touched.cost_in_birr && errors.cost_in_birr}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Credit Cost in USD"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cost_in_usd}
                name="cost_in_usd"
                error={!!touched.cost_in_usd && !!errors.cost_in_usd}
                helperText={touched.cost_in_usd && errors.cost_in_usd}
              />
               
               <Box m="10px"
                  gap="40px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center">

                  
                  <Button type="button" onClick={()=>navigate("/credit-packages")} m="10px" sx={{  width: "30%", height:"40px" }} color="error" variant="contained">
                      Cancel
                    </Button>
                    <Button type="submit" m="10px" sx={{  width: "30%", height:"40px" }} color="secondary" variant="contained">
                      Submit
                    </Button>
                </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateCreditpackage;
