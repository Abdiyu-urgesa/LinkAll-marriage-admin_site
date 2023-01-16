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
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";
import SimpleSnackbar from "../../global/snackbar";
import { fetchAd, updateAd } from "../../../config/services/adServices";


const UpdateAd = () => {
  const param = useParams();
  const id = param.id;

  const navigate = useNavigate();
  const [ad_gif, setAd_Gif] = useState("");
  const [adGif, setAdGif] = useState("");
  const [remark, setRemark] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  useEffect(() => {
    fetchAd(id).then((res) => {
      if (res.success && res.data) {
        setAd_Gif(res.data.ad_gif);
        setRemark(res.data.ad_remark);
        setIsActive(res.data.is_active);
      } else {
        console.log(res.error);
      }
    });

  }, [id]);

  const handleFormSubmit = (event) => {

    event.preventDefault();
    var formData = new FormData();

    if (adGif !== "") {
      formData.append("ad_gif", adGif);
    }

    formData.append("is_active", isActive);
    formData.append("ad_remark", remark);

    updateAd(formData, id).then(
      (res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          navigate("/custom-ads");
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

  const handleCheckChange = (event) => {
    setIsActive(event.target.checked);
  };
  const handleChange = (event) => {
    setRemark(event.target.value)
  }


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
        <Header title="Update Custom Ads" subtitle="Update Custom Ad Informations" /></Box>
     
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
                onChange={handleChange}
                value={remark}
                name="ad_remark"
              />
              <Button variant="contained" component="label" color="primary">
                {adGif === "" ? `Uploaded Ad Gif => ${ad_gif}` : `Uploaded Logo => ${adGif.name}`}
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


                <Button type="button" onClick={() => navigate("/points")} m="10px" sx={{ width: "30%", height: "40px" }} color="error" variant="contained">
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

export default UpdateAd;
