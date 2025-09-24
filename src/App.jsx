

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

function App() {


  return (
    <>
      {/* <AccountGroupList /> */}
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account-groups" element={<AccountGroupList />} />
          <Route path="/account-code-list" element={<AccountCodeList />} />
          <Route path="/Branch-Profile-List" element={<BranchProfileList />} />
          <Route path="/Item-profile-List" element={<ItemProfileList />} />
          <Route path="/Item-profile-List" element={<ItemProfileList />} />
          <Route path="/Document-Proof-List" element={<DocumentProof />} />
          <Route path="/Customer-Profile-List" element={<CustProfile />} />
          <Route path="/Add-Customer-Profile" element={<AddCustProfile />} />
          <Route path="/Product-Purity-profile" element={<PurityProfile />} />
          <Route path="/Scheme-Details-List" element={<SchemeDetailsList />} />
          <Route path="/Charges-Profile-List" element={<ChargesProfileList />} />
          <Route path="/Push-Gold-Rate-List" element={<PushGoldRateList />} />
          <Route path="/Add-Scheme-Details-Listform" element={<AddSchemeDetailsListform />} />
          <Route path="/Scheme-Renewal-List" element={<SchemeRenewalList />} />
          
  <Route path="/Member-Login-Period" element={<MemberLoginPeriod />} /> 
  <Route path="/Member-Login-Details" element={<MemberLoginDetails />} /> 
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>




    </>
  )
}

export default App
