// import { useRef } from "react";
// import { MdOutlineFileUpload } from "react-icons/md";
// import profileempty from '../assets/profileempty.png';
// const BidderRegistration = () => {
   

//         return (
//             <div className="flex flex-col items-center mt-5">
//                 {/* Header Section */}
//                 <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
//                     <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
//                         Bidder Registration
//                     </h2>
 
//                     <div className="flex items-center gap-5">
//                         <button className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
//                             Submit
//                         </button>
//                         <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//                 {/* Loan Information Section */}
//                 <div className=" max-w-[1290px] bg-white p-4">
//                     <h1 className="text-blue-900 font-semibold text-xl pb-3">Bidder Information</h1>
 
//                     <div className="flex flex-wrap justify-between grid-cols-4 gap-6 text-sm">
//                         {/* Left Section (Form Fields) */}
//                         <div className="flex flex-wrap gap-5 flex-1 text-sm w-full">
 
//                             {/* Bidder Name */}
//                             <div className="flex flex-col gap-1 w-[250px]">
//                                 <label className="text-gray-900 font-medium">Bidder Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Bidder Name"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
                         
 
//                             {/* Mobile Number */}
//                             <div className="flex flex-col gap-1  w-[250px]">
//                                 <label className="text-gray-900 font-medium">Mobile Number</label>
//                                 <input
//                                     type="number"
//                                     placeholder="Mobile Number"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/*Alternate Mobile Number */}
//                             <div className="flex flex-col gap-1  w-[250px]">
//                                 <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
//                                 <input
//                                     type="number"
//                                     placeholder="Alternate Mobile Number"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/* Email ID*/}
//                             <div className="flex flex-col gap-1  w-[250px]">
//                                 <label className="text-gray-900 font-medium">Email ID</label>
//                                 <input
//                                     type="email"
//                                     placeholder="Email ID"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/*Personal Address*/}
//                             <div className="flex flex-col gap-1 w-[250px]">
//                                 <label className="text-gray-900 font-medium">Personal Address</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Personal Address"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/* Shop Address */}
//                             <div className="flex flex-col gap-1 w-[250px]">
//                                 <label className="text-gray-900 font-medium">Shop Address</label>
//                                 <div className="flex">
//                                     <input
//                                         type="text"
//                                         placeholder="Shop Address"
//                                         className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                     />
                                 
//                                 </div>
//                             </div>
 
//                             {/* Landline No 1 */}
//                             <div className="flex flex-col gap-1 w-[250px]">
//                                 <label className="text-gray-900 font-medium">Landline No 1</label>
//                                 <input
//                                     type="number"
//                                     placeholder='203-53363'
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
                     
//                             {/* Landline No 2 */}
//                             <div className="flex flex-col gap-1 w-[250px]">
//                                 <label className="text-gray-900 font-medium">Landline No 2</label>
//                                 <input
//                                     type="number"
//                                     placeholder='203-53363'
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/* Firm Name */}
//                             <div className="flex flex-col gap-1 w-[280px]">
//                                 <label className="text-gray-900 font-medium">Firm Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Firm Name"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/* GST No */}
//                             <div className="flex flex-col gap-1 w-[320px]">
//                                 <label className="text-gray-900 font-medium">GST No</label>
//                                 <input
//                                     type="number"
//                                     placeholder="GST No"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
                     
                     
//                             {/* Aadhar No */}
//                             <div className="flex flex-col gap-1 w-[250px]">
//                                 <label className="text-gray-900 font-medium"> Aadhar No</label>
//                                 <input
//                                     type="number"
//                                     placeholder=" Aadhar No"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
//                             <div className="flex flex-col space-y-2">
//                                 <label htmlFor="document" className="text-sm font-medium text-gray-700">
//                                     Upload Document
//                                 </label>
//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     onChange={handleFileChange}
//                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                                     className="hidden"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={handleUploadClick}
//                                     className="bg-blue-950  text-white font-semibold py-2 px-4 rounded-md w-fit flex items-center gap-2"
                                    
//                                 >
//                                     Upload Document
//                                     <MdOutlineFileUpload className="text-xl" />
//                                 </button>
//                             </div>
 
