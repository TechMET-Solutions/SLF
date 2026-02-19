import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const BankBookReport = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  console.log("Selected Banks:", selectedBanks);
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [reportData, setReportData] = useState([]);
  console.log("Report Data:", reportData);
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [paymentModeTypes, setPaymentModeTypes] = useState([]);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [isPaymentModeDropdownOpen, setIsPaymentModeDropdownOpen] =
    useState(false);
  const PAYMENT_OPTIONS = [
    "Expenses",
    "Payment Gateway",
    "Receipt",
    "Journal Voucher",
    "FT Issue",
    "FT Receipt",
    "Loan Repayment",
  ];

  const PAYMENT_TYPE = ["Net Banking", "Cash"];

  const isCashSelected = paymentTypes.includes("Cash");
  const handlePaymentTypeSelect = (type) => {
    setPaymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handlePaymentModeTypeSelect = (type) => {
    setPaymentModeTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // ✅ Fetch bank list
  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API}/api/banks/list`);
      setBanks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Checkbox select
  // const handleBankSelect = (bankName) => {
  //   if (selectedBanks.includes(bankName)) {
  //     setSelectedBanks(selectedBanks.filter((b) => b !== bankName));
  //   } else {
  //     setSelectedBanks([...selectedBanks, bankName]);
  //   }
  // };
  useEffect(() => {
    if (paymentTypes.includes("Cash")) {
      setSelectedBanks([]); // 🔥 clear bank selection
      setIsBankDropdownOpen(false);
    }
  }, [paymentTypes]);

  // ✅ View Report
  // const handleViewReport = async () => {
  //   try {
  //     const payload = {
  //       fromDate,
  //       toDate,
  //       banks: banks
  //         .filter((bank) => selectedBanks.includes(bank.bank_name))
  //         .map((bank) => bank.id),
  //     };
  //     const res = await axios.post("YOUR_REPORT_API", payload);

  //     calculateRunningTotal(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // ✅ Running total logic
  const calculateRunningTotal = (data) => {
    let total = 0;
    const updated = data.map((row) => {
      total += Number(row.cr) - Number(row.dr);
      return { ...row, runningTotal: total };
    });
    setReportData(updated);
  };
  const handleBankSelect = (bankName) => {
    setSelectedBanks((prev) =>
      prev.includes(bankName)
        ? prev.filter((b) => b !== bankName)
        : [...prev, bankName],
    );
  };
  const handleViewReport = async () => {
    try {
      const payload = {
        fromDate,
        toDate,
        banks: selectedBanks.length
          ? banks
              .filter((bank) => selectedBanks.includes(bank.bank_name))
              .map((bank) => bank.id)
          : [],
        paymentTypes,
        paymentModes: paymentModeTypes,
      };

      console.log("Sending Payload:", payload);

      const res = await axios.post(
        `${API}/api/banks/bank-book-report`, // ✅ your backend route
        payload,
      );
      setReportData(res.data.data);
      // if (res.data.success) {
      //   calculateRunningTotal(res.data.data);
      // } else {
      //   setReportData([]);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const closeAllDropdowns = () => {
      setIsBankDropdownOpen(false);
      setIsPaymentDropdownOpen(false);
      setIsPaymentModeDropdownOpen(false);
    };

    document.addEventListener("click", (e) => {
      // Agar click dropdown button ya list par nahi hai, toh band kar do
      if (!e.target.closest(".relative")) {
        closeAllDropdowns();
      }
    });

    return () => document.removeEventListener("click", closeAllDropdowns);
  }, []);

  return (
    <div className="min-h-screen text-sm">

      <div className="flex justify-center mt-5 px-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[80px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 1. Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
              Bank Book
            </h2>
          </div>

          {/* 2. Content Area (Dates + Dropdowns + Button) */}
          <div className="flex flex-1 items-center justify-between gap-4">

            {/* Date Range Group */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold whitespace-nowrap">From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border rounded p-1 text-sm w-36 focus:ring-1 focus:ring-blue-400 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold whitespace-nowrap">To</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border rounded p-1 text-sm w-36 focus:ring-1 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            {/* Select Bank */}
            <div className="relative flex-1 max-w-[200px]">
              <div
                // onClick={() => !isCashSelected && setIsBankDropdownOpen(!isBankDropdownOpen)}
                onClick={() => {
                  if (!isCashSelected) {
                    // Bank kholte waqt Payment aur Mode ko band karo
                    setIsBankDropdownOpen(!isBankDropdownOpen);
                    setIsPaymentDropdownOpen(false);
                    setIsPaymentModeDropdownOpen(false);
                  }
                }}
                className={`border rounded px-3 py-1.5 text-sm min-h-[38px] flex items-center flex-wrap gap-1 ${isCashSelected ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer bg-white"
                  }`}
              >
                {isCashSelected ? (
                  <span className="text-gray-400 text-xs">N/A (Cash)</span>
                ) : selectedBanks.length === 0 ? (
                  <span className="text-gray-400">Select Bank</span>
                ) : (
                  selectedBanks.map((bank) => (
                    <span key={bank} className="bg-teal-600 text-white text-[10px] px-2 py-0.5 rounded">
                      {bank}
                    </span>
                  ))
                )}
              </div>
              {/* Bank Dropdown List */}
              {isBankDropdownOpen && (
                <div className="absolute z-30 bg-white border w-full max-h-48 overflow-y-auto mt-1 rounded shadow-lg">
                  {banks.map((bank) => (
                    <label key={bank.id} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={selectedBanks.includes(bank.bank_name)}
                        onChange={() => handleBankSelect(bank.bank_name)}
                      />
                      {bank.bank_name}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Type */}
            <div className="relative flex-1 max-w-[180px]">
              <div
                // onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                onClick={() => {
                  // Payment kholte waqt Bank aur Mode ko band karo
                  setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
                  setIsBankDropdownOpen(false);
                  setIsPaymentModeDropdownOpen(false);
                }}
                className="border rounded px-3 py-1.5 text-sm cursor-pointer bg-white flex items-center flex-wrap gap-1 min-h-[38px]"
              >
                {paymentTypes.length === 0 ? (
                  <span className="text-gray-400">Payment Type</span>
                ) : (
                  paymentTypes.map((type) => (
                    <span key={type} className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded">
                      {type}
                    </span>
                  ))
                )}
              </div>
              {isPaymentDropdownOpen && (
                <div className="absolute z-30 bg-white border w-full mt-1 rounded shadow-lg">
                  {PAYMENT_OPTIONS.map((type) => (
                    <label key={type} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={paymentTypes.includes(type)}
                        onChange={() => handlePaymentTypeSelect(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Mode */}
            <div className="relative flex-1 max-w-[180px]">
              <div
                // onClick={() => setIsPaymentModeDropdownOpen(!isPaymentModeDropdownOpen)}
                onClick={() => {
                  // Mode kholte waqt Bank aur Payment ko band karo
                  setIsPaymentModeDropdownOpen(!isPaymentModeDropdownOpen);
                  setIsBankDropdownOpen(false);
                  setIsPaymentDropdownOpen(false);
                }}
                className="border rounded px-3 py-1.5 text-sm cursor-pointer bg-white flex items-center flex-wrap gap-1 min-h-[38px]"
              >
                {paymentModeTypes.length === 0 ? (
                  <span className="text-gray-400">Payment Mode</span>
                ) : (
                  paymentModeTypes.map((type) => (
                    <span key={type} className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded">
                      {type}
                    </span>
                  ))
                )}
              </div>
              {isPaymentModeDropdownOpen && (
                <div className="absolute z-30 bg-white border w-full mt-1 rounded shadow-lg">
                  {PAYMENT_TYPE.map((type) => (
                    <label key={type} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={paymentModeTypes.includes(type)}
                        onChange={() => handlePaymentModeTypeSelect(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* View Button */}
            <button
              onClick={handleViewReport}
              className="bg-[#005a9c] hover:bg-[#004a80] text-white px-5 py-2 rounded text-sm font-semibold transition-colors flex-shrink-0"
            >
              View
            </button>

          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-6 mx-28">
        
          {/* Table */}
        <table className="w-full text-left  rounded-lg border-collapse max-w-3xl">
          <thead className="bg-[#0A2478] text-white text-xs">
              <tr >
                <th className="border p-2 w-[120px]">Date</th>
                <th className="border p-2">Particulars</th>
                <th className="border p-2">Deposite</th>
                <th className="border p-2">Withdrawal</th>
              <th className="border p-2 w-[120px]">Running Total</th>
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
                reportData.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      {new Date(row.date).toLocaleDateString("en-GB")}
                    </td>

                    <td className="border p-2">
                      {row.particulars} ({row.source})
                    </td>
                    <td className="border p-2">{row.dr}</td>
                    <td className="border p-2">{row.cr}</td>
                    <td className="border p-2 font-bold">{row.runningTotal}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default BankBookReport;
