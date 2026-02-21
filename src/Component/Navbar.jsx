// // src/components/Navbar.jsx
// import { useEffect, useRef, useState } from "react";
// import {
//   FiChevronDown,
//   FiChevronRight,
//   FiChevronUp,
//   FiLogOut,
// } from "react-icons/fi";
// import { TfiReload } from "react-icons/tfi";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [isBranchModelOpen, setIsBranchModelOpen] = useState(false);
//   const [selectedBranch, setSelectedBranch] = useState("Nashik Road"); // default branch
//   const [selectedYear, setSelectedYear] = useState("2025");

//   // Temporary states for modal selection before confirming
//   const [tempBranch, setTempBranch] = useState("");
//   const [tempYear, setTempYear] = useState("");

//   const handleOk = () => {
//     if (tempBranch) setSelectedBranch(tempBranch);
//     if (tempYear) setSelectedYear(tempYear);
//     setIsBranchModelOpen(false);
//   };
//   // Masters
//   const [isMasterOpen, setIsMasterOpen] = useState(false);
//   const [isReportsOpen, setIsReportsOpen] = useState(false);
//   const [isMiscellaneous, setIsMiscellaneous] = useState(false);
//   const [isMasterProfileOpen, setIsMasterProfileOpen] = useState(false);
//   const [isReportsTransaction, setIsReportsTransaction] = useState(false);
//   const [isCashBankFinancialReport, setIsCashBankFinancialReport] =
//     useState(false);
//   const [ismisReports, setIsMisReports] = useState(false);
//   const [isMasterSchemeMaster, setIsMasterSchemeMaster] = useState(false);
//   const [isMasterSchemeEmployeeProfile, setIsMasterSchemeEmployeeProfile] =
//     useState(false);
//   const [isMasterSchemeUserManagement, setIsMasterSchemeUserManagement] =
//     useState(false);

//   // Transactions
//   const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
//   const [isGoldLoanOpen, setIsGoldLoanOpen] = useState(false);
//   const [Accounting, setIsAccounting] = useState(false);
//   const [isAuctionOpen, setIsAuctionOpen] = useState(false);

//   // Tools/Utilities
//   const [isToolsOpen, setIsToolsOpen] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [isSystemTools, setIsSystemTools] = useState(false);

//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   function convertPermissions(permissions) {
//     const result = {};

//     if (!permissions || typeof permissions !== "object") return result;

//     Object.keys(permissions)?.forEach((section) => {
//       // ensure section is an array
//       if (!Array.isArray(permissions[section])) return;

//       result[section] = {};

//       permissions[section].forEach((item) => {
//         result[section][item.name] = {
//           view: item.view,
//           add: item.add,
//           edit: item.edit,
//           delete: item.delete,
//           approve: item.approve,
//         };
//       });
//     });

//     return result;
//   }

//   const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

//   // If Admin → FULL ACCESS
//   if (userData.isAdmin || userData.permissions === "all") {
//     window.userIsAdmin = true;
//     // Skip conversion
//     console.log("ADMIN → FULL ACCESS ENABLED");
//   } else {
//     window.userIsAdmin = false;

//     // Convert array-based permissions → object format
//     userData.permissions = convertPermissions(userData.permissions);
//   }

//   const userPermissions = userData.permissions || {};

//   console.log("Converted Permissions", userPermissions);

//   // ✅ Close all dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsMasterOpen(false);
//         setIsMasterProfileOpen(false);
//         setIsMasterSchemeMaster(false);
//         setIsMasterSchemeEmployeeProfile(false);
//         setIsMasterSchemeUserManagement(false);
//         setIsTransactionsOpen(false);
//         setIsGoldLoanOpen(false);
//         setIsToolsOpen(false);
//         setIsSettingsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.clear(); // remove all saved data
//     window.location.href = "/login"; // redirect to login
//   };

//   const isAdmin = window.userIsAdmin;

//   const masterPermissions = isAdmin ? "all" : userPermissions.Master || {};
//   const TrasactionPermissions = isAdmin
//     ? "all"
//     : userPermissions.Transaction || {};

//   const canSeeMaster = isAdmin
//     ? true
//     : Object.values(masterPermissions).some((p) => p.view === true);

//   const canSeeScheme = isAdmin
//     ? true
//     : Object.values(TrasactionPermissions).some((p) => p.view === true);

//   const masterProfileItems = [
//     "Account Group",
//     "Account Code",
//     "Branch Details",
//     "Item Profile",
//     "Product Purity Profile",
//     "Document Proof",
//     "Push Gold Rate",
//     "Charges Profile",
//     "Area",
//   ];

//   const canSeeMasterProfile = isAdmin
//     ? true
//     : masterProfileItems.some((name) => masterPermissions[name]?.view === true);

//   console.log(canSeeMasterProfile, "canSeeMasterProfile");

//   const masterProfileList = [
//     { name: "Ledger", path: "/account-groups" },
//     { name: "Sub Ledger ", path: "/account-code-list" },
//     { name: "Branch Details", path: "/Branch-Profile-List" },
//     { name: "Item Profile", path: "/Item-Profile-List" },
//     { name: "Product Purity", path: "/Product-Purity" },
//     { name: "Document Proof", path: "/Document-Proof-List" },
//     { name: "Push Rate", path: "/Push-Rate-List" },
//     { name: "Charges Profile", path: "/Charges-Profile-List" },
//     { name: "Area", path: "/Area" },
//   ];
//   const masterMiscellaneousList = [
//     // { name: "Cash Balance", path: "/Cash_Balance" },
//     // { name: "Print Cash Balance", path: "/Print_Cash_Balance" },
//     { name: "Application Setting", path: "/Application_Setting" },
//     { name: "Bank Branch Mapping", path: "/Bank_Branch_Mapping" },
//     { name: "Accounts Opening Balance", path: "/Accounts_Opening_Balance" },
//     // { name: "Sub Ledger Opening Balance", path: "/Sub_Ledger_Opening_Balance" },
//   ];

