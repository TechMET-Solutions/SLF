import { useEffect, useState } from "react";

const NpaReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [asOnDate, setAsOnDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedScheme, setSelectedScheme] = useState("");

  // Table data
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10",
        );
        const result = await response.json();
        setSchemes(result.data || []);
        if (result.data?.length) {
          setSelectedScheme(result.data[0].id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schemes:", error);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  // View Button Handler
  const handleView = async () => {
    if (!asOnDate || !selectedScheme) {
      alert("Please select Date and Scheme");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/npa-report?date=${asOnDate}&schemeId=${selectedScheme}`,
      );
      const data = await res.json();
      setRows(data.data || []);
    } catch (err) {
      console.error("Error fetching NPA data:", err);
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-[#f0f2f5] font-sans text-[12px]">
    //   <div className="m-3 border border-gray-300 bg-white shadow-md">
    //     <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
    //       NPA Report
    //     </div>

    //     {/* Filters */}
    //     <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-8">
    //       <div className="flex items-center gap-2">
    //         <label className="text-gray-700 font-medium">As On</label>
    //         <input
    //           type="date"
    //           value={asOnDate}
    //           onChange={(e) => setAsOnDate(e.target.value)}
    //           className="border px-2 py-1 w-32"
    //         />
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <label className="text-gray-700 font-medium">Schemes</label>
    //         <select
    //           className="border px-2 py-1 w-44 bg-white"
    //           value={selectedScheme}
    //           onChange={(e) => setSelectedScheme(e.target.value)}
    //         >
    //           {loading ? (
    //             <option>Loading...</option>
    //           ) : (
    //             schemes.map((s) => (
    //               <option key={s.id} value={s.id}>
    //                 {s.schemeName}
    //               </option>
    //             ))
    //           )}
    //         </select>
    //       </div>
    //     </div>

    //     {/* Buttons */}
    //     <div className="px-3 py-2 flex gap-2 border-b bg-gray-50">
    //       <button
    //         onClick={handleView}
    //         className="bg-[#005da3] text-white px-8 py-1 hover:bg-blue-800"
    //       >
    //         {isLoading ? "Loading..." : "💾 View"}
    //       </button>
    //       <button className="bg-[#005da3] text-white px-8 py-1 hover:bg-blue-800">
    //         ✖ Exit
    //       </button>
    //     </div>

    //     {/* Table */}
    //     <div className="overflow-x-auto min-h-[400px]">
    //       <table className="w-full border-collapse text-[11px]">
    //         <thead className="bg-[#e9e4db] border-b border-gray-400">
    //           <tr>
    //             <th className="border p-1">S.No.</th>
    //             <th className="border p-1">Loan No.</th>
    //             <th className="border p-1">Loan Date</th>
    //             <th className="border p-1">Scheme</th>
    //             <th className="border p-1">Customer ID</th>
    //             <th className="border p-1">Customer Name</th>
    //             <th className="border p-1">Mobile No.</th>
    //             <th className="border p-1 text-right">Loan Amount</th>
    //             <th className="border p-1 text-right">Pending Int.</th>
    //             <th className="border p-1 text-right">Outstanding</th>
    //             <th className="border p-1">Int. Days</th>
    //             <th className="border p-1">Last Receipt</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {rows.length > 0 ? (
    //             rows.map((r, i) => (
    //               <tr key={r.id} className="border-b hover:bg-blue-50">
    //                 <td className="border p-1">{i + 1}</td>
    //                 <td className="border p-1">{r.id}</td>
    //                 <td className="border p-1">
    //                   {r.approval_date
    //                     ? new Date(r.approval_date).toLocaleDateString()
    //                     : ""}
    //                 </td>
    //                 <td className="border p-1">{r.Scheme}</td>
    //                 <td className="border p-1">{r.BorrowerId}</td>
    //                 <td className="border p-1">{r.Borrower}</td>
    //                 <td className="border p-1">{r.Mobile_Number}</td>
    //                 <td className="border p-1 text-right">
    //                   {Number(r.Loan_amount || 0).toFixed(2)}
    //                 </td>
    //                 <td className="border p-1 text-right">
    //                   {Number(r.InterestDueAmount || 0).toFixed(2)}
    //                 </td>
    //                 <td className="border p-1 text-right">
    //                   {Number(r.LoanPendingAmount || 0).toFixed(2)}
    //                 </td>
    //                 <td className="border p-1">
    //                   {r.InterestPaidDayCount || ""}
    //                 </td>
    //                 <td className="border p-1">
    //                   {r.LastInterestPaidDate
    //                     ? new Date(r.LastInterestPaidDate).toLocaleDateString()
    //                     : ""}
    //                 </td>
    //               </tr>
    //             ))
    //           ) : (
    //             <tr>
    //               <td colSpan="12" className="p-4 text-center text-gray-500">
    //                 {isLoading
    //                   ? "Loading..."
    //                   : "Select Date & Scheme and click View"}
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
              NPA Report
            </h2>
          </div>

          {/* 🟡 Middle — Filters (Single Line) */}
          <div className="flex items-center gap-8 flex-1 justify-center">

            {/* As On Date */}
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">As On</label>
              <input
                type="date"
                className="border border-gray-300 p-1.5 rounded text-xs w-[140px] bg-white outline-none focus:border-[#0A2478] transition-all"
                value={asOnDate}
                onChange={(e) => setAsOnDate(e.target.value)}
              />
            </div>

            {/* Schemes Selection */}
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Scheme</label>
              <select
                className="border border-gray-300 p-1.5 rounded text-xs min-w-[200px] bg-white outline-none focus:border-[#0A2478]"
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                <option value="">-- All Categories --</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.id}>{s.schemeName}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* 🔵 Right — Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleView}
              disabled={isLoading}
              className="w-[100px] h-[34px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              {isLoading ? "..." : "View"}
            </button>
            <button
              onClick={handleView}
              disabled={isLoading}
              className="w-[100px] h-[34px] rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              {isLoading ? "..." : "Excel"}
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-[85px] h-[34px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all shadow-sm active:scale-95 flex items-center justify-center"
            >
              PDF
            </button>
            
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1290px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[450px]">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
                  <th className="border border-gray-300 p-2 w-12 text-center uppercase">S.No.</th>
                  <th className="border border-gray-300 p-2 uppercase">Loan No.</th>
                  <th className="border border-gray-300 p-2 uppercase">Loan Date</th>
                  <th className="border border-gray-300 p-2 uppercase">Scheme</th>
                  <th className="border border-gray-300 p-2 uppercase">Customer Name</th>
                  <th className="border border-gray-300 p-2 uppercase">Mobile No.</th>
                  <th className="border border-gray-300 p-2 text-right uppercase">Loan Amount</th>
                  <th className="border border-gray-300 p-2 text-right uppercase bg-red-50/30">Pending Int.</th>
                  <th className="border border-gray-300 p-2 text-right uppercase">Outstanding</th>
                  <th className="border border-gray-300 p-2 text-center uppercase text-red-700 bg-red-50/30">Int. Days</th>
                  <th className="border border-gray-300 p-2 uppercase text-center">Last Receipt</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                {rows.length > 0 ? (
                  rows.map((r, i) => (
                    <tr key={r.id} className="hover:bg-blue-50/30 transition-colors border-b border-gray-200">
                      <td className="border border-gray-300 p-2 text-center text-gray-500">{i + 1}</td>
                      <td className="border border-gray-300 p-2 font-semibold text-[#0A2478]">{r.id}</td>
                      <td className="border border-gray-300 p-2 whitespace-nowrap">
                        {r.approval_date ? new Date(r.approval_date).toLocaleDateString('en-GB') : ""}
                      </td>
                      <td className="border border-gray-300 p-2">{r.Scheme}</td>
                      <td className="border border-gray-300 p-2">
                        <div className="font-medium uppercase">{r.Borrower}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{r.BorrowerId}</div>
                      </td>
                      <td className="border border-gray-300 p-2 font-mono">{r.Mobile_Number}</td>
                      <td className="border border-gray-300 p-2 text-right font-mono bg-blue-50/5">
                        {Number(r.Loan_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 p-2 text-right font-mono text-red-600 bg-red-50/5">
                        {Number(r.InterestDueAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 p-2 text-right font-mono font-bold text-[#0A2478] bg-blue-50/5">
                        {Number(r.LoanPendingAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 p-2 text-center font-bold text-red-700 bg-red-50/5">
                        {r.InterestPaidDayCount || "0"}
                      </td>
                      <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                        {r.LastInterestPaidDate ? new Date(r.LastInterestPaidDate).toLocaleDateString('en-GB') : "No Receipt"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="p-16 text-center text-gray-400 italic bg-gray-50 uppercase tracking-widest text-[10px]">
                      {isLoading ? "Fetching NPA Data..." : "Select Filters and click View to generate NPA Analysis"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NpaReport;
