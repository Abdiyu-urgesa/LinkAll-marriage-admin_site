/* eslint-disable no-restricted-globals */
import { Box,Modal, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import { fetchPosts, delete_post, fetchMyPosts } from "../../config/services/postServices";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../global/snackbar";
import AuthContext from "../../config/store/auth-context";
import { baseUrl } from "../../config/api/apiHelpers";

const Posts = (props) => {
  const authCtx = useContext(AuthContext);
  // variable definations
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });
  // functions
  useEffect(() => {
    if(authCtx.role === "BUSSINES_ACCOUNT"){
      fetchMyPosts().then((res) => {
        if (res.success && res.data) {
          setPosts(res.data);
        } else {
          console.log(res.error);
        }
      });
    }else if(authCtx.role === "ADMIN" || authCtx.role ===  "SUPER_ADMIN"){
      fetchPosts().then((res) => {
        if (res.success && res.data) {
          setPosts(res.data.posts);
        } else {
          console.log(res.error);
        }
      });
    }

  }, [authCtx.role]);
  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };
  const editHandler = (u_id) => {
    navigate(`/editpost/${u_id}`);
  };

  const deleteHandler = (postID) => {
    props.isloading(10);
    if(confirm("Are you sure you want to delete this post?") === true){
      delete_post(postID).then((res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
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


  const handleModalOpen = (post) => {
    setSelectedPost(post);
    setOpen(true)
  };
  const handleModalClose = () => setOpen(false);

  const columns = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      flex: 1,
      renderCell:(params)=>{
        return (
          <Box>
            <Button
              onClick={() => handleModalOpen(params.row)}
              color="secondary"
              variant="outlined"
            >
              Thumbnail
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
                <img src={`${baseUrl}/${selectedPost.thumbnail}`} alt="" width="500"  />
              </Box>
            </Modal>
          </Box>
          
        )
      }
    },
    {
      field: "title",
      headerName: "Title",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "is_approved",
      headerName: "Published",
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center" alignItems="center">
            {params.row.is_approved === true && <CheckBoxRoundedIcon />}
            {params.row.is_approved === false && <DangerousOutlinedIcon />}
          </Box>
        );
      },
    },
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
              Detail
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
      <Header title="Posts" subtitle="create and update app posts" />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/createposts");
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
          Create Post
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
          rows={posts}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Posts;
