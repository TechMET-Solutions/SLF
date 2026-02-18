import axios from "axios";
import { FileSpreadsheet, FileText, Printer, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const Balance_Sheet = () => {
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [balanceSheetData, setBalanceSheetData] = useState({
    assets: [],
    liabilities: [],
    totals: {
      totalAssets: "0.00",
      totalLiabilities: "0.00",
      difference: "0.00",
    },
  });

  const fetchBalanceSheet = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/api/trial-balance/balance-sheet`, { fromDate, toDate });
      if (res.data?.success) {
        setBalanceSheetData(res.data.data);
      }
    } catch (error) {
      console.error("Balance Sheet Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBalanceSheet(); }, []);

  const handleRowClick = (ledgerId) => {
    navigate(`/ledger-details`, { state: { ledgerId, fromDate, toDate } });
  };

  // Helper to render columns with the Difference pushed to the bottom
  const renderColumn = (groups, isAssetSide) => {
    const diffValue = parseFloat(balanceSheetData.totals.difference);
    // Logic: If diff is positive, it usually goes to Assets side to balance, if negative, to Liabilities.
    // Adjust this condition based on your backend logic.
    const showDiffOnThisSide = isAssetSide ? diffValue > 0 : diffValue < 0;

    return (
      <div className="flex flex-col min-h-[500px] h-full justify-between">
        {/* Top Section: Ledger Groups */}
        <div className="p-2">
          {groups?.map((group, gIdx) => (
            <div key={gIdx} className="mb-6">
              <div className="font-bold px-1 py-1 underline uppercase text-gray-700">
                {group.groupName}
              </div>
              {group.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-10 px-1 py-0.5 hover:bg-gray-50 transition-colors group">
                  <span className="col-span-7 text-blue-800 cursor-pointer group-hover:underline" onClick={() => handleRowClick(item.ledgerId)}>
                    {item.name}
                  </span>
                  <span className="col-span-3 text-right font-mono">
                    {parseFloat(item.amount).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="grid grid-cols-10 px-1">
                <div className="col-span-6"></div>
                <div className="col-span-4 flex flex-col items-end">
                  <div className="w-full border-t border-dashed border-black mt-1"></div>
                  <div className="text-right font-bold py-0.5 font-mono">{parseFloat(group.groupTotal).toFixed(2)}</div>
                  <div className="w-full border-t border-dashed border-black"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Difference (Pinned to bottom) */}
        <div className="p-2 pb-4">
          {showDiffOnThisSide && diffValue !== 0 && (
            <div className="grid grid-cols-10 px-1 items-end">
              <span className="col-span-6 italic font-bold text-gray-600">Difference</span>
              <div className="col-span-4 flex flex-col items-end">
                <div className="w-full border-t border-dashed border-black"></div>
                <span className="text-right font-bold py-1 font-mono text-[13px]">
                  {Math.abs(diffValue).toFixed(2)}
                </span>
                <div className="w-full border-t border-dashed border-black"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    // <div className="min-h-screen bg-[#f4f7f6] p-2 text-[12px] font-sans">
    //   <div className="bg-white border border-gray-300 shadow-sm">
    //     {/* Controls Bar */}
    //     <div className="flex justify-between items-center p-2 border-b bg-gray-50">
    //       <div className="flex items-center gap-4">
    //         <div className="flex items-center gap-1"><label className="font-bold">From:</label><input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border px-1 border-gray-400" /></div>
    //         <div className="flex items-center gap-1"><label className="font-bold">To:</label><input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border px-1 border-gray-400" /></div>
    //         <button onClick={fetchBalanceSheet} className="bg-[#005a8d] text-white px-6 py-1 font-bold shadow-sm">{loading ? "..." : "View"}</button>
    //       </div>
    //       <div className="flex gap-1">
    //         <button className="p-1 border bg-white"><Printer size={16} className="text-blue-700" /></button>
    //         <button className="p-1 border bg-white"><FileSpreadsheet size={16} className="text-green-700" /></button>
    //         <button className="p-1 border bg-white"><FileText size={16} className="text-red-700" /></button>
    //       </div>
    //     </div>

    //     <table className="w-full border-collapse table-fixed">
    //       <thead>
    //         <tr className="bg-[#e8ecef] border-b border-gray-400 text-left">
    //           <th className="border-r border-gray-400 p-2 w-[35%] font-bold">LIABILITIES</th>
    //           <th className="border-r border-gray-400 p-2 w-[15%] text-right font-bold">AMOUNT</th>
    //           <th className="border-r border-gray-400 p-2 w-[35%] font-bold">ASSETS</th>
    //           <th className="p-2 w-[15%] text-right font-bold">AMOUNT</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr className="align-top">
    //           {/* LIABILITIES COLUMN */}
    //           <td colSpan={2} className="border-r border-gray-400 p-0 vertical-align-top">
    //             {renderColumn(balanceSheetData.liabilities, false)}
    //           </td>

    //           {/* ASSETS COLUMN */}
    //           <td colSpan={2} className="p-0 vertical-align-top">
    //             {renderColumn(balanceSheetData.assets, true)}
    //           </td>
    //         </tr>

    //         {/* GRAND TOTAL ROW */}
    //         <tr className="border-t-2 border-gray-400 font-bold bg-[#fdfdfd] h-12">
    //           <td className="border-r border-gray-400"></td>
    //           <td className="border-r border-gray-400 p-2 text-right">
    //             <span className="border-b-[3px] border-double border-black font-mono text-[14px]">
    //               {parseFloat(balanceSheetData.totals.totalLiabilities).toFixed(2)}
    //             </span>
    //           </td>
    //           <td className="border-r border-gray-400"></td>
    //           <td className="p-2 text-right">
    //             <span className="border-b-[3px] border-double border-black font-mono text-[14px]">
    //               {parseFloat(balanceSheetData.totals.totalAssets).toFixed(2)}
    //             </span>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      {/* 🟦 Single Line Header & Control Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1400px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
              Balance Sheet
            </h2>
          </div>

          {/* 🟡 Middle — Inline Filters */}
          <div className="flex items-center gap-6 flex-1 justify-center">
            <div className="flex items-center gap-4">

              {/* From Date */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">From Date</label>
                <input
                  type="date"
                  className="border border-gray-300 p-1.5 rounded text-[11px] w-[140px] outline-none focus:border-[#1a8a81] bg-white shadow-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              {/* To Date */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">To Date</label>
                <input
                  type="date"
                  className="border border-gray-300 p-1.5 rounded text-[11px] w-[140px] outline-none focus:border-[#1a8a81] bg-white shadow-sm"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* 🔵 Right — Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBalanceSheet}
              disabled={loading}
              className="w-[110px] h-[34px] rounded bg-[#005a9c] text-white text-[12px] font-bold hover:bg-[#004a80] transition-all shadow-sm active:scale-95 uppercase tracking-wider"
            >
              {loading ? "..." : "View Report"}
            </button>

            <div className="flex border-l pl-3 gap-1">
              <button title="Print" className="p-1.5 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 text-blue-700 transition-all">
                <Printer size={16} />
              </button>
              <button title="Export Excel" className="p-1.5 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 text-green-700 transition-all">
                <FileSpreadsheet size={16} />
              </button>
              <button title="Export PDF" className="p-1.5 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 text-red-600 transition-all">
                <FileText size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 T-Shape Balance Sheet Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed min-w-[1000px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[11px] font-bold uppercase tracking-wider">
                  <th className="border-r border-gray-300 p-3 w-[35%]">Liabilities & Equity</th>
                  <th className="border-r border-gray-300 p-3 w-[15%] text-right">Amount</th>
                  <th className="border-r border-gray-300 p-3 w-[35%]">Assets</th>
                  <th className="p-3 w-[15%] text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                <tr className="align-top divide-x divide-gray-200">
                  {/* LIABILITIES COLUMN */}
                  <td colSpan={2} className="p-0">
                    <div className="min-h-[500px] bg-white">
                      {renderColumn(balanceSheetData.liabilities, false)}
                    </div>
                  </td>

                  {/* ASSETS COLUMN */}
                  <td colSpan={2} className="p-0">
                    <div className="min-h-[500px] bg-white">
                      {renderColumn(balanceSheetData.assets, true)}
                    </div>
                  </td>
                </tr>

                {/* GRAND TOTAL ROW */}
                <tr className="border-t-2 border-[#1a8a81] font-bold bg-[#f8fafb] h-14">
                  <td className="border-r border-gray-300 p-3 text-right uppercase text-gray-500 tracking-tighter">Total Liabilities</td>
                  <td className="border-r border-gray-300 p-3 text-right">
                    <div className="inline-block border-b-4 border-double border-gray-800 font-mono text-[15px] text-[#005a9c]">
                      {parseFloat(balanceSheetData.totals.totalLiabilities).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="border-r border-gray-300 p-3 text-right uppercase text-gray-500 tracking-tighter">Total Assets</td>
                  <td className="p-3 text-right">
                    <div className="inline-block border-b-4 border-double border-gray-800 font-mono text-[15px] text-[#005a9c]">
                      {parseFloat(balanceSheetData.totals.totalAssets).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="max-w-[1400px] mx-auto mt-2 flex justify-between text-[10px] text-gray-400 uppercase font-medium tracking-widest">
        <span>Generated: {new Date().toLocaleString()}</span>
        <span>Balance Sheet Statement</span>
      </div>
    </div>
  );
};

export default Balance_Sheet;