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
      const res = await axios.get(`${API}/api/banks/list`);
      setBanks(res.data);
    } catch (err) {
      console.error("Error fetching bank list:", err);
    }
  };

  // const currentData = viewMode === "Summary" ? summaryData : detailData;
  const handleView = async () => {
    try {
      setLoading(true);

      const payload = {
        reportType, // Payment or Receipt
        // branchId: selectedBranch,
        fromDate,
        toDate,
        mode, // Cash or Bank
        accountId: selectedAccount?.id || "",
        bankName: selectedAccount?.name || "",
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
      <div className="overflow-hidden">

        <div className="flex justify-center mb-2">
          <div className="flex justify-center ">
            <div className="flex items-center px-6 py-2 w-[1462px] h-[40px]  border border-gray-200 justify-between shadow-sm bg-white">
              {/* Left Side: Title */}
              <h2 className="text-red-600 font-bold text-[20px] leading-[148%] whitespace-nowrap">
                Expense/Receipt Report
              </h2>

              {/* Right Side: Filters and Buttons Container */}
              <div className="flex items-center gap-6">

                {/* 2. Action Buttons (Clear, Add, Exit) */}
                <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                  <button
                    // onClick={() => handleAdd()}
                    className="w-[70px] h-[26px] rounded-[4px] bg-[#0A2478] text-white text-[11px] font-medium transition-colors hover:bg-[#071d45]"
                  >
                    Print
                  </button>

                  <button className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px] font-medium transition-colors hover:bg-[#a40f1a]">
                  PDF
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-2 bg-white">

          {/* Filters Row */}
          <div className="flex flex-wrap items-end gap-4">

            {/* From Date */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478]"
              />
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478]"
              />
            </div>

            {/* Branch */}
            {/* <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478]"
              >
                <option value="">Select</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name} ({branch.branch_code})
                  </option>
                ))}
              </select>
            </div> */}

            {/* Mode */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Mode</label>
              <select
                value={mode}
                onChange={(e) => {
                  setMode(e.target.value);
                  setSelectedAccount("");
                }}
                className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478]"
              >
                <option value="">--Select--</option>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
              </select>
            </div>

            {/* Account */}
            <div className="flex items-center gap-2">
             
              <select
                value={selectedAccount?.id || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (mode === "Cash") {
                    setSelectedAccount({ id: "Cash", bank_name: "Cash" });
                  } else {
                    const selectedBank = banks.find((b) => b.id.toString() === value);
                    setSelectedAccount(selectedBank);
                  }
                }}
                disabled={!mode}
                className="border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478] disabled:bg-gray-50"
              >
                <option value="">--Select--</option>
                {mode === "Cash" && <option value="Cash">Cash</option>}
                {mode === "Bank" &&
  banks.map((b) => (
    <option key={b.id} value={b.id}>
      {b.name}
    </option>
  ))}
              </select>
            </div>

            {/* Report Type */}
            <div className="flex items-center gap-4 ml-2">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <label className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="radio"
                  className="accent-[#0A2478]"
                  checked={reportType === "Payment"}
                  onChange={() => setReportType("Payment")}
                />
                Expense
              </label>
              <label className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="radio"
                  className="accent-[#0A2478]"
                  checked={reportType === "Receipt"}
                  onChange={() => setReportType("Receipt")}
                />
                Receipt
              </label>
            </div>

            {/* View + Icons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleView}
                className="w-[70px] h-[26px] rounded-[4px] bg-[#0A2478] text-white text-[11px] font-medium transition-colors hover:bg-[#071d45]"
              >
                View
              </button>
            </div>
          </div>
        </div>


        {/* Table Section - Switching based on Summary/Detail */}
        <div className="p-2 overflow-x-auto overflow-y-auto  max-h-[400px]">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#0A2478] text-gray-100 sticky top-0">
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
                 <td className="border border-gray-300 p-1">
  {new Date(row.date).toLocaleDateString("en-GB")}
</td>
                  <td className="border border-gray-300 p-1">{row.pay_mode}</td>
                  <td className="border border-gray-300 p-1">{row.ledger_name}</td>
                  <td className="border border-gray-300 p-1 text-right">
                    {row.amount}
                  </td>
                  <td className="border border-gray-300 p-1 text-right">
                    {row.remark || row.remark}
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
