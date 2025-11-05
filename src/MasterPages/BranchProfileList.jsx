 

 const [activeEmployees, setActiveEmployees] = useState([]);
console.log(activeEmployees,"activeEmployees")

 const getActiveEmp = async () => {
  try {
    const res = await axios.get(`${API}/Master/getActiveEmployees`);
    const decrypted = decryptData(res.data.data); // no JSON.parse
    console.log(decrypted);
    setActiveEmployees(decrypted);
  } catch (error) {
    console.log(error);
  }
};


import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { fetchBranchesApi, updateBranchApi, updateBranchStatusApi } from "../API/Master/Master_Profile/Branch_Details";
import Loader from "../Component/Loader";
import Pagination from "../Component/Pagination";
import { decryptData, encryptData } from "../utils/cryptoHelper";
import { formatIndianDate } from "../utils/Helpers";

const BranchProfileList = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);


  const [branchData, setBranchData] = useState({
    branch_code: "",
    branch_name: "",
    print_name: "",
    address_line1: "",
    // address_line3: "",
    mobile_no: "",
    lead_person: "",
    is_main: false,
    status: false,
  });
  console.log(branchData, "branchData")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;
const [activeEmployees, setActiveEmployees] = useState([]);
console.log(activeEmployees,"activeEmployees")
  useEffect(() => {
  getActiveEmp();
}, []);

;

