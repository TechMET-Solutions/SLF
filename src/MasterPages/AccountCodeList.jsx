// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import { API } from "../api";
// import GroupData from "../assets/Group 124.svg";
// import { formatIndianDate } from "../utils/Helpers";
// import { useAuth } from "../API/Context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FiEdit } from "react-icons/fi";

// const AccountCodeList = () => {
//   useEffect(() => {
//     document.title = "SLF | Account Code List";
//   }, []);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);

//   console.log(data, "data");
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     accountGroup: "",
//     financialDate: "",
//     type: "",
//     addedBy: localStorage.getItem("email"), // or whatever you store
//   });

//   const [accountGroups, setAccountGroups] = useState([]);

//   const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
//   const navigate = useNavigate();
//   console.log(searchHeaders, "searchHeaders");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//  const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [showPagination, setShowPagination] = useState(false);
//   const itemsPerPage = 10;

//   // Compute total pages based on backend 'total' count
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // 🔹 UPDATED: Pagination Control
//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page); // Update local state
//     getAccountGroups(page); // Fetch specific page
//   };

//   const filteredData = useMemo(() => {
//     if (!searchQuery.trim()) return data;

//     const keywords = searchQuery
//       .toLowerCase()
//       .split(",")
//       .map((k) => k.trim())
//       .filter((k) => k);

//     return data.filter((row) => {
//       // Check if any keyword matches any of the checked headers
//       return keywords.some((keyword) =>
//         searchHeaders.some((header) =>
//           row[header]?.toString().toLowerCase().includes(keyword),
//         ),
//       );
//     });
//   }, [data, searchQuery, searchHeaders]);

//   const toggleHeader = (headerId) => {
//     setSearchHeaders((prev) =>
//       prev.includes(headerId)
//         ? prev.filter((id) => id !== headerId)
//         : [...prev, headerId],
//     );
//   };

//   useEffect(() => {
//     fetchAccountGroups();
//   }, []);

//   const fetchAccountGroups = async () => {
//     try {
//       const res = await axios.get(
//         "https://slunawat.co.in/api/account-group/list",
//       );

//       if (res.data.success) {
//         setAccountGroups(res.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching account groups:", error);
//     }
//   };

//   console.log(formData, "formData");
//   useEffect(() => {
//     fetchData();
//   }, []);



//   const fetchData = async () => {
//     try {
//       const res = await axios.get("https://slunawat.co.in/account-code/get", {
//         params: {
//           headers: searchHeaders.join(","),
//           search: searchQuery,
//         },
//       });

//       if (res.data.success) {
//         setData(res.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching account groups:", error);
//     }
//   };

//   const { loginUser } = useAuth(); // Ensure this is available

//   const handleSave = async () => {
//     if (!formData.name || !formData.financialDate || !formData.accountGroup || !formData.type) {
//       alert("Please fill all required fields");
//       return;
//     }

//     // Basic payload for both Create and Update
//     const payload = { ...formData };

//     try {
//       if (editMode) {
//         // ONLY pass modifiedBy during update
//         payload.modifiedBy = loginUser;

//         await axios.put(`${API}/account-code/update/${selectedId}`, payload);
//         alert("Sub Ledger Updated ✅");
//       } else {
//         // Pass addedBy during creation
//         payload.addedBy = loginUser;

//         await axios.post(`${API}/account-code/create`, payload);
//         alert("Sub Ledger Created ✅");
//       }

//       setIsModalOpen(false);
//       setEditMode(false);
//       fetchData();
//       setFormData({
//         name: "",
//         accountGroup: "",
//         financialDate: "",
//         type: "",
//         addedBy: "",
//       });
//     } catch (err) {
//       console.error("Error saving account:", err);
//     }
//   };
//   const handleEdit = (row) => {
//     setFormData({
//       name: row.name,
//       accountGroup: row.accountGroup,
//       financialDate: row.financialDate,
//       type: row.type,
//       addedBy: row.addedBy,
//     });

