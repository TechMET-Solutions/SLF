import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { usePermission } from "../../API/Context/PermissionContext";
import Loader from "../../Component/Loader";

const ExpenseList = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [searchHeaders, setSearchHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const { permissions, userData } = usePermission();
const [loading, setLoading] = useState(false);
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

  /* ================= FETCH MASTER LIST ================= */
  const fetchExpenses = async () => {
      setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery || "",
        headers: searchHeaders.join(",") || "",
        date: selectedDate || "",
        sub_ledger_code: selectedBankAccount || "",
      });

      const res = await fetch(`${API}/api/expense/master-list?${queryParams}`);
      const result = await res.json();

      if (result.success) {
        setTableData(result.data);
          setLoading(false);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchBankAccounts();
  }, []);

  /* ================= DELETE ================= */
  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );
    if (!confirmDelete) return;
 setLoading(true);
    try {
      const res = await fetch(`${API}/api/expense/delete/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        alert("Expense Deleted Successfully ✅");
         setLoading(false);
        fetchExpenses(); // refresh
      }
    } catch (error) {
      alert("Delete failed ❌");
      setLoading(false);
    }
  };

  const allHeaderIds = ["expense_no"];

  const handleSelectAll = () => {
    const allSelected = allHeaderIds.every((id) => searchHeaders.includes(id));
    setSearchHeaders(allSelected ? [] : [...allHeaderIds]);
  };

  const isSubledgerSelected = searchHeaders.includes("subledgerName");
  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      <div className="mx-auto  ">
        <div className="flex sticky top-[40px] z-40 w-full ml-[25px]">
          <div className="flex items-center px-6 py-4 border-b  w-full max-w-[1462px] h-[40px] border  border-gray-200 justify-between  ">
            <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
              Expense List
            </h2>

            <div className="flex gap-5">
              <div className="flex gap-2 mt-2">
                <div className="hidden lg:flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[450px]">
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
                        {[
                          { id: "expense_no", label: "Expense No" },
                          // { id: "subledgerName", label: "Subledger Name" },
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
                            <span className="text-[11px] text-gray-700">
                              {col.label}
                            </span>
                          </label>
                        ))}

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
                  className="hidden lg:flex ml-2 border border-gray-300 text-[11px] px-2 h-[30px] rounded"
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
                    fetchExpenses(); // 🔥 API CALL
                  }}
                  className="hidden lg:flex ml-2 bg-[#0b2c69] text-white text-[11px] px-4  rounded-[3px] font-source hover:bg-[#071d45] h-[30px]"
                >
                  <span className="mt-1">Search</span>
                </button>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchHeaders([]);
                    setSelectedDate("");
                    setSelectedBankAccount("");
                    // setCurrentPage(1);
                    fetchExpenses();
                  }}
                  className="hidden lg:flex ml-2 bg-[#0b2c69] text-white text-[11px] px-4 rounded-[3px] font-source hover:bg-[#071d45] h-[30px]"
                >
                  <span className="mt-1">Clear</span>
                </button>
              </div>
              {(userData?.isAdmin ||
                permissions?.Transaction?.find(
                  (item) => item.name === "Expense List",
                )?.add) && (
                <button
                  onClick={() => navigate("/Expences/create")}
                  className="w-[100px] h-[30px]  cursor-pointer rounded bg-[#0A2478] text-white text-[11.25px] flex items-center justify-center mt-2 py-2 "
                >
                  Add Expense
                </button>
              )}

              <button
                onClick={() => navigate("/")}
                className="w-[74px] h-[30px] cursor-pointer  rounded bg-[#C1121F] text-white text-[10px] mt-2"
              >
                Exit
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden   ml-[25px]">
          <table className="text-left border-collapse w-[500px]">
            <thead>
              <tr className="bg-[#0D3082] text-white text-[12px]">
                <th className="p-1 border-r text-left">Expense No</th>
                <th className="p-1 border-r text-left">Expense Date</th>
                <th className="p-1 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="text-[13px] bg-white">
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {/* Expense No */}
                    <td className="p-1">{row.expense_no}</td>

                    {/* Expense Date */}
                    <td className="p-1">
                      {new Date(row.expense_date).toLocaleDateString("en-GB")}
                    </td>

                    {/* Actions */}
                    <td className="p-1">
                      <div className="flex gap-2">
                        {(userData?.isAdmin ||
                          permissions?.Transaction?.find(
                            (item) => item.name === "Expense List",
                          )?.view) && (
                          <button
                            onClick={() =>
                              navigate("/Expences/create", {
                                state: { expenseId: row.id, view: true },
                              })
                            }
                            className="bg-blue-500 text-white p-1 rounded"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>
                        )}

                        {(userData?.isAdmin ||
                          permissions?.Transaction?.find(
                            (item) => item.name === "Expense List",
                          )?.edit) && (
                          <button
                            onClick={() =>
                              navigate("/Expences/create", {
                                state: { expenseId: row.id },
                              })
                            }
                            className="bg-green-600 text-white p-1 rounded"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                        )}

                        {(userData?.isAdmin ||
                          permissions?.Transaction?.find(
                            (item) => item.name === "Expense List",
                          )?.delete) && (
                          <button
                            onClick={() => handleDeleteExpense(row.id)}
                            className="bg-red-600 text-white p-1 rounded"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default ExpenseList;