useEffect(() => {
  getActiveEmp();
}, []);

 const getActiveEmp = async () => {
  try {
    const res = await axios.get(`${API}/Master/getActiveEmployees`);
    const decrypted = decryptData(res.data.data); // no JSON.parse
    console.log(decrypted);
    setActiveEmployees(decrypted);
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBranchData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
  const {
    branch_code,
    branch_name,
    print_name,
    address_line1,
    mobile_no,
    lead_person, // optional
  } = branchData;

  // Individual field validation
  if (!branch_code.trim()) {
    alert("Branch Code is required.");
    return;
  }

  if (!branch_name.trim()) {
    alert("Branch Name is required.");
    return;
  }

  if (!print_name.trim()) {
    alert("Print Name is required.");
    return;
  }

  if (!address_line1.trim()) {
    alert("Address Line 1 is required.");
    return;
  }

 if (!mobile_no.trim()) {
  alert("Mobile Number is required.");
  return;
}

// Check if mobile number is exactly 10 digits
const mobileRegex = /^[0-9]{10}$/;
if (!mobileRegex.test(mobile_no)) {
  alert("Mobile Number must be a valid 10-digit number.");
  return;
}

  setIsLoading(true);

  try {
    const encrypted = encryptData({
      ...branchData,
      id: editBranchId, // include id when editing
    });

    const url = isEditMode
      ? `${API}/Master/Master_Profile/update_Branch`
      : `${API}/Master/Master_Profile/add_Branch`;

    await axios.post(url, { data: encrypted });

    setIsModalOpen(false);
    setIsEditMode(false);
    setBranchData({
      branch_code: "",
      branch_name: "",
      print_name: "",
      address_line1: "",
      mobile_no: "",
      lead_person: "",
      is_main: false,
      status: false,
    });
    fetchBranches();
  } catch (error) {
    console.error(error);
    alert(isEditMode ? "Error updating branch" : "Error saving branch");
  } finally {
    setIsLoading(false);
  }
};


  const [branches, setBranches] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editBranchId, setEditBranchId] = useState(null);
  console.log(branches, "branches")
  const fetchBranches = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await fetchBranchesApi(page, recordsPerPage);
      setBranches(data.branches);
      setTotalRecords(data.total);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches(currentPage);
  }, [currentPage]);


  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page); // this will trigger useEffect to fetch
  };

  const handleView = (branch) => {
    setBranchData({
      branch_code: branch.branch_code || "",
      branch_name: branch.branch_name || "",
      print_name: branch.print_name || "",
      address_line1: branch.address_line1 || "",
      // address_line3: branch.address_line3 || "",
      mobile_no: branch.mobile_no || "",
      lead_person: branch.lead_person || "",
      is_main: branch.is_main === "1" || branch.is_main === true,
      status: branch.status === "1" || branch.status === true,
    });
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "1" ? "0" : "1";

      // 🔹 Use separated API function
      const response = await updateBranchStatusApi(id, newStatus);
      console.log("Status updated:", response);

      // Refresh branch list
      fetchBranches();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating branch status");
    }
  };

  const handleEdit = (branch) => {
    setBranchData({
      branch_code: branch.branch_code || "",
      branch_name: branch.branch_name || "",
      print_name: branch.print_name || "",
      address_line1: branch.address_line1 || "",
      // address_line3: branch.address_line3 || "",
      mobile_no: branch.mobile_no || "",
      lead_person: branch.lead_person || "",
      is_main: branch.is_main === "1" || branch.is_main === true,
      status: branch.status === "1" || branch.status === true,
    });

    setEditBranchId(branch.id); // or branch._id depending on your backend
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateBranch = async () => {
    try {
      const payload = {
        id: editBranchId,  // ✅ using the stored id
        ...branchData,
      };

      const response = await updateBranchApi(payload);
      console.log("✅ Branch updated:", response);

      alert("Branch updated successfully!");
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditBranchId(null);
      fetchBranches(); // refresh list
    } catch (error) {
      console.error("Error updating branch:", error);
      alert("Failed to update branch");
    }
  };
  return (

    <>
      <div className=" w-full">
        {/* middletopbar */}
        <div className="flex justify-center">
          <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around">
            <h2
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 700, // Bold
                fontSize: "20px",
                lineHeight: "148%",
                letterSpacing: "0em",
              }}
              className="text-red-600"
            >
              Branch Profile List
            </h2>

            <div className="flex gap-3">
              <div className="flex gap-5 items-center">
                <p
                  style={{
                    fontFamily: "Source Sans 3, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "11.25px",
                    lineHeight: "15px",
                    letterSpacing: "0em",
                  }}
                >
                  Code
                </p>

                <input
                  type="text"

                  style={{
                    width: "168.64px",
                    height: "27.49px",
                    borderRadius: "5px",
                    borderWidth: "0.62px",
                  }}
                  className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
                />

              </div>

              <div className="flex gap-5 items-center">
                <p
                  style={{
                    fontFamily: "Source Sans 3, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "11.25px",
                    lineHeight: "15px",
                    letterSpacing: "0em",
                  }}
                >
                  Name
                </p>

                <input
                  type="text"

                  style={{
                    width: "168.64px",
                    height: "27.49px",
                    borderRadius: "5px",
                    borderWidth: "0.62px",
                  }}
                  className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
                />
                <button
                  style={{
                    width: "84.36px",
                    height: "26.87px",
                    borderRadius: "5px",
                  }}
                  className="bg-[#0b2c69] cursor-pointer text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                >
                  Search
                </button>

              </div>
              <div className="flex justify-center cursor-pointer item-center gap-5">
                <button
                  style={{
                    width: "74px",
                    height: "24px",
                    borderRadius: "3.75px",

                    gap: "6.25px",
                  }}
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                >
                  Add
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="text-white px-[6.25px] cursor-pointer  py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                >
                  Exit
                </button>

              </div>

            </div>
          </div>
        </div>

        {/* modelforAdd */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              background: "#0101017A",
              backdropFilter: "blur(6.8px)",
            }}
          >
            <div className="bg-white w-[752px] rounded-lg shadow-lg p-5">
              {/* Modal Header */}
              <h2
                className="text-[#0A2478] mb-6"
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
              >
                {isEditMode ? "Edit Branch Details" : "Add Branch Details"}
              </h2>

              {/* Modal Body */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[14px]">Code <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="branch_code"
                    value={branchData.branch_code}
                    onChange={handleChange}
                    placeholder="Branch Code"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-[14px]">Branch Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="branch_name"
                    value={branchData.branch_name}
                    onChange={handleChange}
                    placeholder="Branch Name"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-[14px]">Print Name<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="print_name"
                    value={branchData.print_name}
                    onChange={handleChange}
                    placeholder="Print Name"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-[14px]">Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="address_line1"
                    value={branchData.address_line1}
                    onChange={handleChange}
                    placeholder="Address Line 1"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>

                
                <div>
                  <label className="text-[14px]">Mobile No<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="mobile_no"
                    value={branchData.mobile_no}
                    onChange={handleChange}
                    placeholder="+91 8456645752"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>
<div>
  <label className="text-[14px]">Lead Person</label>
  <select
    name="lead_person"
    value={branchData.lead_person}
    onChange={handleChange}
    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
  >
    <option value="">Select Lead Person</option>

    {activeEmployees.map((emp) => (
      <option key={emp.id} value={emp.id}>
        {emp.emp_name}
      </option>
    ))}
  </select>
</div>



  

               
                  </div>
          
 <div className="flex justify-center items-center mt-4 gap-2">
  <input
    type="checkbox"
    name="is_main"
    checked={branchData.is_main}
    onChange={handleChange}
    className="w-4 h-4 accent-blue-900"
  />
  <label className="text-[14px]">Is Main </label>
</div>
             <div className="flex justify-center gap-4 mt-6">
                {!isViewMode && (
                  isEditMode ? (
                    <button
                      onClick={handleUpdateBranch}
                      className="bg-[#0A2478] text-white cursor-pointer px-4 py-2 rounded-md"
                    >
                      Update Branch
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded-md"
                    >
                      Add Branch
                    </button>
                  )
                )}
                <button
                  className="bg-[#C1121F] text-white cursor-pointer px-5 py-2 rounded"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setIsViewMode(false);
                    setBranchData({
                      branch_code: "",
                      branch_name: "",
                      print_name: "",
                      address_line1: "",
                      // address_line3: "",
                      mobile_no: "",
                      lead_person: "",
                      is_main: false,
                      status: false,
                    });
                  }}
                >
                  {isViewMode ? "Close" : "Exit"}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex justify-center">
          <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Code</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Name</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]"> Branch Address</th>

                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Phone</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Lead</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added on</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Action</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Active</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {branches.map((row, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-4 py-2">{row.branch_code}</td>
                    <td className="px-4 py-2">{row.branch_name}</td>
                    <td className="px-4 py-2">{row.address_line1}</td>
                    <td className="px-4 py-2">{row.mobile_no}</td>
                    <td className="px-4 py-2">{row.lead_person}</td>
                    <td className="px-4 py-2">{formatIndianDate(row.created_at)}</td>

                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <div className="flex gap-2 justify-center">
                        <button
                          disabled={isViewMode}
                          className="bg-green-500 p-1.5 text-white rounded cursor-pointer"
                          onClick={() => handleEdit(row)}
                        title="Edit">
                          <FiEdit className="text-white text-sm" />
                        </button>
                        <button
                          className="bg-[#646AD9] p-1.5 text-white rounded cursor-pointer"
                          onClick={() => handleView(row)}      title="view"                   >
                          <FiEye className="text-white text-sm" />
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <button
                        onClick={() => handleToggleStatus(row.id, row.status)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${row.status === "1" ? "bg-[#0A2478]" : "bg-gray-300"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${row.status === "1" ? "translate-x-6" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>



      <div className=" w-full relative">
        {isLoading && <Loader />}
      </div></>

  );
};

export default BranchProfileList;
