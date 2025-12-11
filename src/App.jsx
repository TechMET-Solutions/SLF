// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import "./App.css";
// import Navbar from "./Component/Navbar";

// // Master Pages
// import AccountCodeList from "./MasterPages/AccountCodeList";
// import AccountGroupList from "./MasterPages/AccountGroupList";
// import AddCustProfile from "./MasterPages/AddCustProfile";
// import AddMemberBranchMapping from "./MasterPages/AddMemberBranchMapping";
// import AddSchemeDetailsListform from "./MasterPages/AddSchemeDetailsListform";
// import AddSchemeRenewalForm from "./MasterPages/AddSchemeRenewalForm";
// import Area from "./MasterPages/Area";
// import BranchProfileList from "./MasterPages/BranchProfileList";
// import BranchSchemeMappingList from "./MasterPages/BranchSchemeMappingList";
// import ChargesProfileList from "./MasterPages/ChargesProfileList";
// import CustProfile from "./MasterPages/CustProfile";
// import Dashboard from "./MasterPages/Dashboard";
// import DocumentProof from "./MasterPages/DocumentProof";
// import EmployeeProfile from "./MasterPages/EmployeeProfile";
// import ItemProfileList from "./MasterPages/ItemProfileList";
// import MemberBranchMapping from "./MasterPages/MemberBranchMapping";
// import MemberLoginDetails from "./MasterPages/MemberLoginDetails";
// import MemberLoginPeriod from "./MasterPages/MemberLoginPeriod";
// import PurityProfile from "./MasterPages/PurityProfile";
// import PushGoldRateList from "./MasterPages/PushGoldRateList";
// import RoleMapping from "./MasterPages/RoleMapping";
// import SchemeDetailsList from "./MasterPages/SchemeDetailsList";
// import SchemeRenewalList from "./MasterPages/SchemeRenewalList";
// import SchemeRoleMapping from "./MasterPages/SchemeRoleMapping";
// import UserPermissions from "./MasterPages/UserPermissions";
// import UserRolePermission from "./MasterPages/UserRolePermission";
// import ViewSchemeDetailsform from "./MasterPages/ViewSchemeDetailsform";
// import EditLoanApplication from "./TrasactionPages/EditLoanApplication";
// // Transaction Pages
// import LoginPage from "./Component/LoginPage";
// import EmployeeDesignation from "./MasterPages/EmployeeDesignation";

// import ProtectedRoute from "./Component/ProtectedRoute";
// import Cust_Form from "./MasterPages/Cust_Form";
// import AddAuctionCreation from "./TrasactionPages/AddAuctionCreation";
// import AddCreditNotePage from "./TrasactionPages/AddCreditNotePage";
// import AddGoldLoanApplication from "./TrasactionPages/AddGoldLoanApplication";
// import AddLoanCharges from "./TrasactionPages/AddLoanCharges";
// import AddLoanRepayment from "./TrasactionPages/AddLoanRepayment";
// import AppraisalNote from "./TrasactionPages/AppraisalNote";
// import AuctionApplication from "./TrasactionPages/AuctionApplication";
// import AuctionCreation from "./TrasactionPages/AuctionCreation";
// import AuctionItemsList from "./TrasactionPages/AuctionItemsList";
// import Auction_Application_form from "./TrasactionPages/Auction_Application_form";
// import Auction_Bidder_List from "./TrasactionPages/Auction_Bidder_List";
// import BidderRegistration from "./TrasactionPages/BidderRegistration";
// import BidderRegistrationList from "./TrasactionPages/BidderRegistrationList";
// import CancelledLoan from "./TrasactionPages/CancelledLoan";
// import CreditNote from "./TrasactionPages/CreditNote";
// import DebitNote from "./TrasactionPages/DebitNote";
// import EditBidderDetails from "./TrasactionPages/EditBidderDetails";
// import EditLoanCharges from "./TrasactionPages/EditLoanCharge";
// import EditLoanDetails from "./TrasactionPages/EditLoanDetails";
// import GenrateBill from "./TrasactionPages/GenrateBill";
// import GoldLoanApproval from "./TrasactionPages/GoldLoanApproval";
// import GoldOrnamentBill from "./TrasactionPages/GoldOrnamentBill";
// import InvoicePrint from "./TrasactionPages/InvoicePrint";
// import LoanApplication from "./TrasactionPages/LoanApplication";
// import LoanChargesList from "./TrasactionPages/LoanChargesList";
// import NOC from "./TrasactionPages/NOC";
// import PrintCreditNote from "./TrasactionPages/PrintCreditNote";
// import PrintLoanApplication from "./TrasactionPages/PrintLoanApplication";
// import ViewBidderDetails from "./TrasactionPages/ViewBidderDetails";
// import ViewCreditNote from "./TrasactionPages/ViewCreditNote";
// import ViewLoanCharges from "./TrasactionPages/ViewLoanCharges";
// import ViewLoanDetails from "./TrasactionPages/ViewLoanDeatils";
// function LayoutWithNavbar({ children }) {
//   const location = useLocation();
//   const hideNavbar = location.pathname === "/login";

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       {children}
//     </>
//   );
// }

