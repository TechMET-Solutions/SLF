import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import {
  addItemApi,
  updateItemApi,
  updateItemStatusApi
} from "../API/Master/Master_Profile/Item_Details";
import Pagination from "../Component/Pagination";
import { useAuth } from "../API/Context/AuthContext";

const ItemProfileList = () => {
  useEffect(() => {
    document.title = "SLF | Item Profile List";
  }, []);

  const navigate = useNavigate();

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
//   const [loginUser, setLoginUser] = useState(""); 
//   console.log(loginUser,"loginUser")


//   useEffect(() => {
//   const user = JSON.parse(sessionStorage.getItem("userData") || "{}");

//   const addedByValue = user.name || user.email || "";

//   setLoginUser(addedByValue);  // <-- store separately

//   console.log("LOGIN USER:", addedByValue);
// }, []);
 const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  // 🔹 Fetch All Items or Search Items
  const fetchAllItems = async (page = 1, code = searchCode, name = searchName) => {
    try {
      // Build search parameters
      const params = {
        page: page,
        limit: itemsPerPage
      };
      
      if (code) params.searchCode = code;
      if (name) params.searchName = name;
      
      const response = await axios.get(`${API}/Master/Master_Profile/searchItems`, { params });
      
      if (response.data?.items) {
        setData(response.data.items);
        setTotalItems(response.data.total);
        setCurrentPage(response.data.currentPage);
        setShowPagination(response.data.showPagination || false);
      } else {
        setData([]);
        setShowPagination(false);
      }
    } catch (error) {
      console.error("❌ Error fetching items:", error);
      setData([]);
      setShowPagination(false);
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
  }, []);

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
    debugger
     if (!formData.code?.trim()) {
    alert("Please enter the Code.");
    return;
  }
  if (!formData.name?.trim()) {
    alert("Please enter the Name.");
    return;
  }
  if (!formData.printName?.trim()) {
    alert("Please enter the Print Name.");
    return;
  }
  

    const payload = {
      code: formData.code,
      name: formData.name,
      print_name: formData.printName,
      added_by: loginUser,
      add_on: new Date().toISOString(),
      remark: formData.remark,
      status: formData.status,
      modified_by: formData.id ? formData.addedBy : "",
      modified_on: formData.id ? new Date().toISOString() : "",
    };

    try {
      if (isEditMode && formData.id) {
        payload.id = formData.id;
        await updateItemApi(payload);
      } else {
        await addItemApi(payload);
      }

      setIsModalOpen(false);
      fetchAllItems(currentPage, searchCode, searchName);
    } catch (error) {
      console.error("❌ Error saving item:", error);
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
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Top Bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
            }}
            className="text-red-600"
          >
            Item Profile List
          </h2>

          <div className="flex gap-10">
            {/* Search */}
            <div className="flex gap-5 items-center">
              <p className="text-[11.25px]">Item Code</p>
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border border-gray-400 px-3 py-1 text-[11.25px] rounded"
                style={{
                  width: "120px",
                  height: "27.49px",
                }}
              />
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-[11.25px]">Item Name</p>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border border-gray-400 px-3 py-1 text-[11.25px] rounded"
                style={{
                  width: "120px",
                  height: "27.49px",
                }}
              />
              <button
                onClick={handleSearch}
                className="bg-[#0b2c69] text-white text-[11.25px] px-3 py-1 rounded cursor-pointer"
                style={{
                  width: "70px",
                  height: "27.49px",
                }}
              >
                Search
              </button>
              <button
                onClick={handleClearSearch}
                className="bg-[#6c757d] text-white text-[11.25px] px-3 py-1 rounded cursor-pointer"
                style={{
                  width: "70px",
                  height: "27.49px",
                }}
              >
                Clear
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handleOpenModal()}
                className="bg-[#0A2478] text-white text-[11.25px] px-4 py-1 rounded cursor-pointer"
                style={{
                  width: "60px",
                  height: "27.49px",
                }}
              >
                Add
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-[#C1121F] text-white text-[10px] px-4 py-1 rounded cursor-pointer"
                style={{
                  width: "60px",
                  height: "27.49px",
                }}
              >
                Exit
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

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-[14px] font-medium">
                  Item Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
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

              <div className="col-span-3">
                <label className="text-[14px] font-medium">Remark</label>
                <input
                  type="text"
                  value={formData.remark}
                  onChange={(e) =>
                    setFormData({ ...formData, remark: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>
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
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 border-r-2 text-left">Code</th>
                <th className="px-4 py-2 border-r-2 text-left">Name</th>
                <th className="px-4 py-2 border-r-2 text-left">Status</th>
                <th className="px-4 py-2 border-r-2 text-left">Added By</th>
                <th className="px-4 py-2 border-r-2 text-left">Added On</th>
                <th className="px-4 py-2 border-r-2 text-left">Modified By</th>
                <th className="px-4 py-2 border-r-2 text-left">Modified On</th>
                <th className="px-4 py-2 border-r-2 text-left">Action</th>
                <th className="px-4 py-2 border-r-2 text-left">Active</th>
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
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <td className="px-4 py-2">{row.code}</td>
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">
                      {row.status === 1 ? "Active" : "Inactive"}
                    </td>
                    <td className="px-4 py-2">{row.added_by || "-"}</td>
                    <td className="px-4 py-2">
                      {row.add_on
                        ? new Date(row.add_on).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2">{row.modified_by || "-"}</td>
                    <td className="px-4 py-2">
                      {row.modified_on
                        ? new Date(row.modified_on).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <button
                        className="bg-green-500 p-1.5 text-white rounded cursor-pointer"
                        onClick={() => handleOpenModal(row)}
                        title="Edit"
                      >
                        <FiEdit className="text-white text-sm" />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleToggleStatus(row)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${row.status === 1 ? "bg-[#0A2478]" : "bg-gray-400"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${row.status === 1 ? "translate-x-6" : "translate-x-0"
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

export default ItemProfileList;