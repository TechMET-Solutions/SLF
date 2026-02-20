import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

// Sub-component for the tables
const TableSection = ({ title, type, denominations, counts, onUpdate }) => (
  <div className="relative flex-1 border border-blue-900 p-2 pt-4 bg-white">
    <span className="absolute -top-3 left-3 bg-white px-1 text-blue-900 text-xs font-bold uppercase">
      {title}
    </span>
    <table className="w-full border-collapse text-[11px]">
      <thead>
        <tr className="bg-blue-900 text-white">
          <th className="border  p-1 text-left font-semibold border-r">Type</th>
          <th className="border  p-1 text-left font-semibold border-r">
            Denom.
          </th>
          <th className="border  p-1 text-center font-semibold w-[60px] border-r">
            Nos.
          </th>
          <th className="border  p-1 text-right font-semibold border-r">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {denominations.map((denom, index) => (
          <tr
            key={`${type}-${denom}`}
            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
          >
            <td className="border border-slate-200 p-1 px-2">{type}</td>
            <td className="border border-slate-200 p-1 px-2 font-medium">
              ₹{denom}
            </td>
            <td className="border border-slate-200 p-0.5">
              <input
                type="text"
                inputMode="numeric"
                className="w-full p-1 border border-gray-300 text-center text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={counts[denom] || ""}
                placeholder="0"
                onChange={(e) =>
                  onUpdate(denom, e.target.value, type.toLowerCase())
                }
              />
            </td>
            <td className="border border-slate-200 p-1 px-2 text-right font-semibold">
              {(Number(denom) * (Number(counts[denom]) || 0)).toLocaleString(
                "en-IN",
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Cash_Balance = () => {
  const navigate = useNavigate();

  // State
  const [noteCounts, setNoteCounts] = useState({
    10: "",
    20: "",
    50: "",
    100: "",
    200: "",
    500: "",
  });
  const [coinCounts, setCoinCounts] = useState({
    1: "",
    2: "",
    5: "",
    10: "",
    20: "",
  });
  // const [softwareCash] = useState(20000);
  const [softwareCash, setSoftwareCash] = useState(0);
  useEffect(() => {
    fetchSoftwareCash();
  }, []);

  const fetchSoftwareCash = async () => {
    try {
      const res = await axios.get(`${API}/cashBalance/latest-software`);

      setSoftwareCash(Number(res.data.software_cash || 0));
    } catch (err) {
      console.error("Error fetching software cash:", err);
    }
  };

  
  const noteDenoms = [500, 200, 100, 50, 20, 10];
  const coinDenoms = [20, 10, 5, 2, 1];

  const handleInputChange = (denom, value, type) => {
    if (value !== "" && !/^\d+$/.test(value)) return;
    const setter = type === "note" ? setNoteCounts : setCoinCounts;
    setter((prev) => ({ ...prev, [denom]: value }));
  };

  const calculateTotal = (counts) =>
    Object.entries(counts).reduce(
      (acc, [d, c]) => acc + Number(d) * (Number(c) || 0),
      0,
    );

  const subTotalNotes = calculateTotal(noteCounts);
  const subTotalCoins = calculateTotal(coinCounts);
  const physicalCash = subTotalNotes + subTotalCoins;
  const difference = physicalCash - softwareCash;

  // Status Logic
  const getStatus = () => {
    if (difference === 0) return { label: "MATCH", color: "text-green-600" };
    if (difference > 0) return { label: "EXTRA", color: "text-orange-500" };
    return { label: "SHORT", color: "text-red-600" };
  };

  const statusInfo = getStatus();

  const initialNoteState = {
    10: "",
    20: "",
    50: "",
    100: "",
    200: "",
    500: "",
  };

  const initialCoinState = {
    1: "",
    2: "",
    5: "",
    10: "",
    20: "",
  };

  const handleSaveCash = async () => {
    try {
      const cashData = {
        notes: noteCounts,
        coins: coinCounts,
        physicalCash,
        status: statusInfo.label,
        createdAt: new Date(),
      };

      await axios.post(`${API}/cashBalance/create`, cashData);

      alert("Saved Successfully");

      // ✅ RESET COUNTS
      setNoteCounts(initialNoteState);
      setCoinCounts(initialCoinState);
      fetchSoftwareCash();
    } catch (err) {
      alert("Error saving data");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-10">
      {/* Top Navbar */}
      <div className="flex justify-center pt-5 px-4">
        <div className="flex items-center px-6 py-3 w-full max-w-[1290px] bg-white border border-gray-200 rounded-xl shadow-sm justify-between">
          <h2 className="text-red-600 font-bold text-xl tracking-tight uppercase">
            Cash Balance
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/Print_Cash_Balance")}
              className="bg-blue-900 text-white px-5 py-2 rounded shadow-sm hover:bg-blue-800 transition-colors text-xs font-medium"
            >
              Print Cash Balance
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-red-700 text-white px-6 py-2 rounded shadow-sm hover:bg-red-800 transition-colors text-xs font-medium"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="ml-[110px] mr-[110px] mx-auto mt-6 px-4">
        <div className="bg-white border border-blue-900 shadow-md">
          {/* Internal Header */}
          <div className="bg-blue-900 text-white px-4 py-1.5 text-sm font-bold">
            Cash Scroll
          </div>

          <div className="p-5">
            {/* Tables Grid */}
            <div className="flex flex-col md:flex-row gap-6">
              <TableSection
                title="Notes"
                type="Note"
                denominations={noteDenoms}
                counts={noteCounts}
                onUpdate={handleInputChange}
              />
              <TableSection
                title="Coins"
                type="Coin"
                denominations={coinDenoms}
                counts={coinCounts}
                onUpdate={handleInputChange}
              />
            </div>

            {/* Summary Info Bar */}
            <div className="mt-6 flex flex-wrap justify-between items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="text-sm text-gray-700">
                Software Cash:{" "}
                <span className="font-bold text-gray-900">
                  ₹{softwareCash.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                Physical Cash:{" "}
                <span className="font-bold text-gray-900">
                  ₹{physicalCash.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                Difference:{" "}
                <span className="font-bold text-gray-900">
                  ₹{Math.abs(difference).toLocaleString("en-IN")}
                </span>
              </div>
              <div
                className={`text-sm font-black tracking-wider ${statusInfo.color}`}
              >
                STATUS: {statusInfo.label}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 flex flex-wrap justify-between items-end border-t pt-4 border-gray-100">
              <div className="bg-blue-900 text-white px-6 py-2 rounded-sm shadow-inner min-w-[200px]">
                <span className="text-[10px] block opacity-80 font-bold uppercase tracking-widest">
                  Grand Total
                </span>
                <span className="text-2xl font-bold">
                  ₹ {physicalCash.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveCash}
                  className="bg-blue-900 hover:bg-blue-900 text-white px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  Save Cash
                </button>
                {/* <button
                  onClick={() => navigate("/")}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  <span>✖</span> Exit
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cash_Balance;
