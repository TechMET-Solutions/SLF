import axios from "axios";
import { encryptData, decryptData } from "../../../utils/cryptoHelper";
import { API } from "../../../api";

const API_BASE = `${API}/Master/Employee_Profile`;

// 🔹 Fetch All Designations (with Pagination)
export const fetchDesignationProfileApi = async (page = 1, limit = 10) => {
  try {
    // No sensitive payload needed, but encrypt an empty object for consistency
    const encryptedPayload = encryptData(JSON.stringify({}));

    const response = await axios.get(`${API_BASE}/get-designations?page=${page}&limit=${limit}`, {
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedPayload }, // though GET doesn’t use body, some servers allow it
    });

    if (response.data?.data) {
      return JSON.parse(decryptData(response.data.data));
    }

    return { designations: [], total: 0, page: 1, showPagination: false };
  } catch (error) {
    console.error("❌ Error fetching Designations:", error);
    return { designations: [], total: 0, page: 1, showPagination: false };
  }
};

// 🔹 Add New Designation
export const createDesignationApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(JSON.stringify(payload));

    const response = await axios.post(
      `${API_BASE}/create-designation`,
      { data: encryptedPayload },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data?.data) {
      return JSON.parse(decryptData(response.data.data));
    }
    return null;
  } catch (error) {
    console.error("❌ Error adding Designation:", error);
    throw error;
  }
};

// 🔹 Update Existing Designation
export const updateDesignationApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(JSON.stringify(payload));

    const response = await axios.put(
      `${API_BASE}/update-designation`,
      { data: encryptedPayload },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data?.data) {
      return JSON.parse(decryptData(response.data.data));
    }
    return null;
  } catch (error) {
    console.error("❌ Error updating Designation:", error);
    throw error;
  }
};

// 🔹 Delete Designation (Soft delete by default)
export const deleteDesignationApi = async (id, permanent = false) => {
  try {
    const encryptedPayload = encryptData(JSON.stringify({ id, permanent }));

    const response = await axios.delete(`${API_BASE}/delete-designation`, {
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedPayload },
    });

    if (response.data?.data) {
      return JSON.parse(decryptData(response.data.data));
    }
    return null;
  } catch (error) {
    console.error("❌ Error deleting Designation:", error);
    throw error;
  }
};
