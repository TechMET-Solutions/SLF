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
    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
      <div className="m-2 border border-teal-600">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold">
          Trial Balance
        </div>

        <div className="p-4 bg-white border-b">
          {/* Date Filters remain same */}
          <div className="flex items-center gap-8 mb-4">
            <div className="flex items-center gap-2">
              <label>From Date</label>
              <div className="flex border border-gray-300">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label>To Date</label>
              <div className="flex border border-gray-300">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="relative border border-gray-200 rounded p-4 pt-6 mb-4">
            <span className="absolute -top-3 left-4 bg-white px-2 text-[#1a8a81] font-bold">
              Generate
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="optionType"
                    value="group"
                    checked={optionType === "group"}
                    onChange={() => setOptionType("group")}
                    className="accent-blue-600"
                  />
                  Group By Financial Head
                </label>
                {/* <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="view"
                    checked={viewType === "detail"}
                    onChange={() => setViewType("detail")}
                    className="accent-blue-600"
                  />
                  Detail
                </label> */}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="optionType"
                    value="zero"
                    checked={optionType === "zero"}
                    onChange={() => setOptionType("zero")}
                    className="accent-blue-600"
                  />
                  Show Zero Amount Account
                </label>
                {/* <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="view"
                    checked={viewType === "summary"}
                    onChange={() => setViewType("summary")}
                    className="accent-blue-600"
                  />
                  Summary
                </label> */}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div className="flex gap-0.5">
              <button
                onClick={handleViewClick}
                className="bg-[#005a9c] text-white px-10 py-1 border border-blue-800 hover:bg-blue-700"
              >
                💾 View
              </button>
              <button className="bg-[#005a9c] text-white px-10 py-1 border border-blue-800">
                ✖ Exit
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Table Logic */}
        <div className="overflow-x-auto p-1">
          <table className="w-full border-collapse border border-gray-300 text-[11px]">
            {/* <thead className="bg-[#eeeae3]">
              <tr>
                <th className="border border-gray-300 p-1 text-left">
                  Account Name
                </th>
                {currentDisplay === "detail" ? (
                  <>
                    <th className="border border-gray-300 p-1">Opening DR</th>
                    <th className="border border-gray-300 p-1">Opening CR</th>
                    <th className="border border-gray-300 p-1">
                      Transaction DR
                    </th>
                    <th className="border border-gray-300 p-1">
                      Transaction CR
                    </th>
                  </>
                ) : null}
                <th className="border border-gray-300 p-1 text-left">
                  Closing DR
                </th>
                <th className="border border-gray-300 p-1 text-left">
                  Closing CR
                </th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  <tr className="bg-white">
                    <td
                      colSpan={currentDisplay === "detail" ? 7 : 3}
                      className="p-1 font-bold text-gray-900 border-b"
                    >
                      {section.title}
                    </td>
                  </tr>
                  {section.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-blue-50">
                      <td className="p-1 pl-2 text-gray-700 border-gray-200">
                        {row.name}
                      </td>
                      {currentDisplay === "detail" && (
                        <>
                          <td className="p-1 text-right">{row.opDr}</td>
                          <td className="p-1 text-right">{row.opCr}</td>
                          <td className="p-1 text-right">{row.trDr}</td>
                          <td className="p-1 text-right">{row.trCr}</td>
                        </>
                      )}
                      <td className="p-1 text-left">{row.clDr}</td>
                      <td className="p-1 text-left">{row.clCr}</td>
                    </tr>
                  ))}
                  {section.totals && (
                    <tr className="font-bold border-t border-black">
                      <td className="p-1"></td>
                      {currentDisplay === "detail" && (
                        <>
                          <td className="p-1 text-right">
                            {section.totals.opDr}
                          </td>
                          <td className="p-1 text-right">
                            {section.totals.opCr}
                          </td>
                          <td className="p-1 text-right">
                            {section.totals.trDr}
                          </td>
                          <td className="p-1 text-right">
                            {section.totals.trCr}
                          </td>
                        </>
                      )}
                      <td className="p-1 text-left border-b-2 border-double border-black">
                        {section.totals.clDr}
                      </td>
                      <td className="p-1 text-left border-b-2 border-double border-black">
                        {section.totals.clCr}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody> */}

            <thead className="bg-[#eeeae3]">
              <tr>
                <th className="border p-1 text-left">Account Name</th>
                <th className="border p-1 text-right">Debit</th>
                <th className="border p-1 text-right">Credit</th>
                <th className="border p-1 text-right">Closing Debit</th>
                <th className="border p-1 text-right">Closing Credit</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  {/* Section Title */}
                  <tr
                    className="bg-white hover:bg-gray-50 cursor-pointer"
                    // Pass your ledger ID here
                  >
                    <td
                      colSpan={5}
                      className="p-1 font-bold text-gray-900 border-b"
                    >
                      {section.title}
                    </td>
                  </tr>

                  {/* Ledger Rows */}
                  {section.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-blue-50">
                      <td
                        className="p-1 pl-2 hover:cursor-pointer text-blue-600 hover:underline"
                        onClick={() => handleRowClick(row.ledgerId)}
                      >
                        {row.name}
                      </td>
                      <td className="p-1 text-right">{row.debit}</td>
                      <td className="p-1 text-right">{row.credit}</td>
                      <td className="p-1 text-right">{row.closingDebit}</td>
                      <td className="p-1 text-right">{row.closingCredit}</td>
                    </tr>
                  ))}

                  {/* Section Totals */}
                  <tr className="font-bold border-t border-black bg-gray-100">
                    <td className="p-1">Total</td>
                    <td className="p-1 text-right">
                      {section.totals.totalDebit}
                    </td>
                    <td className="p-1 text-right">
                      {section.totals.totalCredit}
                    </td>
                    <td className="p-1 text-right">
                      {section.totals.closingDebit}
                    </td>
                    <td className="p-1 text-right">
                      {section.totals.closingCredit}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              <tr className="font-bold bg-yellow-100 border-t-2 border-black">
                <td className="p-1">Grand Total</td>
                <td className="p-1 text-right">
                  {grandTotals.totalDebit.toFixed(2)}
                </td>
                <td className="p-1 text-right">
                  {grandTotals.totalCredit.toFixed(2)}
                </td>
                <td className="p-1 text-right">
                  {grandTotals.closingDebit.toFixed(2)}
                </td>
                <td className="p-1 text-right">
                  {grandTotals.closingCredit.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trial_Balance;
