
const PaymentGetWay_History = () => {
  return (
    <div className="min-h-screen  font-sans text-gray-800">
      {/* 🟦 Top Header & Control Bar */}
      <div className="flex justify-center ">
        <div className="flex flex-col w-[1462px] border border-gray-200 shadow-sm bg-white overflow-hidden mx-auto ">

          {/* Header Section: Title + Date Filters + Buttons */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white gap-4">

            {/* Left: Title */}
            <div className="flex-shrink-0">
              <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
                Payment Log Report
              </h2>
            </div>

            {/* Right: Controls Cluster */}
            <div className="flex items-center gap-6">
              {/* Date & Status Group */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">From Date</label>
                  <input type="date" className="border border-gray-300 rounded p-1.5 text-[11px] outline-none w-32 focus:border-[#0A2478]" />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">To Date</label>
                  <input type="date" className="border border-gray-300 rounded p-1.5 text-[11px] outline-none w-32 focus:border-[#0A2478]" />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</label>
                  <select className="border border-gray-300 p-1.5 rounded text-[11px] w-32 bg-white outline-none focus:border-[#0A2478]">
                    <option>ALL</option>
                    <option>Success</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons Group */}
              <div className="flex items-center gap-2 pt-4"> {/* pt-4 aligns buttons with input bottom */}
                <button className="h-[34px] px-6 rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm uppercase">
                  View Log
                </button>
                <div className="flex gap-1">
                  <button className="w-8 h-[34px] flex items-center justify-center bg-gray-50 border rounded hover:bg-gray-100" title="Print">🖨️</button>
                  <button className="w-8 h-[34px] flex items-center justify-center bg-gray-50 border rounded hover:bg-gray-100 text-green-700" title="Export Excel">📊</button>
                  <button className="w-8 h-[34px] flex items-center justify-center bg-gray-50 border rounded hover:bg-gray-100 text-red-600" title="Export PDF">📄</button>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: Horizontal Branch Selection */}
          <div className=" bg-gray-50/50">
            <fieldset className=" p-4 bg-white shadow-inner">
              <div className="flex flex-col gap-4">
                {/* Select All Row */}
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <input type="checkbox" id="selectAll" className="w-4 h-4 accent-[#0A2478] cursor-pointer" />
                  <label htmlFor="selectAll" className="text-[12px] font-bold text-gray-700 cursor-pointer">
                    Select All Branches
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4">
                    {["Nashik B3", "Nasikroad B2", "Bhagur B1", "Ozar B4", "Sinnar B5", "Nandgaon B6"].map((branch, i) => (
                      <div key={i} className="flex items-center gap-2 group">
                        <input
                          type="checkbox"
                          id={`branch-${i}`}
                          className="w-3.5 h-3.5 accent-[#0A2478] cursor-pointer"
                        />
                        <label
                          htmlFor={`branch-${i}`}
                          className="text-[11px] text-gray-600 cursor-pointer group-hover:text-[#0A2478] transition-colors whitespace-nowrap"
                        >
                          {branch}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Branch Checkboxes: Displayed in a line-wise grid */}
                
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex ml-[20px] ">
        <div className="w-full max-w-[1400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold uppercase tracking-wider">
                  <th className="border border-gray-300 p-3">Branch Name</th>
                  <th className="border border-gray-300 p-3">Customer Name</th>
                  <th className="border border-gray-300 p-3">Date</th>
                  <th className="border border-gray-300 p-3">Order ID</th>
                  <th className="border border-gray-300 p-3">Transaction Ref</th>
                  <th className="border border-gray-300 p-3 text-center">CCY</th>
                  <th className="border border-gray-300 p-3 text-center">Mode</th>
                  <th className="border border-gray-300 p-3 text-right">Amount</th>
                  <th className="border border-gray-300 p-3 text-center">Status</th>
                  <th className="border border-gray-300 p-3">Loan No</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                {/* Empty State */}
                <tr>
                  <td colSpan="10" className="p-20 text-center bg-gray-50/30">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl opacity-20">📂</span>
                      <p className="text-gray-400 italic font-medium tracking-widest uppercase text-[10px]">
                        No transaction records found for the selected criteria
                      </p>
                    </div>
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

export default PaymentGetWay_History;
