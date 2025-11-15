import React from "react";
import { useNavigate } from "react-router-dom";


const AddCreditNotePage = () => {
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
            <button className="bg-[#0A2478] text-white px-4 py-1 text-sm rounded hover:bg-[#091d5f] shadow-lg">
              Submit
            </button>
            <button
              onClick={() => navigate("/Credit-Note")}
              className="bg-[#C1121F] text-white px-4 py-1 text-sm rounded hover:bg-[#a50d18] shadow-lg"
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

        {/* Payment / Adjustment Details */}
        <section className="bg-[#ECECF6] p-4 px-18 border-gray-300">
          <h2 className="text-[#0A2478] text-xl font-bold mb-6">
            Payment / Adjustment Details
          </h2>

          {/* FLEX */}
          <div className="flex flex-wrap gap-6">

            {/* Reason for Credit Note */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Reason for Credit Note <span className="text-red-500">*</span>
              </label>
              <select className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]">
                <option disabled>--Select--</option>
                <option >Excess Payment Received</option>
                <option >Auction Settlement Difference</option>
                <option >Interest Reversal</option>
                <option >Service Charge Reversal</option>
                <option >Other</option>
              </select>
            </div>

            {/* Description / Remarks */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-semibold mb-1">Description / Remarks</label>
              <input
                type="text"
                className="w-[280px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* Original Amount */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Original Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* Adjustment / Credit Amount */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Adjustment / Credit Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* Net Amount After Adjustment */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Net Amount After Adjustment (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* Mode of Payment */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Mode of Payment <span className="text-red-500">*</span>
              </label>
              <select className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]">
                <option disabled>--Select--</option>
                <option>Bank Transfer</option>
                <option>Account Adjustment</option>
                <option>Other</option>
              </select>
            </div>

            {/* Bank Name */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-[250px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* Account Last 4 Digits */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Account No. (Last 4 digits) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                maxLength={4}
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* Transaction / UTR No */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Transaction / UTR No.</label>
              <input
                type="text"
                className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* Transaction Date */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Transaction Date</label>
              <input
                type="date"
                className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

          </div>
        </section>

        {/* Authorization & Verification */}
        <section className="bg-[#FFE6E6] p-4 px-18">
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
    </div>
  );
};

export default AddCreditNotePage;
