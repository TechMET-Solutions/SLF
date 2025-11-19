import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PendingInvoice from "../assets/PendingInvoice.png";
import genrateinvoice from "../assets/genrateinvoice.png";
function AuctionItemsList() {
  useEffect(() => {
    document.title = "SLF | Auction Creation";
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const { loanIds,AuctionData } = location.state || {};
console.log(AuctionData,"AuctionData")
  const [data, setData] = useState([]);
  const [dataWithBidderCost, setDataWithBidderCost] = useState([]);

  // 🔹 Update bidder amount for a specific row
  const handleBidderCostChange = (itemId, value) => {
    setDataWithBidderCost((prev) =>
      prev.map((row) =>
        row.id === itemId ? { ...row, biddingCloseAmount: value } : row
      )
    );
  };

  // 🔹 Fetch Loan Details
  useEffect(() => {
    if (loanIds && loanIds.length > 0) {
      const idsString = loanIds.join(",");

      fetch(
        `http://localhost:5000/Transactions/loan-applications/by-ids?ids=${idsString}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result.loans || []);
          setDataWithBidderCost(
            result.loans.map((l) => ({
              ...l,
              biddingCloseAmount: "",
            }))
          );
        });
    }
  }, [loanIds]);

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Auction Items List</h2>

          <div className="flex gap-3">
            <button
  onClick={() =>
    navigate("/Auction_Bidder_List", {
      state: {
        auctionId: AuctionData?.id,
        AuctionData: AuctionData,
      }
    })
  }
  className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
>
  Bidder List
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

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-6 w-[1300px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:border-r">
                <th>Loan No.</th>
                <th>Item Name</th>
                <th>Gross Weight</th>
                <th>Net Weight</th>
                <th>Amount</th>
                <th>Outstanding Amt</th>
                <th>Valuation Gold Rate</th>
                <th>Bidding Close Amt</th>
                <th>Assign Bidder</th>
                <th>Invoice</th>
                <th>Remark</th>
              </tr>
            </thead>

            <tbody className="text-[13px] divide-y">
              {dataWithBidderCost?.map((item) => {
                let list = [];

                // 🟢 Safe JSON Parsing
                try {
                  list = JSON.parse(JSON.parse(item.Pledge_Item_List));
                } catch (err) {
                  console.log("JSON Error:", err);
                }

                const itemName = list[0]?.particular || "-";
                const gross = list.reduce(
                  (sum, x) => sum + Number(x.gross || 0),
                  0
                );
                const net = list.reduce(
                  (sum, x) => sum + Number(x.netWeight || 0),
                  0
                );
                const valuation = list.reduce(
                  (sum, x) => sum + Number(x.valuation || 0),
                  0
                );

                return (
                  <tr key={item.id} className="[&>td]:px-4 [&>td]:py-3">
                    <td>{item.id}</td>
                    <td>{itemName}</td>
                    <td>{gross}</td>
                    <td>{net}</td>
                    <td>{item.Loan_amount}</td>
                    <td>{item.LoanPendingAmount}</td>
                    <td>{valuation}</td>

                    {/* ⭐ Bidding Close Amount Input */}
                   <td className=" ">
  {item.BidderCloseAmt ? (
    <span className="font-medium">{item.BidderCloseAmt}</span>
  ) : (
    <span className="text-gray-500">---</span>
  )}
</td>



                    {/* You can fill these later */}
                        <td>{item.AssignBidderName ? item.AssignBidderName : "---"}</td>

                 <td>
  {item.AuctionStatus === 0 ? (
    // Show Pending Invoice (Auction not closed yet)
    <img
      src={PendingInvoice}
      alt="Pending Invoice"
      className="w-6 h-6 cursor-pointer"
                                    onClick={() => {
          
        navigate("/Generate_Bill", {
          state: {
            loanData: item,
            AuctionData: AuctionData,
          }
        });
      }}
    />
  ) : item.AuctionStatus === 1 ? (
    // Show Generate Invoice (Auction completed)
    <img
      src={genrateinvoice}
      alt="Generate Invoice"
      className="w-6 h-6 cursor-pointer"
      onClick={() => {
        navigate("/InvoicePrint", {
          state: {
            loanData: item,
            AuctionData: AuctionData,
          }
        });
      }}
    />
  ) : (
    "-"   // fallback
  )}
</td>



<td>--</td>
                     
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Debug */}
          {/* <pre>{JSON.stringify(dataWithBidderCost, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

export default AuctionItemsList;
