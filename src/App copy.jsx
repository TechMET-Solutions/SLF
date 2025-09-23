

import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./Component/Navbar";
import AccountCodeList from "./MasterPages/AccountCodeList";
import AccountGroupList from './MasterPages/AccountGroupList';
import BranchProfileList from "./MasterPages/BranchProfileList";
import Dashboard from "./MasterPages/Dashboard";
import DocumentProof from "./MasterPages/DocumentProof";
import ItemProfileList from "./MasterPages/ItemProfileList";
import PurityProfile from "./MasterPages/PurityProfile";
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
             <Route path="/Product-Purity-profile" element={<PurityProfile />} /> 
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
