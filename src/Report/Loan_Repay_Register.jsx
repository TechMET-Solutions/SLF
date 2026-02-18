import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Loan_Repay_Register = () => {
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);
  const [schemeName, setSchemeName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get(`${API}/Scheme/getAllSchemes`);

        const fetchedSchemes = response.data.data.map((item) => ({
          ...item,
          intCompound: item.calcMethod === "Compound",
        }));

        setSchemes(fetchedSchemes);
      } catch (err) {
        console.error("❌ Error fetching schemes:", err);
      }
    };

    fetchSchemes();
  }, []);
  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/loan-repayment-register/Loan_Repayment_Register`,
        {
          fromDate,
          toDate,
          schemeName: selectedScheme || null,
        },
      );

      setData(res.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching report:", error);
      setLoading(false);
    }
  };

  const totals = data.reduce(
    (acc, row) => {
      acc.amount += Number(row.amount || 0);
      acc.loanAdj += Number(row.loanAdj || 0);
      acc.interestAdj += Number(row.interestAdj || 0);
      acc.charges += Number(row.charges || 0);
      return acc;
    },
    {
      amount: 0,
      loanAdj: 0,
      interestAdj: 0,
      charges: 0,
    },
  );

  return (
    <div className="min-h-screen bg-white text-[12px] text-gray-800">
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Loan Repayment Register
        </div>

        {/* Filter Section */}
        <div className="p-4 border-b">
          <div className="flex gap-12 flex-wrap">
            <div className="flex gap-2 items-center">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border px-2"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border px-2"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-600">Scheme Name</label>

              <select
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
                className="border border-gray-300 px-2 py-0.5 w-48 outline-none focus:border-blue-500 bg-white"
              >
                <option value="">-- Select Scheme --</option>

                {schemes.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.schemeName}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchReport}
              className="bg-[#005a9c] text-white px-6 py-1 rounded"
            >
              💾 View
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white">
          {loading && (
            <div className="text-center py-3 text-blue-600 font-semibold">
              Loading...
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="text-red-600 text-center py-3 font-bold text-[11px]">
              Please Preview to view report.
            </div>
          )}

          {data.length > 0 && (
            <table className="w-full border-collapse text-[10px]">
              <thead className="bg-[#eeeae3] font-bold">
                <tr>
                  {[
                    "SNo",
                    "Receipt No",
                    "Receipt Date",
                    "Paymode",
                    "Loan No",
                    "Loan Type",
                    "Loan Date",
                    "Scheme Name",
                    "Party Name",
                    "Loan Amount",
                    "Amount",
                    "Loan Adj",
                    "Interest Adj",
                    "Charges",
                    "Receipt By",
                    "Is Closed",
                  ].map((head, i) => (
                    <th key={i} className="border p-1 text-left">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-1">{index + 1}</td>
                    <td className="border p-1">{row.receiptNo}</td>
                    <td className="border p-1">
                      {new Date(row.receiptDate).toLocaleDateString()}
                    </td>
                    <td className="border p-1">{row.paymode}</td>
                    <td className="border p-1">{row.loanNo}</td>
                    <td className="border p-1">{row.type}</td>
                    <td className="border p-1">
                      {new Date(row.loanDate).toLocaleDateString()}
                    </td>
                    <td className="border p-1">{row.schemeName}</td>
                    <td className="border p-1">{row.partyName}</td>
                    <td className="border p-1 text-right">{row.loanAmount}</td>
                    <td className="border p-1 text-right">{row.amount}</td>
                    <td className="border p-1 text-right">{row.loanAdj}</td>
                    <td className="border p-1 text-right">{row.interestAdj}</td>
                    <td className="border p-1 text-right">{row.charges}</td>
                    <td className="border p-1">{row.receiptBy}</td>
                    <td className="border p-1">{row.isClosed}</td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-1">Total</td>
                  <td colSpan="8" className="border"></td>
                  <td className="border p-1 text-right">
                    {totals.amount.toFixed(2)}
                  </td>
                  <td className="border p-1 text-right">
                    {totals.loanAdj.toFixed(2)}
                  </td>
                  <td className="border p-1 text-right">
                    {totals.interestAdj.toFixed(2)}
                  </td>
                  <td className="border p-1 text-right">
                    {totals.charges.toFixed(2)}
                  </td>
                  <td colSpan="2" className="border"></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loan_Repay_Register;
