import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileempty from "../assets/profileempty.png";

const ViewLoanDetails = () => {
  useEffect(() => {
    document.title = "SLF | Loan Enquiry";
  }, []);

  const navigate = useNavigate();

  // ✅ Initialize formData state
  const [formData, setFormData] = useState({
    Borrower_ProfileImg: "",
    Borrower_signature: "",
    CoBorrower_ProfileImg: "",
    CoBorrower_signature: "",
    OrnamentPhoto: "",
  });

  // ✅ Handle ornament image upload
  const handleOrnamentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, OrnamentPhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA]">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
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
            View Loan Details
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="text-white text-sm rounded px-5 py-1 cursor-pointer bg-[#C1121F] "
          >
            Close
          </button>
        </div>
      </div>

      {/* ===== FORM SECTIONS ===== */}
      <div className="p-9 py-6 min-h-screen space-y-8 px-4">
        {/* ===== Loan Details Section ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-[1050px] pt-3 pl-19">
            {/* First Row */}
            <div className="flex gap-7 text-sm mb-3 flex-wrap">
              <div>
                <p className="font-semibold mb-1">Loan No</p>
                <p>01A5602839</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Loan Date</p>
                <p>
                  25/07/2025 <span className="ml-2">12:00:00 AM</span>
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Party Name</p>
                <p>MAHESH SANJAY DONDE</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Scheme</p>
                <p>IND001</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Print Name</p>
                <p>MAHESH SANJAY DONDE</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Mobile Number</p>
                <p>+91 8965412568</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex gap-7 text-sm flex-wrap py-3">
              <div>
                <p className="font-semibold mb-1">Co-Borrower</p>
                <p>BARFILAL</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Relation</p>
                <p>Father</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Nominee</p>
                <p>BARFILAL</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Relation</p>
                <p>Father</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Address</p>
                <p>H. NO.444-31, BHAGUR, Nashik 422502, India</p>
              </div>
            </div>
          </div>

          {/* ===== Ornament & Profile Photos ===== */}
          <div className="flex mr-17 space-x-[1px] ">
            {/* Borrower */}
            <div className="w-[120px] h-auto flex flex-col items-center">
              <p className="font-semibold mb-1 text-xs">Customer</p>
              <img
                src={
                  formData.Borrower_ProfileImg
                    ? formData.Borrower_ProfileImg
                    : profileempty
                }
                alt="Borrower Profile"
                className="w-[100px] h-[115px] rounded-[5px] object-cover border border-gray-300"
              />
              <div className="mt-1 border w-[100px] h-[26px] flex items-center justify-center bg-white rounded-[4px]">
                {formData.Borrower_signature ? (
                  <img
                    src={formData.Borrower_signature}
                    alt="Borrower Signature"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-[9px]">No Signature</span>
                )}
              </div>
            </div>

            {/* Co-Borrower */}
            <div className="w-[120px] h-auto flex flex-col items-center">
              <p className="font-semibold mb-1 text-xs">Co-Borrower</p>
              <img
                src={
                  formData.CoBorrower_ProfileImg
                    ? formData.CoBorrower_ProfileImg
                    : profileempty
                }
                alt="Co-Borrower Profile"
                className="w-[100px] h-[115px] rounded-[5px] object-cover border border-gray-300"
              />
              <div className="mt-1 w-[100px] h-[26px] border flex items-center justify-center bg-white rounded-[4px]">
                {formData.CoBorrower_signature ? (
                  <img
                    src={formData.CoBorrower_signature}
                    alt="Co-Borrower Signature"
                    className="max-h-[24px] object-contain"
                  />
                ) : (
                  <p className="text-gray-400 text-[9px]">No signature</p>
                )}
              </div>
            </div>

            {/* Ornament */}
            <div className="w-[120px] h-auto flex flex-col items-center">
              <p className="font-semibold mb-1 text-xs">Ornament Photo</p>
              <img
                src={
                  formData.OrnamentPhoto ? formData.OrnamentPhoto : profileempty
                }
                alt="Ornament"
                className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* ===== Pledge Item List ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-blue-900 text-lg">
              Pledge Item List
            </h3>
            <table className="w-full  text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r-3 border-gray-200">
                    Particulars
                  </th>
                  <th className="px-4 py-2 border-r-3 border-gray-200">Nos.</th>
                  <th className="px-4 py-2 border-r-3 border-gray-200">
                    Gross
                  </th>
                  <th className="px-4 py-2 border-r-3 border-gray-200">
                    Net Weight
                  </th>
                  <th className="px-4 py-2 border-r-3 border-gray-200">
                    Purity
                  </th>
                  <th className="px-4 py-2 border-r-3 border-gray-200">Rate</th>
                  <th className="px-4 py-2 border-r-3 border-gray-200">
                    Valuation
                  </th>
                  <th className="px-4 py-2">Remark</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 mt-10">
                <tr className="">
                  <td className="px-4 py-2 border border-gray-300 mt-10">
                    Gold
                  </td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">1</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">5.000</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">5.000</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">Gold 20K</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">6,300</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">
                    31,500.00
                  </td>
                  <td className="px-4 py-2 border border-gray-300">Ganthan</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 border border-gray-300">Total</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">1</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">5.000</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">5.000</td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300"></td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300"></td>
                  <td className="px-4 py-2 ml-0.5 border border-gray-300">
                    31,500.00
                  </td>
                  <td className="px-4 py-2 border border-gray-300"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="w-full flex flex-wrap items-end gap-4 text-sm mt-4 mx-14">
          <div className="flex flex-col w-40">
            <label className="text-gray-700 text-xs font-semibold mb-1">
              Loan amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value="31,500.00"
              readOnly
              className="border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Doc Charges */}
          <div className="flex flex-col w-44">
            <label className="text-gray-700 text-xs font-semibold mb-1">
              Doc Charges(%)
            </label>
            <div className="flex">
              <div className="bg-[#1E3A8A] text-white text-xs font-semibold rounded-l-md px-3 py-1.5 flex items-center justify-center w-1/3">
                0.2%
              </div>
              <input
                type="text"
                value="₹500.00"
                readOnly
                className="border border-gray-300 rounded-r-md px-3 py-1.5 text-gray-700 w-2/3 focus:outline-none"
              />
            </div>
          </div>

          {/* Net Payable */}
          <div className="flex flex-col w-40">
            <label className="text-gray-700 text-xs font-semibold mb-1">
              Net Payable
            </label>
            <input
              type="text"
              value="31,000.00"
              readOnly
              className="border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Valuer 1 */}
          <div className="flex flex-col w-44">
            <label className="text-gray-700 text-xs font-semibold mb-1">
              Valuer 1 <span className="text-red-500">*</span>
            </label>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 focus:outline-none">
              <option>Select Valuer 1</option>
            </select>
          </div>

          {/* Valuer 2 */}
          <div className="flex flex-col w-44">
            <label className="text-gray-700 text-xs font-semibold mb-1">
              Valuer 2 <span className="text-red-500">*</span>
            </label>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 focus:outline-none">
              <option>Select Valuer 2</option>
            </select>
          </div>
        </div>

        {/* ===== Payment Details ===== */}
        <div className=" text-xs mt-4 mx-14">
          {/* Heading */}
          <h3 className="text-[#0A2478] text-[18px] font-semibold mb-1">
            Payment Details
          </h3>

          {/* Table */}
          <div className="overflow-hidden">
            <div className="flex">
              {/* Headers */}
              {[
                "Paid By",
                "Cheque No.",
                "Cheque Date",
                "Bank",
                "Customer Bank",
                "Amount",
              ].map((header, index) => (
                <div
                  key={index}
                  className="bg-[#0A2478] text-white font-semibold px-3 py-3 border-r-3 border-white flex-1 text-left"
                >
                  {header}
                </div>
              ))}
            </div>

            {/* Row */}
            <div className="flex">
              <div className="flex-1 px-3 py-3 border border-gray-300  text-gray-700 bg-white">
                CHEQUE
              </div>
              <div className="flex-1  px-3 py-3 ml-0.5 border border-gray-300 text-gray-700 bg-white">
                123
              </div>
              <div className="flex-1  px-3 py-3 ml-0.5 border border-gray-300 text-gray-700 bg-white">
                25/09/2025
              </div>
              <div className="flex-1 px-3 py-3 ml-0.5 border border-gray-300 text-gray-700 bg-white">
                HO HDFC Bank, Bhagur
              </div>
              <div className="flex-1 px-3 py-3 ml-0.5 border border-gray-300 text-gray-700 bg-white">
                HDFC
              </div>
              <div className="flex-1 px-3 py-3 ml-0.5 border border-gray-300 rounded-r text-gray-700 bg-white">
                35,000.00
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scheme Details ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-blue-900 text-lg">
              Scheme Details
            </h3>
            <div className="w-full text-xs mt-4">
              {/* Header Row */}
              <div className="flex">
                {[
                  "Calc. basis on",
                  "Payment frequency",
                  "Payment in Advance",
                  "Calc Method",
                  "Min Loan",
                  "Pay Basis On",
                  "Loan Tenure (Days)",
                  "Max Loan",
                ].map((header, index) => (
                  <div
                    key={index}
                    className="bg-[#1E3A8A] text-white font-semibold px-3 py-3 border-r-3 mb-1  border-white flex-1 text-left"
                  >
                    {header}
                  </div>
                ))}
              </div>

              {/* Data Row */}
              <div className="flex">
                <div className="flex-1 px-3 py-3 border border-gray-300 rounded-l text-gray-700 bg-white">
                  Daily
                </div>
                <div className="flex-1 px-3 py-3 border ml-0.5 border-gray-300 text-gray-700 bg-white">
                  365
                </div>
                <div className="flex-1 px-3 py-3 border ml-0.5 border-gray-300 text-gray-700 bg-white">
                  False
                </div>
                <div className="flex-1 px-3 py-3 border ml-0.5 border-gray-300 text-gray-700 bg-white">
                  Simple
                </div>
                <div className="flex-1 px-3 py-3 border ml-0.5 border-gray-300 text-gray-700 bg-white">
                  25,000.00
                </div>
                <div className="flex-1 px-3 py-3 border ml-0.5 border-gray-300 text-gray-700 bg-white">
                  Interest
                </div>
                <div className="flex-1 px-3 py-3 border ml-0.5 border-gray-300 text-gray-700 bg-white">
                  365
                </div>
                <div className="flex-1 px-3 py-3 border ml-0.5 border-gray-300 rounded-r text-gray-700 bg-white">
                  2,000,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLoanDetails;

// EditLoanDetails
// GoldLoanApproval
