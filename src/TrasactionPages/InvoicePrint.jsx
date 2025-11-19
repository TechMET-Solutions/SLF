import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InvoicePrint = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loanData } = location.state || {};
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (!loanData) return;

    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/generate-bill/invoice/details",
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


  return (
    <div className="bg-gray-100 min-h-screen py-5">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white">
          <h2 className="text-red-600 font-bold text-[20px]">Gold Purchase Bill</h2>

          <button
            onClick={() => navigate("/Auction-Items-List")}
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

              <p><strong>Bidder ID:</strong> {invoice?.bill_bidder_id}</p>
              <p><strong>Buyer Name:</strong> {invoice?.bill_bidder_name}</p>
              <p><strong>Address:</strong> {invoice?.bill_bidder_address}</p>
              <p><strong>Mobile:</strong> {invoice?.bill_bidder_contact}</p>
              <p><strong>Email:</strong> {invoice?.bill_bidder_email}</p>
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

           

<p>
  <strong>UTR Number:</strong>{" "}
  {invoice?.paymentMethod === "Cash" ? "Cash" : invoice?.utrNumber || "N/A"}
</p>

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
                  <th className="border p-2">Purity</th>
                  <th className="border p-2">Rate/gram</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>

              <tbody>
  {parseItems(invoice?.Pledge_Item_List).map((item, index) => (
    <tr key={index}>
      <td className="border p-2 text-center">{index + 1}</td>
      <td className="border p-2">{item.particular}</td>
      <td className="border p-2 text-center">{item.gross}</td>
      <td className="border p-2 text-center">{item.netWeight}</td>
      <td className="border p-2 text-center">{item.purity}</td>
      <td className="border p-2 text-center">{item.rate}</td>

      {/* Show BidderCloseAmt only on first row */}
      <td className="border p-2 text-right">
        {index === 0 ? `₹${invoice?.subtotal}` : ""}
      </td>
    </tr>
  ))}
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
              • The purchased gold items were sold with the NBFI by the original borrower. <br />
              • The Buyer must ensure the purity. <br />
              • The Buyer shall be responsible for any issues related to purchased items. <br />
              • The NBFI shall not be answerable for defects of the items.
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
