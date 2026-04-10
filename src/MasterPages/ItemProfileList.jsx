import axios from "axios";
import { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiFileExcel2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import { usePermission } from "../API/Context/PermissionContext";
import {
  addItemApi,
  updateItemApi,
  updateItemStatusApi,
} from "../API/Master/Master_Profile/Item_Details";
import Pagination from "../Component/Pagination";
import Loader from "../Component/Loader";
const ItemProfileList = () => {
  useEffect(() => {
    document.title = "SLF | Item Profile List";
  }, []);

  const navigate = useNavigate();
  const { permissions, userData } = usePermission();
const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    name: "",
    printName: "",
    remark: "",
    addedBy: "",
    status: 1,
  });

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔹 Fetch All Items or Search Items
  const fetchAllItems = async (
    page = 1,
    code = searchCode,
    name = searchName,
  ) => {
    try {
        setLoading(true);
      // Build search parameters
      const params = {
        page: page,
        limit: itemsPerPage,
        sortKey: sortConfig.key, // ✅ add this
        sortOrder: sortConfig.direction,
      };

      if (code) params.searchCode = code;
      if (name) params.searchName = name;

      const response = await axios.get(
        `${API}/Master/Master_Profile/searchItems`,
        { params },
      );

      if (response.data?.items) {
        setData(response.data.items);
        setTotalItems(response.data.total);
        setCurrentPage(response.data.currentPage);
        setShowPagination(response.data.showPagination || false);
          setLoading(false);
      } else {
        setData([]);
        setShowPagination(false);
          setLoading(false);
      }
    } catch (error) {
      console.error("❌ Error fetching items:", error);
      setData([]);
      setShowPagination(false);
      setLoading(false);
    }
  };

  // 🔹 Handle Search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchAllItems(1, searchCode, searchName);
  };

  // 🔹 Clear Search
  const handleClearSearch = () => {
    setSearchCode("");
    setSearchName("");
    setCurrentPage(1);
    fetchAllItems(1, "", "");
  };

  useEffect(() => {
    fetchAllItems();
  }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = "asc";

      if (prev.key === key && prev.direction === "asc") {
        direction = "desc";
      }

      return { key, direction };
    });
  };
  // 🔹 Open Modal
  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData({
        id: item.id,
        code: item.code,
        name: item.name,
        printName: item.print_name || "",
        remark: item.remark || "",
        addedBy: item.added_by || "",
        status: item.status,
      });
      setIsEditMode(true);
    } else {
      setFormData({
        id: null,
        code: "",
        name: "",
        printName: "",
        remark: "",
        addedBy: "",
        status: 1,
      });
      setIsEditMode(false);
    }
    setIsModalOpen(true);
  };

  // 🔹 Save Item (Add / Edit)
  const handleSave = async () => {
    debugger;
    if (!formData.code?.trim()) {
      alert("Please Select Item Type.");
      return;
    }
    if (!formData.name?.trim()) {
      alert("Please enter the Item Name .");
      return;
    }
    if (!formData.printName?.trim()) {
      alert("Please enter the Print Name.");
      return;
    }
    setLoading(true);
    const payload = {
      code: formData.code,
      name: formData.name,
      print_name: formData.printName,
      remark: formData.remark,
      status: formData.status,
    };

    // For new records: set added_by and add_on
    if (!isEditMode || !formData.id) {
      payload.added_by = loginUser;
      payload.add_on = new Date().toISOString();
    }

    // For edited records: set modified_by and modified_on
    if (isEditMode && formData.id) {
      payload.modified_by = loginUser;
      payload.modified_on = new Date().toISOString();
    }

    try {
      if (isEditMode && formData.id) {
        payload.id = formData.id;
        await updateItemApi(payload);
      } else {
        await addItemApi(payload);
      }
       setLoading(false);
      setIsModalOpen(false);
      fetchAllItems(currentPage, searchCode, searchName);
    } catch (error) {
      console.error("❌ Error saving item:", error);
       setLoading(false);
    }
  };

  // 🔹 Toggle Status
  const handleToggleStatus = async (item) => {
    try {
      const newStatus = item.status === 1 ? 0 : 1;
      await updateItemStatusApi(item.id, newStatus);
      fetchAllItems(currentPage, searchCode, searchName);
    } catch (error) {
      console.error("❌ Error toggling status:", error);
    }
  };

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchAllItems(page, searchCode, searchName);
  };

  // 🔹 Handle Enter Key Press in Search Inputs
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDownloadExcel = () => {
    if (!fromDate || !toDate) {
      alert("Please select both dates");
      return;
    }

    window.open(
      `${API}/Master/Master_Profile/excel?fromDate=${fromDate}&toDate=${toDate}`,
      "_blank",
    );

    setShowExcelModal(false);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex sticky top-[50px] z-40 w-full ml-[25px]">
        <div className="flex items-center px-6  border-b  w-full max-w-[1462px] lg:h-[40px] border  border-gray-200 justify-between bg-white">
          {/* LEFT SIDE: Name */}
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
            }}
            className="text-red-600 whitespace-nowrap"
          >
            Item Profile List
          </h2>

          {/* RIGHT SIDE: All Inputs and Buttons Grouped */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-white h-[32px] px-1 relative w-[570px]">
              {/* Search Input Fields */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-[11.25px] font-semibold whitespace-nowrap">
                    Item Types
                  </p>

                  <select
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    onKeyDown={handleKeyPress} // better than onKeyPress (deprecated)
                    className="border border-gray-400 px-3 py-1 text-[11.25px] rounded outline-none focus:border-[#0A2478]"
                    style={{ width: "120px", height: "27.49px" }}
                  >
                    <option value="">Select</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-[11.25px] font-semibold whitespace-nowrap">
                    Item Name
                  </p>
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border border-gray-400 px-3 py-1 text-[11.25px] rounded outline-none focus:border-[#0A2478]"
                    style={{ width: "120px", height: "27.49px" }}
                  />
                </div>
              </div>

              {/* Action Buttons Container */}
              <div className="flex items-center gap-2 ml-2 border-gray-200">
                <button
                  onClick={handleSearch}
                  className="bg-[#0b2c69] text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                  style={{ width: "70px", height: "27.49px" }}
                >
                  Search
                </button>

                <button
                  onClick={handleClearSearch}
                  className="bg-[#6c757d] text-white text-[11.25px] rounded cursor-pointer hover:bg-gray-700 transition-colors"
                  style={{ width: "70px", height: "27.49px" }}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Item Profile",
                )?.add) && (
                <button
                  onClick={() => handleOpenModal()}
                  className="bg-[#0A2478] text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                  style={{ width: "60px", height: "27.49px" }}
                >
                  Add
                </button>
              )}

              <button
                onClick={() => navigate("/")}
                className="bg-[#C1121F] text-white text-[10px] rounded cursor-pointer hover:bg-[#a40f1a] transition-colors"
                style={{ width: "60px", height: "27.49px" }}
              >
                Exit
              </button>
              {/* <button
                type="button"
                onClick={handleDownloadExcel}
                style={{ width: "30px", height: "27.49px" }}
                className="flex items-center justify-center bg-[#217346] text-white rounded-md">
                <RiFileExcel2Line className="w-4 h-4" />
                
              </button> */}
              <button
                type="button"
                onClick={() => setShowExcelModal(true)}
                style={{ width: "30px", height: "27.49px" }}
                className="flex items-center justify-center bg-[#217346] text-white rounded-md"
              >
                <RiFileExcel2Line className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "#0101017A", backdropFilter: "blur(6.8px)" }}
        >
          <div className="bg-white w-[717px] p-10 rounded-lg shadow-lg">
            <h2 className="text-[#0A2478] mb-6 text-[20px] font-semibold">
              {isEditMode ? "Edit Item" : "Add New Item"}
            </h2>

            <div className="flex gap-4 ">
              <div>
                <p className="text-[14px] font-medium">
                  Item Type <span className="text-red-500">*</span>
                </p>

                <select
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="border border-gray-300 rounded w-[100px] px-3 py-2 mt-2"
                >
                  <option value="">Select</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                </select>
              </div>

              <div>
                <label className="text-[14px] font-medium">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-[14px] font-medium">
                  Print Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.printName}
                  onChange={(e) =>
                    setFormData({ ...formData, printName: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>
            </div>
            <div className="col-span-3 mb-6 mt-2">
              <label className="text-[14px] font-medium">Remark</label>
              <input
                type="text"
                value={formData.remark}
                onChange={(e) =>
                  setFormData({ ...formData, remark: e.target.value })
                }
                className="border border-gray-300 rounded w-full px-3 py-2 mt-2"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSave}
                className="bg-[#0A2478] text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#C1121F] text-white px-6 py-2 rounded-md cursor-pointer"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex  ml-[25px]">
        <div className="overflow-x-auto  w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-1 py-1 border-r-2 text-left w-[100px]">
                  Item Type
                </th>
                <th className="px-1 py-1 border-r-2 text-left w-[150px]">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => handleSort("name")}
                  >
                    Name
                    {sortConfig.key !== "name" && (
                      <FaSort className="text-gray-400 text-xs" />
                    )}
                    {sortConfig.key === "name" &&
                      sortConfig.direction === "asc" && (
                        <FaSortUp className="text-blue-600 text-xs" />
                      )}
                    {sortConfig.key === "name" &&
                      sortConfig.direction === "desc" && (
                        <FaSortDown className="text-blue-600 text-xs" />
                      )}
                  </div>
                </th>
                <th className="px-1 py-1 border-r-2 text-left w-[220px]">
                  <div
                    className="flex items-center gap-2 "
                    onClick={() => handleSort("print_name")}
                  >
                    Print Name
                    {sortConfig.key !== "print_name" && (
                      <FaSort className="text-gray-400 text-xs" />
                    )}
                    {sortConfig.key === "print_name" &&
                      sortConfig.direction === "asc" && (
                        <FaSortUp className="text-blue-600 text-xs" />
                      )}
                    {sortConfig.key === "print_name" &&
                      sortConfig.direction === "desc" && (
                        <FaSortDown className="text-blue-600 text-xs" />
                      )}
                  </div>
                </th>
                <th className="px-1 py-1 border-r-2 text-left w-[200px]">
                  Added By
                </th>
                <th className="px-1 py-1 border-r-2 text-left w-[120px]">
                  Added On
                </th>
                <th className="px-1 py-1 border-r-2 text-left w-[200px]">
                  Modified By
                </th>
                <th className="px-1 py-1 border-r-2 text-left w-[120px]">
                  Modified On
                </th>
                <th className="px-1 py-1 border-r-2 text-left w-[100px]">
                  Action
                </th>
                <th className="px-1 py-1 border-r-2 text-left  w-[50px]">
                  Active
                </th>
              </tr>
            </thead>

            <tbody className="text-[12px]">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center text-gray-500 py-10 text-lg"
                  >
                    No Data Found
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-1 py-1">{row.code}</td>
                    <td className="px-1 py-1">{row.name}</td>
                    <td className="px-1 py-1">{row.print_name}</td>
                    {/* <td className="px-1 py-1">
                      {row.status === 1 ? "Active" : "Inactive"}
                    </td> */}
                    <td className="px-1 py-1">{row.added_by || "-"}</td>
                    <td className="px-1 py-1">
                      {row.add_on
                        ? new Date(row.add_on).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-1 py-1">{row.modified_by || "-"}</td>
                    <td className="px-1 py-1">
                      {row.modified_on
                        ? new Date(row.modified_on).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-1 py-1 text-[#1883EF] text-center cursor-pointer">
                      {(userData?.isAdmin ||
                        permissions?.Master?.find(
                          (item) => item.name === "Item Profile",
                        )?.edit) && (
                        <button
                          className="bg-green-500 p-1.5 text-white rounded cursor-pointer"
                          onClick={() => handleOpenModal(row)}
                          title="Edit"
                        >
                          <FiEdit className="text-white text-sm" />
                        </button>
                      )}
                    </td>
                    <td className="px-1 py-1">
                      {(userData?.isAdmin ||
                        permissions?.Master?.find(
                          (item) => item.name === "Item Profile",
                        )?.status) && (
                        <button
                          onClick={() => handleToggleStatus(row)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                            row.status === 1 ? "bg-[#0A2478]" : "bg-gray-400"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              row.status === 1
                                ? "translate-x-6"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showExcelModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Export Excel</h2>

            <div className="flex flex-col gap-3">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowExcelModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDownloadExcel}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {loading && <Loader />}
    </div>
  );
};

export default ItemProfileList;
