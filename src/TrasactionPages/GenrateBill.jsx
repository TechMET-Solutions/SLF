import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function GenerateBill() {
  const location = useLocation();
  const { loanData, AuctionData } = location.state || {};
console.log(loanData, "loanData")
 console.log(AuctionData,"AuctionData")
  // 🔹 Store all fields in one object (NOT removing any field)
const [formData, setFormData] = useState({
  invoiceDate: "",
  loanNo: "",
  auctionDate: "",
  bidderId: "",
  bidderName: "",
  bidderContact: "",
  bidderEmail: "",
  bidderAddress: "",
  paymentMethod: "UPI",
  utrNumber: "",
  paymentDate: "",
  creditNoteId: "",
  adjustmentAmount: "",
  biddingCloseAmount: loanData?.biddingCloseAmount || "", // ⭐ Add this
});


  // 🔹 Ornaments from loan data
  const [pledgeItems, setPledgeItems] = useState([]);

  // 🔹 Calculation summary
  const [summary, setSummary] = useState({
    subtotal: 0,
    auctionFee: 0,
    cgst: 0,
    sgst: 0,
    total: 0,
  });
const [suggestions, setSuggestions] = useState([]);
const [activeCredit, setActiveCredit] = useState(null);

    
    
  const fetchActiveCredit = async (bidderId) => {
  if (!bidderId) return;

  // Convert to number
  const numericBidderId = Number(bidderId);

  try {
    const res = await fetch(
      `http://localhost:5000/Auction/Application/GetActive/${numericBidderId}`
    );

    const data = await res.json();

    if (data.status) {
      setActiveCredit(data.data);
    } else {
      setActiveCredit(null);
    }
  } catch (err) {
    console.error("Error fetching credit note:", err);
  }
};


   useEffect(() => {
  if (formData.bidderId) {
    fetchActiveCredit(formData.bidderId);
  }
}, [formData.bidderId]);

const onChangeForbidders = async (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (name === "bidderName" && value.length >= 1) {
    try {
      const res = await fetch(`http://localhost:5000/Auction/bidders/search?q=${value}`);
      const data = await res.json();
        setSuggestions(data.bidders || []); 
    } catch (err) {
      console.error(err);
    }
  } else {
    setSuggestions([]);
  }
};

useEffect(() => {
  if (loanData) {
    // Parse ornaments
    let parsedItems = [];
    try {
      parsedItems = loanData.Pledge_Item_List
        ? JSON.parse(JSON.parse(loanData.Pledge_Item_List))
        : [];
    } catch (error) {
      parsedItems = [];
    }
    setPledgeItems(parsedItems);

    // Auto-fill fields
    setFormData((prev) => ({
      ...prev,
      invoiceDate: new Date().toISOString().split("T")[0],
      loanNo: loanData.id,
      auctionDate: AuctionData?.date?.split("T")[0] || "",
    }));
  }

  // ⭐ Summary Calculation Section
  if (AuctionData) {
    const subtotal = Number(formData.biddingCloseAmount || 0);
    const auctionFee = Number(AuctionData.fees || 0);
    const creditNote = Number(formData.adjustmentAmount || 0); // NEW ✔

    const cgst = subtotal * 0.015; // 1.5%
    const sgst = subtotal * 0.015; // 1.5%

    // ⭐ Correct Total Payable Calculation
    const total =
      subtotal +
      auctionFee +
      cgst +
      sgst -
      creditNote;

    setSummary({
      subtotal,
      auctionFee,
      cgst,
      sgst,
      creditNote,
      total,
    });
  }
}, [loanData, AuctionData, formData.biddingCloseAmount, formData.adjustmentAmount]);



  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Credit Note affects total
    if (name === "adjustmentAmount") {
      const credit = Number(value || 0);
      const newTotal =
        summary.subtotal +
        summary.auctionFee +
        summary.cgst +
        summary.sgst -
        credit;

      setSummary((prev) => ({ ...prev, total: newTotal }));
    }
  };

  // Submit
 const handleSubmit = async () => {
    try {
        const payload = {
            formData,
            pledgeItems,
            summary
        };

        const response = await axios.post(
            "http://localhost:5000/generate-bill/create-bill",
            payload
        );

        if (response.data.status) {
            alert("Bill Generated Successfully!");
        } else {
            alert("Failed to generate bill");
        }

    } catch (error) {
        console.log("Error submitting bill:", error);
        alert("Something went wrong");
    }
};

