// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// const MemberBranchMapping = () => {
//     useEffect(() => {
//     document.title = "SLF | Member Branch Mapping";
//   }, []);
//     const [data] = useState([
//         {
//             id: 1,
//             name: "kundan",
//             mobile: "8805789654",
//             email: "ssl@slunawat.com",
//         },
//         {
//             id: 3,
//             name: "omkar",
//             mobile: "8805789654",
//             email: "ssl@slunawat.com",
//         },
//         {
//             id: 2,
//             name: "tejas",
//             mobile: "8805789654",
//             email: "ssl@slunawat.com",
//         },


//     ]);

//     return (
//         <div className="min-h-screen w-full">
//             {/* Top bar */}
//             <div className="flex justify-center">
//                 <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//                     <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
//                         Member Branch Mapping
//                     </h2>

//                     {/* Search & Actions */}
//                     <div className="flex items-center gap-6">
//                         <div className="flex gap-3">
//                             <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
//                                 Exit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="flex justify-center">
//                 <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
//                     <table className="w-full border-collapse">
//                         <thead className="bg-[#0A2478] text-white text-sm">
//                             <tr>
//                                 <th className="px-4 py-2 text-left border-r">Empl Id</th>
//                                 <th className="px-4 py-2 text-left border-r">Name</th>
//                                 <th className="px-4 py-2 text-left border-r">Email</th>
//                                 <th className="px-4 py-2 text-left border-r">Mobile</th>
//                                 <th className="px-4 py-2 text-left border-r">Branch Mapping</th>

//                             </tr>
//                         </thead>
//                         <tbody className="text-[12px]">
//                             {data.map((row, index) => (
//                                 <tr
//                                     key={row.id}
//                                     className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                                 >
//                                     <td className="px-4 py-2">{row.id}</td>
//                                     <td className="px-4 py-2">{row.name}</td>
//                                     <td className="px-4 py-2">{row.email}</td>
//                                     <td className="px-4 py-2">{row.mobile}</td>
//                                     <td className="px-4 py-2">
//                                         <Link
//                                             to="/Add-Member-Branch-Mapping"
//                                             className="text-blue-700">
//                                             Branch
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center px-6 py-3 border-t gap-2 mt-4">
//                 <button className="px-3 py-1 border rounded-md">Previous</button>
//                 <div className="flex gap-2">
//                     <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
//                     <button className="px-3 py-1 border rounded-md">2</button>
//                     <button className="px-3 py-1 border rounded-md">3</button>
//                     <span className="px-3 py-1">...</span>
//                     <button className="px-3 py-1 border rounded-md">10</button>
//                 </div>
//                 <button className="px-3 py-1 border rounded-md">Next</button>
//             </div>
//         </div>
//     );
// };

// export default MemberBranchMapping;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEmployeeProfileApi } from "../API/Master/Employee_Profile/EmployeeProfile";
import Pagination from "../Component/Pagination"; // ✅ Make sure this exists
import Loader from "../Component/Loader";

const MemberBranchMapping = () => {
  useEffect(() => {
    document.title = "SLF | Member Branch Mapping";
    fetchEmployee(); // ✅ Fetch employees on mount
  }, []);

  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // ✅ Fetch employee list
  const fetchEmployee = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await fetchEmployeeProfileApi(page, itemsPerPage);

      if (result?.items) {
        setEmployeeList(result.items);
        setTotalItems(result.total || result.items.length);
        setCurrentPage(result.page || 1);
        setShowPagination(result.showPagination ?? false);
      } else {
        setEmployeeList([]);
        setShowPagination(false);
      }
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      setEmployeeList([]);
      setShowPagination(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchEmployee(page);
  };

    if (isLoading) return <div className="text-center py-10"><Loader /></div>;


  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Member Branch Mapping
          </h2>

          <div className="flex items-center gap-6">
            <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px] ">
          {isLoading ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              Loading employees...
            </div>
          ) : employeeList.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              No employees found
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r">Emp ID</th>
                  <th className="px-4 py-2 text-left border-r">Name</th>
                  <th className="px-4 py-2 text-left border-r">Email</th>
                  <th className="px-4 py-2 text-left border-r">Mobile</th>
                  <th className="px-4 py-2 text-left border-r">Branch Mapping</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {employeeList.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-2">{row.emp_id}</td>
                    <td className="px-4 py-2">{row.emp_name}</td>
                    <td className="px-4 py-2">{row.email}</td>
                    <td className="px-4 py-2">{row.mobile_no}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/Add-Member-Branch-Mapping?empId=${row.id}`}
                        className="text-blue-700 hover:underline"
                      >
                        Assign Branch
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default MemberBranchMapping;


