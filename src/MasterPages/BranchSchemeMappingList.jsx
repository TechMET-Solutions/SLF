// import React, { useEffect, useState } from "react";
// import GroupData from "../assets/Group 124.svg"; // optional if needed later
// import { useNavigate } from "react-router-dom";

// const BranchSchemeMappingList = () => {
//   useEffect(() => {
//     document.title = "SLF | Branch Scheme Mapping List";
//   }, []);
  
//   const [data, setData] = useState([
//     {
//       id: 1,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 2,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 3,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 4,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 5,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 6,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 7,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 8,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//     {
//       id: 9,
//       branchId: "V1",
//       code: "Bhagur B1",
//       name: "S Lunawat Jewellers",
//       schemeMapping: "Scheme",
//     },
//   ]);
//     const navigate = useNavigate(); 


//   return (
//     <div className="min-h-screen w-full">
//       {/* Topbar */}
//       <div className="flex justify-center">
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
//             Branch Scheme Mapping List (User List)
//           </h2>

//           {/* Right section (buttons) */}
//           <div className="flex items-center gap-6">
//             <div className="flex gap-3">
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
//                 <th className="px-4 py-2 text-left max-w-[70px] border-r border-gray-300 text-[13px]">
//                   Branch Id
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Code
//                 </th>
//                 <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
//                   Name
//                 </th>
//                 <th className="px-4 py-2 text-left min-w-[180px] border-r border-gray-300 text-[13px]">
//                   Address
//                 </th>
//                 <th className="px-4 py-2 text-left border-r max-w-[70px] border-gray-300 text-[13px]">
//                   Scheme Mapping
//                 </th>
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
//                   <td className="px-4 py-2">{row.branchId}</td>
//                   <td className="px-4 py-2">{row.code}</td>
//                   <td className="px-4 py-2">{row.name}</td>
//                   <td className="px-4 py-2">S Lunawat Jewellers</td>
//                   <td
//                     className="px-4 py-2 text-blue-600 font-medium cursor-pointer"
//                     onClick={() => navigate("/Scheme-Role-Mapping")}
//                   >
//                     {row.schemeMapping}
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

// export default BranchSchemeMappingList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBranchesApi } from "../API/Master/Master_Profile/Branch_Details";


const BranchSchemeMappingList = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    document.title = "SLF | Branch Scheme Mapping List";
    fetchBranches(page);
  }, [page]);

  const fetchBranches = async (pageNum) => {
    const result = await fetchBranchesApi(pageNum, limit);
    if (result) {
      setBranches(result.branches);
      setTotal(result.total);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen w-full">
      {/* Topbar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px]">
            Branch Scheme Mapping List (User List)
          </h2>
          <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
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
                <th className="px-4 py-2 text-left border-r text-[13px]">Branch Id</th>
                <th className="px-4 py-2 text-left border-r text-[13px]"> Code</th>
                <th className="px-4 py-2 text-left border-r text-[13px]">Name</th>
            
                <th className="px-4 py-2 text-left border-r text-[13px]">Address</th>
               
                <th className="px-4 py-2 text-left text-[13px]">Scheme Mapping</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {branches.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.branch_code}</td>
                  <td className="px-4 py-2">{row.branch_name}</td>
                
                  <td className="px-4 py-2">{row.address_line1}, {row.address_line3}</td>
                 
                  <td
                    className="px-4 py-2 text-blue-600 font-medium cursor-pointer"
                    onClick={() => navigate("/Scheme-Role-Mapping", { state: row })}
                  >
                    Map
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-3 py-1 border rounded-md bg-[#0b2c69] text-white">
          {page}
        </span>
        <span>/ {totalPages}</span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BranchSchemeMappingList;
