import { axiosinstance  as api } from "../api/apiHelpers";

/** 
 * Api Services for Service Providing/Partner Companies 
 * 
 * as the names are descriptive 
 * the service fundctions are for 
 * create,update,get all ,get byid and delete for Companies and Services.
 * 

*/

export const createServiceCompany = async (formdata) => {

  try {
      const response = await api.post("/api/company/create/", formdata);
  
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log("in err response: ",err.response.data);
        return { success: false, data: null, error: err.response.data.message };
      } else {
        console.log(`Error: ${err.message}`);
        return { success: false, data: null, error: err.message };
      }
    }
  };
  
export const fetchCompanyServices = async () => {
    try {
      const response = await api.get("/api/company/all/");
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

  export const fetchCompanyService= async (id) => {
    try {
      const response = await api.get(`/api/company/company/${id}`);
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

export const deleteCompanyService = async (id) => {
    try {
      const response = await api.delete(`/api/company/company/${id}`);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        return { success: false, data: null, error: err.response.data.message };
      } else {
        console.log(`Error: ${err.message}`);
        return {success:false,data:null,error:err.message}
      }
    }
  };
  
export const updateCompanyService = async (formData,id) => {
  try {
    const response = await api.put(`/api/company/update/${id}`, formData);
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
 