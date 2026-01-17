import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import envImg from "../assets/envImg.jpg";
import profileempty from "../assets/profileempty.png";
import timesvg from "../assets/timesvg.svg";
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

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get(`${API}/Scheme/getAllSchemes`);
        const fetchedSchemes = response.data.data.map((item) => ({
          ...item,
          intCompound: item.calcMethod === "Compound",
        }));
        setSchemes(fetchedSchemes);
      } catch (err) {
        console.error("❌ Error fetching schemes:", err);
      }
    };

    fetchSchemes();
  }, []);

  const handleSchemeChange = (e) => {
    debugger;
    const selectedId = parseInt(e.target.value);
    const scheme = schemes.find((s) => s.id === selectedId);

    // store the full scheme in state (optional)
    setSelectedScheme(scheme);

    // ✅ update formData to include schemeId (and name if needed)
    setFormData((prev) => ({
      ...prev,
      schemeId: scheme?.id || "",
      schemeName: scheme?.schemeName || "",
      schemeType: scheme?.calcBasisOn || "",
    }));
  };

  const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);

  const handleSaveLoan = async () => {
    debugger;
    try {
      const formDataToSend = new FormData();

      // 👤 Borrower Details
      formDataToSend.append("BorrowerId", selectedCustomer?.id || "");
      formDataToSend.append("CoBorrowerId", selectedCoBorrower?.id || "");
      formDataToSend.append("Borrower", formData.borrowerName || "");
      formDataToSend.append("Scheme", formData.schemeName || "");
      formDataToSend.append("Scheme_type", formData.schemeType || "");
      formDataToSend.append("Scheme_ID", selectedScheme?.id || "");
      formDataToSend.append("Print_Name", formData.printName || "");
      formDataToSend.append("Mobile_Number", formData.mobile || "");
      formDataToSend.append("Alternate_Number", formData.altMobile || "");
      formDataToSend.append("Co_Borrower", formData.CoBorrowerName || "");
      formDataToSend.append("Relation", formData.CoBorrowerRelation || "");
      formDataToSend.append("Nominee", formData.Nominee_Name || "");
      formDataToSend.append("Nominee_Relation", formData.NomineeRelation || "");

      // 💎 Ornament Photo
      if (formData.OrnamentFile) {
        formDataToSend.append("Ornament_Photo", formData.OrnamentFile);
      }

      // 📦 Pledge Items
      formDataToSend.append(
        "Pledge_Item_List",
        JSON.stringify(PledgeItem || [])
      );
      formDataToSend.append("Product_Name", selectedScheme.product || 0);
      // formDataToSend.append("Scheme_type", selectedScheme.calcBasisOn || 0);
      // 💰 Loan Details
      formDataToSend.append("Loan_amount", formData.Loan_amount || 0);
      formDataToSend.append("Doc_Charges", formData.Doc_Charges || 0);
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
        JSON.stringify(effectiveInterestRates)
      );

      // 🏢 Misc Info
      formDataToSend.append("approved_by", loginUser);
      formDataToSend.append(
        "approval_date",
        new Date().toISOString().split("T")[0]
      );
      formDataToSend.append("branch_id", 1);

      // 🚀 API Request
      const res = await axios.post(
        `${API}/Transactions/goldloan/addLoan`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Loan Application Saved Successfully!");
      navigate("/Loan-Application");
    } catch (error) {
      console.error("❌ Error saving loan:", error);
      alert("Failed to save loan. Check console for details.");
    }
  };

  useEffect(() => {
    document.title = "SLF | Add Gold Loan Application ";
  }, []);

  const [rows, setRows] = useState([
    {
      id: 1,
      particular: "gold",
      nos: 1,
      gross: "5.000",
      netWeight: "5.000",
      purity: "20k",
      rate: "6,300",
      valuation: "31,500.00",
      remark: "Ganthan",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchTermForCoBorrower, setSearchTermForCoBorrower] = useState("");
  const [results, setResults] = useState([]);
  const [results2, setResults2] = useState([]);
  console.log(results, "results");
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  console.log(selectedCustomer, "selectedCustomer");
  const [selectedCoBorrower, setSelectedCoBorrower] = useState(null);
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerAddress: "",
    schemeId: "",
    schemeName: "",
    schemeType: "",
    printName: "",
    mobile: "",
    altMobile: "",
    Borrower_ProfileImg: "",
    Borrower_signature: "",
    CoBorrowerName: "",
    CoBorrower_ProfileImg: "",
    CoBorrower_signature: "",
    CoBorrowerId: "",
    CoBorrowerRelation: "",
    Nominee_Name: "",
    NomineeRelation: "",
    OrnamentPhoto: "",
    Loan_amount: "",
    Doc_Charges: "",
    Net_Payable: "",
    value1: "",
    value2: "",
  });
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

  console.log(formData, "formData");

  const getActiveEmp = async () => {
    try {
      const res = await axios.get(`${API}/Master/getActiveEmployees`, {
        params: {
          loanAmount: formData.Loan_amount, // <--- send loan amount
        },
      });
      const decrypted = decryptData(res.data.data); // no JSON.parse
      console.log(decrypted, "-------------active emp-----------");
      setActiveEmployees(decrypted);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loan = Number(formData.Loan_amount);

    // run API only if loan is a number (including 0)
    if (!isNaN(loan)) {
      getActiveEmp();
    }
  }, [formData.Loan_amount]);

  // useEffect(() => {
  //   let totalGross = 0;
  //   let totalNet = 0;
  //   let totalValuation = 0;

  //   PledgeItem.forEach((item) => {
  //     totalGross += Number(item.gross) || 0;
  //     totalNet += Number(item.netWeight) || 0;
  //     totalValuation += Number(item.valuation) || 0;
  //   });

  //   // Max loan check
  //   const maxLoan =
  //     parseInt(selectedScheme?.maxLoanAmount, 10) || totalValuation;
  //   const loanAmount = totalValuation > maxLoan ? maxLoan : totalValuation;

  //   // Calculate document charges on capped loan amount
  //   const docCharges =
  //     (loanAmount * (selectedScheme?.docChargePercent ?? 0)) / 100;

  //   // Subtract docCharges from loanAmount
  //   const netPayable = loanAmount - docCharges;

  //   setFormData((prev) => ({
  //     ...prev,
  //     Loan_amount: loanAmount.toFixed(2),
  //     Doc_Charges: docCharges.toFixed(2),
  //     Net_Payable: netPayable.toFixed(2),
  //   }));
  // }, [PledgeItem, selectedScheme]);
  useEffect(() => {
    debugger;
    let totalGross = 0;
    let totalNet = 0;
    let totalValuation = 0;

    PledgeItem.forEach((item) => {
      totalGross += Number(item.gross) || 0;
      totalNet += Number(item.netWeight) || 0;
      totalValuation += Number(item.valuation) || 0;
    });

    const maxLoan =
      parseInt(selectedScheme?.maxLoanAmount, 10) || totalValuation;

    const loanAmount = totalValuation > maxLoan ? maxLoan : totalValuation;

    // ---- Interest calculation for Monthly scheme ----
    let interestAmount = 0;

    if (selectedScheme?.calcBasisOn === "Monthly") {
      const tenure = Number(selectedScheme?.loanPeriod) || 0;

      // find matching slab
      // const slab = selectedScheme?.interestRates?.find(
      //   (r) => tenure > Number(r.from) && tenure <= Number(r.to)
      // );
      const slab = selectedScheme?.interestRates?.[0];

      const rate = Number(slab?.addInt || 0);

      interestAmount = (loanAmount * rate * tenure) / (12 * 100);
    }

    // Document charges on capped loan
    let docCharges =
      (loanAmount * (selectedScheme?.docChargePercent ?? 0)) / 100;

    // Apply min/max doc charge
    const minDoc = Number(selectedScheme?.docChargeMin || 0);
    const maxDoc = Number(selectedScheme?.docChargeMax || Infinity);

    docCharges = Math.max(minDoc, Math.min(docCharges, maxDoc));

    const netPayable = loanAmount + interestAmount - docCharges;

    setFormData((prev) => ({
      ...prev,
      Loan_amount: loanAmount.toFixed(2),
      Interest_Amount: interestAmount.toFixed(2),
      Doc_Charges: docCharges.toFixed(2),
      Net_Payable: netPayable.toFixed(2),
    }));
  }, [PledgeItem, selectedScheme]);

  console.log(formData, "formData");

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `${API}/Master/doc/Customer_list?search=${searchTerm}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("❌ Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);
  useEffect(() => {
    const fetchCustomers = async () => {
      if (!searchTermForCoBorrower.trim()) {
        setResults2([]);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `${API}/Master/doc/Customer_list?search=${searchTermForCoBorrower}`
        );
        setResults2(res.data);
      } catch (err) {
        console.error("❌ Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(debounce);
  }, [searchTermForCoBorrower]);

  // ➕ Add new row
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      particular: "gold",
      nos: 1,
      gross: "",
      netWeight: "",
      purity: "20k",
      rate: "",
      valuation: "",
      remark: "",
    };
    setRows([...rows, newRow]);
  };

  // ❌ Delete specific row
  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // const handleSelectCustomer = (customer ,type) => {
  //   setSelectedremarkModel(true)
  //  if (type === "Borrower") {
  //   setSelectedBorrowerRemark(customer.Remark);
  // }

  //   setSelectedCustomer(customer);
  //   setSearchTerm(customer.firstName); // show name in input
  //   setResults([]); // hide dropdown

  //   setFormData((prev) => ({
  //     ...prev,
  //     borrowerName: customer.firstName || "",
  //     printName: customer.printName || "",
  //     mobile: customer.mobile || "",
  //     altMobile: customer.altMobile || "",
  //     email: customer.email || "",
  //     panNo: customer.panNo || "",
  //     aadhar: customer.aadhar || "",
  //     Borrower_ProfileImg: customer.profileImage || "",
  //     Borrower_signature: customer.signature || "",
  //     borrowerAddress: `${customer.Permanent_Address || ""}, ${customer.Permanent_City || ""}, ${customer.Permanent_State || ""}, ${customer.Permanent_Country || ""} - ${customer.Permanent_Pincode || ""}`,
  //     Nominee_Name: customer.Nominee_NomineeName || "",
  //     NomineeRelation: customer.Nominee_Relation || "",
  //   }));
  // };
  const handleSelectCustomer = (customer, type) => {
    debugger;
    // 1️⃣ Close dropdown immediately
    setResults([]);
    setLoading(false);

    // 2️⃣ Update input text
    setSearchTerm(customer.firstName || "");

    // 3️⃣ Update borrower remark if Borrower selected
    if (type === "Borrower") {
      setSelectedBorrowerRemark(customer.Remark || "");
    }

    // 4️⃣ Update selected customer state
    setSelectedCustomer(customer);

    // 5️⃣ Update form data
    setFormData((prev) => ({
      ...prev,
      borrowerName: customer.firstName || "",
      printName: customer.printName || "",
      mobile: customer.mobile || "",
      altMobile: customer.altMobile || "",
      email: customer.email || "",
      panNo: customer.panNo || "",
      aadhar: customer.aadhar || "",
      Borrower_ProfileImg: customer.profileImage || "",
      Borrower_signature: customer.signature || "",
      borrowerAddress: `${customer.Permanent_Address || ""}, ${customer.Permanent_City || ""}, ${customer.Permanent_State || ""}, ${customer.Permanent_Country || ""} - ${customer.Permanent_Pincode || ""}`,
      Nominee_Name: customer.Nominee_NomineeName || "",
      NomineeRelation: customer.Nominee_Relation || "",
    }));

    // 6️⃣ OPEN REMARK MODAL AFTER UI UPDATE (the real fix)
    setTimeout(() => {
      setSelectedremarkModel(true);
    }, 120);
  };

  const handleSelectCoborrower = (customer, type) => {
    setSelectedremarkModel(true);
    if (type === "CoBorrower") {
      setSelectedCoBorrowerRemark(customer.Remark);
    }
    setSelectedCoBorrower(customer);
    setSearchTermForCoBorrower(customer.firstName); // show name in input
    setResults2([]);
    setFormData((prev) => ({
      ...prev,
      CoBorrowerName: customer.firstName || "",
      CoBorrower_ProfileImg: customer.profileImage || "",
      CoBorrower_signature: customer.signature || "",
      CoBorrowerId: customer.id || "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
  return (
    <div className="min-h-screen  ">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
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
            Add Gold Loan Application
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleSaveLoan}
              className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#0A2478] w-[74px] h-[24px] text-[10px]"
            >
              Submit
            </button>
            <button
              onClick={() => navigate("/Loan-Application")}
              className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] text-[10px]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="">
        {/* ===== FORM SECTIONS ===== */}
        <div className="flex gap-2 mt-10 pl-[110px] ">
          <div>
            <div className="flex  gap-2">
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Borrower<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center mt-1 w-[220px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Borrower Name"
                      name="Borrower_Name"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedCustomer(null); // reset when typing new search
                      }}
                      className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />

                    {/* Loading */}
                    {loading && (
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">
                        Loading...
                      </div>
                    )}

                    {/* Dropdown */}
                    {results.length > 0 && !selectedCustomer && (
                      <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50">
                        {results.map((customer) => (
                          <li
                            key={customer.id}
                            onClick={() =>
                              handleSelectCustomer(customer, "Borrower")
                            }
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {customer.firstName}{" "}
                            <span className="text-gray-500 text-sm">
                              ({customer.mobile})
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    className="bg-[#0A2478] text-white px-4 py-3 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]"
                    type="button"
                    onClick={() => setShowCustomerModal(true)} // <--- ADD
                  >
                    <img src={timesvg} alt="eye" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[14px] font-medium block mb-1">
                  Scheme<span className="text-red-500">*</span>
                </label>
                <select
                  className="border border-gray-300 px-3 py-2 w-[150px] bg-white rounded-[8px]"
                  onChange={handleSchemeChange}
                  defaultValue=""
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

              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Print Name <span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  type="text"
                  name="printName"
                  placeholder="Enter Print Name"
                  value={formData.printName}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[150px] rounded-[8px] bg-white h-[38px]"
                />
              </div>

              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Mobile Number<span className="text-red-500">*</span>
                  </label>
                </div>

                <input
                  type="text"
                  name="mobile"
                  placeholder="Enter mobile Name"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[38px]"
                />
              </div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">
                    Alternate Number
                  </label>
                </div>

                <input
                  type="text"
                  name="altMobile"
                  placeholder="Enter alt Mobile Name"
                  value={formData.altMobile}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[38px]"
                />
              </div>

              <div></div>
            </div>
            <div className="flex   mt-5 gap-2">
              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Co-Borrower<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center mt-1 w-[220px]">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Co-Borrower Name"
                      name="CoBorrowerName"
                      value={searchTermForCoBorrower}
                      onChange={(e) => {
                        setSearchTermForCoBorrower(e.target.value);
                        setSelectedCoBorrower(null); // reset when typing new search
                      }}
                      className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />

                    {/* Loading */}
                    {loading && (
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">
                        Loading...
                      </div>
                    )}

                    {/* Dropdown */}
                    {results2.length > 0 && !selectedCoBorrower && (
                      <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50">
                        {results2.map((customer) => (
                          <li
                            key={customer.id}
                            onClick={() =>
                              handleSelectCoborrower(customer, "CoBorrower")
                            }
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {customer.firstName}{" "}
                            <span className="text-gray-500 text-sm">
                              ({customer.mobile})
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    className="bg-[#0A2478] text-white px-4 py-3 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]"
                    type="button"
                    onClick={() => setShowCustomerModal(true)} // <--- ADD
                  >
                    <img src={timesvg} alt="eye" />
                  </button>
                </div>
              </div>

              <div>
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">Relation</label>
                  </div>

                  <input
                    type="text"
                    placeholder="Co-Borrower"
                    name="CoBorrowerRelation"
                    value={formData.CoBorrowerRelation}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 mt-1 w-[72px] rounded-[8px] bg-white h-[38px]"
                  />
                </div>
              </div>

              <div>
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">
                      Nominee<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Nominee"
                    name="Nominee_Name"
                    value={formData.Nominee_Name}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 mt-1 w-[150px] rounded-[8px] bg-white h-[38px]"
                  />
                </div>
              </div>

              <div>
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">
                      Relation<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Relation"
                    name="NomineeRelation"
                    value={formData.NomineeRelation}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 mt-1 w-[113px] rounded-[8px] bg-white h-[38px]"
                  />
                </div>
              </div>
              <textarea
                name="borrowerAddress"
                value={formData.borrowerAddress}
                onChange={handleInputChange}
                className="border w-[200px] h-[62px] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex ">
            <div className="  h-[130px] ">
              {/* Profile Image */}
              <p>Customer</p>

              {/* Profile Image */}
              <img
                src={
                  formData.Borrower_ProfileImg
                    ? `${formData.Borrower_ProfileImg}` // backend image path
                    : profileempty // fallback image
                }
                alt="profile"
                className="w-[111px] h-[130px] rounded-[8px] object-cover border border-gray-300"
              />

              {/* Signature Image Box */}
              <div className="mt-2 border w-[111px] h-[33px] flex items-center justify-center bg-white">
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
            </div>
            <div className="w-[139px] h-auto flex flex-col items-center">
              {/* Co-Borrower Label */}
              <p className="font-medium mb-1">Co-Borrower</p>

              {/* Co-Borrower Profile Image */}
              <img
                src={
                  formData.CoBorrower_ProfileImg
                    ? formData.CoBorrower_ProfileImg
                    : profileempty
                }
                alt="Co-Borrower Profile"
                className="w-[111px] h-[130px] rounded-[8px] object-cover border border-gray-300"
              />

              {/* Signature Box */}
              <div className="mt-2 w-[111px] h-[33px] border flex items-center justify-center bg-white rounded-[6px]">
                {formData.CoBorrower_signature ? (
                  <img
                    src={formData.CoBorrower_signature}
                    alt="Co-Borrower Signature"
                    className="max-h-[31px] object-contain"
                  />
                ) : (
                  <p className="text-gray-400 text-xs">No signature</p>
                )}
              </div>
            </div>

            <div className="">
              <p>Ornament Photo</p>

              {/* Preview image */}
              <img
                src={
                  formData.OrnamentPhoto ? formData.OrnamentPhoto : profileempty
                }
                alt="Ornament"
                className="w-[139px] h-[130px] object-cover rounded-[8px] border border-gray-300"
              />

              {/* File Upload */}
              <div className="mt-2">
                <label
                  htmlFor="ornamentFile"
                  className="w-[150px] h-[35px] border rounded-[8px] bg-[#0A2478] text-[12px] text-white flex justify-center items-center gap-2 cursor-pointer"
                >
                  <p>Choose File</p>
                  <MdOutlineFileUpload />
                </label>

                <input
                  type="file"
                  id="ornamentFile"
                  name="OrnamentFile"
                  onChange={(e) => handleOrnamentUpload(e)}
                  className="hidden"
                />
                {formData.OrnamentFile && (
                  <p className="text-[13px] text-gray-700">
                    Selected File:{" "}
                    <span className="font-medium text-[#0A2478]">
                      {formData.OrnamentFile.name}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {selectedScheme?.product === "Gold" && (
          <>
            <div className="flex gap-2 mt-10 pl-[110px] ">
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
            <div className="flex gap-2 mt-5 pl-[110px] ">
              <PledgeItemListSilver
                rows={PledgeItem}
                setRows={setPledgeItem}
                selectedScheme={selectedScheme}
              />
            </div>
          </>
        )}

        <div className="flex  gap-2 pl-[110px] ">
          <div className="">
            <div>
              <label className="text-[14px] font-medium">
                Loan amount <span className="text-red-500">*</span>
              </label>
            </div>

            <input
              type="text"
              placeholder="Loan amount"
              value={formData.Loan_amount}
              onChange={(e) => {
                let inputLoan = parseFloat(e.target.value) || 0;

                // ---- Interest calculation ----
                let interestAmount = 0;

                if (selectedScheme?.calcBasisOn === "Monthly") {
                  const tenure = Number(selectedScheme?.loanPeriod) || 0;
                  const slab = selectedScheme?.interestRates?.[0];
                  const rate = Number(slab?.addInt || 0);

                  interestAmount = (inputLoan * rate * tenure) / (12 * 100);
                }

                // ---- Document Charges ----
                let docCharges =
                  (inputLoan * (selectedScheme?.docChargePercent ?? 0)) / 100;

                const minDoc = Number(selectedScheme?.docChargeMin || 0);
                const maxDoc = Number(selectedScheme?.docChargeMax || Infinity);
                docCharges = Math.max(minDoc, Math.min(docCharges, maxDoc));

                // ---- Net Payable ----
                const netPayable = inputLoan + interestAmount - docCharges;

                setFormData((prev) => ({
                  ...prev,
                  Loan_amount: e.target.value, // keep what user typed
                  Interest_Amount: interestAmount.toFixed(2),
                  Doc_Charges: docCharges.toFixed(2),
                  Net_Payable: netPayable.toFixed(2),
                }));
              }}
              className="border border-gray-300 px-3 py-2 w-[129px] rounded-[8px] bg-white h-[38px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium text-gray-700 mb-1">
              Doc Charges (%)
            </label>

            <div className="flex w-[129px]">
              {/* Percentage Button first */}
              <button className="bg-[#0A2478] text-white px-4 py-2 text-sm font-medium rounded-l-md border border-[#0A2478] hover:bg-[#081c5b] transition-all duration-200">
                {selectedScheme?.docChargePercent || 0}
              </button>

              {/* Input Field */}
              <input
                type="text"
                name="Doc_Charges"
                value={formData.Doc_Charges}
                onChange={handleInputChange}
                placeholder="Enter rate"
                className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478] w-[50px]"
              />
            </div>
          </div>

          <div className="">
            <div>
              <label className="text-[14px] font-medium">Net Payable </label>
            </div>

            <input
              type="text"
              placeholder="Net Payable"
              name="Net_Payable"
              value={formData.Net_Payable}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2  w-[129px] rounded-[8px] bg-white h-[38px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Valuer 1<span className="text-red-500">*</span>
            </label>
            <select
              name="value1"
              value={formData.value1}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            >
              <option value="">Select valuer 1</option>
              {activeEmployees.map((emp) => (
                <option key={emp.id} value={emp.emp_name}>
                  {emp.emp_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Valuer 2<span className="text-red-500">*</span>
            </label>
            <select
              name="value2"
              value={formData.value2}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            >
              <option value="">Select valuer 2</option>
              {activeEmployees.map((emp) => (
                <option key={emp.id} value={emp.emp_name}>
                  {emp.emp_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-10  mb-10 pl-[110px]">
          <p className="mt-5 mb-5">
            {numberToWords(Number(formData.Loan_amount) || 0)}
          </p>
        </div>

        <div className="flex gap-10  mb-10 pl-[110px] ">
          <div className="flex mt-5">
            <div className="">
              <h3 className="font-semibold  text-blue-900 text-lg">
                Scheme Details
              </h3>

              <table className="border border-gray-300 text-sm">
                <thead className="bg-[#0A2478] text-white">
                  <tr>
                    <th className="px-4 py-2 border-r border-gray-200 w-[224px]">
                      Loan Tenure (Days)
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200 w-[173px]">
                      Min Loan
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200 w-[195px]">
                      Max Loan
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border border-[#4A4A4A38]">
                    <td className="px-4 py-2 border border-[#4A4A4A38]">
                      {selectedScheme?.loanPeriod}
                    </td>
                    <td className="px-4 py-2 border border-[#4A4A4A38]">
                      {selectedScheme?.minLoanAmount}
                    </td>
                    <td className="px-4 py-2 border border-[#4A4A4A38]">
                      {selectedScheme?.maxLoanAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center  mt-5">
            <div className="">
              <h3 className="font-semibold  text-blue-900 text-lg">
                Effective Interest Rates
              </h3>

              <table className="border border-gray-300 text-sm">
                <thead className="bg-[#0A2478] text-white">
                  <tr>
                    <th className="px-4 py-2 border-r border-gray-200 w-[307px]">
                      Terms
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200 w-[307px]">
                      Effective Interest Rates
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {selectedScheme?.interestRates &&
                  selectedScheme?.interestRates.length > 0 ? (
                    selectedScheme?.interestRates.map((rate, idx) => (
                      <tr
                        key={idx}
                        className={`border border-[#4A4A4A38] ${
                          idx % 2 === 0 ? "bg-[#FFCDCD]" : "bg-[#E5E5FF]"
                        }`}
                      >
                        <td className="px-4 py-2 border border-[#4A4A4A38]">
                          {rate.from} To {rate.to}{" "}
                          {selectedScheme?.calcBasisOn === "Monthly"
                            ? "MONTHS"
                            : "DAYS"}
                        </td>
                        <td className="px-4 py-2 border border-[#4A4A4A38]">
                          {rate.addInt}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-3 text-gray-500 border border-[#4A4A4A38]"
                      >
                        No interest data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
                  onClick={() => setShowCustomerModal(false)}
                  className="text-red-600 font-bold text-[20px] hover:opacity-70"
                >
                  ×
                </button>
              </div>

              {/* top profile images */}
              <div className="flex gap-16">
                {/* profile + signature */}
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

                {/* 2 proof images */}
                <div className="flex flex-col items-center">
                  {selectedCustomer?.Additional_UploadDocumentFile1 ? (
                    <img
                      src={selectedCustomer.Additional_UploadDocumentFile1}
                      alt="Address Proof"
                      className="w-[112px] h-[112px] border rounded-md object-cover shadow-sm"
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
              </div>

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
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-2">HDFC Bank</td>
                      <td className="px-4 py-2">Rahul Sharma</td>
                      <td className="px-4 py-2">123456789012</td>
                      <td className="px-4 py-2">HDFC0000123</td>
                      <td className="px-4 py-2">Bandra West, Mumbai</td>
                      <td className="px-4 py-2">
                        <img
                          src={"/assets/cancel_cheque.png"}
                          alt="Cancel Cheque"
                          className="w-[80px] h-[35px] object-cover border rounded"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* loan table */}
              <div className="mt-6 border rounded-md shadow-sm overflow-x-auto overflow-y-auto h-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#0A2478] text-white text-sm">
                    <tr>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Loan No
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Loan Date
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Loan Amount
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Scheme
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Int. Due Date
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Pending Interest
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Total Due
                      </th>
                      <th className="px-4 py-2 text-left text-[13px] border-r">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left text-[13px]">
                        Ornaments Image
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-[12px]">
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-2">LN-0001</td>
                      <td className="px-4 py-2">05-11-2025</td>
                      <td className="px-4 py-2">₹1,50,000</td>
                      <td className="px-4 py-2">Gold Scheme A</td>
                      <td className="px-4 py-2">15-11-2025</td>
                      <td className="px-4 py-2">₹4,200</td>
                      <td className="px-4 py-2">₹1,54,200</td>
                      <td className="px-4 py-2 text-green-600 font-semibold">
                        Active
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={"/assets/ornament1.png"}
                          alt="Ornament"
                          className="w-[80px] h-[45px] object-cover border rounded"
                        />
                      </td>
                    </tr>
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

        {remarkModel && (
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
      </div>
    </div>
  );
};

export default AddGoldLoanApplication;
