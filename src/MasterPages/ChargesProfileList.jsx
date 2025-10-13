import { useState } from "react";
import GroupData from "../assets/Group 124.svg";
import DeleteData from "../assets/deletimg.png";
import EyeData from "../assets/eye.svg";

const ChargesProfileList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data] = useState([
        {
            id: 1,
            code: "card",
            description: "Auction Charges",
            amount: "500",
            addBy: "ssl@slunawat.com",
            addOn: "10-04-2025",
            isActive: true,
        },
        {
            id: 2,
            code: "card",
            description: "Auction Charges",
            amount: "300",
            addBy: "ssl@slunawat.com",
            addOn: "10-04-2025",
            isActive: true,
        },
        {
            id: 3,
            code: "card",
            description: "Auction Charges",
            amount: "700",
            addBy: "ssl@slunawat.com",
            addOn: "19-04-2015",
            isActive: false,
        },
    ]);

    const handleToggle = (id) => {
        // TODO: Toggle active state logic
        console.log("Toggling active state for:", id);
    };

    return (
        <div className="min-h-screen w-full">
            {/* Top bar */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
                        Charges Profile List
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
                                className="bg-[#0A2478] cursor-pointer text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
                            >
                                Add
                            </button>
                            <button className="bg-[#C1121F] cursor-pointer text-white text-[10px] w-[74px] h-[24px] rounded">
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-[717px] rounded-lg shadow-lg h-[340px] p-10">
                        <h2 className="text-[#0A2478] text-[20px] font-semibold font-source mb-4">
                            Add Charges Profile
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[14px]">Code <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Bank Name"
                                    className="border border-gray-300 rounded w-[280px] h-[38px] px-3"
                                />
                            </div>
                            <div>
                                <label className="text-[14px]">Description <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="border border-gray-300 rounded w-[280px] h-[38px] px-3"
                                />
                            </div>
                            <div>
                                <label className="text-[12px] font-medium">Amount</label>
                                <input
                                    type="text"
                                    placeholder="Amount"
                                    className="border border-gray-300 rounded w-[280px] h-[38px] px-3"
                                />
                            </div>
                            <div>
                                <label className="text-[12px] font-medium">Account</label>
                                <select className="border border-gray-300 rounded w-[280px] h-[38px] px-3">
                                    <option>-- Select --</option>
                                    <option>Bad Loan</option>
                                </select>
                            </div>
                            
                        </div>
                        <div className="flex justify-center gap-3 m-4">
                                <input type="checkbox" name="isActive" id="isActive" className="w-5 h-5" />
                                <label className="text-[12px] font-medium">is Active</label>
                            </div>

                        <div className="flex justify-center  gap-3 my-6">
                            <button
                                className="bg-[#0A2478] cursor-pointer text-white w-[92px] h-[30px] rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Save
                            </button>
                            <button
                                className="bg-[#C1121F] cursor-pointer text-white w-[92px] h-[30px] rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="flex justify-center">
                <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#0A2478] text-white text-sm">
                            <tr>
                                <th className="px-4 py-2 text-left border-r">Code</th>
                                <th className="px-4 py-2 text-left border-r">Description</th>
                                <th className="px-4 py-2 text-left border-r">Amount</th>
                                <th className="px-4 py-2 text-left border-r">Added by</th>
                                <th className="px-4 py-2 text-left border-r">Added On</th>
                                <th className="px-4 py-2 text-left border-r">Action</th>
                                <th className="px-4 py-2 text-left">Active</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2">{row.code}</td>
                                    <td className="px-4 py-2">{row.description}</td>
                                    <td className="px-4 py-2">{row.amount}</td>
                                    <td className="px-4 py-2">{row.addBy}</td>
                                    <td className="px-4 py-2">{row.addOn}</td>
                                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                                        <div className="flex gap-2">
                                            <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center  p-0.5 justify-center">
                                                <img src={GroupData} alt="logout" className="w-[18px] h-[18px]" />
                                            </div>
                                            <div className="w-[17px] h-[17px] bg-[#646AD9] rounded-[2.31px] flex items-center  p-0.5 justify-center">
                                                <img src={EyeData} alt="view" className="w-[18px] h-[18px]" />
                                            </div>
                                            <div className="w-[17px] h-[17px] bg-red-400 rounded-[2.31px] flex items-center  p-0.5 justify-center">
                                                <img src={DeleteData} alt="delete" className="w-[12px] h-[14px]" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleToggle(row.id)}
                                            className={`w-12 h-6 flex cursor-pointer items-center rounded-full p-1 transition-colors ${row.isActive ? "bg-[#0A2478]" : "bg-gray-300"}`}>
                                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${row.isActive ? "translate-x-6" : "translate-x-0"}`}/>
                                        </button>
                                    </td>
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

export default ChargesProfileList;
