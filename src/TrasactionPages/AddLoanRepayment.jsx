import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdDownload, IoMdPrint } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import profileempty from "../assets/profileempty.png";

// const installments = [
//   {
//     srNo: 1,
//     receiptNo: "R-1001",
//     paymentDate: "25/09/2025",
//     paidUpto: "Aug 2025",
//     mode: "UPI",
//     refNo: "TXN12345",
//     amount: "₹10,000",
//     interest: "₹500",
//     loanAdj: "₹9,500",
//     intDays: 30,
//   },
//   {
//     srNo: 2,
//     receiptNo: "R-1002",
//     paymentDate: "25/10/2025",
//     paidUpto: "Sep 2025",
//     mode: "Cash",
//     refNo: "-",
//     amount: "₹10,000",
//     interest: "₹400",
//     loanAdj: "₹9,600",
//     intDays: 28,
//   },
// ];
const ItemList = [{}];
function AddLoanRepayment() {
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
  const [installments, setInstallments] = useState([]);
  console.log(installments, "installments");
  const location = useLocation();
  const { loanId, loanData } = location.state || {}; // <-- here you get it from navigate
  console.log();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  console.log(loanData, "loanData");
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
    pendingDays: 0,
    pendingDaysUptoToday: 0,
    pendingInt: 0,
    preCloseInt: 0,
    interestPaidDaysPreClose: 0, // 🆕 total pre-close days
    interestPaidUptoPreClose: new Date(), // 🆕 date up to which interest applied for pre-close
    interestPercent: 0,
    loanAmountPaid: 0,
    payAmount: 0,
    balanceLoanAmt: 0,
    chargesAdjusted: 0,
    intPaidUpto: new Date(),
    interestUptoToday: new Date(),
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

  const [bankList, setBankList] = useState([]);

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
  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API}/api/banks/list`);
      setBankList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleAdvIntCheck = (e) => {
    const checked = e.target.checked;
    setIsAdvIntCheck(checked);

    // reset here
    setloanInfoForAdj({
      pendingDays: 0,
      pendingInt: 0,
      interestPercent: 0,
      loanAmountPaid: 0,
      payAmount: 0,
      balanceLoanAmt: 0,
      chargesAdjusted: 0,
      intPaidUpto: new Date(),
    });
  };

  console.log(loanInfo, "loanInfo");
  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API}/Transactions/goldloan/getLoanRepayment/${loanId}`,
      );
      setData(res.data);
      setInstallments(res.data.installments || []);
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
    if (!data?.loanApplication?.LoanPendingAmount) return;

    const today = new Date();
    const interestPaidUpto = new Date(data?.loanApplication?.Pay_Date);

    // use InterestPaidUpto for days calculation
    const diffMs = today - interestPaidUpto;
    const pendingDays =
      diffMs > 0 ? Math.floor(diffMs / (1000 * 60 * 60 * 24)) : 0; // if future, 0 days

    const parseArray = (value) => {
      try {
        if (!value) return [];

        // If it's already an array
        if (Array.isArray(value)) return value;

        // If it's already an object -> NOT valid array
        if (typeof value === "object") return [];

        // If it's "[object Object]"
        if (value === "[object Object]") return [];

        return JSON.parse(value);
      } catch {
        return [];
      }
    };

    const slabs = parseArray(data.schemeData.interestRates);
    const currentSlab = slabs.find(
      (s) => pendingDays >= Number(s.from) && pendingDays <= Number(s.to),
    );
    const interestPercent = currentSlab ? Number(currentSlab.addInt) : 0;

    const pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount);
    const dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;
    const pendingInt = dailyIntAmt * pendingDays;

    setloanInfoForAdj((prev) => ({
      ...prev,
      // pendingDays,
      // pendingInt: pendingInt.toFixed(2),
      // interestPercent,
      intPaidUpto: interestPaidUpto, // set same date
    }));
  }, [data]);

  const handlePayAmountChange = (value) => {
    debugger;
    let payAmount = parseFloat(value || 0);
    let charges = Number(data.loanApplication.total_unpaid_charges || 0);
    let pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount || 0);
    let interestPercent = Number(loanInfo.interestPercent || 0);

    const cleanDate = (d) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const approvalDate = cleanDate(
      new Date(data.loanApplication.approval_date),
    ); // e.g. 10-11-2025
    const interestPaidUpto = cleanDate(
      new Date(data.loanApplication.InterestPaidUpto),
    ); // e.g. 12-11-2025

    // --- 1 year from approval ---
    const oneYearFromApproval = new Date(approvalDate);
    oneYearFromApproval.setFullYear(oneYearFromApproval.getFullYear() + 1); // 10-11-2026

    // ✅ STEP 1: Always calculate full 1-year interest
    const totalDaysInYear = Math.floor(
      (oneYearFromApproval - approvalDate) / (1000 * 60 * 60 * 24),
    );
    const dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;
    const totalYearInterest = dailyIntAmt * totalDaysInYear;

    // ✅ STEP 2: Find how many days are already covered (approval → InterestPaidUpto)
    const daysAlreadyPaid = Math.floor(
      (interestPaidUpto - approvalDate) / (1000 * 60 * 60 * 24),
    );

    // ✅ STEP 3: Remaining days from InterestPaidUpto → 1-year-end
    const remainingDays = Math.max(totalDaysInYear - daysAlreadyPaid, 0);

    // ✅ STEP 4: Remaining interest = total - already-paid
    const totalRemainingInterest = dailyIntAmt * remainingDays;

    // --- Adjustment Starts ---
    setloanInfoForAdj((prev) => ({
      ...prev,
      payAmount: value,
    }));

    let remainingPay = payAmount;

    // 1️⃣ Adjust charges
    let chargesAdjusted = Math.min(remainingPay, charges);
    remainingPay -= chargesAdjusted;

    // 2️⃣ Adjust remaining interest
    let interestAdjusted = Math.min(remainingPay, totalRemainingInterest);
    remainingPay -= interestAdjusted;

    // 3️⃣ Days covered by new interest payment
    let daysPaidFor = Math.floor(interestAdjusted / dailyIntAmt);

    // 4️⃣ Adjust principal
    let loanAmtAdjusted = remainingPay;
    let balanceLoanAmt = pendingLoanAmount - loanAmtAdjusted;

    // 5️⃣ Update new InterestPaidUpto
    let newIntPaidUpto = new Date(interestPaidUpto);
    newIntPaidUpto.setDate(newIntPaidUpto.getDate() + daysPaidFor);

    // ✅ STEP 6: Update everything in state
    setloanInfoForAdj((prev) => ({
      ...prev,
      chargesAdjusted: chargesAdjusted.toFixed(2),
      pendingInt: interestAdjusted.toFixed(2),
      loanAmountPaid: loanAmtAdjusted.toFixed(2),
      balanceLoanAmt: balanceLoanAmt.toFixed(2),
      pendingDays: daysPaidFor,
      intPaidUpto: newIntPaidUpto,
      totalYearInterest: totalYearInterest.toFixed(2),
      totalRemainingInterest: totalRemainingInterest.toFixed(2),
      remainingInterestDays: remainingDays,
      alreadyPaidDays: daysAlreadyPaid,
    }));
  };

  const handlePayAmountChangeForNotAdvance = (value) => {
    debugger;
    let payAmount = Number(value || 0);
    let charges = Number(data.loanApplication.total_unpaid_charges || 0);
    let pendingInt = Number(loanInfo.pendingInt || 0);
    let pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount || 0);

    let dailyIntAmt =
      (pendingLoanAmount * loanInfo.interestPercent) / 100 / 365;

    let remainingPay = parseFloat(payAmount) || 0;

    // Step 1: Deduct charges
    let chargesAdjusted = 0;
    if (remainingPay >= charges) {
      chargesAdjusted = charges;
      remainingPay -= charges;
    } else {
      chargesAdjusted = remainingPay;
      remainingPay = 0;
    }

    // Step 2: Deduct interest
    let interestAdjusted = 0;
    let daysPaidFor = 0;
    // if (remainingPay > 0) {
    //   interestAdjusted = Math.min(remainingPay, pendingInt);
    //   remainingPay -= interestAdjusted;

    //   // Calculate exact days of interest paid (fractional)
    //   daysPaidFor = Math.floor(interestAdjusted / dailyIntAmt);
    // }
    if (remainingPay > 0) {
      interestAdjusted = Math.min(remainingPay, pendingInt);
      remainingPay -= interestAdjusted;

      if (dailyIntAmt && dailyIntAmt > 0 && interestAdjusted > 0) {
        daysPaidFor = Math.floor(interestAdjusted / dailyIntAmt);
      } else {
        daysPaidFor = 0;
      }
    }

    // Step 3: Loan principal adjusted
    let loanAmtAdjusted = remainingPay;

    // Step 4: Remaining balance
    let balanceLoanAmt = pendingLoanAmount - loanAmtAdjusted;

    // Step 5: Calculate date up to interest is paid
    let intPaidUpto = new Date(data.loanApplication.InterestPaidUpto);
    intPaidUpto.setDate(intPaidUpto.getDate() + daysPaidFor);

    setloanInfoForAdj((prev) => ({
      ...prev,
      payAmount,
      chargesAdjusted: chargesAdjusted.toFixed(2),
      pendingInt: interestAdjusted.toFixed(2),
      loanAmountPaid: loanAmtAdjusted.toFixed(2),
      balanceLoanAmt: balanceLoanAmt.toFixed(2),
      pendingDays: daysPaidFor,
      intPaidUpto,
    }));
  };

  const validatePayAmount = () => {
    debugger;
    let payAmount = Number(Number(loanInfoForAdj.payAmount || 0).toFixed(2));

    let charges = Number(data.loanApplication.total_unpaid_charges || 0);
    let pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount || 0);
    let interestPercent = Number(loanInfo.interestPercent || 0);

    let dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;

    let remainingPay = payAmount - charges;
    if (remainingPay < 0) return;

    // ******************
    // SPECIAL CASE: FULL PAYOFF (loan + interest fully paid)
    if (remainingPay >= pendingLoanAmount) {
      // this means principal is cleared
      return; // <-- VALID. DON'T ALERT
    }
    // ******************

    let days = Math.floor(remainingPay / dailyIntAmt);
    let exactInterestForDays = days * dailyIntAmt;
    let totalRequired = charges + exactInterestForDays;

    let diff = Number((payAmount - totalRequired).toFixed(2));
    let dailyInt2 = Number(dailyIntAmt.toFixed(2));

    const tol = 0.02;
    const isZeroOK = Math.abs(diff - 0) <= tol;
    const isOneDayOK = Math.abs(diff - dailyInt2) <= tol;

    if (!isZeroOK && !isOneDayOK) {
      let lowerValid = totalRequired.toFixed(2);
      let upperValid = (totalRequired + dailyIntAmt).toFixed(2);

      alert(
        `Amount not valid — please enter either ${lowerValid} or ${upperValid}`,
      );
    }
  };

  const numberToWords = (num) => {
    if (!num || isNaN(num)) return "";

    const numValue =
      typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num;
    if (numValue === 0) return "Zero";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const convertMillions = (n) => {
      if (n >= 10000000) {
        return (
          convertMillions(Math.floor(n / 10000000)) +
          " Crore " +
          convertLakhs(n % 10000000)
        );
      } else {
        return convertLakhs(n);
      }
    };

    const convertLakhs = (n) => {
      if (n >= 100000) {
        return (
          convertLakhs(Math.floor(n / 100000)) +
          " Lakh " +
          convertThousands(n % 100000)
        );
      } else {
        return convertThousands(n);
      }
    };

    const convertThousands = (n) => {
      if (n >= 1000) {
        return (
          convertHundreds(Math.floor(n / 1000)) +
          " Thousand " +
          convertHundreds(n % 1000)
        );
      } else {
        return convertHundreds(n);
      }
    };

    const convertHundreds = (n) => {
      if (n > 99) {
        return ones[Math.floor(n / 100)] + " Hundred " + convertTens(n % 100);
      } else {
        return convertTens(n);
      }
    };

    const convertTens = (n) => {
      if (n < 10) return ones[n];
      else if (n >= 10 && n < 20) return teens[n - 10];
      else {
        return tens[Math.floor(n / 10)] + " " + ones[n % 10];
      }
    };

    let words = convertMillions(numValue);
    return words.trim() + " only";
  };

  useEffect(() => {
    if (
      !data?.loanApplication?.LoanPendingAmount ||
      !data?.loanApplication?.approval_date
    )
      return;

    const approvalDate = new Date(data.loanApplication.approval_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const interestPaidUpto = new Date(
      data.loanApplication.InterestPaidUpto || today,
    );
    interestPaidUpto.setHours(0, 0, 0, 0);

    const pendingLoanAmount = Number(data.loanApplication.LoanPendingAmount);
    const totalUnpaidCharges = Number(
      data.loanApplication.total_unpaid_charges || 0,
    );
    const preCloseMinDays = Number(data.schemeData?.preCloserMinDays || 0);
    const parseArray = (value) => {
      try {
        if (!value) return [];

        // If it's already an array
        if (Array.isArray(value)) return value;

        // If it's already an object -> NOT valid array
        if (typeof value === "object") return [];

        // If it's "[object Object]"
        if (value === "[object Object]") return [];

        return JSON.parse(value);
      } catch {
        return [];
      }
    };

    const slabs = parseArray(data.schemeData.interestRates);

    // ✅ CASE 1: Already paid future interest
    if (interestPaidUpto > today) {
      const currentSlab = slabs.find(
        (s) => Number(s.from) <= 0 && Number(s.to) >= 0,
      );
      const interestPercent = currentSlab ? Number(currentSlab.addInt) : 0;
      setintrestPercentage(interestPercent);

      setLoanInfo({
        pendingDays: 0,
        pendingDaysUptoToday: 0,
        pendingInt: "0.00",
        preCloseInt: "0.00",
        interestPaidDaysPreClose: 0,
        interestPaidUptoPreClose: interestPaidUpto.toISOString().slice(0, 10),
        interestPercent,
        loanAmountPaid: pendingLoanAmount.toFixed(2),
        payAmount: (pendingLoanAmount + totalUnpaidCharges).toFixed(2),
        balanceLoanAmt: 0,
        chargesAdjusted: totalUnpaidCharges.toFixed(2),
        intPaidUpto: interestPaidUpto.toISOString().slice(0, 10),
        interestUptoToday: today.toISOString().slice(0, 10),
      });
      return;
    }

    // ✅ CASE 2: Normal case (interest due till today)
    const diffMs = today - interestPaidUpto;
    const pendingDays = Math.max(Math.round(diffMs / (1000 * 60 * 60 * 24)), 0);

    // 🧮 For reference: total days from approval to today
    const diffFromApprovalMs = today - approvalDate;
    const pendingDaysUptoToday = Math.max(
      Math.round(diffFromApprovalMs / (1000 * 60 * 60 * 24)),
      0,
    );

    // ✅ Find normal interest slab
    const currentSlab = slabs.find(
      (s) => pendingDays >= Number(s.from) && pendingDays <= Number(s.to),
    );
    const interestPercent = currentSlab ? Number(currentSlab.addInt) : 0;
    setintrestPercentage(interestPercent);

    // ✅ Normal interest calculation
    const dailyIntAmt = (pendingLoanAmount * interestPercent) / 100 / 365;
    const pendingInt = dailyIntAmt * pendingDays;

    // ✅ Pre-closure logic
    const minInterestDate = new Date(approvalDate);
    minInterestDate.setDate(minInterestDate.getDate() + preCloseMinDays);

    let preCloseInt = 0;
    let preCloseDays = 0;
    let intPaidUptoDate = today;
    let interestPaidDaysPreClose = 0;
    let interestPaidUptoPreClose = today;

    if (today < minInterestDate) {
      // Before minimum closure period → charge for minimum preCloseMinDays
      preCloseDays = preCloseMinDays;
      const preCloseDailyInt =
        (pendingLoanAmount * interestPercent) / 100 / 365;
      preCloseInt = preCloseDailyInt * preCloseMinDays;

      intPaidUptoDate = minInterestDate;
      interestPaidDaysPreClose = preCloseMinDays;
      interestPaidUptoPreClose = minInterestDate;
    } else {
      // Normal case after pre-close window
      preCloseDays = pendingDays;
      preCloseInt = pendingInt;
      intPaidUptoDate = today;
      interestPaidDaysPreClose = pendingDays;
      interestPaidUptoPreClose = today;
    }

    // ✅ Decide which interest to apply in payAmount
    const finalInterest =
      Number(preCloseInt) > Number(pendingInt) ? preCloseInt : pendingInt;

    const payAmount = pendingLoanAmount + finalInterest + totalUnpaidCharges;

    // ✅ Store all data together
    setLoanInfo({
      pendingDays,
      pendingDaysUptoToday,
      pendingInt: pendingInt.toFixed(2),
      preCloseInt: preCloseInt.toFixed(2),
      interestPaidDaysPreClose,
      interestPaidUptoPreClose: interestPaidUptoPreClose
        .toISOString()
        .slice(0, 10),
      interestPercent,
      loanAmountPaid: pendingLoanAmount.toFixed(2),
      payAmount: payAmount.toFixed(2),
      balanceLoanAmt: 0,
      chargesAdjusted: totalUnpaidCharges.toFixed(2),
      intPaidUpto: intPaidUptoDate.toISOString().slice(0, 10),
      interestUptoToday: today.toISOString().slice(0, 10),
    });
  }, [data]);

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

  // const handleRepaymentSubmit = () => {
  //   debugger;

  //   if (!isClose) return; // only close-loan case

  //   const finalObject = {
  //     loanId: data?.loanApplication?.id,
  //     closeLoan: true,
  //     paymentInfo: paymentInfo,
  //     closeInfo: loanInfo,
  //     status: "Closed"
  //   };

  //   console.log("SEND TO BACKEND:", finalObject);

  //   axios
  //     .post(`${API}/Transactions/loanRepayment`, finalObject)
  //     .then(res => {
  //       console.log("RESPONSE:", res.data);

  //       if (res.status === 200) {
  //         alert("Repayment Successfully!");
  //         navigate("/Loan-Application");
  //       }
  //     })
  //     .catch(err => {
  //       console.log("ERROR:", err);
  //       alert("Something went wrong");
  //     });
  // };
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

  //   const handleCreditNoteSelect = (creditNoteId) => {
  //   debugger
  //   const selected = creditNotes.find(
  //     (item) => item.credit_note_id === creditNoteId
  //   );

  //   if (!selected) {
  //     setPaymentInfo({ ...paymentInfo, creditNote: "" });
  //     return;
  //   }

  //   const loanPendingAmount = Number(data?.loanApplication?.LoanPendingAmount || 0);
  // const creditAmount = Number(selected.net_amount || 0);

  // if (loanPendingAmount < creditAmount) {
  //   alert(
  //     `❗ Pending Amount: ₹${loanPendingAmount}
  //      ❗ Credit Note Amount: ₹${creditAmount}
  //      ⚠️ Credit Note amount is greater than Pending Amount`
  //   );

  //   // Reset dropdown
  //   setPaymentInfo({ ...paymentInfo, creditNote: "" });
  //   return;
  // }

  //   // Valid selection
  //   setPaymentInfo({ ...paymentInfo, creditNote: creditNoteId });
  // };
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

          <button
            onClick={() => navigate("/Loan-Application")}
            className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] transition"
          >
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
                    Pending Int
                  </label>
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
                  <label className="text-gray-800  font-medium">
                    Pending Days
                  </label>
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
                  <label className="text-gray-800 font-medium">
                    Loan Amount Paid
                  </label>
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
                    Advance Interest
                  </label>
                  <input
                    type="text"
                    name="chargesDue"
                    disabled
                    value={data?.loanApplication?.AdvanceInterestPaid}
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
                    Last Interest Paid Date
                  </label>
                  <input
                    type="date"
                    name="LastInterestPaidDate"
                    value={
                      data?.loanApplication?.LastInterestPaidDate
                        ? new Date(data.loanApplication.LastInterestPaidDate)
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
                    Last Interest Paid Upto
                  </label>
                  <input
                    type="date"
                    disabled
                    name="lastInterestPaidUpto"
                    value={
                      loanInfo.lastInterestPaidUpto ||
                      data?.loanApplication?.InterestPaidUpto ||
                      ""
                    }
                    onChange={handleChange}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col" style={{ width: "150px" }}>
                  <label className="text-gray-800 font-medium">
                    Starting Payment Date{" "}
                  </label>
                  <input
                    type="date"
                    disabled
                    name="lastInterestPaidUpto"
                    value={
                      loanInfo.Pay_Date || data?.loanApplication?.Pay_Date || ""
                    }
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
          {isClose && (
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
                <label className="text-gray-900 font-medium">
                  Interest Amount
                </label>
                <input
                  type="text"
                  value={
                    Number(loanInfo.preCloseInt) > Number(loanInfo.pendingInt)
                      ? loanInfo.preCloseInt
                      : loanInfo.pendingInt
                  }
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  disabled={isClose}
                />
              </div>

              {/* Loan Amt Adjusted */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Loan Amt Adjusted
                </label>
                <input
                  type="text"
                  value={loanInfo.loanAmountPaid}
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  disabled={isClose}
                />
              </div>

              {/* Balance Loan Amt */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Balance Loan Amt
                </label>
                <input
                  type="text"
                  value={loanInfo.balanceLoanAmt}
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  disabled={isClose}
                />
              </div>

              {/* Charges Adjusted */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Charges Adjusted
                </label>
                <input
                  type="text"
                  value={loanInfo.chargesAdjusted}
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  disabled={isClose}
                />
              </div>

              {/* Interest Paid For */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Interest Paid For
                </label>
                <input
                  type="text"
                  value={
                    Number(loanInfo.interestPaidDaysPreClose) >
                    Number(loanInfo.pendingDays)
                      ? loanInfo.interestPaidDaysPreClose
                      : loanInfo.pendingDays
                  }
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  disabled={isClose}
                />
              </div>

              {/* Int. Paid Upto (Date Picker) */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Int. Paid Upto
                </label>
                <DatePicker
                  selected={
                    new Date(loanInfo.interestPaidUptoPreClose) >
                    new Date(loanInfo.intPaidUpto)
                      ? new Date(loanInfo.interestPaidUptoPreClose)
                      : new Date(loanInfo.intPaidUpto)
                  }
                  onChange={(date) =>
                    setLoanInfo((prev) => ({ ...prev, intPaidUpto: date }))
                  }
                  dateFormat="dd/MM/yyyy"
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  disabled={isClose}
                />
              </div>
            </div>
          )}
          {isAdvInt && (
            <div className="flex items-center gap-2 mt-5 mb-5">
              <input
                type="checkbox"
                disabled={data?.schemeData?.interestInAdvance !== "Yes"}
                checked={isAdvIntCheck}
                onChange={handleAdvIntCheck}
                title={
                  data?.schemeData?.interestInAdvance !== "Yes"
                    ? "In this scheme advance interest is not accepted"
                    : ""
                }
              />

              <label className="text-gray-900 font-medium">
                Loan Adjustment
              </label>
            </div>
          )}

          {isAdvInt && !isAdvIntCheck && (
            <>
              <div className="flex flex-wrap gap-x-6 gap-y-4 mt-5">
                {/* Pay Amount */}
                <div className="flex flex-col gap-1 w-[150px]">
                  <label className="text-gray-900 font-medium">
                    Pay Amount
                  </label>
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
                  <label className="text-gray-900 font-medium">
                    Interest Adjusted
                  </label>
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
                  <label className="text-gray-900 font-medium">
                    Loan Amt Adjusted
                  </label>
                  <input
                    type="text"
                    value={loanInfoForAdj.loanAmountPaid}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Balance Loan Amt */}
                <div className="flex flex-col gap-1 w-[150px]">
                  <label className="text-gray-900 font-medium">
                    Balance Loan Amt
                  </label>
                  <input
                    type="text"
                    value={loanInfoForAdj.balanceLoanAmt}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Charges Adjusted */}
                <div className="flex flex-col gap-1 w-[150px]">
                  <label className="text-gray-900 font-medium">
                    Charges Adjusted
                  </label>
                  <input
                    type="text"
                    value={loanInfoForAdj.chargesAdjusted}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    disabled
                  />
                </div>

                {/* Interest Paid For */}
                <div className="flex flex-col gap-1 w-[150px]">
                  <label className="text-gray-900 font-medium">
                    Interest Paid For
                  </label>
                  <input
                    type="text"
                    value={loanInfoForAdj.pendingDays}
                    className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Int. Paid Upto (Date Picker) */}
                <div className="flex flex-col gap-1 w-[150px]">
                  <label className="text-gray-900 font-medium">
                    Int. Paid Upto
                  </label>
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
            </>
          )}
          {isAdvInt && isAdvIntCheck && (
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {/* Pay Amount */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">Pay Amount</label>
                <input
                  type="text"
                  value={loanInfoForAdj.payAmount}
                  onChange={(e) =>
                    handlePayAmountChangeForNotAdvance(e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Interest Adjusted */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Interest Adjusted
                </label>
                <input
                  type="text"
                  value={loanInfoForAdj.pendingInt}
                  onChange={(e) =>
                    setloanInfoForAdj((prev) => ({
                      ...prev,
                      pendingInt: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Loan Amt Adjusted */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Loan Amt Adjusted
                </label>
                <input
                  type="text"
                  value={loanInfoForAdj.loanAmountPaid}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Balance Loan Amt */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Balance Loan Amt
                </label>
                <input
                  type="text"
                  value={loanInfoForAdj.balanceLoanAmt}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Charges Adjusted */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Charges Adjusted
                </label>
                <input
                  type="text"
                  value={loanInfoForAdj.chargesAdjusted}
                  disabled
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Interest Paid For */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Interest Paid For
                </label>
                <input
                  type="text"
                  value={loanInfoForAdj.pendingDays}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Int. Paid Upto (Date Picker) */}
              <div className="flex flex-col gap-1 w-[150px]">
                <label className="text-gray-900 font-medium">
                  Int. Paid Upto
                </label>
                <DatePicker
                  selected={loanInfoForAdj.intPaidUpto}
                  onChange={(date) =>
                    setloanInfoForAdj((prev) => ({
                      ...prev,
                      intPaidUpto: date,
                    }))
                  }
                  dateFormat="dd/MM/yyyy"
                  disabled
                  className="border border-gray-300 disabled:bg-gray-100 rounded-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="text-sm text-gray-500 mt-1 ml-1">
                {numberToWords(loanInfoForAdj.payAmount)}
              </div>
            </div>
          )}

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
            {/* {paymentInfo.mode === "Cash" && (
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
            )} */}

            {(paymentInfo.mode === "Net Banking" ||
              paymentInfo.mode === "Cash") && (
              <div className="flex flex-col gap-1 w-[200px]">
                <label className="text-gray-900 font-medium">
                  Bank Details
                </label>

                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={paymentInfo.bankId}
                  onChange={(e) => {
                    const selectedId = e.target.value;

                    const selectedBank = bankList.find(
                      (bank) => String(bank.id) === String(selectedId),
                    );

                    setPaymentInfo({
                      ...paymentInfo,
                      bankId: selectedId,
                      bankName: selectedBank?.bank_name || "",
                    });
                  }}
                >
                  <option value="">--Select Bank--</option>

                  {bankList.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.bank_name}
                    </option>
                  ))}
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

export default AddLoanRepayment;
