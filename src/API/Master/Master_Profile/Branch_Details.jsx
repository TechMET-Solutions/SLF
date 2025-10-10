import axios from "axios";
 // adjust path as needed
import { API } from "../../../api";
import { decryptData, encryptData } from "../../../utils/cryptoHelper";


// ✅ Fetch branches API function
export const fetchBranchesApi = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${API}/Master/Master_Profile/get_Branches`, {
      params: { page, limit },
    });

    const decrypted = decryptData(res.data.data);

    if (!decrypted) {
      console.warn("Decryption failed or empty, returning empty array.");
      return { branches: [], total: 0 };
    }

    return decrypted;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

export const updateBranchStatusApi = async (id, status) => {
  try {
    const encryptedPayload = encryptData({ id, status });

    const res = await axios.post(
      `${API}/Master/Master_Profile/update_Branch_Status`,
      { data: encryptedPayload }
    );

    const decrypted = decryptData(res.data.data);
    return decrypted;
  } catch (error) {
    console.error("Error updating branch status:", error);
    throw error;
  }
};

export const updateBranchApi = async (branchData) => {
    debugger
  try {
    const encrypted = encryptData(branchData);
    const res = await axios.post(`${API}/Master/Master_Profile/update_Branch`, {
      data: encrypted,
    });

    const decrypted = decryptData(res.data.data);
    return decrypted;
  } catch (error) {
    console.error("Error updating branch:", error);
    throw error;
  }
};