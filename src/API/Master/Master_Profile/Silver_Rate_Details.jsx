import axios from "axios";
import { encryptData, decryptData } from "../../../utils/cryptoHelper";
import { API } from "../../../api";

const API_BASE = `${API}/Master/Master_Profile`;

// 🔹 Fetch Gold Rates with Pagination
export const fetchSilverRatesApi = async (page = 1, limit = 10) => {
  try {
    const encryptedPayload = encryptData({});
    const response = await axios({
      method: "get",
      url: `${API_BASE}/get_silver_rate_list?page=${page}&limit=${limit}`,
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedPayload },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }
    return { items: [], total: 0, page: 1, showPagination: false };
  } catch (error) {
    console.error("❌ Error fetching gold rates:", error);
    return { items: [], total: 0, page: 1, showPagination: false };
  }
};

// 🔹 Add New Gold Rate
export const addSilverRateApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.post(`${API_BASE}/silver_rate`, { data: encryptedPayload }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error adding gold rate:", error);
    throw error;
  }
};