import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdDownload, IoMdPrint } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../api";
import { usePermission } from "../API/Context/PermissionContext";
import profileempty from "../assets/profileempty.png";
import Loader from "../Component/Loader";

const ItemList = [{}];
function AddLoanRepaymentEmi() {
  useEffect(() => {
    document.title = "SLF | Add Loan Repayment";
  }, []);

  const { permissions, userData } = usePermission();
  const [installments, setInstallments] = useState([]);
  console.log(installments, "installments");
  const { loanId } = useParams(); // ✅ from URL
  const location = useLocation();
  const { loanData } = location.state || {}; // <-- here you get it from navigate
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  console.log(data, "data");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClose, setIsClose] = useState(false);
  const [isAdvInt, setIsAdvInt] = useState(false);
  const [pendingLoanAmount, setPendingLoanAmount] = useState(0);

  const [PendingEmi, setPendingEmi] = useState(0);
  const [penaltyAmount, setPenaltyAmount] = useState(0);
  useEffect(() => {
    if (loanId) {
      fetchLoanData();
    }
  }, [loanId]);

  const [loanInfo, setLoanInfo] = useState({
    emiAmount: PendingEmi, // One month EMI
    interestAmount: 0, // Interest part of current EMI
    payAmount: 0, // = emiAmount (auto)
    emiPaidCount: 0, // Already paid EMI count
    interestPaidFor: 0, // emiPaidCount + 1
    balanceLoanAmt: 0, // Net_Payable - (interestPaidFor * emiAmount)
    intPaidUptoText: "", // approval_date + interestPaidFor months
    interestPercent: 0, // Current slab %
    roundedPayAmount: 0, // e.g. 250
    roundOffAmount: 0,
    chargesAmount: 0,
    originalPayAmount: 0,
    discount: 0,
  });

  // useEffect(() => {
  //   debugger;

  //   if (!data?.loanApplication?.EMI_Details) {
  //     setPendingLoanAmount(0);
  //     setPendingEmi(0);
  //     setPenaltyAmount(0);
  //     return;
  //   }

  //   const emiDetails = data.loanApplication.EMI_Details || [];

  //   // ✅ Get all pending EMIs sorted by date
  //   const pendingEmis = emiDetails
  //     .filter((emi) => emi.status === "Pending")
  //     .sort((a, b) => new Date(a.emiDate) - new Date(b.emiDate));

  //   // ✅ First pending EMI → Opening balance
  //   const firstPendingEMI = pendingEmis[0];

  //   setPendingLoanAmount(firstPendingEMI ? Number(firstPendingEMI.opening) : 0);

  //   // ✅ Get due EMI count
  //   const dueEmiCount = getDueEMI();

  //   // ✅ If no due EMI → take 1 EMI
  //   const dueEmiList =
  //     dueEmiCount > 0
  //       ? pendingEmis.slice(0, dueEmiCount)
  //       : pendingEmis.length > 0
  //         ? [pendingEmis[0]]
  //         : [];

  //   // ✅ EMI total (REAL calculation)
  //   const totalEmi = dueEmiList.reduce(
  //     (sum, emi) => sum + Number(emi.emi || 0),
  //     0,
  //   );

  //   // 👉 Charges
  //   const charges = Number(data?.loanApplication?.total_unpaid_charges || 0);

  //   // 👉 Penalty (FIXED per EMI)
  //   const penaltyPerEmi = Number(data?.schemeData?.penalty || 0);

  //   const totalPenalty =
  //     dueEmiCount > 0 ? dueEmiList.length * penaltyPerEmi : 0;

  //   // ✅ FINAL TOTAL
  //   const finalEmiWithCharges = totalEmi + totalPenalty + charges;

  //   // ✅ Store values
  //   setPendingEmi(finalEmiWithCharges);
  //   setPenaltyAmount(totalPenalty);
  // }, [data]);
