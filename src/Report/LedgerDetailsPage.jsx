import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../api";

const LedgerDetailsPage = () => {
  const location = useLocation();

  const { ledgerId, fromDate, toDate } = location.state || {};

  const [ledgerName, setLedgerName] = useState("");
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({
    totalDeposit: 0,
    totalWithdrawal: 0,
    closingBalance: 0,
  });

  useEffect(() => {
    if (ledgerId) {
      fetchLedgerDetails();
    }
  }, []);

  const fetchLedgerDetails = async () => {
    try {
      const res = await axios.get(
        `${API}/api/trial-balance/ledger-details/${ledgerId}`,
        {
          params: {
            fromDate,
            toDate,
          },
        },
      );

      setLedgerName(res.data.ledgerName);
      setRows(res.data.data);
      setTotals(res.data.totals);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* HEADER */}
      <div className="bg-[#008080] text-white p-2 text-sm font-semibold rounded-t-md">
        {ledgerName} - Ledger ID: {ledgerId}
      </div>

      <div className="bg-white shadow-md overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#EFEBE9] border-b border-gray-300">
              <th className="p-2 border-r w-32">Date</th>
              <th className="p-2 border-r">Particulars</th>
              <th className="p-2 border-r text-right w-32">Deposit</th>
              <th className="p-2 border-r text-right w-32">Withdrawal</th>
              <th className="p-2 text-right w-32">Running Balance</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b hover:bg-blue-50">
                <td className="p-2 border-r">
                  {new Date(row.date).toLocaleDateString("en-GB")}
                </td>

                <td className="p-2 border-r">{row.particulars}</td>
                <td className="p-2 border-r text-right">{row.deposit}</td>
                <td className="p-2 border-r text-right">{row.withdrawal}</td>
                <td className="p-2 text-right">{row.runningTotal}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td colSpan={2} className="p-2 text-right border-r">
                Total:
              </td>
              <td className="p-2 border-r text-right">{totals.totalDeposit}</td>
              <td className="p-2 border-r text-right">
                {totals.totalWithdrawal}
              </td>
              <td className="p-2 text-right">{totals.closingBalance}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default LedgerDetailsPage;
