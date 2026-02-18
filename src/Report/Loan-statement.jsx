import { useEffect, useState } from "react";

const LoanStatement = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [fromDate, setFromDate] = useState("2025-04-01");
 const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const [selectedScheme, setSelectedScheme] = useState("");

  // Loan + Customer
  const [loanList, setLoanList] = useState([]);
  const [loanNo, setLoanNo] = useState("");
  const [customerName, setCustomerName] = useState("");
const [statement, setStatement] = useState(null);
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

  // Fetch Loan Numbers when filters change
  useEffect(() => {
    if (!fromDate || !toDate || !selectedScheme) return;

    const fetchLoans = async () => {
      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/loan-statement-loans?fromDate=${fromDate}&toDate=${toDate}&schemeId=${selectedScheme}`,
        );
        const data = await res.json();
        setLoanList(data.data || []);
        setLoanNo("");
        setCustomerName("");
      } catch (err) {
        console.error("Error fetching loan numbers:", err);
        setLoanList([]);
      }
    };

    fetchLoans();
  }, [fromDate, toDate, selectedScheme]);

  // Handle Loan Change → Fetch Customer
  const handleLoanChange = async (ln) => {
    setLoanNo(ln);

    if (!ln) {
      setCustomerName("");
      return;
    }

    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/loan-statement-customer?loanNo=${ln}`,
      );
      const data = await res.json();
      setCustomerName(data?.data?.Print_Name || "");
    } catch (err) {
      console.error("Error fetching customer:", err);
      setCustomerName("");
    }
  };
 const handleView = async () => {
  if (!loanNo) {
    alert("Please select Loan No");
    return;
  }

  try {
    const res = await fetch(
      `https://slunawat.co.in/api/Reports/loan-statement-details?loanNo=${loanNo}`
    );
    const data = await res.json();
    setStatement(data.data?.[0] || null);
  } catch (err) {
    console.error(err);
    setStatement(null);
  }
};

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[12px]">
      <div className="m-3 border border-gray-300 bg-white shadow-md">
        <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
          Loan Statement
        </div>

        {/* Dates */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <label className="font-medium">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border px-2 py-1 w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border px-2 py-1 w-32"
            />
          </div>
        </div>

        {/* Scheme & Loan */}
        <div className="p-4 bg-white border-b border-gray-200 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="font-medium">Scheme</label>
            <select
              className="border px-2 py-1 w-40"
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

          <div className="flex items-center gap-2">
            <label className="font-medium">
              Loan No <span className="text-red-500">*</span>
            </label>
            <select
              className="border px-2 py-1 w-48"
              value={loanNo}
              onChange={(e) => handleLoanChange(e.target.value)}
            >
              <option value="">Select Loan No</option>
              {loanList.map((l) => (
                <option key={l.loanNo} value={l.loanNo}>
                  {l.loanNo}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium">Customer</label>
            <input
              type="text"
              value={customerName}
              readOnly
              className="border px-2 py-1 w-64 bg-gray-100"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="px-3 py-2 flex gap-2 border-b">
          <button
            className="bg-[#005da3] text-white px-8 py-1"
            onClick={handleView}
          >
            💾 View
          </button>
          <button className="bg-[#005da3] text-white px-8 py-1">✖ Exit</button>
        </div>

        {/* Table (same as your design – static for now) */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead className="bg-[#e9e4db] border-b border-gray-400">
              <tr>
                <th className="border p-1">Date</th>
                <th className="border p-1">Particulars</th>
                <th className="border p-1 text-right">Withdrawal</th>
                <th className="border p-1 text-right">Payment</th>
                <th className="border p-1 text-right">Running Total</th>
              </tr>
            </thead>
           <tbody>
  {statement ? (
    <tr className="border-b border-gray-200 hover:bg-blue-50">
      <td className="border p-1">
        {statement.approval_date
          ? new Date(statement.approval_date).toLocaleDateString()
          : ""}
      </td>

      <td className="border p-1 text-xs uppercase">
        Loan Control A/C ({statement.Print_Name})
      </td>

      <td className="border p-1 text-right">
        {Number(statement.Loan_amount || 0).toFixed(2)}
      </td>

      <td className="border p-1 text-right">
        {Number(statement.LoanAmountPaid || 0).toFixed(2)}
      </td>

      <td className="border p-1 text-right font-medium">
        {Number(statement.LoanPendingAmount || 0).toFixed(2)}
      </td>
    </tr>
  ) : (
    <tr>
      <td colSpan="5" className="p-4 text-center text-gray-500">
        Select filters and Loan No, then click View
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

export default LoanStatement;
