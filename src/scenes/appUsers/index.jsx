import { Avatar, Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import {
  get_all_users,
  deactivate_user,
  delete_user,
} from "../../config/services/api_calls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AppUsers = () => {
  // variable definations
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // functions
  useEffect(() => {
    get_all_users().then((res) => {
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const deleteHandler = (USERID) => {
    delete_user(USERID).then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        alert(res.data.message);
      } else {
        console.log(res.error);
      }
    });
    // navigate(0);
  };

  const deactivateHandler = (USERID) => {
    deactivate_user(USERID).then((res) => {
      if (res.success && res.data) {
        alert(res.data.message);
      } else {
        console.log(res.error);
      }
    });
    // navigate(0);
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
      field: "avatar",
      headerName: "Avatar",
      flex: 1,
      renderCell: (params) => (
        <Avatar
          src={`https://api.toethiotravel.com/${params.row.avatar}`}
        ></Avatar>
      ),
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
    // { field: "education_level", headerName: "Education Level" },
    // { field: "gender", headerName: "Gender" },
    // { field: "height", headerName: "Height" },
    // { field: "weight", headerName: "Weight" },
    // { field: "region", headerName: "Region" },
    // { field: "religion", headerName: "Religion" },
    // { field: "hiv_status", headerName: "Hiv Status" },
    {
      field: "is_active",
      headerName: "Is Active",
    },
    {
      field: "is_verified",
      headerName: "Verified",
      flex: 0.65,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            {params.row.is_verified === true && <CheckBoxRoundedIcon />}
            {params.row.is_verified === false && <DangerousOutlinedIcon />}
          </Box>
        );
      },
    },
    // { field: "martial_detail", headerName: "Martial Detail" },
    // { field: "martial_status", headerName: "Martial Status" },
    // { field: "occupation", headerName: "Occupation" },
    // { field: "advancedQuize", headerName: "AdvancedQuize" },
    // { field: "basicQuize", headerName: "BasicQuize" },
    // { field: "specialQuize", headerName: "SpecialQuize" },
    // { field: "community", headerName: "Community" },
    // { field: "skin_color", headerName: "Skin_color" },
    // { field: "religious_background", headerName: "Religious Background" },
    // { field: "special_prefs", headerName: "Special Prefs" },

    // { field: "cover", headerName: "Cover" },
    // { field: "views", headerName: "Views" },
    // { field: "likes", headerName: "Likes" },
    // { field: "shares", headerName: "Shares" },
    // { field: "user_otp", headerName: "OTP" },
    { field: "updatedAt", headerName: "Updated At" },
    { field: "createdAt", headerName: "Created At" },
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
              onClick={() => deactivateHandler(params.row._id)}
              color="secondary"
              variant="outlined"
            >
              Deactivate
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
      <Header title="Users" subtitle="Managing the App Users" />
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

export default AppUsers;
