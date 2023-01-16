import { axiosinstance  as api } from "../api/apiHelpers";

/** 
 * Api Services for Point Charge Amount Apis
 * 
 * as the names are descriptive 
 * the service fundctions are for 
 * create,update,get all ,get byid and delete for Charge Amounts.
 * 

*/

export const createActivityTarrif = async (formdata) => {
    try {
      const response = await api.post("/api/points/create-charge-fee/", formdata);
  
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
  
export const fetchActivityTarrifs = async () => {
    try {
      const response = await api.get("/api/points/all-charge-fees/");
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

  export const fetchActivityTarrif = async (id) => {
    try {
      const response = await api.get(`/api/points/get-charge-fee/${id}`);
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

export const deleteActivityTarrif = async (id) => {
    try {
      const response = await api.delete(`/api/points/delete-charge-fee/${id}`);
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
  
export const updateActivityTarrif = async (formData,id) => {
  try {
    const response = await api.put(`/api/points/update-charge-fee/${id}`, formData);
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
 