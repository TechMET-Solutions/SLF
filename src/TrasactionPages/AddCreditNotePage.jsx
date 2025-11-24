import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const AddCreditNotePage = () => {
  const navigate = useNavigate();
const location = useLocation();
  const incoming = location.state || {};
  console.log(incoming,"")
   const [formData, setFormData] = useState({
    // credit_note_id: "",
    date_of_issue: incoming.formData.invoiceDate,
     reference_invoice_no: incoming.reference_invoice_no || "",
      loan_no : incoming.formData.loanNo,
    reference_date: incoming.formData.invoiceDate,
    customer_name: incoming.CustomerData.printName || "",
    customer_id: incoming.CustomerData.id || "",
    credit_amount: incoming.creditNoteAmount || "",
    reason: "",
    address: incoming.CustomerData.Permanent_Address,
    city: incoming.CustomerData.Permanent_City,
    state: incoming.CustomerData.Permanent_State,
    pin_code: incoming.CustomerData.Permanent_Pincode,
    mobile_number: incoming.CustomerData.mobile,
    email_id:incoming.CustomerData.email,
    description: "After auction settlement – Credit Note issued to customer.",
    prepared_by: "",
    designation: "",
     verified_by: "",
     bidderId:incoming.formData.bidderId,
     bidderName: incoming.formData.bidderName,
     bidderContact: incoming.formData.bidderContact,
     bidderEmail: incoming.formData.bidderEmail,
    bidderAddress:  incoming.formData.bidderAddress,
    auction_id:incoming.AuctionData.id
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
        const payload = {
            formData: formData,
            pledgeItems: incoming.pledgeItems,
            summary: incoming.summary,
            docChargeAmount: incoming.docChargeAmount || 0,
            docChargeDesc: incoming.docChargeDesc || "",
            
        };

        const response = await axios.post(
              `${API}/generate-bill/create-bill`,
            payload
        );

        if (response.data.status) {
            alert("Bill Generated Successfully!");
           navigate('/Auction-Creation')
        } else {
            alert("Failed to generate bill");
        }

    } catch (error) {
        console.log("Error submitting bill:", error);
        alert("Something went wrong");
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
      <div className="flex justify-center">
         <div className="w-[1290px] py-5 ">
        {/* Credit Note Details */}
        <section className="bg-[#ECECF6] p-4  px-18 border-gray-300">
          <h3 className="font-semibold font-weight-600 text-[20px] text-[#0A2478] mb-3">
            Credit Note Details
          </h3>

          <div className="flex gap-2 text-sm">
            
            <div>
              <div className="text-xs font-semibold mb-1">Date Of Issue</div>
              <input
                type="date"
                name="date_of_issue"
                value={formData.date_of_issue}
                onChange={handleChange}
                className="w-[150px] font-weight-600 bg-white px-2 py-1 rounded-[8px] border border-gray-300 h-[38px]"
              />
            </div>

              {/* REFERENCE INVOICE */}
              <div>
              <div className="text-xs font-semibold mb-1">
                Reference Invoice
              </div>
              <input
                name="reference_invoice_no"
                value={formData.reference_invoice_no}
                onChange={handleChange}
                className="w-[185px] border border-gray-300 bg-white px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                 Loan No.
              </div>
              <input
                name="loan_no"
                value={formData.loan_no}
                onChange={handleChange}
                className="w-[185px] border border-gray-300 bg-white px-2 py-1 rounded-[8px] h-[38px]"
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
                className="w-[199px] border border-gray-300 px-2 bg-white py-1 rounded-[8px] h-[38px]"
              />
              </div>
              <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">
                Reason for Credit Note <span className="text-red-500">*</span>
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-[200px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              >
                <option value="">--Select--</option>
                <option>Excess Payment Received</option>
                <option>Auction Settlement Difference</option>
                <option>Interest Reversal</option>
                <option>Service Charge Reversal</option>
                <option>Other</option>
              </select>
              </div>
               <div>
              <div className="text-xs font-semibold mb-1">
                Credit Amount (₹)
              </div>
              <input
                name="reference_invoice_no"
                value={formData.credit_amount}
                onChange={handleChange}
                className="w-[150px] border border-gray-300 bg-white px-2 py-1 rounded-[8px] h-[38px]"
                />
                
                
            </div>
 
            </div>
            <div className="mt-5">
              <div className="text-xs font-semibold mb-1">Description / Remarks*</div>
              <input
                name="city"
                value={formData.description}
                onChange={handleChange}
                className="w-[263px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>
        </section>

        {/* CUSTOMER DETAILS */}
        <section className="bg-[#FFE6E6] p-4  px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Customer Details
          </h3>

            <div className="flex flex-wrap gap-5 text-sm">
               <div>
              <div className="text-xs font-semibold mb-1">Customer Id</div>
              <input
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                className="w-[199px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Customer Name</div>
              <input
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-[263px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>

            

            <div>
              <div className="text-xs font-semibold mb-1">Address</div>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-[328px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">City</div>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-[140px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">State</div>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-[150px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Pin code</div>
              <input
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                className="w-[161px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Mobile Number</div>
              <input
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className="w-[150px] border bg-white border-gray-300 px-2 py-1 rounded-[8px] h-[38px]"
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
                className="w-[263px] border border-gray-300 bg-white px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Designation</div>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-[263px] border border-gray-300 bg-white px-2 py-1 rounded-[8px] h-[38px]"
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
                className="w-[263px] border border-gray-300 bg-white px-2 py-1 rounded-[8px] h-[38px]"
              />
            </div>
          </div>
        </section>
      </div>
</div>
     
    </div>
  );
};

export default AddCreditNotePage;