useEffect(() => {
  if (!data?.loanApplication?.EMI_Details || !data?.schemeData) {
    setPendingLoanAmount(0);
    setPendingEmi(0);
    setPenaltyAmount(0);
    return;
  }

  const emiDetails = data.loanApplication.EMI_Details || [];
  const scheme = data.schemeData;

  // -------------------------------
  // ✅ FILTER PENDING EMIs
  // -------------------------------
  const pendingEmis = emiDetails
    .filter((emi) => emi.status === "Pending")
    .sort((a, b) => new Date(a.emiDate) - new Date(b.emiDate));

  // -------------------------------
  // ✅ OPENING BALANCE
  // -------------------------------
  const firstPendingEMI = pendingEmis[0];
  setPendingLoanAmount(firstPendingEMI ? Number(firstPendingEMI.opening) : 0);

  // -------------------------------
  // ✅ DUE EMI COUNT
  // -------------------------------
  const dueEmiCount = getDueEMI();

  const dueEmiList =
    dueEmiCount > 0
      ? pendingEmis.slice(0, dueEmiCount)
      : pendingEmis.length > 0
      ? [pendingEmis[0]]
      : [];

  // -------------------------------
  // ✅ EMI TOTAL
  // -------------------------------
  const totalEmi = dueEmiList.reduce(
    (sum, emi) => sum + Number(emi.emi || 0),
    0
  );

  // -------------------------------
  // ✅ CHARGES
  // -------------------------------
  const charges = Number(data?.loanApplication?.total_unpaid_charges || 0);

  // -------------------------------
  // ✅ BOUNCED PENALTY
  // -------------------------------
  const bouncedValue = Number(scheme.bounced || 0);
  const bouncedType = scheme.bouncedType;

  let bouncedPenalty = 0;

  if (dueEmiList.length > 0) {
    if (bouncedType === "percentage") {
      bouncedPenalty = dueEmiList.reduce((sum, emi) => {
        return sum + (Number(emi.emi || 0) * bouncedValue) / 100;
      }, 0);
    } else {
      bouncedPenalty = bouncedValue * dueEmiList.length;
    }
  }

  // -------------------------------
  // ✅ TENURE OVER PENALTY (₹1000)
  // -------------------------------
  const tenureMonths = Number(data.loanApplication.Loan_Tenure || 0);
  const approvalDate = new Date(data.loanApplication.approval_date);
  const today = new Date();

  const elapsedMonths =
    (today.getFullYear() - approvalDate.getFullYear()) * 12 +
    (today.getMonth() - approvalDate.getMonth());

  let extraPenalty = 0;

  if (elapsedMonths >= tenureMonths) {
    extraPenalty = Number(scheme.penalty || 0); // ₹1000
  }

  // -------------------------------
  // ✅ FINAL CALCULATION
  // -------------------------------
  const finalAmount =
    totalEmi + bouncedPenalty + extraPenalty + charges;

  // -------------------------------
  // ✅ SET STATE
  // -------------------------------
  setPendingEmi(finalAmount);
  setPenaltyAmount(bouncedPenalty + extraPenalty);

}, [data]);
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
  const [isCloseLoan, setIsCloseLoan] = useState(false);
  const isReducing =
    data?.schemeData?.interestType?.toLowerCase() === "reducing";

  console.log(loanInfoForAdj, "loanInfoForAdj");
  const [paymentInfo, setPaymentInfo] = useState({
    mode: "",
    type: "",
    bankId: "",
    bankName: "",
    refNo: "",
    madeBy: "",
    creditNote: "",
    creditNoteAmount: 0,
    utilizedAmount: 0,
    unutilizedAmount: 0,
  });
  console.log(paymentInfo, "paymentInfo");
  const [bankList, setBankList] = useState([]);
  console.log(bankList,"bankList")

  useEffect(() => {
    const fetchBanks = async () => {
      debugger;
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));

        const branchId =
          typeof userData?.branchId === "object"
            ? userData?.branchId?.id
            : userData?.branchId;

        console.log("BranchId:", branchId);

        if (!branchId) {
          console.error("BranchId missing!");
          return;
        }

        const res = await axios.get(`${API}/api/banks/GetBanklist`, {
          params: { branchId },
        });

        const formattedBanks = res.data.map((bank) => ({
          id: bank.id,
          name: bank.name,
        }));

        setBankList(formattedBanks);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  console.log(paymentInfo, "paymentInfo");
  const [creditNotes, setCreditNotes] = useState([]);
  console.log(creditNotes);
  const [emiTable, setEmiTable] = useState([]);
  console.log(emiTable, "emiTable");
  useEffect(() => {
    if (!data?.loanApplication || !data?.schemeData) return;

    const P = Number(data.loanApplication.Net_Payable);
    const tenure = Number(data.loanApplication.Loan_Tenure);
    const type = data.schemeData.interestType; // "Flat" or "Reducing"

    const slabs = data.schemeData.interestRates || [];
    const annualRate = slabs.length ? Number(slabs[0].addInt) : 0; // first slab

    const rows = generateEMISchedule(P, annualRate, tenure, type);
    setEmiTable(rows);
  }, [data]);

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
const calculatePayAmount = (data) => {
  const baseAmount = Number(data.originalPayAmount) || 0;
  const charges = Number(data.chargesAmount) || 0;
  const roundOff = Number(data.roundOffAmount) || 0;
  const discount = Number(data.discount) || 0;

  let finalAmount = baseAmount + charges + roundOff - discount;

  // ❗ Prevent negative
  if (finalAmount < 0) finalAmount = 0;

  return finalAmount;
  };
  const handleDiscountChange = (value) => {
  const discountValue = Number(value) || 0;

  if (discountValue < 0) return;

  setLoanInfo((prev) => {
    const updated = {
      ...prev,
      discount: discountValue,
    };

    return {
      ...updated,
      payAmount: calculatePayAmount(updated), // ✅ use function
    };
  });
};
  const handleCloseLoanChange = (e) => {
    debugger;
    const checked = e.target.checked;
    setIsCloseLoan(checked);

    setLoanInfo((prev) => {
      if (!checked) {
        return {
          ...prev,
          payAmount: Number(prev.emiAmount).toFixed(2),
          precloseCharge: "0.00",
          duePenalty: "0.00",
        };
      }

      const emiPaidCount = Number(prev.emiPaidCount || 0);
      const interestType = data?.schemeData?.interestType;

      // ✅ Pending amount (principal balance)
      const baseAmount = Number(data?.loanApplication?.LoanPendingAmount || 0);

      /* ---------------- PRE-CLOSURE % CHARGE ---------------- */
      const precloser = data?.schemeData?.precloser || [];
      const slab = precloser.find(
        (s) =>
          emiPaidCount >= Number(s.fromMonth) &&
          emiPaidCount < Number(s.toMonth),
      );

      const percent = slab ? Number(slab.charges) : 0;
      let precloseCharge = (baseAmount * percent) / 100;

      /* ---------------- FLAT LOAN → ADD ALL REMAINING INTEREST ---------------- */
      let remainingInterest = 0;

      if (interestType === "Flat" && emiTable.length) {
        remainingInterest = emiTable
          .slice(emiPaidCount)
          .reduce((sum, row) => sum + Number(row.interest || 0), 0);

        // 🔥 add full remaining interest to pre-closure charge
        precloseCharge += remainingInterest;
      }

      /* ---------------- DUE PENALTY ---------------- */
      const dueEmi = getDueEMI();
      const penaltyPerEmi = Number(data?.schemeData?.penalty || 0);
      const duePenalty = dueEmi * penaltyPerEmi;

      /* ---------------- FINAL PAYABLE ---------------- */
      const finalPay = baseAmount + precloseCharge + duePenalty;

      return {
        ...prev,
        payAmount: finalPay.toFixed(2),
        originalPayAmount: finalPay.toFixed(2),
        precloseCharge: precloseCharge.toFixed(2),
        duePenalty: duePenalty.toFixed(2),
      };
    });
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

    // 🔹 Reducing
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

  const roundUpAmount = (amount) => {
    const num = Number(amount) || 0;

    // Round to next 10 (241 → 250 if you want next 50 use /50)
    const rounded = Math.ceil(num / 10) * 10;
    const roundOff = +(rounded - num).toFixed(2);

    return { rounded, roundOff };
  };

  const getDueEMI = () => {
  
    if (!data?.loanApplication?.EMI_Details) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time

    const dueCount = data.loanApplication.EMI_Details.filter((emi) => {
      const emiDate = new Date(emi.emiDate);
      emiDate.setHours(0, 0, 0, 0); // remove time

      return emi.status === "Pending" && emiDate < today; // ✅ ONLY past dates
    }).length;

    return dueCount;
  };

  useEffect(() => {
  if (!data?.loanApplication || !data?.schemeData) return;

  const loanApp = data.loanApplication;
  const scheme = data.schemeData;

  const pending = Number(loanApp.LoanPendingAmount || 0);

  // 🔥 If loan already closed
  if (pending <= 0) {
    setLoanInfo({
      emiAmount: "0.00",
      interestAmount: "0.00",
      payAmount: "0.00",
      emiPaidCount: Number(loanApp.EMIPaidCount || 0),
      interestPaidFor: Number(loanApp.EMIPaidCount || 0),
      balanceLoanAmt: "0.00",
      intPaidUptoText: loanApp.LastEmiPaidUpto || "",
      interestPercent: 0,
      chargesAmount: 0,
      roundedPayAmount: "0.00",
      roundOffAmount: "0.00",
    });
    return;
  }

  // -------------------------------
  // ✅ BASIC VALUES
  // -------------------------------
  const P = Number(loanApp.Loan_amount || 0);
  const tenureMonths = Number(loanApp.Loan_Tenure || 0);
  const paidCount = Number(loanApp.EMIPaidCount || 0);
  const charges = Number(loanApp.total_unpaid_charges || 0);

  const approvalDate = new Date(loanApp.approval_date);
  const today = new Date();

  const elapsedMonths =
    (today.getFullYear() - approvalDate.getFullYear()) * 12 +
    (today.getMonth() - approvalDate.getMonth());

  const currentMonth = Math.max(elapsedMonths, 0);

  // -------------------------------
  // ✅ USE MONTHLY INTEREST RATE
  // -------------------------------
  const monthlyRate = Number(scheme.monthlyInterestRate || 0); // 18%
  const annualRate = monthlyRate * 12; // for EMI function

  setintrestPercentage(monthlyRate);

  const type = scheme.interestType; // Flat / Reducing

  // -------------------------------
  // ✅ EMI CALCULATION FUNCTION
  // -------------------------------
  const calculateEMI = (P, annualRate, tenure, type) => {
    const r = annualRate / 12 / 100;

    if (type === "Reducing") {
      const emi =
        (P * r * Math.pow(1 + r, tenure)) /
        (Math.pow(1 + r, tenure) - 1);

      const totalPayable = emi * tenure;
      const totalInterest = totalPayable - P;

      return { emi, totalInterest, totalPayable };
    } else {
      // Flat Interest
      const totalInterest = (P * annualRate * tenure) / (12 * 100);
      const totalPayable = P + totalInterest;
      const emi = totalPayable / tenure;

      return { emi, totalInterest, totalPayable };
    }
  };

  const { emi, totalInterest } = calculateEMI(
    P,
    annualRate,
    tenureMonths,
    type,
  );

  // -------------------------------
  // ✅ CURRENT INTEREST + BALANCE
  // -------------------------------
  let currentInterest = 0;
  let nextBalance = P;

  if (type === "Reducing") {
    const r = annualRate / 12 / 100;
    let balance = P;

    for (let i = 0; i < paidCount; i++) {
      const int = balance * r;
      const principal = emi - int;
      balance -= principal;
    }

    currentInterest = balance * r;
    const principal = emi - currentInterest;
    nextBalance = balance - principal;
  } else {
    currentInterest = totalInterest / tenureMonths;
    nextBalance = P - paidCount * (emi - currentInterest);
  }

  // -------------------------------
  // ✅ EMI DUE CALCULATION
  // -------------------------------
  const getDueEMI = () => {
    return Math.max(currentMonth - paidCount, 0);
  };

  const dueEmiCount = getDueEMI();
  const pendingEmiAmount = dueEmiCount * emi;

  // -------------------------------
  // ✅ ROUNDING FUNCTION
  // -------------------------------
  const roundUpAmount = (amount) => {
    const num = Number(amount);
    const rounded = Math.ceil(num);
    const roundOff = rounded - num;

    return { rounded, roundOff };
  };

  const totalPay = pendingEmiAmount + charges;
  const { rounded, roundOff } = roundUpAmount(totalPay);

  // -------------------------------
  // ✅ PAID UPTO DATE
  // -------------------------------
  const paidUpto = new Date(approvalDate);
  paidUpto.setMonth(paidUpto.getMonth() + paidCount);

  // -------------------------------
  // ✅ FINAL STATE SET
  // -------------------------------
  setLoanInfo({
    emiAmount: emi.toFixed(2),
    interestAmount: currentInterest.toFixed(2),
    payAmount: emi.toFixed(2),

    chargesAmount: charges.toFixed(2),

    roundedPayAmount: rounded.toFixed(2),
    roundOffAmount: roundOff.toFixed(2),

    emiPaidCount: paidCount,
    interestPaidFor: paidCount,

    balanceLoanAmt: Math.max(nextBalance, 0).toFixed(2),

    intPaidUptoText: paidUpto.toISOString().slice(0, 10),

    interestPercent: monthlyRate,
  });
}, [data]);
  
  
  const roundToNext10 = (num) => Math.ceil(num / 10) * 10;

  const generateEMISchedule = (P, annualRate, months, type) => {
    const r = annualRate / 12 / 100;
    const rows = [];

    let emi = 0;
    let balance = P;

    // ================= FLAT =================
    if (type === "Flat") {
      const totalInterest = P * r * months;
      const rawEmi = (P + totalInterest) / months;

      // 👉 Rounded EMI
      emi = roundToNext10(rawEmi);

      const monthlyInterest = totalInterest / months;

      for (let i = 1; i <= months; i++) {
        const opening = balance;
        const interest = monthlyInterest;

        // last month adjustment
        let principal = emi - interest;
        if (i === months) {
          principal = balance;
          emi = principal + interest;
        }

        const closing = opening - principal;

        rows.push({
          month: i,
          opening: opening.toFixed(2),
          emi: emi.toFixed(2),
          interest: interest.toFixed(2),
          principal: principal.toFixed(2),
          closing: Math.max(closing, 0).toFixed(2),
        });

        balance = closing;
      }

      return rows;
    }

    // ================= REDUCING =================
    const rawEmi =
      (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

    // 👉 Rounded EMI
    emi = roundToNext10(rawEmi);

    for (let i = 1; i <= months; i++) {
      const opening = balance;
      const interest = opening * r;

      let principal = emi - interest;

      // last month adjustment
      if (i === months) {
        principal = balance;
        emi = principal + interest;
      }

      const closing = opening - principal;

      rows.push({
        month: i,
        opening: opening.toFixed(2),
        emi: emi.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        closing: Math.max(closing, 0).toFixed(2),
      });

      balance = closing;
    }

    return rows;
  };

  const fetchLoanData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/Transactions/goldloan/getLoanRepayment/${loanId}`,
      );
      console.log(res, "res");
      // Store full response
      setData(res.data);

      // Store installments properly
      setInstallments(res.data?.loanApplication?.emi_installments || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load loan data");
      setLoading(false);
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

  const getPaidUptoFromTenure = (approvalDate, tenure) => {
    if (!approvalDate || !tenure) return "";

    const d = new Date(approvalDate);
    if (isNaN(d.getTime())) return "";

    // Add tenure months
    d.setMonth(d.getMonth() + Number(tenure));

    // Return YYYY-MM-DD
    return d.toISOString().slice(0, 10);
  };
 const formatDate2 = (date) => {
    if (!date) return "";

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };


const handlePaymentGateway = async () => {
  debugger
    setLoading(true)
    try {
      // ✅ VALIDATION
      if (!paymentInfo.mode?.trim()) {
        alert("Please select Payment Mode");
        setLoading(false)
        return;
      }

        if (paymentInfo.mode !== "Cash" && !paymentInfo.refNo?.trim()) {
  alert("Please enter Reference Number");
  return;
}

      if (!paymentInfo.madeBy?.trim()) {
        alert("Please enter Made By");
        setLoading(false)
        return;
      }

     
      let finalLoanInfo;

      if (isClose === true) {
        finalLoanInfo = loanInfo;
      } else {
        finalLoanInfo = loanInfo;
      }

      const finalObject = {
        loanId: data?.loanApplication?.id,
        isClose: isClose,
        AdvanceInt: isAdvInt,
        paymentInfo: paymentInfo,
        loanInfo: {
          ...finalLoanInfo,
          intPaidUpto: formatDate2(finalLoanInfo?.intPaidUpto),
        },
        uptoInterest: loanInfo.intPaidUptoText,
      };

      console.log("FINAL OBJECT:", finalObject);

      // ✅ PAYMENT GATEWAY PAYLOAD
      const pgPayload = {
        merchantId: "100000000007164",
        aggregatorID: "A100000000007164",
        amount: String(finalLoanInfo?.payAmount || 0),
        currencyCode: "356",
        payType: "0",
        customerEmailID: "test@gmail.com",
        customerMobileNo: "9999999999",
        customerName: paymentInfo.madeBy,
        // returnURL: `${window.location.origin}/Add-Loan-Repayment/paymentsuccess/${loanId}`,
         returnURL: `${window.location.origin}/Loan-Repayment-Emi/paymentsuccess/${loanId}`,
        transactionType: "SALE",
        addlParam1: data?.loanApplication?.id,
        addlParam2: "repayment",
      };

      // ✅ CALL PG INIT API
      const pgRes = await axios.post(
        "https://slunawat.co.in/api/icici/initiate",
        pgPayload,
      );

      console.log("PG RESPONSE:", pgRes.data);

      if (pgRes.data?.responseCode !== "R1000") {
        alert("Payment initiation failed!");
         setLoading(false)
        return;
      }

      const { redirectURI, tranCtx } = pgRes.data;

      // ✅ SAVE BEFORE REDIRECT
      localStorage.setItem("repaymentPayload", JSON.stringify(finalObject));

      // OPTIONAL: prevent duplicate
      localStorage.removeItem("repaymentDone");
       setLoading(false)
      // ✅ REDIRECT TO PG
      window.open(`${redirectURI}?tranCtx=${tranCtx}`, "_self");
    } catch (err) {
      console.error("PG ERROR:", err);
      alert("Payment gateway error!");
      setLoading(false)
    }
  };

  const handleRepaymentSubmitForAllMode = async () => {
    debugger;
    if (!data?.loanApplication) return;
    if (!paymentInfo.mode?.trim()) {
      alert("Payment Mode is required");
      return;
    }

      if (paymentInfo.mode !== "Cash" && !paymentInfo.refNo?.trim()) {
  alert("Please enter Reference Number");
  return;
}

    if (!paymentInfo.madeBy?.trim()) {
      alert("Made By is required");
      return;
    }
      setLoading(true);
    const dueEmiCount = getDueEMI();
    const today = new Date().toISOString().slice(0, 10);

    const paidUptoText = isCloseLoan
      ? getPaidUptoFromTenure(
          data.loanApplication.approval_date,
          data.loanApplication.Loan_Tenure,
        )
      : loanInfo.intPaidUptoText;
    // 🔥 Get balances from EMI table using emiPaidCount
    const currentIndex = Number(loanInfo.emiPaidCount || 0);
    const currentRow = emiTable[currentIndex] || {};

    const openingBalance = currentRow.opening || 0;
    const closingBalance = currentRow.closing || 0;

    const payload = {
      loanId: data.loanApplication.id,
      pendingLoanAmount: pendingLoanAmount,
      pendingEMICount: data.loanApplication.PendingEMICount,
      emiPaidCount: loanInfo.emiPaidCount,
      lastEmiPaidDate: today,
      lastEmiPaidUpto: paidUptoText,
      payAmount: isCloseLoan ? loanInfo.payAmount : PendingEmi,
      interestAmount: loanInfo.interestAmount,
      chargesAmount: loanInfo.chargesAmount,
      openingBalance,
      closingBalance,
      dueEmiCount: dueEmiCount,
      LastInterestPaidPercentage: intrestPercentage,
      isCloseLoan,

     paymentInfo: {
    mode: paymentInfo.mode,
    type: paymentInfo.type,
    bankId: paymentInfo.bankId || "",
    bankName: paymentInfo.bankName || "",
    refNo: paymentInfo.refNo,
    madeBy: paymentInfo.madeBy,
    creditNote: paymentInfo.creditNote,
    creditNoteAmount: paymentInfo.creditNoteAmount,
    utilizedAmount: paymentInfo.utilizedAmount,
    unutilizedAmount: paymentInfo.unutilizedAmount,

    // ✅ ADD THIS 👇
    ...(isCloseLoan && loanInfo.discount > 0 && {
      discount: loanInfo.discount,
    }),
  },
    };

    try {
      const res = await axios.post(
        `${API}/Transactions/loan-repayment`,
        payload,
      );

      if (res.data?.success) {
        alert("Repayment Saved Successfully!");
        setPaymentInfo({
          mode: "",
          type: "",
          refNo: "",
          madeBy: "",
          creditNote: "",
          creditNoteAmount: 0,
          utilizedAmount: 0,
          unutilizedAmount: 0,
        });
        navigate("/Loan-Application");
              setLoading(false);
        fetchLoanData();
      } else {
        alert("Failed to save repayment");
              setLoading(false);
      }
    } catch (err) {
      console.error("Repayment Error:", err);
      alert("Something went wrong while saving repayment");
            setLoading(false);
    }
  };

  const handleRepaymentSubmit = async () => {
    debugger;

    // ✅ VALIDATION (common for all modes)
    if (!paymentInfo.mode?.trim()) {
      alert("Please select Payment Mode");
      return;
    }

       if (paymentInfo.mode !== "Cash" && !paymentInfo.refNo?.trim()) {
  alert("Please enter Reference Number");
  return;
}

    if (!paymentInfo.madeBy?.trim()) {
      alert("Please enter Made By");
      return;
    }
  if (paymentInfo.mode === "Credit Note") {
    if (!paymentInfo.creditNote?.trim()) {
      alert("Please Select Credit Note");
      return;
    }
  }
    // ✅ CHECK MODE
    if (paymentInfo.mode === "Payment Getway") {
      // 👉 CALL PAYMENT GATEWAY FLOW
      await handlePaymentGateway();
    } else {
      // 👉 CALL NORMAL FLOW
      await handleRepaymentSubmitForAllMode();
    }
  };


  const handleCreditNoteSelect = (creditNoteId) => {
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
      payAmount = Number(PendingEmi || 0);
    } else {
      payAmount = Number(PendingEmi || 0);
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

  const dueEmiCount = getDueEMI(); // your earlier function
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
  };
  return (
    <div className="flex flex-col items-center w-[1462px] ml-[15px]">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 w-[1462px] h-[40px] border border-gray-200   sticky top-[50px] z-40 bg-white ml-[35px] ">
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
          Add Loan Repayment -{loanId}
        </h2>

        <div className="flex items-center gap-5">
          {(userData?.isAdmin ||
            permissions?.Transaction?.find((item) => item.name === "Repay")
              ?.add) && (
            <button
              className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] transition"
              onClick={handleRepaymentSubmit}
            >
              Submit
            </button>
          )}

          <button
            onClick={() => navigate("/Loan-Application")}
            className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Loan Information Section */}
      <div className="flex flex-col justify-center ">
        {/* Header Section */}

        {/* Loan Information Section */}
        <div className="  bg-[#FFE6E6]  pl-5 pr-5 ml-[40px] w-[1462px] ">
          <h1 className="text-blue-900 font-semibold text-[15px] ">
            Loan Information
          </h1>

          <div className="flex w-full items-start gap-5 ">
            {/* Left Section - Loan Info */}
            <div className="flex flex-col gap-3 flex-1 text-sm">
              {/* Row 1 */}
              <div className="flex gap-2">
                {/* Loan No */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium text-xs">
                    Loan Number
                  </label>
                  <input
                    type="text"
                    name="loanNo"
                    disabled
                    value={data?.loanApplication?.id}
                    onChange={handleChange}
                    className="border border-gray-300  px-1 py-1 text-xs focus:ring-1 focus:outline-none w-[104px]
               disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed rounded-[8px] bg-white"
                  />
                </div>

                {/* Customer Name */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium text-xs">
                    Borrower Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    disabled
                    value={data?.loanApplication?.Print_Name}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:outline-none w-[210px] text-xs"
                  />
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium text-xs">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    disabled
                    value={data?.loanApplication?.Mobile_Number}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 text-xs focus:ring-1 focus:outline-none w-[100px]"
                  />
                </div>

                {/* Loan Date */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium text-xs">
                    Loan Date
                  </label>

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
                    className="border border-gray-100 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none w-[80px] text-xs"
                  />
                </div>

                {/* Loan Amount with Interest Button */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium text-xs">
                    Loan Amount
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="loanAmount"
                      disabled
                      value={data?.loanApplication?.Loan_amount}
                      onChange={handleChange}
                      className="border border-gray-300 disabled:bg-gray-100 rounded-l-md px-1 py-1 w-[100px] focus:ring-1 focus:outline-none text-xs"
                    />
                    <button className="bg-[#0A2478] text-white px-1 py-1 rounded-r-md hover:bg-[#081c5b] text-xs w-[40px]">
                      {intrestPercentage
                        ? `${intrestPercentage}%`
                        : data?.loanApplication?.LastInterestPaidPercentage
                          ? `${data.loanApplication.LastInterestPaidPercentage}%`
                          : "-"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-[110px]">
                  <label className="text-gray-900 font-medium text-xs">
                    (EMI) Amount
                  </label>
                  <input
                    type="text"
                    value={PendingEmi.toFixed(2)} // 👈 always EMI only
                    disabled
                    className="border border-gray-300 bg-gray-100 rounded-md px-1 py-1 text-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium text-xs">
                    Under the Scheme
                  </label>
                  <input
                    type="text"
                    name="scheme"
                    disabled
                    value={data?.schemeData?.schemeName}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:outline-none w-[120px] text-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-800 font-medium text-xs">
                    Pending Loan Amount
                  </label>
                  <input
                    type="text"
                    name="pendingLoanAmount"
                    disabled
                    value={pendingLoanAmount.toFixed(2)}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none w-[140px] text-xs"
                  />
                </div>

                {/* Under the Scheme */}
              </div>

              {/* Row 2 */}
              <div className="flex gap-4">
                {/* Pending Loan Amount */}

                {/* Pending Int */}
                <div className="flex flex-col" style={{ width: "60px" }}>
                  <label className="text-gray-800 font-medium text-xs">
                    Due EMI
                  </label>
                  <input
                    type="text"
                    disabled
                    value={Number.isFinite(getDueEMI()) ? getDueEMI() : 0}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 text-xs"
                  />
                </div>

                {/* Pending Days */}
                <div className="flex flex-col" style={{ width: "120px" }}>
                  <p className="text-gray-800  font-medium text-xs">
                    Pending EMI Count
                  </p>
                  <input
                    type="text"
                    name="pendingDays"
                    disabled
                    value={data?.loanApplication?.PendingEMICount}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-xs"
                  />
                </div>

                {/* Loan Amount Paid */}
                <div className="flex flex-col" style={{ width: "120px" }}>
                  <label className="text-gray-800 font-medium text-xs">
                    Total Amount Paid
                  </label>
                  <input
                    type="text"
                    name="loanAmountPaid"
                    disabled
                    value={data?.loanApplication?.LoanEmiAmountpaid}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-xs"
                  />
                </div>

                {/* Charges Due */}
                <div className="flex flex-col" style={{ width: "100px" }}>
                  <label className="text-gray-800 font-medium text-xs">
                    Charges Due
                  </label>
                  <input
                    type="text"
                    name="chargesDue"
                    disabled
                    value={data?.loanApplication?.total_unpaid_charges.toFixed(2)}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-xs"
                  />
                </div>
                <div className="flex flex-col" style={{ width: "120px" }}>
                  <label className="text-gray-800 font-medium text-xs">
                    EMI Paid Count
                  </label>
                  <input
                    type="text"
                    name="chargesDue"
                    disabled
                    value={data?.loanApplication?.EMIPaidCount}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col" style={{ width: "100px" }}>
                  <label className="text-gray-800 font-medium text-xs">
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
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-xs"
                  />
                </div>
                <div className="flex flex-col" style={{ width: "100px" }}>
                  <label className="text-gray-800 font-medium text-xs">
                    Last EMI Paid Upto
                  </label>
                  <input
                    type="date"
                    disabled
                    name="lastInterestPaidUpto"
                    value={data?.loanApplication?.LastEmiPaidUpto || ""}
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Images */}
            <div className="flex gap-3">
              {/* Customer */}
              <div className="flex flex-col items-center">
                <p className="font-medium mb-1 text-xs"> Borrower</p>
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
        <div className="flex  justify-between ml-[40px] gap-2 bg-[#F7F7FF] pl-5 w-[1462px]  ">
          <div className=" flex gap-5 rounded-md ">
            <div className="border-r-2 border-gray-400 pr-6">
              <h1 className="text-blue-900 font-semibold text-[15px] pb-2">
                Payment
              </h1>

              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="closeLoan"
                  checked={isCloseLoan}
                  onChange={handleCloseLoanChange}
                  className="h-4 w-4"
                />
                <label
                  htmlFor="closeLoan"
                  className="text-gray-800 font-medium text-xs"
                >
                  Close Loan
                </label>
              </div>
            </div>
            <div>
              <div className="flex gap-4 mt-2 text-sm">
                {/* Payable Amount */}
                <div className="flex flex-col gap-1 w-[90px]">
                  <label className="text-gray-900 font-medium text-xs">
                    Pay Amount
                  </label>
                  <input
                    type="text"
                    disabled
                    value={(() => {
                      const val = isCloseLoan
                        ? Number(loanInfo.payAmount)
                        : Number(PendingEmi);

                      return Number.isFinite(val) ? val.toFixed(2) : "0.00";
                    })()}
                    className="border border-gray-300 bg-gray-100 rounded-md px-1 py-1 text-xs"
                  />
                </div>

                {/* Closure Charges */}
                <div className="flex flex-col gap-1 w-[120px]">
                  <label className="text-gray-900 font-medium text-xs">
                    Fore Closure Charges
                  </label>
                  <input
                    type="text"
                    value={
                      isCloseLoan ? loanInfo.precloseCharge || "0.00" : "0.00"
                    }
                    disabled
                    className="border border-gray-300 bg-gray-100 rounded-md px-1 py-1 text-xs"
                  />
                </div>
                 {isCloseLoan && (
  <div className="flex flex-col gap-1 w-[120px]">
    <label className="text-gray-900 font-medium text-xs">
      Discount (₹)
    </label>
    <input
      type="number"
      value={loanInfo.discount}
      onChange={(e) => handleDiscountChange(e.target.value)}
      className="border border-gray-300 rounded-md px-1 py-1 text-xs"
    />
  </div>
)}

                {/* EMI Due Penalty */}
                <div className="flex flex-col gap-1 w-[90px]">
                  <label className="text-gray-900 font-medium text-xs">
                    EMI Due Penalty
                  </label>
                  <input
                    type="text"
                    value={
                      dueEmiCount > 0 && penaltyAmount > 0
                        ? Number(penaltyAmount).toFixed(2)
                        : "0.00"
                    }
                    disabled
                    className="border border-gray-300 bg-gray-100 rounded-md px-1 py-1 text-xs"
                  />
                </div>
               
                {isReducing && (
                  <div className="flex flex-col gap-1 w-[90px]">
                    <label className="text-gray-900 font-medium text-xs">
                      Interest Amount
                    </label>
                    <input
                      type="text"
                      value={loanInfo.interestAmount}
                      disabled
                      className="border border-gray-300 bg-gray-100 rounded-md px-3 py-1 text-xs"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1 w-[100px]">
                  <label className="text-gray-900 font-medium text-xs">
                    Mode of Payment <span className="text-red-500"> *</span>
                  </label>
                  <select
                    className="border border-gray-300 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-xs"
                    value={paymentInfo.mode}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, mode: e.target.value })
                    }
                  >
                    <option value="">--Select--</option>
                    <option value="Cash">Cash</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Credit Note">Credit Note</option>
                    {/* <option value="Payment Getway">Payment Gateway</option> */}
                  </select>
                </div>
                {paymentInfo.mode === "Net Banking" && (

<div className="flex flex-col gap-1 w-[120px]">
                  <label className="text-gray-900 font-medium text-xs">
                    Bank Details <span className="text-red-500"> *</span>
                  </label>

                  <select
                    className="border border-gray-300 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-xs"
                    value={paymentInfo.bankId}
                    onChange={(e) => {
                      const selectedBank = bankList.find(
                        (b) => String(b.id) === e.target.value,
                      );

                      setPaymentInfo({
                        ...paymentInfo,
                        bankId: selectedBank?.id || "",
                        bankName: selectedBank?.name || "",
                      });
                    }}
                  >
                    <option value="">--Select Bank--</option>
                    {bankList.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                )}
                

                {paymentInfo.mode === "Credit Note" && (
                  <div className="flex flex-col gap-1 w-[120px]">
                    <label className="text-gray-900 font-medium text-xs">
                      Select Credit Note <span className="text-red-500"> *</span>
                    </label>

                    <select
                      className="border border-gray-300 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-xs"
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

                {paymentInfo.mode === "Credit Note" &&
                  paymentInfo.creditNote && (
                    <div className="flex gap-3 ">
                      {/* Utilized Amount */}
                      <div className="flex flex-col gap-1 w-[100px]">
                        <label className="text-gray-900 font-medium text-xs">
                          Utilized Amount
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.utilizedAmount}
                          disabled
                          className="border border-gray-300 rounded-md px-1 py-1 bg-gray-100 text-xs"
                        />
                      </div>

                      {/* Unutilized Amount */}
                      <div className="flex flex-col gap-1 w-[120px]  text-xs">
                        <label className="text-gray-900 font-medium">
                          Unutilized Amount
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.unutilizedAmount}
                          disabled
                          className="border border-gray-300 rounded-md px-1 py-1 bg-gray-100  text-xs"
                        />
                      </div>
                    </div>
                  )}

                
              </div>
              {/* Payment Ref. No */}
             
              <div className="flex gap-4 mt-2 ">
                 {paymentInfo.mode !== "Cash" && (
<div className="flex flex-col gap-1 w-[120px]">
                  <label className="text-gray-900 font-medium text-xs">
                    Payment Ref. No <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Reference Number"
                    className="border border-gray-300 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-xs"
                    value={paymentInfo.refNo}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, refNo: e.target.value })
                    }
                  />
                </div>
   )}
               <div className="flex flex-col gap-1 w-[150px]">
                  <label className="text-gray-900 font-medium text-xs">
                    Payment Made By <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border border-gray-300 rounded-md px-1 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-xs"
                    value={paymentInfo.madeBy}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, madeBy: e.target.value })
                    }
                  />
                </div>
               
              </div>

           
              
                 
              <div className="flex gap-4 mt-2 text-sm"></div>
            </div>

            {/* Row 1: Individual Fields */}

            <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4"></div>
          </div>
        </div>

        
        <div className=" bg-[#FFE6E6] w-[1462px] ml-[40px]">
          <div className="">
            <div className="flex  pl-5 pr-5  mb-2">
              <div className="w-[1000px]">
                <h1 className="text-blue-900 font-semibold text-xs "> </h1>
                <div className="w-[1100px] text-xs border border-gray-300">
                  <div className="flex bg-[#0A2478] text-white font-semibold">
                    <div className="flex-1 p-1 border-r border-white text-center w-[150px]">
                      Particulars( Pledge Item)
                    </div>
                    <div className="w-20 p-1 border-r border-white text-center">
                      Qty
                    </div>
                    <div className="w-20 p-1 border-r border-white text-center">
                      Gross
                    </div>
                    <div className="w-30 p-1 border-r border-white text-center">
                      Net Weight
                    </div>

                    <div className="w-20 p-1 border-r border-white text-center">
                      Actual Purity
                    </div>
                    <div className="w-30 p-1 border-r border-white text-center">
                      Assigned Purity
                    </div>

                    <div className="w-16 p-1 border-r border-white text-center">
                      Rate
                    </div>
                    <div className="w-24 p-1 border-r border-white text-center">
                      Valuation
                    </div>
                    <div className="w-28 p-1 text-center">Remark</div>
                  </div>

                  {pledgeItems?.length > 0 ? (
                    <>
                      {pledgeItems.map((item, index) => (
                        <div
                          key={item.id || index}
                          className={`flex border-t border-gray-300 ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <div className="flex-1 p-1 border-r border-gray-300 w-[150px]">
                            {item.particular || "Gold"}
                          </div>
                          <div className="w-20 p-1 border-r border-gray-300 text-center">
                            {item.nos || 1}
                          </div>
                          <div className="w-20 p-1 border-r border-gray-300 text-center">
                            {formatCurrency(item.gross)}
                          </div>
                          <div className="w-30 p-1 border-r border-gray-300 text-center">
                            {formatCurrency(item.netWeight)}
                          </div>

                          <div className="w-20 p-1 border-r border-gray-300 text-center">
                            {item.purity}
                          </div>
                          <div className="w-30 p-1 border-r border-gray-300 text-center">
                            {item.Calculated_Purity || "---"}
                          </div>

                          <div className="w-16 p-1 border-r border-gray-300 text-center">
                            {formatCurrency(item.rate)}
                          </div>
                          <div className="w-24 p-1 border-r border-gray-300 text-center">
                            {formatCurrency(item.valuation)}
                          </div>
                          <div className="w-28 p-1 text-center">
                            {item.remark || "-"}
                          </div>
                        </div>
                      ))}

                      <div className="flex border-t border-gray-300 bg-white font-semibold">
                        <div className="flex-1 p-1 border-r border-gray-300 text-left">
                          Total
                        </div>
                        <div className="w-20 p-1 border-r border-gray-300 text-center">
                          {totalNos}
                        </div>
                        <div className="w-20 p-1 border-r border-gray-300 text-center">
                          {formatCurrency(totalGross)}
                        </div>
                        <div className="w-30 p-1 border-r border-gray-300 text-center">
                          {formatCurrency(totalNetWeight)}
                        </div>

                        <div className="w-20 p-1 border-r border-gray-300"></div>
                        <div className="w-30 p-1 border-r border-gray-300"></div>

                        <div className="w-16 p-1 border-r border-gray-300"></div>
                        <div className="w-24 p-1 border-r border-gray-300 text-center">
                          {formatCurrency(totalValuation)}
                        </div>
                        <div className="w-28 p-1"></div>
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
          </div>
        </div>

        <div className=" bg-[#F7F7FF] pr-5 pl-5 w-[1462px] ml-[40px] mb-10">
          <h1 className="text-blue-900 font-semibold text-[15px]">
            Installments
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-xs">
                  <th className="p-1 border border-gray-300">Sr. No</th>
                  <th className="p-1 border border-gray-300">Receipt No</th>
                  <th className="p-1 border border-gray-300">Payment Date</th>
                  <th className="p-1 border border-gray-300">Paid Upto</th>
                  <th className="p-1 border border-gray-300">Mode</th>
                  <th className="p-1 border border-gray-300">Ref No</th>
                  <th className="p-1 border border-gray-300">Amount</th>
                  {/* <th className="p-1 border border-gray-300">Interest %</th> */}
                  {/* <th className="p-1 border border-gray-300">Loan Adj</th>
                  <th className="p-1 border border-gray-300">Int Days</th> */}
                  <th className="p-1 border border-gray-300">Action</th>
                </tr>
              </thead>

              <tbody>
                {installments.length > 0 ? (
                  installments.map((row, index) => {
                    const isEMI = row.type === "EMI";

                    return (
                      <tr
                        key={row.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        {/* Sr No */}
                        <td className="p-1 border text-center text-xs">
                          {index + 1}
                        </td>

                        {/* Receipt No */}
                        <td className="p-1 border text-center text-xs">
                          {isEMI ? row.receiptNumber : row.id}
                        </td>

                        {/* Payment Date */}
                        <td className="p-1 border text-center text-xs">
                          {formatDate(
                            isEMI ? row.created_at : row.transaction_date,
                          )}
                        </td>

                        {/* Paid Upto */}
                        <td className="p-1 border text-center text-xs">
                          {isEMI
                            ? "-" // EMI doesn't have intPaidUpto
                            : formatDate(row.intPaidUpto)}
                        </td>

                        {/* Mode */}
                        <td className="p-1 border text-center text-xs">
                          {isEMI
                            ? row.payment_mode
                            : row.paymentInfo?.mode || "-"}
                        </td>

                        {/* Ref No */}
                        <td className="p-1 border text-center text-xs">
                          {isEMI ? row.ref_no : row.paymentInfo?.refNo || "-"}
                        </td>

                        {/* Amount */}
                        <td className="p-1 border text-center text-xs">
                          ₹{" "}
                          {(isEMI
                            ? row.pay_amount
                            : row.payAmount
                          )?.toLocaleString()}
                        </td>

                        {/* Interest % */}
                        {/* <td className="p-1 border text-center text-xs">
            {isEMI ? "-" : `${row.interestPercent}%`}
          </td> */}

                        {/* Action */}
                        <td className="p-1 border text-xs">
                          <div className="flex gap-4 justify-center cursor-pointer">
                            <IoMdDownload className="text-blue-600 hover:text-blue-800" />
                            <IoMdPrint className="text-green-600 hover:text-green-800" />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      className="text-center p-4 text-gray-500 text-xs"
                    >
                      No Installments Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default AddLoanRepaymentEmi;
