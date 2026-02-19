import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Customer_History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  console.log("Selected Customer:", selectedCustomer);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  console.log("Customer History Data:", historyData);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleGetHistory = async () => {
    if (!selectedCustomer?.id) {
      alert("Please select customer first");
      return;
    }

    try {
      setHistoryLoading(true);

      const res = await axios.get(
        `${API}/api/customer-history/customer/history/${selectedCustomer.id}`,
      );

      if (res.data.success) {
        setHistoryData(res.data.data);
        console.log("History Data:", res.data.data);
      }
    } catch (error) {
      console.error("❌ Error fetching history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(`${API}/Master/doc/Customer_list`, {
          params: { search: searchTerm },
        });

        setResults(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchCustomers();
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const emiPayments =
    historyData?.emiPayments?.filter((p) => p.loan_id === selectedLoan?.id) ||
    [];

  const normalPayments =
    historyData?.normalPayments?.filter((p) => p.loanId === selectedLoan?.id) ||
    [];

  const selectedCharges =
    historyData?.loanCharges?.filter(
      (c) => Number(c.loan_no) === Number(selectedLoan?.id),
    ) || [];
    console.log("Selected Charges for Loan", selectedLoan?.id, selectedCharges);
  return (
    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800 pb-10">
      <div className="flex justify-center my-5 px-4">
        <div className="flex items-center justify-between px-6 py-2 w-full max-w-[1290px] min-h-[70px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
              Customer Profile History
            </h2>
          </div>

          {/* 🔵 Right — Controls & Buttons */}
          <div className="flex items-center justify-end flex-grow gap-4">

            {/* Search Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedCustomer(null);
                  }}
                  className="border border-gray-300 px-3 py-1.5 w-64 outline-none focus:border-blue-500 rounded-md text-sm shadow-sm"
                  placeholder="Search customer..."
                />

                {/* Dropdown - Absolute position is key here */}
                {results.length > 0 && (
                  <div className="absolute z-50 w-full bg-white border border-gray-200 mt-1 shadow-lg max-h-60 overflow-y-auto rounded-md">
                    {results.map((cust, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-none"
                        onClick={() => {
                          setSelectedCustomer(cust);
                          setSearchTerm(cust.printName);
                          setResults([]);
                        }}
                      >
                        {cust.printName} <span className="text-gray-400 text-xs">({cust.id})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label className="text-gray-600 text-sm whitespace-nowrap">UID</label>
                <input
                  type="text"
                  value={selectedCustomer?.id || ""}
                  className="border border-gray-300 px-2 py-1.5 w-32 bg-gray-50 outline-none rounded-md text-sm text-gray-500 font-mono"
                  disabled
                />
              </div>
            </div>

            {/* Buttons Group */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleGetHistory}
                className="w-[75px] h-[30px] rounded bg-[#0A2478] text-white text-[10px] font-semibold hover:bg-[#071d45] transition-colors"
              >
                {historyLoading ? "LOADING..." : "GET HISTORY"}
              </button>

              <div className="flex gap-1">
                <button className="w-[75px] h-[30px] rounded bg-[#0A2478] text-white text-[10px] font-semibold hover:bg-[#071d45] transition-colors">
                  ALL PRINT
                </button>
                <button className="w-[75px] h-[30px] rounded bg-[#0A2478] text-white text-[10px] font-semibold hover:bg-[#071d45] transition-colors">
                  OPEN PRINT
                </button>
                <button className="w-[75px] h-[30px] rounded bg-[#0A2478] text-white text-[10px] font-semibold hover:bg-[#071d45] transition-colors">
                  CLOSE PRINT
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* 2. Main Content Container */}
      <div className="shadow-sm">
        {/* Title Bar with Print Options */}
       

       

        <div className=" space-y-6">
          {/* 3. Customer Details Section */}
          <div className="max-w-7xl mx-auto">
            <legend className="px-2 text-red-600 mb-2 font-bold text-sm">
              Customer Details
            </legend>

            <div className="flex gap-4">
              {/* LEFT CONTENT */}
              <div className="flex-1 text-[12px] space-y-3">

                {/* Row 1 */}
                <div className="grid grid-cols-6 gap-2">
                  {[
                    ["Customer Type", historyData?.customer?.partyType],
                    ["Risk Category", historyData?.customer?.riskCategory],
                    ["Gender", historyData?.customer?.gender],
                    ["Marital", historyData?.customer?.marital],
                    ["Mobile No.", historyData?.customer?.mobile],
                    [
                      "Date Of Birth",
                      historyData?.customer?.dob
                        ? historyData.customer.dob.split("T")[0]
                        : "",
                    ],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col">
                      <span className="text-gray-600 text-[11px] font-semibold">
                        {label}
                      </span>
                      <input
                        type="text"
                        value={value || ""}
                        disabled
                        className="h-7 border border-gray-300 bg-gray-100 px-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-6 gap-2">
                  {[
                    ["First Name", historyData?.customer?.firstName],
                    ["Middle Name", historyData?.customer?.middleName],
                    ["Last Name", historyData?.customer?.lastName],    
                    ["Father Name", historyData?.customer?.fatherFirstName],
                    ["City", historyData?.customer?.Permanent_City],
                    ["State", historyData?.customer?.Permanent_State],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col">
                      <span className="text-gray-600 text-[11px] font-semibold">
                        {label}
                      </span>
                      <input
                        type="text"
                        value={value || ""}
                        disabled
                        className="h-7 border border-gray-300 bg-gray-100 px-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Address Row */}
                <div className="flex gap-3 items-start">

                  {/* Address */}
                  <div className="flex flex-col flex-1">
                    <span className="text-gray-600 text-[11px] font-semibold">
                      Address
                    </span>
                    <textarea
                      value={historyData?.customer?.Permanent_Address || ""}
                      disabled
                      className="h-14 border border-gray-300 bg-gray-100 px-2 py-1 resize-none w-full"
                    />
                  </div>

                  {/* Country */}
                  <div className="flex flex-col w-44">
                    <span className="text-gray-600 text-[11px] font-semibold">
                      Country
                    </span>
                    <input
                      type="text"
                      value={historyData?.customer?.Permanent_Country || ""}
                      disabled
                      className="h-7 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="flex flex-col w-44">
                    <span className="text-gray-600 text-[11px] font-semibold">
                      Pincode
                    </span>
                    <input
                      type="text"
                      value={historyData?.customer?.Permanent_Pincode || ""}
                      disabled
                      className="h-7 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                </div>

              </div>

              {/* RIGHT IMAGE */}
              <div className="w-38 flex flex-col items-center justify-start my-4">
                {historyData?.customer?.profileImage ? (
                  <img
                    src={historyData.customer.profileImage}
                    alt="Profile"
                    className="w-20 h-28 object-cover border border-gray-300 rounded shadow-sm"
                  />
                ) : (
                  <div className="w-26 h-28 flex items-center justify-center border border-gray-300 bg-gray-100 text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* 4. Loans Details Table */}
          <div className=" mx-28 rounded-sm">
            <div className="px-2 text-red-600 font-bold text-sm">
              Loans Details
            </div>
            <div className="overflow-x-auto mt-2  max-w-8xl ">
              <table className="w-full text-[12px] border-collapse">
                <thead className="bg-[#0A2478] text-white text-sm">
                  <tr>
                    {[
                      "Loan Check",
                      "Loan No.",
                      "Loan Date",
                      "Ref. No.",
                      "Packet No.",
                      "Scheme Name",
                      "ROI",
                      "Gross Weight",
                      "Net Weight",
                      "Gold Value",
                      "Loan Amt.",
                      "Pay Mode",
                      "Pend. Amt.",
                      "Loan Close",
                      "", // Empty header for Buttons
                    ].map((h, i) => (
                      <th
                        key={i}
                        className="border-r border-gray-300 p-1.5 text-left font-semibold whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {historyData?.loans && historyData?.loans.length > 0 ? (
                    historyData?.loans.map((loan, index) => {
                      const payMode =
                        loan?.payments_Details?.[0]?.paidBy || "-";

                      let pledgeItems = [];
                      try {
                        pledgeItems = JSON.parse(loan.Pledge_Item_List || "[]");
                      } catch (error) {
                        pledgeItems = [];
                      }

                      const totalGross = pledgeItems.reduce(
                        (sum, item) => sum + Number(item.gross || 0),
                        0,
                      );
                      const totalNet = pledgeItems.reduce(
                        (sum, item) => sum + Number(item.netWeight || 0),
                        0,
                      );
                      const totalValuation = pledgeItems.reduce(
                        (sum, item) => sum + Number(item.valuation || 0),
                        0,
                      );

                      return (
                        <tr
                          key={loan.id}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="p-1.5 border-r border-gray-200 text-center">
                            <input
                              type="checkbox"
                              checked={selectedLoanId === loan.id}
                              onChange={() => {
                                if (selectedLoanId === loan.id) {
                                  // Unselect
                                  setSelectedLoanId(null);
                                  setSelectedLoan(null);
                                } else {
                                  // Select
                                  setSelectedLoanId(loan.id);
                                  setSelectedLoan(loan);
                                }
                              }}
                            />
                          </td>

                          <td className="p-1.5 border-r border-gray-200">
                            {loan.id}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {loan.created_at
                              ? new Date(loan.created_at).toLocaleDateString(
                                  "en-GB",
                                )
                              : "-"}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {loan.BorrowerId}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {loan.id}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {loan.Scheme}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {loan.LastInterestPaidPercentage || "-"}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {totalGross.toFixed(3)}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {totalNet.toFixed(3)}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {totalValuation.toFixed(2)}
                          </td>
                          <td className="p-1.5 border-r border-gray-200 font-medium">
                            {loan.Loan_amount}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {payMode}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {loan.LoanPendingAmount}
                          </td>
                          <td className="p-1.5 border-r border-gray-200">
                            {loan.status === "Closed" ? "Yes" : "No"}
                          </td>
                          {/* ACTION BUTTONS COLUMN */}
                          <td className="p-1 whitespace-nowrap">
                            <div className="flex gap-1 justify-center">
                              <button className="bg-[#0A2478] text-white px-2 py-0.5 rounded-sm transition-colors border border-blue-900 text-[10px]">
                                With Interest
                              </button>
                              <button className="bg-[#0A2478] text-white px-2 py-0.5 rounded-sm transition-colors border border-blue-900 text-[10px]">
                                Without Interest
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="14"
                        className="h-10 text-center text-gray-400"
                      >
                        No Loan Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Bottom History Grids (Ornament, Payment, Notice, Charges) */}
          <div className="grid grid-cols-2 mx-28 gap-4">
            {/* Ornament Details */}
            <div className="h-48 overflow-hidden flex flex-col">
              <div className="px-2 text-red-600 mb-2 font-bold text-sm">
                Ornament Details
              </div>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#0A2478] text-gray-50 border-b border-gray-300">
                    <tr>
                      {[
                        "Items",
                        "Qty",
                        "Gross Weight",
                        "Net Weight",
                        "Stone Weight",
                      ].map((h) => (
                        <th
                          key={h}
                          className="p-1 border-r border-gray-300 text-left"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLoan ? (
                      (() => {
                        let items = [];

                        try {
                          items = JSON.parse(
                            selectedLoan.Pledge_Item_List || "[]",
                          );
                        } catch (err) {
                          items = [];
                        }

                        if (items.length === 0) {
                          return (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center p-4 text-gray-400"
                              >
                                No Ornament Records
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <>
                            {items.map((item, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-200"
                              >
                                <td className="p-1 border-r border-gray-300">
                                  {item.particular || "-"}
                                </td>
                                <td className="p-1 border-r border-gray-300">
                                  {item.nos || "-"}
                                </td>
                                <td className="p-1 border-r border-gray-300">
                                  {item.gross || "-"}
                                </td>
                                <td className="p-1 border-r border-gray-300">
                                  {item.netWeight || "-"}
                                </td>
                                <td className="p-1">
                                  {item.gross && item.netWeight
                                    ? (
                                        Number(item.gross) -
                                        Number(item.netWeight)
                                      ).toFixed(3)
                                    : "-"}
                                </td>
                              </tr>
                            ))}

                            {/* TOTAL ROW */}
                            <tr className="bg-gray-100 font-semibold">
                              <td className="p-1 border-r border-gray-300">
                                Total
                              </td>
                              <td className="p-1 border-r border-gray-300"></td>
                              <td className="p-1 border-r border-gray-300">
                                {items
                                  .reduce(
                                    (sum, i) => sum + Number(i.gross || 0),
                                    0,
                                  )
                                  .toFixed(3)}
                              </td>
                              <td className="p-1 border-r border-gray-300">
                                {items
                                  .reduce(
                                    (sum, i) => sum + Number(i.netWeight || 0),
                                    0,
                                  )
                                  .toFixed(3)}
                              </td>
                              <td className="p-1">
                                {items
                                  .reduce(
                                    (sum, i) =>
                                      sum +
                                      (Number(i.gross || 0) -
                                        Number(i.netWeight || 0)),
                                    0,
                                  )
                                  .toFixed(3)}
                              </td>
                            </tr>
                          </>
                        );
                      })()
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-4 text-gray-400"
                        >
                          Select a Loan to View Ornaments
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment History */}
            <div className="h-48 overflow-hidden flex flex-col">
              <div className="px-2 mb-2 text-red-600 font-bold text-sm">
                Payment History
              </div>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#0A2478] text-gray-50 border-b border-gray-300">
                    <tr>
                      {[
                        "Date",
                        "Amount Paid",
                        "Interest Paid",
                        "Loan Amt. Paid",
                        "Paymode",
                      ].map((h) => (
                        <th
                          key={h}
                          className="p-1 border-r border-gray-300 text-left"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLoan ? (
                      <>
                        {/* EMI PAYMENTS */}
                        {emiPayments.map((payment) => (
                          <tr
                            key={`emi-${payment.id}`}
                            className="border-b border-gray-200"
                          >
                            <td className="p-1 border-r border-gray-300">
                              {new Date(payment.created_at).toLocaleDateString(
                                "en-GB",
                              )}
                            </td>
                            <td className="p-1 border-r border-gray-300">
                              {Number(payment.pay_amount).toFixed(2)}
                            </td>
                            <td className="p-1 border-r border-gray-300">
                              {Number(payment.interest_amount).toFixed(2)}
                            </td>
                            <td className="p-1 border-r border-gray-300">
                              {Number(payment.closing_balance).toFixed(2)}
                            </td>
                            <td className="p-1">
                              {payment.payment_mode || "-"}
                            </td>
                          </tr>
                        ))}

                        {/* NORMAL (DAILY INTEREST) PAYMENTS */}
                        {normalPayments.map((payment) => (
                          <tr
                            key={`normal-${payment.id}`}
                            className="border-b border-gray-200"
                          >
                            <td className="p-1 border-r border-gray-300">
                              {new Date(
                                payment.transaction_date,
                              ).toLocaleDateString("en-GB")}
                            </td>
                            <td className="p-1 border-r border-gray-300">
                              {Number(payment.payAmount).toFixed(2)}
                            </td>
                            <td className="p-1 border-r border-gray-300">
                              {Number(payment.pendingInt).toFixed(2)}
                            </td>
                            <td className="p-1 border-r border-gray-300">
                              {Number(payment.loanAmountPaid).toFixed(2)}
                            </td>
                            <td className="p-1">
                              {payment.paymentInfo?.mode || "-"}
                            </td>
                          </tr>
                        ))}

                        {emiPayments.length === 0 &&
                          normalPayments.length === 0 && (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center p-4 text-gray-400"
                              >
                                No Payment Records Found
                              </td>
                            </tr>
                          )}
                      </>
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-4 text-gray-400"
                        >
                          Select a Loan to View Payments
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notice History */}
            <div className="h-48 overflow-hidden flex flex-col">
              <div className="px-2 mb-2 text-red-600 font-bold text-sm">
                Notice History
              </div>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#0A2478] text-gray-50 border-b border-gray-300">
                    <tr>
                      {[
                        "Notice Date",
                        "Notice No.",
                        "Type",
                        "Send By",
                        "RefNo",
                      ].map((h) => (
                        <th
                          key={h}
                          className="p-1 border-r border-gray-300 text-left"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="5" className="h-20"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charges Details */}
            <div className="h-48 overflow-hidden flex flex-col">
              <div className="px-2 mb-2 text-red-600 font-bold text-sm">
                Charges Details
              </div>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#0A2478] text-gray-50 border-b border-gray-300">
                    <tr>
                      {["Date", "No.", "Charge", "Account", "Amount"].map(
                        (h) => (
                          <th
                            key={h}
                            className="p-1 border-r border-gray-300 text-left"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLoan ? (
                      selectedCharges.length > 0 ? (
                        selectedCharges.flatMap((charge) =>
                          Array.isArray(charge.charges_details)
                            ? charge.charges_details.map((detail, index) => (
                                <tr
                                  key={`${charge.id}-${index}`}
                                  className="border-b border-gray-200"
                                >
                                  <td className="p-1 border-r border-gray-300">
                                    {detail.date || "-"}
                                  </td>

                                  <td className="p-1 border-r border-gray-300">
                                    {charge.loan_no}
                                  </td>

                                  <td className="p-1 border-r border-gray-300">
                                    {detail.charges || "-"}
                                  </td>

                                  <td className="p-1 border-r border-gray-300">
                                    {detail.account || "-"}
                                  </td>

                                  <td className="p-1">
                                    {Number(detail.netPayable || 0).toFixed(2)}
                                  </td>
                                </tr>
                              ))
                            : [],
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center p-4 text-gray-400"
                          >
                            No Charges Found
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-4 text-gray-400"
                        >
                          Select a Loan to View Charges
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 w-full bg-[#005a9c] text-white text-center py-1 text-[10px]">
        © Copyright Maraekat Infotech Ltd, 2015. All rights reserved
      </footer>
    </div>
  );
};

export default Customer_History;
