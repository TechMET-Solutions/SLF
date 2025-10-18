import { FaPaperclip } from "react-icons/fa";

import axios from "axios";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import GroupData from "../assets/Group 124.svg";
import Vectorimg from "../assets/Vectorimg.png";
import profileempty from "../assets/profileempty.png";
import righttick from "../assets/righttick.png";
import send from "../assets/send.svg";
import { encryptData } from "../utils/cryptoHelper";

const AddCustProfile = () => {
  const editor = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const bankData = [
    {
      bankName: "HDFC Bank",
      Customer_Name: "sumit pathak",
      Account_No: "323902010133409",
      IFSC: "UBIN0532398",

      Bank_Address: "Bhagur",
      Update_By: "rasika.gade@slunawat.com",
      Update_On: "25-Jul-2025",
    },
    {
      bankName: "HDFC Bank",
      Customer_Name: "sumit pathak",
      Account_No: "323902010133409",
      IFSC: "UBIN0532398",

      Bank_Address: "Bhagur",
      Update_By: "rasika.gade@slunawat.com",
      Update_On: "25-Jul-2025",
    },
  ];

  const [formData, setFormData] = useState({
    panNo: "",
    panFile: null, // store selected file here
    aadhar: "",
    aadharFile: null,
    printName: "",
    email: "",
    mobile: "",
    otp: "",
    altMobile: "",
    dob: "",
    gender: "",
    marital: "",
    gstNo: "",
    religion: "",
    education: "",
    occupation: "",
    partyType: "",
    riskCategory: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    landline: "",
    pep: "",
    profileImage: null,
    signature: null,

    //Permanent 
    
    Permanent_Address: "",
    Permanent_Pincode: "",
     Permanent_State:"",
    Permanent_City: "",
    Permanent_Country: "",
    Permanent_ResiStatus: "",
    Permanent_Resisince: "",
    Permanent_Category: "",
    Permanent_CompanyType: "",
    Permanent_IndustryType: "",
     Permanent_Businessworkingsince: "",

    //  Corresponding

   Corresponding_Address: "",
   Corresponding_Pincode: "",
   Corresponding_State:"",
   Corresponding_City: "",
   Corresponding_Country: "",
   Corresponding_Area: "",
     
    //Additional Documents

    Additional_AddressProof :"",
    Additional_AnyDetails1: "",
    Additional_IDProof :"",
    Additional_AnyDetails2: "",
    Additional_Reference1: "",
    Additional_Reference2: "",
    Additional_UploadDocumentFile1: null,
    Additional_UploadDocumentFile2  :null,


    //Nominee
    Nominee_NomineeName: "",
    Nominee_Relation: "",
    Nominee_Address: "",
    Nominee_State: "",
    Nominee_City: "",

    //access
        access: "", 
   
  });

  console.log(formData, "formData");
  const panFileInputRef = useRef(null);
  const aadharFileInputRef = useRef(null);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePanFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        panFile: file,
      }));
    }
  };

  const handleAdharFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        aadharFile: file,
      }));
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

   const handleFileChange1 = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
    Additional_UploadDocumentFile1: files[0],
    }));
  };
  const handleFileChange2 = (e) => {
    debugger
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
    Additional_UploadDocumentFile2: files[0],
    }));
  };
const [sameAddress, setSameAddress] = useState(false);

