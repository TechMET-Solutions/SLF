import axios from "axios";
import { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import {
  updateBranchApi,
  updateBranchStatusApi,
} from "../API/Master/Master_Profile/Branch_Details";
import Pagination from "../Component/Pagination";
import { decryptData, encryptData } from "../utils/cryptoHelper";
import { formatIndianDate } from "../utils/Helpers";

const BranchProfileList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");

  const [branchData, setBranchData] = useState({
    branch_code: "",
    branch_name: "",
    print_name: "",
    address_line1: "",
    pin_code: "",
    // address_line3: "",
    mobile_no: "",
    altmobile_no: "",
    lead_person: "",
    is_main: false,
    status: false,
    city: "",
    district: "",
    state: "",
  });
  console.log(branchData, "branchData");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;
  const [activeEmployees, setActiveEmployees] = useState([]);
  console.log(activeEmployees, "activeEmployees");
  useEffect(() => {
    getActiveEmp();
  }, []);

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

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    fetchBranches(1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBranchData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { loginUser } = useAuth();
  // const handleSave = async () => {
  //   const {
  //     branch_code,
  //     branch_name,
  //     print_name,
  //     address_line1,
  //     pin_code,
  //     mobile_no,
  //     city,
  //     district,
  //     state,
  //   } = branchData;

  //   // 🔹 Required Field Validation
  //   if (!branch_code.trim()) {
  //     alert("Branch Code is required.");
  //     return;
  //   }

  //   if (!branch_name.trim()) {
  //     alert("Branch Name is required.");
  //     return;
  //   }

  //   if (!print_name.trim()) {
  //     alert("Print Name is required.");
  //     return;
  //   }

  //   if (!address_line1.trim()) {
  //     alert("Address Line 1 is required.");
  //     return;
  //   }

  //   if (!pin_code.trim()) {
  //     alert("Pin Code is required.");
  //     return;
  //   }

  //   if (!city.trim()) {
  //     alert("City is required.");
  //     return;
  //   }

  //   if (!district.trim()) {
  //     alert("District is required.");
  //     return;
  //   }

  //   if (!state.trim()) {
  //     alert("State is required.");
  //     return;
  //   }

  //   if (!mobile_no.trim()) {
  //     alert("Mobile Number is required.");
  //     return;
  //   }

  //   // 🔹 Mobile Validation (Supports +91 or 10 digit)
  //   const mobileRegex = /^\+?[0-9]{10,13}$/;
  //   if (!mobileRegex.test(mobile_no)) {
  //     alert("Mobile Number must be valid (10–13 digits).");
  //     return;
  //   }

  //   // 🔹 Pin Code Validation (6 digit India)
  //   const pinRegex = /^[0-9]{6}$/;
  //   // if (!pinRegex.test(pin_code)) {
  //   //   alert("Pin Code must be 6 digits.");
  //   //   return;
  //   // }

  //   setIsLoading(true);

  //   try {
  //     const encrypted = encryptData({
  //       ...branchData,
  //       id: editBranchId,
  //     });

  //     const url = isEditMode
  //       ? `${API}/Master/Master_Profile/update_Branch`
  //       : `${API}/Master/Master_Profile/add_Branch`;

  //     await axios.post(url, { data: encrypted });

  //     alert(
  //       isEditMode
  //         ? "Branch Updated Successfully"
  //         : "Branch Added Successfully",
  //     );

  //     // 🔄 Reset Form Completely
  //     setBranchData({
  //       branch_code: "",
  //       branch_name: "",
  //       print_name: "",
  //       address_line1: "",
  //       pin_code: "",
  //       mobile_no: "",
  //       lead_person: "",
  //       is_main: false,
  //       status: false,
  //       city: "",
  //       district: "",
  //       state: "",
  //     });

  //     setIsModalOpen(false);
  //     setIsEditMode(false);
  //     fetchBranches();
  //   } catch (error) {
  //     console.error(error);
  //     alert(isEditMode ? "Error updating branch" : "Error saving branch");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSave = async () => {
    debugger;
    const payload = {
      ...branchData,
      id: editBranchId,
    };

    // ✅ Always send explicitly
    if (isEditMode) {
      payload.modified_by = loginUser;
    } else {
      payload.added_by = loginUser;
    }

    console.log("Sending Payload:", payload); // 👈 MUST CHECK

    setIsLoading(true);

    try {
      const encrypted = encryptData(payload);

      const url = isEditMode
        ? `${API}/Master/Master_Profile/update_Branch`
        : `${API}/Master/Master_Profile/add_Branch`;

      await axios.post(url, { data: encrypted });

      alert(
        isEditMode
          ? "Branch Updated Successfully"
          : "Branch Added Successfully",
      );

      fetchBranches();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const [branches, setBranches] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editBranchId, setEditBranchId] = useState(null);
  console.log(branches, "branches");

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page); // this will trigger useEffect to fetch
  };

  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log(searchHeaders, searchQuery);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  const fetchBranches = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API}/Master/Master_Profile/get_Branches`,
        {
          params: {
            page,
            limit: recordsPerPage,
            headers: searchHeaders.join(","),
            search: searchQuery,
          },
        },
      );

      setBranches(response.data.branches);
      setTotalRecords(response.data.total);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches(currentPage);
  }, [currentPage]);

  const handleView = (branch) => {
    setBranchData({
      branch_code: branch.branch_code || "",
      branch_name: branch.branch_name || "",
      print_name: branch.print_name || "",
      address_line1: branch.address_line1 || "",
      pin_code: branch.pin_code || "",
      city: branch.city || "",
      district: branch.district || "",
      state: branch.state || "",
      mobile_no: branch.mobile_no || "",
      lead_person: branch.lead_person || "",
      is_main:
        branch.is_main === 1 ||
        branch.is_main === "1" ||
        branch.is_main === true,
      status:
        branch.status === 1 || branch.status === "1" || branch.status === true,
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
      pin_code: branch.pin_code || "",
      city: branch.city || "",
      district: branch.district || "",
      state: branch.state || "",
      mobile_no: branch.mobile_no || "",
      lead_person: branch.lead_person || "",
      is_main:
        branch.is_main === 1 ||
        branch.is_main === "1" ||
        branch.is_main === true,
      status:
        branch.status === 1 || branch.status === "1" || branch.status === true,
    });

    setEditBranchId(branch.id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

 const handleUpdateBranch = async () => {
  try {
    const payload = {
      id: editBranchId,
      ...branchData,
      modified_by: loginUser,   // ✅ ADD THIS
    };

    console.log("Updating Payload:", payload); // 🔍 check this

    const response = await updateBranchApi(payload);

    console.log("✅ Branch updated:", response);

    alert("Branch updated successfully!");
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditBranchId(null);
    fetchBranches();
  } catch (error) {
    console.error("Error updating branch:", error);
    alert("Failed to update branch");
  }
};
  return (
    <>
      <div className=" w-full">
        {/* middletopbar */}
        <div className="flex justify-center sticky top-[80px] z-40">
          <div className="z-40 bg-white">
            {/* Changed justify-around to justify-between */}
            <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow-sm">
              {/* 1. LEFT SIDE: Title */}
              <h2
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "148%",
                  letterSpacing: "0em",
                }}
                className="text-red-600 whitespace-nowrap"
              >
                Branch Profile List
              </h2>

              {/* 2. RIGHT SIDE: Filter + Buttons Container */}
              <div className="flex items-center gap-6">
                {/* Search & Header Filter */}
                <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[500px]">
                  {/* Multi-Select Header Dropdown */}
                  <div className="relative border-r border-gray-300 pr-2 mr-2">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full"
                    >
                      Headers ({searchHeaders.length}){" "}
                      <span className="text-[8px]">▼</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                        {[
                          { id: "branch_code", label: "Branch_Code" },
                          { id: "branch_name", label: "Branch Name" },
                          { id: "lead_person", label: "Branch Lead" },
                          { id: "address_line1", label: "Branch Address" },
                          { id: "state", label: "Branch State" },
                          { id: "city", label: "Branch City" },
                          { id: "district", label: "Branch District" },
                          { id: "pin_code", label: "Branch Pincode" },
                        ].map((col) => (
                          <label
                            key={col.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
                          >
                            <input
                              type="checkbox"
                              checked={searchHeaders.includes(col.id)}
                              onChange={() => toggleHeader(col.id)}
                              className="w-3 h-3 accent-[#0A2478]"
                            />
                            <span className="text-[11px] font-source text-gray-700">
                              {col.label}
                            </span>
                          </label>
                        ))}
                        <div className="border-t mt-1 pt-1 text-center">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-[10px] text-[#0A2478] font-bold"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type multiple items (e.g. Cash, Asset)..."
                    className="flex-grow text-[11px] font-source outline-none h-full"
                  />

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      fetchBranches(); // call API
                    }}
                    className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                  >
                    Search
                  </button>

                  <button
                    onClick={() => {
                      setSearchQuery(""); // Clears the search text
                      setSearchHeaders([]); // Resets checkboxes to 0
                      fetchBranches();
                    }}
                    className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                  >
                    Clear
                  </button>
                </div>

                {/* Action Buttons Group */}
                <div className="flex items-center gap-4">
                  <button
                    style={{
                      width: "74px",
                      height: "24px",
                      borderRadius: "3.75px",
                    }}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center transition-colors hover:bg-[#071d45]"
                  >
                    Add
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="text-white px-[6.25px] cursor-pointer py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px] flex items-center justify-center transition-colors hover:bg-[#a40f1a]"
                  >
                    Exit
                  </button>
                </div>
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
                {isViewMode
                  ? "View Branch Details"
                  : isEditMode
                    ? "Edit Branch Details"
                    : "Add Branch Details"}
              </h2>

              {/* Modal Body */}
              <div className=" gap-4">
                <div className="flex  gap-4">
                  <div className="">
                    <label className="text-[14px]">
                      Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="branch_code"
                      value={branchData.branch_code}
                      onChange={handleChange}
                      placeholder="Code"
                      className="border border-gray-300 rounded px-3 py-2 mt-1  w-[80px]"
                    />
                  </div>

                  <div>
                    <label className="text-[14px]">
                      Branch Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="branch_name"
                      value={branchData.branch_name}
                      onChange={handleChange}
                      placeholder="Branch Name"
                      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[200px]"
                    />
                  </div>

                  <div>
                    <label className="text-[14px]">
                      Print Name<span className="text-red-500">*</span>
                    </label>
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
                    <label className="text-[14px]">Lead Person</label>
                    <select
                      name="lead_person"
                      value={branchData.lead_person}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                    >
                      <option value="">Select Lead Person</option>

                      {activeEmployees.map((emp) => (
                        <option key={emp.id} value={emp.emp_name}>
                          {emp.emp_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px]">
                      Mobile No<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="mobile_no"
                      value={branchData.mobile_no}
                      onChange={handleChange}
                      placeholder="+91 8456645752"
                      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[110px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px]">
                      Alt Mobile No<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="altmobile_no"
                      value={branchData.altmobile_no}
                      onChange={handleChange}
                      placeholder="+91 8456645752"
                      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[110px]"
                    />
                  </div>
                  <div>
                    <p className="text-[14px]">
                      Address <span className="text-red-500">*</span>
                    </p>
                    <textarea
                      type="text"
                      name="address_line1"
                      value={branchData.address_line1}
                      onChange={handleChange}
                      placeholder="Address Line 1"
                      className="border border-gray-300 rounded px-3 py-2 mt-2 w-[430px]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px]">
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={branchData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[150px]"
                    />
                  </div>
                  <div>
                    <p className="text-[14px]">
                      District <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="text"
                      name="district"
                      value={branchData.district}
                      onChange={handleChange}
                      placeholder="District"
                      className="border border-gray-300 rounded px-3 py-2 mt-2 w-[200px]"
                    />
                  </div>

                  <div>
                    <p className="text-[14px]">
                      State <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="text"
                      name="state"
                      value={branchData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="border border-gray-300 rounded px-3 py-2 mt-2 w-[200px]"
                    />
                  </div>
                  <div>
                    <p className="text-[14px]">
                      Pin Code <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="text"
                      name="pin_code"
                      value={branchData.pin_code}
                      onChange={handleChange}
                      placeholder="Pin Code"
                      className="border border-gray-300 rounded px-3 py-2 mt-2 w-[100px]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-2">
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
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                {!isViewMode &&
                  (isEditMode ? (
                    <button
                      onClick={handleUpdateBranch}
                      className="bg-[#0A2478] text-white cursor-pointer px-4 py-2 rounded-md"
                    >
                      Update Branch
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="bg-[#0A2478] text-white cursor-pointer px-4 py-2 rounded-md"
                    >
                      Add Branch
                    </button>
                  ))}
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
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[80px]">
                    Branch Code
                  </th>
                  <th
                    onClick={() => handleSort("branchName")}
                    className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[120px] cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      Branch Name
                      {sortConfig.key !== "branchName" && (
                        <FaSort className="text-gray-400 text-xs" />
                      )}
                      {sortConfig.key === "branchName" &&
                        sortConfig.direction === "asc" && (
                          <FaSortUp className="text-blue-600 text-xs" />
                        )}
                      {sortConfig.key === "branchName" &&
                        sortConfig.direction === "desc" && (
                          <FaSortDown className="text-blue-600 text-xs" />
                        )}
                    </div>
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[350px]">
                    {" "}
                    Branch Address
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[110px]">
                    Branch Lead
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[110px]">
                    Branch Phone
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                    Added By
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                    Added on
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                    Modified By
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                    Modified on
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                    Action
                  </th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {branches.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td
                      className="px-4 py-2 text-blue-500 cursor-pointer"
                      onClick={() => handleView(row)}
                    >
                      {row.branch_code}
                    </td>
                    <td className="px-4 py-2">{row.branch_name}</td>
                    <td className="px-4 py-2">{row.address_line1}</td>
                    <td className="px-4 py-2">{row.lead_person}</td>
                    <td className="px-4 py-2">{row.mobile_no}</td>
                    <td className="px-4 py-2">{row.added_by}</td>
                    <td className="px-4 py-2">
                      {formatIndianDate(row.added_on)}
                    </td>
                    <td className="px-4 py-2">{row.modified_by}</td>

                    <td className="px-4 py-2">
                      {formatIndianDate(row.modified_on)}
                    </td>
                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <div className="flex gap-2 justify-center">
                        <button
                          disabled={isViewMode}
                          className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                          onClick={() => handleEdit(row)}
                          title="Edit"
                        >
                          <FiEdit className="text-white text-sm" />

                          {/* <FiEdit /> */}
                        </button>
                        {/* <button
                          className="bg-[#646AD9] p-1.5 text-white rounded cursor-pointer"
                          onClick={() => handleView(row)} title="view"                   >
                          <FiEye className="text-white text-sm" />
                        </button> */}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <button
                        onClick={() => handleToggleStatus(row.id, row.status)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          row.status === "1" ? "bg-[#0A2478]" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            row.status === "1"
                              ? "translate-x-6"
                              : "translate-x-0"
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

      {/* <div className=" w-full relative">
        {isLoading && <Loader />}
      </div> */}
    </>
  );
};

export default BranchProfileList;
