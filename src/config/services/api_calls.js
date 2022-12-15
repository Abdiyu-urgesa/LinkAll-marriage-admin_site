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

export const fetchPosts = async () => {
  try {
    const response = await api.get("/api/post/get");
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
export const create_post = async (formdata) => {
  try {
    const response = await api.post("/api/post/create", formdata);

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
export const delete_post = async (post_id) => {
  try {
    const response = await api.delete(`/api/post/delete/${post_id}`);
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

export const get_catagory = async () => {
  try {
    const response = await api.get("/api/post/get-category");
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

export const create_catagory = async (catag_en, catag_am) => {
  try {
    const response = await api.post("/api/post/create-category", {
      category: catag_en,
      category_am: catag_am,
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
export const delete_catagory = async (catagory_id) => {
  try {
    const response = await api.delete(
      `/api/post/delete-category/${catagory_id}`
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

export const update_catagory = async (catag_en, catag_am, catagory_id) => {
  try {
    const response = await api.put(`/api/post/update-category/${catagory_id}`, {
      category: catag_en,
      category_am: catag_am,
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

export const get_tags = async () => {
  try {
    const response = await api.get("/api/post/get-tags");
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
export const delete_tag = async (tag_id) => {
  try {
    const response = await api.delete(`/api/post/delete-tag/${tag_id}`);
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

export const update_tag = async (Tag_name, tag_id) => {
  try {
    const response = await api.put(`/api/post/update-tag/${tag_id}`, {
      tag_name: Tag_name,
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

export const create_tag = async (Tag_name) => {
  try {
    const response = await api.post("/api/post/create-tag", {
      tag_name: Tag_name,
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
