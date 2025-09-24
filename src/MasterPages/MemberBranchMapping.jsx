import { useState } from "react";
import { Link } from "react-router-dom";


const MemberBranchMapping = () => {
    const [data] = useState([
        {
            id: 1,
            name: "kundan",
            mobile: "8805789654",
            email: "ssl@slunawat.com",
        },
        {
            id: 3,
            name: "omkar",
            mobile: "8805789654",
            email: "ssl@slunawat.com",
        },
        {
            id: 2,
            name: "tejas",
            mobile: "8805789654",
            email: "ssl@slunawat.com",
        },


    ]);

    return (
        <div className="min-h-screen w-full">
            {/* Top bar */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
                        Member Branch Mapping
                    </h2>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-6">
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
                                <th className="px-4 py-2 text-left border-r">Empl Id</th>
                                <th className="px-4 py-2 text-left border-r">Name</th>
                                <th className="px-4 py-2 text-left border-r">Email</th>
                                <th className="px-4 py-2 text-left border-r">Mobile</th>
                                <th className="px-4 py-2 text-left border-r">Branch Mapping</th>

                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2">{row.id}</td>
                                    <td className="px-4 py-2">{row.name}</td>
                                    <td className="px-4 py-2">{row.email}</td>
                                    <td className="px-4 py-2">{row.mobile}</td>
                                    <td className="px-4 py-2">
                                        <Link
                                            to="/Add-Member-Branch-Mapping"
                                            className="text-blue-700">
                                            Branch
                                        </Link>
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

export default MemberBranchMapping;
