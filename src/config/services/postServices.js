import { axiosinstance  as api } from "../api/apiHelpers";

/**
 * 
 * Post Related Crud Api services
*/
export const fetchPosts = async () => {
    try {
      const response = await api.get("/api/post/get");
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  export const fetchPost = async (id) => {
    try {
      const response = await api.get(`/api/post/byid/${id}`);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.response.data.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
  export const updatePost = async (id,formData) => {
    try {
      const response = await api.put(`/api/post/update/${id}`,formData);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.response.data.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  export const fetchMyPosts = async () => {
    try {
      const response = await api.get("/api/post/for-creator/");
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.response.data.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  export const create_post = async (formdata) => {
    try {
      const response = await api.post("/api/post/create", formdata);
  
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.response.data.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  export const delete_post = async (post_id) => {
    try {
      const response = await api.delete(`/api/post/delete/${post_id}`);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
/**
 * Post Category and Post Tag Related Api Services
 * */ 


export const get_catagory = async () => {
    try {
      const response = await api.get("/api/post/get-category");
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
  export const create_catagory = async (catag_en, catag_am) => {
    try {
      const response = await api.post("/api/post/create-category", {
        category: catag_en,
        category_am: catag_am,
      });
  
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  export const delete_catagory = async (catagory_id) => {
    try {
      const response = await api.delete(
        `/api/post/delete-category/${catagory_id}`
      );
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
  export const update_catagory = async (catag_en, catag_am, catagory_id) => {
    try {
      const response = await api.put(`/api/post/update-category/${catagory_id}`, {
        category: catag_en,
        category_am: catag_am,
      });
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
  export const get_tags = async () => {
    try {
      const response = await api.get("/api/post/get-tags");
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  export const delete_tag = async (tag_id) => {
    try {
      const response = await api.delete(`/api/post/delete-tag/${tag_id}`);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
  export const update_tag = async (Tag_name, tag_id) => {
    try {
      const response = await api.put(`/api/post/update-tag/${tag_id}`, {
        tag_name: Tag_name,
      });
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
  export const create_tag = async (Tag_name) => {
    try {
      const response = await api.post("/api/post/create-tag", {
        tag_name: Tag_name,
      });
  
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.message };
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  

