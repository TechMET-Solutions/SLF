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
    <div className="min-h-screen bg-[#f4f7f6] p-2 text-[12px] font-sans">
      <div className="bg-white border border-gray-300 shadow-sm">
        {/* Controls Bar */}
        <div className="flex justify-between items-center p-2 border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><label className="font-bold">From:</label><input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border px-1 border-gray-400" /></div>
            <div className="flex items-center gap-1"><label className="font-bold">To:</label><input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border px-1 border-gray-400" /></div>
            <button onClick={fetchBalanceSheet} className="bg-[#005a8d] text-white px-6 py-1 font-bold shadow-sm">{loading ? "..." : "View"}</button>
          </div>
          <div className="flex gap-1">
            <button className="p-1 border bg-white"><Printer size={16} className="text-blue-700" /></button>
            <button className="p-1 border bg-white"><FileSpreadsheet size={16} className="text-green-700" /></button>
            <button className="p-1 border bg-white"><FileText size={16} className="text-red-700" /></button>
          </div>
        </div>

        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-[#e8ecef] border-b border-gray-400 text-left">
              <th className="border-r border-gray-400 p-2 w-[35%] font-bold">LIABILITIES</th>
              <th className="border-r border-gray-400 p-2 w-[15%] text-right font-bold">AMOUNT</th>
              <th className="border-r border-gray-400 p-2 w-[35%] font-bold">ASSETS</th>
              <th className="p-2 w-[15%] text-right font-bold">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              {/* LIABILITIES COLUMN */}
              <td colSpan={2} className="border-r border-gray-400 p-0 vertical-align-top">
                {renderColumn(balanceSheetData.liabilities, false)}
              </td>

              {/* ASSETS COLUMN */}
              <td colSpan={2} className="p-0 vertical-align-top">
                {renderColumn(balanceSheetData.assets, true)}
              </td>
            </tr>

            {/* GRAND TOTAL ROW */}
            <tr className="border-t-2 border-gray-400 font-bold bg-[#fdfdfd] h-12">
              <td className="border-r border-gray-400"></td>
              <td className="border-r border-gray-400 p-2 text-right">
                <span className="border-b-[3px] border-double border-black font-mono text-[14px]">
                  {parseFloat(balanceSheetData.totals.totalLiabilities).toFixed(2)}
                </span>
              </td>
              <td className="border-r border-gray-400"></td>
              <td className="p-2 text-right">
                <span className="border-b-[3px] border-double border-black font-mono text-[14px]">
                  {parseFloat(balanceSheetData.totals.totalAssets).toFixed(2)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Balance_Sheet;