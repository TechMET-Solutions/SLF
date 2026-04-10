import axios from "axios";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { usePermission } from "../../API/Context/PermissionContext";
import Loader from "../../Component/Loader";
// import { BASEURL } from "../../url"; // your existing url.jsx

const JournalVoucherlist = () => {
  const navigate = useNavigate();
  const [voucherList, setVoucherList] = useState([]);
  console.log(voucherList, "voucherList");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchHeaders, setSearchHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
const { permissions, userData } = usePermission();

  
  const fetchBankAccounts = async () => {
    try {
      const res = await fetch(`${API}/account-code/Bank-accounts`);
      const data = await res.json();
      setBankAccounts(data);
    } catch (error) {
      console.error("Failed to fetch bank accounts", error);
    }
  };

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };
  const allHeaderIds = ["voucher_no"];

  const handleSelectAll = () => {
    const allSelected = allHeaderIds.every((id) => searchHeaders.includes(id));
    setSearchHeaders(allSelected ? [] : [...allHeaderIds]);
  };
  // ================= API CALL =================
  const fetchVouchers = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        search: searchQuery || "",
        headers: searchHeaders.join(",") || "",
        date: selectedDate || "",
        sub_ledger_code: selectedBankAccount || "",
      });

      const res = await axios.get(
        `${API}/api/journalVoucher/list?${queryParams}`,
      );

      if (res.data.success) {
        setVoucherList(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
       setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
    fetchBankAccounts();
  }, [page]);

  // ================= SEARCH CLICK =================
  const handleSearch = () => {
    setPage(1);
    fetchVouchers();
  };
  const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleView = (item) => {
    navigate("/JournalVoucher/create", {
      state: { id: item.id, mode: "view" },
    });
  };

  const handleEdit = (item) => {
    navigate("/JournalVoucher/create", {
      state: { id: item.id, mode: "edit" },
    });
  };
  const handleDelete = async (id) => {
    
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Journal Voucher?",
    );

    if (!confirmDelete) return;
 setLoading(true);
    try {
      const response = await axios.delete(
        `${API}/api/journalVoucher/delete/${id}`,
      );

      if (response.data.success) {
        alert("Journal Voucher Deleted Successfully ✅");

        // 🔥 Refresh List After Delete
         setLoading(false);
        fetchVouchers();
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert(
        error.response?.data?.message || "Failed to delete Journal Voucher ❌",
      );
       setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto">
        {/* <div className="flex justify-center "> */}
        <div className="flex sticky top-[50px] z-40 w-full ml-[25px]">
          <div className="flex items-center px-6 py-4 border-b  w-full max-w-[1462px] h-[40px] border  border-gray-200 justify-between bg-white ">
            <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
              Journal Voucher List
            </h2>

            <div className="flex gap-5">
              <div className="hidden lg:flex gap-2 mt-2">
                <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[450px]">
                  <div className="relative border-r border-gray-300 pr-2 mr-2">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-[11px] font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full whitespace-nowrap"
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
                        {[{ id: "voucher_no", label: "Voucher No" }].map(
                          (col) => (
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
                              <span className="text-[11px] text-gray-700">
                                {col.label}
                              </span>
                            </label>
                          ),
                        )}

                        <div className="border-t mt-1 pt-1 text-center">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-[10px] text-[#0A2478] font-bold uppercase"
                          >
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
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="ml-2 border border-gray-300 text-[11px] px-2 h-[34px] rounded"
                />
                <select
                  value={selectedBankAccount}
                  onChange={(e) => setSelectedBankAccount(e.target.value)}
                  className="hidden lg:flex ml-2 border border-gray-300 text-[11px] px-2 h-[30px] rounded w-[200px]"
                >
                  <option value="">Select Sub Ledger</option>

                  {bankAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // setCurrentPage(1);
                    fetchVouchers(1); // 🔥 API CALL
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[28px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Search
                </button>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchHeaders([]);
                    setSelectedDate("");
                    setSelectedBankAccount("");
                    fetchVouchers(1);
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[28px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Clear
                </button>
              </div>
              <div className="flex gap-3 py-2">
                {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Journal Voucher List"
)?.add) && (
 <button
                  onClick={() => navigate("/JournalVoucher/create")}
                  className="ml-2 bg-[#0b2c69] text-white text-sm rounded px-4 py-1 cursor-pointer"
                >
                  Add
                </button>
                  )}
                
                
                <button
                  onClick={() => navigate("/")}
                  className="bg-[#C1121F] text-white text-sm rounded px-4 py-1 cursor-pointer hover:bg-[#8b0a14]"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=" ml-[25px]">
          <div>
            <table className="text-left border-collapse ">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr className="font-bold border-b">
                  <th className="p-2 border border-r w-[160px]">Voucher No</th>

                  <th className="p-2 border border-r w-[100px]">Deposit</th>
                  <th className="p-2 border border-r w-[100px]">Withdrawal</th>
                  {/* <th className="p-2 border border-r w-[120px]">Date</th> */}
                  <th className="p-2 border border-r w-[100px]">
                    Voucher Date
                  </th>
                  {/* Added Action Header */}
                  <th className="p-2 border w-[150px] ">Action</th>
                </tr>
              </thead>

              <tbody className="text-[12px]">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      Loading...
                    </td>
                  </tr>
                ) : voucherList?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  voucherList?.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="p-2 font-bold text-[#0A2478]">
                        {item.voucher_no}
                      </td>

                      <td className="p-2">{item.deposit_amount}</td>
                      <td className="p-2">{item.withdrawal_amount}</td>
                      <td className="p-2">{formatDate(item.voucher_date)}</td>
                      {/* <td className="p-2">{formatDate(item.created_at)}</td> */}

                      {/* --- Action Buttons Column --- */}
                      <td className="p-2  flex items-center  gap-3">
                         {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Journal Voucher List"
)?.view) && (
  <button
                          onClick={() => handleView(item)}
                          className="bg-blue-500 text-white p-1 rounded"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                  )}
                        {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Journal Voucher List"
)?.view) && (
  <button
                          onClick={() => handleEdit(item)}
                          className="bg-green-600 text-white p-1 rounded"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                  )}

                   {(userData?.isAdmin||permissions?.Transaction?.find(
  item => item.name === "Journal Voucher List"
)?.delete) && (
   <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 text-white p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 size={14} />
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
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default JournalVoucherlist;
