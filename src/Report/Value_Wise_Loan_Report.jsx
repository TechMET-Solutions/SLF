import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";
import { decryptData } from "../utils/cryptoHelper";

const Value_Wise_Loan_Report = () => {
  const [fromDate, setFromDate] = useState("");
 const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const [valuers, setValuers] = useState([]);
  console.log(valuers, "valuers");
  const [selectedValuer, setSelectedValuer] = useState("");

  const fetchBranches = async () => {
    try {
      const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);

      if (res.data.success) {
        setBranches(res.data.data);

        if (res.data.data.length > 0) {
          setSelectedBranch(res.data.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchValuers = async () => {
    debugger;
    try {
      const res = await axios.get(`${API}/Master/getActiveEmployees`);
      const decrypted = decryptData(res.data.data); // no JSON.parse
      if (decrypted) {
        setValuers(decrypted);

        if (decrypted.length > 0) {
          setSelectedValuer(res.data.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching valuers:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchValuers();
  }, []);

  const [reportData, setReportData] = useState([]);

  const handleView = async () => {
    debugger;
    try {
      const payload = {
        fromDate,
        toDate,
        branch_id: selectedBranch,
        valuer_id: selectedValuer,
      };
console.log(payload, "payload");
      const res = await axios.post(
        `${API}/api/valuer-report/getValuerWiseLoanReport`,
        payload,
      );

      if (res.data.success) {
        setReportData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
      {/* 2. Main Content Container */}
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        {/* Title Bar matching image_4d297a.png */}
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Valuer Wise Loan Report
        </div>

        {/* Filter Section */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
            {/* From Date */}
            <div className="flex items-center gap-2">
              <label className="text-gray-600 min-w-[60px]">From Date</label>
              <div className="flex border border-gray-300">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-32 px-2 py-0.5 outline-none bg-white"
                />
              </div>
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label className="text-gray-600 min-w-[50px]">To Date</label>
              <div className="flex border border-gray-300">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-32 px-2 py-0.5 outline-none bg-white"
                />
              </div>
            </div>

            {/* Valuer Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-gray-600">Valuer</label>
              <select
                value={selectedValuer}
                onChange={(e) => setSelectedValuer(e.target.value)}
                className="border border-gray-300 px-2 py-0.5 w-48 outline-none focus:border-blue-500 bg-white"
              >
                {valuers.map((val) => (
                  <option key={val.id} value={val.id}>
                    {val.emp_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-gray-600">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="border border-gray-300 px-2 py-0.5 w-48 outline-none focus:border-blue-500 bg-white"
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center mt-6 pt-2 border-t border-gray-100">
            <div className="flex gap-0.5">
              <button
  className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-blue-700 shadow-sm rounded-sm font-semibold"
  onClick={handleView}
>
  💾 View
</button>

              <button className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-red-700 shadow-sm rounded-sm font-semibold">
                ✖ Exit
              </button>
            </div>

            <div className="flex gap-1">
              <button
                title="Print"
                className="p-1 px-2 border border-[#005a9c] bg-[#005a9c] text-white rounded hover:opacity-90"
              >
                🖨️
              </button>
              <button
                title="Excel"
                className="p-1 px-2 border border-[#005a9c] bg-[#005a9c] text-white rounded hover:opacity-90"
              >
                📊
              </button>
            </div>
          </div>
        </div>

        {/* 3. Result Table Section */}
        <div className="bg-white overflow-x-auto">
          <table className="w-full border-collapse text-[10px]">
            <thead className="bg-[#eeeae3] text-gray-700 font-bold border-b border-gray-300">
              <tr>
                {[
                  "Sr. No.",
                  "Loan No",
                  "Loan Date",
                  "Customer Name",
                  "Branch",
                  "Valuer 1",
                  "Valuer 2",
                  "Loan Amt.",
                  "Added By",
                  "Added On",
                  "Approved By",
                  "Approved On",
                  "Paid By",
                  "Status",
                ].map((head, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 p-1 text-left whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            {/* <tbody>
              <tr className="bg-white hover:bg-gray-50">
                <td className="border border-gray-300 p-1">1</td>
                <td className="border border-gray-300 p-1">01A5602846</td>
                <td className="border border-gray-300 p-1">06/11/2025</td>
                <td className="border border-gray-300 p-1 uppercase">
                  SACHIN JAGDISH PATIDAR
                </td>
                <td className="border border-gray-300 p-1">Bhagur B1</td>
                <td className="border border-gray-300 p-1 text-blue-600 italic">
                  Mipl@Maraekat.Com
                </td>
                <td className="border border-gray-300 p-1 text-blue-600 italic">
                  Slunawatfinance@Gmail.Com
                </td>
                <td className="border border-gray-300 p-1">83300.00</td>
                <td className="border border-gray-300 p-1 text-blue-600 italic">
                  Mipl@Maraekat.Com
                </td>
                <td className="border border-gray-300 p-1">06/11/2025</td>
                <td className="border border-gray-300 p-1 text-blue-600 italic">
                  Mipl@Maraekat.Com
                </td>
                <td className="border border-gray-300 p-1">06/11/2025</td>
                <td className="border border-gray-300 p-1">NET BANKING</td>
                <td className="border border-gray-300 p-1 font-semibold text-green-700">
                  Approve
                </td>
              </tr>
            </tbody> */}
            <tbody>
  {reportData.length > 0 ? (
    reportData.map((row, index) => (
      <tr key={row.id} className="bg-white hover:bg-gray-50">
        <td className="border border-gray-300 p-1">
          {index + 1}
        </td>

        <td className="border border-gray-300 p-1">
          {row.id}
        </td>

        <td className="border border-gray-300 p-1">
          {row.created_at
            ? new Date(row.created_at).toLocaleDateString()
            : ""}
        </td>

        <td className="border border-gray-300 p-1 uppercase">
          {row.Print_Name}
        </td>

        <td className="border border-gray-300 p-1">
          {row.branch_name}
        </td>

        <td className="border border-gray-300 p-1">
          {row.Valuer_1_Name}
        </td>

        <td className="border border-gray-300 p-1">
          {row.Valuer_2_Name}
        </td>

        <td className="border border-gray-300 p-1">
          {row.Loan_amount}
        </td>

        <td className="border border-gray-300 p-1">
          {row.approved_by}
        </td>

        <td className="border border-gray-300 p-1">
          {row.created_at
            ? new Date(row.created_at).toLocaleString()
            : ""}
        </td>

        <td className="border border-gray-300 p-1">
          {row.approved_by}
        </td>

        <td className="border border-gray-300 p-1">
          {row.approval_date}
        </td>

        <td className="border border-gray-300 p-1">
          {row.Pay_Date || "-"}
        </td>

        <td
          className={`border border-gray-300 p-1 font-semibold ${
            row.status === "Approved"
              ? "text-green-600"
              : row.status === "Pending"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {row.status}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="14" className="text-center p-3 text-gray-500">
        No records found
      </td>
    </tr>
  )}
</tbody>

          </table>
          <div className="h-[200px] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Value_Wise_Loan_Report;
