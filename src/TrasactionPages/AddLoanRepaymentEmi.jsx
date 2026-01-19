// const AddLoanRepaymentEmi = () => {
//   return <div></div>;
// };

// export default AddLoanRepaymentEmi;
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdDownload, IoMdPrint } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
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
function AddLoanRepaymentEmi() {
  useEffect(() => {
    document.title = "SLF | Add Loan Repayment";
  }, []);
  // ✅ Initialize formData state
  const [formData, setFormData] = useState({
    Borrower_ProfileImg: "",
    Borrower_signature: "",
    CoBorrower_ProfileImg: "",
    CoBorrower_signature: "",
    OrnamentPhoto: "",
  });
  const location = useLocation();
  const { loanId, loanData } = location.state || {}; // <-- here you get it from navigate
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  console.log(data, "data");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClose, setIsClose] = useState(false);
  const [isAdvInt, setIsAdvInt] = useState(false);
  const [isAdvIntCheck, setIsAdvIntCheck] = useState(false);
  useEffect(() => {
    if (loanId) {
      fetchLoanData();
    }
  }, [loanId]);

  const [loanInfo, setLoanInfo] = useState({
    emiAmount: 0, // One month EMI
    interestAmount: 0, // Interest part of current EMI
    payAmount: 0, // = emiAmount (auto)
    emiPaidCount: 0, // Already paid EMI count
    interestPaidFor: 0, // emiPaidCount + 1
    balanceLoanAmt: 0, // Net_Payable - (interestPaidFor * emiAmount)
    intPaidUptoText: "", // approval_date + interestPaidFor months
    interestPercent: 0, // Current slab %
  });

  console.log(loanInfo, "loanInfo");
  const [intrestPercentage, setintrestPercentage] = useState(null);
  console.log(intrestPercentage, "intrestPercentage");
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
  const isReducing =
    data?.schemeData?.interestType?.toLowerCase() === "reducing";

  console.log(loanInfoForAdj, "loanInfoForAdj");
  const [paymentInfo, setPaymentInfo] = useState({
    mode: "",
    type: "",
    refNo: "",
    madeBy: "",
    creditNote: "",
    creditNoteAmount: 0,
    utilizedAmount: 0,
    unutilizedAmount: 0,
  });

  console.log(paymentInfo, "paymentInfo");
  const [creditNotes, setCreditNotes] = useState([]);
  console.log(creditNotes);
  useEffect(() => {
    if (loanData.BorrowerId) {
      fetchCreditNotes(loanData.BorrowerId);
    }
  }, [loanData.BorrowerId]);

  const fetchCreditNotes = async (customerId) => {
    try {
      const res = await axios.get(
        `${API}/credit-note/credit-notes/customer/${customerId}`,
      );
      if (res.data.success) {
        setCreditNotes(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching credit notes:", error);
    }
  };

  const calculateEMI = (P, annualRate, months, type) => {
    const r = annualRate / 12 / 100;

    if (type === "Flat") {
      const totalInterest = P * r * months;
      const totalPayable = P + totalInterest;
      const emi = totalPayable / months;

      return {
        emi,
        totalInterest,
        totalPayable,
      };
    }

    // Reducing
    const emi =
      (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

    const totalPayable = emi * months;
    const totalInterest = totalPayable - P;

    return {
      emi,
      totalInterest,
      totalPayable,
    };
  };

  useEffect(() => {
    if (!data?.loanApplication || !data?.schemeData) return;

    const P = Number(data.loanApplication.Loan_amount);
    const tenureMonths = Number(data.loanApplication.Loan_Tenure);

    // 🔹 Calculate elapsed months since approval
    const approvalDate = new Date(data.loanApplication.approval_date);
    const today = new Date();

    const elapsedMonths =
      (today.getFullYear() - approvalDate.getFullYear()) * 12 +
      (today.getMonth() - approvalDate.getMonth());

    const currentMonth = Math.max(elapsedMonths, 0); // if same month → 0

    // 🔹 Pick slab based on CURRENT month (0,1,2…)
    const slabs = data.schemeData.interestRates || [];
    const slab = slabs.find(
      (s) => currentMonth >= Number(s.from) && currentMonth <= Number(s.to),
    );

    const annualRate = slab ? Number(slab.addInt) : 0;
    setintrestPercentage(annualRate);

    const type = data.schemeData.interestType; // "Flat" or "Reducing"

    const { emi, totalInterest, totalPayable } = calculateEMI(
      P,
      annualRate,
      tenureMonths,
      type,
    );

    setLoanInfo((prev) => ({
      ...prev,
      PendingEMI: emi.toFixed(2),
      PendingEMICount: tenureMonths,
      payAmount: totalPayable.toFixed(2),
      pendingInt: totalInterest.toFixed(2),
      loanAmountPaid: "0.00",
      balanceLoanAmt: P.toFixed(2),
    }));
  }, [data]);

  console.log(loanInfo, "loanInfo");

  useEffect(() => {
    if (!data?.loanApplication || !data?.schemeData) return;

    const P = Number(data.loanApplication.Loan_amount);
    const tenure = Number(data.loanApplication.Loan_Tenure);
    const netPayable = Number(data.loanApplication.Net_Payable || 0);

    // slab by current month (0 → 6 → 12 logic)
    const approval = new Date(data.loanApplication.approval_date);
    const today = new Date();

    const elapsedMonths =
      (today.getFullYear() - approval.getFullYear()) * 12 +
      (today.getMonth() - approval.getMonth());

    const currentMonth = Math.max(elapsedMonths, 0);

    const slabs = data.schemeData.interestRates || [];
    const slab = slabs.find(
      (s) => currentMonth >= Number(s.from) && currentMonth <= Number(s.to),
    );

    const annualRate = slab ? Number(slab.addInt) : 0;

    const type = data.schemeData.interestType; // Flat / Reducing
    const { emi } = calculateEMI(P, annualRate, tenure, type);

    const paidCount = Number(data.loanApplication.EMIPaidCount || 0);
    const nextCount = paidCount;

    const balance = netPayable - nextCount * emi;

    const paidUpto = new Date(approval);
    paidUpto.setMonth(paidUpto.getMonth() + nextCount);

    setLoanInfo({
      emiAmount: emi.toFixed(2),
      interestAmount: (emi - P / tenure).toFixed(2), // basic split for Flat
      payAmount: emi.toFixed(2),
      emiPaidCount: paidCount,
      interestPaidFor: nextCount,
      balanceLoanAmt: Math.max(balance, 0).toFixed(2),
      intPaidUptoText: paidUpto.toISOString().slice(0, 10),
      interestPercent: annualRate,
    });
  }, [data]);

  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API}/Transactions/goldloan/getLoanRepayment/${loanId}`,
      );
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

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "0.00";
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);
  };
  // Safe JSON parser
  const parseJSONData = (value) => {
    try {
      if (!value) return null;

      // If already an array → return as-is
      if (Array.isArray(value)) return value;

      // If already an object → return object (NOT JSON string)
      if (typeof value === "object") return value;

      // If string is "[object Object]" → invalid JSON
      if (value === "[object Object]") return null;

      // Try parsing JSON string
      return JSON.parse(value);
    } catch (error) {
      console.warn("Failed to parse JSON:", error);
      return null;
    }
  };

  const pledgeItems = parseJSONData(data?.loanApplication.Pledge_Item_List);
  const interestRates = parseJSONData(
    data?.loanApplication.Effective_Interest_Rates,
  );

  // Calculate totals from pledge items
  const totalNos = pledgeItems?.reduce(
    (sum, item) => sum + (parseInt(item.nos) || 0),
    0,
  );
  const totalGross = pledgeItems?.reduce(
    (sum, item) => sum + (parseFloat(item.gross) || 0),
    0,
  );
  const totalNetWeight = pledgeItems?.reduce(
    (sum, item) => sum + (parseFloat(item.netWeight) || 0),
    0,
  );
  const totalValuation = pledgeItems?.reduce(
    (sum, item) => sum + (parseFloat(item.valuation) || 0),
    0,
  );

  const handleRepaymentSubmit = () => {
    debugger;

    let finalLoanInfo;

    if (isClose === true) {
      // 👉 Highest Priority
      finalLoanInfo = loanInfo;
    } else if (isAdvInt === true) {
      // 👉 Advance Interest Mode
      finalLoanInfo = loanInfoForAdj;
    } else {
      // 👉 Normal Repayment
      finalLoanInfo = loanInfoForAdj;
    }

    const finalObject = {
      loanId: data?.loanApplication?.id,
      isClose: isClose,
      AdvanceInt: isAdvInt,
      paymentInfo: paymentInfo,
      loanInfo: finalLoanInfo,
      uptoInterest: loanInfo.pendingInt,
    };

    console.log("SEND TO BACKEND:", finalObject);

    axios
      .post(`${API}/Transactions/loanRepaymentForAdjLoan`, finalObject)
      .then((res) => {
        console.log("RESPONSE:", res.data);

        if (res.status === 200) {
          alert("Repayment Successfully!");
          navigate("/Loan-Application");
        }
      })
      .catch((err) => {
        console.log("ERROR:", err);
        alert("Something went wrong");
      });
  };

  const handleCreditNoteSelect = (creditNoteId) => {
    debugger;

    const selected = creditNotes.find(
      (item) => item.credit_note_id === creditNoteId,
    );

    if (!selected) {
      setPaymentInfo((prev) => ({
        ...prev,
        creditNote: "",
        creditNoteAmount: 0,
        utilizedAmount: "0.00",
        unutilizedAmount: "0.00",
      }));
      return;
    }

    // 1️⃣ Determine Pay Amount Based on Conditions
    let payAmount = 0;

    if (isClose) {
      payAmount = Number(loanInfo?.payAmount || 0);
    } else if (isAdvInt) {
      payAmount = Number(loanInfoForAdj?.payAmount || 0);
    } else {
      payAmount = Number(loanInfo?.payAmount || 0);
    }

    // 2️⃣ Credit Note Amount
    const creditAmount = Number(selected.Unutilized_Amount || 0);

    let utilized = 0;
    let unutilized = 0;

    // 3️⃣ Apply Logic
    if (payAmount >= creditAmount) {
      utilized = creditAmount;
      unutilized = 0;
    } else {
      utilized = payAmount;
      unutilized = creditAmount - payAmount;
    }

    // Convert to 2 decimals
    utilized = utilized.toFixed(2);
    unutilized = unutilized.toFixed(2);

    // 4️⃣ Update paymentInfo
    setPaymentInfo((prev) => ({
      ...prev,
      creditNote: selected.credit_note_id,
      creditNoteAmount: creditAmount.toFixed(2),
      utilizedAmount: utilized,
      unutilizedAmount: unutilized,
    }));
  };

  return (
    <div className="flex flex-col items-center mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm sticky top-[80px] z-40 bg-white">
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
          Add Loan Repayment
        </h2>

        <div className="flex items-center gap-5">
          <button
            className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] transition"
            onClick={handleRepaymentSubmit}
          >
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
        <div className=" max-w-[1290px] bg-white mt-5 rounded-md">
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
                  <label className="text-gray-800 font-medium">
                    Customer Name
                  </label>
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
                  <label className="text-gray-800 font-medium">
                    Mobile Number
                  </label>
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
                            data?.loanApplication?.approval_date.replace(
                              " ",
                              "T",
                            ),
                          )
                            .toISOString()
                            .slice(0, 10)
                        : ""
                    }
                    onChange={handleChange}
                    className="border border-gray-100 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Loan Amount with Interest Button */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium">
                    Loan Amount
                  </label>
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
                      {intrestPercentage ? `${intrestPercentage}%` : "-"}
                    </button>
                  </div>
                </div>

                {/* Under the Scheme */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium">
                    Under the Scheme
                  </label>
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
                  <label className="text-gray-800 font-medium">
                    Pending Loan Amount
                  </label>
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
                  <label className="text-gray-800 font-medium">
                    Pending EMI
                  </label>
                  <input
                    type="text"
                    name="pendingInt"
                    disabled
                    value={loanInfo.emiAmount}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Pending Days */}
                <div className="flex flex-col" style={{ width: "120px" }}>
                  <label className="text-gray-800  font-medium">
                    Pending EMI Count
                  </label>
                  <input
                    type="text"
                    name="pendingDays"
                    disabled
                    value={data?.loanApplication?.PendingEMICount}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Loan Amount Paid */}
                <div className="flex flex-col" style={{ width: "130px" }}>
                  <label className="text-gray-800 font-medium">
                    Loan Amount Paid
                  </label>
                  <input
                    type="text"
                    name="loanAmountPaid"
                    disabled
                    value={data?.loanApplication?.LoanEmiAmountpaid}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Charges Due */}
                <div className="flex flex-col" style={{ width: "130px" }}>
                  <label className="text-gray-800 font-medium">
                    Charges Due
                  </label>
                  <input
                    type="text"
                    name="chargesDue"
                    disabled
                    value={data?.loanApplication?.total_unpaid_charges}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col" style={{ width: "130px" }}>
                  <label className="text-gray-800 font-medium">
                    EMI Paid Count
                  </label>
                  <input
                    type="text"
                    name="chargesDue"
                    disabled
                    value={data?.loanApplication?.EMIPaidCount}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex gap-4">
                {/* Last Interest Paid Date */}
                <div className="flex flex-col" style={{ width: "150px" }}>
                  <label className="text-gray-800 font-medium">
                    Last EMI Paid Date
                  </label>
                  <input
                    type="date"
                    name="LastInterestPaidDate"
                    value={
                      data?.loanApplication?.LastEmiPaidDate
                        ? new Date(data.loanApplication.LastEmiPaidDate)
                            .toISOString()
                            .slice(0, 10)
                        : ""
                    }
                    disabled
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Last Interest Paid Upto */}
                <div className="flex flex-col" style={{ width: "150px" }}>
                  <label className="text-gray-800 font-medium">
                    Last EMI Paid Upto
                  </label>
                  <input
                    type="date"
                    disabled
                    name="lastInterestPaidUpto"
                    value={data?.loanApplication?.LastEmiPaidUpto || ""}
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
                  src={
                    data?.loanApplication.borrower_profileImage
                      ? data?.loanApplication.borrower_profileImage
                      : profileempty
                  }
                  alt="Customer"
                  className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
                />

                <div className="mt-1 border w-[100px] h-[26px] flex items-center justify-center bg-white rounded-[4px]">
                  {data?.loanApplication.borrower_signature ? (
                    <img
                      src={data?.loanApplication.borrower_signature}
                      alt="Signature"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-[9px]">
                      No Signature
                    </span>
                  )}
                </div>
              </div>

              {/* Co-Borrower */}
              <div className="flex flex-col items-center">
                <p className="font-medium mb-1 text-xs">Co-Borrower</p>
                <img
                  src={
                    data?.loanApplication.coborrower_profileImage
                      ? data?.loanApplication.coborrower_profileImage
                      : profileempty
                  }
                  alt="Co-Borrower"
                  className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
                />

                <div className="mt-1 border w-[100px] h-[26px] flex items-center justify-center bg-white rounded-[4px]">
                  {data?.loanApplication.coborrower_signature ? (
                    <img
                      src={data?.loanApplication.coborrower_signature}
                      alt="Signature"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-[9px]">
                      No Signature
                    </span>
                  )}
                </div>
              </div>

              {/* Ornament Photo */}
              <div className="flex flex-col items-center">
                <p className="font-medium mb-1 text-xs">Ornament Photo</p>
                <img
                  src={
                    data?.loanApplication.Ornament_Photo
                      ? data?.loanApplication.Ornament_Photo
                      : profileempty
                  }
                  alt="Ornament"
                  className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className=" w-[1290px] bg-white rounded-md mt-5">
          <h1 className="text-blue-900 font-semibold text-xl pb-2">Payment</h1>

          {/* Row 1: Individual Fields */}

          {/* Row 1: EMI आधारित Fields */}
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {/* Pay Amount = EMI */}
            <div className="flex flex-col gap-1 w-[150px]">
              <label className="text-gray-900 font-medium">
                Pay Amount (EMI)
              </label>
              <input
                type="text"
                value={loanInfo.payAmount}
                disabled
                className="border border-gray-300 bg-gray-100 rounded-md px-3 py-2"
              />
            </div>

            {/* Interest Amount – ONLY for Reducing */}
            {isReducing && (
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Interest Amount
                </label>
                <input
                  type="text"
                  value={loanInfo.interestAmount}
                  disabled
                  className="border border-gray-300 bg-gray-100 rounded-md px-3 py-2"
                />
              </div>
            )}

            {/* Balance Loan Amt */}
            <div className="flex flex-col gap-1 w-[150px]">
              <label className="text-gray-900 font-medium">
                Balance Loan Amt
              </label>
              <input
                type="text"
                value={loanInfo.balanceLoanAmt}
                disabled
                className="border border-gray-300 bg-gray-100 rounded-md px-3 py-2"
              />
            </div>

            {/* EMI Paid */}
            <div className="flex flex-col gap-1 w-[150px]">
              <label className="text-gray-900 font-medium">EMI Paid</label>
              <input
                type="text"
                value={loanInfo.interestPaidFor}
                disabled
                className="border border-gray-300 bg-gray-100 rounded-md px-3 py-2"
              />
            </div>

            {/* Int. Paid Upto */}
            <div className="flex flex-col gap-1 w-[150px]">
              <label className="text-gray-900 font-medium">
                Int. Paid Upto
              </label>
              <input
                type="text"
                value={loanInfo.intPaidUptoText}
                disabled
                className="border border-gray-300 bg-gray-100 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">
            {/* Mode of Payment */}
            {/* Mode of Payment */}
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">
                Mode of Payment
              </label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={paymentInfo.mode}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, mode: e.target.value })
                }
              >
                <option value="">--Select--</option>
                <option value="Cash">Cash</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Credit Note">Credit Note</option>
              </select>
            </div>

            {/* Type of Payment dynamic */}
            {paymentInfo.mode === "Cash" && (
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Type of Payment
                </label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={paymentInfo.type}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, type: e.target.value })
                  }
                >
                  <option value="">--Select--</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            )}

            {paymentInfo.mode === "Net Banking" && (
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">
                  Bank Details
                </label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={paymentInfo.type}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, type: e.target.value })
                  }
                >
                  <option value="">--Select--</option>
                  <option value="HDFC">HDFC</option>
                  <option value="SBI">SBI</option>
                </select>
              </div>
            )}

            {paymentInfo.mode === "Credit Note" && (
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">
                  Select Credit Note
                </label>

                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={paymentInfo.creditNote}
                  onChange={(e) => handleCreditNoteSelect(e.target.value)}
                >
                  <option value="">--Select--</option>

                  {creditNotes.map((item) => (
                    <option key={item.id} value={item.credit_note_id}>
                      {item.credit_note_id} - ₹{item.Unutilized_Amount}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {paymentInfo.mode === "Credit Note" && paymentInfo.creditNote && (
              <div className="flex gap-3 ">
                {/* Utilized Amount */}
                <div className="flex flex-col gap-1 w-[200px]">
                  <label className="text-gray-900 font-medium">
                    Utilized Amount
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.utilizedAmount}
                    disabled
                    className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                  />
                </div>

                {/* Unutilized Amount */}
                <div className="flex flex-col gap-1 w-[200px]">
                  <label className="text-gray-900 font-medium">
                    Unutilized Amount
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.unutilizedAmount}
                    disabled
                    className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                  />
                </div>
              </div>
            )}

            {/* Payment Ref. No */}
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">
                Payment Ref. No
              </label>
              <input
                type="text"
                placeholder="Reference Number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={paymentInfo.refNo}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, refNo: e.target.value })
                }
              />
            </div>

            {/* Payment Made By */}
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">
                Payment Made By
              </label>
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={paymentInfo.madeBy}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, madeBy: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Pledge Item List */}
        <div className="flex justify-center mb-6 mt-5">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-[#0A2478] text-lg">
              Pledge Item List
            </h3>

            <div className="w-full text-xs border border-gray-300">
              {/* Header */}
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-3 border-r border-white text-center">
                  Particulars
                </div>
                <div className="w-16 p-3 border-r border-white text-center">
                  Nos.
                </div>
                <div className="w-24 p-3 border-r border-white text-center">
                  Gross
                </div>
                <div className="w-24 p-3 border-r border-white text-center">
                  Net Weight
                </div>
                <div className="w-24 p-3 border-r border-white text-center">
                  Purity
                </div>
                <div className="w-28 p-3 border-r border-white text-center">
                  Calculated Purity
                </div>
                <div className="w-24 p-3 border-r border-white text-center">
                  Rate
                </div>
                <div className="w-28 p-3 border-r border-white text-center">
                  Valuation
                </div>
                <div className="w-28 p-3 text-center">Remark</div>
              </div>

              {/* Dynamic Rows */}
              {pledgeItems?.length > 0 ? (
                <>
                  {pledgeItems.map((item, index) => (
                    <div key={index} className="flex border-t border-gray-300">
                      <div className="flex-1 p-2 border-r border-gray-300">
                        {item.particular || "Gold"}
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
                      <div className="w-24 p-2 border-r border-gray-300 text-center">
                        {item.purity}
                      </div>
                      <div className="w-28 p-2 border-r border-gray-300 text-center">
                        {item.Calculated_Purity}
                      </div>
                      <div className="w-24 p-2 border-r border-gray-300 text-center">
                        {formatCurrency(item.rate)}
                      </div>
                      <div className="w-28 p-2 border-r border-gray-300 text-center">
                        {formatCurrency(item.valuation)}
                      </div>
                      <div className="w-28 p-2 text-center">
                        {item.remark || "-"}
                      </div>
                    </div>
                  ))}

                  {/* TOTAL ROW */}
                  <div className="flex border-t border-gray-300 bg-gray-100 font-semibold">
                    <div className="flex-1 p-2 border-r border-gray-300 text-left">
                      Total
                    </div>

                    {/* Nos Total */}
                    <div className="w-16 p-2 border-r border-gray-300 text-center">
                      {totalNos}
                    </div>

                    {/* Gross Total */}
                    <div className="w-24 p-2 border-r border-gray-300 text-center">
                      {formatCurrency(totalGross)}
                    </div>

                    {/* Net Weight Total */}
                    <div className="w-24 p-2 border-r border-gray-300 text-center">
                      {formatCurrency(totalNetWeight)}
                    </div>

                    {/* Purity (empty) */}
                    <div className="w-24 p-2 border-r border-gray-300"></div>

                    {/* Calculated Purity (empty) */}
                    <div className="w-28 p-2 border-r border-gray-300"></div>

                    {/* Rate (empty) */}
                    <div className="w-24 p-2 border-r border-gray-300"></div>

                    {/* Valuation Total */}
                    <div className="w-28 p-2 border-r border-gray-300 text-center">
                      {formatCurrency(totalValuation)}
                    </div>

                    {/* Remark (empty) */}
                    <div className="w-28 p-2"></div>
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
        <div className=" w-[1290px] bg-white">
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

export default AddLoanRepaymentEmi;
