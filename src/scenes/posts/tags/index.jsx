import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { get_tags, delete_tag } from "../../../config/services/postServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Tags = () => {
  // variable definations
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // functions
  useEffect(() => {
    get_tags().then((res) => {
      if (res.success && res.data) {
        setTags(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const deleteHandler = (tagID) => {
    delete_tag(tagID).then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        alert(res.data.message);
      } else {
        console.log(res.error);
      }
    });
    // navigate(0);
  };

  const EditHandler = (tagID) => {
    navigate(`/edittag/${tagID}`);
  };

  const columns = [
    {
      field: "tag_name",
      headerName: "Tag Name",
      cellClassName: "name-column--cell",
      flex: 3,
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
              onClick={() => EditHandler(params.row._id)}
              color="secondary"
              variant="outlined"
            >
              Edit
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
      <Header title="Tags" subtitle="Managing the post Tags" />
      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/creattags");
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
          Create Tag
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
          rows={tags}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Tags;
