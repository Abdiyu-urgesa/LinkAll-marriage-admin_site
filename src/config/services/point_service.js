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
  
  export const createCreditPackage = async (formdata) => {
    try {
      const response = await api.post("/api/credit/create", formdata);
  
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

export const fetchPoints = async () => {
    try {
      const response = await api.get("/api/points/all");
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

  export const fetchCreditPackages = async () => {
    try {
      const response = await api.get("/api/credit/all");
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

export const deletePoint = async (point_id) => {
    try {
      const response = await api.delete(`/api/points/delete/${point_id}`);
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


  export const deleteCreditPackage = async (id) => {
    try {
      const response = await api.delete(`/api/credit/delete/${id}`);
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
  
export const updatePointAmount = async (point,point_id) => {
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

export const updateCreditPackage = async (formData,id) => {
  try {
    const response = await api.put(`/api/credit/update/${id}`, formData);
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