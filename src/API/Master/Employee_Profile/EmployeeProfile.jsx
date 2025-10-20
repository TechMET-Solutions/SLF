// import axios from "axios";
// import { encryptData, decryptData } from "../../../utils/cryptoHelper";
// import { API } from "../../../api";

// const API_BASE_URL = `${API}/Master/Employee_Profile`;

// // 🔹 Get all employees with pagination
// export const fetchEmployeeProfileApi = async (page = 1, limit = 10) => {
//   try {
//     const encryptedPayload = encryptData({});
//     const response = await axios({
//       method: "get",
//       url: `${API_BASE_URL}/getAll-employees?page=${page}&limit=${limit}`,
//       headers: { "Content-Type": "application/json" },
//       data: { data: encryptedPayload },
//     });

//     if (response.data?.data) {
//       return decryptData(response.data.data);
//     }
//     return { items: [], total: 0, page: 1, showPagination: false };
//   } catch (error) {
//     console.error("❌ Error fetching purity profiles:", error);
//     return { items: [], total: 0, page: 1, showPagination: false };
//   }
// };

// // 🔹 Get employee by ID
// export const getEmployeeByIdApi = async (id) => {
//   try {
//     if (!id) {
//       throw new Error("Employee ID is required");
//     }

//     const response = await api.get(`/employees/${id}`);

//     if (response.data && response.data.data) {
//       const decryptedData = JSON.parse(decryptData(response.data.data));
//       return decryptedData;
//     } else {
//       throw new Error("Invalid response format");
//     }
//   } catch (error) {
//     console.error("❌ Error fetching employee:", error);

//     if (error.response?.status === 404) {
//       throw new Error("Employee not found");
//     } else if (error.response?.data?.message) {
//       throw new Error(error.response.data.message);
//     } else {
//       throw new Error("Failed to fetch employee details");
//     }
//   }
// };

// // 🔹 Create new employee
// export const createEmployeeApi = async (employeeData) => {
//   debugger
//   try {
//     // Validate required fields
//     const requiredFields = [
//       'pan_card', 'aadhar_card', 'emp_name', 'emp_id', 'mobile_no', 'email',
//       'print_name', 'corresponding_address', 'permanent_address', 'branch',
//       'joining_date', 'designation', 'date_of_birth', 'assign_role', 'password'
//     ];

//     const missingFields = requiredFields.filter(field => !employeeData[field]);
//     if (missingFields.length > 0) {
//       throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
//     }

//     // Encrypt the request data
//     const encryptedData = encryptData(JSON.stringify(employeeData));

//     const response = await axios({
//       method: "post",
//       url: `${API_BASE_URL}/add-employee`,
//       headers: { "Content-Type": "application/json" },
//       data: { data: encryptedPayload },
//     });

//     if (response.data && response.data.data) {
//       const decryptedResponse = JSON.parse(decryptData(response.data.data));
//       return decryptedResponse;
//     } else {
//       throw new Error("Invalid response format");
//     }
//   } catch (error) {
//     console.error("❌ Error creating employee:", error);

//     if (error.response?.status === 409) {
//       throw new Error(error.response.data.message || "Duplicate entry: Employee already exists");
//     } else if (error.response?.data?.message) {
//       throw new Error(error.response.data.message);
//     } else if (error.message.includes("Missing required fields")) {
//       throw error;
//     } else {
//       throw new Error("Failed to create employee");
//     }
//   }
// };

// // 🔹 Update employee
// export const updateEmployeeApi = async (employeeData) => {
//   try {
//     if (!employeeData.id) {
//       throw new Error("Employee ID is required for update");
//     }

//     // Encrypt the request data
//     const encryptedData = encryptData(JSON.stringify(employeeData));

