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
import EditGoldLoanApplication from "./TrasactionPages/EditGoldLoanApplication";

// Transaction Pages
import PrivacyPolicy from "./Component/PrivacyPolicy";
import Refund from "./Component/Refund";
import TermsOfService from "./Component/TermsOfService";
import About from "./Component/about";
import Contactus from "./Component/contactus";
import Accounts_Opening_Balance from "./Miscellaneous/Accounts_Opening_Balance.jsx";
// import AdvSettingsAddEdit from "./Miscellaneous/AdvSettingsAddEdit.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import PartyType from "./MasterPages/PartyType.jsx";
import Application_Setting from "./Miscellaneous/Application_Setting.jsx";
import Bank_Branch_Mapping from "./Miscellaneous/Bank_Branch_Mapping.jsx";
import BankbranchMapping from "./Miscellaneous/BankbranchMapping.jsx";
import Cash_Balance from "./Miscellaneous/Cash_Balance.jsx";
import DayEndProcess from "./Miscellaneous/DayEndProcess.jsx";
import Print_Cash_Balance from "./Miscellaneous/Print_Cash_Balance.jsx";
import Add_Follow_Up from "./Report/Add_Follow_Up.jsx";
import Balance_Sheet from "./Report/Balance_Sheet.jsx";
import BankBookReport from "./Report/Bank_Book_report.jsx";
import Branch_Loan_Report from "./Report/Branch_Loan_Report.jsx";
import Cash_Book_Report from "./Report/Cash_Book_Report.jsx";
import CustomerLedger from "./Report/Customer-Ledger.jsx";
import Customer_History from "./Report/Customer_History.jsx";
import Customer_list from "./Report/Customer_list.jsx";
import Day_Book from "./Report/Day_Book.jsx";
import EmployeePayRoll from "./Report/EmployeePayRoll.jsx";
import FundTransferReciptCreate from "./Report/FundTransferReciptCreate.jsx";
import Fund_Transfer_Report from "./Report/Fund_Transfer_Report.jsx";
import GoldStockReport from "./Report/Gold_stock_report.jsx";
import InterestCollectionReport from "./Report/Interest_collection_report.jsx";
import Interest_due_report from "./Report/Interest_due_report.jsx";
import LedgerDetailsPage from "./Report/LedgerDetailsPage.jsx";
import Ledger_Report from "./Report/Ledger_Report.jsx";
import Legal_notice_report from "./Report/Legal_notice_report.jsx";
import LoanStatement from "./Report/Loan-statement.jsx";
import LoanFollowup from "./Report/LoanFollowup.jsx";
import Loan_Repay_Register from "./Report/Loan_Repay_Register.jsx";
import Loan_Risk_managment from "./Report/Loan_Risk_managment.jsx";
import LoanDetails from "./Report/Loan_details.jsx";
import LoanRiskReport from "./Report/Loan_risk_report.jsx";
import LoanCancellationReport from "./Report/Loancancellationreport.jsx";
import NpaReport from "./Report/Npa_report.jsx";
import Outstanding_amount_report from "./Report/Outstanding_amount_report.jsx";
import PaymentGetWay_History from "./Report/PaymentGetWay_History.jsx";
import Payment_Receipt_Report from "./Report/Payment_Receipt_Report.jsx";
import Profit_Loss_Report from "./Report/Profit_Loss_Report.jsx";
import Trial_Balance from "./Report/Trial_Balance.jsx";
import Value_Wise_Loan_Report from "./Report/Value_Wise_Loan_Report.jsx";
import Loan_application_history from "./Report/loan_application_history.jsx";
import Loan_follow_up from "./Report/loan_follow_up.jsx";
import BackupUtitlity from "./Tools/BackupUtitlity.jsx";
import BankDetails from "./Tools/BankDetails.jsx";
import GracePeriod from "./Tools/GracePeriod";
import WhatsApp from "./Tools/WhatsApp.jsx";
import SmsConfig from "./Tools/smsConfig.jsx";
import AddRecipt from "./TrasactionPages/Accounting/AddRecipt.jsx";
import ExpenceCreate from "./TrasactionPages/Accounting/ExpenceCreate.jsx";
import FundTransferRecCreate from "./TrasactionPages/Accounting/FundTransferRecCreate.jsx";
import FundTransferceissue from "./TrasactionPages/Accounting/FundTransferceissue.jsx";
import FundTransferceissueCreate from "./TrasactionPages/Accounting/FundTransferceissueCreate.jsx";
import FundTransferreceipt from "./TrasactionPages/Accounting/FundTransferreceipt.jsx";
import JournalVoucherCreate from "./TrasactionPages/Accounting/JournalVoucherCreate.jsx";
import JournalVoucherlist from "./TrasactionPages/Accounting/JournalVoucherlist.jsx";
import PaymentInAccounting from "./TrasactionPages/Accounting/PaymentInAccounting.jsx";
import RecieptAccounting from "./TrasactionPages/Accounting/RecieptAccounting.jsx";
import AddAuctionCreation from "./TrasactionPages/AddAuctionCreation";
import AddCreditNotePage from "./TrasactionPages/AddCreditNotePage";
import AddGoldLoanApplication from "./TrasactionPages/AddGoldLoanApplication";
import AddLoanCharges from "./TrasactionPages/AddLoanCharges";
import AddLoanRepayment from "./TrasactionPages/AddLoanRepayment";
import AddLoanRepaymentEmi from "./TrasactionPages/AddLoanRepaymentEmi";
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
import LoanRepayment from "./TrasactionPages/LoanRepayment.jsx";
import LoanRepaymentDetails from "./TrasactionPages/LoanRepaymentDetails.jsx";
import NOC from "./TrasactionPages/NOC";
import PaymentSuccess from "./TrasactionPages/PaymentSuccess.jsx";
import PrintCreditNote from "./TrasactionPages/PrintCreditNote";
import PrintLoanApplication from "./TrasactionPages/PrintLoanApplication";
import ViewBidderDetails from "./TrasactionPages/ViewBidderDetails";
import ViewCreditNote from "./TrasactionPages/ViewCreditNote";
import ViewLoanCharges from "./TrasactionPages/ViewLoanCharges";
import ViewLoanDetails from "./TrasactionPages/ViewLoanDeatils";
import { API } from "./api.js";

