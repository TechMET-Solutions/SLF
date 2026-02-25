import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { addRolesApi, fetchRolesApi, updateRolesApi, updateRolesStatusApi } from "../API/Master/User_Management/Roles";
import Rights from "../assets/Rights.png";
import Loader from "../Component/Loader";
import Pagination from "../Component/Pagination";


const UserRolePermission = () => {

  useEffect(() => {
    document.title = "SLF | User Role Permission";
  }, []);
  
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    role_name: "",
    system_name: "",
    is_system_role: false,
    is_active: true,
  });

  // 📌 Fetch all records with pagination
  const fetchRoles = async (page = 1) => {
    setLoading(true);
    try {
      const result = await fetchRolesApi(page, itemsPerPage);
      if (result?.roles) {
        setRoles(result.roles);
        setTotalItems(result.total);
        setCurrentPage(result.page);
        setShowPagination(result.showPagination || false);
      } else {
        setRoles([]);
        setShowPagination(false);
      }
    } catch (err) {
      console.error("❌ Error fetching:", err);
      setRoles([]);
      setShowPagination(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 🟦 Toggle Status
  const handleToggleStatus = async (item) => {
    try {
      const newStatus = item.is_active === 1 ? 0 : 1;
      await updateRolesStatusApi(item.id, newStatus);
      fetchRoles(currentPage);
    } catch (error) {
      console.error("❌ Error toggling status:", error);
    }
  };

  // 🔹 Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 🔹 Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isEditMode) {
  //       await updateRolesApi(formData);
  //     } else {
  //       await addRolesApi(formData);
  //     }
  //     setIsModalOpen(false);
  //     setFormData({
  //       id: null,
  //       role_name: "",
  //       system_name: "",
  //       is_system_role: false,
  //       is_active: true,
  //     });
  //     setIsEditMode(false);
  //     fetchRoles(currentPage);
  //   } catch (error) {
  //     console.error("❌ Error submitting form:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateRolesApi(formData);
      } else {
        await addRolesApi(formData);
      }

      // ✅ Success
      alert("✅ Role saved successfully");

      setIsModalOpen(false);

      setFormData({
        id: null,
        role_name: "",
        system_name: "",
        is_system_role: false,
        is_active: true,
      });

      setIsEditMode(false);
      fetchRoles(currentPage);

    } catch (error) {

      console.error("❌ Error submitting form:", error);

      // ✅ Show duplicate role alert
      if (
        error?.response?.data?.error?.includes("Role name already exists") ||
        error?.response?.data?.message?.includes("Role name already exists")
      ) {
        alert("❌ Role name already exists");
      } else {
        alert("❌ Something went wrong");
      }
    }
  };

  // 🔹 Edit role
  const handleEdit = (role) => {
    setFormData({
      id: role.id,
      role_name: role.name || role.role_name || "",
      system_name: role.SystemName || role.system_name || "",
      is_system_role: role.is_system_role || false,
      is_active: role.is_active !== undefined ? role.is_active : true,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // 🔹 Close modal and reset form
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormData({
      id: null,
      role_name: "",
      system_name: "",
      is_system_role: false,
      is_active: true,
    });
  };

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchRoles(page);
  };

  if (loading) return <div className="text-center py-10"><Loader /></div>;

  return (
    <div className="min-h-screen w-full">
      {/* middletopbar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            User Role List & Role Permission
          </h2>

          <div className="flex gap-3">
            <div className="flex justify-between gap-5">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                  gap: "6.25px",
                }}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Add
              </button>

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                onClick={() => navigate(-1)}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[300px] rounded-lg shadow-lg p-6">
            {/* Modal Header */}
            <h2
              className="text-[#0A2478] mb-6"
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              {isEditMode ? "Edit User Role" : "Add New User Role"}
            </h2>

            {/* Modal Body */}
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                {/* Role Name Input */}
                <div className="flex-1">
                  <label className="text-[14px]">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role_name"
                    placeholder="Name"
                    value={formData.role_name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                    required
                  />
                </div>

                {/* System Name Input */}
                {/* <div className="flex-1">
                  <label className="text-[14px]">
                    System Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="system_name"
                    placeholder="System Name"
                    value={formData.system_name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                    required
                  />
                </div> */}
              </div>

              <div className="flex gap-10 justify-center items-center mt-5">
                {/* <div className="flex items-center space-x-2">
                  
                  <input
                    type="checkbox"
                    id="is_system_role"
                    name="is_system_role"
                    checked={formData.is_system_role}
                    onChange={handleInputChange}
                    className="w-[24px] h-[24px] accent-[#0A2478]"
                  />
                  <label htmlFor="is_system_role" className="text-[14px]">
                    Is System Role 
                  </label>
                </div> */}

                {/* <div className="flex items-center space-x-2">
                 
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="w-[24px] h-[24px] accent-[#0A2478]"
                  />
                   <label htmlFor="is_active" className="text-[14px]">
                    Is Active 
                  </label>
                </div> */}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-[#0A2478] text-white px-6 py-2 rounded"
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  className="bg-[#C1121F] text-white px-6 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Exit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex pl-[110px]">
        <div className="overflow-x-auto mt-5  h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[250px]">Name</th>
                {/* <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[363px]">System Name</th> */}
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[50px]">Active</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[50px]">Action</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[50px]">Rights</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {roles.length > 0 ? (
                roles.map((row, index) => (
                  <tr
                    key={row.id || index}
                 className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2">{row.name || row.role_name}</td>
                    {/* <td className="px-4 py-2">{row.SystemName || row.system_name}</td> */}
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleToggleStatus(row)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${row.is_active === 1 ? "bg-[#0A2478]" : "bg-gray-400"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform  cursor-pointer duration-300 ease-in-out ${row.is_active === 1 ? "translate-x-6" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          title="Edit"
                          className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                          onClick={() => handleEdit(row)}
                          
                        >
                          <FiEdit />
                        </button>
                      </div>
                    </td>
                   <td className="px-4 py-2">
  <div className="flex gap-2 justify-center">
    <button
      className="bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5"
                          onClick={() => navigate(`/User-Role`, { state: { row } })}
                          title='Rights'
    >
      <img
        src={Rights}
        alt="rights"
        className="w-[18px] h-[18px] cursor-pointer"
      />
    </button>
  </div>
</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    No roles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-6 pb-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserRolePermission;