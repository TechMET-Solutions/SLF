// import React from 'react';

// const Loan_Risk_managment = () => {
//   return (
//     <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">

//       <div className="m-2 border border-[#1a8a81] shadow-sm">

//         {/* Title Bar matching image_4da841.jpg */}
//         <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
//           Loan Risk Report [Margin]
//         </div>

//         {/* Filter/Input Section */}
//         <div className="p-5 bg-white border-b border-gray-200">
//           <div className="flex items-center gap-12 flex-wrap">

//             {/* As On Date Field */}
//             <div className="flex items-center gap-2">
//               <label className="text-gray-600">As On</label>
//               <div className="flex border border-gray-300">
//                 <input
//                   type="text"
//                   value="25/01/2025"
//                   readOnly
//                   className="w-24 px-2 py-0.5 outline-none bg-white text-gray-700"
//                 />
//                 <button className="bg-[#8b4513] text-white px-2 text-xs hover:bg-[#6f370f]">📅</button>
//               </div>
//             </div>

//             {/* Schemes Dropdown */}
//             <div className="flex items-center gap-2">
//               <label className="text-gray-600">Schemes</label>
//               <select className="border border-gray-300 px-2 py-0.5 w-32 outline-none focus:border-blue-500 bg-white">
//                 <option>IND02</option>
//                 <option>IND01</option>
//                 <option>GOLD01</option>
//               </select>
//             </div>

//             {/* Margin Input */}
//             <div className="flex items-center gap-2">
//               <label className="text-gray-600">Margin ( % )</label>
//               <input
//                 type="text"
//                 defaultValue="2"
//                 className="border border-gray-300 px-2 py-0.5 w-24 outline-none focus:border-blue-500"
//               />
//             </div>

//           </div>

//           {/* Action Buttons Row */}
//           <div className="flex justify-start items-center mt-8 gap-0.5">
//             <button className="bg-[#005a9c] text-white px-12 py-1 flex items-center gap-2 border border-blue-800 hover:bg-blue-700 active:bg-blue-900 shadow-sm rounded-sm">
//               💾 View
//             </button>
//             <button className="bg-[#005a9c] text-white px-12 py-1 flex items-center gap-2 border border-blue-800 hover:bg-red-700 active:bg-red-900 shadow-sm rounded-sm">
//               ✖ Exit
//             </button>
//           </div>
//         </div>

//         {/* Result Area Placeholder */}
//         <div className="min-h-[400px] bg-white flex items-center justify-center text-gray-300">
//            {/* Results would populate here upon clicking View */}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Loan_Risk_managment;
//

