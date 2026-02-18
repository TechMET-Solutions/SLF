import axios from "axios";
 // adjust path as needed
import { API } from "../../../api";
import { decryptData, encryptData } from "../../../utils/cryptoHelper";


// ✅ Fetch branches API function (with search support)
export const fetchBranchesApi = async (page = 1, limit = 10, search = "") => {
  try {
    const res = await axios.get(`${API}/Master/Master_Profile/get_Branches`, {
      params: { page, limit, search },
    });

    // Based on your response JSON:
    const { success, branches, total } = res.data;

    if (!success) {
      console.warn("API reported success: false");
      return { branches: [], total: 0, page, limit };
    }

    // Return the object your frontend expects
    return { 
      branches: branches || [], 
      total: total || 0, 
      page, 
      limit 
    };

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