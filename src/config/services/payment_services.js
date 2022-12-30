import api from "../api/api";


export const create_point = async (formdata) => {
    try {
      const response = await api.post("/api/points/create", formdata);
  
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
  


export const fetchPaymentAccounts = async () => {
    try {
      const response = await api.get("/api/payment/all/");
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

  export const get_points_byid = async (point_id) => {
    try {
      const response = await api.get(`/api/points/get-point/${point_id}`);
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

export const delete_paymentAccount = async (accountId) => {
    try {
      const response = await api.delete(`/api/payment/delete/${accountId}`);
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

  
export const update_point = async (point,point_id) => {
  try {
    const response = await api.put(`/api/points/update/${point_id}`, {
      point: point
    });
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