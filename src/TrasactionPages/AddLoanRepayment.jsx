import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdDownload, IoMdPrint } from "react-icons/io";
import { useLocation } from "react-router-dom";
import profileempty from "../assets/profileempty.png";

const installments = [
  {
    srNo: 1,
    receiptNo: "R-1001",
    paymentDate: "25/09/2025",
    paidUpto: "Aug 2025",
    mode: "UPI",
    refNo: "TXN12345",
    amount: "₹10,000",
    interest: "₹500",
    loanAdj: "₹9,500",
    intDays: 30,
  },
  {
    srNo: 2,
    receiptNo: "R-1002",
    paymentDate: "25/10/2025",
    paidUpto: "Sep 2025",
    mode: "Cash",
    refNo: "-",
    amount: "₹10,000",
    interest: "₹400",
    loanAdj: "₹9,600",
    intDays: 28,
  },
];
const ItemList = [{}];
function AddLoanRepayment() {
  useEffect(() => {
    document.title = "SLF | Add Loan Repayment";
  }, []);

  const initialLoanInfo = {
    loanNo: "",
    customerName: "",
    mobileNumber: "",
    loanDate: "",
    loanAmount: "",
    interestRate: "",
    scheme: "",
    pendingLoanAmount: "",
    pendingInt: "",
    pendingDays: "",
    loanAmountPaid: "",
    chargesDue: "",
    lastInterestPaidDate: "",
    lastInterestPaidUpto: "",
  };
  // ✅ Initialize formData state
  const [formData, setFormData] = useState({
    Borrower_ProfileImg: "",
    Borrower_signature: "",
    CoBorrower_ProfileImg: "",
    CoBorrower_signature: "",
    OrnamentPhoto: "",
  });

 
 const location = useLocation();
  const { loanId, loanData } = location.state || {};  // <-- here you get it from navigate

  const [data, setData] = useState(null);
  console.log(data,"data")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const [isClose, setIsClose] = useState(false);
const [isAdvInt, setIsAdvInt] = useState(false);
  useEffect(() => {
    if (loanId) {
      fetchLoanData();
    }
  }, [loanId]);


 const [loanInfo, setLoanInfo] = useState({
    pendingDays: 0,
    pendingInt: 0,
    interestPercent: 0,
    loanAmountPaid: 0,
    payAmount: 0,
    balanceLoanAmt: 0,
    chargesAdjusted: 0,
    intPaidUpto: new Date(),
 });
   const [loanInfoForAdj, setloanInfoForAdj] = useState({
    pendingDays: 0,
    pendingInt: 0,
    interestPercent: 0,
    loanAmountPaid: 0,
    payAmount: 0,
    balanceLoanAmt: 0,
    chargesAdjusted: 0,
    intPaidUpto: new Date(),
 });
  const [paymentInfo, setPaymentInfo] = useState({
  mode: "",
  type: "",
  refNo: "",
  madeBy: ""
});


console.log(loanInfo, "loanInfo")
  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/Transactions/goldloan/getLoanRepayment/${loanId}`);
      setData(res.data);
    } catch (err) {
      setError("Failed to load loan data");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanInfo((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
  debugger
  if (!data?.loanApplication?.LoanPendingAmount || !data?.loanApplication?.approval_date) return;

  
  const approvalDate = new Date(data.loanApplication.approval_date);
  const today = new Date();
  const diffMs = today - approvalDate;
  const pendingDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  
  const slabs = JSON.parse(data.schemeData.interestRates);

  const currentSlab = slabs.find(s => pendingDays >= Number(s.from) && pendingDays <= Number(s.to));
  const interestPercent = currentSlab ? Number(currentSlab.addInt) : 0;

  // 4) calculate
  const pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount);
  const dailyIntAmt = (pendingLoanAmount * interestPercent / 100) / 365;
  const pendingInt = dailyIntAmt * pendingDays;

  setloanInfoForAdj(prev => ({
    ...prev,
    pendingDays,
    pendingInt: pendingInt.toFixed(2),
    interestPercent
  }));
}, [data]);

// final logic
 const handlePayAmountChange = (value) => {
  debugger
  let payAmount = parseFloat(value || 0);
  let charges = Number(data.loanApplication.total_unpaid_charges || 0); // unpaid charges
  let pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount || 0);
  let interestPercent = Number(loanInfoForAdj.interestPercent || 0);

  // daily interest for the loan
  let dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;

  // total interest for 365 days
  let totalYearInterest = dailyIntAmt * 365;

  // Always update the input value
  setloanInfoForAdj(prev => ({
    ...prev,
    payAmount: value,
  }));

  let remainingPay = payAmount;

  // Step 1: Deduct unpaid charges first
  let chargesAdjusted = Math.min(remainingPay, charges);
  remainingPay -= chargesAdjusted;

  // Step 2: Deduct interest next
  let interestAdjusted = Math.min(remainingPay, totalYearInterest);
  remainingPay -= interestAdjusted;

  // Step 3: Calculate how many days of interest are paid
  let daysPaidFor = Math.floor(interestAdjusted / dailyIntAmt);

  // Step 4: Deduct remaining amount from principal
  let loanAmtAdjusted = remainingPay;
  let balanceLoanAmt = pendingLoanAmount - loanAmtAdjusted;

  // Step 5: Calculate date up to which interest is paid
  let intPaidUpto = new Date(data.loanApplication.approval_date);
  intPaidUpto.setDate(intPaidUpto.getDate() + daysPaidFor);

  // Update state
  setloanInfoForAdj(prev => ({
    ...prev,
    chargesAdjusted: chargesAdjusted.toFixed(2),
    pendingInt: interestAdjusted.toFixed(2),
    loanAmountPaid: loanAmtAdjusted.toFixed(2),
    balanceLoanAmt: balanceLoanAmt.toFixed(2),
    pendingDays: daysPaidFor,
    intPaidUpto
  }));
};

  
 const validatePayAmount = () => {
debugger
  let payAmount = Number(loanInfoForAdj.payAmount || 0);
  let charges = Number(data.loanApplication.total_unpaid_charges || 0);
  let pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount || 0);
  let interestPercent = Number(loanInfoForAdj.interestPercent || 0);

  let dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;

  // cut charges
  let remainingPay = payAmount - charges;
  if (remainingPay < 0) return; // charges yet not covered, no need of validation

  // interest we can cover
  let days = Math.floor(remainingPay / dailyIntAmt);
  let exactInterestForDays = days * dailyIntAmt;

  let totalRequired = charges + exactInterestForDays;

  // remaining after exact interest?
  let diff = payAmount - totalRequired;

  // if diff is +-1 rupee ok small tolerance
  if (Math.abs(diff) > 1) {

    // suggest nearest valid top & bottom
    let lowerValid = totalRequired.toFixed(2);
    let upperValid = (totalRequired + dailyIntAmt).toFixed(2);

    alert(`Amount not valid — please enter either ${lowerValid} or ${upperValid}`);
  }
};





// useEffect(() => {
//     if (!data?.loanApplication?.LoanPendingAmount || !data?.loanApplication?.approval_date)
//       return;

//     const approvalDate = new Date(data.loanApplication.approval_date);
//     const today = new Date();

//     // 1) Calculate pending days
//     const diffMs = today - approvalDate;
//     const pendingDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     // 2) Parse interest slab
//     const slabs = JSON.parse(data.schemeData.interestRates || "[]");
//     const currentSlab = slabs.find(
//       (s) => pendingDays >= Number(s.from) && pendingDays <= Number(s.to)
//     );
//     const interestPercent = currentSlab ? Number(currentSlab.addInt) : 0;

//     // 3) Calculate pending interest
//     const pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount);
//     const dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;
//     const pendingInt = dailyIntAmt * pendingDays;

//     // 4) Charges
//     const totalUnpaidCharges = Number(data.loanApplication.total_unpaid_charges || 0);

//     // 5) Pay Amount = pendingLoanAmount + pendingInt + charges (if any)
//     const payAmount = pendingLoanAmount + pendingInt + totalUnpaidCharges;

//     // 6) Set all values in state
//     setLoanInfo({
//       pendingDays,
//       pendingInt: pendingInt.toFixed(2),
//       interestPercent,
//       loanAmountPaid: pendingLoanAmount.toFixed(2),
//       payAmount: payAmount.toFixed(2),
//       balanceLoanAmt: 0,
//       chargesAdjusted: totalUnpaidCharges.toFixed(2),
//       intPaidUpto: today,
//     });
//   }, [data]);

  useEffect(() => {
  if (!data?.loanApplication?.LoanPendingAmount || !data?.loanApplication?.approval_date)
    return;

  const approvalDate = new Date(data.loanApplication.approval_date);
  const today = new Date();
  const interestPaidUpto = new Date(data.loanApplication.InterestPaidUpto);

  const pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount);
  const totalUnpaidCharges = Number(data.loanApplication.total_unpaid_charges || 0);

  // *** override case: future interest already paid ***
  if (interestPaidUpto > today) {
    setLoanInfo({
      pendingDays: 0,
      pendingInt: "0.00",
      interestPercent: 0,
      loanAmountPaid: pendingLoanAmount.toFixed(2),
      payAmount: (pendingLoanAmount + totalUnpaidCharges).toFixed(2),
      balanceLoanAmt: 0,
      chargesAdjusted: totalUnpaidCharges.toFixed(2),
      intPaidUpto: interestPaidUpto,
    });
    return;
  }

  // 1) pending days
  const diffMs = today - approvalDate;
  const pendingDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 2) interest slab
  const slabs = JSON.parse(data.schemeData.interestRates || "[]");
  const currentSlab = slabs.find(
    (s) => pendingDays >= Number(s.from) && pendingDays <= Number(s.to)
  );
  const interestPercent = currentSlab ? Number(currentSlab.addInt) : 0;

  // 3) interest
  const dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;
  const pendingInt = dailyIntAmt * pendingDays;

  // 4) total pay
  const payAmount = pendingLoanAmount + pendingInt + totalUnpaidCharges;

  // 5) set state
  setLoanInfo({
    pendingDays,
    pendingInt: pendingInt.toFixed(2),
    interestPercent,
    loanAmountPaid: pendingLoanAmount.toFixed(2),
    payAmount: payAmount.toFixed(2),
    balanceLoanAmt: 0,
    chargesAdjusted: totalUnpaidCharges.toFixed(2),
    intPaidUpto: today,
  });
}, [data]);

   const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return '0.00';
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numAmount);
  };
// Safe JSON parser
const parseJSONData = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn("Failed to parse JSON:", error);
    return null;
  }
};

 const pledgeItems = parseJSONData(data?.loanApplication.Pledge_Item_List);
  const interestRates = parseJSONData(data?.loanApplication.Effective_Interest_Rates);

  // Calculate totals from pledge items
  const totalNos = pledgeItems?.reduce((sum, item) => sum + (parseInt(item.nos) || 0), 0);
  const totalGross = pledgeItems?.reduce((sum, item) => sum + (parseFloat(item.gross) || 0), 0);
  const totalNetWeight = pledgeItems?.reduce((sum, item) => sum + (parseFloat(item.netWeight) || 0), 0);
  const totalValuation = pledgeItems?.reduce((sum, item) => sum + (parseFloat(item.valuation) || 0), 0);
  return (
    <div className="flex flex-col items-center mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
          Add Loan Repayment
        </h2>

        <div className="flex items-center gap-5">
          <button className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px]  transition">
            Submit
          </button>
          <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px]  transition">
            Close
          </button>
        </div>
      </div>

      {/* Loan Information Section */}
      <div className="flex flex-col items-center ">
        {/* Header Section */}

        {/* Loan Information Section */}
      <div className="w-full max-w-[1290px] bg-white p-4 rounded-md">
  <h1 className="text-blue-900 font-semibold text-xl pb-3">
    Loan Information
  </h1>

  <div className="flex justify-between items-start gap-6">
    {/* Left Section - Loan Info */}
    <div className="flex flex-col gap-3 flex-1 text-sm">
      {/* Row 1 */}
     <div className="flex gap-2">

  {/* Loan No */}
  <div className="flex flex-col">
  <label className="text-gray-800 font-medium">Loan No</label>
  <input
    type="text"
    name="loanNo"
    disabled
    value={data?.loanApplication?.id}
    onChange={handleChange}
    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:outline-none w-[104px]
               disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
  />
</div>


  {/* Customer Name */}
  <div className="flex flex-col">
    <label className="text-gray-800 font-medium">Customer Name</label>
    <input
      type="text"
                    name="customerName"
                     disabled
      value={data?.loanApplication?.Print_Name}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:outline-none w-[186px]"
    />
  </div>

  {/* Mobile Number */}
  <div className="flex flex-col">
    <label className="text-gray-800 font-medium">Mobile Number</label>
    <input
      type="text"
      name="mobileNumber"
      disabled
      value={data?.loanApplication?.Mobile_Number}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:outline-none w-[109px]"
    />
  </div>

  {/* Loan Date */}
 <div className="flex flex-col">
  <label className="text-gray-800 font-medium">Loan Date</label>

  <input
    type="date"
                    name="lastInterestPaidUpto"
                      disabled
    value={
      data?.loanApplication?.approval_date
        ? new Date(
            data.loanApplication.approval_date.replace(" ", "T")
          ).toISOString().slice(0,10)
        : ""
    }
    onChange={handleChange}
    className="border border-gray-100 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
</div>



  {/* Loan Amount with Interest Button */}
  <div className="flex flex-col">
    <label className="text-gray-800 font-medium">Loan Amount</label>
    <div className="flex">
      <input
        type="text"
                      name="loanAmount"
                        disabled
      value={data?.loanApplication?.Loan_amount}
        onChange={handleChange}
        className="border border-gray-300 disabled:bg-gray-100 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:outline-none"
      />
      <button className="bg-[#0A2478] text-white px-2 py-2 rounded-r-md hover:bg-[#081c5b] text-xs w-[40px]">
        {loanInfo.interestRate || "18%"}
      </button>
    </div>
  </div>

  {/* Under the Scheme */}
  <div className="flex flex-col">
    <label className="text-gray-800 font-medium">Under the Scheme</label>
    <input
      type="text"
                    name="scheme"
                    disabled
     value={data?.schemeData?.schemeName}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:outline-none"
    />
  </div>

</div>


      {/* Row 2 */}
    <div className="flex gap-4">

  {/* Pending Loan Amount */}
  <div className="flex flex-col" style={{ width: "150px" }}>
    <label className="text-gray-800 font-medium">Pending Loan Amount</label>
    <input
      type="text"
                    name="pendingLoanAmount"
                     disabled
      value={data?.loanApplication?.LoanPendingAmount}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  {/* Pending Int */}
  <div className="flex flex-col" style={{ width: "120px" }}>
    <label className="text-gray-800 font-medium">Pending Int</label>
    <input
      type="text"
                    name="pendingInt"
                    disabled
      value={loanInfo.pendingInt}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  {/* Pending Days */}
  <div className="flex flex-col" style={{ width: "120px" }}>
    <label className="text-gray-800  font-medium">Pending Days</label>
    <input
      type="text"
                    name="pendingDays"
                    disabled
      value={loanInfo.pendingDays}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  {/* Loan Amount Paid */}
  <div className="flex flex-col" style={{ width: "130px" }}>
    <label className="text-gray-800 font-medium">Loan Amount Paid</label>
    <input
      type="text"
                    name="loanAmountPaid"
                    disabled
      value={data?.loanApplication?.LoanAmountPaid}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  {/* Charges Due */}
  <div className="flex flex-col" style={{ width: "130px" }}>
    <label className="text-gray-800 font-medium">Charges Due</label>
    <input
      type="text"
                    name="chargesDue"
                    disabled
      value={data?.loanApplication?.total_unpaid_charges}
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />
  </div>

</div>

      {/* Row 3 */}
     <div className="flex gap-4">

  {/* Last Interest Paid Date */}
  <div className="flex flex-col" style={{ width: "150px" }}>
    <label className="text-gray-800 font-medium">Last Interest Paid Date</label>
    <input
      type="date"
      name="lastInterestPaidDate"
                    value={loanInfo.lastInterestPaidDate}
                      disabled
      onChange={handleChange}
      className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  {/* Last Interest Paid Upto */}
  <div className="flex flex-col" style={{ width: "150px" }}>
  <label className="text-gray-800 font-medium">Last Interest Paid Upto</label>
  <input
                    type="date"
                      disabled
    name="lastInterestPaidUpto"
    value={loanInfo.lastInterestPaidUpto || data?.loanApplication?.InterestPaidUpto || ""}
    onChange={handleChange}
    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
</div>


</div>

    </div>

    {/* Right Section - Images */}
    <div className="flex gap-3 mt-[-40px]">

  {/* Customer */}
  <div className="flex flex-col items-center">
    <p className="font-medium mb-1 text-xs">Customer</p>
    <img
      src={data?.loanApplication.borrower_profileImage ? data?.loanApplication.borrower_profileImage : profileempty}
      alt="Customer"
      className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
    />

    <div className="mt-1 border w-[100px] h-[26px] flex items-center justify-center bg-white rounded-[4px]">
      {data?.loanApplication.borrower_signature ? (
        <img src={data?.loanApplication.borrower_signature} alt="Signature" className="w-full h-full object-contain" />
      ) : (
        <span className="text-gray-400 text-[9px]">No Signature</span>
      )}
    </div>
  </div>

  {/* Co-Borrower */}
  <div className="flex flex-col items-center">
    <p className="font-medium mb-1 text-xs">Co-Borrower</p>
    <img
      src={data?.loanApplication.coborrower_profileImage ? data?.loanApplication.coborrower_profileImage : profileempty}
      alt="Co-Borrower"
      className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
    />

    <div className="mt-1 border w-[100px] h-[26px] flex items-center justify-center bg-white rounded-[4px]">
      {data?.loanApplication.coborrower_signature ? (
        <img src={data?.loanApplication.coborrower_signature} alt="Signature" className="w-full h-full object-contain" />
      ) : (
        <span className="text-gray-400 text-[9px]">No Signature</span>
      )}
    </div>
  </div>

  {/* Ornament Photo */}
  <div className="flex flex-col items-center">
    <p className="font-medium mb-1 text-xs">Ornament Photo</p>
    <img
      src={data?.loanApplication.Ornament_Photo ? data?.loanApplication.Ornament_Photo : profileempty}
      alt="Ornament"
      className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
    />
  </div>

</div>

  </div>
</div>



        {/* Payment Section */}
         <div className="mt-4 w-[1290px] bg-white rounded-md p-4">
      <h1 className="text-blue-900 font-semibold text-xl pb-2">Payment</h1>

      {/* Top Checkboxes */}
      <div className="flex gap-6 mb-4">
        {/* Is Close */}
      <div className="flex items-center gap-2">
  <input
    type="checkbox"
    id="isClose"
    className="accent-[#0A2478] h-4 w-4"
    checked={isClose}
    onChange={(e) => {
      const checked = e.target.checked;
      setIsClose(checked);
if (checked) setIsAdvInt(false);
      // When Is Close is checked, Is Adv. Int is automatically true
      // setIsAdvInt(checked ? true : isAdvInt);
    }}
  />
  <label htmlFor="isClose" className="font-medium text-gray-900">
    Is Close
  </label>
</div>

<div className="flex items-center gap-2">
  <input
    type="checkbox"
    id="isAdvInt"
    className="accent-[#0A2478] h-4 w-4"
    checked={isAdvInt}
    onChange={(e) => {
      const checked = e.target.checked;

      setIsAdvInt(checked);

      // When Is Adv. Int is clicked true, Is Close must be false
      if (checked) setIsClose(false);
    }}
  />
  <label htmlFor="isAdvInt" className="font-medium text-gray-900">
    Is Adv. Int
  </label>
</div>


      </div>

          {/* Row 1: Individual Fields */}
          {
            isClose && (
              <div className="flex flex-wrap gap-x-6 gap-y-4">
      {/* Pay Amount */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Pay Amount</label>
        <input
          type="text"
          value={loanInfo.payAmount}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          disabled={isClose}
        />
      </div>

      {/* Interest Adjusted */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Interest Adjusted</label>
        <input
          type="text"
          value={loanInfo.pendingInt}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          disabled={isClose}
        />
      </div>

      {/* Loan Amt Adjusted */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Loan Amt Adjusted</label>
        <input
          type="text"
          value={loanInfo.loanAmountPaid}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          disabled={isClose}
        />
      </div>

      {/* Balance Loan Amt */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Balance Loan Amt</label>
        <input
          type="text"
          value={loanInfo.balanceLoanAmt}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          disabled={isClose}
        />
      </div>

      {/* Charges Adjusted */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Charges Adjusted</label>
        <input
          type="text"
          value={loanInfo.chargesAdjusted}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          disabled={isClose}
        />
      </div>

      {/* Interest Paid For */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Interest Paid For</label>
        <input
          type="text"
          value={loanInfo.pendingDays}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          disabled={isClose}
        />
      </div>

      {/* Int. Paid Upto (Date Picker) */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Int. Paid Upto</label>
        <DatePicker
          selected={loanInfo.intPaidUpto}
          onChange={(date) =>
            setLoanInfo((prev) => ({ ...prev, intPaidUpto: date }))
          }
          dateFormat="dd/MM/yyyy"
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
          disabled={isClose}
        />
      </div>
    </div>
            )
          }
          {
           isAdvInt && (
              <div className="flex flex-wrap gap-x-6 gap-y-4">
      {/* Pay Amount */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Pay Amount</label>
      <input
  type="text"
  value={loanInfoForAdj.payAmount}
  onChange={(e) => handlePayAmountChange(e.target.value)}
  onBlur={validatePayAmount}
  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
/>


      </div>

                

      {/* Interest Adjusted */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Interest Adjusted</label>
        <input
  type="text"
  value={loanInfoForAdj.pendingInt}
  onChange={(e) =>
    setloanInfoForAdj((prev) => ({
      ...prev,
      pendingInt: e.target.value,
    }))
  }
  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
/>

      </div>

      {/* Loan Amt Adjusted */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Loan Amt Adjusted</label>
        <input
          type="text"
          value={loanInfoForAdj.loanAmountPaid}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
         
        />
      </div>

      {/* Balance Loan Amt */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Balance Loan Amt</label>
        <input
          type="text"
          value={loanInfoForAdj.balanceLoanAmt}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          
        />
      </div>

      {/* Charges Adjusted */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Charges Adjusted</label>
        <input
          type="text"
          value={loanInfoForAdj.chargesAdjusted}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
         disabled
        />
      </div>

      {/* Interest Paid For */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Interest Paid For</label>
        <input
          type="text"
          value={loanInfoForAdj.pendingDays}
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
         
        />
      </div>

      {/* Int. Paid Upto (Date Picker) */}
      <div className="flex flex-col gap-1 w-[150px]">
        <label className="text-gray-900 font-medium">Int. Paid Upto</label>
        <DatePicker
          selected={loanInfoForAdj.intPaidUpto}
          onChange={(date) =>
            setLoanInfo((prev) => ({ ...prev, intPaidUpto: date }))
          }
                    dateFormat="dd/MM/yyyy"
                    disabled
          className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
          
        />
      </div>
    </div>
            )
          }
      

      <p className="text-sm text-gray-500 mt-1 ml-1">Amount in words</p>

      {/* Row 2: Payment Details (Individual Fields) */}
      <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">
        {/* Mode of Payment */}
        <div className="flex flex-col gap-1 w-[200px]">
          <label className="text-gray-900 font-medium">Mode of Payment</label>
          <select
  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  disabled={isClose}
  value={paymentInfo.mode}
  onChange={(e) =>
    setPaymentInfo({ ...paymentInfo, mode: e.target.value })
  }
>
  <option>--Select--</option>
  <option>Cash</option>
  <option>Net Banking</option>
  <option>Credit Note</option>
</select>

        </div>

        {/* Type of Payment */}
        <div className="flex flex-col gap-1 w-[150px]">
          <label className="text-gray-900 font-medium">Type of Payment</label>
          <input
  type="text"
  placeholder="Cash"
  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  disabled={isClose}
  value={paymentInfo.type}
  onChange={(e) =>
    setPaymentInfo({ ...paymentInfo, type: e.target.value })
  }
/>

        </div>

        {/* Payment Ref. No */}
        <div className="flex flex-col gap-1 w-[200px]">
          <label className="text-gray-900 font-medium">Payment Ref. No</label>
         <input
  type="text"
  placeholder="Reference Number"
  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  disabled={isClose}
  value={paymentInfo.refNo}
  onChange={(e) =>
    setPaymentInfo({ ...paymentInfo, refNo: e.target.value })
  }
/>

        </div>

        {/* Payment Made By */}
        <div className="flex flex-col gap-1 w-[200px]">
          <label className="text-gray-900 font-medium">Payment Made By</label>
          <input
  type="text"
  placeholder="Name"
  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  disabled={isClose}
  value={paymentInfo.madeBy}
  onChange={(e) =>
    setPaymentInfo({ ...paymentInfo, madeBy: e.target.value })
  }
/>

        </div>
      </div>
    </div>

        {/* Pledge Item List */}
        <div className="flex justify-center mb-6">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-[#0A2478] text-lg">
              Pledge Item List
            </h3>
            <div className="w-full text-xs border border-gray-300">
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-2 py-3 border-r-2 border-white">
                  Particulars
                </div>
                <div className="w-16 p-2 border-r-2 border-white text-center">
                  Nos.
                </div>
                <div className="w-24 p-2 border-r-2 border-white text-center">
                  Gross
                </div>
                <div className="w-24 p-2 border-r-2 border-white text-center">
                  Net Weight
                </div>
                <div className="w-28 p-2 border-r-2 border-white text-center">
                  Purity
                </div>
                <div className="w-24 p-2 border-r-2 border-white text-center">
                  Rate
                </div>
                <div className="w-28 p-2 border-r-2 border-white text-center">
                  Valuation
                </div>
                <div className="w-28 p-2 text-center">Remark</div>
              </div>

              {/* Dynamic Rows */}
              {pledgeItems?.length > 0 ? (
                <>
                  {pledgeItems.map((item, index) => (
                    <div key={item.id || index} className="flex border-t border-gray-300">
                      <div className="flex-1 p-2 border-r border-gray-300">
                        {item.particular || 'Gold'}
                      </div>
                      <div className="w-16 p-2 border-r border-gray-300 text-center">
                        {item.nos || 1}
                      </div>
                      <div className="w-24 p-2 border-r border-gray-300 text-center">
                        {formatCurrency(item.gross)}
                      </div>
                      <div className="w-24 p-2 border-r border-gray-300 text-center">
                        {formatCurrency(item.netWeight)}
                      </div>
                      <div className="w-28 p-2 border-r border-gray-300 text-center">
                        {item.purity || 'Gold 20K'}
                      </div>
                      <div className="w-24 p-2 border-r border-gray-300 text-center">
                        {formatCurrency(item.rate)}
                      </div>
                      <div className="w-28 p-2 border-r border-gray-300 text-center">
                        {formatCurrency(item.valuation)}
                      </div>
                      <div className="w-28 p-2 text-center">
                        {item.remark || '-'}
                      </div>
                    </div>
                  ))}

                  {/* Total Row */}
                  <div className="flex border-t border-gray-300 bg-gray-50">
                    <div className="flex-1 p-2 border-r border-gray-300 font-semibold">
                      Total
                    </div>
                    <div className="w-16 p-2 border-r border-gray-300 text-center font-semibold">
                      {totalNos}
                    </div>
                    <div className="w-24 p-2 border-r border-gray-300 text-center font-semibold">
                      {formatCurrency(totalGross)}
                    </div>
                    <div className="w-24 p-2 border-r border-gray-300 text-center font-semibold">
                      {formatCurrency(totalNetWeight)}
                    </div>
                    <div className="w-28 p-2 border-r border-gray-300 text-center"></div>
                    <div className="w-24 p-2 border-r border-gray-300 text-center"></div>
                    <div className="w-28 p-2 border-r border-gray-300 text-center font-semibold">
                      {formatCurrency(totalValuation)}
                    </div>
                    <div className="w-28 p-2 text-center"></div>
                  </div>
                </>
              ) : (
                <div className="flex border-t border-gray-300">
                  <div className="flex-1 p-4 text-center text-gray-500">
                    No pledge items found
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Installments Table */}
        <div className="my-6 w-[1270px] bg-white">
          <h1 className="text-blue-900 font-semibold text-xl py-2">
            Installments
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-sm">
                  <th className="p-2 border border-gray-300">Sr. No</th>
                  <th className="p-2 border border-gray-300">Receipt No</th>
                  <th className="p-2 border border-gray-300">Payment Date</th>
<th className="p-2 border border-gray-300">
  <input
    type="date"
    value={formData.paidUpto}
    onChange={(e) =>
      setFormData({ ...formData, paidUpto: e.target.value })
    }
    className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
</th>
                  <th className="p-2 border border-gray-300">
                    Mode of Payment
                  </th>
                  <th className="p-2 border border-gray-300">
                    Payment Ref. No
                  </th>
                  <th className="p-2 border border-gray-300">Amount</th>
                  <th className="p-2 border border-gray-300">Interest</th>
                  <th className="p-2 border border-gray-300">Loan Amt. Adj</th>
                  <th className="p-2 border border-gray-300">Int Paid Days</th>
                  <th className="p-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {installments.map((row, i) => (
                  <tr key={i} className="text-center text-sm hover:bg-gray-50">
                    <td className="p-2 border border-gray-300">{row.srNo}</td>
                    <td className="p-2 border border-gray-300">
                      {row.receiptNo}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.paymentDate}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.paidUpto}
                    </td>
                    <td className="p-2 border border-gray-300">{row.mode}</td>
                    <td className="p-2 border border-gray-300">{row.refNo}</td>
                    <td className="p-2 border border-gray-300">{row.amount}</td>
                    <td className="p-2 border border-gray-300">
                      {row.interest}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.loanAdj}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.intDays}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <div className="flex gap-4 text-lg items-center justify-center">
                        <IoMdDownload />
                        <IoMdPrint />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLoanRepayment;
