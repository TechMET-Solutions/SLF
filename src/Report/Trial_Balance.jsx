import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const Trial_Balance = () => {
  // 1. State to track which radio button is selected
  const [viewType, setViewType] = useState("summary"); // 'detail' or 'summary'
  const [optionType, setOptionType] = useState("group");
  // 2. State to track what is actually displayed (updates only on "View" click)
  const [currentDisplay, setCurrentDisplay] = useState("summary");

  const navigate = useNavigate();

  const handleRowClick = (ledgerId) => {
    navigate(`/ledger-details`, {
      state: {
        ledgerId,
        fromDate,
        toDate,
      },
    });
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState(getToday());
  const [sections, setSections] = useState([]);
  console.log(
    "🚀 ~ file: Trial_Balance.jsx:24 ~ Trial_Balance ~ sections:",
    sections,
  );
  // const sections = [
  //   {
  //     title: "Capital Account",
  //     rows: [
  //       {
  //         name: "Interest CTR",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "6983960.00",
  //         trCr: "6983960.00",
  //         clDr: "0.00",
  //         clCr: "0.00",
  //       },
  //       {
  //         name: "Loan Control A/C",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "111972650.00",
  //         trCr: "111972650.00",
  //         clDr: "0.00",
  //         clCr: "0.00",
  //       },
  //       {
  //         name: "SLJ / SLF Internal Transfer",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "469890.00",
  //         trCr: "7769890.00",
  //         clDr: "0.00",
  //         clCr: "7300000.00",
  //       },
  //     ],
  //     totals: {
  //       opDr: "0.00",
  //       opCr: "0.00",
  //       trDr: "119426500.00",
  //       trCr: "126726500.00",
  //       clDr: "0.00",
  //       clCr: "7300000.00",
  //     },
  //   },
  //   {
  //     title: "Current Assets",
  //     rows: [
  //       {
  //         name: "B1 HDFC",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "59713510.00",
  //         trCr: "63955810.00",
  //         clDr: "0.00",
  //         clCr: "4242300.00",
  //       },
  //       {
  //         name: "Branch Control A/C",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "120463700.00",
  //         trCr: "115753960.00",
  //         clDr: "4709740.00",
  //         clCr: "0.00",
  //       },
  //       {
  //         name: "Cash",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "0.00",
  //         trCr: "1709635.00",
  //         clDr: "0.00",
  //         clCr: "1709635.00",
  //       },
  //       {
  //         name: "HO HDFC Bank, Bhagur",
  //         opDr: "1525567.00",
  //         opCr: "0.00",
  //         trDr: "166232610.00",
  //         trCr: "165696952.00",
  //         clDr: "2061225.00",
  //         clCr: "0.00",
  //       },
  //     ],
  //     totals: {
  //       opDr: "0.00",
  //       opCr: "0.00",
  //       trDr: "119426500.00",
  //       trCr: "126726500.00",
  //       clDr: "0.00",
  //       clCr: "7300000.00",
  //     },
  //   },

  //   {
  //     title: "Current Liabilities",
  //     rows: [
  //       {
  //         name: "B1 HDFC",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "59713510.00",
  //         trCr: "63955810.00",
  //         clDr: "0.00",
  //         clCr: "4242300.00",
  //       },
  //       {
  //         name: "Branch Control A/C",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "120463700.00",
  //         trCr: "115753960.00",
  //         clDr: "4709740.00",
  //         clCr: "0.00",
  //       },
  //       {
  //         name: "Cash",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "0.00",
  //         trCr: "1709635.00",
  //         clDr: "0.00",
  //         clCr: "1709635.00",
  //       },
  //       {
  //         name: "HO HDFC Bank, Bhagur",
  //         opDr: "1525567.00",
  //         opCr: "0.00",
  //         trDr: "166232610.00",
  //         trCr: "165696952.00",
  //         clDr: "2061225.00",
  //         clCr: "0.00",
  //       },
  //     ],
  //     totals: {
  //       opDr: "0.00",
  //       opCr: "0.00",
  //       trDr: "119426500.00",
  //       trCr: "126726500.00",
  //       clDr: "0.00",
  //       clCr: "7300000.00",
  //     },
  //   },

  //     {
  //     title: "Revenue Accounts",
  //     rows: [
  //       {
  //         name: "B1 HDFC",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "59713510.00",
  //         trCr: "63955810.00",
  //         clDr: "0.00",
  //         clCr: "4242300.00",
  //       },
  //       {
  //         name: "Branch Control A/C",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "120463700.00",
  //         trCr: "115753960.00",
  //         clDr: "4709740.00",
  //         clCr: "0.00",
  //       },
  //       {
  //         name: "Cash",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "0.00",
  //         trCr: "1709635.00",
  //         clDr: "0.00",
  //         clCr: "1709635.00",
  //       },
  //       {
  //         name: "HO HDFC Bank, Bhagur",
  //         opDr: "1525567.00",
  //         opCr: "0.00",
  //         trDr: "166232610.00",
  //         trCr: "165696952.00",
  //         clDr: "2061225.00",
  //         clCr: "0.00",
  //       },
  //     ],
  //     totals: {
  //       opDr: "0.00",
  //       opCr: "0.00",
  //       trDr: "119426500.00",
  //       trCr: "126726500.00",
  //       clDr: "0.00",
  //       clCr: "7300000.00",
  //     },
  //   },

  //      {
  //     title: "Revenue Accounts",
  //     rows: [
  //       {
  //         name: "B1 HDFC",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "59713510.00",
  //         trCr: "63955810.00",
  //         clDr: "0.00",
  //         clCr: "4242300.00",
  //       },
  //       {
  //         name: "Branch Control A/C",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "120463700.00",
  //         trCr: "115753960.00",
  //         clDr: "4709740.00",
  //         clCr: "0.00",
  //       },
  //       {
  //         name: "Cash",
  //         opDr: "0.00",
  //         opCr: "0.00",
  //         trDr: "0.00",
  //         trCr: "1709635.00",
  //         clDr: "0.00",
  //         clCr: "1709635.00",
  //       },
  //       {
  //         name: "HO HDFC Bank, Bhagur",
  //         opDr: "1525567.00",
  //         opCr: "0.00",
  //         trDr: "166232610.00",
  //         trCr: "165696952.00",
  //         clDr: "2061225.00",
  //         clCr: "0.00",
  //       },
  //     ],
  //     totals: {
  //       opDr: "0.00",
  //       opCr: "0.00",
  //       trDr: "119426500.00",
  //       trCr: "126726500.00",
  //       clDr: "0.00",
  //       clCr: "7300000.00",
  //     },
  //   },
  // ];
const fetchTrialBalance = async () => {
  try {
    const res = await axios.post(`${API}/api/trial-balance/trial-balance`, {
      fromDate,
      toDate,
      optionType,
    });

    setSections(res.data.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  if (fromDate && toDate) {
    fetchTrialBalance();
  }
}, [fromDate, toDate]);

  // const handleViewClick = async () => {
  //   try {
  //     const res = await axios.post(`${API}/api/trial-balance/trial-balance`, {
  //       fromDate,
  //       toDate,
  //       optionType,
  //     });

  //     setSections(res.data.data); // replace static sections
  //     setCurrentDisplay(viewType);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
 const handleViewClick = () => {
  fetchTrialBalance();
  setCurrentDisplay(viewType);
};


  
  const grandTotals = sections.reduce(
    (acc, section) => {
      acc.totalDebit += Number(section.totals.totalDebit || 0);
      acc.totalCredit += Number(section.totals.totalCredit || 0);
      acc.closingDebit += Number(section.totals.closingDebit || 0);
      acc.closingCredit += Number(section.totals.closingCredit || 0);
      return acc;
    },
    {
      totalDebit: 0,
      totalCredit: 0,
      closingDebit: 0,
      closingCredit: 0,
    },
  );

  return (
    // <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
    //   <div className="m-2 border border-teal-600">
    //     <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold">
    //       Trial Balance
    //     </div>

    //     <div className="p-4 bg-white border-b">
    //       {/* Date Filters remain same */}
    //       <div className="flex items-center gap-8 mb-4">
    //         <div className="flex items-center gap-2">
    //           <label>From Date</label>
    //           <div className="flex border border-gray-300">
    //             <input
    //               type="date"
    //               value={fromDate}
    //               onChange={(e) => setFromDate(e.target.value)}
    //             />
    //           </div>
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <label>To Date</label>
    //           <div className="flex border border-gray-300">
    //             <input
    //               type="date"
    //               value={toDate}
    //               onChange={(e) => setToDate(e.target.value)}
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="relative border border-gray-200 rounded p-4 pt-6 mb-4">
    //         <span className="absolute -top-3 left-4 bg-white px-2 text-[#1a8a81] font-bold">
    //           Generate
    //         </span>
    //         <div className="grid grid-cols-2 gap-4">
    //           <div className="space-y-2">
    //             <label className="flex items-center gap-2">
    //               <input
    //                 type="radio"
    //                 name="optionType"
    //                 value="group"
    //                 checked={optionType === "group"}
    //                 onChange={() => setOptionType("group")}
    //                 className="accent-blue-600"
    //               />
    //               Group By Financial Head
    //             </label>
    //             {/* <label className="flex items-center gap-2">
    //               <input
    //                 type="radio"
    //                 name="view"
    //                 checked={viewType === "detail"}
    //                 onChange={() => setViewType("detail")}
    //                 className="accent-blue-600"
    //               />
    //               Detail
    //             </label> */}
    //           </div>
    //           <div className="space-y-2">
    //             <label className="flex items-center gap-2">
    //               <input
    //                 type="radio"
    //                 name="optionType"
    //                 value="zero"
    //                 checked={optionType === "zero"}
    //                 onChange={() => setOptionType("zero")}
    //                 className="accent-blue-600"
    //               />
    //               Show Zero Amount Account
    //             </label>
    //             {/* <label className="flex items-center gap-2">
    //               <input
    //                 type="radio"
    //                 name="view"
    //                 checked={viewType === "summary"}
    //                 onChange={() => setViewType("summary")}
    //                 className="accent-blue-600"
    //               />
    //               Summary
    //             </label> */}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex justify-between items-center border-t pt-4">
    //         <div className="flex gap-0.5">
    //           <button
    //             onClick={handleViewClick}
    //             className="bg-[#005a9c] text-white px-10 py-1 border border-blue-800 hover:bg-blue-700"
    //           >
    //             💾 View
    //           </button>
    //           <button className="bg-[#005a9c] text-white px-10 py-1 border border-blue-800">
    //             ✖ Exit
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Dynamic Table Logic */}
    //     <div className="overflow-x-auto p-1">
    //       <table className="w-full border-collapse border border-gray-300 text-[11px]">
    //         {/* <thead className="bg-[#eeeae3]">
    //           <tr>
    //             <th className="border border-gray-300 p-1 text-left">
    //               Account Name
    //             </th>
    //             {currentDisplay === "detail" ? (
    //               <>
    //                 <th className="border border-gray-300 p-1">Opening DR</th>
    //                 <th className="border border-gray-300 p-1">Opening CR</th>
    //                 <th className="border border-gray-300 p-1">
    //                   Transaction DR
    //                 </th>
    //                 <th className="border border-gray-300 p-1">
    //                   Transaction CR
    //                 </th>
    //               </>
    //             ) : null}
    //             <th className="border border-gray-300 p-1 text-left">
    //               Closing DR
    //             </th>
    //             <th className="border border-gray-300 p-1 text-left">
    //               Closing CR
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {sections.map((section, sIdx) => (
    //             <React.Fragment key={sIdx}>
    //               <tr className="bg-white">
    //                 <td
    //                   colSpan={currentDisplay === "detail" ? 7 : 3}
    //                   className="p-1 font-bold text-gray-900 border-b"
    //                 >
    //                   {section.title}
    //                 </td>
    //               </tr>
    //               {section.rows.map((row, rIdx) => (
    //                 <tr key={rIdx} className="hover:bg-blue-50">
    //                   <td className="p-1 pl-2 text-gray-700 border-gray-200">
    //                     {row.name}
    //                   </td>
    //                   {currentDisplay === "detail" && (
    //                     <>
    //                       <td className="p-1 text-right">{row.opDr}</td>
    //                       <td className="p-1 text-right">{row.opCr}</td>
    //                       <td className="p-1 text-right">{row.trDr}</td>
    //                       <td className="p-1 text-right">{row.trCr}</td>
    //                     </>
    //                   )}
    //                   <td className="p-1 text-left">{row.clDr}</td>
    //                   <td className="p-1 text-left">{row.clCr}</td>
    //                 </tr>
    //               ))}
    //               {section.totals && (
    //                 <tr className="font-bold border-t border-black">
    //                   <td className="p-1"></td>
    //                   {currentDisplay === "detail" && (
    //                     <>
    //                       <td className="p-1 text-right">
    //                         {section.totals.opDr}
    //                       </td>
    //                       <td className="p-1 text-right">
    //                         {section.totals.opCr}
    //                       </td>
    //                       <td className="p-1 text-right">
    //                         {section.totals.trDr}
    //                       </td>
    //                       <td className="p-1 text-right">
    //                         {section.totals.trCr}
    //                       </td>
    //                     </>
    //                   )}
    //                   <td className="p-1 text-left border-b-2 border-double border-black">
    //                     {section.totals.clDr}
    //                   </td>
    //                   <td className="p-1 text-left border-b-2 border-double border-black">
    //                     {section.totals.clCr}
    //                   </td>
    //                 </tr>
    //               )}
    //             </React.Fragment>
    //           ))}
    //         </tbody> */}

    //         <thead className="bg-[#eeeae3]">
    //           <tr>
    //             <th className="border p-1 text-left">Account Name</th>
    //             <th className="border p-1 text-right">Debit</th>
    //             <th className="border p-1 text-right">Credit</th>
    //             <th className="border p-1 text-right">Closing Debit</th>
    //             <th className="border p-1 text-right">Closing Credit</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {sections.map((section, sIdx) => (
    //             <React.Fragment key={sIdx}>
    //               {/* Section Title */}
    //               <tr
    //                 className="bg-white hover:bg-gray-50 cursor-pointer"
    //                 // Pass your ledger ID here
    //               >
    //                 <td
    //                   colSpan={5}
    //                   className="p-1 font-bold text-gray-900 border-b"
    //                 >
    //                   {section.title}
    //                 </td>
    //               </tr>

    //               {/* Ledger Rows */}
    //               {section.rows.map((row, rIdx) => (
    //                 <tr key={rIdx} className="hover:bg-blue-50">
    //                   <td
    //                     className="p-1 pl-2 hover:cursor-pointer text-blue-600 hover:underline"
    //                     onClick={() => handleRowClick(row.ledgerId)}
    //                   >
    //                     {row.name}
    //                   </td>
    //                   <td className="p-1 text-right">{row.debit}</td>
    //                   <td className="p-1 text-right">{row.credit}</td>
    //                   <td className="p-1 text-right">{row.closingDebit}</td>
    //                   <td className="p-1 text-right">{row.closingCredit}</td>
    //                 </tr>
    //               ))}

    //               {/* Section Totals */}
    //               <tr className="font-bold border-t border-black bg-gray-100">
    //                 <td className="p-1">Total</td>
    //                 <td className="p-1 text-right">
    //                   {section.totals.totalDebit}
    //                 </td>
    //                 <td className="p-1 text-right">
    //                   {section.totals.totalCredit}
    //                 </td>
    //                 <td className="p-1 text-right">
    //                   {section.totals.closingDebit}
    //                 </td>
    //                 <td className="p-1 text-right">
    //                   {section.totals.closingCredit}
    //                 </td>
    //               </tr>
    //             </React.Fragment>
    //           ))}
    //           <tr className="font-bold bg-yellow-100 border-t-2 border-black">
    //             <td className="p-1">Grand Total</td>
    //             <td className="p-1 text-right">
    //               {grandTotals.totalDebit.toFixed(2)}
    //             </td>
    //             <td className="p-1 text-right">
    //               {grandTotals.totalCredit.toFixed(2)}
    //             </td>
    //             <td className="p-1 text-right">
    //               {grandTotals.closingDebit.toFixed(2)}
    //             </td>
    //             <td className="p-1 text-right">
    //               {grandTotals.closingCredit.toFixed(2)}
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      {/* 🟦 Single Line Header & Control Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1400px] min-h-[85px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
              Trial Balance
            </h2>
          </div>

          {/* 🟡 Middle — Inline Filters & Configuration */}
          <div className="flex items-center gap-6 flex-1 justify-center">
            {/* Date Range */}
            <div className="flex items-center gap-3">
              {/* Period From */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Period From
                </label>
                <input
                  type="date"
                  className="p-1.5 text-[11px] outline-none border border-gray-300 rounded bg-white shadow-sm w-[135px]"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              {/* Period To */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  Period To
                </label>
                <input
                  type="date"
                  className="p-1.5 text-[11px] outline-none border border-gray-300 rounded bg-white shadow-sm w-[135px]"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>


            {/* Vertical Divider */}
            <div className="h-10 border-l border-gray-200"></div>

            {/* View Options (Radio Toggles) */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Report Options</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="optionType"
                    checked={optionType === "group"}
                    onChange={() => setOptionType("group")}
                    className="w-3.5 h-3.5 accent-[#1a8a81]"
                  />
                  <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-900">Financial Head</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="optionType"
                    checked={optionType === "zero"}
                    onChange={() => setOptionType("zero")}
                    className="w-3.5 h-3.5 accent-[#1a8a81]"
                  />
                  <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-900">Show Zero A/C</span>
                </label>
              </div>
            </div>
          </div>

          {/* 🔵 Right — Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleViewClick}
              className="h-[34px] px-8 rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#004a80] transition-all shadow-sm active:scale-95 uppercase tracking-wider"
            >
              View
            </button>
            <button className="h-[34px] px-6 rounded bg-red-600 text-white text-[12px] font-bold hover:bg-red-50 transition-all uppercase tracking-wider">
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-[1400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[1100px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold uppercase tracking-wider">
                  <th className="border border-gray-300 p-3 w-[30%]">Account Name</th>
                  <th className="border border-gray-300 p-3 text-right">Debit Balance</th>
                  <th className="border border-gray-300 p-3 text-right">Credit Balance</th>
                  <th className="border border-gray-300 p-3 text-right bg-gray-100/50">Closing Debit</th>
                  <th className="border border-gray-300 p-3 text-right bg-gray-100/50">Closing Credit</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                {sections.map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    {/* 📂 Section Header Row */}
                    <tr className="bg-gray-50/80">
                      <td colSpan={5} className="p-2 px-4 border border-gray-300">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#1a8a81] rounded-full"></span>
                          <span className="font-bold text-gray-900 uppercase tracking-tighter">{section.title}</span>
                        </div>
                      </td>
                    </tr>

                    {/* 📄 Item Rows */}
                    {section.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-blue-50/50 transition-colors">
                        <td
                          className="p-2 pl-8 border border-gray-200 text-[#005a9c] font-medium cursor-pointer hover:underline uppercase text-[10px]"
                          onClick={() => handleRowClick(row.ledgerId)}
                        >
                          {row.name}
                        </td>
                        <td className="p-2 border border-gray-200 text-right font-mono text-gray-600">{row.debit}</td>
                        <td className="p-2 border border-gray-200 text-right font-mono text-gray-600">{row.credit}</td>
                        <td className="p-2 border border-gray-200 text-right font-mono font-bold text-gray-800 bg-gray-50/30">{row.closingDebit}</td>
                        <td className="p-2 border border-gray-200 text-right font-mono font-bold text-gray-800 bg-gray-50/30">{row.closingCredit}</td>
                      </tr>
                    ))}

                    {/* 🧮 Section Total Row */}
                    <tr className="bg-gray-100/30 font-bold border-t-2 border-gray-300">
                      <td className="p-2 px-4 border border-gray-300 text-right uppercase text-[10px] text-gray-500">Subtotal</td>
                      <td className="p-2 border border-gray-300 text-right font-mono">{section.totals.totalDebit}</td>
                      <td className="p-2 border border-gray-300 text-right font-mono">{section.totals.totalCredit}</td>
                      <td className="p-2 border border-gray-300 text-right font-mono text-[#1a8a81]">{section.totals.closingDebit}</td>
                      <td className="p-2 border border-gray-300 text-right font-mono text-[#1a8a81]">{section.totals.closingCredit}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* 🏆 Grand Total Row */}
                <tr className="bg-[#fff9e6] font-bold border-t-2 border-black h-14">
                  <td className="p-3 px-4 border border-gray-300 text-[12px] uppercase tracking-widest text-[#005a9c]">Grand Total</td>
                  <td className="p-3 border border-gray-300 text-right font-mono text-[13px]">{grandTotals.totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-3 border border-gray-300 text-right font-mono text-[13px]">{grandTotals.totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-3 border border-gray-300 text-right font-mono text-[14px] text-black">
                    <span className="border-b-[3px] border-double border-black">{grandTotals.closingDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="p-3 border border-gray-300 text-right font-mono text-[14px] text-black">
                    <span className="border-b-[3px] border-double border-black">{grandTotals.closingCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trial_Balance;
