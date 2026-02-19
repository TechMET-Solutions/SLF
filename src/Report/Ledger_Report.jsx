// import axios from "axios";
// import { useEffect, useState } from "react";
// import { API } from "../api";

// const Ledger_Report = () => {
//   // const [selectedLedger, setSelectedLedger] = useState('Branch Control A/C');
//   const [ledgerList, setLedgerList] = useState([]);
//   const [selectedLedger, setSelectedLedger] = useState("");

//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   useEffect(() => {
//     const fetchLedgers = async () => {
//       try {
//         const res = await axios.get(`${API}/account-code/general-accounts`);
//         setLedgerList(res.data);

//         if (res.data.length > 0) {
//           setSelectedLedger(res.data[0].name);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchLedgers();
//   }, []);

//   // Sample data extracted from your screenshot
//   const ledgerData = [
//     {
//       date: "01/04/2025",
//       particulars: "Opening",
//       dr: "0.00",
//       cr: "0.00",
//       total: "0.00",
//     },
//     {
//       date: "01/04/2025",
//       particulars:
//         "Branch Control A/C [FT: From SSL Hdfc To SLF Hdfc] [ Paid By - Net Banking ]",
//       dr: "0.00",
//       cr: "1000000.00",
//       total: "-1000000.00",
//     },
//     {
//       date: "01/04/2025",
//       particulars:
//         "Branch Control A/C [FT: B3 PAYMENT GATEWAY 950/- (31/03/2025)] [ Paid By - Net Banking ]",
//       dr: "0.00",
//       cr: "950.00",
//       total: "-1000950.00",
//     },
//     {
//       date: "01/04/2025",
//       particulars:
//         "Branch Control A/C [FT: FROM B2 HDFC TO B1 HDFC] [ Paid By - Net Banking ]",
//       dr: "0.00",
//       cr: "40000.00",
//       total: "-1040950.00",
//     },
//     {
//       date: "01/04/2025",
//       particulars:
//         "Branch Control A/C [FT: FROM B2 TO B1 CASH TRF] [ Paid By - Cash ]",
//       dr: "0.00",
//       cr: "300000.00",
//       total: "-1340950.00",
//     },
//     {
//       date: "01/04/2025",
//       particulars:
//         "Branch Control A/C [FT: SLF HDFC BGR TO NASHIK ROAD BRANCH CUST TR] [ Paid By - Net Banking ]",
//       dr: "514230.00",
//       cr: "0.00",
//       total: "-826720.00",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
//       {/* 2. Main Container */}
//       <div className="m-2 border border-teal-600 shadow-sm">
//         {/* Title Bar */}
//         <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
//           Ledger Report
//         </div>

//         {/* Filter Section */}
//         <div className="p-4 bg-white border-b border-gray-200">
//           <div className="flex flex-col gap-3 max-w-4xl">
//             {/* Date Row */}
//             <div className="flex items-center gap-8">
//               <div className="flex items-center gap-2">
//                 <label className="w-16">From Date</label>
//                 <input
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="border border-gray-300 px-2 py-0.5"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <label className="w-16">To Date</label>
//                 <input
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="border border-gray-300 px-2 py-0.5"
//                 />
//               </div>
//             </div>

//             {/* Ledger Dropdown Row */}
//             <div className="flex items-center gap-2">
//               <label className="w-16">Ledger</label>
//               <select
//                 value={selectedLedger}
//                 onChange={(e) => setSelectedLedger(e.target.value)}
//                 className="border border-gray-300 px-2 py-0.5 w-64 outline-none"
//               >
//                 {ledgerList.map((ledger) => (
//                   <option key={ledger.id} value={ledger.name}>
//                     {ledger.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Action Buttons Row */}
//           <div className="flex justify-between items-center mt-6 pt-2 border-t border-gray-100">
//             <div className="flex gap-0.5">
//               <button className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-blue-700 active:bg-blue-900 shadow-sm">
//                 💾 View
//               </button>
//               <button className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-red-700 active:bg-red-900 shadow-sm">
//                 ✖ Exit
//               </button>
//             </div>

