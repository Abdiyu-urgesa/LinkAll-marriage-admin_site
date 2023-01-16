import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { deleteCreditPackage, fetchCreditPackages } from "../../../config/services/pointService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../../global/snackbar";

const CreditPackage = (props) => {
  // variable definations
  const navigate = useNavigate();
  const [creditPackages, setCreditPackages] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // functions
  useEffect(() => {
    fetchCreditPackages().then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        setCreditPackages(res.data);
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
    navigate(`/update-credit-package/${id}/`);
  };

  const deleteHandler = (id) => {
    props.isloading(10);
    deleteCreditPackage(id).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setCreditPackages(
          creditPackages.filter((value) => {
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
    props.isloading(100);
  };

  const columns = [
    {
      field: "credit",
      headerName: "Credit Amount",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "cost_in_birr", headerName: "Cost In Birr", flex: 1 },
    { field: "cost_in_usd", headerName: "Cost In USD", flex: 1 },
    { field: "updatedAt", headerName: "Updated At",flex:2 },
    { field: "createdAt", headerName: "Created At",flex:2 },
    {
      field: "_id",
      headerName: "Manage",
      flex: 2,
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
      <Header title="Credit Packages List" subtitle="create,update and delete credit packages" />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/create-credit-package");
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
          Create Credit Package
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
          rows={creditPackages}
          getRowId={(rows) => rows._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default CreditPackage;
