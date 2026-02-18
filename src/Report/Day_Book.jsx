import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Day_Book = () => {
  const [selectedDate, setSelectedDate] = useState("2026-02-07");
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

  const calculateTotal = (data, key) => {
    if (!data || !Array.isArray(data)) return "0.00";

    return data
      .reduce((sum, row) => sum + (parseFloat(row[key]) || 0), 0)
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
    { label: "Receipt/Payment", key: "receiptPayment" },
    { label: "Journal Voucher", key: "journalVoucher" },
    { label: "Cash Balances", key: "cashBalances" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[12px] p-2">
      <div className="border border-teal-600 shadow-sm relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <span className="bg-white px-4 py-2 border shadow-sm font-bold animate-pulse">
              Loading Report...
            </span>
          </div>
        )}

        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold flex justify-between items-center">
          <span>Day Book</span>
          <span className="text-[10px] font-normal">
            Financial Year : 2025-2026
          </span>
        </div>

        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex gap-2 mb-3 items-center">
            <label className="font-semibold">For Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 px-2 py-0.5 outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {checkboxList.map(({ label, key }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() => handleCheckboxChange(key)}
                  className="accent-[#005a9c] w-3.5 h-3.5"
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-1 pt-2 border-t">
            {/* 🔹 View Button calls fetchDayBook */}
            <button
              onClick={fetchDayBook}
              disabled={loading}
              className="bg-[#005a9c] text-white px-8 py-1 border border-blue-900 text-xs hover:bg-blue-800 active:bg-blue-900 disabled:opacity-50"
            >
              {loading ? "Loading..." : "View"}
            </button>
            <button className="bg-[#005a9c] text-white px-8 py-1 border border-blue-900 text-xs hover:bg-red-700">
              Exit
            </button>
          </div>
        </div>

        {options.loanApprove && (
          <div className="p-2 overflow-x-auto border-b border-gray-100">
            <div className="text-[11px] font-bold mb-0.5 text-gray-700">
              Bhagur B1 [ 01 ]
            </div>
            <div className="text-[#8b4513] font-bold border-b border-gray-300 mb-1 text-[12px]">
              Loan Approve
            </div>

            <table className="w-full border-collapse border border-gray-300 text-[11px]">
              <thead className="bg-[#f2f2f2] text-left text-gray-700">
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

        {/* {options.loanRepayment && (
          <TableSection
            title="Loan Repayment"
            headers={[
              "SNo",
              "Receipt No",
              "Date",
              "Paymode",
              "Scheme",
              "Loan Date",
              "Loan No",
              "Party Name",
              "Amount",
              "Loan Adj",
              "Charges",
              "Interest",
              "Receipt By",
              "Remarks",
            ]}
            rows={apiData.loanRepayment}
            totals={{ Amount: calculateTotal(apiData.loanRepayment, "amount") }}
          />
        )} */}
        {options.loanRepayment && (
          <div className="mb-6 border border-gray-300 rounded">
            {/* 🔹 Title */}

            {/* 🔹 Table */}
            {options.loanRepayment && (
              <div className="p-2 overflow-x-auto border-b border-gray-100">
                {/* Branch & Section Header */}
                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                  Bhagur B1 [ 01 ]
                </div>
                <div className="text-[#8b4513] font-bold border-b border-gray-300 mb-1 text-[12px] pb-0.5">
                  Loan Repayment
                </div>

                <table className="w-full border-collapse border border-gray-400 text-[11px]">
                  <thead>
                    <tr className="bg-[#f2f2f2] text-gray-800">
                      <th className="border border-gray-400 p-1 font-bold text-center w-8">
                        SNo
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Receipt No
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-center">
                        Date
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Paymode
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Scheme
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-center">
                        Loan Date
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Loan No
                      </th>
                      <th className="border border-gray-400 p-1 font-bold text-left">
                        Party Name
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

                  {/* <tbody className="bg-white">
        {apiData.loanRepayment?.length === 0 ? (
          <tr>
            <td colSpan={14} className="border border-gray-300 text-center py-6 text-gray-400 italic bg-gray-50">
              No repayment records found for the selected date.
            </td>
          </tr>
        ) : (
          apiData.loanRepayment?.map((row, index) => (
            <tr key={index} className="hover:bg-blue-50 transition-colors">
              <td className="border border-gray-300 p-1 text-center text-gray-600">{index + 1}</td>
              <td className="border border-gray-300 p-1 text-blue-800 font-medium">{row.receiptNo}</td>
              <td className="border border-gray-300 p-1 text-center whitespace-nowrap">{row.date}</td>
              <td className="border border-gray-300 p-1 capitalize">{row.paymode?.toLowerCase()}</td>
              <td className="border border-gray-300 p-1">{row.scheme}</td>
              <td className="border border-gray-300 p-1 text-center whitespace-nowrap">{row.loanDate}</td>
              <td className="border border-gray-300 p-1 font-medium">{row.loanNo}</td>
              <td className="border border-gray-300 p-1 uppercase text-[10px]">{row.partyName}</td>
              <td className="border border-gray-300 p-1 text-right font-semibold">{parseFloat(row.amount).toFixed(2)}</td>
              <td className="border border-gray-300 p-1 text-right text-green-700">{parseFloat(row.loanAdj).toFixed(2)}</td>
              <td className="border border-gray-300 p-1 text-right">{parseFloat(row.charges).toFixed(2)}</td>
              <td className="border border-gray-300 p-1 text-right">{parseFloat(row.interest).toFixed(2)}</td>
              <td className="border border-gray-300 p-1 text-gray-600 italic">{row.receiptBy}</td>
              <td className="border border-gray-300 p-1 max-w-[150px] truncate" title={row.remarks}>{row.remarks || "-"}</td>
            </tr>
          ))
        )}
      </tbody> */}
                  <tbody className="bg-white">
                    {apiData.loanRepayment?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={14}
                          className="border border-gray-300 text-center py-6 text-gray-400 italic bg-gray-50"
                        >
                          No repayment records found for the selected date.
                        </td>
                      </tr>
                    ) : (
                      apiData.loanRepayment?.map((row, index) => {
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
                              RCP-{installment.id}
                            </td>

                            {/* Date */}
                            <td className="border p-1 text-center whitespace-nowrap">
                              {new Date(
                                installment.transactionDate,
                              ).toLocaleDateString()}
                            </td>

                            {/* Paymode */}
                            <td className="border p-1 capitalize">
                              {installment.paymentInfo?.mode || "-"}
                            </td>

                            {/* Scheme */}
                            <td className="border p-1">{loan.Scheme}</td>

                            {/* Loan Date */}
                            <td className="border p-1 text-center whitespace-nowrap">
                              {loan.Pay_Date}
                            </td>

                            {/* Loan No */}
                            <td className="border p-1 font-medium">
                              LN-{loan.id}
                            </td>

                            {/* Party Name */}
                            <td className="border p-1 uppercase text-[11px]">
                              {loan.Borrower}
                            </td>

                            {/* Amount */}
                            <td className="border p-1 text-right font-semibold">
                              {Number(installment.payAmount).toFixed(2)}
                            </td>

                            {/* Loan Adj */}
                            <td className="border p-1 text-right text-green-700">
                              {Number(installment.loanAmountPaid).toFixed(2)}
                            </td>

                            {/* Charges */}
                            <td className="border p-1 text-right">
                              {Number(installment.chargesAdjusted).toFixed(2)}
                            </td>

                            {/* Interest */}
                            <td className="border p-1 text-right">
                              {Number(installment.pendingInt).toFixed(2)}
                            </td>

                            {/* Receipt By */}
                            <td className="border p-1 text-gray-600 italic">
                              {installment.paymentInfo?.madeBy || "-"}
                            </td>

                            {/* Remarks */}
                            <td
                              className="border p-1 max-w-[150px] truncate"
                              title={installment.paymentInfo?.refNo}
                            >
                              {installment.paymentInfo?.refNo || "-"}
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
  <div className="p-2 overflow-x-auto border-b border-gray-100">
   
    <div className="text-[10px] font-bold text-gray-600 uppercase">
      Bhagur B1 [ 01 ]
    </div>
    <div className="text-[#8b4513] font-bold border-b border-gray-300 mb-1 text-[12px] pb-0.5">
      Receipt/Payment
    </div>

    <table className="w-full border-collapse border border-gray-400 text-[11px]">
      <thead>
        <tr className="bg-[#f2f2f2] text-gray-800">
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
  {new Date(row.docDate).toLocaleDateString("en-GB")}
</td>

              <td className="border border-gray-300 p-1 uppercase">{row.partyName || row.name}</td>
            
              <td className="border border-gray-300 p-1">{row.bankName || "-"}</td>
              <td className="border border-gray-300 p-1">{row.bankBranch || "-"}</td>
              <td className="border border-gray-300 p-1 text-right font-bold text-gray-900">
                {parseFloat(row.totalAmount || row.amount || 0).toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 italic text-gray-600 max-w-[150px] truncate" title={row.remarks || row.narration}>
                {row.remarks || row.narration || "-"}
              </td>
              <td className="border border-gray-300 p-1">Main Branch</td>
              <td className="border border-gray-300 p-1 text-[10px] text-gray-500">{row.createdBy || "Admin"}</td>
            </tr>
          ))
        )}
      </tbody>

      {/* 🔹 Financial Style Total Footer */}
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
  <div className="p-2 overflow-x-auto border-b border-gray-100">
    {/* Section Header */}
    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">
      Bhagur B1 [ 01 ]
    </div>
    <div className="text-[#8b4513] font-bold border-b border-gray-300 mb-1 text-[12px] pb-0.5">
      Journal Voucher
    </div>

    <table className="w-full border-collapse border border-gray-400 text-[11px]">
      <thead>
        <tr className="bg-[#f2f2f2] text-gray-800">
          <th className="border border-gray-400 p-1 font-bold text-center w-8">SNo</th>
          <th className="border border-gray-400 p-1 font-bold text-left">Doc No</th>
          <th className="border border-gray-400 p-1 font-bold text-center">Date</th>
          {/* <th className="border border-gray-400 p-1 font-bold text-left">Name</th> */}
          <th className="border border-gray-400 p-1 font-bold text-right text-red-800">Dr Amount</th>
          <th className="border border-gray-400 p-1 font-bold text-right text-green-800">Cr Amount</th>
          <th className="border border-gray-400 p-1 font-bold text-left">Narration</th>
          <th className="border border-gray-400 p-1 font-bold text-center">Sign</th>
          <th className="border border-gray-400 p-1 font-bold text-left">Branch</th>
          <th className="border border-gray-400 p-1 font-bold text-left">Created By</th>
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
              <td className="border border-gray-300 p-1 text-blue-900 font-medium">{row.doc_No || row.id}</td>
             <td className="border border-gray-300 p-1 text-center whitespace-nowrap">
  {new Date(row.doc_Date || row.voucherDate).toLocaleDateString("en-GB")}
</td>

              {/* <td className="border border-gray-300 p-1 uppercase font-medium">{row.party_Name || row.name || "-"}</td> */}
              <td className="border border-gray-300 p-1 text-right font-semibold">
                {parseFloat(row.dr_Amount || row.debitAmount || 0).toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 text-right font-semibold">
                {parseFloat(row.cr_Amount || row.creditAmount || 0).toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1 italic text-gray-600 max-w-[200px] truncate" title={row.narration}>
                {row.narration || "-"}
              </td>
              <td className="border border-gray-300 p-1 text-center text-gray-300 italic">______</td>
              <td className="border border-gray-300 p-1">{row.branch_Name || row.branch || "Main"}</td>
              <td className="border border-gray-300 p-1 text-[10px] text-gray-500 uppercase">{row.created_By || row.createdBy}</td>
            </tr>
          ))
        )}
      </tbody>

      {/* 🔹 Accounting Total Footer */}
      <tfoot>
        <tr className="bg-[#fff9e6] font-bold text-gray-900">
          <td colSpan={4} className="border border-gray-400 px-2 py-1 text-right text-[12px]">
            VOUCHER TOTAL:
          </td>
          <td className="border border-gray-400 px-2 py-1 text-right text-red-900">
            {calculateTotal(apiData.journalVoucher, "dr_Amount")}
          </td>
          <td className="border border-gray-400 px-2 py-1 text-right text-green-900">
            {calculateTotal(apiData.journalVoucher, "cr_Amount")}
          </td>
          <td colSpan={4} className="border border-gray-400 bg-gray-100"></td>
        </tr>
      </tfoot>
    </table>
  </div>
)}
      </div>
      <footer className="text-center text-[10px] text-gray-400 mt-4">
        © Copyright Maraekat Infotech Ltd, 2015. All rights reserved.
      </footer>
    </div>
  );
};

export default Day_Book;
