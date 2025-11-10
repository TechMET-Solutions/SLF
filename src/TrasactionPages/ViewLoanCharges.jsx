import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatIndianDate } from "../utils/Helpers";
import { API } from "../api";

function ViewLoanCharges() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loanId } = location.state || {};

  const [loanData, setLoanData] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SLF | View Loan Charges";

    if (loanId) {
      fetchLoanCharges();
    } else {
      setError("❌ Loan ID not provided");
      setLoading(false);
    }
  }, [loanId]);

  // 🧠 Fetch Loan Charges by Loan ID
  const fetchLoanCharges = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/loan-charges/getById/${loanId}`);

      console.log("✅ Loan Charges Response:", response.data);

      if (response.data?.success) {
        const loan = response.data.data;
        setLoanData(loan);
        setRows(loan.charges_details || []); // ✅ Correct key
        setError("");
      } else {
        setError("No data found for this loan.");
      }
    } catch (err) {
      console.error("❌ Error fetching loan charges:", err);
      setError("Failed to load loan charges.");
    } finally {
      setLoading(false);
    }
  };

  // 🧾 Calculate Total
  const totalNet = rows.reduce(
    (sum, row) => sum + parseFloat(row.netPayable || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading loan charges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No loan details found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pb-20">
      {/* 🔹 Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">View Loan Charges</h2>

          <button
            onClick={() => navigate("/loan-charges-list")}
            className="bg-[#C1121F] text-white text-sm rounded px-6 py-1 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* 🔹 Loan Details */}
      <div className="bg-[#F7F7FF] mt-7 p-6 rounded-md w-full pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4">
          Loan Details
        </p>

        <div className="grid grid-cols-6 gap-6">
          <Detail label="Loan No" value={loanData.loan_no} />
          <Detail label="Loan Date" value={formatIndianDate(loanData.loan_date)} />
          <Detail label="Scheme" value={loanData.scheme} />
          <Detail label="Party Name" value={loanData.party_name} />
          <Detail label="Loan Amount" value={loanData.loan_amt} />
          <Detail label="Pending Amount" value={loanData.pending_amt} />
          <Detail label="Remark" value={loanData.remark} />
        </div>
      </div>

      {/* 🔹 Document Section */}
      <div className="bg-[#FFE6E6] p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <div className="grid grid-cols-6 gap-6">
          <Detail label="Document No" value={loanData.id} />
          <Detail label="Document Date" value={formatIndianDate(loanData.created_at)} />
        </div>
      </div>

      {/* 🔹 Charges Details */}
      <h1 className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4 mt-6 px-[120px]">
        Charges Details
      </h1>

      <div className="px-[120px]">
        <div className="overflow-hidden">
          <table className="w-full text-sm border-separate border-spacing-1">
            <thead>
              <tr className="bg-[#0A2478] text-white text-center">
                <th className="py-2 px-2">Sr No</th>
                <th className="py-2 px-2">Charges</th>
                <th className="py-2 px-2">Account</th>
                <th className="py-2 px-2">Date</th>
                <th className="py-2 px-2">Gross Amount</th>
                <th className="py-2 px-2">CGST(%)</th>
                <th className="py-2 px-2">CGST Amt</th>
                <th className="py-2 px-2">SGST(%)</th>
                <th className="py-2 px-2">SGST Amt</th>
                <th className="py-2 px-2">Net Payable</th>
              </tr>
            </thead>

            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td className="bg-white py-2 px-2">{index + 1}</td>
                    <td className="bg-white py-2 px-2">{row.charges}</td>
                    <td className="bg-white py-2 px-2">{row.account}</td>
                    <td className="bg-white py-2 px-2">{row.date || "-"}</td>
                    <td className="bg-white py-2 px-2">{row.grossAmount}</td>
                    <td className="bg-white py-2 px-2">{row.cgstPercent || "0"}%</td>
                    <td className="bg-white py-2 px-2">{row.cgstAmount}</td>
                    <td className="bg-white py-2 px-2">{row.sgstPercent || "0"}%</td>
                    <td className="bg-white py-2 px-2">{row.sgstAmount}</td>
                    <td className="bg-white py-2 px-2 font-semibold">
                      {row.netPayable}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-500 py-3 bg-white">
                    No charges found.
                  </td>
                </tr>
              )}

              <tr className="bg-transparent font-semibold">
                <td
                  colSpan="8"
                  className="bg-gray-100 border border-gray-300 rounded-md text-right pr-40 shadow"
                >
                  Total
                </td>
                <td
                  colSpan="2"
                  className="bg-gray-100 border border-gray-300 rounded-md text-center py-2 shadow"
                >
                  ₹ {totalNet.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 🔸 Reusable Field Display
const Detail = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">{label}</label>
    <p className="mt-1 text-gray-800">{value || "-"}</p>
  </div>
);

export default ViewLoanCharges;

