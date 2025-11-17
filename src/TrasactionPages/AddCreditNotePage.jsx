import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCreditNotePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    credit_note_id: "",
    date_of_issue: "",
    reference_invoice_no: "",
    reference_date: "",
    customer_name: "",
    customer_id: "",
    address: "",
    city: "",
    state: "",
    pin_code: "",
    mobile_number: "",
    email_id: "",
    reason: "",
    description: "",
    original_amount: "",
    adjustment_amount: "",
    net_amount: "",
    mode_of_payment: "",
    bank_name: "",
    account_no: "",
    transaction_no: "",
    transaction_date: "",
    prepared_by: "",
    designation: "",
    verified_by: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT FUNCTION
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/credit-note/add-creditnote",
        formData
      );

      alert("Credit Note Added Successfully ✔");
      navigate("/Credit-Note");
    } catch (err) {
      alert("Error saving credit note ❌");
      console.log(err);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-center">
        <div className="flex items-center justify-between border border-gray-300 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-lg">
          <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap mr-4">
            Credit Note
          </h2>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-[#0A2478] text-white px-4 py-1 text-sm rounded hover:bg-[#091d5f] shadow-lg"
            >
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
            {/* CREDIT NOTE ID */}
            <div>
              <div className="font-semibold text-xs mb-1">
                Credit Note No.<span className="text-red-600">*</span>
              </div>
              <input
                name="credit_note_id"
                value={formData.credit_note_id}
                onChange={handleChange}
                className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* DATE OF ISSUE */}
            <div>
              <div className="text-xs font-semibold mb-1">Date Of Issue</div>
              <input
                type="date"
                name="date_of_issue"
                value={formData.date_of_issue}
                onChange={handleChange}
                className="w-[250px] font-weight-600 bg-white px-2 py-1 rounded-[8px] border border-gray-300"
              />
            </div>

            {/* REFERENCE INVOICE */}
            <div>
              <div className="text-xs font-semibold mb-1">
                Reference Invoice/Receipt No.
              </div>
              <input
                name="reference_invoice_no"
                value={formData.reference_invoice_no}
                onChange={handleChange}
                className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* REFERENCE DATE */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                Reference Date
              </div>
              <input
                type="date"
                name="reference_date"
                value={formData.reference_date}
                onChange={handleChange}
                className="w-[250px] border border-gray-300 px-2 bg-white py-1 rounded-[8px]"
              />
            </div>
          </div>
        </section>

        {/* CUSTOMER DETAILS */}
        <section className="bg-[#FFE6E6] p-4  px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Customer Details
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Customer Name</div>
              <input
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-[280px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Customer ID/Loan Account No.
              </div>
              <input
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                className="w-[220px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Address</div>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-[300px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">City</div>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-[140px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">State</div>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-[140px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Pin code</div>
              <input
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                className="w-[140px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Mobile Number</div>
              <input
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className="w-[150px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Email ID</div>
              <input
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                className="w-[200px] border bg-white rounded-[8px] border-gray-300 px-2 py-1 "
              />
            </div>
          </div>
        </section>

        {/* PAYMENT SECTION */}
        <section className="bg-[#ECECF6] p-4 px-18 border-gray-300">
          <h2 className="text-[#0A2478] text-xl font-bold mb-6">
            Payment / Adjustment Details
          </h2>

          <div className="flex flex-wrap gap-6">
            {/* REASON */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Reason for Credit Note <span className="text-red-500">*</span>
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              >
                <option value="">--Select--</option>
                <option>Excess Payment Received</option>
                <option>Auction Settlement Difference</option>
                <option>Interest Reversal</option>
                <option>Service Charge Reversal</option>
                <option>Other</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-semibold mb-1">
                Description / Remarks
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-[280px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* ORIGINAL AMOUNT */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Original Amount (₹)
              </label>
              <input
                type="number"
                name="original_amount"
                value={formData.original_amount}
                onChange={handleChange}
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* ADJUSTMENT AMOUNT */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Adjustment / Credit Amount (₹)
              </label>
              <input
                type="number"
                name="adjustment_amount"
                value={formData.adjustment_amount}
                onChange={handleChange}
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* NET AMOUNT */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Net Amount After Adjustment (₹)
              </label>
              <input
                type="number"
                name="net_amount"
                value={formData.net_amount}
                onChange={handleChange}
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* MODE OF PAYMENT */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Mode of Payment
              </label>
              <select
                name="mode_of_payment"
                value={formData.mode_of_payment}
                onChange={handleChange}
                className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              >
                <option value="">--Select--</option>
                <option>Bank Transfer</option>
                <option>Account Adjustment</option>
                <option>Other</option>
              </select>
            </div>

            {/* BANK NAME */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Bank Name</label>
              <input
                type="text"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                className="w-[250px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* ACCOUNT NO */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Account No. (Last 4 digits)
              </label>
              <input
                type="number"
                name="account_no"
                value={formData.account_no}
                onChange={handleChange}
                className="w-[230px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* TRANSACTION NO */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Transaction / UTR No.
              </label>
              <input
                type="text"
                name="transaction_no"
                value={formData.transaction_no}
                onChange={handleChange}
                className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>

            {/* TRANSACTION DATE */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Transaction Date</label>
              <input
                type="date"
                name="transaction_date"
                value={formData.transaction_date}
                onChange={handleChange}
                className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]"
              />
            </div>
          </div>
        </section>

        {/* AUTHORIZATION */}
        <section className="bg-[#FFE6E6] p-4 px-18">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Authorization & Verification
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">
                Prepared By (Name)
              </div>
              <input
                name="prepared_by"
                value={formData.prepared_by}
                onChange={handleChange}
                className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Designation</div>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Verified By (Accounts Dept.)
              </div>
              <input
                name="verified_by"
                value={formData.verified_by}
                onChange={handleChange}
                className="w-[200px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCreditNotePage;
