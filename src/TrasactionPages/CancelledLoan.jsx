


import React, { useEffect } from "react";
import emptyImg from "../assets/profileempty.png";
import envImg from "../assets/envImg.jpg"

const CancelledLoan = () => {
    useEffect(() => {
    document.title = "SLF | Cancelled Loan";
  }, []);
    return (
        <div className="min-h-screen w-full  p-6">
            {/* Header */}
            <div className="flex justify-center mb-6">
                <div className="flex items-center justify-between w-[1290px] px-6 py-4 border rounded-[11px] border-gray-200 shadow">
                    <h2
                        className="text-red-600 font-bold text-[20px]"
                        style={{ fontFamily: "Source Sans 3, sans-serif" }}
                    >
                        Cancelled Loan
                    </h2>
                    <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[4px]">
                        Close
                    </button>
                </div>
            </div>

            {/* Remark Section */}
            <div className="flex justify-center ">
                <div className="flex w-[1050px]  border-2 border-red-500 rounded-md p-3 ">
                    <div className="flex-1">
                        <h3 className="text-blue-900 font-semibold ">Remark</h3>
                        <p className="font-bold ">Documents Pending</p>
                        <p className="text-gray-700 text-sm">
                            Some required documents are missing from your application. To
                            continue processing your loan request, please upload the pending
                            documents at the earliest. These may include identity proof,
                            address proof, income statements, or bank records, depending on
                            your loan type.
                        </p>
                    </div>
                    <div>
                        <img
                            src={envImg}
                            alt="document"
                            className="w-[100px] h-[100px]  object-cover rounded-md "
                        />
                    </div>
                </div>
                {/* Ornament Photos */}
                <div className="mt-2 ml-5">
                    <h3 className="font-semibold mb-2">Ornament Photo</h3>
                    <div className="flex gap-4">
                        <img
                            src={emptyImg}
                            alt="ornament"
                            className="w-[100px] h-[100px] border border-gray-300 rounded"
                        />
                        <img
                            src={emptyImg}
                            alt="ornament"
                            className="w-[100px] h-[100px] border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>





            {/* Loan Details Section */}
            <div className="flex mt-2 justify-center mb-6">
                <div className="w-[1290px] pt-3">

                    {/* First Row */}
                    <div className="flex gap-7 text-sm mb-3">
                        <div>
                            <p className="font-semibold">Loan No <span className="text-red-500">*</span></p>
                            <p>01A5602839</p>
                        </div>
                        <div>
                            <p className="font-semibold">Loan Date <span className="text-red-500">*</span></p>
                            <p>25/07/2025 12:00:00AM</p>
                        </div>
                        <div>
                            <p className="font-semibold">Party Name <span className="text-red-500">*</span></p>
                            <p>MAHESH SANJAY DONDE</p>
                        </div>
                        <div>
                            <p className="font-semibold">Scheme <span className="text-red-500">*</span></p>
                            <p>IND001</p>
                        </div>
                        <div>
                            <p className="font-semibold">Print Name <span className="text-red-500">*</span></p>
                            <p>MAHESH SANJAY DONDE</p>
                        </div>
                        <div>
                            <p className="font-semibold">Address <span className="text-red-500">*</span></p>
                            <p>H. NO.444-31, BHAGUR, Nashik 422502, India</p>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex gap-7 text-sm">
                        <div>
                            <p className="font-semibold">City <span className="text-red-500">*</span></p>
                            <p>Nashik</p>
                        </div>
                        <div>
                            <p className="font-semibold">Mobile Number <span className="text-red-500">*</span></p>
                            <p>+91 8965412568</p>
                        </div>
                        <div>
                            <p className="font-semibold">Co-Borrower <span className="text-red-500">*</span></p>
                            <p>BARFILAL</p>
                        </div>
                        <div>
                            <p className="font-semibold">Relation <span className="text-red-500">*</span></p>
                            <p>Father</p>
                        </div>
                        <div>
                            <p className="font-semibold">Nominee <span className="text-red-500">*</span></p>
                            <p>BARFILAL</p>
                        </div>
                        <div>
                            <p className="font-semibold">Relation <span className="text-red-500">*</span></p>
                            <p>Father</p>
                        </div>
                        <div>
                            <p className="font-semibold">Loan Amount <span className="text-red-500">*</span></p>
                            <p>35000.00</p>
                        </div>
                    </div>

                </div>
            </div>


{/* Pledge Item List */}
<div className="flex justify-center mb-6">
    <div className="w-[1290px]">
        <h3 className="font-semibold mb-4 text-blue-900 text-lg">Pledge Item List</h3>

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

{/* Payment Details */}
<div className="flex justify-center mb-6">
    <div className="w-[1290px]">
        <h3 className="font-semibold mb-4 text-blue-900 text-lg">Payment Details</h3>

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

{/* Scheme Details */}
<div className="flex justify-center mb-6">
    <div className="w-[1290px]">
        <h3 className="font-semibold mb-4 text-blue-900 text-lg">Scheme Details</h3>

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
    );
};

export default CancelledLoan;
