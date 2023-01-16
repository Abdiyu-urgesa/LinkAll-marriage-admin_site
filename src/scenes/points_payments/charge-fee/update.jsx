import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../../components/Header";
import SimpleSnackbar from "../../global/snackbar";
import { updateActivityTarrif } from "../../../config/services/pointTarrifService";


const UpdateChatActivityTarrif = () => {

  const param = useParams();
  const id = param.id;
  const pageTitle = "Edit Activity Tarrif  for " + param.action_type.toUpperCase();

  const navigate = useNavigate();

  const initialValues = {
    point_fee:param.tarrif
  };

  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

 
  const handleFormSubmit = (values) => {
    updateActivityTarrif(values, id).then(
      (res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          navigate("/activity-tarrifs");
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
    point_fee: yup.string().required("Amount is required"),
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
      <Header title="Edit Activity Tarrif Amounts Here" subtitle={pageTitle} />
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
                label="Tarrif Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point_fee}
                name="point_fee"
                error={!!touched.point_fee && !!errors.point_fee}
                helperText={touched.point_fee && errors.point_fee}
              />

    <Box m="10px"
      gap="40px"
      display="flex"
      justifyContent="center"
      alignItems="center">

       
      <Button type="button" onClick={()=>navigate("/activity-tarrifs")} m="10px" sx={{  width: "30%", height:"40px" }} color="error" variant="contained">
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

export default UpdateChatActivityTarrif;