//                             {/* Pan No */}
//                             <div className="flex flex-col gap-1 w-[170px]">
//                                 <label className="text-gray-900 font-medium">Pan No</label>
//                                 <input
//                                     type="number"
//                                     placeholder="Pan No"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             <div className="flex flex-col space-y-2">
//                                 <label htmlFor="document" className="text-sm font-medium text-gray-700">
//                                     Upload Document
//                                 </label>
//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     onChange={handleFileChange}
//                                     accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                                     className="hidden"
                                    
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={handleUploadClick}
//                                     className="bg-blue-950  text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 w-fit"
//                                 >
//                                      Upload Document
//         <MdOutlineFileUpload className="text-xl" />
//                                 </button>
//                             </div>
                         
//                             <div className=" absolute top-50 right-30"> {/* Make parent relative */}
//                                 {/* ... your Bidder Information form fields ... */}

//                                 {/* <div className="absolute top-2 right-4"> */}
//                                 <h1 className='font-semibold'>Upload Bidder Profile</h1>
//                                 <img
//                                     src={profileempty}
//                                     alt="profile"
//                                     className="h-[120px] w-[120px]  border border-gray-300 object-cover "
                             
        
                         
                             
//                                 />
                         
//                             </div>
//                         </div>
//                         {/* </div> */}
                     
//                     </div>
//                 </div>
 
 
 
             
            
 
             
//                 <div className="mt-4 w-[1290px] bg-white rounded-md">
//                     <h1 className="text-blue-900 font-semibold text-xl pb-2">Add Bank Details</h1>
//                     <div className="flex flex-wrap justify-between gap-4">
//                         {/* Left Section (Form Fields) */}
//                         <div className="flex flex-wrap gap-10 flex-1 text-sm">
 
//                             {/* Account No */}
//                             <div className="flex flex-col gap-1  w-[160px]">
//                                 <label className="text-gray-900 font-medium">Account Number</label>
//                                 <input
//                                     type="number"
//                                     placeholder=" 521753215"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
                         
 
//                             {/* IFSC Number */}
//                             <div className="flex flex-col gap-1  w-[160px]">
//                                 <label className="text-gray-900 font-medium">IFSC Number</label>
//                                 <input
//                                     type="number"
//                                     placeholder="IFSC Number"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/*Alternate Mobile Number */}
//                             <div className="flex flex-col gap-1  w-[160px]">
//                                 <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
//                                 <input
//                                     type="number"
//                                     placeholder="Alternate Mobile Number"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/* Account Holder No*/}
//                             <div className="flex flex-col gap-1  w-[160px]">
//                                 <label className="text-gray-900 font-medium">Account Holder No</label>
//                                 <input
//                                     type="number"
//                                     placeholder="46242266"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/*Bank Name*/}
//                             <div className="flex flex-col gap-1 w-[160px]">
//                                 <label className="text-gray-900 font-medium">Bank Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Bank Name"
//                                     className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                 />
//                             </div>
 
//                             {/* Bank Address */}
//                             <div className="flex flex-col gap-1 w-[160px]">
//                                 <label className="text-gray-900 font-medium">Bank Address </label>
//                                 <div className="flex">
//                                     <input
//                                         type="text"
//                                         placeholder="Bank Address "
//                                         className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                     />
                                 
//                                 </div>
//                             </div>
 
                        
                     
 
                         
 
                         
                         
 
                        
                         
                         
//                         </div>
                     
//                     </div>
                
//                 </div>
 
 
 
            
 
//             </div >
 
//         )
//     }


// export default BidderRegistration 


import { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import profileempty from "../assets/profileempty.png";
import { registerBidderApi } from "../API/Transaction/Auction/BidderApi";; // ✅ Import API
import { useNavigate } from "react-router-dom";

const BidderRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bidder_name: "",
    mobile_no: "",
    alt_mob_no: "",
    email: "",
    personal_address: "",
    shop_address: "",
    landline_no: "",
    landline_no2: "",
    firm_name: "",
    gst_no: "",
    aadhar_no: "",
    pan_no: "",
    bank_name: "",
    account_no: "",
    ifsc_code: "",
    account_holder_name: "",
  });

  // File Refs
  const aadharRef = useRef(null);
  const panRef = useRef(null);
  const photoRef = useRef(null);

  // File States
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [bidderPhoto, setBidderPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // File change handler
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "aadhar") setAadharFile(file);
    else if (type === "pan") setPanFile(file);
    else if (type === "photo") setBidderPhoto(file);
  };

  // Submit Form
  const handleSubmit = async () => {
    try {
      // ✅ Validate minimal fields
      if (!formData.bidder_name || !formData.mobile_no || !formData.gst_no) {
        alert("Please fill all required fields!");
        return;
      }

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      if (aadharFile) data.append("aadharFile", aadharFile);
      if (panFile) data.append("panFile", panFile);
      if (bidderPhoto) data.append("bidder_photo", bidderPhoto);

      const res = await registerBidderApi(data);

      if (res?.message) {
        alert("✅ Bidder Registered Successfully!");
        navigate("/Bidder-Registration-List");
      }
    } catch (err) {
      console.error("❌ Registration Error:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 w-[1290px] border border-gray-200 rounded-[11px] shadow-sm">
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48]">
          Bidder Registration
        </h2>

        <div className="flex items-center gap-5">
          <button
            onClick={handleSubmit}
            className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <button
            onClick={() => navigate("/Bidder-Registration-List")}
            className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Bidder Information */}
      <div className="max-w-[1290px] bg-white p-4 mt-4 rounded-md shadow-sm">
        <h1 className="text-blue-900 font-semibold text-xl pb-3">Bidder Information</h1>

        <div className="flex flex-wrap gap-6 text-sm">
          {[
            { label: "Bidder Name", name: "bidder_name" },
            { label: "Mobile Number", name: "mobile_no" },
            { label: "Alternate Mobile", name: "alt_mob_no" },
            { label: "Email ID", name: "email" },
            { label: "Personal Address", name: "personal_address" },
            { label: "Shop Address", name: "shop_address" },
            { label: "Landline No 1", name: "landline_no" },
            { label: "Landline No 2", name: "landline_no2" },
            { label: "Firm Name", name: "firm_name" },
            { label: "GST No", name: "gst_no" },
            { label: "Aadhar No", name: "aadhar_no" },
            { label: "PAN No", name: "pan_no" },
          ].map((f) => (
            <div key={f.name} className="flex flex-col gap-1 w-[250px]">
              <label className="text-gray-900 font-medium">{f.label}</label>
              <input
                name={f.name}
                type="text"
                value={formData[f.name]}
                onChange={handleChange}
                placeholder={f.label}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          {/* File Uploads */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Upload Aadhar</label>
            <input
              type="file"
              ref={aadharRef}
              onChange={(e) => handleFileChange(e, "aadhar")}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => aadharRef.current.click()}
              className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 w-fit"
            >
              Upload Aadhar <MdOutlineFileUpload className="text-xl" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Upload PAN</label>
            <input
              type="file"
              ref={panRef}
              onChange={(e) => handleFileChange(e, "pan")}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => panRef.current.click()}
              className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 w-fit"
            >
              Upload PAN <MdOutlineFileUpload className="text-xl" />
            </button>
          </div>

          {/* Bidder Photo Upload */}
          <div className="flex flex-col items-center space-y-2">
            <h1 className="font-semibold">Upload Bidder Profile</h1>
            <img
              src={bidderPhoto ? URL.createObjectURL(bidderPhoto) : profileempty}
              alt="profile"
              className="h-[120px] w-[120px] border border-gray-300 object-cover rounded-md"
            />
            <input
              type="file"
              ref={photoRef}
              onChange={(e) => handleFileChange(e, "photo")}
              accept=".jpg,.jpeg,.png"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => photoRef.current.click()}
              className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 w-fit"
            >
              Upload Photo <MdOutlineFileUpload className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mt-4 w-[1290px] bg-white rounded-md p-4 shadow-sm">
        <h1 className="text-blue-900 font-semibold text-xl pb-2">Add Bank Details</h1>

        <div className="flex flex-wrap gap-6 text-sm">
          {[
            { label: "Account Number", name: "account_no" },
            { label: "IFSC Code", name: "ifsc_code" },
            { label: "Account Holder Name", name: "account_holder_name" },
            { label: "Bank Name", name: "bank_name" },
          ].map((f) => (
            <div key={f.name} className="flex flex-col gap-1 w-[250px]">
              <label className="text-gray-900 font-medium">{f.label}</label>
              <input
                name={f.name}
                type="text"
                value={formData[f.name]}
                onChange={handleChange}
                placeholder={f.label}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BidderRegistration;
