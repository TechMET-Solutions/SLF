import axios from "axios";
import { encryptData, decryptData } from "../../../utils/cryptoHelper";
import { API } from "../../../api";

const API_BASE = `${API}/Master/Employee_Profile`;

// 🔹 Fetch All employee Profiles with Pagination
export const fetchEmployeeProfileApi = async (page = 1, limit = 10) => {
  try {
    const encryptedPayload = encryptData({});
    const response = await axios({
      method: "get",
      url: `${API_BASE}/getAll-employees?page=${page}&limit=${limit}`,
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedPayload },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }
    console.log(response.data)
    return { items: [], total: 0, page: 1, showPagination: false };
  } catch (error) {
    console.error("❌ Error fetching employee profiles:", error);
    return { items: [], total: 0, page: 1, showPagination: false };
  }
};

// 🔹 Add New employee
export const createEmployeeApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.post(`${API_BASE}/add-employee`, { data: encryptedPayload }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error adding employee:", error);
    throw error;
  }
};

// 🔹 Update Existing Employee
export const updateEmployeeApi = async (payload) => {
  try {
    const encryptedPayload = encryptData(payload);
    return await axios.put(`${API_BASE}/update-employee`, { data: encryptedPayload }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    throw error;
  }
};

// 🔹 Change Employee Status (Active / Inactive)
export const updateEmployeeStatusApi = async (id, status) => {
  // debugger
  try {
    const encryptedPayload = encryptData({ id, status });
    return await axios.put(`${API_BASE}/update-employee`, { data: encryptedPayload }, {
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error updating employee status:", error);
    throw error;
  }
};

// 🔹 Delete Employee
export const deleteEmployeeApi = async (id) => {
  try {
    const encryptedPayload = encryptData({ id });
    return await axios.post(`${API_BASE}/delete-employee`, { data: encryptedPayload }, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error deleting Employee:", error);
    throw error;
  }
};