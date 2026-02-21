import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import profileempty from "../assets/profileempty.png";
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
        const res = await axios.get("https://slunawat.co.in/api/banks/list");
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

  useEffect(() => {
    debugger;
    if (!loanData || !loanData) return;

    const P = Number(loanData.Loan_amount);
    const tenure = Number(loanData.Loan_Tenure);
    const type = loanData.interestType; // "Flat" or "Reducing"

    const slabs = loanData.Effective_Interest_Rates || [];
    const annualRate = slabs.length ? Number(slabs[0].addInt) : 0; // first slab

    const rows = generateEMISchedule(P, annualRate, tenure, type);
    setEmiTable(rows);
  }, [loanData]);

  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/Transactions/goldloan/getLoan/${loanId}`,
      );
      setLoanData(response.data.loanApplication); // Access the data property
      setLoanSchemeData(response.data.schemeData);
      setcoBorrowerBankDetails(response.data.coborrowerBankDetails);
      setBorrowerBankDetails(response.data.borrowerBankDetails);
      setError(null);
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

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "12:00:00 AM";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
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

  // Convert number to words
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

  // Approve loan handler
  const [approving, setApproving] = useState(false);

  const approveLoan = async () => {
    if (!loanData || !loanData.id) return setError("Loan ID missing");

    const loanAmount = Number(loanData.Loan_amount || 0);

    // ✅ check here
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
      const approved_by = "Admin - test ";
      const payload = { id: loanData.id, approved_by, rows };

      const res = await axios.put(
        `${API}/Transactions/goldloan/approve-loan`,
        payload,
      );

      if (res.data && res.data.success) {
        alert("Loan approved successfully.");
        // optional: navigate back to list or refresh
        navigate("/Loan-Application");
      } else {
        const msg = (res.data && res.data.message) || "Failed to approve loan";
        setError(msg);
      }
    } catch (err) {
      console.error("❌ Error approving loan:", err);
      setError("Server error while approving loan", err);
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
      <div className="flex justify-center sticky top-[80px]">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
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
      <div className="p-9 py-6 min-h-screen space-y-8 px-4">
        {/* ===== Loan Details Section ===== */}
        <div className="flex justify-center ">
          <div className="w-[950px] pt-3 pl-14">
            {/* First Row */}
            <div className="flex gap-7 text-sm mb-8 flex-wrap">
              <div>
                <p className="font-semibold">Loan No</p>
                <p>{loanData.id || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Loan Date</p>
                <p>
                  {formatDate(loanData.created_at)}
                  {/* <span className="ml-2">
                    {formatTime(loanData.created_at)}
                  </span> */}
                </p>
              </div>
              <div>
                <p className="font-semibold">Party Name</p>
                <p>{loanData.Borrower || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Scheme</p>
                <p>{loanData.Scheme || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Print Name</p>
                <p>{loanData.Print_Name || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Mobile Number</p>
                <p>+91 {loanData.Mobile_Number || "N/A"}</p>
              </div>
               <div>
                <p className="font-semibold">Co-Borrower</p>
                <p>{loanData.Co_Borrower || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Relation</p>
                <p>{loanData.Relation || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Nominee</p>
                <p>{loanData.Nominee || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Relation</p>
                <p>{loanData.Nominee_Relation || "N/A"}</p>
              </div>
                <div>
                <p className="font-semibold">Address</p>
                <p>{loanData.Address || "N/A"}</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex gap-13 text-sm flex-wrap">
             
            
            </div>
          </div>

          {/* ===== Ornament & Profile Photos ===== */}
          <div className="flex mr-17 space-x-[1px]">
            {/* Borrower */}
            <div className="w-[120px] h-auto flex flex-col items-center">
              <p className="font-medium mb-1 text-xs">Customer</p>
              <img
                src={loanData.borrower_profileImage || profileempty}
                alt="Borrower Profile"
                className="w-[100px] h-[115px] rounded-[5px] object-cover border border-gray-300"
                onError={(e) => {
                  e.target.src = profileempty;
                }}
              />
              <div className="mt-1 border w-[100px] h-[26px] flex items-center justify-center bg-white rounded-[4px]">
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
                  <span className="text-gray-400 text-[9px]">No Signature</span>
                )}
              </div>
            </div>

            {/* Co-Borrower */}
            <div className="w-[120px] h-auto flex flex-col items-center">
              <p className="font-medium mb-1 text-xs">Co-Borrower</p>
              <img
                src={loanData.coborrower_profileImage || profileempty}
                alt="Co-Borrower Profile"
                className="w-[100px] h-[115px] rounded-[5px] object-cover border border-gray-300"
                onError={(e) => {
                  e.target.src = profileempty;
                }}
              />
              <div className="mt-1 w-[100px] h-[26px] border flex items-center justify-center bg-white rounded-[4px]">
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

            {/* Ornament */}
            <div className="w-[120px] h-auto flex flex-col items-center">
              <p className="font-medium mb-1 text-xs">Ornament Photo</p>
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
        </div>

        {/* ===== Pledge Item List ===== */}
        <div className="flex justify-center  gap-2 m-2">
          <div className="">
            <div className="w-full   gap-4 text-xs">
              <div className=' flex gap-2'>
 <div className="flex flex-col w-30">
              <label className="text-[13px] font-semibold">
                Loan amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formatCurrency(loanData.Loan_amount)}
                readOnly
                className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none bg-gray-50"
                  />
                   {/* <div className="text-[12px] mt-2  font-semibold">
            {numberToWords(loanData.Loan_amount)}
          </div> */}
            </div>

            {/* Doc Charges */}
            <div className="flex flex-col">
              <label className="text-[13px] font-semibold">Doc Charges</label>
              <div className="flex mt-1">
                <div className="bg-[#0B2B68] text-white px-2 py-1 rounded-l-md text-sm flex items-center justify-center">
                  {loanSchemeData.docChargePercent}
                </div>
                <input
                  type="text"
                  value={`₹${formatCurrency(loanData.Doc_Charges)}`}
                  readOnly
                  className="border border-gray-300 rounded-r-md px-2 py-1 text-sm focus:outline-none w-24 bg-gray-50"
                />
                  </div>
                  

                </div>
                 <div className="flex flex-col w-25">
              <label className="text-[13px] font-semibold">Net Payable</label>
              <input
                type="text"
                value={formatCurrency(loanData.Net_Payable)}
                readOnly
                className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none bg-gray-50"
              />
            </div>
              </div>
           
              <div className='flex gap-2 mt-2'>
 {/* Net Payable */}
           

            {/* Valuer 1 */}
            <div className="flex flex-col w-44">
              <label className="text-[13px] font-semibold">
                Valuer 1 <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm bg-gray-50">
                {loanData.Valuer_1 || "Not Assigned"}
              </div>
                </div>
                 <div className="flex flex-col w-44 ">
              <label className="text-[13px] font-semibold">
                Valuer 2 <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm bg-gray-50">
                {loanData.Valuer_2 || "Not Assigned"}
              </div>
            </div>
              </div>

           

            {/* Valuer 2 */}
           
          </div>
         
        </div>
          <div className="">
            <h3 className="font-semibold  text-[#0A2478] text-lg">
              Pledge Item List
            </h3>
            <div className="w-full text-xs border border-gray-300 mt-2">
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
                <div className="w-28 p-2 border-r-2 border-white text-center">
                  Calculated Purity
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
              {pledgeItems.length > 0 ? (
                <>
                  {pledgeItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex border-t border-gray-300"
                    >
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
                      <div className="w-28 p-2 border-r border-gray-300 text-center">
                        {item.purity || ""}
                      </div>
                      <div className="w-28 p-2 border-r border-gray-300 text-center">
                        {item.Calculated_Purity || ""}
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

                  {/* Total Row */}
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

                    <div className="w-28 p-2 border-r border-gray-300 text-center">
                      {/* purity empty */}
                    </div>

                    <div className="w-28 p-2 border-r border-gray-300 text-center">
                      {/* calculated purity empty */}
                    </div>

                    <div className="w-24 p-2 border-r border-gray-300 text-center font-semibold">
                      {/* Rate total (if needed) */}
                      {/* Leave empty if not required */}
                    </div>

                    <div className="w-28 p-2 border-r border-gray-300 text-center font-semibold">
                      {formatCurrency(totalValuation)}
                    </div>

                    <div className="w-28 p-2 text-center">{/* remark */}</div>
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

        {/* Loan Amount Section */}
        
        <div className="px-[100px] ">
          <h1 className="font-semibold text-[20px] text-[#0A2478] ">
            Payment Details
          </h1>
          <div className=" border-gray-300 rounded-md overflow-hidden  mt-2">
            <table className=" border-collapse text-sm">
              <thead>
                <tr className="bg-[#0A2478] text-white text-center">
                  <th className="py-1 border w-[80px]">Sr No</th>
                  <th className="py-1 border w-[120px]">Paid By</th>
                  {/* <th className="py-2 border">UTR Number</th> */}
                  <th className="py-1 border w-[180px]">Bank</th>
                  <th className="py-1 border w-[180px]">Customer Bank</th>
                  <th className="py-1 border w-[120px]">Customer Amount</th>
                  <th className="py-1 border w-[100px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-1 p-1">{index + 1}</td>
                    <td className="py-1">
                      <select
                        value={row.paidBy}
                        onChange={(e) =>
                          handleRowChange(index, "paidBy", e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-white"
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
                            className="border border-gray-300 rounded-md px-2 py-1 w-[140px] bg-white"
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
                            className="border border-gray-300 rounded-md px-2 py-1 w-[140px] bg-white"
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
                          className="border border-gray-300 rounded-md px-2 py-1 w-[240px] bg-white"
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
                        className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-white"
                      />
                    </td>
                    <td className="py-2 flex justify-center items-center gap-2">
                      <button
                        onClick={handleAddRow}
                        className="bg-[#0A2478] text-white px-2 py-2 rounded hover:bg-blue-700"
                      >
                        <IoIosAddCircleOutline size={17} />
                      </button>
                      <button
                        onClick={() => handleRemoveRow(index)}
                        className="bg-red-600 text-white px-2 py-2 rounded hover:bg-red-700"
                      >
                        <IoIosCloseCircleOutline size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border font-semibold bg-gray-100">
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
         <div className="px-[100px] mt-6">
  {/* <h3 className="font-semibold mb-4 text-[#0A2478] text-lg mt-5">
          Loan Details table
        </h3>
        <table className="w-full border text-sm">
          <thead className="bg-[#0A2478] text-white">
            <tr>
              <th className="p-2 border">Month</th>
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
              const isPaid = Number(loanData?.EMIPaidCount || 0) >= row.month;

              return (
                <tr key={row.month} className="text-center">
                  <td className="p-2 border">{row.month}</td>
                  <td className="p-2 border">₹{row.opening}</td>
                  <td className="p-2 border">₹{row.emi}</td>
                  <td className="p-2 border">₹{row.interest}</td>
                  <td className="p-2 border">₹{row.principal}</td>
                  <td className="p-2 border">₹{row.closing}</td>
                  <td
                    className={`p-2 border font-medium ${
                      isPaid ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {isPaid ? "Paid" : "---"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

         </div>
      
        {/* ===== Scheme Details & Effective Interest Rates ===== */}
        <div className="flex gap-8 text-xs mx-14 justify-center">
          {/* Scheme Details Table */}
          <div className="w-[550px]">
            <h2 className="font-semibold text-[20px] mb-1 text-[#0A2478]">
              Scheme Details
            </h2>
            <div className="border border-gray-300">
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-2 py-4 border-r border-white text-center">
                  Loan Tenure (Days)
                </div>
                <div className="w-40 p-2 py-4 border-r border-white text-center">
                  Min Loan
                </div>
                <div className="w-40 p-2 py-4 text-center">Max Loan</div>
              </div>
              <div className="flex border-t border-gray-300">
                <div className="flex-1 p-2 py-4 border-r border-gray-300 text-center">
                  {loanData.Loan_Tenure || loanData.loanPeriod || "N/A"}
                </div>
                <div className="w-40 p-2 py-4 border-r border-gray-300 text-center">
                  {formatCurrency(loanData.Min_Loan || loanData.minLoanAmount)}
                </div>
                <div className="w-40 p-2 py-4 text-center">
                  {formatCurrency(loanData.Max_Loan || loanData.maxLoanAmount)}
                </div>
              </div>
            </div>
          </div>

          {/* Effective Interest Rates Table */}
          <div className="w-[700px]">
            <h2 className="font-semibold text-[20px] mb-1 text-[#0A2478]">
              Effective Interest Rates
            </h2>
            <div className="border border-gray-300">
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-2 border-r border-white text-center">
                  Terms
                </div>
                <div className="w-40 p-2 text-center">
                  Effective Interest Rates
                </div>
              </div>

              {/* Dynamic Interest Rates */}
              {interestRates.length > 0 ? (
                interestRates.map((rate, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      index % 2 === 0 ? "bg-[#FFCDCD]" : "bg-[#E5E5FF]"
                    }`}
                  >
                    <div className="flex-1 p-2 border-r border-white text-center">
                      {rate.from} To {rate.to}{" "}
                      {loanData?.Scheme_type === "Monthly" ? "MONTHS" : "DAYS"}
                    </div>
                    <div className="w-40 p-2 text-center">{rate.addInt}%</div>
                  </div>
                ))
              ) : (
                <div className="flex bg-[#FFCDCD]">
                  <div className="flex-1 p-2 border-r border-white text-center">
                    No rates available
                  </div>
                  <div className="w-40 p-2 text-center">-</div>
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
