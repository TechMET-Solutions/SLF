import { useState, useRef } from 'react';
import { IoMdImage } from "react-icons/io";
import { MdDelete, MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import profileempty from '../assets/profileempty.png';
import { registerBidderApi } from '../API/Transaction/Auction/BidderApi'

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
    bank_address: "",
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

  const handleDeleteFile = (type) => {
    if (type === "aadhar") setAadharFile(null);
    else if (type === "pan") setPanFile(null);
    else if (type === "photo") setBidderPhoto(null);
  };

  // Submit Form
  const handleSubmit = async () => {
    try {
      if (!formData.bidder_name || !formData.mobile_no || !formData.gst_no) {
        alert("Please fill all required fields!");
        return;
      }

      // 🔹 Validation (BEFORE sending API request)
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobile_no)) {
        alert("Mobile Number must be a valid 10-digit number.");
        return;
      }
      if (!mobileRegex.test(formData.alt_mob_no)) {
        alert("Alt Mobile Number must be a valid 10-digit number.");
        return;
      }

      const aadharRegex = /^[0-9]{12}$/;
      if (!aadharRegex.test(formData.aadhar_no)) {
        alert("Aadhaar Number must be a valid 12-digit number.");
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
    <div className="flex flex-col items-center mt-5 px-4">
      {/* Header Section */}
      <div className="w-full max-w-[1290px] bg-white border border-gray-200 rounded-[11px] shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4">
          <h2 className="text-red-600 font-bold text-[20px]">Bidder Registration</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="bg-[#0A2478] text-white text-[12px] w-[80px] h-[32px] rounded-[3.75px] hover:bg-blue-700 transition"
            >
              Sumbit
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#C1121F] text-white text-[12px] w-[80px] h-[32px] rounded-[3.75px] hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1290px] space-y-6">
        {/* Bidder Information Section */}
        <div className="bg-white">
          <h1 className="text-blue-900 font-semibold text-xl pb-4 mb-2">
            Bidder Information
          </h1>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Section - Form Fields */}
            <div className="flex-1">
              <div className="flex flex-wrap -mx-3">
                <div className="px-3 mb-2 w-[280px]">
                  <label className="text-gray-900 font-medium">Bidder Name <span className='text-red-600'>*</span></label>
                  <input
                    name="bidder_name"
                    type="text"
                    value={formData.bidder_name}
                    onChange={handleChange}
                    placeholder="Bidder Name"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                  />
                </div>

                {/* Repeat for all other fields with name/value/onChange */}
                {/* Mobile Number */}
                <div className="px-3 mb-6 w-[220px]">
                  <label className="text-gray-900 font-medium">Mobile Number <span className='text-red-600'>*</span></label>
                  <input
                    type="number"
                    name="mobile_no"
                    value={formData.mobile_no}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="px-3 mb-6 w-[220px]">
                  <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
                  <input
                    type="number"
                    name="alt_mob_no"
                    value={formData.alt_mob_no}
                    onChange={handleChange}
                    placeholder="Alternate Mobile Number"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Email ID */}
                <div className="px-3 mb-6 w-[280px]">
                  <label className="text-gray-900 font-medium">Email ID <span className='text-red-600'>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                  />
                </div>

                {/* Personal Address */}
                <div className="px-3 mb-6 w-[340px]">
                  <label className="text-gray-900 font-medium">Personal Address <span className='text-red-600'>*</span></label>
                  <input
                    type="text"
                    name="personal_address"
                    value={formData.personal_address}
                    onChange={handleChange}
                    placeholder="Personal Address"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                  />
                </div>

                {/* Shop Address */}
                <div className="px-3 mb-6 w-[340px]">
                  <label className="text-gray-900 font-medium">Shop Address <span className='text-red-600'>*</span></label>
                  <input
                    type="text"
                    name="shop_address"
                    value={formData.shop_address}
                    onChange={handleChange}
                    placeholder="Shop Address"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                  />
                </div>

                {/* Landline No 1 */}
                <div className="px-3 mb-6 w-[180px]">
                  <label className="text-gray-900 font-medium">Landline No 1 <span className='text-red-600'>*</span></label>
                  <input
                    type="number"
                    name="landline_no"
                    value={formData.landline_no}
                    onChange={handleChange}
                    placeholder="203-53363"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Landline No 2 */}
                <div className="px-3 mb-6 w-[180px]">
                  <label className="text-gray-900 font-medium">Landline No 2</label>
                  <input
                    type="number"
                    name="landline_no2"
                    value={formData.landline_no2}
                    onChange={handleChange}
                    placeholder="203-53363"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Firm Name */}
                <div className="px-3 mb-6 w-[280px]">
                  <label className="text-gray-900 font-medium">Firm Name <span className='text-red-600'>*</span></label>
                  <input
                    type="text"
                    name="firm_name"
                    value={formData.firm_name}
                    onChange={handleChange}
                    placeholder="Firm Name"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                  />
                </div>

                {/* GST No */}
                <div className="px-3 mb-6 w-[280px]">
                  <label className="text-gray-900 font-medium">GST No <span className='text-red-600'>*</span></label>
                  <input
                    type="text"
                    name="gst_no"
                    value={formData.gst_no}
                    onChange={handleChange}
                    placeholder="GST No"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                  />
                </div>

                {/* Aadhar No */}
                <div className="px-3 mb-6 w-[220px]">
                  <label className="text-gray-900 font-medium">Aadhar No <span className='text-red-600'>*</span></label>
                  <input
                    type="number"
                    name="aadhar_no"
                    value={formData.aadhar_no}
                    onChange={handleChange}
                    placeholder="Aadhar no"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Aadhar Document */}
                <div className="px-3 mb-6 w-[280px]">
                  <label className="text-gray-900 font-medium">Aadhar Document</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5">
                    <IoMdImage className="text-gray-600 mr-2" size={20} />
                    <input
                      ref={aadharRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={(e) => handleFileChange(e, "aadhar")}
                      className="hidden"
                      id="aadhar-file"
                    />
                    <span className="flex-1 text-gray-700 text-sm">
                      {aadharFile ? aadharFile.name : "Aadhar.png"}
                    </span>
                    {aadharFile ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteFile("aadhar")}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <MdDelete size={20} />
                      </button>
                    ) : (
                      <label htmlFor="aadhar-file" className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800">
                        <MdOutlineFileUpload size={22} />
                      </label>
                    )}
                  </div>
                </div>
                {/* Pan No */}
                <div className="px-3 mb-6 w-[220px]">
                  <label className="text-gray-900 font-medium">Pan No <span className='text-red-600'>*</span></label>
                  <input
                    type="text"
                    name="pan_no"
                    value={formData.pan_no}
                    onChange={handleChange}
                    placeholder="Pan no"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                  />
                </div>

                {/* Pan Document */}
                <div className="px-3 mb-6 w-[280px]">
                  <label className="text-gray-900 font-medium">Pan Document</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5">
                    <IoMdImage className="text-gray-600 mr-2" size={20} />
                    <input
                      ref={panRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={(e) => handleFileChange(e, "pan")}
                      className="hidden"
                      id="pan-file"
                    />
                    <span className="flex-1 text-gray-700 text-sm">
                      {panFile ? panFile.name : "pan.png"}
                    </span>
                    {panFile ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteFile("pan")}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <MdDelete size={20} />
                      </button>
                    ) : (
                      <label htmlFor="pan-file" className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800">
                        <MdOutlineFileUpload size={22} />
                      </label>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Section - Profile Picture */}
            <div className="lg:w-48 flex flex-col items-center lg:items-start gap-4">
              <h3 className="font-semibold text-gray-900 text-center lg:text-left">
                Upload Bidder Profile
              </h3>
              <div className="relative">
                <img
                  src={bidderPhoto ? URL.createObjectURL(bidderPhoto) : profileempty}
                  alt="profile"
                  className="h-32 w-32 border-2 border-gray-300 object-cover rounded-lg"
                />
                {bidderPhoto ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteFile("photo")}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1"
                  >
                    <MdDelete size={18} />
                  </button>
                ) : (
                  <label
                    htmlFor="photo-file"
                    className="absolute bottom-2 right-3 bg-[#0A2478] text-white rounded-sm text-[10px] p-1 cursor-pointer"
                  >
                    Upload from Computer
                    {/* <MdOutlineFileUpload size={18} /> */}
                    <input
                      id="photo-file"
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => handleFileChange(e, "photo")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-white">
          <h1 className="text-blue-900 font-semibold text-xl pb-4 mb-2">
            Add Bank Details
          </h1>
          <div className="flex flex-wrap -mx-3">
            <div className="flex flex-col gap-2 px-3 mb-6 w-[240px]">
              <label className="text-gray-900 font-medium">Account Number <span className='text-red-600'>*</span></label>
              <input
                name="account_no"
                value={formData.account_no}
                onChange={handleChange}
                type="number"
                placeholder="521753215"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                style={{
                  MozAppearance: "textfield",
                }}
                onWheel={(e) => e.target.blur()}
              />
            </div>
            {/* IFSC Number */}
            <div className="flex flex-col gap-2 px-3 mb-6 w-[200px]">
              <label className="text-gray-900 font-medium">IFSC Number <span className='text-red-600'>*</span></label>
              <input
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                type="text"
                placeholder="IFSC Number"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>

            {/* Account Holder Name */}
            <div className="flex flex-col gap-2 px-3 mb-6 w-[280px]">
              <label className="text-gray-900 font-medium">Account Holder Name <span className='text-red-600'>*</span></label>
              <input
                name="account_holder_name"
                value={formData.account_holder_name}
                onChange={handleChange}
                type="text"
                placeholder="Account Holder Name"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>

            {/* Bank Name */}
            <div className="flex flex-col gap-2 px-3 mb-6 w-[250px]">
              <label className="text-gray-900 font-medium">Bank Name <span className='text-red-600'>*</span></label>
              <input
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                type="text"
                placeholder="Bank Name"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>

            {/* Bank Address (full width on large screens) */}
            <div className="flex flex-col gap-2 px-3 mb-6 w-[320px]">
              <label className="text-gray-900 font-medium">Bank Address <span className='text-red-600'>*</span></label>
              <input
                name="bank_address"
                value={formData.bank_address}
                onChange={handleChange}
                type="text"
                placeholder="Bank Address"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidderRegistration;
