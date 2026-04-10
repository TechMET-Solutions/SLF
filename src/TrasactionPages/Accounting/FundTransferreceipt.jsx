// import axios from "axios";
// import { Plus, Search } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../../api";

// const FundTransferReceipt = () => {
//   const navigate = useNavigate();
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     fetchFundTransfers();
//   }, []);

//   const fetchFundTransfers = async () => {
//     try {
//       const res = await axios.get(
//         `${API}/FundTransfer/FundTransfer/Receipt/list`,
//       );
//       setList(res.data.data);
//     } catch (error) {
//       console.error("Error fetching list:", error);
//     }
//   };

//   // Exact system colors from screenshots
//   const navyBlue = "bg-[#0D3082]";
//   const tealHeader = "bg-[#008b8b]";

//   // Compact input style for the search bar
//   const inputClass =
//     "border border-gray-300 rounded-sm px-1 py-0.5 text-[11px] outline-none focus:border-blue-500 w-[140px] h-[22px]";
//   const labelClass = "text-[11px] font-bold text-gray-700";
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;

//     try {
//       await axios.delete(
//         `${API}/FundTransfer/FundTransfer/Receipt/delete/${id}`,
//       );

//       alert("Deleted Successfully ✅");
//       fetchFundTransfers(); // refresh list
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-800 p-5">
//       <div className="p-1">
//         {/* 2. List Header with +Add Button */}
//         <div
//           className={`${tealHeader} text-white px-3 py-1 text-[12px] font-bold flex justify-between items-center rounded-t-sm`}
//         >
//           <span className="font-medium">Fund Transfer Receipt List</span>
//           <button
//             onClick={() => navigate("/FundTransfer/Receipt/create")}
//             className={`${navyBlue} hover:bg-blue-900 px-2 py-0.5 rounded-sm text-[10px] flex items-center gap-1 border border-white/20`}
//           >
//             <Plus size={12} /> Add
//           </button>
//         </div>

//         {/* 3. Search Bar Area */}
//         <div className="p-2 border-x border-b border-gray-200 flex items-center gap-4 bg-white mb-1">
//           <div className="flex items-center gap-2">
//             <label className={labelClass}>
//               Pay Mode <span className="text-red-500">*</span>
//             </label>
//             <select className={inputClass}>
//               <option>--Select All--</option>
//             </select>
//           </div>
//           <div className="flex items-center gap-2">
//             <label className={labelClass}>
//               Account <span className="text-red-500">*</span>
//             </label>
//             <select className={inputClass}>
//               <option>--Select All--</option>
//             </select>
//           </div>
//           <button
//             className={`${navyBlue} text-white px-4 py-0.5 rounded-sm text-[11px] font-bold flex items-center gap-1`}
//           >
//             <Search size={12} /> Search
//           </button>
//         </div>

//         {/* 4. Data Grid */}
//         <div className="overflow-x-auto border border-gray-300">
//           <table className="w-full text-left border-collapse table-auto">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700 text-[10px] font-bold border-b border-gray-300">
//                 <th className="p-1 border-r border-gray-300">Doc No</th>
//                 <th className="p-1.5 border-r border-gray-300">Doc Date</th>
//                 <th className="p-1.5 border-r border-gray-300">Paymode</th>
//                 <th className="p-1.5 border-r border-gray-300">Branch Name</th>
//                 {/* <th className="p-1.5 border-r border-gray-300">
//                   Account Ledger Name
//                 </th> */}
//                 <th className="p-1.5 border-r border-gray-300">Amount</th>
//                 <th className="p-1.5 border-r border-gray-300">MOP</th>
//                 <th className="p-1.5 border-r border-gray-300">Add By</th>
//                 <th className="p-1.5 border-r border-gray-300">Add On</th>
//                 <th className="p-1.5 border-r border-gray-300">
//                   Receipt Status
//                 </th>
//                 <th className="p-1.5 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-[11px] divide-y divide-gray-200">
//               {list.map((item, i) =>
//                 item.transfer_details.map((td, index) => (
//                   <tr key={`${i}-${index}`} className="hover:bg-blue-50/50">
//                     <td className="p-1.5 border-r text-blue-800">{item.id}</td>

//                     <td className="p-1.5 border-r">
//                       {new Date(item.doc_date).toLocaleDateString("en-GB")}
//                     </td>

//                     <td className="p-1.5 border-r">{item.pay_mode}</td>

//                     <td className="p-1.5 border-r">{td.toBranch}</td>

//                     {/* <td className="p-1.5 border-r font-medium">
//                       {item.account}
//                     </td> */}

//                     <td className="p-1.5 border-r font-bold">
//                       {td.amount || "-"}
//                     </td>

//                     <td className="p-1.5 border-r">{item.pay_mode}</td>

//                     <td className="p-1.5 border-r text-gray-500">Admin</td>

//                     <td className="p-1.5 border-r">
//                       {item.created_at?.split("T")[0]}
//                     </td>

//                     <td className="p-1.5 border-r text-green-700 font-bold">
//                       Received
//                     </td>

