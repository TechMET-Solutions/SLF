import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const PledgeItemList = ({rows,setRows}) => {
  const pledgeItems = [
    "Gold Item",
    "Silver Item",
    "Silver Kade",
    "Silver Tolbandi",
    "Kamar-Patta / Kandora",
    "NATHANI",
    "Bajuband",
    "Mix",
    "SHORT GANTHAN",
    "BOR-MALA",
    "BINDI",
    "KADA",
    "VAZATIK",
    "PENDANT (SHIKKA)",
    "THUSHI (Lakhi)",
    "Gof-chain",
    "RANIHAR",
    "BALYA",
    "LAXMIHAR",
    "TOPS / ZUBE",
    "POHEHAR",
    "LATKAN",
    "MO.MAL",
    "LOOSE ITEM",
    "BUGDI",
    "TOPS, LATKAN",
    "GANTHAN",
    "VEDHA",
    "TOPS",
    "GATHALA",
    "KANCHAIN",
    "DHAGAPOT",
  ];

 

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

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Auto calculate rate and valuation
    if (field === "purity" || field === "netWeight") {
      const rateMap = {
        "20K": 6000,
        "22K": 6200,
        "24K": 6400,
      };
      const rate = rateMap[updatedRows[index].purity] || "";
      const netWeight = parseFloat(updatedRows[index].netWeight || 0);
      const valuation = rate ? rate * netWeight : "";
      updatedRows[index].rate = rate;
      updatedRows[index].valuation = valuation;
    }

    setRows(updatedRows);
  };

  // ✅ Calculate Totals
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

  // ✅ Combine data + totals
  const finalData = {
    rows,
    totals: {
      gross: totalGross,
      netWeight: totalNetWeight,
      valuation: totalValuation,
    },
  };

  return (
    <div className="flex  mb-6">
      <div className="w-[1320px]">
        <h3 className="font-semibold mb-4 text-blue-900 text-lg">
          Pledge Item List
        </h3>

        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-[#0A2478] text-white">
            <tr>
              <th className="px-4 py-2 border-r border-gray-200">Particulars</th>
              <th className="px-4 py-2 border-r border-gray-200">Nos.</th>
              <th className="px-4 py-2 border-r border-gray-200">Gross</th>
              <th className="px-4 py-2 border-r border-gray-200">Net Weight</th>
              <th className="px-4 py-2 border-r border-gray-200">Purity</th>
              <th className="px-4 py-2 border-r border-gray-200">Rate</th>
              <th className="px-4 py-2 border-r border-gray-200">Valuation</th>
              <th className="px-4 py-2">Remark</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {rows.map((row, index) => (
              <tr key={row.id} className="border-t border-gray-200">
                <td className="px-4 py-2">
                  <select
                    value={row.particular}
                    onChange={(e) =>
                      handleChange(index, "particular", e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 w-[200px] focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    className="border border-gray-300 rounded-md px-2 py-1 w-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>

                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.netWeight}
                    onChange={(e) =>
                      handleChange(index, "netWeight", e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 w-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>

                <td className="px-4 py-2">
                  <select
                    value={row.purity}
                    onChange={(e) =>
                      handleChange(index, "purity", e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Purity</option>
                    <option value="20K">Gold 20K</option>
                    <option value="22K">Gold 22K</option>
                    <option value="24K">Gold 24K</option>
                  </select>
                </td>

                <td className="px-4 py-2 text-center">{row.rate || "—"}</td>

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
                    className="border border-gray-300 rounded-md px-2 py-1 w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500"
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

            {/* ✅ Total Row */}
            <tr className="border-t border-gray-200 font-semibold bg-gray-100">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2 text-center">{rows.length}</td>
              <td className="px-4 py-2 text-center">{totalGross.toFixed(2)}</td>
              <td className="px-4 py-2 text-center">
                {totalNetWeight.toFixed(2)}
              </td>
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

        {/* ✅ JSON output showing totals too */}
        {/* <pre className="mt-4 bg-gray-100 p-3 rounded">
          {JSON.stringify(finalData, null, 2)}
        </pre> */}
      </div>
    </div>
  );
};

export default PledgeItemList;
