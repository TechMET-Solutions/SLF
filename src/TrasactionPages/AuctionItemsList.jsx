import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import PendingInvoice from "../assets/PendingInvoice.png";
import genrateinvoice from "../assets/genrateinvoice.png";
import payment from "../assets/payment.png";
function AuctionItemsList() {
  useEffect(() => {
    document.title = "SLF | Auction Creation";
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const { loanIds,AuctionData } = location.state || {};
console.log(AuctionData,"AuctionData")
  const [data, setData] = useState([]);
  const [dataWithBidderCost, setDataWithBidderCost] = useState([]);
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    console.log(selectedLoan,"selecetdloans")
const [paymentHistory, setPaymentHistory] = useState([]);
const [loadingPayments, setLoadingPayments] = useState(false);

const [paymentData, setPaymentData] = useState({
  payment_date: "",
  due_amount: "",
  paid_amount: "",
  payment_method: "",
  utr_number: "",
});

    useEffect(() => {
  if (isPaymentModalOpen) {
    fetchPaymentHistory();
  }
}, [isPaymentModalOpen]);
const fetchPaymentHistory = async () => {
  try {
    setLoadingPayments(true);

    const loanId = selectedLoan.id;
    const bidderId = selectedLoan.BidderId;

    const res = await axios.get(`${API}/Auction/Bidder-PaymentHistory`, {
      params: { loan_id: loanId, bidder_id: bidderId }
    });

    if (res.data.status) {

      const history = res.data.payments;
      const totalBidAmount = selectedLoan.BidderCloseAmt;

      let totalPaid = res.data.total_paid || 0;
      let dueAmount = 0;

      // ---------------------------
      // CASE 1: No payments done yet
      // ---------------------------
      if (history.length === 0 || totalPaid === 0) {
        dueAmount = totalBidAmount;
      }

      // ---------------------------
      // CASE 2: Payments exist
      // ---------------------------
      else {
        dueAmount = totalBidAmount - totalPaid;
      }

      // Update table
      setPaymentHistory(history);

      // Update due amount in form
      setPaymentData((prev) => ({
        ...prev,
        due_amount: dueAmount
      }));
    }

  } catch (err) {
    console.error("Error fetching payment history:", err);
  } finally {
    setLoadingPayments(false);
  }
};
const handleAddPayment = async () => {
  try {
    const dueAmount = Number(paymentData.due_amount);
    const payAmount = Number(paymentData.paid_amount);

    // =============================
    // VALIDATION: AMOUNT MUST BE <= DUE
    // =============================
    if (!payAmount || payAmount <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    if (payAmount > dueAmount) {
      alert(`Amount cannot be more than due amount (₹${dueAmount})`);
      return;
    }

    if (!paymentData.payment_date) {
      alert("Please select a payment date");
      return;
    }

    if (!paymentData.payment_method) {
      alert("Please select payment method");
      return;
    }

    if (paymentData.payment_method !== "Cash" && !paymentData.utr_number) {
      alert("UTR / Transaction No is required for online methods");
      return;
    }

    // =============================
    // PAYLOAD
    // =============================
    const payload = {
      loan_id: selectedLoan.id,
      invoice_id: selectedLoan.bill_details.id,
      bidder_id: selectedLoan.BidderId,
      total_bid_amount: selectedLoan.BidderCloseAmt,
      payment_date: paymentData.payment_date,
      paid_amount: payAmount,
      payment_method: paymentData.payment_method,
      utr_number: paymentData.payment_method === "Cash" ? null : paymentData.utr_number
    };

    const res = await axios.post(`${API}/Auction/Bidder-Payment`, payload);

    if (res.data.status) {
      alert("Payment added successfully!");

      // Reset ONLY payment fields
      setPaymentData((prev) => ({
        ...prev,
        payment_date: "",
        paid_amount: "",
        payment_method: "",
        utr_number: "",
        due_amount: res.data.pending_amount // updated due amount
      }));

      // Refresh table
      await fetchPaymentHistory();
    }

  } catch (error) {
    console.error("Add Payment Error:", error);
    alert("Error adding payment");
  }
};



  // 🔹 Update bidder amount for a specific row
  const handleBidderCostChange = (itemId, value) => {
    setDataWithBidderCost((prev) =>
      prev.map((row) =>
        row.id === itemId ? { ...row, biddingCloseAmount: value } : row
      )
    );
  };
const handleChange = (e) => {
  setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
};

  // 🔹 Fetch Loan Details
  useEffect(() => {
    if (loanIds && loanIds.length > 0) {
      const idsString = loanIds.join(",");

      fetch(
        `${API}/Transactions/loan-applications/by-ids?ids=${idsString}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result.loans || []);
          setDataWithBidderCost(
            result.loans.map((l) => ({
              ...l,
              biddingCloseAmount: "",
            }))
          );
        });
    }
  }, [loanIds]);


    const safeParsePledgeList = (value) => {
  try {
    if (!value) return [];

    // Already array
    if (Array.isArray(value)) return value;

    // Already object → not valid list, return empty
    if (typeof value === "object") return [];

    // If MySQL gives "[object Object]"
    if (value === "[object Object]") return [];

    // First parse
    const first = JSON.parse(value);

    // If that gives array → DONE
    if (Array.isArray(first)) return first;

    // If that gives JSON string → second parse
    if (typeof first === "string") {
      try {
        const second = JSON.parse(first);
        return Array.isArray(second) ? second : [];
      } catch {
        return [];
      }
    }

    return [];
  } catch {
    return [];
  }
};

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Auction Items List</h2>

          <div className="flex gap-3">
            <button
  onClick={() =>
    navigate("/Auction_Bidder_List", {
      state: {
        auctionId: AuctionData?.id,
        AuctionData: AuctionData,
      }
    })
  }
  className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
>
  Bidder List
</button>

            <button
              onClick={() => navigate("/Auction-Creation")}
              className="bg-[#C1121F] text-white text-sm rounded px-4 py-2 cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-6 w-[1300px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:border-r">
                <th>Loan No.</th>
                <th>Item Name</th>
                <th>Gross Weight</th>
                <th>Net Weight</th>
                <th>Amount</th>
                <th>Outstanding Amt</th>
                <th>Valuation Gold Rate</th>
                <th>Bid Closing Amt</th>
                <th>Assign Bidder</th>
                <th>Invoice</th>
                <th>Payment</th>
                <th>Remark</th>
              </tr>
            </thead>

            <tbody className="text-[13px] divide-y">
              {dataWithBidderCost?.map((item) => {
                let list = [];

                // 🟢 Safe JSON Parsing
                try {
                  list = safeParsePledgeList(item.Pledge_Item_List);
                } catch (err) {
                  console.log("JSON Error:", err);
                }

                const itemName = list[0]?.particular || "-";
                const gross = list.reduce(
                  (sum, x) => sum + Number(x.gross || 0),
                  0
                );
                const net = list.reduce(
                  (sum, x) => sum + Number(x.netWeight || 0),
                  0
                );
                const valuation = list.reduce(
                  (sum, x) => sum + Number(x.valuation || 0),
                  0
                );

                return (
                  <tr key={item.id} className="[&>td]:px-4 [&>td]:py-3">
                    <td>{item.id}</td>
                    <td>{itemName}</td>
                    <td>{gross}</td>
                    <td>{net}</td>
                    <td>{item.Loan_amount}</td>
                    <td>{item.LoanPendingAmount}</td>
                    <td>{valuation}</td>

                    {/* ⭐ Bidding Close Amount Input */}
                   <td className=" ">
  {item.BidderCloseAmt ? (
    <span className="font-medium">{item.BidderCloseAmt}</span>
  ) : (
    <span className="text-gray-500">---</span>
  )}
</td>



                    {/* You can fill these later */}
                        <td>{item.AssignBidderName ? item.AssignBidderName : "---"}</td>

                 <td>
  {item.AuctionStatus === 0 ? (
    // Show Pending Invoice (Auction not closed yet)
    <img
      src={PendingInvoice}
      alt="Pending Invoice"
      className="w-6 h-6 cursor-pointer"
                                    onClick={() => {
          
        navigate("/Generate_Bill", {
          state: {
                loanData: item,
              loanIds:loanIds,
            AuctionData: AuctionData,
          }
        });
      }}
    />
  ) : item.AuctionStatus === 1 ? (
    // Show Generate Invoice (Auction completed)
    <img
      src={genrateinvoice}
      alt="Generate Invoice"
      className="w-6 h-6 cursor-pointer"
      onClick={() => {
        navigate("/InvoicePrint", {
          state: {
                loanData: item,
              loanIds:loanIds,
            AuctionData: AuctionData,
          }
        });
      }}
    />
  ) : (
    "-"   // fallback
  )}
</td>

  <td>
  {item.AuctionStatus === 0 ? (
    // Show Pending Invoice (Auction not closed yet)
   <p>---</p>
  ) : item.AuctionStatus === 1 ? (
    // Show Generate Invoice (Auction completed)
    <img
      src={payment}
      alt="Generate Invoice"
      className="w-6 h-6 cursor-pointer"
      onClick={() => {
  setSelectedLoan(item);
  setIsPaymentModalOpen(true);
}}

    />
  ) : (
    "-"   // fallback
  )}
</td>

<td>--</td>
                     
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Debug */}
          {/* <pre>{JSON.stringify(dataWithBidderCost, null, 2)}</pre> */}
        </div>
          </div>
          
          {isPaymentModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                style={{
                  background: "#0101017A",
                  backdropFilter: "blur(6.8px)",
                }}>

    <div className="bg-white w-[966px] rounded-lg shadow-lg p-6 relative h-[642px]">

      {/* Close Button */}
      <button
        className="absolute right-4 top-4 text-gray-600 hover:text-black text-2xl"
        onClick={() => setIsPaymentModalOpen(false)}
      >
        ✕
      </button>

      {/* Heading */}
      <h2 className="text-[20px] font-semibold text-[#0A2478] mb-4">
                          Payment History: Loan No:-{ selectedLoan.id} / Invoice No:- {selectedLoan.bill_details.id} : Total Bid Amount: ₹{selectedLoan.BidderCloseAmt}
        <span className="font-bold "> ₹{selectedLoan?.TotalBidAmount}</span>
      </h2>

      {/* Input Fields */}
      <div className="grid grid-cols-4 gap-4">

        <div>
          <label>Date*</label>
         <input
  type="date"
  name="payment_date"
  value={paymentData.payment_date}
  onChange={handleChange}
  className="border w-full px-2 py-1 rounded mt-2"
/>
        </div>

        <div>
          <label>Due Amount*</label>
         <input
  type="number"
  name="due_amount"
  value={paymentData.due_amount}
  onChange={handleChange}
  placeholder="₹ 20000"
  className="border w-full px-2 py-1 rounded mt-2"
/>
        </div>

        <div>
          <label>Amount*</label>
          <input
  type="number"
  name="paid_amount"
  value={paymentData.paid_amount}
  onChange={handleChange}
  placeholder="₹ 50000"
  className="border w-full px-2 py-1 rounded mt-2"
/>
        </div>

        <div>
          <label>Payment Method*</label>
         <select
  name="payment_method"
  value={paymentData.payment_method}
  onChange={handleChange}
  className="border w-full px-2 py-1 rounded mt-2"
>
  <option value="">Select</option>
  <option value="Cash">Cash</option>
  <option value="UPI">UPI</option>
  <option value="NetBanking">NetBanking</option>
</select>
        </div>

        <div>
          <label>UTR / Transaction No*</label>
         <input
  type="text"
  name="utr_number"
  value={paymentData.utr_number}
  onChange={handleChange}
  placeholder="UTR / Transaction No"
  className={`border w-full px-2 py-1 rounded mt-2 ${
    paymentData.payment_method === "Cash" ? "opacity-50" : ""
  }`}
  disabled={paymentData.payment_method === "Cash"}
/>
        </div>

                          
     <button
  onClick={handleAddPayment}
  className="bg-[#0A2478] text-white mt-7.5 rounded w-[86px] h-[38px]"
>
  Add
</button>
                          
      </div>

     

      {/* Table */}
      <div className="mt-10">
        <table className="w-full border">
          <thead>
            <tr className="bg-[#0A2478] text-white">
              <th className="p-2">Sr No.</th>
              <th className="p-2">Payment Date</th>
              <th className="p-2">Paid Amount</th>
              <th className="p-2">Pending Amount</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">UTR/Transaction No.</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

        <tbody>
  {paymentHistory.length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center p-3 text-gray-500">
        No Payment History Available
      </td>
    </tr>
  ) : (
    paymentHistory.map((item, index) => (
      <tr key={item.id} className="text-center border">
        <td className="p-2">{index + 1}</td>
        <td className="p-2">{item.payment_date}</td>
        <td className="p-2">₹ {item.paid_amount}</td>
        <td className="p-2">₹ {item.due_amount}</td>
        <td className="p-2">{item.payment_method}</td>
        <td className="p-2">{item.utr_number || "---"}</td>
        <td className="p-2">{item.status}</td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default AuctionItemsList;
