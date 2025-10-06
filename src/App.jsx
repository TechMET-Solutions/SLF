import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./Component/Navbar";
import AccountCodeList from "./MasterPages/AccountCodeList";
import AccountGroupList from './MasterPages/AccountGroupList';
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

import LoanApplication from "./TrasactionPages/LoanApplication";
import LoanEnquiry from "./TrasactionPages/LoanEnquiry";
import CancelledLoan from "./TrasactionPages/CancelledLoan";
function App() {


  return (
    <>
      {/* <AccountGroupList /> */}
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Master Profile */}
          <Route path="/account-groups" element={<AccountGroupList />} />
          <Route path="/account-code-list" element={<AccountCodeList />} />
          <Route path="/Branch-Profile-List" element={<BranchProfileList />} />
          <Route path="/Item-profile-List" element={<ItemProfileList />} />
          <Route path="/Item-profile-List" element={<ItemProfileList />} />
          <Route path="/Document-Proof-List" element={<DocumentProof />} />
          <Route path="/Customer-Profile-List" element={<CustProfile />} />
          <Route path="/Add-Customer-Profile" element={<AddCustProfile />} />
          <Route path="/Product-Purity-profile" element={<PurityProfile />} />
          <Route path="/Charges-Profile-List" element={<ChargesProfileList />} />
          <Route path="/Push-Gold-Rate-List" element={<PushGoldRateList />} />


          {/* Schema Mapping */}
          <Route path="/Scheme-Renewal-List" element={<SchemeRenewalList />} />
          <Route path="/Add-Scheme-Renewal-Form" element={<AddSchemeRenewalForm />} />
          <Route path="/Role-Mapping" element={<RoleMapping />} />
          <Route path="/Scheme-Details-List" element={<SchemeDetailsList />} />
          <Route path="/View-Scheme-Details-form" element={<ViewSchemeDetailsform />} />
          <Route path="/Add-Scheme-Details-Listform" element={<AddSchemeDetailsListform />} />
          <Route path="/Scheme-Role-Mapping" element={<SchemeRoleMapping />} />
          <Route path="/Branch-Scheme-Mapping-List" element={<BranchSchemeMappingList />} />

          {/* Employee Profile */}
          <Route path="/Employee-Profile-list" element={<EmployeeProfile />} />
          <Route path="/Member-Login-Period" element={<MemberLoginPeriod />} />
          <Route path="/Member-Login-Details" element={<MemberLoginDetails />} />

          {/* User Management */}
          <Route path="/User-Role-Permission" element={<UserRolePermission />} />
          <Route path="/User-Role" element={<UserPermissions />} />
          {/* <Route path="/User-Role-Permission" element={<UserRolePermission />} /> */}
          <Route path="/Member-Branch-Mapping" element={<MemberBranchMapping />} />
          <Route path="/Add-Member-Branch-Mapping" element={<AddMemberBranchMapping />} />




          {/* loanApplication */}
             <Route path="/Loan-Application" element={<LoanApplication />} />
          <Route path="/Loan-Enquiry" element={<LoanEnquiry />} />
             <Route path="/Cancelled-Loan" element={<CancelledLoan />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>




    </>
  )
}

export default App
