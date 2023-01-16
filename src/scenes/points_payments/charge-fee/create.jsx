import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import SimpleSnackbar from "../../global/snackbar";
import { createActivityTarrif } from "../../../config/services/pointTarrifService";

const CreateActivityTarrif = (props) => {
  const navigate = useNavigate();
  const [actionType, setActionType] = useState([]);
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

  useEffect(() => {
        setActionType([
          "send_text_fee", "send_photo_fee",
          "video_call_fee"
       ]);
  }, []);

  const handleFormSubmit = (values) => {
    console.log(values)
    props.isloading(10);

    createActivityTarrif(values).then((res) => {
      console.log(res);
      if (res.success && res.data) {
        setsnak({ severity: "success", message: "Tarrif amount created", open: true });
        navigate("/activity-tarrifs");
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
    point_fee: yup.string().required("Tarrif amount is Required"),
    action_type: yup.string().required("Action Type is Required"),
  });
  const initialValues = {
    action_type: "",
    point_fee: 0,
  };

  return (
    <Box
    m="20vh auto"
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
      <Header title="Create Activity Tarrif" subtitle="Add/insert amount of point user will be charged for specific activity." />
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
                label="Tarrif Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point_fee}
                name="point_fee"
                error={!!touched.point_fee && !!errors.point_fee}
                helperText={touched.point_fee && errors.point_fee}
              />

               
              <FormControl fullWidth>
                <InputLabel id="action_type">Activity Type</InputLabel>
                <Select
                  fullWidth
                  labelId="action_type"
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.action_type}
                  name="action_type"
                >
                  {actionType?.map((pointtype) => (
                    <MenuItem key={pointtype} value={pointtype}>
                      {pointtype}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default CreateActivityTarrif;
