import { useEffect, useState } from "react";

const GoldStockReport = () => {
  const [schemes, setSchemes] = useState([]); // All schemes from API
  const [loading, setLoading] = useState(true); // Loader for schemes

  const [selectedScheme, setSelectedScheme] = useState("IND01"); // Selected scheme

  const [fromDate, setFromDate] = useState( new Date().toISOString().split("T")[0]); // From date
  const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const [loanNos, setLoanNos] = useState([]); // Loan numbers based on filters
  const [selectedLoanNo, setSelectedLoanNo] = useState(""); // Selected loan no

  const [rows, setRows] = useState([]); // Table data (cancelled loan details)
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
  const handleView = async () => {
    if (!selectedScheme) {
      alert("Please select scheme");
      return;
    }

    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/gold-stock?scheme=${selectedScheme}&fromDate=${fromDate}`,
      );
      const data = await res.json();
      setRows(data.data || []);
    } catch (err) {
      console.error("Error fetching gold stock:", err);
      setRows([]);
    }
  };

  return (
    // <div className="min-h-screen bg-[#f0f0f0] font-sans text-[12px]">
    //   {/* 2. Main Container */}
    //   <div className="m-3 border border-gray-300 bg-white shadow-sm">
    //     {/* Title Bar */}
    //     <div className="bg-[#008282] text-white px-3 py-1.5 font-semibold text-sm">
    //       Gold Stock Report
    //     </div>

    //     {/* 3. Filter Section */}
    //     <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-10">
    //       <div className="flex items-center gap-2">
    //         <label className="text-gray-600">As On</label>
    //         <div className="flex items-center">
    //           <input
    //             type="date"
    //             value={fromDate}
    //             onChange={(e) => setFromDate(e.target.value)}
    //             className="border border-gray-300 p-1 w-32 outline-none"
    //           />

             
    //         </div>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <label className="text-gray-600">Schemes</label>
    //         <select
    //           className="border border-gray-300 p-1 rounded min-w-[140px]"
    //           value={selectedScheme}
    //           onChange={(e) => setSelectedScheme(e.target.value)}
    //         >
    //           <option value="">select scheme</option>
    //           {loading ? (
    //             <option>Loading...</option>
    //           ) : (
    //             schemes.map((s) => (
    //               <option key={s.id} value={s.schemeName}>
    //                 {s.schemeName}
    //               </option>
    //             ))
    //           )}
    //         </select>
    //       </div>
    //     </div>

    //     {/* 4. Action Buttons Bar */}
    //     <div className="p-2 border-b border-gray-200 flex justify-between items-center bg-white">
    //       <div className="flex gap-1">
    //         <button
    //           className="bg-[#005a9c] text-white px-8 py-1 flex items-center gap-2 text-sm shadow-md"
    //           onClick={handleView}
    //         >
    //           💾 View
    //         </button>
    //         <button className="bg-[#005a9c] text-white px-8 py-1 flex items-center gap-2 text-sm shadow-md">
    //           ✖ Exit
    //         </button>
    //       </div>
    //       <div className="flex gap-1">
    //         <button className="bg-[#005a9c] text-white p-1 rounded">🖨️</button>
    //         <button className="bg-[#005a9c] text-white p-1 rounded">📄</button>
    //       </div>
    //     </div>

    //     {/* 5. Data Table */}
    //     <div className="overflow-x-auto min-h-[400px]">
    //       <table className="w-full border-collapse">
    //         <thead>
    //           <tr className="bg-[#e7e1d5] border-b border-gray-300 text-left">
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               S.No.
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Loan No.
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Loan Date
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Scheme
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Customer ID
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Customer Name
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Mobile No.
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Eligible Loan Amt.
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Loan Amount
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Gross Weight
    //             </th>
    //             <th className="border-r border-gray-300 p-1 font-normal">
    //               Net Weight
    //             </th>
    //             <th className="p-1 font-normal">Current Value</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {rows.length === 0 ? (
    //             <tr className="border-b border-gray-100 h-8">
    //               <td colSpan={12} className="text-center text-gray-500 p-4">
    //                 No data found
    //               </td>
    //             </tr>
    //           ) : (
    //             rows.map((r, i) => {
    //               // calculate weights from Pledge_Item_List
    //               const gross = r.Pledge_Item_List?.reduce(
    //                 (sum, x) => sum + Number(x.gross || 0),
    //                 0,
    //               );
    //               const net = r.Pledge_Item_List?.reduce(
    //                 (sum, x) => sum + Number(x.netWeight || 0),
    //                 0,
    //               );

    //               return (
    //                 <tr key={r.id} className="border-b border-gray-100 h-8">
    //                   <td className="border-r border-gray-200 p-1">{i + 1}</td>
    //                   <td className="border-r border-gray-200 p-1">{r.id}</td>
    //                   <td className="border-r border-gray-200 p-1">
    //                     {new Date(r.approval_date).toLocaleDateString()}
    //                   </td>
    //                   <td className="border-r border-gray-200 p-1">
    //                     {r.Scheme}
    //                   </td>
    //                   <td className="border-r border-gray-200 p-1">
    //                     {r.BorrowerId}
    //                   </td>
    //                   <td className="border-r border-gray-200 p-1">
    //                     {r.Borrower}
    //                   </td>
    //                   <td className="border-r border-gray-200 p-1">
    //                     {r.Mobile_Number}
    //                   </td>
    //                   <td className="border-r border-gray-200 p-1">
    //                     {r.Max_Loan}
    //                   </td>
    //                   <td className="border-r border-gray-200 p-1">
    //                     {r.Loan_amount}
    //                   </td>
    //                   <td className="border-r border-gray-200 p-1">{gross}</td>
    //                   <td className="border-r border-gray-200 p-1">{net}</td>
    //                   <td className="p-1">{r.Net_Payable}</td>
    //                 </tr>
    //               );
    //             })
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
          Gold Stock Report
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
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* Schemes Selection */}
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Scheme</label>
          <select
            className="border border-gray-300 p-1.5 rounded text-xs min-w-[180px] bg-white outline-none focus:border-[#0A2478]"
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
          >
            <option value="">-- All Schemes --</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              schemes.map((s) => (
                <option key={s.id} value={s.schemeName}>{s.schemeName}</option>
              ))
            )}
          </select>
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
          onClick={handleView}
              className="w-[85px] h-[34px] rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
        >
          Excel
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-[85px] h-[34px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
        >
          Exit
        </button>
        
      </div>
    </div>
  </div>

  {/* 🟢 Table Section */}
  <div className="flex justify-center">
    <div className="w-full max-w-[1290px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto min-h-[450px]">
        <table className="w-full text-left border-collapse min-w-[1300px]">
          <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
              <th className="border border-gray-300 p-2 w-12 text-center uppercase">S.No.</th>
              <th className="border border-gray-300 p-2 uppercase">Loan No.</th>
              <th className="border border-gray-300 p-2 uppercase">Loan Date</th>
              <th className="border border-gray-300 p-2 uppercase">Scheme</th>
              <th className="border border-gray-300 p-2 uppercase">Customer ID</th>
              <th className="border border-gray-300 p-2 uppercase">Customer Name</th>
              <th className="border border-gray-300 p-2 uppercase">Mobile No.</th>
              <th className="border border-gray-300 p-2 text-right uppercase">Eligible Amt.</th>
              <th className="border border-gray-300 p-2 text-right uppercase">Loan Amount</th>
              <th className="border border-gray-300 p-2 text-right uppercase">Gross Wt.</th>
              <th className="border border-gray-300 p-2 text-right uppercase">Net Wt.</th>
              <th className="border border-gray-300 p-2 text-right uppercase">Current Value</th>
            </tr>
          </thead>
          <tbody className="text-[11px] text-gray-700">
            {rows.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center p-12 text-gray-400 italic bg-gray-50">
                  No stock data available for the selected period.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => {
                const gross = r.Pledge_Item_List?.reduce((sum, x) => sum + Number(x.gross || 0), 0) || 0;
                const net = r.Pledge_Item_List?.reduce((sum, x) => sum + Number(x.netWeight || 0), 0) || 0;

                return (
                  <tr key={r.id} className="hover:bg-blue-50/30 transition-colors border-b border-gray-200">
                    <td className="border border-gray-300 p-2 text-center">{i + 1}</td>
                    <td className="border border-gray-300 p-2 font-semibold text-[#0A2478]">{r.id}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(r.approval_date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="border border-gray-300 p-2">{r.Scheme}</td>
                    <td className="border border-gray-300 p-2 text-gray-500">{r.BorrowerId}</td>
                    <td className="border border-gray-300 p-2 font-medium">{r.Borrower}</td>
                    <td className="border border-gray-300 p-2">{r.Mobile_Number}</td>
                    <td className="border border-gray-300 p-2 text-right font-mono bg-blue-50/10">
                      {Number(r.Max_Loan || 0).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2 text-right font-mono font-bold text-blue-800 bg-blue-50/10">
                      {Number(r.Loan_amount || 0).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2 text-right font-mono text-orange-700 bg-yellow-50/20">
                      {gross.toFixed(3)}g
                    </td>
                    <td className="border border-gray-300 p-2 text-right font-mono font-bold text-orange-900 bg-yellow-50/20">
                      {net.toFixed(3)}g
                    </td>
                    <td className="border border-gray-300 p-2 text-right font-mono font-bold text-green-700">
                      {Number(r.Net_Payable || 0).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
};

export default GoldStockReport;
