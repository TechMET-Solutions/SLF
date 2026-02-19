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

      <div className="flex justify-center my-5 px-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[70px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-6">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
              Branch Loan Summary
            </h2>
          </div>

          {/* 🔵 Right — Controls & Buttons */}
          <div className="flex flex-grow items-center justify-end gap-8">

            {/* Inputs Group */}
            <div className="flex items-center gap-8">
              {/* From Date */}
              <div className="flex items-center gap-2">
                <label className="text-gray-600 text-sm font-medium whitespace-nowrap">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md focus:border-blue-500"
                />
              </div>

              {/* As On Date */}
              <div className="flex items-center gap-2">
                <label className="text-gray-600 text-sm font-medium whitespace-nowrap">As On Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md focus:border-blue-500"
                />
              </div>
            </div>

            {/* Buttons Group */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={HandleCallApi}
                className="w-[75px] h-[32px] flex items-center justify-center rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm"
              >
                VIEW
              </button>
              <button
                className="w-[75px] h-[32px] flex items-center justify-center rounded bg-red-600 text-white text-[12px] font-bold hover:bg-red-700 transition-all shadow-sm"
              >
                PDF
              </button>
            </div>

          </div>
        </div>
      </div>


      <div className="m-2 mx-28">
        {/* Table */}
        <div className="overflow-x-auto mt-2 max-w-4xl h-[500px]">
          <table className="w-full border-collapse text-[12px]">
            <thead className="bg-[#0A2478] text-white text-sm">
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
