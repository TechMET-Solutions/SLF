import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api";

const LoanRepayment = () => {
  const navigate = useNavigate();

  const [searchHeaders, setSearchHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId]
    );
  };

  // ✅ API CALL
  const fetchLoanRepayments = async (page = 1, search = "") => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/Transactions/loan-repayments?page=${page}&limit=${itemsPerPage}&search=${search}`
      );

      setData(response?.data.data);
      setTotalItems(response?.data.pagination.total);
      setTotalPages(response?.data.pagination.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching repayments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanRepayments(1);
  }, []);

  return (
    <div className="min-h-screen font-sans text-sm">
      
      {/* Header Section (UNCHANGED DESIGN) */}
      <div className="flex justify-center">
        <div className="flex justify-center mt-5">
          <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
            <h2 className="text-red-600 font-bold text-[20px] whitespace-nowrap">
              Loan-Repayment
            </h2>

            <div className="flex items-center gap-6">
              <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[450px]">
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search multiple items..."
                  className="flex-grow text-[11px] outline-none h-full bg-transparent"
                />

                <button
                  onClick={() => fetchLoanRepayments(1, searchQuery)}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Search
                </button>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    fetchLoanRepayments(1, "");
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Clear
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section (DESIGN SAME) */}
      <div className='flex mr-[110px] ml-[110px] text-sm'>
        <div className="overflow-x-auto mt-4 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="p-2 border-r font-semibold text-sm w-[200px]">Receipt No</th>
                <th className="p-2 border-r font-semibold text-sm w-[100px]">Loan type</th>
                <th className="p-2 border-r font-semibold text-sm w-[100px]">Receipt Date</th>
                <th className="p-2 border-r font-semibold text-sm w-[130px]">Loan Branch</th>
                <th className="p-2 border-r font-semibold text-sm w-[120px]">Amount</th>
                <th className="p-2 border-r font-semibold text-sm w-[150px]">Loan No</th>
                <th className="p-2 border-r font-semibold text-sm w-[180px]">Name</th>
                <th className="p-2 border-r font-semibold text-sm">PayMode</th>
                <th className="p-2 border-r font-semibold text-sm w-[180px]">Add By</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
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
                    <td className="p-2">{row.loan_type}</td>
                    <td className="p-2">
                      {new Date(row.payment_date).toLocaleDateString()}
                    </td>
                    <td className="p-2">{row.branch_name || "-"}</td>
                    <td className="p-2">{row.amount}</td>
                    <td className="p-2">{row.loanId}</td>
                    <td className="p-2 font-medium uppercase">
                      {row.Print_Name}
                    </td>
                    <td className="p-2">{row.payment_mode}</td>
                    <td className="p-2 text-xs text-blue-600">
                      {row.made_by || "-"}
                    </td>
                    <td className="p-2 text-center flex gap-2 justify-center">
                      <button className="text-blue-500 hover:underline">
                        Print
                      </button>
                    <button 
  onClick={() => navigate('/loan-repayment-details', { 
    state: { 
      loanId: row.loanId, 
      loanType: row.loan_type 
    } 
  })}
  className="text-blue-500 hover:underline"
>
  View
</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination (Simple, No Design Change) */}
         {/* ✅ Pagination (Styled to match screenshot) */}


        </div>
      </div>
<div className="flex justify-center items-center gap-0 mt-6 mb-8">
  {/* Previous Button */}
  <button
    disabled={currentPage === 1}
    onClick={() => fetchLoanRepayments(currentPage - 1, searchQuery)}
    className="flex items-center gap-1 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors"
  >
    <span className="text-lg">←</span> Previous
  </button>

  {/* Page Numbers */}
  <div className="flex items-center gap-2 mx-4">
    {[...Array(totalPages)].map((_, index) => {
      const pageNum = index + 1;
      return (
        <button
          key={pageNum}
          onClick={() => fetchLoanRepayments(pageNum, searchQuery)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all ${
            currentPage === pageNum
              ? "bg-[#0A2478] text-white border-[#0A2478] font-semibold shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {pageNum}
        </button>
      );
    })}
  </div>

  {/* Next Button */}
  <button
    disabled={currentPage === totalPages}
    onClick={() => fetchLoanRepayments(currentPage + 1, searchQuery)}
    className="flex items-center gap-1 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors"
  >
    Next <span className="text-lg">→</span>
  </button>
</div>
    </div>
  );
};

export default LoanRepayment;