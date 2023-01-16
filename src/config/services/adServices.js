import { axiosinstance  as api } from "../api/apiHelpers";

/** 
 * Api Services for AD Service  
 * 
 * as the names are descriptive 
 * the service fundctions are for 
 * create,update,get all ,get byid and delete for ADs
 * 
*/

export const createAD = async (formdata) => {

  try {
      const response = await api.post("/api/ad/create/", formdata);
  
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response) {
        return { success: false, data: null, error: err.response.data.message };
      } else {
        console.log(`Error: ${err.message}`);
        return { success: false, data: null, error: err.message };
      }
    }
  };
  
export const fetchAds = async () => {
    try {
      const response = await api.get("/api/ad/all/");
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

  export const fetchAd= async (id) => {
    try {
      const response = await api.get(`/api/ad/byid/${id}`);
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

export const deleteAd = async (id) => {
    try {
      const response = await api.delete(`/api/ad/delete/${id}`);
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
  
export const updateAd = async (formData,id) => {
  try {
    const response = await api.put(`/api/ad/update/${id}`, formData);
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

export const modifyAd = async (id) => {
  try {
    const response = await api.put(`/api/ad/modify/${id}`);
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
 