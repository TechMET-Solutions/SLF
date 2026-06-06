import { useEffect, useRef, useState } from "react";
import { IoMdImage } from "react-icons/io";
import { MdDelete, MdOutlineFileUpload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  updateBidderApi,
  viewBidderApi,
} from "../API/Transaction/Auction/BidderApi";
import profileempty from "../assets/profileempty.png";
import Loader from "../Component/Loader";

const EditBidderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bidderId } = location.state || {};
  console.log("bidderId", bidderId);
  const id = bidderId;
  const [bidderPhoto, setBidderPhoto] = useState(null);
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

  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(aadharFile,"aadharFile")
  console.log(panFile,"panFile")
  useEffect(() => {
    setLoading(true);
    const fetchBidder = async () => {
      // debugger
      try {
        setLoading(true);
        const res = await viewBidderApi(id);
        // console.log(res.bidder)
        setFormData(res.bidder); // adjust this based on backend response shape
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching bidder:", err);
        alert("Failed to load bidder data");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchBidder();
  }, [id]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data) => {
    let errors = {};

    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const aadharRegex = /^\d{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const accountRegex = /^[0-9]{9,18}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    // 📱 Mobile
    if (!mobileRegex.test(data.mobile_no || "")) {
      errors.mobile_no = "Enter valid 10-digit mobile number";
    }

    // 📱 Alternate Mobile
    if (data.alt_mob_no) {
      if (!mobileRegex.test(data.alt_mob_no)) {
        errors.alt_mob_no = "Enter valid alternate mobile number";
      } else if (data.mobile_no === data.alt_mob_no) {
        errors.alt_mob_no = "Alternate mobile cannot be same as mobile number";
      }
    }

    // 📧 Email
    if (data.email && !emailRegex.test(data.email)) {
      errors.email = "Enter valid email address";
    }

    // 🆔 Aadhaar
    if (data.aadhar_no && !aadharRegex.test(data.aadhar_no)) {
      errors.aadhar_no = "Aadhaar must be 12 digits";
    }

    // 💳 PAN
    // 🧾 PAN
if (!data.pan_no || data.pan_no.trim() === "") {
  errors.pan_no = "PAN is required";
}

// 🧾 GST
if (!data.gst_no || data.gst_no.trim() === "") {
  errors.gst_no = "GST Number is required";
}

// 🏦 Bank Name
if (!data.bank_name || data.bank_name.trim() === "") {
  errors.bank_name = "Bank Name is required";
}

// 🏦 Account Number
if (!data.account_no || data.account_no.trim() === "") {
  errors.account_no = "Account Number is required";
}

// 🏦 IFSC Code
if (!data.ifsc_code || data.ifsc_code.trim() === "") {
  errors.ifsc_code = "IFSC Code is required";
}

// 🏦 Account Holder Name
if (!data.account_holder_name || data.account_holder_name.trim() === "") {
  errors.account_holder_name = "Account Holder Name is required";
}

// 🏦 Bank Address
if (!data.bank_address || data.bank_address.trim() === "") {
  errors.bank_address = "Bank Address is required";
}

    return errors;
  };

  const handleUpdate = async () => {
    setLoading(true);

    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      alert(firstError);
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value);
      });

      if (aadharFile) fd.append("aadharDoc", aadharFile);
      if (panFile) fd.append("panDoc", panFile);
      if (bidderPhoto) fd.append("bidder_photo", bidderPhoto);

      await updateBidderApi(id, fd);

      alert("✅ Bidder updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("❌ Error updating bidder:", err);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      {/* Header Section */}
      <div className="w-full max-w-[1462px] bg-white border border-gray-200 sticky top-[50px] z-40">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 h-[40px]">
          <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3'] mb-4 sm:mb-0">
            Edit Bidder Registration - {bidderId}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdate}
              className="bg-[#0A2478] text-white text-[12px] w-[80px] h-[32px] rounded-[3.75px] transition"
            >
              Update
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#C1121F] text-white text-[12px] w-[80px] h-[32px] rounded-[3.75px] hover:bg-red-700 transition"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className=" w-[1462px]">
        <div className="bg-[#FFE6E6] pl-5">
          <h1 className="text-blue-900 font-semibold text-[15px]  ">
            Bidder Information
          </h1>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Section - Form Fields */}
            <div className="flex-1">
              <div className="flex flex-wrap ">
                <div className=" w-[340px]">
                  <label className="text-gray-900 font-medium">
                    Bidder Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="bidder_name"
                    type="text"
                    value={formData.bidder_name}
                    onChange={handleChange}
                    placeholder="Bidder Name"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                  />
                </div>

                {/* Repeat for all other fields with name/value/onChange */}
                {/* Mobile Number */}
               <div className="px-3 w-[150px]">
  <label className="text-gray-900 font-medium">
    Mobile Number <span className="text-red-600">*</span>
  </label>

  <input
    type="text"
    name="mobile_no"
    value={formData.mobile_no}
    onChange={(e) => {
      const value = e.target.value;

      // allow only digits and max 10 length
      if (/^\d{0,10}$/.test(value)) {
        setFormData({
          ...formData,
          mobile_no: value,
        });
      }
    }}
    placeholder="Mobile Number"
    maxLength={10}
    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
  />
