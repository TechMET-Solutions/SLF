import { useEffect, useState } from "react";

const OutstandingAmountReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedScheme, setSelectedScheme] = useState("");
  const [loanSearch, setLoanSearch] = useState("");
  const [loanNumbers, setLoanNumbers] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("");

  const [reportRows, setReportRows] = useState([]);
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

   const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split("T")[0]);

  // 1. Fetch Schemes
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

  // 2. Fetch Loan Numbers
  useEffect(() => {
    const fetchLoans = async () => {
      if (!selectedScheme) {
        setLoanNumbers([]);
        return;
      }

      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/loan-numbers?scheme=${selectedScheme}&search=${loanSearch}`,
        );
        const data = await res.json();
        setLoanNumbers(data.data || []);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };

    const timeoutId = setTimeout(fetchLoans, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedScheme, loanSearch]);

  // View
  const handleView = async () => {
    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/outstanding-amount-report?scheme=${selectedScheme}&loanNo=${selectedLoan}`,
      );
      const data = await res.json();
      setReportRows(data.data || []);
    } catch (err) {
      console.error("Error loading report:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-xs">
      {/* Top Info Bar */}

      <div className="bg-[#108b83] rounded-t-md overflow-hidden shadow-sm">
        <div className="px-4 py-1.5 text-white font-medium text-sm">
          Outstanding Amount Report
        </div>

        <div className="bg-white p-4 border-x border-b">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-4 p-3 border rounded bg-gray-50 border-gray-200">
            {/* As On Date */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-medium text-gray-700">
                As On
              </label>
              <div className="flex items-center">
                <input
                  type="date"
                  value={asOnDate}
                  onChange={(e) => setAsOnDate(e.target.value)}
                  className="border border-gray-300 p-1 px-2 rounded-l w-28 bg-white outline-none"
                />
              </div>
            </div>

            {/* Schemes */}
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-700">Schemes</label>
              <select
                className="border border-gray-300 p-1 rounded min-w-[160px] bg-white outline-none"
                value={selectedScheme}
                onChange={(e) => {
                  setSelectedScheme(e.target.value);
                  setLoanSearch("");
                  setSelectedLoan("");
                }}
              >
                <option value="">--Select--</option>
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

            {/* Loan No */}
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-medium text-gray-700">
                Loan No
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder={
                    selectedScheme
                      ? "Type to search..."
                      : "--Select Scheme First--"
                  }
                  disabled={!selectedScheme}
                  value={loanSearch}
                  className="border border-gray-300 p-1 px-2 rounded-l w-32 bg-white outline-none disabled:bg-gray-100"
                  onChange={(e) => setLoanSearch(e.target.value)}
                />
                <select
                  className="border border-l-0 border-gray-300 p-1 rounded-r w-16 bg-white outline-none"
                  onChange={(e) => setSelectedLoan(e.target.value)}
                  value={selectedLoan}
                >
                  <option value="">All</option>
                  {loanNumbers.map((loan, idx) => (
                    <option key={idx} value={loan.loanNo || loan.id}>
                      {loan.loanNo || loan.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 border-b pb-4 mb-4">
            <button
              onClick={handleView}
              className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors"
            >
              <span>💾</span> View
            </button>
            <button className="bg-[#1e5a95] hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 font-medium transition-colors">
              <span>✖</span> Exit
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead className="bg-[#e7dbcf] text-gray-700">
                <tr className="text-[11px]">
                  <th className="border border-gray-400 p-1 w-12 text-center">
                    SI No
                  </th>
                  <th className="border border-gray-400 p-1">Loan No</th>
                  <th className="border border-gray-400 p-1">Loan Date</th>
                  <th className="border border-gray-400 p-1">Scheme</th>
                  <th className="border border-gray-400 p-1">Customer ID</th>
                  <th className="border border-gray-400 p-1">Customer Name</th>
                  <th className="border border-gray-400 p-1 text-right">
                    Principal Amount
                  </th>
                  <th className="border border-gray-400 p-1 text-right">
                    Interest Amount
                  </th>
                  <th className="border border-gray-400 p-1 text-right">
                    Other Charges
                  </th>
                  <th className="border border-gray-400 p-1 text-right">
                    Total Outstanding
                  </th>
                  <th className="border border-gray-400 p-1">
                    Last Payment Date
                  </th>
                  <th className="border border-gray-400 p-1">Overdue Days</th>
                  <th className="border border-gray-400 p-1">Mobile No</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map((row, i) => (
                  <tr key={row.id} className="text-[11px]">
                    <td className="border border-gray-400 p-1 text-center">
                      {i + 1}
                    </td>
                    <td className="border border-gray-400 p-1">{row.id}</td>
                    <td className="border border-gray-400 p-1">
                      {row.created_at
                        ? new Date(row.created_at).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="border border-gray-400 p-1">{row.Scheme}</td>
                    <td className="border border-gray-400 p-1">
                      {row.BorrowerId}
                    </td>
                    <td className="border border-gray-400 p-1">
                      {row.Borrower}
                    </td>
                    <td className="border border-gray-400 p-1 text-right">
                      {row.Loan_amount || 0}
                    </td>
                    <td className="border border-gray-400 p-1 text-right">
                      {row.InterestDueAmount || 0}
                    </td>
                    <td className="border border-gray-400 p-1 text-right">
                      {row.Doc_Charges || 0}
                    </td>
                    <td className="border border-gray-400 p-1 text-right">
                      {row.LoanPendingAmount || 0}
                    </td>
                    <td className="border border-gray-400 p-1">
                      {row.LastEmiPaidDate || "-"}
                    </td>
                    <td className="border border-gray-400 p-1">
                      {row.InterestPaidDayCount || 0}
                    </td>
                    <td className="border border-gray-400 p-1">
                      {row.Mobile_Number}
                    </td>
                  </tr>
                ))}

                <tr className="bg-[#f2e9e0] font-bold text-[11px]">
                  <td
                    className="border border-gray-400 p-1 text-center"
                    colSpan="6"
                  >
                    Total
                  </td>
                  <td className="border border-gray-400 p-1 text-right">
                    {reportRows.reduce(
                      (s, r) => s + Number(r.Loan_amount || 0),
                      0,
                    )}
                  </td>
                  <td className="border border-gray-400 p-1 text-right">
                    {reportRows.reduce(
                      (s, r) => s + Number(r.InterestDueAmount || 0),
                      0,
                    )}
                  </td>
                  <td className="border border-gray-400 p-1 text-right">
                    {reportRows.reduce(
                      (s, r) => s + Number(r.Doc_Charges || 0),
                      0,
                    )}
                  </td>
                  <td className="border border-gray-400 p-1 text-right">
                    {reportRows.reduce(
                      (s, r) => s + Number(r.LoanPendingAmount || 0),
                      0,
                    )}
                  </td>
                  <td colSpan="3" className="border border-gray-400 p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingAmountReport;
