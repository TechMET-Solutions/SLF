import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewLoanCharges() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SLF | View Loan Charges";
  }, []);

  // 🔹 Dummy data for loan details
  const loanData = {
    loanNo: "LN-2025-101",
    loanDate: "2025-09-14",
    scheme: "Gold Loan",
    partyName: "Rahul Patil",
    loanAmt: "₹ 1,50,000",
    pendingAmt: "₹ 25,000",
    documentNo: "DOC-8742",
    documentDate: "2025-09-20",
    remark: "Processing completed",
  };

  // 🔹 Dummy rows for Charges Details table
  const rows = [
    {
      charges: "Processing Fee",
      account: "ACC-101",
      date: "2025-09-15",
      grossAmount: "500",
      cgstPercent: "9",
      cgstAmount: "45",
      sgstPercent: "9",
      sgstAmount: "45",
      netPayable: "590",
    },
    {
      charges: "Legal Fee",
      account: "ACC-102",
      date: "2025-09-18",
      grossAmount: "1000",
      cgstPercent: "9",
      cgstAmount: "90",
      sgstPercent: "9",
      sgstAmount: "90",
      netPayable: "1180",
    },
  ];

  const totalNet = rows.reduce(
    (sum, row) => sum + parseFloat(row.netPayable || 0),
    0
  );

  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">
            View Loan Charges
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/add-loan-charge")}
              className="bg-[#C1121F] text-white text-sm rounded px-6 py-1 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Loan Details */}
 <div className="bg-[#F7F7FF] mt-7 p-6 rounded-md w-full pl-[120px] pr-[120px]">
  <p className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4">
    Loan Details
  </p>

  <div className="flex flex-wrap gap-x-15 gap-y-15">
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Loan No</label>
      <p className="mt-1">{loanData.loanNo}</p>
    </div>
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Loan Date</label>
      <p className="mt-1">{loanData.loanDate}</p>
    </div>
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Scheme</label>
      <p className="mt-1">{loanData.scheme}</p>
    </div>
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Party Name</label>
      <p className="mt-1">{loanData.partyName}</p>
    </div>
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Loan Amt.</label>
      <p className="mt-1">{loanData.loanAmt}</p>
    </div>
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Pending Amt.</label>
      <p className="mt-1">{loanData.pendingAmt}</p>
    </div>
  </div>
</div>



      {/* 🔹 Document Section */}
     <div className="bg-[#FFE6E6] p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px] ">
  <div className="flex flex-wrap gap-x-20 gap-y-20">
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Document No</label>
      <p className="mt-1">{loanData.documentNo}</p>
    </div>
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Document Date</label>
      <p className="mt-1">{loanData.documentDate}</p>
    </div>
    <div className="flex flex-col">
      <label className="text-[14px] font-medium"> Remark <span className="text-red-600">*
        </span  ></label>
      <p className="mt-1">{loanData.remark}</p>
    </div>
  </div>
</div>


      {/* 🔹 Charges Details */}
      <h1 className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4 mt-6 px-[120px]">
        Charges Details
      </h1>

     <div className="px-[120px]">
  <div className=" overflow-hidden shadow-sm">
    <table className="w-full text-sm border-separate border-spacing-1"> 
      <thead>
        <tr className="bg-[#0A2478] text-white text-center">
          <th className="py-2 px-2 ">Sr No</th>
          <th className="py-2 px-2 ">Charges</th>
          <th className="py-2 px-2 ">Account</th>
          <th className="py-2 px-2 ">Date</th>
          <th className="py-2 px-2 ">Gross Amount</th>
          <th className="py-2 px-2 ">CGST(%)</th>
          <th className="py-2 px-2 ">CGST Amt</th>
          <th className="py-2 px-2 ">SGST(%)</th>
          <th className="py-2 px-2 ">SGST Amt</th>
          <th className="py-2 px-2 ro">Net Payable</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="text-center bg-transparent">
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{index + 1}</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.charges}</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.account}</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.date}</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.grossAmount}</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.cgstPercent}%</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.cgstAmount}</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.sgstPercent}%</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2">{row.sgstAmount}</td>
            <td className="bg-white shadow border border-gray-200 rounded-md py-2 px-2 font-semibold">{row.netPayable}</td>
          </tr>
        ))}

        <tr className="bg-transparent font-semibold ">
          <td
            colSpan="8"
            className="bg-gray-100 border border-gray-300 rounded-md text-right pr-40 shadow"
          >
            Total
          </td>
          <td colSpan="2" className="bg-gray-100 border border-gray-300 rounded-md text-center py-2  shadow">
            ₹ {totalNet}
            
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

export default ViewLoanCharges;
