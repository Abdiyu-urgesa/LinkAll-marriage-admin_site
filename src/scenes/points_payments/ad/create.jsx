import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { blue } from '@mui/material/colors';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { useState } from "react";
import SimpleSnackbar from "../../global/snackbar";
import { createAD } from "../../../config/services/adServices";

const CreateCustomAd = (props) => {
  const navigate = useNavigate();
  const [adGif, setAdGif] = useState("");
  const [remark, setRemark] = useState("");
  const [isActive, setIsActive] = useState(true);


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
  const handleCheckChange = (event) => {
    setIsActive(event.target.checked);
  };
  
  const handleChange = (event) => {
    setRemark(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.isloading(10);
    if(adGif !== ""){
      var formData = new FormData();

      formData.append("ad_gif", adGif);
      formData.append("is_active", isActive);
      formData.append("ad_remark", remark);

      createAD(formData).then((res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: "Company Service created", open: true });
          navigate("/custom-ads");
        } else {
          setsnak({
            severity: "error",
            message: res.error,
            open: true,
          });
          console.log(res.error);
        }
      });
    }else{
      setsnak({
              severity: "error",
              message: "Please Upload Gif/image form AD",
              open: true,
            });
    }
     

    
    props.isloading(100);
  };


  return (
    <Box
      m="15vh auto"
      width="80%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="30px"
    >
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Box
        display="flex"
        width="60%"
        flexDirection="column"
        justifyContent="center"
        gap="30px"
        margin="auto"
      >
        <Header title="Create Custom Ads" subtitle="Create/Insert Custom Ads" /></Box>
     <form onSubmit={handleFormSubmit}>
            <Box
              display="flex"
              width="60%"
              flexDirection="column"
              justifyContent="center"
              gap="30px"
              margin="auto"
            >
              <TextField
                rows={5}
                fullWidth
                variant="filled"
                type="string"
                label="Ad Remarks"
                name="ad_remark"
                onChange={handleChange}
              />
              <Button variant="contained" component="label" color="primary">
                {adGif === "" ? `Upload Ad Gif` : `Uploaded Logo => ${adGif.name}`}
                <input
                  name="ad_gif"
                  type="file"
                  hidden
                  onChange={(event) => {
                    setAdGif(event.target.files[0]);
                  }}
                />
              </Button>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={isActive} onChange={handleCheckChange} sx={{
                  color: blue[800],
                  '&.Mui-checked': {
                    color: blue[600],
                  },
                }} />} label="Active" />
              </FormGroup>

              <Box m="10px"
                gap="40px"
                display="flex"
                justifyContent="center"
                alignItems="center">


                <Button type="button" onClick={() => navigate("/custom-ads")} m="10px" sx={{ width: "30%", height: "40px" }} color="error" variant="contained">
                  Cancel
                </Button>
                <Button type="submit" m="10px" sx={{ width: "30%", height: "40px" }} color="secondary" variant="contained">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        
    </Box>
  );
};

export default CreateCustomAd;
