/* eslint-disable no-restricted-globals */
import { Box, Button, Avatar, useTheme, Typography } from "@mui/material";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SimpleSnackbar from "../../global/snackbar";
import { baseUrl } from "../../../config/api/apiHelpers";
import { aproveCreditPayment, deleteCreditPayment, fetchPaymentInfo } from "../../../config/services/paymentServices";

const CreditPayments = (props) => {
  // variable definations
  const param = useParams();
  const status = param.status;

  const [creditPayments, setCreditPayments] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // functions
  useEffect(() => {
    setCreditPayments({});
    fetchPaymentInfo(status).then((res) => {
      if (res.success && res.data) {
        setCreditPayments(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, [status]);

  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };

  const aproveHandler = (id) => {
    props.isloading(10);
    if (confirm("Are you sure you want to aprove this Credit Payment ?") === true) {
      aproveCreditPayment(id).then((res) => {
        if (res.success && res.data) {

          setsnak({ severity: "success", message: "Credit Payment Aproved", open: true });
          var index = creditPayments.findIndex(
            (item) => item._id === id
          );
          var newArr = [...creditPayments];
          newArr[index] = {
            ...creditPayments[index],
            'is_valid': res.data.is_valid,
          };
          setCreditPayments(newArr);
        } else {
          setsnak({
            severity: "error",
            message: res.error,
            open: true,
          });
          console.log(res.error);
        }
      });
    }
    props.isloading(100);
  };

  const deleteHandler = (id) => {
    props.isloading(10);
    if (confirm("Are you sure you want to delete this Payment ?") === true) {
      deleteCreditPayment(id).then((res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          setCreditPayments(
            creditPayments.filter((value) => {
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
      });
    }
    props.isloading(100);
  };


  const columns = [
    {
      field: "user",
      headerName: "User",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={`${baseUrl}/${params.row.user.avatar}`} />
            <Typography>{params.row.user.code_name}</Typography>
          </>
        );
      }
    },
    {
      field: "payment_account",
      headerName: "Paid Via",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={`${baseUrl}/${params.row.payment_account.logo}`} />
            <Typography>{params.row.payment_account.payment_name}</Typography>
          </>
        );
      }
    },
    {
      field: "credit_selected", headerName: "Credit Selected", flex: 1, renderCell: (params) => {
        return (
          <>

            <Typography>{params.row.credit_selected.credit}  for  &nbsp;  </Typography>
            {
              params.row.payment_account.payment_local ?
                <Typography>  {params.row.credit_selected.cost_in_birr} ETB</Typography> :
                <Typography>   $ {params.row.credit_selected.cost_in_usd}</Typography>

            }

          </>
        );
      }
    },
    { field: "txn_no", headerName: "Txn Number", flex: 1 },
    { field: "phone_number", headerName: "Phone", flex: 1 },
    { field: "full_name", headerName: "Full Name", },
    { field: "createdAt", headerName: "Inserted Date" },
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
            
              {params.row.is_valid === true ? <> <CheckBoxRoundedIcon /> <Button
              onClick={() => deleteHandler(params.row._id)}
              color="error"
              variant="outlined"
            >
              Delete
            </Button> </>: <Button
                onClick={() => aproveHandler(params.row._id)}
                color="secondary"
                variant="outlined"
              >
                Aprove
              </Button>
              }
            
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
      <Header title="Credit Payments" subtitle={status === "validated" ? "Aproved Credit Payments" : "New Credit Payments"} />
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
          rows={creditPayments}
          getRowId={(rows) => rows._id}
          columns={columns}
          components={{ Toolbar: GridToolbar, }}
        />
      </Box>
    </Box>
  );
};

export default CreditPayments;
