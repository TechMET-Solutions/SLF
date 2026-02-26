import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const LoanRepaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loanId, loanType } = location.state || {};

  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const loanApplication = loanData?.loanApplication || {};
  const installments = loanData?.installments || [];

  console.log(loanApplication, installments);
  useEffect(() => {
    if (!loanId) {
      navigate("/loan-repayment");
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${API}/Transactions/loan-details/${loanId}`,
          {
            params: { type: loanType },
          },
        );

        if (data.success) {
          setLoanData(data);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [loanId, loanType, navigate]);
  useEffect(() => {
    if (!loanId) {
      navigate("/loan-repayment");
      return;
    }
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API}/Transactions/loan-details/${loanId}?type=${loanType}`,
        );
        setLoanData(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [loanId, loanType, navigate]);

    if (loading) return <div className="p-4">Loading Application Data...</div>;
    

const getFirstInterestRate = (ratesString) => {
  if (!ratesString) return "";

  try {
    const parsed = JSON.parse(ratesString);
    return parsed.length > 0 ? parsed[0].addInt : "";
  } catch (error) {
    console.error("Invalid JSON:", error);
    return "";
  }
    };
    
    const getTenure = (schemeType, ratesString) => {
  if (!ratesString) return "";

  try {
    const parsed = JSON.parse(ratesString);
    if (parsed.length === 0) return "";

    const lastRecord = parsed[parsed.length - 1];
    const tenureValue = lastRecord.to;

    if (schemeType === "Daily") {
      return `${tenureValue} Days`;
    }

    if (schemeType === "Monthly") {
      return `${tenureValue} Months`;
    }

    return tenureValue;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return "";
  }
};
  return (
    <div className="min-h-screen mt-5 font-sans text-[11px] leading-tight">
      {/* Top Navbar */}

      <div className="flex justify-center">
        <div className="flex justify-center ">
          <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
            <h2 className="text-red-600 font-bold text-[20px] whitespace-nowrap">
              Loan Repayment Details
            </h2>

            <div className="flex justify-center gap-5 items-center">
              <div className="flex justify-end gap-3 mt-6 item-center">
                <button
                  className="text-white"
                  style={{
                    backgroundColor: "#C1121F",
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",
                    opacity: 1,
                  }}
                  onClick={() => navigate("/Loan-Repayment")}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-white border border-gray-300 p-4 ml-[110px] mr-[110px] mt-5">
        {/* --- LOAN INFORMATION SECTION --- */}
        {/* --- LOAN INFORMATION SECTION --- */}
        <fieldset className="border border-[#00a0a0] rounded px-4 pb-4 pt-1 mb-4 relative">
          <legend className="text-[#008080] font-bold px-1 ml-2 bg-white">
            Loan Information
          </legend>

          <div className="flex gap-4">
            <div className="flex-grow grid grid-cols-3 gap-x-6 gap-y-2">
              {/* Loan No */}
              <div className="flex items-center gap-2">
                <label className="w-32 text-gray-700">Loan No</label>
                <input
                  type="text"
                  value={loanApplication.id}
                  readOnly
                  className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
                />
              </div>

              {/* Branch Code */}
              <div className="flex items-center gap-2">
                <label className="w-32 text-gray-700">Branch Code</label>
                <input
                  type="text"
                  value={loanApplication.branch_id}
                  readOnly
                  className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
                />
              </div>

              {/* Branch Name */}
              <div className="flex items-center gap-2">
                <label className="w-32 text-gray-700">Branch Name</label>
                <input
                  type="text"
                  value={loanData?.branch_name || ""}
                  readOnly
                  className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
                />
              </div>

              {/* Customer Name */}
              <div className="flex items-center gap-2 col-span-2">
                <label className="w-32 text-gray-700">Customer Name</label>
                <input
                  type="text"
                  value={loanApplication?.Print_Name || ""}
                  readOnly
                  className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
                />
              </div>

              {/* Mobile No */}
              <div className="flex items-center gap-2">
                <label className="w-32 text-gray-700">Mobile No</label>
                <input
                  type="text"
                  value={loanApplication?.Mobile_Number || ""}
                  readOnly
                  className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
                />
              </div>

              {/* Loan Date */}
           <div className="flex items-center gap-2 relative">
  <label className="w-32 text-gray-700">Loan Date</label>
  <input
    type="text"
    value={
      loanApplication?.created_at
        ? new Date(loanApplication.created_at).toLocaleDateString("en-GB")
        : ""
    }
    readOnly
    className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
  />
  <span className="absolute right-2 text-[#8b4513] text-xs">
    📅
  </span>
</div>

              {/* Loan Amount */}
              <div className="flex items-center gap-2">
                <label className="w-32 text-gray-700">Loan Amt</label>
                <input
                  type="text"
                  value={loanApplication?.Loan_amount || "0.00"}
                  readOnly
                  className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
                />
              </div>

              {/* Rate Of Interest */}
             <div className="flex items-center gap-2">
  <label className="w-32 text-gray-700">Rate Of Int</label>
  <input
    type="text"
    value={getFirstInterestRate(loanApplication?.Effective_Interest_Rates)}
    readOnly
    className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
  />
</div>

              {/* Tenure */}
             <div className="flex items-center gap-2">
  <label className="w-32 text-gray-700">Tenure</label>
  <input
    type="text"
    value={getTenure(
      loanApplication?.Scheme_type,
      loanApplication?.Effective_Interest_Rates
    )}
    readOnly
    className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
  />
</div>
            </div>

            {/* Photo Box */}
            <div className="w-24 h-28 border border-blue-900 flex items-center justify-center bg-white shrink-0 mt-2">
              <img
                src="/placeholder-user.png"
                alt=""
                className="opacity-20 w-12"
              />
            </div>
          </div>
        </fieldset>

        {/* --- PAYMENT SECTION --- */}
        <fieldset className="border border-[#00a0a0] rounded px-4 pb-4 pt-1 mb-4 relative">
          <legend className="text-[#008080] font-bold px-1 ml-2 bg-white">
            Payment
          </legend>

          <div className="grid grid-cols-4 gap-x-8 gap-y-2">
            {/* Is Close */}
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label>Is Close</label>
            </div>

            {/* Pay Amount */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Pay Amount</label>
              <input
                type="text"
                defaultValue="10380.00"
                className="bg-white border border-gray-400 p-0.5 px-2 w-full rounded focus:outline-blue-500"
              />
            </div>

            {/* Interest Adjusted */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Interest Adjusted</label>
              <input
                type="text"
                value="380.00"
                readOnly
                className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
              />
            </div>

            {/* Loan Amount Adjusted */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Loan Amt. Adjusted</label>
              <input
                type="text"
                value="10000.00"
                readOnly
                className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
              />
            </div>

            <div className="hidden lg:block"></div>

            {/* Mode Of Payment */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Mode Of Payment</label>
              <select className="border border-gray-400 p-0.5 px-2 w-full rounded bg-white">
                <option>CASH</option>
                <option>CHEQUE</option>
                <option>ONLINE</option>
              </select>
            </div>

            {/* Bank Name */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Bank Name</label>
              <input
                type="text"
                value="Cash"
                readOnly
                className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
              />
            </div>

            {/* Payment Ref No */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Payment Ref No</label>
              <input
                type="text"
                className="bg-white border border-gray-400 p-0.5 px-2 w-full rounded focus:outline-blue-500"
              />
            </div>

            {/* Enhancement / Modification */}
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label>Enhancement/ Modification</label>
            </div>

            {/* Cash In Transit */}
           

            {/* Payment Made By */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Payment Made By</label>
              <input
                type="text"
                defaultValue="self"
                className="bg-white border border-gray-400 p-0.5 px-2 w-full rounded focus:outline-blue-500"
              />
            </div>

            {/* Interest Paid For */}
            <div className="flex items-center gap-2">
              <label className="w-32 text-gray-700">Interest Paid For</label>
              <div className="flex items-center gap-1 w-full">
                <input
                  type="text"
                  value="15.00"
                  readOnly
                  className="bg-[#e8e8e8] border border-gray-400 p-0.5 w-12 text-center"
                />
                <span>Day(S)</span>
              </div>
            </div>

            <div className="col-span-3"></div>

            {/* Int Paid Upto */}
            <div className="flex items-center gap-2 relative">
              <label className="w-32 text-gray-700">Int Paid Upto</label>
              <input
                type="text"
                value="24/09/2025"
                readOnly
                className="bg-[#e8e8e8] border border-gray-400 p-0.5 px-2 w-full rounded"
              />
              <span className="absolute right-2 text-[#8b4513] text-xs">
                📅
              </span>
            </div>
          </div>

          {/* Amount in words bar */}
          <div className="mt-4 flex items-center border border-gray-300 rounded overflow-hidden">
            <div className="bg-gray-100 px-2 py-1 border-r border-gray-300 font-bold whitespace-nowrap">
              Amount Paid (In Words) :
            </div>
            <div className="bg-white px-2 py-1 w-full italic">
              Ten Thousand Three Hundred and Eighty
            </div>
          </div>
        </fieldset>

        {/* --- INSTALLMENTS TABLE --- */}
        <fieldset className="border border-[#00a0a0] rounded px-4 pb-4 pt-1 mb-4 relative">
          <legend className="text-[#008080] font-bold px-1 ml-2 bg-white">
            Installments
          </legend>

          <div className="overflow-x-auto border border-gray-300 mt-2">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead className="bg-[#f8f8f8] border-b border-gray-300">
                <tr className="divide-x divide-gray-300">
                  <th className="p-1 font-normal w-8">Sr.</th>
                  <th className="p-1 font-normal">Receipt No</th>
                  <th className="p-1 font-normal">Payment Date</th>
                  <th className="p-1 font-normal">Paid Upto</th>
                  <th className="p-1 font-normal">Mode Of Payment</th>
                  <th className="p-1 font-normal">Payment Ref No</th>
                  <th className="p-1 font-normal text-right">Amount</th>
                  <th className="p-1 font-normal text-right">Interest</th>
                  <th className="p-1 font-normal text-right">Loan Amt. Adj.</th>
                  <th className="p-1 font-normal text-center">
                    Int. Paid Days
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loanData?.installments && loanData.installments.length > 0 ? (
                  loanData.installments.map((item, index) => (
                    <tr key={index} className="divide-x divide-gray-200">
                      <td className="p-1 text-center">{index + 1}</td>

                      <td className="p-1">{item.receipt_no}</td>

                      <td className="p-1">
                        {item.payment_date
                          ? new Date(item.payment_date).toLocaleDateString()
                          : ""}
                      </td>

                      <td className="p-1">
                        {item.paid_upto
                          ? new Date(item.paid_upto).toLocaleDateString()
                          : ""}
                      </td>

                      <td className="p-1">{item.mode}</td>

                      <td className="p-1">{item.ref_no || "-"}</td>

                      <td className="p-1 text-right">
                        {Number(item.amount || 0).toFixed(2)}
                      </td>

                      <td className="p-1 text-right">
                        {Number(item.interest || 0).toFixed(2)}
                      </td>

                      <td className="p-1 text-right">
                        {Number(item.principal || 0).toFixed(2)}
                      </td>

                      <td className="p-1 text-center">{item.paid_days || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="p-4 text-center text-gray-500">
                      No Installments Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

// Reusable Helper Component for fields to keep code clean
const Field = ({
  label,
  value,
  span = "",
  isDate = false,
  isEditable = false,
  isSelect = false,
  options = [],
}) => (
  <div className={`flex items-center gap-2 ${span}`}>
    <label className="w-32 text-gray-700 shrink-0">{label}</label>
    <div className="relative w-full flex items-center">
      {isSelect ? (
        <select className="border border-gray-400 p-0.5 px-2 w-full rounded bg-white">
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          readOnly={!isEditable}
          defaultValue={value}
          className={`${isEditable ? "bg-white" : "bg-[#e8e8e8]"} border border-gray-400 p-0.5 px-2 w-full rounded focus:outline-blue-500`}
        />
      )}
      {isDate && (
        <span className="absolute right-1 text-[#8b4513] text-xs">📅</span>
      )}
    </div>
  </div>
);

export default LoanRepaymentDetails;
