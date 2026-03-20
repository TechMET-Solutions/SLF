// import axios from "axios";
// import { useEffect, useState } from "react";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { useLocation, useNavigate } from "react-router-dom";
// import { API } from "../api";
// import profileempty from "../assets/profileempty.png";
// import timesvg from "../assets/timesvg.svg";
// import { decryptData } from "../utils/cryptoHelper";
// import PledgeItemList from "./PledgeItemList";
// import PledgeItemListSilver from "./PledgeItemListSilver";

// const EditLoanApplication = () => {
//   const [schemes, setSchemes] = useState([]); // store all schemes
//   const [selectedScheme, setSelectedScheme] = useState(null); // store selected scheme
//   console.log(selectedScheme, "selectedScheme");
//   const navigate = useNavigate();

//    const [branchId, setBranchId] = useState("");
//   const [branchName, setBranchName] = useState("");

//   useEffect(() => {
//     const userData = JSON.parse(sessionStorage.getItem("userData"));

//     if (userData?.branchId) {
//       const branch = userData.branchId;

//       // ✅ Store separately
//       setBranchId(branch.id);
//       setBranchName(branch.branch_name);

//       // ✅ Also store inside formData (if needed)
//       // setFormData((prev) => ({
//       //   ...prev,
//       //   branchId: branch.id,
//       //   branchName: branch.branch_name,
//       //   financialYear: userData.financialYear || "",
//       // }));
//     }
//   }, []);

//   useEffect(() => {
//     if (!branchId) return; // 🔒 wait until branchId is set

//     const fetchSchemes = async () => {
//       try {
//         const response = await axios.get(
//           `${API}/Scheme/getSchemesAccordingToBranch`,
//           {
//             params: { branchId }, // ✅ pass branchId
//           },
//         );

//         const fetchedSchemes = response.data.items.map((item) => ({
//           ...item,
//           intCompound: item.calcMethod === "Compound",
//         }));

//         setSchemes(fetchedSchemes);
//       } catch (err) {
//         console.error("❌ Error fetching schemes:", err);
//       }
//     };

//     fetchSchemes();
//   }, [branchId]);

//   // useEffect(() => {
//   //   const fetchSchemes = async () => {
//   //     try {
//   //       const response = await axios.get(`${API}/Scheme/getAllSchemes`);
//   //       const fetchedSchemes = response.data.data.map((item) => ({
//   //         ...item,
//   //         intCompound: item.calcMethod === "Compound",
//   //       }));
//   //       setSchemes(fetchedSchemes);
//   //     } catch (err) {
//   //       console.error("❌ Error fetching schemes:", err);
//   //     }
//   //   };

//   //   fetchSchemes();
//   // }, []);

//   const handleSchemeChange = (e) => {
//     const schemeId = e.target.value;

//     const selected = schemes.find((x) => x.id == schemeId);

//     if (!selected) return;

//     const parsedScheme = {
//       ...selected,
//       interestRates: Array.isArray(selected.interestRates)
//         ? selected.interestRates
//         : selected.interestRates
//           ? JSON.parse(selected.interestRates)
//           : [],
//     };

//     setSelectedScheme(parsedScheme);
//   };

//   useEffect(() => {
//     document.title = "SLF | Edit Gold Loan Application ";
//   }, []);

//   const [rows, setRows] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [searchTermForCoBorrower, setSearchTermForCoBorrower] = useState("");
//   const [results, setResults] = useState([]);
//   const [results2, setResults2] = useState([]);
//   console.log(results, "results");
//   const [loading, setLoading] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedCoBorrower, setSelectedCoBorrower] = useState(null);
//   // Fetch API when typing
//   const [selectedCustomerForEdit, setselectedCustomerForEdit] = useState(null);
//   const [activeEmployees, setActiveEmployees] = useState([]);
//   console.log(activeEmployees, "activeEmployees");

//   const getActiveEmp = async () => {
//     try {
//       const res = await axios.get(`${API}/Master/getActiveEmployees`);
//       const decrypted = decryptData(res.data.data); // no JSON.parse
//       console.log(decrypted);
//       setActiveEmployees(decrypted);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getActiveEmp();
//   }, []);

//   const location = useLocation();
//   const { loanId, loanData } = location.state || {};

//   const [formData, setFormData] = useState({
//     borrowerId: "",
//     borrowerName: "",
//     borrowerAddress: "",
//     schemeId: "",
//     schemeName: "",
//     printName: "",
//     mobile: "",
//     payDate: "",
//     altMobile: "",
//     Borrower_ProfileImg: "",
//     Borrower_signature: "",
//     CoBorrowerName: "",
//     CoBorrower_ProfileImg: "",
//     CoBorrower_signature: "",
//     CoBorrowerId: "",
//     CoBorrowerRelation: "",
//     Nominee_Name: "",
//     NomineeRelation: "",
//     OrnamentPhoto: "",
//     Loan_amount: loanData.Loan_amount,
//     Doc_Charges: "",
//     Net_Payable: "",
//     value1: "",
//     value2: "",
//     Effective_Interest_Rates: "",
//   });

//   console.log(formData, "formData");
//   console.log("LoanId => ", loanId);
//   console.log("LoanData => ", loanData);
//   const [PledgeItem, setPledgeItem] = useState([
//     {
//       id: 1,
//       particular: "",
//       nos: 1,
//       gross: "",
//       netWeight: "",
//       purity: "",
//       rate: "",
//       valuation: "",
//       remark: "",
//     },
//   ]);

//   console.log(formData, "formData");

//   useEffect(() => {
//     if (loanId) {
//       fetchLoanDetails(loanId);
//     }
//   }, [loanId]);

//   const fetchLoanDetails = async (id) => {
//     try {
//       const res = await axios.get(`${API}/Transactions/goldloan/getLoan/${id}`);
//       const data = res.data.loanApplication;
//       const SchemaData = res.data.schemeData;

//       const parsedScheme = {
//         ...SchemaData,
//         interestRates:
//           typeof SchemaData?.interestRates === "string"
//             ? JSON.parse(SchemaData.interestRates)
//             : SchemaData?.interestRates || [],
//       };