import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Loan_Risk_managment = () => {
  const [asOnDate, setAsOnDate] = useState("2026-02-09");
  const [scheme, setScheme] = useState("IND01");
  const [margin, setMargin] = useState("10");
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");

  const [loadingSchemes, setLoadingSchemes] = useState(false);
const [reportData, setReportData] = useState([]);
const [loading, setLoading] = useState(false);

  // 🔥 Fetch Active Schemes
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoadingSchemes(true);

      const res = await axios.get(`${API}/Scheme/active`);

      if (res.data.success) {
        setSchemes(res.data.data);

        // Auto select first scheme
        if (res.data.data.length > 0) {
          setSelectedScheme(res.data.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      setLoadingSchemes(false);
    }
  };

  // 🔥 View Button
 const handleView = async () => {
  try {
    setLoading(true);

    const payload = {
      asOnDate,
      schemeId: selectedScheme,
      margin,
    };

    console.log("Loan Risk Payload:", payload);

    const res = await axios.post(
      `${API}/api/loan-risk/report`,
      payload
    );

    if (res.data.success) {
      setReportData(res.data.data);
    } else {
      setReportData([]);
    }

  } catch (error) {
    console.error("Error fetching loan risk report:", error);
    setReportData([]);
  } finally {
    setLoading(false);
  }
};

  // // Sample data to populate the table directly
  // const reportData = [
  //   {
  //     sNo: 1,
  //     loanNo: "GL000125",
  //     loanDate: "12/10/2025",
  //     scheme: "IND01",
  //     customerId: "CUS1024",
  //     customerName: "Rajesh Kumar",
  //     mobileNo: "9876543210",
  //     loanAmount: "50,000",
  //     pendingInt: "1,200",
  //     totalOutstd: "51,200",
  //     currentValue: "60,000",
  //     marginAmt: "6,000",
  //     marginPerc: "10%",
  //   },
  //   {
  //     sNo: 2,
  //     loanNo: "GL000148",
  //     loanDate: "15/11/2025",
  //     scheme: "IND01",
  //     customerId: "CUS1088",
  //     customerName: "Anita Sharma",
  //     mobileNo: "9988776655",
  //     loanAmount: "1,00,000",
  //     pendingInt: "2,500",
  //     totalOutstd: "1,02,500",
  //     currentValue: "1,20,000",
  //     marginAmt: "12,000",
  //     marginPerc: "10%",
  //   },
  // ];

  return (

    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800 p-2">
      <div className="">

        <div className="flex justify-center my-5 px-4">
          <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[70px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-6">

            {/* 🔴 Left — Title */}
            <div className="flex-shrink-0">
              <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
                Loan Risk Report [Margin]
              </h2>
            </div>

            {/* 🔵 Right — Controls & Buttons */}
            <div className="flex flex-grow items-center justify-end gap-6">

              {/* Inputs Group */}
              <div className="flex items-center gap-6 text-[14px] font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <label className="whitespace-nowrap">As On</label>
                  <input
                    type="date"
                    value={asOnDate}
                    onChange={(e) => setAsOnDate(e.target.value)}
                    className="border border-gray-300 px-2 py-1 outline-none rounded-md focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="whitespace-nowrap">Schemes</label>
                  <select
                    value={selectedScheme}
                    onChange={(e) => setSelectedScheme(e.target.value)}
                    className="border border-gray-300 px-2 py-1 min-w-[160px] outline-none rounded-md focus:ring-1 focus:ring-blue-500 bg-transparent"
                  >
                    {loadingSchemes ? (
                      <option>Loading...</option>
                    ) : (
                      schemes.map((scheme) => (
                        <option key={scheme.id} value={scheme.id}>
                          {scheme.schemeName}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="whitespace-nowrap">Margin (%)</label>
                  <input
                    type="text"
                    value={margin}
                    onChange={(e) => setMargin(e.target.value)}
                    className="border border-gray-300 px-2 py-1 w-16 outline-none rounded-md focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Buttons Group */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleView}
                  className="w-[75px] h-[32px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm"
                >
                  VIEW
                </button>
                <button
                  className="w-[75px] h-[32px] rounded bg-red-600 text-white text-[12px] font-bold hover:bg-red-700 transition-all shadow-sm"
                >
                  PDF
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mx-28">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#0A2478] text-white">
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  S.No.
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Loan No.
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Loan Date
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Scheme
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Customer ID
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Customer Name
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Mobile No.
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Loan Amount
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Pending Int.
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Total Outstd.
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Current Value
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Margin Amt
                </th>
                <th className="border border-gray-400 p-1 font-bold whitespace-nowrap">
                  Margin %
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50 text-center">
                  <td className="border border-gray-300 p-1">{item.sNo}</td>
                  <td className="border border-gray-300 p-1 text-blue-700 underline cursor-pointer">
                    {item.loanNo}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {item.loanDate}
                  </td>
                  <td className="border border-gray-300 p-1">{item.scheme}</td>
                  <td className="border border-gray-300 p-1">
                    {item.customerId}
                  </td>
                  <td className="border border-gray-300 p-1 text-left">
                    {item.customerName}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {item.mobileNo}
                  </td>
                  <td className="border border-gray-300 p-1 text-right">
                    {item.loanAmount}
                  </td>
                  <td className="border border-gray-300 p-1 text-right">
                    {item.pendingInt}
                  </td>
                  <td className="border border-gray-300 p-1 text-right font-semibold">
                    {item.totalOutstd}
                  </td>
                  <td className="border border-gray-300 p-1 text-right">
                    {item.currentValue}
                  </td>
                  <td className="border border-gray-300 p-1 text-right">
                    {item.marginAmt}
                  </td>
                  <td className="border border-gray-300 p-1">
                    {item.marginPerc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loan_Risk_managment;