// function App() {
//   return (
//     <>
//       <Router>
//         {/* <Navbar /> */}
//         <LayoutWithNavbar>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />

//               <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <Routes>
//           <Route path="/" element={<Dashboard />} />

//           {/* Master Profile */}
//           <Route path="/account-groups" element={<AccountGroupList />} />
//           <Route path="/account-code-list" element={<AccountCodeList />} />
//           <Route path="/Branch-Profile-List" element={<BranchProfileList />} />
//           <Route path="/Item-profile-List" element={<ItemProfileList />} />
//           <Route path="/Document-Proof-List" element={<DocumentProof />} />
//           <Route path="/Customer-Profile-List" element={<CustProfile />} />
//           <Route path="/Add-Customer-Profile" element={<AddCustProfile />} />
//             <Route path="//Product-Purity" element={<PurityProfile />} />
//             {/* <Route path="/Product-Purity-profile" element={<PurityProfile />} /> */}
//               {/* <Route path="/Product-Purity-Silver" element={<PurityProfileSilver />} /> */}
//           <Route
//             path="/Charges-Profile-List"
//             element={<ChargesProfileList />}
//           />
//           <Route path="/Push-Rate-List" element={<PushGoldRateList />} />

//           {/* Schema Mapping */}
//           <Route path="/Scheme-Renewal-List" element={<SchemeRenewalList />} />
//           <Route
//             path="/Add-Scheme-Renewal-Form"
//             element={<AddSchemeRenewalForm />}
//           />
//           <Route path="/Role-Mapping" element={<RoleMapping />} />
//           <Route path="/Scheme-Details-List" element={<SchemeDetailsList />} />
//           <Route
//             path="/View-Scheme-Details-form"
//             element={<ViewSchemeDetailsform />}
//           />
//           <Route
//             path="/Add-Scheme-Details-Listform"
//             element={<AddSchemeDetailsListform />}
//           />
//           <Route path="/Scheme-Role-Mapping" element={<SchemeRoleMapping />} />
//           <Route
//             path="/Branch-Scheme-Mapping-List"
//             element={<BranchSchemeMappingList />}
//           />

//           {/* Employee Profile */}
//           <Route path="/Employee-Profile-list" element={<EmployeeProfile />} />
//           <Route path="/Member-Login-Period" element={<MemberLoginPeriod />} />
//           <Route path="/Member-Login-Details" element={<MemberLoginDetails />} />
//           <Route path="/Employee-Designation" element={<EmployeeDesignation />} />
//              <Route path="/Customer_Form" element={<Cust_Form />} />
//           {/* User Management */}
//           <Route
//             path="/User-Role-Permission"
//             element={<UserRolePermission />}
//           />
//           <Route path="/User-Role" element={<UserPermissions />} />
//           <Route
//             path="/Member-Branch-Mapping"
//             element={<MemberBranchMapping />}
//           />
//           <Route
//             path="/Add-Member-Branch-Mapping"
//             element={<AddMemberBranchMapping />}
//           />
//           <Route path="/Edit-Loan-Application" element={<EditLoanApplication />} />
//           {/* Loan Application */}
//           <Route path="/Loan-Application" element={<LoanApplication />} />
//           <Route path="/Cancelled-Loan" element={<CancelledLoan />} />
//           <Route path="/View-Loan-Details" element={<ViewLoanDetails />} />
//           <Route path="/Edit-Loan-Details" element={<EditLoanDetails />} />
//           <Route path="/Gold-Loan-Approval" element={<GoldLoanApproval />} />
//           <Route
//             path="/Add-Gold-Loan-Application"
//             element={<AddGoldLoanApplication />}
//           />
//           <Route path="/NOC" element={<NOC />} />
//           <Route path="/Loan-Charges-List" element={<LoanChargesList />} />
//           <Route path="/Area" element={<Area />} />
//           <Route path="/add-loan-charge" element={<AddLoanCharges />} />
//           <Route path="/view-loan-charge" element={<ViewLoanCharges />} />
//           <Route path="/edit-loan-charge" element={<EditLoanCharges />} />
//           <Route path="/Add-Credit-Note-Page" element={<AddCreditNotePage />} />
//           <Route path="/View-Credit-Note" element={<ViewCreditNote />} />
//           <Route path="/Print-Credit-Note" element={<PrintCreditNote />} />
//           <Route path="/Appraisal-Note" element={<AppraisalNote />} />
//           <Route path="/Print-Loan-Application" element={<PrintLoanApplication />} />
//           <Route path="/Add-Loan-Repayment" element={<AddLoanRepayment />} />
//   <Route path="/Auction_Application_form" element={<Auction_Application_form />} />
//          <Route path="/Auction_Bidder_List" element={<Auction_Bidder_List />} />