const handleBidderCostChange = (value) => {
  setLoanData((prev) => ({
    ...prev,
    biddingCloseAmount: value,
  }));
};

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Generate Bill</h2>

          <div className="flex gap-3">
            <button
              className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </button>

            <button className="bg-[#C1121F] text-white text-sm rounded px-4 py-1 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-[#ECECF6] mt-2 p-10">
        <h2 className="text-lg font-semibold text-[#0A2478] mb-4">
          Invoice Details
        </h2>

        <div className="flex gap-10">
          <div>
            <p className="font-medium">Date of Invoice</p>
            <input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              className="w-[198px] h-[38px] p-2 border rounded-md bg-white"
            />
          </div>

          <div>
            <p className="font-medium">Loan No.</p>
            <input
              type="text"
              name="loanNo"
              value={formData.loanNo}
              onChange={handleChange}
              className="w-[207px] h-[38px] p-2 border rounded-md bg-white"
              placeholder="00000000000"
            />
          </div>

          <div>
            <p className="font-medium">Auction Date</p>
            <input
              type="date"
              name="auctionDate"
              value={formData.auctionDate}
              onChange={handleChange}
              className="w-[178px] p-2 border rounded-md bg-white"
            />
          </div>
        </div>
      </div>

      {/* Bidder Details */}
      <div className="bg-red-50 p-10">
        <h2 className="text-lg font-semibold text-[#0A2478] mb-4">
          Bidder Details
        </h2>

              <div className="flex gap-5">
                  
                  <div className="">
  <p className="font-medium">Name</p>

  <input
    type="text"
    name="bidderName"
    value={formData.bidderName}
    onChange={onChangeForbidders}
    className="w-[220px] p-2 border rounded-md bg-white"
    placeholder="Name"
    autoComplete="off"
  />

  {/* Suggestion Dropdown */}
  {suggestions.length > 0 && (
    <ul className="absolute bg-white border w-full rounded shadow-md max-h-40 overflow-y-auto z-50">
      {suggestions.map((item) => (
        <li
          key={item.id}
          className="px-3 py-2 cursor-pointer hover:bg-blue-100"
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              bidderId: item.id,
              bidderName: item.bidder_name,
              bidderContact: item.mobile_no,
              bidderEmail: item.email || "",
              bidderAddress: item.shop_address || "",
            }));
             
            setSuggestions([]);
          }}
        >
          {item.bidder_name}
        </li>
      ))}
    </ul>
  )}
