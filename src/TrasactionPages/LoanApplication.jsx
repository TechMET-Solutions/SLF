// import { useEffect, useState } from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { CiEdit, CiSearch } from "react-icons/ci";
// import { MdOutlineCancel } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// import calender from "../assets/calender.png";
// import goldlogo from "../assets/goldlogo.svg";
// import msg from "../assets/msg.png";
// import printwithobject from "../assets/printwithobject.png";

// import envImg from "../assets/envImg.jpg";
// import text from "../assets/text.png";
// import upload from "../assets/upload.png";
// import { formatIndianDate } from '../utils/Helpers';
// const LoanApplication = () => {
//   useEffect(() => {
//     document.title = "SLF | Loan Application";
//   }, []);
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [open, setOpen] = useState(false);
//   const options = [
//     "01", "02", "03", "04", "11", "13",
//     "BGR-01", "BGR-02", "COR-01", "COR-02",
//     "IND-01", "IND-02", "IND-03", "IND-04"
//   ];
//   const [isRemarkOpen, setIsRemarkOpen] = useState(false);

//   const handleOpenRemark = () => {
//     setIsRemarkOpen(true);
//   };

//   const handleCloseRemark = () => {
//     setIsRemarkOpen(false);
//   };
//   const [loanApplication, setLoanApplication] = useState([
//     {
//       loan_no: "LN001",
//       party_name: "John Doe",
//       loan_date: "2025-10-01",
//       loan_amount: 50000,
//       status: "1", // 1 = Active, 0 = Inactive
//       added_by: "Admin",
//       approved_by: "Manager",
//       action: "view", // you can customize this
//       loan_repayment: "Pending"
//     },
//     {
//       loan_no: "LN002",
//       party_name: "Mary Jane",
//       loan_date: "2025-09-25",
//       loan_amount: 75000,
//       status: "0",
//       added_by: "Staff",
//       approved_by: "Supervisor",
//       action: "edit",
//       loan_repayment: "Completed"
//     },
//     {
//       loan_no: "LN003",
//       party_name: "Mary Jane",
//       loan_date: "2025-09-25",
//       loan_amount: 75000,
//       status: "2",
//       added_by: "Staff",
//       approved_by: "Supervisor",
//       action: "edit",
//       loan_repayment: "Completed"
//     }
//   ]);

//   const handleClick = (row) => {
//     if (row.status === "2") {
//       // 2 means Cancelled
//       navigate("/Cancelled-Loan");
//     } else {
//       navigate("/Loan-Enquiry");
//     }
//   };
//   return (
//     <div>
//       <div className="flex justify-center">
//         <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around">
//           <h2
//             style={{
//               fontFamily: "Source Sans 3, sans-serif",
//               fontWeight: 700, // Bold
//               fontSize: "20px",
//               lineHeight: "148%",
//               letterSpacing: "0em",
//             }}
//             className="text-red-600"
//           >
//             Loan Application
//           </h2>

//           <div className="flex gap-3">
//             <div className="flex gap-5 items-center">
//               <div>
//                 {/* <label className="text-[14px]">Lead Person</label> */}
//                 <select
//                   name="lead_person"
//                   //   value={branchData.lead_person}
//                   //   onChange={handleChange}
//                   className="border border-gray-300 rounded pl-2 w-[111px] h-[31px]"
//                 >
//                   <option value="" >
//                     Field
//                   </option>
//                   <option value="john">Loan No</option>
//                   <option value="mary">Party Name</option>
//                   <option value="alex">Loan Date</option>
//                   <option value="alex">Added on</option>
//                   <option value="alex">Added By</option>

//                 </select>
//               </div>

//               <div className='flex gap-2'>
//                 <input
//                   type="text"
//                   placeholder='Search'
//                   style={{
//                     width: "134.64px",
//                     height: "31.49px",
//                     borderRadius: "5px",
//                     borderWidth: "0.62px",
//                   }}
//                   className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
//                 />
//                 <button
//                   style={{
//                     width: "30px",
//                     height: "31px",
//                     borderRadius: "5px",
//                   }}
//                   className="bg-[#0b2c69] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
//                 >
//                   <CiSearch className='w-[14px] h-[14px] font-bold' />
//                 </button>
//               </div>

