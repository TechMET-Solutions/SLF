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

  return (
    <div className="min-h-screen bg-gray-100 text-sm">
      <div className="m-4 border border-teal-600 bg-white">
        <div className="bg-teal-700 text-white p-2 font-semibold">
          Bank Book
        </div>

        <div className="p-4">
          {/* Date Inputs */}
          <div className="flex gap-8 mb-4 items-center">
            <div className="flex items-center gap-2">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border p-1 w-40"
              />
            </div>

            <div className="flex items-center gap-2">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border p-1 w-40"
              />
            </div>
          </div>

          {/* Bank Selection */}

          {/* Bank Multi Select Dropdown */}
          <div className="relative mb-4">
            <label className="block font-bold text-teal-700 mb-1">
              Select Bank
            </label>

            {/* Dropdown Button */}
            <div
              onClick={() => {
                if (!isCashSelected) {
                  setIsBankDropdownOpen(!isBankDropdownOpen);
                }
              }}
              className={`border rounded px-3 py-2 min-h-[40px] flex flex-wrap gap-2
    ${
      isCashSelected
        ? "bg-gray-100 cursor-not-allowed opacity-60"
        : "cursor-pointer bg-white"
    }`}
            >
              {isCashSelected ? (
                <span className="text-gray-400">
                  Bank not applicable for Cash
                </span>
              ) : selectedBanks.length === 0 ? (
                <span className="text-gray-400">Select Banks</span>
              ) : (
                selectedBanks.map((bank) => (
                  <span
                    key={bank}
                    className="bg-teal-600 text-white text-xs px-2 py-1 rounded"
                  >
                    {bank}
                  </span>
                ))
              )}
            </div>

            {/* Dropdown List */}
            {isBankDropdownOpen && (
              <div className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto mt-1 rounded shadow">
                {banks.map((bank) => (
                  <label
                    key={bank.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBanks.includes(bank.bank_name)}
                      onChange={() => handleBankSelect(bank.bank_name)}
                    />
                    <span>{bank.bank_name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}

          <div className="flex gap-4 mb-6">
            {/* <div className="flex gap-2 mb-6">
              <button
                onClick={handleViewReport}
                className="bg-[#005a9c] text-white px-6 py-1 rounded"
              >
                View
              </button>
            </div> */}
            {/* Payment Type Multi Select */}
            <div className="flex items-end gap-6 mb-6">
              {/* View Button */}
              <button
                onClick={handleViewReport}
                className="bg-[#005a9c] text-white px-6 py-2 rounded h-[40px]"
              >
                View
              </button>

              {/* Payment Type Multi Select */}
              <div className="relative w-64">
                <label className="block font-bold text-teal-700 mb-1">
                  Payment Type
                </label>

                {/* Dropdown Button */}
                <div
                  onClick={() =>
                    setIsPaymentDropdownOpen(!isPaymentDropdownOpen)
                  }
                  className="border rounded px-3 py-2 cursor-pointer bg-white flex flex-wrap gap-2 min-h-[40px]"
                >
                  {paymentTypes.length === 0 ? (
                    <span className="text-gray-400">Select Payment Type</span>
                  ) : (
                    paymentTypes.map((type) => (
                      <span
                        key={type}
                        className="bg-purple-600 text-white text-xs px-2 py-1 rounded"
                      >
                        {type}
                      </span>
                    ))
                  )}
                </div>

                {/* Dropdown List */}
                {isPaymentDropdownOpen && (
                  <div className="absolute z-20 bg-white border w-full mt-1 rounded shadow">
                    {PAYMENT_OPTIONS.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={paymentTypes.includes(type)}
                          onChange={() => handlePaymentTypeSelect(type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative w-64">
                <label className="block font-bold text-teal-700 mb-1">
                  Payment Mode
                </label>

                {/* Dropdown Button */}
                <div
                  onClick={() =>
                    setIsPaymentModeDropdownOpen(!isPaymentModeDropdownOpen)
                  }
                  className="border rounded px-3 py-2 cursor-pointer bg-white flex flex-wrap gap-2 min-h-[40px]"
                >
                  {paymentModeTypes.length === 0 ? (
                    <span className="text-gray-400">Select Payment Mode</span>
                  ) : (
                    paymentModeTypes.map((type) => (
                      <span
                        key={type}
                        className="bg-purple-600 text-white text-xs px-2 py-1 rounded"
                      >
                        {type}
                      </span>
                    ))
                  )}
                </div>

                {/* Dropdown List */}
                {isPaymentModeDropdownOpen && (
                  <div className="absolute z-20 bg-white border w-full mt-1 rounded shadow">
                    {PAYMENT_TYPE.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={paymentModeTypes.includes(type)}
                          onChange={() => handlePaymentModeTypeSelect(type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Date</th>
                <th className="border p-2">Particulars</th>
                <th className="border p-2">Deposite</th>
                <th className="border p-2">Withdrawal</th>
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
    </div>
  );
};

export default BankBookReport;
