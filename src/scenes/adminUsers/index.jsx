import { Avatar, Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import { get_all_admin_users } from "../../config/services/api_calls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminUsers = () => {
  // variable definations
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // functions
  useEffect(() => {
    get_all_admin_users().then((res) => {
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const editHandler = (u_id) => {
    var user = users.filter((user) => {
      return user._id === u_id;
    });
    navigate(`/edituser/${u_id}`);
  };

  const columns = [
    {
      field: "userId",
      headerName: "user Id",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "code_name",
      headerName: "Code Name",
      cellClassName: "name-column--cell",
    },
    {
      field: "phone_number",
      headerName: "Phone",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "user_type", headerName: "Type" },
    {
      field: "is_active",
      headerName: "Is Active",
    },
    {
      field: "is_verified",
      headerName: "is_verified",
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            {params.row.is_verified === true && <CheckBoxRoundedIcon />}
            {params.row.is_verified === false && <DangerousOutlinedIcon />}
          </Box>
        );
      },
    },
    { field: "updatedAt", headerName: "Updated At" },
    { field: "createdAt", headerName: "Created At" },
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              onClick={() => editHandler(params.row._id)}
              color="primary"
              variant="contained"
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Admin Users" subtitle="Manage And Update Admins" />

      <Box width="100%">
        <Button
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
          Add New Admin
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
          rows={users}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default AdminUsers;
