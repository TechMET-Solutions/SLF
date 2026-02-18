import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Fund_Transfer_Report = () => {
  // ==============================
  // STATES
  // ==============================
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [viewMode, setViewMode] = useState("Detail"); // Summary / Detail
  const [transferType, setTransferType] = useState("Issue"); // Issue / Receipt

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==============================
  // FETCH BRANCHES
  // ==============================
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

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleView = async () => {
    if (!fromDate || !toDate) {
      alert("Please select From Date and To Date");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fromDate,
        toDate,
        branchId: selectedBranch,
        viewMode, // Summary / Detail
        transferType, // Issue / Receipt
      };

      const res = await axios.post(
        `${API}/FundTransfer/getFundTransferReport`, // 🔁 Replace with your actual API
        payload,
      );

      if (res.data.success) {
        setReportData(res.data.data);
      } else {
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="min-h-screen bg-white text-[12px] text-gray-800">
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        {/* HEADER */}
        <div className="bg-[#1a8a81] text-white px-3 py-2 font-semibold text-sm">
          Fund Transfer Report
        </div>

        <div className="p-4">
          {/* DATE + BRANCH */}
          <div className="flex flex-wrap items-center gap-10">
            {/* From Date */}
            <div className="flex items-center gap-2">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              />
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              />
            </div>

            {/* Branch */}
            <div className="flex items-center gap-2">
              <label>Beneficiary Branch</label>

              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-44"
              >
                <option value="">Select Branch</option>

                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* RADIO BUTTONS */}
          <div className="flex gap-16 mt-6">
            {/* Summary / Detail */}
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="viewMode"
                  value="Summary"
                  checked={viewMode === "Summary"}
                  onChange={(e) => setViewMode(e.target.value)}
                />
                Summary
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="viewMode"
                  value="Detail"
                  checked={viewMode === "Detail"}
                  onChange={(e) => setViewMode(e.target.value)}
                />
                Detail
              </label>
            </div>

            {/* Issue / Receipt */}
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="transferType"
                  value="Issue"
                  checked={transferType === "Issue"}
                  onChange={(e) => setTransferType(e.target.value)}
                />
                Issue
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="transferType"
                  value="Receipt"
                  checked={transferType === "Receipt"}
                  onChange={(e) => setTransferType(e.target.value)}
                />
                Receipt
              </label>
            </div>
          </div>

          {/* VIEW BUTTON */}
          <div className="mt-6">
            <button
              onClick={handleView}
              className="bg-blue-600 text-white px-6 py-1 rounded"
            >
              View
            </button>
          </div>

          {/* TABLE */}
          <div className="mt-6 overflow-x-auto">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : reportData.length > 0 ? (
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">Doc No</th>
                    <th className="border p-2">Doc Date</th>
                    <th className="border p-2">Paymode</th>
                    <th className="border p-2">Account Name</th>
                    <th className="border p-2">Total Amount</th>
                    <th className="border p-2">Added By</th>
                    <th className="border p-2">Branch Name</th>
                    <th className="border p-2">Beneficiary Branch</th>
                    <th className="border p-2">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {reportData.map((row, index) => (
                    <tr key={index} className="text-center hover:bg-gray-50">
                      <td className="border p-2">{row.docNo}</td>
                      <td className="border p-2">
                        {new Date(row.docDate).toLocaleDateString("en-GB")}
                      </td>

                      <td className="border p-2">{row.paymode}</td>
                      <td className="border p-2">{row.accountName}</td>
                      <td className="border p-2">{row.totalAmount}</td>
                       
                      <td className="border p-2">{row.addedBy}</td>
                      <td className="border p-2">{row.branchName}</td>
                      <td className="border p-2">{row.beneficiaryBranch}</td>
                      <td className="border p-2 font-semibold">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fund_Transfer_Report;
