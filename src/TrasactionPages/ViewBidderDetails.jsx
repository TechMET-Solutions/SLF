
import { useState } from "react";
import { IoMdImage } from "react-icons/io";
import profileempty from "../assets/profileempty.png";

const ViewBidderDetails = () => {
  const [data] = useState([
    {
      id: 1,
      BidderID: "BID0001",
      BidderName: "MAYUR SUDAM TARLE",
      MobileNo: "9874521456",
      personalAddress: "H.No. 444-31, BHAGUR, NASHIK 422502, INDIA",
      ShopAddress: "H.No. 444-31, BHAGUR, NASHIK 422502, INDIA",
      LandlineNo: "0253-123456",
      GSTNo: "27AAACC1206D1ZG",
      FirmName: "Tarle Traders",
      AdharNo: "15862452",
      PanNo: "852245",
      EmailID: "mayur.tarle@example.com",
      AccountNo: "12345678910112",
      IFSCCode: "SBIN0001234",
      AccountHolderName: "MAYUR SUDAM TARLE",
      BankName: "State Bank of India",
      BankAddress: "MG Road Branch, Nashik",
    },
  ]);

  return (
    <div className="flex flex-col items-center mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
          View Bidder Details
        </h2>

        <div className="flex items-center gap-5">
          <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
            Exit
          </button>
        </div>
      </div>

      {/* Bidder Information Section */}
      <div className="max-w-[1290px] bg-white p-4 relative">
        <h1 className="text-blue-900 font-semibold text-xl pb-3">
          Bidder Information
        </h1>

        {data.map((bidder) => (
          <div
            key={bidder.id}
            className="flex flex-wrap justify-between grid-cols-4 gap-6 text-sm"
          >
            <div className="flex flex-wrap gap-2 flex-1 text-sm w-full">
              {/* Bidder Name */}
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">Bidder Name</label>
                {bidder.BidderName}
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">Mobile Number</label>
                {bidder.MobileNo}
              </div>

              {/* Alternate Mobile Number */}
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">
                  Alternate Mobile Number
                </label>
                {bidder.MobileNo}
              </div>

              {/* Email ID */}
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">Email ID</label>
                {bidder.EmailID}
              </div>

              {/* Personal Address */}
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">
                  Personal Address
                </label>
                {bidder.personalAddress}
              </div>

              {/* Shop Address */}
              <div className="flex flex-col gap-1 w-[300px]">
                <label className="text-gray-900 font-medium">Shop Address</label>
                {bidder.ShopAddress}
              </div>

              {/* Landline No 1 */}
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">Landline No 1</label>
                {bidder.LandlineNo}
              </div>

              {/* Landline No 2 */}
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">Landline No 2</label>
                {bidder.LandlineNo}
              </div>

              {/* Firm Name */}
              <div className="flex flex-col gap-1 w-[300px]">
                <label className="text-gray-900 font-medium">Firm Name</label>
                {bidder.FirmName}
              </div>

              {/* GST No */}
              <div className="flex flex-col gap-1 w-[300px]">
                <label className="text-gray-900 font-medium">GST No</label>
                {bidder.GSTNo}
              </div>

              {/* Aadhar No */}
              <div className="flex items-center gap-2 w-[300px] mb-4">
                <label className="text-gray-900 font-medium">Aadhar No</label>
                <div className="flex items-center gap-2 mt-10 -ml-10">
                  {bidder.AdharNo}
                  <IoMdImage className="text-black text-lg" />
                  <span>Adhar.png</span>
                </div>
                <input
                  type="file"
                  id="adhar"
                  name="adhar"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                />
              </div>

              {/* Pan No */}
              <div className="flex items-center gap-2 w-[300px] mb-4">
                <label className="text-gray-900 font-medium">Pan No</label>
                <div className="flex items-center gap-2 mt-10 -ml-10">
                  {bidder.PanNo}
                  <IoMdImage className="text-black text-lg" />
                  <span>Pan.png</span>
                </div>
                <input
                  type="file"
                  id="pan"
                  name="pan"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                />
              </div>

              {/* Upload Bidder Profile */}
              <div className="absolute top-4 right-4 flex flex-col items-center">
                <h1 className="font-semibold">Upload Bidder Profile</h1>
                <img
                  src={profileempty}
                  alt="profile"
                  className="h-[120px] w-[120px] border border-gray-300 object-cover"
                />
              </div>
            </div>
          </div>
        ))}
          </div>
          
               <div className="mt-4 w-[1290px] bg-white rounded-md p-4">
      <h1 className="text-blue-900 font-semibold text-xl pb-2">Add Bank Details</h1>

      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap justify-between gap-4 border-gray-200 pb-4 mb-4"
        >
          <div className="flex flex-wrap gap-10 flex-1 text-sm">
            {/* Account Number */}
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">Account Number</label>
              {item.AccountNo}
                
              
            </div>

            {/* IFSC Code */}
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">IFSC Code</label>
              {item.IFSCCode}
                
            </div>

            {/* Account Holder Name */}
            <div className="flex flex-col gap-1 w-[250px]">
              <label className="text-gray-900 font-medium">
                Account Holder Name
              </label>
              {item.AccountHolderName}
               
            </div>

            {/* Bank Name */}
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">Bank Name</label>
              {item.BankName}
                
            </div>

            {/* Bank Address */}
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">Bank Address</label>
             {item.BankAddress}
                
            </div>
          </div>
        </div>
      ))}
    </div>
  
 
    </div>
  );
};

export default ViewBidderDetails;
