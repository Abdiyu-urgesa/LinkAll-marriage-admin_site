import { axiosinstance  as api } from "../api/apiHelpers";

/** 
 * Api Services for Dropdowns
 * 
 * as the names are descriptive 
 * the service fundctions are for 
 * create,update,get all ,get byid and delete for Dropdowns
 * 
*/
export const fetchdropdowns = async () => {
    try {
      const response = await api.get("/api/dropdown/all");
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
  
  export const get_dropdown_byid = async (dropdown_id) => {
    try {
      const response = await api.get(`/api/dropdown/byid/${dropdown_id}`);
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
  
  export const update_dropdown = async (dropdown_name, dropdown_id) => {
    try {
      const response = await api.put(`/api/Dropdown/update/${dropdown_id}`, {
        name: dropdown_name,
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
  
  export const update_field = async (field_obj) => {
    try {
      const response = await api.put("/api/Dropdown/update-fields", field_obj);
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
  
  export const add_dropdown_field = async (
    field_name,
    field_name_am,
    dropdown_id
  ) => {
    try {
      const response = await api.put(`/api/Dropdown/addfield/${dropdown_id}`, {
        field_name: field_name,
        field_name_am: field_name_am,
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
  export const create_dropdown = async (dropdown_name) => {
    try {
      const response = await api.post("/api/Dropdown/create", {
        name: dropdown_name,
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
  
  export const delete_dropdown = async (dropdown_id) => {
    try {
      const response = await api.delete(`/api/DropDown/delete/${dropdown_id}`);
  
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
  
  export const delete_field = async (field_id) => {
    try {
      const response = await api.delete(`/api/DropDown/delete-field/${field_id}`);
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
  