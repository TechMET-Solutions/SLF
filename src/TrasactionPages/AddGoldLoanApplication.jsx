import axios from "axios";
import { useEffect, useState } from "react";
import profileempty from "../assets/profileempty.png";
import timesvg from "../assets/timesvg.svg";
import PledgeItemList from "./PledgeItemList";
const AddGoldLoanApplication = () => {
  const [schemes, setSchemes] = useState([]); // store all schemes
  const [selectedScheme, setSelectedScheme] = useState(null); // store selected scheme

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Scheme/getAllSchemes");
        const fetchedSchemes = response.data.map((item) => ({
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
    const selectedId = parseInt(e.target.value);
    const scheme = schemes.find((s) => s.id === selectedId);

    // store the full scheme in state (optional)
    setSelectedScheme(scheme);

    // ✅ update formData to include schemeId (and name if needed)
    setFormData((prev) => ({
      ...prev,
      schemeId: scheme?.id || "",
      schemeName: scheme?.schemeName || "",
    }));
  };

  const handleSaveLoan = async () => {
    try {
      const formDataToSend = new FormData();

      // 👤 Borrower Details
      formDataToSend.append("BorrowerId", selectedCustomer?.id || "");
      formDataToSend.append("CoBorrowerId", selectedCoBorrower?.id || "");
      formDataToSend.append("Borrower", formData.borrowerName || "");
      formDataToSend.append("Scheme", formData.schemeName || "");
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
      formDataToSend.append("Pledge_Item_List", JSON.stringify(PledgeItem || []));

      // 💰 Loan Details
      formDataToSend.append("Loan_amount", formData.Loan_amount || 0);
      formDataToSend.append("Doc_Charges", formData.Doc_Charges || 0);
      formDataToSend.append("Net_Payable", formData.Net_Payable || 0);
      formDataToSend.append("Valuer_1", "Not Assigned");
      formDataToSend.append("Valuer_2", "Not Assigned");
      formDataToSend.append("Loan_Tenure", selectedScheme?.loanPeriod || "");
      formDataToSend.append("Min_Loan", selectedScheme?.minLoanAmount || "");
      formDataToSend.append("Max_Loan", selectedScheme?.maxLoanAmount || "");

      // 🧮 Effective Interest Rates (JSON)
      const effectiveInterestRates =
        selectedScheme?.effectiveInterestRates?.length > 0
          ? selectedScheme.effectiveInterestRates
          : [
            { term: "0-30", rate: 12 },
            { term: "31-90", rate: 14 },
          ]; // fallback default
      formDataToSend.append(
        "Effective_Interest_Rates",
        JSON.stringify(effectiveInterestRates)
      );

      // 🏢 Misc Info
      formDataToSend.append("approved_by", "Admin");
      formDataToSend.append("approval_date", new Date().toISOString().split("T")[0]);
      formDataToSend.append("branch_id", 1);

      // 🚀 API Request
      const res = await axios.post(
        "http://localhost:5000/Transactions/goldloan/addLoan",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Loan Application Saved Successfully!");
      console.log("📤 Response:", res.data);
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
  console.log(results, "results")
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCoBorrower, setSelectedCoBorrower] = useState(null);
  // Fetch API when typing


  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerAddress: "",
    schemeId: "",
    schemeName: "",
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
    Net_Payable: ""


  });
  const [PledgeItem, setPledgeItem] = useState([
    {
      id: 1,
      particular: "",
      nos: 1,
      gross: "",
      netWeight: "",
      purity: "",
      rate: "",
      valuation: "",
      remark: "",
    },
  ]);

  console.log(formData, "formData")
  useEffect(() => {
    let totalGross = 0;
    let totalNet = 0;
    let totalValuation = 0;

    PledgeItem.forEach((item) => {
      totalGross += Number(item.gross) || 0;
      totalNet += Number(item.netWeight) || 0;
      totalValuation += Number(item.valuation) || 0;
    });

    // Calculate document charges (2% of loan)
    const docCharges = (totalValuation * 2) / 100;
    const netPayable = totalValuation + docCharges;

    // Update all values in formData
    setFormData((prev) => ({
      ...prev,
      Loan_amount: totalValuation.toFixed(2),
      Doc_Charges: docCharges.toFixed(2),
      Net_Payable: netPayable.toFixed(2),
    }));
  }, [PledgeItem]);

  console.log(formData, "formData")


  useEffect(() => {
    const fetchCustomers = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/Master/doc/Customer_list?search=${searchTerm}`
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
          `http://localhost:5000/Master/doc/Customer_list?search=${searchTermForCoBorrower}`
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

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setSearchTerm(customer.firstName); // show name in input
    setResults([]); // hide dropdown

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
  };

  const handleSelectCoborrower = (customer) => {
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
        OrnamentPhoto: imageUrl,  // preview
        OrnamentFile: file,       // actual file for upload
      }));
    }
  };


  return (
    <div className="min-h-screen w-full pl-[5%]">
      {/* ===== Top Bar ===== */}
      <div className="flex pl-[50px]">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
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
              className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#0A2478] w-[74px] h-[24px] text-[10px]">
              Submit
            </button>
            <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] text-[10px]">
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ===== FORM SECTIONS ===== */}
      <div className="flex  gap-2 mt-10">
        <div >
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
                  {results.length > 0 && (
                    <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50">
                      {results.map((customer) => (
                        <li
                          key={customer.id}
                          onClick={() => handleSelectCustomer(customer)}
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
                >
                  <img
                    src={timesvg}
                    alt="eye"

                  />
                </button>
              </div>

            </div>



            <div className="mb-6">
              <label className="text-[14px] font-medium block mb-1">Scheme*</label>
              <select
                className="border border-gray-300 px-3 py-2 w-[200px] bg-white rounded-[8px]"
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
                <label className="text-[14px] font-medium">Print Name  *</label>
              </div>

              <input
                type="text"
                name="printName"
                placeholder="Enter Print Name"
                value={formData.printName}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 mt-1 w-[225px] rounded-[8px] bg-white h-[38px]"
              />
            </div>

            <div className="">
              <div>
                <label className="text-[14px] font-medium">Mobile Number*</label>
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
                <label className="text-[14px] font-medium">Alternate Number</label>
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


            <div>

            </div>
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
                  {results2.length > 0 && (
                    <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50">
                      {results2.map((customer) => (
                        <li
                          key={customer.id}
                          onClick={() => handleSelectCoborrower(customer)}
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
                  <label className="text-[14px] font-medium">Nominee*</label>
                </div>

                <input
                  type="text"
                  placeholder="Nominee"
                  name="Nominee_Name"

                  value={formData.Nominee_Name}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 mt-1 w-[209px] rounded-[8px] bg-white h-[38px]"
                />
              </div>
            </div>

            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">Relation*</label>
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
              className="border w-[290px] h-[62px] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>


        <div className="flex ">

          <div className=" w-[139px] h-[130px] ">
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
              src={formData.OrnamentPhoto ? formData.OrnamentPhoto : profileempty}
              alt="Ornament"
              className="w-[139px] h-[130px] object-cover rounded-[8px] border border-gray-300"
            />

            {/* File Upload */}
            <div className="flex items-center border border-gray-300 rounded mt-2 w-[140px]">
              <label
                htmlFor="ornamentFile"
                className="bg-[#D9D9D9] p-1 cursor-pointer text-[10px] rounded-l border-r border w-[120px] text-black font-bold h-[21px] flex items-center justify-center"
              >
                Choose File
              </label>
              <input
                id="ornamentFile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleOrnamentUpload(e)}
              />
            </div>
          </div>


        </div>

      </div>

      <PledgeItemList rows={PledgeItem} setRows={setPledgeItem} />







      <div className="flex  gap-2  ">

        <div className="">
          <div>
            <label className="text-[14px] font-medium">Loan amount *</label>
          </div>

          <input
            type="text"
            placeholder="Loan amount"
            value={formData.Loan_amount}  // ← shows the value from state
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                Loan_amount: e.target.value, // ← updates state on typing
              }))
            }
            className="border border-gray-300 px-3 py-2 w-[129px] rounded-[8px] bg-white h-[38px]"
          />
        </div>




        <div className="flex flex-col">
          <label className="text-[14px] font-medium text-gray-700 mb-1">
            Doc Charges (%)
          </label>

          <div className="flex w-[129px]">
            {/* Percentage Button first */}
            <button
              className="bg-[#0A2478] text-white px-4 py-2 text-sm font-medium rounded-l-md border border-[#0A2478] hover:bg-[#081c5b] transition-all duration-200"
            >
              2%
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
          <label className="text-[14px] font-medium">Valuer 1* </label>
          <select className="border border-gray-300 rounded-[8px] px-3 py-2  w-[256px] bg-white">
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[14px] font-medium">Valuer 2* </label>
          <select className="border border-gray-300 rounded-[8px] px-3 py-2  w-[256px] bg-white">
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>


      </div>




      <div>
        <p className="mt-5 mb-5">Thirty One Thousand Five Hundred only</p>
      </div>

      <div className="flex gap-20 mb-10">

        <div className="flex  mt-5">
          <div className="">

            <h3 className="font-semibold  text-blue-900 text-lg">Scheme Details</h3>

            <table className="border border-gray-300 text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200 w-[224px]">Loan Tenure (Days)</th>
                  <th className="px-4 py-2 border-r border-gray-200 w-[173px]">Min Loan</th>
                  <th className="px-4 py-2 border-r border-gray-200 w-[195px]">Max Loan</th>


                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border border-[#4A4A4A38]">
                  <td className="px-4 py-2 border border-[#4A4A4A38]">{selectedScheme?.loanPeriod}</td>
                  <td className="px-4 py-2 border border-[#4A4A4A38]">{selectedScheme?.minLoanAmount}</td>
                  <td className="px-4 py-2 border border-[#4A4A4A38]">{selectedScheme?.maxLoanAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center  mt-5">
          <div className="">
            <h3 className="font-semibold  text-blue-900 text-lg">Effective Interest Rates</h3>

            <table className="border border-gray-300 text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200 w-[307px]">Terms</th>
                  <th className="px-4 py-2 border-r border-gray-200 w-[307px]">Effective Interest Rates</th>



                </tr>
              </thead>
              <tbody className="text-gray-700">
                {selectedScheme?.interestRates && selectedScheme?.interestRates.length > 0 ? (
                  selectedScheme?.interestRates.map((rate, idx) => (
                    <tr
                      key={idx}
                      className={`border border-[#4A4A4A38] ${idx % 2 === 0 ? "bg-[#FFCDCD]" : "bg-[#E5E5FF]"
                        }`}
                    >
                      <td className="px-4 py-2 border border-[#4A4A4A38]">
                        {rate.from} To {rate.to} DAYS
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
    </div>
  )
}

export default AddGoldLoanApplication
