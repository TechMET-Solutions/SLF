import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import {
  deleteEmployeeApi,
  fetchEmployeeProfileApi
} from "../API/Master/Employee_Profile/EmployeeProfile";
import blockimg from "../assets/blockimg.png";
import profileempty from "../assets/profileempty.png";
import Pagination from "../Component/Pagination";
import { encryptData } from "../utils/cryptoHelper";

const EmployeeProfile = () => {

  useEffect(() => {
    document.title = "SLF | Employee Profile";
  }, []);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  console.log(employeeList, "employeeList")
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewDocumentHistory, setIsDocumentHistory] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState({ empId: "", empName: "" });

  const [formData, setFormData] = useState({
    id: null,
    panFile: null,
    pan_card: "",
    aadhar_card: "",
    aadharFile: null,
    emp_name: "",
    emp_id: "",
    mobile_no: "",
    Alternate_Mobile: "",
    email: "",
    print_name: "",
    corresponding_address: "",
    permanent_address: "",
    branch: "",
    branch_id: "",
    joining_date: "",
    designation: "",
    date_of_birth: "",
    assign_role: "",
    assign_role_id: "",
    password: "",
    fax: "",
    addressProfiletype: "",
    IdProoftype: "",
    status: true,
  });
  const [documents, setDocuments] = useState([]);      // main list from API
  const [idProofList, setIdProofList] = useState([]);  // filtered only id proof
  const [addrProofList, setAddrProofList] = useState([]); // filtered only address proof

  const fetchDocuments = async () => {
    try {
      // setLoading(true);

      const response = await axios.get(`${API}/Master/getAllDocumentProofs`);

      const docs = response.data.data;  // <-- already clean json

      setDocuments(docs);

      setIdProofList(docs.filter(x => x.is_id_proof === 1));
      setAddrProofList(docs.filter(x => x.is_address_proof === 1));

      // setLoading(false);
    } catch (err) {
      console.error("Error fetching documents:", err);
      // setError("Failed to fetch documents");
      // setLoading(false);
    }
  };

  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);

  // added: designations state
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    fetchDocuments()
  }, [])
  useEffect(() => {
    const loadRoles = async () => {
      const fetchedRoles = await fetchAllRoles();
      setRoles(fetchedRoles);
    };
    loadRoles();
    fetchBranches();
    // added: fetch designations
    fetchDesignations();
  }, []);

  const fetchAllRoles = async () => {
    try {
      const response = await fetch(`${API}/Master/User-Management/getAll-roles-options`);
      const result = await response.json();
      return result.roles || [];
    } catch (err) {
      console.error("Error fetching roles:", err);
      return [];
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${API}/Master/Master_Profile/Branchess`);
      if (response.data.success) {
        setBranches(response.data.data || []);
      }
    } catch (error) {
      console.error("❌ Error fetching branches:", error);
      setBranches([]);
    }
  };

  // added: fetchDesignations implementation
  const fetchDesignations = async () => {
    try {
      const res = await axios.get(`${API}/Master/Employee_Profile/get-designation`);
      // response shape: { data: [...], current_page:..., ... }
      const items = res.data?.data || res.data?.data?.data || [];
      setDesignations(items);
    } catch (err) {
      console.error("❌ Error fetching designations:", err);
      setDesignations([]);
    }
  };

  console.log(formData, "formData")
  const panFileInputRef = useRef(null);
  const handlePanFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        panFile: file,
      }));
    }
  };
  const aadharFileInputRef = useRef(null);
  const handleAadharFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        aadharFile: file,
      }));
    }
  };
  // File states
  const [profileImage, setProfileImage] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [idProof, setIdProof] = useState(null);
  console.log(addressProof, idProof, profileImage)
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;
  const [mode, setMode] = useState("add");

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchEmployee(page);
  };

  const handleFileChange = (e, setProfileImage) => {
    if (!e?.target?.files?.[0]) return; // safety check
    const file = e.target.files[0];
    setProfileImage(file);
    setFormData((prev) => ({ ...prev, emp_image: file.name }));
  };

  const handleFileChangeForAddProof = (e, setAddressProof) => {
    if (!e?.target?.files?.[0]) return; // safety check
    const file = e.target.files[0];
    setAddressProof(file);
    setFormData((prev) => ({ ...prev, emp_add_prof: file.name }));
  };

  const handleFileChangeForIdProof = (e, setIdProof) => {
    if (!e?.target?.files?.[0]) return; // safety check
    const file = e.target.files[0];
    setIdProof(file);
    setFormData((prev) => ({ ...prev, emp_id_prof: file.name }));
  };

  // ✅ Fetch employee list
  const fetchEmployee = async (page = 1) => {
    // setIsLoading(true);
    try {
      const result = await fetchEmployeeProfileApi(page, itemsPerPage);
      if (result?.items) {
        setEmployeeList(result.items);
        setTotalItems(result.total || result.data.length);
        setCurrentPage(result.page);
        setShowPagination(result.showPagination || false);
      } else {
        setEmployeeList([]);
        setShowPagination(false);
      }
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      setEmployeeList([]);
      setShowPagination(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const updateEmployeeStatus = async (id, status) => {
    debugger
    try {
      const payload = { id, status };
      const encryptedData = encryptData(JSON.stringify(payload));

      const res = await axios.post(`${API}/Master/updateEmployeeStatus`, {
        data: encryptedData,
      });

      return res.data;
    } catch (error) {
      console.error("Error updating employee status:", error);
    }
  };



  const handleToggleStatus = async (emp) => {
    try {
      // 🧩 Flip the current status (1 → 0 or 0 → 1)
      const newStatus = emp.status ? 0 : 1;

      // 📨 Call backend API
      const response = await updateEmployeeStatus(emp.id, newStatus);

      // 🔐 If response is encrypted, decrypt it (if needed)
      console.log("✅ Status updated response:", response);

      // 🧠 Update the state to reflect new status instantly
      setEmployeeList((prev) =>
        prev.map((e) =>
          e.id === emp.id ? { ...e, status: newStatus } : e
        )
      );
    } catch (error) {
      console.error("❌ Error toggling employee status:", error);
    }
  };
  // 🗑️ Show delete confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  // 🟥 Confirm delete
  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployeeApi(deleteId);
      setDeleteModalOpen(false);
      setDeleteId(null);
      fetchEmployee(currentPage);
    } catch (error) {
      console.error("❌ Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

  const handleView = (employee) => {
    setMode("view");
    setFormData(employee);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setMode("edit");
    setFormData(employee);
    setIsModalOpen(true);
  };



  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      pan_card: "",
      aadhar_card: "",
      emp_name: "",
      emp_id: "",
      mobile_no: "",
      Alternate_MobileL: "",  // ❌ Typo: should be "Alternate_Mobile"
      email: "",
      print_name: "",
      corresponding_address: "",
      permanent_address: "",
      branch: "",
      branch_id: "",  // ✅ Add this
      joining_date: "",
      designation: "",
      date_of_birth: "",
      assign_role: "",
      assign_role_id: "",
      password: "",
      fax: "",
      emp_image: "",
      emp_add_prof: "",
      emp_id_prof: "",
      status: true,
    });
    setProfileImage(null);
    setAddressProof(null);
    setIdProof(null);
    setIsModalOpen(true);
  };




  const handleSave = async () => {
    debugger
    try {
      const payload = {
        pan_card: formData.pan_card,
        aadhar_card: formData.aadhar_card,
        emp_name: formData.emp_name,
        mobile_no: formData.mobile_no,
        Alternate_Mobile: formData.Alternate_Mobile,
        email: formData.email,
        corresponding_address: formData.corresponding_address,
        permanent_address: formData.permanent_address,
        branch: formData.branch,
        branch_id: formData.branch_id,  // ✅ Add this line
        joining_date: formData.joining_date,
        designation: formData.designation,
        date_of_birth: formData.date_of_birth,
        assign_role: formData.assign_role,
        assign_role_id: formData.assign_role_id,
        password: formData.password,
        fax: formData.fax,
        addressProfiletype: formData.addressProfiletype,
        IdProoftype: formData.IdProoftype,
        status: formData.status,
      };

      // Encrypt payload
      const encryptedData = encryptData(JSON.stringify(payload));

      const formDataToSend = new FormData();
      formDataToSend.append("data", encryptedData);
      if (profileImage) formDataToSend.append("emp_image", profileImage);
      if (addressProof) formDataToSend.append("emp_add_prof", addressProof);
      if (idProof) formDataToSend.append("emp_id_prof", idProof);

      await axios.post(`${API}/Master/Employee_Profile/add-employee`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Employee created successfully");
      setIsModalOpen(false)
      fetchEmployee(currentPage);
    } catch (error) {
      console.error("❌ Error saving employee:", error);
      alert(error.response?.data?.message || "Error saving employee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    debugger;
    try {
      const payload = {
        id: formData.id,
        pan_card: formData.pan_card,
        aadhar_card: formData.aadhar_card,
        emp_name: formData.emp_name,
        mobile_no: formData.mobile_no,
        Alternate_Mobile: formData.Alternate_Mobile,
        email: formData.email,
        corresponding_address: formData.corresponding_address,
        permanent_address: formData.permanent_address,
        branch: formData.branch,
        joining_date: formData.joining_date,
        designation: formData.designation,
        date_of_birth: formData.date_of_birth,
        assign_role: formData.assign_role,
        assign_role_id: formData.assign_role_id,
        password: formData.password,
        fax: formData.fax,
        status: formData.status,
      };

      // Encrypt data
      const encryptedData = encryptData(JSON.stringify(payload));

      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append("data", encryptedData);

      // Append only changed files
      if (profileImage) formDataToSend.append("emp_image", profileImage);
      if (addressProof) formDataToSend.append("emp_add_prof", addressProof);
      if (idProof) formDataToSend.append("emp_id_prof", idProof);

      // API call
      await axios.put(
        `${API}/Master/Employee_Profile/update-employee`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Employee updated successfully!");
      setIsModalOpen(false);
      fetchEmployee(currentPage);
    } catch (err) {
      console.error("❌ Error updating employee:", err);
      alert(err.response?.data?.message || "Error updating employee");
    }
  };
  // 🔍 Handle Search
  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching with:", searchTerm);
    // You might want to call a search API or filter locally
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "assign_role") {
      const selectedRole = roles.find((role) => role.id === parseInt(value));
      setFormData((prev) => ({
        ...prev,
        assign_role_id: selectedRole ? selectedRole.id : "",
        assign_role: selectedRole ? selectedRole.role_name : "",
      }));
    } else if (name === "branch") {
      // Find the selected branch object
      const selectedBranch = branches.find((branch) => branch.id === parseInt(value));
      setFormData((prev) => ({
        ...prev,
        branch_id: selectedBranch ? selectedBranch.id : "",
        branch: selectedBranch ? selectedBranch.branch_name : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleForceDownload = async (fileUrl, filename) => {
    try {
      // Fetch the file as a blob (binary data)
      const response = await fetch(fileUrl, { mode: "cors" });
      const blob = await response.blob();

      // Create a temporary object URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "document";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("❌ Error downloading file:", error);
      alert("Failed to download file.");
    }
  };


  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Employee Profile List
          </h2>

          {/* Search & Actions */}
          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Id</p>
                <input
                  type="text"
                  value={searchTerm.empId}
                  onChange={(e) => setSearchTerm(prev => ({ ...prev, empId: e.target.value }))}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Name</p>
                <input
                  type="text"
                  value={searchTerm.empName}
                  onChange={(e) => setSearchTerm(prev => ({ ...prev, empName: e.target.value }))}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Search
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddNew}
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Add
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-[1183px] max-h-[90vh] rounded-lg shadow-lg p-6 overflow-y-auto">
              {/* Title */}
              <h2 className="text-[#0A2478] text-[20px] font-semibold mb-6">
                {mode === "edit" ? "Edit Employee Profile" : "Add Employee Profile"}
              </h2>

              <div className="flex gap-2">
                {/* Left Form */}
                <div className=" space-y-4 text-sm">
                  {/* PAN + Aadhaar + Name */}
                  <div className="flex gap-2">

                    <div className="flex flex-col">
                      <label className="text-[14px] font-medium">PAN No.</label>
                      <div className="flex items-center mt-1 w-[220px]">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Enter PAN"
                            name="pan_card"
                            disabled={mode === "view"}
                            value={formData.pan_card}
                            onChange={handleInputChange}
                            className="border border-[#C4C4C4] border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          />

                          {/* Hidden file input */}
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            ref={panFileInputRef}
                            disabled={mode === "view"}
                            onChange={handlePanFileChange}
                            className="hidden"
                          />

                          {/* Paperclip icon triggers file selection */}
                          <FaPaperclip
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            size={16}
                            onClick={() => panFileInputRef.current.click()}
                          />
                        </div>

                        <button
                          className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]"
                          type="button"
                        >
                          Verify
                        </button>
                      </div>

                      {/* Show selected file name */}
                      {formData.panFile && (
                        <p className="text-xs text-gray-500 mt-1">
                          Selected file: {formData.panFile.name}
                        </p>
                      )}
                    </div>
                    {/* Aadhaar */}
                    <div className="flex flex-col">
                      <label className="text-[14px] font-medium">Aadhar Card Number.</label>
                      <div className="flex items-center mt-1 w-[300px]">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Enter Aadhar Number"
                            name="aadhar_card"
                            disabled={mode === "view"}
                            value={formData.aadhar_card}
                            onChange={handleInputChange}
                            className="border border-[#C4C4C4] border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                          />

                          {/* Hidden file input */}
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            ref={aadharFileInputRef}
                            disabled={mode === "view"}
                            onChange={handleAadharFileChange}
                            className="hidden"
                          />

                          {/* Paperclip icon triggers file selection */}
                          <FaPaperclip
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            size={16}
                            onClick={() => aadharFileInputRef.current.click()}
                          />
                        </div>

                        <button
                          className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]"
                          type="button"
                        >
                          Verify
                        </button>
                      </div>

                      {/* Show selected file name */}
                      {formData.aadharFile && (
                        <p className="text-xs text-gray-500 mt-1">
                          Selected file: {formData.aadharFile.name}
                        </p>
                      )}
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Name*</label>
                      <input
                        type="text"
                        name="emp_name"
                        value={formData.emp_name}
                        disabled={mode === "view"}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[226px]"
                      />
                    </div>
                  </div>

                  {/* Employee ID, Mobile, Email */}
                  <div className="flex gap-2">

                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Mobile No*</label>
                      <input
                        type="text"
                        name="mobile_no"
                        value={formData.mobile_no}
                        disabled={mode === "view"}
                        onChange={handleInputChange}
                        placeholder="Mobile No"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Alternate Mobile No*</label>
                      <input
                        type="text"
                        name="Alternate_Mobile"
                        value={formData.Alternate_Mobile}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                        placeholder="Mobile No"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Email ID*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                        placeholder="Email ID"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Date of Birth*</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={
                          formData.date_of_birth
                            ? new Date(formData.date_of_birth).toISOString().split("T")[0]
                            : ""
                        }
                        disabled={mode === "view"}
                        onChange={handleInputChange}
                        className={`border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 
    }`}
                      />
                    </div>

                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    {/* Corresponding Address */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Corresponding Address*</label>
                      <input
                        type="text"
                        name="corresponding_address"
                        value={formData.corresponding_address}
                        disabled={mode === "view"}
                        onChange={handleInputChange}
                        placeholder=" Corresponding Address*"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[266px]"
                      />
                    </div>

                    {/* Radio Option */}
                    <div className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        id="sameAddress"
                        disabled={mode === "view"}
                        name="sameAddress"
                        checked={formData.permanent_address === formData.corresponding_address}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, permanent_address: prev.corresponding_address }));
                          } else {
                            setFormData(prev => ({ ...prev, permanent_address: "" }));
                          }
                        }}
                        className="border accent-blue-900 w-5 h-5"
                      />
                      <label htmlFor="sameAddress" className="text-gray-700 font-medium">
                        Permanent Address same as<br></br> Correspondence Address?
                      </label>
                    </div>

                    {/* Permanent Address */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Permanent Address*</label>
                      <input
                        type="text"
                        name="permanent_address"
                        disabled={mode === "view"}
                        value={formData.permanent_address}
                        onChange={handleInputChange}
                        placeholder=" Permanent Address*"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[259px]"
                      />
                    </div>
                  </div>

                  {/* Branch, Joining Date, Designation, DOB */}
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Branch*</label>
                      <select
                        name="branch"
                        value={formData.branch_id} // Changed from branch to branch_id
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[220px]"
                      >
                        <option value="" disabled>Select Branch</option>
                        {branches.map((branch) => (
                          <option key={branch.id} value={branch.id}>
                            {branch.branch_name} ({branch.branch_code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Date of Joining</label>
                      <input
                        type="date"
                        name="joining_date"
                        value={
                          formData.joining_date
                            ? new Date(formData.joining_date).toISOString().split("T")[0]
                            : ""
                        }
                        disabled={mode === "view"}
                        onChange={handleInputChange}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[164px]"
                      />

                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Designation*</label>
                      <select
                        name="designation"
                        value={formData.designation}
                        disabled={mode === "view"}
                        onChange={handleInputChange}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[162px]"
                      >
                        <option value="" disabled>Select Designation</option>
                        {designations.map((d) => (
                          <option key={d.id} value={d.designation}>
                            {d.designation}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Role, Password, Fax */}
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Assign Role*</label>
                      <select
                        name="assign_role"
                        value={formData.assign_role_id}  // ✅ use role_id as value
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[174px]"
                      >
                        <option value="" disabled>
                          Select Role
                        </option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.role_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Password*</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        disabled={mode === "view"}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[220px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Fax*</label>
                      <input
                        type="text"
                        name="fax"
                        disabled={mode === "view"}
                        value={formData.fax}
                        onChange={handleInputChange}
                        placeholder="Fax"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[220px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Upload Section */}
                <div className=" p-4">
                  <div>
                    <div className="flex justify-center">
                      {mode === "view" ? (
                        // 🟦 View mode: show saved image or default
                        formData.emp_image ? (
                          <img
                            src={formData.emp_image}
                            alt="Employee Profile"
                            className="w-[78px] h-[78px] rounded-lg object-cover border border-gray-300"
                          />
                        ) : (
                          <img
                            src={profileempty}
                            alt="Default Profile"
                            className="w-[78px] h-[78px]"
                          />
                        )
                      ) : mode === "edit" ? (
                        // 🟨 Edit mode: show new uploaded preview or existing image
                        profileImage ? (
                          <img
                            src={URL.createObjectURL(profileImage)}
                            alt="Profile Preview"
                            className="w-[78px] h-[78px] rounded-lg object-cover border border-gray-300"
                          />
                        ) : formData.emp_image ? (
                          <img
                            src={formData.emp_image}
                            alt="Existing Employee Profile"
                            className="w-[78px] h-[78px] rounded-lg object-cover border border-gray-300"
                          />
                        ) : (
                          <img
                            src={profileempty}
                            alt="Default Profile"
                            className="w-[78px] h-[78px]"
                          />
                        )
                      ) : (
                        // 🟩 Add mode: show uploaded preview or default
                        profileImage ? (
                          <img
                            src={URL.createObjectURL(profileImage)}
                            alt="Profile Preview"
                            className="w-[78px] h-[78px] rounded-lg object-cover border border-gray-300"
                          />
                        ) : (
                          <img
                            src={profileempty}
                            alt="Default Profile"
                            className="w-[78px] h-[78px]"
                          />
                        )
                      )}
                    </div>

                    <div className="flex flex-col p-5">
                      <div className="flex  mt-2 mb-2">
                        <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
                          Upload Customer Profile
                        </label>
                      </div>

                      <div className="flex w-[200px] border border-gray-400 rounded-[10px] overflow-hidden mt-3 ">
                        <label
                          htmlFor="profileImage"
                          className="bg-[#D9D9D9] px-6 py-2 text-sm text-black font-semibold cursor-pointer hover:bg-gray-300 transition-all duration-200"
                        >
                          Choose File
                        </label>

                        <input
                          id="profileImage"
                          type="file"
                          disabled={mode === "view"}
                          className="hidden"
                          onChange={(e) => handleFileChange(e, setProfileImage)}
                        />

                        <span className="flex-1 px-4 py-2 text-gray-500 text-sm truncate">
                          {formData.emp_image || "Upload Customer Profile"}
                        </span>
                      </div>

                    </div>


                    {/* <h1 className="text-[14px] font-medium ">Add Proof</h1> */}
                    <h1 className="text-[14px] font-medium">Address Proof</h1>

                    <select
                      disabled={mode === "view"}
                      value={formData.addressProfiletype}
                      onChange={(e) => setFormData({ ...formData, addressProfiletype: e.target.value })}
                      className="border border-gray-400 rounded-[10px] px-3 py-2 w-[300px] mt-1 bg-white"
                    >
                      <option value="">Select Address Proof</option>
                      {addrProofList.map((item) => (
                        <option key={item.id} value={item.proof_type}>
                          {item.proof_type}
                        </option>
                      ))}
                    </select>

                    <div className="flex  border border-gray-400 rounded-[10px] overflow-hidden w-[300px] mt-2">
                      <label
                        htmlFor="addressProof"
                        className="bg-[#D9D9D9] px-6 py-2 text-sm text-black font-semibold cursor-pointer hover:bg-gray-300 transition-all duration-200 "
                      >
                        Choose File
                      </label>

                      <input
                        id="addressProof"
                        type="file"
                        disabled={mode === "view"}
                        className="hidden"
                        onChange={(e) => handleFileChangeForAddProof(e, setAddressProof)}
                      />

                      <span className="flex-1 px-4 py-2 text-gray-500 text-sm truncate">
                        {formData.emp_add_prof || "No file chosen"}
                      </span>
                    </div>

                    <h1 className="text-[14px] font-medium mt-3">ID Proof</h1>
                    <select
                      disabled={mode === "view"}
                      value={formData.IdProoftype}
                      onChange={(e) => setFormData({ ...formData, IdProoftype: e.target.value })}
                      className="border border-gray-400 rounded-[10px] px-3 py-2 w-[300px] mt-1 bg-white"
                    >
                      <option value="">Select ID Proof</option>
                      {idProofList.map((item) => (
                        <option key={item.id} value={item.proof_type}>
                          {item.proof_type}
                        </option>
                      ))}
                    </select>

                    <div className="flex  border border-gray-400 rounded-[10px] overflow-hidden w-[300px] mt-2">
                      <label
                        htmlFor="idProof"
                        className="bg-[#D9D9D9] px-6 py-2 text-sm text-black font-semibold cursor-pointer hover:bg-gray-300 transition-all duration-200 "
                      >
                        Choose File
                      </label>

                      <input
                        id="idProof"
                        disabled={mode === "view"}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChangeForIdProof(e, setIdProof)}
                      />

                      <span className="flex-1 px-4 py-2 text-gray-500 text-sm truncate">
                        {formData.emp_id_prof || "No file chosen"}
                      </span>
                    </div>

                    {mode === "edit" && (
                      <div className="mt-4 text-sm w-fit flex justify-end">
                        <button
                          onClick={() => setIsDocumentHistory(true)}
                          className="bg-green-500 px-2 py-1 text-white rounded-lg hover:bg-green-600"
                        >
                          View Document History
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col gap-3 items-center justify-between mt-6">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <input
                    type="checkbox"
                    name="status"
                    checked={!!formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked }))}
                    className="w-5 h-5 accent-blue-900"
                  />
                  Is Active
                </label>
                <div className="flex gap-3">
                  {mode !== "view" && (
                    <button
                      className="bg-[#0A2478] text-white w-[92px] h-[32px] rounded hover:bg-[#081c5b]"
                      onClick={mode === "edit" ? handleUpdate : handleSave}
                    >
                      {mode === "edit" ? "Update" : "Save"}
                    </button>
                  )}
                  <button
                    className="bg-[#C1121F] text-white w-[92px] h-[32px] rounded hover:bg-[#a00e18]"
                    onClick={() => {
                      setIsModalOpen(false);
                      setMode("add"); // 🟦 Reset mode to "add" when exiting
                    }}
                  >
                    Exit
                  </button>

                </div>

              </div>
            </div>
          </div>
        )
      }

      {/* Delete Confirmation Modal */}
      {
        deleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-md">
            <div className="bg-white w-[396px] rounded-lg shadow-lg h-[386px] p-5">
              <div className="flex justify-center mt-2">
                <img src={blockimg} alt="block" className="w-[113px] h-[113px]" />
              </div>
              <div className="mt-10 text-center">
                <p className="text-[22px] font-medium">Are you sure to delete this employee?</p>
                <p className="text-[17px] text-gray-600 mt-2">You won't be able to revert this action.</p>
              </div>
              <div className="mt-6 flex flex-col items-center gap-4">
                <button
                  className="bg-[#F11717] text-white px-5 py-2 rounded text-[18px] cursor-pointer"
                  onClick={handleDeleteConfirm}
                >
                  Confirm Delete
                </button>
                <button
                  className="bg-[#0A2478] text-white px-5 py-2 rounded text-[18px] cursor-pointer"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }

      {isViewDocumentHistory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-md">
          <div className="bg-white rounded-xl w-[500px] shadow-lg p-6">
            <h2 className="text-lg font-bold text-[#1B2C79] mb-4">
              Uploaded Document History
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* ID Proof */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  ID Proof <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-md mt-1 p-2 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Download</span>
                  {formData.emp_id_prof ? (
                    <button
                      onClick={() =>
                        handleForceDownload(formData.emp_id_prof, "ID_Proof")
                      }
                      className="bg-[#E2E8F0] text-sm text-[#1B2C79] font-medium px-3 py-1 rounded hover:bg-[#CBD5E1]"
                    >
                      Download
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No file</span>
                  )}
                </div>
              </div>

              {/* Address Proof */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Address Proof
                </label>
                <div className="border border-gray-300 rounded-md mt-1 p-2 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Download</span>
                  {formData.emp_add_prof ? (
                    <button
                      onClick={() =>
                        handleForceDownload(formData.emp_add_prof, "Address_Proof")
                      }
                      className="bg-[#E2E8F0] text-sm text-[#1B2C79] font-medium px-3 py-1 rounded hover:bg-[#CBD5E1]"
                    >
                      Download
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No file</span>
                  )}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsDocumentHistory(false)}
                className="bg-[#D32F2F] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#B71C1C]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] min-h-[500px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading employees...</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r">Employee ID</th>
                  <th className="px-4 py-2 text-left border-r">Name</th>
                  <th className="px-4 py-2 text-left border-r">Email</th>
                  <th className="px-4 py-2 text-left border-r">Mobile</th>
                  <th className="px-4 py-2 text-left border-r">DOJ</th>
                  <th className="px-4 py-2 text-left border-r">DOB</th>
                  <th className="px-4 py-2 text-left border-r">Address</th>
                  <th className="px-4 py-2 text-left border-r">Action</th>
                  <th className="px-4 py-2 text-left border-r">Active</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {employeeList.length > 0 ? (
                  employeeList.map((emp, index) => (
                    <tr
                      key={emp.id}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                    >
                      <td className="px-4 py-2 flex items-center justify-center gap-2">
                        <img
                          src={emp.emp_image}
                          alt={emp.emp_name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-300"
                        />

                      </td>

                      <td className="px-4 py-2">{emp.emp_name}</td>
                      <td className="px-4 py-2">{emp.email}</td>
                      <td className="px-4 py-2">{emp.mobile_no}</td>
                      <td className="px-4 py-2">{new Date(emp.joining_date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{new Date(emp.date_of_birth).toLocaleDateString()}</td>
                      <td className="px-4 py-2 max-w-[200px] truncate" title={emp.corresponding_address}>
                        {emp.corresponding_address}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2 justify-center">
                          <button
                            title="View"
                            onClick={() => handleView(emp)}
                            className="bg-[#646AD9] p-1.5 rounded text-white hover:bg-[#5057c9]">
                            <FiEye />
                          </button>
                          <button
                            title="Edit"
                            className="bg-green-500 p-1.5 rounded text-white hover:bg-green-600"
                            onClick={() => handleEdit(emp)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            title="Delete"
                            className="bg-red-600 p-1.5 rounded text-white hover:bg-red-700"
                            onClick={() => handleDeleteClick(emp.id)}
                          >
                            <FiTrash2 title="Delete" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleToggleStatus(emp)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${emp.status ? "bg-[#0A2478]" : "bg-gray-300"
                            }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${emp.status ? "translate-x-6" : "translate-x-0"
                              }`}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {
        totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )
      }
    </div >
  );
};

export default EmployeeProfile;