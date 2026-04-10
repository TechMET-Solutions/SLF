
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import GroupData from "../assets/Group 124.svg";
import Pagination from "../Component/Pagination";
import { formatIndianDate } from "../utils/Helpers";
import Loader from "../Component/Loader";

const SchemeDetailsList = () => {
  useEffect(() => {
    document.title = "SLF | Scheme Renewal List";
  }, []);
const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ============================================
  // 🔥 Fetch Expired Schemes with Pagination
  // ============================================
  const fetchSchemes = async (page = 1) => {
    setLoading(true);
  try {
    const response = await axios.get(
      `${API}/Scheme/getExpiredSchemes?page=${page}&limit=10`
    );

    const result = response.data; // {page, limit, totalItems, totalPages, data}

    setData(result);
    // setData4(result.data);        // <-- SET DATA4 HERE
    setCurrentPage(result.page);
    setTotalPages(result.totalPages);
    setLoading(false);

  } catch (err) {
    console.error("❌ Error fetching expired schemes:", err);
    setLoading(false);
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
      <div className="flex justify-center sticky top-[50px] z-40">
        <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border  border-gray-200 justify-between shadow bg-white">
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
      <div className="flex ml-[25px] ">
        <div className="overflow-x-auto  h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr className='text-left'>
             
                <th className="px-1 py-1 border w-[130px]">Scheme Name</th>
                   <th className="px-1 py-1 border w-[80px]">Product</th>
                <th className="px-1 py-1 border w-[120px]">From Date</th>
                <th className="px-1 py-1 border w-[120px]">To Date</th>
                <th className="px-1 py-1 border">Approval %</th>
                <th className="px-1 py-1 border w-[150px]">Min Loan</th>
                <th className="px-1 py-1 border w-[150px]">Max Loan</th>
                <th className="px-1 py-1 border w-[150px]">Renewed By</th>
                <th className="px-1 py-1 border">Renewed On</th>
                <th className="px-1 py-1 border">Action</th>
              </tr>
            </thead>

            <tbody className="text-[12px] text-left">
              {data?.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                   <td className="px-1 py-1">{row.schemeName}</td>
                  <td className="px-1 py-1">{row.product}</td>
                 
                  <td className="px-1 py-1">
                    {formatIndianDate(row.applicableFrom)}
                  </td>
                  <td className="px-1 py-1">
                    {formatIndianDate(row.applicableTo)}
                  </td>
                  <td className="px-1 py-1">{row.goldApprovePercent}</td>
                  <td className="px-1 py-1">{row.minLoanAmount}</td>
                  <td className="px-1 py-1">{row.maxLoanAmount}</td>
                  <td className="px-1 py-1">{row.renewedBy}</td>
                  <td className="px-1 py-1">{row.renewedOn}</td>

                  <td className="px-1 py-1 text-center">
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

      {loading && <Loader />}
    </div>
  );
};

export default SchemeDetailsList;
