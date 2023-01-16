import { axiosinstance  as api } from "../api/apiHelpers"; 

/** 
 * Api Services for ChatText
 * 
 * as the names are descriptive 
 * the service/functions are for 
 * create,update,get all ,get byid and delete for ChatText and ChatTextList.
*/

export const createChatTextList = async (formdata) => {
    try {
      const response = await api.post("/api/chat/create-chattext-list/", formdata);
  
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

export const fetchChatTextList = async () => {
    try {
      const response = await api.get("/api/chat/chat-text");
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
 

  export const fetchChatTextListByID = async (id) => {
    try {
      const response = await api.get(`/api/chat/chat-text/${id}`);
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

 
export const deleteChatTextList = async (id) => {
    try {
      const response = await api.delete(`/api/chat/delete-chattext-list/${id}`);
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


  
export const updateChattextList = async (id,formData) => {
  try {
    const response = await api.put(`/api/chat/update-chattext-list/${id}`,formData);
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

export const updateChatText = async (formData) => {
  try {
    const response = await api.put("/api/chat/update-chattext", formData);
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

export const addChatTextToList = async (id,formData) => {
  try {
    const response = await api.post(`/api/chat/add-chattext/${id}`, formData);
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

export const deleteChatText = async (id) => {
  try {
    const response = await api.delete(`/api/chat/delete-chattext/${id}`);
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

 