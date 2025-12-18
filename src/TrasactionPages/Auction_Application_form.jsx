import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import profileempty from "../assets/profileempty.png";
function Auction_Application_form() {
  useEffect(() => {
    document.title = "SLF | Auction Application Form";
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    auction: "",
    auctionDate: "",
    auctionTime: "",
    auctionVenue: "",
    bidderId: "",
    bidderName: "",
    mobile: "",
    landline: "",
    firmName: "",
    pan: "",
    aadhaar: "",
    gst: "",
    fees: "",
    paymentMethod: "",
    utr: "",
    confirm: false,
    profileImage: null,
    bidderimg: null,
    transactionId: "",
     bankName: "",
  });
    
    console.log(formData,"formData")
   
const [selecetdbidder, setselecetdbidder] = useState(null);
    console.log(selecetdbidder,"selecetdbidder")
const [auctions, setAuctions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    console.log(suggestions, "suggestions")
    
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState(null);
    console.log(popupData,"popupData")
useEffect(() => {
  fetch(`${API}/Transactions/GetAuction`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setAuctions(data.data);
      }
    })
    .catch(err => console.log(err));
}, []);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };
const handleAuctionSelect = (auctionId) => {
  const selected = auctions.find((a) => a.id == auctionId);

  if (!selected) return;

  const formattedDate = new Date(selected.date)
    .toISOString()
    .split("T")[0]; // YYYY-MM-DD

  setFormData((prev) => ({
    ...prev,
    auction: auctionId,
    auctionDate: formattedDate,
    auctionTime: selected.time,
    auctionVenue: selected.venue,
    fees: selected.fees
    
  }));
};

   const handleSubmit = async () => {

  if (!formData.confirm) {
    alert("Please confirm the details");
    return;
  }

  const response = await fetch(`${API}/Auction/Application/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  console.log(result);

  if (result.success) {

    // STOP alert — open popup instead
    setPopupData({
      bidderId: formData.bidderId,
      bidderName: formData.bidderName,
      firmName: formData.firmName,
      mobile: formData.mobile,
      email: formData.email,
      pan: formData.pan,
      aadhaar: formData.aadhaar,
      gst: formData.gst,
      creditNoteID: result.creditNote.creditNoteID,
      creditAmount: result.creditNote.creditAmount,
        status: result.creditNote.status,
      auctionId:formData.auction,
      remarks: "Registration / EMD Deposit Received"
    });

    setShowPopup(true);
  } else {
    alert("Failed");
  }
};

const onChangeForbidders = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "bidderName" && value.length >= 1) {
        try {
            const res = await fetch(`${API}/Auction/bidders/search?q=${value}`);
            const data = await res.json();
            setSuggestions(data.bidders);
        } catch (err) {
            console.error(err);
        }
    } else {
        setSuggestions([]);
    }
};

  const onChangeForaddpaymentata = (e) => {
  const { name, value } = e.target;

  setFormData(prev => {
    let updated = { ...prev, [name]: value };

    // If user selects Bank Transfer → auto fill bank details
    if (name === "paymentMethod" && value === "Bank" && selecetdbidder) {
      updated = {
        ...updated,
        bankName: selecetdbidder.bank_name,
        utr: "", // remove UPI value
      };
    }

    // If UPI selected → clear bank fields
    if (name === "paymentMethod" && value === "UPI") {
      updated = {
        ...updated,
        
        transactionId: "",
      };
    }

 
   

    return updated;
  });
      
      


};
  return (
    <div className="min-h-screen w-full bg-white pb-10">
      {/* 🔹 Header */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white sticky top-[80px] z-40">
          <h2 className="text-red-600 font-bold text-[20px]">
            Auction Application Form
          </h2>

          <div className="flex gap-3">
            <button
                          //   onClick={() => navigate("/Add-Auction-Creation")}
           onClick={() => handleSubmit()}

              className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
            >
              Submit
            </button>
            <button
              onClick={() => navigate("/Auction-Creation")}
              className="bg-[#C1121F] text-white text-sm rounded px-4 py-2 cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Form Container */}
      <div className="flex justify-center mt-6 gap-10">
        <div className="w-[1050px]  rounded-xl  p-6">

          {/* 🔸 SECTION: Auction Details */}
          <h3 className="text-[#0A2478] font-semibold text-lg mb-4">
            Auction Details
          </h3>

          <div className="grid grid-cols-4 gap-5">
            <div>
              <label className="text-sm font-medium">Select Auction*</label>
             <select
  name="auction"
  value={formData.auction}
  onChange={(e) => handleAuctionSelect(e.target.value)}
  className="border rounded px-3 py-2 w-full mt-1"
>
  <option value="">Select Auction</option>

  {auctions.map((auction) => {
      const auctionDate = new Date(auction.date).toLocaleDateString("en-GB");
      


    

    return (
      <option key={auction.id} value={auction.id}>
      {auction.id}|  {auctionDate} | {auction.time} | {auction.venue}
      </option>
    );
  })}
</select>

            </div>

            <div>
              <label className="text-sm font-medium">Auction Date*</label>
             <input
  type="date"
  name="auctionDate"
  value={formData.auctionDate}
  onChange={onChange}
  disabled
  className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100 "
/>

            </div>

            <div>
              <label className="text-sm font-medium">Auction Time*</label>
              <input
                type="time"
                name="auctionTime"
                value={formData.auctionTime}
                              onChange={onChange}
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100 "
              />
            </div>

            <div>
              <label className="text-sm font-medium">Auction Venue*</label>
              <input
                type="text"
                name="auctionVenue"
                value={formData.auctionVenue}
                onChange={onChange}
                              placeholder="Venue"
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100 "
              />
            </div>
          </div>

          {/* 🔸 SECTION: Bidder Details */}
          <h3 className="text-[#0A2478] font-semibold text-lg mt-8 mb-4">
            Bidder Details
          </h3>

          <div className="grid grid-cols-4 gap-5">
 <div className="relative">
    <label className="text-sm font-medium">Bidder Name*</label>
    
    <input
        type="text"
        name="bidderName"
        value={formData.bidderName}
        onChange={onChangeForbidders}
        className="border rounded px-3 py-2 w-full mt-1"
        autoComplete="off"
    />

   {suggestions.length > 0 && (
    <ul className="absolute bg-white border w-full rounded shadow max-h-40 overflow-y-auto z-50">
        {suggestions.map((item) => (
           <li
    key={item.id}
    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
    onClick={() => {
        setFormData({
            ...formData,
            bidderId: item.id,
            bidderName: item.bidder_name,
            mobile: item.mobile_no,
            landline: item.landline_no,
            firmName: item.firm_name,
            pan: item.pan_no,
            aadhaar: item.aadhar_no,
            gst: item.gst_no,
            bidderimg:item.bidder_photo
        });
       setselecetdbidder(item)
        setSuggestions([]);
    }}
>
    {item.bidder_name}
</li>

        ))}
    </ul>
)}

</div>
            <div>
              <label className="text-sm font-medium">Bidder ID*</label>
              <input
                type="text"
                name="bidderId"
                value={formData.bidderId}
                              onChange={onChange}
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100"
              />
            </div>

          


            <div>
              <label className="text-sm font-medium">Mobile No*</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                              onChange={onChange}
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Landline No</label>
              <input
                type="text"
                name="landline"
                value={formData.landline}
                              onChange={onChange}
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100"
              />
            </div>

            {/* Row 2 */}
            <div>
              <label className="text-sm font-medium">Firm Name*</label>
              <input
                type="text"
                name="firmName"
                value={formData.firmName}
                              onChange={onChange}
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium">PAN No*</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                              onChange={onChange}
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Aadhar No*</label>
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={onChange}
                disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium">GST No*</label>
              <input
                type="text"
                name="gst"
                value={formData.gst}
                              onChange={onChange}
                              disabled
                className="border rounded px-3 py-2 w-full mt-1 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="confirm"
                onChange={onChange}
              />
              <span className="text-sm">
                I confirm these details are correct.
              </span>
            </label>
          </div>

          {/* 🔸 Upload Profile */}
          <div className="mt-6">
            <label className="text-sm font-medium">Upload Bidder Profile</label>
            <input type="file" name="profileImage" onChange={onChange} className="mt-2" />
          </div>

          {/* 🔸 PAYMENT */}
          <h3 className="text-[#0A2478] font-semibold text-lg mt-8 mb-4">
            Payment
          </h3>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-medium">Auction Fees*</label>
              <input
                type="number"
                name="fees"
                              value={formData.fees}
                              disabled
                onChange={onChange}
                className="border rounded px-3 py-2 w-full mt-1"
              />
            </div>

           <div>
  <label className="text-sm font-medium">Select Payment Method*</label>
  <select
    name="paymentMethod"
    value={formData.paymentMethod}
    onChange={onChangeForaddpaymentata}
    className="border rounded px-3 py-2 w-full mt-1"
  >
    <option value="">Select Method</option>
    <option value="UPI">UPI</option>
    <option value="Cash">Cash</option>
    <option value="Bank">Bank Transfer</option>
  </select>
</div>

{/* ---------- Show UTR only for UPI ---------- */}
{formData.paymentMethod === "UPI" && (
  <div>
    <label className="text-sm font-medium">UTR Number*</label>
    <input
      type="text"
      name="utr"
      value={formData.utr}
      onChange={onChange}
      className="border rounded px-3 py-2 w-full mt-1"
    />
  </div>
)}


{/* ---------- Show Bank Transfer Fields ---------- */}
{formData.paymentMethod === "Bank" && (
  <>
    <div>
      <label className="text-sm font-medium">Bank Name</label>
      <input
        type="text"
        value={formData.bankName}
        disabled
        className="border rounded px-3 py-2 w-full mt-1 bg-gray-100"
      />
    </div>

    <div>
      <label className="text-sm font-medium">Transaction ID*</label>
      <input
        type="text"
        name="transactionId"
        value={formData.transactionId}
        onChange={onChange}
        className="border rounded px-3 py-2 w-full mt-1"
      />
    </div>
  </>
)}


          </div>

        
         

              </div>
              <div>
               <p className="font-roboto font-medium text-[16px] leading-[100%] tracking-[3%] text-center">
 Bidder Profile
</p>

<img
  src={
    formData.bidderimg
      ? (typeof formData.bidderimg === "string"
          ? formData.bidderimg                // Already a URL from DB
          : URL.createObjectURL(formData.bidderimg) // New file preview
        )
      : profileempty
  }
  alt="Bidder Profile"
  className="w-[156px] h-[156px] mt-5 object-cover rounded-md"
/>


                  
              </div>
          </div>
          

          {showPopup && popupData && (
  <div                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                style={{
                  background: "#0101017A",
                  backdropFilter: "blur(6.8px)",
                }}>
    <div className="bg-white w-[570px] h-[407px] shadow-lg rounded border  relative">

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
                             <div><p>Status:</p> <p> Available for Adjustment </p></div>
                              <div><p>Remarks:</p><p> EMD Credit utilized for auction payment.</p></div>
                              </div>
                          </div>
      {/* Bidder Details */}
     
    </div>
  </div>
)}

    </div>
  );
}

export default Auction_Application_form;