//               <div className="relative w-[111px]">
//                 <button
//                   className="border border-gray-300 rounded pl-2 h-[31px] w-full text-left"
//                   onClick={() => setIsOpen(!isOpen)}
//                 >
//                   {selected || "Scheme"}
//                 </button>

//                 {isOpen && (
//                   <ul className="absolute z-10 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white mt-1 rounded">
//                     {options.map((opt, index) => (
//                       <li
//                         key={index}
//                         className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                           setSelected(opt);
//                           setIsOpen(false);
//                         }}
//                       >
//                         {opt}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>

//             <div className="flex gap-5 items-center">

//               <div className='relative w-[134px]'>
//                 <div className='border rounded-[8px] h-[31px] border-[#D0D5DD] p-2 flex justify-between items-center'>
//                   <p className='text-[12px] font-semibold'>
//                     {selectedDate ? selectedDate.toLocaleDateString() : "Loan Date"}
//                   </p>
//                   <img
//                     src={calender}
//                     alt="calendar"
//                     className="w-[18px] h-[18px] cursor-pointer"
//                     onClick={() => setOpen(!open)}
//                   />
//                 </div>

//                 {open && (
//                   <div className="absolute top-10 right-0 z-50">
//                     <DatePicker
//                       selected={selectedDate}
//                       onChange={(date) => {
//                         setSelectedDate(date);
//                         setOpen(false);
//                       }}
//                       inline
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>


//           </div>
//           <div className="flex justify-center item-center gap-5">
//             <button
//               style={{
//                 width: "74px",
//                 height: "24px",
//                 borderRadius: "3.75px",
//                 gap: "6.25px",
//               }}
//               onClick={() => navigate("/Add-Gold-Loan-Application")}
//               className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
//             >
//               Add
//             </button>


//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center text-center">
//         <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
//           <table className="w-full border-collapse">
//             <thead className="bg-[#0A2478] text-white text-sm ">
//               <tr>
//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[103px] ">Loan No</th>
//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[204px]">Party Name</th>
//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[101px]"> loan Date</th>

//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[104px]">Loan Amount</th>
//                 <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[128px]">
//                   <select
//                     className=" rounded text-[13px] w-full"
//                     defaultValue=""
//                   >
//                     <option value="" className='text-black'>
//                       Status
//                     </option>
//                     <option value="approve" className='text-black'>Approve</option>
//                     <option value="pending" className='text-black'>Pending</option>
//                   </select>
//                 </th>

//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[187px]">Added By</th>
//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[176px]">Approved By</th>
//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[156px]">Action</th>
//                 <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[156px]">Payment</th>
//                 <th className="px-4 py-2  border-r border-gray-300 text-[13px] w-[111px]">Loan Repayment</th>
//               </tr>
//             </thead>
//             <tbody className="text-[12px]">
//               {loanApplication.map((row, index) => (
//                 <tr
//                   key={index}
//                   className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                 >
//                   <td
//                     className="px-4 py-2 text-blue-600 cursor-pointer hover:underline"
//                     onClick={() => handleClick(row)}
//                   >
//                     {row.loan_no}
//                   </td>
//                   <td className="px-4 py-2">{row.party_name}</td>
//                   <td className="px-4 py-2">{formatIndianDate(row.loan_date)}</td>
//                   <td className="px-4 py-2">₹{row.loan_amount.toLocaleString("en-IN")}</td>
//                   <td
//                     className={`px-4 py-2 font-semibold ${row.status === "1"
//                       ? "text-green-600" // Approved
//                       : row.status === "0"
//                         ? "text-orange-500" // Pending
//                         : "text-red-600" // Cancelled
//                       }`}
//                   >
//                     {row.status === "1"
//                       ? "Approved"
//                       : row.status === "0"
//                         ? "Pending"
//                         : "Cancelled"}
//                   </td>

//                   <td className="px-4 py-2">{row.added_by}</td>
//                   <td className="px-4 py-2">{row.approved_by}</td>


