import { Box, Typography } from "@mui/material";
import { MuiOtpInput } from 'mui-one-time-password-input'
import { verify_account } from "../../config/services/userServices";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import SimpleSnackbar from "../global/snackbar";
import AuthContext from "../../config/store/auth-context";


const OtpLogin = (props) => {

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const userid = useParams();
  const [otpCode, setOtpCode] = useState("");
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

  const handleChange = (newValue) => {
    setOtpCode(newValue)
  }
  

  const handleComplete = (values) => {
    setOtpCode("");
    props.isloading(10);
    verify_account(values, userid.id).then((res) => {
      if (res.success && res.data) {
        authCtx.login(
          res.data.data.accessToken,
          res.data.data.user_typ,
          res.data.data.code_name
        );

        setsnak({ severity: "success", message: "Otp varified", open: true });
        console.log(snak.severity);
        navigate("/dashboard");
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

  console.log(otpCode);

  return (


    <Box m="20vh auto">
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          alt="logo"
          width="200px"
          height="200px"
          src={`../../assets/logo.png`}
          style={{
            cursor: "pointer",
            borderRadius: "50%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box
        display="flex"
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        marginBottom="50px"
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0",color:"#f7faf8" }}
        >
          Enter the OTP Sent To your Phone via SMS
        </Typography>
      </Box>

      <Box
        width="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="30px"
        margin="auto"
      >

        <MuiOtpInput length={4} value={otpCode}
          TextFieldsProps={{ disabled: false, placeholder: '-' }}
          onComplete={handleComplete} onChange={handleChange} />

      </Box>

    </Box>
  );
};

export default OtpLogin;
