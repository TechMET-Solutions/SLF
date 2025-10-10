// import React from 'react'

// const BranchProfileList = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default BranchProfileList

import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";
import { fetchBranchesApi, updateBranchApi, updateBranchStatusApi } from "../API/Master/Master_Profile/Branch_Details";
import GroupData from "../assets/Group 124.svg";
import Vectorimg from "../assets/Vectorimg.png";
import Loader from "../Component/Loader";
import { encryptData } from "../utils/cryptoHelper";
import { formatIndianDate } from "../utils/Helpers";
const BranchProfileList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [branchData, setBranchData] = useState({
    branch_code: "",
    branch_name: "",
    print_name: "",
    address_line1: "",
    address_line3: "",
    mobile_no: "",
    lead_person: "",
    is_main: false,
    status: false,
  });
  console.log(branchData, "branchData")
 const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBranchData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const encrypted = encryptData({
        ...branchData,
        id: editBranchId, // include id when editing
      });

      const url = isEditMode
        ? `${API}/Master/Master_Profile/update_Branch`
        : `${API}/Master/Master_Profile/add_Branch`  ;

      await axios.post(url, { data: encrypted });

      setIsModalOpen(false);
      setIsEditMode(false);
      setBranchData({
        branch_code: "",
        branch_name: "",
        print_name: "",
        address_line1: "",
        address_line3: "",
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
      address_line3: branch.address_line3 || "",
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
              Branch profile List
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
                  className="bg-[#0b2c69] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                >
                  Search
                </button>

              </div>
              <div className="flex justify-center item-center gap-5">
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
                  className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
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
                  <label className="text-[14px]">Code *</label>
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
                  <label className="text-[14px]">Name *</label>
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
                  <label className="text-[14px]">Print Name *</label>
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
                  <label className="text-[14px]">Address *</label>
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
                  <label className="text-[14px]">Address 3 *</label>
                  <input
                    type="text"
                    name="address_line3"
                    value={branchData.address_line3}
                    onChange={handleChange}
                    placeholder="Address Line 3"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-[14px]">Mobile No. *</label>
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
                    <option value="" disabled>
                      Select Lead Person
                    </option>
                    <option value="john">John Doe</option>
                    <option value="mary">Mary Smith</option>
                    <option value="alex">Alex Johnson</option>
                  </select>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    name="is_main"
                    checked={branchData.is_main}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-[14px]">Is Main <span className="text-red-500">*</span></label>
                </div>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    name="status"
                    checked={branchData.status}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-[14px]">Status *</label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-center gap-4 mt-6">
                {/* <button
                  className="bg-[#0A2478] text-white px-5 py-2 rounded"
                  onClick={handleSave}
                >
                  {isEditMode ? "Update" : "Save"}
                </button> */}
                {isEditMode ? (
  <button
    onClick={handleUpdateBranch}
    className="bg-blue-600 text-white px-4 py-2 rounded-md"
  >
    Update Branch
  </button>
) : (
  <button
    onClick={handleSave}
    className="bg-green-600 text-white px-4 py-2 rounded-md"
  >
    Add Branch
  </button>
)}
                <button
                  className="bg-[#C1121F] text-white px-5 py-2 rounded"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                     setBranchData({
        branch_code: "",
        branch_name: "",
        print_name: "",
        address_line1: "",
        address_line3: "",
        mobile_no: "",
        lead_person: "",
        is_main: false,
        status: false,
      });
                  }}
                >
                  Exit
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
                        <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center  p-0.5 justify-center"
                          onClick={() => handleEdit(row)}>
                          <img src={GroupData} alt="logout" className="w-[18px] h-[18px]" />
                        </div>

                        <div
                          className="w-[17px] h-[17px] bg-[#646AD9] rounded-[2.31px] flex items-center p-0.5 justify-center cursor-pointer"
                        // onClick={() => handleEdit(row)}
                        >
                          <img src={Vectorimg} alt="edit" />
                        </div>

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


        {/* Pagination */}
        {/* <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
          <button className="px-3 py-1 border rounded-md">Previous</button>
          <div className="flex gap-2">
            <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
            <button className="px-3 py-1 border rounded-md">2</button>
            <button className="px-3 py-1 border rounded-md">3</button>
            <button className="px-3 py-1 border rounded-md">...</button>
            <button className="px-3 py-1 border rounded-md">10</button>
          </div>
          <button className="px-3 py-1 border rounded-md">Next</button>
        </div> */}
 {totalPages > 1 && (
            <div className="flex justify-center items-center px-6 py-3 border-t gap-2 ">
              <button
                className={`px-3 py-1 border rounded-md ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === page ? "bg-[#0b2c69] text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className={`px-3 py-1 border rounded-md ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
      </div>



      <div className=" w-full relative">
        {isLoading && <Loader />}
      </div></>

  );
};

export default BranchProfileList;
