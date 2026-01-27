import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import profileempty from "../assets/profileempty.png";
const ViewLoanDetails = () => {
  const [loanData, setLoanData] = useState(null);
  console.log(loanData, "loanData");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const dummyBanks = [
    { id: 1, name: "HDFC Bank" },
    { id: 2, name: "SBI Bank" },
    { id: 3, name: "ICICI Bank" },
  ];

  const paidByOptions = ["Cash", "Bank Transfer", "UPI", "Online Payment"];

  const [rows, setRows] = useState([
    { paidBy: "", utrNumber: "", bank: "", customerAmount: "" },
  ]);
  const [PaymentDataForShow, setPaymentDataForShow] = useState([]);
  const [totalAmountoFTheCustomer, settotalAmountoFTheCustomer] = useState(0);

  useEffect(() => {
    if (loanData?.payments_Details) {
      const data = loanData.payments_Details;

      setPaymentDataForShow(data);

      const total = data.reduce(
        (sum, item) => sum + Number(item.customerAmount || 0),
        0,
      );
      settotalAmountoFTheCustomer(total);
    }
  }, [loanData]);
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

  const { loanId } = location.state || {};

  useEffect(() => {
    document.title = "SLF | Gold Loan ";
    if (loanId) {
      fetchLoanData();
    } else {
      setError("Loan ID not provided");
      setLoading(false);
    }
  }, [loanId]);

  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/Transactions/goldloan/getLoan/${loanId}`,
      );

      let data = response.data.loanApplication;

      // parse payment
      if (data.payments_Details) {
        try {
          const parsed = JSON.parse(data.payments_Details);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRows(parsed); // <---- update rows state here
          }
        } catch (e) {
          console.warn("JSON parse failed on payments_Details", e);
        }
      }

      setLoanData(data);
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
      <div className="flex justify-center sticky top-[80px] z-40">
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
            Gold Loan - {loanData.id || "N/A"}
          </h2>

          <div className="flex gap-2 mr-6">
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
        <div className="flex justify-center mb-6">
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
                  <span className="ml-2">
                    {formatTime(loanData.created_at)}
                  </span>
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
            </div>

            {/* Second Row */}
            <div className="flex gap-13 text-sm flex-wrap">
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
        <div className="pl-[45px]">
          <div className="w-full px-14 flex items-start gap-4 text-xs">
            <div className="flex flex-col w-40">
              <label className="text-[13px] font-semibold">
                Loan amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formatCurrency(loanData.Loan_amount)}
                readOnly
                className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none bg-gray-50"
              />
            </div>

            {/* Doc Charges */}
            <div className="flex flex-col">
              <label className="text-[13px] font-semibold">Doc Charges</label>
              <div className="flex mt-1">
                <div className="bg-[#0B2B68] text-white px-2 py-1 rounded-l-md text-sm flex items-center justify-center">
                  2%
                </div>
                <input
                  type="text"
                  value={`₹${formatCurrency(loanData.Doc_Charges)}`}
                  readOnly
                  className="border border-gray-300 rounded-r-md px-2 py-1 text-sm focus:outline-none w-24 bg-gray-50"
                />
              </div>
            </div>

            {/* Net Payable */}
            <div className="flex flex-col w-40">
              <label className="text-[13px] font-semibold">Net Payable</label>
              <input
                type="text"
                value={formatCurrency(loanData.Net_Payable)}
                readOnly
                className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none bg-gray-50"
              />
            </div>

            {/* Valuer 1 */}
            <div className="flex flex-col w-44">
              <label className="text-[13px] font-semibold">
                Valuer 1 <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm bg-gray-50">
                {loanData.Valuer_1 || "Not Assigned"}
              </div>
            </div>

            {/* Valuer 2 */}
            <div className="flex flex-col w-44">
              <label className="text-[13px] font-semibold">
                Valuer 2 <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm bg-gray-50">
                {loanData.Valuer_2 || "Not Assigned"}
              </div>
            </div>
          </div>
          <div className="text-[11px] mt-2 ml-14 font-semibold">
            {numberToWords(loanData.Loan_amount)}
          </div>
        </div>
        <div className="px-[100px] mt-6">
          <h1 className="font-bold text-[24px] text-[#0A2478] mb-4">
            Payment Details
          </h1>
          <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0A2478] text-white text-center">
                  <th className="py-2 border">Sr No</th>
                  <th className="py-2 border">Paid By</th>
                  <th className="py-2 border">UTR Number</th>
                  <th className="py-2 border">Bank</th>
                  <th className="py-2 border">Customer Bank</th>
                  <th className="py-2 border">Customer Amount</th>
                  <th className="py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {PaymentDataForShow.map((row, index) => (
                  <tr key={index} className="text-center bg-white">
                    <td className="py-2">{index + 1}</td>

                    <td className="py-2">
                      <select
                        value={row.paidBy}
                        disabled
                        className="border rounded px-2 py-1"
                      >
                        <option>{row.paidBy}</option>
                      </select>
                    </td>

                    <td className="py-2">
                      <input
                        value={row.utrNumber}
                        disabled
                        className="border rounded px-2 py-1"
                      />
                    </td>

                    <td className="py-2">
                      <select
                        value={row.bank}
                        disabled
                        className="border rounded px-2 py-1"
                      >
                        <option>{row.bank || "-"}</option>
                      </select>
                    </td>

                    <td className="py-2">
                      <select
                        value={row.customerBank}
                        disabled
                        className="border rounded px-2 py-1"
                      >
                        <option>{row.customerBank}</option>
                      </select>
                    </td>

                    <td className="py-2">
                      <input
                        value={row.customerAmount}
                        disabled
                        className="border rounded px-2 py-1"
                      />
                    </td>

                    <td></td>
                  </tr>
                ))}

                <tr className="border font-semibold bg-gray-100">
                  <td colSpan="5" className="text-right pr-4 py-2">
                    Total
                  </td>
                  <td className="text-center">
                    {totalAmountoFTheCustomer.toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
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
              {loanData?.Effective_Interest_Rates?.length > 0 ? (
                loanData.Effective_Interest_Rates.map((item, index) => {
                  const label =
                    loanData?.Scheme_type === "Monthly" ? "MONTHS" : "DAYS";

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        index % 2 === 0 ? "bg-[#FFCDCD]" : "bg-[#E5E5FF]"
                      }`}
                    >
                      <div className="flex-1 p-2 border-r border-white text-center">
                        {item.from} - {item.to} {label}
                      </div>

                      <div className="w-40 p-2 text-center">{item.addInt}%</div>
                    </div>
                  );
                })
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

export default ViewLoanDetails;