</div>

              <div className="px-3 w-[160px]">
  <label className="text-gray-900 font-medium">
    Alt Mobile Number
  </label>

  <input
    type="text"
    name="alt_mob_no"
    value={formData.alt_mob_no}
    onChange={(e) => {
      const value = e.target.value;

      // allow only digits and max 10 length
      if (/^\d{0,10}$/.test(value)) {
        setFormData({
          ...formData,
          alt_mob_no: value,
        });
      }
    }}
    placeholder="Alternate Mobile Number"
    maxLength={10}
    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
  />
</div>

                {/* Email ID */}
                <div className="px-3  w-[200px]">
                  <label className="text-gray-900 font-medium">
                    Email ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                  />
                </div>

                {/* Personal Address */}
                <div className="px-3  w-[340px]">
                  <label className="text-gray-900 font-medium">
                    Personal Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="personal_address"
                    value={formData.personal_address}
                    onChange={handleChange}
                    placeholder="Personal Address"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                  />
                </div>

                {/* Shop Address */}
                <div className=" w-[330px]">
                  <label className="text-gray-900 font-medium">
                    Shop Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="shop_address"
                    value={formData.shop_address}
                    onChange={handleChange}
                    placeholder="Shop Address"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                  />
                </div>

                {/* Landline No 1 */}
                <div className="px-3  w-[180px]">
                  <label className="text-gray-900 font-medium">
                    Landline No 1 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="landline_no"
                    value={formData.landline_no}
                    onChange={handleChange}
                    placeholder="203-53363"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Landline No 2 */}
                <div className="px-3  w-[180px]">
                  <label className="text-gray-900 font-medium">
                    Landline No 2
                  </label>
                  <input
                    type="number"
                    name="landline_no2"
                    value={formData.landline_no2}
                    onChange={handleChange}
                    placeholder="203-53363"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Firm Name */}
                <div className="px-3  w-[340px]">
                  <label className="text-gray-900 font-medium">
                    Firm Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="firm_name"
                    value={formData.firm_name}
                    onChange={handleChange}
                    placeholder="Firm Name"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                  />
                </div>

                {/* GST No */}
                <div className="px-3  w-[200px]">
                  <label className="text-gray-900 font-medium">
                    GST No <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="gst_no"
                    value={formData.gst_no}
                    onChange={handleChange}
                    placeholder="GST No"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                  />
                </div>

                {/* Aadhar No */}
                <div className=" w-[200px]">
                  <label className="text-gray-900 font-medium">
                    Aadhar No <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="aadhar_no"
                    value={formData.aadhar_no}
                    onChange={handleChange}
                    placeholder="Aadhar no"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                {/* Aadhar Document */}
                <div className="px-3  w-[290px]">
                  <label className="text-gray-900 font-medium">
                    Aadhar Document
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] bg-white">
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
                      <label
                        htmlFor="aadhar-file"
                        className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
                      >
                        <MdOutlineFileUpload size={22} />
                      </label>
                    )}
                  </div>
                </div>
                {/* Pan No */}
                <div className="px-3  w-[220px]">
                  <label className="text-gray-900 font-medium">
                    Pan No <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="pan_no"
                    value={formData.pan_no}
                    onChange={handleChange}
                    placeholder="Pan no"
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
                  />
                </div>

                {/* Pan Document */}
                <div className="px-3  w-[280px]">
                  <label className="text-gray-900 font-medium">
                    Pan Document
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] bg-white">
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
                      <label
                        htmlFor="pan-file"
                        className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
                      >
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
                  src={
                    bidderPhoto
                      ? URL.createObjectURL(bidderPhoto)
                      : formData.bidder_photo || profileempty
                  }
                  alt="profile"
                  className="h-32 w-32 border-2 border-gray-300 object-cover rounded-lg"
                />
                <input
                  ref={photoRef}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e, "photo")}
                  className="hidden"
                  id="photo-file"
                />
                {bidderPhoto ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteFile("photo")}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:text-red-700"
                  >
                    <MdDelete size={18} />
                  </button>
                ) : (
                  <label
                    htmlFor="photo-file"
                    className="absolute bottom-1 right-1 bg-white text-blue-600 rounded-full p-1 shadow cursor-pointer hover:text-blue-800"
                  >
                    <MdOutlineFileUpload size={18} />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-[#F7F7FF]  pl-5">
          <h1 className="text-blue-900 font-semibold text-[15px]">
            Add Bank Details
          </h1>
          <div className="flex flex-wrap ">
            <div className="flex flex-col gap-2   w-[240px]">
              <label className="text-gray-900 font-medium">
                Account Number <span className="text-red-800">*</span>
              </label>
              <input
                name="account_no"
                value={formData.account_no}
                onChange={handleChange}
                type="text"
                placeholder="521753215"
                className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
              />
            </div>
            {/* IFSC Number */}
            <div className="flex flex-col gap-2 px-3  w-[200px]">
              <label className="text-gray-900 font-medium">
                IFSC Number <span className="text-red-800">*</span>
              </label>
              <input
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                type="text"
                placeholder="IFSC Number"
                className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
              />
            </div>

            {/* Account Holder Name */}
            <div className="flex flex-col gap-2 px-3  w-[280px]">
              <label className="text-gray-900 font-medium">
                Account Holder Name <span className="text-red-800">*</span>
              </label>
              <input
                name="account_holder_name"
                value={formData.account_holder_name}
                onChange={handleChange}
                type="text"
                placeholder="Account Holder Name"
                className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
              />
            </div>

            {/* Bank Name */}
            <div className="flex flex-col gap-2 px-3  w-[220px]">
              <label className="text-gray-900 font-medium">
                Bank Name <span className="text-red-800">*</span>
              </label>
              <input
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                type="text"
                placeholder="Bank Name"
                className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px] w-full bg-white"
              />
            </div>

            {/* Bank Address (full width on large screens) */}
            <div className="flex flex-col gap-2 px-3  w-[300px]">
              <label className="text-gray-900 font-medium">
                Bank Address <span className="text-red-800">*</span>
                {/* <span className="text-red-600">*</span> */}
              </label>
              <input
                name="bank_address"
                value={formData.bank_address}
                onChange={handleChange}
                type="text"
                placeholder="Bank Address"
                className="border border-gray-300 rounded-md px-1 py-1 text-xs h-[30px]w-full bg-white"
              />
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default EditBidderDetails;
