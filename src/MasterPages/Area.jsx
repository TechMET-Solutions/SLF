import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import blockimg from "../assets/blockimg.png";
import { useNavigate } from "react-router-dom";
import {
  fetchAreasApi,
  addAreaApi,
  updateAreaApi,
  deleteAreaApi,
} from "../API/Master/Master_Profile/Area_Details";
import Pagination from "../Component/Pagination";

const indianStatesAndUTs = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Area = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [area, setArea] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    area_locality: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // 🟢 Fetch Area Data with Pagination
  const fetchArea = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await fetchAreasApi(page, itemsPerPage);
      if (result?.items) {
        setArea(result.items);
        setTotalItems(result.total);
        setCurrentPage(result.page);
        setShowPagination(result.showPagination || false);
      } else {
        setArea([]);
        setShowPagination(false);
      }
    } catch (error) {
      console.error("❌ Error fetching areas:", error);
      setArea([]);
      setShowPagination(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArea();
  }, []);

  // 🟡 Open Modal for Add or Edit
  const handleOpenModal = (area = null) => {
    if (area) {
      setIsEditMode(true);
      setFormData({
        id: area.id,
        area_locality: area.area_locality,
        city: area.city,
        state: area.state,
        pincode: area.pincode,
        landmark: area.landmark,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        id: null,
        area_locality: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
      });
    }
    setIsModalOpen(true);
  };

  // 💾 Save or Update
  const handleSave = async () => {
    if (!formData.area_locality || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        area_locality: formData.area_locality,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark,
      };

      if (isEditMode && formData.id) {
        payload.id = formData.id;
        await updateAreaApi(payload);
      } else {
        await addAreaApi(payload);
      }

      setIsModalOpen(false);
      fetchArea(currentPage);
    } catch (error) {
      console.error("❌ Error saving area:", error);
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
      await deleteAreaApi(deleteId);
      setDeleteModalOpen(false);
      setDeleteId(null);
      fetchArea(currentPage);
    } catch (error) {
      console.error("❌ Error deleting area:", error);
      alert("Error deleting area");
    }
  };

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchArea(page);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Area</h2>
          <div className="flex gap-3">
            <button
              className="bg-[#0A2478] text-white text-sm rounded px-4 py-1 cursor-pointer"
              onClick={() => handleOpenModal(null)}
            >
              Add
            </button>
            <button
              className="bg-[#C1121F] text-white text-sm rounded px-4 py-1 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-md">
          <div className="bg-white w-[717px] rounded-lg shadow-lg h-[400px] p-10">
            <h2 className="text-[#0A2478] font-semibold text-[20px] mb-4">
              {isEditMode ? "Edit Area" : "Add Area"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[14px]">Area / Locality <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Enter area or locality"
                  className="border border-gray-300 rounded px-3 py-2 w-[280px]"
                  value={formData.area_locality}
                  onChange={(e) => setFormData({ ...formData, area_locality: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[14px]">City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Eg. Nashik"
                  className="border border-gray-300 rounded px-3 py-2 w-[280px]"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[14px]">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 w-[280px]"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                >
                  <option value="">Select State</option>
                  {indianStatesAndUTs.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[14px]">Pincode <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Pincode"
                  className="border border-gray-300 rounded px-3 py-2 w-[280px]"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[14px]">Landmark <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="landmark"
                  className="border border-gray-300 rounded px-3 py-2 w-[280px]"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                className="bg-[#0A2478] text-white px-4 py-2 rounded cursor-pointer"
                onClick={handleSave}
              >
                Submit
              </button>
              <button
                className="bg-[#C1121F] text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-md">
          <div className="bg-white w-[396px] rounded-lg shadow-lg h-[386px] p-5">
            <div className="flex justify-center mt-2">
              <img src={blockimg} alt="block" className="w-[113px] h-[113px]" />
            </div>
            <div className="mt-10 text-center">
              <p className="text-[22px] font-medium">Are you sure to delete this List?</p>
              <p className="text-[17px] text-gray-600 mt-2">You won't be able to revert this action.</p>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4">
              <button
                className="bg-[#F11717] text-white px-5 py-2 rounded text-[18px] cursor-pointer"
                onClick={handleDeleteConfirm}
              >
                Ok
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

      {/* Area Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          {area.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg text-gray-500">No Data Found</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 border-r-2 text-left">Sr No</th>
                  <th className="px-4 py-2 border-r-2 text-left">Area/Locality</th>
                  <th className="px-4 py-2 border-r-2 text-left">City</th>
                  <th className="px-4 py-2 border-r-2 text-left">State</th>
                  <th className="px-4 py-2 border-r-2 text-left">Pincode</th>
                  <th className="px-4 py-2 border-r-2 text-left">Landmark</th>
                  <th className="px-4 py-2 border-r-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {area.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-2">{row.area_locality}</td>
                    <td className="px-4 py-2">{row.city}</td>
                    <td className="px-4 py-2">{row.state}</td>
                    <td className="px-4 py-2">{row.pincode}</td>
                    <td className="px-4 py-2">{row.landmark}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="bg-green-500 p-1.5 text-white rounded cursor-pointer"
                          onClick={() => handleOpenModal(row)}
                        >
                          <FiEdit className="text-white text-sm"/>
                        </button>
                        <button
                          className="bg-red-600 p-1.5 text-white rounded cursor-pointer"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <FiTrash2 className="text-white text-sm"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

export default Area;