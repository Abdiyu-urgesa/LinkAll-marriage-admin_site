import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { fetchPoints, deletePoint } from "../../../config/services/pointService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "../../global/snackbar";

const Points = (props) => {
  // variable definations
  const navigate = useNavigate();
  const [points, setPoints] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });

  // functions
  useEffect(() => {
    fetchPoints().then((res) => {
      console.log(res.data);
      if (res.success && res.data) {
        setPoints(res.data);
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
  const editHandler = (pointid,point,type) => {
    navigate(`/updatepoints/${pointid}/${point}/${type}/`);
  };
  const deleteHandler = (pointId) => {
    props.isloading(10);
    deletePoint(pointId).then((res) => {
      if (res.success && res.data) {
        setsnak({ severity: "success", message: res.data.message, open: true });
        setPoints(
          points.filter((value) => {
            return value._id !== pointId;
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
      field: "point_type",
      headerName: "Point Type",
      cellClassName: "name-column--cell",
      flex: 2,
    },
    { field: "point", headerName: "Point", flex: 2 },
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
              onClick={() => editHandler(params.row._id,params.row.point,params.row.point_type)}
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
      <Header title="Points" subtitle="create and update points" />

      <Box width="100%">
        <Button
          onClick={() => {
            navigate("/createpoints");
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
          Create Point
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
          rows={points}
          getRowId={(rows) => rows._id}
          columns={columns}
          components={{ Toolbar: GridToolbar, }}
        />
      </Box>
    </Box>
  );
};

export default Points;
