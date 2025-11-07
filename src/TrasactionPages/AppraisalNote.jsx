import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppraisalNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loanId } = location.state || {};

  const [appraisalData, setAppraisalData] = useState(null);

  const handlePrint = () => window.print();
  const handleExit = () => navigate(-1);

  useEffect(() => {
    if (!loanId) return;

    const fetchAppraisalNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Transactions/goldloan/appraisal-note/${loanId}`
        );
        console.log("✅ Appraisal Note API Response:", response.data);
        if (response.data.success) {
          setAppraisalData(response.data.data);
        }
      } catch (error) {
        console.error("❌ Error fetching Appraisal Note:", error);
      }
    };

    fetchAppraisalNote();
  }, [loanId]);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="min-h-screen pb-8">
      {/* 🖨️ Print CSS — Only show printable section */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-section, #print-section * {
              visibility: visible;
            }
            #print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>

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

      {/* 🧾 Printable Content Section */}
      <div id="print-section" className="max-w-[1300px] w-full mx-auto px-4">
        {/* Borrower Details */}
        <div className="flex justify-between mt-6 text-[16px]">
          <div>
            <p className="font-semibold">Name of the borrower</p>
            <p className="text-gray-700 mt-1">{appraisalData?.name || "N/A"}</p>
          </div>
          <div className="pr-230">
            <p className="font-semibold">GL No.</p>
            <p className="text-gray-700 mt-1">{loanId || "N/A"}</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center font-bold text-[18px] text-[#0A2478] mt-6">
          APPRAISAL NOTE
        </h2>
        <p className="text-center text-[14px] mt-1">FOR GOLD ORNAMENTS</p>

        <p className="text-left text-[#0A2478] text-[20px] mt-6 font-semibold">
          Ornaments List
        </p>

        {/* Table Section */}
        <div className="mx-auto mt-4 border border-gray-300 rounded-md overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[14px] text-center">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="border border-gray-300 p-2">Ornaments Name</th>
                  <th className="border border-gray-300 p-2">No Of Item</th>
                  <th className="border border-gray-300 p-2">
                    Gross Wt (in Gms)
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
                {appraisalData?.ornaments?.length > 0 ? (
                  appraisalData.ornaments.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="border border-gray-300 p-2">
                        {item.ornamentName || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.quantity || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.grossWeight || "N/A"}
                      </td>
                    
                      <td className="border border-gray-300 p-2">
                        {item.netWeight || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item?.ratePerGram.toFixed(2) || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.eligibleAmount || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.remark || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center p-3 text-gray-500 italic"
                    >
                      No ornament data available
                    </td>
                  </tr>
                )}

                {/* Total Row */}
                {/* Total Row */}
<tr className="font-semibold bg-[#f9f9f9]">
  <td className="border border-gray-300 p-2 text-center">Total</td>

  {/* blank */}
  <td className="border border-gray-300 p-2"></td>

  {/* Gross Total */}
  <td className="border border-gray-300 p-2">
    {appraisalData?.ornaments
      ?.reduce((acc, item) => acc + Number(item.grossWeight || 0), 0)
      .toFixed(2)}
  </td>

  {/* Net Total */}
  <td className="border border-gray-300 p-2">
    {appraisalData?.ornaments
      ?.reduce((acc, item) => acc + Number(item.netWeight || 0), 0)
      .toFixed(2)}
  </td>

  {/* rate total blank */}
  <td className="border border-gray-300 p-2"></td>

  {/* Eligible loan total */}
  <td className="border border-gray-300 p-2">
    {appraisalData?.ornaments
      ?.reduce((acc, item) => acc + Number(item.eligibleAmount || 0), 0)
      .toFixed(2)}
  </td>

  <td className="border border-gray-300 p-2"></td>
</tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Appraiser Info Section */}
        <div className="mx-auto mt-1 text-[14px] border border-gray-300 rounded-md overflow-hidden shadow bg-white">
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
                <td className="border border-gray-300 p-2">
                  Name : {appraisalData?.name || "N/A"}
                </td>
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
                <td className="border border-gray-300 p-2">
                  <div className="flex items-center gap-2">
                    <span>Signature:</span>
                    {appraisalData?.signature ? (
                      <img
                        src={appraisalData.signature}
                        alt="Signature"
                        className="h-10 w-25 object-contain inline-block"
                      />
                    ) : (
                      "N/A"
                    )}
                  </div>
                </td>
                <td className="border border-gray-300 p-2 text-left"></td>
                <td className="border border-gray-300 p-2 text-left"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Date : {formatDate(appraisalData?.date)}
                </td>
                <td className="border border-gray-300 p-2 text-left"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verified & Sanctioned Section */}
        <div className="mx-auto mt-1 text-[14px] border border-gray-300 rounded-md overflow-hidden shadow bg-white">
          <table className="w-full border-collapse text-[14px] text-left">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 w-[52%]">
                  Verified and Sanctioned Loan Amount
                </td>
                <td className="border border-gray-300 p-2 text-left w-1/2">
                  Rs. {appraisalData?.loan_amount || "N/A"}
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
                <td className="border border-gray-300 p-2">Employee ID No.</td>
                <td className="border border-gray-300 p-2 text-center flex justify-between items-center">
                  <span className="flex-1 text-left">Bhagur01 ( Bhagur01 )</span>
                  <span className="flex-1 text-right">(Branch Seal)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppraisalNote;
