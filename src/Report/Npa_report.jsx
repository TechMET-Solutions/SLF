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
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[12px]">
      <div className="m-3 border border-gray-300 bg-white shadow-md">
        <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
          NPA Report
        </div>

        {/* Filters */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">As On</label>
            <input
              type="date"
              value={asOnDate}
              onChange={(e) => setAsOnDate(e.target.value)}
              className="border px-2 py-1 w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Schemes</label>
            <select
              className="border px-2 py-1 w-44 bg-white"
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
            >
              {loading ? (
                <option>Loading...</option>
              ) : (
                schemes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.schemeName}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="px-3 py-2 flex gap-2 border-b bg-gray-50">
          <button
            onClick={handleView}
            className="bg-[#005da3] text-white px-8 py-1 hover:bg-blue-800"
          >
            {isLoading ? "Loading..." : "💾 View"}
          </button>
          <button className="bg-[#005da3] text-white px-8 py-1 hover:bg-blue-800">
            ✖ Exit
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full border-collapse text-[11px]">
            <thead className="bg-[#e9e4db] border-b border-gray-400">
              <tr>
                <th className="border p-1">S.No.</th>
                <th className="border p-1">Loan No.</th>
                <th className="border p-1">Loan Date</th>
                <th className="border p-1">Scheme</th>
                <th className="border p-1">Customer ID</th>
                <th className="border p-1">Customer Name</th>
                <th className="border p-1">Mobile No.</th>
                <th className="border p-1 text-right">Loan Amount</th>
                <th className="border p-1 text-right">Pending Int.</th>
                <th className="border p-1 text-right">Outstanding</th>
                <th className="border p-1">Int. Days</th>
                <th className="border p-1">Last Receipt</th>
              </tr>
            </thead>

            <tbody>
              {rows.length > 0 ? (
                rows.map((r, i) => (
                  <tr key={r.id} className="border-b hover:bg-blue-50">
                    <td className="border p-1">{i + 1}</td>
                    <td className="border p-1">{r.id}</td>
                    <td className="border p-1">
                      {r.approval_date
                        ? new Date(r.approval_date).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="border p-1">{r.Scheme}</td>
                    <td className="border p-1">{r.BorrowerId}</td>
                    <td className="border p-1">{r.Borrower}</td>
                    <td className="border p-1">{r.Mobile_Number}</td>
                    <td className="border p-1 text-right">
                      {Number(r.Loan_amount || 0).toFixed(2)}
                    </td>
                    <td className="border p-1 text-right">
                      {Number(r.InterestDueAmount || 0).toFixed(2)}
                    </td>
                    <td className="border p-1 text-right">
                      {Number(r.LoanPendingAmount || 0).toFixed(2)}
                    </td>
                    <td className="border p-1">
                      {r.InterestPaidDayCount || ""}
                    </td>
                    <td className="border p-1">
                      {r.LastInterestPaidDate
                        ? new Date(r.LastInterestPaidDate).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="p-4 text-center text-gray-500">
                    {isLoading
                      ? "Loading..."
                      : "Select Date & Scheme and click View"}
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

export default NpaReport;
