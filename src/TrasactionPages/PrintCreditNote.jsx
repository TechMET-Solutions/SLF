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
                onClick={() => navigate("-1")}
              className="bg-[#C1121F] text-white px-6 py-1 text-sm rounded hover:bg-[#a50d18] shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-md py-5 ">
        {/* Credit Note Details */}
        <section className="bg-[#ECECF6] p-4  px-18 border-gray-300">
          <h3 className="font-semibold font-weight-600 text-[20px] text-[#0A2478] mb-3">
            Credit Note Details
          </h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="font-semibold text-xs mb-1">
                Credit Note No.<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Date Of Issue</div>
              <input
                type="date"
                className="w-[250px]  font-weight-600 bg-white px-2 py-1 rounded-[8px] border border-gray-300"
              />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Reference Invoice/Receipt No.
              </div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                Reference Date
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="w-[250px] border border-gray-300 px-2 bg-white py-1 rounded-[8px]"
                />
                {/* <FaCalendarAlt /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Details */}
        <section className="bg-[#FFE6E6] p-4  px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Customer Details
          </h3>
          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Customer Name</div>
              <input className="w-[280px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Customer ID/Loan Account No.
              </div>
              <input className="w-[220px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Address</div>
              <input className="w-[300px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">City</div>
              <input className="w-[140px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">State</div>
              <input className="w-[140px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Pin code</div>
              <input className="w-[140px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Mobile Number</div>
              <input className="w-[150px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Email ID</div>
              <input className="w-[200px] border bg-white rounded-[8px] border-gray-300 px-2 py-1 " />
            </div>
          </div>
        </section>

        {/* Reason for Credit Note */}
        <section className="bg-[#ECECF6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Reason for Credit Note
          </h3>
          <div className="flex flex-wrap gap-6 mb-4 text-sm">
            <label className="flex items-center font-semibold gap-3 pb-3">
              <input
                type="radio"
                name="reason"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Excess Payment Received</span>
            </label>

            <label className="flex items-center font-semibold gap-3 pb-3">
              <input
                type="radio"
                name="reason"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Auction Settlement Difference</span>
            </label>

            <label className="flex items-center font-semibold gap-3 pb-3">
              <input
                type="radio"
                name="reason"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Interest Reversal</span>
            </label>

            <label className="flex items-center font-semibold gap-3 pb-3">
              <input
                type="radio"
                name="reason"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Service Charge Reversal</span>
            </label>

            <label className="flex items-center font-semibold gap-3 pb-3">
              <input
                type="radio"
                name="reason"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Other</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">
                Description / Remarks
              </div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Original Amount (₹)
              </div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Adjustment / Credit Amount (₹)
              </div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Net Amount After Adjustment (₹)
              </div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
          </div>
        </section>

        {/* Payment / Adjustment Details */}
        <section className="bg-[#FFE6E6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Payment / Adjustment Details
          </h3>
          <div className="flex flex-wrap gap-6 mb-4 text-sm">
            <label className="flex items-center font-semibold gap-3 pb-4">
              <input
                type="radio"
                name="paymentType"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Bank Transfer</span>
            </label>

            <label className="flex items-center font-semibold gap-3 pb-4">
              <input
                type="radio"
                name="paymentType"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Account Adjustment</span>
            </label>

            <label className="flex items-center font-semibold gap-3 pb-4">
              <input
                type="radio"
                name="paymentType"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Cheque</span>
            </label>

            <label className="flex items-center font-semibold gap-3 pb-4">
              <input
                type="radio"
                name="paymentType"
                className="text-blue-600 w-[25px] h-[25px] accent-blue-600"
              />
              <span>Other</span>
            </label>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Bank Name</div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Account No. (Last 4 digits)
              </div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Transaction / UTR No.
              </div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Transaction Date</div>
              <input
                type="date"
                className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]"
              />
            </div>
          </div>
        </section>

        {/* Authorization & Verification */}
        <section className="bg-[#eef2ff] p-4 px-18">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Authorization & Verification
          </h3>
          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold  mb-1">
                Prepared By (Name):<span className="text-red-500">*</span>
              </div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold  mb-1">Designation:</div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Verified By (Accounts Dept.):
                <span className="text-red-500">*</span>
              </div>
              <input className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
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
