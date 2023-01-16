/* eslint-disable no-restricted-globals */
/** 
 * Quizes List Component for listing all the quizes that are in the database
 * */ 

import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../global/snackbar";
import { deleteChatTextList, fetchChatTextList } from "../../config/services/chatTextService";

const ChatTextList = (props) => {
  // variable definations
  const navigate = useNavigate();
  const [chatTextList, setChatTextList] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // react hook for getting chatText
  useEffect(() => {
    fetchChatTextList().then((res) => {
      if (res.success && res.data) {
        setChatTextList(res.data);
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
    navigate(`/edit-chat-text-list/${id}/`);
  };

  const handleChatText = (id) => {
    navigate(`/chat-text/${id}`);
  };

  const deleteHandler = (id) => {
    props.isloading(10);
    if(confirm("Are you sure you want to delete this chattextlist ?") === true){
      deleteChatTextList(id).then((res) => {
        if (res.success && res.data) {
          setsnak({ severity: "success", message: res.data.message, open: true });
          setChatTextList(
            chatTextList.filter((value) => {
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
      field: "text_type",
      headerName: "Question Type",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "answer_type", headerName: "Reply Type", flex: 1 },
    { field: "updatedAt", headerName: "Updated At",flex:1 },
    { field: "createdAt", headerName: "Created At",flex:1 },
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
              onClick={() => handleChatText(params.row._id)}
              color="secondary"
              variant="outlined"
            >
              Chat Text
            </Button>
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
      <Header title="Chat Text List" subtitle="create,update and delete Chat Text List" />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/create-chat-text-list");
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
          Create Chat Text List
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
          rows={chatTextList}
          getRowId={(rows) => rows._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ChatTextList;
