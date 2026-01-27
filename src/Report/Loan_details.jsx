import React, { useState, useEffect } from 'react';

const LoanDetails = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States based on UI
  const [fromDate, setFromDate] = useState("2017-04-01");
  const [toDate, setToDate] = useState("2026-01-25");
  const [selectedScheme, setSelectedScheme] = useState("IND01");
  const [reportType, setReportType] = useState("Loan Details");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch("https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10");
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

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[11px]">
      <div className="m-3 border border-gray-300 bg-white shadow-md">
        {/* Header Section */}
        <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
          Loan Detail Report
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-white border-b border-gray-200 space-y-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium min-w-[60px]">From Date</label>
              <div className="flex border border-gray-300">
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-2 py-1 outline-none w-32" />
                <button className="bg-[#8c4b2d] px-2 text-white">📅</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">To Date</label>
              <div className="flex border border-gray-300">
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-2 py-1 outline-none w-32" />
                <button className="bg-[#8c4b2d] px-2 text-white">📅</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium min-w-[60px]">Scheme</label>
            <select 
              className="border border-gray-300 px-2 py-1 w-64 outline-none bg-white"
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
            >
              {/* <option value="IND01">IND01</option> */}
              {schemes.map((s) => <option key={s.id} value={s.id}>{s.schemeName}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium min-w-[60px]">Party Name</label>
            <input type="text" className="border border-gray-300 px-2 py-1 w-64 outline-none" />
          </div>

          {/* Radio Button Options */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-4">
              {["Item Details", "Loan Details", "Loan Summary"].map((type) => (
                <label key={type} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="reportType" checked={reportType === type} onChange={() => setReportType(type)} className="w-3 h-3" />
                  {type}
                </label>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {["All", "Pending", "Closed"].map((stat) => (
                <label key={stat} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="status" checked={status === stat} onChange={() => setStatus(stat)} className="w-3 h-3" />
                  {stat}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-3 py-2 flex justify-between items-center bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1">
            <button className="bg-[#005da3] text-white px-8 py-1 flex items-center gap-2 text-[12px] hover:bg-blue-800 shadow-sm">
              💾 View
            </button>
            <button className="bg-[#005da3] text-white px-8 py-1 flex items-center gap-2 text-[12px] hover:bg-blue-800 shadow-sm">
              ✖ Exit
            </button>
          </div>
          <div className="flex gap-1">
            <button className="bg-[#005da3] text-white p-1 rounded shadow-sm">🖨️</button>
            <button className="bg-[#005da3] text-white p-1 rounded shadow-sm">📄</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full border-collapse text-[10px]">
            <thead className="bg-[#e9e4db] border-b border-gray-400 sticky top-0">
              <tr className="text-left text-gray-700">
                {["SNo", "Branch", "Loan No", "Loan Date", "Scheme Name", "Party Name", "Co Borrower", "Mobile", "Address", "Particular", "Quantity", "Gross", "Net Weight", "Loan Amount", "Close Date"].map((h) => (
                  <th key={h} className="border-r border-gray-300 p-1 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Sample Data matching your image */}
              <tr className="border-b border-gray-200 hover:bg-blue-50">
                <td className="border-r border-gray-300 p-1">1</td>
                <td className="border-r border-gray-300 p-1">Bhagur B1 [01]</td>
                <td className="border-r border-gray-300 p-1">01A4500070</td>
                <td className="border-r border-gray-300 p-1">03/04/2024</td>
                <td className="border-r border-gray-300 p-1">IND01</td>
                <td className="border-r border-gray-300 p-1">SUSHILA RAMESH GAIKWAD</td>
                <td className="border-r border-gray-300 p-1 text-gray-400 uppercase">Self</td>
                <td className="border-r border-gray-300 p-1">9503054629</td>
                <td className="border-r border-gray-300 p-1 max-w-xs truncate">SHIVDA, ADIVASI WASTI...</td>
                <td className="border-r border-gray-300 p-1">TOPS</td>
                <td className="border-r border-gray-300 p-1">1.00</td>
                <td className="border-r border-gray-300 p-1 font-medium">1.790</td>
                <td className="border-r border-gray-300 p-1 font-medium text-right">1.750</td>
                <td className="border-r border-gray-300 p-1 text-right font-semibold">6000.00</td>
                <td className="p-1"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;