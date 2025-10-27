// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import GroupData from "../assets/Group 124.svg"; // make sure this exists

// const SchemeRenewalList = () => {
//   useEffect(() => {
//     document.title = "SLF | Scheme Renewal List";
//   }, []);
//   const [data, setData] = useState([
//     {
//       id: 1,
//       productName: "GOLD",
//       schemeName: "SB-IND04",
//       appFrom: "27/06/2024",
//       appTo: "31/12/2050",
//       approval: "85",
//       minLoan: "50000",
//       maxLoan: "2000000",
//       renewedBy: "ssl@slunawat.com",
//       renewedOn: "27/06/2024",
//     },
//     {
//       id: 2,
//       productName: "GOLD",
//       schemeName: "SB-IND04",
//       appFrom: "27/06/2024",
//       appTo: "31/12/2050",
//       approval: "85",
//       minLoan: "50000",
//       maxLoan: "2000000",
//       renewedBy: "ssl@slunawat.com",
//       renewedOn: "27/06/2024",
//     },
//     {
//       id: 3,
//       productName: "GOLD",
//       schemeName: "SB-IND04",
//       appFrom: "27/06/2024",
//       appTo: "31/12/2050",
//       approval: "85",
//       minLoan: "50000",
//       maxLoan: "2000000",
//       renewedBy: "ssl@slunawat.com",
//       renewedOn: "27/06/2024",
//     },
//     // 👉 add more rows as needed (copied same structure)
//   ]);
// const navigate = useNavigate();

//   return (
//     <div className="min-h-screen w-full">
//       {/* Topbar */}
//       <div className="flex justify-center ">
//         <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//           {/* Left heading */}
//           <h2
//             style={{
//               fontFamily: "Source Sans 3, sans-serif",
//               fontWeight: 700,
//               fontSize: "20px",
//               lineHeight: "148%",
//               letterSpacing: "0em",
//             }}
//             className="text-red-600"
//           >
//             Scheme Renewal List
//           </h2>

//           {/* Right section (buttons) */}
//           <div className="flex items-center gap-6">
//             <div className="flex gap-3">
//               <button
//                 style={{
//                   width: "74px",
//                   height: "24px",
//                   borderRadius: "3.75px",
//                 }}
//                     onClick={() => navigate("/Add-Scheme-Renewal-Form")}
//                 className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
//               >
//                 Add
//               </button>

//               <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="flex justify-center ">
//         <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
//           <table className="w-full border-collapse">
//             <thead className="bg-[#0A2478] text-white text-sm">
//               <tr>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Product Name
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Scheme Name
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   App From
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   App To
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Approval %
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Min. Loan
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Max. Loan
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Renewed By
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Renewed On
//                 </th>
//                 <th className="px-4 py-2 text-left text-[13px]">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-[12px]">
//               {data.map((row, index) => (
//                 <tr
//                   key={row.id}
//                   className={`border-b ${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   }`}
//                 >
//                   <td className="px-4 py-2">{row.productName}</td>
//                   <td className="px-4 py-2">{row.schemeName}</td>
//                   <td className="px-4 py-2">{row.appFrom}</td>
//                   <td className="px-4 py-2">{row.appTo}</td>
//                   <td className="px-4 py-2">{row.approval}%</td>
//                   <td className="px-4 py-2">{row.minLoan}</td>
//                   <td className="px-4 py-2">{row.maxLoan}</td>
//                   <td className="px-4 py-2">{row.renewedBy}</td>
//                   <td className="px-4 py-2">{row.renewedOn}</td>
//                   <td className="px-4 py-2 text-center cursor-pointer">
//                     <div className="w-5 h-5 bg-[#56A869] flex items-center justify-center rounded-[2px]">
//                       <img
//                         src={GroupData}
//                         alt="action"
//                         className="w-3.5 h-3.5"
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
//         <button className="px-3 py-1 border rounded-md">Previous</button>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">
//             1
//           </button>
//           <button className="px-3 py-1 border rounded-md">2</button>
//           <button className="px-3 py-1 border rounded-md">3</button>
//           <button className="px-3 py-1 border rounded-md">...</button>
//           <button className="px-3 py-1 border rounded-md">10</button>
//         </div>
//         <button className="px-3 py-1 border rounded-md">Next</button>
//       </div>
//     </div>
//   );
// };

