import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEmployeeProfileApi } from "../API/Master/Employee_Profile/EmployeeProfile";
import Pagination from "../Component/Pagination";

const MemberBranchMapping = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    loadEmployees(page);
  };

  useEffect(() => {
    document.title = "SLF | Member Branch Mapping";
    loadEmployees();
  }, []);

   const navigate = useNavigate();

  const loadEmployees = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchEmployeeProfileApi(page, itemsPerPage);
      setData(response.items || []);
      setTotalItems(response.total || (response.items ? response.items.length : 0));
      setCurrentPage(response.page || page);
      setShowPagination(response.showPagination !== undefined ? response.showPagination : true);
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      setData([]);
      setShowPagination(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
            Member Branch Mapping
          </h2>
          <div className="flex gap-3">
            <button
            onClick={() => navigate("/")}
            className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 border-r">Emp Id</th>
                <th className="px-4 py-2 border-r">Name</th>
                <th className="px-4 py-2 border-r">Email</th>
                <th className="px-4 py-2 border-r">Mobile</th>
                <th className="px-4 py-2 border-r">Branch Mapping</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{row.emp_id}</td>
                  <td className="px-4 py-2">{row.emp_name}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.mobile_no}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/Add-Member-Branch-Mapping?id=${row.id}`}
                      className="text-blue-700"
                    >
                      Branch
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MemberBranchMapping;
