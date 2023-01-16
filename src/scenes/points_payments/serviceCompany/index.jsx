import { Box, Button,Avatar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../../global/snackbar";
import { deleteCompanyService, fetchCompanyServices } from "../../../config/services/serviceCompany";
import {baseUrl } from "../../../config/api/apiHelpers";

const CompanyServices = (props) => {
  // variable definations
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // functions
  useEffect(() => {
    fetchCompanyServices().then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        setServices(res.data);
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
    navigate(`/update-company-services/${id}/`);
  };

  const deleteHandler = (id) => {
    props.isloading(10);
    deleteCompanyService(id).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setServices(
          services.filter((value) => {
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
      field: "name",
      headerName: "Company Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "required_points", headerName: "Required Point", flex: 1 },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "service_types", headerName: "Service Types", flex: 1 },
    { field: "updatedAt", headerName: "Updated At" },
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
      <Header title="Company Services" subtitle="create and update Services" />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/create-company-services");
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
          Create Services
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
          rows={services}
          getRowId={(rows) => rows._id}
          columns={columns}
          components={{ Toolbar: GridToolbar, }}
        />
      </Box>
    </Box>
  );
};

export default CompanyServices;
