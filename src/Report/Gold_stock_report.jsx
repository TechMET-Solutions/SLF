import { useEffect, useState } from "react";

const GoldStockReport = () => {
  const [schemes, setSchemes] = useState([]); // All schemes from API
  const [loading, setLoading] = useState(true); // Loader for schemes

  const [selectedScheme, setSelectedScheme] = useState("IND01"); // Selected scheme

  const [fromDate, setFromDate] = useState("2025-04-01"); // From date
  const [toDate, setToDate] = useState("2026-01-25"); // To date

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
    <div className="min-h-screen bg-[#f0f0f0] font-sans text-[12px]">
      {/* 2. Main Container */}
      <div className="m-3 border border-gray-300 bg-white shadow-sm">
        {/* Title Bar */}
        <div className="bg-[#008282] text-white px-3 py-1.5 font-semibold text-sm">
          Gold Stock Report
        </div>

        {/* 3. Filter Section */}
        <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-10">
          <div className="flex items-center gap-2">
            <label className="text-gray-600">As On</label>
            <div className="flex items-center">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 p-1 w-32 outline-none"
              />

              <button className="bg-[#8b4513] p-1.5 text-white">📅</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-600">Schemes</label>
            <select
              className="border border-gray-300 p-1 rounded min-w-[140px]"
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
            >
              <option value="">select scheme</option>
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

        {/* 4. Action Buttons Bar */}
        <div className="p-2 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex gap-1">
            <button
              className="bg-[#005a9c] text-white px-8 py-1 flex items-center gap-2 text-sm shadow-md"
              onClick={handleView}
            >
              💾 View
            </button>
            <button className="bg-[#005a9c] text-white px-8 py-1 flex items-center gap-2 text-sm shadow-md">
              ✖ Exit
            </button>
          </div>
          <div className="flex gap-1">
            <button className="bg-[#005a9c] text-white p-1 rounded">🖨️</button>
            <button className="bg-[#005a9c] text-white p-1 rounded">📄</button>
          </div>
        </div>

        {/* 5. Data Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#e7e1d5] border-b border-gray-300 text-left">
                <th className="border-r border-gray-300 p-1 font-normal">
                  S.No.
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Loan No.
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Loan Date
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Scheme
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Customer ID
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Customer Name
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Mobile No.
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Eligible Loan Amt.
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Loan Amount
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Gross Weight
                </th>
                <th className="border-r border-gray-300 p-1 font-normal">
                  Net Weight
                </th>
                <th className="p-1 font-normal">Current Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr className="border-b border-gray-100 h-8">
                  <td colSpan={12} className="text-center text-gray-500 p-4">
                    No data found
                  </td>
                </tr>
              ) : (
                rows.map((r, i) => {
                  // calculate weights from Pledge_Item_List
                  const gross = r.Pledge_Item_List?.reduce(
                    (sum, x) => sum + Number(x.gross || 0),
                    0,
                  );
                  const net = r.Pledge_Item_List?.reduce(
                    (sum, x) => sum + Number(x.netWeight || 0),
                    0,
                  );

                  return (
                    <tr key={r.id} className="border-b border-gray-100 h-8">
                      <td className="border-r border-gray-200 p-1">{i + 1}</td>
                      <td className="border-r border-gray-200 p-1">{r.id}</td>
                      <td className="border-r border-gray-200 p-1">
                        {new Date(r.approval_date).toLocaleDateString()}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {r.Scheme}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {r.BorrowerId}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {r.Borrower}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {r.Mobile_Number}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {r.Max_Loan}
                      </td>
                      <td className="border-r border-gray-200 p-1">
                        {r.Loan_amount}
                      </td>
                      <td className="border-r border-gray-200 p-1">{gross}</td>
                      <td className="border-r border-gray-200 p-1">{net}</td>
                      <td className="p-1">{r.Net_Payable}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GoldStockReport;
