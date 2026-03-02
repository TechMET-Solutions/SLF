import { FaPaperclip } from "react-icons/fa";

import axios from "axios";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import { fetchAreasApi } from "../API/Master/Master_Profile/Area_Details";
import profileempty from "../assets/profileempty.png";
import righttick from "../assets/righttick.png";
import send from "../assets/send.svg";
import { encryptData } from "../utils/cryptoHelper";
import CustBankDetails from "./CustBankDetails";

const AddCustProfile = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const editor = useRef(null);
  const signatureCanvasRef = useRef(null);

  const customerData = location.state?.customerData;
  const modedata = location.state?.type;
  console.log(customerData, "customerData");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [mode, setMode] = useState(modedata);
  const [modeForBank, setModeForbank] = useState("add");
  console.log(mode, "mode");
  const [bankData, setBankData] = useState([]);
  console.log(bankData, "bankData");
  const config = useMemo(
    () => ({
      readonly: false,
      height: 300,
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "|",
        "align",
        "|",
        "link",
        "|",
        "undo",
        "redo",
      ],
      removeButtons: [
        "image",
        "video",
        "table",
        "file",
        "source",
        "fullsize",
        "about",
        "print",
        "eraser",
        "brush",
        "superscript",
        "subscript",
        "hr",
        "symbol",
        "copyformat",
      ],
    }),
    [],
  );
  const [formData, setFormData] = useState({
    panNo: "",
    panFile: null, // store selected file here
    aadhar: "",
    aadharFile: null,
    printName: "",
    email: "",
    mobile: "",
    otp: "",
    MobileNumberOtp: "",
    GSTNumberOtp: "",
    altMobile: "",
    dob: "",
    gender: "",
    marital: "",
    gstNo: "",
    religion: "",
    education: "",
    occupation: "",
    partyType: "Individual",
    riskCategory: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fatherFirstName: "",
    landline: "",
    pep: "",
    profileImage: null,
    signature: null,

    //Permanent

    Permanent_Address: "",
    Permanent_Pincode: "",
    Permanent_State: "",
    Permanent_City: "",
    Permanent_Country: "India",
    Permanent_ResiStatus: "",
    Permanent_Resisince: "",
    Permanent_Category: "",
    Permanent_CompanyType: "",
    Permanent_IndustryType: "",
    Permanent_Businessworkingsince: "",

    //  Corresponding

    Corresponding_Address: "",
    Corresponding_Pincode: "",

    Corresponding_State: "",
    Corresponding_City: "",
    Corresponding_Country: "India",
    Corresponding_Area: "",

    //Additional Documents

    Additional_AddressProof: "",
    Additional_AnyDetails1: "",
    Additional_IDProof: "",
    Additional_AnyDetails2: "",
    Additional_Reference1: "",
    Additional_Reference2: "",
    Additional_UploadDocumentFile1: null,
    Additional_UploadDocumentFile2: null,

    //Nominee
    Nominee_NomineeName: "",
    Nominee_Relation: "",
    Nominee_Address: "",
    Nominee_State: "",
    Nominee_City: "",

    //access
    access: "",
    password: "",
    badDebtor: false,
    badDebtorReason: "",

    branchId: "",
    branchName: "",
    financialYear: "",
  });

  console.log(formData, "formData");
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData) {
      setFormData((prev) => ({
        ...prev,
        branchId: userData.branchId?.id || "",
        branchName: userData.branchId?.branch_name || "",
        financialYear: userData.financialYear || "",
      }));
    }
  }, []);

  const [adharMaskingData, setAdharMaskingData] = useState("");

  const [isBadDebtorModalOpen, setIsBadDebtorModalOpen] = useState(false);
  const [badDebtorReason, setBadDebtorReason] = useState("");
  // Adding verified status to your state
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  console.log(formData, "formData");
  const [BankformData, setBankFormData] = useState({
    bankName: "",
    customerName: "",
    accountNo: "",
    ifsc: "",
    bankAddress: "",
    cancelCheque: null,
  });

  const [documents, setDocuments] = useState([]); // main list from API
  const [idProofList, setIdProofList] = useState([]); // filtered only id proof
  const [addrProofList, setAddrProofList] = useState([]); // filtered only address proof
  const [areas, setAreas] = useState([]); // areas list from API
  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isGstVerified, setIsGstVerified] = useState(false);

  const fetchAreas = async () => {
    try {
      const areasData = await fetchAreasApi();
      if (areasData?.items && Array.isArray(areasData.items)) {
        setAreas(areasData.items);
      } else {
        setAreas([]);
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
      setAreas([]);
    }
  };

  const fetchDocuments = async () => {
    try {
      // setLoading(true);

      const response = await axios.get(`${API}/Master/getAllDocumentProofs`);

      const docs = response.data.data; // <-- already clean json

      setDocuments(docs);

      setIdProofList(docs.filter((x) => x.is_id_proof === 1));
      setAddrProofList(docs.filter((x) => x.is_address_proof === 1));

      // setLoading(false);
    } catch (err) {
      console.error("Error fetching documents:", err);
      // setError("Failed to fetch documents");
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchAreas();
  }, []);

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

  const openSignatureModal = () => {
    setIsSignatureModalOpen(true);
  };

  const closeSignatureModal = () => {
    setIsSignatureModalOpen(false);
  };

  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  const saveSignature = () => {
    if (signatureCanvasRef.current) {
      const dataUrl = signatureCanvasRef.current.toDataURL("image/png");

      // Convert data URL to blob
      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "signature.png", { type: "image/png" });
          setFormData((prev) => ({
            ...prev,
            signature: file,
          }));
          setIsSignatureModalOpen(false);
        });
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

    // Live email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }
    }
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
    debugger;
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

  function formatDateToMySQL(dateString) {
    if (!dateString) return null;

    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);
  const handleSubmit = async () => {
    debugger;
    try {
      if (formData.pep === "yes") {
        alert(
          "❌ Politically Exposed Persons (PEP) cannot be added as customers.",
        );
        return; // ⛔ STOP execution
      }
      const { bankData, ...rest } = formData;

      // 🧩 Step 2: Prepare the payload without bankData
      const payloadToEncrypt = {
        ...rest,
        Added_On: rest.Added_On ? formatDateToMySQL(rest.Added_On) : null,
        createdAt: rest.createdAt ? formatDateToMySQL(rest.createdAt) : null,
        // 🗓️ Date field conversion (IMPORTANT)
        dob: formatDateToMySQL(rest.dob),
        Remark: content,
        Added_By: loginUser,
      };

      // 🔒 Step 3: Encrypt only the filtered data
      const encrypted = encryptData(payloadToEncrypt);
      const formDataToSend = new FormData();
      formDataToSend.append("data", encrypted);

      // Append uploaded files only if present
      if (formData.panFile) formDataToSend.append("panFile", formData.panFile);
      if (formData.aadharFile)
        formDataToSend.append("aadharFile", formData.aadharFile);
      if (formData.profileImage)
        formDataToSend.append("profileImage", formData.profileImage);
      if (formData.signature)
        formDataToSend.append("signature", formData.signature);
      if (formData.Additional_UploadDocumentFile1)
        formDataToSend.append(
          "Additional_UploadDocumentFile1",
          formData.Additional_UploadDocumentFile1,
        );
      if (formData.Additional_UploadDocumentFile2)
        formDataToSend.append(
          "Additional_UploadDocumentFile2",
          formData.Additional_UploadDocumentFile2,
        );

      let response;

      if (mode === "edit") {
        // ✳️ Update existing customer
        response = await axios.post(
          `${API}/Master/doc/updateCustomer`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
      } else {
        // 🆕 Add new customer
        response = await axios.post(`${API}/Master/doc/add`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
        alert(
          "❌ Something went wrong: " +
          (response.data.message || "Unknown error"),
        );
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

      const res = await axios.post(`${API}/bank/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Response:", res.data);
    } catch (error) {
      console.error("❌ Error adding bank details:", error);
    }
  };

  const updateBankDetails = async (customerId) => {
    debugger;
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

      const res = await axios.put(`${API}/bank/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Bank Update Response:", res.data);
    } catch (error) {
      console.error("❌ Error updating bank details:", error);
    }
  };

  const splitFullName = (fullName) => {
    const parts = fullName.trim().split(" ");

    return {
      firstName: parts[0] || "",
      middleName: parts.length === 3 ? parts[1] : "",
      lastName: parts.length === 3 ? parts[2] : parts[1] || "",
    };
  };

  const verifyPan = async () => {
    debugger;
    if (!formData.panNo) {
      alert("Enter PAN Number");
      return;
    }

    try {
      const res = await axios.post(`${API}/kyc/pan/verify`, {
        pan: formData.panNo,
        name: "---",
      });

      // Accessing the nested data object from your response
      const panDetails = res.data.data.data;

      // 1. Extract Name Parts
      const [fName, mName, lName] = panDetails.full_name_split;

      // 2. Extract last 4 digits of Aadhaar (e.g., "3034")
      const aadhaarMasked = panDetails.masked_aadhaar; // "XXXXXXXX3034"
      const lastFourDigits = aadhaarMasked ? aadhaarMasked.slice(-4) : "";
      const genderMap = {
        M: "Male",
        F: "Female",
        O: "Other",
      };
      const toTitleCase = (str = "") => {
        return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      };

      // 3. Update State
      setFormData((prev) => ({
        ...prev,
        printName: panDetails.full_name,
        firstName: fName || "",
        middleName: mName || "",
        lastName: lName || "",
        dob: panDetails.dob,
        aadhar: panDetails.masked_aadhaar,
        gender: genderMap[panDetails.gender] || prev.gender,

        // Phone Number Mapping (Jar API madhe aala tar)
        mobile: panDetails.phone_number || prev.mobile,

        // Address Mapping (Nested object madhun full address mapping)
        Permanent_Address: panDetails.address?.full || prev.Permanent_Address,
        Permanent_City: panDetails.address?.city || prev.Permanent_City,
        Permanent_State: panDetails.address?.state
          ? toTitleCase(panDetails.address.state)
          : "Maharashtra", // Default fallback
        Permanent_Pincode: panDetails.address?.zip || prev.Permanent_Pincode,
      }));
      setAdharMaskingData(lastFourDigits);
      alert(`PAN Verified!`);
    } catch (error) {
      console.error("Verification Error:", error);
      alert("PAN Verification Failed");
    }
  };

  const sendAadhaarOTP = async () => {
    // 1. Basic Length Check
    if (!formData.aadhar || formData.aadhar.length !== 12) {
      alert("Enter valid 12-digit Aadhaar");
      return;
    }

    // 2. Cross-check with PAN Masked Data
    const inputLastFour = formData.aadhar.slice(-4);

    if (adharMaskingData && inputLastFour !== adharMaskingData) {
      alert(`Aadhaar mismatch!.`);
      return;
    }

    // 3. Proceed to API if validation passes
    try {
      const res = await axios.post(`${API}/kyc/aadhaar/send-otp`, {
        aadhaar_number: formData.aadhar,
      });

      setFormData((prev) => ({
        ...prev,
        refId: res.data.data.ref_id,
      }));

      alert("Aadhar Verify successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };
  const verifyAadhaarOtp = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      alert("Please enter a valid OTP");
      return;
    }

    try {
      const res = await axios.post(`${API}/kyc/aadhaar/verify-otp`, {
        otp: formData.otp,
        ref_id: formData.refId,
      });

      if (res.data.status) {
        alert("Aadhaar Verified Successfully!");
        // Optional: Set success flag
        // setFormData({ ...formData, aadhaarVerified: true });
      }
    } catch (error) {
      alert("OTP Verification Failed!");
      console.error(error);
    }
  };

  const sendMobileOTP = async () => {
    const mobile = String(formData.mobile || "").trim();

    if (!mobile) {
      alert("Enter mobile number");
      return;
    }

    // ✅ Check 10-digit Indian mobile number
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      const res = await axios.post("https://slunawat.co.in/otp/send-otp", {
        mobile: String(formData.mobile).trim(),
      });

      if (res.data.success) {
        alert("OTP sent successfully");
        setIsOtpSent(true);
        setFormData((prev) => ({ ...prev, MobileNumberOtp: "" }));
      } else {
        alert(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      alert("OTP send failed");
    }
  };

  // 2. Function to Verify OTP
  const verifyMobileOTP = async () => {
    if (!formData.MobileNumberOtp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const res = await axios.post("https://slunawat.co.in/otp/verify-otp", {
        mobile: String(formData.mobile).trim(),
        otp: String(formData.MobileNumberOtp).trim(),
      });

      if (res.data.success === true) {
        alert("Mobile Verified Successfully!");
        setIsMobileVerified(true);
      } else {
        alert(res.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);
      alert(error?.response?.data?.message || "OTP verification failed.");
    }
  };

  const verifyGst = async () => {
    if (!formData.gstNo) {
      alert("Enter GST Number");
      return;
    }

    try {
      const res = await axios.post(`${API}/kyc/gst/verify`, {
        gst: formData.gstNo,
      });

      if (res.data.status === true) {
        alert("GST Verified Successfully");
        setIsGstVerified(true);
      } else {
        alert("GST Verification Failed");
      }
    } catch (err) {
      alert(err?.response?.data?.error || "GST verification failed");
    }
  };

  return (
    <div>
      <div className="flex justify-center sticky top-[80px] z-40 ">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
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

            <div className="flex items-center gap-2">
              <label
                htmlFor="badDebtor"
                className="text-gray-700 font-medium text-[11.25px]"
              >
                Bad Debtor
              </label>

              <input
                type="checkbox"
                id="badDebtor"
                checked={formData.badDebtor}
                onChange={(e) => {
                  const checked = e.target.checked;

                  if (checked) {
                    setIsBadDebtorModalOpen(true); // 👉 Open modal
                  } else {
                    setFormData({
                      ...formData,
                      badDebtor: false,
                      badDebtorReason: "",
                    });
                  }
                }}
                className="w-5 h-5 accent-red-600 cursor-pointer"
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
      <div className="flex pl-[110px] pr-[110px] mt-2">
        <div className="bg-[#FFE6E6] mt-2 p-6 rounded-md w-full mx-auto ">
          <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
            Personal Information
          </p>

          <div className="flex justify-between gap-2">
            <div className="">
              <div className="flex items-center gap-4 w-full">
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">PAN Number </label>
                  <div className="flex items-center mt-1 ">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter PAN"
                        name="panNo"
                        value={formData.panNo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            panNo: e.target.value.toUpperCase(),
                          })
                        }
                        className="border border-[#C4C4C4] border-r-0 rounded-l px-3 py-2  pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white w-[140px]"
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
                      className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b] w-[70px]"
                      type="button"
                      onClick={verifyPan}
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
                  <div className="flex items-center mt-1 w-[210px]">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        placeholder={
                          formData.aadhar
                            ? `${formData.aadhar}`
                            : "Enter Aadhar"
                        }
                        //  placeholder={formData.aadhar}
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleChange}
                        className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        style={{
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
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
                      className="bg-[#0A2478] text-white px-2 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b] "
                      type="button"
                      onClick={sendAadhaarOTP}
                    >
                      verify
                    </button>
                  </div>

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
                    className={`border rounded px-3 py-2 mt-1 w-[250px] bg-white ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                  />

                  {errors.email && (
                    <span className="text-red-500 text-[12px] mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    DOB
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[140px] bg-white"
                  />
                </div>

                {/* Email */}
              </div>

              <div className="flex items-end gap-4 w-full mt-4">
                {/* Mobile Number + OTP Button */}
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Mobile No <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center mt-1 w-[180px]">
                    <input
                      type="text"
                      name="mobile"
                      disabled={isMobileVerified} // Disable if verified
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="mobile Number"
                      className={`border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full focus:outline-none bg-white ${isMobileVerified ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={sendMobileOTP}
                      disabled={isMobileVerified}
                      className={`bg-[#0A2478] text-white px-4 py-2 rounded-r border border-gray-300 border-l-0 flex justify-center items-center gap-2 ${isMobileVerified
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#081c5b]"
                        }`}
                    >
                      <img src={send} alt="otp" className="w-4 h-4" />
                      <span>{isOtpSent ? "Resend" : "OTP"}</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">Verify OTP</label>
                  <div className="relative mt-1 w-[110px]">
                    <input
                      type="number"
                      placeholder="Enter OTP"
                      name="MobileNumberOtp"
                      disabled={isMobileVerified} // Disable if verified
                      value={formData.MobileNumberOtp}
                      onChange={handleChange}
                      className={`border border-gray-300 rounded-[8px] px-3 py-2 w-[110px] focus:outline-none ${isMobileVerified ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                      style={{ MozAppearance: "textfield" }}
                    />

                    {/* Show tick icon only if NOT verified, or change icon to a green checkmark */}
                    {!isMobileVerified ? (
                      <img
                        src={righttick}
                        alt="tick"
                        onClick={verifyMobileOTP}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px] cursor-pointer hover:scale-110"
                      />
                    ) : (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
                {/* OTP Verification */}

                {/* Alternate Mobile */}
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Alt Mobile No
                  </label>
                  <input
                    type="text"
                    name="altMobile"
                    value={formData.altMobile}
                    maxLength={10}
                    onChange={handleChange}
                    placeholder="Enter Alternate Mobile"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[110px] bg-white"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Landline Number
                  </label>
                  <input
                    type="number"
                    name="landline"
                    value={formData.landline}
                    onChange={handleChange}
                    placeholder="Eg.+91 9658426853"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[140px] bg-white"
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[100px] bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Marital Status
                  </label>
                  <select
                    name="marital"
                    value={formData.marital}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[100px] bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">Party Type</label>
                  <select
                    name="partyType"
                    value={formData.partyType}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[120px] bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Religious Belief
                  </label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[120px] bg-white"
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
              </div>

              <div className="flex items-end gap-4 w-full mt-3">
                {formData.partyType !== "" && (
                  <>
                    <div className="flex flex-col">
                      <label className="text-[14px] font-medium">GST No.</label>
                      <div className="flex items-center mt-1 w-[233px]">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Enter GST No."
                            name="gstNo"
                            value={formData.gstNo}
                            onChange={handleChange}
                            disabled={isGstVerified}
                            className={`border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none ${isGstVerified
                              ? "bg-gray-100 cursor-not-allowed"
                              : "bg-white"
                              }`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={verifyGst}
                          disabled={isGstVerified}
                          className={`bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 ${isGstVerified
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#081c5b]"
                            }`}
                        >
                          {isGstVerified ? "Verified" : "Verify"}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">Education</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[160px] bg-white"
                  >
                    <option value="">Select Education</option>
                    <option value="No Formal Education">
                      No Formal Education
                    </option>
                    <option value="Primary School">Primary School</option>
                    <option value="High School">High School</option>
                    <option value="Intermediate">Intermediate / 12th</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduate">
                      Graduate (Bachelor’s Degree)
                    </option>
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

                <div className="flex flex-col ">
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
                  <label className="text-[14px] font-medium">
                    Risk Category
                  </label>
                  <select
                    name="riskCategory"
                    value={formData.riskCategory}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[80px] bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="flex flex-col ">
                  <label className="text-[14px] font-medium">First Name.</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[120px] bg-white"
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
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[120px] bg-white"
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
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[125px] bg-white"
                  />
                </div>
              </div>

              <div className="flex items-end gap-4 w-full mt-3">
                {/* Marital */}
              </div>

              <div className="flex gap-6 ">
                {/* Father/Husband's Last Name */}
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Father/Husbands Full Name
                  </label>
                  <input
                    type="text"
                    name="fatherFirstName"
                    value={formData.fatherFirstName}
                    onChange={handleChange}
                    placeholder="Father/Husbands First Name"
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[260px] bg-white"
                  />
                </div>

                {/* Politically Exposed Person */}
                <div className="flex flex-col ">
                  <label className="text-[14px] font-medium">
                    Politically Exposed Person?{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pep"
                        value="yes"
                        checked={formData.pep === "yes"}
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pep"
                        value="no"
                        checked={formData.pep === "no"}
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
                  <div className="flex justify-center  mb-2">
                    <label className=" font-bold text-[14px] leading-[100%] tracking-[0.03em] text-center">
                      Upload Customer Photo
                    </label>
                  </div>

                  {/* <div className="relative flex justify-center">
                    <img
                      src={
                        formData.profileImage
                          ? typeof formData.profileImage === "string"
                            ? formData.profileImage // use existing URL from backend
                            : URL.createObjectURL(formData.profileImage) // use File preview
                          : profileempty // default placeholder
                      }
                      alt="profile"
                      className="w-[130px] h-[130px] border"
                    />

                    <div
                      className="absolute inset-0 flex items-center justify-center bg-opacity-40 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-60 transition"
                      onClick={() =>
                        document.getElementById("profileUpload").click()
                      }
                    >
                      <button className="w-[101px] h-[18px] p-1 bg-[#0A2478] text-white text-[8px] rounded-[3px]">
                        Upload from Computer
                      </button>
                    </div>

                    <input
                      type="file"
                      id="profileUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileUpload}
                    />
                  </div> */}

                  <div className="relative flex justify-center group">
                    {/* Background or Preview */}
                    <img
                      src={
                        formData.profileImage
                          ? typeof formData.profileImage === "string"
                            ? formData.profileImage
                            : URL.createObjectURL(formData.profileImage)
                          : profileempty
                      }
                      alt="profile"
                      className="w-[130px] h-[130px] border"
                    />

                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 left-3 w-[130px] h-[130px] flex items-center justify-center 
      bg-black/10 transition-opacity duration-300
      ${formData.profileImage
                          ? "opacity-0 group-hover:opacity-100"
                          : "opacity-100"
                        }
    `}
                      onClick={() =>
                        document.getElementById("profileUpload").click()
                      }
                    >
                      <button className="w-[101px] h-[24px] bg-[#0A2478] text-white text-[10px] rounded-[3px]">
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
                  <label className="font-roboto font-bold text-[14px] leading-[100%] tracking-[0.03em] text-center">
                    Customer Signature
                  </label>
                </div>

                {/* <div className="relative flex justify-center">
                  <img
                    src={
                      formData.signature
                        ? formData.signature instanceof File
                          ? URL.createObjectURL(formData.signature) // for newly drawn/uploaded files
                          : `${formData.signature}` // for existing file path
                        : profileempty
                    }
                    alt="signature"
                    className="w-[130px] h-[38px] border rounded-md"
                  />

                  <div
                    className="absolute inset-0 flex items-center justify-center bg-opacity-40 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-60 transition"
                    onClick={openSignatureModal}
                  >
                    <button className="w-[130px] h-[18px] p-1 bg-[#0A2478] text-white text-[8px] rounded-[3px]">
                      Draw Signature
                    </button>
                  </div>
                </div> */}

                <div className="relative flex justify-center group">
                  <img
                    src={
                      formData.signature
                        ? formData.signature instanceof File
                          ? URL.createObjectURL(formData.signature)
                          : `${formData.signature}`
                        : profileempty
                    }
                    alt="signature"
                    className="w-[130px] h-[38px] border rounded-md"
                  />

                  <div
                    className={`
      absolute inset-0 flex items-center left-3 w-[130px] h-[38px] justify-center 
      bg-black/40 transition-opacity duration-300
      ${formData.signature
                        ? "opacity-0 group-hover:opacity-100"
                        : "opacity-100"
                      }
    `}
                    onClick={openSignatureModal}
                  >
                    <button className="w-[100px] h-[20px] bg-[#0A2478] text-white text-[10px] rounded-[3px]">
                      Draw Signature
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Drawing Modal */}
      {isSignatureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0101017A] backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg w-[600px]">
            <h2 className="text-lg font-semibold text-[#0A2478] mb-4">
              Draw Your Signature
            </h2>

            <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
              <SignatureCanvas
                ref={signatureCanvasRef}
                penColor="black"
                canvasProps={{
                  width: 550,
                  height: 200,
                  className: "border-0",
                }}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={clearSignature}
              >
                Clear
              </button>

              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={closeSignatureModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-[#0A2478] text-white rounded hover:bg-[#081c5b]"
                onClick={saveSignature}
              >
                Save Signature
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pl-[110px] pr-[110px]">
        <div className="bg-[#F7F7FF]  p-6 rounded-md w-full mx-auto ">
          <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
            Permanent Address
          </p>

          <div className="flex gap-3">
            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Address <span className="text-red-500">*</span>
                  </label>
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
                  <label className="text-[14px] font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  type="text"
                  name="Permanent_City"
                  value={formData.Permanent_City}
                  onChange={handleChange}
                  placeholder="City"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[150px] rounded-[8px] bg-white"
                />
              </div>
            </div>
            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    State <span className="text-red-500">*</span>
                  </label>
                </div>

                <select
                  name="Permanent_State"
                  value={formData.Permanent_State}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[150px] bg-white rounded-[8px]"
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
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
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
                  <label className="text-[14px] font-medium">
                    Country <span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  type="text"
                  name="Permanent_Country"
                  value={formData.Permanent_Country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[120px] rounded-[8px] bg-white"
                />
              </div>
            </div>
            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  type="text"
                  name="Permanent_Pincode"
                  value={formData.Permanent_Pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[100px] rounded-[8px] bg-white"
                />
              </div>
            </div>
            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Resi. Status
                  </label>
                </div>

                <select
                  name="Permanent_ResiStatus"
                  value={formData.Permanent_ResiStatus}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[140px] bg-white rounded-[8px]"
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
                  className="border border-gray-300 px-3 py-2 mt-1 w-[100px] rounded-[8px] bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">Category</label>
                </div>

                <select
                  name="Permanent_Category"
                  value={formData.Permanent_Category}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[180px] bg-white rounded-[8px]"
                >
                  <option value="">Select Category</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed (Professional)">
                    Self-Employed (Professional)
                  </option>
                  <option value="Self-Employed (Non-Professional)">
                    Self-Employed (Non-Professional)
                  </option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Housewife">Housewife</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Company Type
                  </label>
                </div>

                <select
                  name="Permanent_CompanyType"
                  value={formData.Permanent_CompanyType}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[130px] bg-white rounded-[8px]"
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
                  <label className="text-[14px] font-medium">
                    Industry Type
                  </label>
                </div>

                <select
                  name="Permanent_IndustryType"
                  value={formData.Permanent_IndustryType}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[150px] bg-white rounded-[8px]"
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
                  className="border border-gray-300 px-3 py-2 mt-1 w-[120px] rounded-[8px] bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-[110px] pr-[110px]">
        <div className="bg-[#FFE6E6]  p-6 rounded-md w-full mx-auto ">
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
                Permanent Address same as Current Address?
              </span>
            </label>
          </p>
          <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-4">
            Current Address
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

            <div className="">
              <div>
                <label className="text-[14px] font-medium">Area*</label>
              </div>

              <select
                name="Corresponding_Area"
                value={formData.Corresponding_Area}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 mt-1 w-[130px] bg-white rounded-[8px]"
              >
                <option value="">Select Area</option>
                {areas.length > 0 ? (
                  areas.map((area) => (
                    <option key={area.id} value={area.area_locality}>
                      {area.area_locality}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading areas...</option>
                )}
              </select>
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
                  className="border border-gray-300 px-3 py-2 mt-1 w-[150px] bg-white rounded-[8px]"
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
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
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
                  className="border border-gray-300 px-3 py-2 mt-1 w-[150px] rounded-[8px] bg-white"
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
                  className="border border-gray-300 px-3 py-2 mt-1 w-[120px] rounded-[8px] bg-white"
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
                  className="border border-gray-300 px-3 py-2 mt-1 w-[100px] rounded-[8px] bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" pl-[110px] pr-[110px]  ">
        <div className="bg-[#F7F7FF]  p-6 rounded-md w-full mx-auto ">
          <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
            Additional Documents
          </p>

          <div className="flex items-center gap-4">
            {/* Address Proof */}
            <div className="flex flex-col">
              <label className="text-[14px] font-medium">
                Address Proof <span className="text-red-500">*</span>
              </label>
              <select
                name="Additional_AddressProof"
                value={formData.Additional_AddressProof}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 mt-1 w-[200px] bg-white rounded-[8px]"
              >
                <option value="">Select Address Proof</option>

                {addrProofList.map((item) => {
                  const proof = item.proof_type.toLowerCase();

                  return (
                    <option
                      key={item.id}
                      value={item.proof_type}
                      disabled={
                        (formData.panNo && proof.includes("pan")) ||
                        (formData.aadhar &&
                          (proof.includes("adhaar") || proof.includes("adhar")))
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
              <label className="text-[14px] font-medium">
                Any Details <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Additional_AnyDetails1"
                value={formData.Additional_AnyDetails1}
                onChange={handleChange}
                placeholder="Any Details"
                className="border border-gray-300 px-3 py-2 mt-1 w-[250px] rounded-[8px] bg-white"
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="uploadDocument1"
                className="w-[160px] h-[40px] border rounded-[8px] bg-[#0A2478] text-[12px] text-white flex justify-center items-center gap-2 cursor-pointer "
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
              <label className="text-[14px] font-medium">
                ID Proof <span className="text-red-500">*</span>
              </label>

              <select
                name="Additional_IDProof"
                value={formData.Additional_IDProof}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 mt-1 w-[170px] bg-white rounded-[8px]"
              >
                <option value="">Select ID Proof</option>

                {idProofList.map((item) => {
                  const p = item.proof_type.toLowerCase();

                  return (
                    <option
                      key={item.id}
                      value={item.proof_type}
                      disabled={
                        (formData.panNo && p.includes("pan")) ||
                        (formData.aadhar &&
                          (p.includes("adhaar") || p.includes("adhar")))
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
              <label className="text-[14px] font-medium">
                Any Details <span className="text-red-500">*</span>
              </label>
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
                className="w-[160px] h-[40px] border rounded-[8px] bg-[#0A2478] text-[12px] text-white flex justify-center items-center gap-2 cursor-pointer"
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
          <div className="flex items-center gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-[14px] font-medium">Reference 1</label>
              <input
                type="text"
                name="Additional_Reference1"
                value={formData.Additional_Reference1}
                onChange={handleChange}
                placeholder="Reference"
                className="border border-gray-300 px-3 py-2 mt-1 w-[300px] rounded-[8px] bg-white"
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
                className="border border-gray-300 px-3 py-2 mt-1 w-[300px] rounded-[8px] bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pl-[110px] pr-[110px]">
        <div className="bg-[#FFE6E6]  p-6 rounded-md w-full mx-auto ">
          <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
            Nominee Details
          </p>

          <div className="flex gap-3">
            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Nominee <span className="text-red-500">*</span>
                  </label>
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
                  <label className="text-[14px] font-medium">
                    Relation <span className="text-red-500">*</span>
                  </label>
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
                  <label className="text-[14px] font-medium">
                    Address <span className="text-red-500">*</span>
                  </label>
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
                  <label className="text-[14px] font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
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
            <div>
              <div className="">
                <div>
                  {" "}
                  <label className="text-[14px] font-medium">
                    State <span className="text-red-500">*</span>
                  </label>
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
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="pl-[110px] pr-[110px]">
        <div className="flex  gap-[100px]  bg-[#F7F7FF] p-6">
          {/* Header */}
          <p className="font-['Source_Sans_3'] font-bold text-[24px] text-[#0A2478] mb-2">
            Additional User Access
          </p>

          {/* Question */}
          <div className="mt-1">
            <label className="flex items-center gap-2 font-['Roboto'] text-[16px]">
              <input
                type="radio"
                name="access"
                className="accent-[#0A2478]"
                value="Yes"
                checked={formData.access === "Yes"}
                onChange={handleChange}
              />
              <span className="font-['Roboto'] text-[16px] text-[#000000]">
                Allow Customers to access Mobile App?
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Password Field (only show when access = Yes)
      {formData.access === "Yes" && (
        <div className="pl-[115px] pr-[120px] mb-5">
          <label className="font-['Roboto'] text-[16px] block mb-1">
            Set Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="border border-gray-300 px-3 py-2 rounded w-[300px]"
          />
        </div>
      )} */}
      <div className="pl-[110px] pr-[110px]">
        <div className="p-6 rounded-md w-full mx-auto bg-[#FFE6E6]">
          <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 ">
            Remark
          </p>

          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <div className="pl-[110px] pr-[110px]">
        <div>
          <CustBankDetails
            bankData={bankData}
            setBankData={setBankData}
            mode={modeForBank}
            setMode={setModeForbank}
            updatemode={mode}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-5 mb-5 justify-center">
        <button
          style={{
            width: "100px",
            height: "34px",
            borderRadius: "3.75px",
          }}
          // onClick={() => setIsModalOpen(true)}
          className="bg-[#0A2478] text-white text-[14.25px] font-source font-normal flex items-center justify-center"
          onClick={handleSubmit}
        >
          save
        </button>

        <button
          onClick={() => navigate("/Customer-Profile-List")}
          className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[100px] h-[34px] opacity-100 text-[14px]"
        >
          Exit
        </button>
      </div>
      {isBadDebtorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0101017A] backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold text-[#0A2478] mb-3">
              Bad Debtor Reason
            </h2>

            <textarea
              placeholder="Enter reason for marking as bad debtor..."
              value={badDebtorReason}
              onChange={(e) => setBadDebtorReason(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 h-24"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setIsBadDebtorModalOpen(false);
                  setBadDebtorReason("");

                  // uncheck the checkbox
                  setFormData({
                    ...formData,
                    badDebtor: false,
                    badDebtorReason: "",
                  });
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-[#0A2478] text-white rounded"
                onClick={() => {
                  setIsBadDebtorModalOpen(false);

                  // Save to formData
                  setFormData({
                    ...formData,
                    badDebtor: true,
                    badDebtorReason: badDebtorReason,
                  });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCustProfile;
