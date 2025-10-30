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
            Loan Enquiry
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] text-[10px]"
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
            <h3 className="text-lg font-semibold mb-4 text-[#0A2478]">
            View  Loan Details
            </h3>

            {/* First Row */}
            <div className="flex gap-7 text-sm mb-3 flex-wrap">
              <div>
                <p className="font-semibold">Loan No</p>
                <p>01A5602839</p>
              </div>
              <div>
                <p className="font-semibold">Loan Date</p>
                <p>
                  25/07/2025 <span className="ml-2">12:00:00 AM</span>
                </p>
              </div>
              <div>
                <p className="font-semibold">Party Name</p>
                <p>MAHESH SANJAY DONDE</p>
              </div>
              <div>
                <p className="font-semibold">Scheme</p>
                <p>IND001</p>
              </div>
              <div>
                <p className="font-semibold">Print Name</p>
                <p>MAHESH SANJAY DONDE</p>
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p>H. NO.444-31, BHAGUR, Nashik 422502, India</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex gap-7 text-sm flex-wrap">
              <div>
                <p className="font-semibold">City</p>
                <p>Nashik</p>
              </div>
              <div>
                <p className="font-semibold">Mobile Number</p>
                <p>+91 8965412568</p>
              </div>
              <div>
                <p className="font-semibold">Co-Borrower</p>
                <p>BARFILAL</p>
              </div>
              <div>
                <p className="font-semibold">Relation</p>
                <p>Father</p>
              </div>
              <div>
                <p className="font-semibold">Nominee</p>
                <p>BARFILAL</p>
              </div>
              <div>
                <p className="font-semibold">Relation</p>
                <p>Father</p>
              </div>
              <div>
                <p className="font-semibold">Loan Amount</p>
                <p>35000.00</p>
              </div>
            </div>
          </div>

          {/* ===== Ornament & Profile Photos ===== */}
      <div className="flex mr-17 space-x-[1px] ">
  {/* Borrower */}
  <div className="w-[120px] h-auto flex flex-col items-center">
    <p className="font-medium mb-1 text-xs">Customer</p>
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
    <p className="font-medium mb-1 text-xs">Co-Borrower</p>
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
    <p className="font-medium mb-1 text-xs">Ornament Photo</p>
    <img
      src={
        formData.OrnamentPhoto
          ? formData.OrnamentPhoto
          : profileempty
      }
      alt="Ornament"
      className="w-[100px] h-[115px] object-cover rounded-[5px] border border-gray-300"
    />

    <div className="flex items-center border border-gray-300 rounded mt-1 w-[110px]">
      <label
        htmlFor="ornamentFile"
        className="bg-[#D9D9D9] p-1 cursor-pointer text-[8px] rounded-l border-r border w-[65px] text-black font-semibold h-[18px] flex items-center justify-center"
      >
        Choose File
      </label>
      <input
        id="ornamentFile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleOrnamentUpload}
      />
    </div>
  </div>
</div>


        </div>

        {/* ===== Pledge Item List ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-blue-900 text-lg">
              Pledge Item List
            </h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200">Particulars</th>
                  <th className="px-4 py-2 border-r border-gray-200">Nos.</th>
                  <th className="px-4 py-2 border-r border-gray-200">Gross</th>
                  <th className="px-4 py-2 border-r border-gray-200">Net Weight</th>
                  <th className="px-4 py-2 border-r border-gray-200">Purity</th>
                  <th className="px-4 py-2 border-r border-gray-200">Rate</th>
                  <th className="px-4 py-2 border-r border-gray-200">Valuation</th>
                  <th className="px-4 py-2">Remark</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">Gold</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">5.000</td>
                  <td className="px-4 py-2">5.000</td>
                  <td className="px-4 py-2">Gold 20K</td>
                  <td className="px-4 py-2">6,300</td>
                  <td className="px-4 py-2">31,500.00</td>
                  <td className="px-4 py-2">Ganthan</td>
                </tr>
                <tr className="border-t border-gray-200 font-semibold">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">5.000</td>
                  <td className="px-4 py-2">5.000</td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">31,500.00</td>
                  <td className="px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== Payment Details ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-blue-900 text-lg">
              Payment Details
            </h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200">Paid By</th>
                  <th className="px-4 py-2 border-r border-gray-200">Cheque No.</th>
                  <th className="px-4 py-2 border-r border-gray-200">Cheque Date</th>
                  <th className="px-4 py-2 border-r border-gray-200">Bank</th>
                  <th className="px-4 py-2 border-r border-gray-200">Customer Bank</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">CHEQUE</td>
                  <td className="px-4 py-2">Cheque no.</td>
                  <td className="px-4 py-2">25/09/2025</td>
                  <td className="px-4 py-2">HO HDFC Bank, Bhagir</td>
                  <td className="px-4 py-2">Axis Bank</td>
                  <td className="px-4 py-2">35,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== Scheme Details ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-blue-900 text-lg">
              Scheme Details
            </h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200">Calc. basis on</th>
                  <th className="px-4 py-2 border-r border-gray-200">Payment frequency</th>
                  <th className="px-4 py-2 border-r border-gray-200">Payment in Advance</th>
                  <th className="px-4 py-2 border-r border-gray-200">Calc Method</th>
                  <th className="px-4 py-2 border-r border-gray-200">Min Loan</th>
                  <th className="px-4 py-2 border-r border-gray-200">Pay Basis On</th>
                  <th className="px-4 py-2 border-r border-gray-200">Loan Tenure (Days)</th>
                  <th className="px-4 py-2">Max Loan</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">Daily</td>
                  <td className="px-4 py-2">365</td>
                  <td className="px-4 py-2">False</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">25,000.00</td>
                  <td className="px-4 py-2">Interest</td>
                  <td className="px-4 py-2">365</td>
                  <td className="px-4 py-2">2,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLoanDetails;


// EditLoanDetails
// GoldLoanApproval