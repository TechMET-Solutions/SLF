import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const AddCreditNotePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = location.state || {};
  console.log(incoming, "");
  const [formData, setFormData] = useState({
    // credit_note_id: "",
    date_of_issue: incoming?.formData?.invoiceDate,
    reference_invoice_no: incoming?.reference_invoice_no || "",
    loan_no: incoming.formData?.loanNo,
    reference_date: incoming.formData?.invoiceDate,
    customer_name: incoming.CustomerData?.printName || "",
    customer_id: incoming.CustomerData?.id || "",
    credit_amount: incoming?.creditNoteAmount || "",
    reason: "",
    address: incoming.CustomerData?.Permanent_Address,
    city: incoming.CustomerData?.Permanent_City,
    state: incoming.CustomerData?.Permanent_State,
    pin_code: incoming.CustomerData?.Permanent_Pincode,
    mobile_number: incoming.CustomerData?.mobile,
    email_id: incoming.CustomerData?.email,
    // description: "After auction settlement – Credit Note issued to customer.",
    description: "",
    prepared_by: "",
    designation: "",
    verified_by: "",
    bidderId: incoming.formData?.bidderId,
    bidderName: incoming.formData?.bidderName,
    bidderContact: incoming.formData?.bidderContact,
    bidderEmail: incoming.formData?.bidderEmail,
    bidderAddress: incoming.formData?.bidderAddress,
    auction_id: incoming.AuctionData?.id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


 const validateForm = (data) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pincodeRegex = /^\d{6}$/;

  if (!data.date_of_issue) return "Date of issue is required";
  if (!data.reference_invoice_no) return "Reference invoice is required";
  if (!data.loan_no) return "Loan number is required";
  if (!data.reference_date) return "Reference date is required";
  if (!data.reason) return "Reason is required";

  if (!data.credit_amount)
    return "Credit amount is required";
  if (Number(data.credit_amount) <= 0)
    return "Credit amount must be greater than 0";

  if (!data.customer_name) return "Customer name is required";
  if (!data.customer_id) return "Customer ID is required";
  if (!data.address) return "Address is required";
  if (!data.city) return "City is required";
  if (!data.state) return "State is required";

  if (!data.pin_code) return "Pincode is required";
  if (!pincodeRegex.test(data.pin_code)) return "Invalid pincode";

  if (!data.mobile_number) return "Mobile number is required";
  if (!mobileRegex.test(data.mobile_number))
    return "Invalid mobile number";

  if (!data.email_id) return "Email is required";
  if (!emailRegex.test(data.email_id)) return "Invalid email";

  if (!data.prepared_by) return "Prepared by is required";
  if (!data.designation) return "Designation is required";
  if (!data.verified_by) return "Verified by is required";

  return null; // ✅ no error
};

  
  // SUBMIT FUNCTION
  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       formData: formData,
  //       pledgeItems: incoming.pledgeItems,
  //       summary: incoming.summary,
  //       docChargeAmount: incoming.docChargeAmount || 0,
  //       docChargeDesc: incoming.docChargeDesc || "",
  //     };

  //     const response = await axios.post(
  //       `${API}/generate-bill/create-bill`,
  //       payload,
  //     );

  //     if (response.data.status) {
  //       alert(
  //         `Credit Note of ₹${formData.credit_amount} has been successfully generated.`,
  //       );
  //       navigate("/Auction-Creation");
  //     } else {
  //       alert("Failed to generate bill");
  //     }
  //   } catch (error) {
  //     console.log("Error submitting bill:", error);
  //     alert("Something went wrong");
  //   }
  // };

  const handleSubmit = async () => {
  const errorMessage = validateForm(formData);

  if (errorMessage) {
    alert(errorMessage); // ❗ only alert
    return;
  }

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
      alert(
        `Credit Note of ₹${formData.credit_amount} has been successfully generated.`
      );
      navigate("/Auction-Creation");
    } else {
      alert("Failed to generate bill");
    }
  } catch (error) {
    console.log("Error submitting bill:", error);
    alert("Something went wrong");
  }
};

  // CUSTOMER AUTOCOMPLETE

  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  const searchCustomers = async (searchValue) => {
    if (!searchValue) {
      setCustomerSuggestions([]);
      return;
    }

    try {
      setCustomerLoading(true);

      const response = await axios.get(
        // `/Master/doc/searchCustomers&search=${searchValue}`
        `${API}/Master/doc/Customer_list?search=${searchValue}`,
      );

      if (response.data && Array.isArray(response.data)) {
        setCustomerSuggestions(response.data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.log("Customer search error:", error);
    } finally {
      setCustomerLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (formData.customer_name) {
        searchCustomers(formData.customer_name);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [formData.customer_name]);

  const handleSelectCustomer = (customer) => {
    setFormData((prev) => ({
      ...prev,
      customer_id: customer.id || "",
      customer_name: customer.printName || "",
      address: customer.Permanent_Address || "",
      city: customer.Permanent_City || "",
      state: customer.Permanent_State || "",
      pin_code: customer.Permanent_Pincode || "",
      mobile_number: customer.mobile || "",
      email_id: customer.email || "",
    }));

    setShowSuggestions(false);
    setCustomerSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-center sticky top-[40px] z-40">
        <div className="flex items-center justify-between border border-gray-300 px-4 py-2  w-[1460px] h-[40px]  bg-white">
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
      <div className="flex   ">
        <div className="w-[1460px] ml-[35px]">
          {/* Credit Note Details */}
          <section
            className="
bg-[#FFE6E6] p-2 border-gray-300"
          >
            <h3 className="font-semibold font-weight-600 text-[20px] text-[#0A2478] mb-2">
              Credit Note Details
            </h3>

            <div className="flex gap-2 text-sm">
              <div>
                <div className=" font-semibold mb-1 text-xs">Date Of Issue</div>
                <input
                  type="date"
                  name="date_of_issue"
                  value={formData.date_of_issue}
                  onChange={handleChange}
                  className="w-[120px] font-weight-600 bg-white px-1 py-1 rounded-[8px] border  text-xs border-gray-300 "
                />
              </div>

              {/* REFERENCE INVOICE */}
              <div>
                <div className=" font-semibold mb-1 text-xs">
                  Reference Invoice
                </div>
                <input
                  name="reference_invoice_no"
                  placeholder="Enter invoice number"
                  value={formData.reference_invoice_no}
                  onChange={handleChange}
                  className="w-[185px] border border-gray-300 bg-white px-1 py-1 rounded-[8px] text-xs"
                />
              </div>
              <div>
                <div className=" font-semibold mb-1 text-xs">Loan No.</div>
                <input
                  name="loan_no"
                  placeholder="Loan No"
                  value={formData.loan_no}
                  onChange={handleChange}
                  className="w-[185px] border border-gray-300 bg-white px-1 py-1 rounded-[8px] text-xs "
                />
              </div>

              {/* REFERENCE DATE */}
              <div>
                <div className="flex items-center gap-2  font-semibold mb-1 text-xs">
                  Reference Date
                </div>
                <input
                  type="date"
                  name="reference_date"
                  placeholder="Enter reference_date"
                  value={formData.reference_date}
                  onChange={handleChange}
                  className="w-[120px] border border-gray-300 px-1 bg-white py-1 rounded-[8px] text-xs"
                />
              </div>
              <div className="flex flex-col">
                <label className=" font-semibold mb-1 text-xs">
                  Reason for Credit Note <span className="text-red-500">*</span>
                </label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-[200px] border bg-white border-gray-300 px-1 py-1 rounded-[8px] text-xs"
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
                <div className=" font-semibold mb-1 text-xs">
                  Credit Amount (₹)
                </div>
                <input
                  name="credit_amount"
                  value={formData.credit_amount}
                  placeholder="Enter credit amount"
                  onChange={handleChange}
                  className="w-[120px] border border-gray-300 bg-white px-1 py-1 rounded-[8px] text-xs"
                />
              </div>

              <div className="">
                <div className=" font-semibold mb-1 text-xs">
                  Description / Remarks
                </div>
                <input
                  name="description"
                  value={formData.description}
                  placeholder="Enter description"
                  onChange={handleChange}
                  className="w-[260px] border bg-white border-gray-300 px-1 py-1 rounded-[8px] text-xs"
                />
              </div>
            </div>
          </section>

          {/* CUSTOMER DETAILS */}
          <section className="bg-[#F7F7FF]  p-2 border-gray-300">
            <h3 className="font-semibold text-[20px] text-[#0A2478] mb-2">
              Customer Details
            </h3>

            <div className="flex flex-wrap gap-2 text-sm">
             

              <div className="relative">
                <div className="font-semibold mb-1 text-xs">Customer Name <span className="text-red-500">*</span></div>

                <input
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search customer..."
                  className="w-[180px] border bg-white border-gray-300 px-1 py-1 text-xs rounded-[8px] "
                />

                {/* 🔽 Suggestion Dropdown */}
                {showSuggestions && customerSuggestions.length > 0 && (
                  <div className="absolute z-50 bg-white border border-gray-300 w-full rounded shadow-md max-h-60 overflow-y-auto">
                    {customerSuggestions.map((customer) => (
                      <div
                        key={customer.id}
                        onClick={() => handleSelectCustomer(customer)}
                        className="px-1 py-1 text-xs cursor-pointer hover:bg-gray-100 "
                      >
                        <div className="font-medium">{customer.printName} ({customer.id})</div>
                        <div className="text-xs text-gray-500">
                          {customer.mobile} • {customer.Permanent_City}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {customerLoading && (
                  <div className="absolute bg-white px-2 text-xs text-gray-500">
                    Searching...
                  </div>
                )}
              </div>

             <div>
  <div className="font-semibold mb-1 text-xs">Customer Id</div>
  <input
    name="customer_id"
    value={formData.customer_id}
    onChange={handleChange}
    placeholder="Enter Customer Id"
    disabled
    className="w-[150px] border border-gray-300 px-1 py-1 text-xs rounded-[8px] 
               bg-gray-100 text-gray-500 cursor-not-allowed"
  />
</div>

              <div>
                <div className=" font-semibold mb-1 text-xs">Address</div>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled
                  placeholder="Enter Address"
                  className="w-[310px] border bg-gray-100 border-gray-300 px-1 py-1 text-xs rounded-[8px] "
                />
              </div>

              <div>
                <div className=" font-semibold mb-1 text-xs">City</div>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                      disabled
                  placeholder="Enter City"
                  className="w-[100px] border bg-gray-100 border-gray-300 px-1 py-1 text-xs rounded-[8px]"
                />
              </div>

              <div>
                <div className=" font-semibold mb-1 text-xs">State</div>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                     disabled
                  placeholder="Enter State"
                  className="w-[120px] border bg-gray-100 border-gray-300 px-1 py-1 text-xs  rounded-[8px] "
                />
              </div>
              <div>
                <div className=" font-semibold mb-1 text-xs">Pin code</div>
                <input
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleChange}
                   disabled
                  placeholder="Enter Pin code"
                  className="w-[100px] border bg-gray-100 border-gray-300 px-1 py-1 text-xs rounded-[8px] "
                />
              </div>
              <div>
                <div className=" font-semibold mb-1 text-xs">Mobile Number</div>
                <input
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                   disabled
                  placeholder="Enter Mobile Number"
                  className="w-[80px] border bg-gray-100 border-gray-300 px-1 py-1 text-xs rounded-[8px]"
                />
              </div>

              <div>
                <div className=" font-semibold mb-1 text-xs">Email ID</div>
                <input
                  name="email_id"
                  value={formData.email_id}
                  placeholder="Enter Email ID"
                   disabled
                  onChange={handleChange}
                  className="w-[300px] border bg-gray-100 rounded-[8px] border-gray-300 px-1 py-1 text-xs "
                />
              </div>
            </div>
            <div className="flex gap-2 mt-3"></div>
          </section>

          {/* AUTHORIZATION */}
          <section className="bg-[#FFE6E6]  p-2 ">
            <h3 className="font-semibold text-[20px] text-[#0A2478] mb-2">
              Authorization & Verification
            </h3>

            <div className="flex flex-wrap gap-5 text-sm">
              <div>
                <div className=" font-semibold mb-1 text-xs">
                  Prepared By (Name)<span className="text-red-500">*</span>
                </div>
                <input
                  name="prepared_by"
                  value={formData.prepared_by}
                  placeholder="Enter Prepared By"
                  onChange={handleChange}
                  className="w-[263px] border border-gray-300 bg-white px-1 py-1 text-xs rounded-[8px] "
                />
              </div>

              <div>
                <div className=" font-semibold mb-1 text-xs">Designation <span className="text-red-500">*</span></div>
                <input
                  name="designation"
                  value={formData.designation}
                  placeholder="Enter Designation"
                  onChange={handleChange}
                  className="w-[263px] border border-gray-300 bg-white px-1 py-1 rounded-[8px] "
                />
              </div>

              <div>
                <div className=" font-semibold mb-1 text-xs">
                  Verified By (Accounts Dept.) <span className="text-red-500">*</span>
                </div>
                <input
                  name="verified_by"
                  value={formData.verified_by}
                  placeholder="Enter Verified By"
                  onChange={handleChange}
                  className="w-[263px] border border-gray-300 bg-white px-1 py-1 rounded-[8px] "
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
