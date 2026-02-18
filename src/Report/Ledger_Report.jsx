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
    <div className="min-h-screen bg-white text-[12px]">
      <div className="m-2 border border-teal-600 shadow-sm">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Ledger Report
        </div>

        {/* Filters */}
        <div className="p-4 border-b">
          <div className="flex gap-6 flex-wrap">
            <div>
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border ml-2 px-2 py-1"
              />
            </div>

            <div>
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border ml-2 px-2 py-1"
              />
            </div>

            <div>
              <label>Ledger</label>
              <select
                value={selectedLedger}
                onChange={(e) => setSelectedLedger(e.target.value)}
                className="border ml-2 px-2 py-1"
              >
                {ledgerList.map((ledger) => (
                  <option key={ledger.id} value={ledger.id}>
                    {ledger.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleView}
              className="bg-blue-600 text-white px-6 py-1"
            >
              View
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-2 overflow-x-auto">
          <table className="w-full border text-[11px]">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-1">Date</th>
                <th className="border p-1">Particulars</th>
                <th className="border p-1 text-right">Deposit</th>
                <th className="border p-1 text-right">Withdrawal</th>
                <th className="border p-1 text-right">Running Total</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    Loading...
                  </td>
                </tr>
              ) : ledgerData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No Records Found
                  </td>
                </tr>
              ) : (
                ledgerData.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-1">{row.date}</td>
                    <td className="border p-1">{row.particulars}</td>
                    <td className="border p-1 text-right">{row.dr}</td>
                    <td className="border p-1 text-right">{row.cr}</td>
                    <td className="border p-1 text-right font-bold">
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
  );
};

export default Ledger_Report;