// export default SchemeRenewalList;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import GroupData from "../assets/Group 124.svg";
import { formatIndianDate } from "../utils/Helpers";
const SchemeDetailsList = () => {
    useEffect(() => {
    document.title = "SLF | Scheme Details List";
  }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([
       
    ]);
    console.log(data,"data")
useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Scheme/getExpiredSchemes");
        const schemes = response.data.map((item) => ({
          ...item,
          intCompound: item.calcMethod === "compound", // optional double-check
        }));
        setData(schemes);
      } catch (err) {
        console.error("❌ Error fetching schemes:", err);
      }
    };

    fetchSchemes();
  }, []);
    const navigate = useNavigate(); // Add this line

  
  const handleStatusToggle = async (row) => {
    const newStatus = row.status === 1 ? 0 : 1;

    try {
      // 🔄 Update status in backend
      const res = await axios.patch("http://localhost:5000/Scheme/statusScheme", {
        id: row.id,
        status: newStatus,
      });

      console.log(res.data.message);

      // ✅ Update state immediately
      const updatedData = data.map((item) =>
        item.id === row.id ? { ...item, status: newStatus } : item
      );
      setData(updatedData);
    } catch (err) {
      console.error("Error updating scheme status:", err);
      alert("Failed to update status. Please try again.");
    }
  };


    return (
        <div className="min-h-screen w-full">
            {/* middletopbar */}
            <div className="flex justify-center ">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    {/* Left heading */}
                    <h2
                        style={{
                            fontFamily: "Source Sans 3, sans-serif",
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "148%",
                            letterSpacing: "0em",
                        }}
                        className="text-red-600"
                    >
                       Scheme Renewal List
                    </h2>

                    {/* Right section (search + buttons) */}
                    <div className="flex items-center gap-6">
                        {/* Search section */}
                        {/* Buttons stuck to right */}
                        <div className="flex gap-3">
                            {/* <button
                                style={{
                                    width: "74px",
                                    height: "24px",
                                    borderRadius: "3.75px",
                                }}
                                className="bg-[#129121] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                                onClick={() => navigate("/Scheme-Renewal-List")}
                           >
                                Renew
                            </button> */}

                            {/* <button
                                style={{
                                    width: "74px",
                                    height: "24px",
                                    borderRadius: "3.75px",
                                }}
                                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                                                               onClick={() => navigate("/Add-Scheme-Details-Listform")}

                            >
                                Add
                            </button> */}

                            <button
                                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className="flex justify-center ">
                <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                 Product Name
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Scheme Name
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    App Form
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    App To
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Approval %
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                    Min. Loan
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                   Max. Loan
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                 Renewed By
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                                   Renewed On
                                </th>
                                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]"
                                >
                                    Action
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                              >
                                 <td className="px-4 py-2">{row.product}</td>
                                    <td className="px-4 py-2">{row.schemeName}</td>
                                {/* <td className="px-4 py-2">{row.applicableFrom}</td> */}
                                <td className="px-4 py-2">{formatIndianDate(row.applicableFrom)}</td>
                                 <td className="px-4 py-2">{formatIndianDate(row.applicableTo)}</td>
                                    {/* <td className="px-4 py-2">{row.applicableTo}</td> */}
                                   <td className="px-4 py-2">
  {row.goldApprovePercent}
</td>

                                    <td className="px-4 py-2">{row.minLoanAmount}</td>
                                    <td className="px-4 py-2">{row.maxLoanAmount}</td>
                                <td className="px-4 py-2">{row.renewedBy}</td>
                                 <td className="px-4 py-2">{row.renewedOn}</td>
                                  <td className="px-4 py-2 text-center cursor-pointer">
                                       <div className="flex items-center gap-2">
                                 
                                       
                                 
                                       
                                         <div
                                           className="w-5 h-5 bg-[#56A869] flex items-center justify-center rounded-[2px]"
                                           onClick={() => navigate("/Add-Scheme-Details-Listform", { state: { type: "edit" ,data : row } })}
                                         >
                                           <img
                                             src={GroupData}
                                             alt="group"
                                             className="w-3.5 h-3.5"
                                           />
                                         </div>
                                 
                                       </div>
                                     </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
                <button className="px-3 py-1 border rounded-md">Previous</button>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">
                        1
                    </button>
                    <button className="px-3 py-1 border rounded-md">2</button>
                    <button className="px-3 py-1 border rounded-md">3</button>
                    <button className="px-3 py-1 border rounded-md">...</button>
                    <button className="px-3 py-1 border rounded-md">10</button>
                </div>
                <button className="px-3 py-1 border rounded-md">Next</button>
            </div>
        </div>
    );
};

export default SchemeDetailsList;