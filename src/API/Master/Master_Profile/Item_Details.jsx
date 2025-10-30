// src/API/Master/Master_Profile/Item_Details.js
import axios from "axios";
import { encryptData, decryptData } from "../../../utils/cryptoHelper";
import { API } from "../../../api";

const API_BASE = `${API}/Master/Master_Profile`;

// 🔹 Fetch All Items
export const fetchItemsApi = async () => {
  try {
    const encryptedPayload = encryptData({});
    const response = await axios({
      method: "get",
      url: `${API_BASE}/all_Item`,
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedPayload },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }
    return [];
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    return [];
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
