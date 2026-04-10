import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { formatIndianDate } from "../utils/Helpers";

export default function GenerateBill() {
  const location = useLocation();
  const { loanData, loanIds, AuctionData } = location.state || {};
  console.log(loanData, "loanData");
  console.log(AuctionData, "AuctionData");
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docChargeAmount, setDocChargeAmount] = useState("");
  const [docChargeDesc, setDocChargeDesc] = useState("");
  // 🔹 Ornaments from loan data
  const [pledgeItems, setPledgeItems] = useState([]);
  const [CustomerData, setCustomerData] = useState([]);
  // 🔹 Calculation summary
  const [summary, setSummary] = useState({
    subtotal: 0,
    auctionFee: 0,
    cgst: 0,
    sgst: 0,
    total: 0,
  });

  console.log(summary, "summary");
  const [suggestions, setSuggestions] = useState([]);
  const [activeCredit, setActiveCredit] = useState(null);
  const navigate = useNavigate();
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

  useEffect(() => {
    if (loanData.BorrowerId) {
      fetchCustomer(loanData.BorrowerId);
    }
  }, [loanData?.BorrowerId]);

  const fetchCustomer = async (id) => {
    try {
      const res = await axios.get(`${API}/Master/doc/get-customer/${id}`);
      const customer = res.data.data;

      // setFormData((prev) => ({
      //   ...prev,
      //   customer_name: customer.name,
      //   address: customer.address,
      //   city: customer.city,
      //   state: customer.state,
      //   pin_code: customer.pincode,
      //   mobile_number: customer.mobile,
      //   email_id: customer.email,
      // }));

      setCustomerData(customer);
    } catch (error) {
      console.log("Error fetching customer:", error);
    }
  };

  const fetchActiveCredit = async (bidderId) => {
    if (!bidderId) return;

    // Convert to number
    const numericBidderId = Number(bidderId);

    try {
      const res = await fetch(
        `${API}/Auction/Application/GetActive/${numericBidderId}`,
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
        const res = await fetch(`${API}/Auction/bidders/search?q=${value}`);
        const data = await res.json();
        setSuggestions(data.bidders || []);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSuggestions([]);
    }
  };
  const safeParsePledgeList = (value) => {
    try {
      if (!value) return [];

      // Already an array
      if (Array.isArray(value)) return value;

      // If object → not valid JSON list
      if (typeof value === "object") return [];

      // MySQL sometimes returns "[object Object]"
      if (value === "[object Object]") return [];

      // First parse
      const first = JSON.parse(value);

      // If first parse gives array → done
      if (Array.isArray(first)) return first;

      // If first parse gives string, try second parse
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

  useEffect(() => {
    if (loanData) {
      // Parse ornaments
      let parsedItems = [];
      try {
        parsedItems = safeParsePledgeList(loanData.Pledge_Item_List);
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
      const total = subtotal + auctionFee + cgst + sgst - creditNote;

      setSummary({
        subtotal,
        auctionFee,
        cgst,
        sgst,
        creditNote,
        total,
      });
    }
  }, [
    loanData,
    AuctionData,
    formData.biddingCloseAmount,
    formData.adjustmentAmount,
  ]);

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

  //  const handleSubmit = async () => {
  //     try {
  //         const payload = {
  //             formData,
  //             pledgeItems,
  //             summary,
  //             docChargeAmount,
  //             docChargeDesc
  //         };

  //         const response = await axios.post(
  //             "http://localhost:5000/generate-bill/create-bill",
  //             payload
  //         );

  //         if (response.data.status) {
  //             alert("Bill Generated Successfully!");
  //            navigate('/Auction-Creation')
  //         } else {
  //             alert("Failed to generate bill");
  //         }

  //     } catch (error) {
  //         console.log("Error submitting bill:", error);
  //         alert("Something went wrong");
  //     }
  // };

  const handleSubmitfordocument = () => {
    const docCharges = {
      amount: docChargeAmount,
      description: docChargeDesc,
    };

    console.log("Document Charges:", docCharges);

    // Close current modal
    setIsModalOpen(false);

    // Open Credit Note Modal
    setIsCreditModalOpen(true);
  };

  const combined = pledgeItems.reduce(
    (acc, item) => {
      acc.particular.push(item.particular || "");
      acc.gross += Number(item.gross) || 0;
      acc.netWeight += Number(item.netWeight) || 0;
      acc.rate += Number(item.rate) || 0; // OR average—tell me if needed
      return acc;
    },
    {
      particular: [],
      gross: 0,
      netWeight: 0,
      rate: 0,
    },
  );

  const creditNoteAmount = Math.round(
  Number(summary.total || 0) -
  Number(loanData.LoanPendingAmount || 0) -
  Number(docChargeAmount || 0)
);


  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Generate Bill</h2>

          <div className="flex gap-3">
            
            <button
              className="bg-[#0A2478] text-white text-xs rounded px-4 py-1 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Submit
            </button>

            <button
              className="bg-[#C1121F] text-white text-xs rounded px-4 py-1 cursor-pointer"
              onClick={() => {
                navigate("/Auction-Items-List", {
                  state: {
                    loanIds: loanIds,
                    AuctionData: AuctionData,
                  },
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="flex   ml-[25px]">
        <div className=" ">
          {/* Invoice Details */}
          <div className="bg-[#ECECF6] p-2">
            <h2 className="text-lg font-semibold text-[#0A2478] ">
              Invoice Details
            </h2>

            <div className="flex gap-10">
              <div>
                <p className="font-medium text-sm">Date of Invoice</p>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  className="w-[100px] h-[30px] p-1 border border-gray-300 rounded-md bg-white text-xs"
                />
              </div>

              <div>
                <p className="font-medium text-sm">Loan No</p>
                <input
                  type="text"
                  name="loanNo"
                  value={formData.loanNo}
                  onChange={handleChange}
                  className="w-[150px] h-[30px] p-1 border rounded-md bg-white border-gray-300 text-xs"
                  placeholder="00000000000"
                />
              </div>

              <div>
                <p className="font-medium text-sm">Auction Date</p>
                <input
                  type="date"
                  name="auctionDate"
                  value={formData.auctionDate}
                  onChange={handleChange}
                  className="w-[100px] p-1 border rounded-md bg-white border-gray-300 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Bidder Details */}
          <div className="bg-red-50 p-2">
            <h2 className="text-lg font-semibold text-[#0A2478] ">
              Bidder Details
            </h2>

            <div className="flex gap-5">
              <div className="">
                <p className="font-medium text-sm">Name</p>

                <input
                  type="text"
                  name="bidderName"
                  value={formData.bidderName}
                  onChange={onChangeForbidders}
                  className="w-[220px] h-[30px] p-1 border rounded-md bg-white border-gray-300 text-xs"
                  placeholder="Name"
                  autoComplete="off"
                />

                {/* Suggestion Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border w-[220px] rounded shadow-md max-h-40 overflow-y-auto z-50 text-xs">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-xs"
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
                <p className="font-medium text-sm">Bidder ID</p>
                <input
                  type="text"
                  name="bidderId"
                  value={formData.bidderId}
                  disabled
                  onChange={handleChange}
                  className="w-[150px] p-2 h-[30px] border rounded-md bg-white border-gray-300 text-xs disabled:bg-gray-200"
                  placeholder="Bidder ID"
                />
              </div>

              <div>
                <p className="font-medium text-sm">Contact No</p>
                <input
                  type="text"
                  name="bidderContact"
                  value={formData.bidderContact}
                  disabled
                  onChange={handleChange}
                  className="w-[150px] p-1 h-[30px] border rounded-md bg-white border-gray-300 text-xs disabled:bg-gray-200"
                  placeholder="0000000000"
                />
              </div>

              <div>
                <label className="font-medium text-sm">Email ID</label>
                <input
                  type="email"
                  name="bidderEmail"
                  disabled
                  value={formData.bidderEmail}
                  onChange={handleChange}
                  className="w-full p-1 border rounded-md bg-white border-gray-300 text-xs h-[30px] disabled:bg-gray-200"
                  placeholder="abc@gmail.com"
                />
              </div>

              <div>
                <p className="font-medium text-sm">Address</p>
                <input
                  type="text"
                  name="bidderAddress"
disabled
                  value={formData.bidderAddress}
                  onChange={handleChange}
                  className="w-[400px] p-1 border rounded-md bg-white border-gray-300 text-xs h-[30px] disabled:bg-gray-200"
                  placeholder="Address"
                />
              </div>
            </div>
          </div>

          {/* EMD Credit Note */}
          <div className="bg-[#ECECF6] p-2">
            <h2 className="text-lg font-semibold text-[#0A2478] ">
              Credit Note Amount
            </h2>

            <div className="flex items-end gap-10 w-full">
              {/* Credit Note Dropdown */}
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm">Credit Note ID</label>
                <select
                  name="creditNoteId"
                  value={formData.creditNoteId}
                  onChange={(e) => {
                    const selectedId = e.target.value;

                    const selectedCredit = activeCredit?.find(
                      (c) => c.credit_note_id === selectedId,
                    );

                    setFormData((prev) => ({
                      ...prev,
                      creditNoteId: selectedId,
                      adjustmentAmount: selectedCredit
                        ? selectedCredit.credit_amount
                        : "",
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
                  className="w-[300px] p-1 h-[30px] border rounded-md bg-white  border-gray-300 text-xs"
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
                <label className="font-medium mb-1 text-sm">Credit Note Amount</label>
                <input
                  type="number"
                  name="adjustmentAmount"
                  disabled
                  value={formData.adjustmentAmount}
                  onChange={handleChange}
                  className="w-[250px] p-1 border rounded-md bg-white  border-gray-300 text-xs h-[30px]"
                  placeholder="₹ 500.00"
                />
              </div>
            </div>
          </div>

          {/* Gold Table */}

          <div className='flex gap-10 justify-between p-2 bg-[#F7F7FF] '>
<div className=" ">
            <h2 className="text-lg font-semibold text-[#0A2478] ">
              Gold Purchase Details
            </h2>

            <table className="w-[800px]  text-xs">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="p-2 border">Sr. No</th>
                  <th className="p-2 border">Product Details</th>
                  <th className="p-2 border">Gross Weight</th>
                  <th className="p-2 border">Net Weight</th>

                  <th className="p-2 border">Rate</th>
                  <th className="p-2 border">Amount</th>
                </tr>
              </thead>

              <tbody>
                {pledgeItems.length > 0 ? (
                  <tr className="bg-white">
                    <td className="p-2  text-center">1</td>

                    {/* Combined particulars */}
                    <td className="p-2 ">
                      {combined.particular.join(", ")}
                    </td>

                    {/* Combined gross */}
                    <td className="p-2  text-right">{combined.gross}</td>

                    {/* Combined netWeight */}
                    <td className="p-2  text-right">
                      {combined.netWeight}
                    </td>

                    {/* Combined rate */}
                    <td className="p-2  text-right">
                      {combined.rate.toFixed(2)}
                    </td>

                    {/* Input box ONLY ONCE */}
                    <td className="p-2  text-center">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          value={formData.biddingCloseAmount}
                          onChange={(e) => {
                            const value = Number(e.target.value);

                            setFormData((prev) => ({
                              ...prev,
                              biddingCloseAmount: value,
                            }));

                            setSummary((prev) => ({
                              ...prev,
                              subtotal: value,
                              total:
                                value + prev.auctionFee + prev.cgst + prev.sgst,
                            }));
                          }}
                          className="border px-2 py-1 rounded w-[120px] text-center bg-white"
                          placeholder="Enter Amount"
                        />
                      </div>
                    </td>
                  </tr>
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

          <div className="flex justify-end mt-6 mb-2">
            <div className="w-80 bg-white shadow-md p-2  border text-sm">
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
                <span>Credit Note</span>{" "}
                <span className="text-red-500">
                  - ₹ {formData.adjustmentAmount}
                </span>
              </p>

              <hr className="my-2" />

              <p className="flex justify-between font-semibold text-[#0A2478] text-base">
                <span>Total Payable</span>
                <span>₹ {summary.total.toFixed(2)}</span>
              </p>
            </div>
          </div>

          </div>
          
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md">
          <div className="bg-white p-10 rounded-md w-[662px] h-[400px]">
            <h2 className="text-center font-semibold text-[20px]">
              Before generating the Credit Note, please confirm whether any
              Document Charges are applicable for this customer.
            </h2>
            <h1 className="mt-5 text-[20px] font-normal leading-[100%] text-center font-sourceSans text-[#7C7C7C]">
              Would you like to add Document Charges?
            </h1>

            <div className="flex mt-6 justify-center items-center gap-6">
              {/* Amount */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">
                  Document Charge Amount
                </label>
                <input
                  type="number"
                  className="border p-2 rounded-[8px] w-[200px] h-[38px] mt-1"
                  placeholder="₹ 000"
                  value={docChargeAmount}
                  onChange={(e) => setDocChargeAmount(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Description</label>
                <input
                  type="text"
                  className="border p-2 rounded-[8px] w-[298px] h-[38px] mt-1"
                  placeholder="e.g., Processing Charges, Gold Packet Charges"
                  value={docChargeDesc}
                  onChange={(e) => setDocChargeDesc(e.target.value)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-2 mt-10">
              <button
                className="bg-[#0A2478] text-white text-sm rounded px-6 py-2"
                onClick={handleSubmitfordocument}
              >
                Submit
              </button>

              <button
                className="bg-red-600 text-white text-sm rounded px-6 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md">
          <div className="bg-[#F7F7FF]  w-[570px] rounded-md shadow-lg h-[607px] text-[16px] ">
            {/* Modal Header */}
            <div className="bg-[#0A2478] text-white px-6 py-3 rounded-t-md">
              <h2 className="text-lg font-semibold">
                Credit Note - Post Auction Settlement
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Auction Reference */}
              <h3 className="font-sourceSans font-bold text-[18px] leading-[100%] mb-2 text-gray-600">
                Auction Reference
              </h3>

              <div className="flex gap-5 mt-2">
                <div>
                  <p>Auction ID:</p> <p>{AuctionData?.id}</p>
                </div>

                <div>
                  {" "}
                  <p>Auction Date:</p>
                  <p> {formatIndianDate(AuctionData?.date)}</p>
                </div>
              </div>
              {/* Borrower Details */}
              <h3 className="font-sourceSans font-bold text-[18px] mt-5 leading-[100%] mb-2 text-gray-600">
                Loan / Borrower Details
              </h3>

              <div className="flex gap-10 mt-2">
                <div>
                  <p>Loan No:</p> <p> {loanData.id}</p>
                </div>
                <div>
                  {" "}
                  <p> Customer Id:</p>
                  <p> {loanData.BorrowerId}</p>
                </div>
                <div>
                  {" "}
                  <p> Customer Name:</p>
                  <p> {loanData.Print_Name}</p>
                </div>

                {/* <div><p>Email:</p><p></p></div> */}
                <div>
                  {" "}
                  <p>Mobile:</p> <p>{loanData.Mobile_Number}</p>
                </div>
              </div>
              <div className="flex gap-5 mt-2">
                <div>
                  <p>Address:</p> <p> 1</p>
                </div>
              </div>
              {/* Credit Note Amount */}
              <h3 className="font-sourceSans font-bold text-[18px] leading-[100%] mb-2 mt-5 text-gray-600">
                Credit Note Amount
              </h3>

              <div className="flex gap-5 mt-2">
                <div>
                  <p>Outstanding Loan Amount:</p>{" "}
                  <p> {loanData.LoanPendingAmount}</p>
                </div>

                <div>
                  {" "}
                  <p>Auction Recovery:</p>
                  <p>{summary.total}</p>
                </div>

                <div>
                  <p>Document Charges:</p>
                  <p> {docChargeAmount}</p>
                </div>
              </div>

              <div className="flex gap-5 mt-2">
                <div>
                  <p>Credit Note Amount:</p> <p> {creditNoteAmount}</p>
                </div>

                <div>
                  {" "}
                  <p>Remarks:</p>
                  <p className="text-gray-600">
                    Surplus after auction settlement – Credit Note <br></br>
                    issued to customer.
                  </p>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="bg-[#0A2478] text-white px-6 py-2 rounded"
                  onClick={() => {
                    navigate("/add-credit-note-page", {
                      state: {
                        formData,
                        pledgeItems,
                        summary,
                        docChargeAmount,
                        docChargeDesc,
                        CustomerData,
                        creditNoteAmount,
                        AuctionData,
                      },
                    });
                  }}
                >
                  Generate Credit Note
                </button>

                <button
                  className="bg-red-600 text-white px-6 py-2 rounded"
                  onClick={() => setIsCreditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