</div>

                  
          <div>
            <label className="font-medium">Bidder ID</label>
            <input
              type="text"
              name="bidderId"
              value={formData.bidderId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="Bidder ID"
            />
          </div>

         

          <div>
            <label className="font-medium">Contact No</label>
            <input
              type="text"
              name="bidderContact"
              value={formData.bidderContact}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="0000000000"
            />
          </div>

          <div>
            <label className="font-medium">Email ID</label>
            <input
              type="email"
              name="bidderEmail"
              value={formData.bidderEmail}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="abc@gmail.com"
            />
          </div>

          <div>
            <label className="font-medium">Address</label>
            <input
              type="text"
              name="bidderAddress"
              value={formData.bidderAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="Address"
            />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-[#ECECF6] p-10">
        <h2 className="text-lg font-semibold text-[#0A2478] mb-4">
          Payment Details
        </h2>

        <div className="flex gap-10">
          <div>
            <p className="font-medium">Payment Method</p>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-[202px] p-2 border rounded-md bg-white"
            >
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          {formData.paymentMethod !== "Cash" && (
            <div>
              <p className="font-medium">UTR Number</p>
              <input
                type="text"
                name="utrNumber"
                value={formData.utrNumber}
                onChange={handleChange}
                className="w-[263px] p-2 border rounded-md bg-white"
                placeholder="UTR Number"
              />
            </div>
          )}

          <div>
            <p className="font-medium">Payment Date</p>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className="w-[263px] p-2 border rounded-md bg-white"
            />
          </div>
        </div>
      </div>

      {/* EMD Credit Note */}
      <div className="bg-red-50 p-10">
        <h2 className="text-lg font-semibold text-[#0A2478] mb-4">
          EMD Credit Note Amount
        </h2>

       <div className="flex items-end gap-10 w-full">

  {/* Credit Note Dropdown */}
  <div className="flex flex-col">
    <label className="font-medium mb-1">Credit Note ID</label>
    <select
      name="creditNoteId"
      value={formData.creditNoteId}
      onChange={(e) => {
        const selectedId = e.target.value;

        const selectedCredit = activeCredit?.find(
          (c) => c.credit_note_id === selectedId
        );

        setFormData((prev) => ({
          ...prev,
          creditNoteId: selectedId,
          adjustmentAmount: selectedCredit ? selectedCredit.credit_amount : "",
        }));

        if (selectedCredit) {
          const credit = Number(selectedCredit.credit_amount);
          const newTotal =
            summary.subtotal +
            summary.auctionFee +
            summary.cgst +
            summary.sgst -
            credit;

          setSummary((prev) => ({ ...prev, total: newTotal }));
        }
      }}
      className="w-[300px] p-2 border rounded-md bg-white h-[50px]"
    >
      <option value="">Select Credit Note</option>
      {activeCredit?.map((item) => (
        <option key={item.id} value={item.credit_note_id}>
          {item.credit_note_id} — ₹ {item.credit_amount}
        </option>
      ))}
    </select>
  </div>

  {/* Adjustment Amount */}
  <div className="flex flex-col">
    <label className="font-medium mb-1">Adjustment Amount</label>
    <input
      type="number"
      name="adjustmentAmount"
      disabled
      value={formData.adjustmentAmount}
      onChange={handleChange}
      className="w-[250px] p-2 border rounded-md bg-white h-[50px]"
      placeholder="₹ 500.00"
    />
  </div>

</div>

      </div>

      {/* Gold Table */}
      <div className="bg-white p-5">
        <h2 className="text-lg font-semibold text-[#0A2478] mb-4">
          Gold Purchase Details
        </h2>

        <table className="w-full border text-sm">
          <thead className="bg-[#0A2478] text-white">
            <tr>
              <th className="p-2 border">Sr. No</th>
              <th className="p-2 border">Product Desc</th>
              <th className="p-2 border">Gross Weight</th>
              <th className="p-2 border">Net Weight</th>
              <th className="p-2 border">Purity</th>
              <th className="p-2 border">Rate/gram</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>

          <tbody>
            {pledgeItems.length > 0 ? (
              pledgeItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{item.particular}</td>
                  <td className="p-2 border text-right">{item.gross}</td>
                  <td className="p-2 border text-right">{item.netWeight}</td>
                  <td className="p-2 border text-center">{item.purity}</td>
                  <td className="p-2 border text-right">
  {Number(item.rate).toFixed(2)}
</td>
<input
  type="number"
  value={formData.biddingCloseAmount}
  onChange={(e) => {
    const value = Number(e.target.value);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      biddingCloseAmount: value,
    }));

    // Update subtotal immediately when bidding close amount changes
    setSummary((prev) => ({
      ...prev,
      subtotal: value,      // 👈 Add the entered amount into subtotal
      total: value + prev.auctionFee + prev.cgst + prev.sgst, // auto-calculate total
    }));
  }}
  className="border px-2 py-1 rounded w-[120px] text-right"
  placeholder="Enter Amount"
/>



                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No Gold Items Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
          </div>
          
            <div className="flex justify-end mt-6 p-10">
          <div className="w-80 bg-white shadow-md p-4 rounded-xl border text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span> <span>₹ {summary.subtotal}</span>
            </p>

            <p className="flex justify-between">
              <span>Auction Fee</span> <span>₹ {summary.auctionFee}</span>
            </p>

            <p className="flex justify-between">
              <span>CGST 1.5%</span> <span>₹ {summary.cgst.toFixed(2)}</span>
            </p>

            <p className="flex justify-between">
              <span>SGST 1.5%</span> <span>₹ {summary.sgst.toFixed(2)}</span>
            </p>

            <p className="flex justify-between">
              <span>Credit Note</span> <span className="text-red-500">- ₹ {formData.adjustmentAmount}</span>
            </p>

            <hr className="my-2" />

            <p className="flex justify-between font-semibold text-[#0A2478] text-base">
              <span>Total Payable</span>
              <span>₹ {summary.total.toFixed(2)}</span>
            </p>
          </div>
        </div>
    </div>
  );
}
