import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Day_Book = () => {
 const today = new Date().toISOString().split("T")[0];

const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState({
    loanApprove: true,
    loanRepayment: true,
    receiptPayment: true,
    journalVoucher: true,
    cashBalances: true,
  });

  const [apiData, setApiData] = useState({
    loanApprove: [],
    loanRepayment: [],
    receiptPayment: [],
    journalVoucher: [],
    cashBalances: [],
  });
  console.log(apiData.loanRepayment, "loanRepayment");
  console.log(apiData.receiptPayment, "receiptPayment");
  console.log(apiData.journalVoucher, "journalVoucher");
  const handleCheckboxChange = (key) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 🔹 API Call function
  const fetchDayBook = async () => {
    debugger;
    try {
      setLoading(true);
      const res = await axios.post(`${API}/api/Reports/day-book`, {
        date: selectedDate,
        options,
      });
      setApiData(res.data.data || {});
    } catch (error) {
      console.error("Day Book API Error", error);
      alert("Failed to fetch report data.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial Load only
  useEffect(() => {
    fetchDayBook();
  }, []); // Empty array means this runs once on mount.
  // Subsequent calls only happen via the "View" button.

 const calculateTotal = (data) => {
  if (!data || !Array.isArray(data)) return "0.00";

  return data
    .reduce((sum, row) => {
      const value = parseFloat(row.totalAmount ?? row.amount ?? 0);
      return sum + (isNaN(value) ? 0 : value);
    }, 0)
    .toFixed(2);
};

  const calculateJournalTotal = (data, type) => {
  if (!data || !Array.isArray(data)) return "0.00";

  return data
    .reduce((sum, row) => {
      const value =
        type === "deposit"
          ? parseFloat(row.deposit_amount || 0)
          : parseFloat(row.withdrawal_amount || 0);

      return sum + (isNaN(value) ? 0 : value);
    }, 0)
    .toFixed(2);
};

  const renderCell = (val) => {
    if (val === null || val === undefined) return "-";

    // number / string
    if (typeof val === "string" || typeof val === "number") {
      return val;
    }

    // array (Pledge_Item_List, payments_Details, etc.)
    if (Array.isArray(val)) {
      return val.map((item, i) => (
        <div key={i} className="text-[10px]">
          {typeof item === "object" ? Object.values(item).join(" | ") : item}
        </div>
      ));
    }

    // object
    if (typeof val === "object") {
      return Object.values(val).join(" | ");
    }

    return "-";
  };

  const TableSection = ({ title, headers, rows = [], totals = {} }) => (
    <div className="p-2 overflow-x-auto border-b border-gray-100">
      <div className="text-[11px] font-bold mb-0.5 text-gray-700">
        Bhagur B1 [ 01 ]
      </div>
      <div className="text-[#8b4513] font-bold border-b border-gray-300 mb-1 text-[12px]">
        {title}
      </div>
      <table className="w-full border-collapse border border-gray-300 text-[11px]">
        <thead className="bg-[#f2f2f2] text-left text-gray-700">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="border border-gray-300 p-1 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, i) => (
              <tr key={i} className="hover:bg-blue-50">
                {headers.map((_, j) => {
                  const value = row[Object.keys(row)[j]];
                  return (
                    <td
                      key={j}
                      className="border border-gray-300 p-1 align-top"
                    >
                      {renderCell(value)}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="border border-gray-300 p-4 text-center text-gray-400 italic"
              >
                No records found
              </td>
            </tr>
          )}
          {/* 🔹 Perfect Total Row */}
          <tr className="bg-[#fff9e6] font-bold">
            <td className="border border-gray-300 p-1">Total</td>
            {headers.slice(1).map((h, i) => (
              <td key={i} className="border border-gray-300 p-1 text-right">
                {totals[h] || ""}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const checkboxList = [
    { label: "Loan Approve", key: "loanApprove" },
    { label: "Loan Repayment", key: "loanRepayment" },
    { label: "Receipt/Expense", key: "receiptPayment" },
    { label: "Journal Voucher", key: "journalVoucher" },
    { label: "Cash Balances", key: "cashBalances" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[12px] w-[1462px] ml-[18px]">
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <span className="bg-white px-4 py-2 border shadow-sm font-bold animate-pulse">
              Loading Report...
            </span>
          </div>
        )}
        <div className="flex ">
          <div className="flex flex-col w-full max-w-[1462px] border border-gray-200 shadow-sm bg-white overflow-hidden">

           
            <div className="flex items-center justify-between px-6  py-1 gap-6">

              <div className="flex-shrink-0">
                <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
                  Day Book
                </h2>
              </div>

              {/* 1. For Date Input */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <label className="font-bold text-gray-700 whitespace-nowrap">For Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-teal-500 w-40"
                />
              </div>

              {/* 2. Checkboxes (Horizontal Grid) */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 flex-1 justify-center">
                {checkboxList.map(({ label, key }) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer select-none group"
                  >
                    <input
                      type="checkbox"
                      checked={options[key]}
                      onChange={() => handleCheckboxChange(key)}
                      className="accent-[#005a9c] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                      {label}
                    </span>
                  </label>
                ))}
              </div>

              {/* 3. Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={fetchDayBook}
                  disabled={loading}
                  className="bg-[#005a9c] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-blue-800 active:bg-blue-900 disabled:opacity-50 transition-all min-w-[100px]"
                >
                  {loading ? "..." : "View"}
                </button>
              </div>

            </div>
          </div>
        </div>

        {options.loanApprove && (
          <div className="overflow-x-auto mt-5">
           
            <div className="flex items-center gap-2 mb-2 text-[14px] font-bold text-red-600 pb-1">
              <span>Loan Approve</span>
             
            </div>


            <table className="w-full text-left bt-2 rounded-lg border-collapse min-w-[1500px]">
              <thead className="bg-[#0A2478] text-white text-xs">
                <tr>
                  <th className="border border-gray-300 p-1">SNo</th>
                  <th className="border border-gray-300 p-1">Loan No</th>
                  <th className="border border-gray-300 p-1">Loan Date</th>
                  <th className="border border-gray-300 p-1">Pay Mode</th>
                  <th className="border border-gray-300 p-1">Scheme</th>
                  <th className="border border-gray-300 p-1">Party Id</th>
                  <th className="border border-gray-300 p-1">Mobile</th>
                  <th className="border border-gray-300 p-1">Party Name</th>
                  <th className="border border-gray-300 p-1">Eligible Amt</th>
                  <th className="border border-gray-300 p-1">Loan Amount</th>
                  {/* <th className="border border-gray-300 p-1">IsOD</th> */}
                  <th className="border border-gray-300 p-1">Status</th>
                  <th className="border border-gray-300 p-1">Approver</th>
                  <th className="border border-gray-300 p-1">Approve On</th>
                </tr>
              </thead>
              <tbody>
                {apiData.loanApprove && apiData.loanApprove.length > 0 ? (
                  apiData.loanApprove.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50">
                      <td className="border border-gray-300 p-1">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-1">{item.id}</td>
                      <td className="border border-gray-300 p-1">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString(
                            "en-GB",
                          )
                          : "-"}
                      </td>

                      <td className="border border-gray-300 p-1">
                        {item.payments_Details?.length
                          ? item.payments_Details
                            .map((p) => p.paidBy)
                            .join(", ")
                          : "-"}
                      </td>

                      <td className="border border-gray-300 p-1">
                        {item.Scheme}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {item.BorrowerId}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {item.Mobile_Number}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {item.Print_Name}
                      </td>
                      <td className="border border-gray-300 p-1 text-right">
                        ₹
                        {item.Pledge_Item_List?.reduce(
                          (total, p) => total + Number(p.valuation || 0),
                          0,
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="border border-gray-300 p-1 text-right font-semibold">
                        {item.Loan_amount}
                      </td>
                      {/* <td className="border border-gray-300 p-1">
                        {item.isOD ? "Yes" : "No"}
                      </td> */}
                      <td className="border border-gray-300 p-1">
                        {item.status}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {item.approved_by}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {item.approval_date
                          ? new Date(item.approval_date).toLocaleDateString(
                            "en-GB",
                          )
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="14"
                      className="border border-gray-300 p-4 text-center text-gray-400 italic"
                    >
                      No records found
                    </td>
                  </tr>
                )}
                {/* Total Row */}
                <tr className="bg-[#fff9e6] font-bold">
                  <td
                    colSpan="9"
                    className="border border-gray-300 p-1 text-right"
                  >
                    Total:
                  </td>
                  <td className="border border-gray-300 p-1 text-right text-blue-800">
                    {apiData?.loanApprove?.length > 0
                      ? calculateTotal(apiData.loanApprove, "Loan_amount")
                      : "0.00"}
                  </td>

                  <td
                    colSpan="4"
                    className="border border-gray-300 bg-gray-50"
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

       
        {options.loanRepayment && (
          <div className="mb-6">

            {/* 🔹 Table */}
            {options.loanRepayment && (
              <div className="overflow-x-auto ">
                {/* Branch & Section Header */}
                 <div className="flex items-center gap-2 mb-2 text-[14px] font-bold text-red-600  pb-1">
                  <span> Loan Repayment</span>
                  
                </div>


                <table className="w-full text-left bt-2 rounded-lg border-collapse min-w-[1500px]">
                  <thead className="bg-[#0A2478] text-white text-xs">
                    <tr >
                      <th className="border border-gray-400 p-1 font-bold text-left w-8">
                        SNo
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Receipt No
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Date
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Paymode
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Scheme
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Loan Date
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Loan No
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Customer Name
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-right">
                        Amount
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-right">
                        Loan Adj
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-right">
                        Charges
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-right">
                        Interest
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Receipt By
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Remarks
                      </th>
                    </tr>
                  </thead>

                
                  <tbody className="bg-white">
                    {apiData?.loanRepayment?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={14}
                          className="border border-gray-300 text-center py-6 text-gray-400 italic bg-gray-50"
                        >
                          No repayment records found for the selected date.
                        </td>
                      </tr>
                    ) : (
                      apiData?.loanRepayment?.map((row, index) => {
                        const { installment, loan } = row;

                        return (
                          <tr
                            key={index}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            {/* SNo */}
                            <td className="border p-1 text-center">
                              {index + 1}
                            </td>

                            {/* Receipt No (use installment id) */}
                            <td className="border p-1 font-medium text-blue-700">
                              {installment?.receiptNo}
                            </td>

                            {/* Date */}
                            <td className="border p-1 text-center whitespace-nowrap">
                              {new Date(
                                installment?.date,
                              ).toLocaleDateString()}
                            </td>

                            {/* Paymode */}
                            <td className="border p-1 capitalize">
                              {installment?.paymentMode || "-"}
                            </td>

                            {/* Scheme */}
                            <td className="border p-1">{loan?.Scheme}</td>

                            {/* Loan Date */}
                           <td className="border p-1 text-center whitespace-nowrap">
  {loan?.created_at
    ? new Date(loan.created_at).toLocaleDateString("en-GB")
    : "-"}
</td>

                            {/* Loan No */}
                            <td className="border p-1 font-medium">
                              LN-{loan?.id}
                            </td>

                            {/* Party Name */}
                            <td className="border p-1 uppercase text-[11px]">
                              {loan?.Borrower}
                            </td>

                            {/* Amount */}
                            <td className="border p-1 text-right font-semibold">
                              {Number(installment?.payAmount).toFixed(2)}
                            </td>

                            {/* Loan Adj */}
                            <td className="border p-1 text-right text-green-700">
                              {Number(installment?.loanAmountPaid || installment?.interestAmount).toFixed(2)}
                            </td>

                            {/* Charges */}
                            <td className="border p-1 text-right">
                              {Number(installment?.chargesAdjusted 
                                || 0
                              ).toFixed(2)}
                            </td>

                            {/* Interest */}
                            <td className="border p-1 text-right">
                              {Number(installment?.interestAmount || installment?.pendingInterest).toFixed(2)}
                            </td>

                            {/* Receipt By */}
                            <td className="border p-1 text-gray-600 italic">
                              {installment?.paymentInfo?.madeBy || "-"}
                            </td>

                            {/* Remarks */}
                            <td
                              className="border p-1 max-w-[150px] truncate"
                              title={installment.paymentInfo?.refNo}
                            >
                              {installment?.paymentInfo?.refNo || "-"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>

                  {/* 🔹 Financial Style Total Footer */}
                  <tfoot>
                    <tr className="bg-[#fff9e6] font-bold text-gray-900">
                      <td
                        colSpan={8}
                        className="border border-gray-400 px-2 py-1 text-right text-[12px]"
                      >
                        TOTAL:
                      </td>
                      <td className="border border-gray-400 px-2 py-1 text-right text-blue-900 underline decoration-double">
                        {calculateTotal(apiData.loanRepayment, "amount")}
                      </td>
                      <td className="border border-gray-400 px-2 py-1 text-right">
                        {calculateTotal(apiData.loanRepayment, "loanAdj")}
                      </td>
                      <td className="border border-gray-400 px-2 py-1 text-right text-red-700">
                        {calculateTotal(apiData.loanRepayment, "charges")}
                      </td>
                      <td className="border border-gray-400 px-2 py-1 text-right">
                        {calculateTotal(apiData.loanRepayment, "interest")}
                      </td>
                      <td
                        colSpan={2}
                        className="border border-gray-400 bg-gray-100"
                      ></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        )}

        {options.receiptPayment && (
          <div className="overflow-x-auto ">

            

            <div className="flex items-center gap-2 mb-2 text-[14px] font-bold text-red-600 pb-1">
              <span> Receipt/Expense</span>
             
            </div>

            <table className="w-full border-collapse border border-gray-400 text-[11px]">
              <thead>
                <tr className="bg-[#0A2478] text-white text-xs">
                  <th className="border border-gray-400 p-1 font-bold text-center w-8">SNo</th>
                  {/* <th className="border border-gray-400 p-1 font-bold text-left">Type</th> */}
                  <th className="border border-gray-400 p-1 font-bold text-left">Doc No</th>
                  <th className="border border-gray-400 p-1 font-bold text-center">Doc Date</th>
                  <th className="border border-gray-400 p-1 font-bold text-left">Name</th>

                  <th className="border border-gray-400 p-1 font-bold text-left">Drawn On</th>
                  <th className="border border-gray-400 p-1 font-bold text-left">Drawn Branch</th>
                  <th className="border border-gray-400 p-1 font-bold text-right">Amount</th>
                  <th className="border border-gray-400 p-1 font-bold text-left">Narration</th>
                  <th className="border border-gray-400 p-1 font-bold text-left">Branch At</th>
                  <th className="border border-gray-400 p-1 font-bold text-left">Created By</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {apiData.receiptPayment?.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="border border-gray-300 text-center py-6 text-gray-400 italic bg-gray-50">
                      No receipt or payment records found for this date.
                    </td>
                  </tr>
                ) : (
                  apiData.receiptPayment?.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                      <td className="border border-gray-300 p-1 text-center text-gray-600">{index + 1}</td>
                      {/* <td className="border border-gray-300 p-1 font-medium">{row.trans_Type || row.type || "N/A"}</td> */}
                      <td className="border border-gray-300 p-1 text-blue-900">{row.docNo || row.id}</td>
                      <td className="border border-gray-300 p-1 text-center whitespace-nowrap">
                        {new Date(row.created_at).toLocaleDateString("en-GB")}
                      </td>

                      <td className="border border-gray-300 p-1 uppercase">{row.party_name || row.name}</td>

                      <td className="border border-gray-300 p-1">{row.bankName || "-"}</td>
                      <td className="border border-gray-300 p-1">{row.bankBranch || "-"}</td>
                      <td className="border border-gray-300 p-1 text-right font-bold text-gray-900">
                        {parseFloat(row.totalAmount || row.amount || 0).toFixed(2)}
                      </td>
                      <td className="border border-gray-300 p-1 italic text-gray-600 max-w-[150px] truncate" title={row.remarks || row.narration}>
                        {row.remark || row.remark || "-"}
                      </td>
                      <td className="border border-gray-300 p-1">Main Branch</td>
                      <td className="border border-gray-300 p-1 text-[10px] text-gray-500">{row.employee_name || "--"}</td>
                    </tr>
                  ))
                )}
              </tbody>

             
              <tfoot>
                <tr className="bg-[#fff9e6] font-bold text-gray-900">
                  <td colSpan={9} className="border border-gray-400 px-2 py-1 text-right text-[12px]">
                    TOTAL:
                  </td>
                  <td className="border border-gray-400 px-2 py-1 text-right text-blue-900 underline decoration-double">
                    {calculateTotal(apiData.receiptPayment, "totalAmount")}
                  </td>
                  <td colSpan={3} className="border border-gray-400 bg-gray-100"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {options.journalVoucher && (
          <div className="overflow-x-auto ">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-2 text-[14px] font-bold text-red-600 pb-1">
              <span> Journal Voucher</span>
             
            </div>

            <table className="w-full text-left bt-2">
              <thead>
                <tr className="bg-[#0A2478] text-white text-xs">
                  <th className="border border-gray-400 p-1 font-bold text-center w-8">SNo</th>
                  <th className="border border-gray-400 p-1 font-bold text-left">Doc No</th>
                  <th className="border border-gray-400 p-1 font-bold text-center">Date</th>
                  {/* <th className="border border-gray-400 p-1 font-bold text-left">Name</th> */}
                  <th className="border border-gray-400 p-1 font-bold text-right ">Deposit Amount</th>
                  <th className="border border-gray-400 p-1 font-bold text-right ">withdrawal Amount</th>
                  <th className="border border-gray-400 p-1 font-bold text-left">Narration</th>
                 
                  
                </tr>
              </thead>

              <tbody className="bg-white">
                {apiData.journalVoucher?.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="border border-gray-300 text-center py-6 text-gray-400 italic bg-gray-50">
                      No journal vouchers found for this date.
                    </td>
                  </tr>
                ) : (
                  apiData.journalVoucher?.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                      <td className="border border-gray-300 p-1 text-center text-gray-600">{index + 1}</td>
                      <td className="border border-gray-300 p-1 text-blue-900 font-medium">{row.voucher_no || row.id}</td>
                      <td className="border border-gray-300 p-1 text-center whitespace-nowrap">
                        {new Date(row.doc_Date || row.voucher_date).toLocaleDateString("en-GB")}
                      </td>

                      {/* <td className="border border-gray-300 p-1 uppercase font-medium">{row.party_Name || row.name || "-"}</td> */}
                      <td className="border border-gray-300 p-1 text-right font-semibold">
                        {parseFloat(row.deposit_amount || 0).toFixed(2)}
                      </td>
                      <td className="border border-gray-300 p-1 text-right font-semibold">
                        {parseFloat(row.withdrawal_amount || row.creditAmount || 0).toFixed(2)}
                      </td>
                      <td className="border border-gray-300 p-1 italic text-gray-600 max-w-[200px] truncate" title={row.narration}>
                        {row.remark || "-"}
                      </td>
                      {/* <td className="border border-gray-300 p-1 text-center text-gray-300 italic">______</td> */}
                      
                    </tr>
                  ))
                )}
              </tbody>

       
            <tfoot>
  <tr className="bg-[#fff9e6] font-bold text-gray-900">
    {/* Empty columns */}
    <td colSpan={3} className="border border-gray-400 px-2 py-1 text-right text-[12px]">
      VOUCHER TOTAL:
    </td>

    {/* Deposit Total */}
    <td className="border border-gray-400 px-2 py-1 text-right text-blue-900">
      {calculateJournalTotal(apiData.journalVoucher, "deposit")}
    </td>

    {/* Withdrawal Total */}
    <td className="border border-gray-400 px-2 py-1 text-right text-red-900">
      {calculateJournalTotal(apiData.journalVoucher, "withdrawal")}
    </td>

    {/* Narration empty */}
    <td className="border border-gray-400 bg-gray-100"></td>
  </tr>
</tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Day_Book;
