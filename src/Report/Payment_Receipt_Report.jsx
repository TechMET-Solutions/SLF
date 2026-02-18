import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Payment_Receipt_Report = () => {
  const [reportType, setReportType] = useState("Payment");
  const [viewMode, setViewMode] = useState("Summary"); // 'Summary' or 'Detail'

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };
  const [reportData, setReportData] = useState([]);
  console.log("Report Data:", reportData);
  const [loading, setLoading] = useState(false);
  const getFinancialYearStart = () => {
    const today = new Date();
    const year =
      today.getMonth() + 1 >= 4 ? today.getFullYear() : today.getFullYear() - 1;

    return `${year}-04-01`;
  };

  const [fromDate, setFromDate] = useState(getFinancialYearStart());
  const [toDate, setToDate] = useState(getToday());
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await axios.get(
        `${API}/Master
/Master_Profile/Branchess`,
      );

      if (res.data.success) {
        setBranches(res.data.data);

        // ✅ Auto select first branch (optional)
        if (res.data.data.length > 0) {
          setSelectedBranch(res.data.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const [mode, setMode] = useState("");
  const [banks, setBanks] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  console.log("Selected Account:", selectedAccount);
  // 🔥 Fetch bank list when Bank is selected
  useEffect(() => {
    if (mode === "Bank") {
      fetchBanks();
    }
  }, [mode]);

  const fetchBanks = async () => {
    try {
      const res = await axios.get("https://slunawat.co.in/api/banks/list");
      setBanks(res.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  // const currentData = viewMode === "Summary" ? summaryData : detailData;
  const handleView = async () => {
    try {
      setLoading(true);

      const payload = {
        reportType, // Payment or Receipt
        branchId: selectedBranch,
        fromDate,
        toDate,
        mode, // Cash or Bank
        accountId: selectedAccount?.id || "",
        accountName: selectedAccount?.bank_name || "",
        viewMode, // Summary or Detail (if needed in backend)
      };

      console.log("Payload:", payload);

      const res = await axios.post(
        `${API}/api/PaymentReport/payment-receipt`,
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
    <div className="min-h-screen bg-white font-sans text-[11px] text-gray-800 p-2">
      <div className="border border-teal-600 shadow-sm">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Payment/Receipt Report
        </div>

        {/* Filter Section */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 max-w-5xl">
            <div className="flex items-center gap-8">
              {/* From Date */}
              <div className="flex items-center gap-2">
                <label className="w-24">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border border-gray-300 px-2 py-0.5"
                />
              </div>

              {/* To Date */}
              <div className="flex items-center gap-2">
                <label className="w-20">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border border-gray-300 px-2 py-0.5"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-24">Branch</label>

              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="border border-gray-300 px-2 py-0.5 w-48"
              >
                <option value="">Select Branch</option>

                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name} ({branch.branch_code})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-6">
              {/* Payment Mode */}
              <div className="flex items-center gap-2">
                <label className="w-32">Payment/Receipt Mode</label>
                <select
                  value={mode}
                  onChange={(e) => {
                    setMode(e.target.value);
                    setSelectedAccount(""); // reset account when mode changes
                  }}
                  className="border border-gray-300 px-2 py-0.5 w-32"
                >
                  <option value="">--Select--</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>

              {/* Account Dropdown */}
              <div className="flex items-center gap-2">
                {/* <label className="w-24">
          Account <span className="text-red-500">*</span>
        </label> */}

                <select
                  value={selectedAccount?.id || ""}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (mode === "Cash") {
                      setSelectedAccount({
                        id: "Cash",
                        bank_name: "Cash",
                      });
                    } else {
                      const selectedBank = banks.find(
                        (bank) => bank.id.toString() === value,
                      );

                      setSelectedAccount(selectedBank); // 🔥 full bank object store hota
                    }
                  }}
                  className="border border-gray-300 px-2 py-0.5 w-48"
                  disabled={!mode}
                >
                  <option value="">--Select--</option>

                  {mode === "Cash" && <option value="Cash">Cash</option>}

                  {mode === "Bank" &&
                    banks
                      .filter((bank) => bank.status === "Active")
                      .map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.bank_name}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            {/* View Mode Selection */}
            {/* <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={viewMode === "Summary"}
                    onChange={() => setViewMode("Summary")}
                  />
                  Summary
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={viewMode === "Detail"}
                    onChange={() => setViewMode("Detail")}
                  />
                  Detail
                </label>
              </div>
            </div> */}

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  checked={reportType === "Payment"}
                  onChange={() => setReportType("Payment")}
                />
                Payment
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  checked={reportType === "Receipt"}
                  onChange={() => setReportType("Receipt")}
                />
                Receipt
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-2 border-t border-gray-100">
            <div className="flex gap-1">
              <button
                className="bg-[#005a9c] text-white px-8 py-1 border border-blue-900"
                onClick={handleView}
              >
                View
              </button>
              <button className="bg-[#005a9c] text-white px-8 py-1 border border-blue-900">
                Exit
              </button>
            </div>
            <div className="flex gap-1">
              <button className="p-1 px-2 border border-[#005a9c] bg-[#005a9c] text-white rounded">
                🖨️
              </button>
              <button className="p-1 px-2 border border-[#005a9c] bg-[#005a9c] text-white rounded">
                📊
              </button>
              <button className="p-1 px-2 border border-[#005a9c] bg-[#005a9c] text-white rounded">
                📄
              </button>
            </div>
          </div>
        </div>

        {/* Table Section - Switching based on Summary/Detail */}
        <div className="p-1 overflow-x-auto overflow-y-auto max-h-[400px]">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#eeeae3] text-gray-700 sticky top-0">
              <tr className="text-left whitespace-nowrap">
                <th className="border border-gray-300 p-1">Payment No</th>
                <th className="border border-gray-300 p-1">Payment Date</th>
                <th className="border border-gray-300 p-1">Paymode</th>
                <th className="border border-gray-300 p-1">Account Name</th>
                <th className="border border-gray-300 p-1 text-right">
                  Total Amount
                </th>
                <th className="border border-gray-300 p-1 text-right">
                  Narration
                </th>
                {/* <th className="border border-gray-300 p-1">Cheque No</th>
                <th className="border border-gray-300 p-1">Cheque Date</th> */}
                {/* <th className="border border-gray-300 p-1">Drawn On</th> */}

                {/* Extra headers for Detail mode */}
                {viewMode === "Detail" && (
                  <>
                    <th className="border border-gray-300 p-1">SL Code</th>
                    <th className="border border-gray-300 p-1 text-right">
                      Amount
                    </th>
                    <th className="border border-gray-300 p-1">Narration</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 bg-white border-b border-gray-200 whitespace-nowrap"
                >
                  <td className="border border-gray-300 p-1">{row.id}</td>
                  <td className="border border-gray-300 p-1">{row.date}</td>
                  <td className="border border-gray-300 p-1">{row.payMode}</td>
                  <td className="border border-gray-300 p-1">{row.ledgerName}</td>
                  <td className="border border-gray-300 p-1 text-right">
                    {row.totalAmount}
                  </td>
                  <td className="border border-gray-300 p-1 text-right">
                    {row.remarks || row.remark}
                  </td>
                  {/* <td className="border border-gray-300 p-1">{row.chequeNo}</td>
                  <td className="border border-gray-300 p-1">
                    {row.chequeDate}
                  </td>
                  <td className="border border-gray-300 p-1">{row.drawnOn}</td> */}

                  {/* Extra cells for Detail mode */}
                  {viewMode === "Detail" && (
                    <>
                      <td className="border border-gray-300 p-1">
                        {row.slCode}
                      </td>
                      <td className="border border-gray-300 p-1 text-right">
                        {row.amount}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {row.narration}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment_Receipt_Report;
