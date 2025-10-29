import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

function AuctionCreation() {
    useEffect(() => {
        document.title = "SLF | Auction Creation";
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        venue: "",
        date: "",
        time: "",
        fees: "",
        charges: "",
    });

    // ✅ Dummy auction data
    const [data] = useState([
        {
            id: 1,
            auction_id: "AUC-2025-014",
            venue: "MG Road, Nashik, Maharashtra 422007",
            date: "25/10/2025",
            time: "10:30 AM",
            fees: "500",
            auction_items: "Gold Necklace, Gold Bangles...",
            status: "open", // can be 'open' or 'close'
        },
        {
            id: 2,
            auction_id: "AUC-2025-014",
            venue: "MG Road, Nashik, Maharashtra 422007",
            date: "25/10/2025",
            time: "10:30 AM",
            fees: "500",
            auction_items: "Gold Necklace, Gold Bangles...",
            status: "closed", // can be 'open' or 'close'
        },
    ]);

    return (
        <div className="min-h-screen w-full">
            {/* 🔹 Header */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
                    <h2 className="text-red-600 font-bold text-[20px]">
                        Auction Creation
                    </h2>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/Add-Auction-Creation")}
                            className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔹 Table Section */}
            <div className="flex justify-center">
                <div className="overflow-x-auto mt-6 w-[1300px]">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#0A2478] text-white text-sm">
                            <tr>
                                <th className="px-4 py-2 text-left border-r">Auction Id</th>
                                <th className="px-4 py-2 text-left border-r">Venue</th>
                                <th className="px-4 py-2 text-left border-r">Date</th>
                                <th className="px-4 py-2 text-left border-r">Time</th>
                                <th className="px-4 py-2 text-left border-r">Fees</th>
                                <th className="px-4 py-2 text-left border-r">Auction Items</th>
                                <th className="px-4 py-2 text-left flex gap-3">Status <IoIosArrowDown size={20} /></th>
                            </tr>
                        </thead>

                        <tbody className="text-[13px]">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100 transition`}
                                >
                                    <td className="px-4 py-2 cursor-pointer text-blue-400" onClick={() => { navigate("/Auction-Items-List") }}>{row.auction_id}</td>
                                    <td className="px-4 py-2">{row.venue}</td>
                                    <td className="px-4 py-2">{row.date}</td>
                                    <td className="px-4 py-2">{row.time}</td>
                                    <td className="px-4 py-2">{row.fees}</td>
                                    <td className="px-4 py-2">{row.auction_items}</td>
                                    <td className={row.status === "open" ? "text-green-600 px-4 py-2" : "text-red-600 px-4 py-2"}>
                                        {row.status}
                                    </td>                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AuctionCreation;
