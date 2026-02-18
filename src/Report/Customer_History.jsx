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
      {/* 2. Main Content Container */}
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        {/* Title Bar with Print Options */}
        <div className="bg-[#1a8a81] text-white px-3 py-1 flex justify-between items-center font-semibold text-sm">
          <span>Customer Profile History</span>
          <div className="flex gap-1">
            <button className="bg-[#005a9c] hover:bg-blue-700 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 border border-blue-300">
              🖨️ All Print
            </button>
            <button className="bg-[#005a9c] hover:bg-blue-700 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 border border-blue-300">
              🖨️ Open Print
            </button>
            <button className="bg-[#005a9c] hover:bg-blue-700 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 border border-blue-300">
              🖨️ Close Print
            </button>
          </div>
        </div>

        {/* Search Header */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedCustomer(null);
              }}
              className="border border-gray-300 px-2 py-1 w-64 outline-none focus:border-blue-500 shadow-sm"
              placeholder="Search customer..."
            />

            {/* Dropdown */}
            {results.map((cust, index) => (
              <div
                key={index}
                className="px-2 py-1 hover:bg-blue-100 cursor-pointer text-sm"
                onClick={() => {
                  setSelectedCustomer(cust);
                  setSearchTerm(cust.printName);
                  setResults([]);
                }}
              >
                {cust.printName} ({cust.id})
              </div>
            ))}
          </div>

          <label className="text-gray-700 ml-4">Customer UID</label>
          <input
            type="text"
            value={selectedCustomer?.id || ""}
            className="border border-gray-300 px-2 py-1 w-48 bg-[#f2f2f2] outline-none"
            disabled
          />

          <button
            onClick={handleGetHistory}
            className="bg-[#005a9c] text-white px-4 py-1 rounded shadow hover:bg-blue-700 font-bold transition-colors"
          >
            {historyLoading ? "Loading..." : "Get History"}
          </button>
        </div>

        <div className="p-3 space-y-6">
          {/* 3. Customer Details Section */}
          <fieldset className="border border-gray-300 p-4 rounded-sm">
            <legend className="px-2 text-[#1a8a81] font-bold text-sm">
              Customer Details
            </legend>
            <div className="flex justify-between gap-6">
              <div className="text-[12px] space-y-3">
                {/* ROW 1 */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-1">
                    <span className="w-28 text-right">Customer Type :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.partyType || ""}
                      disabled
                      className="w-28 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-28 text-right">Risk Category :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.riskCategory || ""}
                      disabled
                      className="w-28 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-20 text-right">Gender :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.gender || ""}
                      disabled
                      className="w-20 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-20 text-right">Marital :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.marital || ""}
                      disabled
                      className="w-20 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>
                </div>

                {/* ROW 2 */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-1">
                    <span className="w-20 text-right">First Name :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.firstName || ""}
                      disabled
                      className="w-28 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-24 text-right">Middle Name :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.middleName || ""}
                      disabled
                      className="w-28 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-20 text-right">Last Name :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.lastName || ""}
                      disabled
                      className="w-28 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-20 text-right">Date Of Birth :</span>
                    <input
                      type="text"
                      value={
                        historyData?.customer?.dob
                          ? historyData.customer.dob.split("T")[0]
                          : ""
                      }
                      disabled
                      className="w-24 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>
                </div>

                {/* ROW 3 */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-1">
                    <span className="w-24 text-right">Father Name :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.fatherFirstName || ""}
                      disabled
                      className="w-40 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-20 text-right">Mobile No. :</span>
                    <input
                      type="text"
                      value={historyData?.customer?.mobile || ""}
                      disabled
                      className="w-32 h-6 border border-gray-300 bg-gray-100 px-1"
                    />
                  </div>
                </div>

                {/* ADDRESS ROW */}
                <div className="flex items-start gap-4">
                  <span className="w-24 text-right mt-1">Address :</span>

                  <textarea
                    value={historyData?.customer?.Permanent_Address || ""}
                    disabled
                    className="w-[500px] h-14 border border-gray-300 bg-gray-100 px-2 py-1 resize-none"
                  />
                </div>

                {/* CITY STATE COUNTRY PIN */}
                <div className="flex items-center gap-10 pl-24">
                  <span>
                    City <b>{historyData?.customer?.Permanent_City || ""}</b>
                  </span>

                  <span>
                    State <b>{historyData?.customer?.Permanent_State || ""}</b>
                  </span>

                  <span>
                    Country{" "}
                    <b>{historyData?.customer?.Permanent_Country || ""}</b>
                  </span>

                  <span>
                    Pincode{" "}
                    <b>{historyData?.customer?.Permanent_Pincode || ""}</b>
                  </span>
                </div>
              </div>
              <div className="w-32 flex flex-col items-center">
                {historyData?.customer?.profileImage ? (
                  <img
                    src={historyData.customer.profileImage}
                    alt="Profile"
                    className="w-28 h-28 object-cover border border-gray-300 rounded-md shadow-sm"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center border border-gray-300 bg-gray-100 text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          {/* 4. Loans Details Table */}
          <fieldset className="border border-gray-200 p-2 rounded-sm">
            <legend className="px-2 text-[#1a8a81] font-bold text-sm">
              Loans Details
            </legend>
            <div className="overflow-x-auto max-h-40 border border-gray-300">
              <table className="w-full text-[11px] border-collapse">
                <thead className="bg-[#eeeae3] sticky top-0 border-b border-gray-300">
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
                              <button className="bg-[#005a9c] text-white px-2 py-0.5 rounded-sm hover:bg-blue-800 transition-colors border border-blue-900 text-[10px]">
                                With Interest
                              </button>
                              <button className="bg-[#005a9c] text-white px-2 py-0.5 rounded-sm hover:bg-blue-800 transition-colors border border-blue-900 text-[10px]">
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
          </fieldset>
          {/* 5. Bottom History Grids (Ornament, Payment, Notice, Charges) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Ornament Details */}
            <fieldset className="border border-gray-200 p-2 h-48 overflow-hidden flex flex-col">
              <legend className="px-2 text-[#1a8a81] font-bold text-sm">
                Ornament Details
              </legend>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#eeeae3] border-b border-gray-300">
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
            </fieldset>

            {/* Payment History */}
            <fieldset className="border border-gray-200 p-2 h-48 overflow-hidden flex flex-col">
              <legend className="px-2 text-[#1a8a81] font-bold text-sm">
                Payment History
              </legend>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#eeeae3] border-b border-gray-300">
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
            </fieldset>

            {/* Notice History */}
            <fieldset className="border border-gray-200 p-2 h-48 overflow-hidden flex flex-col">
              <legend className="px-2 text-[#1a8a81] font-bold text-sm">
                Notice History
              </legend>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#eeeae3] border-b border-gray-300">
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
            </fieldset>

            {/* Charges Details */}
            <fieldset className="border border-gray-200 p-2 h-48 overflow-hidden flex flex-col">
              <legend className="px-2 text-[#1a8a81] font-bold text-sm">
                Charges Details
              </legend>
              <div className="overflow-y-auto flex-1 border border-gray-300">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#eeeae3] border-b border-gray-300">
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
            </fieldset>
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