//                   {/* Action buttons */}
//                   <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
//                     <div className="flex gap-2 justify-center">
//                       <div className="w-[24px] h-[24px] bg-[#4A90E2] text-white rounded flex items-center justify-center 
//                     transition-transform duration-200 hover:scale-110 cursor-pointer">
//                         <CiEdit />
//                       </div>
//                       <div
//                         className="w-[24px] h-[24px] bg-[#F5A623] rounded flex items-center justify-center 
//                    transition-transform duration-200 hover:scale-110 cursor-pointer"
//                         onClick={handleOpenRemark}
//                       >
//                         <img src={msg} alt="message" className="w-[14px] h-[14px]" />
//                       </div>
//                       <div className="w-[24px] h-[24px] bg-[#28A745] rounded flex items-center justify-center 
//                     transition-transform duration-200 hover:scale-110 cursor-pointer">
//                         <img src={upload} alt="upload" className="w-[14px] h-[14px]" />
//                       </div>

//                       <div className="w-[24px] h-[24px] bg-[#50E3C2] rounded flex items-center justify-center 
//                     transition-transform duration-200 hover:scale-110 cursor-pointer">
//                         <img src={printwithobject} alt="print object" className="w-[14px] h-[14px]" />
//                       </div>
//                       <div className="w-[24px] h-[24px] bg-[#8B572A] rounded flex items-center justify-center 
//                     transition-transform duration-200 hover:scale-110 cursor-pointer">
//                         <img src={text} alt="text" className="w-[14px] h-[14px]" />
//                       </div>
//                       <div className="w-[24px] h-[24px] border rounded flex items-center justify-center 
//                     transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: "2px solid black" }}>
//                         <img src={goldlogo} alt="print object" className="w-[14px] h-[14px]" />
//                       </div>
//                       <div className="w-[24px] h-[24px] bg-[#C72828] rounded flex items-center justify-center 
//                     transition-transform duration-200 hover:scale-110 cursor-pointer text-white">
//                         <MdOutlineCancel />
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-4 py-2">view</td>

//                   {/* Loan Repayment toggle */}
//                   <td className="px-4 py-2">

//                     Repay
//                   </td>
//                 </tr>
//               ))}
//             </tbody>


//           </table>
//         </div>
//       </div>


//       {/* Pagination */}
//       <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
//         <button className="px-3 py-1 border rounded-md">Previous</button>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
//           <button className="px-3 py-1 border rounded-md">2</button>
//           <button className="px-3 py-1 border rounded-md">3</button>
//           <button className="px-3 py-1 border rounded-md">...</button>
//           <button className="px-3 py-1 border rounded-md">10</button>
//         </div>
//         <button className="px-3 py-1 border rounded-md">Next</button>
//       </div>



//       {isRemarkOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 " style={{
//           background: "#0101017A",
//           backdropFilter: "blur(6.8px)",
//         }}>
//           <div className="bg-white w-[829px] h-[356px] p-6  shadow-lg relative rounded-[8px]">
//             <h2 className="font-semibold text-[24px] leading-[100%] tracking-[0.03em] mb-4 text-[#0A2478]" style={{ fontFamily: 'Source Sans 3' }}>
//               Remark
//             </h2>
//             <div className="w-[728px] border border-gray-300  p-5 resize-none h-[183px] rounded-[16px] flex justify-between">
//               <div>
//                 <p className='text-black font-bold text-[14px]'>Documents Pending</p>
//                 <p className='text-[14px] mt-2 text-[#000000C7]'>Some required documents are missing from your application. To continue processing your<br></br> loan request, please upload the pending documents at the earliest. These may include<br></br> identity proof, address proof, income statements, or bank records, depending on your loan type. </p>
//               </div>
//               <div>
//                 <img src={envImg} alt="print object" className="w-[156px] h-[156px] rounded-[10px]" />
//               </div>
//             </div>

//             <div className="flex justify-center mt-4 gap-2">
//               <button
//                 className=" px-4 py-2 rounded w-[119px] h-[38px] bg-[#C1121F] text-white font-semibold cursor-pointer"
//                 onClick={handleCloseRemark}
//               >
//                 Close
//               </button>
//               {/* <button className="bg-[#0A2478] text-white px-4 py-2 rounded">
//                 Save
//               </button> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default LoanApplication

