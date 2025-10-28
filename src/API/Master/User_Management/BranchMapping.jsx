import axios from "axios";
import { encryptData, decryptData } from "../../../utils/cryptoHelper";
import { API } from "../../../api";

const API_BASE = `${API}/Master/Employee_Profile`;



export const getAssignBranchApi = async (id) => {
  const res = await axios.get(`${API_BASE}/assign-branch/${id}`);
  return decryptData(res.data.data);
};

// 🔹 Update assigned branches
export const updateAssignBranchApi = async (payload) => {
  const encryptedPayload = encryptData(payload);
  const res = await axios.patch(`${API_BASE}/assign-branch`, { data: encryptedPayload });
  return decryptData(res.data.data);
};