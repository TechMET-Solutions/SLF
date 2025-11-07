// src/API/Master/Master_Profile/Item_Details.js
import axios from "axios";
import { encryptData, decryptData } from "../../../utils/cryptoHelper";
import { API } from "../../../api";

const API_BASE = `${API}/Master/Master_Profile`;

// 🔹 Fetch All or Searched Items with Pagination
export const fetchItemsApi = async (search = "", page = 1, limit = 10) => {
  try {
    // 🔒 Encrypt request payload (if needed)
    const encryptedPayload = encryptData({ search, page, limit });

    // ⚡ Send request with query parameters
    const response = await axios({
      method: "get",
      url: `${API_BASE}/all_Item`,
      headers: { "Content-Type": "application/json" },
      params: { search, page, limit }, // ✅ pass search & pagination
      data: { data: encryptedPayload },
    });

    // 🔓 Decrypt the backend response
    if (response.data?.data) {
      const decryptedData = decryptData(response.data.data);
      return decryptedData;
    }

    return { items: [], total: 0, page: 1, limit: 10, showPagination: false };
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    return { items: [], total: 0, page: 1, limit: 10, showPagination: false };
  }
};


// 🔹 Add New Item
export const addItemApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.post(`${API_BASE}/add_Item`, { data: encryptedPayload }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error adding item:", error);
    throw error;
  }
};

// 🔹 Update Existing Item
export const updateItemApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.put(`${API_BASE}/update_Item`, { data: encryptedPayload }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error updating item:", error);
    throw error;
  }
};

// 🔹 Change Item Status (Active / Inactive)
export const updateItemStatusApi = async (id, status) => {
  try {
    const encryptedPayload = encryptData({ id, status });
    return await axios.put(
      `${API_BASE}/edit_Item_Status`,
      { data: encryptedPayload }, // ✅ must be passed here as 2nd arg
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error updating item status:", error);
    throw error;
  }
};
