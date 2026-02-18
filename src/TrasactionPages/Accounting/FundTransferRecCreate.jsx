import React from "react";

const FundTransferRecCreate = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white border rounded shadow">
        {/* Header */}
        <div className="bg-teal-700 text-white px-4 py-2 font-semibold">
          Create Fund Transfer
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm">Doc No.</label>
              <input className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="text-sm">Doc Date</label>
              <input type="date" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="text-sm">Pending Transfer</label>
              <select className="w-full border p-2 rounded">
                <option>--Select--</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Date</label>
              <input type="date" className="w-full border p-2 rounded" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm">
                Pay Mode <span className="text-red-500">*</span>
              </label>
              <select className="w-full border p-2 rounded">
                <option>--Select All--</option>
              </select>
            </div>
            <div>
              <label className="text-sm">
                Account <span className="text-red-500">*</span>
              </label>
              <select className="w-full border p-2 rounded">
                <option>--Select--</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Cheque/DD No</label>
              <input className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="text-sm">Cheque/DD Date</label>
              <input type="date" className="w-full border p-2 rounded" />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="text-sm">Remarks</label>
            <textarea className="w-full border p-2 rounded h-20" />
          </div>

          {/* Transfer Details */}
          <div className="border rounded">
            <div className="px-3 py-1 text-sm font-semibold text-teal-700">
              Transfer details
            </div>
            <table className="w-full border-t text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Sl No</th>
                  <th className="border p-2">From Branch</th>
                  <th className="border p-2">On Behalf Off</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Remark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-center">1</td>
                  <td className="border p-2">
                    <input className="w-full border p-1 rounded" />
                  </td>
                  <td className="border p-2">
                    <input className="w-full border p-1 rounded" />
                  </td>
                  <td className="border p-2">
                    <input className="w-full border p-1 rounded" />
                  </td>
                  <td className="border p-2">
                    <input className="w-full border p-1 rounded" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="bg-blue-700 text-white px-6 py-2 rounded">
              Save
            </button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded">
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTransferRecCreate;
