import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import { formatIndianDate } from "../utils/Helpers";
// Ensure this import exists
import Pagination from "../Component/Pagination";
import { usePermission } from "../API/Context/PermissionContext";
import Loader from "../Component/Loader";

const AccountCodeList = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
const { permissions, userData } = usePermission();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [accountGroups, setAccountGroups] = useState([]);

  // Search & Dropdown State
  const [searchHeaders, setSearchHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    accountGroup: "",
    financialDate: "",
    type: "Sub Ledger",
    addedBy: loginUser,
  });
const initialFormState = {
  name: "",
  accountGroup: "",
  financialDate: "",
  type: "Sub Ledger",
  addedBy: loginUser,
};

  useEffect(() => {
    document.title = "SLF | Account Code List";
    fetchAccountGroups();
    fetchData(1); // Initial fetch
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 🔹 FIXED: Pagination Control
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchData(page);
  };


  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId]
    );
  };

  const fetchAccountGroups = async () => {
    try {
      const res = await axios.get(`${API}/api/account-group/list`);
      if (res.data.success) {
        setAccountGroups(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching account groups:", error);
    }
  };

  // 🔹 FIXED: API Call with Pagination
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/account-code/get`, {
        params: {
          headers: searchHeaders.join(","),
          search: searchQuery,
          page: page,
          limit: itemsPerPage
        },
      });

      if (res.data.success) {
        setData(res.data.data);
        // Sync pagination stats from backend
        setTotalItems(res.data.pagination?.total || 0);
        setShowPagination(res.data.pagination?.showPagination || false);
        setCurrentPage(res.data.pagination?.page || 1);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching account codes:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    debugger
    if (!formData.name || !formData.financialDate || !formData.accountGroup || !formData.type) {
      alert("Please fill all required fields");
      return;
    }

    const payload = { ...formData };
    setLoading(true);
    try {
      if (editMode) {
        payload.modifiedBy = loginUser;
        await axios.put(`${API}/account-code/update/${selectedId}`, payload);
        alert(" Ledger Updated ✅");
        setLoading(false);
      } else {
        payload.addedBy = loginUser;
        await axios.post(`${API}/account-code/create`, payload);
        alert(" Ledger Created ✅");
        setLoading(false);
      }

      setIsModalOpen(false);
      setEditMode(false);
      fetchData(currentPage);
      setFormData({
        name: "",
        accountGroup: "",
        financialDate: "",
        type: "",
        addedBy: loginUser,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error saving account:", err);
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setFormData({
      name: row.name,
      accountGroup: row.accountGroup,
      financialDate: row.financialDate,
      type: row.type,
      addedBy: row.addedBy,
    });
    setSelectedId(row.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const allHeaderIds = [
    "name",
    "accountGroup",
    "financialDate",
    "type",
  ];


  const handleSelectAll = () => {
    const allSelected = allHeaderIds.every((id) => searchHeaders.includes(id));
    setSearchHeaders(allSelected ? [] : [...allHeaderIds]);
  };



  return (
    <div className="min-h-screen w-full font-[Source_Sans_3] ">
       <div className="flex sticky top-[40px] z-40 w-full ml-[22px] ">
        <div className="z-40 bg-white w-full">
          <div className="flex items-center px-6 border-b w-full max-w-[1462px] h-[40px] border border-gray-200 justify-between ">
            <h2 className="text-red-600 font-bold text-[20px] whitespace-nowrap">
              Ledger List
            </h2>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-1 relative w-[500px]">
                <div className="relative border-r border-gray-300 pr-2 mr-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-[11px] font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full whitespace-nowrap"
                  >
                    Headers ({searchHeaders.length}) <span className="text-[8px]">▼</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">

                      <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded border-b border-gray-200 mb-1"
                      >
                        <input
                          type="checkbox"
                          checked={allHeaderIds.every((id) => searchHeaders.includes(id))}
                          onChange={handleSelectAll}
                          className="w-3 h-3 accent-[#0A2478]"
                        />
                        <span className="text-[11px] font-source font-bold text-[#0A2478]">
                          Select All
                        </span>
                      </button>
                      {[
                        { id: "name", label: "Ledger Name" },
                        { id: "accountGroup", label: "Ledger" },
                        { id: "financialDate", label: "Financial" },
                        { id: "type", label: "Type" },
                      ].map((col) => (
                        <label key={col.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded">
                          <input
                            type="checkbox"
                            checked={searchHeaders.includes(col.id)}
                            onChange={() => toggleHeader(col.id)}
                            className="w-3 h-3 accent-[#0A2478]"
                          />
                          <span className="text-[11px] text-gray-700">{col.label}</span>
                        </label>
                      ))}
                      <div className="border-t mt-1 pt-1 text-center">
                        <button onClick={() => setIsDropdownOpen(false)} className="text-[10px] text-[#0A2478] font-bold uppercase">
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onClick={() => setIsDropdownOpen(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search multiple items..."
                  className="flex-grow text-[11px] outline-none h-full bg-transparent"
                />

               

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setCurrentPage(1);
                    fetchData(1);   // 🔥 API CALL
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Search
                </button>

                <button

                  onClick={() => {
                    setSearchQuery("");
                    setSearchHeaders([]);
                    setCurrentPage(1);
                    fetchData(1);
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Clear
                </button>
              </div>

              <div className="flex items-center gap-3 pl-4 border-gray-200">
{(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Ledger"
)?.add) && (
  <button onClick={() => setIsModalOpen(true)} className="w-[70px] h-[26px] rounded-[4px] bg-[#0A2478] text-white text-[11px]">Add</button>
)}
               
                <button onClick={() => navigate("/")} className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px]">Exit</button>
              </div>
            </div>
          </div>
        </div>
      </div> 


      {/* Modal - Kept your auto-fill logic for financialDate */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full rounded-lg max-w-2xl p-8 mx-4">
            <h2 className="text-[#0A2478] mb-6 font-semibold text-xl">
              {editMode ? "Edit Ledger" : "Create Ledger"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Ledger <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block"> Group Ledger <span className="text-red-500">*</span></label>
                <select
                  value={formData.accountGroup}
                  onChange={(e) => {
                    const selectedGroupName = e.target.value;
                    const selectedLedger = accountGroups.find(g => g.group_name === selectedGroupName);
                    setFormData({
                      ...formData,
                      accountGroup: selectedGroupName,
                      financialDate: selectedLedger ? selectedLedger.under_type : ""
                    });
                  }}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white"
                  required
                >
                  <option value="">Select Ledger</option>
                  {accountGroups.map((group) => (
                    <option key={group.id} value={group.group_name}>{group.group_name}</option>
                  ))}
                </select>
              </div>

             

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="General">General</option>
                  <option value="Sub Ledger">Sub Ledger</option>
                  <option value="Cash">Cash</option>
                   <option value="Petty Cash">Petty Cash</option>
                   <option value="Card">Card</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button className="h-10 px-6 rounded-lg bg-[#0A2478] text-white text-sm" onClick={handleSave}>Save</button>
              <button
                  className="h-10 px-6 rounded-lg bg-[#C1121F] text-white text-sm"
                  onClick={() => {
                    setFormData(initialFormState); // 🔥 reset form
                    setIsModalOpen(false); // close modal
                  }}
                >
                  Exit
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Table - Uses filteredData */}
      <div className="flex ml-[22px]  ">
        <div className="overflow-x-auto w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[250px]">Ledger Name</th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[150px]">Financial</th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[180px]">Ledger</th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[100px]">Type</th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[200px]">Added by</th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[100px]">Added On</th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[200px]">Modified by</th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[100px]">Modified On</th>
                <th className="px-1 py-1 text-left text-[13px] w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-1 py-1">{row.name}</td>
                  <td className="px-1 py-1">{row.financialDate}</td>
                  <td className="px-1 py-1">{row.accountGroup}</td>
                  <td className="px-1 py-1">{row.type}</td>
                  <td className="px-1 py-1">{row.addedBy}</td>
                  <td className="px-1 py-1">{formatIndianDate(row.created_at)}</td>
                  <td className="px-1 py-1">{row.modifiedBy || "-"}</td>
                  <td className="px-1 py-1">{formatIndianDate(row.updated_at)}</td>
                  <td className="px-1 py-1 flex gap-2 ">
                    

                    {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Ledger"
)?.edit) && (
  <div className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm" onClick={() => handleEdit(row)}>
                      <FiEdit />
                    </div>
)}
                  </td>

                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Component Hooked up to State */}
      {showPagination && (
        <div className="mt-4 mb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {loading && <Loader />}
    </div>
    
  );
  
};

export default AccountCodeList;