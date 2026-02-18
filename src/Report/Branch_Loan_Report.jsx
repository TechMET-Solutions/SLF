import axios from "axios";
import { useState } from "react";
import { API } from "../api";

const Branch_Loan_Report = () => {
  const [fromDate, setFromDate] = useState("2025-02-01");
 const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);
  const [reportData, setReportData] = useState([]);

  const HandleCallApi = async () => {
    try {
      const response = await axios.post(
          `${API}/api/branch-summary/Branch_Loan_Summary`,
        { fromDate, toDate },
      );

      setReportData(response.data.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  // 🔹 Calculate Totals
  const totals = reportData.reduce(
    (acc, row) => {
      acc.newCustomer += Number(row.newCustomer || 0);
      acc.loansCreated += Number(row.loansCreated || 0);
      acc.paymentAmount += Number(row.paymentAmount || 0);
      acc.loansClosed += Number(row.loansClosed || 0);
      acc.principalAmount += Number(row.principalAmount || 0);
      acc.interestAmount += Number(row.interestAmount || 0);
      acc.outstandingLoans += Number(row.outstandingLoans || 0);
      return acc;
    },
    {
      newCustomer: 0,
      loansCreated: 0,
      paymentAmount: 0,
      loansClosed: 0,
      principalAmount: 0,
      interestAmount: 0,
      outstandingLoans: 0,
    },
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <div className="min-h-screen bg-white text-[12px] text-gray-800">
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Branch Loan Summary
        </div>

        {/* Filter Section */}
        <div className="p-4 border-b">
          <div className="flex gap-12">
            <div className="flex gap-2">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border px-2"
              />
            </div>

            <div className="flex gap-2">
              <label>As On Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border px-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={HandleCallApi}
              className="bg-[#005a9c] text-white px-6 py-1 rounded"
            >
              💾 View
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead className="bg-[#eeeae3] font-bold">
              <tr>
                <th className="border p-1 text-left">Branch Name</th>
                <th className="border p-1 text-left">New Customer</th>
                <th className="border p-1 text-left">Loans Created</th>
                <th className="border p-1 text-left">Loan Payment Amount</th>
                <th className="border p-1 text-left">Loans Closed</th>
                <th className="border p-1 text-left">Principal Amount</th>
                <th className="border p-1 text-left">Interest Amount</th>
                <th className="border p-1 text-left">Outstanding Loans</th>
              </tr>
            </thead>

            <tbody>
              {reportData.map((row, idx) => (
                <tr key={idx}>
                  <td className="border p-1">{row.branchName}</td>
                  <td className="border p-1">{row.newCustomer}</td>
                  <td className="border p-1">{row.loansCreated}</td>
                  <td className="border p-1">
                    ₹ {formatCurrency(row.paymentAmount)}
                  </td>
                  <td className="border p-1">{row.loansClosed}</td>
                  <td className="border p-1">
                    ₹ {formatCurrency(row.principalAmount)}
                  </td>
                  <td className="border p-1">
                    ₹ {formatCurrency(row.interestAmount)}
                  </td>
                  <td className="border p-1 font-semibold">
                    ₹ {formatCurrency(row.outstandingLoans)}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="font-bold bg-gray-100">
                <td className="border p-1">Total</td>
                <td className="border p-1">{totals.newCustomer}</td>
                <td className="border p-1">{totals.loansCreated}</td>
                <td className="border p-1">
                  ₹ {formatCurrency(totals.paymentAmount)}
                </td>
                <td className="border p-1">{totals.loansClosed}</td>
                <td className="border p-1">
                  ₹ {formatCurrency(totals.principalAmount)}
                </td>
                <td className="border p-1">
                  ₹ {formatCurrency(totals.interestAmount)}
                </td>
                <td className="border p-1">
                  ₹ {formatCurrency(totals.outstandingLoans)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Branch_Loan_Report;
