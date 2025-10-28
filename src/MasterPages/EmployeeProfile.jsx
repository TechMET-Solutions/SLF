import { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import blockimg from "../assets/blockimg.png";
import profileempty from "../assets/profileempty.png";
import {
  deleteEmployeeApi,
  fetchEmployeeProfileApi,
  createEmployeeApi,
  updateEmployeeApi,
  updateEmployeeStatusApi
} from "../API/Master/Employee_Profile/EmployeeProfile";
import Pagination from "../Component/Pagination";

const EmployeeProfile = () => {

  useEffect(() => {
    document.title = "SLF | Employee Profile";
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState({ empId: "", empName: "" });

  const [formData, setFormData] = useState({
    id: null,
    pan_card: "",
    aadhar_card: "",
    emp_name: "",
    emp_id: "",
    mobile_no: "",
    email: "",
    print_name: "",
    corresponding_address: "",
    permanent_address: "",
    branch: "",
    joining_date: "",
    designation: "",
    date_of_birth: "",
    assign_role: "",
    password: "",
    fax: "",
    emp_image: "",
    emp_add_prof: "",
    emp_id_prof: "",
    status: true,
  });

  // File states
  const [profileImage, setProfileImage] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [idProof, setIdProof] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchEmployee(page);
  };

  const handleFileChange = (e, setProfileImage) => {
    if (!e?.target?.files?.[0]) return; // safety check
    const file = e.target.files[0];
    setProfileImage(file);
    setFormData((prev) => ({ ...prev, emp_image: file.name }));
  };

  // ✅ Fetch employee list
  const fetchEmployee = async (page = 1) => {
    // setIsLoading(true);
    try {
      const result = await fetchEmployeeProfileApi(page, itemsPerPage);
      if (result?.items) {
        setEmployeeList(result.items);
        setTotalItems(result.total || result.data.length);
        setCurrentPage(result.page);
        setShowPagination(result.showPagination || false);
      } else {
        setEmployeeList([]);
        setShowPagination(false);
      }
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      setEmployeeList([]);
      setShowPagination(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleToggleStatus = async (item) => {
    try {
      const newStatus = item.status === 1 ? 0 : 1;
      await updateEmployeeStatusApi(item.id, newStatus);
      fetchEmployee(currentPage);
    } catch (error) {
      console.error("❌ Error toggling status:", error);
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
      await deleteEmployeeApi(deleteId);
      setDeleteModalOpen(false);
      setDeleteId(null);
      fetchEmployee(currentPage);
    } catch (error) {
      console.error("❌ Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };



  const handleView = (employee) => {
    setIsViewMode(true);
    setFormData(employee);
    setIsModalOpen(true);
  };


  // ✏️ Handle Edit
  const handleEdit = (employee) => {
    setIsEditMode(true);
    setFormData({
      ...employee,
      password: "", // Don't pre-fill password for security
    });
    setIsModalOpen(true);
  };

  // ➕ Handle Add New
  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      pan_card: "",
      aadhar_card: "",
      emp_name: "",
      emp_id: "",
      mobile_no: "",
      email: "",
      print_name: "",
      corresponding_address: "",
      permanent_address: "",
      branch: "",
      joining_date: "",
      designation: "",
      date_of_birth: "",
      assign_role: "",
      password: "",
      fax: "",
      emp_image: "",
      emp_add_prof: "",
      emp_id_prof: "",
      status: true,
    });
    setProfileImage(null);
    setAddressProof(null);
    setIdProof(null);
    setIsModalOpen(true);
  };

  // 💾 Handle Save/Update
  const handleSave = async () => {
    try {
      const payload = {
        pan_card: formData.pan_card,
        aadhar_card: formData.aadhar_card,
        emp_name: formData.emp_name,
        emp_id: formData.emp_id,
        mobile_no: formData.mobile_no,
        email: formData.email,
        print_name: formData.print_name,
        corresponding_address: formData.corresponding_address,
        permanent_address: formData.permanent_address,
        branch: formData.branch,
        joining_date: formData.joining_date,
        designation: formData.designation,
        date_of_birth: formData.date_of_birth,
        assign_role: formData.assign_role,
        password: formData.password,
        fax: formData.fax,
        emp_image: formData.emp_image,
        emp_add_prof: formData.emp_add_prof,
        emp_id_prof: formData.emp_id_prof,
        status: formData.status,
      };
      if (isEditMode && formData.id) {
        payload.id = formData.id;
        await updateEmployeeApi(payload);
        alert("Employee updated successfully");
      } else {
        await createEmployeeApi(payload);
        alert("Employee created successfully");
      }

      setIsModalOpen(false);
      fetchEmployee(currentPage);
    } catch (error) {
      console.error("❌ Error saving employee:", error);
      alert(error.response?.data?.message || "Error saving employee");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔍 Handle Search
  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching with:", searchTerm);
    // You might want to call a search API or filter locally
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Employee Profile List
          </h2>

          {/* Search & Actions */}
          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Id</p>
                <input
                  type="text"
                  value={searchTerm.empId}
                  onChange={(e) => setSearchTerm(prev => ({ ...prev, empId: e.target.value }))}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Name</p>
                <input
                  type="text"
                  value={searchTerm.empName}
                  onChange={(e) => setSearchTerm(prev => ({ ...prev, empName: e.target.value }))}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Search
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddNew}
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Add
              </button>
              <button
                className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-[1183px] max-h-[90vh] rounded-lg shadow-lg p-6 overflow-y-auto">
              {/* Title */}
              <h2 className="text-[#0A2478] text-[20px] font-semibold mb-6">
                {isEditMode ? "Edit Employee Profile" : "Add Employee Profile"}
              </h2>

              <div className="flex gap-6">
                {/* Left Form */}
                <div className="w-3/4 space-y-4 text-sm">
                  {/* PAN + Aadhaar + Name */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* PAN */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Pan Card Number*</label>
                      <div className="flex">
                        <input
                          type="text"
                          name="pan_card"
                          value={formData.pan_card}
                          onChange={handleInputChange}
                          placeholder="PAN Card Number"
                          className="border border-[#C4C4C4] rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button className="bg-[#0A2478] text-white px-3 py-2 rounded-r-md hover:bg-[#081c5b]">
                          Verify
                        </button>
                      </div>
                    </div>

                    {/* Aadhaar */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Aadhar Card Number*</label>
                      <div className="flex">
                        <input
                          type="text"
                          name="aadhar_card"
                          value={formData.aadhar_card}
                          onChange={handleInputChange}
                          placeholder="Aadhar Card Number"
                          className="border border-[#C4C4C4] rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button className="bg-[#0A2478] text-white px-3 py-2 rounded-r-md hover:bg-[#081c5b]">
                          Verify
                        </button>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Name*</label>
                      <input
                        type="text"
                        name="emp_name"
                        value={formData.emp_name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Employee ID, Mobile, Email */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Employee ID*</label>
                      <input
                        type="text"
                        name="emp_id"
                        value={formData.emp_id}
                        onChange={handleInputChange}
                        placeholder="Employee ID"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Mobile No*</label>
                      <input
                        type="text"
                        name="mobile_no"
                        value={formData.mobile_no}
                        onChange={handleInputChange}
                        placeholder="Mobile No"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Email ID*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email ID"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Corresponding Address */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Corresponding Address*</label>
                      <input
                        type="text"
                        name="corresponding_address"
                        value={formData.corresponding_address}
                        onChange={handleInputChange}
                        placeholder=" Corresponding Address*"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Radio Option */}
                    <div className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        id="sameAddress"
                        name="sameAddress"
                        checked={formData.permanent_address === formData.corresponding_address}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, permanent_address: prev.corresponding_address }));
                          } else {
                            setFormData(prev => ({ ...prev, permanent_address: "" }));
                          }
                        }}
                        className="border accent-blue-900 w-5 h-5"
                      />
                      <label htmlFor="sameAddress" className="text-gray-700 font-medium">
                        Permanent Address same as Correspondence Address?
                      </label>
                    </div>

                    {/* Permanent Address */}
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Permanent Address*</label>
                      <input
                        type="text"
                        name="permanent_address"
                        value={formData.permanent_address}
                        onChange={handleInputChange}
                        placeholder=" Permanent Address*"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Branch, Joining Date, Designation, DOB */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Branch*</label>
                      <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        placeholder="Branch"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Joining Date*</label>
                      <input
                        type="date"
                        name="joining_date"
                        value={formData.joining_date}
                        onChange={handleInputChange}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Designation*</label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="" disabled>Select Designation</option>
                        <option value="cashier">Cashier</option>
                        <option value="branch manager">Branch Manager</option>
                        <option value="executive">Executive</option>
                        <option value="administrator">Administrator</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Date of Birth*</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Role, Password, Fax */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Assign Role*</label>
                      <select
                        name="assign_role"
                        value={formData.assign_role}
                        onChange={handleInputChange}
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="Emp">Employee</option>
                        <option value="branch manager">Branch Manager</option>
                        <option value="executive">Executive</option>
                        <option value="administrator">Administrator</option>
                        <option value="auditor">Auditor</option>
                        <option value="minor role">Minor Role</option>
                        <option value="No role">No Role</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Password*</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-700 font-medium">Fax*</label>
                      <input
                        type="text"
                        name="fax"
                        value={formData.fax}
                        onChange={handleInputChange}
                        placeholder="Fax"
                        className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Upload Section */}
                <div className="w-1/4 p-4">
                  <div>
                    <div className="flex justify-center">
                      {profileImage ? (
                        <img
                          src={URL.createObjectURL(profileImage)}
                          alt="Profile Preview"
                          className="w-[120px] h-[140px] rounded-lg object-cover border border-gray-300"
                        />
                      ) : (
                        <img
                          src={profileempty}
                          alt="Default Profile"
                          className="w-[120px] h-[140px]"
                        />
                      )}
                    </div>
                    <div className="flex justify-center mt-2 mb-2">
                      <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
                        Upload Customer Profile
                      </label>
                    </div>

                    <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                      <label htmlFor="profileImage"
                        className="bg-[#D9D9D9] px-4 py-1.5 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold">
                        Choose File
                      </label>
                      <input
                        id="profileImage"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setProfileImage)}
                      />
                      <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                        {formData.emp_image || "No file chosen"}
                      </span>
                    </div>
                    <h1 className="text-[14px] font-medium">Add Proof</h1>
                    <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                      <label htmlFor="addressProof"
                        className="bg-[#D9D9D9] px-4 py-1.5 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold">
                        Choose File
                      </label>
                      <input id="addressProof" type="file" className="hidden" onChange={handleFileChange(setAddressProof)} />
                      <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                        {formData.emp_add_prof || "No file chosen"}
                      </span>
                    </div>
                    <h1 className="text-[14px] font-medium">Id Proof</h1>
                    <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                      <label htmlFor="idProof"
                        className="bg-[#D9D9D9] px-4 py-1.5 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold">
                        Choose File
                      </label>
                      <input id="idProof" type="file" className="hidden" onChange={handleFileChange(setIdProof)} />
                      <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                        {formData.emp_id_prof || "No file chosen"}
                      </span>
                    </div>

                    {isEditMode && (
                      <div className="mt-4 text-sm w-fit flex justify-end">
                        <p className="bg-green-500 px-2 py-1 text-white rounded-lg">
                          View Document History
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col gap-3 items-center justify-between mt-6">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <input
                    type="checkbox"
                    name="status"
                    checked={!!formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked }))}
                    className="w-5 h-5 accent-blue-900"
                  />
                  Is Active
                </label>
                <div className="flex gap-3">
                  <button
                    className="bg-[#0A2478] text-white w-[92px] h-[32px] rounded hover:bg-[#081c5b]"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-[#C1121F] text-white w-[92px] h-[32px] rounded hover:bg-[#a00e18]"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Delete Confirmation Modal */}
      {
        deleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0101017A] backdrop-blur-md">
            <div className="bg-white w-[396px] rounded-lg shadow-lg h-[386px] p-5">
              <div className="flex justify-center mt-2">
                <img src={blockimg} alt="block" className="w-[113px] h-[113px]" />
              </div>
              <div className="mt-10 text-center">
                <p className="text-[22px] font-medium">Are you sure to delete this employee?</p>
                <p className="text-[17px] text-gray-600 mt-2">You won't be able to revert this action.</p>
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
        )
      }

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] min-h-[500px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading employees...</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r">Employee ID</th>
                  <th className="px-4 py-2 text-left border-r">Name</th>
                  <th className="px-4 py-2 text-left border-r">Email</th>
                  <th className="px-4 py-2 text-left border-r">Mobile</th>
                  <th className="px-4 py-2 text-left border-r">DOJ</th>
                  <th className="px-4 py-2 text-left border-r">DOB</th>
                  <th className="px-4 py-2 text-left border-r">Address</th>
                  <th className="px-4 py-2 text-left border-r">Action</th>
                  <th className="px-4 py-2 text-left border-r">Active</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {employeeList.length > 0 ? (
                  employeeList.map((emp, index) => (
                    <tr
                      key={emp.id}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                    >
                      <td className="px-4 py-2">{emp.emp_id}</td>
                      <td className="px-4 py-2">{emp.emp_name}</td>
                      <td className="px-4 py-2">{emp.email}</td>
                      <td className="px-4 py-2">{emp.mobile_no}</td>
                      <td className="px-4 py-2">{new Date(emp.joining_date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{new Date(emp.date_of_birth).toLocaleDateString()}</td>
                      <td className="px-4 py-2 max-w-[200px] truncate" title={emp.corresponding_address}>
                        {emp.corresponding_address}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2 justify-center">
                          <button
                            title="View"
                            onClick={() => handleView(emp)}
                            className="bg-[#646AD9] p-1.5 rounded text-white hover:bg-[#5057c9]">
                            <FiEye />
                          </button>
                          <button
                            title="Edit"
                            className="bg-green-500 p-1.5 rounded text-white hover:bg-green-600"
                            onClick={() => handleEdit(emp)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            title="Delete"
                            className="bg-red-600 p-1.5 rounded text-white hover:bg-red-700"
                            onClick={() => handleDeleteClick(emp.id)}
                          >
                            <FiTrash2 title="Delete" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleToggleStatus(emp)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${emp.status ? "bg-[#0A2478]" : "bg-gray-300"
                            }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${emp.status ? "translate-x-6" : "translate-x-0"
                              }`}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {
        totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )
      }
    </div >
  );
};

export default EmployeeProfile;