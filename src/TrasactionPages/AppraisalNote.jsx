import React from "react";

const AppraisalNote = () => {
  const handlePrint = () => window.print();
  const handleExit = () => window.history.back();

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header Section */}
      <div className="flex justify-center">
        <div className="flex items-center justify-between border border-gray-300 rounded-[10px] px-4 py-2 mt-4 w-full max-w-[1290px] h-[62px] shadow-lg bg-white">
          <h2 className="text-[#0A2478] font-bold text-[20px] whitespace-nowrap mr-4">
            APPRAISAL NOTE
          </h2>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#129121] text-white px-7 py-1 text-sm rounded hover:bg-[#0A2478] shadow-lg transition-colors"
            >
              Print
            </button>
            <button
              onClick={handleExit}
              className="bg-[#C1121F] text-white px-7 py-1 text-sm rounded hover:bg-[#a50d18] shadow-lg transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </div>




<div  className="w-[1500px]">
        {/* Borrower Details */}
      <div className="flex justify-between mt-6 mx-4 md:mx-36 text-[16px] ">
        <div>
          <p className="font-semibold">Name of the borrower</p>
          <p className="text-gray-700 mt-1">MAHESH SANJAY DONDE</p>
        </div>
        <div className="pr-220">
          <p className="font-semibold ">GL No.</p>
          <p className="text-gray-700 mt-1">01A5602843</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center font-bold text-[18px] text-[#0A2478] mt-6">
        APPRAISAL NOTE
      </h2>
      <p className="text-center text-[14px] mt-1">FOR GOLD ORNAMENTS</p>

      <p className="text-left mx-4 md:mx-36 text-[#0A2478] text-[20px] mt-6 font-semibold">
        Ornaments List
      </p>

      {/* Table Section */}
      <div className="mx-4 md:mx-36 mt-4 border border-gray-300 rounded-md overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[14px] text-center">
            <thead className="bg-[#0A2478] text-white">
              <tr>
                <th className="border border-gray-300 p-2">Ornaments Name</th>
                <th className="border border-gray-300 p-2">No Of Item</th>
                <th className="border border-gray-300 p-2">
                  Gross Wt (in Gms)
                </th>
                <th className="border border-gray-300 p-2">
                  Stone/Dirt/Wax wt (in Gms)
                </th>
                <th className="border border-gray-300 p-2">Net Wt (in Gms)</th>
                <th className="border border-gray-300 p-2">Rate Per Gram</th>
                <th className="border border-gray-300 p-2">
                  Eligible Amount of Loan (Rs.)
                </th>
                <th className="border border-gray-300 p-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 p-2">Gold Necklace</td>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">10.000</td>
                <td className="border border-gray-300 p-2">.000</td>
                <td className="border border-gray-300 p-2">10.000</td>
                <td className="border border-gray-300 p-2">5796.00</td>
                <td className="border border-gray-300 p-2">57960.00</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              <tr className="font-semibold bg-[#f9f9f9]">
                <td className="border border-gray-300 p-2 text-center pr-4">
                  Total
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">10.000</td>
                <td className="border border-gray-300 p-2">.000</td>
                <td className="border border-gray-300 p-2">10.000</td>
                <td className="border border-gray-300 p-2">5796.00</td>
                <td className="border border-gray-300 p-2">57960.00</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Appraiser Info Section */}
      <div className="mx-4 md:mx-36 mt-1 text-[14px] border border-gray-300 rounded-md overflow-hidden shadow bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[14px] text-left">
            <thead>
              <tr className="text-center bg-gray-50">
                <th className="border border-gray-300 p-2 w-[50%]"></th>
                <th className="border border-gray-300 p-2 w-[11%] text-left font-semibold">
                  Appraised by
                </th>
                
                <th className="border border-gray-300 p-2 w-[35%] text-left font-semibold">
                  Re-Appraised by
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Name</td>
                <td className="border border-gray-300 p-2 text-left">
                  Bhargu101
                </td>
                <td className="border border-gray-300 p-2 text-left"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Employee ID No.</td>
                <td className="border border-gray-300 p-2 text-left">
                  Bhargu101
                </td>
                <td className="border border-gray-300 p-2 text-left"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Signature</td>
                <td className="border border-gray-300 p-2 text-left"></td>
                <td className="border border-gray-300 p-2 text-left"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Date</td>
                <td className="border border-gray-300 p-2 text-left">
                  25/09/2025
                </td>
                <td className="border border-gray-300 p-2 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified & Sanctioned Section */}
      <div className="mx-4 md:mx-36 mt-1 text-[14px] border border-gray-300 rounded-md overflow-hidden shadow bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[14px] text-left">
      <tbody>
        <tr >
          <td className="border border-gray-300 p-2 w-[52%]">
            Verified and Sanctioned Loan Amount
          </td>
          <td className="border border-gray-300 p-2 text-left w-1/2">
            Rs. Fifty Eight Thousand
          </td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">
            Signature of Branch Manager/In-charge
          </td>
          <td className="border border-gray-300 p-2"></td>
        </tr>
        <tr>
          <td className="border border-gray-300 p-2">Name</td>
          <td className="border border-gray-300 p-2 text-center"></td>
        </tr>
        <tr>
          {/* Label Column */}
          <td className="border border-gray-300 p-2">Employee ID No.</td>
          {/* Data Column: Combines the ID and the Branch Seal into one cell for correct two-column alignment */}
          <td className="border border-gray-300 p-2 text-center flex justify-between items-center">
            <span className="flex-1 text-left">
                Bhagur01 ( Bhagur01 )
            </span>
            <span className="flex-1 text-right">
                (Branch Seal)
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
     
    </div>
  );
};

export default AppraisalNote;
