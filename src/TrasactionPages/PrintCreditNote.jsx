import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const PrintCreditNote = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex items-center justify-between border border-gray-300 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-lg">
          {/* Title */}
          <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap mr-4">
            Credit Note
          </h2>

          <div className="flex gap-2">
            <button className="bg-[#007620] text-white px-6 py-1 text-sm rounded hover:bg-[#005b16] shadow-lg">
              Print
            </button>
            <button
                onClick={() => navigate("/Credit-Note")}
              className="bg-[#C1121F] text-white px-6 py-1 text-sm rounded hover:bg-[#a50d18] shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-md py-5">
        
        {/* Credit Note Details */}
        <section className="bg-[#ECECF6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Credit Note Details
          </h3>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="font-semibold text-xs mb-1">Credit Note No.</div>
              <p className="w-[250px] py-1">CN-00125</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Date Of Issue</div>
              <p className="w-[250px] py-1">2025-03-10</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Reference Invoice/Receipt No.
              </div>
              <p className="w-[250px] py-1">INV-5689</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Reference Date</div>
              <p className="w-[250px] py-1">2025-03-05</p>
            </div>
          </div>
        </section>

        {/* Customer Details */}
        <section className="bg-[#FFE6E6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Customer Details
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Customer Name</div>
              <p className="w-[200px] py-1">Rohan Sharma</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Customer ID/Loan Account No.
              </div>
              <p className="w-[220px] py-1">LN-908722</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Address</div>
              <p className="w-[300px] py-1">MG Road, Pune</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">City</div>
              <p className="w-[140px] py-1">Pune</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">State</div>
              <p className="w-[140px] py-1">Maharashtra</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Pin code</div>
              <p className="w-[140px] py-1">411001</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Mobile Number</div>
              <p className="w-[150px] py-1">9876543210</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Email ID</div>
              <p className="w-[200px] py-1">rohan@gmail.com</p>
            </div>
          </div>
        </section>

        {/* Payment / Adjustment */}
        <section className="bg-[#ECECF6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Payment / Adjustment Details
          </h3>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Reason for Credit Note</div>
              <p className="w-[220px] py-1">Billing Error</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Description / Remarks</div>
              <p className="w-[280px] py-1">
                Excess payment adjustment
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Original Amount (₹)</div>
              <p className="w-[200px] py-1">₹12,000</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Adjusted / Credited Amount (₹)
              </div>
              <p className="w-[200px] py-1">₹2,000</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Net Amount After Adjustment (₹)
              </div>
              <p className="w-[200px] py-1">₹10,000</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Mode of Payment</div>
              <p className="w-[220px] py-1">Bank Transfer</p>
            </div>

            <div>
              <div classnName="text-xs font-semibold mb-1">Bank Name</div>
              <p className="w-[250px] py-1">HDFC Bank</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Account No. (Last 4 digits)
              </div>
              <p className="w-[200px] py-1">4521</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Transaction / UTR No.</div>
              <p className="w-[200px] py-1">UTR892345</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Transaction Date</div>
              <p className="w-[200px] py-1">2025-03-10</p>
            </div>
          </div>
        </section>

        {/* Authorization */}
        <section className="bg-[#eef2ff] p-4 px-18">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Authorization & Verification
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Prepared By (Name)</div>
              <p className="w-[200px] py-1">Amit Deshmukh</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Designation</div>
              <p className="w-[200px] py-1">Senior Accountant</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Verified By (Accounts Dept.)
              </div>
              <p className="w-[200px] py-1">Priya K</p>
            </div>
          </div>
        </section>
      </div>

      {/* Declaration and Notes Section */}
      <div className="bg-white  rounded-b-[10px] p-6 px-18 pr-25 text-[14px] text-gray-800 mt-[-1px]">
        {/* Approval Section */}
        <div className="flex justify-between  mb-6">
          <div>
            <label className="font-medium text-gray-700">
              Date of Approval:
            </label>
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Approved By (Authorized Signatory):
            </label>
          </div>
          <div>
            <label className="font-medium text-gray-700">Seal / Stamp:</label>
          </div>
        </div>

        {/* Declaration Section */}
        <div className="mb-8">
          <h3 className="font-semibold text-[#0A2478] text-[20px] mb-2">Declaration</h3>
          <p className="leading-relaxed">
            This Credit Note has been issued in accordance with the NBFC’s
            internal financial policies for valid refund or adjustment
            transactions. All particulars mentioned above are true and verified
            as per the records.
          </p>

          <div className="grid grid-cols-3 mt-16">
            <div>
              <span className="font-medium">Date:</span>
            </div>
            <div>
              <span className="font-medium">Place:</span>
            </div>
            <div className="text-right">
              <span className="font-medium">Authorized Signatory:</span>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-10">
          <h3 className="font-semibold text-[#0A2478] text-[20px] mb-2">Notes</h3>
          <ul className="list-decimal list-inside leading-relaxed">
            <li>
              This Credit Note should be preserved for future reference and
              audit.
            </li>
            <li>
              It does not bear any interest and cannot be transferred or used as
              a negotiable instrument.
            </li>
            <li>For queries, please contact the Accounts Department.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrintCreditNote;