//       setSelectedScheme(parsedScheme);
//       // set formData
//       setFormData({
//         borrowerId: data.BorrowerId,
//         CoBorrowerId: data.CoBorrowerId,
//         payDate: data.Pay_Date || "",
//         borrowerName: data.Borrower || "",
//         borrowerAddress: data.Address, // if you are not getting from api leave empty
//         schemeId: data.Scheme_ID || "",
//         schemeName: data.Scheme || "",
//         printName: data.Print_Name || "",
//         mobile: data.Mobile_Number || "",
//         altMobile: data.Alternate_Number || "",
//         Borrower_ProfileImg: data.borrower_profileImage || "",
//         Borrower_signature: data.borrower_signature || "",
//         CoBorrowerName: data.Co_Borrower || "",
//         CoBorrower_ProfileImg: data.coborrower_profileImage || "",
//         CoBorrower_signature: data.coborrower_signature || "",
//         CoBorrowerRelation: data.Relation || "",
//         Nominee_Name: data.Nominee || "",
//         NomineeRelation: data.Nominee_Relation || "",
//         OrnamentPhoto: data.Ornament_Photo || "",
//         Loan_amount: data.Loan_amount || "",
//         Doc_Charges: data.Doc_Charges || "",
//         Net_Payable: data.Net_Payable || "",
//         value1: data.Valuer_1 || "",
//         value2: data.Valuer_2 || "",
//         Effective_Interest_Rates: data.Effective_Interest_Rates || "",
//       });

//       // set pledge items
//       if (data.Pledge_Item_List) {
//         let parsed = [];

//         try {
//           parsed =
//             typeof data.Pledge_Item_List === "string"
//               ? JSON.parse(data.Pledge_Item_List)
//               : data.Pledge_Item_List || [];
//         } catch (err) {
//           console.log("error parsing pledge list", err);
//         }

//         setPledgeItem(parsed);
//       }
//       // set selected customer objects if you need for autocomplete
//       setSelectedCustomer(data.BorrowerId);
//       setSelectedCoBorrower(data.CoBorrowerId);
//     } catch (err) {
//       console.log("error => ", err);
//     }
//   };

//   const handleUpdateLoan = async () => {
//     debugger;
//     try {
//       const formDataToSend = new FormData();

//       formDataToSend.append("BorrowerId", formData.borrowerId || "");
//       formDataToSend.append("CoBorrowerId", formData.CoBorrowerId || "");
//       formDataToSend.append("Borrower", formData.borrowerName || "");
//       formDataToSend.append("Scheme", formData.schemeName || "");
//       formDataToSend.append("payDate", formData.payDate || "");
//       formDataToSend.append("Scheme_ID", selectedScheme?.id || "");
//       formDataToSend.append("Print_Name", formData.printName || "");
//       formDataToSend.append("Mobile_Number", formData.mobile || "");
//       formDataToSend.append("Alternate_Number", formData.altMobile || "");
//       formDataToSend.append("Co_Borrower", formData.CoBorrowerName || "");
//       formDataToSend.append("Relation", formData.CoBorrowerRelation || "");
//       formDataToSend.append("Nominee", formData.Nominee_Name || "");
//       formDataToSend.append("Nominee_Relation", formData.NomineeRelation || "");
//       formDataToSend.append("Valuer_1", formData.value1 || "");
//       formDataToSend.append("Valuer_2", formData.value2 || "");
//       //  formDataToSend.append("Effective_Interest_Rates", selectedScheme?.interestRates || "");
//       // new ornament photo update (optional)
//       if (formData.OrnamentFile) {
//         formDataToSend.append("Ornament_Photo", formData.OrnamentFile);
//       }

//       formDataToSend.append(
//         "Pledge_Item_List",
//         JSON.stringify(PledgeItem || []),
//       );
//       formDataToSend.append("Loan_amount", formData.Loan_amount || 0);
//       formDataToSend.append("Doc_Charges", formData.Doc_Charges || 0);
//       formDataToSend.append("Net_Payable", formData.Net_Payable || 0);

//       formDataToSend.append(
//         "Effective_Interest_Rates",
//         JSON.stringify(selectedScheme?.interestRates),
//       );

//       const res = await axios.put(
//         `${API}/Transactions/goldloan/updateLoan/${loanId}`,
//         formDataToSend,
//         { headers: { "Content-Type": "multipart/form-data" } },
//       );

//       alert("✅ Loan Updated Successfully!");
//       navigate("/Loan-Application");
//     } catch (err) {
//       console.log(err);
//       alert("Update failed");
//     }
//   };

