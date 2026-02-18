import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { formatIndianDate } from "../utils/Helpers";

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
        const res = await axios.get(`${API}/credit-note/credit-note/${id}`);
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
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center justify-between border border-gray-300 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-lg bg-white">
          <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap mr-4">
            View Customer Credit Note
          </h2>

          <div className="flex gap-2">
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
      <div className="flex justify-center">
        <div className="w-[1290px] bg-white mt-2">
          {/* CREDIT NOTE DETAILS */}
          <section className="bg-[#ECECF6] p-4 px-18 border-gray-300 mt-10">
            <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
              Credit Note Details
            </h3>

            <div className="flex gap-5 text-sm">
              <div>
                <div className="font-semibold text-xs mb-1">
                  Credit Note No.
                </div>
                <p className=" py-1 mt-2">{data.credit_note_id}</p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">Date Of Issue</div>
                <p className=" py-1 mt-2">
                  {formatIndianDate(data.date_of_issue)}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">
                  Reference Invoice/Receipt No.
                </div>
                <p className=" py-1 mt-2">
                  {data.reference_invoice_no &&
                  data.reference_invoice_no.trim() !== ""
                    ? data.reference_invoice_no
                    : "--"}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">
                  Reason for credit Note
                </div>
                <p className=" py-1 mt-2">Surplus Amount After Auction</p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">
                  Description / Remarks
                </div>
                <p className=" py-1 mt-2">
                  Surplus from auction recovery after loan settlement
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold mb-1">
                  Credit Amount (₹)
                </div>
                <p className=" py-1 mt-2">{data.CreditAmount}</p>
              </div>
              <div>
                <div className="text-xs font-semibold mb-1">Reference Date</div>
                <p className=" py-1 mt-2">
                  {formatIndianDate(data.reference_date)}
                </p>
                {/* <p className="w-[250px] py-1">{data.reference_date}</p> */}
              </div>
            </div>
          </section>

          {/* CUSTOMER DETAILS */}
          <section className="bg-[#FFE6E6] p-4 px-18 border-gray-300">
            <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
              Customer Details
            </h3>

            <div className="flex flex-wrap gap-10 text-sm">
              <div>
                <div className="text-xs font-semibold mb-1">Customer Id</div>
                <p className=" py-1 mt-2">{data.customer_id}</p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">Customer Name</div>
                <p className=" py-1 mt-2">{data.customer_name}</p>
              </div>
              <div>
                <div className="text-xs font-semibold mb-1">Address</div>
                <p className=" py-1 mt-2">{data.address}</p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">City</div>
                <p className=" py-1 mt-2">{data.city}</p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">State</div>
                <p className=" py-1 mt-2">{data.state}</p>
              </div>

              <div>
                <div className="text-xs font-semibold mb-1">Pin code</div>
                <p className=" py-1 mt-2">{data.pin_code}</p>
              </div>
              <div>
                <div className="text-xs font-semibold mb-1">Mobile Number</div>
                <p className=" py-1 mt-2">{data.mobile_number}</p>
              </div>
              <div>
                <div className="text-xs font-semibold mb-1">Email ID</div>
                <p className=" py-1 mt-2">{data.email_id}</p>
              </div>
            </div>
          </section>

          {/* PAYMENT DETAILS */}

          {/* AUTHORIZATION */}
          <section className="bg-[#EEF2FF] p-4 px-18">
            <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
              Authorization & Verification
            </h3>

            <div className="flex flex-wrap gap-5 text-sm mt-5 ">
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
    </div>
  );
};

export default ViewCreditNote;