//   const ReportTrasaction = [
//     { name: "Loan Application History", path: "/loan_application_history" },
//     { name: "Interest Due Report", path: "/interest_due_report" },
//     { name: "Outstanding Amount Report", path: "/outstanding_amount_report" },
//     { name: "Interest Collection Report", path: "/interest_collection_report" },
//     { name: "Loan Ledger", path: "/loan-ledger" },
//     { name: "Loan Cancellation Report", path: "/loan-cancellation-report" },
//     { name: "Gold Stock Report", path: "/gold_stock_report" },
//     { name: "Loan Risk Report", path: "/loan-risk-report" },
//     { name: "Loan Statement", path: "/loan-statement" },
//     { name: "NPA Report", path: "/npa-report" },
//     { name: "Loan Details", path: "/loan-details" },
//     { name: "Legal Notice Report", path: "/legal-notice-report" },
//   ];
//   const filteredMasterProfile = isAdmin
//     ? masterProfileList
//     : masterProfileList.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );
//   const filteredReporttrasaction = isAdmin
//     ? ReportTrasaction
//     : ReportTrasaction.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );
//   const filteredMiscellaneousrasaction = isAdmin
//     ? masterMiscellaneousList
//     : masterMiscellaneousList.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );
//   const schemeMasterItems = [
//     { name: "Scheme Details", path: "/Scheme-Details-List" },
//     { name: "Scheme Branch Mapping", path: "/Branch-Scheme-Mapping-List" },
//   ];
//   const cashBankFinancialReport = [
//     { name: "Bank Book Report", path: "/Bank-Book-Report" },
//     // { name: "Cash Book Report", path: "/Cash-Book-Report" },
//     { name: "Day Book Report", path: "/Day-Book-Report" },
//     { name: "Trial Balance", path: "/Trial-Balance" },
//     { name: "Customer Ledger", path: "/Customer-Ledger" },
//     { name: "Ledger Report", path: "/Ledger-Report" },
//     { name: "Balance Sheet", path: "/Balance_Sheet" },
//     { name: "Profit & Loss Report", path: "/Profit_Loss_Report" },
//     { name: "Payment/Receipt Report", path: "/Payment_Receipt_Report" },
//     { name: "Fund Transfer Report", path: "/Fund_Transfer_Report" },
//   ];

//   const misreporttab = [
//     { name: "Loan Risk managment [Margin]", path: "/Loan_Risk_managment" },
//     { name: "Customer List", path: "/Customer_list" },
//     { name: "Branch Loan Report", path: "/Branch_Loan_Report" },
//     { name: "Loan Repay Register", path: "/Loan_Repay_Register" },
//     { name: "Consumer Report", path: "/Consumer_Report" },
//     { name: "Value Wise Loan Report", path: "/Value_Wise_Loan_Report" },
//   ];
//   const filteredSchemeMaster = isAdmin
//     ? schemeMasterItems
//     : schemeMasterItems.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );
//   const cashfinancialreport = isAdmin
//     ? cashBankFinancialReport
//     : cashBankFinancialReport.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );

//   const misreportsection = isAdmin
//     ? misreporttab
//     : misreporttab.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );

//   const canSeeSchemeMaster = filteredSchemeMaster.length > 0;

//   const employeeProfileItems = [
//     { name: "Employee Profile", path: "/Employee-Profile-list" },
//     // { name: "Member Login Period", path: "/Member-Login-Period" },
//     // { name: "Member Login Details", path: "/Member-Login-Details" },
//     { name: "Member Details", path: "/Member-Details" },
//     { name: "Employee Attendance", path: "/Employee-Attendance" },
//     { name: "Employee Designation", path: "/Employee-Designation" },
//   ];

//   const filteredEmployeeProfile = isAdmin
//     ? employeeProfileItems
//     : employeeProfileItems.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );

//   const canSeeEmployeeProfile = filteredEmployeeProfile.length > 0;

//   const userManagementItems = [
//     { name: "User Role Permission", path: "/User-Role-Permission" },
//     { name: "Member Branch Mapping", path: "/Member-Branch-Mapping" },
//   ];

//   const filteredUserManagement = isAdmin
//     ? userManagementItems
//     : userManagementItems.filter(
//         (item) => masterPermissions[item.name]?.view === true,
//       );

//   const canSeeUserManagement = filteredUserManagement.length > 0;

//   const loanItems = [
//     { name: "Loan Application", path: "/Loan-Application" },
//     { name: "Loan Charges List", path: "/Loan-Charges-List" },
//   ];

//   const AccountingItems = [
//     { name: "Expences", path: "/PaymentVoucher" },
//     { name: "Receipt", path: "/ReceiptVoucher/List" },
//     { name: "Journal", path: "/JournalVoucher/List" },
//     { name: "FT Issue", path: "/FundTransfer/issue" },
//     { name: "FT Receipt", path: "/FundTransfer/receipt" },
//   ];

//   const customerProfileItem = {
//     name: "Customer Profile",
//     path: "/Customer-Profile-List",
//   };

//   const auctionItems = [
//     { name: "Auction Creation", path: "/Auction-Creation" },
//     { name: "Bidder Registration", path: "/Bidder-Registration-List" },
//     { name: "Auction Application", path: "/Auction_Application_form" },
//     { name: "Credit Note", path: "/Credit-Note" },
//   ];

//   const filteredLoan = isAdmin
//     ? loanItems
//     : loanItems.filter(
//         (item) => TrasactionPermissions[item.name]?.view === true,
//       );
//   const filteredAccounting = isAdmin
//     ? AccountingItems
//     : AccountingItems.filter(
//         (item) => TrasactionPermissions[item.name]?.view === true,
//       );
//   const canSeeLoan = filteredLoan.length > 0;

//   const canSeeCustomerProfile = isAdmin
//     ? true
//     : TrasactionPermissions["Customer Profile"]?.view === true;

//   const filteredAuction = isAdmin
//     ? auctionItems
//     : auctionItems.filter(
//         (item) => TrasactionPermissions[item.name]?.view === true,
//       );

//   const canSeeAuction = filteredAuction.length > 0;

//   const canSeeTransactions =
//     canSeeLoan || canSeeCustomerProfile || canSeeAuction;

//   return (
//     <div className="flex justify-center sticky top-0 z-50 bg-transparent">
//       <div className="bg-[#0A2478] text-white flex items-center justify-between relative mt-5 p-5 w-[1460px] h-[50px] rounded-[10px]">
//         {/* Left side placeholder */}
//         <div className="flex items-center gap-3">
//   <Link to="/">
//     <img
//       src="/logo.svg"
//       alt="Logo"
//       className="w-12 h-12 object-contain cursor-pointer"
//     />
//   </Link>
// </div>

//         {/* ===== Center Menu ===== */}
//         <div
//           className="absolute left-1/2 transform -translate-x-1/2 flex gap-8"
//           ref={dropdownRef}
//         >
//           {/* ================== MASTERS ================== */}
//           <div className="relative">
//             {canSeeMaster && (
//               <button
//                 className="hover:underline text-[20px] flex items-center gap-1"
//                 onClick={() => {
//                   setIsMasterOpen(!isMasterOpen);
//                   setIsTransactionsOpen(false);
//                   setIsToolsOpen(false);
//                 }}
//               >
//                 Masters
//                 {isMasterOpen ? <FiChevronUp /> : <FiChevronDown />}
//               </button>
//             )}

//             {isMasterOpen && (
//               <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
//                 {/* Master Profile */}
//                 <div className="relative">
//                   {canSeeMasterProfile && (
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         setIsMasterProfileOpen(!isMasterProfileOpen);
//                         setIsMasterSchemeMaster(false);
//                         setIsMasterSchemeEmployeeProfile(false);
//                         setIsMasterSchemeUserManagement(false);
//                       }}
//                     >
//                       Master Profile
//                       {isMasterProfileOpen ? (
//                         <FiChevronDown />
//                       ) : (
//                         <FiChevronRight />
//                       )}
//                     </button>
//                   )}

