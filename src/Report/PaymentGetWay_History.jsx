
const PaymentGetWay_History = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
      {/* 2. Main Report Container */}
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Payment Log
        </div>

        {/* Filter Section */}
        <div className="p-4 bg-white space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label>From Date</label>
              <div className="flex">
                <input
                  type="text"
                  value="01/04/2025"
                  className="border border-gray-300 px-2 py-0.5 w-24 outline-none"
                />
                <button className="bg-[#8b4513] text-white px-1.5">📅</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label>To Date</label>
              <div className="flex">
                <input
                  type="text"
                  value="27/01/2026"
                  className="border border-gray-300 px-2 py-0.5 w-24 outline-none"
                />
                <button className="bg-[#8b4513] text-white px-1.5">📅</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label>Status</label>
              <select className="border border-gray-300 px-2 py-0.5 w-32 outline-none">
                <option>ALL</option>
              </select>
            </div>
          </div>

          {/* Branch Selection Box */}
          <fieldset className="border border-gray-200 p-2 relative max-w-2xl">
            <legend className="px-2 text-[#1a8a81] font-bold">
              Select Branch
            </legend>
            <div className="flex items-center gap-2 mb-2 ml-2">
              <input type="checkbox" id="selectAll" />
              <label htmlFor="selectAll" className="text-gray-600">
                Select All Branch
              </label>
            </div>
            <div className="border border-gray-300 h-32 overflow-y-auto bg-white p-2 ml-6 w-48">
              <div className="flex items-center gap-2 py-0.5">
                <input type="checkbox" id="b3" />{" "}
                <label htmlFor="b3">Nashik B3</label>
              </div>
              <div className="flex items-center gap-2 py-0.5">
                <input type="checkbox" id="b2" />{" "}
                <label htmlFor="b2">Nasikroad B2</label>
              </div>
              <div className="flex items-center gap-2 py-0.5">
                <input type="checkbox" checked readOnly id="b1" />{" "}
                <label htmlFor="b1">Bhagur B1</label>
              </div>
            </div>
          </fieldset>

          {/* Action Buttons */}
          <div className="flex justify-between items-center border-t pt-2">
            <div className="flex gap-0.5">
              <button className="bg-[#005a9c] text-white px-8 py-1 flex items-center gap-2 border border-blue-800 hover:bg-blue-700 font-semibold">
                💾 View
              </button>
              <button className="bg-[#005a9c] text-white px-8 py-1 flex items-center gap-2 border border-blue-800 hover:bg-red-700 font-semibold">
                ✖ Exit
              </button>
            </div>
            <div className="flex gap-1">
              <button className="bg-[#005a9c] text-white p-1 rounded border border-blue-300 hover:bg-blue-700">
                🖨️
              </button>
              <button className="bg-[#005a9c] text-white p-1 rounded border border-blue-300 hover:bg-blue-700">
                📊
              </button>
              <button className="bg-[#005a9c] text-white p-1 rounded border border-blue-300 hover:bg-blue-700">
                📄
              </button>
            </div>
          </div>
        </div>

        {/* 3. Data Table */}
        <div className="overflow-x-auto border-t border-gray-300">
          <table className="w-full border-collapse text-[11px]">
            <thead className="bg-[#eeeae3] text-gray-700 border-b border-gray-300">
              <tr>
                {[
                  "Branch Name",
                  "Name",
                  "Date",
                  "OrderID",
                  "TransactionRefID",
                  "Currency",
                  "Mode",
                  "Amount",
                  "Status",
                  "LoanNo",
                ].map((h) => (
                  <th
                    key={h}
                    className="border-r border-gray-300 p-1.5 text-left font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Table Body Placeholder */}
              <tr className="bg-white hover:bg-gray-50">
                <td
                  colSpan="10"
                  className="h-20 text-center text-gray-400 italic"
                >
                  No records found for the selected criteria
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 w-full bg-[#005a9c] text-white text-center py-1 text-[10px]">
        © Copyright Maraekat Infotech Ltd, 2015. All rights reserved
      </footer>
    </div>
  );
};

export default PaymentGetWay_History;