//   console.log(formData, "formData");

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       if (!searchTerm.trim()) {
//         setResults([]);
//         return;
//       }

//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${API}/Master/doc/Customer_list?search=${searchTerm}`,
//         );
//         setResults(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching customers:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounce = setTimeout(fetchCustomers, 300);
//     return () => clearTimeout(debounce);
//   }, [searchTerm]);
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       if (!searchTermForCoBorrower.trim()) {
//         setResults2([]);
//         return;
//       }

//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${API}/Master/doc/Customer_list?search=${searchTermForCoBorrower}`,
//         );
//         setResults2(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching customers:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounce = setTimeout(fetchCustomers, 300);
//     return () => clearTimeout(debounce);
//   }, [searchTermForCoBorrower]);

//   // ➕ Add new row
//   const handleAddRow = () => {
//     const newRow = {
//       id: Date.now(),
//       particular: "gold",
//       nos: 1,
//       gross: "",
//       netWeight: "",
//       purity: "20k",
//       rate: "",
//       valuation: "",
//       remark: "",
//     };
//     setRows([...rows, newRow]);
//   };

//   // ❌ Delete specific row
//   const handleDeleteRow = (id) => {
//     const updatedRows = rows.filter((row) => row.id !== id);
//     setRows(updatedRows);
//   };

//   const handleSelectCustomer = (customer) => {
//     debugger;
//     setSelectedCustomer(customer);
//     setSearchTerm(customer.firstName); // show name in input
//     setResults([]); // hide dropdown

//     setFormData((prev) => ({
//       ...prev,
//       borrowerId: customer.id,
//       borrowerName: customer.firstName || "",
//       printName: customer.printName || "",
//       mobile: customer.mobile || "",
//       altMobile: customer.altMobile || "",
//       email: customer.email || "",
//       panNo: customer.panNo || "",
//       aadhar: customer.aadhar || "",
//       Borrower_ProfileImg: customer.profileImage || "",
//       Borrower_signature: customer.signature || "",
//       borrowerAddress: `${customer.Permanent_Address || ""}, ${customer.Permanent_City || ""}, ${customer.Permanent_State || ""}, ${customer.Permanent_Country || ""} - ${customer.Permanent_Pincode || ""}`,
//       Nominee_Name: customer.Nominee_NomineeName || "",
//       NomineeRelation: customer.Nominee_Relation || "",
//     }));
//   };

//   const handleSelectCoborrower = (customer) => {
//     setSelectedCoBorrower(customer);
//     setSearchTermForCoBorrower(customer.firstName); // show name in input
//     setResults2([]);
//     setFormData((prev) => ({
//       ...prev,

//       CoBorrowerName: customer.firstName || "",
//       CoBorrower_ProfileImg: customer.profileImage || "",
//       CoBorrower_signature: customer.signature || "",
//       CoBorrowerId: customer.id || "",
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleOrnamentUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setFormData((prev) => ({
//         ...prev,
//         OrnamentPhoto: imageUrl, // preview
//         OrnamentFile: file, // actual file for upload
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen w-full ">
//       {/* ===== Top Bar ===== */}
//       <div className="flex ml-[25px]">
//         <div className="flex items-center px-6  border-b  w-[1462px] h-[40px] border  border-gray-200 justify-between">
//           <h2
//             style={{
//               fontFamily: "Source Sans 3, sans-serif",
//               fontWeight: 700,
//               fontSize: "20px",
//               lineHeight: "148%",
//               letterSpacing: "0em",
//             }}
//             className="text-red-600"
//           >
//             Edit Loan
//           </h2>
//           <div className="flex gap-3">
//             <button
//               onClick={handleUpdateLoan}
//               className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#0A2478] w-[74px] h-[24px] text-[10px]"
//             >
//               Update
//             </button>
//             <button
//               onClick={() => navigate("/Loan-Application")}
//               className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] text-[10px]"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ===== FORM SECTIONS ===== */}
//       <div className="mt-2 bg-[#FFE6E6] w-[1462px] ml-[25px] p-5">
//         <div className="flex gap-2 ">
//           <div>
//             <div className="flex gap-2">
//               <div className="flex flex-col">
//                 <label className="text-[14px] font-medium">
//                   Borrower<span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex items-center mt-1 w-[220px]">
//                   <div className="relative flex-1">
//                     <input
//                       type="text"
//                       placeholder="Enter Borrower Name"
//                       name="Borrower_Name"
//                       value={formData.borrowerName} // <-- use the field from your data
//                       onChange={(e) => {
//                         setFormData({
//                           ...formData,
//                           borrowerName: e.target.value,
//                         });
//                         setSearchTerm(e.target.value); // if you still need this for searching
//                         setSelectedCustomer(null);
//                       }}
//                       className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
//                     />

//                     {/* Loading */}
//                     {loading && (
//                       <div className="absolute right-3 top-2 text-gray-400 text-sm">
//                         Loading...
//                       </div>
//                     )}

//                     {/* Dropdown */}
//                     {results.length > 0 && (
//                       <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50">
//                         {results.map((customer) => (
//                           <li
//                             key={customer.id}
//                             onClick={() => handleSelectCustomer(customer)}
//                             className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
//                           >
//                             {customer.firstName}{" "}
//                             <span className="text-gray-500 text-sm">
//                               ({customer.mobile})
//                             </span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>

//                   <button
//                     className="bg-[#0A2478] text-white px-4 py-3 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]"
//                     type="button"
//                   >
//                     <img src={timesvg} alt="eye" />
//                   </button>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="text-[14px] font-medium block mb-1">
//                   Scheme*
//                 </label>
//                 <select
//                   className="border border-gray-300 px-3 py-2 w-[150px] bg-white rounded-[8px]"
//                   onChange={handleSchemeChange}
//                   value={selectedScheme?.id || ""} // << this line makes it selected
//                 >
//                   <option value="" disabled>
//                     Select Scheme
//                   </option>
//                   {schemes.map((scheme) => (
//                     <option key={scheme.id} value={scheme.id}>
//                       {scheme.schemeName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="">
//                 <div>
//                   <label className="text-[14px] font-medium">
//                     Print Name *
//                   </label>
//                 </div>

//                 <input
//                   type="text"
//                   name="printName"
//                   placeholder="Enter Print Name"
//                   value={formData.printName}
//                   onChange={handleInputChange}
//                   className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white h-[38px]"
//                 />
//               </div>

//               <div className="">
//                 <div>
//                   <label className="text-[14px] font-medium">
//                     Mobile Number*
//                   </label>
//                 </div>

//                 <input
//                   type="text"
//                   name="mobile"
//                   placeholder="Enter mobile Name"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[38px]"
//                 />
//               </div>
//               <div className="">
//                 <div>
//                   <label className="text-[14px] font-medium">
//                     Alternate Number
//                   </label>
//                 </div>

//                 <input
//                   type="text"
//                   name="altMobile"
//                   placeholder="Enter alt Mobile Name"
//                   value={formData.altMobile}
//                   onChange={handleInputChange}
//                   className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[38px]"
//                 />
//               </div>

//               <div></div>
//             </div>
//             <div className="flex   mt-5 gap-2">
//               <div className="flex flex-col">
//                 <label className="text-[14px] font-medium">
//                   Co-Borrower<span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex items-center mt-1 w-[220px]">
//                   <div className="relative flex-1">
//                     <input
//                       type="text"
//                       placeholder="Enter Co-Borrower Name"
//                       name="CoBorrowerName"
//                       value={formData.CoBorrowerName} // <-- show the existing value
//                       onChange={(e) => {
//                         setFormData({
//                           ...formData,
//                           CoBorrowerName: e.target.value, // <-- update formData also
//                         });

//                         setSearchTermForCoBorrower(e.target.value); // if you use this for search
//                         setSelectedCoBorrower(null);
//                       }}
//                       className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
//                     />

//                     {/* Loading */}
//                     {loading && (
//                       <div className="absolute right-3 top-2 text-gray-400 text-sm">
//                         Loading...
//                       </div>
//                     )}

//                     {/* Dropdown */}
//                     {results2.length > 0 && (
//                       <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50">
//                         {results2.map((customer) => (
//                           <li
//                             key={customer.id}
//                             onClick={() => handleSelectCoborrower(customer)}
//                             className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
//                           >
//                             {customer.firstName}{" "}
//                             <span className="text-gray-500 text-sm">
//                               ({customer.mobile})
//                             </span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <div className="">
//                   <div>
//                     <label className="text-[14px] font-medium">Relation</label>
//                   </div>

//                   <input
//                     type="text"
//                     placeholder="Co-Borrower"
//                     name="CoBorrowerRelation"
//                     value={formData.CoBorrowerRelation}
//                     onChange={handleInputChange}
//                     className="border border-gray-300 px-3 py-2 mt-1 w-[72px] rounded-[8px] bg-white h-[38px]"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="">
//                   <div>
//                     <label className="text-[14px] font-medium">Nominee*</label>
//                   </div>

//                   <input
//                     type="text"
//                     placeholder="Nominee"
//                     name="Nominee_Name"
//                     value={formData.Nominee_Name}
//                     onChange={handleInputChange}
//                     className="border border-gray-300 px-3 py-2 mt-1 w-[209px] rounded-[8px] bg-white h-[38px]"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="">
//                   <div>
//                     <label className="text-[14px] font-medium">Relation*</label>
//                   </div>

//                   <input
//                     type="text"
//                     placeholder="Relation"
//                     name="NomineeRelation"
//                     value={formData.NomineeRelation}
//                     onChange={handleInputChange}
//                     className="border border-gray-300 px-3 py-2 mt-1 w-[113px] rounded-[8px] bg-white h-[38px]"
//                   />
//                 </div>
//               </div>
//               <textarea
//                 name="borrowerAddress"
//                 value={formData.borrowerAddress}
//                 onChange={handleInputChange}
//                 className="border w-[350px] h-[62px] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
//               />
//             </div>
//           </div>

//           <div className="flex ">
//             <div className=" h-[130px] ">
//               {/* Profile Image */}
//               <p>Borrower</p>

//               {/* Profile Image */}
//               <img
//                 src={
//                   formData.Borrower_ProfileImg
//                     ? `${formData.Borrower_ProfileImg}` // backend image path
//                     : profileempty // fallback image
//                 }
//                 alt="profile"
//                 className="w-[111px] h-[130px] rounded-[8px] object-cover border border-gray-300"
//               />

//               {/* Signature Image Box */}
//               <div className="mt-2 border w-[111px] h-[33px] flex items-center justify-center bg-white">
//                 {formData.Borrower_signature ? (
//                   <img
//                     src={`${formData.Borrower_signature}`}
//                     alt="signature"
//                     className="w-full h-full object-contain"
//                   />
//                 ) : (
//                   <span className="text-gray-400 text-xs">No Signature</span>
//                 )}
//               </div>
//             </div>
//             <div className="w-[139px] h-auto flex flex-col items-center">
//               {/* Co-Borrower Label */}
//               <p className="font-medium mb-1">Co-Borrower</p>

//               {/* Co-Borrower Profile Image */}
//               <img
//                 src={
//                   formData.CoBorrower_ProfileImg
//                     ? formData.CoBorrower_ProfileImg
//                     : profileempty
//                 }
//                 alt="Co-Borrower Profile"
//                 className="w-[111px] h-[130px] rounded-[8px] object-cover border border-gray-300"
//               />

//               {/* Signature Box */}
//               <div className="mt-2 w-[111px] h-[33px] border flex items-center justify-center bg-white rounded-[6px]">
//                 {formData.CoBorrower_signature ? (
//                   <img
//                     src={formData.CoBorrower_signature}
//                     alt="Co-Borrower Signature"
//                     className="max-h-[31px] object-contain"
//                   />
//                 ) : (
//                   <p className="text-gray-400 text-xs">No signature</p>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       <div className="ml-[110px] mr-[110px] bg-[#F7F7FF] p-2 ">
//         {selectedScheme?.product === "Gold" && (
//           <>
//             <div className="flex gap-2 mt-10 ">
//               <PledgeItemList
//                 rows={PledgeItem}
//                 setRows={setPledgeItem}
//                 selectedScheme={selectedScheme}
//               />
//             </div>
//           </>
//         )}
//         {selectedScheme?.product === "Silver" && (
//           <>
//             <div className="flex gap-2 mt-5  ">
//               <PledgeItemListSilver
//                 rows={PledgeItem}
//                 setRows={setPledgeItem}
//                 selectedScheme={selectedScheme}
//               />
//             </div>
//           </>
//         )}
//       </div>
//       <div className="ml-[110px] mr-[110px] bg-[#F7F7FF]">
//         <div className="flex gap-2 ">
//           <div className="">
//             <div>
//               <label className="text-[14px] font-medium">Loan amount *</label>
//             </div>

//             <input
//               type="text"
//               placeholder="Loan amount"
//               value={formData.Loan_amount}
//               onChange={(e) => {
//                 // Allow any input value
//                 let inputLoan = parseFloat(e.target.value) || 0;

//                 // Calculate document charges and round to nearest integer
//                 const docCharges = Math.round(
//                   (inputLoan * (selectedScheme?.docChargePercent ?? 0)) / 100,
//                 );

//                 // Subtract docCharges from inputLoan
//                 const netPayable = inputLoan - docCharges;

//                 // Update state
//                 setFormData((prev) => ({
//                   ...prev,
//                   Loan_amount: e.target.value, // keep exactly what user typed
//                   Doc_Charges: docCharges, // rounded value
//                   Net_Payable: netPayable, // Loan - Doc charges
//                 }));
//               }}
//               className="border border-gray-300 px-3 py-2 w-[129px] rounded-[8px] bg-white h-[38px]"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[14px] font-medium text-gray-700 mb-1">
//               Doc Charges (%)
//             </label>

//             <div className="flex w-[129px]">
//               {/* Percentage Button first */}
//               <button className="bg-[#0A2478] text-white px-4 py-2 text-sm font-medium rounded-l-md border border-[#0A2478] hover:bg-[#081c5b] transition-all duration-200">
//                 {selectedScheme?.docChargePercent}
//               </button>

//               {/* Input Field */}
//               <input
//                 type="text"
//                 name="Doc_Charges"
//                 value={formData.Doc_Charges}
//                 onChange={handleInputChange}
//                 placeholder="Enter rate"
//                 className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478] w-[50px]"
//               />
//             </div>
//           </div>

//           <div className="">
//             <div>
//               <label className="text-[14px] font-medium">Net Payable </label>
//             </div>

//             <input
//               type="text"
//               placeholder="Net Payable"
//               name="Net_Payable"
//               value={formData.Net_Payable}
//               onChange={handleInputChange}
//               className="border border-gray-300 px-3 py-2  w-[129px] rounded-[8px] bg-white h-[38px]"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[14px] font-medium">Valuer 1*</label>
//             <select
//               name="value1"
//               value={formData.value1}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
//             >
//               <option value="">Select Valuer 1</option>
//               {activeEmployees.map((emp) => (
//                 <option key={emp.id} value={emp.emp_name}>
//                   {emp.emp_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[14px] font-medium">Valuer 2*</label>
//             <select
//               name="value2"
//               value={formData.value2}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
//             >
//               <option value="">Select Valuer 2</option>
//               {activeEmployees.map((emp) => (
//                 <option key={emp.id} value={emp.emp_name}>
//                   {emp.emp_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="">
//             <div>
//               <label className="text-[14px] font-medium">
//                 Pay Date<span className="text-red-500">*</span>
//               </label>
//             </div>

//             <input
//               type="date"
//               name="payDate"
//               value={formData.payDate}
//               onChange={handleInputChange}
//               className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[38px]"
//             />
//           </div>

//            <div className="">
//               <p>Ornament Photo</p>

//               {/* Preview image */}
//               <img
//                 src={
//                   formData.OrnamentPhoto ? formData.OrnamentPhoto : profileempty
//                 }
//                 alt="Ornament"
//                 className="w-[80px] h-[80px] object-cover rounded-[8px] border border-gray-300"
//               />

//               {/* File Upload */}
//               <div className="mt-2">
//                 <label
//                   htmlFor="ornamentFile"
//                   className="w-[80px] h-[30px] border rounded-[8px] bg-[#0A2478] text-[12px] text-white flex justify-center items-center gap-2 cursor-pointer"
//                 >
//                   <p>Choose File</p>
//                   <MdOutlineFileUpload />
//                 </label>

//                 <input
//                   type="file"
//                   id="ornamentFile"
//                   name="OrnamentFile"
//                   onChange={(e) => handleOrnamentUpload(e)}
//                   className="hidden"
//                 />
//                 {formData.OrnamentFile && (
//                   <p className="text-[13px] text-gray-700">
//                     Selected File:{" "}
//                     <span className="font-medium text-[#0A2478]">
//                       {formData.OrnamentFile.name}
//                     </span>
//                   </p>
//                 )}
//               </div>
//             </div>
//         </div>

//         <div className="">
//           <p className="mt-5 mb-5">Thirty One Thousand Five Hundred only</p>
//         </div>
//       </div>

//       <div className="flex gap-20 mb-10  ml-[110px] mr-[110px] bg-[#FFE6E6] p-2">
//         <div className="flex ">
//           <div className="">
//             <h3 className="font-semibold  text-blue-900 text-lg">
//               Scheme Details
//             </h3>

//             <table className="border border-gray-300 text-sm">
//               <thead className="bg-[#0A2478] text-white">
//                 <tr>
//                   <th className="px-4 py-2 border-r border-gray-200 w-[224px]">
//                     Loan Tenure (Days)
//                   </th>
//                   <th className="px-4 py-2 border-r border-gray-200 w-[173px]">
//                     Min Loan
//                   </th>
//                   <th className="px-4 py-2 border-r border-gray-200 w-[195px]">
//                     Max Loan
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700">
//                 <tr className="border border-[#4A4A4A38]">
//                   <td className="px-4 py-2 border border-[#4A4A4A38]">
//                     {selectedScheme?.loanPeriod}
//                   </td>
//                   <td className="px-4 py-2 border border-[#4A4A4A38]">
//                     {selectedScheme?.minLoanAmount}
//                   </td>
//                   <td className="px-4 py-2 border border-[#4A4A4A38]">
//                     {selectedScheme?.maxLoanAmount}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="flex justify-center  mt-5">
//           <div className="">
//             <h3 className="font-semibold  text-blue-900 text-lg">
//               Effective Interest Rates
//             </h3>

//             <table className="border border-gray-300 text-sm">
//               <thead className="bg-[#0A2478] text-white">
//                 <tr>
//                   <th className="px-4 py-2 border-r border-gray-200 w-[307px]">
//                     Terms
//                   </th>
//                   <th className="px-4 py-2 border-r border-gray-200 w-[307px]">
//                     Effective Interest Rates
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700">
//                 {selectedScheme?.interestRates &&
//                 selectedScheme?.interestRates.length > 0 ? (
//                   selectedScheme?.interestRates.map((rate, idx) => (
//                     <tr
//                       key={idx}
//                       className={`border border-[#4A4A4A38] ${
//                         idx % 2 === 0 ? "bg-[#FFCDCD]" : "bg-[#E5E5FF]"
//                       }`}
//                     >
//                       <td className="px-4 py-2 border border-[#4A4A4A38]">
//                         {rate.from} To {rate.to}{" "}
//                         {selectedScheme?.calcBasisOn === "Monthly"
//                           ? "MONTHS"
//                           : "DAYS"}
//                       </td>
//                       <td className="px-4 py-2 border border-[#4A4A4A38]">
//                         {rate.addInt}%
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="2"
//                       className="text-center py-3 text-gray-500 border border-[#4A4A4A38]"
//                     >
//                       No interest data available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditLoanApplication;

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import envImg from "../assets/envImg.jpg";
import profileempty from "../assets/profileempty.png";
import timesvg from "../assets/timesvg.svg";
import { decryptData } from "../utils/cryptoHelper";
import PledgeItemList from "./PledgeItemList";
import PledgeItemListSilver from "./PledgeItemListSilver";



const EditLoanApplication = () => {

    const location = useLocation();
  const { loanId } = location.state || {};
  console.log("LOAN ID ",loanId)
  const [schemes, setSchemes] = useState([]); // store all schemes
  const [selectedScheme, setSelectedScheme] = useState(null); // store selected scheme
  console.log(selectedScheme, "selectedScheme");
  const navigate = useNavigate();
  const [activeEmployees, setActiveEmployees] = useState([]);
  console.log(activeEmployees, "activeEmployees");
  const fileInputRef = useRef(null);

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
      schemeType: scheme?.calcBasisOn || "",
      interestType: scheme?.interestType || "",
    }));
  };
  const [image, setImage] = useState(null);
  // 1. Make sure the ref name matches exactly where it is used
  const fileInputRef2 = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 2. This creates a URL the browser can display
      setImage(URL.createObjectURL(file));
    }
  };

  const triggerUpload = () => {
    // 3. This programmatically clicks the hidden <input>
    fileInputRef2.current.click();
  };
  const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);

  const handleSaveLoan = async () => {
    try {
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

      // 📦 Pledge Items
      formDataToSend.append(
        "Pledge_Item_List",
        JSON.stringify(PledgeItem || []),
      );
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

      alert("✅ Loan Application Saved Successfully!");
      navigate("/Loan-Application");
    } catch (error) {
      console.error("❌ Error saving loan:", error);
      alert("Failed to save loan. Check console for details.");
    }
  };

  useEffect(() => {
    document.title = "SLF | Edit Gold Loan Application ";
  }, []);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightedIndexForCoborroer, setHighlightedIndexForCoBorrower] =
    useState(-1);
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
  const [CustomerData, setCustomerData] = useState(null);
  console.log(CustomerData, "CustomerData");
  console.log(selectedCustomer, "selectedCustomer");
  const [selectedCoBorrower, setSelectedCoBorrower] = useState(null);
  console.log(selectedCoBorrower, "selectedCoBorrower");
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  console.log(branchId, branchName);
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
    payDate: "",
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
      adminCharges = (loan * adminPercent) / 100;
    } else {
      adminCharges = Number(selectedScheme?.administrativeCharges || 0);
    }

    // ---------------------------
    // DOC CHARGES
    // ---------------------------
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

    // ---------------------------
    // NET PAYABLE
    // ---------------------------
    const netPayable = loan + adminCharges + docCharges;

    setFormData((prev) => ({
      ...prev,
      Loan_amount: loan.toFixed(2),
      Admin_Charges: adminCharges.toFixed(2),
      Doc_Charges: docCharges.toFixed(2),
      Net_Payable: netPayable.toFixed(2),
    }));
  }, [PledgeItem, selectedScheme]);

  useEffect(() => {
    if (!branchId) return; // 🔒 wait until branchId is set

    const fetchSchemes = async () => {
      try {
        const response = await axios.get(
          `${API}/Scheme/getSchemesAccordingToBranch`,
          {
            params: { branchId }, // ✅ pass branchId
          },
        );

        const fetchedSchemes = response.data.items.map((item) => ({
          ...item,
          intCompound: item.calcMethod === "Compound",
        }));

        setSchemes(fetchedSchemes);
      } catch (err) {
        console.error("❌ Error fetching schemes:", err);
      }
    };

    fetchSchemes();
  }, [branchId]); // ✅ dependency added
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
          `${API}/Master/doc/Customer_list?search=${searchTerm}`,
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
          `${API}/Master/doc/Customer_list?search=${searchTermForCoBorrower}`,
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

  const Handleclosed = () => {
    setShowCustomerModal(false);
    setCustomerData(null);
    setLoanData(null);
    setBankDetails(null);
  };
  // ❌ Delete specific row

  // const handleSelectCustomer = (customer, type) => {
  //   // 1️⃣ Close dropdown immediately
  //   setResults([]);
  //   setLoading(false);

  //   // 2️⃣ Update input text
  //   setSearchTerm(customer.printName || "");

  //   // 3️⃣ Update borrower remark if Borrower selected
  //   if (type === "Borrower") {
  //     setSelectedBorrowerRemark(customer.Remark || "");
  //   }

  //   // 4️⃣ Update selected customer state
  //   setSelectedCustomer(customer);

  //   // 5️⃣ Update form data
  //   setFormData((prev) => ({
  //     ...prev,
  //     borrowerName: customer.firstName || "",
  //     borrowerID: customer.id || null,

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

  //   // 6️⃣ OPEN REMARK MODAL AFTER UI UPDATE (the real fix)
  //   setTimeout(() => {
  //     setSelectedremarkModel(true);
  //   }, 120);
  // };

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

  // const handleSelectCoborrower = (customer, type) => {
  //   setSelectedremarkModel(true);
  //   if (type === "CoBorrower") {
  //     setSelectedCoBorrowerRemark(customer.Remark);
  //   }
  //   setSelectedCoBorrower(customer);
  //   setSearchTermForCoBorrower(customer.printName); // show name in input
  //   setResults2([]);
  // setFormData((prev) => ({
  //   ...prev,
  //   CoBorrowerName: customer.firstName || "",
  //   CoBorrowerID: customer.id || null,
  //   CoBorrower_ProfileImg: customer.profileImage || "",
  //   CoBorrower_signature: customer.signature || "",
  //   CoBorrowerId: customer.id || "",
  // }));
  // };

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

    // 🔹 Mobile validation
    if (name === "altMobile" || name === "mobile") {
      // Remove non-numeric characters
      const numericValue = value.replace(/\D/g, "");

      if (numericValue.length > 10) {
        alert("Mobile number must be 10 digits only.");
        return;
      }

      updatedValue = numericValue;
    }

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

  const OpenCustomerModel = async (id) => {
    try {
      setShowCustomerModal(true);

      const res = await axios.get(`${API}/Transactions/loan-by-customer/${id}`);

      if (res.data.success) {
        setLoanData(res.data.loanData);
        setBankDetails(res.data.bankDetails);
        setCustomerData(res.data.loanData[0]); // customer info is same in all
      }
    } catch (err) {
      console.error(err);
    }
  };
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 60);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  const calculateAmounts = (loanInput) => {
    const loan = parseFloat(loanInput) || 0;

    // -------------------
    // ADMIN CHARGES
    // -------------------
    let adminCharges = 0;

    if (selectedScheme?.adminChargeType === "percentage") {
      const adminPercent = Number(selectedScheme?.administrativeCharges || 0);
      adminCharges = (loan * adminPercent) / 100;
    } else {
      adminCharges = Number(selectedScheme?.administrativeCharges || 0);
    }

    // -------------------
    // DOC CHARGES
    // -------------------
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

    // -------------------
    // NET PAYABLE
    // -------------------
    const netPayable = loan + adminCharges + docCharges;

    return {
      adminCharges,
      docCharges,
      netPayable,
    };
  };

  return (
    <div className="min-h-screen  ml-[22px]">
      <div className="flex sticky top-[50px] z-40">
        <div className="flex items-center px-6 py-4 border-b w-[1462px] h-[40px] border border-gray-200 justify-between  bg-white">
          <h2 className="text-red-600 text-[20px] font-semibold">
            Edit Gold Loan Application
          </h2>

          <div className="flex gap-2">
            <button
              onClick={handleSaveLoan}
              className="bg-[#0A2478] text-white text-xs font-medium px-4 py-1.5 rounded hover:bg-blue-900 transition-colors"
            >
              Update
            </button>
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
          className="flex p-1  gap-5 bg-[#FFE6E6] w-[1462px]" >
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
                      className="border border-gray-300 rounded-l py-1 px-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white h-[30px] text-xs"
                    />

                    {loading && (
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">
                        Loading...
                      </div>
                    )}

                    {/* Show dropdown only if user typed something */}
                    {searchTerm.trim() !== "" && !selectedCustomer && (
                      <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50 h-[30px] text-xs">
                        {/* If results available */}
                        {results.length > 0 ? (
                          results.map((customer, index) => (
                            <li
                              key={customer.id}
                              onClick={() =>
                                handleSelectCustomer(customer, "Borrower")
                              }
                              className={`px-1 py-1 cursor-pointer ${
                                index === highlightedIndex
                                  ? "bg-blue-300"
                                  : "hover:bg-blue-100"
                              }`}
                            >
                              {customer.printName}
                              <span className="text-gray-500 text-sm">
                                ({customer.printName})
                              </span>
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
                    onClick={() => OpenCustomerModel(selectedCustomer.id)}
                  >
                    <img src={timesvg} alt="eye" />
                  </button>
                </div>
              </div>

              {/* <div className="flex flex-col mt-1">
                <label className="text-[14px] font-medium">
                  Co-Borrower<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center w-[280px] ">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Co-Borrower Name"
                      name="CoBorrowerName"
                      value={searchTermForCoBorrower}
                      onChange={(e) => {
                        setSearchTermForCoBorrower(e.target.value);
                        setSelectedCoBorrower(null);
                      }}
                      className="border border-gray-300 rounded-l py-1 px-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white  "
                    />

                    {loading && (
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">
                        Loading...
                      </div>
                    )}

                    {results2.length > 0 && !selectedCoBorrower && (
                      <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50">
                        {results2.map((customer) => (
                          <li
                            key={customer.id}
                            onClick={() =>
                              handleSelectCoborrower(customer, "CoBorrower")
                            }
                            className="px-2 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {customer.printName}{" "}
                            <span className="text-gray-500 text-sm">
                              ({customer.printName})
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    className="bg-[#0A2478] text-white py-2 px-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b] h-[40px]"
                    type="button"
                    onClick={() => OpenCustomerModel(selectedCoBorrower.id)} // <--- ADD
                  >
                    <img src={timesvg} alt="eye" />
                  </button>
                </div>
              </div> */}

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
                      value={searchTermForCoBorrower}
                      onChange={(e) => {
                        setSearchTermForCoBorrower(e.target.value);
                        setSelectedCoBorrower(null);
                        setHighlightedIndexForCoBorrower(-1);
                      }}
                      onKeyDown={(e) => {
                        if (!results.length) return;

                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setHighlightedIndexForCoBorrower((prev) =>
                            prev < results.length - 1 ? prev + 1 : 0,
                          );
                        }

                        if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setHighlightedIndexForCoBorrower((prev) =>
                            prev > 0 ? prev - 1 : results.length - 1,
                          );
                        }

                        if (
                          e.key === "Enter" &&
                          highlightedIndexForCoborroer >= 0
                        ) {
                          e.preventDefault();
                          handleSelectCoborrower(
                            results[highlightedIndexForCoborroer],
                            "CoBorrower",
                          );
                          setHighlightedIndexForCoBorrower(-1);
                        }
                      }}
                      className="border border-gray-300 rounded-l py-1 px-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white h-[30px] text-xs"
                    />

                    {loading && (
                      <div className="absolute right-3 top-2 text-gray-400 text-sm">
                        Loading...
                      </div>
                    )}

                    {/* Show dropdown only if user typed something */}
                    {searchTermForCoBorrower.trim() !== "" &&
                      !selectedCoBorrower && (
                        <ul className="absolute left-0 top-full bg-white border border-gray-200 rounded-md w-full max-h-48 overflow-y-auto mt-1 shadow-lg z-50 text-xs">
                          {/* If results available */}
                          {results2.length > 0 ? (
                            results2.map((customer, index) => (
                              <li
                                key={customer.id}
                                onClick={() =>
                                  handleSelectCoborrower(customer, "CoBorrower")
                                }
                                className={`px-3 py-2 cursor-pointer ${
                                  index === highlightedIndexForCoborroer
                                    ? "bg-blue-300"
                                    : "hover:bg-blue-100"
                                }`}
                              >
                                {customer.printName}
                                <span className="text-gray-500 text-sm">
                                  ({customer.printName})
                                </span>
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
                    onClick={() => OpenCustomerModel(selectedCustomer.id)}
                  >
                    <img src={timesvg} alt="eye" />
                  </button>
                </div>
              </div>

              <div className=" mt-1">
                <label className="text-[14px] font-medium block ">
                  Scheme<span className="text-red-500">*</span>
                </label>
                <select
                  className="border border-gray-300 px-1 py-1 w-[280px] bg-white rounded-[8px] h-[30px] text-xs"
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
            </div>
            {/* <div className="border  gap-10  p-2 border-gray-300">
              <div className="flex gap-5">
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">
                      Borrower Id <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    name="borrowerID"
                    // placeholder="Enter Print Name"
                    value={formData.borrowerID}
                    disabled={true}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-1 py-1  w-[120px] rounded-[8px] bg-white  mt-1 disabled:bg-gray-100 "
                  />
                </div>
                <div>
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
                      disabled={true}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-1 py-1 rounded-[8px] bg-white h-[40px] mt-1 disabled:bg-gray-100 "
                    />
                  </div>
                </div>
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">
                      Mobile Number<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <input
                    type="number"
                    name="mobile"
                    placeholder="Enter mobile Name"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    disabled={true}
                    maxLength={10}
                    style={{
                      MozAppearance: "textfield",
                    }}
                    onWheel={(e) => e.target.blur()}
                    className="border border-gray-300 px-1 py-1 mt-1 rounded-[8px] bg-white h-[40px] disabled:bg-gray-100 "
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
                    disabled={true}
                    placeholder="Enter alt Mobile Name"
                    value={formData.altMobile}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[40px] disabled:bg-gray-100 "
                  />
                </div>
              </div>
              <div className="flex gap-5 mt-2">
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">
                      Co-Borrower Id
                    </label>
                  </div>

                  <input
                    type="text"
                    // placeholder="Co-Borrower"
                    name="CoBorrowerID"
                    disabled={true}
                    value={formData.CoBorrowerID}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 w-[120px] rounded-[8px] bg-white h-[40px] disabled:bg-gray-100 "
                  />
                </div>
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">
                      Co-Borrower Relation
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Co-Borrower"
                    name="CoBorrowerRelation"
                    // disabled={true}
                    value={formData.CoBorrowerRelation}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2  w-[150px] rounded-[8px] bg-white h-[40px] disabled:bg-gray-100 "
                  />
                </div>
                <div className="">
                  <p> Borrower Address</p>
                  <textarea
                    name="borrowerAddress"
                    disabled={true}
                    value={formData.borrowerAddress}
                    onChange={handleInputChange}
                    className="border w-[400px] h-[40px] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white border-gray-300 disabled:bg-gray-100 "
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="">
                  <div>
                    <label className="text-[14px] font-medium">
                      Nominee<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Nominee"
                    disabled={true}
                    name="Nominee_Name"
                    value={formData.Nominee_Name}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white h-[38px]
                    disabled:bg-gray-100 "
                  />
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
                      disabled={true}
                      value={formData.NomineeRelation}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-3 py-2 mt-1 w-[120px] rounded-[8px] bg-white h-[38px]
                      disabled:bg-gray-100 "
                    />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex gap-10 text-xs">
              <div>
                <div>
                  <p className="font bold text-[15px]">Borrower Details</p>
                </div>
                <div className="border w-[296px] h-[125px] p-2  overflow-auto">
                  <p className="text-gray-400">
                    {selectedCustomer?.printName}{" "}
                  </p>
                  <p className="text-gray-400 mt-1">
                    {selectedCustomer?.mobile}
                    {selectedCustomer?.altMobile && "/"}
                    {selectedCustomer?.altMobile}
                  </p>
                  <p className="text-gray-400 mt-1">
                    {selectedCustomer?.Permanent_Address}
                  </p>
                  <p className="text-gray-400 mt-1">
                    {selectedCustomer?.Nominee_NomineeName}
                  </p>
                  <p className="text-gray-400 mt-1">
                    {selectedCustomer?.Nominee_Relation}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p className="font bold text-[15px]">Borrower Details</p>
                </div>
                <div className="border w-[296px] h-[125px] p-2 overflow-auto">
                  <p className="text-gray-400">
                    {selectedCoBorrower?.printName}{" "}
                  </p>
                  <p className="text-gray-400 mt-1">
                    {selectedCoBorrower?.mobile}
                    {selectedCoBorrower?.altMobile && "/"}
                    {selectedCoBorrower?.altMobile}
                  </p>
                  <p className="text-gray-400 mt-1">
                    {selectedCoBorrower?.Permanent_Address}
                  </p>
                  <p className="text-gray-400 mt-1">
                    {selectedCoBorrower?.Nominee_NomineeName}
                  </p>
                  <p className="text-gray-400 mt-1">
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
                  className="relative cursor-pointer w-[110px] h-[80px]"
                  onClick={() => fileInputRef.current.click()}
                >
                  {/* Image with a simple hover effect */}
                  <img
                    src={
                      formData.OrnamentPhoto
                        ? formData.OrnamentPhoto
                        : profileempty
                    }
                    alt="Ornament"
                    className="w-full h-full object-cover rounded-[8px] border border-gray-300 hover:brightness-90 transition-all"
                  />

                  {/* Pencil Icon Overlay - Placed exactly at the corner */}
                  <div className="absolute -bottom-1 -right-1 bg-[#0A2478] text-white p-1.5 rounded-full shadow-md border-2 border-white flex items-center justify-center">
                    <MdEdit size={14} />
                  </div>
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

                  {!image ? (
                    /* The Upload Button - Shows when 'image' is null */
                    <div
                      onClick={triggerUpload}
                      className="mt-2 border w-[100px] h-[20px] rounded-[8px] flex items-center justify-center bg-[#0A2478] text-white cursor-pointer hover:opacity-90"
                    >
                      <span className="text-white text-xs">Upload</span>
                    </div>
                  ) : (
                    /* The Preview - Shows once an image is selected */
                    <div
                      className="mt-2 cursor-pointer group relative"
                      onClick={triggerUpload}
                    >
                      <img
                        src={image}
                        alt="Preview"
                        className="w-[100px] h-[20px] object-cover rounded-[8px] border"
                      />
                      {/* Hover overlay to indicate 'Click to Update' */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-[8px] transition-opacity">
                        <span className="text-white text-[10px]">Change</span>
                      </div>
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

                {/* <div className="mt-2 w-[100px] h-[20px] border flex items-center justify-center bg-white ">
                  {formData.CoBorrower_signature ? (
                    <img
                      src={formData.CoBorrower_signature}
                      alt="Co-Borrower Signature"
                      className="max-h-[31px] object-contain"
                    />
                  ) : (
                    <p className="text-gray-400 text-xs">No signature</p>
                  )}
                </div> */}

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
              </div>
            </div>
          </div>
        </div>

        <div className=" gap-10    bg-[#F7F7FF]   w-[1462px]">
          {selectedScheme?.product === "Gold" && (
            <>
              <div className="flex gap-2  mt-2 ">
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
              <div className="flex gap-2 mt-2 ">
                <PledgeItemListSilver
                  rows={PledgeItem}
                  setRows={setPledgeItem}
                  selectedScheme={selectedScheme}
                />
              </div>
            </>
          )}

          <div className="flex gap-2 mt-2 p-1">
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
                }}
                className="border border-gray-300 px-1 py-1 w-[129px] text-xs rounded-[8px] h-[30px] bg-white  mt-1"
              />
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
              <p className="text-[14px] font-medium">Net Payable</p>
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
                className="border border-gray-300 rounded-[8px] px-3 text-xs h-[30px] mt-1 bg-white w-[150px]"
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
                className="border border-gray-300 rounded-[8px] px-3 text-xs h-[30px] mt-1 w-[150px] bg-white"
              >
                <option value="">Select valuer 2</option>
                {activeEmployees.map((emp) => (
                  <option key={emp.id} value={emp.emp_name}>
                    {emp.emp_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Pay Date<span className="text-red-500">*</span>
                </label>
              </div>

              <input
                type="date"
                name="payDate"
                value={formData.payDate}
                onChange={handleInputChange}
                min={minDate} // today
                max={maxDate} // today + 60 days
                className="border border-gray-300 px-3 text-xs h-[30px] mt-1 w-[136px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div className="flex gap-10 mb-2">
            <p className=" text-xs">
              {numberToWords(Number(formData.Loan_amount) || 0)}
            </p>
          </div>
        </div>
        <div className="flex mb-10  w-[1462px] bg-[#FFE6E6]">
          <div
            className="flex gap-18   
 p-2"
          >
            <div className="flex ">
              <div className="">
                <h3 className="font-semibold  text-blue-900 text-lg">
                  Scheme Details
                </h3>

                <table className="border border-gray-300 text-xs ">
                  <thead className="bg-[#0A2478] text-white">
                    <tr>
                      <th className=" py-1 border-r border-gray-200 w-[224px]">
                        Loan Tenure (Days)
                      </th>
                      <th className="py-1 border-r border-gray-200 w-[173px]">
                        Min Loan
                      </th>
                      <th className=" py-1 border-r border-gray-200 w-[195px]">
                        Max Loan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-xs">
                    <tr className={"bg-gray-50"}>
                      <td className="px-2 py-1 border border-[#4A4A4A38]">
                        {selectedScheme?.loanPeriod}
                      </td>
                      <td className="px-2 py-1 border border-[#4A4A4A38]">
                        {selectedScheme?.minLoanAmount}
                      </td>
                      <td className="px-2 py-1 border border-[#4A4A4A38]">
                        {selectedScheme?.maxLoanAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                          className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
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
                                src={`${API}/uploadDoc/bank_documents/${b.cancelCheque}`}
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
                    {loanData?.map((l, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-4 py-2">{l.id}</td>
                        <td className="px-4 py-2">
                          {new Date(l.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                          ₹{Number(l.Loan_amount).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">{l.Scheme}</td>
                        <td className="px-4 py-2">{l.InterestPaidUpto}</td>
                        <td className="px-4 py-2">
                          ₹{l.InterestDueAmount || 0}
                        </td>
                        <td className="px-4 py-2">
                          ₹{Number(l.LoanPendingAmount || 0).toLocaleString()}
                        </td>
                        <td
                          className={`px-4 py-2 font-semibold ${
                            l.status === "Closed"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {l.status}
                        </td>
                        <td className="px-4 py-2">
                          {l.Ornament_Photo ? (
                            <img
                              src={`https://slfuatbackend.1on1screen.com/uploads/ornaments/${l.Ornament_Photo}`}
                              alt="Ornament"
                              className="w-[80px] h-[45px] object-cover border rounded"
                            />
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
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
      </div>
    </div>
  );
};

export default EditLoanApplication;
