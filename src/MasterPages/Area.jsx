import { useEffect, useState } from "react";
import axios from "axios";
import { encryptData, decryptData } from "../utils/cryptoHelper";
import { API } from "../api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import blockimg from "../assets/blockimg.png";
import { useNavigate } from "react-router-dom"; // for Exit button navigation

const indianStatesAndUTs = [
  // States
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
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

  const navigate = useNavigate();

  // 🟢 Fetch Area Data
  const fetchArea = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API}/Master/Master_Profile/get-area`);
      const decrypted = decryptData(res.data.data);
      setArea(decrypted || []);
    } catch (err) {
      console.error("❌ Error fetching area:", err);
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

      let url;
      let method;

      if (isEditMode && formData.id) {
        payload.id = formData.id;
        url = `${API}/Master/Master_Profile/update-area`;
        method = "put";
      } else {
        url = `${API}/Master/Master_Profile/add-area`;
        method = "post";
      }

      const encryptedPayload = encryptData(payload);
      const response = await axios({
        method,
        url,
        headers: { "Content-Type": "application/json" },
        data: { data: encryptedPayload },
      });

      if (response.status === 200) {
        setIsModalOpen(false);
        fetchArea();
      }
    } catch (error) {
      console.error("❌ Error saving item:", error.response || error);
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
      const payload = { id: deleteId };
      const encryptedPayload = encryptData(payload);

      const response = await axios.post(
        `${API}/Master/Master_Profile/delete-area`, // ✅ fixed endpoint
        { data: encryptedPayload },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setDeleteModalOpen(false);
        setDeleteId(null);
        fetchArea();
      }
    } catch (error) {
      console.error("❌ Error deleting area:", error.response || error);
      alert("Error deleting area");
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Area</h2>
          <div className="flex gap-3">
            <button
              className="bg-[#0A2478] text-white text-[11.25px] rounded px-3 py-1"
              onClick={() => handleOpenModal(null)}
            >
              Add
            </button>
            <button
              className="bg-[#C1121F] text-white text-[10px] rounded px-3 py-1"
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
                className="bg-[#0A2478] text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Submit
              </button>
              <button
                className="bg-[#C1121F] text-white px-4 py-2 rounded"
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
              <p className="text-[17px] text-gray-600 mt-2">You won’t be able to revert this action.</p>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4">
              <button
                className="bg-[#F11717] text-white px-5 py-2 rounded text-[18px]"
                onClick={handleDeleteConfirm}
              >
                Ok
              </button>
              <button
                className="bg-[#0A2478] text-white px-5 py-2 rounded text-[18px]"
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
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left">Sr No</th>
                <th className="px-4 py-2 text-left">Area/Locality</th>
                <th className="px-4 py-2 text-left">City</th>
                <th className="px-4 py-2 text-left">State</th>
                <th className="px-4 py-2 text-left">Pincode</th>
                <th className="px-4 py-2 text-left">Landmark</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {area.length > 0 ? (
                area.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{row.area_locality}</td>
                    <td className="px-4 py-2">{row.city}</td>
                    <td className="px-4 py-2">{row.state}</td>
                    <td className="px-4 py-2">{row.pincode}</td>
                    <td className="px-4 py-2">{row.landmark}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="bg-green-500 p-1.5 text-white rounded"
                          onClick={() => handleOpenModal(row)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="bg-red-600 p-1.5 text-white rounded"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No area found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Area;
