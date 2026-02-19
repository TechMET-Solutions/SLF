import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

function PrintLoanApplication() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loanId } = location.state || {};
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧩 Fetch loan data
  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/Transactions/goldloan/getLoan/${loanId}`
      );
      setLoanData(response.data.loanApplication || {});
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching loan data:", err);
      setError("Failed to load loan data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loanId) fetchLoanData();
  }, [loanId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!loanData) return null;

 const safeParse = (value) => {
    try {
        if (!value) return [];

        // If already array → return as is
        if (Array.isArray(value)) return value;

        // If object → return [] (because not valid JSON string)
        if (typeof value === "object") return [];

        // If string equals "[object Object]" → return []
        if (value === "[object Object]") return [];

        // Try parsing JSON
        return JSON.parse(value);
    } catch {
        return [];
    }
};

const ornaments = safeParse(loanData.Pledge_Item_List);


const interestRates = safeParse(loanData.Effective_Interest_Rates);


  return (
    <div>
      {/* 🔹 Header */}
     <div className="flex justify-center sticky top-[80px] z-40 ">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1260px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white ">
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
            Print-Loan-Application
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
      <div className='mr-[110px] ml-[110px] 
' >
        <div className="p-5 ">
        {/* 🔹 Top Section - Images */}
        <div className="grid grid-cols-2 gap-6">
          {[1, 2].map((_, idx) => (
            <div className="flex justify-between gap-30" key={idx}>
              <div className="flex gap-4">
                {/* Customer */}
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    Customer
                  </h3>
                  <div className="w-[120px]">
                    <img
                      src={loanData.borrower_profileImage || ""}
                      alt="customer"
                      className="w-full h-[120px] object-cover border border-gray-200"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <img
                      src={loanData.borrower_signature || ""}
                      alt="customer-sign"
                      className="w-full mt-2 h-[34px] object-contain border border-blue-100"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                </div>

                {/* Co Borrower */}
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    Co Borrower
                  </h3>
                  <div className="w-[120px]">
                    <img
                      src={loanData.coborrower_profileImage || ""}
                      alt="co-borrower"
                      className="w-full h-[120px] object-cover border border-gray-200"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <img
                      src={loanData.coborrower_signature || ""}
                      alt="co-sign"
                      className="w-full mt-2 h-[34px] object-contain border border-blue-100"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                </div>
              </div>

              {/* Ornament */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Ornament
                </h3>
                <div className="w-[220px]">
                  <div className="w-full h-[120px] border border-blue-200 bg-gray-50 flex items-center justify-center">
                    <img
                      src={loanData.Ornament_Photo || ""}
                      alt="ornament"
                      className="object-contain h-full"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Info Section */}
        <div className="py-6 text-[13px] text-gray-800">
          <div className="flex justify-between gap-8">
            {[1, 2].map((_, idx) => (
              <div className="w-1/2 space-y-3" key={idx}>
                <div className="flex justify-between gap-4 w-full text-[13px] leading-relaxed">
                  {/* Customer Information */}
                  <div className="w-[62%]">
                    <h3 className="text-[#1E40AF] font-semibold mb-2 text-[20px]">
                      Customer Information
                    </h3>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="font-semibold w-[120px] align-top">
                            Name
                          </td>
                          <td className="text-gray-600 flex justify-end">
                            {loanData.Borrower || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">
                            Customer ID
                          </td>
                          <td className="text-gray-600 flex justify-end">
                            IND{loanData.id || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">Address</td>
                          <td className="text-gray-600 flex justify-end">
                            {loanData.Address || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">Mobile No.</td>
                          <td className="text-gray-600 flex justify-end">
                            {loanData.Mobile_Number || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">Proc Fee</td>
                          <td className="text-gray-600 flex justify-end">
                            ₹{loanData.Doc_Charges || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">
                            Co Borrower
                          </td>
                          <td className="text-gray-600 flex justify-end">
                            {loanData.Co_Borrower || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Loan Details */}
                  <div className="w-[38%]">
                    <h3 className="text-[#1E40AF] font-semibold mb-2 text-[20px]">
                      Loan Details
                    </h3>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="font-semibold w-[140px] align-top">
                            Loan No.
                          </td>
                          <td className="text-gray-600 flex justify-end">
                            {loanData.id || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">GL Scheme</td>
                          <td className="text-gray-600 flex justify-end">
                            {loanData.Scheme || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">
                            Period of Loan
                          </td>
                          <td className="text-gray-600 flex justify-end">
                            {loanData.Loan_Tenure
                              ? `${loanData.Loan_Tenure} Months`
                              : "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">
                            Loan Amount
                          </td>
                          <td className="text-gray-600 flex justify-end">
                            ₹{loanData.Loan_amount || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold align-top">Paid</td>
                          <td className="text-gray-600 flex justify-end">
                            ₹{loanData.Net_Payable || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Interest Details */}
                <div className="w-full overflow-hidden text-xs">
                  <div className="flex gap-1">
                    <div className="bg-[#1E3A8A] text-white font-semibold px-3 py-1 w-1/2">
                      For Duration
                    </div>
                    <div className="bg-[#1E3A8A] text-white font-semibold px-3 py-1 w-1/2">
                      Effective Rate of Interest
                    </div>
                  </div>

                  {interestRates.length > 0 ? (
                    interestRates.map((rate, i) => (
                      <div className="flex mt-1" key={i}>
                        <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                          {rate.term || "N/A"} DAYS
                        </div>
                        <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                          {rate.rate || "N/A"}% p.m.
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 mt-2">
                      No interest data available
                    </p>
                  )}
                </div>

                {/* Ornaments */}
                <div className="w-full text-sm mt-2">
                  <p className="font-semibold text-[#1E3A8A] text-[20px] mb-2">
                    Particulars of gold ornaments:
                  </p>

                  <div className="flex text-white font-semibold text-xs">
                    <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 text-center border border-white">
                      Product Desc
                    </div>
                    <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 text-center border border-white">
                      Nos
                    </div>
                    <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 text-center border border-white">
                      Gross Weight
                    </div>
                    <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 text-center border border-white">
                      Net Weight
                    </div>
                  </div>

                  {ornaments.length > 0 ? (
                    ornaments.map((o, i) => (
                      <div className="flex text-gray-700 text-xs mt-1" key={i}>
                        <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 text-center">
                          {o.particular || "N/A"}
                        </div>
                        <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 text-center">
                          {o.nos || "N/A"}
                        </div>
                        <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 text-center">
                          {o.gross ? `${o.gross} gm` : "N/A"}
                        </div>
                        <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 text-center">
                          {o.netWeight ? `${o.netWeight} gm` : "N/A"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 mt-2">
                      No ornament data available
                    </p>
                  )}

                  <div className="mt-3 text-xs py-1">
                    <p>
                      <span className="font-semibold ">
                        Loan Amount In Words:
                      </span>{" "}
                      ₹{loanData.Loan_amount || "N/A"} only.
                    </p>
                    <p className="mt-1">
                      Printed On:{" "}
                      {new Date().toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="mt-1 font-semibold">
                      Valuer 1:{" "}
                      <span className="font-medium">
                        {loanData.Valuer_1 || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
</div>
      
    </div>
  );
}

export default PrintLoanApplication;
