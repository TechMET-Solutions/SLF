import axios from "axios";
import { API } from "../../../api";
import { decryptData, encryptData } from "../../../utils/cryptoHelper";

const API_BASE = `${API}/Master/Master_Profile`;

// 🔹 Fetch All Purity Profiles with Pagination
export const fetchPuritiesApi = async (page = 1, limit = 10) => {
  try {
    const encryptedPayload = encryptData({});
    const response = await axios({
      method: "get",
      url: `${API_BASE}/get-purity?page=${page}&limit=${limit}`,
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedPayload },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }
    return { items: [], total: 0, page: 1, showPagination: false };
  } catch (error) {
    console.error("❌ Error fetching purity profiles:", error);
    return { items: [], total: 0, page: 1, showPagination: false };
  }
};

// 🔹 Add New Purity
export const addPurityApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.post(
      `${API_BASE}/add-purity`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error adding purity:", error);
    throw error;
  }
};

// 🔹 Update Existing Purity
export const updatePurityApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.put(
      `${API_BASE}/update-purity`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error updating purity:", error);
    throw error;
  }
};

// 🔹 Change Purity Status (Active / Inactive)
export const updatePurityStatusApi = async (id, status) => {
  try {
    const encryptedPayload = encryptData({ id, status });
    return await axios.put(
      `${API_BASE}/update-purity`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error updating purity status:", error);
    throw error;
  }
};

// 🔹 Delete Purity
export const deletePurityApi = async (id) => {
  try {
    const encryptedPayload = encryptData({ id });
    return await axios.post(
      `${API_BASE}/delete-purity`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error deleting purity:", error);
    throw error;
  }
};
export const deletePurityApiSilver = async (id) => {
  try {
    const encryptedPayload = encryptData({ id });
    return await axios.post(
      `${API_BASE}/delete-purity-silver`,
      { data: encryptedPayload },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Error deleting purity:", error);
    throw error;
  }
};
