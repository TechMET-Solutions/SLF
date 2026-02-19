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
      <div className="m-2 ">

        <div className="flex justify-center my-5 px-4">
          <div className="flex items-center justify-between px-6 py-2 w-full max-w-[1290px] min-h-[70px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

            {/* 🔴 Left — Title */}
            <div className="flex-shrink-0">
              <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
                Valuer Wise Loan Report
              </h2>
            </div>

            {/* 🔵 Right — Controls & Buttons (All in one line) */}
            <div className="flex items-center gap-4 flex-grow justify-end">

              {/* Inputs Group */}
              <div className="flex items-center gap-4 flex-wrap justify-end">
                {/* From Date */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md w-32"
                  />
                </div>

                {/* To Date */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md w-32"
                  />
                </div>

                {/* Valuer Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-600 text-sm whitespace-nowrap">Valuer</label>
                  <select
                    value={selectedValuer}
                    onChange={(e) => setSelectedValuer(e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md w-60 bg-white"
                  >
                    {valuers.map((val) => (
                      <option key={val.id} value={val.id}>{val.emp_name}</option>
                    ))}
                  </select>
                </div>

                {/* Branch Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-gray-800 text-sm whitespace-nowrap">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm outline-none rounded-md w-30 bg-white"
                  >
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons Group */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <button
                  onClick={handleView}
                  className="px-3 py-2 rounded bg-[#0A2478] text-white text-[10px] font-bold hover:bg-[#071d45] transition-all"
                >
                  VIEW
                </button>
                <button
                  className="px-3 py-2 rounded bg-green-600 text-white text-[10px] font-bold hover:bg-green-700 transition-all"
                >
                  EXCEL
                </button>
                <button
                  className="px-3 py-2 rounded bg-red-600 text-white text-[10px] font-bold hover:bg-red-700 transition-all"
                >
                  PDF
                </button>
              </div>

            </div>
          </div>
        </div>
      
        {/* 3. Result Table Section */}
        <div className="bg-white overflow-x-auto mx-28">
          <table className="w-full border-collapse text-[10px]">
            <thead className="bg-[#0A2478] text-gray-100 font-bold border-b border-gray-300">
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
