import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import blockimg from "../assets/blockimg.png"; // 🖼️ import your image

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-6 mb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-md ${
          currentPage === 1
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
            className={`px-3 py-1 border rounded-md ${
              currentPage === i + 1
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
        className={`px-3 py-1 border rounded-md ${
          currentPage === totalPages
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
  useEffect(() => {
    document.title = "SLF | Loan Charges";
  }, []);

  const navigate = useNavigate();

  // 🔹 Dummy Data
  const [data, setData] = useState([
    {
      id: 1,
      docNo: "DOC-001",
      docDate: "2025-01-15",
      loanNo: "LN-101",
      partyName: "Rahul Sharma",
      amount: "₹1,20,000",
      addedOn: "2025-01-20",
      addedByEmail: "rahul@slf.com",
    },
    {
      id: 2,
      docNo: "DOC-002",
      docDate: "2025-02-02",
      loanNo: "LN-102",
      partyName: "Priya Mehta",
      amount: "₹95,000",
      addedOn: "2025-02-05",
      addedByEmail: "priya@slf.com",
    },
    {
      id: 3,
      docNo: "DOC-003",
      docDate: "2025-03-12",
      loanNo: "LN-103",
      partyName: "Amit Verma",
      amount: "₹1,75,000",
      addedOn: "2025-03-15",
      addedByEmail: "amit@slf.com",
    },
  ]);

  // 🔹 Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRow) {
      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedRow.id)
      );
    }
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  // 🔹 Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">
            Loan Charges List
          </h2>

          {/* 🔹 Search Box */}
          <div className="flex items-right gap-3 ml-130">
            <input
              type="text"
              placeholder="Loan No"
              className="border border-gray-300 rounded-l-md px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#0A2478] placeholder-gray-500"
            />
            <button className="bg-[#0A2478] px-3 py-2 rounded-r-md flex items-center justify-center">
              <HiMagnifyingGlass className="text-white w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/add-loan-charge")}
              className="bg-[#0A2478] text-white text-sm rounded px-7 py-1 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Table Section */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-6 w-[1300px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r">Doc No</th>
                <th className="px-4 py-2 text-left border-r">Doc Date</th>
                <th className="px-4 py-2 text-left border-r">Loan No</th>
                <th className="px-10 py-2 text-left border-r">Party Name</th>
                <th className="px-4 py-2 text-left border-r">Amount</th>
                <th className="px-4 py-2 text-left border-r">Added On</th>
                <th className="px-10 py-2 text-left border-r">
                  Added By Email
                </th>
                <th className="px-4 py-2 text-left border-r">Action</th>
              </tr>
            </thead>

            <tbody className="text-[12px]">
              {currentRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{row.docNo}</td>
                  <td className="px-4 py-2">
                    {new Date(row.docDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{row.loanNo}</td>
                  <td className="px-4 py-2">{row.partyName}</td>
                  <td className="px-4 py-2">{row.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(row.addedOn).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{row.addedByEmail}</td>

                  {/* 🔹 Action Buttons */}
                  <td className="px-4 py-2 flex items-center gap-2">
                    <button
                      onClick={() => navigate("/view-loan-charge")}
                      className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded text-white"
                      title="View"
                    >
                      <FiEye className="text-sm" />
                    </button>
                    <button
                      onClick={() => navigate("/edit-loan-charge")}
                      className="bg-green-500 hover:bg-green-600 p-1.5 rounded text-white"
                      title="Edit"
                    >
                      <FiEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(row)}
                      className="bg-red-500 hover:bg-red-600 p-1.5 rounded text-white"
                      title="Delete"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className="flex justify-center mt-4">
        <div className="w-[1300px] border-t border-black"></div>
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
        <div className="fixed inset-0 flex  items-center justify-center z-50 bg-[#0101017A] backdrop-blur-[6.8px]">
          <div className="bg-white w-[396.27px] rounded-lg shadow-lg h-[386px] p-5">
            <div className="flex justify-center items-center mt-11">
              <img
                src={blockimg}
                alt="action"
                className="w-[113px] h-[113px]"
              />
            </div>

            <div className="mt-10">
              <p className="font-[Source_Sans_3] font-normal text-[21.79px] leading-none text-center">
                Are you sure to delete this Entry
              </p>
              <p className="font-[Source_Sans_3] font-normal text-[17.43px] leading-none text-center text-[#7C7C7C] mt-2">
                you won't be able to revert this action
              </p>
            </div>

            <div className="mt-7 flex justify-center gap-4">
              <button
                className="bg-[#F11717] cursor-pointer text-white font-[Source_Sans_3] font-semibold text-[19.61px] leading-none text-center w-[67.53px] h-[30.57px] rounded-[2.67px]"
                onClick={handleDeleteConfirm}
              >
                Yes
              </button>

              <button
                className="bg-[#0A2478] cursor-pointer text-white font-[Source_Sans_3] font-semibold text-[19.61px] leading-none text-center w-[67.53px] h-[30.57px] rounded-[2.67px]"
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
