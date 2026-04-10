import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import blockimg from "../assets/blockimg.png";
import Pagination from "../Component/Pagination";
import { usePermission } from "../API/Context/PermissionContext";
import Loader from "../Component/Loader";


function EmployeeDesignation() {
    const [data, setData] = useState([]);
    const [designation, setDesignation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const navigate = useNavigate();
const [totalRecords, setTotalRecords] = useState(0);
    const BASE_URL = `${API}/Master/Employee_Profile`;
const { permissions, userData } = usePermission();
const [loading, setLoading] = useState(false);
    
  const fetchDesignations = async () => {
    try {
       setLoading(true);

        const response = await axios.get(
            `${BASE_URL}/get-designation?page=${currentPage}&limit=${itemsPerPage}`
        );
        setData(response.data.data || []);
        // ✅ FIX HERE
        setTotalRecords(response.data.total_records || 0);
        setLoading(false);

    } catch (err) {
        console.error("Fetch Designations Error:", err);
        setError("Failed to fetch designations");
        setLoading(false);
    } finally {
        setIsLoading(false);
        setLoading(false);
    }
};
    useEffect(() => {
        document.title = "SLF | Employee Designation";
        fetchDesignations();
    }, [currentPage]);
    // 🟧 Open Edit Modal
    const handleEditClick = (row) => {
        setSelectedDesignation(row);
        setEditModalOpen(true);
    };
    
    const handleSave = async () => {
        if (!designation.trim()) {
            alert("Please enter a designation");
            return;
        }
setLoading(true);
        try {
            const response = await axios.post(
                `${BASE_URL}/create-designation`,
                { designation }
            );

            alert(response.data.message);

            setDesignation("");
            fetchDesignations();
setLoading(false);
        } catch (err) {

            console.error("Add Designation Error:", err);

            // ✅ Show duplicate designation error
            if (err?.response?.data?.error?.includes("Designation already exists")) {
                alert("❌ Designation already exists");
                setLoading(false);
            }
            
            else {
        alert("Error adding designation");
        setLoading(false);
            }
        }
    };

    const handleEditConfirm = async () => {
setLoading(true);
        if (!selectedDesignation.designation.trim()) {
            alert("Designation name cannot be empty");
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/update-designation/${selectedDesignation.id}`,
                { designation: selectedDesignation.designation }
            );

            alert(response.data.message || "Designation updated successfully!");

            setEditModalOpen(false);
            fetchDesignations();
            setLoading(false);
        } catch (err) {

            console.error("Edit Error:", err);

            // ✅ Show duplicate designation error
            if (err?.response?.data?.error?.includes("Designation already exists")) {
                alert("❌ Designation already exists");
                setLoading(false);
            }
            else {
                alert("Error updating designation");
                setLoading(false);
            }
        }
    };

    // 🟥 Delete
    const handleDeleteConfirm = async () => {
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/delete-designation/${deleteId}`);
            alert("Designation deleted successfully!");
            setDeleteModalOpen(false);
            fetchDesignations();
            setLoading(false);
        } catch (err) {
            console.error("Delete Error:", err);
            alert("Error deleting designation");
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setDeleteModalOpen(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

const handlePrevious = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

const handleNext = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
};

const totalPages = Math.ceil(totalRecords / itemsPerPage);

const renderPaginationButtons = () => {
  const buttons = [];
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const currentPageLocal = currentPage;

  const pageLimit = 2;

  // ✅ Previous
  buttons.push(
    <button
      key="prev"
      onClick={() => handlePageChange(currentPageLocal - 1)}
      disabled={currentPageLocal === 1}
      className="px-3 py-1 border rounded-md disabled:opacity-50"
    >
      Previous
    </button>
  );

  // ✅ Page Button
  const createPageButton = (page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-3 py-1 border rounded-md ${
        currentPageLocal === page
          ? "bg-[#0b2c69] text-white"
          : "hover:bg-gray-100"
      }`}
    >
      {page}
    </button>
  );

  // ✅ First Page
  buttons.push(createPageButton(1));

  // ✅ Left ...
  if (currentPageLocal > pageLimit + 2) {
    buttons.push(<span key="left">...</span>);
  }

  // ✅ Middle Pages
  const start = Math.max(2, currentPageLocal - pageLimit);
  const end = Math.min(totalPages - 1, currentPageLocal + pageLimit);

  for (let i = start; i <= end; i++) {
    buttons.push(createPageButton(i));
  }

  // ✅ Right ...
  if (currentPageLocal < totalPages - pageLimit - 1) {
    buttons.push(<span key="right">...</span>);
  }

  // ✅ Last Page
  if (totalPages > 1) {
    buttons.push(createPageButton(totalPages));
  }

  // ✅ Next
  buttons.push(
    <button
      key="next"
      onClick={() => handlePageChange(currentPageLocal + 1)}
      disabled={currentPageLocal === totalPages}
      className="px-3 py-1 border rounded-md disabled:opacity-50"
    >
      Next
    </button>
  );

  return buttons;
};
    return (
        <div className="min-h-screen w-full">
           
            <div className="flex justify-center sticky top-[50px] z-40">
                <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border  border-gray-200 justify-between bg-white">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source ">
                        Designation
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-3 items-center">
                            <p className="text-[11.25px] font-source">Designation  <span className="text-red-500">*</span></p>
                            <input
                                type="text"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSave}
                                className="bg-[#0A2478] cursor-pointer text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
                            >
                                Save
                            </button>
                            <button
                                className="bg-[#C1121F] cursor-pointer text-white text-[10px] w-[74px] h-[24px] rounded"
                                onClick={() => navigate(-1)}
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🟩 Edit Modal */}
            {editModalOpen && selectedDesignation && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ background: "#0101017A", backdropFilter: "blur(6.8px)" }}
                >
                    <div className="bg-white w-[400px] p-8 rounded-lg shadow-lg border border-gray-200">
                        {/* Header */}
                        <h2 className="text-[#0A2478] text-center mb-8 text-[22px] font-semibold">
                            Edit Designation
                        </h2>

                        {/* Form */}
                        <div className="grid grid-cols-3 gap-6 mb-10">
                            <div className="col-span-3">
                                <label className="text-[14px] font-medium text-gray-700">
                                    Designation Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={selectedDesignation.designation}
                                    onChange={(e) =>
                                        setSelectedDesignation({
                                            ...selectedDesignation,
                                            designation: e.target.value,
                                        })
                                    }
                                    placeholder="Enter designation name"
                                    className="border border-gray-300 rounded-md w-full px-2 py-1 mt-2 text-[14px] focus:ring-2 focus:ring-[#0A2478] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={handleEditConfirm}
                                className="bg-[#0A2478] text-white px-8 py-2 rounded-md text-[15px] font-medium hover:bg-[#071b5e] transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="bg-[#C1121F] text-white px-8 py-2 rounded-md text-[15px] font-medium hover:bg-[#9a0f19] transition"
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* 🟥 Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-md">
                    <div className="bg-white w-[396px] rounded-lg shadow-lg h-[486px] p-5">
                        <div className="mt-10 text-center">
                            <div className="flex justify-center mt-2">
                                <img src={blockimg} alt="block" className="w-[113px] h-[113px]" />
                            </div>
                            <div className="mt-10 text-center">
                                <p className="text-[22px] font-medium"> Are you sure you want to delete this designation?</p>
                                <p className="text-[17px] text-gray-600 mt-2">You won't be able to revert this action.</p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col items-center gap-4">
                            <button
                                className="bg-[#F11717] text-white px-5 py-2 rounded text-[18px] cursor-pointer"
                                onClick={handleDeleteConfirm}
                            >
                                Confirm Delete
                            </button>
                            <button
                                className="bg-[#0A2478] text-white px-5 py-2 rounded text-[18px] cursor-pointer"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🧾 Table */}
            <div className="flex justify-center">
                <div className="overflow-x-auto  w-[1462px] h-[500px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-lg text-gray-500">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-lg text-red-500">{error}</p>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-lg text-gray-500">No Data Found</p>
                        </div>
                    ) : (
                        <table className=" border-collapse">
                            <thead className="bg-[#0A2478] text-white text-sm">
                                <tr>
                                    <th className="px-2 py-1 text-left border-r">ID</th>
                                    <th className="px-2 py-1 text-left border-r w-[350px]">Designation</th>
                                    <th className="px-2 py-1 text-center border-r">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px]">
                                {data.map((row, index) => (
                                    <tr
                                        key={row.id}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            }`}
                                    >
                                        <td className="px-2 py-1">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="px-2 py-1">{row.designation}</td>
                                        <td className="px-2 py-1 text-center">
                                            <div className="flex gap-2 justify-center">
                                                {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Employee Designation"
)?.edit) && (
     <button
                                                    title="Edit"
                                                    onClick={() => handleEditClick(row)}
                                                    className="bg-green-500 p-1.5 rounded text-white hover:bg-green-600"
                                                >
                                                    <FiEdit />
                                                </button>
)}
                                              {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Employee Designation"
)?.delete) && (
      <button
                                                    title="Delete"
                                                    onClick={() => handleDeleteClick(row.id)}
                                                    className="bg-red-600 p-1.5 rounded text-white hover:bg-red-700"
                                                >
                                                    <FiTrash2 />
                                                </button>
)}
                                               
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
          <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
  {renderPaginationButtons()}
</div>
{loading && <Loader />}
            {/* Pagination */}
           
        </div>
    );
}

export default EmployeeDesignation;
