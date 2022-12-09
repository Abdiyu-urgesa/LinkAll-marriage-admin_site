import api from "../api/api";

export const login_with_otp = async (phone) => {
  try {
    const response = await api.post("/api/auth-admin/login", {
      phone_number: phone,
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

export const verify_account = async (OTP, USERID) => {
  try {
    const response = await api.post("/api/auth-admin/verify-otp", {
      otp: OTP,
      user_id: USERID,
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

export const get_all_users = async () => {
  try {
    const response = await api.get("/api/auth-admin/all");
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

export const get_all_business_users = async () => {
  try {
    const response = await api.get("/api/auth-admin/users/BUSSINES_ACCOUNT");
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

export const get_all_admin_users = async () => {
  try {
    const response = await api.get("/api/auth-admin/users/ADMIN");
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

export const get_user_byid = async (user_id) => {
  try {
    const response = await api.get(`/api/auth-admin/${user_id}`);
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
export const update_user = async (role, USERID) => {
  try {
    const response = await api.put(`/api/auth-admin/admin/update/${USERID}`, {
      user_type: role,
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

export const get_dropdown_byname = async (dropdown_id) => {
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
