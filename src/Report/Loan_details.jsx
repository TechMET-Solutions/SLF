import { useEffect, useState } from "react";

const LoanDetails = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States based on UI
  const [fromDate, setFromDate] = useState("2017-04-01");
const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const [selectedScheme, setSelectedScheme] = useState("");
  const [reportType, setReportType] = useState("Loan Details");
  const [status, setStatus] = useState("Pending");
  const [partySearch, setPartySearch] = useState("");
  const [partyList, setPartyList] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");
const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10",
        );
        const result = await response.json();
        setSchemes(result.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schemes:", error);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);
  const handleView = async () => {
    const res = await fetch(
      `https://slunawat.co.in/api/Reports/loan-detail-report?fromDate=${fromDate}&toDate=${toDate}&schemeId=${selectedScheme}&status=${status}&party=${selectedParty}`,
    );
    const data = await res.json();
      console.log(data.data);
      setRows(data.data || []);
    // इथे पुढे table मध्ये map कराल
  };

  useEffect(() => {
    const fetchParties = async () => {
      if (!selectedScheme || !partySearch) {
        setPartyList([]);
        return;
      }

      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/legal-parties?schemeId=${selectedScheme}&party=${partySearch}`,
        );
        const data = await res.json();
        setPartyList(data.data || []);
      } catch (e) {
        console.error(e);
      }
    };

    const t = setTimeout(fetchParties, 300);
    return () => clearTimeout(t);
  }, [selectedScheme, partySearch]);

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[11px]">
      <div className="m-3 border border-gray-300 bg-white shadow-md">
        {/* Header Section */}
        <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
          Loan Detail Report
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-white border-b border-gray-200 space-y-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium min-w-[60px]">
                From Date
              </label>
              <div className="flex border border-gray-300">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="px-2 py-1 outline-none w-32"
                />
                {/* <button className="bg-[#8c4b2d] px-2 text-white">📅</button> */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">To Date</label>
              <div className="flex border border-gray-300">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="px-2 py-1 outline-none w-32"
                />
                {/* <button className="bg-[#8c4b2d] px-2 text-white">📅</button> */}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium min-w-[60px]">
              Scheme
            </label>
            <select
              className="border border-gray-300 px-2 py-1 w-64 outline-none bg-white"
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
            >
              <option value="">Select Scheme</option>
              {schemes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.schemeName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 relative">
            <label className="text-gray-700 font-medium min-w-[60px]">
              Party Name
            </label>

            <div className="relative w-64">
              <input
                type="text"
                value={partySearch}
                onChange={(e) => {
                  setPartySearch(e.target.value);
                  setSelectedParty("");
                }}
                disabled={!selectedScheme}
                placeholder={
                  selectedScheme ? "Type party name..." : "Select Scheme First"
                }
                className="border border-gray-300 px-2 py-1 w-full outline-none bg-white disabled:bg-gray-100"
              />

              {partyList.length > 0 && (
                <div className="absolute z-20 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                  {partyList.map((p, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        setSelectedParty(p.Print_Name);
                        setPartySearch(p.Print_Name);
                        setPartyList([]);
                      }}
                    >
                      {p.Print_Name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Radio Button Options */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-4">
              {["Item Details", "Loan Details", "Loan Summary"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="reportType"
                    checked={reportType === type}
                    onChange={() => setReportType(type)}
                    className="w-3 h-3"
                  />
                  {type}
                </label>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {["All", "Pending", "Closed"].map((stat) => (
                <label
                  key={stat}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    checked={status === stat}
                    onChange={() => setStatus(stat)}
                    className="w-3 h-3"
                  />
                  {stat}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-3 py-2 flex justify-between items-center bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1">
            <button
              className="bg-[#005da3] text-white px-8 py-1 flex items-center gap-2 text-[12px] hover:bg-blue-800 shadow-sm"
              onClick={handleView}
            >
              💾 View
            </button>
            <button className="bg-[#005da3] text-white px-8 py-1 flex items-center gap-2 text-[12px] hover:bg-blue-800 shadow-sm">
              ✖ Exit
            </button>
          </div>
          <div className="flex gap-1">
            <button className="bg-[#005da3] text-white p-1 rounded shadow-sm">
              🖨️
            </button>
            <button className="bg-[#005da3] text-white p-1 rounded shadow-sm">
              📄
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full border-collapse text-[10px]">
            <thead className="bg-[#e9e4db] border-b border-gray-400 sticky top-0">
              <tr className="text-left text-gray-700">
                {reportType === "Loan Details" &&
                  [
                    "SNo",
                    "Branch",
                    "Loan No",
                    "Loan Date",
                    "Scheme Name",
                    "Party Name",
                    "Co Borrower",
                    "Mobile",
                    "Address",
                    "Particular",
                    "Quantity",
                    "Gross",
                    "Net Weight",
                    "Loan Amount",
                    "Close Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="border-r border-gray-300 p-1 font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}

                {reportType === "Loan Summary" &&
                  [
                    "SNo",
                    "Branch",
                    "Loan No",
                    "Loan Date",
                    "Particular",
                    "Quantity",
                    "Gross",
                    "Net Weight",
                    "Loan Amount",
                    "Close Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="border-r border-gray-300 p-1 font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  {reportType === "Loan Details" && (
                    <>
                      <td className="border-r p-1">{i + 1}</td>
                      <td className="border-r p-1">Bhagur B1 [01]</td>
                      <td className="border-r p-1">{row.id}</td>
                      <td className="border-r p-1">
                        {row.created_at?.slice(0, 10)}
                      </td>
                      <td className="border-r p-1">{row.Scheme}</td>
                      <td className="border-r p-1">{row.Print_Name}</td>
                      <td className="border-r p-1">
                        {row.Co_Borrower || "Self"}
                      </td>
                      <td className="border-r p-1">{row.Mobile_Number}</td>
                      <td className="border-r p-1">{row.Address || ""}</td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.particular}
                      </td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.nos}
                      </td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.gross}
                      </td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.netWeight}
                      </td>
                      <td className="border-r p-1 text-right">
                        {row.Loan_amount}
                      </td>
                      <td className="p-1">{row.CloseDate || ""}</td>
                    </>
                  )}

                  {reportType === "Loan Summary" && (
                    <>
                      <td className="border-r p-1">{i + 1}</td>
                      <td className="border-r p-1">Bhagur B1 [01]</td>
                      <td className="border-r p-1">{row.id}</td>
                      <td className="border-r p-1">
                        {row.created_at?.slice(0, 10)}
                      </td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.particular}
                      </td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.nos}
                      </td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.gross}
                      </td>
                      <td className="border-r p-1">
                        {row.Pledge_Item_List?.[0]?.netWeight}
                      </td>
                      <td className="border-r p-1 text-right">
                        {row.Loan_amount}
                      </td>
                      <td className="p-1">{row.CloseDate || ""}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
