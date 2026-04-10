import axios from "axios";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { usePermission } from "../../API/Context/PermissionContext";
import Loader from "../../Component/Loader";

const FundTransferList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  console.log(list, "list");
  const [payMode, setPayMode] = useState("");
const [loading, setLoading] = useState(false);
  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const { permissions, userData } = usePermission();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMOP, setSelectedMOP] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedbranchid, setSelectedBranch] = useState("");
  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  const allHeaderIds = ["id", "from_branch_name", "to_branch_name", "amount"];

  const handleSelectAll = () => {
    if (searchHeaders.length === allHeaderIds.length) {
      setSearchHeaders([]);
    } else {
      setSearchHeaders(allHeaderIds);
    }
  };

  useEffect(() => {
    debugger;
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.branchId) {
      console.log("Branch ID:", userData.branchId.branch_code);
      console.log("Branch Name:", userData.branchId.branch_name);
      // setSelectedYear(userData.financialYear)
      // setSelectedBranch(userData.branchId.branch_name);
      // setSelectedBranchid(userData.branchId.id);
      fetchFundTransfers(userData.branchId.id);
      setSelectedBranch(userData.branchId.id);
    }
  }, []);

 
  const fetchFundTransfers = async (selectedBranchid) => {
    try {
       setLoading(true);
      if (!selectedBranchid) return;

      const res = await axios.get(`${API}/api/FundTransfer/listIssue`, {
        params: {
          branchId: selectedBranchid,
          search: searchQuery || "",
          headers: searchHeaders.join(",") || "",
          date: selectedDate || "",
          mop: selectedMOP || "",
          status: selectedStatus || "",
        },
      });

      setList(res.data.data);
       setLoading(false);
    } catch (error) {
      console.error("Error fetching list:", error);
       setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    setLoading(true);
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`${API}/api/FundTransfer/Delete/${id}`);

      alert("Deleted Successfully ✅");
      fetchFundTransfers(selectedbranchid); // refresh list
      setLoading(false);
    } catch (error) {
      console.error("Delete error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 ">
      <div className="flex justify-center ">
        <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border  border-gray-200 justify-between ">
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
            FT Issue
          </h2>

          {/* Right section (search + buttons) */}
          <div className="flex items-center gap-6">
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
                        className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded border-b border-gray-200 mb-1"
                      >
                        <input
                          type="checkbox"
                          checked={allHeaderIds.every((id) =>
                            searchHeaders.includes(id),
                          )}
                          onChange={handleSelectAll}
                          className="w-3 h-3 accent-[#0A2478]"
                        />
                        <span className="text-[11px] font-source font-bold text-[#0A2478]">
                          Select All
                        </span>
                      </button>

                      {[
                        { id: "id", label: "Doc No" },
                        { id: "from_branch_name", label: "From Branch" },
                        { id: "to_branch_name", label: "To Branch" },
                        { id: "amount", label: "Amount" },
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
              </div>
            </div>
            <div className="flex gap-3 items-center">
              {/* 📅 Date Filter */}
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-2 py-1 text-[11px] rounded"
              />

              {/* 💳 MOP Filter */}
              <select
                value={selectedMOP}
                onChange={(e) => setSelectedMOP(e.target.value)}
                className="border px-2 py-1 text-[11px] rounded"
              >
                <option value="">All MOP</option>
                <option value="Cash">Cash</option>
                <option value="Net Banking">Netbanking</option>
              </select>

              {/* 📄 Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border px-2 py-1 text-[11px] rounded"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  fetchFundTransfers(selectedbranchid); // 🔥 call API here
                }}
                className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchHeaders([]);
                  setSelectedDate("");
                  setSelectedMOP("");
                  setSelectedStatus("");
                  fetchFundTransfers(selectedbranchid);
                }}
                className="ml-2 bg-[#0A2478] text-white text-[11px] px-4 h-[24px] rounded-[3px]"
              >
                Clear
              </button>
            </div>

            <div className="flex gap-3">
              {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "FT Issue"
)?.add) && (
    <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                }}
                onClick={() => navigate("/FundTransfer/create")}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Add
              </button>
)}
            

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
      <div className="">
        <div className="overflow-x-auto ml-[25px]">
          <table>
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr className=" text-white text-[12px] font-bold border-b border-gray-300">
                <th className="p-1 border-r border-gray-300 w-[100px] text-left">
                  Doc No
                </th>
                {/* <th className="p-1 border-r border-gray-300 w-[100px] text-left">
                    Doc Date
                  </th> */}
                {/* <th className="p-1.5 border-r border-gray-300">Paymode</th> */}
                <th className="p-1 border-r border-gray-300 w-[150px] text-left">
                  From Branch
                </th>
                <th className="p-1 border-r border-gray-300 w-[100px] text-left">
                  To Branch
                </th>
                {/* <th className="p-1.5 border-r border-gray-300">
                  Account Ledger Name
                </th> */}
                <th className="p-1 border-r border-gray-300 w-[100px] text-left">
                  Amount
                </th>
                <th className="p-1 border-r border-gray-300 w-[100px] text-left">
                  MOP
                </th>
                {/* <th className="p-1 border-r border-gray-300 w-[120px] text-left">
                    Add By
                  </th> */}
                <th className="p-1 border-r border-gray-300 w-[120px] text-left">
                  FT Date
                </th>
                <th className="p-1 border-r border-gray-300 w-[120px] text-left">
                  Receipt Status
                </th>
                <th className="p-1 text-center w-[100px]  text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-[11px] divide-y divide-gray-200">
              {list.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-1 text-blue-800">{item.id}</td>

                  {/* <td className="p-1.5">{item.pay_mode}</td> */}
                  <td className="p-1">{item.from_branch_name}</td>
                  <td className="p-1">{item.to_branch_name}</td>

                  <td className="p-1 font-bold">{item.amount || "-"}</td>

                  <td className="p-1">{item.pay_mode}</td>

                  {/* <td className="p-1 text-gray-500">Admin</td> */}

                  <td className="p-1">
                    {new Date(item.doc_date).toLocaleDateString("en-GB")}
                  </td>

                  <td
                    className={`p-1.5 font-bold ${
                      item.status === "Pending"
                        ? "text-yellow-600"
                        : item.status === "Accepted"
                          ? "text-green-700"
                          : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>

                  <td className="p-1.5 text-center whitespace-nowrap">
                    <div className="flex gap-2">
                      {/* View Button */}
                        {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "FT Issue"
)?.view) && (
    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded cursor-pointer transition"
                        onClick={() =>
                          navigate("/FundTransfer/create", {
                            state: { fundData: item },
                          })
                        }
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
)}
                        {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "FT Issue"
)?.delete) && (
    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded cursor-pointer transition"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
)}

                      {/* Delete Button */}
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default FundTransferList;
