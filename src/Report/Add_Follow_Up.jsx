
const Add_Follow_Up = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
      {/* 2. Main Form Container */}
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Add New Follow Up
        </div>

        <div className="p-4 bg-white">
          <div className="grid grid-cols-12 gap-y-3 gap-x-4 items-center max-w-5xl">
            {/* Loan No */}
            <div className="col-span-2 text-gray-700 font-medium">
              Loan No <span className="text-red-600">*</span>
            </div>
            <div className="col-span-10">
              <input
                type="text"
                className="w-full border border-gray-300 p-1 outline-none focus:border-blue-500"
              />
            </div>

            {/* Party Name & Mobile */}
            <div className="col-span-2 text-gray-700 font-medium">
              Party Name <span className="text-red-600">*</span>
            </div>
            <div className="col-span-5">
              <input
                type="text"
                className="w-full border border-gray-300 p-1 bg-gray-50 outline-none"
                disabled
              />
            </div>
            <div className="col-span-2 text-gray-700 font-medium text-right pr-2">
              Mobile No <span className="text-red-600">*</span>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                className="w-full border border-gray-300 p-1 bg-gray-50 outline-none"
                disabled
              />
            </div>

            {/* Address */}
            <div className="col-span-2 text-gray-700 font-medium">
              Address <span className="text-red-600">*</span>
            </div>
            <div className="col-span-10">
              <input
                type="text"
                className="w-full border border-gray-300 p-1 bg-gray-50 outline-none"
                disabled
              />
            </div>

            {/* Dates */}
            <div className="col-span-2 text-gray-700 font-medium">
              Follow Up Date <span className="text-red-600">*</span>
            </div>
            <div className="col-span-4 flex">
              <input
                type="text"
                value="27/01/2026"
                className="w-full border border-gray-300 p-1 outline-none"
              />
              <button className="bg-[#8b4513] text-white px-2">📅</button>
            </div>
            <div className="col-span-2 text-gray-700 font-medium text-right pr-2">
              Next Follow Date <span className="text-red-600">*</span>
            </div>
            <div className="col-span-4 flex">
              <input
                type="text"
                value="27/01/2026"
                className="w-full border border-gray-300 p-1 outline-none"
              />
              <button className="bg-[#8b4513] text-white px-2">📅</button>
            </div>

            {/* Follow up by & Method */}
            <div className="col-span-2 text-gray-700 font-medium">
              Follow up by <span className="text-red-600">*</span>
            </div>
            <div className="col-span-4">
              <input
                type="text"
                className="w-full border border-gray-300 p-1 outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-2 text-gray-700 font-medium text-right pr-2">
              Follow up Method <span className="text-red-600">*</span>
            </div>
            <div className="col-span-4">
              <input
                type="text"
                placeholder="Follow Up Method"
                className="w-full border border-gray-300 p-1 outline-none focus:border-blue-500"
              />
            </div>

            {/* Remarks Sections */}
            <div className="col-span-2 text-gray-700 font-medium">
              Follow Up Remarks
            </div>
            <div className="col-span-10">
              <textarea
                placeholder="Follow Up Remarks"
                className="w-full border border-gray-300 p-1 h-12 outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="col-span-2 text-gray-700 font-medium">
              Employee Remarks
            </div>
            <div className="col-span-10">
              <textarea
                placeholder="Employee Remarks"
                className="w-full border border-gray-300 p-1 h-12 outline-none focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-0.5 mt-4">
            <button className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-blue-700 shadow-sm font-semibold">
              💾 Save
            </button>
            <button className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-red-700 shadow-sm font-semibold">
              ✖ Exit
            </button>
          </div>
        </div>

        {/* 3. History Table (Bottom) */}
        <div className="border-t border-gray-200 mt-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px]">
              <thead className="bg-[#f2f2f2] text-gray-600 border-b border-gray-300">
                <tr>
                  {[
                    "LoanNo",
                    "Customer ID",
                    "Party name",
                    "LoanDate",
                    "FollowUp Date",
                    "Next FollowUp Date",
                    "FollowUp Method",
                    "FollowUp By",
                    "Followup Details",
                    "User Remarks",
                    "Upload",
                  ].map((h) => (
                    <th
                      key={h}
                      className="border border-gray-300 p-1.5 text-left font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td
                    colSpan="11"
                    className="p-2 text-center text-gray-500 italic"
                  >
                    No items to display
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="bg-[#f2f2f2] p-1 flex items-center gap-2 border-t border-gray-300">
            <div className="flex gap-1">
              <button className="px-2 border border-gray-300 bg-white">
                ⏮
              </button>
              <button className="px-2 border border-gray-300 bg-white">
                ◀
              </button>
              <span className="bg-[#ff8c00] text-white px-2 rounded-full font-bold">
                0
              </span>
              <button className="px-2 border border-gray-300 bg-white">
                ▶
              </button>
              <button className="px-2 border border-gray-300 bg-white">
                ⏭
              </button>
            </div>
            <select className="border border-gray-300 text-[10px] p-0.5">
              <option>50</option>
            </select>
            <span className="text-[10px]">items per page</span>
            <span className="ml-auto text-[10px]">No items to display</span>
            <button className="px-1 text-gray-500">🔄</button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="fixed bottom-0 w-full bg-[#005a9c] text-white text-center py-1 text-[10px]">
        © Copyright Maraekat Infotech Ltd, 2015. All rights reserved
      </footer>
    </div>
  );
};

export default Add_Follow_Up;