//  <Route path="/Generate_Bill" element={<GenrateBill />} />
//           {/* Auction */}
//           <Route path="/Auction-Creation" element={<AuctionCreation />} />
//           <Route path="/Add-Auction-Creation" element={<AddAuctionCreation />} />
//           <Route path="/Auction-Items-List" element={<AuctionItemsList />} />
//           <Route path="/Gold-Ornament-Bill" element={<GoldOrnamentBill />} />
//           <Route path="/Bidder-Registration-List" element={<BidderRegistrationList />} />
//           <Route path="/Bidder-Registration" element={<BidderRegistration />} />
//           <Route path="/View-Bidder-Details" element={<ViewBidderDetails />} />
//           <Route path="/EditBidderDetails" element={<EditBidderDetails />} />
//           <Route path="/Credit-Note" element={<CreditNote />} />
//           <Route path="/Debit-Note" element={<DebitNote />} />
//           <Route path="/Auction-Application-List" element={<AuctionApplication />} />
            
//             <Route path="/InvoicePrint" element={<InvoicePrint />} />
//           {/* Default Route */}
//                   {/* <Route path="*" element={<Navigate to="/" />} /> */}
                  
//                   </Routes>
//               </ProtectedRoute>
//             }
//             />
//               <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//           </LayoutWithNavbar>
//       </Router>
//     </>
//   );
// }

// export default App;
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import "./App.css";
import Navbar from "./Component/Navbar";
import ProtectedRoute from "./Component/ProtectedRoute";

// LOGIN PAGE
import LoginPage from "./Component/LoginPage";

// Master Pages
import AccountCodeList from "./MasterPages/AccountCodeList";
import AccountGroupList from "./MasterPages/AccountGroupList";
import AddCustProfile from "./MasterPages/AddCustProfile";
import AddMemberBranchMapping from "./MasterPages/AddMemberBranchMapping";
import AddSchemeDetailsListform from "./MasterPages/AddSchemeDetailsListform";
import AddSchemeRenewalForm from "./MasterPages/AddSchemeRenewalForm";
import Area from "./MasterPages/Area";
import BranchProfileList from "./MasterPages/BranchProfileList";
import BranchSchemeMappingList from "./MasterPages/BranchSchemeMappingList";
import ChargesProfileList from "./MasterPages/ChargesProfileList";
import CustProfile from "./MasterPages/CustProfile";
import Cust_Form from "./MasterPages/Cust_Form";
import Dashboard from "./MasterPages/Dashboard";
import DocumentProof from "./MasterPages/DocumentProof";
import EmployeeDesignation from "./MasterPages/EmployeeDesignation";
import EmployeeProfile from "./MasterPages/EmployeeProfile";
import ItemProfileList from "./MasterPages/ItemProfileList";
import MemberBranchMapping from "./MasterPages/MemberBranchMapping";
import MemberLoginDetails from "./MasterPages/MemberLoginDetails";
import MemberLoginPeriod from "./MasterPages/MemberLoginPeriod";
import PurityProfile from "./MasterPages/PurityProfile";
import PushGoldRateList from "./MasterPages/PushGoldRateList";
import RoleMapping from "./MasterPages/RoleMapping";
import SchemeDetailsList from "./MasterPages/SchemeDetailsList";
import SchemeRenewalList from "./MasterPages/SchemeRenewalList";
import SchemeRoleMapping from "./MasterPages/SchemeRoleMapping";
import UserPermissions from "./MasterPages/UserPermissions";
import UserRolePermission from "./MasterPages/UserRolePermission";
import ViewSchemeDetailsform from "./MasterPages/ViewSchemeDetailsform";
import EditLoanApplication from "./TrasactionPages/EditLoanApplication";

