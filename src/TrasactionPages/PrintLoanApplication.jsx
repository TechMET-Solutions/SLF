import React from "react";

function PrintLoanApplication() {
  return (
    <div>
      {/* 🔹 Header */}
      <div className="flex justify-center">
        <div className="flex justify-end px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 ">
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/Add-Auction-Creation")}
              className="bg-[green] text-white text-sm rounded px-6  cursor-pointer"
            >
              Print
            </button>
            <button
              onClick={() => navigate("/Add-Auction-Creation")}
              className="bg-red-600 text-white text-sm rounded px-6  cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 px-25">
        {/* Row with two identical groups (left + right) */}
        <div className="grid grid-cols-2 gap-6">
          {/* Group 1 */}
          <div className="flex justify-between gap-30">
            <div className="flex gap-4">
              {/* Customer Card */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Customer
                </h3>
                <div className="w-[120px]">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=480&auto=format&fit=crop"
                    alt="customer"
                    className="w-full h-[120px] object-cover  border border-gray-200"
                  />
                  <img
                    src="src\assets\sign.png"
                    alt="customer-sign"
                    className="w-full mt-2 h-[34px] object-contain border border-blue-100"
                  />
                </div>
              </div>

              {/* Co Borrower Card */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Co Borrower
                </h3>
                <div className="w-[120px]">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=480&auto=format&fit=crop"
                    alt="co-borrower"
                    className="w-full h-[120px] object-cover  border border-gray-200"
                  />
                  <img
                    src="src\assets\sign.png"
                    alt="co-sign"
                    className="w-full mt-2 h-[34px] object-contain border border-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Ornament Card */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Ornament
              </h3>
              <div className="w-[220px]">
                <div className="w-full h-[120px]  border border-blue-200 bg-gray-50 flex items-center justify-center">
                  <img src="src\assets\ornament.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* Group 2 (duplicate layout) */}
          <div className="flex items-start gap-8">
            {/* Customer Card (reuse same two image URLs) */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Customer
              </h3>
              <div className="w-[120px]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=480&auto=format&fit=crop"
                  alt="customer-2"
                  className="w-full h-[120px] object-cover  border border-blue-200"
                />
                <img
                  src="src\assets\sign.png"
                  alt="customer-sign-2"
                  className="w-full mt-2 h-[34px] object-contain border border-blue-100"
                />
              </div>
            </div>

            {/* Co Borrower Card */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Co Borrower
              </h3>
              <div className="w-[120px]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=480&auto=format&fit=crop"
                  alt="co-borrower-2"
                  className="w-full h-[120px] object-cover  border border-blue-200"
                />
                <img
                  src="src\assets\sign.png"
                  alt="co-sign-2"
                  className="w-full mt-2 h-[34px] object-contain border border-blue-100"
                />
              </div>
            </div>

            {/* Ornament Card */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Ornament
              </h3>
              <div className="w-[220px]">
                <div className="w-full h-[120px]  border border-blue-200 bg-gray-50 flex items-center justify-center">
                  <img src="src\assets\ornament.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 text-[13px] text-gray-800">
          {/* Two Main Sections Side by Side */}
          <div className="flex justify-between gap-8">
            {/* Left Section */}
            <div className="w-1/2 space-y-3">
              {/* Customer Info and Loan Details */}
              <div className="flex justify-between gap-4 w-full text-[13px] leading-relaxed">
                {/* Customer Information */}
                <div className="w-[62%]">
                  <h3 className="text-[#1E40AF] font-semibold mb-2 text-[20px]">
                    Customer Information
                  </h3>
                  <table className="w-full flex justify-between">
                    <tbody>
                      <tr>
                        <td className="font-semibold w-[120px] align-top">
                          Name
                        </td>
                        <td className="text-gray-600 flex justify-end">
                          AAISHABEE YAKUB SHAIKH
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Customer ID</td>
                        <td className="text-gray-600 flex justify-end">
                          IND0001992
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Address</td>
                        <td className="text-gray-600 flex justify-end">
                          H. NO.444-31, BHAGUR, Nashik 422502, India
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Mobile No.</td>
                        <td className="text-gray-600 flex justify-end">
                          8605181157
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Proc Fee</td>
                        <td className="text-gray-600 flex justify-end">0.00</td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Co Borrower</td>
                        <td className="text-gray-600 flex justify-end">
                          Zainab
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
                          01A5602843
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">GL Scheme</td>
                        <td className="text-gray-600 flex justify-end">
                          IND01
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">
                          Period of Loan
                        </td>
                        <td className="text-gray-600 flex justify-end">
                          365 Day
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Loan Amount</td>
                        <td className="text-gray-600 flex justify-end">
                          58,000.00
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Paid (BANK)</td>
                        <td className="text-gray-600 flex justify-end">
                          58,000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interest Details */}
              <div className="w-full  overflow-hidden text-xs">
                {/* Header */}
                <div className="flex gap-1">
                  <div className="bg-[#1E3A8A] text-white font-semibold px-3 py-1 w-1/2  border-white">
                    For Duration
                  </div>
                  <div className="bg-[#1E3A8A] text-white font-semibold px-3 py-1 w-1/2">
                    Effective Rate of Interest
                  </div>
                </div>

                {/* Rows */}
                <div className="flex  mt-1">
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                    0 To 185 DAYS
                  </div>
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                    1.50 % p.m.
                  </div>
                </div>
                <div className="flex  border-gray-300">
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1  rounded border border-gray-300 text-gray-700 bg-white">
                    186 To 365 DAYS
                  </div>
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                    2.00 % p.m.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 text-xs py-1">
                <div className="font-semibold">
                  <span className=""></span>Penal Interest (% p.m.):
                  <br />
                  <span className="text-gray-500">0.50</span>
                </div>
                <div className="font-semibold">
                  <span className=""></span>Administrative/Service Charges:{" "}
                  <br />
                  <span className="text-gray-500">NIL</span>
                </div>
                <div className="font-semibold">
                  <span className="">Interest Calculation: </span>
                  <br />
                  <span className="text-gray-500">Multiple</span>
                </div>
              </div>

              {/* Ornaments Details */}
              <div className="w-full text-sm mt-2">
                {/* Title */}
                <p className="font-semibold text-[#1E3A8A] text-[20px] mb-2">
                  Particulars of gold ornaments:
                </p>

                {/* Table Header */}
                <div className="flex text-white font-semibold text-xs">
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4  border border-white text-center">
                    Product Desc
                  </div>
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 border border-white text-center">
                    Nos
                  </div>
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 border border-white text-center">
                    Gross Weight
                  </div>
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4  border border-white text-center">
                    Net Weight
                  </div>
                </div>

                {/* Table Rows */}
                <div className="flex text-gray-700 text-xs mt-1">
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    Gold
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    1
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                </div>

                <div className="flex text-gray-700 text-xs mt-1">
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    Total
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    1
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-3 text-xs py-1">
                  <p>
                    <span className="font-semibold ">Loan Amount In Words:</span>{" "}
                    Fifty Eight Thousand only.
                  </p>
                  <p className="mt-1">
                    Printed On: 30/09/2025 02:29 PM , Bhagir01
                  </p>
                  <p className="mt-1 font-semibold">
                    Valuer 1: <span className="font-medium">Siddhi Shinde</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Section (Duplicate Layout) */}
            <div className="w-1/2 space-y-3">
              {/* Customer Info and Loan Details */}
              <div className="flex justify-between gap-4 w-full text-[13px] leading-relaxed">
                {/* Customer Information */}
                <div className="w-[62%]">
                  <h3 className="text-[#1E40AF] font-semibold mb-2 text-[20px]">
                    Customer Information
                  </h3>
                  <table className="w-full flex justify-between">
                    <tbody>
                      <tr>
                        <td className="font-semibold w-[120px] align-top">
                          Name
                        </td>
                        <td className="text-gray-600 flex justify-end">
                          AAISHABEE YAKUB SHAIKH
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Customer ID</td>
                        <td className="text-gray-600 flex justify-end">
                          IND0001992
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Address</td>
                        <td className="text-gray-600 flex justify-end">
                          H. NO.444-31, BHAGUR, Nashik 422502, India
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Mobile No.</td>
                        <td className="text-gray-600 flex justify-end">
                          8605181157
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Proc Fee</td>
                        <td className="text-gray-600 flex justify-end">0.00</td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Co Borrower</td>
                        <td className="text-gray-600 flex justify-end">
                          Zainab
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
                          01A5602843
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">GL Scheme</td>
                        <td className="text-gray-600 flex justify-end">
                          IND01
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">
                          Period of Loan
                        </td>
                        <td className="text-gray-600 flex justify-end">
                          365 Day
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Loan Amount</td>
                        <td className="text-gray-600 flex justify-end">
                          58,000.00
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">Paid (BANK)</td>
                        <td className="text-gray-600 flex justify-end">
                          58,000.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interest Details */}
              <div className="w-full  overflow-hidden text-xs">
                {/* Header */}
                <div className="flex gap-1">
                  <div className="bg-[#1E3A8A] text-white font-semibold px-3 py-1 w-1/2  border-white">
                    For Duration
                  </div>
                  <div className="bg-[#1E3A8A] text-white font-semibold px-3 py-1 w-1/2">
                    Effective Rate of Interest
                  </div>
                </div>

                {/* Rows */}
                <div className="flex  mt-1">
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                    0 To 185 DAYS
                  </div>
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                    1.50 % p.m.
                  </div>
                </div>
                <div className="flex  border-gray-300">
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1  rounded border border-gray-300 text-gray-700 bg-white">
                    186 To 365 DAYS
                  </div>
                  <div className="w-1/2 px-3 py-1 mb-1 mx-1 rounded border border-gray-300 text-gray-700 bg-white">
                    2.00 % p.m.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 text-xs py-1">
                <div className="font-semibold">
                  <span className=""></span>Penal Interest (% p.m.):
                  <br />
                  <span className="text-gray-500">0.50</span>
                </div>
                <div className="font-semibold">
                  <span className=""></span>Administrative/Service Charges:{" "}
                  <br />
                  <span className="text-gray-500">NIL</span>
                </div>
                <div className="font-semibold">
                  <span className="">Interest Calculation: </span>
                  <br />
                  <span className="text-gray-500">Multiple</span>
                </div>
              </div>

              {/* Ornaments Details */}
              <div className="w-full text-sm mt-2">
                {/* Title */}
                <p className="font-semibold text-[#1E3A8A] text-[20px] mb-2">
                  Particulars of gold ornaments:
                </p>

                {/* Table Header */}
                <div className="flex text-white font-semibold text-xs">
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4  border border-white text-center">
                    Product Desc
                  </div>
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 border border-white text-center">
                    Nos
                  </div>
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4 border border-white text-center">
                    Gross Weight
                  </div>
                  <div className="bg-[#1E3A8A] px-3 py-2 w-1/4  border border-white text-center">
                    Net Weight
                  </div>
                </div>

                {/* Table Rows */}
                <div className="flex text-gray-700 text-xs mt-1">
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    Gold
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    1
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                </div>

                <div className="flex text-gray-700 text-xs mt-1">
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    Total
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    1
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                  <div className="bg-white px-3 py-2 w-1/4 border border-gray-300 rounded-md mx-0.5 text-center">
                    10.000 Gm
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-3 text-xs py-1">
                  <p>
                    <span className="font-semibold ">Loan Amount In Words:</span>{" "}
                    Fifty Eight Thousand only.
                  </p>
                  <p className="mt-1">
                    Printed On: 30/09/2025 02:29 PM , Bhagir01
                  </p>
                  <p className="mt-1 font-semibold">
                    Valuer 1: <span className="font-medium">Siddhi Shinde</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintLoanApplication;
