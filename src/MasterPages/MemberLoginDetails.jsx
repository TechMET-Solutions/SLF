import { useState } from "react";
import GroupData from "../assets/Group 124.svg";
import DeleteData from "../assets/deletimg.png";
import EyeData from "../assets/eye.svg";

const MemberLoginDetails = () => {
    const [data] = useState([
        {
            name: "ssl@slunawat.com",
            userId: "ssl@slunawat.com",
            sm1: "9876543210",
            sm2: "9856321470",
        },
        {
            name: "ssl@slunawat.com",
            userId: "ssl@slunawat.com",
            sm1: "9876543210",
            sm2: "9856321470",
        },
        {
            name: "ssl@slunawat.com",
            userId: "ssl@slunawat.com",
            sm1: "9876543210",
            sm2: "9856321470",
        },
    ]);

    return (
        <div className="min-h-screen w-full">
            {/* Top bar */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
                        Member Login Details
                    </h2>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-5">
                            <div className="flex gap-3 items-center">
                                <input
                                    type="text"
                                    className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                                />
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-3 items-center">
                                <input
                                    type="date"
                                    className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                                />
                            </div>
                            <div className="flex gap-3 items-center border border-gray-400 rounded pl-3 py-1 text-[11.25px] w-[140px] h-[28px]">
                                <p className="text-[11.25px] font-source">Activity</p>
                                <select className="border border-gray-500 border-none">
                                    <option value="#">-- Select --</option>
                                    <option value="#">Login</option>
                                </select>
                            </div>

                        </div>

                        <div className="flex gap-3">
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
                                <th className="px-4 py-2 text-left border-r"></th>
                                <th className="px-4 py-2 text-left border-r">Name</th>
                                <th className="px-4 py-2 text-left border-r">User Id</th>
                                <th className="px-4 py-2 text-left border-r">OTP Override</th>
                                <th className="px-4 py-2 text-left border-r">Sendor Mobile No 1</th>
                                <th className="px-4 py-2 text-left border-r">Sendor Mobile No 2</th>
                                <th className="px-4 py-2 text-left border-r">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2 flex items-center justify-center">
                                        <input type="checkbox" name="id" id="id" />
                                    </td>
                                    <td className="px-4 py-2">{row.name}</td>
                                    <td className="px-4 py-2">{row.userId}</td>
                                    <td className="px-4 py-2 flex items-center justify-center">
                                        <input type="checkbox" name="id" id="id" className="w-6 h-6" />
                                    </td>
                                    <td className="px-4 py-2">{row.sm1}</td>
                                    <td className="px-4 py-2">{row.sm2}</td>
                                    <td className="px-4 py-2 flex items-center justify-center">
                                        <input type="checkbox" name="id" id="id" className="w-6 h-6" />
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

export default MemberLoginDetails;


