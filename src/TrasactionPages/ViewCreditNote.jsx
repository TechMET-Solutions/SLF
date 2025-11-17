import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ViewCreditNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id; // ⬅️ GET ID FROM STATE

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH CREDIT NOTE BY ID
  useEffect(() => {
    if (!id) {
      alert("No credit note ID provided");
      navigate("/Credit-Note");
      return;
    }

    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/credit-note/credit-note/${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch credit note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  if (loading) {
    return <p className="text-center mt-20 text-lg font-bold">Loading...</p>;
  }

  if (!data) {
    return (
      <p className="text-center mt-20 text-red-600 text-lg font-bold">
        Credit Note Not Found!
      </p>
    );
  }

  return (
    <div>
      {/* HEADER SECTION */}
      <div className="flex justify-center">
        <div className="flex items-center justify-between border border-gray-300 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-lg">
          <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap mr-4">
            View Credit Note
          </h2>

          <div className="flex gap-2">
            <button className="bg-[#0A2478] text-white px-4 py-1 text-sm rounded">
              Submit
            </button>

            <button
              onClick={() => navigate("/Credit-Note")}
              className="bg-[#C1121F] text-white px-4 py-1 text-sm rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full bg-white shadow-md py-5 mt-2">

        {/* CREDIT NOTE DETAILS */}
        <section className="bg-[#ECECF6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Credit Note Details
          </h3>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="font-semibold text-xs mb-1">Credit Note No.</div>
              <p className="w-[250px] py-1">{data.credit_note_id}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Date Of Issue</div>
              <p className="w-[250px] py-1">{data.date_of_issue}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Reference Invoice/Receipt No.
              </div>
              <p className="w-[250px] py-1">{data.reference_invoice_no}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Reference Date</div>
              <p className="w-[250px] py-1">{data.reference_date}</p>
            </div>
          </div>
        </section>

        {/* CUSTOMER DETAILS */}
        <section className="bg-[#FFE6E6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Customer Details
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Customer Name</div>
              <p className="w-[200px] py-1">{data.customer_name}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Customer ID / Loan Account No.
              </div>
              <p className="w-[220px] py-1">{data.customer_id}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Address</div>
              <p className="w-[300px] py-1">{data.address}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">City</div>
              <p className="w-[140px] py-1">{data.city}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">State</div>
              <p className="w-[140px] py-1">{data.state}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Pin code</div>
              <p className="w-[140px] py-1">{data.pin_code}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Mobile Number</div>
              <p className="w-[150px] py-1">{data.mobile_number}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Email ID</div>
              <p className="w-[200px] py-1">{data.email_id}</p>
            </div>
          </div>
        </section>

        {/* PAYMENT DETAILS */}
        <section className="bg-[#ECECF6] p-4 px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Payment / Adjustment Details
          </h3>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Reason</div>
              <p className="w-[220px] py-1">{data.reason}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Description</div>
              <p className="w-[300px] py-1">{data.description}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Original Amount</div>
              <p className="w-[200px] py-1">₹{data.original_amount}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Adjusted Amount
              </div>
              <p className="w-[200px] py-1">₹{data.adjustment_amount}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Net Amount
              </div>
              <p className="w-[200px] py-1">₹{data.net_amount}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Mode of Payment</div>
              <p className="w-[200px] py-1">{data.mode_of_payment}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Bank Name</div>
              <p className="w-[200px] py-1">{data.bank_name}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Account No.
              </div>
              <p className="w-[200px] py-1">{data.account_no}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Transaction No.
              </div>
              <p className="w-[200px] py-1">{data.transaction_no}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Transaction Date
              </div>
              <p className="w-[200px] py-1">{data.transaction_date}</p>
            </div>
          </div>
        </section>

        {/* AUTHORIZATION */}
        <section className="bg-[#EEF2FF] p-4 px-18">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Authorization & Verification
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Prepared By</div>
              <p className="w-[200px] py-1">{data.prepared_by}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Designation</div>
              <p className="w-[200px] py-1">{data.designation}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Verified By</div>
              <p className="w-[200px] py-1">{data.verified_by}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewCreditNote;
