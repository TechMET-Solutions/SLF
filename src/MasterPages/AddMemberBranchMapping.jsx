import { useState } from "react";
import { Link } from "react-router-dom";


const AddMemberBranchMapping = () => {
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
            <div className="flex justify-center">
                {/* inputs and Checkbox using map */}


            </div>
        </div>
    );
};

export default AddMemberBranchMapping;
