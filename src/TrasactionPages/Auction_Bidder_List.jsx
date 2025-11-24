import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import Desaible from "../assets/Desaible.png";
import Enable from "../assets/Enable.png";
function Auction_Bidder_List() {
  useEffect(() => {
    document.title = "SLF | Auction Bidder List";
  }, []);
const [showPopup, setShowPopup] = useState(false);

const [popupData, setPopupData] = useState({
  bidderId: "",
  bidderName: "",
  firmName: "",
  mobile: "",
  email: "",
  gst: "",
  pan: "",
  aadhaar: "",
  creditNoteID: "",
  creditAmount: "",
  credit_status: "",
  credit_remarks: "",
  auctionId: "",
});
  const location = useLocation();
  const auctionId = location.state?.auctionId;
  console.log(auctionId,"auctionId")// <-- GET AUCTION ID
  const navigate = useNavigate();

  // State for storing auction bidders
  const [applicationData, setApplicationData] = useState([]);
  console.log("Application Data:", applicationData);

  useEffect(() => {
    if (auctionId) {
      fetchAuctionApplications();
    }
  }, [auctionId]);


  const fetchAuctionApplications = async () => {
    try {
      const res = await fetch(`${API}/Auction/Application/GetByAuctionId/${auctionId}`);
      const json = await res.json();

      if (json.success) {
        setApplicationData(json.data);
      }
    } catch (err) {
      console.log("Error fetching application bidders:", err);
    }
  };
const handleStatusClick = (row) => {
  setPopupData({
    bidderId: row.bidder_id,
    bidderName: row.bidder_name,
    firmName: row.firm_name,
    mobile: row.mobile,
    email: row.email,
    gst: row.bidder_gst_no,
    pan: row.bidder_pan_no,
    aadhaar: row.bidder_aadhar_no,

    creditNoteID: row.credit_note_ref,
    creditAmount: row.credit_amount,
    credit_status: row.credit_status,   // VERY IMPORTANT
    credit_remarks: row.credit_remarks,

    auctionId: row.auction_id,
  });

  setShowPopup(true);
};

  return (
    <div className="min-h-screen w-full">
      
      {/* 🔹 HEADER */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">
            Auction Bidder List (Auction ID: {auctionId})
          </h2>

          <div className="flex gap-3">
            {/* <button
              onClick={() => navigate("/Auction-Creation")}
              className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
            >
             Auction Application
            </button> */}

            {/* <button
              onClick={() => navigate("/")}
              className="bg-[#C1121F] text-white text-sm rounded px-4 py-2 cursor-pointer"
            >
              Exit
            </button> */}
          </div>
        </div>
      </div>

      {/* 🔹 TABLE SECTION */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-6 w-[1300px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r">Bidder ID</th>
                <th className="px-4 py-2 text-left border-r">Name</th>
                <th className="px-4 py-2 text-left border-r">Mobile No.</th>
                  <th className="px-4 py-2 text-left border-r">Shop Address</th>
              
                <th className="px-4 py-2 text-left border-r">Landline No.</th>
                <th className="px-4 py-2 text-left border-r">GST No.</th>
                  <th className="px-4 py-2 text-left border-r">Firm Name</th>
                <th className="px-4 py-2 text-left border-r">Fees</th>
                 <th className="px-4 py-2 text-left border-r">Status</th>
               
                <th className="px-4 py-2 text-left border-r">Credit Note</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="text-[13px]">
              {applicationData.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No Bidders Found
                  </td>
                </tr>
              ) : (
                applicationData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    {/* Bidder Details */}
                    <td className="px-4 py-2 font-semibold text-blue-600">
                      {row.bidder_id}
                    </td>

                    <td className="px-4 py-2">{row.bidder_name}</td>
                    <td className="px-4 py-2">{row.mobile}</td>
                    <td className="px-4 py-2">{row.shop_address}</td>
                 
                    <td className="px-4 py-2">{row.landline}</td>
                    <td className="px-4 py-2">{row.gst_no}</td>
                    <td className="px-4 py-2">{row.firm_name}</td>
                    <td className="px-4 py-2">₹ {row.fees}</td>
                    <td className="px-4 py-2">
  {row.credit_status === "active"
    ? "Generated"
    : row.credit_status === "inactive"
    ? "Used"
    : row.credit_status === "canceled"
    ? "Cancelled"
    : row.credit_status}
                    </td>
                   <td
  className="px-4 py-2 flex items-center gap-2 justify-center cursor-pointer"
  onClick={() => handleStatusClick(row)}  // 👉 Add this
>
  <img
    src={row.credit_status === "active" ? Enable : Desaible}
    alt="status"
    className="w-6 h-6"
  />
</td>

                   <td className="px-4 py-2">
  {row.credit_status === "active" && (
  <>
    {/* <img
      src={Enable}
      alt="status"
      className="w-6 h-6"
    /> */}

    <div className="bg-red-500 text-white w-[22px] h-[22px] flex items-center justify-center cursor-pointer">
      <IoMdCloseCircleOutline size={20} />
    </div>
  </>
)}

</td>


                    
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

       {showPopup && popupData && (
  <div                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                style={{
                  background: "#0101017A",
                  backdropFilter: "blur(6.8px)",
                }}>
    <div className="bg-white w-[570px] h-auto shadow-lg rounded border  relative">

      {/* Close Button */}
    <button
  className="absolute right-4 top-4 text-xl text-white"
  onClick={() => {
    setShowPopup(false);
    navigate("/Auction_Bidder_List", {
      state: {
        auctionId: popupData.auctionId
      }
    });
  }}
>
  ✖
</button>



      <h2 className="text-lg font-semibold text-white bg-[#0A2478] p-3 rounded">
        Credit Note - Bidder Registration Deposit
      </h2>
                      <div className="p-5">
                           <h3 className="text-[18px] font-bold mt-2 ">Bidder Details</h3>

      <div className="flex gap-5 mt-2">
<div><p>Bidder ID:</p> <p> {popupData.bidderId}</p></div>
       
       <div> <p>Bidder Name:</p><p> {popupData.bidderName}</p></div>

        <div><p>Firm Name:</p><p> {popupData.firmName}</p></div>
      <div> <p>Mobile No:</p>  <p>{popupData.mobile}</p></div>

        <div><p>Email Id:</p> <p>{popupData.email}</p></div>
       

                          </div>
                          <div className="flex gap-5 mt-4">

                              <div>
                                  <p>GST No:</p> 
                                  <p>{popupData.gst}</p></div>

      <div> <p>PAN No:</p> <p> {popupData.pan}</p></div>
       <div> <p>Aadhar No:</p> <p>{popupData.aadhaar}</p></div>
                              </div>

      {/* Credit Details */}
      {/* <h3 className="text-md font-semibold mt-6">Credit Details</h3> */}
  <h3 className="text-[18px] font-bold mt-2 ">Credit Details</h3>
      <div className="flex mt-5 gap-5">

        <div><p>Credit Note ID:</p><p> {popupData.creditNoteID}</p></div>
       <div> <p>Credit Amount (₹):</p><p> {popupData.creditAmount}</p></div>

       <div> <p>Reason for Credit:</p><p> Registration / EMD Deposit Received</p></div>

       

                          </div>
                          <div className="flex mt-5 gap-5">
                             <div><p>Status:</p> <p className={popupData.credit_status === "active" ? "text-green-600" : "text-red-600"}>
  {popupData.credit_status === "active"
    ? "Available for Adjustment"
    : "Not Available for Adjustment"}
</p>
</div>
                <div><p>Remarks:</p><p> { popupData.credit_remarks}</p></div>
                              </div>
                          </div>
      {/* Bidder Details */}
     
    </div>
  </div>
)}
    </div>
  );
}

export default Auction_Bidder_List;
