import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import blockimg from "../assets/blockimg.png";

const BASE_URL = `${API}/loan-charges`;

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-6 mb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-md ${currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[#0A2478] text-white"
          }`}
      >
        Previous
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === i + 1
                ? "bg-[#0A2478] text-white"
                : "bg-white text-gray-700"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-md ${currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[#0A2478] text-white"
          }`}
      >
        Next
      </button>
    </div>
  );
}

function LoanChargesList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchLoanNo, setSearchLoanNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleHeader = (headerId) => {
    setSearchHeaders(prev =>
      prev.includes(headerId)
        ? prev.filter(id => id !== headerId)
        : [...prev, headerId]
    );
  };


  useEffect(() => {
    document.title = "SLF | Loan Charges";
    fetchData();
  }, []);

  // 🧠 Fetch data from API
  // const fetchData = async (loanNo = "") => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(`${BASE_URL}/get`, {
  //       params: loanNo ? { loan_no: loanNo } : {},
  //     });
  //     const apiData = response.data?.data || [];
  //     setData(apiData);
  //   } catch (error) {
  //     console.error("❌ Error fetching loan charges:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get`, {
        params: {
          headers: searchHeaders.join(","), // convert array to string
          search: searchQuery
        },
      });

      const apiData = response.data?.data || [];
      setData(apiData);
    } catch (error) {
      console.error("❌ Error fetching loan charges:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑️ Delete record
  const handleDeleteConfirm = async () => {
    if (selectedRow) {
      try {
        await axios.delete(`${BASE_URL}/delete/${selectedRow.id}`);
        setData((prev) => prev.filter((item) => item.id !== selectedRow.id));
      } catch (error) {
        console.error("Error deleting record:", error);
      } finally {
        setDeleteModalOpen(false);
        setSelectedRow(null);
      }
    }
  };

  // ✏️ Edit button click
  const handleEditClick = (row) => {
    navigate("/edit-loan-charge", {
      state: {
        loanId: row.id, // ✅ Correct loanId passed
      },
    });
  };

  // 👁️ View button click
  const handleViewClick = (row) => {
    navigate("/view-loan-charge", {
      state: {
        loanId: row.id, // ✅ Correct loanId passed
      },
    });
  };

  // 🔹 Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const allHeaderIds = [
    "loan_no",
    "party_name",
    "Amount",
  ];

  const handleSelectAll = () => {
    if (searchHeaders.length === allHeaderIds.length) {
      setSearchHeaders([]);
    } else {
      setSearchHeaders(allHeaderIds);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center sticky top-[80px] z-40 ">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white ">
          <h2 className="text-red-600 font-bold text-[20px]">
            Loan Charges List
          </h2>

          <div className="flex gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[500px]">

                {/* Multi-Select Header Dropdown */}
                <div className="relative border-r border-gray-300 pr-2 mr-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full"
                  >
                    Headers ({searchHeaders.length}) <span className="text-[8px]">▼</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                     <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded border-b border-gray-200 mb-1"
                      >
                        <input
                          type="checkbox"
                          checked={allHeaderIds.every((id) => searchHeaders.includes(id))}
                          onChange={handleSelectAll}
                          className="w-3 h-3 accent-[#0A2478]"
                        />
                        <span className="text-[11px] font-source font-bold text-[#0A2478]">
                          Select All
                        </span>
                      </button>

                      {[
                        { id: "loan_no", label: "Loan No" },
                        { id: "party_name", label: "Party Name" },
                        { id: "Amount", label: "Amount" }
                      ].map((col) => (
                        <label key={col.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded">
                          <input
                            type="checkbox"
                            checked={searchHeaders.includes(col.id)}
                            onChange={() => toggleHeader(col.id)}
                            className="w-3 h-3 accent-[#0A2478]"
                          />
                          <span className="text-[11px] font-source text-gray-700">{col.label}</span>
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
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    fetchData();   // 🔥 call API here
                  }}
                  className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
                >
                  Search
                </button>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchHeaders([]);
                    fetchData();
                  }}
                  className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
                >
                  Clear
                </button>
              </div>
            </div>
           
            <button
              onClick={() => navigate("/add-loan-charge")}
              className="ml-2 mt-1 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
            >
              Add
            </button>
            <button
              onClick={() => navigate("/")}
              className=" bg-[#C1121F] mt-1 text-white text-[11px] px-4 h-[24px] rounded-[3px]"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Table Section */}
      <div className='pr-[110px] pl-[110px]'>
        <div className="flex ">
          <div className="overflow-x-auto mt-6  h-[500px]">
            {isLoading ? (
              <p className="text-center text-gray-500 mt-10">Loading...</p>
            ) : (
              <table className="w-full border-collapse">
                {/* ✅ Table Header */}
                <thead className="bg-[#0A2478] text-white text-sm">
                  <tr>
                    <th className="px-4 py-2 text-left border-r w-[130px]">Loan No</th>
                    <th className="px-10 py-2 text-left border-r w-[200px]">Party Name</th>
                    <th className="px-4 py-2 text-left border-r w-[150px]">Amount</th>
                    <th className="px-4 py-2 text-left border-r w-[100px]">Added On</th>
                    <th className="px-4 py-2 text-left border-r w-[200px]">Added By Email</th>
                    <th className="px-4 py-2 text-left border-r">Action</th>
                  </tr>
                </thead>

                {/* ✅ Table Body */}
                <tbody className="text-[13px]">
                  {data.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-gray-500 border-b"
                      >
                        No loan charges found.
                      </td>
                    </tr>
                  ) : (
                    currentRows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                      >
                        <td className="px-4 py-2">{row.loan_no}</td>
                        <td className="px-4 py-2">{row.party_name}</td>
                        <td className="px-4 py-2">{row.total_charges}</td>
                        <td className="px-4 py-2">{row.loan_date}</td>
                        <td className="px-4 py-2">{row.added_by || "-"}</td>

                        <td className="px-4 py-2 flex items-center gap-2">
                          <button
                            onClick={() => handleViewClick(row)}
                            className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded text-white"
                            title="View"
                          >
                            <FiEye className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleEditClick(row)}
                            className="bg-green-500 hover:bg-green-600 p-1.5 rounded text-white"
                            title="Edit"
                          >
                            <FiEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRow(row);
                              setDeleteModalOpen(true);
                            }}
                            className="bg-red-500 hover:bg-red-600 p-1.5 rounded text-white"
                            title="Delete"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>


      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 🗑️ Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-[6.8px]">
          <div className="bg-white w-[396.27px] rounded-lg shadow-lg h-[386px] p-5">
            <div className="flex justify-center items-center mt-11">
              <img src={blockimg} alt="action" className="w-[113px] h-[113px]" />
            </div>

            <div className="mt-10">
              <p className="font-[Source_Sans_3] text-[21.79px] text-center">
                Are you sure you want to delete this entry?
              </p>
              <p className="text-center text-[#7C7C7C] mt-2">
                You won't be able to revert this action.
              </p>
            </div>

            <div className="mt-7 flex justify-center gap-4">
              <button
                className="bg-[#F11717] text-white text-[19px] font-semibold w-[67px] h-[31px] rounded"
                onClick={handleDeleteConfirm}
              >
                Yes
              </button>

              <button
                className="bg-[#0A2478] text-white text-[19px] font-semibold w-[67px] h-[31px] rounded"
                onClick={() => setDeleteModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanChargesList;
