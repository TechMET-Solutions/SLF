import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import Pagination from "../Component/Pagination";
import { formatIndianDate } from "../utils/Helpers";

import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { usePermission } from "../API/Context/PermissionContext";
import Loader from "../Component/Loader";

const SchemeDetailsList = () => {
  useEffect(() => {
    document.title = "SLF | Scheme Details List";
  }, []);
  const { permissions, userData } = usePermission();
const [loading, setLoading] = useState(false);
  console.log(userData,"userData")
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  console.log(data, "data");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔥 Fetch Schemes With Pagination
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [appFrom, setAppFrom] = useState("");
  const [appTo, setAppTo] = useState("");

  // Update your handleClearSearch to include these
  const handleClearSearch = () => {
    setSearchQuery("");
    setAppFrom("");
    setAppTo("");
    // setFilteredData(schemes);
  };

  // const fetchSchemes = async (page = 1) => {
  //   try {
  //     const response = await axios.get(`${API}/Scheme/getAllSchemes`, {
  //       params: {
  //         loginUser: userData?.id, // ✅ add this
  //         page,
  //         limit: 10,
  //         search: searchQuery || undefined,
  //         keys: searchHeaders.length ? searchHeaders.join(",") : undefined,
  //         appFrom: appFrom || undefined,
  //         appTo: appTo || undefined,
  //         sortKey: sortConfig.key, // ✅ add this
  //         sortOrder: sortConfig.direction,
          
  //       },
  //     });

  //     const result = response.data; // ✅ Correct

  //     setData(result.items); // ✅ Use items
  //     setCurrentPage(result.page); // ✅ From API
  //     setTotalPages(result.totalPages);
  //   } catch (err) {
  //     console.error("❌ Error fetching schemes:", err);
  //   }
  // };
const fetchSchemes = async (page = 1) => {
   setLoading(true);
  try {
    // ✅ Decide loginUser value
    const loginUserValue = userData?.isAdmin
      ? "admin"        // 👈 Admin case
      : userData?.id;  // 👈 Employee case (e.g., 80)

    const response = await axios.get(`${API}/Scheme/getAllSchemes`, {
      params: {
        page,
        limit: 10,
        search: searchQuery || undefined,
        keys: searchHeaders.length ? searchHeaders.join(",") : undefined,
        appFrom: appFrom || undefined,
        appTo: appTo || undefined,
        sortKey: sortConfig.key,
        sortOrder: sortConfig.direction,
        loginUser: loginUserValue, // ✅ updated here
      },
    });

    const result = response.data;

    setData(result.items);
    setCurrentPage(result.page);
    setTotalPages(result.totalPages);
     setLoading(false);
  } catch (err) {
    console.error("❌ Error fetching schemes:", err);
     setLoading(false);
  }
};
  useEffect(() => {
  if (userData && (userData.isAdmin || userData.id)) {
    fetchSchemes(currentPage);
  }
}, [sortConfig, userData]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = "asc";

      if (prev.key === key && prev.direction === "asc") {
        direction = "desc";
      }

      return { key, direction };
    });
  };

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  // 🔹 Pagination Controls
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchSchemes(page);
  };

  // 🔹 Toggle Active/Inactive
  const handleStatusToggle = async (row) => {
     setLoading(true);
    const newStatus = row.status === 1 ? 0 : 1;

    try {
      await axios.patch(`${API}/Scheme/statusScheme`, {
        id: row.id,
        status: newStatus,
      });

      // Update UI without refresh
      const updated = data.map((item) =>
        item.id === row.id ? { ...item, status: newStatus } : item,
      );
      setData(updated);
       setLoading(false);
    } catch (err) {
      console.error("Error updating scheme status:", err);
      alert("Failed to update status");
      setLoading(false);
    }
  };

  const allHeaderIds = [
    "schemeName",
    "product",
    "minLoanAmount",
    "maxLoanAmount",
  ];

  const handleSelectAll = () => {
    const allSelected = allHeaderIds.every((id) => searchHeaders.includes(id));
    setSearchHeaders(allSelected ? [] : [...allHeaderIds]);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Top Bar */}
      <div className="flex sticky top-[50px] z-40 w-full px-6">
        <div className="flex items-center px-6 py-4 border-b  w-full max-w-[1462px] h-[40px] border border-gray-200 justify-between bg-white">
          <h2 className="text-red-600 text-[20px] font-semibold">
            Scheme List
          </h2>

          <div className="flex items-center gap-3">
            <div className="flex items-center  gap-3">
              <div className="hidden lg:flex items-center bg-white border border-gray-400 rounded-[5px]  h-[32px] px-1 relative ">
                {/* Multi-Select Header Dropdown */}
                <div className="relative  border-r border-gray-300 pr-2 mr-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full"
                  >
                    Headers ({searchHeaders.length}){" "}
                    <span className="text-[8px]">▼</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-[35px] left-[-8px] bg-white border-b border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                      <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 p-2 cursor-pointer border-b border-gray-200 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={searchHeaders.length === allHeaderIds.length}
                          onChange={handleSelectAll}
                          className="w-3 h-3 accent-[#0A2478]"
                        />
                        <span className="text-[11px] font-source text-gray-700">
                          Select All
                        </span>
                      </button>

                      {[
                        { id: "schemeName", label: "Scheme Name" },
                        { id: "product", label: "Product Name" },
                        { id: "minLoanAmount", label: "Min Loan Amount" },
                        { id: "maxLoanAmount", label: "Max Loan Amount" },
                      ].map((col) => (
                        <label
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
                        </label>
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
                <button
                  onClick={() => fetchSchemes(1)}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
                >
                  Search
                </button>
              </div>

              <div className="hidden lg:flex items-center border border-gray-400 rounded-[5px] bg-white  h-[32px] px-1 relative ">
                {/* App From Date */}
                <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-2">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">
                    From
                  </span>
                  <input
                    type="date"
                    value={appFrom}
                    onChange={(e) => setAppFrom(e.target.value)}
                    className="w-[110px] text-[11px] outline-none cursor-pointer bg-transparent uppercase"
                  />
                </div>

                {/* App To Date */}
                <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-2">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">
                    To
                  </span>
                  <input
                    type="date"
                    value={appTo}
                    onChange={(e) => setAppTo(e.target.value)}
                    className="w-[110px] text-[11px] outline-none cursor-pointer bg-transparent uppercase"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={() => fetchSchemes(1)}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSearchHeaders([]);
                  setSearchQuery("");
                  setAppFrom("");
                  setAppTo("");
                  fetchSchemes(1);
                }}
                className="bg-[#0A2478] hidden lg:flex text-white text-[11px] px-4 py-1 rounded"
              >
                Clear
              </button>
              {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Scheme Details",
                )?.RenewScheme) && (
                <button
                  className="bg-[#129121] text-white text-[11.25px] px-4 py-1 rounded"
                  onClick={() => navigate("/Scheme-Renewal-List")}
                >
                  Renew
                </button>
              )}

              {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Scheme Details",
                )?.add) && (
                <button
                  className="bg-[#0A2478] text-white text-[11.25px] px-4 py-1 rounded"
                  onClick={() => navigate("/Add-Scheme-Details-Listform")}
                >
                  Add
                </button>
              )}

              <button
                onClick={() => navigate("/")}
                className="bg-[#C1121F] text-white w-[74px] h-[24px] rounded text-[10px]"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex ml-[25px]">
        <div className="overflow-x-auto   h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr className="text-left">
                <th
                  className="px-1 py-1 border w-[150px] flex justify-between"
                  onClick={() => handleSort("schemeName")}
                >
                  Scheme Name
                  {sortConfig.key !== "schemeName" && (
                    <FaSort className="text-gray-400 text-xs" />
                  )}
                  {sortConfig.key === "schemeName" &&
                    sortConfig.direction === "asc" && (
                      <FaSortUp className="text-blue-600 text-xs" />
                    )}
                  {sortConfig.key === "schemeName" &&
                    sortConfig.direction === "desc" && (
                      <FaSortDown className="text-blue-600 text-xs" />
                    )}
                </th>
                <th className="px-1 py-1 border w-[100px]">Product Name</th>
                <th className="px-1 py-1 border">From Date</th>
                <th className="px-1 py-1 border">To Date</th>
                {/* <th className="px-1 py-1 border w-[50px]">Int. Compound</th> */}

                <th className="px-1 py-1 border">Min Amount</th>
                <th className="px-1 py-1 border">Max Amount</th>

                <th className="px-1 py-1 border w-[300px]">Description</th>
                {/* <th className="px-1 py-1 border">Action</th> */}
                {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Scheme Details",
                )?.RoleMapping) && (
                <th className="px-1 py-1 border w-[110px]">Role Mapping</th>
              )}
               
                <th className="px-1 py-1 border w-[120px]">Action</th>
              </tr>
            </thead>

            <tbody className="text-[12px] text-left">
              {data?.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td
                    className="px-1 py-1 cursor-pointer hover:underline text-blue-500"
                    onClick={() =>
                      navigate("/Add-Scheme-Details-Listform", {
                        state: { type: "view", data: row },
                      })
                    }
                  >
                    {row.schemeName}
                  </td>
                  <td className="px-1 py-1">{row.product}</td>

                  <td className="px-1 py-1">
                    {formatIndianDate(row.applicableFrom)}
                  </td>
                  <td className="px-1 py-1">
                    {formatIndianDate(row.applicableTo)}
                  </td>
                  {/* <td className="px-1 py-1">
                    {row.calcMethod === "Compound" ? "True" : "False"}
                  </td> */}
                  <td className="px-1 py-1">{row.minLoanAmount}</td>
                  <td className="px-1 py-1">{row.maxLoanAmount}</td>

                  <td className="px-1 py-1">{row.description}</td>

                  {/* Role Mapping */}
                   {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Scheme Details",
                )?.RoleMapping) && (
                <td
                    className="px-1 py-1 text-[#1883EF] cursor-pointer"
                    onClick={() =>
                      navigate("/Role-Mapping", { state: { data: row } })
                    }
                  >
                    Role Mapping
                  </td>
              )}
                 
                  

                  {/* Toggle */}
                  <td className="px-1 py-1 w-[120px]">
                    <div className="flex items-center gap-2">
                      {/* Status Toggle Section */}
                      {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Scheme Details",
                )?.status) && (
                 <div className="flex flex-col items-start gap-1">
                        <button
                          onClick={() => handleStatusToggle(row)}
                          className={`w-11 h-5 cursor-pointer flex items-center rounded-full p-1 transition-all duration-300 ease-in-out ${
                            row.status === 1 ? "bg-[#0A2478]" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform duration-300 ${
                              row.status === 1
                                ? "translate-x-6"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
              )}
                 
                     

                      {/* Vertical Divider */}
                      <div className="h-8 w-[1px] bg-gray-200"></div>

                      {/* Actions Section */}
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                           {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Scheme Details",
                )?.edit) && (
                 <button
                            onClick={() =>
                              navigate("/Add-Scheme-Details-Listform", {
                                state: { type: "edit", data: row },
                              })
                            }
                            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-[11px] font-medium rounded transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <FiEdit className="text-white text-sm" />
                          </button>
              )}
                         {(userData?.isAdmin ||
                permissions?.Master?.find(
                  (item) => item.name === "Scheme Details",
                )?.Copy) && (
                  <button
                            onClick={() =>
                              navigate("/Add-Scheme-Details-Listform", {
                                state: { type: "copy", data: row },
                              })
                            }
                            className="px-2 py-1 bg-[#646AD9] hover:bg-[#4a50b5] text-white text-[11px] font-medium rounded border border-gray-200 transition-colors cursor-pointer"
                          >
                            <MdContentCopy className="text-white text-sm" />
                          </button>
              )}
                   

                          {/* Copy Button */}
                         
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {loading && <Loader />}
    </div>
  );
};

export default SchemeDetailsList;