//     const response = await axios.post(`${API_BASE_URL}/update-employee/${employeeData.id}`, { data: encryptedData }, {
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.data && response.data.data) {
//       const decryptedResponse = JSON.parse(decryptData(response.data.data));
//       return decryptedResponse;
//     } else {
//       throw new Error("Invalid response format");
//     }
//   } catch (error) {
//     console.error("❌ Error updating employee:", error);

//     if (error.response?.status === 404) {
//       throw new Error("Employee not found");
//     } else if (error.response?.status === 409) {
//       throw new Error(error.response.data.message || "Duplicate entry detected");
//     } else if (error.response?.data?.message) {
//       throw new Error(error.response.data.message);
//     } else {
//       throw new Error("Failed to update employee");
//     }
//   }
// };

// export const deleteEmployeeApi = async (id) => {
//   try {
//     const encryptedPayload = encryptData({ id });
//     return await axios.delete(`${API_BASE_URL}/delete-employee/${id}`, { data: encryptedPayload }, {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("❌ Error deleting Employee:", error);
//     throw error;
//   }
// };



// export default {
//   fetchEmployeeProfileApi,
//   getEmployeeByIdApi,
//   createEmployeeApi,
//   updateEmployeeApi,
//   deleteEmployeeApi,
//   };


import axios from "axios";
import { encryptData, decryptData } from "../../../utils/cryptoHelper";
import { API } from "../../../api";

const API_BASE_URL = `${API}/Master/Employee_Profile`;

// 🔹 Get all employees with pagination
export const fetchEmployeeProfileApi = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAll-employees?page=${page}&limit=${limit}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }

    return { items: [], total: 0, page: 1, showPagination: false };
  } catch (error) {
    console.error("❌ Error fetching employee profiles:", error);
    return { items: [], total: 0, page: 1, showPagination: false };
  }
};

// 🔹 Get employee by ID
export const getEmployeeByIdApi = async (id) => {
  try {
    if (!id) throw new Error("Employee ID is required");

    const response = await axios.get(`${API_BASE_URL}/employees/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("❌ Error fetching employee:", error);
    if (error.response?.status === 404) throw new Error("Employee not found");
    else if (error.response?.data?.message) throw new Error(error.response.data.message);
    else throw new Error("Failed to fetch employee details");
  }
};

// 🔹 Create new employee
export const createEmployeeApi = async (employeeData) => {
  try {
    const requiredFields = [
      'pan_card', 'aadhar_card', 'emp_name', 'emp_id', 'mobile_no', 'email',
      'print_name', 'corresponding_address', 'permanent_address', 'branch',
      'joining_date', 'designation', 'date_of_birth', 'assign_role', 'password'
    ];

    const missingFields = requiredFields.filter(field => !employeeData[field]);
    if (missingFields.length > 0) throw new Error(`Missing required fields: ${missingFields.join(', ')}`);

    const encryptedData = encryptData(JSON.stringify(employeeData));

    const response = await axios.post(`${API_BASE_URL}/add-employee`, { data: encryptedData }, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("❌ Error creating employee:", error);
    if (error.response?.status === 409) throw new Error(error.response.data.message || "Duplicate entry: Employee already exists");
    else if (error.response?.data?.message) throw new Error(error.response.data.message);
    else throw error.message.includes("Missing required fields") ? error : new Error("Failed to create employee");
  }
};

// 🔹 Update employee
export const updateEmployeeApi = async (employeeData) => {
  try {
    if (!employeeData.id) throw new Error("Employee ID is required for update");

    const encryptedData = encryptData(JSON.stringify(employeeData));

    const response = await axios.post(`${API_BASE_URL}/update-employee/${employeeData.id}`, { data: encryptedData }, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    if (error.response?.status === 404) throw new Error("Employee not found");
    else if (error.response?.status === 409) throw new Error(error.response.data.message || "Duplicate entry detected");
    else if (error.response?.data?.message) throw new Error(error.response.data.message);
    else throw new Error("Failed to update employee");
  }
};

// 🔹 Delete employee
export const deleteEmployeeApi = async (id) => {
  try {
    if (!id) throw new Error("Employee ID is required for deletion");

    const encryptedData = encryptData(JSON.stringify({ id }));

    const response = await axios.post(`${API_BASE_URL}/delete-employee/${id}`, {
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedData },
    });

    if (response.data?.data) {
      return decryptData(response.data.data);
    }

    throw new Error("Invalid response format");

  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    throw error;
  }
};

export default {
  fetchEmployeeProfileApi,
  getEmployeeByIdApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
};
