import { Avatar, Modal, Typography, Box, Button, useTheme } from "@mui/material";
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
} from "../../config/services/userServices";
import { useState } from "react";
import SimpleSnackbar from "../global/snackbar";
import { baseUrl } from "../../config/api/apiHelpers";

const AppUsers = (props) => {
  // variable definations
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });
  // functions
  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };
  useEffect(() => {
    get_all_users().then((res) => {
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const handleModalOpen = (user) => {
    setSelectedUser(user)
    setOpen(true)
  };
  const handleModalClose = () => setOpen(false);


  const deleteHandler = (USERID) => {
    props.isloading(10);

    // eslint-disable-next-line no-restricted-globals
    if(confirm("Are you sure you want to delete this user?") === true){
      delete_user(USERID).then((res) => {
        console.log(res.data);
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          setUsers(
            users.filter((value) => {
              return value._id !== USERID;
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

  const deactivateHandler = (USERID) => {
    props.isloading(10);
    deactivate_user(USERID).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        var index = users.findIndex(
          (item) => item._id === USERID
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
      field: "avatar",
      headerName: "Avatar",
      flex: 1,
      renderCell: (params) => (
        <Avatar
          src={`${baseUrl}/${params.row.avatar}`}
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
              color={params.row.is_active ? "warning" : "secondary"}
              variant="outlined"
            >
              {params.row.is_active ? "Suspend" : "activate"}
            </Button>
            <Button
              onClick={() => deleteHandler(params.row._id)}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
            <Button
              onClick={() => handleModalOpen(params.row)}
              color="success"
              variant="outlined"
            >
              More
            </Button>

            <Modal
              keepMounted
              open={open}
              onClose={handleModalClose}
              aria-labelledby="User Detail Profile"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: colors.blueAccent[900],
                boxShadow: 24,
                p: 4,
              }}>
                <Avatar src={`${baseUrl}/${selectedUser.avatar}`} ></Avatar>
                <Typography variant="h6" component="h2">
                  {selectedUser.code_name}
                </Typography>
                <Typography variant="h6" component="h4">
                  {selectedUser.userId}
                </Typography>



              </Box>
            </Modal>
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
