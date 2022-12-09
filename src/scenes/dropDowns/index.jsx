import { Avatar, Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import { fetchdropdowns } from "../../config/services/api_calls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Dropdowns = () => {
  // variable definations
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // functions
  useEffect(() => {
    fetchdropdowns().then((res) => {
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const editHandler = (drop_id, to) => {
    navigate(`/${to}/${drop_id}`);
  };

  const columns = [
    {
      field: "name",
      headerName: "Dropdown Name",
      type: "text",
      flex: 2,
    },
    { field: "createdAt", headerName: "Created At", flex: 2 },

    { field: "updatedAt", headerName: "Updated At", flex: 2 },
    {
      field: "_id",
      headerName: "Manage",
      flex: 2.5,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <Button
              onClick={() => editHandler(params.row._id, "addfield")}
              color="secondary"
              variant="outlined"
            >
              Add Field
            </Button>
            <Button
              onClick={() => editHandler(params.row._id, "editdropdown")}
              color="secondary"
              variant="outlined"
            >
              Edit
            </Button>
            <Button
              onClick={() => editHandler(params.row._id)}
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
          Add Dropdown
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

export default Dropdowns;
