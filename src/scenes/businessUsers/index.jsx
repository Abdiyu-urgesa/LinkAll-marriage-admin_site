import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import {
  get_all_business_users,
  deactivate_user,
  delete_user,
} from "../../config/services/userServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../global/snackbar";


const BusinessUsers = (props) => {
  // variable definations
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // functions
  useEffect(() => {
    get_all_business_users().then((res) => {
      if (res.success && res.data) {
        setUsers(res.data);
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

  const editHandler = (userId) => {
    navigate(`/edituser/${userId}/businessusers/`);
  };

  const deleteHandler = (id) => {
    props.isloading(10);
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Are you sure you want to delete this user?") === true){
    delete_user(id).then((res) => {

      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setUsers(
          users.filter((value) => {
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

  const deactivateHandler = (userid) => {
    props.isloading(10);
    deactivate_user(userid).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        var index = users.findIndex(
          (item) => item._id === userid
        );
        var newArr = [...users];
        newArr[index] = {
          ...users[index],
          'is_active': res.data.userToDeactivate.is_active,
        };
        setUsers(newArr);
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
              Edit
            </Button>
            <Button
              onClick={() => deactivateHandler(params.row._id)}
              color={params.row.is_active ? "warning" : "secondary"}
              variant="outlined"
            >
              {params.row.is_active ? "Suspend" : "Activate"}
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
      <Header
        title="Business Users"
        subtitle="Manage And Update Business Users"
      />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/createbusiness");
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
          Add Business User
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

export default BusinessUsers;
