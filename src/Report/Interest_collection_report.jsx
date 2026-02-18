import { useEffect, useState } from "react";

const InterestCollectionReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [fromDate, setFromDate] = useState("2025-04-01");
 const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  // Fetching Schemes for the dropdown
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
  const fetchReport = async () => {
  const url = `https://slunawat.co.in/api/Reports/interest-collection?fromDate=${fromDate}&toDate=${toDate}&scheme=${selectedScheme}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.success) {
    setRows(data.data || []);

    const sum = (data.data || []).reduce(
      (acc, r) => acc + Number(r.InterestPaidAmount || 0),
      0
    );

    setTotal(sum.toFixed(2));
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-xs">
      {/* Top Header - User & Branch Info */}

      {/* Main Panel Container */}
      <div className="bg-[#108b83] rounded-t-md overflow-hidden shadow-sm">
        <div className="px-4 py-1.5 text-white font-medium text-sm">
          Interest Collection Report
        </div>

        <div className="bg-white p-4 border-x border-b">
          {/* Filters Bar - Matching image layout */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-4 p-4 border rounded bg-gray-50 border-gray-200">
            {/* From Date */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-medium text-gray-700">
                From Date
              </label>
              <div className="flex items-center">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border border-gray-300 p-1 px-2 rounded-l w-28 bg-white outline-none"
                />
               
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
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border border-gray-300 p-1 px-2 rounded-l w-28 bg-white outline-none"
                />
                
              </div>
            </div>

            {/* Scheme Name Dropdown */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Scheme Name</label>
              <select
                className="border border-gray-300 p-1 rounded min-w-[160px] bg-white outline-none"
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                {/* <option value="">INDEMITEST</option> */}
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
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 border-b pb-4 mb-4">
            <button
              onClick={fetchReport}
              className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors"
            >
              <span>💾</span> View
            </button>

            <button className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors">
              <span>✖</span> Exit
            </button>
            <div className="ml-auto flex gap-1">
              <button className="border border-blue-800 p-1 px-3 bg-blue-50 rounded text-[#1e5a95]">
                🖨️
              </button>
              <button className="border border-blue-800 p-1 px-3 bg-blue-50 rounded text-[#1e5a95] font-bold">
                📄
              </button>
            </div>
          </div>

          {/* Report Table - Columns based on image */}
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead className="bg-[#e7dbcf] text-gray-700">
                <tr className="text-[11px]">
                  <th className="border border-gray-400 p-1 w-12 text-center">
                    Sr. No.
                  </th>
                  <th className="border border-gray-400 p-1">Branch</th>
                  <th className="border border-gray-400 p-1">Collector</th>
                  <th className="border border-gray-400 p-1">Loan No.</th>
                  <th className="border border-gray-400 p-1">Loan Date</th>
                  <th className="border border-gray-400 p-1">Scheme</th>
                  <th className="border border-gray-400 p-1">Customer ID</th>
                  <th className="border border-gray-400 p-1">Customer Name</th>
                  <th className="border border-gray-400 p-1">Receipt No.</th>
                  <th className="border border-gray-400 p-1">Receipt Date</th>
                  <th className="border border-gray-400 p-1">
                    Mode Of Payment
                  </th>
                  <th className="border border-gray-400 p-1 text-right">
                    Interest Amt.
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="text-[11px]">
                    <td className="border p-1 text-center">{i + 1}</td>

                    {/* Branch (you only have branch_id for now) */}
                    <td className="border p-1">{r.branch_id}</td>

                    {/* Collector (not present – show empty or Borrower) */}
                    <td className="border p-1">{r.approved_by || "-"}</td>

                    {/* Loan No (use id for now) */}
                    <td className="border p-1">{r.id}</td>

                    {/* Loan Date */}
                    <td className="border p-1">
                      {r.created_at ? r.created_at.split("T")[0] : ""}
                    </td>

                    {/* Scheme */}
                    <td className="border p-1">{r.Scheme}</td>

                    {/* Customer ID */}
                    <td className="border p-1">{r.BorrowerId}</td>

                    {/* Customer Name */}
                    <td className="border p-1">{r.Borrower}</td>

                    {/* Receipt No (not available) */}
                    <td className="border p-1">-</td>

                    {/* Receipt Date */}
                    <td className="border p-1">
                      {r.LastInterestPaidDate || "-"}
                    </td>

                    {/* Mode Of Payment */}
                    <td className="border p-1">
                      {r.payments_Details?.[0]?.paidBy || "-"}
                    </td>

                    {/* Interest Amount */}
                    <td className="border p-1 text-right">
                      {r.InterestPaidAmount || 0}
                    </td>
                  </tr>
                ))}

                <tr className="bg-[#f2e9e0] font-bold text-[11px]">
                  <td className="border p-1" colSpan="4"></td>
                  <td className="border p-1 text-center" colSpan="7">
                    Total Collection
                  </td>
                  <td className="border p-1 text-right">{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCollectionReport;