//                   {isMasterProfileOpen && (
//                     <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
//                       {filteredMasterProfile.map((item) => (
//                         <Link
//                           key={item.path}
//                           to={item.path}
//                           className="px-4 py-2 hover:bg-gray-100"
//                           onClick={() => setIsMasterOpen(false)}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Scheme Master */}
//                 <div className="relative">
//                   {canSeeSchemeMaster && (
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         setIsMasterSchemeMaster(!isMasterSchemeMaster);
//                         setIsMasterProfileOpen(false);
//                         setIsMasterSchemeEmployeeProfile(false);
//                         setIsMasterSchemeUserManagement(false);
//                       }}
//                     >
//                       Scheme Master
//                       {isMasterSchemeMaster ? (
//                         <FiChevronDown />
//                       ) : (
//                         <FiChevronRight />
//                       )}
//                     </button>
//                   )}

//                   {isMasterSchemeMaster && canSeeSchemeMaster && (
//                     <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
//                       {filteredSchemeMaster.map((item) => (
//                         <Link
//                           key={item.path}
//                           to={item.path}
//                           className="px-4 py-2 hover:bg-gray-100 text-sm"
//                           onClick={() => setIsMasterOpen(false)}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Employee Profile */}
//                 <div className="relative">
//                   {canSeeEmployeeProfile && (
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         setIsMasterSchemeEmployeeProfile(
//                           !isMasterSchemeEmployeeProfile,
//                         );
//                         setIsMasterProfileOpen(false);
//                         setIsMasterSchemeMaster(false);
//                         setIsMasterSchemeUserManagement(false);
//                       }}
//                     >
//                       Employee Profile
//                       {isMasterSchemeEmployeeProfile ? (
//                         <FiChevronDown className="inline-block" />
//                       ) : (
//                         <FiChevronRight className="inline-block" />
//                       )}
//                     </button>
//                   )}

//                   {isMasterSchemeEmployeeProfile && canSeeEmployeeProfile && (
//                     <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
//                       {filteredEmployeeProfile.map((item) => (
//                         <Link
//                           key={item.path}
//                           to={item.path}
//                           className="px-4 py-2 hover:bg-gray-100 text-sm"
//                           onClick={() => setIsMasterOpen(false)}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* User Management */}
//                 <div className="relative">
//                   {canSeeUserManagement && (
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         setIsMasterSchemeUserManagement(
//                           !isMasterSchemeUserManagement,
//                         );
//                         setIsMasterProfileOpen(false);
//                         setIsMasterSchemeMaster(false);
//                         setIsMasterSchemeEmployeeProfile(false);
//                       }}
//                     >
//                       User Management
//                       {isMasterSchemeUserManagement ? (
//                         <FiChevronDown className="inline-block" />
//                       ) : (
//                         <FiChevronRight className="inline-block" />
//                       )}
//                     </button>
//                   )}

//                   {isMasterSchemeUserManagement && canSeeUserManagement && (
//                     <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
//                       {filteredUserManagement.map((item) => (
//                         <Link
//                           key={item.path}
//                           to={item.path}
//                           className="px-4 py-2 hover:bg-gray-100 text-sm"
//                           onClick={() => setIsMasterOpen(false)}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ================== TRANSACTIONS ================== */}
//           <div className="relative">
//             {canSeeScheme && (
//               <button
//                 className="hover:underline text-[20px] flex items-center gap-1"
//                 onClick={() => {
//                   setIsTransactionsOpen(!isTransactionsOpen);
//                   setIsMasterOpen(false);
//                   setIsToolsOpen(false);
//                 }}
//               >
//                 Transactions
//                 {isTransactionsOpen ? (
//                   <FiChevronUp className="inline-block" />
//                 ) : (
//                   <FiChevronDown className="inline-block" />
//                 )}
//               </button>
//             )}

//             {isTransactionsOpen && canSeeTransactions && (
//               <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
//                 {/* 🔹 Loan Section */}
//                 {canSeeLoan && (
//                   <div className="relative">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         setIsGoldLoanOpen(!isGoldLoanOpen);
//                         setIsAuctionOpen(false);
//                       }}
//                     >
//                       Loan
//                       {isGoldLoanOpen ? <FiChevronDown /> : <FiChevronRight />}
//                     </button>

//                     {isGoldLoanOpen && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1 z-50 text-sm">
//                         {filteredLoan.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="px-4 py-2 hover:bg-gray-100 text-left"
//                             onClick={() => {
//                               setIsTransactionsOpen(false);
//                               setIsGoldLoanOpen(false);
//                             }}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* 🔹 Customer Profile */}
//                 {canSeeCustomerProfile && (
//                   <Link
//                     to={customerProfileItem.path}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center "
//                     onClick={() => {
//                       setIsTransactionsOpen(false);
//                       setIsGoldLoanOpen(false);
//                       setIsAuctionOpen(false);
//                     }}
//                   >
//                     <span>Customer Profile</span>
//                   </Link>
//                 )}
//                 {canSeeLoan && (
//                   <div className="relative">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         setIsAccounting(!Accounting);
//                         setIsAuctionOpen(false);
//                         // setIsTransactionsOpen(false);
//                         setIsGoldLoanOpen(false);
//                       }}
//                     >
//                       Accounting
//                       {Accounting ? <FiChevronDown /> : <FiChevronRight />}
//                     </button>

//                     {/* {Accounting && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1 z-50 text-sm">
//                         {filteredAccounting.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="px-4 py-2 hover:bg-gray-100 text-left"
//                             onClick={() => {
//                               setIsTransactionsOpen(false);
//                               setIsGoldLoanOpen(false);
//                             }}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )} */}
//                     {Accounting && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col z-50 text-[13px] border border-gray-200">
//                         {filteredAccounting.map((item) => (
//                           <div key={item.name} className="relative group/fund">
//                             <Link
//                               to={item.path}
//                               className="px-4 py-1.5 hover:bg-[#0D3082] hover:text-white text-left transition-colors border-b border-gray-100 last:border-0 flex justify-between items-center"
//                               onClick={() => {
//                                 setIsTransactionsOpen(false);
//                               }}
//                             >
//                               {item.name}
//                               {/* Arrow indicator for items with sub-menus like Fund Transfer */}
//                               {/* {item.name === "Fund Transfer" && (
//                                 <span className="text-[10px]">▶</span>
//                               )} */}
//                             </Link>

//                             {/* 3rd Level Dropdown for Issue/Receipt */}
//                             {/* {item.name === "Fund Transfer" && (
//                               <div className="absolute top-0 left-full ml-1 w-[150px] bg-white text-black rounded shadow-lg hidden group-hover/fund:flex flex-col border border-gray-200">
//                                 <Link
//                                   to="/FundTransfer/issue"
//                                   className="px-4 py-2 hover:bg-gray-100 border-b border-gray-50 text-left"
//                                   onClick={() => {
//                                     setIsTransactionsOpen(false);
//                                     // setAccounting(false);
//                                   }}
//                                 >
//                                   Issue
//                                 </Link>
//                                 <Link
//                                   to="/FundTransfer/receipt"
//                                   className="px-4 py-2 hover:bg-gray-100 text-left"
//                                   onClick={() => {
//                                     setIsTransactionsOpen(false);
//                                     // setAccounting(false);
//                                   }}
//                                 >
//                                   Receipt
//                                 </Link>
//                               </div>
//                             )} */}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 {/* 🔹 Auction */}
//                 {canSeeAuction && (
//                   <div className="relative mt-1 ">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         setIsAuctionOpen(!isAuctionOpen);
//                         setIsGoldLoanOpen(false);
//                       }}
//                     >
//                       Auction
//                       {isAuctionOpen ? <FiChevronDown /> : <FiChevronRight />}
//                     </button>

//                     {isAuctionOpen && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1 z-50">
//                         {filteredAuction.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="px-4 py-2 hover:bg-gray-100 text-left"
//                             onClick={() => {
//                               setIsTransactionsOpen(false);
//                               setIsAuctionOpen(false);
//                             }}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <Link
//                   to={"/Cash_Balance"}
//                   className="w-full  text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                   onClick={() => {
//                     setIsAccounting(!Accounting);
//                     setIsAuctionOpen(false);
//                     setIsTransactionsOpen(false);
//                     setIsGoldLoanOpen(false);
//                   }}
//                 >
//                   Cash Balance
//                   {/* {Accounting ? <FiChevronDown /> : <FiChevronRight />} */}
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* ================== OTHER BUTTONS ================== */}
//           {/* <button className="hover:underline text-[20px]">Miscellaneous</button> */}
//           {/* <button className="hover:underline text-[20px]">Reports</button> */}

//           {/* <div className="relative">
//             <button
//               className="hover:underline text-[20px] flex items-center gap-1"
//               onClick={() => {
//                 setIsMiscellaneous(!isMiscellaneous);
//                 setIsMasterOpen(false);
//                 setIsTransactionsOpen(false);
//                 setIsToolsOpen(false);
//               }}
//             >
//               Miscellaneous
//               {isMiscellaneous ? <FiChevronUp /> : <FiChevronDown />}
//             </button>
//             {isMiscellaneous && (
//               <>
//                 <div  className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">

//                     {isMiscellaneous && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
//                         {filteredMiscellaneousrasaction.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="px-4 py-2 hover:bg-gray-100"
//                             onClick={() => setIsMasterOpen(false)}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}

//                 </div>
//               </>
//             )}
//           </div> */}
//           <div className="relative">
//             <button
//               className="hover:underline text-[20px] flex items-center gap-1"
//               onClick={() => {
//                 setIsMiscellaneous((prev) => !prev);
//                 setIsMasterOpen(false);
//                 setIsTransactionsOpen(false);
//                 setIsToolsOpen(false);
//               }}
//             >
//               Miscellaneous
//               {isMiscellaneous ? <FiChevronUp /> : <FiChevronDown />}
//             </button>

//             {isMiscellaneous && (
//               <div className="absolute top-full left-0 mt-2 w-[200px] bg-white text-black rounded shadow-lg z-50">
//                 {filteredMiscellaneousrasaction.map((item) => (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     className="block px-4 py-2 text-sm hover:bg-gray-100"
//                     onClick={() => setIsMiscellaneous(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative">
//             <button
//               className="hover:underline text-[20px] flex items-center gap-1"
//               onClick={() => {
//                 setIsReportsOpen(!isReportsOpen);
//                 setIsMasterOpen(false);
//                 setIsTransactionsOpen(false);
//                 setIsToolsOpen(false);
//               }}
//             >
//               Reports
//               {isReportsOpen ? <FiChevronUp /> : <FiChevronDown />}
//             </button>
//             {isReportsOpen && (
//               <>
//                 <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
//                   {/* Master Profile */}
//                   <div className="relative">
//                     {canSeeMasterProfile && (
//                       <button
//                         className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                         onClick={() => {
//                           setIsMasterProfileOpen(!isMasterProfileOpen);
//                           setIsMasterSchemeMaster(false);
//                           setIsReportsTransaction(!isReportsTransaction);
//                           setIsMasterSchemeEmployeeProfile(false);
//                           setIsMasterSchemeUserManagement(false);
//                         }}
//                       >
//                         Trasaction Reports
//                         {isReportsTransaction ? (
//                           <FiChevronDown />
//                         ) : (
//                           <FiChevronRight />
//                         )}
//                       </button>
//                     )}

//                     {isReportsTransaction && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
//                         {filteredReporttrasaction.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="px-4 py-2 hover:bg-gray-100"
//                             onClick={() => setIsMasterOpen(false)}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <div className="relative">
//                     {canSeeSchemeMaster && (
//                       <button
//                         className=" w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                         onClick={() => {
//                           // setIsMasterSchemeMaster(!isMasterSchemeMaster);
//                           // setIsMasterProfileOpen(false);
//                           // setIsMasterSchemeEmployeeProfile(false);
//                           // setIsMasterSchemeUserManagement(false);
//                           setIsCashBankFinancialReport(
//                             !isCashBankFinancialReport,
//                           );
//                         }}
//                       >
//                         Cash/Bank/Financial Report
//                         {isCashBankFinancialReport ? (
//                           <FiChevronDown />
//                         ) : (
//                           <FiChevronRight />
//                         )}
//                       </button>
//                     )}

//                     {isCashBankFinancialReport && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
//                         {cashfinancialreport.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="px-4 py-2 hover:bg-gray-100 text-sm"
//                             onClick={() => setIsMasterOpen(false)}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   <div className="relative">
//                     {canSeeSchemeMaster && (
//                       <button
//                         className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                         onClick={() => {
//                           // setIsMasterSchemeMaster(!isMasterSchemeMaster);
//                           // setIsMasterProfileOpen(false);
//                           // setIsMasterSchemeEmployeeProfile(false);
//                           // setIsMasterSchemeUserManagement(false);
//                           setIsMisReports(!ismisReports);
//                         }}
//                       >
//                         MIS Report
//                         {ismisReports ? <FiChevronDown /> : <FiChevronRight />}
//                       </button>
//                     )}

//                     {ismisReports && (
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
//                         {misreportsection.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="px-4 py-2 hover:bg-gray-100 text-sm"
//                             onClick={() => setIsMasterOpen(false)}
//                           >
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         // setIsCashBankFinancialReport(
//                         //   !isCashBankFinancialReport,
//                         // );
//                         navigate("/loan_follow_up");
//                       }}
//                     >
//                       Loan Follow Up
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         // setIsCashBankFinancialReport(
//                         //   !isCashBankFinancialReport,
//                         // );
//                         navigate("/Customer_history");
//                       }}
//                     >
//                       Customer History
//                     </button>
//                   </div>

//                   <div className="relative">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         // setIsCashBankFinancialReport(
//                         //   !isCashBankFinancialReport,
//                         // );
//                         navigate("/paymentgetway_history");
//                       }}
//                     >
//                       PaymentGetWay History
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <button
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                       onClick={() => {
//                         // setIsCashBankFinancialReport(
//                         //   !isCashBankFinancialReport,
//                         // );
//                         navigate("/Employee-payroll");
//                       }}
//                     >
//                       Employee PayRoll Report
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* ================== TOOLS/UTILITIES ================== */}
//           <div className="relative">
//             <button
//               className="hover:underline text-[20px] flex items-center gap-1"
//               onClick={() => {
//                 setIsToolsOpen(!isToolsOpen);
//                 setIsMasterOpen(false);
//                 setIsTransactionsOpen(false);
//               }}
//             >
//               Tools / Utilities
//               {isToolsOpen ? <FiChevronUp /> : <FiChevronDown />}
//             </button>

//             {isToolsOpen && (
//               <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[220px] z-50">
//                 {/* Settings Submenu */}
//                 <div className="relative">
//                   <button
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                     onClick={() => setIsSettingsOpen(!isSettingsOpen)}
//                   >
//                     <div className="flex items-center gap-2">Settings</div>
//                     {isSettingsOpen ? <FiChevronDown /> : <FiChevronRight />}
//                   </button>

//                   {isSettingsOpen && (
//                     <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col z-50">
//                       <Link
//                         to="/Gress-Period"
//                         className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
//                         onClick={() => {
//                           setIsToolsOpen(false);
//                           setIsSettingsOpen(false);
//                         }}
//                       >
//                         GressPeriod
//                       </Link>
//                       {/* You can add more settings items here */}
//                       {/* <Link
//                         to="/another-setting"
//                         className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
//                         onClick={() => {
//                           setIsToolsOpen(false);
//                           setIsSettingsOpen(false);
//                         }}
//                       >
//                         Another Setting
//                       </Link> */}
//                     </div>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <button
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
//                     onClick={() => setIsSystemTools(!isSystemTools)}
//                   >
//                     <div className="flex items-center gap-2">System tools</div>
//                     {isSystemTools ? <FiChevronDown /> : <FiChevronRight />}
//                   </button>

//                   {isSystemTools && (
//                     <>
//                       <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col z-50">
//                         <Link
//                           to="/SmsConfig/Create"
//                           className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
//                           onClick={() => {
//                             setIsToolsOpen(false);
//                             setIsSettingsOpen(false);
//                             setIsSystemTools(false);
//                           }}
//                         >
//                           SMS Config
//                         </Link>
//                         <Link
//                           to="/WhatsApp-Configuration"
//                           className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
//                           onClick={() => {
//                             setIsToolsOpen(false);
//                             setIsSettingsOpen(false);
//                             setIsSystemTools(false);
//                           }}
//                         >
//                           WhatsApp Config
//                         </Link>
//                         <Link
//                           to="/DBBackup"
//                           className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
//                           onClick={() => {
//                             setIsToolsOpen(false);
//                             setIsSettingsOpen(false);
//                             setIsSystemTools(false);
//                           }}
//                         >
//                           Backup utility
//                         </Link>

//                         {/* You can add more settings items here */}
//                         {/* <Link
//                         to="/another-setting"
//                         className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
//                         onClick={() => {
//                           setIsToolsOpen(false);
//                           setIsSettingsOpen(false);
//                         }}
//                       >
//                         Another Setting
//                       </Link> */}
//                       </div>
//                     </>
//                   )}
//                 </div>
//                 {/* You can add more Tools/Utilities items here */}
//                 <Link
//                   to="/Bank_Details"
//                   className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
//                   onClick={() => {
//                     setIsToolsOpen(false);
//                     setIsSettingsOpen(false);
//                     setIsSystemTools(false);
//                   }}
//                 >
//                   Bank Details
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ===== Logout Button ===== */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => setIsBranchModelOpen(true)}
//             className="w-[150px] h-[40px] flex items-center gap-2 justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium border border-gray-300"
//           >
//             {selectedBranch}
//             <TfiReload className="text-lg size-5" />
//           </button>
//           <button
//             onClick={handleLogout}
//             className="w-[50px] h-[36px] flex items-center justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium p-2"
//           >
//             <span className="flex items-center gap-1 text-xl font-semibold">
//               <FiLogOut className="text-xl" />
//             </span>
//           </button>
//         </div>
//         {/* modelforAdd */}
//         {isBranchModelOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0101017A] backdrop-blur-md">
//             <div className="bg-white w-[396px] rounded-lg shadow-xl h-auto p-6">
//               <h1 className="text-xl font-bold text-[#0A2478] mb-6 text-center">
//                 Change Branch
//               </h1>

//               {/* Change Branch Dropdown */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="branch"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Select Branch
//                 </label>
//                 <select
//                   id="branch"
//                   name="branch"
//                   className="w-full border border-gray-300 text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
//                   defaultValue=""
//                   onChange={(e) => setTempBranch(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Choose a branch
//                   </option>
//                   <option value="Nashik Road">Nashik Road</option>
//                   <option value="Bhagur">Bhagur</option>
//                   <option value="Nashik">Nashik</option>
//                 </select>
//               </div>

//               {/* Change Year Dropdown */}
//               <div className="mb-6">
//                 <label
//                   htmlFor="year"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Select Year
//                 </label>
//                 <select
//                   id="year"
//                   name="year"
//                   className="w-full border border-gray-300 text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
//                   defaultValue=""
//                   onChange={(e) => setTempYear(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Choose a year
//                   </option>
//                   <option value="2025">2025</option>
//                   <option value="2024">2024</option>
//                 </select>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-center gap-4">
//                 <button
//                   className="bg-[#F11717] hover:bg-red-700 text-white px-5 py-2 rounded text-base font-medium"
//                   onClick={handleOk}
//                 >
//                   OK
//                 </button>
//                 <button
//                   className="bg-[#0A2478] hover:bg-[#081a5e] text-white px-5 py-2 rounded text-base font-medium"
//                   onClick={() => setIsBranchModelOpen(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiLogOut,
} from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const [openMasterSubMenu, setOpenMasterSubMenu] = useState(null);
  const [openTransactionSubMenu, setOpenTransactionSubMenu] = useState(null);
  const [openReportSubMenu, setOpenReportSubMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const toggleMasterSubMenu = (menu) => {
    setOpenMasterSubMenu((prev) => (prev === menu ? null : menu));
  };

  const toggleTransactionSubMenu = (menu) => {
    setOpenTransactionSubMenu((prev) => (prev === menu ? null : menu));
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  };

  const toggleReportSubMenu = (menu) => {
    setOpenReportSubMenu((prev) => (prev === menu ? null : menu));
  };

  const [isBranchModelOpen, setIsBranchModelOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useState("2025");

 
  const [tempBranch, setTempBranch] = useState("");
  const [tempYear, setTempYear] = useState("");

  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    debugger;
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.branchId) {
      console.log("Branch ID:", userData.branchId.branch_code);
      console.log("Branch Name:", userData.branchId.branch_name);
      setSelectedYear(userData.financialYear);
      setSelectedBranch(userData.branchId.branch_name);
       setTempBranch(userData.branchId.id);  
    setSelectedYear(userData.financialYear);
    }
  }, []);
  

  // const handleOk = () => {
  //   if (tempBranch) setSelectedBranch(tempBranch);
  //   if (tempYear) setSelectedYear(tempYear);
  //   setIsBranchModelOpen(false);
  // };

  const handleOk = () => {
    debugger;
    // 🔹 Get existing userData
    const storedUser = JSON.parse(sessionStorage.getItem("userData"));

    if (!storedUser) return;

    // 🔹 Find selected branch object from API list
    const selectedBranchObj = branches.find((b) => b.id === Number(tempBranch));

    if (!selectedBranchObj) return;

    // 🔹 Update userData object
    const updatedUser = {
      ...storedUser,
      branchId: selectedBranchObj.id,
      branchName: selectedBranchObj.branch_name,
     branchId:{                     
    id: selectedBranchObj.id,
    branch_code: selectedBranchObj.branch_code,
    branch_name: selectedBranchObj.branch_name,
  },
      financialYear: tempYear,
    };

    // 🔹 Save back to sessionStorage
    sessionStorage.setItem("userData", JSON.stringify(updatedUser));

    // 🔹 Update local state (if needed)
    setSelectedBranch(selectedBranchObj.branch_name);
    setSelectedYear(tempYear);

    // 🔹 Close modal
    setIsBranchModelOpen(false);

    // 🔹 Optional: Reload page to refresh data everywhere
    window.location.reload();
  };
  // Masters
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isMiscellaneous, setIsMiscellaneous] = useState(false);
  const [isMasterProfileOpen, setIsMasterProfileOpen] = useState(false);
  const [isReportsTransaction, setIsReportsTransaction] = useState(false);
  const [isCashBankFinancialReport, setIsCashBankFinancialReport] =
    useState(false);
  const [ismisReports, setIsMisReports] = useState(false);
  const [isMasterSchemeMaster, setIsMasterSchemeMaster] = useState(false);
  const [isMasterSchemeEmployeeProfile, setIsMasterSchemeEmployeeProfile] =
    useState(false);
  const [isMasterSchemeUserManagement, setIsMasterSchemeUserManagement] =
    useState(false);

  // Transactions
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isGoldLoanOpen, setIsGoldLoanOpen] = useState(false);
  const [Accounting, setIsAccounting] = useState(false);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);

  // Tools/Utilities
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSystemTools, setIsSystemTools] = useState(false);
  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    try {
      const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);

      if (res.data.success) {
        setBranches(res.data.data); // store branches
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  function convertPermissions(permissions) {
    const result = {};

    if (!permissions || typeof permissions !== "object") return result;

    Object.keys(permissions)?.forEach((section) => {
      // ensure section is an array
      if (!Array.isArray(permissions[section])) return;

      result[section] = {};

      permissions[section].forEach((item) => {
        result[section][item.name] = {
          view: item.view,
          add: item.add,
          edit: item.edit,
          delete: item.delete,
          approve: item.approve,
        };
      });
    });

    return result;
  }

  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

  // If Admin → FULL ACCESS
  if (userData.isAdmin || userData.permissions === "all") {
    window.userIsAdmin = true;
    // Skip conversion
    console.log("ADMIN → FULL ACCESS ENABLED");
  } else {
    window.userIsAdmin = false;

    // Convert array-based permissions → object format
    userData.permissions = convertPermissions(userData.permissions);
  }

  const userPermissions = userData.permissions || {};

  console.log("Converted Permissions", userPermissions);

  // ✅ Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // 🔥 Close ALL menus
        setOpenMenu(null);
        setOpenSubMenu(null);
        setOpenMasterSubMenu(null);
        setOpenTransactionSubMenu(null);
        setOpenReportSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // remove all saved data
    window.location.href = "/login"; // redirect to login
  };

  const isAdmin = window.userIsAdmin;

  const masterPermissions = isAdmin ? "all" : userPermissions.Master || {};
  const TrasactionPermissions = isAdmin
    ? "all"
    : userPermissions.Transaction || {};

  const canSeeMaster = isAdmin
    ? true
    : Object.values(masterPermissions).some((p) => p.view === true);

  const canSeeScheme = isAdmin
    ? true
    : Object.values(TrasactionPermissions).some((p) => p.view === true);

  const masterProfileItems = [
    "Account Group",
    "Account Code",
    "Branch Details",
    "Item Profile",
    "Product Purity Profile",
    "Document Proof",
    "Push Gold Rate",
    "Charges Profile",
    "Area",
  ];

  const canSeeMasterProfile = isAdmin
    ? true
    : masterProfileItems.some((name) => masterPermissions[name]?.view === true);

  console.log(canSeeMasterProfile, "canSeeMasterProfile");

  const masterProfileList = [
    { name: "Ledger", path: "/account-groups" },
    { name: "Sub Ledger ", path: "/account-code-list" },
    { name: "Branch Details", path: "/Branch-Profile-List" },
    { name: "Item Profile", path: "/Item-Profile-List" },
    { name: "Product Purity", path: "/Product-Purity" },
    { name: "Document Proof", path: "/Document-Proof-List" },
    { name: "Push Rate", path: "/Push-Rate-List" },
    { name: "Charges Profile", path: "/Charges-Profile-List" },
    { name: "Area", path: "/Area" },
  ];
  const masterMiscellaneousList = [
    // { name: "Cash Balance", path: "/Cash_Balance" },
    // { name: "Print Cash Balance", path: "/Print_Cash_Balance" },
    { name: "Application Setting", path: "/Application_Setting" },
    { name: "Bank Branch Mapping", path: "/Bank_Branch_Mapping" },
    { name: "Accounts Opening Balance", path: "/Accounts_Opening_Balance" },
    // { name: "Sub Ledger Opening Balance", path: "/Sub_Ledger_Opening_Balance" },
  ];

  const ReportTrasaction = [
    { name: "Loan Application History", path: "/loan_application_history" },
    { name: "Interest Due Report", path: "/interest_due_report" },
    { name: "Outstanding Amount Report", path: "/outstanding_amount_report" },
    { name: "Interest Collection Report", path: "/interest_collection_report" },
    { name: "Loan Ledger", path: "/loan-ledger" },
    { name: "Loan Cancellation Report", path: "/loan-cancellation-report" },
    { name: "Gold Stock Report", path: "/gold_stock_report" },
    { name: "Loan Risk Report", path: "/loan-risk-report" },
    { name: "Loan Statement", path: "/loan-statement" },
    { name: "NPA Report", path: "/npa-report" },
    { name: "Loan Details", path: "/loan-details" },
    { name: "Legal Notice Report", path: "/legal-notice-report" },
  ];
  const filteredMasterProfile = isAdmin
    ? masterProfileList
    : masterProfileList.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );
  const filteredReporttrasaction = isAdmin
    ? ReportTrasaction
    : ReportTrasaction.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );
  const filteredMiscellaneousrasaction = isAdmin
    ? masterMiscellaneousList
    : masterMiscellaneousList.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );
  const schemeMasterItems = [
    { name: "Scheme Details", path: "/Scheme-Details-List" },
    { name: "Scheme Branch Mapping", path: "/Branch-Scheme-Mapping-List" },
  ];
  const cashBankFinancialReport = [
    { name: "Bank Book Report", path: "/Bank-Book-Report" },
    // { name: "Cash Book Report", path: "/Cash-Book-Report" },
    { name: "Day Book Report", path: "/Day-Book-Report" },
    { name: "Trial Balance", path: "/Trial-Balance" },
    { name: "Customer Ledger", path: "/Customer-Ledger" },
    { name: "Ledger Report", path: "/Ledger-Report" },
    { name: "Balance Sheet", path: "/Balance_Sheet" },
    { name: "Profit & Loss Report", path: "/Profit_Loss_Report" },
    { name: "Payment/Receipt Report", path: "/Payment_Receipt_Report" },
    { name: "Fund Transfer Report", path: "/Fund_Transfer_Report" },
  ];

  const misreporttab = [
    { name: "Loan Risk managment [Margin]", path: "/Loan_Risk_managment" },
    { name: "Customer List", path: "/Customer_list" },
    { name: "Branch Loan Report", path: "/Branch_Loan_Report" },
    { name: "Loan Repay Register", path: "/Loan_Repay_Register" },
    { name: "Consumer Report", path: "/Consumer_Report" },
    { name: "Value Wise Loan Report", path: "/Value_Wise_Loan_Report" },
  ];
  const filteredSchemeMaster = isAdmin
    ? schemeMasterItems
    : schemeMasterItems.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );
  const cashfinancialreport = isAdmin
    ? cashBankFinancialReport
    : cashBankFinancialReport.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );

  const misreportsection = isAdmin
    ? misreporttab
    : misreporttab.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );

  const canSeeSchemeMaster = filteredSchemeMaster.length > 0;

  const employeeProfileItems = [
    { name: "Employee Profile", path: "/Employee-Profile-list" },
    // { name: "Member Login Period", path: "/Member-Login-Period" },
    // { name: "Member Login Details", path: "/Member-Login-Details" },
    { name: "Member Details", path: "/Member-Details" },
    { name: "Employee Attendance", path: "/Employee-Attendance" },
    { name: "Employee Designation", path: "/Employee-Designation" },
  ];

  const filteredEmployeeProfile = isAdmin
    ? employeeProfileItems
    : employeeProfileItems.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );

  const canSeeEmployeeProfile = filteredEmployeeProfile.length > 0;

  const userManagementItems = [
    { name: "User Role Permission", path: "/User-Role-Permission" },
    { name: "Member Branch Mapping", path: "/Member-Branch-Mapping" },
  ];

  const filteredUserManagement = isAdmin
    ? userManagementItems
    : userManagementItems.filter(
        (item) => masterPermissions[item.name]?.view === true,
      );

  const canSeeUserManagement = filteredUserManagement.length > 0;

  const loanItems = [
    { name: "Loan Application", path: "/Loan-Application" },
    { name: "Loan Charges List", path: "/Loan-Charges-List" },
  ];

  const AccountingItems = [
    { name: "Expense ", path: "/Expences_list" },
    { name: "Receipt", path: "/Receipt_List" },
    { name: "Journal Voucher", path: "/JournalVoucher/List" },
    { name: "FT Issue", path: "/FundTransfer/issue" },
    { name: "FT Receipt", path: "/FundTransfer/receipt" },
  ];

  const customerProfileItem = {
    name: "Customer Profile",
    path: "/Customer-Profile-List",
  };

  const auctionItems = [
    { name: "Auction Creation", path: "/Auction-Creation" },
    { name: "Bidder Registration", path: "/Bidder-Registration-List" },
    { name: "Auction Application", path: "/Auction_Application_form" },
    { name: "Credit Note", path: "/Credit-Note" },
  ];

  const filteredLoan = isAdmin
    ? loanItems
    : loanItems.filter(
        (item) => TrasactionPermissions[item.name]?.view === true,
      );
  const filteredAccounting = isAdmin
    ? AccountingItems
    : AccountingItems.filter(
        (item) => TrasactionPermissions[item.name]?.view === true,
      );
  const canSeeLoan = filteredLoan.length > 0;

  const canSeeCustomerProfile = isAdmin
    ? true
    : TrasactionPermissions["Customer Profile"]?.view === true;

  const filteredAuction = isAdmin
    ? auctionItems
    : auctionItems.filter(
        (item) => TrasactionPermissions[item.name]?.view === true,
      );

  const canSeeAuction = filteredAuction.length > 0;

  const canSeeTransactions =
    canSeeLoan || canSeeCustomerProfile || canSeeAuction;

  return (
    <div className="flex justify-center sticky top-0 z-50 bg-transparent">
      <div className="bg-[#0A2478] text-white flex items-center justify-between relative mt-5 p-5 w-[1460px] h-[50px] rounded-[10px]">
        {/* Left side placeholder */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-12 h-12 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* ===== Center Menu ===== */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex gap-8"
          ref={dropdownRef}
        >
          {/* ================== MASTERS ================== */}
          <div className="relative">
            {canSeeMaster && (
              <button
                className="hover:underline text-[20px] flex items-center gap-1"
                onClick={() => {
                  toggleMenu("masters");
                  setOpenMasterSubMenu(null);
                }}
              >
                Masters
                {openMenu === "masters" ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            )}

            {openMenu === "masters" && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
                {/* Master Profile */}
                {canSeeMasterProfile && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleMasterSubMenu("profile")}
                    >
                      Master Profile
                      {openMasterSubMenu === "profile" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openMasterSubMenu === "profile" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredMasterProfile.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenMasterSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Scheme Master */}
                {canSeeSchemeMaster && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleMasterSubMenu("scheme")}
                    >
                      Scheme Master
                      {openMasterSubMenu === "scheme" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openMasterSubMenu === "scheme" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredSchemeMaster.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenMasterSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Employee Profile */}
                {canSeeEmployeeProfile && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleMasterSubMenu("employee")}
                    >
                      Employee Profile
                      {openMasterSubMenu === "employee" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openMasterSubMenu === "employee" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredEmployeeProfile.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenMasterSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* User Management */}
                {canSeeUserManagement && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleMasterSubMenu("user")}
                    >
                      User Management
                      {openMasterSubMenu === "user" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openMasterSubMenu === "user" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredUserManagement.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenMasterSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ================== TRANSACTIONS ================== */}
          <div className="relative">
            {canSeeScheme && (
              <button
                className="hover:underline text-[20px] flex items-center gap-1"
                onClick={() => {
                  toggleMenu("transactions");
                  setOpenTransactionSubMenu(null);
                }}
              >
                Transactions
                {openMenu === "transactions" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>
            )}

            {openMenu === "transactions" && canSeeTransactions && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
                {/* Loan */}
                {canSeeLoan && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleTransactionSubMenu("loan")}
                    >
                      Loan
                      {openTransactionSubMenu === "loan" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openTransactionSubMenu === "loan" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredLoan.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenTransactionSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Customer Profile */}
                {canSeeCustomerProfile && (
                  <Link
                    to={customerProfileItem.path}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setOpenMenu(null);
                      setOpenTransactionSubMenu(null);
                    }}
                  >
                    Customer Profile
                  </Link>
                )}

                {/* Accounting */}
                {canSeeLoan && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleTransactionSubMenu("accounting")}
                    >
                      Accounting
                      {openTransactionSubMenu === "accounting" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openTransactionSubMenu === "accounting" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredAccounting.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenTransactionSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Auction */}
                {canSeeAuction && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleTransactionSubMenu("auction")}
                    >
                      Auction
                      {openTransactionSubMenu === "auction" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openTransactionSubMenu === "auction" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredAuction.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenTransactionSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Cash Balance */}
                <Link
                  to="/Cash_Balance"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setOpenMenu(null);
                    setOpenTransactionSubMenu(null);
                  }}
                >
                  Cash Balance
                </Link>
              </div>
            )}
          </div>

          {/* ================== OTHER BUTTONS ================== */}

          <div className="relative">
            <button
              className="hover:underline text-[20px] flex items-center gap-1"
              onClick={() => toggleMenu("misc")}
            >
              Miscellaneous
              {isMiscellaneous ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {openMenu === "misc" && (
              <div className="absolute top-full left-0 mt-2 w-[200px] bg-white text-black rounded shadow-lg z-50">
                {filteredMiscellaneousrasaction.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ================== REPORTS ================== */}
          <div className="relative">
            <button
              className="hover:underline text-[20px] flex items-center gap-1"
              onClick={() => {
                toggleMenu("reports");
                setOpenReportSubMenu(null); // reset submenu when main closes
              }}
            >
              Reports
              {openMenu === "reports" ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {openMenu === "reports" && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
                {/* Transaction Reports */}
                {canSeeMasterProfile && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleReportSubMenu("transaction")}
                    >
                      Transaction Reports
                      {openReportSubMenu === "transaction" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openReportSubMenu === "transaction" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {filteredReporttrasaction.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenReportSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Cash/Bank/Financial */}
                {canSeeSchemeMaster && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleReportSubMenu("financial")}
                    >
                      Cash/Bank/Financial Report
                      {openReportSubMenu === "financial" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openReportSubMenu === "financial" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {cashfinancialreport.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenReportSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* MIS Report */}
                {canSeeSchemeMaster && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => toggleReportSubMenu("mis")}
                    >
                      MIS Report
                      {openReportSubMenu === "mis" ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </button>

                    {openReportSubMenu === "mis" && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                        {misreportsection.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setOpenMenu(null);
                              setOpenReportSubMenu(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Direct Links */}
                {[
                  { name: "Loan Follow Up", path: "/loan_follow_up" },
                  { name: "Customer History", path: "/Customer_history" },
                  {
                    name: "PaymentGetWay History",
                    path: "/paymentgetway_history",
                  },
                  // {
                  //   name: "Employee PayRoll Report",
                  //   path: "/Employee-payroll",
                  // },
                ].map((item) => (
                  <button
                    key={item.path}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate(item.path);
                      setOpenMenu(null);
                      setOpenReportSubMenu(null);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================== TOOLS/UTILITIES ================== */}
          <div className="relative">
            <button
              className="hover:underline text-[20px] flex items-center gap-1"
              onClick={() => {
                toggleMenu("tools");
                setOpenSubMenu(null); // reset submenu when main menu toggles
              }}
            >
              Tools / Utilities
              {openMenu === "tools" ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {openMenu === "tools" && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[220px] z-50">
                {/* SETTINGS */}
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => toggleSubMenu("settings")}
                  >
                    <span>Settings</span>
                    {openSubMenu === "settings" ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </button>

                  {openSubMenu === "settings" && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col z-50">
                      <Link
                        to="/Gress-Period"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => {
                          setOpenMenu(null);
                          setOpenSubMenu(null);
                        }}
                      >
                        Grace Period
                      </Link>
                    </div>
                  )}
                </div>

                {/* SYSTEM TOOLS */}
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => toggleSubMenu("system")}
                  >
                    <span>System tools</span>
                    {openSubMenu === "system" ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </button>

                  {openSubMenu === "system" && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col z-50">
                      {[
                        { name: "SMS Config", path: "/SmsConfig/Create" },
                        {
                          name: "WhatsApp Config",
                          path: "/WhatsApp-Configuration",
                        },
                        { name: "Backup utility", path: "/DBBackup" },
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => {
                            setOpenMenu(null);
                            setOpenSubMenu(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* BANK DETAILS */}
                <Link
                  to="/Bank_Details"
                  className="px-4 py-2 hover:bg-gray-100 text-sm block"
                  onClick={() => {
                    setOpenMenu(null);
                    setOpenSubMenu(null);
                  }}
                >
                  Bank Details
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ===== Logout Button ===== */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsBranchModelOpen(true)}
            className="w-[150px] h-[40px] flex items-center gap-2 justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium border border-gray-300"
          >
            {selectedBranch}
            <TfiReload className="text-lg size-5" />
          </button>
          <button
            onClick={handleLogout}
            className="w-[50px] h-[36px] flex items-center justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium p-2"
          >
            <span className="flex items-center gap-1 text-xl font-semibold">
              <FiLogOut className="text-xl" />
            </span>
          </button>
        </div>
        {/* modelforAdd */}
        {isBranchModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0101017A] backdrop-blur-md">
            <div className="bg-white w-[396px] rounded-lg shadow-xl h-auto p-6">
              <h1 className="text-xl font-bold text-[#0A2478] mb-6 text-center">
                Change Branch
              </h1>

              {/* Change Branch Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="w-full border border-gray-300 text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                  value={tempBranch}
                  onChange={(e) => setTempBranch(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a branch
                  </option>

                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Change Year Dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Year
                </label>

                <select
                  name="year"
                  value={selectedYear} // ✅ bind state
                  onChange={(e) => setSelectedYear(e.target.value)} // ✅ update state
                  className="w-full border border-gray-300 text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                >
                  <option value="">Select</option>
                  <option value="2023-2024">01/04/2023 - 31/03/2024</option>
                  <option value="2025-2026">01/01/2025 - 31/12/2026</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  className=" bg-[#0A2478]  text-white px-5 py-2 rounded text-base font-medium"
                  onClick={handleOk}
                >
                  OK
                </button>
                <button
                  className="bg-[#F11717] text-white px-5 py-2 rounded text-base font-medium"
                  onClick={() => setIsBranchModelOpen(false)}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
