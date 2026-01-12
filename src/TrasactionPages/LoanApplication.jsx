import axios from "axios";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiBarcode, CiEdit, CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import calender from "../assets/calender.png";
import envImg from "../assets/envImg.jpg";
import goldlogo from "../assets/gold_print.svg";

import { CgSoftwareUpload } from "react-icons/cg";
import { PiPrinterLight } from "react-icons/pi";
import { RiMessage2Line } from "react-icons/ri";
import { API } from "../api";
import { formatIndianDate } from "../utils/Helpers";

const LoanApplication = () => {
  useEffect(() => {
    document.title = "SLF | Loan Application";
  }, []);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const editor = useRef(null);
  const [cancelRemark, setCancelRemark] = useState("");
  const [selectedCancelLoan, setSelectedCancelLoan] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // UPLOAD MODAL STATE
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedUploadLoan, setSelectedUploadLoan] = useState(null);
  const [fileDescription, setFileDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);

  // State for API data and pagination
  const [loanApplication, setLoanApplication] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });
  
  const [filters, setFilters] = useState({
    status: "",
    loan_no: "",
    party_name: "",
    loan_date: "",
    loan_amount_min: "",
    loan_amount_max: "",
    added_by: "",
    approved_by: "",
    scheme_id: "",
    borrower_id: "",
    field: "",
    search: "",
    loan_type: "",
    loans:""
  });

  const [remarkData, setRemarkData] = useState(null);
  const [loadingRemark, setLoadingRemark] = useState(false);

  // Schemes fetched from backend
  const [schemes, setSchemes] = useState([]);
  const [schemesLoading, setSchemesLoading] = useState(false);
  const [schemesError, setSchemesError] = useState("");

  // Fetch active schemes from server
  useEffect(() => {
    let mounted = true;
    const fetchSchemes = async () => {
      setSchemesLoading(true);
      setSchemesError("");
      try {
        const resp = await axios.get(`${API}/Scheme/active`);
        const payload = resp.data && resp.data.success ? resp.data.data : resp.data;
        if (mounted) setSchemes(Array.isArray(payload) ? payload : []);
      } catch (err) {
        console.error("Failed to load schemes:", err);
        if (mounted) setSchemesError("Failed to load schemes");
      } finally {
        if (mounted) setSchemesLoading(false);
      }
    };

    fetchSchemes();
    return () => {
      mounted = false;
    };
  }, []);

  // Jodit Editor configuration
  const editorConfig = {
    readonly: false,
    height: 180,
    placeholder: "Type your cancellation remark here...",
    toolbarAdaptive: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "ul",
      "ol",
      "outdent",
      "indent",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "link",
      "align",
      "undo",
      "redo",
    ],
    removeButtons: ["image", "file", "video", "source"],
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",
  };

  // Create axios instance with base configuration
  const apiClient = axios.create({
    baseURL: API,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

 
const fetchLoanApplications = async (
  page = 1,
  immediateFilters = null,
  immediateDate = undefined,
  immediateScheme = undefined
) => {
  setLoading(true);
  setError("");

  try {
    const activeFilters = immediateFilters !== null ? immediateFilters : filters;
    const activeDate = immediateDate !== undefined ? immediateDate : selectedDate;
    const activeScheme = immediateScheme !== undefined ? immediateScheme : selectedScheme;

    const params = new URLSearchParams({
      page: page.toString(),
      limit: pagination.limit.toString(),
    });

    // Add ALL existing filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && key !== "field" && key !== "search") {
        params.append(key, value);
      }
    });

    // Add Product Filter (gold/silver)
    if (activeFilters.loan_type) {
      params.append("loan_type", activeFilters.loan_type);
    }

    // ⭐ ADD THIS ⭐ → Bullet/EMI filter
    if (activeFilters.loans) {
      params.append("loans", activeFilters.loans);
    }

    // Add scheme filter
    if (activeScheme) {
      const selectedSchemeObj = schemes.find((s) => {
        const label =
          typeof s === "string"
            ? s
            : s.schemeName ||
              s.SchemeName ||
              s.name ||
              s.schemeCode ||
              s.scheme_code ||
              s.code ||
              JSON.stringify(s);
        return label === activeScheme;
      });

      if (selectedSchemeObj && selectedSchemeObj.id) {
        params.append("scheme_id", selectedSchemeObj.id);
      }
    }

    // Add Date filter
    if (activeDate) {
      params.append("loan_date", activeDate.toISOString().split("T")[0]);
    }

    const response = await apiClient.get(`/Transactions/goldloan/all?${params}`);

    if (response.data.success) {
      setLoanApplication(response.data.data);
      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        total: response.data.total,
        limit: pagination.limit,
      });
    } else {
      throw new Error(response.data.message || "No loan applications");
    }
  } catch (err) {
    console.error("Error fetching loan applications:", err);
    setError("No loan applications");
    setLoanApplication([]);
  } finally {
    setLoading(false);
  }
};


  // Initial fetch
  useEffect(() => {
    fetchLoanApplications();
  }, []);

  // Handle filter changes - only update state, don't call API
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle search button click - call API with updated filters
  const handleSearch = () => {
    if (filters.field && filters.search) {
      const searchValue = filters.search;
     const fieldMappings = {
  loan_no: 'loan_no',
  party_name: 'party_name',
  added_by: 'added_by',
  approved_by: 'approved_by',
  Scheme: 'scheme'   // ⭐ New
};
      
      if (fieldMappings[filters.field]) {
        const updatedFilters = {
          ...filters,
          [fieldMappings[filters.field]]: searchValue
        };
        
        setFilters(updatedFilters);
        // Pass the updated filters directly to the API call
        fetchLoanApplications(1, updatedFilters, selectedDate, selectedScheme);
      }
    } else {
      // If no search criteria, just refresh with current filters
      fetchLoanApplications(1, filters, selectedDate, selectedScheme);
    }
  };

  // Handle status filter change - immediate API call with new status
  const handleStatusFilterChange = (status) => {
    const updatedFilters = {
      ...filters,
      status: status
    };
    
    setFilters(updatedFilters);
    // Pass updated filters directly to API call
    fetchLoanApplications(1, updatedFilters, selectedDate, selectedScheme);
  };

  // Scheme selection - immediate API call with new scheme
  const handleSchemeSelect = (schemeLabel) => {
    setSelectedScheme(schemeLabel);
    setIsOpen(false);
    
    // Pass scheme directly as override parameter
    fetchLoanApplications(1, filters, selectedDate, schemeLabel);
  };

  // Date selection - immediate API call with new date
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setOpen(false);
    
    // Pass date directly as override parameter
    fetchLoanApplications(1, filters, date, selectedScheme);
  };

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedDate(null);
    // Pass null date to ensure it's cleared
    fetchLoanApplications(1, filters, null, selectedScheme);
  };

  // Clear scheme filter
  const clearSchemeFilter = () => {
    setSelectedScheme("");
    // Pass empty string to ensure scheme is cleared
    fetchLoanApplications(1, filters, selectedDate, "");
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      status: "",
      loan_no: "",
      party_name: "",
      loan_date: "",
      loan_amount_min: "",
      loan_amount_max: "",
      added_by: "",
      approved_by: "",
      scheme_id: "",
      borrower_id: "",
      field: "",
      search: "",
      loans: "",
      loan_type:""
    };
    
    setFilters(clearedFilters);
    setSelectedDate(null);
    setSelectedScheme("");
    // Pass null/empty values to ensure everything is cleared
    fetchLoanApplications(1, clearedFilters, null, "");
  };

  // Fetch uploaded documents for a loan
  const fetchLoanDocuments = async (loanId) => {
    setDocumentsLoading(true);
    try {
      const response = await apiClient.get(
        `/Transactions/get-loan-documents/${loanId}`
      );

      if (response.data.success) {
        setUploadedDocuments(response.data.data || []);
      } else {
        throw new Error(response.data.message || "Failed to fetch documents");
      }
    } catch (err) {
      console.error("Error fetching loan documents:", err);
      setUploadedDocuments([]);
    } finally {
      setDocumentsLoading(false);
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchLoanApplications(newPage);
    }
  };

  const handleOpenRemark = async (row) => {
    setLoadingRemark(true);
    try {
      let response;
      const status = row.Status.toLowerCase();

      if (status === "cancelled") {
        response = await axios.get(
          `${API}/Transactions/goldloan/remark/${row.Loan_No}`
        );
      } else if (status === "pending" || status === "approved") {
        response = await axios.get(
          `${API}/Transactions/Customer/remark/${row.BorrowerId}`
        );
      }

      if (response.data.success) {
        setRemarkData(response.data.data);
        setIsRemarkOpen(true);
      } else {
        throw new Error(response.data.message || "Failed to fetch remark");
      }
    } catch (error) {
      console.error("Error fetching remark:", error);
      alert("Failed to fetch remark: " + (error.message || "Unknown error"));
    } finally {
      setLoadingRemark(false);
    }
  };

  // Handle delete confirmation using Axios
  const handleDeleteConfirm = async () => {
    if (!selectedCancelLoan) return;

    const plainTextRemark = cancelRemark;

    if (!plainTextRemark) {
      alert("Please provide a cancellation remark");
      return;
    }

    setCancelLoading(true);
    try {
      const possibleIdFields = [
        selectedCancelLoan.id,
        selectedCancelLoan.ID,
        selectedCancelLoan.Id,
        selectedCancelLoan.loan_id,
        selectedCancelLoan.Loan_ID,
        selectedCancelLoan.LoanId,
        selectedCancelLoan.Loan_No,
      ].filter(Boolean);

      if (possibleIdFields.length === 0) {
        throw new Error("No valid ID field found in loan data");
      }

      const loanId = possibleIdFields[0];

      const response = await apiClient.put("/Transactions/goldloan/cancel", {
        id: loanId,
        remark: plainTextRemark,
      });

      if (response.data.success) {
        fetchLoanApplications(pagination.page);
        setDeleteModalOpen(false);
        setSelectedCancelLoan(null);
        setCancelRemark("");
        setSuccessMessage("Loan application cancelled successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error(
          response.data.message || "Failed to cancel loan application"
        );
      }
    } catch (err) {
      console.error("Error cancelling loan application:", err);
      let errorMessage = "Failed to cancel loan application";

      if (err.response) {
        errorMessage =
          err.response.data?.message || `Server error: ${err.response.status}`;
        if (err.response.status === 400) {
          errorMessage = `Bad Request: ${
            err.response.data?.message || "Invalid data sent to server"
          }`;
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = err.message;
      }

      alert(`Error: ${errorMessage}`);
    } finally {
      setCancelLoading(false);
    }
  };

  // Handle upload button click
  const handleUploadClick = async (loan) => {
    setSelectedUploadLoan(loan);
    setUploadModalOpen(true);
    setFileDescription("");
    setSelectedFile(null);

    // Fetch existing documents when modal opens
    await fetchLoanDocuments(loan.Loan_No);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Handle upload submission
  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    if (!fileDescription.trim()) {
      alert("Please enter a file description");
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("document", selectedFile);
      formData.append("loan_id", selectedUploadLoan.Loan_No);
      formData.append("file_description", fileDescription);
      formData.append("uploaded_by", "Admin");

      const response = await apiClient.post(
        "/Transactions/goldloan/add-loan-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage("File uploaded successfully!");
        setFileDescription("");
        setSelectedFile(null);

        // Refresh the documents list
        await fetchLoanDocuments(selectedUploadLoan.Loan_No);

        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";

        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "Failed to upload file";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      alert(`Error: ${errorMessage}`);
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle document download/view
  const handleDocumentAction = (document) => {
    const fileUrl = `${API}/ImagesFolders/loan_documents/${document.document}`;
    window.open(fileUrl, "_blank");
  };

  // Handle cancel for upload modal
  const handleUploadCancel = () => {
    setUploadModalOpen(false);
    setSelectedUploadLoan(null);
    setFileDescription("");
    setSelectedFile(null);
    setUploadedDocuments([]);
  };

  const handleClick = (row) => {
    if (row.Status === "Cancelled") {
      navigate("/Cancelled-Loan", {
        state: {
          loanId: row.Loan_No,
          loanData: row,
        },
      });
    } else {
      navigate("/View-Loan-Details", {
        state: {
          loanId: row.Loan_No,
          loanData: row,
        },
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-orange-500";
      case "cancelled":
        return "text-red-600";
      case "closed":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (status) => {
    return (
      status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() ||
      "Unknown"
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN");
    } catch {
      return dateString;
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;

    buttons.push(
      <button
        key="prev"
        className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i
                ? "bg-[#0b2c69] text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1 ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-1">
            ...
          </span>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i
                ? "bg-[#0b2c69] text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-1">
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={totalPages}
          className={`px-3 py-1 border rounded-md ${
            currentPage === totalPages
              ? "bg-[#0b2c69] text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return buttons;
  };
const handleLoanTypeChange = (value) => {
  const updatedFilters = { ...filters, loan_type: value };
  setFilters(updatedFilters);

  // 🔥 Fetch immediately when loan type changes
  fetchLoanApplications(1, updatedFilters);
  };
  const handleLoanTypeChangeloans = (value) => {
  const updatedFilters = { ...filters, loans: value };
  setFilters(updatedFilters);

  // 🔥 Fetch immediately when loan type changes
  fetchLoanApplications(1, updatedFilters);
};


  return (
    <div>
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around bg-white">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            Loan Application
          </h2>

          <div className="flex gap-3">
            <div className="flex gap-5 items-center">
              <div>
                <select
                  name="field"
                  value={filters.field}
                  onChange={(e) => handleFilterChange('field', e.target.value)}
                  className="border border-gray-300 rounded pl-2 w-[111px] h-[31px] text-[12px]"
                >
                  <option value="">Field</option>
                  <option value="loan_no">Loan No</option>
                  <option value="party_name">Party Name</option>
                    <option value="Scheme">Scheme</option>
                  <option value="added_by">Added By</option>
                  <option value="approved_by">Approved By</option>
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  style={{
                    width: "134.64px",
                    height: "31.49px",
                    borderRadius: "5px",
                    borderWidth: "0.62px",
                  }}
                  className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
                />
                <button
                  style={{
                    width: "30px",
                    height: "31px",
                    borderRadius: "5px",
                  }}
                  className="bg-[#0b2c69] text-white text-[11.25px] font-source font-normal flex items-center justify-center hover:bg-[#0a1f5a]"
                  onClick={handleSearch}
                >
                  <CiSearch className="w-[14px] h-[14px] font-bold" />
                </button>
              </div>

              {/* Scheme Filter */}
              {/* <div className="relative w-[111px]">
                <button
                  className="border border-black rounded h-[31px] w-full text-left text-[12px] flex items-center justify-between px-2 transition-colors duration-200 hover:border-gray-400"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="truncate">{selectedScheme || "Scheme"}</span>
                  <IoChevronDownOutline
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="absolute z-10 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white mt-1 rounded shadow-lg">
                    {schemesLoading ? (
                      <li className="px-2 py-1 text-[12px]">Loading...</li>
                    ) : schemesError ? (
                      <li className="px-2 py-1 text-[12px]">{schemesError}</li>
                    ) : schemes && schemes.length > 0 ? (
                      schemes.map((s, index) => {
                        const label = typeof s === 'string' ? s : (s.schemeName || s.SchemeName || s.name || s.schemeCode || s.scheme_code || s.code || JSON.stringify(s));
                        return (
                          <li
                            key={s.id || index}
                            className="px-2 py-1 cursor-pointer text-[12px] hover:bg-gray-100"
                            onClick={() => handleSchemeSelect(label)}
                          >
                            {label}
                          </li>
                        );
                      })
                    ) : (
                      <li className="px-2 py-1 text-[12px]">No schemes available</li>
                    )}
                  </ul>
                )}
                {selectedScheme && (
                  <button
                    onClick={clearSchemeFilter}
                    className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                    title="Clear scheme filter"
                  >
                    ×
                  </button>
                )}
              </div> */}

              <div>
  <select
  name="loan_type"
  value={filters.loan_type}
  onChange={(e) => handleLoanTypeChange(e.target.value)}
  className="border border-gray-300 rounded pl-2 w-[130px] h-[31px] text-[12px]"
>
  <option value="">Select Loan Type</option>
  <option value="all">ALL Loans</option>
  <option value="gold">Gold Loans</option>
  <option value="silver">Silver Loans</option>
</select>

              </div>
                <div>
  <select
  name="loans"
  value={filters.loans}
  onChange={(e) => handleLoanTypeChangeloans(e.target.value)}
  className="border border-gray-300 rounded pl-2 w-[100px] h-[31px] text-[12px]"
>
                  <option value="">Select Loan</option>
                  <option value="all">ALL Loans</option>
  <option value="bullet">Bullet Loan</option>
  
  <option value="emi">EMI Loan</option>
</select>

</div>


            </div>

            <div className="flex gap-5 items-center">
              {/* Date Filter */}
              <div className="relative w-[134px]">
                <div className="border rounded-[8px] h-[31px] border-[#D0D5DD] p-2 flex justify-between items-center">
                  <p className="text-[12px] font-semibold">
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "Loan Date"}
                  </p>
                  <div className="flex items-center">
                    {selectedDate && (
                      <button
                        onClick={clearDateFilter}
                        className="text-red-500 mr-1 text-xs"
                        title="Clear date filter"
                      >
                        ×
                      </button>
                    )}
                    <img
                      src={calender}
                      alt="calendar"
                      className="w-[18px] h-[18px] cursor-pointer"
                      onClick={() => setOpen(!open)}
                    />
                  </div>
                </div>

                {open && (
                  <div className="absolute top-10 right-0 z-50 bg-white border border-gray-300 rounded shadow-lg">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateSelect}
                      inline
                    />
                  </div>
                )}
              </div>

              {/* Clear All Filters Button */}
              {(selectedDate || selectedScheme || filters.status || Object.values(filters).some(val => val && val !== 'field' && val !== 'search')) && (
                <button
                  onClick={clearAllFilters}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-[12px] hover:bg-gray-600"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-center item-center gap-5">
            <button
              style={{
                width: "74px",
                height: "24px",
                borderRadius: "3.75px",
                gap: "6.25px",
              }}
              onClick={() => navigate("/Add-Gold-Loan-Application")}
              className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center hover:bg-[#091f6c]"
            >
              Add
            </button>
            <button className="w-[74px] h-[24px] rounded-[3.75px] bg-[#C1121F] text-white text-[10px]" onClick={() => navigate("/")}>
                Exit
              </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="flex justify-center mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-[1290px] text-sm">
            <strong>Success: </strong>
            {successMessage}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(selectedDate || selectedScheme || filters.status) && (
        <div className="flex justify-center mt-2">
          <div className="w-[1290px] bg-blue-50 border border-blue-200 rounded p-2 text-sm">
            <span className="font-semibold text-blue-800">Active Filters: </span>
            {selectedDate && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mx-1 text-xs">
                Date: {selectedDate.toLocaleDateString()}
              </span>
            )}
            {selectedScheme && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mx-1 text-xs">
                Scheme: {selectedScheme}
              </span>
            )}
            {filters.status && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mx-1 text-xs">
                Status: {filters.status}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center text-center">
        <div className="overflow-x-auto mt-5 w-[1290px] min-h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                Loading loan applications...
              </div>
            </div>
          ) : (
            <table className="w-full border-collapse  border-gray-300">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[103px]">
                    Loan No
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[204px]">
                    Party Name
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[101px]">
                    Loan Date
                    </th>
                     <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[204px]">
                    Scheme 
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[104px]">
                    Loan Amount
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[128px]">
                    <select
                      className="rounded text-[13px] w-full bg-transparent text-white focus:outline-none"
                      value={filters.status}
                      onChange={(e) => handleStatusFilterChange(e.target.value)}
                    >
                      <option value="" className="text-black bg-white">
                        All Status
                      </option>
                      <option value="Pending" className="text-black bg-white">
                        Pending
                      </option>
                      <option value="Approved" className="text-black bg-white">
                        Approved
                      </option>
                      <option value="Cancelled" className="text-black bg-white">
                        Cancelled
                      </option>
                      <option value="Closed" className="text-black bg-white">
                        Closed
                      </option>
                    </select>
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[187px]">
                    Added By
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[176px]">
                    Approved By
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[156px]">
                    Action
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[156px]">
                    Payment
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[13px] w-[111px]">
                    Loan Repayment
                  </th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {loanApplication.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    } `}
                  >
                    <td
                      className="px-4 py-2 text-blue-600 cursor-pointer hover:underline font-medium"
                      onClick={() => handleClick(row)}
                    >
                      {row.Loan_No}
                    </td>
                    <td className="px-4 py-2">{row.Party_Name}</td>
                    <td className="px-4 py-2">
                      {formatIndianDate(row.Loan_Date)}
                    </td>
                     <td className="px-4 py-2">
                      {(row.Scheme)}
                    </td>
                    <td className="px-4 py-2 font-medium">
                      ₹{row.Loan_Amount?.toLocaleString("en-IN")}
                    </td>
                    <td
                      className={`px-4 py-2 font-semibold ${getStatusColor(
                        row.Status
                      )}`}
                    >
                      {getStatusText(row.Status)}
                    </td>
                    <td className="px-4 py-2">{row.Added_By || "N/A"}</td>
                    <td className="px-4 py-2">{row.Approved_By || "N/A"}</td>

                    {/* Action buttons */}
                    <td className="px-4 py-2">
                      {(() => {
                        const st = (row.Status || "").toLowerCase();

                        const IconButton = ({
                          onClick,
                          title,
                          children,
                          bg = "",
                        }) => (
                          <div
                            title={title}
                            onClick={onClick}
                            className={`w-[24px] h-[24px] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer ${bg}`}
                          >
                            {children}
                          </div>
                        );

                        // navigation handlers using state
                        const goEdit = (loan) => () =>
                          navigate("/Edit-Loan-Application", {
                            state: {
                              loanId: loan.Loan_No,
                              loanData: loan,
                            },
                          });
                        const goUpload = (loan) => () =>
                          handleUploadClick(loan);
                        const goPrint = (loan) => () =>
                          navigate("/Print-Loan-Application", {
                            state: { loanId: loan.Loan_No },
                          });
                        const goGold = (loan) => () =>
                          navigate("/Appraisal-Note", {
                            state: {
                              loanId: loan.Loan_No,
                              loanData: loan,
                            },
                          });
                        const goBarcode = (loan) => () =>
                          navigate("/Barcode", {
                            state: {
                              loanId: loan.Loan_No,
                              loanData: loan,
                            },
                          });
                        const goCancel = (loan) => () => {
                          setSelectedCancelLoan(loan);
                          setCancelRemark("");
                          setDeleteModalOpen(true);
                        };

                        // Render sets per status
                        if (st === "approved") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton
                                onClick={goPrint(row)}
                                title="Print"
                                bg="bg-blue-500 text-white"
                              >
                                <PiPrinterLight className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={goUpload(row)}
                                title="Upload"
                                bg="bg-green-600 text-white"
                              >
                                <CgSoftwareUpload className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenRemark(row)}
                                title="Message"
                                bg="bg-yellow-400"
                              >
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={goGold(row)}
                                title="Gold Details"
                                bg="border"
                              >
                                <img
                                  src={goldlogo}
                                  alt="gold"
                                  className="w-[20px] h-[20px]"
                                />
                              </IconButton>
                              <IconButton
                                onClick={goBarcode(row)}
                                title="Barcode"
                                bg="bg-gray-200"
                              >
                                <CiBarcode className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        if (st === "pending") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton
                                onClick={goEdit(row)}
                                title="Edit"
                                bg="bg-blue-500 text-white"
                              >
                                <CiEdit className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={goUpload(row)}
                                title="Upload"
                                bg="bg-green-600 text-white"
                              >
                                <CgSoftwareUpload className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenRemark(row)}
                                title="Message"
                                bg="bg-yellow-400"
                              >
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={goGold(row)}
                                title="Gold Details"
                                bg="border"
                              >
                                <img
                                  src={goldlogo}
                                  alt="gold"
                                  className="w-[20px] h-[20px]"
                                />
                              </IconButton>
                              <IconButton
                                onClick={goCancel(row)}
                                title="Cancel"
                                bg="bg-red-600 text-white"
                              >
                                <MdOutlineCancel className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        if (st === "cancelled") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton
                                onClick={() => handleOpenRemark(row)}
                                title="Message"
                                bg="bg-yellow-400"
                              >
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        if (st === "closed") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton
                                onClick={goEdit(row)}
                                title="Edit"
                                bg="bg-blue-500 text-white"
                              >
                                <CiEdit className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={goUpload(row)}
                                title="Upload"
                                bg="bg-green-600 text-white"
                              >
                                <CgSoftwareUpload className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenRemark(row)}
                                title="Message"
                                bg="bg-yellow-400"
                              >
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={goPrint(row)}
                                title="Print"
                                bg="bg-blue-300 text-white"
                              >
                                <PiPrinterLight className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton
                                onClick={goGold(row)}
                                title="Gold Details"
                                bg="border"
                              >
                                <img
                                  src={goldlogo}
                                  alt="gold"
                                  className="w-[20px] h-[20px]" 
                                />
                              </IconButton>
                              <IconButton
                                onClick={goBarcode(row)}
                                title="Barcode"
                                bg="bg-gray-200"
                              >
                                <CiBarcode className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        return (
                          <div className="flex gap-2 justify-center">
                            <IconButton
                              onClick={() => handleOpenRemark(row)}
                              title="Message"
                              bg="bg-yellow-400"
                            >
                              <RiMessage2Line className="w-[20px] h-[20px]" />
                            </IconButton>
                          </div>
                        );
                      })()}
                    </td>

                    {/* Payment column */}
                    <td className="px-4 py-2 text-center">
                      {(() => {
                        const st = (row.Status || "").toLowerCase();
                        if (st === "approved") {
                          return (
                            <span
                              className="text-blue-600 cursor-pointer hover:underline"
                              onClick={() =>
                                navigate(`/NOC`, {
                                  state: {
                                    loanId: row.Loan_No,
                                    loanData: row,
                                  },
                                })
                              }
                            >
                              NOC
                            </span>
                          );
                        }
                        if (st === "closed" || st === "cancelled") {
                          return <span className="text-gray-500">NA</span>;
                        }
                        if (st === "pending") {
                          return (
                            <span
                              className="text-blue-600 cursor-pointer hover:underline"
                              onClick={() =>
                                navigate(`/Gold-Loan-Approval`, {
                                  state: {
                                    loanId: row.Loan_No,
                                    loanData: row,
                                  },
                                })
                              }
                            >
                              Approve
                            </span>
                          );
                        }
                        return (
                          <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(`/Loan-Enquiry`, {
                                state: {
                                  loanId: row.Loan_No,
                                  loanData: row,
                                },
                              })
                            }
                          >
                            view
                          </span>
                        );
                      })()}
                    </td>

                    {/* Loan Repayment column */}
                    <td className="px-4 py-2 text-center">
                      {(() => {
                        const st = (row.Status || "").toLowerCase();
                        if (st === "approved") {
                          return (
                            <button
                              className="bg-[#0A2478] text-white px-3 py-1 rounded text-[11px] hover:bg-[#091f6c]"
                              onClick={() =>
                                navigate(`/Add-Loan-Repayment`, {
                                  state: {
                                    loanId: row.Loan_No,
                                    loanData: row,
                                  },
                                })
                              }
                            >
                              Repay
                            </button>
                          );
                        }
                        return <span className="text-gray-500">NA</span>;
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && loanApplication.length > 0 && (
        <div className="flex justify-center items-center px-6 py-3 border-t gap-4 mt-4">
          <div className="flex items-center gap-2">
            {renderPaginationButtons()}
          </div>
          <div className="ml-4 text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages} (
            {pagination.total} total records)
          </div>
        </div>
      )}

      {/* Remark Modal */}
      {isRemarkOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[829px] h-[356px] p-6 shadow-lg relative rounded-[8px]">
            <h2
              className="font-semibold text-[24px] leading-[100%] tracking-[0.03em] mb-4 text-[#0A2478]"
              style={{ fontFamily: "Source Sans 3" }}
            >
              Remark
            </h2>

            {loadingRemark ? (
              <div className="flex justify-center items-center h-[200px]">
                <div className="text-lg text-gray-600">Loading remark...</div>
              </div>
            ) : (
              <div className="w-[728px] border border-gray-300 p-5 resize-none h-[183px] rounded-[16px] flex justify-between">
                <div>
                  <p className="text-black font-bold text-[14px]">
                    Remark for Loan #{remarkData?.id}
                  </p>
                  <p
                    className="text-[14px] mt-2 text-[#000000C7]"
                    dangerouslySetInnerHTML={{
                      __html: remarkData?.remark || "No remark available",
                    }}
                  ></p>
                </div>
                <div>
                  <img
                    src={envImg}
                    alt="envelope"
                    className="w-[156px] h-[156px] rounded-[10px]"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-center mt-4 gap-2">
              <button
                className="px-4 py-2 rounded w-[119px] h-[38px] bg-[#C1121F] text-white font-semibold cursor-pointer hover:bg-[#a50e1a]"
                onClick={() => {
                  setIsRemarkOpen(false);
                  setRemarkData(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel/Delete Modal with JoditEditor */}
      {deleteModalOpen && selectedCancelLoan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-[6.8px]">
          <div className="bg-white w-[600px] rounded-lg shadow-lg p-6 relative">
            <div className="absolute -mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-red-500 rounded-full">
                <span className="text-red-500 text-3xl leading-none">!</span>
              </div>
            </div>

            <div className="mt-15 text-center">
              <p className="text-[20px] font-semibold text-[#0A0A0A]">
                Are you sure to Cancel this Loan?
              </p>
              <p className="text-[14px] text-[#7C7C7C] mt-1">
                You won't be able to revert this action
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Loan: {selectedCancelLoan.Party_Name} (#
                {selectedCancelLoan.Loan_No})
              </p>
            </div>

            <div className="mt-6">
              <label className="text-[19px] font-medium text-[#0A2478] mb-2 block">
                Add Remark
              </label>
              <div className="border border-[#BEBEBE] rounded-md overflow-hidden">
                <JoditEditor
                  ref={editor}
                  value={cancelRemark}
                  config={editorConfig}
                  onBlur={(newContent) => setCancelRemark(newContent)}
                  onChange={(newContent) => {}}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Please provide a detailed reason for cancellation
              </p>
            </div>

            <div className="mt-5 flex justify-center gap-4">
              <button
                className="bg-[#0A2478] text-white px-5 py-2 rounded-md text-[15px] font-semibold hover:bg-[#091E5E] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDeleteConfirm}
                disabled={
                  cancelLoading || !cancelRemark.replace(/<[^>]*>/g, "").trim()
                }
              >
                {cancelLoading ? "Submitting..." : "Submit"}
              </button>
              <button
                className="bg-[#F11717] text-white px-5 py-2 rounded-md text-[15px] font-semibold hover:bg-[#C70F0F] disabled:opacity-50"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setSelectedCancelLoan(null);
                  setCancelRemark("");
                }}
                disabled={cancelLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModalOpen && selectedUploadLoan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-[6.8px]">
          <div className="bg-white w-[850px] max-w-[95%] rounded-lg shadow-lg p-8 relative">
            <h2 className="text-[20px] font-bold text-[#0A2478] pb-6">
              Upload file against loan #{selectedUploadLoan.Loan_No}
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-5">
              {/* File Description Input */}
              <div className="flex flex-col">
                <label className="text-[15px] font-medium mb-1">
                  File Description
                </label>
                <input
                  type="text"
                  placeholder="Enter the Description"
                  value={fileDescription}
                  onChange={(e) => setFileDescription(e.target.value)}
                  className="border border-[#BEBEBE] rounded-md p-2 focus:ring-2 focus:ring-[#0A2478] focus:outline-none"
                />
              </div>

              {/* Upload File Input and Button */}
              <div className="flex flex-col">
                <label className="text-[15px] font-medium mb-1">Upload</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border border-[#BEBEBE] rounded-md p-2 w-full text-[14px] file:mr-4 file:py-1 file:px-2 file:text-sm file:bg-gray-400 file:text-[#4A4A4A]"
                  />
                  <button
                    className="bg-[#0A2478] text-white px-5 py-2 rounded-md hover:bg-[#091f6c] flex-shrink-0 disabled:opacity-50"
                    onClick={handleUploadSubmit}
                    disabled={
                      uploadLoading || !selectedFile || !fileDescription.trim()
                    }
                  >
                    {uploadLoading ? "Uploading..." : "Upload Files"}
                  </button>
                </div>
              </div>
            </div>

            {/* Uploaded Files Table */}
            <div className="mt-6 border border-gray-300 rounded-md overflow-hidden">
              <table className="w-full border-collapse text-[14px]">
                <thead>
                  <tr className="bg-[#0A2478] text-white">
                    <th className="p-3 border border-gray-300 font-semibold">
                      File Name
                    </th>
                    <th className="p-3 border border-gray-300 font-semibold">
                      File Description
                    </th>
                    <th className="p-3 border border-gray-300 font-semibold">
                      Uploaded Date
                    </th>
                    <th className="p-3 border border-gray-300 font-semibold">
                      Uploaded By
                    </th>
                    <th className="p-3 border border-gray-300 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {documentsLoading ? (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        Loading documents...
                      </td>
                    </tr>
                  ) : uploadedDocuments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500">
                        No documents uploaded yet
                      </td>
                    </tr>
                  ) : (
                    uploadedDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-300">
                          {doc.file_name}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {doc.file_description || "—"}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {formatDate(doc.uploaded_date)}
                        </td>
                        <td className="p-3 border border-gray-300">
                          {doc.uploaded_by || "System"}
                        </td>
                        <td className="p-3 border border-gray-300">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleDocumentAction(doc)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-8">
              <button
                className="bg-[#C1121F] text-white px-9 py-2 rounded-md hover:bg-[#A30F19]"
                onClick={handleUploadCancel}
                disabled={uploadLoading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplication;