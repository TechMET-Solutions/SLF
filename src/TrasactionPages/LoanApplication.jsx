import { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiBarcode, CiEdit, CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import calender from "../assets/calender.png";
import goldlogo from "../assets/gold_print.svg";
import envImg from "../assets/envImg.jpg";

import { formatIndianDate } from '../utils/Helpers';
import { PiPrinterLight } from 'react-icons/pi';
import { CgSoftwareUpload } from 'react-icons/cg';
import { RiMessage2Line } from 'react-icons/ri';
import { API } from '../api';

const LoanApplication = () => {
  useEffect(() => {
    document.title = "SLF | Loan Application";
  }, []);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
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

  // State for API data and pagination
  const [loanApplication, setLoanApplication] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    field: ""
  });
  const [remarkData, setRemarkData] = useState(null);
  const [loadingRemark, setLoadingRemark] = useState(false);

  const options = [
    "01", "02", "03", "04", "11", "13",
    "BGR-01", "BGR-02", "COR-01", "COR-02",
    "IND-01", "IND-02", "IND-03", "IND-04"
  ];

  // Jodit Editor configuration
  const editorConfig = {
    readonly: false,
    height: 180,
    placeholder: "Type your cancellation remark here...",
    toolbarAdaptive: false,
    buttons: [
      "bold", "italic", "underline", "strikethrough",
      "ul", "ol", "outdent", "indent",
      "font", "fontsize", "brush", "paragraph",
      "link", "align", "undo", "redo"
    ],
    removeButtons: ['image', 'file', 'video', 'source'], // Remove unnecessary buttons
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html"
  };

  // Create axios instance with base configuration
  const apiClient = axios.create({
    baseURL: API,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Fetch loan applications from API using Axios
  const fetchLoanApplications = async (page = 1, status = "") => {
    setLoading(true);
    setError("");
    try {
      const params = {
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(status && { status })
      };

      const response = await apiClient.get('/Transactions/goldloan/all', { params });

      if (response.data.success) {
        setLoanApplication(response.data.data);
        setPagination({
          page: response.data.page,
          totalPages: response.data.totalPages,
          total: response.data.total,
          limit: pagination.limit
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch loan applications");
      }
    } catch (err) {
      console.error("Error fetching loan applications:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch loan applications");
      setLoanApplication([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLoanApplications();
  }, []);

  // Handle filter changes
  const handleStatusFilterChange = (status) => {
    setFilters({ ...filters, status });
    fetchLoanApplications(1, status);
  };

  // Handle search
  const handleSearch = () => {
    fetchLoanApplications(1, filters.status);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchLoanApplications(newPage, filters.status);
    }
  };

  const handleOpenRemark = async (row) => {
    setLoadingRemark(true);
    try {
      let response;
      const status = row.Status.toLowerCase();

      if (status === "cancelled") {
        response = await axios.get(`${API}/Transactions/goldloan/remark/${row.Loan_No}`);
      } else if (status === "pending") {
       response = await axios.get(`${API}/Transactions/Customer/remark/${row.BorrowerId}`);

      }

      if (response.data.success) {
        setRemarkData(response.data.data);
        setIsRemarkOpen(true);
      } else {
        throw new Error(response.data.message || 'Failed to fetch remark');
      }
    } catch (error) {
      console.error('Error fetching remark:', error);
      alert('Failed to fetch remark: ' + (error.message || 'Unknown error'));
    } finally {
      setLoadingRemark(false);
    }
  };

  // Handle delete confirmation using Axios - FIXED VERSION
  const handleDeleteConfirm = async () => {
    if (!selectedCancelLoan) return;

    // Convert HTML to plain text for the remark
    const plainTextRemark = cancelRemark.replace(/<[^>]*>/g, '').trim();

    if (!plainTextRemark) {
      alert('Please provide a cancellation remark');
      return;
    }

    setCancelLoading(true);
    try {
      // Debug: Log the selected loan data to see what fields are available


      // Try different possible ID fields - check what your backend expects
      const possibleIdFields = [
        selectedCancelLoan.id,
        selectedCancelLoan.ID,
        selectedCancelLoan.Id,
        selectedCancelLoan.loan_id,
        selectedCancelLoan.Loan_ID,
        selectedCancelLoan.LoanId,
        selectedCancelLoan.Loan_No // Sometimes loan number is used as ID
      ].filter(Boolean); // Remove null/undefined values



      if (possibleIdFields.length === 0) {
        throw new Error('No valid ID field found in loan data');
      }

      // Use the first available ID field
      const loanId = possibleIdFields[0];


      console.log('Sending cancellation request with:', {
        id: loanId,
        remark: plainTextRemark
      });

      // Since your backend uses PUT method for cancellation
      const response = await apiClient.put('/Transactions/goldloan/cancel', {
        id: loanId,
        remark: plainTextRemark,
      });



      if (response.data.success) {
        // Successfully cancelled - refresh the loan applications list
        fetchLoanApplications(pagination.page, filters.status);

        // Close the modal
        setDeleteModalOpen(false);
        setSelectedCancelLoan(null);
        setCancelRemark("");

        // Show success message
        setSuccessMessage('Loan application cancelled successfully');
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error(response.data.message || 'Failed to cancel loan application');
      }
    } catch (err) {
      console.error('Error cancelling loan application:', err);

      let errorMessage = 'Failed to cancel loan application';

      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;

        // If it's a 400 error, show more specific message
        if (err.response.status === 400) {
          errorMessage = `Bad Request: ${err.response.data?.message || 'Invalid data sent to server'}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something else happened
        errorMessage = err.message;
      }

      alert(`Error: ${errorMessage}`);
    } finally {
      setCancelLoading(false);
    }
  };

  const handleClick = (row) => {
    if (row.Status === "Cancelled") {
      navigate("/Cancelled-Loan");
    } else {
      navigate("/View-Loan-Details");
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
    return status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || "Unknown";
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;

    // Previous button
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

    // Page numbers
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${currentPage === i ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
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
          className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
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
            className={`px-3 py-1 border rounded-md ${currentPage === i ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
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
          className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
            }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
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

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around">
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
                  onChange={(e) => setFilters({ ...filters, field: e.target.value })}
                  className="border border-gray-300 rounded pl-2 w-[111px] h-[31px] text-[12px]"
                >
                  <option value="">Field</option>
                  <option value="loan_no">Loan No</option>
                  <option value="party_name">Party Name</option>
                  <option value="loan_date">Loan Date</option>
                  <option value="added_on">Added on</option>
                  <option value="added_by">Added By</option>
                </select>
              </div>

              <div className='flex gap-2'>
                <input
                  type="text"
                  placeholder='Search'
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                  <CiSearch className='w-[14px] h-[14px] font-bold' />
                </button>
              </div>

              <div className="relative w-[111px]">
                <button
                  className="border border-gray-300 rounded pl-2 h-[31px] w-full text-left text-[12px] flex items-center justify-between px-2"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{selected || "Scheme"}</span>
                  <span className="text-xs">▼</span>
                </button>

                {isOpen && (
                  <ul className="absolute z-10 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white mt-1 rounded shadow-lg">
                    {options.map((opt, index) => (
                      <li
                        key={index}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-[12px]"
                        onClick={() => {
                          setSelected(opt);
                          setIsOpen(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )
                }
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div className='relative w-[134px]'>
                <div className='border rounded-[8px] h-[31px] border-[#D0D5DD] p-2 flex justify-between items-center'>
                  <p className='text-[12px] font-semibold'>
                    {selectedDate ? selectedDate.toLocaleDateString() : "Loan Date"}
                  </p>
                  <img
                    src={calender}
                    alt="calendar"
                    className="w-[18px] h-[18px] cursor-pointer"
                    onClick={() => setOpen(!open)}
                  />
                </div>

                {open && (
                  <div className="absolute top-10 right-0 z-50 bg-white border border-gray-300 rounded shadow-lg">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setOpen(false);
                      }}
                      inline
                    />
                  </div>
                )}
              </div>
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
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="flex justify-center mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-[1290px] text-sm">
            <strong>Success: </strong>{successMessage}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex justify-center mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-[1290px] text-sm">
            <strong>Error: </strong>{error}
          </div>
        </div>
      )}

      <div className="flex justify-center text-center">
        <div className="overflow-x-auto mt-5 w-[1290px] min-h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Loading loan applications...</div>
            </div>
          ) : loanApplication.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">No loan applications found</div>
            </div>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[103px]">Loan No</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[204px]">Party Name</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[101px]">Loan Date</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[104px]">Loan Amount</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[128px]">
                    <select
                      className="rounded text-[13px] w-full bg-transparent text-white focus:outline-none"
                      value={filters.status}
                      onChange={(e) => handleStatusFilterChange(e.target.value)}
                    >
                      <option value="" className="text-black bg-white">All Status</option>
                      <option value="Pending" className="text-black bg-white">Pending</option>
                      <option value="Approved" className="text-black bg-white">Approved</option>
                      <option value="Cancelled" className="text-black bg-white">Cancelled</option>
                      <option value="Closed" className="text-black bg-white">Closed</option>
                    </select>
                  </th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[187px]">Added By</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[176px]">Approved By</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[156px]">Action</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[156px]">Payment</th>
                  <th className="px-4 py-2 border-r border-gray-300 text-[13px] w-[111px]">Loan Repayment</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {loanApplication.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td
                      className="px-4 py-2 text-blue-600 cursor-pointer hover:underline font-medium"
                      onClick={() => handleClick(row)}
                    >
                      {row.Loan_No}
                    </td>
                    <td className="px-4 py-2">{row.Party_Name}</td>
                    <td className="px-4 py-2">{formatIndianDate(row.Loan_Date)}</td>
                    <td className="px-4 py-2 font-medium">₹{row.Loan_Amount?.toLocaleString("en-IN")}</td>
                    <td className={`px-4 py-2 font-semibold ${getStatusColor(row.Status)}`}>
                      {getStatusText(row.Status)}
                    </td>
                    <td className="px-4 py-2">{row.Added_By || "N/A"}</td>
                    <td className="px-4 py-2">{row.Approved_By || "N/A"}</td>

                    {/* Action buttons */}
                    <td className="px-4 py-2">
                      {(() => {
                        const st = (row.Status || "").toLowerCase();

                        const IconButton = ({ onClick, title, children, bg = "" }) => (
                          <div
                            title={title}
                            onClick={onClick}
                            className={`w-[24px] h-[24px] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer ${bg}`}
                          >
                            {children}
                          </div>
                        );

                        // navigation handlers using state
                        const goEdit = (loan) => () => navigate("/Edit-Loan-Details", { state: { loan } });
                        const goUpload = (loan) => () => navigate("/Upload", { state: { loan } });
                        const goPrint = (loan) => () => navigate("/Print-Loan-Application", { state: { loan } });
                        const goGold = (loan) => () => navigate("/Appraisal-Note", { state: { loan } });
                        const goBarcode = (loan) => () => navigate("/Barcode", { state: { loan } });
                        const goCancel = (loan) => () => {
                          setSelectedCancelLoan(loan);
                          setCancelRemark("");
                          setDeleteModalOpen(true);
                        };

                        // Render sets per status
                        if (st === "approved") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton onClick={goPrint(row)} title="Print" bg="bg-blue-500 text-white">
                                <PiPrinterLight className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goUpload(row)} title="Upload" bg="bg-green-600 text-white">
                                <CgSoftwareUpload className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={() => handleOpenRemark(row)} title="Message" bg="bg-yellow-400">
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goGold(row)} title="Gold Details" bg="border" >
                                <img src={goldlogo} alt="gold" className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goBarcode(row)} title="Barcode" bg="bg-gray-200">
                                <CiBarcode className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        if (st === "pending") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton onClick={goEdit(row)} title="Edit" bg="bg-blue-500 text-white">
                                <CiEdit className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goUpload(row)} title="Upload" bg="bg-green-600 text-white">
                                <CgSoftwareUpload className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={() => handleOpenRemark(row)} title="Message" bg="bg-yellow-400">
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goGold(row)} title="Gold Details" bg="border">
                                <img src={goldlogo} alt="gold" className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goCancel(row)} title="Cancel" bg="bg-red-600 text-white">
                                <MdOutlineCancel className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        if (st === "cancelled") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton onClick={() => handleOpenRemark(row)} title="Message" bg="bg-yellow-400">
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        if (st === "closed") {
                          return (
                            <div className="flex gap-2 justify-center">
                              <IconButton onClick={goEdit(row)} title="Edit" bg="bg-blue-500 text-white">
                                <CiEdit className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goUpload(row)} title="Upload" bg="bg-green-600 text-white">
                                <CgSoftwareUpload className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={() => handleOpenRemark(row)} title="Message" bg="bg-yellow-400">
                                <RiMessage2Line className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goPrint(row)} title="Print" bg="bg-blue-300 text-white">
                                <PiPrinterLight className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goGold(row)} title="Gold Details" bg="border">
                                <img src={goldlogo} alt="gold" className="w-[20px] h-[20px]" />
                              </IconButton>
                              <IconButton onClick={goBarcode(row)} title="Barcode" bg="bg-gray-200">
                                <CiBarcode className="w-[20px] h-[20px]" />
                              </IconButton>
                            </div>
                          );
                        }

                        return (
                          <div className="flex gap-2 justify-center">
                            <IconButton onClick={() => handleOpenRemark(row)} title="Message" bg="bg-yellow-400">
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
                              onClick={() => navigate(`/NOC`)}
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
                              onClick={() => navigate(`/Gold-Loan-Approval`)}
                            >
                              Approve
                            </span>
                          );
                        }
                        return (
                          <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => navigate(`/Loan-Enquiry`)}
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
                              onClick={() => navigate(`/Repay-Loan`)}
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
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total records)
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
            <h2 className="font-semibold text-[24px] leading-[100%] tracking-[0.03em] mb-4 text-[#0A2478]"
              style={{ fontFamily: 'Source Sans 3' }}>
              Remark
            </h2>

            {loadingRemark ? (
              <div className="flex justify-center items-center h-[200px]">
                <div className="text-lg text-gray-600">Loading remark...</div>
              </div>
            ) : (
              <div className="w-[728px] border border-gray-300 p-5 resize-none h-[183px] rounded-[16px] flex justify-between">
                <div>
                  <p className='text-black font-bold text-[14px]'>
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
                  <img src={envImg} alt="envelope" className="w-[156px] h-[156px] rounded-[10px]" />
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
          <div className="bg-white w-[500px] rounded-lg shadow-lg p-6 relative">
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-red-500 rounded-full">
                <span className="text-red-500 text-3xl leading-none">!</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[20px] font-semibold text-[#0A0A0A]">
                Are you sure to Cancel this Loan?
              </p>
              <p className="text-[14px] text-[#7C7C7C] mt-1">
                You won't be able to revert this action
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Loan: {selectedCancelLoan.Party_Name} (#{selectedCancelLoan.Loan_No})
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
                  onChange={(newContent) => { }}
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
                disabled={cancelLoading || !cancelRemark.replace(/<[^>]*>/g, '').trim()}
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
    </div>
  );
};

export default LoanApplication;