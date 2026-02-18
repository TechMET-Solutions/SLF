import { useEffect, useState } from "react";

const LoanCancellationReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState("IND01");
  const [loanNos, setLoanNos] = useState([]);
  const [selectedLoanNo, setSelectedLoanNo] = useState("");
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);
  // Fetching Schemes for the dropdown to match the "IND01" style in your image
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10",
        );
        const result = await response.json();
        setSchemes(result.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schemes:", error);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);
  useEffect(() => {
    if (!selectedScheme || !fromDate || !toDate) return;

    const fetchLoanNumbers = async () => {
      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/cancel-loan-numbers?scheme=${selectedScheme}&fromDate=${fromDate}&toDate=${toDate}`,
        );
        const data = await res.json();
        setLoanNos(data.data || []);
      } catch (err) {
        console.error("Error fetching loan numbers:", err);
        setLoanNos([]);
      }
    };

    fetchLoanNumbers();
  }, [selectedScheme, fromDate, toDate]);
  useEffect(() => {
    if (!selectedLoanNo) {
      setRows([]);
      return;
    }

    const fetchLoanDetails = async () => {
      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/cancel-loan-details?loanNo=${selectedLoanNo}`,
        );
        const data = await res.json();
        setRows(data.data || []);
      } catch (err) {
        console.error("Error fetching loan details:", err);
        setRows([]);
      }
    };

    fetchLoanDetails();
  }, [selectedLoanNo]);
  return (
    // <div className="min-h-screen bg-gray-100 p-4 font-sans text-xs">
    //   {/* Top Navigation / Info Bar */}
     
    //   {/* Main Report Container */}
    //   <div className="bg-[#108b83] rounded-t-md overflow-hidden shadow-sm">
    //     <div className="px-4 py-1.5 text-white font-medium text-sm">
    //       Loan Cancel Report
    //     </div>

    //     <div className="bg-white p-4 border-x border-b">
    //       {/* Filters Bar */}
    //       <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-4 p-4 border rounded bg-gray-50 border-gray-200">
    //         {/* From Date */}
    //         <div className="flex items-center gap-2">
    //           <label className="whitespace-nowrap font-medium text-gray-700">
    //             From Date
    //           </label>
    //           <div className="flex items-center">
    //             <input
    //               type="date"
    //               className="border border-gray-300 p-1 px-2 rounded-l w-36 bg-white outline-none"
    //               value={fromDate}
    //               onChange={(e) => setFromDate(e.target.value)}
    //             />

               
    //           </div>
    //         </div>

    //         {/* To Date */}
    //         <div className="flex items-center gap-2">
    //           <label className="whitespace-nowrap font-medium text-gray-700">
    //             To Date
    //           </label>
    //           <div className="flex items-center">
    //             <input
    //               type="date"
    //               className="border border-gray-300 p-1 px-2 rounded-l w-36 bg-white outline-none"
    //               value={toDate}
    //               onChange={(e) => setToDate(e.target.value)}
    //             />

                
    //           </div>
    //         </div>

    //         {/* Schemes Dropdown */}
    //         <div className="flex items-center gap-2">
    //           <label className="font-medium text-gray-700">Schemes</label>
    //           <select
    //             className="border border-gray-300 p-1 rounded min-w-[140px] bg-white outline-none focus:border-[#108b83]"
    //             value={selectedScheme}
    //             onChange={(e) => setSelectedScheme(e.target.value)}
    //           >
    //             <option value="IND01">IND01</option>
    //             {loading ? (
    //               <option>Loading...</option>
    //             ) : (
    //               schemes.map((s) => (
    //                 <option key={s.id} value={s.schemeName}>
    //                   {s.schemeName}
    //                 </option>
    //               ))
    //             )}
    //           </select>
    //         </div>

    //         {/* Loan No Dropdown */}
    //         <div className="flex items-center gap-2">
    //           <label className="font-medium text-gray-700">Loan No</label>
    //           <select
    //             className="border border-gray-300 p-1 rounded min-w-[180px] bg-white outline-none focus:border-[#108b83]"
    //             value={selectedLoanNo}
    //             onChange={(e) => setSelectedLoanNo(e.target.value)}
    //           >
    //             <option value="">Select Loan No</option>
    //             {loanNos.map((l) => (
    //               <option key={l.id} value={l.LoanNo}>
    //                 {l.LoanNo}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //       </div>

    //       {/* Action Buttons Row */}
    //       <div className="flex items-center gap-2 border-b pb-4 mb-4">
    //         <button className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors">
    //           <span>💾</span> View
    //         </button>
    //         <button className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors">
    //           <span>✖</span> Exit
    //         </button>

    //         {/* Print/Export Icons */}
    //         <div className="ml-auto flex gap-1">
    //           <button className="border border-blue-800 p-1 px-3 bg-blue-50 rounded text-[#1e5a95] hover:bg-blue-100 shadow-sm">
    //             🖨️
    //           </button>
    //           <button className="border border-blue-800 p-1 px-3 bg-blue-50 rounded text-[#1e5a95] font-bold hover:bg-blue-100 shadow-sm">
    //             📄
    //           </button>
    //         </div>
    //       </div>

    //       {/* Table Container */}
    //       <div className="overflow-x-auto border border-gray-300 rounded-sm">
    //         <table className="w-full text-left border-collapse min-w-[1400px]">
    //           <thead className="bg-[#e7dbcf] text-gray-700">
    //             <tr className="text-[10px] uppercase">
    //               <th className="border border-gray-400 p-1.5 w-12 text-center">
    //                 Sr. No.
    //               </th>
    //               <th className="border border-gray-400 p-1.5">Loan No.</th>
    //               <th className="border border-gray-400 p-1.5">Loan Date</th>
    //               <th className="border border-gray-400 p-1.5">Scheme</th>
    //               <th className="border border-gray-400 p-1.5">Customer ID</th>
    //               <th className="border border-gray-400 p-1.5">
    //                 Customer Name
    //               </th>
    //               <th className="border border-gray-400 p-1.5 w-24">
    //                 Mobile No.
    //               </th>
    //               <th className="border border-gray-400 p-1.5 text-right">
    //                 Loan Amt.
    //               </th>
    //               <th className="border border-gray-400 p-1.5">
    //                 Cancel On [Exec.]
    //               </th>
    //               <th className="border border-gray-400 p-1.5">
    //                 Cancel By [Exec.]
    //               </th>
    //               <th className="border border-gray-400 p-1.5">
    //                 Cancel On [Mngr.]
    //               </th>
    //               <th className="border border-gray-400 p-1.5">
    //                 Cancel By [Mngr.]
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="text-[11px] text-gray-800">
    //             {rows.length === 0 ? (
    //               <tr>
    //                 <td colSpan="12" className="text-center p-4 text-gray-500">
    //                   No data found
    //                 </td>
    //               </tr>
    //             ) : (
    //               rows.map((r, i) => (
    //                 <tr
    //                   key={r.LoanNo}
    //                   className="hover:bg-gray-50 border-b border-gray-300"
    //                 >
    //                   <td className="border border-gray-300 p-1.5 text-center">
    //                     {i + 1}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.LoanNo}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {new Date(r.approval_date).toLocaleDateString()}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5 text-center">
    //                     {r.Scheme}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.BorrowerId}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.Borrower}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.Mobile_Number}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5 text-right">
    //                     {r.Max_Loan}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.CancelExecOn || ""}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.CancelExecBy || ""}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.CancelMgrOn || ""}
    //                   </td>
    //                   <td className="border border-gray-300 p-1.5">
    //                     {r.CancelMgrBy || ""}
    //                   </td>
    //                 </tr>
    //               ))
    //             )}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[16px] whitespace-nowrap uppercase tracking-tight">
              Loan Cancel Report
            </h2>
          </div>

          {/* 🟡 Middle — Filters (Single Line) */}
          <div className="flex items-center gap-6 flex-1 justify-center">

            {/* Date Range Group */}
            <div className="flex items-center gap-4 border-r pr-6 border-gray-200">
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">From</label>
                <input
                  type="date"
                  className="border border-gray-300 p-1.5 rounded text-xs w-[120px] outline-none focus:border-[#0A2478] transition-all"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">To</label>
                <input
                  type="date"
                  className="border border-gray-300 p-1.5 rounded text-xs w-[120px] outline-none focus:border-[#0A2478] transition-all"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            {/* Schemes Selection */}
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Scheme</label>
              <select
                className="border border-gray-300 p-1.5 rounded text-xs w-[120px] bg-white outline-none focus:border-[#0A2478]"
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                <option value="IND01">IND01</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.schemeName}>{s.schemeName}</option>
                  ))
                )}
              </select>
            </div>

            {/* Loan No Selection */}
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Loan No</label>
              <select
                className="border border-gray-300 p-1.5 rounded text-xs w-[140px] bg-white outline-none focus:border-[#0A2478]"
                value={selectedLoanNo}
                onChange={(e) => setSelectedLoanNo(e.target.value)}
              >
                <option value="">All Loans</option>
                {loanNos.map((l) => (
                  <option key={l.id} value={l.LoanNo}>{l.LoanNo}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 🔵 Right — Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="w-[85px] h-[34px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95 flex items-center justify-center"
            >
              View
            </button>
            <button
              className="w-[85px] h-[34px] rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-all shadow-sm active:scale-95 flex items-center justify-center"
            >
              Excel
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-[85px] h-[34px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all shadow-sm active:scale-95 flex items-center justify-center"
            >
              Exit
            </button>
            <div className="flex gap-1 ml-2">
              <button title="Print" className="p-1.5 px-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">🖨️</button>
              <button title="Export PDF" className="p-1.5 px-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors text-red-600 font-bold">📄</button>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1290px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
                  <th className="border border-gray-300 p-2 w-12 text-center uppercase">Sr. No.</th>
                  <th className="border border-gray-300 p-2 uppercase">Loan No.</th>
                  <th className="border border-gray-300 p-2 uppercase">Loan Date</th>
                  <th className="border border-gray-300 p-2 uppercase">Scheme</th>
                  <th className="border border-gray-300 p-2 uppercase">Customer ID</th>
                  <th className="border border-gray-300 p-2 uppercase">Customer Name</th>
                  <th className="border border-gray-300 p-2 uppercase">Mobile No.</th>
                  <th className="border border-gray-300 p-2 text-right uppercase">Loan Amt.</th>
                  <th className="border border-gray-300 p-2 uppercase bg-[#0A2478]/50">Cancel On [Exec.]</th>
                  <th className="border border-gray-300 p-2 uppercase bg-[#0A2478]/50">Cancel By [Exec.]</th>
                  <th className="border border-gray-300 p-2 uppercase ">Cancel On [Mngr.]</th>
                  <th className="border border-gray-300 p-2 uppercase ">Cancel By [Mngr.]</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center p-10 text-gray-400 italic bg-gray-50">
                      No cancelled loans found for the selected criteria.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, i) => (
                    <tr key={r.LoanNo} className="hover:bg-blue-50/30 transition-colors border-b border-gray-200">
                      <td className="border border-gray-300 p-2 text-center">{i + 1}</td>
                      <td className="border border-gray-300 p-2 font-semibold text-[#0A2478]">{r.LoanNo}</td>
                      <td className="border border-gray-300 p-2">
                        {new Date(r.approval_date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">{r.Scheme}</td>
                      <td className="border border-gray-300 p-2">{r.BorrowerId}</td>
                      <td className="border border-gray-300 p-2 font-medium">{r.Borrower}</td>
                      <td className="border border-gray-300 p-2">{r.Mobile_Number}</td>
                      <td className="border border-gray-300 p-2 text-right font-mono font-bold">
                        {Number(r.Max_Loan || 0).toLocaleString()}
                      </td>
                      {/* Executive Cancellation Data */}
                      <td className="border border-gray-300 p-2 text-red-700 bg-red-50/20">{r.CancelExecOn || "-"}</td>
                      <td className="border border-gray-300 p-2 text-red-700 bg-red-50/20">{r.CancelExecBy || "-"}</td>
                      {/* Manager Cancellation Data */}
                      <td className="border border-gray-300 p-2 text-blue-700 bg-blue-50/20">{r.CancelMgrOn || "-"}</td>
                      <td className="border border-gray-300 p-2 text-blue-700 bg-blue-50/20">{r.CancelMgrBy || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCancellationReport;
