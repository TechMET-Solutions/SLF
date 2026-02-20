// import axios from "axios";
// import { Plus } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../../api";

// const RecieptAccounting = () => {
//   const navigate = useNavigate();
//   const [receipts, setReceipts] = useState([]);
//   const [payMode, setPayMode] = useState("");

//   console.log(receipts, "receipts");
//   useEffect(() => {
//     fetchReceipts();
//   }, []);

//   const fetchReceipts = async () => {
//     try {
//       const res = await axios.get(`${API}/Receipt/list`);
//       if (res.data.success) {
//         setReceipts(res.data.data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   // Styles based on your system screenshots
//   const headerBg = "bg-[#008b8b]"; // Teal header
//   const tableHeaderBg = "bg-[#0D3082]"; // Navy blue table header
//   const buttonBlue = "bg-[#0D3082]";
//   const inputClass =
//     "w-full border border-gray-300 rounded-sm px-1.5 py-1 text-[12px] outline-none focus:border-blue-500 focus:bg-[#ffffcc]";
//   const labelClass = "text-[12px] font-bold text-gray-700 mb-1";
// const handleView = (item) => {
//   navigate("/Receipt/create", {
//     state: {
//       receipt: item,
//       mode: "view",
//     },
//   });
// };

// const handleEdit = (item) => {
//   navigate("/Receipt/create", {
//     state: {
//       receipt: item,
//       mode: "edit",
//     },
//   });
// };

// const handleDelete = async (id) => {
//   const confirmDelete = window.confirm("Are you sure to delete?");
//   if (!confirmDelete) return;

//   try {
//     await axios.delete(`${API}/receipt/delete/${id}`);
//     alert("Deleted Successfully");
//     fetchReceipts(); // refresh table
//   } catch (err) {
//     console.error(err);
//   }
// };
//   return (
//     <div className="min-h-screen bg-[#f1f5f9] font-sans p-4">
//       <div className="max-w-[1400px] mx-auto bg-white border border-gray-200 shadow-sm overflow-hidden">
//         {/* TOP HEADER SECTION (From Images) */}
//         <div
//           className={`${headerBg} text-white px-4 py-2 flex justify-between items-center`}
//         >
//           <h1 className="text-sm font-bold uppercase tracking-wider">
//             Receipt Voucher List
//           </h1>
//           <button
//             onClick={() => navigate("/Receipt/create")} // Add the click handler
//             className="bg-[#0D3082] hover:bg-blue-800 text-white text-[11px] font-bold py-1 px-3 rounded flex items-center border border-white/20 transition-colors"
//           >
//             <Plus size={14} className="mr-1" /> ADD
//           </button>
//         </div>

//         {/* SEARCH FILTERS SECTION (From Image 1 & 2) */}
//         <div className="p-4 bg-white border-b border-gray-200 flex items-end gap-4">
//          <div className="flex flex-col w-48">
//   <label className={labelClass}>
//     Pay Mode <span className="text-red-500">*</span>
//   </label>

//   <select
//     className={inputClass}
//     value={payMode}
//     onChange={(e) => setPayMode(e.target.value)}
//   >
//     <option value="">--Select--</option>
//     <option value="Cash">Cash</option>
//     <option value="Net Banking">Net Banking</option>
//   </select>
// </div>

//           <div className="flex flex-col w-48">
//             <label className={labelClass}>
//               Account <span className="text-red-500">*</span>
//             </label>
//             <select className={inputClass}>
//               <option>--Select All--</option>
//             </select>
//           </div>
//           <button
//             className={`${buttonBlue} text-white px-6 py-1 rounded text-[12px] font-bold hover:bg-blue-800 transition-colors`}
//           >
//             Search
//           </button>
//         </div>

//         {/* MAIN DATA TABLE (From Image 1 & 2) */}
//         <div className="p-4 overflow-x-auto">
//           <table className="w-full text-left border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700 text-[11px] font-bold uppercase border-b border-gray-300">
//                 <th className="p-2 border-r border-gray-300">Doc No</th>
//                 <th className="p-2 border-r border-gray-300">Doc Date</th>
//                 <th className="p-2 border-r border-gray-300">
//                   Account Ledger Name
//                 </th>

//                 <th className="p-2 border-r border-gray-300">Amount</th>
//                 <th className="p-2 border-r border-gray-300">MOP</th>
//                 <th className="p-2 border-r border-gray-300">Add On</th>
//                 <th className="p-2 border-r border-gray-300">AddByEmail</th>
//                 <th className="p-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-[12px]">
//               {receipts.map((item, i) => {
//                 const firstLedger =
//                   item.voucherRows && item.voucherRows.length > 0
//                     ? item.voucherRows[0].ledgerName
//                     : "-";

//                 return (
//                   <tr
//                     key={item.id}
//                     className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
//                   >
//                     <td className="p-2 border-r border-gray-200 text-[#0D3082] font-medium">
//                       {item.id}
//                     </td>

//                     <td className="p-2 border-r border-gray-200 text-gray-600">
//                       {new Date(item.docDate).toLocaleDateString("en-GB")}
//                     </td>

//                     <td className="p-2 border-r border-gray-200 font-medium">
//                       {firstLedger}
//                     </td>

//                     <td className="p-2 border-r border-gray-200 font-bold">
//                       {item.totalAmount}
//                     </td>

//                     <td className="p-2 border-r border-gray-200">
//                       {item.payMode}
//                     </td>

//                     <td className="p-2 border-r border-gray-200">
//                       {item.createdAt?.split("T")[0]}
//                     </td>

