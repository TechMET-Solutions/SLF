import { useState } from "react";
import axios from "axios";

const Cash_Book_Report = () => {
  const [fromDate, setFromDate] = useState("01/05/2025");
  const [toDate, setToDate] = useState("25/01/2026");
  const [isCashSelected, setIsCashSelected] = useState(true);
  const [reportData, setReportData] = useState([]);

  // 👉 convert DD/MM/YYYY → YYYY-MM-DD for API
  const formatDateForAPI = (date) => {
    const [dd, mm, yyyy] = date.split("/");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleView = async () => {
    try {
      const payload = {
        fromDate: formatDateForAPI(fromDate),
        toDate: formatDateForAPI(toDate),
        account: isCashSelected ? "Cash" : "",
      };

      const res = await axios.post("YOUR_CASHBOOK_API", payload);

      calculateRunningTotal(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 👉 Running total logic
  const calculateRunningTotal = (data) => {
    let total = 0;
    const updated = data.map((row) => {
      total += Number(row.cr) - Number(row.dr);
      return { ...row, runningTotal: total };
    });
    setReportData(updated);
  };

  return (
    <div className="min-h-screen bg-white text-[13px]">
      <div className="m-2 border border-teal-600">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold">
          Cash Book
        </div>

        <div className="p-4 bg-white">
          {/* Dates */}
          <div className="flex items-center gap-10 mb-6">
            <div className="flex items-center gap-2">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border px-2 py-1 w-28"
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="flex items-center gap-2">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border px-2 py-1 w-28"
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>

          {/* Cash Checkbox */}
          <div className="border rounded p-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isCashSelected}
                onChange={() => setIsCashSelected(!isCashSelected)}
                className="w-4 h-4"
              />
              <span className="font-semibold">Cash</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleView}
              className="bg-[#005a9c] text-white px-6 py-1"
            >
              View
            </button>
          </div>

          {/* Report Table */}
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Particulars</th>
                <th className="border p-2">Dr</th>
                <th className="border p-2">Cr</th>
                <th className="border p-2">Running Total</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No Data
                  </td>
                </tr>
              ) : (
                reportData.map((row, i) => (
                  <tr key={i}>
                    <td className="border p-2">{row.date}</td>
                    <td className="border p-2">{row.particulars}</td>
                    <td className="border p-2">{row.dr}</td>
                    <td className="border p-2">{row.cr}</td>
                    <td className="border p-2 font-bold">
                      {row.runningTotal}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cash_Book_Report;
