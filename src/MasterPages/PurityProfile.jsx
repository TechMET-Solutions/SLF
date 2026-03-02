import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  addPurityApi,
  deletePurityApi,
  deletePurityApiSilver,
  fetchPuritiesApi,
  updatePurityApi,
  updatePurityStatusApi,
} from "../API/Master/Master_Profile/Purity_Details";

import { useAuth } from "../API/Context/AuthContext";
import {
  addPurityApiForSilver,
  fetchPuritiesApiForSilver,
  updatePurityApiForSilver,
  updatePurityStatusApiForSilver,
} from "../API/Master/Master_Profile/Purity_Details_silver";
import blockimg from "../assets/blockimg.png";
import Pagination from "../Component/Pagination";

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
  const [Silverdata, setSilverData] = useState([]);
  const [productfordelete, setIsProductForDelete] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    loan_type: "Gold",
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

  const [currentPageForSilver, setCurrentPageForSilver] = useState(1);
  const [totalItemsForSilver, setTotalItemsForSilver] = useState(0);
  const [showPaginationForSilver, setShowPaginationForSilver] = useState(false);
  const itemsPerPageForSilver = 10;

  // 📌 Fetch all records with pagination
  const fetchPurities = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await fetchPuritiesApi(page, itemsPerPage);
      // console.log("Fetched purities:", result);
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

  const fetchPuritiesForSilver = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await fetchPuritiesApiForSilver(
        page,
        itemsPerPageForSilver,
      );
      if (result?.items) {
        setSilverData(result.items);
        setTotalItemsForSilver(result.total);
        setCurrentPageForSilver(result.page);
        setShowPaginationForSilver(result.showPagination || false);
      } else {
        setSilverData([]);
        setShowPaginationForSilver(false);
      }
    } catch (err) {
      console.error("❌ Error fetching:", err);
      setSilverData([]);
      setShowPaginationForSilver(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPurities();
    fetchPuritiesForSilver();
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
  const handleToggleStatusForSilver = async (item) => {
    try {
      const newStatus = item.status === 1 ? 0 : 1;
      await updatePurityStatusApiForSilver(item.id, newStatus);
      fetchPuritiesForSilver(currentPageForSilver);
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
        loan_type: "Gold",
        added_by: "Admin",
        status: 1,
      });
    }
    setIsModalOpen(true);
  };
  const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);
  // 💾 Save or Update
  const handleSave = async () => {
    if (!formData.purity_name?.trim()) {
      alert("Please enter the Purity Name.");
      return;
    }

    if (!formData.purity_percent?.trim()) {
      alert("Please enter the Purity Percent.");
      return;
    }

    if (!formData.loan_type?.trim()) {
      alert("Please select the Loan Type.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        purity_name: formData.purity_name,
        purity_percent: formData.purity_percent,
        loan_type: formData.loan_type,
        added_by: loginUser,
        status: formData.status,
      };

      if (isEditMode && formData.id) {
        payload.id = formData.id;
        if (formData.loan_type === "Gold") {
          await updatePurityApi(payload);
        } else {
          await updatePurityApiForSilver(payload);
        }
      } else {
        if (formData.loan_type === "Gold") {
          await addPurityApi(payload);
        } else {
          await addPurityApiForSilver(payload);
        }
      }

      setIsModalOpen(false);
      fetchPurities(currentPageForSilver);
      fetchPuritiesForSilver();
    } catch (error) {
      console.error("❌ Error saving item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑️ Show delete confirmation modal
  const handleDeleteClick = (id, item) => {
    debugger;
    setDeleteId(id);
    setDeleteModalOpen(true);
    setIsProductForDelete(item);
  };

  // 🟥 Confirm delete
  const handleDeleteConfirm = async () => {
    try {
      if (productfordelete === "Silver") {
        await deletePurityApiSilver(deleteId);
      } else {
        await deletePurityApi(deleteId);
      }

      setDeleteModalOpen(false);
      setDeleteId(null);
      setIsProductForDelete("");
      fetchPurities(currentPage);
      fetchPuritiesForSilver(currentPage);
    } catch (error) {
      console.error("❌ Error deleting purity:", error);
      alert("Error deleting purity");
    }
  };

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalPagesForSilver = Math.ceil(
    totalItemsForSilver / itemsPerPageForSilver,
  );
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchPurities(page);
  };

  return (
    <div className="min-h-screen w-full">
      {/* middletopbar */}
      <div className="flex  sticky top-[80px] z-40">
        <div className="flex  mt-2 ml-[22px]">
          <div className="flex items-center justify-between px-6 py-4 border-b w-[1462px] h-[50px] border rounded-[11px] border-gray-200 bg-white">
            <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
              Product Purity
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
                className="w-[74px] h-[24px] cursor-pointer  rounded bg-[#C1121F] text-white text-[10px]"
              >
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
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[14px] font-medium">
                  Product Type <span className="text-red-500">*</span>
                </label>

                <select
                  name="loan_type"
                  value={formData.loan_type}
                  onChange={(e) =>
                    setFormData({ ...formData, loan_type: e.target.value })
                  }
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                >
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
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
                  onChange={(e) =>
                    setFormData({ ...formData, purity_name: e.target.value })
                  }
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                />
              </div>
              <div>
                <label className="text-[14px] font-medium">
                  Purity % <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Purity Percent"
                  value={formData.purity_percent}
                  onChange={(e) =>
                    setFormData({ ...formData, purity_percent: e.target.value })
                  }
                  style={{
                    MozAppearance: "textfield",
                  }}
                  onWheel={(e) => e.target.blur()}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                disabled={isLoading}
                onClick={handleSave}
                className={`bg-[#0A2478] cursor-pointer text-white px-5 py-2 rounded ${isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#081b5c]"
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
              <img
                src={blockimg}
                alt="action"
                className="w-[113px] h-[113px]"
              />
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
      <div className="flex  gap-10  mt-3 ml-[22px]">
        <div>
          <p
            className="font-semibold text-[#0A2478]"
            style={{
              fontFamily: "Playfair Display",
              fontSize: "23.23px",
              lineHeight: "148%",
            }}
          >
            Gold Purity
          </p>

       

          <div className="overflow-x-auto mt-2 w-[620px] h-[500px]">
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm sticky top-0">
                <tr>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">Purity </th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">Purity %</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">Product</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[200px]">Added By</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px]">Action</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px]">Active</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {data.length === 0 && !isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10">
                      <p className="text-lg text-gray-500">No Data Found</p>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-1 py-1">{row.purity_name}</td>
                      <td className="px-1 py-1">{row.purity_percent}</td>
                      <td className="px-1 py-1">{row.loan_type}</td>
                      <td className="px-1 py-1">{row.added_by}</td>
                      <td className="px-1 py-1 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                            onClick={() => handleOpenModal(row)}
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="bg-[#f51111ec] cursor-pointer p-1.5 text-white rounded-sm"
                            onClick={() => handleDeleteClick(row.id, row.loan_type)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                      <td className="px-1 py-1">
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div>
          {/* <p className=" font-bold text-[20px] leading-[148%]">Silver Purity</p> */}

          <p
            className="font-semibold text-[#0A2478]"
            style={{
              fontFamily: "Playfair Display",
              fontSize: "23.23px",
              lineHeight: "148%",
            }}
          >
            Silver Purity
          </p>
          <div className="overflow-x-auto mt-2 w-[620px] h-[500px]">
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm sticky top-0">
                <tr>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">Purity</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">Purity %</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">Product</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[200px]">Added By</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px]">Action</th>
                  <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px]">Active</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {Silverdata.length === 0 && !isLoading ? (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <p className="text-lg text-gray-500">No Data Found</p>
                    </td>
                  </tr>
                ) : (
                  Silverdata.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-1 py-1">{row.purity_name}</td>
                      <td className="px-1 py-1">{row.purity_percent}</td>
                      <td className="px-1 py-1">{row.loan_type}</td>
                      <td className="px-1 py-1">{row.added_by}</td>
                      <td className="px-1 py-1 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                            onClick={() => handleOpenModal(row)}
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="bg-[#f51111ec] cursor-pointer p-1.5 text-white rounded-sm"
                            onClick={() => handleDeleteClick(row.id, row.loan_type)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                      <td className="px-1 py-1">
                        <button
                          onClick={() => handleToggleStatusForSilver(row)}
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
          <Pagination
            currentPage={currentPageForSilver}
            totalPages={totalPagesForSilver}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PurityProfile;
