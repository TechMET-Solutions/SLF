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
      };

      const res = await axios.post(
        `${API}FundTransfer/getFundTransferReport`, // 🔁 Replace with your actual API
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

  return (
    <div className="min-h-screen bg-white text-[12px] text-gray-800">
      <div className="m-2 ">
        {/* HEADER */}
        <div className="flex justify-center ">
          <div className="flex flex-col w-[1462px]  border border-gray-200 shadow-sm bg-white overflow-hidden">

            {/* 2. Filter Bar - Inline Sequence */}
            <div className="flex items-center justify-between px-4 py-2 gap-4">

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
          <div className=" overflow-x-auto">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : reportData.length > 0 ? (
              <table className="w-full border border-gray-300">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="border p-2">Doc No</th>
                      <th className="border p-2">Doc Date</th>
                      <th className="border p-2">Type</th>
                    <th className="border p-2">Paymode</th>
                    
                    <th className="border p-2">From Branch </th>
                    <th className="border p-2">To Branch</th>
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
  <td className="border p-2">{row.type}</td>
                      <td className="border p-2">{row.paymode}</td>
                     
                      <td className="border p-2">{row.fromBranch}</td>
                      <td className="border p-2">{row.toBranch}</td>
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
