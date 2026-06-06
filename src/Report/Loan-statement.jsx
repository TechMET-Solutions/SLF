import { useEffect, useState } from "react";
import { API } from "../api";

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
          `${API}/Scheme/active?page=1&limit=10`,
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
          `${API}/api/Reports/loan-statement-loans?fromDate=${fromDate}&toDate=${toDate}&schemeId=${selectedScheme}`,
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
        `${API}/api/Reports/loan-statement-customer?loanNo=${ln}`,
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
      `${API}/api/Reports/loan-statement-details?loanNo=${loanNo}`
    );
    const data = await res.json();
    setStatement(data.data?.[0] || null);
  } catch (err) {
    console.error(err);
    setStatement(null);
  }
};

  return (
    <div className="min-h-screen font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center ">
        <div className="flex flex-col w-[1462px] border border-gray-200 shadow-sm bg-white overflow-hidden">

          {/* Upper Section: Title & Dates */}
          <div className="flex items-center justify-between px-6 border-b border-gray-100 gap-4 p-1">
            <div className="flex-shrink-0">
              <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
                Loan Statement
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase">From</label>
                <input
                  type="date"
                  className="border border-gray-300 p-1.5 rounded text-xs w-[130px] outline-none focus:border-[#0A2478]"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase">To</label>
                <input
                  type="date"
                  className="border border-gray-300 p-1.5 rounded text-xs w-[130px] outline-none focus:border-[#0A2478]"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleView}
                className="w-[100px] h-[30px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95"
              >
                View
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-[85px] h-[30px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all shadow-sm active:scale-95"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Lower Section: Loan Selectors */}
          <div className="flex items-center px-6 py-3  gap-8">
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Scheme</label>
              <select
                className="border border-gray-300 p-1.5 rounded text-xs w-[160px] bg-white outline-none focus:border-[#0A2478]"
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                {loading ? <option>Loading...</option> : schemes.map(s => (
                  <option key={s.id} value={s.id}>{s.schemeName}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">
                Loan No <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-gray-300 p-1.5 rounded text-xs w-[180px] bg-white outline-none focus:border-[#0A2478] font-semibold text-blue-800"
                value={loanNo}
                onChange={(e) => handleLoanChange(e.target.value)}
              >
                <option value="">Select Loan No</option>
                {loanList.map(l => (
                  <option key={l.loanNo} value={l.loanNo}>{l.loanNo}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Customer</label>
              <input
                type="text"
                value={customerName}
                readOnly
                placeholder="Customer name will appear here"
                className="border border-gray-200 p-1.5 rounded text-xs w-full bg-gray-100 text-gray-600 font-medium italic outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-[1462px] bg-white overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
                  <th className="border border-gray-300 p-1 w-32 uppercase text-center">Date</th>
                  <th className="border border-gray-300 p-1 uppercase">Particulars</th>
                  <th className="border border-gray-300 p-1 text-right uppercase w-48">Withdrawal (Dr)</th>
                  <th className="border border-gray-300 p-1 text-right uppercase w-48">Payment (Cr)</th>
                  <th className="border border-gray-300 p-1 text-right uppercase w-48 ">Running Total</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                {statement ? (
                  <tr className="hover:bg-blue-50/30 transition-colors border-b border-gray-200">
                    <td className="border border-gray-300 p-1 text-center">
                      {statement.approval_date ? new Date(statement.approval_date).toLocaleDateString('en-GB') : ""}
                    </td>
                    <td className="border border-gray-300 p-1">
                      <div className="font-bold text-gray-800 uppercase">Loan Control A/C</div>
                      <div className="text-[10px] text-blue-600 tracking-tight">{statement.Print_Name}</div>
                    </td>
                    <td className="border border-gray-300 p-1 text-right font-mono text-red-600">
                      {Number(statement.Loan_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="border border-gray-300 p-1 text-right font-mono text-green-700">
                      {Number(statement.LoanAmountPaid || statement.LoanEmiAmountpaid || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="border border-gray-300 p-1 text-right font-mono font-bold text-[#0A2478] bg-blue-50/20">
                      {Number(statement.LoanPendingAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="5" className="p-16 text-center text-gray-400 italic bg-gray-50 uppercase tracking-widest text-[10px]">
                      --- Please select a Loan Number and click View to generate statement ---
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanStatement;
