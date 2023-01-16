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
import {
  createPoint,
} from "../../../config/services/pointService";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import SimpleSnackbar from "../../global/snackbar";

const CreatePoint = (props) => {
  const navigate = useNavigate();
  const [pointType, setPointType] = useState([]);
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
        setPointType([
          "quize_point", "signup_point",
          "feedback_point","abuse_report_point",
          "share_profile_point","share_post_point",
          "share_app_point","explore_market_point",
          "explore_service_point"
       ]);
  }, []);

  const handleFormSubmit = (values) => {
    console.log(values)
    props.isloading(10);

    createPoint(values).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: "Point created", open: true });
        navigate("/points");
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
    point: yup.string().required("Point Amount required"),
    point_type: yup.string().required("Point type required"),
  });
  const initialValues = {
    point_type: "",
    point: 0,
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
      <Header title="Create Point" subtitle="Create/insert amount of point user will achieve for specific events." />
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
                label="Point Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.point}
                name="point"
                error={!!touched.point && !!errors.point}
                helperText={touched.point && errors.point}
              />

               
              <FormControl fullWidth>
                <InputLabel id="point_type">Point Type</InputLabel>
                <Select
                  fullWidth
                  labelId="point_type"
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.point_type}
                  name="point_type"
                >
                  {pointType?.map((pointtype) => (
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

                  
                  <Button type="button" onClick={()=>navigate("/points")} m="10px" sx={{  width: "30%", height:"40px" }} color="error" variant="contained">
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

export default CreatePoint;
