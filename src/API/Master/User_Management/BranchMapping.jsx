import axios from "axios";
import { API } from "../../../api";
import { decryptData } from "../../../utils/cryptoHelper";

const API_BASE = `${API}/Master/Employee_Profile`;

export const getAssignBranchApi = async (id) => {
  const res = await axios.get(`${API_BASE}/assign-branch/${id}`);
  return decryptData(res.data.data);
};

// 🔹 Update assigned branches
export const updateAssignBranchApi = async (payload) => {
  const res = await axios.patch(
    `${API}Master/Employee_Profile/Update_assign_branch`,
    payload,
  );
  return res.data;
};
