import axios from "axios";
import { Calendar, History } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
const GoldLoanApproval = () => {
  const branches = [
    { id: 1, name: "Bhagur" },
    { id: 2, name: "Nashik Road" },
    { id: 3, name: "Mumbai" },
    { id: 4, name: "Pune" },
  ];
  const [dummyBanks, setDummyBanks] = useState([]);
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get(`${API}/api/banks/list`);
        // Convert API data to your dropdown format
        const formattedBanks = res.data.map((bank) => ({
          id: bank.id,
          name: bank.bank_name,
        }));

        setDummyBanks(formattedBanks);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);
  const paidByOptions = ["Cash", "Bank Transfer", "UPI", "Online Payment"];

  const [rows, setRows] = useState([
    { paidBy: "", utrNumber: "", bankId: "", bankName: "", customerAmount: "" },
  ]);

  console.log(rows, "rows");

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      { paidBy: "", utrNumber: "", bank: "", customerAmount: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const totalAmount = rows.reduce(
    (sum, row) => sum + parseFloat(row.customerAmount || 0),
    0,
  );

  const [loanData, setLoanData] = useState(null);
  console.log(loanData, "loandata");
  const [loanSchemeData, setLoanSchemeData] = useState(null);
  console.log();
  const [coBorrowerBankDetails, setcoBorrowerBankDetails] = useState(null);
  const [BorrowerBankDetails, setBorrowerBankDetails] = useState(null);
  console.log(BorrowerBankDetails, "");
  console.log(loanSchemeData, "loanschemedata");
  console.log(loanData, "LoanData");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const roundToNext10 = (num) => Math.ceil(num / 10) * 10;
  const [emiTable, setEmiTable] = useState([]);
  // Get loan ID from URL params or location state
  const { loanId } = location.state || {};

  useEffect(() => {
    document.title = "SLF | Gold Loan Approval";
    if (loanId) {
      fetchLoanData();
    } else {
      setError("Loan ID not provided");
      setLoading(false);
    }
  }, [loanId]);

  const generateEMISchedule = (P, annualRate, months, type, firstEmiDate) => {
    const r = annualRate / 12 / 100;
    const rows = [];

    let emi = 0;
    let balance = P;

    // 👉 Convert first EMI date
    const baseDate = new Date(firstEmiDate);

    const getEmiDate = (monthIndex) => {
      const d = new Date(baseDate);
      d.setMonth(d.getMonth() + (monthIndex - 1));
      return d.toISOString().split("T")[0]; // yyyy-mm-dd
    };

    // ================= FLAT =================
    if (type === "Flat") {
      const totalInterest = P * r * months;
      const rawEmi = (P + totalInterest) / months;

      emi = roundToNext10(rawEmi);
      const monthlyInterest = totalInterest / months;

      for (let i = 1; i <= months; i++) {
        const opening = balance;
        const interest = monthlyInterest;

        let principal = emi - interest;
        if (i === months) {
          principal = balance;
          emi = principal + interest;
        }

        const closing = opening - principal;

        rows.push({
          month: i,
          emiDate: getEmiDate(i), // ✅ EMI DATE ADDED
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

    emi = roundToNext10(rawEmi);

    for (let i = 1; i <= months; i++) {
      const opening = balance;
      const interest = opening * r;

      let principal = emi - interest;
      if (i === months) {
        principal = balance;
        emi = principal + interest;
      }

      const closing = opening - principal;

      rows.push({
        month: i,
        emiDate: getEmiDate(i), // ✅ EMI DATE ADDED
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

  useEffect(() => {
    if (!loanData) return;

    const P = Number(loanData.Loan_amount);
    const tenure = Number(loanData.Loan_Tenure);
    const type = loanData.interestType;
    const payDate = loanData.Pay_Date; // ✅ first EMI date

    const slabs = loanData.Effective_Interest_Rates || [];
    const annualRate = slabs.length ? Number(slabs[0].addInt) : 0;

    const rows = generateEMISchedule(P, annualRate, tenure, type, payDate);
    setEmiTable(rows);
  }, [loanData]);

  



  const fetchLoanData = async () => {
    try {
      setLoading(true);

      // 1️⃣ First API call
      const response = await axios.get(
        `${API}/Transactions/goldloan/getLoan/${loanId}`
      );

      const loanApplication = response.data.loanApplication;

      console.log("loanApplication", response.data.borrowerBankDetails)

      setLoanData(loanApplication);
      setLoanSchemeData(response.data.schemeData);
      setcoBorrowerBankDetails(response.data.coborrowerBankDetails);
      setBorrowerBankDetails(response.data.borrowerBankDetails);      

    } catch (err) {
      console.error("❌ Error fetching loan data:", err);
      setError("Failed to load loan data");
    } finally {
      setLoading(false);
    }
  };


  // Parse JSON strings from API response
  const parseJSONData = (data) => {
    try {
      if (typeof data === "string") {
        return JSON.parse(data);
      }
      return data || [];
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return [];
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "0.00";
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);
  };

  // Approve loan handler
  const [approving, setApproving] = useState(false);

  const { loginUser } = useAuth();

  // const approveLoan = async () => {
  //   if (!loanData || !loanData.id) return setError("Loan ID missing");

  //   const loanAmount = Number(loanData.Loan_amount || 0);

  //   // ✅ check here
  //   if (totalAmount !== loanAmount) {
  //     alert(
  //       `Total Payment Details amount (${totalAmount}) must be equal to Loan Amount (${loanAmount})`,
  //     );
  //     return;
  //   }

  //   const confirmApprove = window.confirm("Approve this loan application?");
  //   if (!confirmApprove) return;

  //   try {
  //     setApproving(true);
  //     const approved_by = loginUser;
  //     const payload = { id: loanData.id, approved_by, rows };

  //     const res = await axios.put(
  //       `${API}/Transactions/goldloan/approve-loan`,
  //       payload,
  //     );

  //     if (res.data && res.data.success) {
  //       alert("Loan approved successfully.");
  //       // optional: navigate back to list or refresh
  //       navigate("/Loan-Application");
  //     } else {
  //       const msg = (res.data && res.data.message) || "Failed to approve loan";
  //       setError(msg);
  //     }
  //   } catch (err) {
  //     console.error("❌ Error approving loan:", err);
  //     setError("Server error while approving loan", err);
  //   } finally {
  //     setApproving(false);
  //   }
  // };

  const approveLoan = async () => {
    if (!loanData || !loanData.id) return setError("Loan ID missing");

    const loanAmount = Number(loanData.Loan_amount || 0);

    if (totalAmount !== loanAmount) {
      alert(
        `Total Payment Details amount (${totalAmount}) must be equal to Loan Amount (${loanAmount})`,
      );
      return;
    }

    const confirmApprove = window.confirm("Approve this loan application?");
    if (!confirmApprove) return;

    try {
      setApproving(true);
      const approved_by = loginUser;

      const payload = {
        id: loanData.id,
        approved_by,
        rows,
        // ✅ send EMI only if Monthly
        emi: loanSchemeData?.calcBasisOn === "Monthly" ? emiTable : null,
      };

      const res = await axios.put(
        `${API}/Transactions/goldloan/approve-loan`,
        payload,
      );

      if (res.data && res.data.success) {
        alert("Loan approved successfully.");
        navigate("/Loan-Application");
      } else {
        const msg = (res.data && res.data.message) || "Failed to approve loan";
        setError(msg);
      }
    } catch (err) {
      console.error("❌ Error approving loan:", err);
      setError("Server error while approving loan");
    } finally {
      setApproving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-lg">Loading loan data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-lg">No loan data found</div>
      </div>
    );
  }

  // Parse the JSON strings from API
  const pledgeItems = parseJSONData(loanData.Pledge_Item_List);
  const interestRates = parseJSONData(loanData.Effective_Interest_Rates);
  console.log(interestRates, "interestRates");
  // Calculate totals from pledge items
  const totalNos = pledgeItems.reduce(
    (sum, item) => sum + (parseInt(item.nos) || 0),
    0,
  );
  const totalGross = pledgeItems.reduce(
    (sum, item) => sum + (parseFloat(item.gross) || 0),
    0,
  );
  const totalNetWeight = pledgeItems.reduce(
    (sum, item) => sum + (parseFloat(item.netWeight) || 0),
    0,
  );
  const totalValuation = pledgeItems.reduce(
    (sum, item) => sum + (parseFloat(item.valuation) || 0),
    0,
  );

  return (
    <div className="min-h-screen w-full">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-center sticky top-[10px]">
        <div className="flex items-center px-6 py-4  w-[1463px] h-[40px] border border-gray-200 justify-between bg-white">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            Gold Loan Approval - {loanData.id || "N/A"}
          </h2>

          <div className="flex gap-2 mr-6">
            <button
              onClick={approveLoan}
              disabled={approving}
              className={`px-4 py-1 text-sm shadow-lg rounded ${approving ? "bg-gray-400 cursor-not-allowed" : "bg-[#0A2478] hover:bg-[#091d5f]"} text-white`}
            >
              {approving ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={() => navigate("/Loan-Application")}
              className="bg-[#C1121F] text-white px-6 py-1 text-sm rounded hover:bg-[#a50d18] shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ===== FORM SECTIONS ===== */}
      <div className="min-h-screen space-t-8 mx-[30px]">
        
        <div className="flex items-start gap-4 bg-[#FFE6E6] py-4 px-4 w-full border-b border-gray-200">

          {/* 1. Left Column: Input Fields */}
          <div className="flex flex-col gap-3 w-[350px]">
            <div>
              <label className="block  font-semibold text-[11px] mb-1">Borrower Name<span className="text-red-500">*</span></label>
              <div className="flex h-8">
                <input
                  type="text"
                  value={loanData.Print_Name || "N/A"}
                  readOnly
                  disabled
                  placeholder="Borrower Name (ID)"
                  className="w-full border border-gray-300 px-1 py-1 rounded-l text-[11px] outline-none bg-white"
                />
                <button className="bg-[#002855] text-white px-2 rounded-r flex items-center justify-center">
                  <History size={14} />
                </button>
              </div>
            </div>

            <div>
              <label className="block  font-semibold text-[11px] mb-1">Co - Borrower Name<span className="text-red-500">*</span></label>
              <div className="flex h-8 ">
                <input
                  type="text"
                  value={loanData?.coborrower_printName || "N/A"}
                  readOnly
                  disabled
                  placeholder="Enter Co- Borrower Name (ID)"
                  className="w-full border border-gray-300 px-1 py-1 rounded-l text-[11px] outline-none bg-white"
                />
                <button className="bg-[#002855] text-white px-2 rounded-r flex items-center justify-center">
                  <History size={14} />
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[11px] mb-1">Scheme<span className="text-red-500">*</span></label>
              <div className="flex h-8 ">
              <input
                type="text"
                value={loanData.Scheme || "N/A"}
                readOnly
                disabled
                placeholder="Enter Co- Borrower Name (ID)"
                className="w-full border border-gray-300 px-1 py-1 rounded-l text-[11px] outline-none bg-white"
                />
                </div>
            </div>
          </div>

          {/* 2. Middle Column: Borrower Details */}
          <div className="flex flex-col">
            <label className="block  font-semibold text-[11px] mb-1">
              Borrower Details<span className="text-red-500">*</span>
            </label>

            <div className="w-[350px] h-[160px] border border-gray-900 p-2 text-xs flex flex-col justify-between">

              {/* Main Borrower Info Group */}
              <div className="space-y-1">
                <div className="flex gap-2 items-center justify-start">
                  <p className="font-bold text-gray-800">{loanData.Print_Name || "N/A"}</p>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <p className="font-semibold text-gray-800">+91 {loanData.Mobile_Number || "N/A"} | +91 {loanData.Alternate_Number || "N/A"}</p>
                </div>

                <div className="flex gap-2 items-start  justify-start">
                  <p className="font-semibold text-gray-800 line-clamp-3">{loanData.Address || "N/A"}</p>
                </div>
                <div className="flex gap-2 items-start  justify-start">
                  <p className="font-semibold text-gray-800 line-clamp-3">Nominee Name : {loanData.Nominee || "N/A"}</p>
                </div>
                <div className="flex gap-2 items-start  justify-start">
                  <p className="font-semibold text-gray-800 line-clamp-3">Nominee Relation : {loanData.Nominee_Relation || "N/A"}</p>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Middle Column: Co-Borrower Details */}
          <div className="flex flex-col">
            <label className="block  font-semibold text-[11px] mb-1">
              Co-Borrower Details<span className="text-red-500">*</span>
            </label>

            <div className="w-[350px] h-[160px] border border-gray-900 p-2 text-xs flex flex-col justify-between">

              {/* Main Borrower Info Group */}
              <div className="space-y-1">
                <div className="flex gap-2 items-center justify-start">
                  <p className="font-bold text-gray-800">{loanData?.coborrower_printName || "N/A"}

                  </p>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <p className="font-semibold text-gray-800">+91 {loanData.coBorrower_mobile || "N/A"} |  +91  {loanData.coBorrower_altMobile || "N/A"}</p>
                </div>

                <div className="flex gap-2 items-start  justify-start">
                  <p className="font-semibold text-gray-800 line-clamp-3">{loanData.coBorrower_Permanent_Address || "N/A"}</p>
                </div>
                <div className="flex gap-2 items-start  justify-start">
                  <p className="font-semibold text-gray-800 line-clamp-3">Nominee Name : {loanData.coBorrower_Nominee_NomineeName || "N/A"}</p>
                </div>
                <div className="flex gap-2 items-start  justify-start">
                  <p className="font-semibold text-gray-800 line-clamp-3">Nominee Relation : {loanData.coBorrower_Nominee_Relation || "N/A"}</p>
                </div>
              </div>

            </div>
          </div>

          {/* 4. Right Column: Media Section */}
          <div className="flex gap-4 ml-auto">
            {/* Ornament Photo */}
            <div className="flex flex-col items-center">
              <span className="text-[11px]  font-semibold mb-1">Ornament Photo</span>
              <div className="w-24 h-24 border border-blue-300 bg-white/50 rounded flex items-center justify-center overflow-hidden">
                <img
                  src={
                    loanData.Ornament_Photo
                      ? `${loanData.Ornament_Photo}`
                      : profileempty
                  }
                  alt="Ornament"
                  className="w-[130px] h-[115px] object-cover rounded-[5px] border border-gray-300"
                  onError={(e) => {
                    e.target.src = profileempty;
                  }}
                />
              </div>
            </div>

            {/* Borrower Media */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px]  font-semibold ">Borrower</span>
              <div className="w-24 h-24 border border-blue-300 bg-white/50 rounded">
                <img
                  src={loanData.borrower_profileImage || profileempty}
                  alt="Borrower Profile"
                  className="w-[100px] h-[120px] rounded-[5px] object-cover border border-gray-300"
                  onError={(e) => {
                    e.target.src = profileempty;
                  }}
                />
              </div>
              <div className="w-24 h-7 border border-blue-200 bg-white rounded flex items-center justify-center italic text-gray-300 text-[10px]">
                {loanData.borrower_signature ? (
                  <img
                    src={loanData.borrower_signature}
                    alt="Borrower Signature"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-[9px]">
                    No Signature
                  </span>
                )}
              </div>
              <div className="w-24 h-7 border border-blue-200 bg-white rounded flex items-center justify-center italic text-gray-300 text-[10px]">
                {loanData.coborrower_signature ? (
                  <img
                    src={loanData.coborrower_signature}
                    alt="Co-Borrower Signature"
                    className="max-h-[24px] object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : (
                  <p className="text-gray-400 text-[9px]">No signature</p>
                )}
              </div>
            </div>

            {/* Co-Borrower Media */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] font-semibold">Co-Borrower</span>
              <div className="w-24 h-24 border border-blue-300 bg-white/50 rounded">
                <img
                  src={loanData.coborrower_profileImage || profileempty}
                  alt="Co-Borrower Profile"
                  className="w-[100px] h-[120px] rounded-[5px] object-cover border border-gray-300"
                  onError={(e) => {
                    e.target.src = profileempty;
                  }}
                />
              </div>
              <div className="w-24 h-7 border border-blue-200 bg-white rounded flex items-center justify-center italic text-gray-300 text-[10px]">
                {loanData.coborrower_signature ? (
                  <img
                    src={loanData.coborrower_signature}
                    alt="Co-Borrower Signature"
                    className="max-h-[24px] object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : (
                  <p className="text-gray-400 text-[9px]">No signature</p>
                )}
              </div>

            </div>
          </div>

        </div>
        {/* Loan Amount Section */}

        <div className=" bg-[#E9E9FF] p-2">
          <div className="w-full text-xs border border-gray-300 overflow-x-auto">
            {/* Header */}
            <div className="flex bg-[#0A2478] text-white font-semibold min-w-max">
              <div className="flex-1 p-2 py-3 border-r border-white/20">Particulars (Pledge Items)</div>
              <div className="w-16 p-2 border-r border-white/20 text-center">Nos.</div>
              <div className="w-24 p-2 border-r border-white/20 text-center">Gross</div>
              <div className="w-24 p-2 border-r border-white/20 text-center">Net Weight</div>
              <div className="w-28 p-2 border-r border-white/20 text-center">Purity</div>
              <div className="w-32 p-2 border-r border-white/20 text-center">Calculated Purity</div>
              <div className="w-24 p-2 border-r border-white/20 text-center">Rate</div>
              <div className="w-28 p-2 border-r border-white/20 text-center">Valuation</div>
              <div className="w-32 p-2 text-center">Remark</div>
            </div>

            {/* Dynamic Rows */}
            {pledgeItems.length > 0 ? (
              <>
                {pledgeItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`flex border-t border-gray-300 min-w-max ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <div className="flex-1 p-2 border-r border-gray-300">{item.particular || "Gold"}</div>
                    <div className="w-16 p-2 border-r border-gray-300 text-center">{item.nos || 1}</div>
                    <div className="w-24 p-2 border-r border-gray-300 text-center">{formatCurrency(item.gross)}</div>
                    <div className="w-24 p-2 border-r border-gray-300 text-center">{formatCurrency(item.netWeight)}</div>
                    <div className="w-28 p-2 border-r border-gray-300 text-center">{item.purity || ""}</div>
                    <div className="w-32 p-2 border-r border-gray-300 text-center">{item.Calculated_Purity || ""}</div>
                    <div className="w-24 p-2 border-r border-gray-300 text-center">{formatCurrency(item.rate)}</div>
                    <div className="w-28 p-2 border-r border-gray-300 text-center">{formatCurrency(item.valuation)}</div>
                    <div className="w-32 p-2 text-center">{item.remark || "-"}</div>
                  </div>
                ))}

                {/* Total Row */}
                <div className="flex border-t bg-gray-100 border-gray-300 min-w-max">
                  <div className="flex-1 p-2 border-r border-gray-300 font-bold text-right pr-4">Total</div>
                  <div className="w-16 p-2 border-r border-gray-300 text-center font-bold">{totalNos}</div>
                  <div className="w-24 p-2 border-r border-gray-300 text-center font-bold">{formatCurrency(totalGross)}</div>
                  <div className="w-24 p-2 border-r border-gray-300 text-center font-bold">{formatCurrency(totalNetWeight)}</div>
                  <div className="w-28 p-2 border-r border-gray-300"></div>
                  <div className="w-32 p-2 border-r border-gray-300"></div>
                  <div className="w-24 p-2 border-r border-gray-300"></div>
                  <div className="w-28 p-2 border-r border-gray-300 text-center font-bold">{formatCurrency(totalValuation)}</div>
                  <div className="w-32 p-2"></div>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-gray-500 border-t border-gray-300">No pledge items found</div>
            )}
          </div>
        </div>

        <div className="flex gap-4 bg-[#FFE6E6] p-4 w-full items-start">
          <div className="w-1/2 space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col">
                <label className="text-[11px] font-bold mb-1">Loan Amount <span className="text-red-500">*</span></label>
                <input type="text"
                  value={formatCurrency(loanData.Loan_amount)}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded px-1 py-1 text-xs h-8 bg-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-bold mb-1">Admin Charges</label>
                <input type="text"
                  value={formatCurrency(loanData.Admin_Charges)}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded px-1 py-1 text-xs h-8 bg-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-bold mb-1">Doc Charges</label>
                <input type="text"
                  value={`₹${formatCurrency(loanData.Doc_Charges)}`}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded px-1 py-1 text-xs h-8 bg-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-bold mb-1">Net Payable</label>
                <input type="text"
                  value={formatCurrency(loanData.Net_Payable)}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded px-1 py-1 text-xs h-8 bg-white" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-4 gap-2">
             
              <div className="flex flex-col">
                <label className="text-[11px] font-bold mb-1">Valuer 1</label>
                <input type="text"
                  value={loanData.Valuer_1 || "Not Assigned"}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded px-1 py-1 text-xs h-8 bg-white"
                 
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-bold mb-1">Valuer 2</label>
                <input type="text"
                  value={loanData.Valuer_2 || "Not Assigned"}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded px-1 py-1 text-xs h-8 bg-white"

                />
                 
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-bold mb-1">Pay Date</label>
                <input type="text"
                  value={loanData.Pay_Date || "Not Assigned"}
                  readOnly
                  disabled
                  className="border border-gray-300 rounded px-1 py-1 text-xs h-8 bg-white"

                />
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="border border-gray-300 rounded overflow-hidden">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-[#0A2478] text-white">
                    <th className="border-r border-white/20 py-1.5 px-1 w-12">Sr No</th>
                    <th className="border-r border-white/20 py-1.5 px-2">Paid by</th>
                    <th className="border-r border-white/20 py-1.5 px-2">Bank</th>
                    <th className="border-r border-white/20 py-1.5 px-2">Borrower Bank</th>
                    <th className="border-r border-white/20 py-1.5 px-2">Amount</th>
                    <th className="py-1.5 px-2 w-16">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-white"}
                    >
                      <td className="py-1 p-1">{index + 1}</td>
                      <td className="py-1">
                        <select
                          value={row.paidBy}
                          onChange={(e) =>
                            handleRowChange(index, "paidBy", e.target.value)
                          }
                          className="border border-gray-300 rounded-md px-1 py-1 w-[120px] bg-white"
                        >
                          <option value="">Select</option>
                          {paidByOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-2 p-2">
                        {row.paidBy === "Cash" ? (
                          <td className="py-2">
                            <select
                              value={row.bankId}
                              onChange={(e) => {
                                const selectedBank = dummyBanks.find(
                                  (b) => String(b.id) === e.target.value,
                                );

                                const updatedRows = [...rows];

                                updatedRows[index].bankId =
                                  selectedBank?.id || "";
                                updatedRows[index].bankName =
                                  selectedBank?.name || "";

                                setRows(updatedRows);
                              }}
                              className="border border-gray-300 rounded-md px-1 py-1 w-[140px] bg-white"
                            >
                              <option value="">Select Bank</option>
                              {dummyBanks.map((b) => (
                                <option key={b.id} value={b.id}>
                                  {b.name}
                                </option>
                              ))}
                            </select>
                          </td>
                        ) : (
                          <td className="py-2 p-2">
                            <select
                              value={row.bankId}
                              onChange={(e) => {
                                const selectedBank = dummyBanks.find(
                                  (b) => String(b.id) === e.target.value,
                                );

                                const updatedRows = [...rows];

                                updatedRows[index].bankId =
                                  selectedBank?.id || "";
                                updatedRows[index].bankName =
                                  selectedBank?.name || "";

                                setRows(updatedRows);
                              }}
                              className="border border-gray-300 rounded-md px-1 py-1 w-[140px] bg-white"
                            >
                              <option value="">Select Bank</option>
                              {dummyBanks.map((b) => (
                                <option key={b.id} value={b.id}>
                                  {b.name}
                                </option>
                              ))}
                            </select>
                          </td>
                        )}
                      </td>

                      <td className="py-2 p-2">
                        {row.paidBy === "Cash" ? (
                          <p>--</p>
                        ) : (
                          <select
                            value={row.customerBank}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "customerBank",
                                e.target.value,
                              )
                            }
                            className="border border-gray-300 rounded-md px-1 py-1 w-[100px] bg-white"
                          >
                            <option value="">Select Customer Bank</option>

                            {BorrowerBankDetails.map((bank) => (
                              <option key={bank.id} value={bank.id}>
                                {bank.bankName} — {bank.Account_No}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>

                      <td className="py-2">
                        <input
                          type="number"
                          value={row.customerAmount}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              "customerAmount",
                              e.target.value,
                            )
                          }
                          style={{
                            MozAppearance: "textfield",
                          }}
                          onWheel={(e) => e.target.blur()}
                          className="border border-gray-300 rounded-md px-1 py-1 w-[120px] bg-white"
                        />
                      </td>
                      <td className="py-2 flex justify-center items-center gap-2">
                        <button
                          onClick={handleAddRow}
                          className="bg-[#0A2478] text-white px-1 py-1 rounded hover:bg-blue-700"
                        >
                          <IoIosAddCircleOutline size={17} />
                        </button>
                        <button
                          onClick={() => handleRemoveRow(index)}
                          className="bg-red-600 text-white px-1 py-1 rounded hover:bg-red-700"
                        >
                          <IoIosCloseCircleOutline size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className=" font-semibold bg-gray-100">
                    <td colSpan="5" className="text-right pr-4 py-2">
                      Total
                    </td>
                    <td className="text-center">{totalAmount.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="  bg-[#E9E9FF] ">
          {loanSchemeData.calcBasisOn === "Monthly" && (
            <>
              <h3 className="font-semibold  text-[#0A2478] text-lg ">
                Loan Details table
              </h3>

              <table className="w-full border text-sm">
                <thead className="bg-[#0A2478] text-white">
                  <tr>
                    <th className="p-2 border">Month</th>
                    <th className="p-2 border">EMI Date</th> {/* ✅ NEW */}
                    <th className="p-2 border">Opening Balance</th>
                    <th className="p-2 border">EMI</th>
                    <th className="p-2 border">Interest</th>
                    <th className="p-2 border">Principal</th>
                    <th className="p-2 border">Closing Balance</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {emiTable.map((row) => {
                    const isPaid =
                      Number(loanData?.EMIPaidCount || 0) >= row.month;

                    return (
                      <tr key={row.month} className="text-center bg-white">
                        <td className="p-2 border">{row.month}</td>

                        {/* ✅ EMI DATE */}
                        <td className="p-2 border">
                          {new Date(row.emiDate).toLocaleDateString("en-IN")}
                        </td>

                        <td className="p-2 border">₹{row.opening}</td>
                        <td className="p-2 border">₹{row.emi}</td>
                        <td className="p-2 border">₹{row.interest}</td>
                        <td className="p-2 border">₹{row.principal}</td>
                        <td className="p-2 border">₹{row.closing}</td>

                        <td
                          className={`p-2 border font-medium ${isPaid ? "text-green-600" : "text-gray-400"
                            }`}
                        >
                          {isPaid ? "Paid" : "---"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
           )} 
        </div>

        {/* ===== Scheme Details & Effective Interest Rates ===== */}

        <div className="flex bg-[#FFE6E6] px-4 gap-6 text-xs mb-5 py-2 w-full">

          {/* Scheme Details Table */}
          <div className="w-1/2">
            <h2 className="font-semibold text-[20px] mb-2 text-[#0A2478]">
              Scheme Details
            </h2>

            <div className="border border-gray-300 rounded overflow-hidden">
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-2 border-r border-white text-center">
                  Loan Tenure (Days)
                </div>
                <div className="flex-1 p-2 border-r border-white text-center">
                  Min Loan
                </div>
                <div className="flex-1 p-2 text-center">
                  Max Loan
                </div>
              </div>

              <div className="flex border-t border-gray-300 bg-white">
                <div className="flex-1 p-2 border-r text-center">
                  {loanData.Loan_Tenure || loanData.loanPeriod || "N/A"}
                </div>
                <div className="flex-1 p-2 border-r text-center">
                  {formatCurrency(loanData.Min_Loan || loanData.minLoanAmount)}
                </div>
                <div className="flex-1 p-2 text-center">
                  {formatCurrency(loanData.Max_Loan || loanData.maxLoanAmount)}
                </div>
              </div>
            </div>
          </div>

          {/* Effective Interest Rates Table */}
          <div className="w-1/2 ">
            <h2 className="font-semibold text-[20px] mb-2 text-[#0A2478]">
              Effective Interest Rates
            </h2>

            <div className="border border-gray-300 rounded overflow-hidden">
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-2 border-r border-white text-center">
                  Terms
                </div>
                <div className="flex-1 p-2  text-center">
                  Interest Rate
                </div>
              </div>

              {interestRates.length > 0 ? (
                interestRates.map((rate, index) => (
                  <div
                    key={index}
                    className={`flex ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <div className="flex-1 p-2 border-r text-center">
                      {rate.from} To {rate.to}{" "}
                      {loanData?.Scheme_type === "Monthly" ? "MONTHS" : "DAYS"}
                    </div>
                    <div className="flex-1 p-2 text-center">
                      {rate.addInt}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex bg-[#FFCDCD]">
                  <div className="flex-1 p-3 text-center">
                    No rates available
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GoldLoanApproval;
