import { FaPaperclip } from "react-icons/fa";

import axios from "axios";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import profileempty from "../assets/profileempty.png";
import righttick from "../assets/righttick.png";
import send from "../assets/send.svg";
import { encryptData } from "../utils/cryptoHelper";
import CustBankDetails from "./CustBankDetails";


const AddCustProfile = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const editor = useRef(null);
 
  const customerData = location.state?.customerData;
  const modedata = location.state?.type
  console.log(customerData,"customerData")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [mode, setMode] = useState(modedata);
  const [modeForBank, setModeForbank] = useState("add");
  console.log(mode,"mode")
const [bankData, setBankData] = useState([]);
console.log(bankData,"bankData")
  
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
         badDebtor: false,
   
  });
  const [BankformData, setBankFormData] = useState({
      bankName: "",
      customerName: "",
      accountNo: "",
      ifsc: "",
      bankAddress: "",
      cancelCheque: null,
      
  });
  const [documents, setDocuments] = useState([]);      // main list from API
const [idProofList, setIdProofList] = useState([]);  // filtered only id proof
const [addrProofList, setAddrProofList] = useState([]); // filtered only address proof

const fetchDocuments = async () => {
  try {
    // setLoading(true);

    const response = await axios.get(`${API}/Master/getAllDocumentProofs`);

    const docs = response.data.data;  // <-- already clean json

    setDocuments(docs);

    setIdProofList(docs.filter(x => x.is_id_proof === 1));
    setAddrProofList(docs.filter(x => x.is_address_proof === 1));

    // setLoading(false);
  } catch (err) {
    console.error("Error fetching documents:", err);
    // setError("Failed to fetch documents");
    // setLoading(false);
  }
};

  useEffect(() => {
    fetchDocuments()
  },[])

useEffect(() => {
  if (customerData) {
    // ✅ Set formData (customer details)
    setFormData((prev) => ({
      ...prev,
      ...customerData,
      id: customerData.id || customerData.ID || "",
    }));

    // ✅ Set remark content if exists
    if (customerData.Remark) {
      setContent(customerData.Remark);
    }

    // ✅ Set bank data if exists (Array check)
    if (Array.isArray(customerData.bankData)) {
      setBankData(customerData.bankData);
    }
  }
}, [customerData]);

  
const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        signature: file,
      }));
    }
  };
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



// const handleSubmit = async () => {
//   try {
//     const payloadToEncrypt = { 
//       ...formData, 
//       Remark: content, 
//       Added_By: "",
//     };

//     const encrypted = encryptData(payloadToEncrypt);

//     const formDataToSend = new FormData();
//     formDataToSend.append("data", encrypted);

//     if (formData.panFile) formDataToSend.append("panFile", formData.panFile);
//     if (formData.aadharFile) formDataToSend.append("aadharFile", formData.aadharFile);
//     if (formData.profileImage) formDataToSend.append("profileImage", formData.profileImage);
//     if (formData.signature) formDataToSend.append("signature", formData.signature);
//     if (formData.Additional_UploadDocumentFile1)
//       formDataToSend.append("Additional_UploadDocumentFile1", formData.Additional_UploadDocumentFile1);
//     if (formData.Additional_UploadDocumentFile2)
//       formDataToSend.append("Additional_UploadDocumentFile2", formData.Additional_UploadDocumentFile2);

//     // Step 1️⃣: Add customer first
//     const response = await axios.post(
//       "http://localhost:5000/Master/doc/add",
//       formDataToSend,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     console.log("✅ Customer API Response:", response.data);

//     if (response.data.status && response.data.statuscode === 200) {
//       const customerId = response.data.customerId; // Get the new customer ID

//       alert(response.data.message);

//       // Step 2️⃣: Call addBankDetails API
//       await addBankDetails(customerId);

