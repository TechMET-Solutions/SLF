// import axios from "axios";
// import { Plus, Save, Trash2, XCircle } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../../api";

// const today = () => new Date().toISOString().split("T")[0];

// const JournalVoucherCreate = () => {
//   const navigate = useNavigate();

//   const [accountList, setAccountList] = useState([]);
//   const [banks, setBanks] = useState([]);

//   const [voucherData, setVoucherData] = useState({
//     voucherDate: today(),
//     narration: "",
//     depositAmount: 0,
//     withdrawalAmount: 0,
//     diffAmount: 0,
//     bankId: "",
//     bankName: "",
//     payMode: "Cash", // <--- Initialize here
//   });

//   const [rows, setRows] = useState([
//     {
//       accountId: "",
//       accountName: "",
//       date: today(),
//       type: "", // Deposit / Withdrawal
//       amount: "",
//       remark: "",
//     },
//   ]);

//   // ================= FETCH BANKS =================
//   useEffect(() => {
//     fetchBanks();
//   }, []);

//   const fetchBanks = async () => {
//     try {
//       const res = await axios.get(`${API}/api/banks/list`);
//       setBanks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= FETCH ACCOUNTS =================
//   useEffect(() => {
//     axios
//       .get(`${API}/account-code/accounts/cash-subledger`)
//       .then((res) => setAccountList(res.data))
//       .catch(console.error);
//   }, []);

//   // ================= AUTO TOTAL =================
//   useEffect(() => {
//     let deposit = 0;
//     let withdrawal = 0;

//     rows.forEach((r) => {
//       const amt = Number(r.amount || 0);
//       if (r.type === "Deposit") deposit += amt;
//       if (r.type === "Withdrawal") withdrawal += amt;
//     });

//     setVoucherData((prev) => ({
//       ...prev,
//       depositAmount: deposit,
//       withdrawalAmount: withdrawal,
//       diffAmount: deposit - withdrawal,
//     }));
//   }, [rows]);

//   // ================= ROW CHANGE =================
//   const handleRowChange = (i, field, value) => {
//     const updated = [...rows];
//     updated[i] = { ...updated[i], [field]: value };
//     setRows(updated);
//   };

//   // ================= ADD ROW =================
//   const addRow = () => {
//     setRows((prev) => [
//       ...prev,
//       {
//         accountId: "",
//         accountName: "",
//         date: voucherData.voucherDate,
//         type: "",
//         amount: "",
//         remark: "",
//       },
//     ]);
//   };

//   // ================= REMOVE ROW =================
//   const removeRow = (i) => {
//     if (rows.length === 1) return;
//     setRows(rows.filter((_, idx) => idx !== i));
//   };

//   // ================= SAVE =================
//   const handleSave = async () => {
//     if (!voucherData.narration) {
//       alert("Narration required");
//       return;
//     }

//     if (voucherData.diffAmount !== 0) {
//       alert("Deposit & Withdrawal must match");
//       return;
//     }

//     try {
//       await axios.post(`${API}/api/journalVoucher/create`, {
//         ...voucherData,
//         rows,
//       });

//       alert("Journal Voucher Saved");
//       navigate("/JournalVoucher/list");
//     } catch (err) {
//       alert("Error saving voucher");
//       console.error(err);
//     }
//   };

//   // ================= STYLES =================
//   const navyBlue = "bg-[#0D3082]";
//   const tealHeader = "bg-[#008b8b]";
//   const inputClass =
//     "border border-gray-300 rounded-sm px-1.5 py-0.5 text-[11px] w-full";
//   const labelClass =
//     "text-[11px] font-bold text-gray-700 whitespace-nowrap min-w-[100px]";

//   return (
//     <div className="min-h-screen text-gray-800 flex justify-center mt-5">
//       <div className="max-w-[1400px] w-full">

//         {/* HEADER */}
//         <div className="bg-white border rounded-sm mb-2">
//           <div className={`${tealHeader} text-white px-3 py-1 text-[11px] font-bold`}>
//             Create Journal Voucher
//           </div>

//           <div className="p-3 grid grid-cols-2 gap-8 max-w-[1000px]">

//             {/* LEFT */}
//             <div className="space-y-2">
//               <div className="flex gap-2 items-center">
//                 <label className={labelClass}>Voucher Date</label>
//                 <input
//                   type="date"
//                   className={inputClass}
//                   value={voucherData.voucherDate}
//                   onChange={(e) =>
//                     setVoucherData({
//                       ...voucherData,
//                       voucherDate: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex gap-2 items-center">
//                 <label className={labelClass}>Narration *</label>
//                 <textarea
//                   className={`${inputClass} h-10`}
//                   value={voucherData.narration}
//                   onChange={(e) =>
//                     setVoucherData({
//                       ...voucherData,
//                       narration: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex">
//                 <label className={labelClass}>
//                   Bank A/c <span className="text-red-500">*</span>
//                 </label>
//               <select
//   name="bankId"
//   value={voucherData.bankId}
//   onChange={(e) => {
//     const selectedId = e.target.value;

