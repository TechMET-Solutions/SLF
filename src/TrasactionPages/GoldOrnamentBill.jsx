import React from "react";

function GoldOrnamentBill() {
  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-[#0A2478] font-bold text-[20px]">
            Gold Purchase Bill - NBFC Auction
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/Add-Auction-Creation")}
              className="bg-red-600 text-white text-sm rounded px-4 py-2 cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 text-sm text-gray-800 px-18">
        {/* Top Info */}
        <div className="mb-4 space-y-1">
          <p>
            Statement Date: <span className="font-medium">July 26, 2025</span>
          </p>
          <p>
            Invoice Number: <span className="font-medium">INV-2024-00789</span>
          </p>
          <p>
            Auction Reference:{" "}
            <span className="font-medium">AUCT-2024-00123</span>
          </p>
        </div>

        {/* Seller & Buyer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Seller Details */}
          <div className="border border-gray-300 rounded-sm p-4">
            <h2 className="font-semibold text-[#0A2478] text-[22px] mb-2">
              Seller Details
            </h2>
            <div className="space-y-1 text-gray-600">
              <p className="flex justify-between">
                <span className=" font-semibold text-black">Name:</span> Seller
                Finance
              </p>
              <p className="flex justify-between">
                <span className=" font-semibold text-black">
                  Registered Office Address:
                </span>
                H. NO.444-31, BHAGUR, Nashik 422502, India
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">
                  Branch Address:
                </span>{" "}
                8605181157
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">
                  Contact Number:
                </span>{" "}
                8605181157
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Email ID:</span>{" "}
                seller@gmail.com
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">GSTIN:</span>{" "}
                36AAACHT409R1Z2
              </p>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="border border-gray-300 rounded-sm p-4">
            <h2 className="font-semibold text-[#0A2478] text-[22px] mb-2">
              Buyer Information
            </h2>
            <div className="space-y-1 text-gray-600">
              <p className="flex justify-between">
                <span className=" font-semibold text-black">Buyer Name:</span>{" "}
                MAYUR SUDAM TARLE
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Address:</span>
                H. NO.444-31, BHAGUR, Nashik 422502, India
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Mobile No.:</span>{" "}
                8605181157
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Aadhar/PAN:</span>{" "}
                0000 0000 0000
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Email ID:</span>{" "}
                buyer@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Invoice & Payment Details */}
        <div className="border border-gray-300 rounded-sm p-4">
          <h2 className="font-semibold text-[#0A2478] text-[22px] mb-2">
            Invoice & Payment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-7 text-gray-600">
            <div>
              <p className="flex justify-between py-1">
                <span className=" font-semibold text-black">
                  Invoice Number:
                </span>{" "}
                01V3400001
              </p>
              <p className="flex justify-between py-1">
                <span className="font-semibold text-black">Auction Date:</span>{" "}
                July 25, 2025
              </p>
              <p className="flex justify-between py-1">
                <span className="font-semibold text-black">Invoice Date:</span>{" "}
                July 26, 2025
              </p>
            </div>
            <div>
              <p className="flex justify-between py-1">
                <span className="font-semibold text-black">Payment Mode:</span>{" "}
                Bank Transfer
              </p>
              <p className="flex justify-between py-1">
                <span className="font-semibold text-black">
                  Auction Reference No.:
                </span>{" "}
                AUC-2025-014
              </p>
              <p className="flex justify-between py-1">
                <span className="font-semibold text-black">
                  Payment Reference No.:
                </span>{" "}
                Ref - 2024-00456
              </p>
            </div>
          </div>
        </div>

        {/* Gold Purchase Details */}
        <div className="mb-4 mt-5">
          <h2 className="font-semibold text-[#0A2478] text-[22px] mb-2">
            Gold Purchase Details
          </h2>

          {/* Table */}
          <div className=" overflow-hidden">
            <table className="w-full border-collapse border border-gray-300 text-sm ">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="border border-gray-300 px-3 py-1  text-left ">
                    Sr. No.
                  </th>
                  <th className="border border-gray-300 px-3  text-left">
                    Product Desc
                  </th>
                  <th className="border border-gray-300 px-3  text-left">
                    Gross Weight
                  </th>
                  <th className="border border-gray-300 px-3  text-left">
                    Net Weight
                  </th>
                  <th className="border border-gray-300 px-3 text-left">
                    Purity
                  </th>
                  <th className="border border-gray-300 px-3 text-left">
                    Rate/gram
                  </th>
                  <th className="border border-gray-300 px-3 text-left">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-left">
                    1
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    Gold Bangles (Pair)
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-left">
                    81.50
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-left">
                    79.00
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-left">
                    22k
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-left">
                    5,000
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-left">
                    ₹5,92,500.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end mb-2">
          <div className="border border-gray-300 p-4 w-[520px]">
            <div className="space-y-1 text-gray-700">
              <p className="flex justify-between">
                <span className="font-semibold text-black">Subtotal</span> <span>₹5,92,500.00</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Auction Fee</span> <span>₹200.00</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Processing Fee</span> <span>₹100.00</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">CGST 1.5%</span> <span>₹8895.00</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">SGST 1.5%</span> <span>₹8895.00</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">IGST</span> <span>₹100.00</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold text-black">Credit Note Amount</span> <span>-₹3,000.00</span>
              </p>
              <p className="flex justify-between font-semibold text-[#0A2478] ">
                <span className="font-semibold">Total Payable Amount</span> <span className="text-[#0A2478]">₹589,800.00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Amount in Words */}
        <p className="text-black mb-10 mt-[-40px]">
          <span className="font-semibold ">Amount in Words: Five Lakh Eighty
          Nine Thousand Eight Hundred Only...</span>
        </p>

        {/* Declaration */}
        <div className="mb-16">
          <h2 className="font-semibold text-[#0A2478] text-[20px] mb-2">Declaration</h2>
          <p className="mb-1 font-semibold">The gold purchased in this auction was pledged with the NBFC by
              the original borrower.</p>
          <ul className="list-disc ml-5 space-y-1 text-black font-semibold">
              
            <li>
              The purchaser has paid the full amount as per auction terms and
              conditions.
            </li>
            <li>
              The NBFC hereby transfers ownership of the mentioned gold items to
              the purchaser upon full payment.
            </li>
            <li>
              No claim shall be entertained after the delivery of the items.
            </li>
          </ul>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div>
            <h2 className="font-semibold text-[#0A2478] text-[20px] mb-2">
              Authorized Signatory (NBFC)
            </h2>
            <div className="space-y-1 text-black ">
              <p className="py-1">
                <span className="font-semibold text-black ">Name:</span>
              </p>
              <p className="py-1">
                <span className="font-semibold text-black ">Designation:</span>
              </p>
              <p className="py-1">
                <span className="font-semibold text-black">
                  Signature & Seal:
                </span>
              </p>
              <p className="py-1">
                <span className="font-semibold text-black">Date:</span>
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h2 className="font-semibold text-[#0A2478] text-[20px] mb-2">
              Buyer’s Acknowledgment
            </h2>
            <p className="text-black font-semibold py-1 mb-2">
              I, ________________________________, confirm that I have received
              the above-mentioned gold items in proper condition and as per
              auction terms.
            </p>
            <div className="space-y-1 text-black">
              <p className="py-1">
                <span className="font-semibold text-black">
                  Signature of Buyer:
                </span>
              </p>
              <p className="py-1">
                <span className="font-semibold text-black">Date:</span>
              </p>
              <p className="py-1">
                <span className="font-semibold text-black">Place:</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoldOrnamentBill;
