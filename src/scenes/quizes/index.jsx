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
import { deleteQuize, fetchQuizes } from "../../config/services/quizeService";

const QuizeList = (props) => {
  // variable definations
  const navigate = useNavigate();
  const [quizes, setQuizes] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // react hook for getting quizes
  useEffect(() => {
    fetchQuizes().then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        setQuizes(res.data);
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
    navigate(`/quize-detail/${id}/`);
  };

  const handleAnswers = (id) => {
    navigate(`/create-possibleAnswers/${id}`);
  };

  const deleteHandler = (id) => {
    props.isloading(10);
    deleteQuize(id).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setQuizes(
          quizes.filter((value) => {
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
      field: "question",
      headerName: "Question",
      cellClassName: "name-column--cell",
      flex: 2,
    },
    { field: "quize_type", headerName: "Quize Type", flex: 1 },
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
              onClick={() => handleAnswers(params.row._id)}
              color="secondary"
              variant="outlined"
            >
              Answers
            </Button>
            <Button
              onClick={() => editHandler(params.row._id)}
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
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="Quizes List" subtitle="create,update and delete credit packages" />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/create-quize");
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
          Create Quize
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
          rows={quizes}
          getRowId={(rows) => rows._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default QuizeList;
