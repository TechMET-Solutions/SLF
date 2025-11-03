import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Bill from "../assets/bill-gen1.svg"

function AuctionItemsList() {
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
            "loan_no": "02A5602234",
            "item_id": "AUC-ITEM-001",
            "item_name": "Gold Necklace with Pendant",
            "gross_weight": 120.00,
            "net_weight": 118.50,
            "amount": "5,92,500",
            "status": "Close",
            "outstanding_amt": "4,50,000",
            "valuation_gold_rate": "4,50,000",
            "total_amt": "4,50,000",
            "assign_bidder": "Mahesh Tarle",
            "invoice": true,
            "remark": ""
        },
        {
            "loan_no": "02A5602234",
            "item_id": "AUC-ITEM-002",
            "item_name": "Gold Bangles (Pair)",
            "gross_weight": 81.50,
            "net_weight": 79.00,
            "amount": "4,02,900",
            "status": "Close",
            "outstanding_amt": "4,50,000",
            "valuation_gold_rate": "4,50,000",
            "total_amt": "3,20,000",
            "assign_bidder": "Mahesh Tarle",
            "invoice": true,
            "remark": ""
        },
        {
            "loan_no": "02A5602234",
            "item_id": "AUC-ITEM-003",
            "item_name": "Gold Earrings (Set of 2)",
            "gross_weight": 36.20,
            "net_weight": 34.80,
            "amount": "1,80,960",
            "status": "Open",
            "outstanding_amt": "4,50,000",
            "valuation_gold_rate": "4,50,000",
            "total_amt": "1,40,000",
            "assign_bidder": "Mahesh Tarle",
            "invoice": true,
            "remark": ""
        },
        {
            "loan_no": "02A5602234",
            "item_id": "AUC-ITEM-004",
            "item_name": "Gold Chain",
            "gross_weight": 62.00,
            "net_weight": 60.50,
            "amount": "3,02,500",
            "status": "Open",
            "outstanding_amt": "4,50,000",
            "valuation_gold_rate": "4,50,000",
            "total_amt": "2,60,000",
            "assign_bidder": "Mahesh Tarle",
            "invoice": true,
            "remark": ""
        },
        {
            "loan_no": "02A5602234",
            "item_id": "AUC-ITEM-005",
            "item_name": "Gold Bracelet",
            "gross_weight": 42.00,
            "net_weight": 40.80,
            "amount": "2,04,000",
            "status": "Close",
            "outstanding_amt": "4,50,000",
            "valuation_gold_rate": "4,50,000",
            "total_amt": "1,75,000",
            "assign_bidder": "Mahesh Tarle",
            "invoice": true,
            "remark": ""
        }
    ]
    );

    return (
        <div className="min-h-screen w-full">
            {/* 🔹 Header */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
                    <h2 className="text-red-600 font-bold text-[20px]">
                        Auction Items List
                    </h2>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/Add-Auction-Creation")}
                            className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => navigate("/Auction-Creation")}
                            className="bg-[#C1121F] text-white text-sm rounded px-4 py-2 cursor-pointer"
                        >
                            Exit
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
                                <th className="px-4 py-2 text-left border-r">Loan No.</th>
                                <th className="px-4 py-2 text-left border-r">Item Id</th>
                                <th className="px-4 py-2 text-left border-r">Item Name</th>
                                <th className="px-4 py-2 text-left border-r">Gross weight</th>
                                <th className="px-4 py-2 text-left border-r">Net weight</th>
                                <th className="px-4 py-2 text-left border-r">Amount</th>
                                <th className="px-4 py-2 text-left border-r">Status</th>
                                <th className="px-4 py-2 text-left border-r">Outstanding Amt</th>
                                <th className="px-4 py-2 text-left border-r">Valuation Gold Rate</th>
                                <th className="px-4 py-2 text-left border-r">Total Amt</th>
                                <th className="px-4 py-2 text-left border-r">Assign Bidder</th>
                                <th className="px-4 py-2 text-left border-r">Invoice</th>
                                <th className="px-4 py-2 text-left border-r">Remark</th>
                            </tr>
                        </thead>

                        <tbody className="text-[13px]">

                            {data.map((item) => (
                                <tr key={item.item_id}>
                                    <td className="px-4 py-2">{item.loan_no}</td>
                                    <td className="px-4 py-2">{item.item_id}</td>
                                    <td className="px-4 py-2">{item.item_name}</td>
                                    <td className="px-4 py-2">{item.gross_weight}</td>
                                    <td className="px-4 py-2">{item.net_weight}</td>
                                    <td className="px-4 py-2">{item.amount}</td>
                                    <td className={item.status === "Open" ? "text-green-600 px-4 py-2" : "text-red-600 px-4 py-2"}>
                                        {item.status}
                                    </td>
                                    <td className="px-4 py-2">{item.outstanding_amt}</td>
                                    <td className="px-4 py-2">{item.valuation_gold_rate}</td>
                                    <td className="px-4 py-2">{item.total_amt}</td>
                                    <td className="px-4 py-2">{item.assign_bidder}</td>
                                    <td className="px-4 py-2">
                                        <img src={Bill} alt="bill" />
                                    </td>
                                    <td className="px-4 py-2">{item.remark}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AuctionItemsList;
