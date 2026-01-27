import { useEffect, useState } from "react";

const LoanRiskReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. New State for Search Filters and Table Data
  const [selectedDate, setSelectedDate] = useState("2026-01-25"); // Format for input type="date"
  const [selectedScheme, setSelectedScheme] = useState("");
  const [reportData, setReportData] = useState([]); // To store API results
  const [isSearching, setIsSearching] = useState(false);

  // Fetch Schemes on mount
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10",
        );
        const result = await response.json();
        setSchemes(result.data || []);
        if (result.data?.length > 0) setSelectedScheme(result.data[0].id); // Set default
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schemes:", error);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  // 2. Function to hit the Search API
  const handleViewReport = async () => {
    setIsSearching(true);
    try {
      // Replace with your actual Search API endpoint
      const response = await fetch(
        `https://slunawat.co.in/api/Reports/getLoanRisk?date=${selectedDate}&schemeId=${selectedScheme}`,
      );
      const result = await response.json();

      // Update the table with real data
      setReportData(result.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Failed to fetch report data");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[12px]">
      <div className="m-3 border border-gray-300 bg-white shadow-md">
        <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
          Loan Risk Report
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">As On</label>
            <div className="flex border border-gray-300">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-2 py-1 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Schemes</label>
            <select
              className="border border-gray-300 px-2 py-1 w-64 outline-none bg-white"
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
            >
              {loading ? (
                <option>Loading...</option>
              ) : (
                schemes.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.schemeName || scheme.code}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-3 py-2 flex justify-between items-center bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1">
            <button
              onClick={handleViewReport}
              disabled={isSearching}
              className="bg-[#005da3] text-white px-6 py-1 flex items-center gap-2 text-[13px] hover:bg-blue-800 disabled:bg-gray-400"
            >
              {isSearching ? "Searching..." : "💾 View"}
            </button>
            <button className="bg-[#005da3] text-white px-6 py-1 flex items-center gap-2 text-[13px] hover:bg-blue-800">
              ✖ Exit
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[450px]">
          <table className="w-full border-collapse text-[11px]">
            <thead className="bg-[#e9e4db] border-b border-gray-400">
              <tr className="text-left text-gray-700">
                <th className="border-r border-gray-300 p-1">S.No.</th>
                <th className="border-r border-gray-300 p-1">Loan No.</th>
                <th className="border-r border-gray-300 p-1">Loan Date</th>
                <th className="border-r border-gray-300 p-1">Scheme</th>
                <th className="border-r border-gray-300 p-1">Customer ID</th>
                <th className="border-r border-gray-300 p-1">Customer Name</th>
                <th className="border-r border-gray-300 p-1">Mobile No.</th>
                <th className="border-r border-gray-300 p-1">Gross Weight</th>
                <th className="border-r border-gray-300 p-1">Net Weight</th>
                <th className="border-r border-gray-300 p-1">
                  Eligible Loan Amt.
                </th>
                <th className="border-r border-gray-300 p-1">Loan Amount</th>
                <th className="border-r border-gray-300 p-1">Pending Int.</th>
                <th className="p-1">Current Value</th>
              </tr>
            </thead>

            <tbody>
              {reportData.length > 0 ? (
                reportData.map((row, index) => {
                  const grossWeight = (row.Pledge_Item_List || []).reduce(
                    (sum, i) => sum + Number(i.gross || 0),
                    0,
                  );
                  const netWeight = (row.Pledge_Item_List || []).reduce(
                    (sum, i) => sum + Number(i.netWeight || 0),
                    0,
                  );

                  return (
                    <tr
                      key={row.id}
                      className="border-b border-gray-200 hover:bg-blue-50"
                    >
                      <td className="border-r border-gray-200 p-1">
                        {index + 1}
                      </td>
                      <td className="border-r border-gray-200 p-1">{row.id}</td>
                      <td className="border-r border-gray-200 p-1">
                        {row.approval_date
                          ? new Date(row.approval_date).toLocaleDateString()
                          : ""}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {row.Scheme}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {row.BorrowerId}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {row.Borrower}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {row.Mobile_Number}
                      </td>
                      <td className="border-r border-gray-200 p-1 text-right">
                        {grossWeight.toFixed(3)}
                      </td>
                      <td className="border-r border-gray-200 p-1 text-right">
                        {netWeight.toFixed(3)}
                      </td>
                      <td className="border-r border-gray-200 p-1 text-right">
                        {row.Max_Loan}
                      </td>
                      <td className="border-r border-gray-200 p-1 text-right">
                        {row.Loan_amount}
                      </td>
                      <td className="border-r border-gray-200 p-1 text-right">
                        {row.InterestDueAmount || "0"}
                      </td>
                      <td className="p-1 text-right">{row.Net_Payable}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="13" className="p-4 text-center text-gray-500">
                    No data found. Select filters and click "View".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanRiskReport;
