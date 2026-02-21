import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const Print_Cash_Balance = () => {
  const [cashData, setCashData] = useState(null);
  const navigate = useNavigate();
  const noteDenoms = [500, 200, 100, 50, 20, 10];
  const coinDenoms = [20, 10, 5, 2, 1];

  useEffect(() => {
    const fetchCashData = async () => {
      try {
        const res = await axios.get(`${API}/cashBalance/latest`);
        setCashData(res.data);
      } catch (err) {
        console.error("Error fetching cash data:", err);
      }
    };

    fetchCashData();
  }, []);

  if (!cashData) return <div className="p-6">Loading...</div>;

  // ==========================
  // Calculations
  // ==========================

  const notesTotal = noteDenoms.reduce((sum, denom) => {
    const count = Number(cashData.notes?.[denom] || 0);
    return sum + denom * count;
  }, 0);

  const coinsTotal = coinDenoms.reduce((sum, denom) => {
    const count = Number(cashData.coins?.[denom] || 0);
    return sum + denom * count;
  }, 0);

  const grandTotal = notesTotal + coinsTotal;

  const physicalCash = Number(cashData.physical_cash || 0);
  const softwareCash = Number(cashData.software_cash || 0);
  const difference = physicalCash - softwareCash;

  const statusColor =
    cashData.status === "SHORT"
      ? "text-red-600"
      : cashData.status === "EXCESS"
        ? "text-green-600"
        : "text-blue-600";

  // ==========================
  // Table Component
  // ==========================

  const TableSection = ({ title, denominations, type, source }) => (
    <div className="w-full border border-black">
      <div className="bg-gray-200 font-semibold px-3 py-2 text-sm">{title}</div>

      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#0A2478] text-white">
            <th className="border px-2 py-1 border-r">SNo</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Denomination</th>
            <th className="border px-2 py-1">Nos</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>

        <tbody>
          {denominations.map((denom, index) => {
            const count = Number(source?.[denom] || 0);
            const total = denom * count;

            return (
              <tr key={denom} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border border-black px-2 py-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-black px-2 py-1 text-center">
                  {type}
                </td>
                <td className="border border-black px-2 py-1 text-center">
                  ₹{denom}
                </td>
                <td className="border border-black px-2 py-1 text-center">
                  {count}
                </td>
                <td className="border border-black px-2 py-1 text-center">
                  ₹{total.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const currentDate = new Date().toLocaleDateString("en-GB");
  const printTime = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen w-full  pb-10">
      <div className="flex justify-center pt-5 px-4">
        <div className="flex items-center px-6 py-3 w-full max-w-[1290px] bg-white border border-gray-200 rounded-xl shadow-sm justify-between">
          <h2 className="text-red-600 font-bold text-xl tracking-tight uppercase">
            Print Cash Balance
          </h2>

          <div className="flex gap-3">
            <button
              // onClick={() => window.print()}
              className="bg-[#0A2478] text-white px-4  rounded h-[30px] "
            >
              Print
            </button>
            <button
              onClick={() => navigate("/Cash_Balance")}
              className="bg-red-700 text-white px-6 py-2 rounded shadow-sm hover:bg-red-800 transition-colors text-xs font-medium h-[30px]"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
      <div className='mr-[110px] ml-[110px]'>
         <div className="p-6  text-black print:p-4">
        {/* Header */}
        <div className="flex justify-end text-xs mb-2">
          Date: {currentDate} | Time: {printTime}
        </div>

        <hr className="border-black mb-3" />

        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Cash Scroll For Date : {currentDate}
        </h2>

        {/* Tables */}
        <div className="grid grid-cols-2 gap-4">
          <TableSection
            title="Notes Details"
            denominations={noteDenoms}
            type="Note"
            source={cashData.notes}
          />
          <TableSection
            title="Coins Details"
            denominations={coinDenoms}
            type="Coin"
            source={cashData.coins}
          />
        </div>

        {/* Totals Section */}
        <div className="mt-6 text-sm font-semibold space-y-1">
          <div>Notes Total : ₹{notesTotal.toFixed(2)}</div>
          <div>Coins Total : ₹{coinsTotal.toFixed(2)}</div>

          <hr className="border-black my-2" />

          <div className="text-base font-bold">
            Grand Total : ₹{grandTotal.toFixed(2)}
          </div>

          {/* <div className="mt-3">Physical Cash : ₹{physicalCash.toFixed(2)}</div>
          <div>Software Cash : ₹{softwareCash.toFixed(2)}</div>

          <div className="font-bold">Difference : ₹{difference.toFixed(2)}</div>

          <div className={`font-bold ${statusColor}`}>
            Status : {cashData.status}
          </div> */}
        </div>
      </div>
</div>
     
    </div>
  );
};

export default Print_Cash_Balance;
