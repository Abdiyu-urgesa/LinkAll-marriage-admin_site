import { axiosinstance  as api } from "../api/apiHelpers"; 

/** 
 * Api Services for Quizes
 * 
 * as the names are descriptive 
 * the service/functions are for 
 * create,update,get all ,get byid and delete for quize questions and answers.
*/

export const createQuize = async (formdata) => {
    try {
      const response = await api.post("/api/quize/create", formdata);
  
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

export const fetchQuizes = async () => {
    try {
      const response = await api.get("/api/quize/all");
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
 

  export const fetchQuizeById = async (id) => {
    try {
      const response = await api.get(`/api/quize/byid/${id}`);
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

 
export const deleteQuize = async (id) => {
    try {
      const response = await api.delete(`/api/quize/delete/${id}`);
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


  
export const updateQuize = async (id,formData) => {
  try {
    const response = await api.put(`/api/quize/update-quize/${id}`,formData);
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

export const updatePossibleAnswers = async (formData) => {
  try {
    const response = await api.put("/api/quize/update-answers", formData);
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

export const addPossibleAnswers = async (quizeId,formData) => {
  try {
    const response = await api.put(`/api/quize/add-answer/${quizeId}`, formData);
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

export const deletePossibleAnswer = async (id) => {
  try {
    const response = await api.delete(`/api/quize/delete-answer/${id}`);
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


export const fetchUserFeedBacks = async () => {
  try {
    const response = await api.get("/api/feedback/get-feedback");
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

export const fetchAbuseReports = async () => {
  try {
    const response = await api.get("/api/feedback/get-report");
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