//     setSelectedId(row.id);
//     setEditMode(true);
//     setIsModalOpen(true);
//   };
//   return (
//     <div className="min-h-screen w-full font-[Source_Sans_3]">
//       {/* Topbar */}
//       <div className="flex justify-center">
//         <div className="flex justify-center mt-5">
//           <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
//             {/* Left Side: Title */}
//             <h2 className="text-red-600 font-bold text-[20px] leading-[148%] whitespace-nowrap">
//               Sub Ledger List
//             </h2>

//             {/* Right Side: Filters and Buttons Container */}
//             <div className="flex items-center gap-6">
//               {/* 1. Multi-Select Search Bar */}
//               <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[450px]">
//                 {/* Header Dropdown */}
//                 <div className="relative border-r border-gray-300 pr-2 mr-2">
//                   <button
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full whitespace-nowrap"
//                   >
//                     {/* This will now show 0 if the array is empty */}
//                     Headers ({searchHeaders.length}){" "}
//                     <span className="text-[8px]">▼</span>
//                   </button>

//                   {isDropdownOpen && (
//                     <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
//                       {[
//                         // { id: "sub_ledger_name", label: "Sub Ledger Name" },
//                         // { id: "financial_type", label: "Financial" },
//                         // { id: "ledger_group", label: "Ledger" },
//                         // { id: "account_type", label: "Type" },

//                         { id: "name", label: "Sub Ledger Name" },
//                         { id: "accountGroup", label: "Ledger" },
//                         { id: "financialDate", label: "Financial" },
//                         { id: "type", label: "Type" },
//                       ].map((col) => (
//                         <label
//                           key={col.id}
//                           className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={searchHeaders.includes(col.id)}
//                             onChange={() => toggleHeader(col.id)}
//                             className="w-3 h-3 accent-[#0A2478]"
//                           />
//                           <span className="text-[11px] font-source text-gray-700">
//                             {col.label}
//                           </span>
//                         </label>
//                       ))}
//                       <div className="border-t mt-1 pt-1 text-center">
//                         <button
//                           onClick={() => setIsDropdownOpen(false)}
//                           className="text-[10px] text-[#0A2478] font-bold uppercase"
//                         >
//                           Apply
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Search Input */}
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search multiple items..."
//                   className="flex-grow text-[11px] font-source outline-none h-full bg-transparent"
//                 />

//                 {/* Search Button */}
//                 <button
//                   onClick={() => {
//                     setIsDropdownOpen(false);
//                     fetchData(); // call API
//                   }}
//                   className="ml-2 bg-[#0b2c69] text-white text-[10px] px-3 h-[22px] rounded-[3px] font-source hover:opacity-90"
//                 >
//                   Search
//                 </button>
//               </div>

//               {/* 2. Action Buttons (Clear, Add, Exit) */}
//               <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
//                 <button
//                   onClick={() => {
//                     setSearchQuery(""); // Clears the search text
//                     setSearchHeaders([]); // Resets checkboxes to 0
//                     fetchData();
//                   }}
//                   className="text-[10px] text-gray-400 hover:text-red-500 underline whitespace-nowrap"
//                 >
//                   Clear
//                 </button>

//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="w-[70px] h-[26px] rounded-[4px] bg-[#0A2478] text-white text-[11px] font-medium transition-colors hover:bg-[#071d45]"
//                 >
//                   Add
//                 </button>

//                 <button
//                   onClick={() => navigate("/")}
//                   className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px] font-medium transition-colors hover:bg-[#a40f1a]"
//                 >
//                   Exit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal for Add */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white w-full rounded-lg max-w-2xl p-8 mx-4">
//             {editMode ? (
//               <h2 className="text-[#0A2478] mb-6 font-semibold text-xl">
//                 Edit Sub Ledger
//               </h2>
//             ) : (
//               <h2 className="text-[#0A2478] mb-6 font-semibold text-xl">
//                 Create Sub Ledger
//               </h2>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Sub Ledger <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter Ledger Name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                   required
//                 />
//               </div>
//               {/* <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Ledger <span className="text-red-500">*</span>
//                 </label>