//     const selectedBank = banks.find(
//       (bank) => String(bank.id) === String(selectedId)
//     );

//     setVoucherData((prev) => ({
//       ...prev,
//       bankId: selectedId,
//       bankName: selectedBank?.bank_name || "",
//     }));
//   }}
//   className="border border-gray-300 rounded  outline-none "
// >
//   <option value="">--Select Bank--</option>

//   {banks.map((bank) => (
//     <option key={bank.id} value={bank.id}>
//       {bank.bank_name}
//     </option>
//   ))}

// </select>

//               </div>

//               <div className="flex gap-2 items-center">
//   <label className={labelClass}>Pay Mode *</label>
//   <select
//     className={inputClass}
//     value={voucherData.payMode}
//     onChange={(e) => {
//       const mode = e.target.value;
//       setVoucherData((prev) => ({
//         ...prev,
//         payMode: mode,
//         // If "Cash" is selected, reset bank fields to empty strings
//         bankId: mode === "Cash" ? "" : prev.bankId,
//         bankName: mode === "Cash" ? "" : prev.bankName,
//       }));
//     }}
//   >
//     <option value="Cash">Cash</option>
//     <option value="Net Banking">Net Banking</option>
//   </select>
// </div>
//             </div>

//             {/* RIGHT */}
//             <div className="space-y-2">
//               <div className="flex gap-2 items-center">
//                 <label className={labelClass}>Total Withdrawal</label>
//                 <input
//                   readOnly
//                   className={`${inputClass} bg-gray-100 text-right`}
//                   value={voucherData.withdrawalAmount}
//                 />
//               </div>

//               <div className="flex gap-2 items-center">
//                 <label className={labelClass}>Total Deposit</label>
//                 <input
//                   readOnly
//                   className={`${inputClass} bg-gray-100 text-right`}
//                   value={voucherData.depositAmount}
//                 />
//               </div>

//               <div className="flex gap-2 items-center">
//                 <label className={labelClass}>Diff. Amount</label>
//                 <input
//                   readOnly
//                   className={`${inputClass} bg-gray-100 text-right`}
//                   value={voucherData.diffAmount}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* TABLE */}
//         <table className="w-full text-[11px] border">
//           <thead className={`${navyBlue} text-white`}>
//             <tr>
//               <th>SI</th>
//               <th>Account</th>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Amount</th>
//               <th>Remark</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {rows.map((row, i) => (
//               <tr key={i} className="border-b">
//                 <td>{i + 1}</td>

//                 <td>
//                   <select
//                     className={inputClass}
//                     value={row.accountId}
//                     onChange={(e) => {
//                       const selectedId = e.target.value;
//                       const selectedAccount = accountList.find(
//                         (acc) => String(acc.id) === String(selectedId)
//                       );

//                       const updated = [...rows];
//                       updated[i] = {
//                         ...updated[i],
//                         accountId: selectedId,
//                         accountName: selectedAccount?.name || "",
//                       };

//                       setRows(updated);
//                     }}
//                   >
//                     <option value="">Select</option>
//                     {accountList.map((a) => (
//                       <option key={a.id} value={a.id}>
//                         {a.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 <td>
//                   <input
//                     type="date"
//                     className={inputClass}
//                     value={row.date}
//                     onChange={(e) =>
//                       handleRowChange(i, "date", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td>
//                   <select
//                     className={inputClass}
//                     value={row.type}
//                     onChange={(e) =>
//                       handleRowChange(i, "type", e.target.value)
//                     }
//                   >
//                     <option value="">Select</option>
//                     <option>Deposit</option>
//                     <option>Withdrawal</option>
//                   </select>
//                 </td>

//                 <td>
//                   <input
//                     type="number"
//                     className={`${inputClass} text-right`}
//                     value={row.amount}
//                     onChange={(e) =>
//                       handleRowChange(i, "amount", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td>
//                   <input
//                     className={inputClass}
//                     value={row.remark}
//                     onChange={(e) =>
//                       handleRowChange(i, "remark", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td className="flex gap-1">
//                   <button onClick={addRow}>
//                     <Plus size={12} />
//                   </button>
//                   <button onClick={() => removeRow(i)}>
//                     <Trash2 size={12} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* ACTION */}
//         <div className="mt-3 flex gap-2">
//           <button
//             onClick={handleSave}
//             className={`${navyBlue} text-white px-6 py-1 flex gap-2 items-center`}
//           >
//             <Save size={14} /> Save
//           </button>