// Transaction Pages
import AddAuctionCreation from "./TrasactionPages/AddAuctionCreation";
import AddCreditNotePage from "./TrasactionPages/AddCreditNotePage";
import AddGoldLoanApplication from "./TrasactionPages/AddGoldLoanApplication";
import AddLoanCharges from "./TrasactionPages/AddLoanCharges";
import AddLoanRepayment from "./TrasactionPages/AddLoanRepayment";
import AppraisalNote from "./TrasactionPages/AppraisalNote";
import AuctionApplication from "./TrasactionPages/AuctionApplication";
import AuctionCreation from "./TrasactionPages/AuctionCreation";
import AuctionItemsList from "./TrasactionPages/AuctionItemsList";
import Auction_Application_form from "./TrasactionPages/Auction_Application_form";
import Auction_Bidder_List from "./TrasactionPages/Auction_Bidder_List";
import BidderRegistration from "./TrasactionPages/BidderRegistration";
import BidderRegistrationList from "./TrasactionPages/BidderRegistrationList";
import CancelledLoan from "./TrasactionPages/CancelledLoan";
import CreditNote from "./TrasactionPages/CreditNote";
import DebitNote from "./TrasactionPages/DebitNote";
import EditBidderDetails from "./TrasactionPages/EditBidderDetails";
import EditLoanCharges from "./TrasactionPages/EditLoanCharge";
import EditLoanDetails from "./TrasactionPages/EditLoanDetails";
import EmpAttendance from "./TrasactionPages/EmpAttendance";
import GenrateBill from "./TrasactionPages/GenrateBill";
import GoldLoanApproval from "./TrasactionPages/GoldLoanApproval";
import GoldOrnamentBill from "./TrasactionPages/GoldOrnamentBill";
import InvoicePrint from "./TrasactionPages/InvoicePrint";
import LoanApplication from "./TrasactionPages/LoanApplication";
import LoanChargesList from "./TrasactionPages/LoanChargesList";
import NOC from "./TrasactionPages/NOC";
import PrintCreditNote from "./TrasactionPages/PrintCreditNote";
import PrintLoanApplication from "./TrasactionPages/PrintLoanApplication";
import ViewBidderDetails from "./TrasactionPages/ViewBidderDetails";
import ViewCreditNote from "./TrasactionPages/ViewCreditNote";
import ViewLoanCharges from "./TrasactionPages/ViewLoanCharges";
import ViewLoanDetails from "./TrasactionPages/ViewLoanDeatils";


// ---------------- LAYOUT WRAPPER ----------------
function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // hide navbar ONLY on login page

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}


