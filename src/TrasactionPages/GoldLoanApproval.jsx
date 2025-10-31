import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileempty from "../assets/profileempty.png";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const GoldLoanApproval = () => {
  useEffect(() => {
    document.title = "SLF | Gold Loan Approval";
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
            Gold Loan Approval
          </h2>

          <div className="flex gap-2 mr-6">
            <button className="bg-[#0A2478] text-white px-4 py-1 text-sm shadow-lg rounded hover:bg-[#091d5f] ">
              Approve
            </button>
            <button
              //   onClick={() => navigate("/")}
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
          <div className="w-[1050px] pt-3 pl-14">
            {/* First Row */}
            <div className="flex gap-7 text-sm mb-8 flex-wrap ">
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
                <p className="font-semibold">Mobile Number</p>
                <p>+91 8965412568</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex gap-13 text-sm flex-wrap">
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
                <p className="font-semibold">Address</p>
                <p>H. NO.444-31, BHAGUR, Nashik 422502, India</p>
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
                  formData.OrnamentPhoto ? formData.OrnamentPhoto : profileempty
                }
                alt="Ornament"
                className="w-[130px] h-[115px] object-cover rounded-[5px] border border-gray-300"
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
              <div className="flex bg-[#0A2478]   text-white font-semibold">
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
                <div className="w-24 p-2 border-r-2 border-white text-center">
                  Rate
                </div>
                <div className="w-28 p-2 border-r-2 border-white text-center">
                  Valuation
                </div>
                <div className="w-28 p-2 text-center">Remark</div>
              </div>

              {/* Row 1 */}
              <div className="flex border-t border-gray-300">
                <div className="flex-1 p-2 border-r border-gray-300">Gold</div>
                <div className="w-16 p-2 border-r border-gray-300 text-center">
                  1
                </div>
                <div className="w-24 p-2 border-r border-gray-300 text-center">
                  5.000
                </div>
                <div className="w-24 p-2 border-r border-gray-300 text-center">
                  5.000
                </div>
                <div className="w-28 p-2 border-r border-gray-300 text-center">
                  Gold 20K
                </div>
                <div className="w-24 p-2 border-r border-gray-300 text-center">
                  6,300
                </div>
                <div className="w-28 p-2 border-r border-gray-300 text-center">
                  31,500.00
                </div>
                <div className="w-28 p-2 text-center">Ganthan</div>
              </div>

              {/* Total Row */}
              <div className="flex border-t border-gray-300 ">
                <div className="flex-1 p-2 border-r border-gray-300 font-semibold">
                  Total
                </div>
                <div className="w-16 p-2 border-r border-gray-300 text-center">
                  1
                </div>
                <div className="w-24 p-2 border-r border-gray-300 text-center">
                  5.000
                </div>
                <div className="w-24 p-2 border-r border-gray-300 text-center">
                  5.000
                </div>
                <div className="w-28 p-2 border-r border-gray-300 text-center"></div>
                <div className="w-24 p-2 border-r border-gray-300 text-center"></div>
                <div className="w-28 p-2 border-r border-gray-300 text-center">
                  31,500.00
                </div>
                <div className="w-28 p-2 text-center"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Amount */}
        <div>
          <div className="w-full px-14 flex items-start gap-4 text-xs">
            <div className="flex flex-col w-40">
              <label className="text-[13px] font-semibold">
                Loan amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value="31,500.00"
                className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none"
              />
            </div>

            {/* Doc Charges */}
            <div className="flex flex-col">
              <label className="text-[13px] font-semibold">
                Doc Charges(%)
              </label>
              <div className="flex mt-1">
                <div className="bg-[#0B2B68] text-white px-2 py-1 rounded-l-md text-sm flex items-center justify-center">
                  0.2%
                </div>
                <input
                  type="text"
                  value="₹500.00"
                  className="border border-gray-300 rounded-r-md px-2 py-1 text-sm focus:outline-none w-20"
                />
              </div>
            </div>

            {/* Net Payable */}
            <div className="flex flex-col w-40">
              <label className="text-[13px] font-semibold">Net Payable</label>
              <input
                type="text"
                value="31,000.00"
                className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none"
              />
            </div>

            {/* Valuer 1 */}
            <div className="flex flex-col w-44">
              <label className="text-[13px] font-semibold">
                Valuer 1 <span className="text-red-500">*</span>
              </label>
              <select className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none">
                <option>Select Valuer 1</option>
              </select>
            </div>

            {/* Valuer 2 */}
            <div className="flex flex-col w-44">
              <label className="text-[13px] font-semibold">
                Valuer 2 <span className="text-red-500">*</span>
              </label>
              <select className="border border-gray-300 rounded-md px-2 py-1 mt-1 text-sm focus:outline-none">
                <option>Select Valuer 2</option>
              </select>
            </div>
          </div>
          <div className="text-[11px] mt-2 ml-14 font-semibold">
            Thirty One Thousand Five Hundred only
          </div>
        </div>

        {/* ===== Payment Details ===== */}
        <div className="flex justify-center mb-6">
          <div className="w-[1290px]">
            <h3 className="font-semibold mb-4 text-blue-900 text-lg">
              Payment Details
            </h3>
            <div className="w-full text-xs ">
              {/* Header */}
              <div className="flex bg-[#0B2B68] text-white font-semibold">
                <div className="w-48 p-2 border-r border-white text-center">
                  Paid By
                </div>
                <div className="w-48 ml-1 p-2 border-r border-white text-center">
                  UTR No
                </div>
                <div className="w-48 ml-1 p-2 border-r border-white text-center">
                  Bank
                </div>
                <div className="flex-1 ml-1 p-2 border-r border-white text-center">
                  Customer Bank
                </div>
                <div className="w-48 ml-1 p-2 text-center">Amount</div>
              </div>

              {/* Row 1 */}
              <div className="flex ">
                <div className="w-48 p-2 border my-1 border-gray-300 flex items-center">
                  <select className="w-full  px-2 py-1 focus:outline-none">
                    <option>Cash</option>
                  </select>
                </div>
                <div className="w-48 m-1 p-2 border border-gray-300"></div>
                <div className="w-48 m-1 p-2 border border-gray-300">
                  Bhagur B1
                </div>
                <div className="flex-1 m-1 p-2 border border-gray-300">
                  Cash
                </div>
                <div className="w-48 m-1 p-2 border border-gray-300 flex items-center justify-between">
                  <span>20,000.00</span>
                  <button className="bg-[#F11717] text-white p-0.5 rounded">
                    <MdOutlineCancel size={20} />
                  </button>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex ">
                <div className="w-48 my-1 p-2 border border-gray-300 flex items-center">
                  <select className="w-full px-2 py-1 focus:outline-none">
                    <option>Net Banking</option>
                  </select>
                </div>
                <div className="w-49 m-1 p-2 border border-gray-300">
                  123456789123
                </div>
                <div className="w-48 m-1 p-2 border border-gray-300">HDFC</div>
                <div className="w-125 m-1 p-2 border border-gray-300">
                  HDFC0000456, MAYUR SUDAM TARLE, 323902010133409
                </div>
                <div className="w-48 m-1 p-2 border border-gray-300 flex items-center justify-between">
                  <span>11,500.00</span>
                  <button className="bg-[#F11717] text-white p-0.5 rounded">
                    <MdOutlineCancel size={20} />
                  </button>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex ">
                <div className="w-48 my-1 p-2 border border-gray-300 flex items-center">
                  <select className="w-full text-gray-600 px-2 py-1 focus:outline-none">
                    <option>--Select--</option>
                  </select>
                </div>
                <div className="w-48 m-1 p-2 border border-gray-300"></div>
                <div className="w-48 p-2 border border-gray-300 m-1">
                  --Select--
                </div>
                <div className="flex-1 p-2 border border-gray-300 m-1 flex items-center">
                  <select className="w-full text-gray-600  px-2 py-1 focus:outline-none">
                    <option>--Select--</option>
                  </select>
                </div>
                <div className="w-48 p-2 border border-gray-300 m-1 flex items-center justify-end gap-2">
                  <button className="bg-[#0A2478] text-white p-0.5 rounded">
                    <IoMdAddCircleOutline size={20} />
                  </button>
                  <button className="bg-[#F11717] text-white p-0.5 rounded">
                    <MdOutlineCancel size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scheme Details & Effective Interest Rates ===== */}
        <div className=" flex gap-8 text-xs mx-14">
          {/* Scheme Details Table */}
          <div className="w-1/2">
            <h2 className="font-semibold text-[20px] mb-1 text-[#0A2478]">
              Scheme Details
            </h2>
            <div className="border border-gray-300">
              {/* Header */}
              <div className="flex bg-[#0A2478] text-white font-semibold">
                <div className="flex-1 p-2 py-4 border-r border-white text-center">
                  Loan Tenure (Days)
                </div>
                <div className="w-40 p-2 py-4 border-r border-white text-center">
                  Min Loan
                </div>
                <div className="w-40 p-2 py-4 text-center">Max Loan</div>
              </div>

              {/* Row */}
              <div className="flex border-t border-gray-300">
                <div className="flex-1 p-2 py-4 border-r border-gray-300 text-center">
                  365
                </div>
                <div className="w-40 p-2 py-4 border-r border-gray-300 text-center">
                  1,000
                </div>
                <div className="w-40 p-2 py-4 text-center">20,00,000</div>
              </div>
            </div>
          </div>

          {/* Effective Interest Rates Table */}
          <div className="w-1/2">
            <h2 className="font-semibold text-[20px] mb-1 text-[#0A2478]">
              Effective Interest Rates
            </h2>
            <div className="">
              {/* Header */}
              <div className="flex bg-[#0A2478] gap-3  text-white font-semibold">
                <div className="flex-1 p-2 border-r-4 border-white text-center">
                  Terms
                </div>
                <div className="w-67 p-2 text-center">
                  Effective Interest Rates
                </div>
              </div>

              {/* Row 1 */}
              <div className="flex  bg-[#FFCDCD]">
                <div className="flex-1 p-2 border-r-4 border-white text-center">
                  0 To 185 DAYS
                </div>
                <div className="w-70 p-2 text-center">18.00%</div>
              </div>

              {/* Row 2 */}
              <div className="flex  bg-[#E5E5FF]">
                <div className="flex-1 p-2 border-r-4 border-white text-center">
                  185 To 365 DAYS
                </div>
                <div className="w-70 p-2 text-center">24.00%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldLoanApproval;

// EditLoanDetails
// GoldLoanApproval
