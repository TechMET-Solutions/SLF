import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import GroupData from "../assets/Group 124.svg";
import eyeIcon from "../assets/Vectorimg.png";
const SchemeDetailsList = () => {
    useEffect(() => {
    document.title = "SLF | Scheme Details List";
  }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
        {
            id: 1,
            groupName: "Recoverable",
            appFrom: "29-05-2025",
            appTo: "31-12-2050",
            intCompound: "True",
            minAmount: 0,
            maxAmount: 0,
            description: "TDS of interest on FDR",
            active: true,
        },
        {
            id: 2,
            groupName: "IND 95",
            appFrom: "01-06-2025",
            appTo: "31-12-2050",
            intCompound: "True",
            minAmount: 1000,
            maxAmount: 5000,
            description: "IND 95%, 1.5%, 35 & 185 days",
            active: false,
        },
        {
            id: 3,
            groupName: "IND 96",
            appFrom: "15-06-2025",
            appTo: "31-12-2050",
            intCompound: "False",
            minAmount: 500,
            maxAmount: 10000,
            description: "IND 96%, 1.8%, 90 & 365 days",
            active: true,
        },
    ]);

    const navigate = useNavigate(); // Add this line

    return (
        <div className="min-h-screen w-full">
            {/* middletopbar */}
            <div className="flex justify-center ">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    {/* Left heading */}
                    <h2
                        style={{
                            fontFamily: "Source Sans 3, sans-serif",
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "148%",
                            letterSpacing: "0em",
                        }}
                        className="text-red-600"
                    >
                        Scheme Details List
                    </h2>

                    {/* Right section (search + buttons) */}
                    <div className="flex items-center gap-6">
                        {/* Search section */}
                        {/* Buttons stuck to right */}
                        <div className="flex gap-3">
                            <button
                                style={{
                                    width: "74px",
                                    height: "24px",
                                    borderRadius: "3.75px",
                                }}
                                className="bg-[#129121] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                                onClick={() => navigate("/Scheme-Renewal-List")}
                           >
                                Renew
                            </button>

                            <button
                                style={{
                                    width: "74px",
                                    height: "24px",
                                    borderRadius: "3.75px",
                                }}
                                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                                                               onClick={() => navigate("/Add-Scheme-Details-Listform")}

                            >
                                Add
                            </button>

                            <button
                                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className="flex justify-center ">
                <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#0A2478] text-white text-sm">
                            <tr>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Scheme Name
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    App Form
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    App To
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Int Compound
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Min Amount
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Max Amount
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Description
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Action
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]"
                                >
                                    Role Mapping
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Active
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                                >
                                    <td className="px-4 py-2">{row.groupName}</td>
                                    <td className="px-4 py-2">{row.appFrom}</td>
                                    <td className="px-4 py-2">{row.appTo}</td>
                                    <td className="px-4 py-2">{row.intCompound}</td>
                                    <td className="px-4 py-2">{row.minAmount}</td>
                                    <td className="px-4 py-2">{row.maxAmount}</td>
                                    <td className="px-4 py-2">{row.description}</td>
                                    <td className="px-4 py-2 text-center cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            {/* First colored div with eye icon */}
                                            <div className="w-5 h-5 bg-[#646AD9] flex items-center justify-center rounded-[2px] "onClick={() => navigate("/View-Scheme-Details-form")}>
                                                <img
                                                
                                                    src={eyeIcon}
                                                    alt="eye"
                                                    className="w-3.5 h-2.5"
                                                />
                                            </div>

                                            {/* Second colored div with group icon */}
                                            <div className="w-5 h-5 bg-[#56A869] flex items-center justify-center rounded-[2px]">
                                                <img
                                                    src={GroupData}
                                                    alt="group"
                                                    className="w-3.5 h-3.5"
                                                />
                                            </div>
                                        </div>

                                    </td>
                                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer"
                                                                    onClick={() => navigate("/Role-Mapping")}
>
                                        Role Mapping
                                    </td>

                                    {/* Toggle */}
                                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                                        <button
                                            onClick={() => {
                                                const newData = data.map((item) =>
                                                    item.id === row.id
                                                        ? { ...item, active: !item.active }
                                                        : item
                                                );
                                                setData(newData);
                                            }}
                                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                                                row.active ? "bg-[#0A2478]" : "bg-gray-400"
                                            }`}
                                            style={{ border: "none", outline: "none", cursor: "pointer", padding: 0 }}
                                            aria-label="Toggle Active"
                                        >
                                            <div
                                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                                                    row.active ? "translate-x-6" : "translate-x-0"
                                                }`}
                                            />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
                <button className="px-3 py-1 border rounded-md">Previous</button>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">
                        1
                    </button>
                    <button className="px-3 py-1 border rounded-md">2</button>
                    <button className="px-3 py-1 border rounded-md">3</button>
                    <button className="px-3 py-1 border rounded-md">...</button>
                    <button className="px-3 py-1 border rounded-md">10</button>
                </div>
                <button className="px-3 py-1 border rounded-md">Next</button>
            </div>
        </div>
    );
};

export default SchemeDetailsList;