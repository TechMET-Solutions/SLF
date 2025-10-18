import { useState } from "react";

const AddSchemeRenewalForm = () => {
    const [data, setData] = useState([
        { id: 1, from: 0, to: 62, type: "Days", addInt: 15 },
        { id: 2, from: 63, to: 123, type: "Days", addInt: 18 },
        { id: 3, from: 124, to: 185, type: "Days", addInt: 24 },
    ]);

    return (
        <div className="min-h-screen flex flex-col items-center py-5">
            {/* Header */}
            <div className="flex justify-between items-center w-[1290px] bg-white px-6 py-4 rounded-lg shadow mb-5">
                <h2 className="text-red-600 font-bold text-xl">
                    Add Scheme Renewal Form
                </h2>
                <div className="flex gap-3">
                    <button className="bg-[#0A2478] text-white px-4 py-1 text-sm rounded">
                        Save
                    </button>
                    <button className="bg-[#C1121F] text-white px-4 py-1 text-sm rounded">
                        Exit
                    </button>
                </div>
            </div>

            {/* Form */}
            <div className="w-[1290px] bg-white p-1 rounded-lg space-y-4">
                {/* Top Section */}
                <div className="flex flex-wrap gap-6">
                    {/* Scheme Name */}
                    <div className="flex flex-col w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Scheme Name
                        </label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="V1">V1</option>
                            <option value="V2">V2</option>
                            <option value="V3">V3</option>
                        </select>
                    </div>

                    {/* Scheme Description */}
                    <div className="flex flex-col flex-1 max-w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Scheme Description*
                        </label>
                        <input
                            type="text" 
                            placeholder="Description"
                            className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Payment Basis */}
                    <div className="flex flex-col w-[110px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Basis on
                        </label>
                        <input
                            type="number"
                            placeholder="00"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Loan Period */}
                    <div className="flex flex-col w-[110px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Loan Period
                        </label>
                        <input
                            type="number"
                            placeholder="185"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Calc. Basis */}
                    <div className="flex flex-col w-[120px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Calc. Basis On*
                        </label>
                        <input
                            type="text"
                            placeholder="Daily"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Cal. Method */}
                    <div className="flex flex-col w-[120px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cal. Method
                        </label>
                        <input
                            type="text"
                            placeholder="Multiple"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Payment Frequency */}
                    <div className="flex flex-col w-[300px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Frequency
                        </label>
                        <div className="flex">
                            <input
                                type="number"
                                placeholder="185"
                                className="flex-1 border border-gray-300 max-w-[100px] rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button className="bg-[#0A2478] text-white px-4 py-2 rounded-r-md hover:bg-[#081c5b] transition-colors duration-200 text-sm font-medium">
                                D
                            </button>
                        </div>
                    </div>

                    {/* Application From */}
                    <div className="flex flex-col w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Application From
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* To */}
                    <div className="flex flex-col w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Gold Approve */}
                    <div className="flex flex-col w-[110px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gold Approve %
                        </label>
                        <input
                            type="number"
                            placeholder="85"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Min Loan */}
                    <div className="flex flex-col w-[110px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Min Loan
                        </label>
                        <input
                            type="number"
                            placeholder="50000"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Max Loan */}
                    <div className="flex flex-col w-[110px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Loan
                        </label>
                        <input
                            type="number"
                            placeholder="2000000"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Applicable Time */}
                    <div className="flex flex-col w-[130px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Applicable Time (min)
                        </label>
                        <input
                            type="number"
                            placeholder="30"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Document Charges */}
                <div className="mt-2">
                    <h2 className="text-[#0A2478] font-semibold mb-2">
                        Document Charges
                    </h2>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">% of Loan Amount</label>
                            <input
                                type="text"
                                className="w-[120px] border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm  font-medium ">Min</label>
                            <input
                                type="text"
                                className="w-[120px] border  border-gray-300  rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Max</label>
                            <input
                                type="text"
                                className="w-[120px] border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Interest Rate Table */}
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-semibold text-[#0A2478]">Interest Rate</h2>
                        <button className="bg-[#0A2478] text-white px-4 py-1 rounded text-sm">
                            Add More
                        </button>
                    </div>
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-[#0A2478] text-white">
                            <tr>
                                <th className="px-4 py-2 border-r border-gray-200">From</th>
                                <th className="px-4 py-2 border-r border-gray-200">To</th>
                                <th className="px-4 py-2 border-r border-gray-200">Type</th>
                                <th className="px-4 py-2">Add Int %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                                >
                                    <td className="px-4 py-2 border-r border-gray-200">{row.from}</td>
                                    <td className="px-4 py-2 border-r border-gray-200">{row.to}</td>
                                    <td className="px-4 py-2 border-r border-gray-200">{row.type}</td>
                                    <td className="px-4 py-2">{row.addInt}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-2">
                        <button className="bg-[#C1121F] text-white px-4 py-1 rounded text-sm">
                            Remove
                        </button>
                    </div>
                </div>

                {/* Remark */}
                <div>
                    <h3 className="font-semibold">Remark</h3>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                  <div>
                    <h3 className="font-semibold">Renewal List</h3>
                   
                   <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-[#0A2478] text-white">
                            <tr>
                                <th className="px-4 py-2 border-r border-gray-200">App. From</th>
                                <th className="px-4 py-2 border-r border-gray-200">App .To</th>
                                <th className="px-4 py-2 border-r border-gray-200">Interest</th>
                                <th className="px-4 py-2">Approval %age</th>
                            </tr>
                        </thead>

                   </table>
                </div>
            </div>
        </div>
    );
};

export default AddSchemeRenewalForm;
