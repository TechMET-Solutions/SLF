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
      <div className="flex justify-center sticky top-[50px] z-40 ">
        <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border  border-gray-200 justify-between  bg-white ">
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
              className="bg-[#C1121F] text-white px-6 py-1 text-sm rounded hover:bg-[#a50d18]"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ===== FORM SECTIONS ===== */}
      <div className="ml-[10px] min-h-screen px-4">
        {/* ===== Loan Details Section ===== */}
        <div className="flex justify-center  w-[1462px] p-5 bg-[#FFE6E6]">
          <div className=" ">
            

            <div className="flex gap-5">
              <div className="flex gap-10">
                <div className="space-y-1 ">
                 
                  <div>
                    <label className="block   text-xs">Borrower Name*</label>
                    <input
                      type="text"
                      disabled
                      value={loanData.Borrower || "N/A"}
                      className="w-[280px] p-2 bg-white border border-gray-200   cursor-not-allowed focus:outline-none rounded-[8px] text-xs px-1 py-1 mt-1"
                    />
                  </div>

                
                  <div>
                    <label className="block    text-xs">
                      Co - Borrower Name*
                    </label>
                    <input
                      type="text"
                      disabled
                      value={loanData.Co_Borrower || "N/A"}
                      className="w-[280px] p-2 bg-white border border-gray-200 rounded-[8px]  cursor-not-allowed focus:outline-none text-xs px-1 py-1 mt-1"
                    />
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-xs">Scheme*</label>
                    <input
                      type="text"
                      disabled
                      value={loanData.Scheme || "N/A"}
                      className="w-full p-2 bg-white border border-gray-200 rounded-[8px]  cursor-not-allowed focus:outline-none text-xs px-1 py-1 mt-1"
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <p>Borrower Details*</p>
                  <div className="border w-[296px] h-[140px] p-2 mt-1">
                    <p>{loanData.Print_Name}</p>
                    <p>
                      {loanData.Mobile_Number} / {loanData.Alternate_Number}
                    </p>
                    <p>{loanData.Address}</p>

                    <p>Nominee Name: {loanData.Nominee || "N/A"}</p>
                    <p>Nominee Relation: {loanData.Nominee_Relation || "N/A"}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Co-Borrower Details*</p>
                  <div className="border w-[296px] h-[140px] mt-1 p-2">

                    <p>{loanData.coborrower_printName}</p>
                     <p>
                      {loanData.coBorrower_mobile} / {loanData.coBorrower_altMobile}
                    </p>
                                        <p>{loanData.coBorrower_Permanent_Address}</p>
                    <p>Nominee Name: {loanData.coBorrower_Nominee_NomineeName}</p>
                     <p> Nominee Relation: {loanData.coBorrower_Nominee_Relation}</p>
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            {/* Second Row */}
            <div className="flex gap-13 text-sm flex-wrap"></div>
          </div>

          {/* ===== Ornament & Profile Photos ===== */}
          <div className="flex mr-17 space-x-[1px] p-2">
            {/* Borrower */}
            <div className="w-[120px] h-auto flex flex-col items-center">
              <p className="font-medium mb-1 ">Borrower</p>
              <img
                src={loanData.borrower_profileImage || profileempty}
                alt="Borrower Profile"
                className="w-[100px] h-[100px] rounded-[5px] object-cover border border-gray-300"
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
              <p className="font-medium mb-1 ">Co-Borrower</p>
              <img
                src={loanData.coborrower_profileImage || profileempty}
                alt="Co-Borrower Profile"
                className="w-[100px] h-[100px] rounded-[5px] object-cover border border-gray-300"
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
              <p className="font-medium mb-1 ">Ornament Photo</p>
              <img
                src={
                  loanData.Ornament_Photo
                    ? `${loanData.Ornament_Photo}`
                    : profileempty
                }
                alt="Ornament"
                className="w-[100px] h-[100px] object-cover rounded-[5px] border border-gray-300"
                onError={(e) => {
                  e.target.src = profileempty;
                }}
              />
            </div>
          </div>
        </div>

        {/* ===== Pledge Item List ===== */}
         <div className="w-[1462px] bg-[#E9E9FF] pl-5 pr-5 pb-5">
          <div className=" ">
            <h3 className="font-semibold  text-[#0A2478] text-lg">
              Pledge Item List
            </h3>
            <div className="w-full text-xs border border-gray-300">
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-1 py-1 border-r-2 border-white">
                  Particulars
                </div>
                <div className="w-16 p-1 border-r-2 border-white text-center">
                  Nos.
                </div>
                <div className="w-24 p-1 border-r-2 border-white text-center">
                  Gross
                </div>
                <div className="w-24 p-1 border-r-2 border-white text-center">
                  Net Weight
                </div>
                <div className="w-28 p-1 border-r-2 border-white text-center">
                  Actual Purity
                </div>
                <div className="w-28 p-1 border-r-2 border-white text-center">
                  Assigned Purity
                </div>
                <div className="w-24 p-1 border-r-2 border-white text-center">
                  Rate
                </div>
                <div className="w-28 p-1 border-r-2 border-white text-center">
                  Valuation
                </div>
                <div className="w-28 p-1 text-center">Remark</div>
              </div>

              {/* Dynamic Rows */}
              {pledgeItems.length > 0 ? (
                <>
                  {pledgeItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className={`flex border-t border-gray-300 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
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

        <div className="w-[1462px]">
          <div className="flex  gap-2">
            <div className="bg-[#FFE6E6] pl-5 pr-5 pt-2">
              <div className="flex gap-2">
                <div className="flex flex-col w-30">
                  <label className="text-xs font-semibold">
                    Loan Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formatCurrency(loanData.Loan_amount)}
                    readOnly
                    className="border border-gray-300 rounded-md px-1 py-1  text-xs focus:outline-none bg-gray-50"
                  />
                </div>
 <div className="flex flex-col w-25">
                  <label className="text-xs font-semibold">
                    Admin Charges
                  </label>
                  <input
                    type="text"
                    value={formatCurrency(loanData.Admin_Charges)}
                    readOnly
                    className="border border-gray-300 rounded-md px-1 py-1 text-xs focus:outline-none bg-gray-50"
                  />
                </div>
                {/* Doc Charges */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold">
                    Doc Charges
                  </label>
                  <div className="flex">
                    <div className="bg-[#0B2B68] text-white px-2 py-1 rounded-l-md text-xs flex items-center justify-center">
                      2%
                    </div>
                    <input
                      type="text"
                      value={`₹${formatCurrency(loanData.Doc_Charges)}`}
                      readOnly
                      className="border border-gray-300 rounded-r-md px-1 py-1  focus:outline-none w-20 bg-gray-50 text-xs"
                    />
                  </div>
                </div>
               
                <div className="flex flex-col w-25">
                  <label className="text-xs font-semibold">
                    Net Payable
                  </label>
                  <input
                    type="text"
                    value={formatCurrency(loanData.Net_Payable)}
                    readOnly
                    className="border border-gray-300 rounded-md px-1 py-1  text-xs focus:outline-none bg-gray-50"
                  />
                </div>
              </div>
             
              <div className='flex gap-2 text-xs'>
                  <div >
                  <p className="text-[13px]  mt-2">
                    Valuer 1 <span className="text-red-500">*</span>
                  </p>
                  <div className="border border-gray-300 rounded-md px-1 py-1 mt-1 text-xs bg-gray-50 w-[200px]">
                    {loanData.Valuer_1 || "Not Assigned"}
                  </div>
              </div>

              <div className="flex flex-col w-20 mt-2">
                <p >
                  Valuer 2 <span className="text-red-500">*</span>
                </p>
                <div className="border border-gray-300 rounded-md px-1 py-1 mt-1 text-xs bg-gray-50 w-[200px]">
                  {loanData.Valuer_2 || "Not Assigned"}
                </div>
              </div>
              </div>
            </div>

            <div
              className=" bg-[#FFE6E6] p-2 text-xs
"
            >
              
            
                <table className=" border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0A2478] text-white text-center">
                      <th className="py-2 border w-[100px]">Sr No</th>
                      <th className="py-2 border w-[160px]">Paid By</th>
                      <th className="py-2 border w-[100px]">UTR Number</th>
                      <th className="py-2 border w-[200px]">Bank</th>
                      <th className="py-2 border w-[200px]">Customer Bank</th>
                      <th className="py-2 border w-[150px]">Customer Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {PaymentDataForShow && PaymentDataForShow.length > 0 ? (
                      <>
                        {PaymentDataForShow.map((row, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className="py-2 text-center">{index + 1}</td>

                            <td className="py-2 text-center">
                              <select
                                value={row.paidBy}
                                disabled
                                className="border rounded px-2 py-1 "
                              >
                                <option>{row.paidBy}</option>
                              </select>
                            </td>

                            <td className="py-1 text-center">
                              <input
                                value={row.utrNumber || "-"}
                                disabled
                                className="border rounded px-1 py-1"
                              />
                            </td>

                            <td className="py-2 text-center">
                              <select
                                value={row.bank}
                                disabled
                                className="border rounded px-2 py-1 w-[100px]"
                              >
                                <option>{row.bank || "-"}</option>
                              </select>
                            </td>

                            <td className="py-2 text-center">
                              <select
                                value={row.customerBank || "-"}
                                disabled
                                className="border rounded px-2 py-1 w-[100px]"
                              >
                                <option>{row.customerBank}</option>
                              </select>
                            </td>

                            <td className="py-2 text-center">
                              <input
                                value={row.customerAmount}
                                disabled
                                className="border rounded px-2 py-1 p-2"
                              />
                            </td>

                            <td></td>
                          </tr>
                        ))}

                        <tr className="font-semibold bg-gray-100">
                          <td colSpan="4" className="text-right pr-4 py-2">
                            Total
                          </td>
                          <td className="text-center">
                            {totalAmountoFTheCustomer.toFixed(2)}
                          </td>
                          <td></td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-6 text-gray-500 font-semibold"
                        >
                          Data Not Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
             
            </div>
          </div>
        </div>

       
       

        <div className=" bg-[#F7F7FF] w-[1462px]">
          <div className="flex gap-10 text-xs   pl-5 pr-5">
            {/* Scheme Details Table */}
            <div className="w-[550px]">
              <h2 className="font-semibold text-[20px] mb-1 text-[#0A2478]">
                Scheme Details
              </h2>
              <div className="border border-gray-300">
                <div className="flex bg-[#0A2478] text-white font-semibold">
                  <div className="flex-1 p-2 border-r border-white text-center">
                    Loan Tenure (Days)
                  </div>
                  <div className="w-40 p-2  border-r border-white text-center">
                    Min Loan
                  </div>
                  <div className="w-40 p-2  text-center">Max Loan</div>
                </div>
                <div className="flex border-t border-gray-300 bg-gray-50">
                  <div className="flex-1 p-2 py-2 border-r border-gray-300 text-center ">
                    {loanData.Loan_Tenure || loanData.loanPeriod || "N/A"}
                  </div>
                  <div className="w-40 p-2 py-2 border-r border-gray-300 text-center">
                    {formatCurrency(
                      loanData.Min_Loan || loanData.minLoanAmount,
                    )}
                  </div>
                  <div className="w-40 p-2 py-2 text-center">
                    {formatCurrency(
                      loanData.Max_Loan || loanData.maxLoanAmount,
                    )}
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
                        // className={`flex ${
                        //   index % 2 === 0 ? "bg-[#FFCDCD]" : "bg-[#E5E5FF]"
                        // }`}

                        className={
                          index % 2 === 0 ? "bg-gray-50 flex" : "bg-white flex"
                        }
                      >
                        <div className="flex-1 p-2 border-r border-white text-center">
                          {item.from} - {item.to} {label}
                        </div>

                        <div className="w-40 p-2 text-center">
                          {item.addInt}%
                        </div>
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
        {/* ===== Scheme Details & Effective Interest Rates ===== */}
      </div>
    </div>
  );
};

export default ViewLoanDetails;
