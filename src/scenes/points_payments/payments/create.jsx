import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { blue } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { useState } from "react";
import SimpleSnackbar from "../../global/snackbar";
import { createPaymentAccount } from "../../../config/services/paymentServices";

const CreatePaymentAccount = (props) => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState("");
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
    // console.log(values)
    props.isloading(10);

    var formData = new FormData();

    formData.append("payment_logo", logo);
    formData.append("payment_name", values.payment_name);
    formData.append("account_name", values.account_name);
    formData.append("account_number", values.account_number);
    formData.append("payment_local", values.payment_local);
    formData.append("payment_online", values.payment_online);

    createPaymentAccount(formData).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: "Payment Account Created", open: true });
        navigate("/payment-accounts");
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

  const paymentFieldValidationSchema = yup.object().shape({
    account_name: yup.string().required("Account Name is required"),
    account_number: yup.string().required("Account Number is required"),
    payment_name: yup.string().required("Payment name is required"),
  });

  const initialValues = {
    logo: "",
    account_name: "",
    account_number: "",
    payment_name: "",
    payment_online: false,
    payment_local: true,
  };

  return (
    <Box
      m="10vh auto"
      width="80%"
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
      <Header title="Create Payment Account" subtitle="Create/Insert Payment Accounts" />
      <Formik
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={paymentFieldValidationSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange,setFieldValue }) => (
          <Form>
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              justifyContent="center"
              gap="30px"
              margin="auto"
            >
              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Payment Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.payment_name}
                name="payment_name"
                error={!!touched.payment_name && !!errors.payment_name}
                helperText={touched.payment_name && errors.payment_name}
              />
              <Button variant="contained" component="label" color="primary">
                {logo === "" ? "Upload Payment Logo" : `Uploaded => ${logo.name}`}
                <input
                  name="logo"
                  type="file"
                  hidden
                  onChange={(event) => {
                    setLogo(event.target.files[0]);
                  }}
                />
              </Button>

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Account Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.account_name}
                name="account_name"
                error={!!touched.account_name && !!errors.account_name}
                helperText={touched.account_name && errors.account_name}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Account Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.account_number}
                name="account_number"
                error={!!touched.account_number && !!errors.account_number}
                helperText={touched.account_number && errors.account_number}
              />

              <FormGroup>
                <FormControlLabel name="payment_online" control={<Checkbox checked={values.payment_online} onChange={(e) => {
                  if (e.target.checked) {
                    setFieldValue("payment_online",true);
                  } else {
                    setFieldValue("payment_online",false);
                  }
                }} sx={{
                  color: blue[800],
                  '&.Mui-checked': {
                    color: blue[600],
                  },
                }} />} label="Check if it is Online Payment (online/direct payment)" />
              </FormGroup>

              <FormGroup>
                <FormControlLabel name="payment_local" control={<Checkbox checked={values.payment_local} onChange={(e) => {
                  if (e.target.checked) {
                    setFieldValue("payment_local",true);
                  } else {
                    setFieldValue("payment_local",false);
                  }
                }} sx={{
                  color: blue[800],
                  '&.Mui-checked': {
                    color: blue[600],
                  },
                }} />} label="Check if it is Local Payment (Local / Credit card payment)" />
              </FormGroup>

              <Button type="button" onClick={() => navigate("/payment-accounts")}
                m="10px" sx={{ width: "40%", height: "40px" }} color="error" variant="contained">
                Cancel
              </Button>
              <Button type="submit" m="10px"
                sx={{ width: "40%", height: "40px" }} color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreatePaymentAccount;
