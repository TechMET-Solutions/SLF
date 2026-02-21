import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { API } from "../api";
import { decryptData } from "../utils/cryptoHelper";

const PledgeItemListSilver = ({ rows, setRows, selectedScheme }) => {

  const [pledgeItems, setPledgeItems] = useState([]);
  const [silverRateData, setSilverRateData] = useState(null);
  const [purities, setPurities] = useState([]);
  console.log(silverRateData, "silverRateData")
  console.log(purities,"purities")
  // ╔══════════════════════════════════╗
  //   FETCH LATEST SILVER RATE
  // ╚══════════════════════════════════╝
  useEffect(() => {
    const fetchSilverRate = async () => {
      try {
        const res = await axios.get(`${API}/Master/Master_Profile/latest-Silver-rate`);
       setSilverRateData(res.data.data);  // Example: { silver_rate: "200" }
      } catch (err) {
        console.error("Error fetching silver rate", err);
      }
    };
    fetchSilverRate();
  }, []);


  // ╔══════════════════════════════════╗
  //   FETCH PURITY LIST
  // ╚══════════════════════════════════╝
  useEffect(() => {
    const fetchPurities = async () => {
      try {
        const res = await axios.get(`${API}/Master/getall-purity-silver`);
        const decrypted = decryptData(res.data.data);
        setPurities(decrypted.items); // purity_name & purity_percent
      } catch (err) {
        console.error("Error fetching purities", err);
      }
    };
    fetchPurities();
  }, []);


  // ╔══════════════════════════════════╗
  //   FETCH PLEDGE ITEM NAMES
  // ╚══════════════════════════════════╝
  useEffect(() => {
    const fetchPledgeItems = async () => {
      try {
        const res = await axios.get(`${API}/Master/Master_Profile/all_Item`);
        const decrypted = decryptData(res.data.data);
        const names = decrypted?.items?.map((item) => item.name) || [];
        setPledgeItems(names);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchPledgeItems();
  }, []);

  // ╔══════════════════════════════════╗
  //   ADD NEW ROW
  // ╚══════════════════════════════════╝
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


  // ╔══════════════════════════════════╗
  //   SILVER RATE CALCULATION
  // ╚══════════════════════════════════╝
   const calculateRate = (purityName) => {
debugger
  if (!silverRateData || !silverRateData.Silver_rate) {
    console.log("❌ Silver Rate Missing!");
    return 0;
  }

  if (!selectedScheme || !selectedScheme.goldApprovePercent) {
    console.log("❌ Approve Percent Missing!");
    return 0;
  }

  if (!purityName) {
    console.log("❌ Purity Missing!");
    return 0;
  }

  const baseSilverRate = Number(silverRateData.Silver_rate); // FIXED
  const approvePercent = Number(selectedScheme.goldApprovePercent);

  const approvedSilverRate = baseSilverRate * (approvePercent / 100);

  // Find selected purity row
  const purityObj = purities.find(
    (p) => String(p.purity_name) === String(purityName)
  );

  if (!purityObj) {
    console.log("❌ Purity Not Found!");
    return 0;
  }

  const purityPercent = Number(purityObj.purity_percent);

  if (isNaN(purityPercent)) {
    console.log("❌ Purity Percent Invalid!");
    return 0;
  }

  // Final rate formula
  const rate = (approvedSilverRate * purityPercent) / 100;

  return isNaN(rate) ? 0 : rate;
};

  const calculateActualRate = (purityName) => {
debugger
  if (!silverRateData || !silverRateData.actual_rate) {
    console.log("❌ Silver Rate Missing!");
    return 0;
  }

  if (!selectedScheme || !selectedScheme.goldApprovePercent) {
    console.log("❌ Approve Percent Missing!");
    return 0;
  }

  if (!purityName) {
    console.log("❌ Purity Missing!");
    return 0;
  }

  const baseSilverRate = Number(silverRateData.actual_rate); // FIXED
  const approvePercent = Number(selectedScheme.goldApprovePercent);

  const approvedSilverRate = baseSilverRate * (approvePercent / 100);

  // Find selected purity row
  const purityObj = purities.find(
    (p) => String(p.purity_name) === String(purityName)
  );

  if (!purityObj) {
    console.log("❌ Purity Not Found!");
    return 0;
  }

  const purityPercent = Number(purityObj.purity_percent);

  if (isNaN(purityPercent)) {
    console.log("❌ Purity Percent Invalid!");
    return 0;
  }

  // Final rate formula
  const rate = (approvedSilverRate * purityPercent) / 100;

  return isNaN(rate) ? 0 : rate;
};


  // ╔══════════════════════════════════╗
  //   UPDATE FIELD VALUES
  // ╚══════════════════════════════════╝
  const handleChange = (index, field, value) => {
    debugger
    const updatedRows = [...rows];

    // Convert numeric fields
    const numericValue = ["gross", "netWeight"].includes(field)
      ? parseFloat(value) || 0
      : value;

    // Validation: Net Weight <= Gross
    if (field === "netWeight" && numericValue > updatedRows[index].gross) {
      alert("Net Weight cannot be greater than Gross");
      return;
    }

    updatedRows[index][field] = numericValue;

    // Recalculate rate & valuation
    if (field === "purity" || field === "netWeight") {
      const rate = updatedRows[index].purity
        ? calculateRate(updatedRows[index].purity)
        : 0;

      updatedRows[index].rate = rate;
      updatedRows[index].valuation =
        updatedRows[index].netWeight * rate || 0;
    }

    setRows(updatedRows);
  };


  // ╔══════════════════════════════════╗
  //   DELETE ROW
  // ╚══════════════════════════════════╝
  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };


  // ╔══════════════════════════════════╗
  //   TOTAL CALCULATIONS
  // ╚══════════════════════════════════╝
  const totalGross = rows.reduce((sum, r) => sum + (parseFloat(r.gross) || 0), 0);
  const totalNetWeight = rows.reduce((sum, r) => sum + (parseFloat(r.netWeight) || 0), 0);
  const totalValuation = rows.reduce((sum, r) => sum + (parseFloat(r.valuation) || 0), 0);


  // ╔══════════════════════════════════╗
  //   RENDER UI
  // ╚══════════════════════════════════╝
  return (
    <div className="flex mb-6">
      <div className="">
        <h3 className="font-semibold mb-4 text-blue-900 text-lg">
          Pledge Item List For Silver
        </h3>

        <table className=" text-sm">
          <thead className="bg-[#0A2478] text-white">
             <tr>
              <th className="px-4 py-2 border-r border-gray-200 w-[200px]">Particulars</th>
              <th className="px-4 py-2 border-r border-gray-200 w-[50px]">Nos.</th>
              <th className="px-4 py-2 border-r border-gray-200  w-[80px]">Gross</th>
              <th className="px-4 py-2 border-r border-gray-200   w-[80px]">Net Weight</th>
              <th className="px-4 py-2 border-r border-gray-200 w-[80px]">Purity</th>
               <th className="px-4 py-2 border-r border-gray-200 w-[120px]">Calculated Purity</th>
              <th className="px-4 py-2 border-r border-gray-200">System Rate</th>
               <th className="px-4 py-2 border-r border-gray-200">Actual Rate</th>
              <th className="px-4 py-2 border-r border-gray-200">Valuation</th>
              <th className="px-4 py-2">Remark</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-t">
                <td className="px-4 py-2">
                  <select
                    value={row.particular}
                    onChange={(e) => handleChange(index, "particular", e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded-md w-[180px] bg-white"
                  >
                    <option value="">Select Particular</option>
                    {pledgeItems.map((item, idx) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="text-center">{index + 1}</td>

                <td className="">
                  <input
                    type="number"
                    value={row.gross}
                    onChange={(e) => handleChange(index, "gross", e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1  w-[50px] bg-white "
                  />
                </td>

                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.netWeight}
                    onChange={(e) => handleChange(index, "netWeight", e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1  w-[50px] bg-white"
                  />
                </td>

                <td className="px-4 py-2 w-[50px]">
                  <select
                    value={row.purity}
                    onChange={(e) => handleChange(index, "purity", e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded-md w-[120px] bg-white"
                  >
                    <option value="">Select Purity</option>
                    {purities.map((p) => (
                      <option key={p.id} value={p.purity_name}>
                        {p.loan_type} {p.purity_name}
                      </option>
                    ))}
                  </select>
                    </td>
                     <td className="px-4 py-2 w-[50px]">
                  <select
                    value={row.Calculated_Purity}
                    onChange={(e) => handleChange(index, "Calculated_Purity", e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded-md w-[120px] bg-white "
                  >
                    <option value="">Select Calculated Purity</option>
                    {purities.map((p) => (
                      <option key={p.id} value={p.Calculated_Purity}>
                        {p.loan_type} {p.purity_name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="text-center">
                  {row.purity ? calculateRate(row.purity).toFixed(2) : "—"}
                </td>

                <td className="text-center">
                  {row.purity ? calculateActualRate(row.purity).toFixed(2) : "—"}
                </td>

                <td className="text-center">
                  {row.valuation ? row.valuation.toLocaleString() : "—"}
                </td>

                <td className="px-4 py-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={row.remark}
                    placeholder="Enter remark"
                    onChange={(e) => handleChange(index, "remark", e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1  w-[200px] bg-white"
                  />
                  <button
                    onClick={handleAddRow}
                    className="w-[24px] bg-[#0A2478] p-1 rounded"
                  >
                    <IoMdAddCircleOutline className="text-white" />
                  </button>
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    className="w-[24px] bg-red-500 p-1 rounded"
                  >
                    <MdOutlineCancel className="text-white" />
                  </button>
                </td>
              </tr>
            ))}

            {/* TOTAL ROW */}
            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-2">Total</td>
              <td className="text-center">{rows.length}</td>
              <td className="text-center">{totalGross.toFixed(2)}</td>
              <td className="text-center">{totalNetWeight.toFixed(2)}</td>
              <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
              <td className="text-center">
                {totalValuation.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PledgeItemListSilver;
