import { useEffect, useState } from "react";

const Legal_notice_report = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState("2026-01-25");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [partyQuery, setPartyQuery] = useState("");
  const [partyList, setPartyList] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");

  const [rows, setRows] = useState([]);
  const [searching, setSearching] = useState(false);

  // Fetch Schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10",
        );
        const result = await response.json();
        setSchemes(result.data || []);
        if (result.data?.length) setSelectedScheme(result.data[0].id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  // Fetch Party Suggestions
  useEffect(() => {
    if (!partyQuery || !selectedScheme) {
      setPartyList([]);
      return;
    }

    const fetchParties = async () => {
      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/legal-parties?schemeId=${selectedScheme}&q=${partyQuery}`,
        );
        const data = await res.json();
        setPartyList(data.data || []);
      } catch (err) {
        console.error(err);
        setPartyList([]);
      }
    };

    const t = setTimeout(fetchParties, 300);
    return () => clearTimeout(t);
  }, [partyQuery, selectedScheme]);

  const handleView = async () => {
    if (!selectedScheme || !selectedParty) {
      alert("Select Scheme and Party");
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/legal-notice?schemeId=${selectedScheme}&fromDate=${fromDate}&toDate=${toDate}&party=${encodeURIComponent(
          selectedParty,
        )}`,
      );
      const data = await res.json();
      setRows(data.data || []);
    } catch (err) {
      console.error(err);
      setRows([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    // <div className="min-h-screen bg-[#f0f2f5] font-sans text-[12px]">
    //   <div className="m-3 border border-gray-300 bg-white shadow-md">
    //     <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
    //       Loan Legal Notice Report
    //     </div>

    //     {/* Filters */}
    //     <div className="p-4 bg-white border-b border-gray-200 space-y-3">
    //       <div className="flex gap-6">
    //         <input
    //           type="date"
    //           value={fromDate}
    //           onChange={(e) => setFromDate(e.target.value)}
    //           className="border px-2 py-1"
    //         />
    //         <input
    //           type="date"
    //           value={toDate}
    //           onChange={(e) => setToDate(e.target.value)}
    //           className="border px-2 py-1"
    //         />
    //       </div>

    //       <div className="flex gap-4 items-center">
    //         <select
    //           className="border px-2 py-1 w-56"
    //           value={selectedScheme}
    //           onChange={(e) => setSelectedScheme(e.target.value)}
    //         >
    //           {loading ? (
    //             <option>Loading...</option>
    //           ) : (
    //             schemes.map((s) => (
    //               <option key={s.id} value={s.id}>
    //                 {s.schemeName}
    //               </option>
    //             ))
    //           )}
    //         </select>

    //         <div className="relative">
    //           <input
    //             type="text"
    //             placeholder="Type Party Name"
    //             value={partyQuery}
    //             onChange={(e) => {
    //               setPartyQuery(e.target.value);
    //               setSelectedParty("");
    //             }}
    //             className="border px-2 py-1 w-56"
    //           />

    //           {partyList.length > 0 && (
    //             <div className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
    //               {partyList.map((p, i) => (
    //                 <div
    //                   key={i}
    //                   className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
    //                   onClick={() => {
    //                     setSelectedParty(p.Print_Name);
    //                     setPartyQuery(p.Print_Name);
    //                     setPartyList([]);
    //                   }}
    //                 >
    //                   {p.Print_Name}
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </div>

    //         <button
    //           onClick={handleView}
    //           disabled={searching}
    //           className="bg-[#005da3] text-white px-6 py-1"
    //         >
    //           {searching ? "Loading..." : "View"}
    //         </button>
    //       </div>
    //     </div>

    //     {/* Table */}
    //     <div className="overflow-x-auto min-h-[400px]">
    //       <table className="w-full border-collapse text-[11px]">
    //         <thead className="bg-[#e9e4db] border-b border-gray-400">
    //           <tr className="text-left text-gray-700">
    //             <th className="border p-1 font-semibold">S.No</th>
    //             <th className="border p-1 font-semibold">Branch</th>
    //             <th className="border p-1 font-semibold">Loan No</th>
    //             <th className="border p-1 font-semibold">Loan Date</th>
    //             <th className="border p-1 font-semibold">Party Name</th>
    //             <th className="border p-1 font-semibold">Mobile</th>
    //             <th className="border p-1 font-semibold">Address</th>
    //             <th className="border p-1 font-semibold">Particular</th>
    //             <th className="border p-1 font-semibold text-right">Gross</th>
    //             <th className="border p-1 font-semibold text-right">
    //               Net Weight
    //             </th>
    //             <th className="border p-1 font-semibold text-right">
    //               Loan Amount
    //             </th>
    //             <th className="border p-1 font-semibold text-right">
    //               Pending Amt.
    //             </th>
    //             <th className="border p-1 font-semibold">Due Days</th>
    //             <th className="border p-1 font-semibold text-right">
    //               Int. Due
    //             </th>
    //             <th className="border p-1 font-semibold">Charge Raised</th>
    //             <th className="border p-1 font-semibold">Notice Raised</th>
    //             <th className="border p-1 font-semibold">Notice Released</th>
    //             <th className="border p-1 font-semibold">Auction Raised</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {rows.length ? (
    //             rows.map((r, i) => {
    //               const gross = r.Pledge_Item_List?.reduce(
    //                 (s, x) => s + Number(x.gross || 0),
    //                 0,
    //               );
    //               const net = r.Pledge_Item_List?.reduce(
    //                 (s, x) => s + Number(x.netWeight || 0),
    //                 0,
    //               );
    //               const particular = r.Pledge_Item_List?.map(
    //                 (p) => p.particular,
    //               ).join(", ");

    //               return (
    //                 <tr key={i} className="border-b">
    //                   <td className="border p-1">{i + 1}</td>
    //                   <td className="border p-1">{r.branch_id}</td>
    //                   <td className="border p-1">{r.loan_no || r.loanId}</td>
    //                   <td className="border p-1">
    //                     {r.loanDate
    //                       ? new Date(r.loanDate).toLocaleDateString()
    //                       : ""}
    //                   </td>
    //                   <td className="border p-1">{r.partyName}</td>
    //                   <td className="border p-1">{r.mobile}</td>
    //                   <td className="border p-1"></td>
    //                   <td className="border p-1">{particular}</td>
    //                   <td className="border p-1 text-right">
    //                     {gross.toFixed(3)}
    //                   </td>
    //                   <td className="border p-1 text-right">
    //                     {net.toFixed(3)}
    //                   </td>
    //                   <td className="border p-1 text-right">{r.Loan_amount}</td>
    //                   <td className="border p-1 text-right">
    //                     {r.LoanPendingAmount || 0}
    //                   </td>
    //                   <td className="border p-1"></td>
    //                   <td className="border p-1 text-right">
    //                     {r.total_charges || 0}
    //                   </td>
    //                   <td className="border p-1"></td>
    //                   <td className="border p-1"></td>
    //                   <td className="border p-1"></td>
    //                   <td className="border p-1"></td>
    //                 </tr>
    //               );
    //             })
    //           ) : (
    //             <tr>
    //               <td colSpan="18" className="p-4 text-center text-gray-500">
    //                 No data found
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1400px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
              Legal Notice Report
            </h2>
          </div>

          {/* 🟡 Middle — Single Row Filters */}
          <div className="flex items-center gap-6 flex-1 justify-center">
            {/* Date Range Selection */}
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Range</label>
              <div className="flex border border-gray-300 rounded overflow-hidden">
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

            {/* Scheme Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Scheme</label>
              <select
                className="border border-gray-300 p-1.5 rounded text-[11px] min-w-[180px] bg-white outline-none focus:border-[#0A2478]"
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                {loading ? <option>Loading...</option> : schemes.map(s => (
                  <option key={s.id} value={s.id}>{s.schemeName}</option>
                ))}
              </select>
            </div>

            {/* Party Search */}
            <div className="flex items-center gap-2 relative flex-1 max-w-[280px]">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Party</label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search party name..."
                  className="w-full border border-gray-300 p-1.5 rounded text-[11px] outline-none focus:border-[#0A2478]"
                  value={partyQuery}
                  onChange={(e) => {
                    setPartyQuery(e.target.value);
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
                          setPartyQuery(p.Print_Name);
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

          {/* 🔵 Right — Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleView}
              disabled={searching}
              className="w-[100px] h-[34px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95"
            >
              {searching ? "..." : "View"}
            </button>
            <button className="w-[85px] h-[34px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all">
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left border-collapse min-w-[1600px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
                  <th className="border border-gray-300 p-2 text-center">S.No</th>
                  <th className="border border-gray-300 p-2">BR</th>
                  <th className="border border-gray-300 p-2">Loan No</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Party Name</th>
                  <th className="border border-gray-300 p-2">Mobile</th>
                  <th className="border border-gray-300 p-2">Particular</th>
                  <th className="border border-gray-300 p-2 text-right">Gross</th>
                  <th className="border border-gray-300 p-2 text-right">Net Wt</th>
                  <th className="border border-gray-300 p-2 text-right bg-blue-50/30">Loan Amt</th>
                  <th className="border border-gray-300 p-2 text-right bg-red-50/30">Pending</th>
                  <th className="border border-gray-300 p-2 text-center text-red-700">Due Days</th>
                  <th className="border border-gray-300 p-2 text-right">Int. Due</th>
                  <th className="border border-gray-300 p-2 text-center bg-gray-100/50">Charge</th>
                  <th className="border border-gray-300 p-2 text-center bg-gray-100/50">Notice</th>
                  <th className="border border-gray-300 p-2 text-center bg-gray-100/50">Released</th>
                  <th className="border border-gray-300 p-2 text-center bg-red-100/30">Auction</th>
                </tr>
              </thead>
              <tbody className="text-[10px] text-gray-700">
                {rows.length > 0 ? (
                  rows.map((r, i) => {
                    const gross = r.Pledge_Item_List?.reduce((s, x) => s + Number(x.gross || 0), 0);
                    const net = r.Pledge_Item_List?.reduce((s, x) => s + Number(x.netWeight || 0), 0);
                    const particular = r.Pledge_Item_List?.map(p => p.particular).join(", ");

                    return (
                      <tr key={i} className="hover:bg-blue-50/30 transition-colors border-b border-gray-200">
                        <td className="border border-gray-300 p-2 text-center text-gray-400 font-mono">{i + 1}</td>
                        <td className="border border-gray-300 p-2 font-mono text-gray-500">{r.branch_id}</td>
                        <td className="border border-gray-300 p-2 font-bold text-[#0A2478]">{r.loan_no || r.loanId}</td>
                        <td className="border border-gray-300 p-2 font-mono whitespace-nowrap">
                          {r.loanDate ? new Date(r.loanDate).toLocaleDateString('en-GB') : ""}
                        </td>
                        <td className="border border-gray-300 p-2 font-bold uppercase">{r.partyName}</td>
                        <td className="border border-gray-300 p-2 font-mono">{r.mobile}</td>
                        <td className="border border-gray-300 p-2 truncate max-w-[150px]">{particular}</td>
                        <td className="border border-gray-300 p-2 text-right font-mono">{gross.toFixed(3)}</td>
                        <td className="border border-gray-300 p-2 text-right font-mono">{net.toFixed(3)}</td>
                        <td className="border border-gray-300 p-2 text-right font-mono font-bold bg-blue-50/10">
                          {Number(r.Loan_amount).toLocaleString()}
                        </td>
                        <td className="border border-gray-300 p-2 text-right font-mono font-bold text-red-600 bg-red-50/10">
                          {Number(r.LoanPendingAmount || 0).toLocaleString()}
                        </td>
                        <td className="border border-gray-300 p-2 text-center font-bold text-red-700">{r.dueDays || "-"}</td>
                        <td className="border border-gray-300 p-2 text-right font-mono">{Number(r.total_charges || 0).toLocaleString()}</td>

                        {/* Status Column with Icons/Badges */}
                        <td className="border border-gray-300 p-2 text-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-orange-400"></span>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          {r.notice_date ? <span className="text-[9px] bg-red-100 text-red-700 px-1 rounded">SENT</span> : "-"}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">-</td>
                        <td className="border border-gray-300 p-2 text-center">
                          {r.isAuction ? <span className="text-red-600">⚠️</span> : "-"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="17" className="p-16 text-center text-gray-400 italic bg-gray-50 uppercase tracking-widest text-[10px]">
                      {searching ? "Fetching Legal Data..." : "No Notice data found for selected filters"}
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

export default Legal_notice_report;
