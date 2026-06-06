import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import { usePermission } from "../API/Context/PermissionContext";
import envImg from "../assets/envImg.jpg";
import profileempty from "../assets/profileempty.png";
import timesvg from "../assets/timesvg.svg";
import Loader from "../Component/Loader";
import { decryptData } from "../utils/cryptoHelper";
import PledgeItemList from "./PledgeItemList";
import PledgeItemListSilver from "./PledgeItemListSilver";
const AddGoldLoanApplication = () => {
  const [schemes, setSchemes] = useState([]); // store all schemes
  const [selectedScheme, setSelectedScheme] = useState(null); // store selected scheme
  console.log(selectedScheme, "selectedScheme");
  const navigate = useNavigate();
  const [activeEmployees, setActiveEmployees] = useState([]);
  console.log(activeEmployees, "activeEmployees");
  const fileInputRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  const { permissions, userData } = usePermission();
  // const handleSchemeChange = (e) => {
  //   const selectedId = parseInt(e.target.value);
  //   const scheme = schemes.find((s) => s.id === selectedId);

  //   if (!scheme || !selectedCustomer) return;

  //   // ✅ Case-insensitive compare
  //   const customerType = selectedCustomer?.partyType?.toLowerCase();
  //  const schemeType = scheme?.partyType
  // ?.map((type) => type.toLowerCase())
  // .join(", ");

  //   // ❌ If mismatch → show popup + stop
  //   if (customerType !== schemeType) {
  //     alert(
  //       `This scheme is for "${scheme.partyType}" only.\nBorrower is "${selectedCustomer.partyType}".`,
  //     );

  //     // reset dropdown
  //     e.target.value = "";

  //     // optional: reset scheme state
  //     setSelectedScheme(null);

  //     setFormData((prev) => ({
  //       ...prev,
  //       schemeId: "",
  //       schemeName: "",
  //       schemeType: "",
  //       interestType: "",
  //     }));

  //     return;
  //   }

  //   setSelectedScheme(scheme);

  //   setFormData((prev) => ({
  //     ...prev,
  //     schemeId: scheme.id || "",
  //     schemeName: scheme.schemeName || "",
  //     schemeType: scheme.calcBasisOn || "",
  //     interestType: scheme.interestType || "",
  //   }));
  // };
  const handleSchemeChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const scheme = schemes.find((s) => s.id === selectedId);

    if (!scheme || !selectedCustomer) return;

    // ✅ Normalize customer type
    const customerType = selectedCustomer?.partyType?.toLowerCase();

    // ✅ Normalize scheme party types into array
    const schemeTypes = scheme?.partyType?.map((type) => type.toLowerCase());

    // ✅ Check if ANY match exists
    const isMatch = schemeTypes?.includes(customerType);

    // ❌ If mismatch → show popup
    if (!isMatch) {
      alert(
        `This scheme is for "${scheme.partyType.join(", ")}" only.\nBorrower is "${selectedCustomer.partyType}".`,
      );

      // reset dropdown
      e.target.value = "";

      setSelectedScheme(null);

      setFormData((prev) => ({
        ...prev,
        schemeId: "",
        schemeName: "",
        schemeType: "",
        interestType: "",
      }));

      return;
    }

    // ✅ If match → allow selection
    setSelectedScheme(scheme);

    setFormData((prev) => ({
      ...prev,
      schemeId: scheme.id || "",
      schemeName: scheme.schemeName || "",
      schemeType: scheme.calcBasisOn || "",
      interestType: scheme.interestType || "",
    }));
  };
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  console.log(image, "image");
  const [preview, setPreview] = useState(null); // optional for UI preview
  const [preview2, setPreview2] = useState(null);
  console.log(image, "this is uploaded signature image ");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // ✅ store actual file
      setPreview(URL.createObjectURL(file)); // 👈 only for preview
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage2(file); // ✅ store actual file
      setPreview2(URL.createObjectURL(file)); // 👈 only for preview
    }
  };

  const triggerUpload = () => {
    fileInputRef2.current.click();
  };

  const triggerUpload2 = () => {
    fileInputRef3.current.click();
  };
  const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);

//   const validateLoanForm = () => {
//     if (!selectedCustomer?.id) {
//       return "Borrower is required";
//     }

//     if (!selectedCoBorrower?.id) {
//       return "Co-Borrower is required";
//     }

//     if (!selectedScheme?.id) {
//       return "Scheme is required";
//     }

//     if (!formData.value1) {
//       return "Valuer 1 is required";
//     }

//     if (!formData.value2) {
//       return "Valuer 2 is required";
//     }

//     if (!formData.payDate) {
//       return "Pay Date is required";
//     }

//     if (!formData.Loan_amount || Number(formData.Loan_amount) <= 0) {
//       return "Valid Loan Amount is required";
//     }

//     // ✅ NEW: Ornament Photo validation
//     if (!formData.OrnamentFile) {
//       return "Ornament Photo is required";
//     }

// if (!image && !image2) {
//   return "At least one signature (Borrower or Co-Borrower) is required";
// }

//     return null;
//   };
 