// ---------------- LAYOUT WRAPPER ----------------
function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // hide navbar ONLY on login page
  const [showDayEndModal, setShowDayEndModal] = useState(false);
  const [DayEndProcessDate, setDayEndProcessDate] = useState("");
  const [dayEndMessage, setDayEndMessage] = useState("");
  console.log(
    "SHOW DAY END MODAL:",
    showDayEndModal,
    "MESSAGE:",
    dayEndMessage,
  );
  useEffect(() => {
    const checkDayEnd = async () => {
      const user = JSON.parse(sessionStorage.getItem("userData"));
      if (!user) return;

      try {
        const res = await axios.get(`${API}/Master/checkPreviousDayEnd`, {
          params: { userId: user.id, isAdmin: user.isAdmin },
        });

        const data = res.data;

        // =========================
        // DATE SETUP
        // =========================
        const today = new Date();
        const todayStr = today.toLocaleDateString("en-CA");

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toLocaleDateString("en-CA");

        const lastDate = data.lastDayEnd
          ? new Date(data.lastDayEnd).toLocaleDateString("en-CA")
          : null;

        console.log("Today:", todayStr);
        console.log("Yesterday:", yesterdayStr);
        console.log("Last:", lastDate);

        // =========================
        // ✅ TODAY → SHOW MESSAGE ONLY
        // =========================
        if (lastDate === todayStr) {
          setDayEndMessage("✅ Today's day-end process is already completed.");
          setDayEndProcessDate("today");
          setShowDayEndModal(true);
          return;
        }

        // =========================
        // ✅ YESTERDAY → DO NOTHING
        // =========================
        if (lastDate === yesterdayStr) {
          setDayEndMessage("");
          setShowDayEndModal(false);
          return;
        }

        // =========================
        // ❌ OLDER → SHOW MODAL
        // =========================
        if (window.location.pathname !== "/Day-End-Process") {
          setDayEndMessage("");
          setDayEndProcessDate("older");

          setShowDayEndModal(true);
        }
      } catch (err) {
        console.error("Day End Check Error:", err);
      }
    };

    checkDayEnd();
  }, []);

  const handleLogout = () => {
  sessionStorage.clear();
  window.location.href = "/login";
};
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {dayEndMessage && (
        <div className="bg-green-100 text-green-700 p-3 text-center font-semibold">
          {dayEndMessage}
        </div>
      )}
      {showDayEndModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    
    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border overflow-hidden">
      
      {/* Top Bar */}
      <div className={`h-2 w-full ${DayEndProcessDate === "today" ? "bg-green-600" : "bg-red-600"}`} />

      <div className="p-8 text-center">
        
        {/* Icon */}
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 
          ${DayEndProcessDate === "today" ? "bg-green-50" : "bg-red-50"}`}>
          
          <svg
            className={`h-8 w-8 ${DayEndProcessDate === "today" ? "text-green-600" : "text-red-600"}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            {DayEndProcessDate === "today" ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            )}
          </svg>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          {DayEndProcessDate === "today" ? "Day Ending Done" : "Day-End Pending"}
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-8 leading-relaxed">
          {dayEndMessage || "Your previous day-end process is pending. Please complete it."}
        </p>

        {/* ACTION BUTTONS */}
        {DayEndProcessDate === "older" && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => (window.location.href = "/Day-End-Process")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Go to Day-End Process
            </button>

            <button
              onClick={() => window.location.reload()}
              className="text-gray-400 text-sm hover:text-gray-600"
            >
              Check Status Again
            </button>
          </div>
              )}
              {DayEndProcessDate === "today" && (
  <div className="flex flex-col gap-3">
    <button
      onClick={handleLogout}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95"
    >
      Logout
    </button>
  </div>
)}

      </div>
    </div>
  </div>
)}
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
          <Route path="/about-us" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfService />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/Refund-and-Cancellation" element={<Refund />} />
          {/* PROTECTED ROUTES */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  {/* Dashboard (Same path "/", but ONLY when logged in) */}
                  <Route path="/" element={<Dashboard />} />
                  {/* MASTER ROUTES */}
                  <Route
                    path="/account-groups"
                    element={<AccountGroupList />}
                  />
                  <Route
                    path="/account-code-list"
                    element={<AccountCodeList />}
                  />
                  <Route
                    path="/loan-repayment-details"
                    element={<LoanRepaymentDetails />}
                  />
                  <Route
                    path="/Branch-Profile-List"
                    element={<BranchProfileList />}
                  />
                  <Route
                    path="/Item-profile-List"
                    element={<ItemProfileList />}
                  />
                  <Route
                    path="/Document-Proof-List"
                    element={<DocumentProof />}
                  />
                  <Route
                    path="/Customer-Profile-List"
                    element={<CustProfile />}
                  />
                  <Route
                    path="/Add-Customer-Profile"
                    element={<AddCustProfile />}
                  />
                  <Route path="/Product-Purity" element={<PurityProfile />} />
                  <Route
                    path="/Charges-Profile-List"
                    element={<ChargesProfileList />}
                  />
                  <Route
                    path="/Push-Rate-List"
                    element={<PushGoldRateList />}
                  />
                  <Route
                    path="/Scheme-Renewal-List"
                    element={<SchemeRenewalList />}
                  />
                  <Route
                    path="/Add-Scheme-Renewal-Form"
                    element={<AddSchemeRenewalForm />}
                  />
                  <Route path="/Role-Mapping" element={<RoleMapping />} />
                  <Route
                    path="/Scheme-Details-List"
                    element={<SchemeDetailsList />}
                  />
                  <Route path="/Day-End-Process" element={<DayEndProcess />} />
                  <Route
                    path="/View-Scheme-Details-form"
                    element={<ViewSchemeDetailsform />}
                  />
                  <Route
                    path="/Add-Scheme-Details-Listform"
                    element={<AddSchemeDetailsListform />}
                  />
                  <Route
                    path="/Scheme-Role-Mapping"
                    element={<SchemeRoleMapping />}
                  />
                  <Route
                    path="/Branch-Scheme-Mapping-List"
                    element={<BranchSchemeMappingList />}
                  />

                  <Route
                    path="/Employee-Profile-list"
                    element={<EmployeeProfile />}
                  />
                  <Route
                    path="/Member-Login-Period"
                    element={<MemberLoginPeriod />}
                  />
                  <Route
                    path="/Member-Details"
                    element={<MemberLoginDetails />}
                  />

                  {/* <Route path="/Member-Details" element={<MemberLoginTabs />} /> */}
                  <Route
                    path="/WhatsApp-Configuration"
                    element={<WhatsApp />}
                  />
                  <Route
                    path="/Member-Login-Details"
                    element={<MemberLoginDetails />}
                  />
                  <Route
                    path="/Employee-Designation"
                    element={<EmployeeDesignation />}
                  />
                  <Route path="/Customer_Form" element={<Cust_Form />} />
                  <Route
                    path="/Employee-Attendance"
                    element={<EmpAttendance />}
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
                  <Route
                    path="/Edit-Loan-Application"
                    element={<EditGoldLoanApplication />}
                  />
                  {/* Loan Routes */}
                  <Route
                    path="/Loan-Application"
                    element={<LoanApplication />}
                  />
                  <Route
                    path="/loan_application_history"
                    element={<Loan_application_history />}
                  />
                  <Route path="/loan-statement" element={<LoanStatement />} />
                  <Route path="/loan-details" element={<LoanDetails />} />
                  <Route path="/npa-report" element={<NpaReport />} />
                  <Route
                    path="/interest_due_report"
                    element={<Interest_due_report />}
                  />
                  <Route
                    path="/Bank-Book-Report"
                    element={<BankBookReport />}
                  />
                  <Route
                    path="/Cash-Book-Report"
                    element={<Cash_Book_Report />}
                  />
                  <Route path="/Trial-Balance" element={<Trial_Balance />} />
                  <Route path="/Customer-Ledger" element={<CustomerLedger />} />
                  <Route path="/Balance_Sheet" element={<Balance_Sheet />} />
                  <Route path="/Ledger-Report" element={<Ledger_Report />} />
                  <Route path="/Day-Book-Report" element={<Day_Book />} />
                  <Route
                    path="/Profit_Loss_Report"
                    element={<Profit_Loss_Report />}
                  />
                  <Route
                    path="/Fund_Transfer_Report"
                    element={<Fund_Transfer_Report />}
                  />
                  <Route
                    path="/Payment_Receipt_Report"
                    element={<Payment_Receipt_Report />}
                  />
                  <Route
                    path="/legal-notice-report"
                    element={<Legal_notice_report />}
                  />
                  <Route
                    path="/loan-risk-report"
                    element={<LoanRiskReport />}
                  />
                  <Route
                    path="/Loan_Risk_managment"
                    element={<Loan_Risk_managment />}
                  />
                  <Route path="/Customer_list" element={<Customer_list />} />
                  <Route
                    path="/Branch_Loan_Report"
                    element={<Branch_Loan_Report />}
                  />
                  <Route
                    path="/Loan_Repay_Register"
                    element={<Loan_Repay_Register />}
                  />
                  <Route
                    path="/Value_Wise_Loan_Report"
                    element={<Value_Wise_Loan_Report />}
                  />
                  <Route
                    path="/Value_Wise_Loan_Report"
                    element={<Value_Wise_Loan_Report />}
                  />
                  <Route
                    path="/Customer_history"
                    element={<Customer_History />}
                  />
                  <Route
                    path="/paymentgetway_history"
                    element={<PaymentGetWay_History />}
                  />
                  <Route path="/add_follow_up" element={<Add_Follow_Up />} />
                  <Route path="/loan_follow_up" element={<Loan_follow_up />} />
                  <Route
                    path="/gold_stock_report"
                    element={<GoldStockReport />}
                  />
                  <Route
                    path="/interest_collection_report"
                    element={<InterestCollectionReport />}
                  />
                  <Route
                    path="/Loan_Follow_up_Updated"
                    element={<LoanFollowup />}
                  />
                  <Route
                    path="/loan-cancellation-report"
                    element={<LoanCancellationReport />}
                  />
                  <Route
                    path="/outstanding_amount_report"
                    element={<Outstanding_amount_report />}
                  />
                  <Route path="/Cancelled-Loan" element={<CancelledLoan />} />
                  <Route
                    path="/View-Loan-Details"
                    element={<ViewLoanDetails />}
                  />
                  <Route
                    path="/Edit-Loan-Details"
                    element={<EditLoanDetails />}
                  />
                  <Route
                    path="/Gold-Loan-Approval"
                    element={<GoldLoanApproval />}
                  />
                  <Route
                    path="/Add-Gold-Loan-Application"
                    element={<AddGoldLoanApplication />}
                  />
                  <Route path="/NOC" element={<NOC />} />
                  <Route
                    path="/Loan-Charges-List"
                    element={<LoanChargesList />}
                  />
                  <Route path="/Loan-Repayment" element={<LoanRepayment />} />
                  <Route path="/Area" element={<Area />} />
                  <Route path="/Party-Type" element={<PartyType />} />
                  <Route path="/add-loan-charge" element={<AddLoanCharges />} />
                  <Route
                    path="/view-loan-charge"
                    element={<ViewLoanCharges />}
                  />
                  <Route
                    path="/edit-loan-charge"
                    element={<EditLoanCharges />}
                  />
                  <Route
                    path="/Add-Credit-Note-Page"
                    element={<AddCreditNotePage />}
                  />
                  <Route
                    path="/View-Credit-Note"
                    element={<ViewCreditNote />}
                  />
                  <Route
                    path="/Print-Credit-Note"
                    element={<PrintCreditNote />}
                  />
                  <Route path="/Appraisal-Note" element={<AppraisalNote />} />
                  <Route
                    path="/Print-Loan-Application"
                    element={<PrintLoanApplication />}
                  />
                  <Route
                    path="/Add-Loan-Repayment/:loanId"
                    element={<AddLoanRepayment />}
                  />
                  <Route
                    path="/Auction_Application_form"
                    element={<Auction_Application_form />}
                  />
                  <Route
                    path="/Auction_Bidder_List"
                    element={<Auction_Bidder_List />}
                  />

                  <Route
                    path="/Add-Loan-Repayment/:loanId/paymentsuccess"
                    element={<PaymentSuccess />}
                  />

                  <Route path="/Generate_Bill" element={<GenrateBill />} />
                  <Route
                    path="/Emi_Loan-Repayment/:loanId"
                    element={<AddLoanRepaymentEmi />}
                  />
                  {/* Auction */}
                  <Route
                    path="/Auction-Creation"
                    element={<AuctionCreation />}
                  />
                  <Route
                    path="/Expences_list"
                    element={<PaymentInAccounting />}
                  />
                  <Route path="/Receipt_List" element={<RecieptAccounting />} />

                  {/* <Route
                    path="/ReceiptVoucher/create"
                    element={<ReceiptCreate />}
                  /> */}
                  <Route path="/Receipt/create" element={<AddRecipt />} />
                  <Route
                    path="/JournalVoucher/List"
                    element={<JournalVoucherlist />}
                  />

                  <Route
                    path="/FundTransfer/issue"
                    element={<FundTransferceissue />}
                  />
                  <Route
                    path="/JournalVoucher/create"
                    element={<JournalVoucherCreate />}
                  />

                  {/* <Route
                    path="/Expences/create"
                    element={<AddpaymentAccounting />}
                  /> */}

                  <Route path="/Expences/create" element={<ExpenceCreate />} />
                  <Route
                    path="/Print_Cash_Balance"
                    element={<Print_Cash_Balance />}
                  />
                  <Route
                    path="/ledger-details"
                    element={<LedgerDetailsPage />}
                  />
                  <Route
                    path="/Application_Setting"
                    element={<Application_Setting />}
                  />

                  {/* <Route path="/AdvSettings" element={<AdvSettingsAddEdit />} /> */}

                  <Route
                    path="/BankBranchMapping"
                    element={<BankbranchMapping />}
                  />
                  <Route path="/Bank_Details" element={<BankDetails />} />
                  <Route
                    path="/Bank_Branch_Mapping"
                    element={<Bank_Branch_Mapping />}
                  />

                  <Route path="/Cash_Balance" element={<Cash_Balance />} />
                  <Route
                    path="/Accounts_Opening_Balance"
                    element={<Accounts_Opening_Balance />}
                  />
                  <Route
                    path="/FundTransfer/receipt"
                    element={<FundTransferreceipt />}
                  />
                  <Route
                    path="/FundTransferRec/Create"
                    element={<FundTransferRecCreate />}
                  />
                  <Route
                    path="/Employee-payroll"
                    element={<EmployeePayRoll />}
                  />
                  <Route
                    path="/FundTransfer/create"
                    element={<FundTransferceissueCreate />}
                  />

                  <Route
                    path="/FundTransfer/Receipt/create"
                    element={<FundTransferReciptCreate />}
                  />
                  <Route path="/SmsConfig/Create" element={<SmsConfig />} />
                  <Route path="/DBBackup" element={<BackupUtitlity />} />
                  <Route
                    path="/Add-Auction-Creation"
                    element={<AddAuctionCreation />}
                  />
                  <Route
                    path="/Auction-Items-List"
                    element={<AuctionItemsList />}
                  />
                  <Route
                    path="/Gold-Ornament-Bill"
                    element={<GoldOrnamentBill />}
                  />
                  <Route
                    path="/Bidder-Registration-List"
                    element={<BidderRegistrationList />}
                  />
                  <Route
                    path="/Bidder-Registration"
                    element={<BidderRegistration />}
                  />
                  <Route
                    path="/View-Bidder-Details"
                    element={<ViewBidderDetails />}
                  />
                  <Route
                    path="/EditBidderDetails"
                    element={<EditBidderDetails />}
                  />
                  <Route path="/Credit-Note" element={<CreditNote />} />
                  <Route path="/Debit-Note" element={<DebitNote />} />
                  <Route
                    path="/Auction-Application-List"
                    element={<AuctionApplication />}
                  />
                  <Route path="/InvoicePrint" element={<InvoicePrint />} />
                  {/* Tools */}
                  <Route path="/Gress-Period" element={<GracePeriod />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* FAILSAFE */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutWithNavbar>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