//                 <select
//                   value={formData.accountGroup}
//                   onChange={(e) =>
//                     setFormData({ ...formData, accountGroup: e.target.value })
//                   }
//                   className="w-full h-10 px-3 rounded-lg border border-gray-300
//   focus:outline-none focus:ring-2 focus:ring-blue-500
//   focus:border-transparent text-sm bg-white"
//                   required
//                 >
//                   <option value="">Select Ledger</option>

//                   {accountGroups.map((group) => (
//                     <option key={group.id} value={group.group_name}>
//                       {group.group_name}
//                     </option>
//                   ))}
//                 </select>
//               </div> */}


//               {/* <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Financial <span className="text-red-500">*</span>
//                 </label>

//                 <select
//                   value={formData.financialDate}
//                   onChange={(e) =>
//                     setFormData({ ...formData, financialDate: e.target.value })
//                   }
//                   className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
//                   required
//                 >
//                   <option value="">Select Financial Type</option>
//                   <option value="Balance Sheet">Balance Sheet</option>
//                   <option value="Profit & Loss">Profit & Loss</option>
//                 </select>
//               </div> */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Ledger <span className="text-red-500">*</span>
//                 </label>

//                 <select
//                   value={formData.accountGroup}
//                   onChange={(e) => {
//                     const selectedGroupName = e.target.value;

//                     // 1. Find the full object for the selected ledger
//                     const selectedLedger = accountGroups.find(
//                       (group) => group.group_name === selectedGroupName
//                     );

//                     // 2. Update both fields: the ledger name and the auto-detected financial type
//                     setFormData({
//                       ...formData,
//                       accountGroup: selectedGroupName,
//                       // Set financialDate to the under_type of the ledger (Balance Sheet / Profit & Loss)
//                       financialDate: selectedLedger ? selectedLedger.under_type : ""
//                     });
//                   }}
//                   className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//                   required
//                 >
//                   <option value="">Select Ledger</option>
//                   {accountGroups.map((group) => (
//                     <option key={group.id} value={group.group_name}>
//                       {group.group_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Financial <span className="text-red-500">*</span>
//                 </label>

//                 <select
//                   value={formData.financialDate}
//                   onChange={(e) =>
//                     setFormData({ ...formData, financialDate: e.target.value })
//                   }
//                   className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//                   required
//                 >
//                   <option value="">Select Financial Type</option>
//                   <option value="Balance Sheet">Balance Sheet</option>
//                   <option value="Profit & Loss">Profit & Loss</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Type
//                 </label>

//                 <select
//                   value={formData.type}
//                   onChange={(e) =>
//                     setFormData({ ...formData, type: e.target.value })
//                   }
//                   className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="General">General</option>
//                   <option value="Sub Ledger">Sub Ledger</option>
//                   <option value="Cash">Cash</option>
//                   <option value="Bank">Bank</option>
//                   <option value="Petty Cash">Petty Cash</option>
//                   <option value="Card">Card</option>
//                   <option value="Equity">Equity</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex justify-center gap-3">
//               <button
//                 className="h-10 px-6 rounded-lg bg-[#0A2478] text-white text-sm font-medium hover:bg-[#1a3c89] transition-colors duration-200"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//               <button
//                 className="h-10 px-6 rounded-lg bg-[#C1121F] text-white text-sm font-medium hover:bg-[#d12330] transition-colors duration-200"
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setEditMode(false);
//                   setFormData({
//                     name: "",
//                     accountGroup: "",
//                     financialDate: "",
//                     type: "",
//                     addedBy: localStorage.getItem("email"),
//                   });
//                 }}
//               >
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="flex justify-center">
//         <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
//           <table className="w-full border-collapse">
//             <thead className="bg-[#0A2478] text-white text-sm">
//               <tr>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[250px]">
//                   Sub Ledger Name
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[150px]">
//                   Financial
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[180px]">
//                   Ledger
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
//                   Type
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[300px]">
//                   Added by Email
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
//                   Added On
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
//                   Modified by
//                 </th>
//                 <th className="px-4 py-2 text-left text-[13px]">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-[12px]">
//               {data?.map((row, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="px-4 py-2">{row.name}</td>
//                   <td className="px-4 py-2">{row.financialDate}</td>
//                   <td className="px-4 py-2">{row.accountGroup}</td>
//                   <td className="px-4 py-2">{row.type}</td>
//                   <td className="px-4 py-2">{row.addedBy}</td>
//                   <td className="px-4 py-2">
//                     {formatIndianDate(row.created_at)}
//                   </td>
//                   <td className="px-4 py-2">{row.modifiedBy || "-"}</td>
//                   <td className="px-4 py-2 flex gap-2 justify-center">
//                     <div
//                       className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
//                       onClick={() => handleEdit(row)}
//                     >
//                       <FiEdit />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* 🔹 UPDATED: Conditional Pagination Rendering */}
//       {showPagination && (
//         <div className="mt-4 mb-8">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       )}