const validateLoanForm = () => {
  let newErrors = {};

  if (!selectedCustomer?.id) {
    newErrors.borrower = "Borrower is required";
  }

  if (!selectedCoBorrower?.id) {
    newErrors.coBorrower = "Co-Borrower is required";
  }

  if (!selectedScheme?.id) {
    newErrors.scheme = "Scheme is required";
  }

  if (!formData.value1) {
    newErrors.value1 = "Valuer 1 is required";
  }

  if (!formData.value2) {
    newErrors.value2 = "Valuer 2 is required";
  }

  if (!formData.payDate) {
    newErrors.payDate = "Pay Date is required";
  }

  if (!formData.Loan_amount || Number(formData.Loan_amount) <= 0) {
    newErrors.Loan_amount = "Valid Loan Amount is required";
  }

  if (!formData.OrnamentFile) {
    newErrors.OrnamentFile = "Ornament Photo is required";
  }

  if (!image && !image2) {
    newErrors.signature =
      "At least one signature is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const validatePledgeItems = () => {
    if (!PledgeItem || PledgeItem.length === 0) {
      return "At least one pledge item is required";
    }

    for (let i = 0; i < PledgeItem.length; i++) {
      const item = PledgeItem[i];

      if (!item.particular?.trim()) {
        return `Row ${i + 1}: Particular is required`;
      }

      if (!item.gross || Number(item.gross) <= 0) {
        return `Row ${i + 1}: Gross weight is required`;
      }

      if (!item.netWeight || Number(item.netWeight) <= 0) {
        return `Row ${i + 1}: Net Weight is required`;
      }

      if (!item.purity || Number(item.purity) <= 0) {
        return `Row ${i + 1}: Actual Purity is required`;
      }
    }

    return null; // ✅ all valid
  };
  const handleSaveLoan = async () => {
    try {
      setLoading(true);
     const isValid = validateLoanForm();

    if (!isValid) {
      setLoading(false);
      return;
    }

      const pledgeError = validatePledgeItems();

      if (pledgeError) {
        alert(pledgeError);
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();

      // 👤 Borrower Details
      formDataToSend.append("BorrowerId", selectedCustomer?.id || "");

      formDataToSend.append("CoBorrowerId", selectedCoBorrower?.id || "");
      formDataToSend.append("Borrower", formData.borrowerName || searchTerm);
      formDataToSend.append("Scheme", formData.schemeName || "");
      formDataToSend.append("payDate", formData.payDate || "");
      formDataToSend.append("Scheme_type", formData.schemeType || "");
      formDataToSend.append("Scheme_ID", selectedScheme?.id || "");
      formDataToSend.append("Print_Name", formData.printName || "");
      formDataToSend.append("Mobile_Number", formData.mobile || "");
      formDataToSend.append("Alternate_Number", formData.altMobile || "");
      formDataToSend.append(
        "Co_Borrower",
        formData.CoBorrowerName || searchTermForCoBorrower,
      );
      formDataToSend.append("Relation", formData.CoBorrowerRelation || "");
      formDataToSend.append("Nominee", formData.Nominee_Name || "");
      formDataToSend.append("Nominee_Relation", formData.NomineeRelation || "");
      formDataToSend.append("interestType", formData.interestType || "");
      formDataToSend.append("branchName", formData.branchName || "");
      formDataToSend.append("financialYear", formData.financialYear || "");
      formDataToSend.append("branch_id", Number(formData.branchId));

      // 💎 Ornament Photo
      if (formData.OrnamentFile) {
        formDataToSend.append("Ornament_Photo", formData.OrnamentFile);
      }
      formDataToSend.append("signature", image); // ✅ correct
      formDataToSend.append("signature2", image2); // ✅ correct
      // 📦 Pledge Items
      formDataToSend.append(
        "Pledge_Item_List",
        JSON.stringify(PledgeItem || []),
      );
      formDataToSend.append("remark", remark || "");
      formDataToSend.append("Product_Name", selectedScheme.product || 0);
      // formDataToSend.append("Scheme_type", selectedScheme.calcBasisOn || 0);
      // 💰 Loan Details
      formDataToSend.append("Loan_amount", formData.Loan_amount || 0);
      formDataToSend.append("Doc_Charges", formData.Doc_Charges || 0);
      formDataToSend.append("Admin_Charges", formData.Admin_Charges || 0);
      formDataToSend.append("Net_Payable", formData.Net_Payable || 0);
      formDataToSend.append("Valuer_1", formData.value1);
      formDataToSend.append("Valuer_2", formData.value2);
      formDataToSend.append("Loan_Tenure", selectedScheme?.loanPeriod || "");
      formDataToSend.append("Min_Loan", selectedScheme?.minLoanAmount || "");
      formDataToSend.append("Max_Loan", selectedScheme?.maxLoanAmount || "");

      // 🧮 Effective Interest Rates (JSON)
      const effectiveInterestRates =
        selectedScheme?.interestRates?.length > 0
          ? selectedScheme.interestRates
          : [
              { term: "0-30", rate: 12 },
              { term: "31-90", rate: 14 },
            ]; // fallback default
      formDataToSend.append(
        "Effective_Interest_Rates",
        JSON.stringify(effectiveInterestRates),
      );

      // 🏢 Misc Info
      formDataToSend.append("added_by", loginUser);

      const res = await axios.post(
        `${API}/Transactions/goldloan/addLoan`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("✅ Loan Application Created Successfully!");
      setLoading(false);
      navigate("/Loan-Application");
    } catch (error) {
      console.error("❌ Error saving loan:", error);
      alert("Failed to save loan. Check console for details.");
       setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "SLF | Add Gold Loan Application ";
  }, []);

  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightedIndexForCoBorrower, setHighlightedIndexForCoBorrower] =
    useState(-1);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchTermForCoBorrower, setSearchTermForCoBorrower] = useState("");
  const [results, setResults] = useState([]);
  const [results2, setResults2] = useState([]);
  console.log(results, "results");
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [CustomerData, setCustomerData] = useState(null);
  console.log(CustomerData, "CustomerData");
  console.log(selectedCustomer, "selectedCustomer");

  const [errors, setErrors] = useState({});

  const [selectedCoBorrower, setSelectedCoBorrower] = useState(null);
  console.log(selectedCoBorrower, "selectedCoBorrower");
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  console.log(branchId, branchName);
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  const [remark, setRemark] = useState("");
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerID: "",
    borrowerAddress: "",
    schemeId: "",
    schemeName: "",
    schemeType: "",
    printName: "",
    mobile: "",
    altMobile: "",
    Borrower_ProfileImg: "",
    payDate: getTodayDate(),
    Borrower_signature: "",
    CoBorrowerName: "",
    CoBorrowerID: "",
    CoBorrower_ProfileImg: "",
    CoBorrower_signature: "",
    CoBorrowerId: "",
    CoBorrowerRelation: "",
    Nominee_Name: "",
    NomineeRelation: "",
    OrnamentPhoto: "",
    Loan_amount: "",
    interestType: "",
    Doc_Charges: "",
    Net_Payable: "",
    value1: "",
    value2: "",
    branchId: "",
    branchName: "",
    financialYear: "",
    Admin_Charges: "",
  });
  console.log(formData, "formData");
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData?.branchId) {
      const branch = userData.branchId;

      // ✅ Store separately
      setBranchId(branch.id);
      setBranchName(branch.branch_name);

      // ✅ Also store inside formData (if needed)
      setFormData((prev) => ({
        ...prev,
        branchId: branch.id,
        branchName: branch.branch_name,
        financialYear: userData.financialYear || "",
      }));
    }
  }, []);
  useEffect(() => {
    if (highlightedIndex >= 0) {
      const el = document.getElementById(`borrower-item-${highlightedIndex}`);

      if (el) {
        el.scrollIntoView({
          block: "nearest",
          behavior: "smooth", // optional
        });
      }
    }
  }, [highlightedIndex]);
  useEffect(() => {
    if (highlightedIndexForCoBorrower >= 0) {
      const el = document.getElementById(
        `coborrower-item-${highlightedIndexForCoBorrower}`,
      );

      if (el) {
        el.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndexForCoBorrower]);
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

  const [customerType, setCustomerType] = useState(""); // "borrower" | "coborrower"

  console.log(customerType, "customerType");
  const [remarkModel, setSelectedremarkModel] = useState(false);
  const [selectedBorrowerRemark, setSelectedBorrowerRemark] = useState(null);
  const [selectedCoBorrowerRemark, setSelectedCoBorrowerRemark] =
    useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [PledgeItem, setPledgeItem] = useState([
    {
      id: 1,
      particular: "",
      nos: 1,
      gross: "",
      netWeight: "",
      purity: "",
      Calculated_Purity: "",
      rate: "",
      valuation: "",
      remark: "",
    },
  ]);
  const [loanData, setLoanData] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  console.log(bankDetails, "bankDetails");
  console.log(CustomerData, "CustomerData");
  console.log(loanData, "loanData");
  const getActiveEmp = async () => {
    try {
      const res = await axios.get(`${API}/Master/getActiveEmployees`, {
        params: {
          loanAmount: formData.Loan_amount,
        },
      });

      const decrypted = decryptData(res.data.data);

      console.log(decrypted, "-------------active emp-----------");

      setActiveEmployees(Array.isArray(decrypted) ? decrypted : [decrypted]);
    } catch (error) {
      console.log("API Error:", error);

      // ✅ HANDLE 404 CASE
      if (error.response && error.response.status === 404) {
        console.warn("No employees found");

        setActiveEmployees([]); // 🔥 IMPORTANT (empty dropdown)

        // Optional message
        alert(error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  useEffect(() => {
    const loan = Number(formData.Loan_amount);

    // run API only if loan is a number (including 0)
    if (!isNaN(loan)) {
      getActiveEmp();
    }
  }, [formData.Loan_amount]);

  useEffect(() => {
    let totalValuation = 0;

    PledgeItem.forEach((item) => {
      totalValuation += Number(item.valuation) || 0;
    });

    const maxLoan = parseFloat(selectedScheme?.maxLoanAmount) || totalValuation;

    const loanAmount = totalValuation > maxLoan ? maxLoan : totalValuation;

    const loan = Number(loanAmount) || 0;

    let adminCharges = 0;

    if (selectedScheme?.adminChargeType === "percentage") {
      const adminPercent = Number(selectedScheme?.administrativeCharges || 0);

      // ✅ Calculate percentage
      adminCharges = (loan * adminPercent) / 100;

      // ✅ Round UP
      adminCharges = Math.ceil(adminCharges);

      // ✅ Apply Min & Max
      const min = Number(selectedScheme?.adminChargeMin || 0);
      const max = Number(selectedScheme?.adminChargeMax || Infinity);

      adminCharges = Math.max(min, Math.min(adminCharges, max));
    } else {
      // ✅ Fixed amount (optional round if needed)
      adminCharges = Math.ceil(
        Number(selectedScheme?.administrativeCharges || 0),
      );
    }
    let docCharges = 0;

    if (selectedScheme?.docChargeType === "fixed") {
      docCharges = Math.ceil(Number(selectedScheme?.docChargeFixed || 0));
    } else {
      const docPercent = Number(selectedScheme?.docChargePercent || 0);

      // ✅ Calculate percentage
      docCharges = (loan * docPercent) / 100;

      // ✅ Round UP
      docCharges = Math.ceil(docCharges);

      // ✅ Apply Min & Max
      const minDoc = Number(selectedScheme?.docChargeMin || 0);
      const maxDoc = Number(selectedScheme?.docChargeMax || Infinity);

      docCharges = Math.max(minDoc, Math.min(docCharges, maxDoc));
    }

    const roundedLoan = Math.ceil(loan / 100) * 100;
    const netPayable = roundedLoan + adminCharges + docCharges;

    setFormData((prev) => ({
      ...prev,
      Loan_amount: roundedLoan.toFixed(2),
      Admin_Charges: adminCharges.toFixed(2),
      Doc_Charges: docCharges.toFixed(2),
      Net_Payable: netPayable.toFixed(2),
    }));
  }, [PledgeItem, selectedScheme]);
  console.log(userData, "userData");
  useEffect(() => {
    debugger;

    // ✅ wait until BOTH are available
    if (!branchId || !selectedCustomer?.partyType) return;

    const fetchSchemes = async () => {
      try {
        const response = await axios.get(
          `${API}/Scheme/getSchemesAccordingToBranch`,
          {
            params: {
              branchId,
              loginUser: userData.isAdmin ? "admin" : userData.id,
              partyType: selectedCustomer?.partyType, // ✅ required now
            },
          },
        );

        const fetchedSchemes = response.data.items.map((item) => ({
          ...item,
          intCompound: item.calcMethod === "Compound",
        }));

        console.log("setSchemes", fetchedSchemes);
        setSchemes(fetchedSchemes);
      } catch (err) {
        console.error("❌ Error fetching schemes:", err);
      }
    };

    fetchSchemes();
  }, [branchId, selectedCustomer?.partyType]); // ✅ dependency added
  console.log(formData, "formData");


  useEffect(() => {
    const fetchCustomers = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      try {
        // setLoading(true);

        const res = await axios.get(`${API}/Master/doc/Customer_list`, {
          params: {
            search: searchTerm,
            branchId: branchId || "", // ✅ pass branchId
          },
        });

        setResults(res.data);
      } catch (err) {
        console.error("❌ Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, branchId]); // ✅ add dependency

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!searchTermForCoBorrower.trim()) {
        setResults2([]);
        return;
      }

      try {
        // setLoading(true);

        const res = await axios.get(`${API}/Master/doc/Customer_list`, {
          params: {
            search: searchTermForCoBorrower,
            branchId: branchId || "", // ✅ same here
          },
        });

        setResults2(res.data);
      } catch (err) {
        console.error("❌ Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(debounce);
  }, [searchTermForCoBorrower, branchId]);

  const Handleclosed = () => {
    setShowCustomerModal(false);
    setCustomerData(null);
    setLoanData(null);
    setBankDetails(null);
  };

  const handleSelectCustomer = (customer, type) => {
    if (!customer) return;

    // 1️⃣ Close dropdown immediately
    setResults([]);
    setLoading(false);

    // 2️⃣ Show selected customer in input
    setSearchTerm(`${customer.printName} (Id -${customer.id} )`);

    // 3️⃣ Update selected customer
    setSelectedCustomer(customer);

    // 4️⃣ Update borrower remark if borrower selected
    if (type === "Borrower") {
      setSelectedBorrowerRemark(customer?.Remark ?? "");
    }

    // 5️⃣ Build formatted address safely
    const borrowerAddress = [
      customer?.Permanent_Address,
      customer?.Permanent_City,
      customer?.Permanent_State,
      customer?.Permanent_Country,
    ]
      .filter(Boolean)
      .join(", ");

    const fullAddress = borrowerAddress
      ? `${borrowerAddress} - ${customer?.Permanent_Pincode ?? ""}`
      : "";

    // 6️⃣ Update form data
    setFormData((prev) => ({
      ...prev,
      borrowerName: customer?.firstName ?? "",
      borrowerID: customer?.id ?? null,

      printName: customer?.printName ?? "",
      mobile: customer?.mobile ?? "",
      altMobile: customer?.altMobile ?? "",
      email: customer?.email ?? "",
      panNo: customer?.panNo ?? "",
      aadhar: customer?.aadhar ?? "",

      Borrower_ProfileImg: customer?.profileImage ?? "",
      Borrower_signature: customer?.signature ?? "",

      borrowerAddress: fullAddress,

      Nominee_Name: customer?.Nominee_NomineeName ?? "",
      NomineeRelation: customer?.Nominee_Relation ?? "",
    }));

    // 7️⃣ Open remark modal smoothly
    setTimeout(() => {
      setSelectedremarkModel(true);
    }, 100);
  };

  const handleSelectCoborrower = (customer, type) => {
    if (!customer) return;

    // 1️⃣ Close dropdown immediately
    setResults2([]);
    setLoading(false);

    // 2️⃣ Show selected customer in input
    setSearchTermForCoBorrower(`${customer.printName} (Id -${customer.id} )`);

    // 3️⃣ Update selected customer
    setSelectedCoBorrower(customer);

    // 4️⃣ Update borrower remark if borrower selected
    if (type === "CoBorrower") {
      setSelectedBorrowerRemark(customer?.Remark ?? "");
    }

    // 5️⃣ Build formatted address safely
    const borrowerAddress = [
      customer?.Permanent_Address,
      customer?.Permanent_City,
      customer?.Permanent_State,
      customer?.Permanent_Country,
    ]
      .filter(Boolean)
      .join(", ");

    setFormData((prev) => ({
      ...prev,
      CoBorrowerName: customer.firstName || "",
      CoBorrowerID: customer.id || null,
      CoBorrower_ProfileImg: customer.profileImage || "",
      CoBorrower_signature: customer.signature || "",
      CoBorrowerId: customer.id || "",
    }));

    // 7️⃣ Open remark modal smoothly
    setTimeout(() => {
      setSelectedremarkModel(true);
    }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // 🔹 Mobile validation (only numbers, max 10 digits)
    if (name === "altMobile" || name === "mobile") {
      const numericValue = value.replace(/\D/g, "");

      if (numericValue.length > 10) {
        alert("Mobile number must be 10 digits only");
        return;
      }

      updatedValue = numericValue;
    }

    // 🔹 Valuer validation (must be different)
    if (name === "value1" && value === formData.value2) {
      alert("Valuer 1 and Valuer 2 must be different");
      return;
    }

    if (name === "value2" && value === formData.value1) {
      alert("Valuer 1 and Valuer 2 must be different");
      return;
    }

    // 🔹 Update state
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };
  const handleOrnamentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        OrnamentPhoto: imageUrl, // preview
        OrnamentFile: file, // actual file for upload
      }));
    }
  };

  const numberToWords = (num) => {
    if (!num || isNaN(num)) return "";

    const numValue =
      typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num;
    if (numValue === 0) return "Zero";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const convertMillions = (n) => {
      if (n >= 10000000) {
        return (
          convertMillions(Math.floor(n / 10000000)) +
          " Crore " +
          convertLakhs(n % 10000000)
        );
      } else {
        return convertLakhs(n);
      }
    };

    const convertLakhs = (n) => {
      if (n >= 100000) {
        return (
          convertLakhs(Math.floor(n / 100000)) +
          " Lakh " +
          convertThousands(n % 100000)
        );
      } else {
        return convertThousands(n);
      }
    };

    const convertThousands = (n) => {
      if (n >= 1000) {
        return (
          convertHundreds(Math.floor(n / 1000)) +
          " Thousand " +
          convertHundreds(n % 1000)
        );
      } else {
        return convertHundreds(n);
      }
    };

    const convertHundreds = (n) => {
      if (n > 99) {
        return ones[Math.floor(n / 100)] + " Hundred " + convertTens(n % 100);
      } else {
        return convertTens(n);
      }
    };

    const convertTens = (n) => {
      if (n < 10) return ones[n];
      else if (n >= 10 && n < 20) return teens[n - 10];
      else {
        return tens[Math.floor(n / 10)] + " " + ones[n % 10];
      }
    };

    let words = convertMillions(numValue);
    return words.trim() + " only";
  };

  const OpenCustomerModel = async (id, type) => {
    try {
      setShowCustomerModal(true);

      // ✅ store type
      setCustomerType(type);

      const res = await axios.get(`${API}/Transactions/loan-by-customer/${id}`);

      if (res.data.success) {
        setLoanData(res.data.loanData);
        setBankDetails(res.data.bankDetails);
        setCustomerData(res.data.loanData[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SORT LOGIC =================
  const sortedLoanData = [...(loanData || [])].sort((a, b) => {
    const order = {
      Approve: 1,
      Approved: 1,
      Pending: 2,
      Closed: 3,
    };

    return (order[a.status] || 99) - (order[b.status] || 99);
  });

  // ================= STATUS UI =================
  const getStatusUI = (status) => {
    if (status === "Approve" || status === "Approved") {
      return {
        label: "Active",
        className: "bg-green-100 text-green-700",
      };
    }
    if (status === "Pending") {
      return {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-700",
      };
    }
    return {
      label: "Closed",
      className: "bg-red-100 text-red-600",
    };
  };
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 60);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  const calculateAmounts = (loanInput) => {
    const loan = parseFloat(loanInput) || 0;

    let adminCharges = 0;

    if (selectedScheme?.adminChargeType === "percentage") {
      const adminPercent = Number(selectedScheme?.administrativeCharges || 0);
      adminCharges = (loan * adminPercent) / 100;
    } else {
      adminCharges = Number(selectedScheme?.administrativeCharges || 0);
    }

    let docCharges = 0;

    if (selectedScheme?.docChargeType === "fixed") {
      docCharges = Number(selectedScheme?.docChargeFixed || 0);
    } else {
      const docPercent = Number(selectedScheme?.docChargePercent || 0);
      docCharges = (loan * docPercent) / 100;

      const minDoc = Number(selectedScheme?.docChargeMin || 0);
      const maxDoc = Number(selectedScheme?.docChargeMax || Infinity);

      docCharges = Math.max(minDoc, Math.min(docCharges, maxDoc));
    }

    const netPayable = loan + adminCharges + docCharges;

    return {
      adminCharges,
      docCharges,
      netPayable,
    };
  };

  return (
    <div className="min-h-screen  ml-[25px]">
      <div className="flex sticky top-[50px] z-40">
        <div className="flex items-center px-6 py-4 border-b w-[1462px] h-[40px] border border-gray-200 justify-between  bg-white">
          <h2 className="text-red-600 text-[20px] font-semibold">
            Add Gold Loan Application
          </h2>

          <div className="flex gap-2">
            {(userData?.isAdmin ||
              permissions?.Transaction?.find(
                (item) => item.name === "Add Loan Application",
              )?.Submit) && (
              <button
                onClick={handleSaveLoan}
                className="bg-[#0A2478] text-white text-xs font-medium px-4 py-1.5 rounded hover:bg-blue-900 transition-colors"
              >
                Submit
              </button>
            )}

            <button
              onClick={() => navigate("/Loan-Application")}
              className="bg-[#C1121F] text-white text-xs font-medium px-4 py-1.5 rounded hover:bg-red-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className=" ">
        <div
          className="flex   gap-5 
bg-[#FFE6E6] w-[1462px] "
        >
          <div className="flex gap-5">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Borrower Name<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center  w-[280px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Borrower Name"
                      name="Borrower_Name"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedCustomer(null);
                        setHighlightedIndex(-1);
                      }}
                      onKeyDown={(e) => {
                        if (!results.length) return;

                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setHighlightedIndex((prev) =>
                            prev < results.length - 1 ? prev + 1 : 0,
                          );
                        }

                        if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setHighlightedIndex((prev) =>
                            prev > 0 ? prev - 1 : results.length - 1,
                          );
                        }

                        if (e.key === "Enter" && highlightedIndex >= 0) {
                          e.preventDefault();
                          handleSelectCustomer(
                            results[highlightedIndex],
                            "Borrower",
                          );
                          setHighlightedIndex(-1);
                        }
                      }}
                      // className="border border-gray-300 rounded-l py-1 px-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white h-[30px] text-xs"

                      className={`rounded-l py-1 px-1 w-full focus:outline-none bg-white h-[30px] text-xs border
          ${
            errors.borrower
              ? "border-red-500"
              : "border-gray-300"
          }
        `}
                    />

                    {loading && (
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">
                        Loading...
                      </div>
                    )}

                    {/* Show dropdown only if user typed something */}
                    {searchTerm.trim() !== "" && !selectedCustomer && (
                      <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50 h-[100px] text-xs">
                        {/* If results available */}
                        {results.length > 0 ? (
                          results.map((customer, index) => (
                            <li
                              key={customer.id}
                              id={`borrower-item-${index}`} // ✅ add this
                              onClick={() =>
                                handleSelectCustomer(customer, "Borrower")
                              }
                              className={`px-3 py-2 cursor-pointer ${
                                index === highlightedIndex
                                  ? "bg-blue-300"
                                  : "hover:bg-blue-100"
                              }`}
                            >
                              {customer.printName} ({customer.id})
                            </li>
                          ))
                        ) : (
                          /* If no customer found */
                          <li className="px-3 py-2 text-gray-500 text-sm">
                            Customer not found
                          </li>
                        )}
                      </ul>
                    )}
                  </div>

                  <button
                    className="bg-[#0A2478] text-white px-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b] h-[30px]"
                    type="button"
                    // onClick={() => OpenCustomerModel(selectedCustomer.id)}

                    onClick={() =>
                      OpenCustomerModel(selectedCustomer.id, "borrower")
                    }
                  >
                    <img src={timesvg} alt="eye" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col mt-1">
                <label className="text-[14px] font-medium">
                  Co-Borrower<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center  w-[280px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Co-Borrower Name"
                      name="CoBorrowerName"
                      disabled={!selectedCustomer}
                      value={searchTermForCoBorrower}
                      onChange={(e) => {
                        setSearchTermForCoBorrower(e.target.value);
                        setSelectedCoBorrower(null);
                        setHighlightedIndexForCoBorrower(-1);
                      }}
                      onKeyDown={(e) => {
                        const filteredResults2 = results2.filter(
                          (customer) => customer.id !== selectedCustomer?.id,
                        );

                        if (!filteredResults2.length) return;

                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setHighlightedIndexForCoBorrower((prev) =>
                            prev < filteredResults2.length - 1 ? prev + 1 : 0,
                          );
                        }

                        if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setHighlightedIndexForCoBorrower((prev) =>
                            prev > 0 ? prev - 1 : filteredResults2.length - 1,
                          );
                        }

                        if (
                          e.key === "Enter" &&
                          highlightedIndexForCoBorrower >= 0
                        ) {
                          e.preventDefault();
                          handleSelectCoborrower(
                            filteredResults2[highlightedIndexForCoBorrower],
                            "CoBorrower",
                          );
                          setHighlightedIndexForCoBorrower(-1);
                        }
                      }}
                      // className="border border-gray-300 rounded-l py-1 px-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white h-[30px] text-xs"
                      className={`rounded-l py-1 px-1 w-full focus:outline-none focus:ring-1 bg-white h-[30px] text-xs border
      ${
        errors.coBorrower
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      }
      ${
        !selectedCustomer
          ? "bg-gray-100 cursor-not-allowed"
          : ""
      }
    `}
                    />

                    {loading && (
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">
                        Loading...
                      </div>
                    )}

                    {searchTermForCoBorrower.trim() !== "" &&
                      !selectedCoBorrower && (
                        <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50 text-xs">
                          {(() => {
                            const filteredResults2 = results2.filter(
                              (customer) =>
                                customer.id !== selectedCustomer?.id,
                            );

                            return filteredResults2.length > 0 ? (
                              filteredResults2.map((customer, index) => (
                                <li
                                  key={customer.id}
                                  id={`coborrower-item-${index}`} // ✅ important
                                  onClick={() =>
                                    handleSelectCoborrower(
                                      customer,
                                      "CoBorrower",
                                    )
                                  }
                                  className={`px-3 py-2 cursor-pointer ${
                                    index === highlightedIndexForCoBorrower
                                      ? "bg-blue-300"
                                      : "hover:bg-blue-100"
                                  }`}
                                >
                                  {customer.printName} ({customer.id})
                                </li>
                              ))
                            ) : (
                              <li className="px-3 py-2 text-gray-500 text-sm">
                                No valid customer
                              </li>
                            );
                          })()}
                        </ul>
                      )}
                  </div>

                  <button
                    className="bg-[#0A2478] text-white px-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b] h-[30px]"
                    type="button"
                    // onClick={() => OpenCustomerModel(selectedCoBorrower.id)}

                    onClick={() =>
                      OpenCustomerModel(selectedCoBorrower.id, "Co-borrower")
                    }
                  >
                    <img src={timesvg} alt="eye" />
                  </button>
                </div>
              </div>

              <div className="mt-1">
                <label className="text-[14px] font-medium block">
                  Scheme<span className="text-red-500">*</span>
                </label>

                <select
                  // className={`border border-gray-300 px-1 py-1 w-[280px] bg-white rounded-[8px] h-[30px] text-xs ${
                  //   !selectedCustomer ? "bg-gray-100 cursor-not-allowed" : ""
                  // }`}

                   className={`rounded-l py-1 px-1 w-full focus:outline-none focus:ring-1 bg-white h-[30px] text-xs border
      ${
        errors.scheme
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      }
      ${
        !selectedCustomer
          ? "bg-gray-100 cursor-not-allowed"
          : ""
      }
    `}
                  onChange={handleSchemeChange}
                  defaultValue=""
                  disabled={!selectedCustomer} // ✅ Disable if no customer
                >
                  <option value="" disabled>
                    Select Scheme
                  </option>

                  {schemes.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.schemeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-10 text-xs">
              <div>
                <div>
                  <p className="font bold text-[15px]">Borrower Details</p>
                </div>
                <div className="border w-[296px] h-[125px] p-2  overflow-auto">
                  <p className="text-gray-800">
                    {selectedCustomer?.printName}{" "}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCustomer?.mobile}
                    {selectedCustomer?.altMobile && "/"}
                    {selectedCustomer?.altMobile}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCustomer?.Permanent_Address}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCustomer?.Nominee_NomineeName}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCustomer?.Nominee_Relation}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p className="font bold text-[15px]">Co-Borrower Details</p>
                </div>
                <div className="border w-[296px] h-[125px] p-2 overflow-auto">
                  <p className="text-gray-800">
                    {selectedCoBorrower?.printName}{" "}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCoBorrower?.mobile}
                    {selectedCoBorrower?.altMobile && "/"}
                    {selectedCoBorrower?.altMobile}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCoBorrower?.Permanent_Address}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCoBorrower?.Nominee_NomineeName}
                  </p>
                  <p className="text-gray-800 mt-1">
                    {selectedCoBorrower?.Nominee_Relation}
                  </p>
                </div>
              </div>

              <div></div>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <div className="flex flex-col items-start">
                <p className="text-[14px] font-medium mb-1">Ornament Photo</p>

                <div
                  className="relative cursor-pointer w-[110px] h-[80px] group"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src={
                      formData.OrnamentPhoto
                        ? formData.OrnamentPhoto
                        : profileempty
                    }
                    alt="Ornament"
                    className="w-full h-full object-cover rounded-[8px] border border-gray-300"
                  />

                  {/* ✅ Show text only if no image */}
                  {!formData.OrnamentPhoto && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[8px]">
                      <span className="text-white text-[10px] font-medium">
                        Choose Image
                      </span>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  id="ornamentFile"
                  name="OrnamentFile"
                  accept="image/*"
                  onChange={(e) => handleOrnamentUpload(e)}
                  className="hidden"
                />
              </div>
              <div className=" h-[130px]  ">
                {/* Profile Image */}
                <p className="text-[14px] font-medium">Borrower</p>

                <img
                  src={
                    formData.Borrower_ProfileImg
                      ? `${formData.Borrower_ProfileImg}` // backend image path
                      : profileempty // fallback image
                  }
                  alt="profile"
                  className="w-[110px] h-[80px] rounded-[8px] object-cover border border-gray-100"
                />

                <div className="mt-2 border w-[100px] h-[20px] flex items-center justify-center bg-white">
                  {formData.Borrower_signature ? (
                    <img
                      src={`${formData.Borrower_signature}`}
                      alt="signature"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Signature</span>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  {/* Hidden File Input - Crucial for the click to work */}
                  <input
                    type="file"
                    ref={fileInputRef2}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />

                  {!preview ? (
                    <div
                      onClick={triggerUpload}
                      className="mt-2 border w-[100px] h-[20px] rounded-[8px] flex items-center justify-center bg-[#0A2478] text-white cursor-pointer"
                    >
                      <span className="text-xs">Upload</span>
                    </div>
                  ) : (
                    <div
                      onClick={triggerUpload}
                      className="mt-2 cursor-pointer"
                    >
                      <img
                        src={preview} // ✅ FIXED
                        alt="preview"
                        className="w-[100px] h-[20px] object-cover rounded-[8px]"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[110px] h-auto flex flex-col ">
                <p className="text-[14px] font-medium">Co-Borrower</p>

                <img
                  src={
                    formData.CoBorrower_ProfileImg
                      ? formData.CoBorrower_ProfileImg
                      : profileempty
                  }
                  alt="Co-Borrower Profile"
                  className="w-[100px] h-[80px] rounded-[8px] object-cover border border-gray-300"
                />
                <div className="mt-2 border w-[100px] h-[20px] flex items-center justify-center bg-white">
                  {formData.CoBorrower_signature ? (
                    <img
                      src={`${formData.CoBorrower_signature}`}
                      alt="CoBorrower signature"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Signature</span>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    ref={fileInputRef3}
                    onChange={handleImageChange2}
                    className="hidden"
                    accept="image/*"
                  />

                  {!preview2 ? (
                    <div
                      onClick={triggerUpload2}
                      className="mt-2 border w-[100px] h-[20px] rounded-[8px] flex items-center justify-center bg-[#0A2478] text-white cursor-pointer"
                    >
                      <span className="text-xs">Upload</span>
                    </div>
                  ) : (
                    <div
                      onClick={triggerUpload2}
                      className="mt-2 cursor-pointer"
                    >
                      <img
                        src={preview2} // ✅ FIXED
                        alt="preview"
                        className="w-[100px] h-[20px] object-cover rounded-[8px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" gap-10    bg-[#F7F7FF]   w-[1462px]">
          {selectedScheme?.product === "Gold" && (
            <>
              <div className="flex gap-2   pt-1">
                <PledgeItemList
                  rows={PledgeItem}
                  setRows={setPledgeItem}
                  selectedScheme={selectedScheme}
                />
              </div>
            </>
          )}
          {selectedScheme?.product === "Silver" && (
            <>
              <div className="flex gap-2 pt-1">
                <PledgeItemListSilver
                  rows={PledgeItem}
                  setRows={setPledgeItem}
                  selectedScheme={selectedScheme}
                />
              </div>
            </>
          )}

          <div className="flex gap-2 ">
            <div>
  <p className="text-[14px] font-medium">
    Loan Amount <span className="text-red-500">*</span>
  </p>

  <input
    type="text"
    value={formData.Loan_amount}
    onChange={(e) => {
      const value = e.target.value.replace(/[^0-9.]/g, "");

      const { adminCharges, docCharges, netPayable } =
        calculateAmounts(value);

      setFormData((prev) => ({
        ...prev,
        Loan_amount: value,
        Admin_Charges: adminCharges.toFixed(2),
        Doc_Charges: docCharges.toFixed(2),
        Net_Payable: netPayable.toFixed(2),
      }));

      // Remove error while typing
      setErrors((prev) => ({
        ...prev,
        Loan_amount: "",
      }));
    }}
    className={`border px-1 py-1 w-[129px] text-xs rounded-[8px] h-[30px] bg-white mt-1 ${
      errors.Loan_amount
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />

  {/* {errors.Loan_amount && (
    <p className="text-red-500 text-[11px] mt-1">
      {errors.Loan_amount}
    </p>
  )} */}
</div>
            <div>
              <p className="text-[14px] font-medium">Admin Charges</p>
              <input
                type="text"
                value={formData.Admin_Charges}
                readOnly
                className="border border-gray-300 px-3 text-xs h-[30px] mt-1 w-[129px] rounded-[8px] bg-gray-100 "
              />
            </div>

            <div>
              <p className="text-[14px] font-medium">Doc Charges</p>
              <input
                type="text"
                value={formData.Doc_Charges}
                readOnly
                className="border border-gray-300 px-3 text-xs h-[30px] mt-1 w-[129px] rounded-[8px] bg-gray-100 "
              />
            </div>

            <div>
              <p className="text-[14px] font-medium">Loan + Charges</p>
              <input
                type="text"
                value={formData.Net_Payable}
                readOnly
                className="border border-gray-300 px-3 text-xs h-[30px] mt-1 w-[129px] rounded-[8px] bg-gray-100 "
              />
            </div>

           <div className="flex flex-col ">
  <p className="text-[14px] font-medium">
    Valuer 1<span className="text-red-500">*</span>
  </p>

  <select
    name="value1"
    value={formData.value1}
    onChange={handleInputChange}
    className={`border rounded-[8px] px-3 text-xs h-[30px] mt-1 bg-white w-[150px] ${
      errors.value1 ? "border-red-500" : "border-gray-300"
    }`}
  >
    <option value="">Select valuer 1</option>

    {activeEmployees?.map((emp) => (
      <option key={emp.id} value={emp.id}>
        {emp.emp_name}
      </option>
    ))}
  </select>

  {/* {errors.value1 && (
    <span className="text-red-500 text-[11px] mt-1">
      {errors.value1}
    </span>
  )} */}
</div>

           <div className="flex flex-col">
  <label className="text-[14px] font-medium">
    Valuer 2<span className="text-red-500">*</span>
  </label>

  <select
    name="value2"
    value={formData.value2}
    onChange={handleInputChange}
    className={`border rounded-[8px] px-3 text-xs h-[30px] mt-1 w-[150px] bg-white ${
      errors.value2 ? "border-red-500" : "border-gray-300"
    }`}
  >
    <option value="">Select valuer 2</option>

    {activeEmployees?.map((emp) => (
      <option key={emp.id} value={emp.id}>
        {emp.emp_name}
      </option>
    ))}
  </select>

  {/* {errors.value2 && (
    <span className="text-red-500 text-[11px] mt-1">
      {errors.value2}
    </span>
  )} */}
</div>
         <div className="">
  <div>
    <label className="text-[14px] font-medium">
      {selectedScheme?.calcBasisOn === "Monthly"
        ? "EMI Start Date"
        : "Loan Date"}
      <span className="text-red-500">*</span>
    </label>
  </div>

  <input
    type="date"
    name="payDate"
    value={formData.payDate}
    onChange={handleInputChange}

    // ✅ Removed minDate
    max={maxDate}

    className={`border px-3 text-xs h-[30px] mt-1 w-[136px] rounded-[8px] bg-white ${
      errors.payDate ? "border-red-500" : "border-gray-300"
    }`}
  />
</div>
           <div>
  <p className="text-[14px] font-medium ">Remark</p>

  <textarea
    value={remark}
    onChange={(e) => setRemark(e.target.value)}
    className="border border-gray-300 w-[400px] h-[40px] text-xs bg-white p-2"
    placeholder="Enter remark..."
  />
</div>
          </div>

          <div className="flex gap-10 ">
            <p className=" text-xs">
              {numberToWords(Number(formData.Loan_amount) || 0)}
            </p>
          </div>
        </div>
        
        <div className="flex w-[1462px] bg-[#FFE6E6]">
          <div
            className="flex gap-18   
"
          >
            <div className="flex">
              <div>
                <h3 className="font-semibold text-blue-900 text-lg">
                  Scheme Details
                </h3>

                <table className="border border-gray-300 text-xs">
                  <thead className="bg-[#0A2478] text-white">
                    <tr>
                      <th className="py-1 border-r border-gray-200 w-[224px]">
                        Loan Tenure (Days)
                      </th>
                      <th className="py-1 border-r border-gray-200 w-[173px]">
                        Min Loan
                      </th>
                      <th className="py-1 border-r border-gray-200 w-[195px]">
                        Max Loan
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-700 text-xs bg-white">
                    {selectedScheme ? (
                      <tr className="bg-gray-50">
                        <td className="px-2 py-1 border border-[#4A4A4A38]">
                          {selectedScheme?.loanPeriod || "-"}
                        </td>
                        <td className="px-2 py-1 border border-[#4A4A4A38]">
                          ₹
                          {Number(
                            selectedScheme?.minLoanAmount || 0,
                          ).toLocaleString("en-IN")}
                        </td>
                        <td className="px-2 py-1 border border-[#4A4A4A38]">
                          ₹
                          {Number(
                            selectedScheme?.maxLoanAmount || 0,
                          ).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-1 text-gray-400 bg-white"
                        >
                          No Scheme Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {selectedScheme?.calcBasisOn !== "Monthly" && (
              <>
                <div className="flex justify-center">
                  <div className="">
                    <h3 className="font-semibold  text-blue-900 text-lg">
                      Effective Interest Rates
                    </h3>

                    <table className="border border-gray-300 text-xs ">
                      <thead className="bg-[#0A2478] text-white">
                        <tr>
                          <th className="px-4 py-1 border-r border-gray-200 w-[307px]">
                            Terms
                          </th>
                          <th className="px-4 py-1 border-r border-gray-200 w-[307px]">
                            Effective Interest Rates
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 text-xs">
                        {selectedScheme?.interestRates &&
                        selectedScheme?.interestRates.length > 0 ? (
                          selectedScheme?.interestRates.map((rate, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }
                            >
                              <td className="px-1 py-1 border border-[#4A4A4A38]">
                                {rate.from} To {rate.to}{" "}
                                {selectedScheme?.calcBasisOn === "Monthly"
                                  ? "MONTHS"
                                  : "DAYS"}
                              </td>
                              <td className="px-1 py-1 border border-[#4A4A4A38]">
                                {rate.addInt}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              className="text-center py-1 text-gray-500 border border-[#4A4A4A38] bg-white"
                            >
                              No interest data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            {selectedScheme?.calcBasisOn === "Monthly" && (
              <>
                <div className="flex justify-center">
                  <div className="">
                    <h3 className="font-semibold  text-blue-900 text-lg">
                      Effective Interest Rates
                    </h3>

                    <table className="border border-gray-300 text-xs ">
                      <thead className="bg-[#0A2478] text-white">
                        <tr>
                          <th className="px-4 py-1 border-r border-gray-200 w-[307px]">
                            Terms
                          </th>
                          <th className="px-4 py-1 border-r border-gray-200 w-[307px]">
                            Effective Interest Rates
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 text-xs">
                        {/* ✅ MONTHLY CASE */}
                        {selectedScheme?.calcBasisOn === "Monthly" ? (
                          <tr className="bg-gray-50">
                            <td className="px-1 py-1 border border-[#4A4A4A38]">
                              0 To {selectedScheme?.loanPeriod} MONTHS
                            </td>
                            <td className="px-1 py-1 border border-[#4A4A4A38]">
                              {selectedScheme?.monthlyInterestRate}%
                            </td>
                          </tr>
                        ) : selectedScheme?.interestRates &&
                          selectedScheme?.interestRates.length > 0 ? (
                          /* ✅ NON-MONTHLY (your existing logic) */
                          selectedScheme.interestRates.map((rate, idx) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }
                            >
                              <td className="px-1 py-1 border border-[#4A4A4A38]">
                                {rate.from} To {rate.to} DAYS
                              </td>
                              <td className="px-1 py-1 border border-[#4A4A4A38]">
                                {rate.addInt}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              className="text-center py-1 text-gray-500 border border-[#4A4A4A38] bg-white"
                            >
                              No interest data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {showCustomerModal && selectedCustomer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-white rounded-lg p-6 shadow-2xl relative w-[1080px] max-h-[96vh] overflow-auto">
              {/* header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[20px] font-semibold text-[#0A2478]">
                  Loan History
                </h2>

                <button
                  onClick={() => Handleclosed()}
                  className="text-red-600 font-bold text-[40px] hover:opacity-70"
                >
                  ×
                </button>
              </div>

              {customerType === "borrower" && (
                <>
                  <div className="flex gap-16">
                    <div className="flex flex-col items-center">
                      <img
                        src={selectedCustomer.profileImage}
                        alt="Customer"
                        className="w-[112px] h-[112px] border rounded-md object-cover shadow-sm"
                      />
                      <img
                        src={selectedCustomer.signature}
                        alt="Signature"
                        className="w-[111px] h-[33px] border rounded-md mt-4 object-contain shadow-sm bg-white"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      {selectedCustomer?.Additional_UploadDocumentFile1 ? (
                        <img
                          src={selectedCustomer.Additional_UploadDocumentFile1}
                          alt="Address Proof"
                          className="w-[112px] h-[112px] border rounded-md object-cover shadow-sm "
                        />
                      ) : (
                        <p className="text-red-600 text-sm font-semibold">
                          Address Proof not uploaded..
                        </p>
                      )}

                      {selectedCustomer?.Additional_UploadDocumentFile2 ? (
                        <img
                          src={selectedCustomer.Additional_UploadDocumentFile2}
                          alt="ID Proof"
                          className="w-[111px] h-[33px] border rounded-md mt-4 object-contain shadow-sm bg-white"
                        />
                      ) : (
                        <p className="text-red-600 text-sm font-semibold mt-4">
                          ID Proof not uploaded..
                        </p>
                      )}
                    </div>

                    <div className="border w-[296px] h-[160px] p-2  overflow-auto">
                      <p className="">{selectedCustomer?.printName} </p>
                      <p className=" mt-1">
                        {selectedCustomer?.mobile}
                        {selectedCustomer?.altMobile && "/"}
                        {selectedCustomer?.altMobile}
                      </p>
                      <p className=" mt-1">
                        {selectedCustomer?.Permanent_Address}
                      </p>
                      <p className=" mt-1">
                        {selectedCustomer?.Nominee_NomineeName}
                      </p>
                      <p className=" mt-1">
                        {selectedCustomer?.Nominee_Relation}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {customerType === "Co-borrower" && (
                <>
                  <div className="flex gap-16">
                    <div className="flex flex-col items-center">
                      <img
                        src={selectedCoBorrower.profileImage}
                        alt="Customer"
                        className="w-[112px] h-[112px] border rounded-md object-cover shadow-sm"
                      />
                      <img
                        src={selectedCoBorrower.signature}
                        alt="Signature"
                        className="w-[111px] h-[33px] border rounded-md mt-4 object-contain shadow-sm bg-white"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      {selectedCoBorrower?.Additional_UploadDocumentFile1 ? (
                        <img
                          src={
                            selectedCoBorrower.Additional_UploadDocumentFile1
                          }
                          alt="Address Proof"
                          className="w-[112px] h-[112px] border rounded-md object-cover shadow-sm "
                        />
                      ) : (
                        <p className="text-red-600 text-sm font-semibold">
                          Address Proof not uploaded..
                        </p>
                      )}

                      {selectedCoBorrower?.Additional_UploadDocumentFile2 ? (
                        <img
                          src={
                            selectedCoBorrower.Additional_UploadDocumentFile2
                          }
                          alt="ID Proof"
                          className="w-[111px] h-[33px] border rounded-md mt-4 object-contain shadow-sm bg-white"
                        />
                      ) : (
                        <p className="text-red-600 text-sm font-semibold mt-4">
                          ID Proof not uploaded..
                        </p>
                      )}
                    </div>

                    <div className="border w-[296px] h-[160px] p-2  overflow-auto">
                      <p className="">{selectedCoBorrower?.printName} </p>
                      <p className=" mt-1">
                        {selectedCoBorrower?.mobile}
                        {selectedCoBorrower?.altMobile && "/"}
                        {selectedCoBorrower?.altMobile}
                      </p>
                      <p className=" mt-1">
                        {selectedCoBorrower?.Permanent_Address}
                      </p>
                      <p className=" mt-1">
                        {selectedCoBorrower?.Nominee_NomineeName}
                      </p>
                      <p className=" mt-1">
                        {selectedCoBorrower?.Nominee_Relation}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* bank table */}
              <div className="mt-6 border rounded-md shadow-sm overflow-x-auto overflow-y-auto h-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#0A2478] text-white text-sm">
                    <tr>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Bank Name
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Account No.
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        IFSC
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Bank Address
                      </th>
                      <th className="px-4 py-2 text-left text-[13px]">
                        Cancel Cheque
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-[12px]">
                    {bankDetails?.length > 0 ? (
                      bankDetails.map((b, i) => (
                        <tr key={i} className="border-b">
                          <td className="px-4 py-2">{b.bankName}</td>
                          <td className="px-4 py-2">{b.Customer_Name}</td>
                          <td className="px-4 py-2">{b.Account_No}</td>
                          <td className="px-4 py-2">{b.IFSC}</td>
                          <td className="px-4 py-2">{b.Bank_Address}</td>
                          <td className="px-4 py-2">
                            {b.cancelCheque ? (
                              <img
                                src={`https://slunawat.co.in/uploadCheque/customer_BankData/${b.cancelCheque}`}
                                alt="Cancel Cheque"
                                className="w-[80px] h-[35px] object-cover border rounded"
                              />
                            ) : (
                              <span className="text-red-500">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-3 text-gray-500"
                        >
                          No bank details found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* loan table */}
              <div className="mt-6 border rounded-xl shadow-sm overflow-auto max-h-[500px]">
                <table className="w-full border-collapse">
                  {/* ================= HEADER ================= */}
                  <thead className="bg-[#0A2478] text-white text-sm sticky top-0 z-10">
                    <tr>
                      {[
                        "Loan No",
                        "Loan Date",
                        "Loan Amount",
                        "Scheme",
                        "Int. Due Date",
                        "Pending Interest",
                        "Total Due",
                        "Status",
                        "Ornaments",
                      ].map((head, i) => (
                        <th
                          key={i}
                          className="px-4 py-2 text-left text-[13px] border-r last:border-r-0"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* ================= BODY ================= */}
                  <tbody className="text-[12px] bg-white">
                    {sortedLoanData.length > 0 ? (
                      sortedLoanData.map((l, i) => {
                        const status = getStatusUI(l.status);

                        return (
                          <tr
                            key={i}
                            className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="px-4 py-2">{l.id}</td>

                            <td className="px-4 py-2">
                              {new Date(l.created_at).toLocaleDateString(
                                "en-IN",
                              )}
                            </td>

                            <td className="px-4 py-2 font-medium">
                              ₹
                              {Number(l.Loan_amount || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>

                            <td className="px-4 py-2">{l.Scheme}</td>

                            <td className="px-4 py-2">
                              {l.InterestPaidUpto || "-"}
                            </td>

                            <td className="px-4 py-2">
                              ₹
                              {Number(l.InterestDueAmount || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>

                            <td className="px-4 py-2 font-semibold">
                              ₹
                              {Number(l.LoanPendingAmount || 0).toLocaleString(
                                "en-IN",
                              )}
                            </td>

                            {/* ================= STATUS ================= */}
                            <td className="px-4 py-2">
                              <span
                                className={`px-2 py-1 rounded-full text-[11px] font-semibold ${status.className}`}
                              >
                                {status.label}
                              </span>
                            </td>

                            {/* ================= IMAGE ================= */}
                            <td className="px-4 py-2">
                              {l.Ornament_Photo ? (
                                <img
                                  src={`${API}/uploads/ornaments/${l.Ornament_Photo}`}
                                  alt="Ornament"
                                  className="w-[70px] h-[45px] object-cover rounded border"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/70x45?text=No+Image";
                                  }}
                                />
                              ) : (
                                <span className="text-gray-400 text-xs">
                                  N/A
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="text-center py-6 text-gray-400"
                        >
                          No Loan Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="bg-[#C1121F] text-white px-10 py-2 rounded hover:bg-[#C1121F]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {remarkModel && selectedBorrowerRemark?.trim() !== "" && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{
              background: "#0101017A",
              backdropFilter: "blur(6.8px)",
            }}
          >
            <div className="bg-white w-[829px] h-[356px] p-6 shadow-lg relative rounded-[8px]">
              <h2
                className="font-semibold text-[24px] leading-[100%] tracking-[0.03em] mb-4 text-[#0A2478]"
                style={{ fontFamily: "Source Sans 3" }}
              >
                Remark
              </h2>

              <div className="w-[728px] border border-gray-300 p-5 resize-none h-[183px] rounded-[16px] flex justify-between">
                <div>
                  {selectedBorrowerRemark && (
                    <div className="text-gray-700 mb-2">
                      <b>Borrower:</b>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedBorrowerRemark,
                        }}
                      />
                    </div>
                  )}

                  {selectedCoBorrowerRemark && (
                    <div className="text-gray-700 mb-2">
                      <b>Co-Borrower:</b>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedCoBorrowerRemark,
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <img
                    src={envImg}
                    alt="envelope"
                    className="w-[156px] h-[156px] rounded-[10px]"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-4 gap-2">
                <button
                  className="px-4 py-2 rounded w-[119px] h-[38px] bg-[#C1121F] text-white font-semibold cursor-pointer hover:bg-[#a50e1a]"
                  onClick={() => {
                    setSelectedremarkModel(false);
                    setSelectedBorrowerRemark(null);
                    setSelectedCoBorrowerRemark(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && <Loader />}
      </div>
    </div>
  );
};

export default AddGoldLoanApplication;
