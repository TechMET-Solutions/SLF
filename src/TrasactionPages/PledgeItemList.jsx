import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { API } from "../api";
import { decryptData } from "../utils/cryptoHelper"; // adjust the import path as needed

const PledgeItemList = ({ rows, setRows, selectedScheme }) => {
  console.log(selectedScheme,"selectedScheme ")
  const [pledgeItems, setPledgeItems] = useState([]); // dynamic list of item names
const [goldRate, setGoldRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch latest gold rate
    const fetchGoldRate = async () => {
      try {
        const response = await axios.get(
          `${API}/Master/Master_Profile/latest-gold-rate`
        );
        // Store data in state
        setGoldRate(response.data.data); // `data.data` because your API returns { data: rows }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching latest gold rate:", err);
        setError("Failed to fetch gold rate");
        setLoading(false);
      }
    };

    fetchGoldRate();
  }, []);
  // 🧩 Fetch & decrypt items from API
  useEffect(() => {
    const fetchPledgeItems = async () => {
      try {
        const response = await axios.get(
          `${API}/Master/Master_Profile/all_Item`
        );

        if (response.data?.data) {
          const decrypted = decryptData(response.data.data);
          console.log("🔓 Decrypted Data:", decrypted);

          // Extract only item names from decrypted.items
          const names = decrypted?.items?.map((item) => item.name) || [];
          setPledgeItems(names);
        } else {
          console.warn("⚠️ No data found from API");
        }
      } catch (error) {
        console.error("❌ Error fetching pledge items:", error);
      }
    };

    fetchPledgeItems();
  }, []);

  // 🧩 Add new row
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      particular: "",
      nos: rows.length + 1,
      gross: "",
      netWeight: "",
      purity: "",
      rate: "",
      valuation: "",
      remark: "",
    };
    setRows([...rows, newRow]);
  };
 const [purities, setPurities] = useState([]);
console.log(purities,"purities")
  // Fetch purities
 useEffect(() => {
  const fetchPurities = async () => {
    try {
      const res = await axios.get(`${API}/Master/getall-purity`);
      const decrypted = decryptData(res.data.data); // remove JSON.parse
      setPurities(decrypted.items); // decrypted is already an object
    } catch (err) {
      console.error("Error fetching purities:", err);
    }
  };
  fetchPurities();
 }, []);





  // 🧩 Delete row
  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };
// Assuming you have goldRate, purities, selectedScheme, and rows

  const calculateRate = (purityName) => {
    debugger
  
  // Check if any data is missing
  if (!goldRate || !goldRate.gold_rate || !selectedScheme || !purityName) return 0;

  // Convert gold_rate string to number
  const rateValue = parseFloat(goldRate.gold_rate);

  // Approved gold price per gram
  const approvedGoldPrice =
    rateValue * (parseFloat(selectedScheme.goldApprovePercent) / 100);

  // Convert purity name like "22k" to number
  const purityValue = parseInt(purityName.replace("k", "").trim());
  if (isNaN(purityValue)) return 0;

  // Calculate rate based on purity
  const rate = (purityValue / 24) * approvedGoldPrice;

  return rate;
};



  const handleChange = (index, field, value) => {
    debugger
  const updatedRows = [...rows];

  // Convert value to number if it's numeric
  const numericValue = field === "gross" || field === "netWeight" ? parseFloat(value) || 0 : value;

  if (field === "netWeight") {
    // Ensure netWeight is less than or equal to gross
    if (numericValue > updatedRows[index].gross) {
      alert("Net Weight cannot be greater than Gross");
      return;
    }
  }

  // Update the value
  updatedRows[index][field] = numericValue;

  // If purity changes, recalculate rate & valuation
  if (field === "purity" || field === "netWeight") {
    const rate = updatedRows[index].purity ? calculateRate(updatedRows[index].purity) : 0;
    updatedRows[index].rate = rate;
    updatedRows[index].valuation = updatedRows[index].netWeight
  ? Math.round(updatedRows[index].netWeight * rate)
  : 0;

  }

  setRows(updatedRows);
};



  const totalGross = rows.reduce(
    (sum, row) => sum + parseFloat(row.gross || 0),
    0
  );
  const totalNetWeight = rows.reduce(
    (sum, row) => sum + parseFloat(row.netWeight || 0),
    0
  );
  const totalValuation = rows.reduce(
    (sum, row) => sum + parseFloat(row.valuation || 0),
    0
  );

  const finalData = {
    rows,
    totals: {
      gross: totalGross,
      netWeight: totalNetWeight,
      valuation: totalValuation,
    },
  };

  return (
    <div className="flex mb-6">
      <div className="">
        <h3 className="font-semibold mb-4 text-blue-900 text-lg">
          Pledge Item List For Gold
        </h3>

        <table className="   text-sm">
          <thead className="bg-[#0A2478] text-white">
            <tr>
              <th className="px-4 py-2 border-r border-gray-200 w-[200px]">Particulars</th>
              <th className="px-4 py-2 border-r border-gray-200 w-[50px]">Nos.</th>
              <th className="px-4 py-2 border-r border-gray-200  w-[80px]">Gross</th>
              <th className="px-4 py-2 border-r border-gray-200   w-[80px]">Net Weight</th>
              <th className="px-4 py-2 border-r border-gray-200 w-[120px]">Purity</th>
               <th className="px-4 py-2 border-r border-gray-200 w-[120px]">Calculated Purity</th>
              <th className="px-4 py-2 border-r border-gray-200">Rate</th>
               <th className="px-4 py-2 border-r border-gray-200">Rate</th>
              <th className="px-4 py-2 border-r border-gray-200">Valuation</th>
              <th className="px-4 py-2">Remark</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {rows.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2">
                  <select
                    value={row.particular}
                    onChange={(e) =>
                      handleChange(index, "particular", e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 w-[200px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Particular</option>
                    {pledgeItems.map((item, idx) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-2 text-center">{index + 1}</td>

                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.gross}
                    onChange={(e) =>
                      handleChange(index, "gross", e.target.value)
                    }
                    style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                    className="border border-gray-300 rounded-md px-2 py-1  w-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  />
                </td>

                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.netWeight}
                    onChange={(e) =>
                      handleChange(index, "netWeight", e.target.value)
                    }
                    style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                    className="border border-gray-300 rounded-md px-2 py-1   w-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  />
                </td>

               <td className="px-4 py-2">
  <select
    value={row.purity}
    onChange={(e) => handleChange(index, "purity", e.target.value)}
    className="border border-gray-300 rounded-md px-2 py-1 w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
  >
    <option value="">Select Purity</option>
    {purities.map((p) => (
      <option key={p.id} value={p.purity_name}>
        {p.loan_type} {p.purity_name}
      </option>
    ))}
  </select>
</td>

                
               <td className="px-4 py-2">
  <select
    value={row.Calculated_Purity}
    onChange={(e) => handleChange(index, "Calculated_Purity", e.target.value)}
    className="border border-gray-300 rounded-md px-2 py-1 w-[120px]  focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
  >
    <option value="">Select Calculated Purity</option>
    {purities.map((p) => (
      <option key={p.id} value={p.purity_name}>
        {p.loan_type} {p.purity_name}
      </option>
    ))}
  </select>
</td>
              <td className="px-4 py-2 text-center">
  {row.purity ? calculateRate(row.purity).toFixed(2) : "—"}
</td>
                <td className="px-4 py-2 text-center">
                  {row.valuation ? row.valuation.toLocaleString() : "—"}
                </td>

                <td className="px-4 py-2 flex justify-between items-center">
                  <input
                    type="text"
                    value={row.remark}
                    onChange={(e) =>
                      handleChange(index, "remark", e.target.value)
                    }
                    placeholder="Enter remark"
                    className="border border-gray-300 rounded-md px-2 py-1 w-[180px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  />
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={handleAddRow}
                      className="w-[24px] h-[24px] bg-[#0A2478] p-1 rounded-[3.22px]"
                    >
                      <IoMdAddCircleOutline className="text-white w-[18px] h-[18px]" />
                    </button>
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      className="w-[24px] h-[24px] bg-[#F11717] p-1 rounded-[3.22px]"
                    >
                      <MdOutlineCancel className="text-white w-[18px] h-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            <tr className="border-t border-gray-200 font-semibold bg-gray-100">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2 text-center">{rows.length}</td>
              <td className="px-4 py-2 text-center">{totalGross.toFixed(2)}</td>
              <td className="px-4 py-2 text-center">
                {totalNetWeight.toFixed(2)}
              </td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
               <td className="px-4 py-2"></td>
              <td className="px-4 py-2 text-center">
                {totalValuation.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PledgeItemList;