import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiEdit, CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import calender from "../assets/calender.png";
import goldlogo from "../assets/goldlogo.svg";
import msg from "../assets/msg.png";
import printwithobject from "../assets/printwithobject.png";
import envImg from "../assets/envImg.jpg";
import text from "../assets/text.png";
import upload from "../assets/upload.png";
import { formatIndianDate } from '../utils/Helpers';

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

  const options = [
    "01", "02", "03", "04", "11", "13",
    "BGR-01", "BGR-02", "COR-01", "COR-02",
    "IND-01", "IND-02", "IND-03", "IND-04"
  ];

  // Fetch loan applications from API
  const fetchLoanApplications = async (page = 1, status = "") => {
    setLoading(true);
    setError("");
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(status && { status })
      });

      const response = await fetch(`http://localhost:5000/Transactions/goldloan/all?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setLoanApplication(data.data);
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          total: data.total,
          limit: pagination.limit
        });
      } else {
        throw new Error(data.message || "Failed to fetch loan applications");
      }
    } catch (err) {
      console.error("Error fetching loan applications:", err);
      setError(err.message);
      // Fallback to empty data
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
    // Since the backend doesn't support search yet, we'll just refetch with current status
    fetchLoanApplications(1, filters.status);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchLoanApplications(newPage, filters.status);
    }
  };

  const handleOpenRemark = () => {
    setIsRemarkOpen(true);
  };

  const handleCloseRemark = () => {
    setIsRemarkOpen(false);
  };

  const handleClick = (row) => {
    if (row.Status === "Cancelled") {
      navigate("/Cancelled-Loan");
    } else {
      navigate("/Loan-Enquiry");
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
      // Show all pages if total pages is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show first page, current page with neighbors, and last page
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
              currentPage === i ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
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
            currentPage === totalPages ? "bg-[#0b2c69] text-white" : "hover:bg-gray-100"
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
                  onChange={(e) => setFilters({...filters, field: e.target.value})}
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
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
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
                )}
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
                      LN0{row.Loan_No}
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
                      <div className="flex gap-2 justify-center">
                        <div className="w-[24px] h-[24px] bg-[#4A90E2] text-white rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer">
                          <CiEdit />
                        </div>
                        <div
                          className="w-[24px] h-[24px] bg-[#F5A623] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer"
                          onClick={handleOpenRemark}
                        >
                          <img src={msg} alt="message" className="w-[14px] h-[14px]" />
                        </div>
                        <div className="w-[24px] h-[24px] bg-[#28A745] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer">
                          <img src={upload} alt="upload" className="w-[14px] h-[14px]" />
                        </div>
                        <div className="w-[24px] h-[24px] bg-[#50E3C2] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer">
                          <img src={printwithobject} alt="print object" className="w-[14px] h-[14px]" />
                        </div>
                        <div className="w-[24px] h-[24px] bg-[#8B572A] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer">
                          <img src={text} alt="text" className="w-[14px] h-[14px]" />
                        </div>
                        <div className="w-[24px] h-[24px] border rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: "2px solid black" }}>
                          <img src={goldlogo} alt="gold logo" className="w-[14px] h-[14px]" />
                        </div>
                        <div className="w-[24px] h-[24px] bg-[#C72828] rounded flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer text-white">
                          <MdOutlineCancel />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline">view</td>

                    {/* Loan Repayment toggle */}
                    <td className="px-4 py-2">
                      <button className="bg-[#0A2478] text-white px-3 py-1 rounded text-[11px] hover:bg-[#091f6c]">
                        Repay
                      </button>
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
            <h2 className="font-semibold text-[24px] leading-[100%] tracking-[0.03em] mb-4 text-[#0A2478]" style={{ fontFamily: 'Source Sans 3' }}>
              Remark
            </h2>
            <div className="w-[728px] border border-gray-300 p-5 resize-none h-[183px] rounded-[16px] flex justify-between">
              <div>
                <p className='text-black font-bold text-[14px]'>Documents Pending</p>
                <p className='text-[14px] mt-2 text-[#000000C7]'>
                  Some required documents are missing from your application. To continue processing your<br />
                  loan request, please upload the pending documents at the earliest. These may include<br />
                  identity proof, address proof, income statements, or bank records, depending on your loan type.
                </p>
              </div>
              <div>
                <img src={envImg} alt="envelope" className="w-[156px] h-[156px] rounded-[10px]" />
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-2">
              <button
                className="px-4 py-2 rounded w-[119px] h-[38px] bg-[#C1121F] text-white font-semibold cursor-pointer hover:bg-[#a50e1a]"
                onClick={handleCloseRemark}
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