//             {/* Export Icons (Right Side) */}
//             <div className="flex gap-1">
//               <button className="p-1 border border-blue-800 bg-[#005a9c] text-white rounded hover:bg-blue-700">
//                 🖨️
//               </button>
//               <button className="p-1 border border-blue-800 bg-[#005a9c] text-white rounded hover:bg-blue-700">
//                 📊
//               </button>
//               <button className="p-1 border border-blue-800 bg-[#005a9c] text-white rounded hover:bg-blue-700">
//                 📄
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* 3. Data Table Section */}
//         <div className="p-1 overflow-x-auto">
//           <div className="bg-[#eeeae3] px-2 py-1 text-[11px] font-bold border border-gray-300 border-b-0">
//             {selectedLedger}
//           </div>
//           <table className="w-full border-collapse border border-gray-300 text-[11px]">
//             <thead className="bg-[#eeeae3]">
//               <tr className="text-left">
//                 <th className="border border-gray-300 p-1 w-24">Date</th>
//                 <th className="border border-gray-300 p-1">Particulars</th>
//                 <th className="border border-gray-300 p-1 text-right w-24">
//                   Deposit
//                 </th>
//                 <th className="border border-gray-300 p-1 text-right w-24">
//                   Withdrawal
//                 </th>
//                 <th className="border border-gray-300 p-1 text-right w-32">
//                   Running Total
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {ledgerData.map((row, index) => (
//                 <tr key={index} className="hover:bg-blue-50 even:bg-gray-50/50">
//                   <td className="border border-gray-300 p-1">{row.date}</td>
//                   <td className="border border-gray-300 p-1">
//                     {row.particulars}
//                   </td>
//                   <td className="border border-gray-300 p-1 text-right">
//                     {row.dr}
//                   </td>
//                   <td className="border border-gray-300 p-1 text-right">
//                     {row.cr}
//                   </td>
//                   <td className="border border-gray-300 p-1 text-right font-medium">
//                     {row.total}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Ledger_Report;
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Ledger_Report = () => {
  const [ledgerList, setLedgerList] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Ledger List
  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const res = await axios.get(`${API}/account-code/general-accounts`);
        setLedgerList(res.data);

        if (res.data.length > 0) {
          setSelectedLedger(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLedgers();
  }, []);

  // View Button Function
  const handleView = async () => {
    try {
      if (!selectedLedger || !fromDate || !toDate) {
        alert("Please select all filters");
        return;
      }

      setLoading(true);

      const res = await axios.post(`${API}/api/ReportLedger/ledger`, {
        ledgerId: selectedLedger,
        fromDate,
        toDate,
      });

      let runningBalance = 0;

      const formatted = res.data.map((item) => {
        const debit = Number(item.debit || 0);
        const credit = Number(item.credit || 0);

        runningBalance += debit - credit;

        return {
          date: new Date(item.docDate).toLocaleDateString("en-GB"),
          particulars: item.particulars,
          dr: debit.toFixed(2),
          cr: credit.toFixed(2),
          total: runningBalance.toFixed(2),
        };
      });

      setLedgerData(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-white text-[12px]">
    //   <div className="m-2 border border-teal-600 shadow-sm">
    //     <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
    //       Ledger Report
    //     </div>

    //     {/* Filters */}
    //     <div className="p-4 border-b">
    //       <div className="flex gap-6 flex-wrap">
    //         <div>
    //           <label>From Date</label>
    //           <input
    //             type="date"
    //             value={fromDate}
    //             onChange={(e) => setFromDate(e.target.value)}
    //             className="border ml-2 px-2 py-1"
    //           />
    //         </div>

    //         <div>
    //           <label>To Date</label>
    //           <input
    //             type="date"
    //             value={toDate}
    //             onChange={(e) => setToDate(e.target.value)}
    //             className="border ml-2 px-2 py-1"
    //           />
    //         </div>

    //         <div>
    //           <label>Ledger</label>
    //           <select
    //             value={selectedLedger}
    //             onChange={(e) => setSelectedLedger(e.target.value)}
    //             className="border ml-2 px-2 py-1"
    //           >
    //             {ledgerList.map((ledger) => (
    //               <option key={ledger.id} value={ledger.id}>
    //                 {ledger.name}
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         <button
    //           onClick={handleView}
    //           className="bg-blue-600 text-white px-6 py-1"
    //         >
    //           View
    //         </button>
    //       </div>
    //     </div>

    //     {/* Table */}
    //     <div className="p-2 overflow-x-auto">
    //       <table className="w-full border text-[11px]">
    //         <thead className="bg-gray-200">
    //           <tr>
    //             <th className="border p-1">Date</th>
    //             <th className="border p-1">Particulars</th>
    //             <th className="border p-1 text-right">Deposit</th>
    //             <th className="border p-1 text-right">Withdrawal</th>
    //             <th className="border p-1 text-right">Running Total</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {loading ? (
    //             <tr>
    //               <td colSpan="5" className="text-center p-3">
    //                 Loading...
    //               </td>
    //             </tr>
    //           ) : ledgerData.length === 0 ? (
    //             <tr>
    //               <td colSpan="5" className="text-center p-3">
    //                 No Records Found
    //               </td>
    //             </tr>
    //           ) : (
    //             ledgerData.map((row, index) => (
    //               <tr key={index}>
    //                 <td className="border p-1">{row.date}</td>
    //                 <td className="border p-1">{row.particulars}</td>
    //                 <td className="border p-1 text-right">{row.dr}</td>
    //                 <td className="border p-1 text-right">{row.cr}</td>
    //                 <td className="border p-1 text-right font-bold">
    //                   {row.total}
    //                 </td>
    //               </tr>
    //             ))
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      {/* 🟦 Single Line Header & Control Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1400px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
              Ledger Report
            </h2>
          </div>

          {/* 🟡 Middle — Inline Filters */}
          <div className="flex items-center gap-6 flex-1 justify-center">
            {/* Date Range */}
            {/* <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Period</label>
              <div className="flex border border-gray-300 rounded overflow-hidden bg-white">
                <input
                  type="date"
                  className="p-1.5 text-[11px] outline-none border-r border-gray-200 w-[135px]"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <input
                  type="date"
                  className="p-1.5 text-[11px] outline-none w-[135px]"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div> */}

            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Period From
                </label>
                <input
                  type="date"
                  className="p-1.5 text-[11px] border border-gray-300 rounded bg-white shadow-sm w-[135px]"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Period To
                </label>
                <input
                  type="date"
                  className="p-1.5 text-[11px] border border-gray-300 rounded bg-white shadow-sm w-[135px]"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>


            {/* Ledger Selection */}
            <div className="flex items-center gap-2">

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Ledger
                </label>
                <select
                  className="border border-gray-300 p-1.5 rounded text-[11px] min-w-[200px] bg-white outline-none focus:border-[#1a8a81]"
                  value={selectedLedger}
                  onChange={(e) => setSelectedLedger(e.target.value)}
                >
                  {ledgerList.map((ledger) => (
                    <option key={ledger.id} value={ledger.id}>
                      {ledger.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 🔵 Right — Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleView}
              className="w-[100px] h-[34px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#004a80] transition-all shadow-sm active:scale-95 uppercase tracking-wider"
            >
              View
            </button>
            <button className="w-[100px] h-[34px] rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-all shadow-sm active:scale-95 uppercase tracking-wider">
              Excel
            </button>
            <button className="w-[100px] h-[34px] rounded bg-red-600 text-white text-[12px] font-bold hover:bg-red-700 transition-all shadow-sm active:scale-95 uppercase tracking-wider">
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold uppercase tracking-wider">
                  <th className="border border-gray-300 p-3 w-32">Date</th>
                  <th className="border border-gray-300 p-3">Particulars</th>
                  <th className="border border-gray-300 p-3 text-right w-40">Deposit (Dr)</th>
                  <th className="border border-gray-300 p-3 text-right w-40">Withdrawal (Cr)</th>
                  <th className="border border-gray-300 p-3 text-right w-48 bg-gray-100/50">Running Total</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center bg-gray-50">
                      <div className="inline-block animate-pulse text-gray-400 font-medium uppercase tracking-widest">
                        Loading Ledger Data...
                      </div>
                    </td>
                  </tr>
                ) : ledgerData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-16 text-center text-gray-400 italic bg-gray-50 uppercase tracking-widest text-[10px]">
                      No account transactions found for this period
                    </td>
                  </tr>
                ) : (
                  ledgerData.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors border-b border-gray-200 font-mono">
                      <td className="border border-gray-300 p-3 whitespace-nowrap text-gray-500">
                        {row.date}
                      </td>
                      <td className="border border-gray-300 p-3 font-sans font-medium uppercase text-gray-800">
                        {row.particulars}
                      </td>
                      <td className="border border-gray-300 p-3 text-right text-green-700 font-bold">
                        {row.dr !== "0" ? row.dr : ""}
                      </td>
                      <td className="border border-gray-300 p-3 text-right text-red-700 font-bold">
                        {row.cr !== "0" ? row.cr : ""}
                      </td>
                      <td className="border border-gray-300 p-3 text-right font-bold text-[#005a9c] bg-blue-50/10">
                        {row.total}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger_Report;
