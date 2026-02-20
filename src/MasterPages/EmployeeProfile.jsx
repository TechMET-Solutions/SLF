import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

import {
  deleteEmployeeApi,
  fetchEmployeeProfileApi,
} from "../API/Master/Employee_Profile/EmployeeProfile";
import blockimg from "../assets/blockimg.png";
import Pagination from "../Component/Pagination";
import { encryptData } from "../utils/cryptoHelper";

import profileempty from "../assets/profileempty.png";
const EmployeeProfile = () => {
  useEffect(() => {
    document.title = "SLF | Employee Profile";
  }, []);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  console.log(employeeList, "employeeList");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewDocumentHistory, setIsDocumentHistory] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState({ empId: "", empName: "" });
  console.log(searchTerm, "searchTerm");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    id: null,
    panFile: null,
    pan_card: "",
    aadhar_card: "",
    aadharFile: null,
    otp: "",
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
    salary: null,
  });
  const [documents, setDocuments] = useState([]); // main list from API
  const [idProofList, setIdProofList] = useState([]); // filtered only id proof
  const [addrProofList, setAddrProofList] = useState([]); // filtered only address proof

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API}/Master/getAllDocumentProofs`);
      const docs = response.data.data;
      setDocuments(docs);
      setIdProofList(docs.filter((x) => x.is_id_proof === 1));
      setAddrProofList(docs.filter((x) => x.is_address_proof === 1));
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const loadRoles = async () => {
      const fetchedRoles = await fetchAllRoles();
      setRoles(fetchedRoles);
    };
    loadRoles();
    fetchBranches();
    fetchDesignations();
  }, []);

  const fetchAllRoles = async () => {
    try {
      const response = await fetch(
        `${API}/Master/User-Management/getAll-roles-options`,
      );
      const result = await response.json();
      return result.roles || [];
    } catch (err) {
      console.error("Error fetching roles:", err);
      return [];
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);

      if (res.data.success) {
        setBranches(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchDesignations = async () => {
    try {
      const res = await axios.get(
        `${API}/Master/Employee_Profile/get-designation`,
      );
      const items = res.data?.data || res.data?.data?.data || [];
      setDesignations(items);
    } catch (err) {
      console.error("❌ Error fetching designations:", err);
      setDesignations([]);
    }
  };

  console.log(formData, "formData");
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
  console.log(addressProof, idProof, profileImage);
  // Pagination states
  const [adharMaskingData, setAdharMaskingData] = useState("");
  console.log(adharMaskingData, "adharMaskingData");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;
  const [mode, setMode] = useState("add");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  // 🔹 Pagination Controls
  const [valuationAmount, setValuationAmount] = useState("");
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchEmployee(page, searchTerm);
  };

  const handleFileChange = (e, setProfileImage) => {
    if (!e?.target?.files?.[0]) return;
    const file = e.target.files[0];
    setProfileImage(file);
    setFormData((prev) => ({ ...prev, emp_image: file.name }));
  };

  const handleFileChangeForAddProof = (e, setAddressProof) => {
    if (!e?.target?.files?.[0]) return;
    const file = e.target.files[0];
    setAddressProof(file);
    setFormData((prev) => ({ ...prev, emp_add_prof: file.name }));
  };

  const handleFileChangeForIdProof = (e, setIdProof) => {
    if (!e?.target?.files?.[0]) return;
    const file = e.target.files[0];
    setIdProof(file);
    setFormData((prev) => ({ ...prev, emp_id_prof: file.name }));
  };

  // ✅ Fetch employee list with filters
  // const fetchEmployee = async (page = 1, filters = {}) => {
  //   setIsLoading(true);

  //    const filltersData = {
  //     search: searchQuery,      // text input
  //     keys: searchHeaders,      // selected headers
  //   };

  //   try {
  //     const result = await fetchEmployeeProfileApi(page, itemsPerPage, filters, filltersData);
  //     if (result?.items) {
  //       setEmployeeList(result.items);
  //       setTotalItems(result.total || result.data.length);
  //       setCurrentPage(result.page);
  //       setShowPagination(result.showPagination || false);
  //     } else {
  //       setEmployeeList([]);
  //       setShowPagination(false);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching employees:", error);
  //     setEmployeeList([]);
  //     setShowPagination(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchEmployee = async (page = 1 ,searchQuery, searchHeaders) => {
    setIsLoading(true);

    const filters = {
      search: searchQuery,
      keys: searchHeaders,
    };

    try {
      const result = await fetchEmployeeProfileApi(page, itemsPerPage, filters);

      if (result?.items) {
        setEmployeeList(result.items);
        setTotalItems(result.total || 0);
        setCurrentPage(result.page);
        setShowPagination(result.showPagination || false);
      } else {
        setEmployeeList([]);
        setShowPagination(false);
      }
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee(searchQuery,searchHeaders);
  }, []);

  const updateEmployeeStatus = async (id, status) => {
    debugger;
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
      const newStatus = emp.status ? 0 : 1;
      const response = await updateEmployeeStatus(emp.id, newStatus);
      console.log("✅ Status updated response:", response);
      setEmployeeList((prev) =>
        prev.map((e) => (e.id === emp.id ? { ...e, status: newStatus } : e)),
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
      fetchEmployee(currentPage, searchQuery,searchHeaders);
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
      emp_image: "",
      emp_add_prof: "",
      emp_id_prof: "",
      status: true,
      salary: null,
    });
    setProfileImage(null);
    setAddressProof(null);
    setIdProof(null);
    setIsModalOpen(true);
  };

  function formatDateToMySQL(dateString) {
    if (!dateString) return null;

    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const validateForm = () => {
    const {
      pan_card,
      aadhar_card,
      emp_name,
      mobile_no,
      email,
      date_of_birth,
      joining_date,
      permanent_address,
      corresponding_address,
      branch_id,
      designation,
      assign_role_id,
      password,
    } = formData;

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^[0-9]{12}$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z ]{3,}$/;

    // PAN
    if (!panRegex.test(pan_card?.toUpperCase())) {
      alert("PAN must be valid (Example: ABCDE1234F)");
      return false;
    }

    // Aadhaar
    if (!aadharRegex.test(aadhar_card)) {
      alert("Aadhaar must be 12 digits");
      return false;
    }

    // Name
    if (!nameRegex.test(emp_name)) {
      alert("Name must contain only letters and minimum 3 characters");
      return false;
    }

    // Mobile
    if (!mobileRegex.test(mobile_no)) {
      alert("Mobile must be valid 10-digit Indian number");
      return false;
    }

    // Email
    if (!emailRegex.test(email)) {
      alert("Enter valid Email ID");
      return false;
    }

    // Date of Birth
    if (!date_of_birth) {
      alert("Date of Birth is required");
      return false;
    }

    const dob = new Date(date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
      alert("Employee must be at least 18 years old");
      return false;
    }

    // Joining Date
    if (!joining_date) {
      alert("Date of Joining is required");
      return false;
    }

    if (new Date(joining_date) < dob) {
      alert("Joining Date cannot be before Date of Birth");
      return false;
    }

    // Addresses
    if (!permanent_address || permanent_address.length < 10) {
      alert("Permanent Address must be minimum 10 characters");
      return false;
    }

    if (!corresponding_address || corresponding_address.length < 10) {
      alert("Current Address must be minimum 10 characters");
      return false;
    }

    // Branch
    if (!branch_id) {
      alert("Please select Branch");
      return false;
    }

    // Designation
    if (!designation) {
      alert("Please enter Designation");
      return false;
    }

    // Role
    if (!assign_role_id) {
      alert("Please select Assign Role");
      return false;
    }

    // Password
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be minimum 8 characters with uppercase, lowercase, number and special character",
      );
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    debugger;
    try {
      if (!validateForm()) return;
      setIsLoading(true);

      const mobileRegex = /^[0-9]{10}$/;
      const aadharRegex = /^[0-9]{12}$/;

      if (!mobileRegex.test(formData.mobile_no)) {
        alert("Mobile Number must be a valid 10-digit number.");
        return;
      }

      if (!aadharRegex.test(formData.aadhar_card)) {
        alert("Aadhar Number must be a valid 12-digit number.");
        return;
      }

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
        branch_id: formData.branch_id,
        joining_date: formatDateToMySQL(formData.joining_date),
        designation: formData.designation,
        date_of_birth: formatDateToMySQL(formData.date_of_birth),
        assign_role: formData.assign_role,
        assign_role_id: formData.assign_role_id,
        password: formData.password,
        fax: formData.fax,
        addressProfiletype: formData.addressProfiletype,
        IdProoftype: formData.IdProoftype,
        status: formData.status,
        salary: formData.salary,
      };

      const encryptedData = encryptData(JSON.stringify(payload));
      const formDataToSend = new FormData();
      formDataToSend.append("data", encryptedData);
      if (profileImage) formDataToSend.append("emp_image", profileImage);
      if (addressProof) formDataToSend.append("emp_add_prof", addressProof);
      if (idProof) formDataToSend.append("emp_id_prof", idProof);

      await axios.post(
        `${API}/Master/Employee_Profile/add-employee`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("✅ Employee created successfully!");
      setIsModalOpen(false);
      fetchEmployee(currentPage, searchQuery,searchHeaders);
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
      if (!validateForm()) return;
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
        joining_date: formatDateToMySQL(formData.joining_date),
        designation: formData.designation,
        date_of_birth: formatDateToMySQL(formData.date_of_birth),
        assign_role: formData.assign_role,
        assign_role_id: formData.assign_role_id,
        password: formData.password,
        fax: formData.fax,
        status: formData.status,
        salary: formData.salary,
      };

      const encryptedData = encryptData(JSON.stringify(payload));
      const formDataToSend = new FormData();
      formDataToSend.append("data", encryptedData);
      if (profileImage) formDataToSend.append("emp_image", profileImage);
      if (addressProof) formDataToSend.append("emp_add_prof", addressProof);
      if (idProof) formDataToSend.append("emp_id_prof", idProof);

      await axios.put(
        `${API}/Master/Employee_Profile/update-employee`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("✅ Employee updated successfully!");
      setIsModalOpen(false);
      fetchEmployee(currentPage, searchQuery,searchHeaders);
    } catch (err) {
      console.error("❌ Error updating employee:", err);
      alert(err.response?.data?.message || "Error updating employee");
    }
  };

  // 🔍 Handle Search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    const filters = {};

    if (searchTerm.empId) filters.id = searchTerm.empId;
    if (searchTerm.empName) filters.name = searchTerm.empName;

   fetchEmployee(currentPage, searchQuery,searchHeaders);
  };

  // 🔄 Handle Clear Search
  const handleClearSearch = () => {
    setSearchTerm({ empId: "", empName: "" });
    setSearchHeaders([]); // ✅ Clear selected headers
    setSearchQuery(""); // ✅ Clear search input
    setCurrentPage(1);

    fetchEmployee(currentPage, searchQuery,searchHeaders);
  };
// useEffect(() => {
//   fetchEmployee(currentPage);
// }, [currentPage, searchTerm, searchHeaders, searchQuery]);
  // useEffect(() => {
  //   fetchEmployee(currentPage);
  // }, [searchTerm, currentPage]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value)
          ? ""
          : "Please enter a valid email address",
      }));
    }

    // Apply numeric + length restriction for both numbers
    if (name === "Alternate_Mobile" || name === "mobile_no") {
      const numericValue = value.replace(/\D/g, "");

      if (numericValue.length > 10) {
        alert("Mobile number must be 10 digits only.");
        return;
      }

      updatedValue = numericValue;
    }

    // Aadhaar validation (12 digits)
    if (name === "aadhar_card") {
      const numericValue = value.replace(/\D/g, "");

      if (numericValue.length > 12) {
        alert("Aadhaar number must be 12 digits only.");
        return;
      }

      updatedValue = numericValue;
    }

    // Role selection
    if (name === "assign_role") {
      const selectedRole = roles.find(
        (role) => role.id === parseInt(value, 10),
      );

      setFormData((prev) => ({
        ...prev,
        assign_role_id: selectedRole ? selectedRole.id : "",
        assign_role: selectedRole ? selectedRole.role_name : "",
      }));
      return;
    }

    // Branch selection
    if (name === "branch") {
      const selectedBranch = branches.find(
        (branch) => branch.id === parseInt(value, 10),
      );

      setFormData((prev) => ({
        ...prev,
        branch_id: selectedBranch ? selectedBranch.id : "",
        branch: selectedBranch ? selectedBranch.branch_name : "",
      }));
      return;
    }

    // Default update (including email & numbers)
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : updatedValue,
    }));
  };

  const handleForceDownload = async (fileUrl, filename) => {
    try {
      const response = await fetch(fileUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "document";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("❌ Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  const sendAadhaarOTP = async () => {
    debugger;
    // 1. Basic Length Check
    if (!formData.aadhar_card || formData.aadhar_card.length !== 12) {
      alert("Enter valid 12-digit Aadhaar");
      return;
    }

    // 2. Cross-check with PAN Masked Data
    const inputLastFour = formData.aadhar_card.slice(-4);

    if (adharMaskingData && inputLastFour !== adharMaskingData) {
      alert(`Aadhaar mismatch!.`);
      return;
    }

    // 3. Proceed to API if validation passes
    try {
      const res = await axios.post(`${API}/kyc/aadhaar/send-otp`, {
        aadhaar_number: formData.aadhar_card,
      });

      setFormData((prev) => ({
        ...prev,
        refId: res.data.data.ref_id,
      }));

      alert("Aadhar Verify successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  const verifyAadhaarOtp = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      alert("Please enter a valid OTP");
      return;
    }

    try {
      const res = await axios.post(`${API}/kyc/aadhaar/verify-otp`, {
        otp: formData.otp,
        ref_id: formData.refId,
      });

      if (res.data.status) {
        alert("Aadhaar Verified Successfully!");
        // Optional: Set success flag
        // setFormData({ ...formData, aadhaarVerified: true });
      }
    } catch (error) {
      alert("OTP Verification Failed!");
      console.error(error);
    }
  };

  const handleCheckboxChange = (emp) => {
    setSelectedEmployees((prev) => {
      // If selected already → remove
      if (prev.some((e) => e.id === emp.id)) {
        return prev.filter((e) => e.id !== emp.id);
      }
      // Else add to selection
      return [...prev, emp];
    });
  };

  const handleValuationClick = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee");
      return;
    }
    setIsValuationModalOpen(true);
  };

  const handleSaveValuation = async () => {
    debugger;
    const employeeIds = selectedEmployees.map((emp) => emp.id);

    if (!valuationAmount) {
      alert("Please enter valuation amount");
      return;
    }

    const payload = {
      employeeIds,
      valuationAmount,
    };

    console.log("Saving valuation:", payload);

    // Call your API:
    await axios.post(`${API}/Master/updateEmployeeValuation`, payload);
    fetchEmployee(currentPage, searchQuery,searchHeaders);
    setIsValuationModalOpen(false);
    setSelectedEmployees([]);
    setValuationAmount(""); // reset
  };

  const openValuationModal = (emp) => {
    setSelectedEmployees([emp]);
    setValuationAmount(emp.Valuer_Valuation || ""); // prefill if exists
    setIsValuationModalOpen(true);
  };

  const verifyPan = async () => {
    if (!formData.pan_card) {
      alert("Please enter PAN Number");
      return;
    }

    try {
      const res = await axios.post(`${API}/kyc/pan/verify`, {
        pan: formData.pan_card,
        name: "---",
      });

      // Navigating the nested response structure: res.data.data.data
      const panDetails = res.data.data.data;

      if (panDetails) {
        // 1. Capture the masked Aadhaar info for your separate state
        const lastFourDigits = panDetails.masked_aadhaar
          ? panDetails.masked_aadhaar.slice(-4)
          : "";
        setAdharMaskingData(lastFourDigits);

        // 2. Update formData with available API details
        // setFormData((prev) => ({
        //   ...prev,
        //   emp_name: panDetails.full_name,        // Maps "SUMIT BHIKAJI PATHAK"
        //   date_of_birth: panDetails.dob,
        //   email: panDetails.email,
        //   mobile_no: panDetails.phone_number,
        // }));
        setFormData((prev) => ({
          ...prev,
          emp_name: panDetails.full_name || prev.emp_name,
          date_of_birth: panDetails.dob || prev.date_of_birth,

          // Email ani Mobile (Jar API madhe null asel tar prev value maintain rahil)
          email: panDetails.email || prev.email,
          mobile_no: panDetails.phone_number || prev.mobile_no,
          aadhar: panDetails.masked_aadhaar,

          // Address Mapping
          // panDetails.address.full madhe sagala address ekatra yeto
          permanent_address: panDetails.address?.full || prev.permanent_address,

          // Jar tula corresponding address madhe pan toch pahije asel tar:
          corresponding_address:
            panDetails.address?.full || prev.corresponding_address,
        }));
        alert("PAN Verified Successfully!");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      alert(error.response?.data?.message || "PAN Verification Failed");
    }
  };

  const getImageSource = () => {
    // 1. If we have a new file selected, show the preview
    if (profileImage) return URL.createObjectURL(profileImage);

    // 2. If we are in view/edit mode and have an existing image
    if (formData.emp_image) return formData.emp_image;

    // 3. Fallback to default
    return profileempty;
  };
  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Employee Profile List
          </h2>

          {/* Search & Actions */}
          <div className="flex items-center gap-6">
            {/* <div className="flex gap-5">
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Id</p>
                <input
                  type="text"
                  value={searchTerm.empId}
                  onChange={(e) =>
                    setSearchTerm((prev) => ({
                      ...prev,
                      empId: e.target.value,
                    }))
                  }
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Name</p>
                <input
                  type="text"
                  value={searchTerm.empName}
                  onChange={(e) =>
                    setSearchTerm((prev) => ({
                      ...prev,
                      empName: e.target.value,
                    }))
                  }
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
            </div> */}

            <div className="flex items-center gap-3">
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
                        { id: "id", label: "EMP Id" },
                        { id: "emp_name", label: "Name" },
                        { id: "email", label: "Email" },
                        { id: "mobile_no", label: "Mobile" },
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

                {/* Text Input Field */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type multiple items (e.g. Cash, Asset)..."
                  className="flex-grow text-[11px] font-source outline-none h-full"
                />

                {/* Search Button */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);

                    const filters = {
                      search: searchQuery,
                      keys: searchHeaders, // selected columns
                    };

                   fetchEmployee(currentPage, searchQuery,searchHeaders);
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Search
                </button>

                <button
                  onClick={() => handleClearSearch()}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              
              <button
                onClick={handleValuationClick}
                className="bg-[#129121] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Valuation
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
                className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[1100px] max-h-[90vh] rounded-lg shadow-lg p-6 overflow-y-auto">
            {/* Title */}
            <h2 className="text-[#0A2478] text-[20px] font-semibold mb-6">
              {mode === "edit"
                ? "Edit Employee Profile"
                : mode === "view"
                  ? "View Employee Profile"
                  : "Add Employee Profile"}
            </h2>
            <div className="flex justify-between">
              {/* Left Form */}
              <div className=" space-y-4 text-sm">
                {/* PAN + Aadhaar + Name */}
                <div className="flex gap-4 w-full">
                  {/* <div className="flex flex-col flex-1">
                    <label className="text-[14px] font-medium">
                      PAN No. <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-center mt-1">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Enter PAN"
                          name="pan_card"
                          disabled={mode === "view"}
                          value={formData.pan_card}
                          onChange={handleInputChange}
                          className="border border-[#C4C4C4] border-r-0 rounded-l-[8px] px-3 py-2 pr-10 w-full bg-white"
                        />

                        <input
                          type="file"
                          accept="image/*,.pdf"
                          ref={panFileInputRef}
                          disabled={mode === "view"}
                          onChange={handlePanFileChange}
                          className="hidden"
                        />

                        <FaPaperclip
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={16}
                          onClick={() => panFileInputRef.current.click()}
                        />
                      </div>

                      <button
                        className="bg-[#0A2478] text-white px-4 py-2 rounded-r-[8px] hover:bg-[#081c5b] whitespace-nowrap"
                        type="button"
                        onClick={verifyPan}
                      >
                        Verify
                      </button>
                    </div>
                  </div> */}

                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      PAN No. <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center mt-1">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter PAN"
                          name="pan_card"
                          disabled={mode === "view"}
                          value={formData.pan_card}
                          onChange={handleInputChange}
                          // Set to 140px to match Aadhaar
                          className="border border-[#C4C4C4] rounded-l-[8px] px-3 py-2 pr-9 w-[150px] bg-white h-[38px] text-[13px] outline-none focus:border-[#0A2478]"
                        />
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          ref={panFileInputRef}
                          disabled={mode === "view"}
                          onChange={handlePanFileChange}
                          className="hidden"
                        />
                        <FaPaperclip
                          className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 ${mode !== "view" ? "cursor-pointer" : ""}`}
                          size={14}
                          onClick={() =>
                            mode !== "view" && panFileInputRef.current.click()
                          }
                        />
                      </div>
                      <button
                        className="bg-[#0A2478] text-white px-3 py-2 rounded-r-[8px] hover:bg-[#081c5b] whitespace-nowrap h-[38px] text-[13px] border border-[#0A2478]"
                        type="button"
                        onClick={verifyPan}
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* Aadhaar */}
                  {/* <div className="flex flex-col flex-1">
                    <label className="text-[14px] font-medium">
                      Aadhar Card Number <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-center mt-1">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          placeholder={
                            formData.aadhar
                              ? `${formData.aadhar}`
                              : "Enter Aadhar"
                          }
                          name="aadhar_card"
                          disabled={mode === "view"}
                          value={formData.aadhar_card}
                          onChange={handleInputChange}
                          className="border border-[#C4C4C4] border-r-0 rounded-l-[8px] px-3 py-2 pr-10 w-[160px] bg-white h-[38px]"
                          style={{ MozAppearance: "textfield" }}
                          onWheel={(e) => e.target.blur()}
                        />

                        <input
                          type="file"
                          accept="image/*,.pdf"
                          ref={aadharFileInputRef}
                          disabled={mode === "view"}
                          onChange={handleAadharFileChange}
                          className="hidden"
                        />

                        <FaPaperclip
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                          size={16}
                          onClick={() => aadharFileInputRef.current.click()}
                        />
                      </div>

                      <button
                        className="bg-[#0A2478] text-white px-4 py-2 rounded-r-[8px] hover:bg-[#081c5b] whitespace-nowrap h-[38px]"
                        type="button"
                        onClick={sendAadhaarOTP}
                      >
                        verify
                      </button>
                    </div>
                  </div> */}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Aadhar Card Number <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-center mt-1">
                      {/* Input Container */}
                      <div className="relative">
                        <input
                          type="number"
                          placeholder={
                            formData.aadhar
                              ? `${formData.aadhar}`
                              : "Enter Aadhar"
                          }
                          name="aadhar_card"
                          disabled={mode === "view"}
                          value={formData.aadhar_card}
                          onChange={handleInputChange}
                          // Reduced width to 140px and removed right border/rounding
                          className="border border-[#C4C4C4] rounded-l-[8px] px-3 py-2 pr-9 w-[150px] bg-white h-[38px] text-[13px] outline-none focus:border-[#0A2478]"
                          style={{ MozAppearance: "textfield" }}
                          onWheel={(e) => e.target.blur()}
                        />

                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          ref={aadharFileInputRef}
                          disabled={mode === "view"}
                          onChange={handleAadharFileChange}
                          className="hidden"
                        />

                        {/* Paperclip Icon - Adjusted position */}
                        <FaPaperclip
                          className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 ${mode !== "view" ? "cursor-pointer hover:text-[#0A2478]" : ""}`}
                          size={14}
                          onClick={() =>
                            mode !== "view" &&
                            aadharFileInputRef.current.click()
                          }
                        />
                      </div>

                      {/* Verify Button - Attached directly */}
                      <button
                        className="bg-[#0A2478] text-white px-3 py-2 rounded-r-[8px] hover:bg-[#081c5b] whitespace-nowrap h-[38px] text-[13px] border border-[#0A2478]"
                        type="button"
                        onClick={sendAadhaarOTP}
                      >
                        verify
                      </button>
                    </div>
                  </div>

                  {/* OTP */}
                  {/* <div className="flex flex-col w-[140px]">
    <label className="text-[14px] font-medium">Verify OTP</label>

    <div className="relative mt-1">
      <input
        type="number"
        placeholder="Enter OTP"
        name="otp"
        value={formData.otp}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-[8px] px-3 py-2 w-[140px] bg-white"
        style={{ MozAppearance: "textfield" }}
        onWheel={(e) => e.target.blur()}
      />

      <img
        src={righttick}
        alt="tick"
        onClick={verifyAadhaarOtp}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px] cursor-pointer"
      />
    </div>
  </div> */}

                  {/* Name */}
                  <div className="flex flex-col flex-1">
                    <label className="text-gray-700 font-medium">
                      Name<span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="emp_name"
                      value={formData.emp_name}
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 w-[390px] bg-white mt-1"
                    />
                  </div>
                </div>

                {/* Employee ID, Mobile, Email */}
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Mobile No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="mobile_no"
                      value={formData.mobile_no}
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      placeholder="Mobile No"
                      maxLength={10}
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[153px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Alternate Mobile No
                    </label>
                    <input
                      type="tel"
                      name="Alternate_Mobile"
                      value={formData.Alternate_Mobile}
                      onChange={handleInputChange}
                      disabled={mode === "view"}
                      placeholder="Mobile No"
                      maxLength={10}
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[153px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={mode === "view"}
                      placeholder="Email ID"
                      className={`border rounded px-3 py-2  w-[203px] bg-white ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[12px] mt-1">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={
                        formData.date_of_birth
                          ? new Date(formData.date_of_birth)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      className={`border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[168px] 
    }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Date of Joining <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="joining_date"
                      value={
                        formData.joining_date
                          ? new Date(formData.joining_date)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[124px]"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  {/* Permanent Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Permanent Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      type="text"
                      name="permanent_address"
                      disabled={mode === "view"}
                      value={formData.permanent_address}
                      onChange={handleInputChange}
                      placeholder=" Permanent Address*"
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[360px] h-[80px]"
                    />
                  </div>

                  {/* Radio Option */}
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      id="sameAddress"
                      disabled={mode === "view"}
                      name="sameAddress"
                      checked={
                        formData.corresponding_address &&
                        formData.corresponding_address ===
                          formData.permanent_address
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            corresponding_address: prev.permanent_address,
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            corresponding_address: "",
                          }));
                        }
                      }}
                      className="border accent-blue-900 w-5 h-5"
                    />
                    <label
                      htmlFor="sameAddress"
                      className="text-gray-700 font-medium"
                    >
                      Same As<br></br> Per.Adr?
                    </label>
                  </div>

                  {/* Corresponding Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Current Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      type="text"
                      name="corresponding_address"
                      value={formData.corresponding_address}
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      placeholder="Current Address"
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[360px] h-[80px]"
                    />
                  </div>
                </div>

                {/* Branch, Joining Date, Designation, DOB */}
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Branch <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="branch"
                      value={formData.branch_id}
                      onChange={handleInputChange}
                      disabled={mode === "view"}
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[100px]"
                    >
                      <option value="" disabled>
                        {" "}
                        Branch
                      </option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.branch_name} ({branch.branch_code})
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Date of Joining <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="joining_date"
                      value={
                        formData.joining_date
                          ? new Date(formData.joining_date)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[164px]"
                    />
                  </div> */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="designation"
                      value={formData.designation}
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[140px]"
                    >
                      <option value="" disabled>
                        Select Designation
                      </option>
                      {designations.map((d) => (
                        <option key={d.id} value={d.designation}>
                          {d.designation}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Assign Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="assign_role"
                      value={formData.assign_role_id}
                      onChange={handleInputChange}
                      disabled={mode === "view"}
                      className="border border-[#C4C4C4] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[140px]"
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
                    <label className="text-gray-700 font-medium">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      disabled={mode === "view"}
                      onChange={handleInputChange}
                      placeholder="*******"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[140px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Fax</label>
                    <input
                      type="text"
                      name="fax"
                      disabled={mode === "view"}
                      value={formData.fax}
                      onChange={handleInputChange}
                      placeholder="Fax"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[140px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">
                      Salary Per Month
                    </label>

                    <input
                      type="text"
                      name="salary"
                      disabled={mode === "view"}
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="salary"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[130px]"
                    />
                  </div>
                </div>

                <div className="flex gap-2"></div>
              </div>

              <div className="p-4">
                <div>
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center">
                      <label
                        htmlFor="profileImage"
                        className={`${mode === "view" ? "cursor-default" : "cursor-pointer"} group relative`}
                      >
                        <img
                          src={getImageSource()}
                          alt="Employee Profile"
                          className="w-[110px] h-[110px] rounded-lg object-cover border border-gray-300 transition-opacity group-hover:opacity-80"
                        />

                        {mode !== "view" && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-lg">
                            <span className="text-[10px] text-white font-bold bg-black/50 px-1 rounded">
                              Add Profile Photo
                            </span>
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex justify-center mt-2 mb-2 w-full">
                        <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em]">
                          {mode === "view" ? "Profile Picture" : ""}
                        </label>
                      </div>

                      <input
                        id="profileImage"
                        type="file"
                        disabled={mode === "view"}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setProfileImage)}
                      />

                      {mode !== "view" && (
                        <span className="text-gray-500 text-xs mt-1 truncate max-w-[200px]">
                          {profileImage ? profileImage.name : "No file chosen"}
                        </span>
                      )}
                    </div>
                  </div>

                  {mode !== "view" && (
                    <>
                      {/* <div className="flex items-center gap-2 mt-4">
                        <div>
                          <h1 className="text-[14px] font-medium mt-2">
                            Address Proof
                          </h1>
                          <select
                            name="Additional_AddressProof"
                            value={formData.Additional_AddressProof}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                addressProfiletype: e.target.value,
                              })
                            }
                            className="border border-gray-300 px-3 py-2  w-[100px] bg-white rounded-[8px]"
                          >
                            <option value="">Select Address Proof</option>

                            {addrProofList.map((item) => {
                              const proof = item.proof_type.toLowerCase();

                              return (
                                <option
                                  key={item.id}
                                  value={item.proof_type}
                                  disabled={
                                    (formData.pan_card &&
                                      proof.includes("pan")) ||
                                    (formData.aadhar_card &&
                                      (proof.includes("adhaar") ||
                                        proof.includes("adhar")))
                                  }
                                >
                                  {item.proof_type}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="flex border border-gray-400 rounded-[10px] items-center overflow-hidden w-[200px] mt-7 h-[40px]">
                          <label
                            htmlFor="addressProof"
                            className="bg-[#D9D9D9] px-2 py-2 h-full text-sm text-black font-semibold cursor-pointer hover:bg-gray-300 transition-all duration-200 flex items-center"
                          >
                            Choose File
                          </label>

                          <input
                            id="addressProof"
                            type="file"
                            disabled={mode === "view"}
                            className="hidden"
                            onChange={(e) =>
                              handleFileChangeForAddProof(e, setAddressProof)
                            }
                          />

                          <div className="flex-1 flex items-center px-3 gap-2 overflow-hidden">
                        
                            {addressProof || formData.emp_add_prof ? (
                              <div className="flex items-center gap-2 truncate">
                                <img
                                  src={
                                    addressProof
                                      ? URL.createObjectURL(addressProof)
                                      : formData.emp_add_prof
                                  }
                                  alt="Proof Preview"
                                  className="w-6 h-6 rounded-sm object-cover border border-gray-300 flex-shrink-0"
                                />
                                <span className="text-gray-700 text-xs truncate">
                                  {addressProof
                                    ? addressProof.name
                                    : "Existing Proof"}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-xs italic">
                                No file chosen
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <div>
                          <h1 className="text-[14px] font-medium mt-3">
                            ID Proof
                          </h1>

                          <select
                            name="Additional_IDProof"
                            value={formData.Additional_IDProof}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                IdProoftype: e.target.value,
                              })
                            }
                            className="border border-gray-300 px-3 py-2  w-[100px] bg-white rounded-[8px]"
                          >
                            <option value="">Select ID Proof</option>

                            {idProofList.map((item) => {
                              const p = item.proof_type.toLowerCase();

                              return (
                                <option
                                  key={item.id}
                                  value={item.proof_type}
                                  disabled={
                                    (formData.pan_card && p.includes("pan")) ||
                                    (formData.aadhar_card &&
                                      (p.includes("adhaar") ||
                                        p.includes("adhar")))
                                  }
                                >
                                  {item.proof_type}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="flex border border-gray-400 rounded-[10px] items-center overflow-hidden w-[200px] mt-9 h-[40px]">
                          <label
                            htmlFor="idProof"
                            className="bg-[#D9D9D9] px-6 py-2 h-full text-sm text-black font-semibold cursor-pointer hover:bg-gray-300 transition-all duration-200 flex items-center"
                          >
                            Choose File
                          </label>

                          <input
                            id="idProof"
                            type="file"
                            disabled={mode === "view"}
                            className="hidden"
                            onChange={(e) =>
                              handleFileChangeForIdProof(e, setIdProof)
                            }
                          />

                          <div className="flex-1 flex items-center px-1 gap-2 overflow-hidden bg-white h-full">
                            {idProof || formData.emp_id_prof ? (
                              <>
                               
                                <img
                                  src={
                                    idProof
                                      ? URL.createObjectURL(idProof)
                                      : formData.emp_id_prof
                                  }
                                  alt="ID Preview"
                                  className="w-7 h-7 rounded-md object-cover border border-gray-200 flex-shrink-0"
                                />
                                
                                <span className="text-gray-600 text-xs truncate">
                                  {idProof ? idProof.name : "Saved ID Proof"}
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-400 text-xs italic">
                                No file chosen
                              </span>
                            )}
                          </div>
                        </div>
                      </div> */}

                      {/* --- Address Proof Section --- */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex flex-col">
                          <h1 className="text-[14px] font-medium mb-1">
                            Address Proof
                          </h1>
                          <select
                            name="Additional_AddressProof"
                            value={formData.addressProfiletype}
                            disabled={mode === "view"}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({
                                ...formData,
                                addressProfiletype: val,
                              });
                              // Trigger file input if a selection is made
                              if (val && mode !== "view")
                                document
                                  .getElementById("addressProofInput")
                                  .click();
                            }}
                            className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px] cursor-pointer outline-none focus:border-blue-400"
                          >
                            <option value="">Select & Upload</option>
                            {addrProofList.map((item) => (
                              <option key={item.id} value={item.proof_type}>
                                {item.proof_type}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Hidden Input */}
                        <input
                          id="addressProofInput"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChangeForAddProof(e, setAddressProof)
                          }
                        />

                        {/* Preview (Shows only if file exists) */}
                        {(addressProof || formData.emp_add_prof) && (
                          <div className="mt-7 flex items-center gap-2 border border-dashed border-gray-400 p-1 rounded-md bg-gray-50 h-[40px] px-2">
                            <img
                              src={
                                addressProof
                                  ? URL.createObjectURL(addressProof)
                                  : formData.emp_add_prof
                              }
                              className="w-7 h-7 object-cover rounded"
                              alt="preview"
                            />
                            <span className="text-[10px] text-gray-500 max-w-[80px] truncate">
                              {addressProof ? addressProof.name : "Saved File"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* --- ID Proof Section --- */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex flex-col">
                          <h1 className="text-[14px] font-medium mb-1">
                            ID Proof
                          </h1>
                          <select
                            name="Additional_IDProof"
                            value={formData.IdProoftype}
                            disabled={mode === "view"}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({ ...formData, IdProoftype: val });
                              // Trigger file input if a selection is made
                              if (val && mode !== "view")
                                document.getElementById("idProofInput").click();
                            }}
                            className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px] cursor-pointer outline-none focus:border-blue-400"
                          >
                            <option value="">Select & Upload</option>
                            {idProofList.map((item) => (
                              <option key={item.id} value={item.proof_type}>
                                {item.proof_type}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Hidden Input */}
                        <input
                          id="idProofInput"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChangeForIdProof(e, setIdProof)
                          }
                        />

                        {/* Preview (Shows only if file exists) */}
                        {(idProof || formData.emp_id_prof) && (
                          <div className="mt-7 flex items-center gap-2 border border-dashed border-gray-400 p-1 rounded-md bg-gray-50 h-[40px] px-2">
                            <img
                              src={
                                idProof
                                  ? URL.createObjectURL(idProof)
                                  : formData.emp_id_prof
                              }
                              className="w-7 h-7 object-cover rounded"
                              alt="preview"
                            />
                            <span className="text-[10px] text-gray-500 max-w-[80px] truncate">
                              {idProof ? idProof.name : "Saved File"}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {(mode === "edit" || mode === "view") && (
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
                    setMode("add");
                  }}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-md">
          <div className="bg-white w-[396px] rounded-lg shadow-lg h-[386px] p-5">
            <div className="flex justify-center mt-2">
              <img src={blockimg} alt="block" className="w-[113px] h-[113px]" />
            </div>
            <div className="mt-10 text-center">
              <p className="text-[22px] font-medium">
                Are you sure to delete this employee?
              </p>
              <p className="text-[17px] text-gray-600 mt-2">
                You won't be able to revert this action.
              </p>
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
      )}

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
                        handleForceDownload(
                          formData.emp_add_prof,
                          "Address_Proof",
                        )
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

      {isValuationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[400px] p-5 rounded shadow-lg ">
            <h2 className="text-[18px] leading-[24px] font-semibold text-[#0A2478] text-center font-[Source_Sans_3] mb-3">
              The employee is permitted to perform gold valuation
            </h2>

            <label className="text-[14px] leading-[24px] font-medium text-[#000000] font-[Source_Sans_3]">
              Valuation Limit Assigned
            </label>

            <input
              type="number"
              value={valuationAmount}
              onChange={(e) => setValuationAmount(e.target.value)}
              className="border w-full mt-1 mb-4 px-2 py-1 rounded"
              placeholder="e.g. ₹ 1,00,000.00"
            />

            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={handleSaveValuation}
                className="bg-[#0A2478] text-white px-3 py-1 rounded w-[93px] h-[30px]"
              >
                Submit
              </button>
              <button
                onClick={() => setIsValuationModalOpen(false)}
                className="bg-[#C1121F] text-white px-3 py-1 rounded h-[30px]"
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
                  <th className="px-4 py-2 text-left border-r">Select</th>
                  <th className="px-4 py-2 text-left border-r">Emp ID</th>
                  <th className="px-4 py-2 text-left border-r">Profile</th>
                  <th className="px-4 py-2 text-left border-r">Name</th>
                  <th className="px-4 py-2 text-left border-r w-[211px]">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left border-r w-[111px]">
                    Mobile
                  </th>
                  {/* <th className="px-4 py-2 text-left border-r">DOJ</th>
                  <th className="px-4 py-2 text-left border-r">DOB</th> */}
                  <th className="px-4 py-2 text-left border-r w-[313px]">
                    Address
                  </th>
                  <th className="px-4 py-2 text-left border-r w-[81px]">
                    Valuation
                  </th>
                  <th className="px-4 py-2 text-left border-r">Action</th>
                  <th className="px-4 py-2 text-left border-r">Active</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {employeeList.length > 0 ? (
                  employeeList.map((emp, index) => (
                    <tr
                      key={emp.id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      {/* Select Column */}
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.some(
                            (e) => e.id === emp.id,
                          )}
                          onChange={() => handleCheckboxChange(emp)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-2">{emp.id}</td>
                      <td className="px-4 py-2 flex items-center justify-center gap-2">
                        <img
                          src={emp.emp_image}
                          alt={emp.emp_name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-300"
                        />
                      </td>

                      <td
                        className="px-4 py-2 text-blue-500 cursor-pointer"
                        onClick={() => handleView(emp)}
                      >
                        {emp.emp_name}
                      </td>
                      <td className="px-4 py-2">{emp.email}</td>
                      <td className="px-4 py-2">{emp.mobile_no}</td>
                      {/* <td className="px-4 py-2">{new Date(emp.joining_date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{new Date(emp.date_of_birth).toLocaleDateString()}</td> */}
                      <td
                        className="px-4 py-2 max-w-[200px] truncate"
                        title={emp.permanent_address}
                      >
                        {emp.permanent_address}
                      </td>
                      <td
                        className="px-4 py-2 text-blue-700 cursor-pointer underline"
                        onClick={() => openValuationModal(emp)}
                      >
                        {emp.Valuer_Valuation?.trim() || "---"}
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex gap-2 justify-center">
                          {/* <button
                            title="View"
                            onClick={() => handleView(emp)}
                            className="bg-[#646AD9] p-1.5 rounded text-white hover:bg-[#5057c9] cursor-pointer"
                          >
                            <FiEye />
                          </button> */}
                          <button
                            title="Edit"
                            className="bg-green-500 p-1.5 rounded text-white hover:bg-green-600 cursor-pointer"
                            onClick={() => handleEdit(emp)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            title="Delete"
                            className="bg-red-600 p-1.5 rounded text-white hover:bg-red-700 cursor-pointer"
                            onClick={() => handleDeleteClick(emp.id)}
                          >
                            <FiTrash2 title="Delete" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleToggleStatus(emp)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                            emp.status ? "bg-[#0A2478]" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              emp.status ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-8 text-center text-gray-500"
                    >
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
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default EmployeeProfile;
