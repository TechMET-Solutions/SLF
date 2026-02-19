import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const PrintCreditNote = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = location.state || {}; 

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Credit Note by ID
  useEffect(() => {
    if (!id) {
      alert("Invalid Credit Note ID");
      navigate("/Credit-Note");
      return;
    }

    const fetchCreditNote = async () => {
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

    fetchCreditNote();
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

  // PRINT FUNCTION
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex justify-center no-print sticky top-[80px] z-40">
        <div className="flex items-center justify-between border border-gray-300 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-lg bg-white">

          <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap mr-4">
            Credit Note
          </h2>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#007620] text-white px-6 py-1 text-sm rounded hover:bg-[#005b16] shadow-lg"
            >
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
      <div className="p-2  flex justify-center  mt-2 ml-[110px] mr-[110px]">
        <div>
 <div className=" bg-white ">

        {/* Credit Note Details */}
        <section className="bg-[#ECECF6] p-4  border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Credit Note Details
          </h3>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="font-semibold text-xs mb-1">Credit Note No.</div>
              <p>{data.credit_note_id}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Date Of Issue</div>
              <p>{data.date_of_issue}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Reference Invoice/Receipt No.
              </div>
              <p>{data.reference_invoice_no}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Reference Date</div>
              <p>{data.reference_date}</p>
            </div>
          </div>
        </section>

        {/* Customer Details */}
        <section className="bg-[#FFE6E6] p-4  border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Customer Details
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Customer Name</div>
              <p>{data.customer_name}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">
                Customer ID 
              </div>
              <p>{data.customer_id}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Address</div>
              <p>{data.address}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">City</div>
              <p>{data.city}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">State</div>
              <p>{data.state}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Pin code</div>
              <p>{data.pin_code}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Mobile Number</div>
              <p>{data.mobile_number}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Email ID</div>
              <p>{data.email_id}</p>
            </div>
          </div>
        </section>

       
       

        {/* Authorization */}
        <section className="bg-[#eef2ff] p-4 ">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Authorization & Verification
          </h3>

          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">Prepared By</div>
              <p>{data.prepared_by}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Designation</div>
              <p>{data.designation}</p>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1">Verified By</div>
              <p>{data.verified_by}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Declaration + Notes */}
      <div className="bg-[#F7F7FF] p-6  text-[14px] text-gray-800 ">

        <div className="flex justify-between mb-6">
          <p>Date of Approval:</p>
          <p>Approved By:</p>
          <p>Seal / Stamp:</p>
        </div>

        {/* Declaration */}
        <h3 className="font-semibold text-[#0A2478] text-[20px] mb-2">
          Declaration
        </h3>
        <p>
          This Credit Note has been issued as per NBFC guidelines…
        </p>

        {/* Footer */}
        <div className="grid grid-cols-3 mt-16">
          <p>Date:</p>
          <p>Place:</p>
          <p className="text-right">Authorized Signatory:</p>
        </div>

        {/* Notes */}
        <h3 className="font-semibold text-[#0A2478] text-[20px] mt-10 mb-2">
          Notes
        </h3>
        <ul className="list-decimal list-inside">
          <li>Preserve this Credit Note for audit purposes.</li>
          <li>It cannot be transferred or used as a negotiable instrument.</li>
          <li>For queries, contact Accounts Department.</li>
        </ul>
      </div>
        </div>
        {/* MAIN CONTENT */}
     

</div>
      
    </div>
  );
};

export default PrintCreditNote;
