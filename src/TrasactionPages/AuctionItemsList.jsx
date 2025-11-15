import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Bill from "../assets/bill-gen1.svg";
import Bill2 from "../assets/genrateinvoice.png";
function AuctionItemsList() {
    useEffect(() => {
        document.title = "SLF | Auction Creation";
    }, []);

    const navigate = useNavigate();
const location = useLocation();
    const { loanIds } = location.state || {};
    const [formData, setFormData] = useState({
        venue: "",
        date: "",
        time: "",
        fees: "",
        charges: "",
    });

    const [data, setData] = useState([])
    const [dataWithBidderCost, setDataWithBidderCost] = useState(data);

const handleBidderCostChange = (itemId, value) => {
  setDataWithBidderCost(prev =>
    prev.map(item =>
      item.item_id === itemId ? { ...item, bidderCost: value } : item
    )
  );
};
    console.log(data,"data")
     useEffect(() => {
    if (loanIds && loanIds.length > 0) {
        const idsString = loanIds.join(",");  // "5,4"

        fetch(`http://localhost:5000/Transactions/loan-applications/by-ids?ids=${idsString}`)
            .then(res => res.json())
            .then(data => {
                setData(data.loans)
                console.log("All Loans Data:", data);
            });
    }
}, [loanIds]);

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
                                
                                <th className="px-4 py-2 text-left border-r">Item Name</th>
                                <th className="px-4 py-2 text-left border-r">Gross weight</th>
                                <th className="px-4 py-2 text-left border-r">Net weight</th>
                                <th className="px-4 py-2 text-left border-r">Amount</th>
                                <th className="px-4 py-2 text-left border-r">Outstanding Amt</th>
                                <th className="px-4 py-2 text-left border-r">Valuation Gold Rate</th>
                                <th className="px-4 py-2 text-left border-r">Bidding Close Amt</th>
                                {/* <th className="px-4 py-2 text-left border-r">Total Amt</th> */}
                                <th className="px-4 py-2 text-left border-r">Assign Bidder</th>
                                <th className="px-4 py-2 text-left border-r">Invoice</th>
                                <th className="px-4 py-2 text-left border-r">Credit Note</th>
                                <th className="px-4 py-2 text-left border-r">Remark</th>
                            </tr>
                        </thead>

                        <tbody className="text-[13px]">

                            {data?.map((item) => (
                                <tr key={item.item_id}>
                                    <td className="px-4 py-2">{item.id}</td>
                                 
                                   <td className="px-4 py-2">
    {(() => {
        try {
            const list = JSON.parse(item.Pledge_Item_List);
            return list[0]?.particular || "-";
        } catch {
            return "-";
        }
    })()}
</td>

                                   <td className="px-4 py-2">
  {(() => {
    try {
      const list = JSON.parse(item.Pledge_Item_List);
      return list.reduce((sum, x) => sum + Number(x.gross || 0), 0);
    } catch {
      return "-";
    }
  })()}
</td>

                                   <td className="px-4 py-2">
  {(() => {
    try {
      const list = JSON.parse(item.Pledge_Item_List);
      return list.reduce((sum, x) => sum + Number(x.netWeight || 0), 0);
    } catch {
      return "-";
    }
  })()}
</td>

                                    <td className="px-4 py-2">{item.Loan_amount}</td>
                                    <td className="px-4 py-2">{item.outstanding_amt}</td>
                                   
                                  <td className="px-4 py-2">
  {(() => {
    try {
      const list = JSON.parse(item.Pledge_Item_List);
      return list.reduce((sum, x) => sum + Number(x.valuation || 0), 0);
    } catch {
      return "-";
    }
  })()}
</td>

                                  <td className="px-4 py-2">
    <input
        type="number"
        value={item.bidderCost || ""}
        onChange={(e) => handleBidderCostChange(item.item_id, e.target.value)}
        className="border rounded px-2 py-1 w-24 text-sm"
        placeholder="Enter cost"
    />
</td>

                                    <td className="px-4 py-2">---</td>
                                    <td className="px-4 py-2">
                                        <img src={Bill} alt="bill" />
                                        <img src={Bill2} alt="bill" />
                                    </td>
                                   <td className="px-4 py-2">
  <div className="w-[18.5px] h-[18.5px] border flex items-center justify-center text-[5px]">
    credit
  </div>
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
