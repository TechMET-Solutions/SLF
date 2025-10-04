import { useState } from "react";
import { Link } from "react-router-dom";


const AddMemberBranchMapping = () => {

    const branches = [
        "01 - Bhagur B1",
        "02 - Nasikroad B2",
        "03 - Nashik B3",
        "999 - Head Office",
        "V1 - Bhagur V1",
        "V2 - Nasikroad V2",
        "V3 - Nasikroad V3",
        "01 - Bhagur B1",
        "02 - Nasikroad B2",
        
    ];

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
                            <button
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
            <div className="flex flex-col gap-9 p-8">

                <div className="flex flex-col gap-2 w-[540px]">
                    <label className="text-gray-700 font-medium">username</label>
                    <input
                        type="text"
                        placeholder="username"
                        className="border border-[#C4C4C4] rounded-md px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium">Branch</label>
                    <div className="flex flex-wrap gap-12">
                        {branches.map((branch) => (
                            <label
                                key={branch}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 border-gray-300 rounded"
                                />
                                <span>{branch}</span>
                            </label>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AddMemberBranchMapping;
