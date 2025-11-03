// import { useEffect, useState } from "react";
// import GroupData from "../assets/Group 124.svg";
// import DeleteData from "../assets/deletimg.png";
// import EyeData from "../assets/eye.svg";
// import Loader from "../Component/Loader";
// import Pagination from "../Component/Pagination";

// const MemberLoginDetails = () => {
//     useEffect(() => {
//         document.title = "SLF | Member Login Details";
//     }, []);

//     const [employeeList, setEmployeeList] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalItems, setTotalItems] = useState(0);
//     const [showPagination, setShowPagination] = useState(false);
//     const itemsPerPage = 10;

//     const totalPages = Math.ceil(totalItems / itemsPerPage);

//     // ✅ Fetch employee list
//     const fetchEmployee = async (page = 1) => {
//         setIsLoading(true);
//         try {
//             const result = await fetchEmployeeProfileApi(page, itemsPerPage);

//             if (result?.items) {
//                 setEmployeeList(result.items);
//                 setTotalItems(result.total || result.items.length);
//                 setCurrentPage(result.page || 1);
//                 setShowPagination(result.showPagination ?? false);
//             } else {
//                 setEmployeeList([]);
//                 setShowPagination(false);
//             }
//         } catch (error) {
//             console.error("❌ Error fetching employees:", error);
//             setEmployeeList([]);
//             setShowPagination(false);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handlePageChange = (page) => {
//         if (page < 1 || page > totalPages) return;
//         setCurrentPage(page);
//         fetchEmployee(page);
//     };

//     if (isLoading) return <div className="text-center py-10"><Loader /></div>;



//     return (
//         <div className="min-h-screen w-full">
//             {/* Top bar */}
//             <div className="flex justify-center">
//                 <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//                     <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
//                         Member Login Details
//                     </h2>

//                     {/* Search & Actions */}
//                     <div className="flex items-center gap-6">
//                         <div className="flex gap-5">
//                             <div className="flex gap-3 items-center">
//                                 <input
//                                     type="text"
//                                     className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
//                                 />
//                                 <button
//                                     onClick={() => setIsModalOpen(true)}
//                                     className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
//                                 >
//                                     Search
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="flex gap-5">
//                             <div className="flex gap-3 items-center">
//                                 <input
//                                     type="date"
//                                     className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
//                                 />
//                             </div>
//                             <div className="flex gap-3 items-center border border-gray-400 rounded pl-3 py-1 text-[11.25px] w-[140px] h-[28px]">
//                                 <p className="text-[11.25px] font-source">Activity</p>
//                                 <select className="border border-gray-500 border-none">
//                                     <option value="#">-- Select --</option>
//                                     <option value="#">Login</option>
//                                 </select>
//                             </div>

//                         </div>

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
//                                 <th className="px-4 py-2 text-left border-r"></th>
//                                 <th className="px-4 py-2 text-left border-r">Name</th>
//                                 <th className="px-4 py-2 text-left border-r">User Id</th>
//                                 <th className="px-4 py-2 text-left border-r">OTP Override</th>
//                                 <th className="px-4 py-2 text-left border-r">Sendor Mobile No 1</th>
//                                 <th className="px-4 py-2 text-left border-r">Sendor Mobile No 2</th>
//                                 <th className="px-4 py-2 text-left border-r">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-[12px]">
//                             {employeeList.map((row, index) => (
//                                 <tr
//                                     key={row.id}
//                                     className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                                 >
//                                     <td className="px-4 py-2 flex items-center justify-center">
//                                         <input type="checkbox" name="id" id="id" />
//                                     </td>
//                                     <td className="px-4 py-2">{row.emp_id}</td>
//                                     <td className="px-4 py-2">{row.emp_name}</td>
//                                     <td className="px-4 py-2">{row.email}</td>
//                                     <td className="px-4 py-2 flex items-center justify-center">
//                                         <input type="checkbox" name="id" id="id" className="w-6 h-6" />
//                                     </td>
//                                     <td className="px-4 py-2">{row.sm1}</td>
//                                     <td className="px-4 py-2">{row.sm2}</td>
//                                     <td className="px-4 py-2 flex items-center justify-center">
//                                         <input type="checkbox" name="id" id="id" className="w-6 h-6" />
//                                     </td>

