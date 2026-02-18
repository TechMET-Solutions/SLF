import { useEffect, useState } from "react";

const OutstandingAmountReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedScheme, setSelectedScheme] = useState("");
  const [loanSearch, setLoanSearch] = useState("");
  const [loanNumbers, setLoanNumbers] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("");

  const [reportRows, setReportRows] = useState([]);
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

   const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split("T")[0]);

  // 1. Fetch Schemes
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

  // 2. Fetch Loan Numbers
  useEffect(() => {
    const fetchLoans = async () => {
      if (!selectedScheme) {
        setLoanNumbers([]);
        return;
      }

      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/loan-numbers?scheme=${selectedScheme}&search=${loanSearch}`,
        );
        const data = await res.json();
        setLoanNumbers(data.data || []);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };

    const timeoutId = setTimeout(fetchLoans, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedScheme, loanSearch]);

  // View
  const handleView = async () => {
    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/outstanding-amount-report?scheme=${selectedScheme}&loanNo=${selectedLoan}`,
      );
      const data = await res.json();
      setReportRows(data.data || []);
    } catch (err) {
      console.error("Error loading report:", err);
    }
  };

  return (
    // <div className="min-h-screen p-4 font-sans text-xs">
    //     <div className="flex justify-center mt-5 px-4 font-sans">
    //       <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

    //         {/* 🔴 Left — Title */}
    //         <div className="flex-shrink-0">
    //           <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
    //             Outstanding Amount Report
    //           </h2>
    //         </div>

    //         {/* 🟡 Middle — Filters (Single Line) */}
    //         <div className="flex items-center gap-6 flex-1 justify-center">

    //           {/* As On Date */}
    //           <div className="flex items-center gap-2">
    //             <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">As On</label>
    //             <input
    //               type="date"
    //               className="border border-gray-300 p-1 rounded text-xs w-[130px] bg-white outline-none focus:border-[#0A2478]"
    //               value={asOnDate}
    //               onChange={(e) => setAsOnDate(e.target.value)}
    //             />
    //           </div>

    //           {/* Schemes Section */}
    //           <div className="flex items-center gap-2">
    //             <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Schemes</label>
    //             <select
    //               className="border border-gray-300 p-1 rounded text-xs w-[160px] bg-white outline-none focus:border-[#0A2478]"
    //               value={selectedScheme}
    //               onChange={(e) => {
    //                 setSelectedScheme(e.target.value);
    //                 setLoanSearch("");
    //                 setSelectedLoan("");
    //               }}
    //             >
    //               <option value="">--Select--</option>
    //               {loading ? (
    //                 <option>Loading...</option>
    //               ) : (
    //                 schemes.map((s) => (
    //                   <option key={s.id} value={s.schemeName}>
    //                     {s.schemeName}
    //                   </option>
    //                 ))
    //               )}
    //             </select>
    //           </div>

    //           {/* Loan No Section */}
    //           <div className="flex items-center gap-2">
    //             <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Loan No</label>
    //             <div className="flex items-center">
    //               <input
    //                 type="text"
    //                 placeholder={selectedScheme ? "Search..." : "Select Scheme"}
    //                 disabled={!selectedScheme}
    //                 value={loanSearch}
    //                 className="border border-gray-300 p-1 px-2 rounded-l text-xs w-[130px] bg-white outline-none disabled:bg-gray-50 focus:border-[#0A2478]"
    //                 onChange={(e) => setLoanSearch(e.target.value)}
    //               />
    //               <select
    //                 className="border border-l-0 border-gray-300 p-1 rounded-r text-xs w-[32px] bg-gray-50 outline-none"
    //                 onChange={(e) => setSelectedLoan(e.target.value)}
    //                 value={selectedLoan}
    //               >
    //                 <option value="">All</option>
    //                 {loanNumbers.map((loan, idx) => (
    //                   <option key={idx} value={loan.loanNo || loan.id}>
    //                     {loan.loanNo || loan.id}
    //                   </option>
    //                 ))}
    //               </select>
    //             </div>
    //           </div>
    //         </div>

    //         {/* 🔵 Right — Action Buttons */}
    //         <div className="flex items-center gap-2 flex-shrink-0">
    //           <button
    //             onClick={handleView}
    //             className="w-[80px] h-[32px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-colors flex items-center justify-center gap-1"
    //           >
    //             View
    //           </button>
    //           <button
    //             onClick={() => window.history.back()}
    //             className="w-[80px] h-[32px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-colors flex items-center justify-center gap-1"
    //           >
    //              PDF
    //           </button>
    //         </div>
    //       </div>
    //     </div>

        

    //     <div className="bg-white p-4 border-x border-b">
    //       {/* Table */}
    //       <div className="mb-6">
    //         <table className="w-full text-left border-collapse min-w-[1500px]">
    //           <thead className="bg-[#e7dbcf] text-gray-700">
    //             <tr className="text-[11px]">
    //               <th className="border border-gray-400 p-1 w-12 text-center">
    //                 SI No
    //               </th>
    //               <th className="border border-gray-400 p-1">Loan No</th>
    //               <th className="border border-gray-400 p-1">Loan Date</th>
    //               <th className="border border-gray-400 p-1">Scheme</th>
    //               <th className="border border-gray-400 p-1">Customer ID</th>
    //               <th className="border border-gray-400 p-1">Customer Name</th>
    //               <th className="border border-gray-400 p-1 text-right">
    //                 Principal Amount
    //               </th>
    //               <th className="border border-gray-400 p-1 text-right">
    //                 Interest Amount
    //               </th>
    //               <th className="border border-gray-400 p-1 text-right">
    //                 Other Charges
    //               </th>
    //               <th className="border border-gray-400 p-1 text-right">
    //                 Total Outstanding
    //               </th>
    //               <th className="border border-gray-400 p-1">
    //                 Last Payment Date
    //               </th>
    //               <th className="border border-gray-400 p-1">Overdue Days</th>
    //               <th className="border border-gray-400 p-1">Mobile No</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {reportRows.map((row, i) => (
    //               <tr key={row.id} className="text-[11px]">
    //                 <td className="border border-gray-400 p-1 text-center">
    //                   {i + 1}
    //                 </td>
    //                 <td className="border border-gray-400 p-1">{row.id}</td>
    //                 <td className="border border-gray-400 p-1">
    //                   {row.created_at
    //                     ? new Date(row.created_at).toLocaleDateString()
    //                     : ""}
    //                 </td>
    //                 <td className="border border-gray-400 p-1">{row.Scheme}</td>
    //                 <td className="border border-gray-400 p-1">
    //                   {row.BorrowerId}
    //                 </td>
    //                 <td className="border border-gray-400 p-1">
    //                   {row.Borrower}
    //                 </td>
    //                 <td className="border border-gray-400 p-1 text-right">
    //                   {row.Loan_amount || 0}
    //                 </td>
    //                 <td className="border border-gray-400 p-1 text-right">
    //                   {row.InterestDueAmount || 0}
    //                 </td>
    //                 <td className="border border-gray-400 p-1 text-right">
    //                   {row.Doc_Charges || 0}
    //                 </td>
    //                 <td className="border border-gray-400 p-1 text-right">
    //                   {row.LoanPendingAmount || 0}
    //                 </td>
    //                 <td className="border border-gray-400 p-1">
    //                   {row.LastEmiPaidDate || "-"}
    //                 </td>
    //                 <td className="border border-gray-400 p-1">
    //                   {row.InterestPaidDayCount || 0}
    //                 </td>
    //                 <td className="border border-gray-400 p-1">
    //                   {row.Mobile_Number}
    //                 </td>
    //               </tr>
    //             ))}

    //             <tr className="bg-[#f2e9e0] font-bold text-[11px]">
    //               <td
    //                 className="border border-gray-400 p-1 text-center"
    //                 colSpan="6"
    //               >
    //                 Total
    //               </td>
    //               <td className="border border-gray-400 p-1 text-right">
    //                 {reportRows.reduce(
    //                   (s, r) => s + Number(r.Loan_amount || 0),
    //                   0,
    //                 )}
    //               </td>
    //               <td className="border border-gray-400 p-1 text-right">
    //                 {reportRows.reduce(
    //                   (s, r) => s + Number(r.InterestDueAmount || 0),
    //                   0,
    //                 )}
    //               </td>
    //               <td className="border border-gray-400 p-1 text-right">
    //                 {reportRows.reduce(
    //                   (s, r) => s + Number(r.Doc_Charges || 0),
    //                   0,
    //                 )}
    //               </td>
    //               <td className="border border-gray-400 p-1 text-right">
    //                 {reportRows.reduce(
    //                   (s, r) => s + Number(r.LoanPendingAmount || 0),
    //                   0,
    //                 )}
    //               </td>
    //               <td colSpan="3" className="border border-gray-400 p-1"></td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
              Outstanding Amount Report
            </h2>
          </div>

          {/* 🟡 Middle — Filters */}
          <div className="flex items-center gap-6 flex-1 justify-center">
            {/* As On Date */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">As On</label>
              <input
                type="date"
                className="border border-gray-300 p-1.5 rounded text-xs w-[130px] bg-white outline-none focus:border-[#0A2478] focus:ring-1 focus:ring-[#0A2478]/20 transition-all"
                value={asOnDate}
                onChange={(e) => setAsOnDate(e.target.value)}
              />
            </div>

            {/* Schemes Section */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Schemes</label>
              <select
                className="border border-gray-300 p-1.5 rounded text-xs w-[160px] bg-white outline-none focus:border-[#0A2478]"
                value={selectedScheme}
                onChange={(e) => {
                  setSelectedScheme(e.target.value);
                  setLoanSearch("");
                  setSelectedLoan("");
                }}
              >
                <option value="">--Select--</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.schemeName}>{s.schemeName}</option>
                  ))
                )}
              </select>
            </div>

            {/* Loan No Section */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Loan No</label>
              <div className="flex items-center group">
                <input
                  type="text"
                  placeholder={selectedScheme ? "Search..." : "Select Scheme"}
                  disabled={!selectedScheme}
                  value={loanSearch}
                  className="border border-gray-300 p-1.5 px-2 rounded-l text-xs w-[130px] bg-white outline-none disabled:bg-gray-50 focus:border-[#0A2478] transition-all"
                  onChange={(e) => setLoanSearch(e.target.value)}
                />
                <select
                  className="border border-l-0 border-gray-300 p-1.5 rounded-r text-xs w-[32px] bg-gray-50 outline-none cursor-pointer hover:bg-gray-100"
                  onChange={(e) => setSelectedLoan(e.target.value)}
                  value={selectedLoan}
                >
                  <option value="">All</option>
                  {loanNumbers.map((loan, idx) => (
                    <option key={idx} value={loan.loanNo || loan.id}>
                      {loan.loanNo || loan.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 🔵 Right — Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleView}
              className="w-[85px] h-[34px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              View
            </button>
            <button
              className="w-[85px] h-[34px] rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              Excel
            </button>
            <button
              className="w-[85px] h-[34px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1290px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[11px] font-bold">
                  <th className="border border-gray-300 p-2 w-12 text-center uppercase">SI No</th>
                  <th className="border border-gray-300 p-2 uppercase">Loan No</th>
                  <th className="border border-gray-300 p-2 uppercase">Loan Date</th>
                  <th className="border border-gray-300 p-2 uppercase">Scheme</th>
                  <th className="border border-gray-300 p-2 uppercase">Customer ID</th>
                  <th className="border border-gray-300 p-2 uppercase">Customer Name</th>
                  <th className="border border-gray-300 p-2 text-right uppercase">Principal</th>
                  <th className="border border-gray-300 p-2 text-right uppercase">Interest Due</th>
                  <th className="border border-gray-300 p-2 text-right uppercase">Other Charges</th>
                  <th className="border border-gray-300 p-2 text-right uppercase">Total Outstanding</th>
                  <th className="border border-gray-300 p-2 uppercase">Last Payment</th>
                  <th className="border border-gray-300 p-2 uppercase text-center">Overdue Days</th>
                  <th className="border border-gray-300 p-2 uppercase">Mobile No</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {reportRows.map((row, i) => (
                  <tr key={row.id} className="text-[11px] hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 p-1.5 text-center">{i + 1}</td>
                    <td className="border border-gray-300 p-1.5 font-medium">{row.id}</td>
                    <td className="border border-gray-300 p-1.5">
                      {row.created_at ? new Date(row.created_at).toLocaleDateString('en-GB') : ""}
                    </td>
                    <td className="border border-gray-300 p-1.5">{row.Scheme}</td>
                    <td className="border border-gray-300 p-1.5">{row.BorrowerId}</td>
                    <td className="border border-gray-300 p-1.5 font-medium">{row.Borrower}</td>
                    <td className="border border-gray-300 p-1.5 text-right font-mono">{Number(row.Loan_amount || 0).toLocaleString()}</td>
                    <td className="border border-gray-300 p-1.5 text-right font-mono">{Number(row.InterestDueAmount || 0).toLocaleString()}</td>
                    <td className="border border-gray-300 p-1.5 text-right font-mono">{Number(row.Doc_Charges || 0).toLocaleString()}</td>
                    <td className="border border-gray-300 p-1.5 text-right font-bold text-blue-900 font-mono bg-blue-50/30">
                      {Number(row.LoanPendingAmount || 0).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-1.5">{row.LastEmiPaidDate || "-"}</td>
                    <td className="border border-gray-300 p-1.5 text-center">{row.InterestPaidDayCount || 0}</td>
                    <td className="border border-gray-300 p-1.5">{row.Mobile_Number}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#f2e9e0] font-bold text-[11px] text-gray-800">
                  <td className="border border-gray-300 p-2 text-center uppercase" colSpan="6">Total</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">
                    {reportRows.reduce((s, r) => s + Number(r.Loan_amount || 0), 0).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-right font-mono">
                    {reportRows.reduce((s, r) => s + Number(r.InterestDueAmount || 0), 0).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-right font-mono">
                    {reportRows.reduce((s, r) => s + Number(r.Doc_Charges || 0), 0).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-right font-mono text-blue-900">
                    {reportRows.reduce((s, r) => s + Number(r.LoanPendingAmount || 0), 0).toLocaleString()}
                  </td>
                  <td colSpan="3" className="border border-gray-300 p-2 bg-[#f2e9e0]"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default OutstandingAmountReport;
