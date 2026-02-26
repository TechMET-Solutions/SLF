import { useEffect, useState } from "react";

import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import Pagination from "../Component/Pagination";
const AccountGroupList = () => {
  useEffect(() => {
    document.title = "SLF | Account Group List";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    groupName: "",
    accountType: "",
    under: "",
    comments: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  console.log("Account Group List Data:", data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  // Compute total pages based on backend 'total' count
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 🔹 UPDATED: Pagination Control
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page); // Update local state
    getAccountGroups(page); // Fetch specific page
  };

  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  // const getAccountGroups = async () => {
  //   try {
  //     const response = await axios.get(`${API}/api/account-group/list`, {
  //       params: {
  //         headers: searchHeaders.join(","), // group_name,account_type
  //         search: searchQuery,
  //       },
  //     });

  //     setData(response.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getAccountGroups = async (page = 1) => {
    try {
      const response = await axios.get(`${API}/api/account-group/list`, {
        params: {
          headers: searchHeaders.join(","),
          search: searchQuery,
          page: page, // Send page to backend
          limit: itemsPerPage, // Send limit to backend
        },
      });

      // Map backend response to frontend state
      setData(response.data.data);
      setTotalItems(response.data.pagination.total);
      setShowPagination(response.data.pagination.showPagination);
      setCurrentPage(response.data.pagination.page);
    } catch (error) {
      console.error("Error fetching account groups:", error);
    }
  };

  const { loginUser } = useAuth();

  const handleSave = async () => {
    try {
      const payload = {
        groupName: formData.groupName,
        accountType: formData.accountType,
        under: formData.under,
        comments: formData.comments,
      };

      if (isEditMode) {
        payload.modifiedBy = loginUser; // ✅ Only on update
      } else {
        payload.addedBy = loginUser; // ✅ Only on create
      }

      if (isEditMode) {
        await axios.put(
          `${API}/api/account-group/update/${selectedId}`,
          payload,
        );
        alert("Account Group Updated Successfully");
      } else {
        await axios.post(`${API}/api/account-group/create`, payload);
        alert("Account Group Created Successfully");
      }

      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedId(null);
      setFormData({
        groupName: "",
        accountType: "",
        under: "",
        comments: "",
        addedBy: "",
      });

      getAccountGroups();
    } catch (error) {
      console.error(error);
      alert("Error saving account group");
    }
  };

  // 🔹 UPDATED: Handle Search (Reset to page 1)
  const handleSearch = () => {
    setIsDropdownOpen(false);
    setCurrentPage(1);
    getAccountGroups(1);
  };

  // 🔹 UPDATED: Handle Clear
  const handleClear = () => {
    setSearchQuery("");
    setSearchHeaders([]);
    setCurrentPage(1);
    getAccountGroups(1);
  };

  // Initial Load
  useEffect(() => {
    document.title = "SLF | Account Group List";
    getAccountGroups(1);
  }, []);

  const handleEdit = (row) => {
    setFormData({
      groupName: row.group_name,
      accountType: row.account_type,
      under: row.under_type,
      comments: row.comments,
    });

    setSelectedId(row.id); // or row._id depending on backend
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const allHeaderIds = [
    "group_name",
    "account_type",
    "under_type",
  ];


 const handleSelectAll = () => {
    const allSelected = allHeaderIds.every((id) => searchHeaders.includes(id));
    setSearchHeaders(allSelected ? [] : [...allHeaderIds]);
  };


  return (
    <div className=" min-h-screen w-full">
      <div className="flex justify-center ">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          {/* Left heading */}
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
           Group Ledger List
          </h2>

          {/* Right section (search + buttons) */}
          <div className="flex items-center gap-6">
            {/* Search section */}
            <div className="flex gap-5 "></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[500px]">
                  {/* Multi-Select Header Dropdown */}
                  <div className="relative border-r border-gray-300 pr-2 mr-2">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full"
                    >
                      Headers ({searchHeaders.length}){" "}
                      <span className="text-[8px]">▼</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                        <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded">
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
                          { id: "group_name", label: "Group Ledger List" },
                          { id: "account_type", label: "Account Type" },
                          { id: "under_type", label: "Under" },
                        ].map((col) => (
                          <button
                            key={col.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
                          >
                            <input
                              type="checkbox"
                              checked={searchHeaders.includes(col.id)}
                              onChange={() => toggleHeader(col.id)}
                              className="w-3 h-3 accent-[#0A2478]"
                            />
                            <span className="text-[11px] font-source text-gray-700">
                              {col.label}
                            </span>
                          </button>
                        ))}
                        <div className="border-t mt-1 pt-1 text-center">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-[10px] text-[#0A2478] font-bold"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Input Field */}
                  <input
                    type="text"
                    value={searchQuery}
                     onClick={() => setIsDropdownOpen(false)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type multiple items (e.g. Cash, Asset)..."
                    className="flex-grow text-[11px] font-source outline-none h-full"
                  />

                  {/* Search Button */}
                  {/* <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      getAccountGroups();
                    }}
                    className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                  >
                    Search
                  </button> */}

                  <button
                    onClick={handleSearch} // Use the new search handler
                    className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                  >
                    Search
                  </button>
                  <button
                    onClick={handleClear}
                    className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            {/* Buttons stuck to right */}
            <div className="flex gap-3">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                }}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Add
              </button>

              <button
                onClick={() => navigate("/")}
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modelforAdd */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[717px] rounded-lg shadow-lg h-[322px] p-10">
            {isEditMode && (
              <>
                <h2
                  className="text-[#0A2478] mb-4"
                  style={{
                    fontFamily: "Source Sans 3, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                  }}
                >
                  Edit Group Ledger
                </h2>
              </>
            )}
            {!isEditMode && (
              <>
                <h2
                  className="text-[#0A2478] mb-4"
                  style={{
                    fontFamily: "Source Sans 3, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                  }}
                >
                  Add New Ledger
                </h2>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[14px] ">
                 Group Ledger Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleChange}
                  placeholder="Interest Accrued on FDR"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "280px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div>
                {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                <label className="text-[14px] ">
                  Account Type <span className="text-red-500">*</span>
                </label>
                {/* <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  placeholder="Enter Account Type"
                /> */}

                <input
                  type="text"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  placeholder="Current Assets"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "280px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div>
                <label className="text-[12px] font-medium">Under</label>
                <select
                  name="under"
                  value={formData.under}
                  onChange={handleChange}
                  className="border border-gray-300 rounded"
                  style={{
                    width: "280px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                  }}
                >
                  <option value="">Select Under</option>
                  <option value="Balance Sheet">Balance Sheet</option>
                  <option value="Profit & Loss">Profit & Loss</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-medium">Comments</label>
                <input
                  type="text"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Test"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "280px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center gap-5 items-center">
              <div className="flex justify-end gap-3 mt-6 item-center">
                <button
                  className="bg-[#0A2478] text-white"
                  style={{
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",

                    opacity: 1,
                  }}
                  onClick={handleSave}
                >
                  Save
                </button>

                <button
                  className="text-white"
                  style={{
                    backgroundColor: "#C1121F",
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",

                    opacity: 1,
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex justify-center ">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                 Group Ledger 
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[150px]">
                  Account Type
                </th>

                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                  Under
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Added By
                </th>

                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                  Added On
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]  w-[110px]">
                  Modified By
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]  w-[130px]">
                  Modified On
                </th>

                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[250px]">
                  Comments
                </th>
                <th className="px-4 py-2 text-left text-[13px] w-[80px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2">{row.group_name}</td>
                  <td className="px-4 py-2">{row.account_type}</td>

                  <td className="px-4 py-2">{row.under_type}</td>
                  <td className="px-4 py-2">{row.added_by_email}</td>

                  <td className="px-4 py-2">
                    {new Date(row.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2">{row.modified_by_email}</td>

                <td className="px-4 py-2">
  {row.modified_on
    ? new Date(row.modified_on).toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
       
       
      })
    : "-"}
</td>
                  <td className="px-4 py-2">{row.comments}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <div
                      className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                      onClick={() => handleEdit(row)}
                    >
                      <FiEdit />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 UPDATED: Conditional Pagination Rendering */}
      {showPagination && (
        <div className="mt-4 mb-8">
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

export default AccountGroupList;
