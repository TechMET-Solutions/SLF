import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { API } from "../api";
import { usePermission } from "../API/Context/PermissionContext";
import { decryptData } from "../utils/cryptoHelper"; // adjust the import path as needed

const PledgeItemList = ({ rows, setRows, selectedScheme }) => {
  console.log(rows, "rows ");
  const [pledgeItems, setPledgeItems] = useState([]); // dynamic list of item names
  const [goldRate, setGoldRate] = useState(null);
  console.log(goldRate, "goldRate");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const { permissions, userData } = usePermission();
  useEffect(() => {
    // Fetch latest gold rate
    const fetchGoldRate = async () => {
      try {
        const response = await axios.get(
          `${API}/Master/Master_Profile/latest-gold-rate`,
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
          `${API}/Master/Master_Profile/all_Item`,
        );

        if (response.data?.data) {
          const decrypted = decryptData(response.data.data);
          console.log("🔓 Decrypted Data:", decrypted);

          // 1. Get the array of items (assuming it's decrypted.items or decrypted itself)
          const allItems = decrypted?.items || decrypted || [];

          // 2. Filter to get only "gold" items, then map to get names
          const goldItemNames = allItems
            .filter((item) => item.code.toLowerCase().includes("gold")) // Filters 'gold', 'gold1', etc.
            .map((item) => item.name);

          console.log("✨ Filtered Gold Items:", goldItemNames);

          setPledgeItems(goldItemNames);
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
  console.log(purities, "purities");
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
  // const calculateRate = (purityName) => {
  //   // Check if any data is missing
  //   if (!goldRate || !goldRate.gold_rate || !selectedScheme || !purityName) {
  //     return { rate: 0, actualRate: 0 };
  //   }

  //   // Convert gold_rate string to number
  //   const rateValue = parseFloat(goldRate.gold_rate);
  //   const actualRateValue = parseFloat(goldRate.actual_rate);

  //   // Approved gold price per gram
  //   const approvedGoldPrice =
  //     rateValue * (parseFloat(selectedScheme.goldApprovePercent) / 100);

  //   const approvedGoldPriceForActualRate =
  //     actualRateValue * (parseFloat(selectedScheme.goldApprovePercent) / 100);

  //   // Convert purity name like "22k" to number
  //   const purityValue = parseInt(purityName.replace("k", "").trim());
  //   if (isNaN(purityValue)) {
  //     return { rate: 0, actualRate: 0 };
  //   }

  //   // Calculate rates
  //   const rate = (purityValue / 24) * approvedGoldPrice;
  //   const actualRate = (purityValue / 24) * approvedGoldPriceForActualRate;

  //   return {
  //     rate: Math.round(rate), // no decimal
  //     actualRate: Math.round(actualRate),
  //   };
  // };
  const calculateRate = (purityPercent) => {
    debugger;
    if (!goldRate || !selectedScheme || !purityPercent) {
      return { rate: 0, actualRate: 0 };
    }

    const goldRateValue = parseFloat(goldRate.gold_rate) || 0;
    const actualGoldRateValue = parseFloat(goldRate.actual_rate) || 0;
    const approvePercent =
      parseFloat(selectedScheme.goldApprovePercent) / 100 || 0;

    const approvedGoldPrice = goldRateValue * approvePercent;
    const approvedActualPrice = actualGoldRateValue * approvePercent;

    // ✅ MAIN FIX: USE PERCENTAGE
    const rate = (purityPercent / 100) * approvedGoldPrice;
    const actualRate = (purityPercent / 100) * approvedActualPrice;

    return {
      rate: Math.round(rate),
      actualRate: Math.round(actualRate),
    };
  };
  const totalGross = rows.reduce(
    (sum, row) => sum + parseFloat(row.gross || 0),
    0,
  );
  const totalNetWeight = rows.reduce(
    (sum, row) => sum + parseFloat(row.netWeight || 0),
    0,
  );
  const totalValuation = rows.reduce(
    (sum, row) => sum + parseFloat(row.valuation || 0),
    0,
  );

  const finalData = {
    rows,
    totals: {
      gross: totalGross,
      netWeight: totalNetWeight,
      valuation: totalValuation,
    },
  };
 
  const handleChange = (index, field, value) => {
    debugger;
    const updatedRows = [...rows];

    const currentRow = updatedRows[index];

    // Numeric fields
    const numericFields = ["gross", "netWeight", "nos"];

    let updatedValue = numericFields.includes(field)
      ? parseFloat(value) || 0
      : value;

    // ❌ Validation: Net weight > gross
    if (field === "netWeight" && updatedValue > (currentRow.gross || 0)) {
      alert("Net Weight cannot be greater than Gross");
      return;
    }

    // ✅ Handle purity separately (OBJECT SUPPORT)
    if (field === "purity") {
      currentRow.purity = value?.purity_name || "";
      currentRow.purityPercent = parseFloat(value?.purity_percent) || 0;
    } else {
      currentRow[field] = updatedValue;
    }

    // ✅ Recalculate when needed
    if (field === "purity" || field === "netWeight" || field === "nos") {
      const purityPercent = currentRow.purityPercent || 0;

      const { rate = 0, actualRate = 0 } =
        purityPercent > 0
          ? calculateRate(purityPercent)
          : { rate: 0, actualRate: 0 };

      currentRow.rate = rate;
      currentRow.actualRate = actualRate;
      updatedRows[index].rate = rate;
      updatedRows[index].actualRate = actualRate;
      const quantity = parseFloat(currentRow.nos) || 0;
      const weight = parseFloat(currentRow.netWeight) || 0;

      updatedRows[index].valuation = Math.round(quantity * weight * actualRate);
      updatedRows[index].actualValuation = Math.round(
        quantity * weight * actualRate,
      );
    }

    setRows(updatedRows);
  };

  return (
    <div className="flex ">
      <div className="">
        {/* <h3 className="font-semibold mb-4 text-blue-900 text-lg">
         
        </h3> */}

        <table className="   text-xs">
          <thead className="bg-[#0A2478] text-white">
            <tr>
              <th className="px-4 py-2 border-r border-gray-200 w-[200px]">
                {" "}
                Pledge Item List For Gold
              </th>
              <th className="px-4 py-2 border-r border-gray-200 w-[100px]">
                Nos.
              </th>
              <th className="px-4 py-2 border-r border-gray-200  w-[100px]">
                Gross
              </th>
              <th className="px-4 py-2 border-r border-gray-200   w-[100px]">
                Net Weight
              </th>
              <th className="px-4 py-2 border-r border-gray-200 w-[180px]">
                {" "}
                Actual Purity
              </th>
              {isEditing && (
                <th className="px-4 py-2 border-r border-gray-200 w-[120px]">
                  Assigned Purity
                </th>
              )}

              <th className="px-4 py-2 border-r border-gray-200">
                Funding Rate
              </th>
              <th className="px-4 py-2 border-r border-gray-200">
                {" "}
                Actual Rate
              </th>
              <th className="px-4 py-2 border-r border-gray-200">Valuation</th>
              <th className="px-4 py-2">Remark</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
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

                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.nos}
                    onChange={(e) => handleChange(index, "nos", e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 w-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  />
                </td>

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
                    className="border border-gray-300 rounded-md px-2 py-1   w-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  />
                </td>

                <td className="px-4 py-2 ">
                  <select
                    value={row.purity}
                    onChange={(e) => {
                      const selected = purities.find(
                        (p) => p.purity_name === e.target.value,
                      );
                      handleChange(index, "purity", selected);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 w-[120px]"
                  >
                    <option value="">Select Purity</option>
                    {purities.map((p) => (
                      <option key={p.id} value={p.purity_name}>
                        {p.loan_type} {p.purity_name}
                      </option>
                    ))}
                  </select>
                  {(userData?.isAdmin ||
                    permissions?.Transaction?.find(
                      (item) => item.name === "Add Loan Application",
                    )?.AssignedPurity) && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-500 ml-[8px]"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                </td>

                {isEditing && (
                  <td className="px-4 py-2 flex justify-center">
                    <select
                      value={selectedValue}
                      autoFocus
                      onChange={(e) => {
                        setSelectedValue(e.target.value);
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 w-[120px] h-[30px] text-xs bg-white"
                    >
                      <option value="">Select</option>
                      {purities.map((p) => (
                        <option key={p.id} value={p.purity_name}>
                          {p.loan_type} {p.purity_name}
                        </option>
                      ))}
                    </select>
                  </td>
                )}
                <td className="px-4 py-2 text-center">
                  {row.rate ? row.rate.toFixed(2) : "—"}
                </td>

                <td className="px-4 py-2 text-center">
                  {row.actualRate ? row.actualRate.toFixed(2) : "—"}
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
              {isEditing && <td className="px-4 py-2"></td>}

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
