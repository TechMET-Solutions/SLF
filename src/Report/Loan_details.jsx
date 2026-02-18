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
    // <div className="min-h-screen bg-[#f0f2f5] font-sans text-[11px]">
    //   <div className="m-3 border border-gray-300 bg-white shadow-md">
    //     {/* Header Section */}
    //     <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
    //       Loan Detail Report
    //     </div>

    //     {/* Filter Toolbar */}
    //     <div className="p-4 bg-white border-b border-gray-200 space-y-3">
    //       <div className="flex items-center gap-6">
    //         <div className="flex items-center gap-2">
    //           <label className="text-gray-700 font-medium min-w-[60px]">
    //             From Date
    //           </label>
    //           <div className="flex border border-gray-300">
    //             <input
    //               type="date"
    //               value={fromDate}
    //               onChange={(e) => setFromDate(e.target.value)}
    //               className="px-2 py-1 outline-none w-32"
    //             />
    //             {/* <button className="bg-[#8c4b2d] px-2 text-white">📅</button> */}
    //           </div>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <label className="text-gray-700 font-medium">To Date</label>
    //           <div className="flex border border-gray-300">
    //             <input
    //               type="date"
    //               value={toDate}
    //               onChange={(e) => setToDate(e.target.value)}
    //               className="px-2 py-1 outline-none w-32"
    //             />
    //             {/* <button className="bg-[#8c4b2d] px-2 text-white">📅</button> */}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <label className="text-gray-700 font-medium min-w-[60px]">
    //           Scheme
    //         </label>
    //         <select
    //           className="border border-gray-300 px-2 py-1 w-64 outline-none bg-white"
    //           value={selectedScheme}
    //           onChange={(e) => setSelectedScheme(e.target.value)}
    //         >
    //           <option value="">Select Scheme</option>
    //           {schemes.map((s) => (
    //             <option key={s.id} value={s.id}>
    //               {s.schemeName}
    //             </option>
    //           ))}
    //         </select>
    //       </div>

    //       <div className="flex items-center gap-2 relative">
    //         <label className="text-gray-700 font-medium min-w-[60px]">
    //           Party Name
    //         </label>

    //         <div className="relative w-64">
    //           <input
    //             type="text"
    //             value={partySearch}
    //             onChange={(e) => {
    //               setPartySearch(e.target.value);
    //               setSelectedParty("");
    //             }}
    //             disabled={!selectedScheme}
    //             placeholder={
    //               selectedScheme ? "Type party name..." : "Select Scheme First"
    //             }
    //             className="border border-gray-300 px-2 py-1 w-full outline-none bg-white disabled:bg-gray-100"
    //           />

    //           {partyList.length > 0 && (
    //             <div className="absolute z-20 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
    //               {partyList.map((p, i) => (
    //                 <div
    //                   key={i}
    //                   className="px-2 py-1 cursor-pointer hover:bg-blue-100"
    //                   onClick={() => {
    //                     setSelectedParty(p.Print_Name);
    //                     setPartySearch(p.Print_Name);
    //                     setPartyList([]);
    //                   }}
    //                 >
    //                   {p.Print_Name}
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       {/* Radio Button Options */}
    //       <div className="flex flex-col gap-2 pt-1">
    //         <div className="flex items-center gap-4">
    //           {["Item Details", "Loan Details", "Loan Summary"].map((type) => (
    //             <label
    //               key={type}
    //               className="flex items-center gap-1 cursor-pointer"
    //             >
    //               <input
    //                 type="radio"
    //                 name="reportType"
    //                 checked={reportType === type}
    //                 onChange={() => setReportType(type)}
    //                 className="w-3 h-3"
    //               />
    //               {type}
    //             </label>
    //           ))}
    //         </div>
    //         <div className="flex items-center gap-4">
    //           {["All", "Pending", "Closed"].map((stat) => (
    //             <label
    //               key={stat}
    //               className="flex items-center gap-1 cursor-pointer"
    //             >
    //               <input
    //                 type="radio"
    //                 name="status"
    //                 checked={status === stat}
    //                 onChange={() => setStatus(stat)}
    //                 className="w-3 h-3"
    //               />
    //               {stat}
    //             </label>
    //           ))}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Action Buttons */}
    //     <div className="px-3 py-2 flex justify-between items-center bg-gray-50 border-b border-gray-200">
    //       <div className="flex gap-1">
    //         <button
    //           className="bg-[#005da3] text-white px-8 py-1 flex items-center gap-2 text-[12px] hover:bg-blue-800 shadow-sm"
    //           onClick={handleView}
    //         >
    //           💾 View
    //         </button>
    //         <button className="bg-[#005da3] text-white px-8 py-1 flex items-center gap-2 text-[12px] hover:bg-blue-800 shadow-sm">
    //           ✖ Exit
    //         </button>
    //       </div>
    //       <div className="flex gap-1">
    //         <button className="bg-[#005da3] text-white p-1 rounded shadow-sm">
    //           🖨️
    //         </button>
    //         <button className="bg-[#005da3] text-white p-1 rounded shadow-sm">
    //           📄
    //         </button>
    //       </div>
    //     </div>

    //     {/* Data Table */}
    //     <div className="overflow-x-auto max-h-[500px]">
    //       <table className="w-full border-collapse text-[10px]">
    //         <thead className="bg-[#e9e4db] border-b border-gray-400 sticky top-0">
    //           <tr className="text-left text-gray-700">
    //             {reportType === "Loan Details" &&
    //               [
    //                 "SNo",
    //                 "Branch",
    //                 "Loan No",
    //                 "Loan Date",
    //                 "Scheme Name",
    //                 "Party Name",
    //                 "Co Borrower",
    //                 "Mobile",
    //                 "Address",
    //                 "Particular",
    //                 "Quantity",
    //                 "Gross",
    //                 "Net Weight",
    //                 "Loan Amount",
    //                 "Close Date",
    //               ].map((h) => (
    //                 <th
    //                   key={h}
    //                   className="border-r border-gray-300 p-1 font-semibold whitespace-nowrap"
    //                 >
    //                   {h}
    //                 </th>
    //               ))}

    //             {reportType === "Loan Summary" &&
    //               [
    //                 "SNo",
    //                 "Branch",
    //                 "Loan No",
    //                 "Loan Date",
    //                 "Particular",
    //                 "Quantity",
    //                 "Gross",
    //                 "Net Weight",
    //                 "Loan Amount",
    //                 "Close Date",
    //               ].map((h) => (
    //                 <th
    //                   key={h}
    //                   className="border-r border-gray-300 p-1 font-semibold whitespace-nowrap"
    //                 >
    //                   {h}
    //                 </th>
    //               ))}
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {rows.map((row, i) => (
    //             <tr
    //               key={row.id}
    //               className="border-b border-gray-200 hover:bg-blue-50"
    //             >
    //               {reportType === "Loan Details" && (
    //                 <>
    //                   <td className="border-r p-1">{i + 1}</td>
    //                   <td className="border-r p-1">Bhagur B1 [01]</td>
    //                   <td className="border-r p-1">{row.id}</td>
    //                   <td className="border-r p-1">
    //                     {row.created_at?.slice(0, 10)}
    //                   </td>
    //                   <td className="border-r p-1">{row.Scheme}</td>
    //                   <td className="border-r p-1">{row.Print_Name}</td>
    //                   <td className="border-r p-1">
    //                     {row.Co_Borrower || "Self"}
    //                   </td>
    //                   <td className="border-r p-1">{row.Mobile_Number}</td>
    //                   <td className="border-r p-1">{row.Address || ""}</td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.particular}
    //                   </td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.nos}
    //                   </td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.gross}
    //                   </td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.netWeight}
    //                   </td>
    //                   <td className="border-r p-1 text-right">
    //                     {row.Loan_amount}
    //                   </td>
    //                   <td className="p-1">{row.CloseDate || ""}</td>
    //                 </>
    //               )}

    //               {reportType === "Loan Summary" && (
    //                 <>
    //                   <td className="border-r p-1">{i + 1}</td>
    //                   <td className="border-r p-1">Bhagur B1 [01]</td>
    //                   <td className="border-r p-1">{row.id}</td>
    //                   <td className="border-r p-1">
    //                     {row.created_at?.slice(0, 10)}
    //                   </td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.particular}
    //                   </td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.nos}
    //                   </td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.gross}
    //                   </td>
    //                   <td className="border-r p-1">
    //                     {row.Pledge_Item_List?.[0]?.netWeight}
    //                   </td>
    //                   <td className="border-r p-1 text-right">
    //                     {row.Loan_amount}
    //                   </td>
    //                   <td className="p-1">{row.CloseDate || ""}</td>
    //                 </>
    //               )}
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex flex-col w-full max-w-[1400px] rounded-[11px] border border-gray-200 shadow-sm bg-white overflow-hidden">

          {/* Upper Section: Title, Dates & Actions */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white">
            <div className="flex-shrink-0">
              <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
                Loan Detail Report
              </h2>
            </div>

            {/* Date Range & Party Search */}
            <div className="flex items-center gap-4 flex-1 justify-center px-4">
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Range</label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <input
                    type="date"
                    className="p-1.5 text-[11px] outline-none border-r border-gray-200 w-[125px]"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="p-1.5 text-[11px] outline-none w-[125px]"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 relative flex-1 max-w-[300px]">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Party</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder={selectedScheme ? "Search party name..." : "Select Scheme First"}
                    disabled={!selectedScheme}
                    className="w-full border border-gray-300 p-1.5 rounded text-[11px] outline-none focus:border-[#0A2478] disabled:bg-gray-50 font-medium"
                    value={partySearch}
                    onChange={(e) => {
                      setPartySearch(e.target.value);
                      setSelectedParty("");
                    }}
                  />
                  {partyList.length > 0 && (
                    <div className="absolute z-50 bg-white border border-gray-300 w-full mt-1 shadow-xl max-h-48 overflow-y-auto rounded-md">
                      {partyList.map((p, i) => (
                        <div
                          key={i}
                          className="px-3 py-2 text-[11px] cursor-pointer hover:bg-blue-50 border-b border-gray-50 last:border-0"
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
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleView}
                className="h-[34px] px-6 rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95"
              >
                View
              </button>
              <button className="h-[34px] px-4 rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-all">
                Excel
              </button>
              <button className="h-[34px] px-4 rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all">
                Exit
              </button>
              
            </div>
          </div>

          {/* Lower Section: Scheme & Radio Filters */}
          <div className="flex items-center px-6 py-2 bg-gray-50/50 gap-8 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Scheme</label>
              <select
                className="border border-gray-300 p-1 rounded text-[11px] min-w-[180px] bg-white outline-none focus:border-[#0A2478]"
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                <option value="">All Schemes</option>
                {schemes.map((s) => (
                  <option key={s.id} value={s.id}>{s.schemeName}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">View:</span>
                {["Item Details", "Loan Details", "Loan Summary"].map((type) => (
                  <label key={type} className="flex items-center gap-1.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="reportType"
                      className="w-3 h-3 accent-[#0A2478]"
                      checked={reportType === type}
                      onChange={() => setReportType(type)}
                    />
                    <span className={`text-[11px] ${reportType === type ? 'font-bold text-[#0A2478]' : 'text-gray-600'}`}>{type}</span>
                  </label>
                ))}
              </div>

              <div className="h-4 w-[1px] bg-gray-300 mx-2" />

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Status:</span>
                {["All", "Pending", "Closed"].map((stat) => (
                  <label key={stat} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      className="w-3 h-3 accent-[#0A2478]"
                      checked={status === stat}
                      onChange={() => setStatus(stat)}
                    />
                    <span className={`text-[11px] ${status === stat ? 'font-bold text-[#0A2478]' : 'text-gray-600'}`}>{stat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead className="sticky top-0 z-10 shadow-sm">
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
                  {[
                    "SNo", "Branch", "Loan No", "Loan Date", "Scheme Name",
                    "Party Name", "Co Borrower", "Mobile", "Address", "Particular",
                    "Qty", "Gross", "Net Weight", "Loan Amount", "Close Date"
                  ].map((h) => (
                    <th key={h} className="border border-gray-300 p-2 uppercase whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[10px] text-gray-700">
                {rows.length > 0 ? (
                  rows.map((row, i) => (
                    <tr key={row.id} className="hover:bg-blue-50/30 transition-colors border-b border-gray-200">
                      <td className="border border-gray-300 p-2 text-center text-gray-400 font-mono">{i + 1}</td>
                      <td className="border border-gray-300 p-2 text-gray-500">Bhagur B1 [01]</td>
                      <td className="border border-gray-300 p-2 font-bold text-[#0A2478]">{row.id}</td>
                      <td className="border border-gray-300 p-2 font-mono">{row.created_at?.slice(0, 10)}</td>
                      <td className="border border-gray-300 p-2 whitespace-nowrap">{row.Scheme}</td>
                      <td className="border border-gray-300 p-2 font-bold uppercase">{row.Print_Name}</td>
                      <td className="border border-gray-300 p-2 text-gray-500">{row.Co_Borrower || "Self"}</td>
                      <td className="border border-gray-300 p-2 font-mono">{row.Mobile_Number}</td>
                      <td className="border border-gray-300 p-2 truncate max-w-[150px] text-gray-500" title={row.Address}>{row.Address}</td>
                      <td className="border border-gray-300 p-2">{row.Pledge_Item_List?.[0]?.particular}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.Pledge_Item_List?.[0]?.nos}</td>
                      <td className="border border-gray-300 p-2 text-right font-mono">{row.Pledge_Item_List?.[0]?.gross}</td>
                      <td className="border border-gray-300 p-2 text-right font-mono font-bold text-orange-900 bg-yellow-50/10">
                        {row.Pledge_Item_List?.[0]?.netWeight}
                      </td>
                      <td className="border border-gray-300 p-2 text-right font-mono font-bold text-blue-800 bg-blue-50/10">
                        {Number(row.Loan_amount).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {row.CloseDate ? <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold">{row.CloseDate}</span> : <span className="text-green-600">Active</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="p-16 text-center text-gray-400 italic bg-gray-50 uppercase tracking-widest text-[10px]">
                      No data found for selected criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
