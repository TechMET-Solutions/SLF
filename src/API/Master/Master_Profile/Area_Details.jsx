// src/API/Master/Master_Profile/Area_Details.js
import axios from "axios";
import { API } from "../../../api";
import { encryptData } from "../../../utils/cryptoHelper";

const API_BASE = `${API}/Master/Master_Profile`;

// 🔹 Fetch All Areas with Pagination
// export const fetchAreasApi = async (page = 1, limit = 10) => {
//   try {
//     const response = await axios.get(
//       `${API_BASE}/get-area?page=${page}&limit=${limit}`,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     if (response.data?.data) {
//       return decryptData(response.data.data);
//     }
//     return { items: [], total: 0, showPagination: false };
//   } catch (error) {
//     console.error("❌ Error fetching areas:", error);
//     return { items: [], total: 0, showPagination: false };
//   }
// };
export const fetchAreasApi = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE}/get-area?page=${page}&limit=${limit}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    // Directly return the data from the response
    return response.data || { items: [], total: 0, showPagination: false };
  } catch (error) {
    console.error("❌ Error fetching areas:", error);
    return { items: [], total: 0, showPagination: false };
  }
};
// 🔹 Add New Area
export const addAreaApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.post(
      `${API_BASE}/add-area`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error adding area:", error);
    throw error;
  }
};

// 🔹 Update Existing Area
export const updateAreaApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.put(
      `${API_BASE}/update-area`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error updating area:", error);
    throw error;
  }
};

// 🔹 Delete Area
export const deleteAreaApi = async (id) => {
  try {
    const encryptedPayload = encryptData({ id });
    return await axios.post(
      `${API_BASE}/delete-area`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error deleting area:", error);
    throw error;
  }
};
