import { useEffect, useState } from "react";
import { API } from "../api";

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
          `${API}/Scheme/active?page=1&limit=10`,
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
          `${API}/api/Reports/cancel-loan-numbers?scheme=${selectedScheme}&fromDate=${fromDate}&toDate=${toDate}`,
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
          `${API}/api/Reports/cancel-loan-details?loanNo=${selectedLoanNo}`,
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
    <div className="min-h-screen font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center  ">
        <div className="flex items-center justify-between px-2  w-[1462px]  border border-gray-200 shadow-sm bg-white gap-4">

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
                <option value="">Select the Scheme</option>
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
              className="w-[85px] p-1 rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95 flex items-center justify-center"
            >
              View
            </button>
            <button
              className="w-[85px] p-1 rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-all shadow-sm active:scale-95 flex items-center justify-center"
            >
              Excel
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-[85px] p-1  rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all shadow-sm active:scale-95 flex items-center justify-center"
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
      <div className="flex ml-[25px]">
        <div className="w-full max-w-[1462px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse ">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
                  <th className="border border-gray-300 p-1 w-12 text-center uppercase">Sr. No.</th>
                  <th className="border border-gray-300 p-1 uppercase">Loan No.</th>
                  <th className="border border-gray-300 p-1 uppercase">Loan Date</th>
                  <th className="border border-gray-300 p-1 uppercase">Scheme</th>
                  <th className="border border-gray-300 p-1 uppercase">Customer ID</th>
                  <th className="border border-gray-300 p-1 uppercase">Customer Name</th>
                  <th className="border border-gray-300 p-1 uppercase">Mobile No.</th>
                  <th className="border border-gray-300 p-1 text-right uppercase">Loan Amt.</th>
                  <th className="border border-gray-300 p-1 uppercase bg-[#0A2478]/50">Cancel On [Exec.]</th>
                  <th className="border border-gray-300 p-1 uppercase bg-[#0A2478]/50">Cancel By [Exec.]</th>
                  <th className="border border-gray-300 p-1 uppercase ">Cancel On [Mngr.]</th>
                  <th className="border border-gray-300 p-1 uppercase ">Cancel By [Mngr.]</th>
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
                      <td className="border border-gray-300 p-2 font-semibold text-[#0A2478]">{r.id}</td>
                      <td className="border border-gray-300 p-2">
                        {new Date(r.created_at).toLocaleDateString('en-GB')}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">{r.Scheme}</td>
                      <td className="border border-gray-300 p-2">{r.BorrowerId}</td>
                      <td className="border border-gray-300 p-2 font-medium">{r.Borrower}</td>
                      <td className="border border-gray-300 p-2">{r.Mobile_Number}</td>
                      <td className="border border-gray-300 p-2 text-right font-mono font-bold">
                        {Number(r.Net_Payable || 0).toLocaleString()}
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
