import { useEffect, useState } from "react";
import {
  fetchPuritiesApi,
  addPurityApi,
  updatePurityApi,
  updatePurityStatusApi,
  deletePurityApi,
} from "../API/Master/Master_Profile/Purity_Details";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import blockimg from "../assets/blockimg.png";
import Pagination from "../Component/Pagination";
import { useNavigate } from "react-router-dom";

const PurityProfile = () => {
  useEffect(() => {
    document.title = "SLF | Purity Profile ";
  }, []);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    loan_type: "",
    purity_name: "",
    purity_percent: "",
    added_by: "Admin",
    status: 1,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  // 📌 Fetch all records with pagination
  const fetchPurities = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await fetchPuritiesApi(page, itemsPerPage);
      if (result?.items) {
        setData(result.items);
        setTotalItems(result.total);
        setCurrentPage(result.page);
        setShowPagination(result.showPagination || false);
      } else {
        setData([]);
        setShowPagination(false);
      }
    } catch (err) {
      console.error("❌ Error fetching:", err);
      setData([]);
      setShowPagination(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPurities();
  }, []);

  // 🟦 Toggle Status
  const handleToggleStatus = async (item) => {
    try {
      const newStatus = item.status === 1 ? 0 : 1;
      await updatePurityStatusApi(item.id, newStatus);
      fetchPurities(currentPage);
    } catch (error) {
      console.error("❌ Error toggling status:", error);
    }
  };

  // 🟡 Open Modal for Add or Edit
  const handleOpenModal = (purity = null) => {
    if (purity) {
      setIsEditMode(true);
      setFormData({
        id: purity.id,
        purity_name: purity.purity_name,
        purity_percent: purity.purity_percent,
        loan_type: purity.loan_type,
        added_by: purity.added_by || "Admin",
        status: purity.status,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        id: null,
        purity_name: "",
        purity_percent: "",
        loan_type: "",
        added_by: "Admin",
        status: 1,
      });
    }
    setIsModalOpen(true);
  };

  // 💾 Save or Update
  const handleSave = async () => {
    if (!formData.purity_name || !formData.purity_percent || !formData.loan_type) {
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        purity_name: formData.purity_name,
        purity_percent: formData.purity_percent,
        loan_type: formData.loan_type,
        added_by: formData.added_by,
        status: formData.status,
      };

      if (isEditMode && formData.id) {
        payload.id = formData.id;
        await updatePurityApi(payload);
      } else {
        await addPurityApi(payload);
      }

      setIsModalOpen(false);
      fetchPurities(currentPage);
    } catch (error) {
      console.error("❌ Error saving item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑️ Show delete confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  // 🟥 Confirm delete
  const handleDeleteConfirm = async () => {
    try {
      await deletePurityApi(deleteId);
      setDeleteModalOpen(false);
      setDeleteId(null);
      fetchPurities(currentPage);
    } catch (error) {
      console.error("❌ Error deleting purity:", error);
      alert("Error deleting purity");
    }
  };

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchPurities(page);
  };

  return (
    <div className="min-h-screen w-full">
      {/* middletopbar */}
      <div className="flex justify-center">
        <div className="flex justify-center mt-5">
          <div className="flex items-center justify-between px-6 py-4 border-b w-[1290px] h-[62px] border rounded-[11px] border-gray-200">
            <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
              Product Purity Profile
            </h2>
            <div className="flex gap-5">
              <button
                onClick={() => handleOpenModal()}
                className="w-[74px] h-[24px]  cursor-pointer rounded bg-[#0A2478] text-white text-[11.25px] flex items-center justify-center"
              >
                Add
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-[74px] h-[24px] cursor-pointer  rounded bg-[#C1121F] text-white text-[10px]">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modelforAdd */}
      {/* ➕ Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md">
          <div className="bg-white w-[540px] rounded-lg shadow-lg p-5">
            <h2 className="text-[#0A2478] mb-6 font-semibold text-[20px]">
              {isEditMode ? "Edit Purity" : "Add New Purity"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                <label className="text-[14px] font-medium">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Gold"
                  value={formData.loan_type}
                  onChange={(e) => setFormData({ ...formData, loan_type: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                />
              </div> */}
              <div>
                <label className="text-[14px] font-medium">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.loan_type}
                  onChange={(e) => setFormData({ ...formData, loan_type: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                >
                  <option value="Gold">Gold</option>
                </select>
              </div>

              <div>
                <label className="text-[14px] font-medium">
                  Purity Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Purity Name"
                  value={formData.purity_name}
                  onChange={(e) => setFormData({ ...formData, purity_name: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                />
              </div>
              <div>
                <label className="text-[14px] font-medium">
                  Purity Percent <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Purity Percent"
                  value={formData.purity_percent}
                  onChange={(e) =>
                    setFormData({ ...formData, purity_percent: e.target.value })
                  }
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                disabled={isLoading}
                onClick={handleSave}
                className={`bg-[#0A2478] cursor-pointer text-white px-5 py-2 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#081b5c]"
                  }`}
              >
                {isLoading ? "Saving..." : isEditMode ? "Update" : "Save"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#C1121F] cursor-pointer text-white px-5 py-2 rounded hover:bg-[#a50f19] transition"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🗑️ Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-[6.8px]">
          <div className="bg-white w-[396.27px] rounded-lg shadow-lg h-[386px] p-5">
            <div className="flex justify-center items-center mt-2">
              <img src={blockimg} alt="action" className="w-[113px] h-[113px]" />
            </div>

            <div className="mt-10">
              <p className="font-[Source_Sans_3] font-normal text-[21.79px] leading-none text-center">
                Are you sure to delete this List
              </p>
              <p className="font-[Source_Sans_3] font-normal text-[17.43px] leading-none text-center text-[#7C7C7C] mt-2">
                you won't be able to revert this action
              </p>
            </div>

            <div className="mt-5 grid justify-center">
              <div className="pl-3">
                <button
                  className="bg-[#F11717] cursor-pointer text-white font-[Source_Sans_3] font-semibold text-[19.61px] leading-none text-center w-[67.53px] h-[30.57px] rounded-[2.67px]"
                  onClick={handleDeleteConfirm}
                >
                  Ok
                </button>
              </div>

              <div className="mt-4">
                <button
                  className="bg-[#0A2478] cursor-pointer text-white text-[19px] w-[100.66px] h-[30.57px] rounded-[2.67px] opacity-100"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px] ">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Purity Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Purity Percent</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Product Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added By</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Action</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Active</th>
              </tr>
            </thead>

            <tbody className="text-[12px]">
              {data.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No Data Found
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-2">{row.purity_name}</td>
                    <td className="px-4 py-2">{row.purity_percent}</td>
                    <td className="px-4 py-2">{row.loan_type}</td>
                    <td className="px-4 py-2">{row.added_by}</td>

                    <td className="px-4 py-2 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                          onClick={() => handleOpenModal(row)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="bg-[#f51111ec] cursor-pointer p-1.5 text-white rounded-sm"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <button
                        onClick={() => handleToggleStatus(row)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${row.status === 1 ? "bg-[#0A2478]" : "bg-gray-400"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${row.status === 1 ? "translate-x-6" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PurityProfile;