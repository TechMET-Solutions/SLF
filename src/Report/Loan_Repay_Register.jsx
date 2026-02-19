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
      <div className="m-2 ">

        <div className="flex justify-center my-5 px-4">
          <div className="flex items-center justify-between px-6 py-2 w-full max-w-[1290px] min-h-[70px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

            {/* 🔴 Left — Title */}
            <div className="flex-shrink-0">
              <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
                Loan Repayment Register
              </h2>
            </div>

            {/* 🔵 Right — Controls & Buttons */}
            <div className="flex items-center gap-6 flex-grow justify-end">

              {/* Inputs Group */}
              <div className="flex items-center gap-6">
                {/* From Date */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md"
                  />
                </div>

                {/* To Date */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md"
                  />
                </div>

                {/* Scheme Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">Scheme</label>
                  <select
                    value={selectedScheme}
                    onChange={(e) => setSelectedScheme(e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm w-48 outline-none rounded-md focus:border-blue-500 bg-white"
                  >
                    <option value="">-- Select Scheme --</option>
                    {schemes.map((scheme) => (
                      <option key={scheme.id} value={scheme.id}>
                        {scheme.schemeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons Group */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={fetchReport}
                  className="w-[75px] h-[32px] flex items-center justify-center rounded bg-[#0A2478] text-white text-[11px] font-bold hover:bg-[#071d45] transition-all"
                >
                  VIEW
                </button>
                <button
                  className="w-[75px] h-[32px] flex items-center justify-center rounded bg-green-600 text-white text-[11px] font-bold hover:bg-green-700 transition-all"
                >
                  EXCEL
                </button>
                <button
                  className="w-[75px] h-[32px] flex items-center justify-center rounded bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition-all"
                >
                  PDF
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white mx-28">

          {/* Loading */}
          {loading && (
            <div className="text-center py-3 text-blue-600 font-semibold">
              Loading...
            </div>
          )}

          <table className="w-full border-collapse text-[10px]">
            <thead className="bg-[#0A2478] text-gray-100 font-bold">
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
              {/* Empty State */}
              {!loading && data.length === 0 && (
                <tr>
                  <td
                    colSpan={16}
                    className="text-red-600 text-center py-4 font-bold text-[11px]"
                  >
                    Please Preview to view report.
                  </td>
                </tr>
              )}

              {/* Data Rows */}
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
              {data.length > 0 && (
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
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Loan_Repay_Register;
