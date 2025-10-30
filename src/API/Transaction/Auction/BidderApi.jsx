import axios from "axios";
import { API } from "../../../api"; // Base URL from .env

// 👇 Base route for your backend APIs
const API_BASE = `${API}/Auction`;

// 🔹 Fetch all bidders
export const fetchBidderApi = async () => {
  try {
    const response = await axios.get(`${API_BASE}/all-bidders`);
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching bidders:", error);
    throw error.response?.data || {
      message: 'Failed to fetch bidders',
      error: error.message
    };
  }
};

// 🔹 Register new bidder
export const registerBidderApi = async (formData) => {
  try {
    // ⚠️ formData must be FormData() (with files & text fields)
    const response = await axios.post(`${API_BASE}/register-bidder`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error registering bidder:", error);
    throw error.response?.data || error;
  }
};

// 🔹 Update existing bidder
export const updateBidderApi = async (id, formData) => {
  try {
    const response = await axios.put(`${API_BASE}/updateBidder/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating bidder:", error);
    throw error.response?.data || error;
  }
};

// 🔹 View single bidder by ID
export const viewBidderApi = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/view-bidder/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error viewing bidder:", error);
    throw error.response?.data || error;
  }
};
