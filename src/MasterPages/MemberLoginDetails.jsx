import axios from "axios";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { encryptData, decryptData } from "../../src/utils/cryptoHelper";
import Loader from "../Component/Loader";
import Pagination from "../Component/Pagination";

const MemberLoginDetails = () => {
  const navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // API Base URL
  const API_BASE = `${API}/Master/Employee_Profile`;

  // ✅ Fetch employee list with search
  const fetchEmployeeProfileApi = async (page = 1, limit = 10, search = "") => {
    try {
      // Build query string with search parameter
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      // Add search filter if provided
      if (search && search.trim()) {
        queryParams.append('search', search.trim());
      }

      const encryptedPayload = encryptData({});
      const response = await axios({
        method: "get",
        url: `${API_BASE}/getAll-employees?${queryParams.toString()}`,
        headers: { "Content-Type": "application/json" },
        data: { data: encryptedPayload },
      });

      if (response.data?.data) {  
        return decryptData(response.data.data);
      }
      console.log("API Response:", response.data);
      return { items: [], total: 0, page: 1, showPagination: false };
    } catch (error) {
      console.error("❌ Error fetching employee profiles:", error);
      return { items: [], total: 0, page: 1, showPagination: false };
    }
  };

  useEffect(() => {
    document.title = "SLF | Member Login Details";
    fetchEmployee(); // ✅ load initial data
  }, []);

  const fetchEmployee = async (page = 1, search = "") => {
    setIsLoading(true);
    try {
      const result = await fetchEmployeeProfileApi(page, itemsPerPage, search);

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

  // 🔍 Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    fetchEmployee(1, searchTerm);
  };

  // 🔄 Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    fetchEmployee(1, "");
  };

  // 📄 Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchEmployee(page, searchTerm);
  };

  // 📱 Update sender mobile numbers
  const updateSender = async (empId, sm1, sm2) => {
    if (sm1 && sm1.toString().length !== 10) {
      alert("Sender Mobile 1 must be 10 digits");
      return;
    }

    if (sm2 && sm2.toString().length !== 10) {
      alert("Sender Mobile 2 must be 10 digits");
      return;
    }

    try {
      await axios.post(`${API_BASE}/updateSender`, {
        empId: empId,
        sender_mobile1: sm1,
        sender_mobile2: sm2,
      });

      alert("Updated Successfully");
      fetchEmployee(currentPage, searchTerm); // refresh with current search
    } catch (e) {
      console.log(e);
      alert("Update Failed");
    }
  };

  // 🔐 Update OTP override
  const updateOTP = async (empId, boolValue) => {
    try {
      await axios.post(`${API_BASE}/updateOTP`, {
        empId: empId,
        value: boolValue ? 1 : 0,   // convert boolean → 0/1
      });

      fetchEmployee(currentPage, searchTerm); // refresh with current search
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="text-center py-10">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center sticky top-[80px] z-40">
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
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by employee name..."
                className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center hover:bg-[#071b5e] transition"
              >
                Search
              </button>
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="bg-gray-500 text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center hover:bg-gray-600 transition"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => navigate("/")}
              className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded hover:bg-[#9a0f19] transition"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

    

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-full max-w-[1290px] h-[500px] border border-gray-300 rounded">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-[#0A2478] text-white text-sm top-0">
              <tr>
                <th className="px-4 py-2 border-r text-center">#</th>
                <th className="px-4 py-2 border-r text-left">Name</th>
                <th className="px-4 py-2 border-r text-left">User ID</th>
                <th className="px-4 py-2 border-r text-center">OTP Override</th>
                <th className="px-4 py-2 border-r text-center">Sender Mobile No 1</th>
                <th className="px-4 py-2 border-r text-center">Sender Mobile No 2</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-[12px]">
              {employeeList.length > 0 ? (
                employeeList.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    {/* Serial Number */}
                    <td className="px-4 py-2 text-center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-2 font-medium">{row.emp_name}</td>

                    {/* User ID */}
                    <td className="px-4 py-2">{row.email}</td>

                    {/* OTP Override */}
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={row.OTP_Override == 1} // if db stores 0/1
                        onChange={(e) => updateOTP(row.id, e.target.checked)}
                        className="w-5 h-5 accent-blue-900 cursor-pointer"
                      />
                    </td>

                    {/* Sender Mobile 1 */}
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          maxLength="10"
                          pattern="[0-9]*"
                          value={row.sender_mobile1 || ""}
                          className="py-1 text-sm px-2 border rounded-sm no-spinner flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setEmployeeList(employeeList.map(emp => {
                              if (emp.id === row.id) {
                                return { ...emp, sender_mobile1: value };
                              }
                              return emp;
                            }));
                          }}
                        />
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          onClick={() => updateSender(row.id, row.sender_mobile1, row.sender_mobile2)}
                          title="Save Mobile 1"
                        >
                          <FaSave size={18} />
                        </button>
                      </div>
                    </td>

                    {/* Sender Mobile 2 */}
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          maxLength="10"
                          pattern="[0-9]*"
                          value={row.sender_mobile2 || ""}
                          className="py-1 text-sm px-2 border rounded-sm no-spinner flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setEmployeeList(employeeList.map(emp => {
                              if (emp.id === row.id) {
                                return { ...emp, sender_mobile2: value };
                              }
                              return emp;
                            }));
                          }}
                        />
                        <button
                          className="text-blue-600 hover:text-blue-800 transition"
                          onClick={() => updateSender(row.id, row.sender_mobile1, row.sender_mobile2)}
                          title="Save Mobile 2"
                        >
                          <FaSave size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-6 font-medium"
                  >
                    {searchTerm ? "No employees found matching your search." : "No records found."}
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