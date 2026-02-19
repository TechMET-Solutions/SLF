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
      <div className="m-2 ">
        {/* HEADER */}
        <div className="flex justify-center mt-5 px-4">
          <div className="flex flex-col w-full max-w-[1290px] rounded-[11px] border border-gray-200 shadow-sm bg-white overflow-hidden">

            {/* 2. Filter Bar - Inline Sequence */}
            <div className="flex items-center justify-between px-4 py-4 gap-4">

              {/* 1. Title */}
              <div className="flex-shrink-0">
                <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
                  Fund Transfer Report
                </h2>
              </div>

              {/* Date Section */}
              <div className="flex items-center gap-3 flex-shrink-0 border-r pr-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-[#0A2478] w-32"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-[#0A2478] w-32"
                  />
                </div>
              </div>

              {/* Branch Selection */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-[#0A2478] w-44 bg-white"
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Radio Buttons Group */}
              <div className="flex items-center gap-6 flex-1 justify-center bg-gray-50 py-1 rounded-md">
                {/* Summary/Detail */}
                <div className="flex gap-3">
                  {["Summary", "Detail"].map((mode) => (
                    <label key={mode} className="flex items-center gap-1.5 text-sm cursor-pointer select-none">
                      <input
                        type="radio"
                        name="viewMode"
                        value={mode}
                        checked={viewMode === mode}
                        onChange={(e) => setViewMode(e.target.value)}
                        className="accent-[#0A2478] w-4 h-4"
                      />
                      {mode}
                    </label>
                  ))}
                </div>

                <div className="w-[1px] h-6 bg-gray-300"></div>

                {/* Issue/Receipt */}
                <div className="flex gap-3">
                  {["Issue", "Receipt"].map((type) => (
                    <label key={type} className="flex items-center gap-1.5 text-sm cursor-pointer select-none">
                      <input
                        type="radio"
                        name="transferType"
                        value={type}
                        checked={transferType === type}
                        onChange={(e) => setTransferType(e.target.value)}
                        className="accent-[#0A2478] w-4 h-4"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* View Button */}
              <div className="flex-shrink-0 pl-4">
                <button
                  onClick={handleView}
                  className="bg-[#0A2478] hover:bg-blue-800 text-white px-8 py-2 rounded text-sm font-bold transition-all shadow-sm"
                >
                  View
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="p-4">
          {/* DATE + BRANCH */}
          {/* <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-2">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              />
            </div>

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
          </div> */}

          {/* RADIO BUTTONS */}
          {/* <div className="flex gap-16 mt-6">
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
          </div> */}

          {/* VIEW BUTTON */}
          {/* <div className="mt-6">
            <button
              onClick={handleView}
              className="bg-blue-600 text-white px-6 py-1 rounded"
            >
              View
            </button>
          </div> */}

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
