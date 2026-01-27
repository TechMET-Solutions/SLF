import { useEffect, useState } from "react";

const LoanCancellationReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState("IND01");
  const [loanNos, setLoanNos] = useState([]);
  const [selectedLoanNo, setSelectedLoanNo] = useState("");
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState("2026-01-25");
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
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-xs">
      {/* Top Navigation / Info Bar */}
     
      {/* Main Report Container */}
      <div className="bg-[#108b83] rounded-t-md overflow-hidden shadow-sm">
        <div className="px-4 py-1.5 text-white font-medium text-sm">
          Loan Cancel Report
        </div>

        <div className="bg-white p-4 border-x border-b">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-4 p-4 border rounded bg-gray-50 border-gray-200">
            {/* From Date */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-medium text-gray-700">
                From Date
              </label>
              <div className="flex items-center">
                <input
                  type="date"
                  className="border border-gray-300 p-1 px-2 rounded-l w-36 bg-white outline-none"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />

                <button className="bg-[#8B5E3C] p-1.5 rounded-r border border-[#8B5E3C] flex items-center justify-center hover:bg-[#764f32] transition-colors">
                  <span className="text-white text-[10px]">📅</span>
                </button>
              </div>
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-medium text-gray-700">
                To Date
              </label>
              <div className="flex items-center">
                <input
                  type="date"
                  className="border border-gray-300 p-1 px-2 rounded-l w-36 bg-white outline-none"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />

                <button className="bg-[#8B5E3C] p-1.5 rounded-r border border-[#8B5E3C] flex items-center justify-center hover:bg-[#764f32] transition-colors">
                  <span className="text-white text-[10px]">📅</span>
                </button>
              </div>
            </div>

            {/* Schemes Dropdown */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Schemes</label>
              <select
                className="border border-gray-300 p-1 rounded min-w-[140px] bg-white outline-none focus:border-[#108b83]"
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                <option value="IND01">IND01</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.schemeName}>
                      {s.schemeName}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Loan No Dropdown */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Loan No</label>
              <select
                className="border border-gray-300 p-1 rounded min-w-[180px] bg-white outline-none focus:border-[#108b83]"
                value={selectedLoanNo}
                onChange={(e) => setSelectedLoanNo(e.target.value)}
              >
                <option value="">Select Loan No</option>
                {loanNos.map((l) => (
                  <option key={l.id} value={l.LoanNo}>
                    {l.LoanNo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 border-b pb-4 mb-4">
            <button className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors">
              <span>💾</span> View
            </button>
            <button className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors">
              <span>✖</span> Exit
            </button>

            {/* Print/Export Icons */}
            <div className="ml-auto flex gap-1">
              <button className="border border-blue-800 p-1 px-3 bg-blue-50 rounded text-[#1e5a95] hover:bg-blue-100 shadow-sm">
                🖨️
              </button>
              <button className="border border-blue-800 p-1 px-3 bg-blue-50 rounded text-[#1e5a95] font-bold hover:bg-blue-100 shadow-sm">
                📄
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-gray-300 rounded-sm">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead className="bg-[#e7dbcf] text-gray-700">
                <tr className="text-[10px] uppercase">
                  <th className="border border-gray-400 p-1.5 w-12 text-center">
                    Sr. No.
                  </th>
                  <th className="border border-gray-400 p-1.5">Loan No.</th>
                  <th className="border border-gray-400 p-1.5">Loan Date</th>
                  <th className="border border-gray-400 p-1.5">Scheme</th>
                  <th className="border border-gray-400 p-1.5">Customer ID</th>
                  <th className="border border-gray-400 p-1.5">
                    Customer Name
                  </th>
                  <th className="border border-gray-400 p-1.5 w-24">
                    Mobile No.
                  </th>
                  <th className="border border-gray-400 p-1.5 text-right">
                    Loan Amt.
                  </th>
                  <th className="border border-gray-400 p-1.5">
                    Cancel On [Exec.]
                  </th>
                  <th className="border border-gray-400 p-1.5">
                    Cancel By [Exec.]
                  </th>
                  <th className="border border-gray-400 p-1.5">
                    Cancel On [Mngr.]
                  </th>
                  <th className="border border-gray-400 p-1.5">
                    Cancel By [Mngr.]
                  </th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-800">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center p-4 text-gray-500">
                      No data found
                    </td>
                  </tr>
                ) : (
                  rows.map((r, i) => (
                    <tr
                      key={r.LoanNo}
                      className="hover:bg-gray-50 border-b border-gray-300"
                    >
                      <td className="border border-gray-300 p-1.5 text-center">
                        {i + 1}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.LoanNo}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {new Date(r.approval_date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 p-1.5 text-center">
                        {r.Scheme}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.BorrowerId}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.Borrower}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.Mobile_Number}
                      </td>
                      <td className="border border-gray-300 p-1.5 text-right">
                        {r.Max_Loan}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.CancelExecOn || ""}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.CancelExecBy || ""}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.CancelMgrOn || ""}
                      </td>
                      <td className="border border-gray-300 p-1.5">
                        {r.CancelMgrBy || ""}
                      </td>
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
