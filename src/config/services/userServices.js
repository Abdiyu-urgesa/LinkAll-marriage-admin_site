import { axiosinstance  as api } from "../api/apiHelpers";

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
      return { success: false, data: null, error: err.response.data.message };
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
export const update_user = async (values, USERID) => {
  try {
    const response = await api.put(`/api/auth-admin/admin/update/${USERID}`, {
      user_type: values.role,
      age: values.age,
      phone_number: values.phone,
      code_name: values.code_name,
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

export const delete_user = async (USERID) => {
  try {
    const response = await api.delete(`/api/auth-admin/admin/delete/${USERID}`);
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

export const deactivate_user = async (USERID) => {
  try {
    const response = await api.put(
      `/api/auth-admin/admin/deactivate/${USERID}`
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

export const create_admin = async (name, phone, age, role) => {
  try {
    const response = await api.post("/api/auth-admin/create", {
      code_name: name,
      phone_number: phone,
      age: age,
      user_type: role,
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
