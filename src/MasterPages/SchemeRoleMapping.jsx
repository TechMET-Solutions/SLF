import React, { useState } from "react";

const SchemeRoleMapping = () => {
    const [schemes, setSchemes] = useState([
        "01",
        "02",
        "03",
        "04",
        "11",
        "13",
        "BGR - 01",
        "BGR - 02",
        "COR01",
        "COR02",
        "IND01",
        "IND02",
        "IND03",
    ]);

    const [selectedSchemes, setSelectedSchemes] = useState([]);

    const toggleScheme = (scheme) => {
        if (selectedSchemes.includes(scheme)) {
            setSelectedSchemes(selectedSchemes.filter((s) => s !== scheme));
        } else {
            setSelectedSchemes([...selectedSchemes, scheme]);
        }
    };

    return (
        <div className="min-h-screen w-full">
            {/* Topbar */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    <h2
                        style={{
                            fontFamily: "Source Sans 3, sans-serif",
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "148%",
                        }}
                        className="text-red-600"
                    >
                        Scheme Role Mapping
                    </h2>

                    <div className="flex items-center gap-3">
                        <button className="text-white px-4 py-1 rounded bg-[#0A2478] text-sm">
                            Save
                        </button>
                        <button className="text-white px-4 py-1 rounded bg-[#C1121F] text-sm">
                            Exit
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex justify-center">
                <div className="flex gap-8 mt-5 w-[1290px]">
                    {/* Left - Branch Info */}
                    <div className="flex flex-col gap-4 w-1/2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Branch Code</label>
                            <input
                                type="text"
                                defaultValue="V1"
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Branch Name</label>
                            <input
                                type="text"
                                defaultValue="Bhagur V1"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Branch Address</label>
                            <input
                                type="text"
                                defaultValue="318 , Nehru Road"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>

                    {/* Right - Scheme Selection */}
                    <div className="w-1/2 shadow rounded-md flex flex-col">
                        <div className="bg-[#0A2478] text-white px-4 py-2 font-medium rounded-t">
                            Select
                        </div>

                        <div className="flex-1 max-h-[450px] overflow-y-auto px-4 py-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            <style>
                                {`
      /* Hide scrollbar for Chrome, Safari and Opera */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}
                            </style>
                            <div className="hide-scrollbar">
                                {schemes.map((scheme, idx) => (
                                    <label
                                        key={idx}
                                        className={`flex items-center gap-2 py-2 text-sm cursor-pointer border-b border-gray-200 ${idx === schemes.length - 1 ? "border-b-0" : ""
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedSchemes.includes(scheme)}
                                            onChange={() => toggleScheme(scheme)}
                                            className="w-5 h-5 mr-3"
                                        />
                                        {scheme}
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchemeRoleMapping;