//                     <td className="p-1.5 text-center whitespace-nowrap">
//                       <span
//                         className="text-blue-600 cursor-pointer font-bold mr-2"
//                         onClick={() =>
//                           navigate("/FundTransfer/Receipt/create", {
//                             state: {
//                               fundData: {
//                                 ...item,
//                                 transferDetails: item.transfer_details,
//                               },
//                             },
//                           })
//                         }
//                       >
//                         View
//                       </span>

//                       <span
//                         className="text-red-600 cursor-pointer font-bold"
//                         onClick={() => handleDelete(item.id)}
//                       >
//                         Delete
//                       </span>
//                     </td>
//                   </tr>
//                 )),
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         {/* <div className={`${navyBlue} text-white text-[10px] text-center py-1.5 mt-2 rounded-sm uppercase`}>
//           © Copyright Maraekat Infotech Ltd, 2015. All rights reserved.
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default FundTransferReceipt;
import axios from "axios";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { usePermission } from "../../API/Context/PermissionContext";
import Loader from "../../Component/Loader";

const FundTransferReceipt = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(list, "list");
  const [payMode, setPayMode] = useState("");
  // useEffect(() => {
  //   fetchFundTransfers();
  // }, []);
const [loading, setLoading] = useState(false);
  // const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBranchid, setSelectedBranchid] = useState("");
const { permissions, userData } = usePermission();

  
  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMOP, setSelectedMOP] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedbranchid, setSelectedBranch] = useState("");

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  const allHeaderIds = ["id", "from_branch_name", "to_branch_name", "amount"];

  const handleSelectAll = () => {
    if (searchHeaders.length === allHeaderIds.length) {
      setSearchHeaders([]);
    } else {
      setSearchHeaders(allHeaderIds);
    }
  };

  useEffect(() => {
    debugger;
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.branchId) {
      console.log("Branch ID:", userData.branchId.branch_code);
      console.log("Branch Name:", userData.branchId.branch_name);
      // setSelectedYear(userData.financialYear)
      setSelectedBranch(userData.branchId.branch_name);
      setSelectedBranchid(userData.branchId.id);

      fetchFundTransfers(userData.branchId.id);
      setSelectedBranch(userData.branchId.id);
    }
  }, []);

  //

  const fetchFundTransfers = async (selectedBranchid) => {
    debugger;
    setLoading(true)
    try {
      if (!selectedBranchid) return; // wait until branchId is set

      const res = await axios.get(`${API}/api/FundTransfer/listReceipt`, {
        params: {
          branchId: selectedBranchid,
          search: searchQuery || "",
          headers: searchHeaders.join(",") || "",
          date: selectedDate || "",
          mop: selectedMOP || "",
          status: selectedStatus || "",
        },
      });

      setList(res.data.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching list:", error);
      setLoading(false)
    }
  };

  // Exact system colors from screenshots

  const handleDelete = async (id) => {
    setLoading(true)
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`${API}/api/FundTransfer/Delete/${id}`);

      alert("Deleted Successfully ✅");
      setLoading(false)
      fetchFundTransfers(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
      setLoading(false)
    }
  };
  const handleApprove = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${API}/api/FundTransfer/status/${selectedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Accepted",
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Fund Transfer Accepted Successfully");
        setIsModalOpen(false);
        setLoading(false)
        fetchFundTransfers(); // refresh table
      }
    } catch (error) {
      console.error("Approve Error:", error);
      setLoading(false)
    }
  };
  const handleReject = async () => {
     setLoading(true)
    try {
      const response = await fetch(
        `${API}/api/FundTransfer/status/${selectedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Rejected",
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Fund Transfer Rejected Successfully");
        setIsModalOpen(false);
        setLoading(false)
        fetchFundTransfers(); // refresh table
      }
    } catch (error) {
      console.error("Reject Error:", error);
      setLoading(false)
    }
  };
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 ">
      <div className="flex justify-center  ">
        <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border border-gray-200 justify-between ">
          {/* Left heading */}
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
            FT Receipt
          </h2>

          <div className="flex items-center gap-6">
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
                      <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded border-b border-gray-200 mb-1"
                      >
                        <input
                          type="checkbox"
                          checked={allHeaderIds.every((id) =>
                            searchHeaders.includes(id),
                          )}
                          onChange={handleSelectAll}
                          className="w-3 h-3 accent-[#0A2478]"
                        />
                        <span className="text-[11px] font-source font-bold text-[#0A2478]">
                          Select All
                        </span>
                      </button>

                      {[
                        { id: "id", label: "Doc No" },

                        { id: "from_branch_name", label: "From Branch" },
                        { id: "to_branch_name", label: "To Branch" },
                        { id: "amount", label: "Amount" },
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
                  onClick={() => setIsDropdownOpen(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type multiple items (e.g. Cash, Asset)..."
                  className="flex-grow text-[11px] font-source outline-none h-full"
                />

                {/* Search Button */}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              {/* 📅 Date Filter */}
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-2 py-1 text-[11px] rounded"
              />

              {/* 💳 MOP Filter */}
              <select
                value={selectedMOP}
                onChange={(e) => setSelectedMOP(e.target.value)}
                className="border px-2 py-1 text-[11px] rounded"
              >
                <option value="">All MOP</option>
                <option value="Cash">Cash</option>
                <option value="Net Banking">Netbanking</option>
              </select>

              {/* 📄 Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border px-2 py-1 text-[11px] rounded"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

           
            <div>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  fetchFundTransfers(selectedbranchid); // 🔥 call API here
                }}
                className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchHeaders([]);
                  setSelectedMOP(""),
                    setSelectedDate(""),
                    setSelectedStatus(""),
                  fetchFundTransfers(selectedbranchid);
                }}
                className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
              >
                Clear
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[1400px]">
        {/* 4. Data Grid */}
        <div className="overflow-x-auto ml-[25px]  w-full lg:w-auto">
          <table className="w-full min-w-max lg:min-w-0">
            <thead className="bg-[#0A2478] text-white text-sm sticky top-0">
              <tr className="text-white text-[10px] sm:text-[12px] font-bold border-b border-gray-300">
                <th className="p-1 border-r border-gray-300 w-[70px] sm:w-[100px]">
                  Doc No
                </th>

                <th className="p-1 border-r border-gray-300 w-[90px] sm:w-[150px]">
                  From Branch
                </th>
                <th className="p-1 border-r border-gray-300 w-[80px] sm:w-[100px]">
                  To Branch
                </th>
                <th className="p-1 border-r border-gray-300 w-[70px] sm:w-[100px]">
                  Amount
                </th>
                <th className="p-1 border-r border-gray-300 w-[60px] sm:w-[100px] hidden md:table-cell">
                  MOP
                </th>
                {/* <th className="p-1 border-r border-gray-300 w-[70px] sm:w-[120px] hidden lg:table-cell">Add By</th> */}
                <th className="p-1 border-r border-gray-300 w-[70px] sm:w-[100px] hidden sm:table-cell">
                  FT Date
                </th>
                 {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "FT Receipt"
)?.add) && (
    <th className="p-1 border-r border-gray-300 w-[80px] sm:w-[120px]">
                  Status
                </th>
)}
                
                <th className="p-1 text-center w-[70px] sm:w-[100px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[10px] sm:text-[11px] divide-y divide-gray-200">
              {list.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-6 text-gray-500 font-semibold"
                  >
                    Receipt Not Found
                  </td>
                </tr>
              ) : (
                list.map((item, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-1 text-blue-800 font-bold">{item.id}</td>

                    {/* <td className="p-1 hidden sm:table-cell">
                      {new Date(item.doc_date).toLocaleDateString("en-GB")}
                    </td> */}

                    <td className="p-1">{item.from_branch_name}</td>

                    <td className="p-1">{item.to_branch_name}</td>

                    <td className="p-1 font-bold">{item.amount || "-"}</td>

                    <td className="p-1 hidden md:table-cell">
                      {item.pay_mode}
                    </td>

                    {/* <td className="p-1 text-gray-500 hidden lg:table-cell">Admin</td> */}

                    <td className="p-1 hidden lg:table-cell">
                      {new Date(item.doc_date).toLocaleDateString("en-GB")}
                    </td>
                    {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Group Ledger"
)?.add) && (
    <td
                      onClick={() => {
                        if (item.status === "Pending") {
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }
                      }}
                      className={`p-1 font-bold cursor-pointer text-[9px] sm:text-[11px] ${
                        item.status === "Pending"
                          ? "text-yellow-600 underline"
                          : item.status === "Accepted"
                            ? "text-green-700"
                            : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </td>
)}

                  

                    <td className="p-1 text-center">
                      <div className="flex justify-center gap-1 sm:gap-2">
                        
{(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Group Ledger"
)?.view) && (
   <span
                          className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded cursor-pointer transition"
                          onClick={() =>
                            navigate("/FundTransfer/create", {
                              state: { fundData: item },
                            })
                          }
                        >
                          <Eye size={14} />
                        </span>
)}
                       
{(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Group Ledger"
)?.delete) && (
   <span
                          className="bg-red-600 hover:bg-red-700 text-white p-1 rounded cursor-pointer transition"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={14} />
                        </span>
)}
                       
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 🔹 Background Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            {/* 🔹 Modal Box */}
            <div className="relative bg-white p-6 rounded-lg w-[400px] shadow-xl">
              <h2 className="text-lg font-bold mb-4 text-center">
                Approve Fund Transfer
              </h2>

              <p className="text-center mb-6">
                Do you want to approve this request?
              </p>

              <div className="flex justify-between">
                <button
                  onClick={handleApprove}
                  className="bg-[#0D3082] text-white px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={handleReject}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Footer */}
        {/* <div className={`${navyBlue} text-white text-[10px] text-center py-1.5 mt-2 rounded-sm uppercase`}>
          © Copyright Maraekat Infotech Ltd, 2015. All rights reserved.
        </div> */}


      </div>
      {loading && <Loader />}
    </div>
  );
};

export default FundTransferReceipt;