//                     <td className="p-2 border-r border-gray-200 text-gray-500">
//                       {item.partyName}
//                     </td>

//                    <td className="p-2 flex justify-center gap-3">
//   <button
//     onClick={() => handleView(item)}
//     className="text-blue-600 hover:underline"
//   >
//     View
//   </button>

//   <button
//     onClick={() => handleEdit(item)}
//     className="text-blue-600 hover:underline"
//   >
//     Edit
//   </button>

//   <button
//     onClick={() => handleDelete(item.id)}
//     className="text-red-600 hover:underline"
//   >
//     Delete
//   </button>
// </td>

//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* DETAILS TABLE SECTION (Based on Image 3 Structure) */}
//         {/* <div className="p-4 mt-4">
//           <div className="border border-teal-500 rounded-sm">
//             <div className="bg-white px-3 py-1.5 border-b border-teal-500">
//                <span className="text-teal-700 font-bold text-[11px] uppercase underline underline-offset-4">Receipt Voucher Details</span>
//             </div>
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className={`${tableHeaderBg} text-white text-[11px] uppercase tracking-wider`}>
//                   <th className="p-2 border-r border-white/20 w-12 text-center">Sl No</th>
//                   <th className="p-2 border-r border-white/20">Sub. Ledger Code</th>
//                   <th className="p-2 border-r border-white/20">Account Ledger Name</th>
//                   <th className="p-2 border-r border-white/20 w-32 text-center">Date</th>
//                   <th className="p-2 border-r border-white/20 w-20 text-center">Sign</th>
//                   <th className="p-2 border-r border-white/20 w-32">Amount</th>
//                   <th className="p-2">Remark</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-300 text-[12px]">
//                   <td className="p-2 border-r border-gray-300 text-center">1</td>
//                   <td className="p-2 border-r border-gray-300">
//                     <select className="w-full border border-gray-300 rounded-sm px-1 py-0.5 outline-none">
//                       <option>B1 HDFC</option>
//                     </select>
//                   </td>
//                   <td className="p-2 border-r border-gray-300 bg-gray-50">
//                     <input type="text" value="B1 HDFC" className="w-full bg-transparent outline-none" readOnly />
//                   </td>
//                   <td className="p-2 border-r border-gray-300">
//                     <div className="relative">
//                       <input type="text" className="w-full border border-gray-300 rounded-sm px-1" />
//                     </div>
//                   </td>
//                   <td className="p-2 border-r border-gray-300 text-center bg-gray-50 uppercase">C</td>
//                   <td className="p-2 border-r border-gray-300">
//                     <input type="text" className="w-full border border-gray-300 rounded-sm px-1" />
//                   </td>
//                   <td className="p-2 flex gap-1 items-center">
//                     <input type="text" className="flex-1 border border-gray-300 rounded-sm px-1" />
//                     <button className={`${buttonBlue} text-white px-3 py-1 rounded text-[10px] font-bold flex items-center`}>
//                       <Plus size={12} className="mr-1" /> ADD
//                     </button>
//                     <button className={`${buttonBlue} text-white px-3 py-1 rounded text-[10px] font-bold flex items-center`}>
//                       <Trash2 size={12} className="mr-1" /> REMOVE
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div> */}

//         {/* BOTTOM ACTION BUTTONS */}
//         {/* <div className="p-4 flex gap-2">
//            <button className={`${buttonBlue} text-white px-8 py-1.5 rounded text-[12px] font-bold flex items-center shadow-sm`}>
//              <Save size={14} className="mr-2" /> Save
//            </button>
//            <button className={`${buttonBlue} text-white px-8 py-1.5 rounded text-[12px] font-bold flex items-center shadow-sm`}>
//              <XCircle size={14} className="mr-2" /> Exit
//            </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default RecieptAccounting;

import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const RecieptAccounting = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  /* ================= FETCH MASTER LIST ================= */
  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API}/api/Receipt/Receipt-master-list`);
      const result = await res.json();

      if (result.success) {
        setTableData(result.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* ================= DELETE ================= */
  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${API}/api/Receipt/delete/${id}`,
        {
          method: "DELETE",
        },
      );

      const result = await res.json();

      if (result.success) {
        alert("Expense Deleted Successfully ✅");
        fetchExpenses(); // refresh
      }
    } catch (error) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      <div className="ml-[110px] mr-[110px] mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow border">
          <h1 className="text-[#D32F2F] text-xl font-bold">Receipt List</h1>

          <button
           onClick={() => navigate("/Receipt/create")}
            className="bg-[#0D3082] text-white px-5 py-1.5 rounded text-xs font-bold"
          >
            Add Receipt
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden ">
          <table className=" text-left border-collapse w-[500px]">
            <thead>
              <tr className="bg-[#0D3082] text-white text-[12px] uppercase">
                <th className="p-3 border-r">Receipt No</th>
                <th className="p-3 border-r">Expense Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-[13px] bg-white">
              {tableData.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {/* Expense No */}
                  <td className="p-3  font-medium">{row.Receipt_no}</td>

                  {/* Expense Date */}
                  <td className="p-3 ">
                    {new Date(row.expense_date).toLocaleDateString("en-GB")}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() =>
                          navigate("/Receipt/create", {
                            state: { expenseId: row.id, view: true },
                          })
                        }
                        className="bg-blue-500 text-white p-1 rounded"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate("/Receipt/create", {
                            state: { expenseId: row.id },
                          })
                        }
                        className="bg-green-600 text-white p-1 rounded"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteExpense(row.id)}
                        className="bg-red-600 text-white p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecieptAccounting;