// ---------------- MAIN APP ----------------
function App() {
  return (
    <Router>
      <LayoutWithNavbar>
        <Routes>

          {/* PUBLIC ROUTE (LOGIN) */}
          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>

                  {/* Dashboard (Same path "/", but ONLY when logged in) */}
                  <Route path="/" element={<Dashboard />} />

                  {/* MASTER ROUTES */}
                  <Route path="/account-groups" element={<AccountGroupList />} />
                  <Route path="/account-code-list" element={<AccountCodeList />} />
                  <Route path="/Branch-Profile-List" element={<BranchProfileList />} />
                  <Route path="/Item-profile-List" element={<ItemProfileList />} />
                  <Route path="/Document-Proof-List" element={<DocumentProof />} />
                  <Route path="/Customer-Profile-List" element={<CustProfile />} />
                  <Route path="/Add-Customer-Profile" element={<AddCustProfile />} />
                  <Route path="/Product-Purity" element={<PurityProfile />} />
                  <Route path="/Charges-Profile-List" element={<ChargesProfileList />} />
                  <Route path="/Push-Rate-List" element={<PushGoldRateList />} />
                  <Route path="/Scheme-Renewal-List" element={<SchemeRenewalList />} />
                  <Route path="/Add-Scheme-Renewal-Form" element={<AddSchemeRenewalForm />} />
                  <Route path="/Role-Mapping" element={<RoleMapping />} />
                  <Route path="/Scheme-Details-List" element={<SchemeDetailsList />} />
                  <Route path="/View-Scheme-Details-form" element={<ViewSchemeDetailsform />} />
                  <Route path="/Add-Scheme-Details-Listform" element={<AddSchemeDetailsListform />} />
                  <Route path="/Scheme-Role-Mapping" element={<SchemeRoleMapping />} />
                  <Route path="/Branch-Scheme-Mapping-List" element={<BranchSchemeMappingList />} />

                  {/* Employee */}
                  <Route path="/Employee-Profile-list" element={<EmployeeProfile />} />
                  <Route path="/Member-Login-Period" element={<MemberLoginPeriod />} />
                  <Route path="/Member-Login-Details" element={<MemberLoginDetails />} />
                  <Route path="/Employee-Designation" element={<EmployeeDesignation />} />
                  <Route path="/Customer_Form" element={<Cust_Form />} />
                  <Route path="/Employee-Attendance" element={<EmpAttendance />} />
                  {/* User Management */}
                  <Route path="/User-Role-Permission" element={<UserRolePermission />} />
                  <Route path="/User-Role" element={<UserPermissions />} />
                  <Route path="/Member-Branch-Mapping" element={<MemberBranchMapping />} />
                  <Route path="/Add-Member-Branch-Mapping" element={<AddMemberBranchMapping />} />
                  <Route path="/Edit-Loan-Application" element={<EditLoanApplication />} />

                  {/* Loan Routes */}
                  <Route path="/Loan-Application" element={<LoanApplication />} />
                  <Route path="/Cancelled-Loan" element={<CancelledLoan />} />
                  <Route path="/View-Loan-Details" element={<ViewLoanDetails />} />
                  <Route path="/Edit-Loan-Details" element={<EditLoanDetails />} />
                  <Route path="/Gold-Loan-Approval" element={<GoldLoanApproval />} />
                  <Route path="/Add-Gold-Loan-Application" element={<AddGoldLoanApplication />} />
                  <Route path="/NOC" element={<NOC />} />
                  <Route path="/Loan-Charges-List" element={<LoanChargesList />} />
                  <Route path="/Area" element={<Area />} />
                  <Route path="/add-loan-charge" element={<AddLoanCharges />} />
                  <Route path="/view-loan-charge" element={<ViewLoanCharges />} />
                  <Route path="/edit-loan-charge" element={<EditLoanCharges />} />
                  <Route path="/Add-Credit-Note-Page" element={<AddCreditNotePage />} />
                  <Route path="/View-Credit-Note" element={<ViewCreditNote />} />
                  <Route path="/Print-Credit-Note" element={<PrintCreditNote />} />
                  <Route path="/Appraisal-Note" element={<AppraisalNote />} />
                  <Route path="/Print-Loan-Application" element={<PrintLoanApplication />} />
                  <Route path="/Add-Loan-Repayment" element={<AddLoanRepayment />} />
                  <Route path="/Auction_Application_form" element={<Auction_Application_form />} />
                  <Route path="/Auction_Bidder_List" element={<Auction_Bidder_List />} />
                  <Route path="/Generate_Bill" element={<GenrateBill />} />

                  {/* Auction */}
                  <Route path="/Auction-Creation" element={<AuctionCreation />} />
                  <Route path="/Add-Auction-Creation" element={<AddAuctionCreation />} />
                  <Route path="/Auction-Items-List" element={<AuctionItemsList />} />
                  <Route path="/Gold-Ornament-Bill" element={<GoldOrnamentBill />} />
                  <Route path="/Bidder-Registration-List" element={<BidderRegistrationList />} />
                  <Route path="/Bidder-Registration" element={<BidderRegistration />} />
                  <Route path="/View-Bidder-Details" element={<ViewBidderDetails />} />
                  <Route path="/EditBidderDetails" element={<EditBidderDetails />} />
                  <Route path="/Credit-Note" element={<CreditNote />} />
                  <Route path="/Debit-Note" element={<DebitNote />} />
                  <Route path="/Auction-Application-List" element={<AuctionApplication />} />
                  <Route path="/InvoicePrint" element={<InvoicePrint />} />

                </Routes>
              </ProtectedRoute>
            }
          />

          {/* FAILSAFE */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </LayoutWithNavbar>
    </Router>
  );
}

export default App;