//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Pagination */}
//             {showPagination && totalPages > 1 && (
//                 <div>
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={handlePageChange}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MemberLoginDetails;


import { useEffect, useState } from "react";
import Loader from "../Component/Loader";
import Pagination from "../Component/Pagination";
import { fetchEmployeeProfileApi } from "../API/Master/Employee_Profile/EmployeeProfile";
import { useNavigate } from "react-router-dom";

const MemberLoginDetails = () => {
    useEffect(() => {
        document.title = "SLF | Member Login Details";
        fetchEmployee(); // ✅ load initial data
    }, []);

     const navigate = useNavigate();

    const [employeeList, setEmployeeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

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

            if (result?.items?.length) {
                setEmployeeList(result.items);
                setTotalItems(result.total || result.items.length);
                setCurrentPage(result.page || 1);
                setShowPagination(result.showPagination ?? result.total > itemsPerPage);
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

    if (isLoading) {
        return (
            <div className="text-center py-10">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full">
            {/* Top bar */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
                        Member Login Details
                    </h2>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-6">
                        {/* Search */}
                        <div className="flex gap-3 items-center">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name..."
                                className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                            />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
                            >
                                Search
                            </button>
                        </div>

                        {/* Date & Activity Filters */}
                        <div className="flex gap-5">
                            <input
                                type="date"
                                className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                            />
                            <div className="flex gap-3 items-center border border-gray-400 rounded pl-3 py-1 text-[11.25px] w-[140px] h-[28px]">
                                <p className="text-[11.25px] font-source">Activity</p>
                                <select className="border-none bg-transparent outline-none">
                                    <option value="#">-- Select --</option>
                                    <option value="login">Login</option>
                                </select>
                            </div>
                        </div>

                        <button
                        onClick={() => navigate("/")}
                        className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
                            Exit
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex justify-center">
                <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#0A2478] text-white text-sm">
                            <tr>
                                <th className="px-4 py-2 border-r text-left">#</th>
                                <th className="px-4 py-2 border-r text-left">Name</th>
                                <th className="px-4 py-2 border-r text-left">User ID</th>
                                <th className="px-4 py-2 border-r text-left">OTP Override</th>
                                <th className="px-4 py-2 border-r text-left">Sender Mobile No 1</th>
                                <th className="px-4 py-2 border-r text-left">Sender Mobile No 2</th>
                                {/* <th className="px-4 py-2 border-r text-left">Action</th> */}
                            </tr>
                        </thead>

                        <tbody className="text-[12px]">
                            {employeeList.length > 0 ? (
                                employeeList.map((row, index) => (
                                    <tr
                                        key={row.id || index}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                    >
                                        <td className="px-4 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                name={`select-${index}`}
                                                className="w-5 h-5 accent-blue-900"
                                            />
                                        </td>
                                        <td className="px-4 py-2">{row.emp_name}</td>
                                        <td className="px-4 py-2">{row.email}</td>
                                        <td className="px-4 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={row.otpOverride}
                                                readOnly
                                                className="w-5 h-5 accent-blue-900"
                                            />
                                        </td>
                                        <td className="px-4 py-2">{row.sm1}
                                            <input type="number" name="sm1" id="sm1" className="py-1 text-sm px-2 border rounded-sm no-spinner" />
                                        </td>
                                        <td className="px-4 py-2">{row.sm2}
                                            <input type="number" name="sm2" id="sm2" className="py-1 text-sm px-2 border rounded-sm no-spinner" />
                                        </td>
                                        
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center text-gray-500 py-6 font-medium"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {showPagination && totalPages > 1 && (
                <div className="flex justify-center mt-4">
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

export default MemberLoginDetails;
