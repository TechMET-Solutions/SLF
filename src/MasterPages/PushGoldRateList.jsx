import { useState } from "react";


const PushGoldRateList = () => {
    const [data] = useState([
        {
            id: 1,
            pushDate: "10-04-2025",
            goldRate: "772",
            addBy: "ssl@slunawat.com",
            addOn: "10-04-2025",
        },
        {
            id: 2,
            pushDate: "10-04-2025",
            goldRate: "772",
            addBy: "ssl@slunawat.com",
            addOn: "10-04-2025",
        },
        {
            id: 3,
            pushDate: "10-04-2015",
            goldRate: "782",
            addBy: "ssl@slunawat.com",
            addOn: "10-04-2025",
        },
        
    ]);

    return (
        <div className="min-h-screen w-full">
            {/* Top bar */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
                       Push Gold Rate List
                    </h2>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-5">
                            <div className="flex gap-3 items-center">
                                <p className="text-[11.25px] font-source">Push Date *</p>
                                <input
                                    type="date"
                                    className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                                />
                            </div>
                            <div className="flex gap-3 items-center">
                                <p className="text-[11.25px] font-source">Gold Rate *</p>
                                <input
                                    type="text"
                                    className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
                            >
                                Save
                            </button>
                            <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex justify-center">
                <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#0A2478] text-white text-sm">
                            <tr>
                                <th className="px-4 py-2 text-left border-r">id</th>
                                <th className="px-4 py-2 text-left border-r">Push Date</th>
                                <th className="px-4 py-2 text-left border-r">Gold Rate</th>
                                <th className="px-4 py-2 text-left border-r">Added On</th>
                                <th className="px-4 py-2 text-left border-r">Added by</th>
                                
                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2">{row.id}</td>
                                    <td className="px-4 py-2">{row.pushDate}</td>
                                    <td className="px-4 py-2">{row.goldRate}</td>
                                    <td className="px-4 py-2">{row.addOn}</td>
                                    <td className="px-4 py-2">{row.addBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center px-6 py-3 border-t gap-2 mt-4">
                <button className="px-3 py-1 border rounded-md">Previous</button>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
                    <button className="px-3 py-1 border rounded-md">2</button>
                    <button className="px-3 py-1 border rounded-md">3</button>
                    <span className="px-3 py-1">...</span>
                    <button className="px-3 py-1 border rounded-md">10</button>
                </div>
                <button className="px-3 py-1 border rounded-md">Next</button>
            </div>
        </div>
    );
};

export default PushGoldRateList;
