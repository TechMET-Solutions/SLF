// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Add this import
// import GroupData from "../assets/Group 124.svg";
// import { formatIndianDate } from "../utils/Helpers";
// import { API } from "../api";
// import Pagination from "../Component/Pagination";
// const SchemeDetailsList = () => {
//   useEffect(() => {
//     document.title = "SLF | Scheme Details List";
//   }, []);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [data, setData] = useState([

//   ]);
//   console.log(data, "data")
//   useEffect(() => {
//     const fetchSchemes = async () => {
//       try {
//         const response = await axios.get(`${API}/Scheme/getExpiredSchemes?page=${page}&limit=10`);
//         const schemes = response.data.map((item) => ({
//           ...item,
//           intCompound: item.calcMethod === "compound", // optional double-check
//         }));
//         setData(schemes);
//       } catch (err) {
//         console.error("❌ Error fetching schemes:", err);
//       }
//     };

//     fetchSchemes();
//   }, []);
//   const navigate = useNavigate(); // Add this line

//   // 🔹 Pagination Controls
//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     fetchSchemes(page);
//   };


//   const handleStatusToggle = async (row) => {
//     const newStatus = row.status === 1 ? 0 : 1;

//     try {
//       // 🔄 Update status in backend
//       const res = await axios.patch(`${API}/Scheme/statusScheme`, {
//         id: row.id,
//         status: newStatus,
//       });

//       console.log(res.data.message);

//       // ✅ Update state immediately
//       const updatedData = data.map((item) =>
//         item.id === row.id ? { ...item, status: newStatus } : item
//       );
//       setData(updatedData);
//     } catch (err) {
//       console.error("Error updating scheme status:", err);
//       alert("Failed to update status. Please try again.");
//     }
//   };


//   return (
//     <div className="min-h-screen w-full">
//       {/* middletopbar */}
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

//           {/* Right section (search + buttons) */}
//           <div className="flex items-center gap-6">
//             {/* Search section */}
//             {/* Buttons stuck to right */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/Scheme-Details-List")}
//                 className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
//               >
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
//                   App Form
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
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]"
//                 >
//                   Action
//                 </th>

//               </tr>
//             </thead>
//             <tbody className="text-[12px]">
//               {data.map((row, index) => (
//                 <tr
//                   key={row.id}
//                   className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     }`}
//                 >
//                   <td className="px-4 py-2">{row.product}</td>
//                   <td className="px-4 py-2">{row.schemeName}</td>
//                   {/* <td className="px-4 py-2">{row.applicableFrom}</td> */}
//                   <td className="px-4 py-2">{formatIndianDate(row.applicableFrom)}</td>
//                   <td className="px-4 py-2">{formatIndianDate(row.applicableTo)}</td>
//                   {/* <td className="px-4 py-2">{row.applicableTo}</td> */}
//                   <td className="px-4 py-2">
//                     {row.goldApprovePercent}
//                   </td>

//                   <td className="px-4 py-2">{row.minLoanAmount}</td>
//                   <td className="px-4 py-2">{row.maxLoanAmount}</td>
//                   <td className="px-4 py-2">{row.renewedBy}</td>
//                   <td className="px-4 py-2">{row.renewedOn}</td>
//                   <td className="px-4 py-2 text-center cursor-pointer">
//                     <div className="flex items-center gap-2">




//                       <div
//                         className="w-5 h-5 bg-[#56A869] flex items-center justify-center rounded-[2px]"
//                         onClick={() => navigate("/Add-Scheme-Details-Listform", { state: { type: "edit", data: row } })}
//                         title="Edit"
//                       >
//                         <img
//                           src={GroupData}
//                           alt="group"
//                           className="w-3.5 h-3.5"
//                         />
//                       </div>

//                     </div>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       )}
//     </div>
//   );
// };

// export default SchemeDetailsList;


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupData from "../assets/Group 124.svg";
import { formatIndianDate } from "../utils/Helpers";
import { API } from "../api";
import Pagination from "../Component/Pagination";

const SchemeDetailsList = () => {
  useEffect(() => {
    document.title = "SLF | Scheme Renewal List";
  }, []);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ============================================
  // 🔥 Fetch Expired Schemes with Pagination
  // ============================================
  const fetchSchemes = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API}/Scheme/getExpiredSchemes?page=${page}&limit=10`
      );

      const result = response.data; // {page, limit, totalItems, totalPages, data}

      setData(result.data);
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("❌ Error fetching expired schemes:", err);
    }
  };

  useEffect(() => {
    fetchSchemes(currentPage);
  }, []);

  // ============================================
  // 🔹 Pagination Controls
  // ============================================
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchSchemes(page);
  };

  // ============================================
  // 🔄 Toggle Status (if needed later)
  // ============================================
  const handleStatusToggle = async (row) => {
    const newStatus = row.status === 1 ? 0 : 1;

    try {
      await axios.patch(`${API}/Scheme/statusScheme`, {
        id: row.id,
        status: newStatus,
      });

      const updated = data.map((item) =>
        item.id === row.id ? { ...item, status: newStatus } : item
      );

      setData(updated);
    } catch (err) {
      console.error("❌ Error updating scheme:", err);
      alert("Failed to update status.");
    }
  };

  // ==============================================

  return (
    <div className="min-h-screen w-full">

      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 text-[20px] font-semibold">
            Scheme Renewal List
          </h2>

          <button
            onClick={() => navigate("/Scheme-Details-List")}
            className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] text-[10px]"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Scheme Name</th>
                <th className="px-4 py-2">App From</th>
                <th className="px-4 py-2">App To</th>
                <th className="px-4 py-2">Approval %</th>
                <th className="px-4 py-2">Min Loan</th>
                <th className="px-4 py-2">Max Loan</th>
                <th className="px-4 py-2">Renewed By</th>
                <th className="px-4 py-2">Renewed On</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{row.product}</td>
                  <td className="px-4 py-2">{row.schemeName}</td>
                  <td className="px-4 py-2">
                    {formatIndianDate(row.applicableFrom)}
                  </td>
                  <td className="px-4 py-2">
                    {formatIndianDate(row.applicableTo)}
                  </td>
                  <td className="px-4 py-2">{row.goldApprovePercent}</td>
                  <td className="px-4 py-2">{row.minLoanAmount}</td>
                  <td className="px-4 py-2">{row.maxLoanAmount}</td>
                  <td className="px-4 py-2">{row.renewedBy}</td>
                  <td className="px-4 py-2">{row.renewedOn}</td>

                  <td className="px-4 py-2 text-center">
                    <div
                      className="w-5 h-5 bg-[#56A869] flex items-center justify-center rounded cursor-pointer"
                      onClick={() =>
                        navigate("/Add-Scheme-Details-Listform", {
                          state: { type: "edit", data: row },
                        })
                      }
                      title="Edit"
                    >
                      <img src={GroupData} className="w-3.5 h-3.5" alt="edit" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SchemeDetailsList;