//           <button
//             onClick={() => navigate("/JournalVoucher/list")}
//             className={`${navyBlue} text-white px-6 py-1 flex gap-2 items-center`}
//           >
//             <XCircle size={14} /> Exit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JournalVoucherCreate;
import axios from "axios";
import { Plus, Save, Trash2, XCircle, FileText, CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const today = () => new Date().toISOString().split("T")[0];

const JournalVoucherCreate = () => {
  const navigate = useNavigate();

  // Data States
  const [accountList, setAccountList] = useState([]);
  const [banks, setBanks] = useState([]);
  
  // Modal & Metadata States
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [rowDetails, setRowDetails] = useState({}); 

  const [voucherData, setVoucherData] = useState({
    voucherDate: today(),
    narration: "",
    depositAmount: 0,
    withdrawalAmount: 0,
    diffAmount: 0,
  });

  const [rows, setRows] = useState([
    { accountId: "", accountName: "", date: today(), type: "", amount: "", remark: "" },
  ]);

  const [detailForm, setDetailForm] = useState({
    payMode: "Cash",
    bankId: "",
    partyName: ""
  });

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bankRes, accRes] = await Promise.all([
          axios.get(`${API}/api/banks/list`),
          axios.get(`${API}/account-code/accounts/cash-subledger`)
        ]);
        setBanks(bankRes.data);
        setAccountList(accRes.data);
      } catch (err) { console.error("Fetch Error:", err); }
    };
    fetchData();
  }, []);

  // ================= AUTO TOTAL =================
  useEffect(() => {
    let deposit = 0; let withdrawal = 0;
    rows.forEach((r) => {
      const amt = Number(r.amount || 0);
      if (r.type === "Deposit") deposit += amt;
      if (r.type === "Withdrawal") withdrawal += amt;
    });
    setVoucherData(prev => ({
      ...prev, depositAmount: deposit, withdrawalAmount: withdrawal, diffAmount: deposit - withdrawal,
    }));
  }, [rows]);

  // ================= ROW ACTIONS =================
  const handleAddRow = (index) => {
    const rowToCopy = rows[index];
    const newRow = {
      ...rowToCopy,      // Copies Account and Type
      amount: "",        // Keeps amount empty for new input
      remark: "",
      accountName: "",
      type: "",
      accountId:""
      // Optional: Clear remark for new row
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (i) => {
    if (rows.length === 1) return;
    const updatedRows = rows.filter((_, idx) => idx !== i);
    setRows(updatedRows);
    
    // Clean up details metadata for the removed row
    const newDetails = { ...rowDetails };
    delete newDetails[i];
    setRowDetails(newDetails);
  };

  const handleRowChange = (i, field, value) => {
    const updated = [...rows];
    updated[i] = { ...updated[i], [field]: value };
    setRows(updated);
  };

  // ================= MODAL LOGIC =================
  const openDetailsModal = (index) => {
    setCurrentRowIndex(index);
    setDetailForm(rowDetails[index] || { payMode: "Cash", bankId: "", partyName: "" });
    setIsDetailsModalOpen(true);
  };

  const saveDetails = () => {
    setRowDetails({ ...rowDetails, [currentRowIndex]: detailForm });
    setIsDetailsModalOpen(false);
  };

  const handleSaveVoucher = async () => {
    if (!voucherData.narration) return alert("Please enter narration");
    if (voucherData.diffAmount !== 0) return alert("Deposit and Withdrawal must match");

    const payload = {
      ...voucherData,
      rows: rows.map((row, index) => ({
        ...row,
        extraDetails: rowDetails[index] || null
      }))
    };
    
    console.log("Final Payload:", payload);
    // await axios.post(`${API}/api/journalVoucher/create`, payload);
  };

  // ================= STYLES =================
  const navyBlue = "bg-[#0D3082]";
  const tealHeader = "bg-[#008b8b]";
  const inputClass = "border border-gray-300 rounded-sm px-2 py-1 text-[11px] w-full outline-none focus:border-blue-500 bg-white";

  return (
    <div className="min-h-screen text-gray-800 flex justify-center p-5 ">
      <div className="max-w-[1300px] w-full space-y-4">
        
     
        <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >Journal Voucher Create
          </h2>

          <div className="flex gap-3">
            <div className="flex justify-between gap-5">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                  gap: "6.25px",
                }}
                // onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Save
              </button>

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                onClick={() => navigate(-1)}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
  <div className="flex gap-8 items-center  px-6 py-2 rounded-lg  border-gray-100">
              <div className="text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Withdrawal</p>
                <p className="text-sm font-bold text-red-600">₹{voucherData.withdrawalAmount}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Deposit</p>
                <p className="text-sm font-bold text-blue-800">₹{voucherData.depositAmount}</p>
              </div>
              <div className="text-center border-l pl-8">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Difference</p>
                <p className={`text-sm font-bold ${voucherData.diffAmount === 0 ? 'text-green-600' : 'text-red-600 animate-pulse'}`}>
                  ₹{voucherData.diffAmount}
                </p>
              </div>
            </div>
        {/* MAIN TABLE */}
        <div className="bg-white  rounded  overflow-hidden">
          <table className=" text-[15px] border-collapse">
            <thead className={`${navyBlue} text-white`}>
              <tr>
                <th className="p-2 border-r border-blue-800 w-10 text-center">SI</th>
                <th className="p-2 border-r border-blue-800">Sub Ledger</th>
                <th className="p-2 border-r border-blue-800 w-32 text-center">Type</th>
                <th className="p-2 border-r border-blue-800 w-32 text-center">Amount</th>
                <th className="p-2 border-r border-blue-800 w-[400px]">Remark & Mode</th>
                <th className="p-2 w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-2 text-center border-r font-medium text-gray-500">{i + 1}</td>
                  <td className="p-2 border-r">
                    <select className={inputClass} value={row.accountId} 
                      onChange={(e) => handleRowChange(i, "accountId", e.target.value)}>
                      <option value="">Select Sub-Ledger</option>
                      {accountList.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </td>
                  <td className="p-2 border-r">
                    <select className={`${inputClass} text-center`} value={row.type} 
                      onChange={(e) => handleRowChange(i, "type", e.target.value)}>
                      <option value="">--Select--</option>
                      <option>Deposit</option>
                      <option>Withdrawal</option>
                    </select>
                  </td>
                  <td className="p-2 border-r">
                    <input type="number" className={`${inputClass} text-right font-bold text-blue-800`} 
                      placeholder="0.00" value={row.amount} onChange={(e) => handleRowChange(i, "amount", e.target.value)} />
                  </td>
                  <td className="p-2 border-r">
                    <div className="flex gap-2">
                      <input className={inputClass} placeholder="Remark..." value={row.remark} 
                        onChange={(e) => handleRowChange(i, "remark", e.target.value)} />
                      <button
                        onClick={() => openDetailsModal(i)}
                        className={`px-3 py-1 rounded flex items-center gap-1 text-[10px] font-bold uppercase transition-all shadow-sm ${
                          rowDetails[i] ? 'bg-green-600 text-white' : 'bg-[#008080] text-white hover:bg-[#006666]'
                        }`}
                      >
                        {rowDetails[i] ? <CheckCircle2 size={12} /> : <Plus size={12} />}
                        {rowDetails[i] ? "Added" : "Details"}
                      </button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleAddRow(i)} className="text-blue-600 hover:scale-125 transition-transform" title="Copy & Add Row">
                        <Plus size={18} strokeWidth={3} />
                      </button>
                      <button onClick={() => removeRow(i)} className="text-red-500 hover:scale-125 transition-transform" title="Delete Row">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BUTTONS */}
        {/* <div className="flex gap-3">
          <button onClick={handleSaveVoucher} className={`${navyBlue} text-white px-8 py-2 rounded-sm text-[11px] font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-md`}>
            <Save size={14} /> SAVE VOUCHER
          </button>
          <button onClick={() => navigate("/JournalVoucher/list")} className="bg-gray-200 text-gray-700 px-8 py-2 rounded-sm text-[11px] font-bold border border-gray-300 hover:bg-gray-300 transition-colors">
            EXIT
          </button>
        </div> */}

        {/* --- MODAL --- */}
        {isDetailsModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-150">
              <div className={` p-3 flex justify-between items-center`}>
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span className="font-bold text-[12px] uppercase">Row {currentRowIndex + 1} Details</span>
                </div>
                <button onClick={() => setIsDetailsModalOpen(false)}><X size={18}/></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase">Pay Mode</label>
                    <select className={inputClass} value={detailForm.payMode} 
                      onChange={(e) => setDetailForm({...detailForm, payMode: e.target.value})}>
                      <option value="Cash">Cash</option>
                      <option value="Net Banking">Net Banking</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase">Bank Selection</label>
                    <select className={inputClass} value={detailForm.bankId}
                      onChange={(e) => setDetailForm({...detailForm, bankId: e.target.value})}>
                      <option value="">-- Choose --</option>
                      {banks.map(bank => <option key={bank.id} value={bank.id}>{bank.bank_name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold  uppercase">Party / Employee Name</label>
                  <input className={inputClass} placeholder="Enter name..." value={detailForm.partyName} 
                    onChange={(e) => setDetailForm({...detailForm, partyName: e.target.value})} />
                </div>
              </div>
              <div className=" p-4 flex justify-center gap-2 ">
                <button onClick={() => setIsDetailsModalOpen(false)} className="text-[11px] font-bold text-white px-4 bg-red-600">Exit</button>
                <button onClick={saveDetails} className="bg-[#0A2478] text-white px-6 py-2 rounded-sm text-[11px] font-bold shadow-sm">APPLY</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalVoucherCreate;