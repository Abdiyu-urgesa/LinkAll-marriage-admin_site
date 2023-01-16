import { Box, 
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField, } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Header from "../../../components/Header";
import SimpleSnackbar from "../../global/snackbar";
import { fetchCompanyService, updateCompanyService } from "../../../config/services/serviceCompany";


const UpdateCompanyService = () => {
  const param = useParams();
  const id = param.id;

  const navigate = useNavigate();
  const [initialValues, setIntialValues] = useState({});
  const [logo, setLogo] = useState("");

  const serviceTypes = [
    "sponsorship",
    "free_service",
    "shoping_discount",
    "service_discount",
    "free_premium_packages",
    "other_gifts",
  ];

  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  useEffect(() => {
    fetchCompanyService(id).then((res) => {
      if (res.success && res.data) {
        setIntialValues({
          logo: res.data.logo,
          name: res.data.name,
          required_points: res.data.required_points,
          service: res.data.service,
          service_am: res.data.service_am,
          service_types: res.data.service_types,
        });
      } else {
        console.log(res.error);
      }
    });
    
  }, [id]);

  const handleFormSubmit = (values) => {
   
    var formData = new FormData();

    if(logo !== ""){
      formData.append("logo", logo);
    }

    formData.append("name", values.name);
    formData.append("required_points", values.required_points);
    formData.append("service", values.service);
    formData.append("service_am", values.service_am);
    formData.append("service_types", values.service_types);

    updateCompanyService(formData, id).then(
      (res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          navigate("/company-services");
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

  const serviceFieldValidationSchema = yup.object().shape({
    name: yup.string().required("Company Name is required"),
    required_points: yup.string().required("Required Point is required"),
    service: yup.string().required("Service name is required"),
    service_am: yup.string().required("Service name amharic is required"),
    service_types: yup.string().required("Service type required"),
  });
  
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
      <Header title="Update Company Services" subtitle="Update Services Information Provided by Partner Companies" />
      <Formik
      enableReinitialize={true}
        onSubmit={(values) => {
          values.logo = logo;
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={serviceFieldValidationSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
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
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Button variant="contained" component="label" color="primary">
                {logo === "" ? `Uploaded Logo => ${values.logo}` : `Uploaded Logo => ${logo.name}`}
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
                label="Service Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service}
                name="service"
                error={!!touched.service && !!errors.service}
                helperText={touched.service && errors.service}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Service Name Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service_am}
                name="service_am"
                error={!!touched.service_am && !!errors.service_am}
                helperText={touched.service_am && errors.service_am}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Required Points"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.required_points}
                name="required_points"
                error={!!touched.required_points && !!errors.required_points}
                helperText={touched.required_points && errors.required_points}
              />



              <FormControl fullWidth>
                <InputLabel id="servicetype">Service Types</InputLabel>
                <Select
                  fullWidth
                  labelId="servicetype"
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.service_types}
                  name="service_types"
                >
                  {serviceTypes?.map((serviceType) => (
                    <MenuItem key={serviceType} value={serviceType}>
                      {serviceType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


              <Button type="button" onClick={() => navigate("/company-services")}
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

export default UpdateCompanyService;
