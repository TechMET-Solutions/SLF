import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { usePermission } from "../API/Context/PermissionContext";
import Loader from "../Component/Loader";

const LoanRepayment = () => {
  const navigate = useNavigate();
const { permissions, userData } = usePermission();
  const [searchHeaders, setSearchHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 20;
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  // ✅ API CALL
  // const fetchLoanRepayments = async (page = 1, search = "") => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.get(
  //       `${API}/Transactions/loan-repayments?page=${page}&limit=${itemsPerPage}&search=${search}`,
  //     );

  //     setData(response?.data.data);
  //     setTotalItems(response?.data.pagination.total);
  //     setTotalPages(response?.data.pagination.totalPages);
  //     setCurrentPage(page);
  //   } catch (error) {
  //     console.error("Error fetching repayments:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 const fetchLoanRepayments = async (page = 1) => {
  try {
    setLoading(true);

    const response = await axios.get(`${API}/Transactions/loan-repayments`, {
      params: {
        page,
        limit: itemsPerPage,
        search: searchQuery,
        fields: searchHeaders.join(","),
        fromDate,   // ✅ NEW
        toDate      // ✅ NEW
      },
    });

    setData(response?.data.data);
    setTotalItems(response?.data.pagination.total);
    setTotalPages(response?.data.pagination.totalPages);
    setCurrentPage(page);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching repayments:", error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchLoanRepayments(1);
  }, []);
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const allHeaderIds = [
    "loanId",
    "Print_Name",
    "receiptNumber",
    "payment_date",
  ];

  const handleSelectAll = () => {
    const allSelected = allHeaderIds.every((id) => searchHeaders.includes(id));
    setSearchHeaders(allSelected ? [] : [...allHeaderIds]);
  };

  const isDateSelected = searchHeaders.includes("payment_date");
  return (
    <div className="min-h-screen font-sans text-sm">
      {/* Header Section (UNCHANGED DESIGN) */}
      <div className="flex justify-center">
        <div className="flex justify-center ">
          <div className="flex items-center px-6 py-4 w-[1462px] h-[40px] border border-gray-200 justify-between shadow-sm bg-white">
            <h2 className="text-red-600 font-bold text-[20px] whitespace-nowrap">
              Loan-Repayment
            </h2>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[500px]">
                  {/* Multi-Select Header Dropdown */}
                  <div className="relative border-r border-gray-300 pr-2 mr-2">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full"
                    >
                      Headers ({searchHeaders.length}){" "}
                      <span className="text-[8px]">▼</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                        <button
                          onClick={handleSelectAll}
                          className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded border-b border-gray-200 mb-1"
                        >
                          <input
                            type="checkbox"
                            checked={allHeaderIds.every((id) =>
                              searchHeaders.includes(id),
                            )}
                            onChange={handleSelectAll}
                            className="w-3 h-3 accent-[#0A2478]"
                          />
                          <span className="text-[11px] font-source font-bold text-[#0A2478]">
                            Select All
                          </span>
                        </button>

                        {[
                          { id: "receiptNumber", label: "Receipt No" },
                          { id: "loanId", label: "Loan No" },
                          { id: "Print_Name", label: "Name" },
                          // { id: "payment_date", label: "Receipt Date" },
                        ].map((col) => (
                          <label
                            key={col.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
                          >
                            <input
                              type="checkbox"
                              checked={searchHeaders.includes(col.id)}
                              onChange={() => toggleHeader(col.id)}
                              className="w-3 h-3 accent-[#0A2478]"
                            />
                            <span className="text-[11px] font-source text-gray-700">
                              {col.label}
                            </span>
                          </label>
                        ))}
                        <div className="border-t mt-1 pt-1 text-center">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-[10px] text-[#0A2478] font-bold"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Input Field */}
                  <input
                    type="text"
                    value={searchQuery}
                    onClick={() => setIsDropdownOpen(false)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type multiple items (e.g. Cash, Asset)..."
                    className="flex-grow text-[11px] font-source outline-none h-full"
                  />

                  {/* Search Button */}
                  
                </div>
              </div>
              <div className="flex items-center gap-2 flex-grow">
    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="text-[11px] border border-gray-300 px-2 h-[24px] rounded"
    />
    <span className="text-[10px]">to</span>
    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="text-[11px] border border-gray-300 px-2 h-[24px] rounded"
    />
              </div>
              <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      fetchLoanRepayments(); // 🔥 call API here
                    }}
                    className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchHeaders([]);
                      fetchLoanRepayments();
                    }}
                    className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
                  >
                    Clear
                  </button>
              <button
                onClick={() => navigate("/")}
                className="w-[74px] h-[24px] cursor-pointer  rounded bg-[#C1121F] text-white text-[10px] "
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="flex  text-sm ml-[25px]">
        <div className="overflow-x-auto  shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0A2478] text-white  text-[11px]">
              <tr>
                <th className="p-2 border-r font-semibold  w-[200px]">
                  Receipt No
                </th>
                <th className="p-2 border-r font-semibold  w-[150px]">
                  Loan No
                </th>
                <th className="p-2 border-r font-semibold  w-[180px]">Name</th>
                <th className="p-2 border-r font-semibold  w-[100px]">
                  Loan type
                </th>
                <th className="p-2 border-r font-semibold  w-[100px]">
                  Receipt Date
                </th>
                <th className="p-2 border-r font-semibold  w-[130px]">
                  Loan Branch
                </th>
                <th className="p-2 border-r font-semibold  w-[120px]">
                  Amount
                </th>

                <th className="p-2 border-r font-semibold ">PayMode</th>
                <th className="p-2 border-r font-semibold  w-[180px]">
                  Add By
                </th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-[11px]">
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : data?.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center p-4">
                    No Records Found
                  </td>
                </tr>
              ) : (
                data?.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-2">{row.receiptNumber || "-"}</td>
                    <td className="p-2">{row.loanId}</td>
                    <td className="p-2 font-medium uppercase">
                      {row.Print_Name}
                    </td>
                    <td className="p-2">{row.loan_type}</td>
                    <td className="p-2">
                      {new Date(row.payment_date).toLocaleDateString()}
                    </td>
                    <td className="p-2">{row.branch_name || "-"}</td>
                    <td className="p-2">{row.amount}</td>

                    <td className="p-2">{row.payment_mode}</td>
                    <td className="p-2 text-xs text-blue-600">
                      {row.made_by || "-"}
                    </td>
                    <td className="p-2 text-center flex gap-2 justify-center">
                      {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Loan Repayment"
)?.Print) && (
    <button className="text-blue-500 hover:underline">
                        Print
                      </button>
)}
                    
                       {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Loan Repayment"
)?.view) && (
    <button
                        onClick={() =>
                          navigate("/loan-repayment-details", {
                            state: {
                              loanId: row.loanId,
                              loanType: row.loan_type,
                               receiptNumber: row.receiptNumber
                            },
                          })
                        }
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </button>
)}
                      
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6 mb-8">
        
        <button
          disabled={currentPage === 1}
          onClick={() => fetchLoanRepayments(currentPage - 1, searchQuery)}
          className="flex items-center gap-1 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-all duration-200"
        >
          <span className="text-lg">←</span> Previous
        </button>

       
        <div className="flex items-center gap-2 mx-2 flex-wrap">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              disabled={page === "..."}
              onClick={() =>
                page !== "..." && fetchLoanRepayments(page, searchQuery)
              }
              className={`min-w-[40px] h-10 px-2 flex items-center justify-center rounded-md border transition-all duration-200 ${
                currentPage === page
                  ? "bg-[#0A2478] text-white border-[#0A2478] font-semibold shadow-md"
                  : page === "..."
                    ? "border-none cursor-default text-gray-400"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

      
        <button
          disabled={currentPage === totalPages}
          onClick={() => fetchLoanRepayments(currentPage + 1, searchQuery)}
          className="flex items-center gap-1 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-all duration-200"
        >
          Next <span className="text-lg">→</span>
        </button>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default LoanRepayment;
