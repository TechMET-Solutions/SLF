import axios from "axios";
import { API } from "../../../api";
import { decryptData, encryptData } from "../../../utils/cryptoHelper";

const API_BASE = `${API}/Master/User-Management`;

// 🔹 Fetch All roles Profiles with Pagination
// export const fetchRolesApi = async (page = 1, limit = 10) => {
//   try {
//     const encryptedPayload = encryptData({});
//     const response = await axios({
//       method: "get",
//       url: `${API_BASE}/getAll-roles?page=${page}&limit=${limit}`,
//       headers: { "Content-Type": "application/json" },
//       data: { data: encryptedPayload },
//     });

//     if (response.data?.data) {
//       return decryptData(response.data.data);
//     }

//     return { items: [], total: 0, page: 1, showPagination: false };
//   } catch (error) {
//     console.error("❌ Error fetching roles profiles:", error);
//     return { items: [], total: 0, page: 1, showPagination: false };
//   }
// };
export const fetchRolesApi = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE}/getAll-roles?page=${page}&limit=${limit}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // ✅ Direct JSON response (no decrypt)
    return response.data;

  } catch (error) {
    console.error("❌ Error fetching roles:", error);

    return {
      roles: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }
};
export const updateRolesStatusApi = async (id, is_active) => {
  try {
    const encryptedPayload = encryptData({ id, is_active });
    return await axios.put(
      `${API_BASE}/update-roles`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error updating roles status:", error);
    throw error;
  }
};

// 🔹 Add New roles
export const addRolesApi = async (formData) => {
  const res = await fetch(`${API_BASE}/add-roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  // ✅ Throw error for 400/500 responses
  if (!res.ok) {
    throw {
      response: {
        data: data,
      },
    };
  }

  return data;
};

// 🔹 Update Existing roles
export const updateRolesApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.put(
      `${API_BASE}/update-roles`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error updating Roles:", error);
    throw error;
  }
};