const handleRadioChange = () => {
  setSameAddress((prev) => {
    const newValue = !prev;

    setFormData((prevData) => ({
      ...prevData,
      ...(newValue
        ? {
            // ✅ Copy Permanent → Corresponding
            Corresponding_Address: prevData.Permanent_Address,
            Corresponding_Pincode: prevData.Permanent_Pincode,
            Corresponding_State: prevData.Permanent_State,
            Corresponding_City: prevData.Permanent_City,
            Corresponding_Country: prevData.Permanent_Country,
          }
        : {
            // ❌ Clear Corresponding when unchecked (optional)
            Corresponding_Address: "",
            Corresponding_Pincode: "",
            Corresponding_State: "",
            Corresponding_City: "",
            Corresponding_Country: "",
          }),
    }));

    return newValue;
  });
};
const handleSubmit = async () => {
  try {
    const encrypted = encryptData(formData);

    const response = await axios.post("http://localhost:5000/Master/doc/add", {
      data: encrypted, // send encrypted data
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div>
      <div className="flex justify-center ">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          {/* Left heading */}
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            Add Customer Profile Form
          </h2>

          {/* Right section (search + buttons) */}
          <div className="flex items-center gap-6">
            {/* Search section */}

            {/* Buttons stuck to right */}
            <div className="flex gap-3">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                }}
                // onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                onClick={handleSubmit}
              >
                save
              </button>

              <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* personal information */}
      <div className="bg-[#FFE6E6] mt-2 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
          Personal Information
        </p>

        <div className="flex justify-between gap-5">
          <div className="">
            <div className="flex items-center gap-4 w-full">
              {/* PAN No */}
              {/* <div className="flex flex-col">
    <label className="text-[14px] font-medium">PAN No.</label>
    <div className="flex items-center mt-1 w-[220px]">
      <div className="relative flex-1">
        <input
          type="text"
                      placeholder="Enter PAN"
                       name="panNo"
  value={formData.panNo}
  onChange={handleChange}
          className="border border-[#C4C4C4] border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        />
        <FaPaperclip
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          size={16}
        />
      </div>
      <button className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]">
        Verify
      </button>
    </div>
  </div> */}

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">PAN No.</label>
                <div className="flex items-center mt-1 w-[220px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter PAN"
                      name="panNo"
                      value={formData.panNo}
                      onChange={handleChange}
                      className="border border-[#C4C4C4] border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      ref={panFileInputRef}
                      onChange={handlePanFileChange}
                      className="hidden"
                    />

                    {/* Paperclip icon triggers file selection */}
                    <FaPaperclip
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      size={16}
                      onClick={() => panFileInputRef.current.click()}
                    />
                  </div>

                  <button
                    className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]"
                    type="button"
                  >
                    Verify
                  </button>
                </div>

                {/* Show selected file name */}
                {formData.panFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected file: {formData.panFile.name}
                  </p>
                )}
              </div>

              {/* Aadhaar */}
              {/* <div className="flex flex-col">
    <label className="text-[14px] font-medium">Aadhar Number*</label>
    <div className="flex items-center mt-1 w-[220px]">
      <div className="relative flex-1">
        <input
          type="text"
                      placeholder="Enter Aadhaar"
                       name="aadhar"
  value={formData.aadhar}
  onChange={handleChange}
          className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        />
        <FaPaperclip
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          size={16}
        />
      </div>
      <button className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]">
        Verify
      </button>
    </div>
  </div> */}

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center mt-1 w-[220px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Aadhaar"
                      name="aadhar"
                      value={formData.aadhar}
                      onChange={handleChange}
                      className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      ref={aadharFileInputRef}
                      onChange={handleAdharFileChange}
                      className="hidden"
                    />

                    {/* Paperclip icon triggers file selection */}
                    <FaPaperclip
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      size={16}
                      onClick={() => aadharFileInputRef.current.click()}
                    />
                  </div>

                  <button
                    className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]"
                    type="button"
                  >
                    Verify
                  </button>
                </div>

                {/* Show selected file name */}
                {formData.aadharFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected file: {formData.aadharFile.name}
                  </p>
                )}
              </div>

              {/* Print Name */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Print Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="printName"
                  value={formData.printName}
                  onChange={handleChange}
                  placeholder="Customer Full Name"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col flex-1">
                <label className="text-[14px] font-medium">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                />
              </div>
            </div>

            <div className="flex items-end gap-4 w-full mt-5">
              {/* Mobile Number + OTP Button */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center mt-1 w-[220px]">
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  />
                  <button className="bg-[#0A2478] text-white px-4 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b] flex items-center gap-2">
                    <img src={send} alt="otp" className="w-4 h-4" />
                    <span>OTP</span>
                  </button>
                </div>
              </div>

              {/* OTP Verification */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">Verify OTP</label>
                <div className="relative mt-1 w-[180px]">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-[8px] px-3 py-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <img
                    src={righttick}
                    alt="tick"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px]"
                  />
                </div>
              </div>

              {/* Alternate Mobile */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Alternate Mobile No
                </label>
                <input
                  type="text"
                  name="altMobile"
                  value={formData.altMobile}
                  onChange={handleChange}
                  placeholder="Enter Alternate Mobile"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[200px] bg-white"
                />
              </div>

              {/* DOB */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Date of Birth (dd-mm-yy){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[150px] bg-white"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex items-end gap-4 w-full mt-5">
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">Marital</label>
                <select
                  name="marital"
                  value={formData.marital}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[14px] font-medium">GST No.</label>
                <input
                  type="text"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleChange}
                  placeholder="Enter GST No."
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Religious Belief
                </label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[150px] bg-white"
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Jain">Jain</option>
                  <option value="Parsi">Parsi</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">Education</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[211px] bg-white"
                >
                  <option value="">Select Education</option>
                  <option value="No Formal Education">
                    No Formal Education
                  </option>
                  <option value="Primary School">Primary School</option>
                  <option value="High School">High School</option>
                  <option value="Intermediate">Intermediate / 12th</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Graduate">Graduate (Bachelor’s Degree)</option>
                  <option value="Post Graduate">
                    Post Graduate (Master’s Degree)
                  </option>
                  <option value="Doctorate">Doctorate (PhD)</option>
                  <option value="Professional">
                    Professional Certification
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-[14px] font-medium">
                  Occupation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Employee."
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[158px] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">Party Type</label>
                <select
                  name="partyType"
                  value={formData.partyType}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[140px] bg-white"
                >
                  <option value="">Select Type</option>
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            </div>
            <div className="flex items-end gap-4 w-full mt-5">
              {/* Marital */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">Risk Category</label>
                <select
                  name="riskCategory"
                  value={formData.riskCategory}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[146px] bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[14px] font-medium">First Name.</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Customer First Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[148px] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Customer Middle Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[148px] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Customer Last Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[148px] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Father/Husbands First Name
                </label>
                <input
                  type="text"
                  name="fatherFirstName"
                  value={formData.fatherFirstName}
                  onChange={handleChange}
                  placeholder="Father/Husbands First Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[184px] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Father/Husbands Middle Name
                </label>
                <input
                  type="text"
                  name="fatherMiddleName"
                  value={formData.fatherMiddleName}
                  onChange={handleChange}
                  placeholder="Father/Husbands Middle Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[184px] bg-white"
                />
              </div>
            </div>

            <div className="flex gap-6 mt-5">
              {/* Father/Husband's Last Name */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Father/Husband's Last Name
                </label>
                <input
                  type="text"
                  name="fatherLastName"
                  value={formData.fatherLastName}
                  onChange={handleChange}
                  placeholder="Customer Last Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[200px] bg-white"
                />
              </div>

              {/* Landline Number */}
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Landline Number
                </label>
                <input
                  type="text"
                  name="landline"
                  value={formData.landline}
                  onChange={handleChange}
                  placeholder="+91 9658426853"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
                />
              </div>

              {/* Politically Exposed Person */}
              <div className="flex flex-col mt-2">
                <label className="text-[14px] font-medium">
                  Politically Exposed Person?
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pep"
                      value="yes"
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pep"
                      value="no"
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-center mt-5 mb-2">
              <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
                Upload Customer Signature
              </label>
            </div>
            <div className="relative flex justify-center">
              {/* Background Image */}
              <img
                src={profileempty}
                alt="signature"
                className="w-[156px] h-[156px] border rounded-md object-cover"
              />

              {/* Upload Button on Top of Image */}
              <div
                htmlFor="signatureUpload"
                className="absolute inset-0 flex items-center justify-center  bg-opacity-40 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-60 transition  "
              >
                <button className="w-[101px] h-[18px] p-1 bg-[#0A2478] text-white text-[8px] rounded-[3px]">
                  {" "}
                  Upload from Computer
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                id="signatureUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => console.log(e.target.files[0])}
              />
            </div>

            <div>
              <div className="flex justify-center mt-5 mb-2">
                <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
                  Upload Customer Signature
                </label>
              </div>

              <div className="relative flex justify-center">
                {/* Background Image */}
                <img
                  src={profileempty}
                  alt="signature"
                  className="w-[156px] h-[58px] border rounded-md object-cover"
                />

                {/* Upload Button on Top of Image */}
                <div
                  htmlFor="signatureUpload"
                  className="absolute inset-0 flex items-center justify-center  bg-opacity-40 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-60 transition  "
                >
                  <button className="w-[101px] h-[18px] p-1 bg-[#0A2478] text-white text-[8px] rounded-[3px]">
                    {" "}
                    Upload from Computer
                  </button>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="signatureUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => console.log(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F7F7FF]  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
          Permanent Address
        </p>

        <div className="flex gap-3">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Address</label>
              </div>

              <input
                type="text"
                 name="Permanent_Address"
                  value={formData.Permanent_Address}
                  onChange={handleChange}
                placeholder="Address"
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Pincode*</label>
              </div>

              <input
                type="text"
                 name="Permanent_Pincode"
                  value={formData.Permanent_Pincode}
                  onChange={handleChange}
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[131px] rounded-[8px] bg-white"
              />
            </div>
          </div>
          <div>
           <div className="">
  <div>
    <label className="text-[14px] font-medium">State</label>
  </div>

  <select
    name="Permanent_State"
    value={formData.Permanent_State}
    onChange={handleChange}
    className="border border-gray-300 px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]"
  >
    <option value="">Select State</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>

          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">City</label>
              </div>

              <input
                type="text"
                 name="Permanent_City"
    value={formData.Permanent_City}
    onChange={handleChange}
                placeholder="City"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Country</label>
              </div>

              <input
                type="text"
                 name="Permanent_Country"
    value={formData.Permanent_Country}
    onChange={handleChange}
                placeholder="Country"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <div>
  <div className="">
    <div>
      <label className="text-[14px] font-medium">Resi. Status</label>
    </div>

    <select
      name="Permanent_ResiStatus"
      value={formData.Permanent_ResiStatus}
      onChange={handleChange}
      className="border border-gray-300 px-3 py-2 mt-1 w-[196px] bg-white rounded-[8px]"
    >
      <option value="">Select Status</option>
      <option value="Owner">Owner</option>
      <option value="Rented">Rented</option>
      <option value="Company Provided">Company Provided</option>
                <option value="Parents">Parents</option>
                  <option value="Other">Other</option>
    </select>
  </div>
</div>


          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Resi. since (in years)
                </label>
              </div>

              <input
                type="text"
                  name="Permanent_Resisince"
      value={formData.Permanent_Resisince}
      onChange={handleChange}
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[196px] rounded-[8px] bg-white"
              />
            </div>
          </div>
         <div>
  <div className="">
    <div>
      <label className="text-[14px] font-medium">Category</label>
    </div>

    <select
      name="Permanent_Category"
      value={formData.Permanent_Category}
      onChange={handleChange}
      className="border border-gray-300 px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]"
    >
      <option value="">Select Category</option>
      <option value="Salaried">Salaried</option>
      <option value="Self-Employed (Professional)">Self-Employed (Professional)</option>
      <option value="Self-Employed (Non-Professional)">Self-Employed (Non-Professional)</option>
      <option value="Unemployed">Unemployed</option>
      <option value="Housewife">Housewife</option>
      <option value="Other">Other</option>
    </select>
  </div>
</div>

       <div>
  <div className="">
  <div>
    <label className="text-[14px] font-medium">Company Type</label>
  </div>

  <select
    name="Permanent_CompanyType"
    value={formData.Permanent_CompanyType}
    onChange={handleChange}
    className="border border-gray-300 px-3 py-2 mt-1 w-[196px] bg-white rounded-[8px]"
  >
    <option value="">Select Company Type</option>
    <option value="State Govt">State Govt</option>
    <option value="MNC">MNC</option>
    <option value="Public Ltd">Public Ltd</option>
    <option value="Private Ltd">Private Ltd</option>
    <option value="Partnership">Partnership</option>
    <option value="Proprietorship">Proprietorship</option>
  </select>
</div>

</div>

         <div>
  <div className="">
    <div>
      <label className="text-[14px] font-medium">Industry Type</label>
    </div>

    <select
      name="Permanent_IndustryType"
      value={formData.Permanent_IndustryType}
      onChange={handleChange}
      className="border border-gray-300 px-3 py-2 mt-1 w-[196px] bg-white rounded-[8px]"
    >
      <option value="">Select Industry Type</option>
      <option value="Manufacturing">Manufacturing</option>
      <option value="Trading">Trading</option>
      <option value="Services">Services</option>
      <option value="Banking/Finance">Banking/Finance</option>
      <option value="Pharma">Pharma</option>
      <option value="Other">Other</option>
    </select>
  </div>
</div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Business working since( in year)
                </label>
              </div>

              <input
                type="text"
                  name="Permanent_Businessworkingsince"
      value={formData.Permanent_Businessworkingsince}
      onChange={handleChange}
                placeholder="Enter in year"
                className="border border-gray-300 px-3 py-2 mt-1 w-[196px] rounded-[8px] bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFE6E6]  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="mt-1">
           <label className="flex items-center gap-2 font-['Roboto'] text-[16px]">
          <input
            type="radio"
            name="access2"
            checked={sameAddress}
            onChange={handleRadioChange}
            className="accent-[#0A2478]"
          />
          <span className="text-[16px] text-[#000000]">
            Permanent Address same as Correspondence Address?
          </span>
        </label>
        </p>
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-4">
          Corresponding Address
        </p>

        <div className="flex gap-3">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Address</label>
              </div>

              <input
                type="text"
        name="Corresponding_Address"
      value={formData.Corresponding_Address}
      onChange={handleChange}
                
                placeholder="Address"
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Pincode*</label>
              </div>

              <input
                type="text"
                  name="Corresponding_Pincode"
      value={formData.Corresponding_Pincode}
      onChange={handleChange}
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[131px] rounded-[8px] bg-white"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">State</label>
              </div>

             <select
    name="Corresponding_State"
    value={formData.Corresponding_State}
    onChange={handleChange}
    className="border border-gray-300 px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]"
  >
    <option value="">Select State</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">City</label>
              </div>

              <input
                type="text"
                 name="Corresponding_City"
      value={formData.Corresponding_City}
      onChange={handleChange}
                placeholder="City"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Country</label>
              </div>

              <input
                type="text"
                 name="Corresponding_Country"
      value={formData.Corresponding_Country}
      onChange={handleChange}
                placeholder="Country"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Area*</label>
              </div>

              <select
  name="Corresponding_Area"
  value={formData.Corresponding_Area}
  onChange={handleChange}
  className="border border-gray-300 px-3 py-2 mt-1 w-[243px] bg-white rounded-[8px]"
>
  <option value="">Select Area</option>
  <option value="Urban">Urban</option>
  <option value="Rural">Rural</option>
  <option value="Semi-Urban">Semi-Urban</option>
  <option value="Industrial Area">Industrial Area</option>
  <option value="Commercial Area">Commercial Area</option>
  <option value="Residential Area">Residential Area</option>
  <option value="Other">Other</option>
</select>

            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
          Additional Documents
        </p>

        <div className="flex items-center gap-4">
          {/* Address Proof */}
          <div className="flex flex-col">
  <label className="text-[14px] font-medium">Address Proof*</label>
 <select
  name="Additional_AddressProof"
  value={formData.Additional_AddressProof}
  onChange={handleChange}
  className="border border-gray-300 px-3 py-2 mt-1 w-[200px] bg-white rounded-[8px]"
>
  <option value="">Select Proof</option>
  <option value="Aadhar Card">Aadhar Card</option>
  <option value="Bank Passbook">Bank Passbook</option>
  <option value="Driving License">Driving License</option>
  <option value="Electricity Bill">Electricity Bill</option>
  <option value="Enrollment Number For Aadhar">Enrollment Number For Aadhar</option>
  <option value="Govt. ID/ Defense ID">Govt. ID/ Defense ID</option>
  <option value="PAN Card">PAN Card</option>
  <option value="Passport">Passport</option>
  <option value="Phone Bill">Phone Bill</option>
  <option value="Ration Card">Ration Card</option>
  <option value="Rent Agmt">Rent Agreement</option>
  <option value="Shop Act License">Shop Act License</option>
  <option value="Voter ID">Voter ID</option>
  <option value="Others">Others</option>
</select>

</div>

          {/* Address Details */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Any Details</label>
            <input
              type="text"
               name="Additional_AnyDetails1"
  value={formData.Additional_AnyDetails1}
  onChange={handleChange}
              placeholder="0000 0000 0000"
              className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
            />
          </div>
 <div className="mt-6">
  <label
    htmlFor="uploadDocument1"
    className="w-[180px] h-[40px] border rounded-[8px] bg-[#0A2478] text-[12px] text-white flex justify-center items-center gap-2 cursor-pointer"
  >
    <p>Upload Document</p>
    <MdOutlineFileUpload />
  </label>

  <input
    type="file"
    id="uploadDocument1"
    name="Additional_UploadDocumentFile1"
    onChange={handleFileChange1}
    className="hidden"
            />
              {formData.Additional_UploadDocumentFile1 && (
    <p className="text-[13px] text-gray-700">
      Selected File:{" "}
      <span className="font-medium text-[#0A2478]">
        {formData.Additional_UploadDocumentFile1.name}
      </span>
    </p>
  )}
</div>
          {/* ID Proof */}
         <div className="flex flex-col">
  <label className="text-[14px] font-medium">ID Proof</label>
  <select
    name="Additional_IDProof"
    value={formData.Additional_IDProof}
    onChange={handleChange}
    className="border border-gray-300 px-3 py-2 mt-1 w-[200px] bg-white rounded-[8px]"
  >
    <option value="">Select ID Proof</option>
    <option value="Aadhar Card">Aadhar Card</option>
    <option value="Driving License">Driving License</option>
    <option value="Enrollment Number For Aadhar">Enrollment Number For Aadhar</option>
    <option value="Govt. ID/ Defense ID">Govt. ID/ Defense ID</option>
    <option value="PAN Card">PAN Card</option>
    <option value="Passport">Passport</option>
    <option value="Voter ID">Voter ID</option>
    <option value="Others">Others</option>
  </select>
</div>


          {/* ID Details */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Any Details</label>
            <input
              type="text"
               name="Additional_AnyDetails2"
  value={formData.Additional_AnyDetails2}
  onChange={handleChange}
              placeholder="Any Details"
              className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
            />
          </div>

          {/* Upload Button */}
        <div className="mt-6">
  <label
    htmlFor="uploadDocument2"
    className="w-[180px] h-[40px] border rounded-[8px] bg-[#0A2478] text-[12px] text-white flex justify-center items-center gap-2 cursor-pointer"
  >
    <p>Upload Document</p>
    <MdOutlineFileUpload />
  </label>

  <input
    type="file"
    id="uploadDocument2"
    name="Additional_UploadDocumentFile2"
    onChange={handleFileChange2}
    className="hidden"
            />
            
             {formData.Additional_UploadDocumentFile2 && (
    <p className="text-[13px] text-gray-700">
      Selected File:{" "}
      <span className="font-medium text-[#0A2478]">
        {formData.Additional_UploadDocumentFile2.name}
      </span>
    </p>
  )}
</div>


        </div>
        <div className="flex items-center gap-4 mt-5">
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Reference 1</label>
            <input
              type="text"
               name="Additional_Reference1"
    value={formData.Additional_Reference1}
    onChange={handleChange}
              placeholder=""
              className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Reference 2</label>
            <input
              type="text"
               name="Additional_Reference2"
    value={formData.Additional_Reference2}
    onChange={handleChange}
              placeholder=""
              className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#FFE6E6] mt-2 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
          Nominee Details
        </p>

        <div className="flex gap-3">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Nominee</label>
              </div>

              <input
                type="text"
                 name="Nominee_NomineeName"
    value={formData.Nominee_NomineeName}
    onChange={handleChange}
                placeholder="Nominee Name"
                className="border border-gray-300 px-3 py-2 mt-1 w-[300px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Relation</label>
              </div>

              <input
                type="text"
                name="Nominee_Relation"
    value={formData.Nominee_Relation}
    onChange={handleChange}
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[90px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Address</label>
              </div>

              <input
                type="text"
                 name="Nominee_Address"
    value={formData.Nominee_Address}
    onChange={handleChange}
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[300px] rounded-[8px] bg-white"
              />
            </div>
          </div>
         <div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">State</label>
              </div>

             <select
    name="Nominee_State"
    value={formData.Nominee_State}
    onChange={handleChange}
    className="border border-gray-300 px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]"
  >
    <option value="">Select State</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">City</label>
              </div>

              <input
                type="text"
                 name="Nominee_City"
    value={formData.Nominee_City}
    onChange={handleChange}
                placeholder="City"
                className="border border-gray-300 px-3 py-2 mt-1 w-[131px] rounded-[8px] bg-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" pl-[115px] pr-[120px] flex  mb-10 gap-[100px] mt-10">
        {/* Header */}
        <p className="font-['Source_Sans_3'] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-2">
          Additional User Access
        </p>

        {/* Question */}
        <p className="mt-1">
          <label className="flex items-center gap-2 font-['Roboto'] text-[16px]">
            <input type="radio" name="access" className="accent-[#0A2478]"  name="access"
          value="Yes"
          checked={formData.access === "Yes"}
          onChange={handleChange} />
            <span className="font-['Roboto'] font-normal text-[16px] leading-[100%] tracking-[0.03em] text-[#000000] ">
              Allow Customers to access Mobile App?
            </span>
          </label>
        </p>

        {/* Single radio button */}
      </div>

      <div className="p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px] bg-[#F7F7FF]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
          Remark
        </p>

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-auto mb-5">
          <div className="flex justify-between">
            <p className="font-[Source_Sans_3] font-semibold text-[14px] leading-[14px] tracking-[0em] underline">
              Bank Details
            </p>
            <button
              className="w-[72.7px] h-[33.7px] bg-[#0A2478] text-white rounded-[3.12px] px-[9.36px] flex items-center justify-center gap-[7.8px] text-[14px] font-[Source_Sans_3] font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Add New
            </button>
          </div>
          <table className="w-full border-collapse mt-5">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Bank Name
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Customer Name
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Account No
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  IFSC
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Cancelled Cheques
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Bank Address
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Update By
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Update On
                </th>
                <th className="px-4 py-2 text-left text-[13px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {bankData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{row.bankName}</td>
                  <td className="px-4 py-2">{row.Customer_Name}</td>
                  <td className="px-4 py-2">{row.Account_No}</td>
                  <td className="px-4 py-2">{row.IFSC}</td>
                  <td className="px-4 py-2">download</td>
                  <td className="px-4 py-2">{row.Bank_Address}</td>
                  <td className="px-4 py-2">{row.Update_By || "-"}</td>
                  <td className="px-4 py-2">{row.Update_On || "-"}</td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-2 justify-center">
                      <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
                        <img
                          src={GroupData}
                          alt="view"
                          className="w-[18px] h-[18px]"
                        />
                      </div>

                      <div className="w-[17px] h-[17px] bg-[#C5644E] rounded-[2.31px] flex items-center justify-center p-0.5">
                        <img src={Vectorimg} alt="edit" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[896px]  rounded-lg shadow-lg h-[322px] p-10">
            <h2
              className="text-[#0A2478] mb-4"
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0%",
              }}
            >
              Add Bank Details
            </h2>

            <div className=" gap-4">
              <div className="flex gap-2">
                {" "}
                <div>
                  <label className="text-[14px] ">
                    Bank Name* <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className="border border-gray-300 rounded"
                    style={{
                      width: "238px",
                      height: "38px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      borderWidth: "1px",
                      opacity: 1,
                    }}
                  />
                </div>
                <div>
                  <label className="text-[14px] ">
                    Account Holder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className="border border-gray-300 rounded"
                    style={{
                      width: "300px",
                      height: "38px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      borderWidth: "1px",
                      opacity: 1,
                    }}
                  />
                </div>
                <div>
                  <label className="text-[14px] ">
                    Account No<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className="border border-gray-300 rounded"
                    style={{
                      width: "238px",
                      height: "38px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      borderWidth: "1px",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              <div className="flex mt-5 gap-2">
                <div>
                  {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                  <label className="text-[14px] ">
                    IFSC Code* <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    className="border border-gray-300 rounded"
                    style={{
                      width: "238px",
                      height: "38px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      borderWidth: "1px",
                      opacity: 1,
                    }}
                  />
                  {/* <select
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  style={{
                    width: "280px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                >
                  <option>Balance Sheet</option>
                  <option>Income Statement</option>
                </select> */}
                </div>
                <div>
                  {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                  <label className="text-[14px] ">
                    Bank Address<span className="text-red-500"></span>
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="border border-gray-300 rounded"
                    style={{
                      width: "300px",
                      height: "38px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      borderWidth: "1px",
                      opacity: 1,
                    }}
                  />

                  {/* <select
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  style={{
                    width: "300px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                >
                  <option>Balance Sheet</option>
                  <option>Income Statement</option>
                </select> */}
                </div>
                <div>
                  {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                  <label className="text-[14px] ">
                    Attached Cancel Cheque{" "}
                    <span className="text-red-500"></span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                    <label
                      htmlFor="uploadFile"
                      className="bg-[#D9D9D9] px-4 py-2 cursor-pointer text-[12px] rounded-l border-r border w-[200px] text-black font-[Source_Sans_3] font-semibold leading-[100%] tracking-[0.03em]"
                    >
                      Choose File
                    </label>

                    <input
                      id="uploadFile"
                      type="file"
                      className="hidden"
                      //   onChange={(e) =>
                      //     setFileName(e.target.files[0] ? e.target.files[0].name : "No file chosen")
                      //   }
                    />
                    <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                      {/* {fileName || "No file chosen"} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-5 items-center">
              <div className="flex justify-end gap-3 mt-6 item-center">
                <button
                  className="bg-[#0A2478] text-white"
                  style={{
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",

                    opacity: 1,
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Save
                </button>

                <button
                  className="text-white"
                  style={{
                    backgroundColor: "#C1121F",
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",

                    opacity: 1,
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCustProfile;
