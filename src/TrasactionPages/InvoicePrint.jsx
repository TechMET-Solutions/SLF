import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const InvoicePrint = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loanData,loanIds } = location.state || {};
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (!loanData) return;

    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `${API}/generate-bill/invoice/details`,
          {
            params: {
              bidder_id: Number(loanData.BidderId),
              loan_id: Number(loanData.id),
            },
          }
        );

        setInvoice(response.data.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [loanData]);
    
    const parseItems = (data) => {
  if (!data) return [];

  try {
    let parsed = JSON.parse(data);      // first parse

    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);      // second parse
    }

    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Pledge_Item_List parse error:", err);
    return [];
  }
    };
const parsedItems = parseItems(invoice?.Pledge_Item_List);


   
 const combined = parsedItems.reduce(
  (acc, item) => {
    acc.particular.push(item.particular || "");
    acc.gross += Number(item.gross) || 0;
    acc.netWeight += Number(item.netWeight) || 0;
    acc.rate += Number(item.rate) || 0;
    return acc;
  },
  {
    particular: [],
    gross: 0,
    netWeight: 0,
    rate: 0,
  }
);


  return (
    <div className="bg-gray-100 min-h-screen py-5">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white">
          <h2 className="text-red-600 font-bold text-[20px]">Gold Purchase Bill</h2>

          <button
                      // onClick={() => navigate("/Auction-Items-List")}
                      onClick={() =>
    navigate("/Auction-Items-List", {
      state: {
        loanIds: loanIds,   
      },
    })
  }
            className="bg-[#C1121F] text-white text-sm rounded px-4 py-2"
          >
            Exit
          </button>
        </div>
      </div>

      {/* PRINT AREA */}
      <div className="flex justify-center mt-6">
        <div className="w-[1290px] bg-white shadow p-8 rounded-lg">

          {/* Top Title */}
          <h1 className="text-center font-bold text-xl text-[#003366] mb-6">
            GOLD PURCHASE BILL
          </h1>

          {/* Seller + Buyer Details */}
          <div className="grid grid-cols-2 gap-8 border p-4 rounded-lg">

            {/* Seller Section */}
            <div>
              <h3 className="font-semibold text-[#003366] border-b pb-1 mb-2">
                Seller Details
              </h3>

              <p><strong>Seller:</strong> Seller Finance</p>
              <p><strong>Address:</strong> H.NO 441, Tilakwadi, Nashik</p>
              <p><strong>Branch Address:</strong> Nashik, Maharashtra</p>
              <p><strong>Contact:</strong> 8080551137</p>
              <p><strong>Email:</strong> seller@gmail.com</p>
              <p><strong>GSTIN:</strong> 33AACCV7488R</p>
            </div>

            {/* Buyer Section */}
            <div>
              <h3 className="font-semibold text-[#003366] border-b pb-1 mb-2">
                Buyer Information
              </h3>

                          <p><strong>Client ID:</strong> {invoice?.bill_bidder_id}</p>
                          <p><strong>Firm Name:</strong> {invoice?.bidder_firm_name}</p>
              <p><strong>Client Name:</strong> {invoice?.bill_bidder_name}</p>
              <p><strong>Address:</strong> {invoice?.bill_bidder_address}</p>
              <p><strong>Mobile:</strong> {invoice?.bill_bidder_contact}</p>
                          <p><strong>Email:</strong> {invoice?.bill_bidder_email}</p>
                          <p><strong>GST No:</strong> {invoice?.bidder_gst_no}</p>
                           
            </div>

          </div>

          {/* Invoice Details */}
          <div className="border p-4 rounded-lg mt-6">
            <h3 className="font-semibold text-[#003366] border-b pb-1 mb-3">
              Invoice & Payment Details
            </h3>

            <div className="grid grid-cols-3 gap-5">
              <p><strong>Invoice No:</strong> {invoice?.bill_id}</p>

              <p><strong>Invoice Date:</strong>  
                {invoice?.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : ""}
              </p>

              <p><strong>Loan Number:</strong> {invoice?.loanNo}</p>

              <p><strong>Auction Date:</strong>  
                {invoice?.auctionDate ? new Date(invoice.auctionDate).toLocaleDateString() : ""}
              </p>

           

{/* <p>
  <strong>UTR Number:</strong>{" "}
  {invoice?.paymentMethod === "Cash" ? "Cash" : invoice?.utrNumber || "N/A"}
</p> */}

            </div>
          </div>

          {/* Table Section */}
          <div className="mt-6">
            <h3 className="font-semibold text-[#003366] mb-2">
              Gold Purchase Details
            </h3>

            <table className="w-full border text-sm">
              <thead className="bg-[#003366] text-white">
                <tr>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Product Desc</th>
                  <th className="border p-2">Gross Weight</th>
                  <th className="border p-2">Net Weight</th>
                
                  <th className="border p-2">Rate/gram</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>

              <tbody>
  <tr>
    <td className="border p-2 text-center">1</td>

    {/* Combined Particulars */}
    <td className="border p-2">
      {combined.particular.join(", ")}
    </td>

    {/* Combined Gross */}
    <td className="border p-2 text-center">
      {combined.gross}
    </td>

    {/* Combined Net Weight */}
    <td className="border p-2 text-center">
      {combined.netWeight}
    </td>

    

    {/* Combined Rate */}
    <td className="border p-2 text-center">
      {combined.rate.toFixed(2)}
    </td>

    {/* Amount (Bidder Close Amount) */}
    <td className="border p-2 text-right">
      ₹{invoice?.subtotal}
    </td>
  </tr>
</tbody>


            </table>
          </div>

          {/* Amount Summary */}
          <div className="w-full flex justify-end mt-5">
            <div className="border p-4 w-[350px] rounded-lg">
              <p className="flex justify-between">
                <span>Subtotal</span> <span>₹{invoice?.subtotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Auction Fee</span> <span>₹{invoice?.auctionFee}</span>
              </p>
              <p className="flex justify-between">
                <span>SGST 1.5%</span> <span>₹{invoice?.sgst}</span>
              </p>
              <p className="flex justify-between">
                <span>CGST 1.5%</span> <span>₹{invoice?.cgst}</span>
                          </p>
                          <p className="flex justify-between">
                <span>IGST 3.0% </span> <span>-----</span>
              </p>
 <p className="flex justify-between">
                <span>Credit Note Amount </span> <span>-₹{invoice?.adjustmentAmount}</span>
              </p>
              <hr className="my-2" />

              <p className="flex justify-between font-bold text-lg text-[#003366]">
                <span>Total Payable</span> <span>₹{invoice?.total}</span>
              </p>
            </div>
          </div>

          {/* Declaration */}
          <div className="border p-4 rounded-lg mt-6">
            <h3 className="font-semibold text-[#003366] border-b pb-1 mb-2">
              Declaration
            </h3>

            <p className="text-sm leading-relaxed">
           • The gold purchased in this auction was pledged with the NBFC by the original borrower.<br></br>
• The purchaser has paid the full amount as per auction terms and conditions.<br></br>
• The NBFC hereby transfers ownership of the mentioned gold items to the purchaser upon full
payment.<br></br>
• No claim shall be entertained after the delivery of the items.
            </p>
          </div>

          {/* Signature section */}
          <div className="grid grid-cols-2 gap-10 mt-8">

            {/* NBFC */}
            <div>
              <h3 className="font-semibold text-[#003366] border-b pb-1 mb-3">
                Authorized Signatory (NBFC)
              </h3>

              <p>Name: _____________</p>
              <p>Designation: _____________</p>
              <p>Date: _____________</p>
            </div>

            {/* Buyer */}
            <div>
              <h3 className="font-semibold text-[#003366] border-b pb-1 mb-3">
                Buyer’s Acknowledgement
              </h3>

              <p>I hereby confirm that I have received the gold items.</p>
              <p>Name: _____________</p>
              <p>Signature: _____________</p>
              <p>Date: _____________</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoicePrint;
