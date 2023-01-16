/* eslint-disable no-restricted-globals */
import { Box, Button,Avatar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../../global/snackbar";
import {baseUrl } from "../../../config/api/apiHelpers";
import { deletePaymentAccount, fetchPaymentAccounts } from "../../../config/services/paymentServices";

const PaymentAccount = (props) => {
  // variable definations
  const navigate = useNavigate();
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // functions
  useEffect(() => {
    fetchPaymentAccounts().then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        setPaymentAccounts(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };

  const editHandler = (id) => {
    navigate(`/update-payment-account/${id}/`);
  };

  const deleteHandler = (id) => {
    props.isloading(10);
    if(confirm("Are you sure you want to delete this Account ?") === true){deletePaymentAccount(id).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setPaymentAccounts(
          paymentAccounts.filter((value) => {
            return value._id !== id;
          })
        )
      } else {
        setsnak({
          severity: "error",
          message: res.error,
          open: true,
        });
        console.log(res.error);
      }
    });}
    props.isloading(100);
  };


  const columns = [
    {
      field: "logo",
      headerName: "Logo",
      flex: 1,
      renderCell: (params) => {
        return (
          <Avatar  src={`${baseUrl}/${params.row.logo}`} />
        );
      }
    },
    {
      field: "payment_name",
      headerName: "Payment Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "account_name", headerName: "Account Name", flex: 1 },
    { field: "account_number", headerName: "Account Number", flex: 1 },
    { field: "payment_online", headerName: "Online Payment", flex: 1 },
    { field: "payment_local", headerName: "Local Payment",},
    { field: "createdAt", headerName: "Created At" },
    {
      field: "_id",
      headerName: "Manage",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <Button
              onClick={() => editHandler(params.row._id)}
              color="secondary"
              variant="outlined"
            >
              Update
            </Button>
            <Button
              onClick={() => deleteHandler(params.row._id)}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="Payment Accounts" subtitle="create and update Payment Accounts" />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/create-payment-accounts");
          }}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            position: "absolute",
            right: "20px",
          }}
        >
          <AddOutlinedIcon sx={{ mr: "10px" }} />
          Create Payment Account
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          rows={paymentAccounts}
          getRowId={(rows) => rows._id}
          columns={columns}
          components={{ Toolbar: GridToolbar, }}
        />
      </Box>
    </Box>
  );
};

export default PaymentAccount;