//     </div>
//   );
// };

// export default AccountCodeList;


import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import { formatIndianDate } from "../utils/Helpers";
// Ensure this import exists
import Pagination from "../Component/Pagination";

const AccountCodeList = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [accountGroups, setAccountGroups] = useState([]);

  // Search & Dropdown State
  const [searchHeaders, setSearchHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    accountGroup: "",
    financialDate: "",
    type: "Sub Ledger",
    addedBy: loginUser,
  });

  useEffect(() => {
    document.title = "SLF | Account Code List";
    fetchAccountGroups();
    fetchData(1); // Initial fetch
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 🔹 FIXED: Pagination Control
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchData(page);
  };
 

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId]
    );
  };

  const fetchAccountGroups = async () => {
    try {
      const res = await axios.get(`${API}/api/account-group/list`);
      if (res.data.success) {
        setAccountGroups(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching account groups:", error);
    }
  };

  // 🔹 FIXED: API Call with Pagination
  const fetchData = async (page = 1) => {
    try {
      const res = await axios.get(`${API}/account-code/get`, {
        params: {
          headers: searchHeaders.join(","),
          search: searchQuery,
          page: page,
          limit: itemsPerPage
        },
      });

      if (res.data.success) {
        setData(res.data.data);
        // Sync pagination stats from backend
        setTotalItems(res.data.pagination?.total || 0);
        setShowPagination(res.data.pagination?.showPagination || false);
        setCurrentPage(res.data.pagination?.page || 1);
      }
    } catch (error) {
      console.error("Error fetching account codes:", error);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.financialDate || !formData.accountGroup || !formData.type) {
      alert("Please fill all required fields");
      return;
    }

    const payload = { ...formData };
    try {
      if (editMode) {
        payload.modifiedBy = loginUser;
        await axios.put(`${API}/account-code/update/${selectedId}`, payload);
        alert(" Ledger Updated ✅");
      } else {
        payload.addedBy = loginUser;
        await axios.post(`${API}/account-code/create`, payload);
        alert(" Ledger Created ✅");
      }

      setIsModalOpen(false);
      setEditMode(false);
      fetchData(currentPage);
      setFormData({
        name: "",
        accountGroup: "",
        financialDate: "",
        type: "",
        addedBy: loginUser,
      });
    } catch (err) {
      console.error("Error saving account:", err);
    }
  };

  const handleEdit = (row) => {
    setFormData({
      name: row.name,
      accountGroup: row.accountGroup,
      financialDate: row.financialDate,
      type: row.type,
      addedBy: row.addedBy,
    });
    setSelectedId(row.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full font-[Source_Sans_3]">
      {/* Topbar */}
      <div className="flex justify-center">
        <div className="flex justify-center mt-5">
          <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
            <h2 className="text-red-600 font-bold text-[20px] whitespace-nowrap">
               Ledger List
            </h2>

            <div className="flex items-center gap-6">
              <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[450px]">
                <div className="relative border-r border-gray-300 pr-2 mr-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-[11px] font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full whitespace-nowrap"
                  >
                    Headers ({searchHeaders.length}) <span className="text-[8px]">▼</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                      {[
                        { id: "name", label: "Ledger Name" },
                        { id: "accountGroup", label: "Ledger" },
                        { id: "financialDate", label: "Financial" },
                        { id: "type", label: "Type" },
                      ].map((col) => (
                        <label key={col.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded">
                          <input
                            type="checkbox"
                            checked={searchHeaders.includes(col.id)}
                            onChange={() => toggleHeader(col.id)}
                            className="w-3 h-3 accent-[#0A2478]"
                          />
                          <span className="text-[11px] text-gray-700">{col.label}</span>
                        </label>
                      ))}
                      <div className="border-t mt-1 pt-1 text-center">
                        <button onClick={() => setIsDropdownOpen(false)} className="text-[10px] text-[#0A2478] font-bold uppercase">
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
                  placeholder="Search multiple items..."
                  className="flex-grow text-[11px] outline-none h-full bg-transparent"
                />

                {/* <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setCurrentPage(1); // Reset to page 1 on search
                    fetchData(1);
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[10px] px-3 h-[22px] rounded-[3px] hover:opacity-90"
                >
                  Search
                </button> */}

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setCurrentPage(1);
                    fetchData(1);   // 🔥 API CALL
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Search
                </button>

                <button
                  
                  onClick={() => {
                    setSearchQuery("");
                    setSearchHeaders([]);
                    setCurrentPage(1);
                    fetchData(1);
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Clear
                </button>
              </div>

              <div className="flex items-center gap-3 pl-4 border-gray-200">
                
                <button onClick={() => setIsModalOpen(true)} className="w-[70px] h-[26px] rounded-[4px] bg-[#0A2478] text-white text-[11px]">Add</button>
                <button onClick={() => navigate("/")} className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px]">Exit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Kept your auto-fill logic for financialDate */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full rounded-lg max-w-2xl p-8 mx-4">
            <h2 className="text-[#0A2478] mb-6 font-semibold text-xl">
              {editMode ? "Edit Ledger" : "Create Ledger"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Ledger <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block"> Group Ledger <span className="text-red-500">*</span></label>
                <select
                  value={formData.accountGroup}
                  onChange={(e) => {
                    const selectedGroupName = e.target.value;
                    const selectedLedger = accountGroups.find(g => g.group_name === selectedGroupName);
                    setFormData({
                      ...formData,
                      accountGroup: selectedGroupName,
                      financialDate: selectedLedger ? selectedLedger.under_type : ""
                    });
                  }}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white"
                  required
                >
                  <option value="">Select Ledger</option>
                  {accountGroups.map((group) => (
                    <option key={group.id} value={group.group_name}>{group.group_name}</option>
                  ))}
                </select>
              </div>

              {/* <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Financial <span className="text-red-500">*</span></label>
                <select
                  value={formData.financialDate}
                  onChange={(e) => setFormData({ ...formData, financialDate: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white"
                  required
                >
                  <option value="">Select Financial Type</option>
                  <option value="Balance Sheet">Balance Sheet</option>
                  <option value="Profit & Loss">Profit & Loss</option>
                </select>
              </div> */}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="General">General</option>
                  <option value="Sub Ledger">Sub Ledger</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button className="h-10 px-6 rounded-lg bg-[#0A2478] text-white text-sm" onClick={handleSave}>Save</button>
              <button className="h-10 px-6 rounded-lg bg-[#C1121F] text-white text-sm" onClick={() => setIsModalOpen(false)}>Exit</button>
            </div>
          </div>
        </div>
      )}

      {/* Table - Uses filteredData */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[250px]">Ledger Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[150px]">Financial</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[180px]">Ledger</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">Type</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[300px]">Added by Email</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">Added On</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">Modified by</th>
                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">Modified On</th>
                <th className="px-4 py-2 text-left text-[13px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.financialDate}</td>
                  <td className="px-4 py-2">{row.accountGroup}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.addedBy}</td>
                  <td className="px-4 py-2">{formatIndianDate(row.created_at)}</td>
                  <td className="px-4 py-2">{row.modifiedBy || "-"}</td>
                   <td className="px-4 py-2">{formatIndianDate(row.updated_at)}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <div className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm" onClick={() => handleEdit(row)}>
                      <FiEdit />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Component Hooked up to State */}
      {showPagination && (
        <div className="mt-4 mb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AccountCodeList;