//       navigate("/Customer-Profile-List");
//     } else {
//       alert("❌ Something went wrong: " + (response.data.message || "Unknown error"));
//     }
//   } catch (error) {
//     console.error("❌ Error submitting form:", error);
//     alert("An error occurred while adding the customer.");
//   }
// };
  const handleSubmit = async () => {
  debugger
  try {
    const { bankData, ...rest } = formData;

    // 🧩 Step 2: Prepare the payload without bankData
    const payloadToEncrypt = { 
      ...rest, 
      Remark: content, 
      Added_By: "",
    };

    // 🔒 Step 3: Encrypt only the filtered data
    const encrypted = encryptData(payloadToEncrypt);
    const formDataToSend = new FormData();
    formDataToSend.append("data", encrypted);

    // Append uploaded files only if present
    if (formData.panFile) formDataToSend.append("panFile", formData.panFile);
    if (formData.aadharFile) formDataToSend.append("aadharFile", formData.aadharFile);
    if (formData.profileImage) formDataToSend.append("profileImage", formData.profileImage);
    if (formData.signature) formDataToSend.append("signature", formData.signature);
    if (formData.Additional_UploadDocumentFile1)
      formDataToSend.append("Additional_UploadDocumentFile1", formData.Additional_UploadDocumentFile1);
    if (formData.Additional_UploadDocumentFile2)
      formDataToSend.append("Additional_UploadDocumentFile2", formData.Additional_UploadDocumentFile2);

    let response;

    if (mode === "edit") {
      // ✳️ Update existing customer
      response = await axios.post(
        "http://localhost:5000/Master/doc/updateCustomer",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      // 🆕 Add new customer
      response = await axios.post(
        "http://localhost:5000/Master/doc/add",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    console.log("✅ Customer API Response:", response.data);

    if (response.data.status && response.data.statuscode === 200) {
      const customerId =
        mode === "edit" ? formData.id : response.data.customerId;

      alert(response.data.message);

      // Step 2️⃣: Call add or update bank details API
      if (mode === "edit") {
        await updateBankDetails(customerId);
      } else {
        await addBankDetails(customerId);
      }

      navigate("/Customer-Profile-List");
    } else {
      alert("❌ Something went wrong: " + (response.data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    alert("An error occurred while saving the customer.");
  }
};


const addBankDetails = async (customerId) => {
  try {
    const formData = new FormData();

    // send all bank data in one go
    formData.append("bankData", JSON.stringify(bankData));
    formData.append("customerId", customerId);

    // append all cheque files
    bankData.forEach((bank) => {
      if (bank.cancelCheque && bank.cancelCheque instanceof File) {
        formData.append("cancelCheque", bank.cancelCheque); // ✅ field name matches multer
      }
    });

    const res = await axios.post("http://localhost:5000/bank/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Response:", res.data);
  } catch (error) {
    console.error("❌ Error adding bank details:", error);
  }
};

  const updateBankDetails = async (customerId) => {
  debugger
  try {
    const formData = new FormData();
    formData.append("bankData", JSON.stringify(bankData));
    formData.append("customerId", customerId);

    // Append cheque files (only new ones)
    bankData.forEach((bank) => {
      if (bank.cancelCheque && bank.cancelCheque instanceof File) {
        formData.append("cancelCheque", bank.cancelCheque);
      }
    });

    const res = await axios.put("http://localhost:5000/bank/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Bank Update Response:", res.data);
  } catch (error) {
    console.error("❌ Error updating bank details:", error);
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
            
            <div className="flex items-center gap-2 ">
              <label htmlFor="badDebtor" className="text-gray-700 font-medium text-[11.25px]">
    Bad Debtor
  </label>
  <input
    type="checkbox"
    id="badDebtor"
    checked={formData.badDebtor}
    onChange={(e) => setFormData({ ...formData, badDebtor: e.target.checked })}
    className="w-5 h-5 accent-red-600 cursor-pointer w-[15.25px]"
  />
  
</div>
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

             <button
      onClick={() => navigate("/Customer-Profile-List")}
      className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
    >
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
              

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">PAN Number <span className="text-red-500">*</span></label>
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
                <label className="text-[14px] font-medium">Marital Status</label>
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
                  placeholder="Eg.Employee."
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
                  placeholder="First Name"
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
                  placeholder="Middle Name"
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
                  placeholder="Last Name"
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
                  placeholder="Father/Husband's Last Name"
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
                  placeholder="Eg.+91 9658426853"
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
           <div>
      {/* Upload Customer Profile */}
      <div>
        <div className="flex justify-center mt-5 mb-2">
          <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
            Upload Customer Profile
          </label>
        </div>

        <div className="relative flex justify-center">
          {/* Background or Preview */}
        <img
  src={
    formData.profileImage
      ? typeof formData.profileImage === "string"
        ? formData.profileImage // use existing URL from backend
        : URL.createObjectURL(formData.profileImage) // use File preview
      : profileempty // default placeholder
  }
  alt="profile"
  className="w-[156px] h-[156px] border"
/>


          {/* Upload Button */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-opacity-40 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-60 transition"
            onClick={() => document.getElementById("profileUpload").click()}
          >
            <button className="w-[101px] h-[18px] p-1 bg-[#0A2478] text-white text-[8px] rounded-[3px]">
              Upload from Computer
            </button>
          </div>

          {/* Hidden Input */}
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            className="hidden"
            onChange={handleProfileUpload}
          />
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
        {/* Background Image or Preview */}
       <img
  src={
    formData.signature
      ? formData.signature instanceof File
        ? URL.createObjectURL(formData.signature) // for newly uploaded files
        : `${formData.signature}` // for existing file path
      : profileempty
  }
  alt="signature"
  className="w-[156px] h-[58px] border rounded-md"
/>


        {/* Upload Button */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-opacity-40 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-60 transition"
          onClick={() => document.getElementById("signatureUpload").click()}
        >
          <button className="w-[101px] h-[18px] p-1 bg-[#0A2478] text-white text-[8px] rounded-[3px]">
            Upload from Computer
          </button>
        </div>

        {/* Hidden Input */}
        <input
          type="file"
          id="signatureUpload"
          accept="image/*"
          className="hidden"
          onChange={handleSignatureUpload}
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
                placeholder="Eg.10"
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
                placeholder="Eg.10"
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
  <option value="">Select Address Proof</option>

  {addrProofList.map(item => {
    const proof = item.proof_type.toLowerCase();

    return (
      <option
        key={item.id}
        value={item.proof_type}

       disabled={
            (formData.panNo && proof.includes("pan")) ||
            (formData.aadhar && (proof.includes("adhaar") || proof.includes("adhar")))
          }
      >
        {item.proof_type}
      </option>
    );
  })}
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
              placeholder="Any Details"
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

    {idProofList.map(item => {
      const p = item.proof_type.toLowerCase();

      return (
        <option
          key={item.id}
          value={item.proof_type}
          disabled={
            (formData.panNo && p.includes("pan")) ||
            (formData.aadhar && (p.includes("adhaar") || p.includes("adhar")))
          }
        >
          {item.proof_type}
        </option>
      );
    })}
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
              placeholder="Reference"
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
              placeholder="Reference"
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
                placeholder="Relation"
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
                placeholder="Address"
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
            <input type="radio" name="access" className="accent-[#0A2478]"
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

      <CustBankDetails bankData={bankData} setBankData={setBankData} mode={modeForBank} setMode={setModeForbank} updatemode={mode} />
    </div>
  );
};

export default AddCustProfile;
