import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
} from "@mui/material";
import SimpleSnackbar from "../global/snackbar";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import Header from "../../components/Header";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  get_tags,
  get_catagory,
  fetchPost,
  updatePost,
} from "../../config/services/postServices";

const EditPost = (props) => {
  const param = useParams();
  const postid = param.id;
  const navigate = useNavigate();

  const [catagories, setCatagory] = useState([]);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState("");
  const [postInitialValues,setPostInitialValues] = useState({});
  const [snak, setsnak] = useState({
    severity: "",
    message: "",
    open: false,
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const initialValues = {
    thumbnail: "test",
    title: "",
    description: "",
    tags: [],
    post_category: "",
    video_link: "",
    title_am: "",
    description_am: "",
  };

  useEffect(() => {
    get_tags().then((res) => {
      if (res.success && res.data) {
        setTags(res.data);
      } else {
        console.log(res.error);
      }
    });
    get_catagory().then((res) => {
      if (res.success && res.data) {
        setCatagory(res.data);
      } else {
        console.log(res.error);
      }
    });
    fetchPost(postid).then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
        setPostInitialValues(res.data);
        // setInitialValues({
        //   thumbnail: res.data.thumbnail,
        //   title: res.data.title,
        //   description: res.data.description,
        //   tags: [],
        //   post_category: "",
        //   video_link: res.data.video_link,
        //   title_am: res.data.title_am,
        //   description_am: res.data.description_am,
        // });
      } else {
        console.log(res.error);
      }
    });
  }, [postid]);

  const handleClose = () => {
    setsnak({
      open: false,
      severity: "",
      message: "",
    });
  };

  const filterhandler = (value) => {
    const data = tags.filter((tag) => {
      if (tag._id === value) {
        return tag;
      }
    });
    return data[0].tag_name;
  };

  const handleFormSubmit = (values) => {
    props.isloading(10);
    const fd = new FormData();
    fd.append("thumbnail", file);
    fd.append("title", values.title);
    fd.append("description", values.description);
    fd.append("tags", values.tags);
    fd.append("post_category", values.post_category);
    fd.append("video_link", values.video_link);
    fd.append("title_am", values.title_am);
    fd.append("description_am", values.description_am);
    updatePost(postid, values).then((res) => {
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
    props.isloading(100);
  };

  console.log(postInitialValues);
  return (
    <Box
      m="30px"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <SimpleSnackbar
        open={snak.open}
        severity={snak.severity}
        message={snak.message}
        onClose={handleClose}
      />
      <Header title="EDIT Post" subtitle="Edit Post Here" />
      <Formik
      enableReinitialize={true}
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              justifyContent="center"
              gap="30px"
              margin="auto"
            >
              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Post Title English"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Post Title Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title_am}
                name="title_am"
                error={!!touched.title_am && !!errors.title_am}
                helperText={touched.title_am && errors.title_am}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Post Discription"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Post Discription Amharic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description_am}
                name="description_am"
                error={!!touched.description_am && !!errors.description_am}
                helperText={touched.description_am && errors.description_am}
              />

              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Video Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.video_link}
                name="video_link"
                error={!!touched.video_link && !!errors.video_link}
                helperText={touched.video_link && errors.video_link}
              />

              <FormControl fullWidth>
                <InputLabel id="catagory">post catagory</InputLabel>
                <Select
                  fullWidth
                  labelId="catagory"
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.post_category}
                  name="post_category"
                >
                  {catagories?.map((catago) => (
                    <MenuItem key={catago?._id} value={catago?._id}>
                      {catago?.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="tag">post tag</InputLabel>
                <Select
                  fullWidth
                  labelId="tag"
                  variant="filled"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tags}
                  name="tags"
                  multiple
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={filterhandler(value)} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags?.map((tag) => (
                    <MenuItem key={tag?._id} value={tag?._id}>
                      {tag?.tag_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="contained" component="label" color="primary">
                Upload tumbnail
                <input
                  name="photo"
                  type="file"
                  value={values.photo}
                  hidden
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
              </Button>
              <Button onClick={()=>navigate("/posts")} type="button" color="error" variant="contained">
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditPost;
