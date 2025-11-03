import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";

// Master Pages
import AccountCodeList from "./MasterPages/AccountCodeList";
import AccountGroupList from "./MasterPages/AccountGroupList";
import AddCustProfile from "./MasterPages/AddCustProfile";
import BranchProfileList from "./MasterPages/BranchProfileList";
import CustProfile from "./MasterPages/CustProfile";
import Dashboard from "./MasterPages/Dashboard";
import DocumentProof from "./MasterPages/DocumentProof";
import ItemProfileList from "./MasterPages/ItemProfileList";
import PurityProfile from "./MasterPages/PurityProfile";
import SchemeDetailsList from "./MasterPages/SchemeDetailsList";
import AddSchemeDetailsListform from "./MasterPages/AddSchemeDetailsListform";
import ChargesProfileList from "./MasterPages/ChargesProfileList";
import MemberLoginDetails from "./MasterPages/MemberLoginDetails";
import MemberLoginPeriod from "./MasterPages/MemberLoginPeriod";
import PushGoldRateList from "./MasterPages/PushGoldRateList";
import SchemeRenewalList from "./MasterPages/SchemeRenewalList";
import BranchSchemeMappingList from "./MasterPages/BranchSchemeMappingList";
import RoleMapping from "./MasterPages/RoleMapping";
import SchemeRoleMapping from "./MasterPages/SchemeRoleMapping";
import ViewSchemeDetailsform from "./MasterPages/ViewSchemeDetailsform";
import EmployeeProfile from "./MasterPages/EmployeeProfile";
import MemberBranchMapping from "./MasterPages/MemberBranchMapping";
import AddMemberBranchMapping from "./MasterPages/AddMemberBranchMapping";
import UserRolePermission from "./MasterPages/UserRolePermission";
import AddSchemeRenewalForm from "./MasterPages/AddSchemeRenewalForm";
import UserPermissions from "./MasterPages/UserPermissions";
import Area from "./MasterPages/Area";

// Transaction Pages
import LoanApplication from "./TrasactionPages/LoanApplication";
import CancelledLoan from "./TrasactionPages/CancelledLoan";
import AddGoldLoanApplication from "./TrasactionPages/AddGoldLoanApplication";
import NOC from "./TrasactionPages/NOC";
import LoanChargesList from "./TrasactionPages/LoanChargesList";
import AuctionCreation from "./TrasactionPages/AuctionCreation";
import CreditNote from "./TrasactionPages/CreditNote";
import DebitNote from "./TrasactionPages/DebitNote";
import AddLoanCharges from "./TrasactionPages/AddLoanCharges";
import ViewLoanCharges from "./TrasactionPages/ViewLoanCharges";
import EditLoanCharges from "./TrasactionPages/EditLoanCharge";
import AddCreditNotePage from "./TrasactionPages/AddCreditNotePage";
import ViewCreditNote from "./TrasactionPages/ViewCreditNote";
import PrintCreditNote from "./TrasactionPages/PrintCreditNote";
import AddAuctionCreation from "./TrasactionPages/AddAuctionCreation";
import AuctionItemsList from "./TrasactionPages/AuctionItemsList";
import GoldOrnamentBill from "./TrasactionPages/GoldOrnamentBill";
import BidderRegistration from "./TrasactionPages/BidderRegistration";
import BidderRegistrationList from "./TrasactionPages/BidderRegistrationList";
import ViewBidderDetails from "./TrasactionPages/ViewBidderDetails";
import EditBidderDetails from "./TrasactionPages/EditBidderDetails";
import ViewLoanDetails from "./TrasactionPages/ViewLoanDeatils";
import EditLoanDetails from "./TrasactionPages/EditLoanDetails";
import GoldLoanApproval from "./TrasactionPages/GoldLoanApproval";
import AppraisalNote from "./TrasactionPages/AppraisalNote";
import PrintLoanApplication from "./TrasactionPages/PrintLoanApplication";
import AddLoanRepayment from "./TrasactionPages/AddLoanRepayment";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Master Profile */}
          <Route path="/account-groups" element={<AccountGroupList />} />
          <Route path="/account-code-list" element={<AccountCodeList />} />
          <Route path="/Branch-Profile-List" element={<BranchProfileList />} />
          <Route path="/Item-profile-List" element={<ItemProfileList />} />
          <Route path="/Document-Proof-List" element={<DocumentProof />} />
          <Route path="/Customer-Profile-List" element={<CustProfile />} />
          <Route path="/Add-Customer-Profile" element={<AddCustProfile />} />
          <Route path="/Product-Purity-profile" element={<PurityProfile />} />
          <Route
            path="/Charges-Profile-List"
            element={<ChargesProfileList />}
          />
          <Route path="/Push-Gold-Rate-List" element={<PushGoldRateList />} />

          {/* Schema Mapping */}
          <Route path="/Scheme-Renewal-List" element={<SchemeRenewalList />} />
          <Route
            path="/Add-Scheme-Renewal-Form"
            element={<AddSchemeRenewalForm />}
          />
          <Route path="/Role-Mapping" element={<RoleMapping />} />
          <Route path="/Scheme-Details-List" element={<SchemeDetailsList />} />
          <Route
            path="/View-Scheme-Details-form"
            element={<ViewSchemeDetailsform />}
          />
          <Route
            path="/Add-Scheme-Details-Listform"
            element={<AddSchemeDetailsListform />}
          />
          <Route path="/Scheme-Role-Mapping" element={<SchemeRoleMapping />} />
          <Route
            path="/Branch-Scheme-Mapping-List"
            element={<BranchSchemeMappingList />}
          />

          {/* Employee Profile */}
          <Route path="/Employee-Profile-list" element={<EmployeeProfile />} />
          <Route path="/Member-Login-Period" element={<MemberLoginPeriod />} />
          <Route
            path="/Member-Login-Details"
            element={<MemberLoginDetails />}
          />

          {/* User Management */}
          <Route
            path="/User-Role-Permission"
            element={<UserRolePermission />}
          />
          <Route path="/User-Role" element={<UserPermissions />} />
          <Route
            path="/Member-Branch-Mapping"
            element={<MemberBranchMapping />}
          />
          <Route
            path="/Add-Member-Branch-Mapping"
            element={<AddMemberBranchMapping />}
          />

          {/* Loan Application */}
          <Route path="/Loan-Application" element={<LoanApplication />} />
          <Route path="/Cancelled-Loan" element={<CancelledLoan />} />
          <Route path="/View-Loan-Details" element={<ViewLoanDetails />} />
          <Route path="/Edit-Loan-Details" element={<EditLoanDetails />} />
          <Route path="/Gold-Loan-Approval" element={<GoldLoanApproval />} />
          <Route
            path="/Add-Gold-Loan-Application"
            element={<AddGoldLoanApplication />}
          />
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




          {/* Auction */}
          <Route path="/Auction-Creation" element={<AuctionCreation />} />
          <Route path="/Add-Auction-Creation" element={<AddAuctionCreation />} />
          <Route path="/Auction-Items-List" element={<AuctionItemsList />} />
          <Route path="/Gold-Ornament-Bill" element={<GoldOrnamentBill />} />
          <Route path="/Bidder-Registration-List" element={ <BidderRegistrationList/>} />
          <Route path="/Bidder-Registration" element={ <BidderRegistration/>} />
          <Route path="/View-Bidder-Details/:id" element={ <ViewBidderDetails/>} />
          <Route path="/EditBidderDetails/:id" element={ <EditBidderDetails/>} />
          <Route path="/Credit-Note" element={<CreditNote />} />
          <Route path="/Debit-Note" element={<DebitNote />} />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
