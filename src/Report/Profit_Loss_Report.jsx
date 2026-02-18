import React, { useState } from 'react';

const Profit_Loss_Report = () => {
  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState("2026-02-14");
  const [isGrouped, setIsGrouped] = useState(true); // Toggle state
  const [viewData, setViewData] = useState(null); // Data to display on "View" click

  const formatDisplayDate = (date) => {
    const [y, m, d] = date.split("-");
    return `${d}/${m}/${y}`;
  };

  // Structured Data
  const reportData = {
    debit: [
      {
        group: "Capital Account",
        items: [{ name: "SLJ / SLF Internal Transfer", amount: 469890.00 }],
      },
      {
        group: "Current Liabilities",
        items: [{ name: "Tax Payment", amount: 30280.00 }],
      },
      {
        group: "Revenue Accounts",
        items: [
          { name: "Interest Income", amount: 121.00 },
          { name: "Penalty", amount: 4561.00 },
          { name: "Bank Charges", amount: 38046.00 },
          { name: "Document Charges", amount: 12240.00 },
          { name: "Postal And Telegram", amount: 240.00 },
          { name: "Sundry Miscellaneous Expenses", amount: 11120.00 },
          { name: "LEGAL CHARGES", amount: 7081.00 },
          { name: "Rent (Shop 1, Pratik Arcade)", amount: 354240.00 },
          { name: "Salary And Wages", amount: 1136403.00 },
          { name: "Software AMC Charges", amount: 287823.00 },
          { name: "Processing Fees", amount: 300.00 },
        ]
      }
    ],
    credit: [
      {
        group: "Capital Account",
        items: [{ name: "SLJ / SLF Internal Transfer", amount: 7769890.00 }],
      },
      {
        group: "Revenue Accounts",
        items: [
          { name: "Interest Income", amount: 6984202.00 },
          { name: "Penalty", amount: 9002.00 },
          { name: "Document Charges", amount: 29160.00 },
          { name: "Postal And Telegram", amount: 360.00 },
          { name: "LEGAL CHARGES", amount: 14162.00 },
          { name: "Salary And Wages", amount: 165000.00 },
          { name: "Processing Fees", amount: 300.00 },
        ]
      }
    ]
  };

  const handleView = () => {
    setViewData({ ...reportData, grouped: isGrouped });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[11px] text-gray-800">
      <div className="m-2 border border-teal-600">
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Profit and Loss Report
        </div>

        {/* Filters Section */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-8 mb-4">
            <div className="flex border border-gray-300">
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-32 px-2 py-0.5 outline-none" />
              {/* <span className="px-2 text-xs bg-gray-100 flex items-center">{formatDisplayDate(fromDate)}</span> */}
            </div>
            <div className="flex border border-gray-300">
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-32 px-2 py-0.5 outline-none" />
              {/* <span className="px-2 text-xs bg-gray-100 flex items-center">{formatDisplayDate(toDate)}</span> */}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isGrouped} 
                onChange={(e) => setIsGrouped(e.target.checked)} 
                className="accent-blue-600" 
              />
              Group By Financial Head
            </label>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex gap-0.5">
              <button onClick={handleView} className="bg-[#005a9c] text-white px-10 py-1 border border-blue-800 shadow-sm hover:bg-blue-700">View</button>
              <button className="bg-[#005a9c] text-white px-10 py-1 border border-blue-800 shadow-sm hover:bg-red-700">Exit</button>
            </div>
          </div>
        </div>

        {/* Profit & Loss Table */}
        {viewData && (
          <div className="grid grid-cols-2 border-t border-gray-300 min-h-[400px]">
            {/* Debit Side */}
            <SideTable title="Dr. Amount" data={viewData.debit} grouped={viewData.grouped} />
            {/* Credit Side */}
            <SideTable title="Cr. Amount" data={viewData.credit} borderLeft={true} grouped={viewData.grouped} />
          </div>
        )}
      </div>
    </div>
  );
};

const SideTable = ({ title, data, grouped, borderLeft }) => {
  return (
    <div className={`${borderLeft ? '' : 'border-r'} border-gray-300`}>
      <div className="bg-[#eeeae3] flex font-bold border-b border-gray-300">
        <div className="flex-1 p-1">Particulars</div>
        <div className="w-32 p-1 text-right">{title}</div>
      </div>
      <div className="p-2">
        {grouped ? (
          // Grouped View
          data.map((section, idx) => (
            <div key={idx} className="mb-4">
              <div className="font-bold text-gray-700 underline mb-1">{section.group}</div>
              {section.items.map((item, i) => (
                <div key={i} className="flex justify-between pl-2 py-0.5">
                  <span className="text-blue-800 cursor-pointer">{item.name}</span>
                  <span className="w-32 text-right">{item.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-end border-t border-gray-400 mt-1">
                <span className="w-32 text-right font-bold py-1">
                  {section.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        ) : (
          // Flat (Ungrouped) View
          data.flatMap(g => g.items).map((item, i) => (
            <div key={i} className="flex justify-between py-0.5">
              <span className="text-blue-800 cursor-pointer">{item.name}</span>
              <span className="w-32 text-right">{item.amount.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profit_Loss_Report;