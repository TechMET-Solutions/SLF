import axios from "axios";
import { useEffect, useState } from "react";
import { FaDownload, FaPrint } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const LoanRepaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loanId, loanType, receiptNumber } = location.state || {};
  console.log(loanType, "loanType");
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loanMaster, setLoanMaster] = useState(null);

  console.log(loanMaster, "loanMaster");

  const masterApp = loanMaster?.loanApplication || {};
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Repayment Details (Installments & Application summary)
        const repaymentRes = await axios.get(
          `${API}/Transactions/loan-details/${loanId}?type=${loanType}`,
        );

        // 2. Fetch Master Loan Details (Personal info, Status, Nominee)
        const masterRes = await axios.get(
          `${API}/Transactions/goldloan/getLoan/${loanId}`,
        );

        setLoanData(repaymentRes.data);
        setLoanMaster(masterRes.data); // This holds the detailed borrower info
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loanId) fetchAllData();
  }, [loanId, loanType]);

  if (loading)
    return (
      <div className="p-4 bg-gray-100 min-h-screen">
        Loading Application Data...
      </div>
    );

  // --- DATA MAPPING ---
  const loanApplication = loanData?.loanApplication || {};
  const installmentList = loanData?.installments || [];

  console.log(loanApplication, installmentList);

  // Parse the items from the stringified field in the JSON
  let pledgeItems = [];
  try {
    pledgeItems = loanApplication.Pledge_Item_List
      ? JSON.parse(loanApplication.Pledge_Item_List)
      : [];
  } catch (e) {
    console.error("Error parsing pledge items", e);
  }
  console.log(pledgeItems, "pledgeItems");
  // Extract Interest Rate from the first range of Effective_Interest_Rates
  let interestRate = "0";
  try {
    const rates = JSON.parse(loanApplication.Effective_Interest_Rates || "[]");
    interestRate = rates[0]?.addInt || "0";
  } catch (e) {}

  const selectedPayment =
    installmentList.find((inst) => inst.receiptNumber === receiptNumber) ||
    installmentList[0] ||
    {};
  console.log(selectedPayment, "selectedPayment");

  return (
    <div className="min-h-screen bg-white font-sans text-[11px] pb-10">
      <div className="flex justify-between items-center px-2 py-1 border w-[1462px] ml-[25px] sticky-top">
        <h1 className="text-red-600 font-bold text-lg">
          Loan-Repayment Details
        </h1>

        <button
          onClick={() => navigate("/")}
          className="w-[74px] h-[24px] cursor-pointer  rounded bg-[#C1121F] text-white text-[10px] "
        >
          Exit
        </button>
      </div>

      <div className="ml-[25px] w-[1462px]">
        {/* Section 1: Loan Information */}
        <div className="bg-[#FFEFEF] p-4 border border-pink-100 flex gap-4">
          <div>
 <h2 className="text-[#3F51B5] font-bold mb-3 text-lg">
            Loan Information
          </h2>
          <div className="flex gap-4">
            <div className="flex-1 grid grid-cols-7 gap-3">
              <InputField label="Loan No" value={loanApplication.id} />
              <InputField
  label="Borrower Name"
  value={`${loanApplication.Print_Name || ""} (${loanApplication.BorrowerId || ""})`}
/>
              <InputField
                label="Mobile Number"
                value={loanApplication.Mobile_Number}
              />
              <InputField label="Loan Date" value={loanApplication.Pay_Date} />
              <div className="flex flex-col">
                <label className="text-gray-600 mb-0.5">Loan Amount</label>
                <div className="flex">
                  <input
                    readOnly
                    className="w-full border border-gray-300 p-1 bg-white"
                    value={loanApplication.Loan_amount}
                  />
                  <span className="bg-[#001440] text-white px-2 flex items-center text-[9px]">
                    {interestRate}%
                  </span>
                </div>
              </div>

              <InputField
                label="Under the Scheme"
                value={loanApplication.Scheme}
              />
              <InputField
                label="Pending Loan Amount"
                value={loanApplication.LoanPendingAmount}
              />
            </div>

          </div>

          </div>
          <div>
<div className="flex gap-2">
  {/* Borrower Section: Passes both Profile Image and Signature */}
  <PhotoBox 
    label="Borrower" 
    imageUrl={masterApp.borrower_profileImage} 
    signatureUrl={masterApp.borrower_signature} 
  />

  {/* Co-Borrower Section: Passes both Profile Image and Signature */}
  <PhotoBox 
    label="Co-Borrower" 
    imageUrl={masterApp.coborrower_profileImage} 
    signatureUrl={masterApp.coborrower_signature} 
  />

  {/* Ornament Section: Only Profile Image (Signatures are hidden via isOrnament) */}
  <PhotoBox 
    label="Ornament Photo" 
    isOrnament={true} 
    imageUrl={masterApp.Ornament_Photo} 
  />
</div>
          </div>
        </div>

        {/* Section 2: Payment */}
        {loanType === "Bullet" && (
          <div className="bg-[#F5F8FF] p-4 rounded-sm border border-blue-50">
            <h2 className="text-[#3F51B5] font-bold mb-3 text-lg">
              Payment Details
            </h2>

            <div className="flex flex-col gap-4">
              {/* Row 1: Checkboxes and Mode */}
              <div className="flex gap-10 items-end">
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPayment?.isLoanClosed === 1}
                      readOnly
                    />
                    Is Close
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPayment?.isLoanClosed === 0}
                      readOnly
                    />
                    Is Adv. Int
                  </label>
                </div>

                 <InputField
                  label="Total Paid Amount"
                  value={selectedPayment?.payAmount}
                  isEditable={false}
                />
                <InputField
                  label="Interest Adjusted"
                  value={selectedPayment?.pendingInt}
                  isEditable={false}
                />
                <InputField
                  label="Principal Adjusted"
                  value={selectedPayment?.loanAmountPaid}
                  isEditable={false}
                />
                <InputField
                  label="Balance Loan Amount"
                  value={selectedPayment?.balanceLoanAmt}
                  isEditable={false}
                />
                <InputField
                  label="Interest Paid Upto"
                  value={selectedPayment?.intPaidUpto}
                  isEditable={false}
                />

               
              </div>

              {/* Row 2: Financial Breakdown using InputFields */}
              <div className="flex  gap-3 border-t border-blue-100 pt-3">
                <div className="flex flex-col">
                  <label className="text-gray-600 mb-0.5">
                    Mode of Payment <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="border border-gray-300 p-1 bg-white outline-none"
                    value={selectedPayment?.paymentInfo?.mode || ""}
                    disabled
                  >
                    <option value="">--Select--</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank/Online">Bank/Online</option>
                  </select>
                </div>

                <InputField
                  label="Payment Ref. No *"
                  value={selectedPayment?.paymentInfo?.refNo}
                  isEditable={false}
                />
                <InputField
                  label="Payment Made By *"
                  value={selectedPayment?.paymentInfo?.madeBy}
                  isEditable={false}
                />
                <InputField
                  label="Receipt Number"
                  value={selectedPayment?.receiptNumber}
                  isEditable={false}
                />
              </div>
            </div>
          </div>
        )}

     {loanType === "EMI" && (
  <div className="bg-[#F5F8FF] p-4 rounded-sm border border-blue-50">
    <h2 className="text-[#3F51B5] font-bold mb-3 text-lg">
      Payment Details (EMI Receipt)
    </h2>

    <div className="flex flex-col gap-4">
      {/* Row 1: Status and Financials */}
      <div className="flex gap-10 items-end">
       <div className="space-y-1">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      // ✅ Now checks if the is_closed property is exactly the string "true"
      checked={selectedPayment?.is_closed === "true"}
      readOnly
      className="cursor-not-allowed" // Good practice for readOnly inputs
    />
    Is Close
  </label>
</div>

        <InputField
          label="Total Paid Amount"
          value={selectedPayment?.pay_amount}
          isEditable={false}
        />
        <InputField
          label="Interest Portion"
          value={selectedPayment?.interest_amount}
          isEditable={false}
        />
        <InputField
          label="Opening Balance"
          value={selectedPayment?.opening_balance}
          isEditable={false}
        />
        <InputField
          label="Closing Balance"
          value={selectedPayment?.closing_balance}
          isEditable={false}
        />
        <InputField
          label="Payment Date"
          value={selectedPayment?.created_at ? new Date(selectedPayment.created_at).toLocaleDateString() : ""}
          isEditable={false}
        />
      </div>

      {/* Row 2: Transaction Info */}
      <div className="flex gap-3 border-t border-blue-100 pt-3">
        <div className="flex flex-col w-40">
          <label className="text-gray-600 mb-0.5">
            Mode of Payment 
          </label>
          <select
            className="border border-gray-300 p-1 bg-white outline-none"
            value={selectedPayment?.payment_mode || ""}
            disabled
          >
            <option value="">--Select--</option>
            <option value="Cash">Cash</option>
            <option value="Bank/Online">Bank/Online</option>
          </select>
        </div>

        <InputField
          label="Payment Ref. No "
          value={selectedPayment?.ref_no}
          isEditable={false}
        />
        <InputField
          label="Payment Made By "
          value={selectedPayment?.made_by}
          isEditable={false}
        />
        <InputField
          label="Receipt Number"
          value={selectedPayment?.receiptNumber}
          isEditable={false}
        />
        <InputField
          label="Bank Name"
          value={selectedPayment?.bank_name}
          isEditable={false}
        />
      </div>
    </div>
  </div>
)}

        {/* Section 3: Particulars Table (Items) */}
        <div className="border border-gray-200">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#00215E] text-white text-[10px]">
              <tr className="divide-x divide-white">
                <th className="py-1 px-2 font-normal">
                  Particulars( Pledge Item )
                </th>
                <th className="py-1 px-2 font-normal">Nos.</th>
                <th className="py-1 px-2 font-normal">Gross</th>
                <th className="py-1 px-2 font-normal">Net Weight</th>
                <th className="py-1 px-2 font-normal">Actual Purity</th>
                <th className="py-1 px-2 font-normal">Assigned Purity</th>
                <th className="py-1 px-2 font-normal">Rate</th>
                <th className="py-1 px-2 font-normal">Valuation</th>
                <th className="py-1 px-2 font-normal">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pledgeItems.map((item, index) => (
                <tr key={index} className="bg-white divide-x divide-gray-100">
                  <td className="p-1.5 text-left pl-4">{item.particular}</td>
                  <td>{item.nos}</td>
                  <td>{item.gross}</td>
                  <td>{item.netWeight}</td>
                  <td>{item.purity}</td>
                  <td>{item.Calculated_Purity || "--"}</td>
                  <td>{item.rate?.toLocaleString()}</td>
                  <td>{item.valuation?.toLocaleString()}</td>
                  <td>{item.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 4: Installments History */}
        {loanType === "Bullet" && (
           <div className="space-y-2 mt-2">
          <h2 className="text-[#3F51B5] font-bold text-lg">Installments</h2>
          <div className="border border-gray-200">
            <table className="w-full text-center border-collapse">
              <thead className="bg-[#00215E] text-white text-[10px]">
                <tr className="divide-x divide-white">
                  <th className="py-1 px-2 font-normal">Sr. No</th>
                  <th className="py-1 px-2 font-normal">Receipt No</th>
                  <th className="py-1 px-2 font-normal">Payment Date</th>
                  <th className="py-1 px-2 font-normal">Mode of Payment</th>
                  <th className="py-1 px-2 font-normal">Payment Ref. No</th>
                  <th className="py-1 px-2 font-normal">Amount</th>
                  <th className="py-1 px-2 font-normal">Interest</th>
                  <th className="py-1 px-2 font-normal">Loan Amt. Adj</th>
                  <th className="py-1 px-2 font-normal">Int Paid Days</th>
                  <th className="py-1 px-2 font-normal">Action</th>
                </tr>
              </thead>
              <tbody>
                {installmentList.map((inst, index) => (
                  <tr
                    key={inst.id}
                    className="bg-white divide-x divide-gray-100 border-b"
                  >
                    <td className="p-1.5">{index + 1}</td>
                    <td>{inst.receiptNumber}</td>
                    <td>
                      {new Date(inst.transaction_date).toLocaleDateString()}
                    </td>
                    <td>{inst.paymentInfo?.mode}</td>
                    <td>{inst.paymentInfo?.refNo}</td>
                    <td>{inst.payAmount}</td>
                    <td>{inst.pendingInt}</td>
                    <td>{inst.loanAmountPaid}</td>
                    <td>{inst.pendingDays}</td>
                    <td className="flex justify-center gap-3 py-1.5 text-gray-700">
                      <FaDownload
                        className="cursor-pointer hover:text-blue-600"
                        size={12}
                      />
                      <FaPrint
                        className="cursor-pointer hover:text-blue-600"
                        size={12}
                      />
                    </td>
                  </tr>
                ))}
                {installmentList.length === 0 && (
                  <tr>
                    <td colSpan="10" className="p-4 text-gray-400">
                      No installments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}
        {loanType === "EMI" && (
  <div className="space-y-2 mt-2">
    <h2 className="text-[#3F51B5] font-bold text-lg">Installment History (EMI)</h2>
    <div className="border border-gray-200">
      <table className="w-full text-center border-collapse">
        <thead className="bg-[#00215E] text-white text-[10px]">
          <tr className="divide-x divide-white">
            <th className="py-1 px-2 font-normal">Sr. No</th>
            <th className="py-1 px-2 font-normal">Receipt No</th>
            <th className="py-1 px-2 font-normal">Payment Date</th>
            <th className="py-1 px-2 font-normal">Mode</th>
            <th className="py-1 px-2 font-normal">Ref. No</th>
            <th className="py-1 px-2 font-normal">Total Paid</th>
            <th className="py-1 px-2 font-normal">Interest</th>
            <th className="py-1 px-2 font-normal">Principal Adj.</th>
            <th className="py-1 px-2 font-normal">Balance</th>
            <th className="py-1 px-2 font-normal">Action</th>
          </tr>
        </thead>
        <tbody>
          {installmentList.map((inst, index) => {
            // Principal Adjusted = Total Paid - Interest
            const principalAdj = (parseFloat(inst.pay_amount) - parseFloat(inst.interest_amount)).toFixed(2);
            
            return (
              <tr
                key={inst.id}
                className={`divide-x divide-gray-100 border-b text-[10px] ${
                  inst.receiptNumber === receiptNumber ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="p-1.5">{index + 1}</td>
                <td className="font-medium text-blue-700">{inst.receiptNumber}</td>
                <td>{new Date(inst.created_at).toLocaleDateString()}</td>
                <td>{inst.payment_mode}</td>
                <td>{inst.ref_no || "N/A"}</td>
                <td className="font-bold">{inst.pay_amount}</td>
                <td className="text-red-600">{inst.interest_amount}</td>
                <td className="text-green-700">{principalAdj}</td>
                <td>{inst.closing_balance}</td>
                <td className="flex justify-center gap-3 py-1.5 text-gray-700">
                  <FaDownload className="cursor-pointer hover:text-blue-600" size={12} />
                  <FaPrint className="cursor-pointer hover:text-blue-600" size={12} />
                </td>
              </tr>
            );
          })}
          {installmentList.length === 0 && (
            <tr>
              <td colSpan="10" className="p-4 text-gray-400">No EMI installments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
       
      </div>
    </div>
  );
};

// --- Sub-Components (Keep as is) ---
const InputField = ({ label, value, placeholder, isEditable = false }) => (
  <div className="flex flex-col">
    <label className="text-gray-600 mb-0.5">{label}</label>
    <input
      readOnly={!isEditable}
      placeholder={placeholder}
      className="border border-gray-300 p-1 text-[11px] outline-none bg-white"
      value={value || ""}
    />
  </div>
);

const PhotoBox = ({ label, imageUrl, signatureUrl, isOrnament = false }) => (
  <div className="flex flex-col items-center">
    <span className="text-[10px] text-gray-500 mb-1">{label}</span>
    
    {/* Main Photo Box */}
    <div className="w-20 h-24 border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden relative">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={label} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
      ) : (
        <div className="flex flex-col items-center">
          {isOrnament ? (
            <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          )}
        </div>
      )}
    </div>

    {/* Signature Box (Hidden for Ornaments) */}
    {!isOrnament && (
      <div className="mt-1 w-20 border border-gray-300 h-8 bg-white flex items-center justify-center overflow-hidden">
        {signatureUrl ? (
          <img 
            src={signatureUrl} 
            alt="Signature" 
            className="max-h-full max-w-full object-contain p-0.5" 
          />
        ) : (
          <span className="italic text-gray-400 text-[8px]">Signature</span>
        )}
      </div>
    )}
  </div>
);

export default LoanRepaymentDetails;
