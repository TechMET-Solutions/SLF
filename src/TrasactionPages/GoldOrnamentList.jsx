import React from "react";

const GoldOrnamentList = () => {
  useEffect(() => {
    document.title = "SLF | Gold Ornament List ";
  }, []);
  return (
    <div className="flex flex-col items-center mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
        {/* Title */}
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
          APPRAISAL NOTE
        </h2>

        {/* Buttons */}
        <div className="flex items-center gap-5">
          <button className="bg-[#129121] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-green-700 transition">
            Print
          </button>
          <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
            Exit
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white w-[1290px] mt-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-blue-900">Ornaments List</h2>

        {/* Table */}
        <div className="mt-4 border border-gray-300 rounded-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white text-sm">
                <th className="p-2 border border-gray-300">Ornaments Name</th>
                <th className="p-2 border border-gray-300">No Of Item</th>
                <th className="p-2 border border-gray-300">Gross Wt (In Gms)</th>
                <th className="p-2 border border-gray-300">Stone/Dirt/Wax Wt (in Gms)</th>
                <th className="p-2 border border-gray-300">Net Wt (In Gms)</th>
                <th className="p-2 border border-gray-300">Rate Per Gram</th>
                <th className="p-2 border border-gray-300">Eligible Amount of Loan (Rs.)</th>
                <th className="p-2 border border-gray-300">Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-sm">
                <td className="p-2 border border-gray-300">Gold Necklace</td>
                <td className="p-2 border border-gray-300">1</td>
                <td className="p-2 border border-gray-300">10.000</td>
                <td className="p-2 border border-gray-300">0.000</td>
                <td className="p-2 border border-gray-300">10.000</td>
                <td className="p-2 border border-gray-300">5796.00</td>
                <td className="p-2 border border-gray-300">57960.00</td>
                <td className="p-2 border border-gray-300">—</td>
              </tr>
              <tr className="font-bold text-center text-sm">
                <td className="p-2 border border-gray-300" colSpan={2}>Total</td>
                <td className="p-2 border border-gray-300">10.000</td>
                <td className="p-2 border border-gray-300">0.000</td>
                <td className="p-2 border border-gray-300">10.000</td>
                <td className="p-2 border border-gray-300">—</td>
                <td className="p-2 border border-gray-300">57960.00</td>
                <td className="p-2 border border-gray-300">—</td>
              </tr>
              <tr className="text-start text-sm">
                <td className="p-2 " colSpan={4}>Total</td>
                <td className="p-2 border border-gray-300 font-semibold" colSpan={2}>Appraised by</td>
                <td className="p-2 border border-gray-300 font-semibold" colSpan={2}>Re-Appraised by</td>
              </tr>
              <tr className="text-start text-sm">
                <td className="p-2 " colSpan={4}>Total</td>
                <td className="p-2 border border-gray-300 " colSpan={2}>Bhagur01</td>
                <td className="p-2 border border-gray-300 " colSpan={2}></td>
              </tr>
              <tr className="text-start text-sm">
                <td className="p-2 " colSpan={4}>Total</td>
                <td className="p-2 border border-gray-300 " colSpan={2}>Bhagur01</td>
                <td className="p-2 border border-gray-300 " colSpan={2}></td>
              </tr>
              <tr className="text-start text-sm">
                <td className="p-2 " colSpan={4}>Total</td>
                <td className="p-2 border border-gray-300 " colSpan={2}>Bhagur01</td>
                <td className="p-2 border border-gray-300 " colSpan={2}></td>
              </tr>
              <tr className="text-start text-sm">
                <td className="p-2 " colSpan={4}>Total</td>
                <td className="p-2 border border-gray-300 " colSpan={2}>Bhagur01</td>
                <td className="p-2 border border-gray-300 " colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>

        

      </div>
    </div>
  );
};

export default GoldOrnamentList;
