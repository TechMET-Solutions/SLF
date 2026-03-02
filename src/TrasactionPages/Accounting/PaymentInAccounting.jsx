import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const ExpenseList = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [searchHeaders, setSearchHeaders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState("");
 const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId]
    );
  };

  /* ================= FETCH MASTER LIST ================= */
  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API}/api/expense/master-list`);
      const result = await res.json();

      if (result.success) {
        setTableData(result.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* ================= DELETE ================= */
  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/api/expense/delete/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        alert("Expense Deleted Successfully ✅");
        fetchExpenses(); // refresh
      }
    } catch (error) {
      alert("Delete failed ❌");
    }
  };


const allHeaderIds = [
  "Expense No",
  "Subledger Name",
  "Expense date"
];


 const handleSelectAll = () => {
    const allSelected = allHeaderIds.every((id) => searchHeaders.includes(id));
    setSearchHeaders(allSelected ? [] : [...allHeaderIds]);
  };
  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      <div className="ml-[110px] mr-[110px] mx-auto ">

      

        <div className="flex justify-center sticky top-[80px] z-40">
          <div className="flex justify-center p-6 ">
            <div className="flex items-center justify-between px-6 py-4 border-b w-[1290px] h-[61px] border rounded-[11px] border-gray-200 bg-white">
              <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
                Expense List
              </h2>

              <div className="flex gap-5">
                <div className='flex gap-2 mt-2'>
                   <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[450px]">
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
  { id: "expenseNo", label: "Expense No" },
  { id: "subledgerName", label: "Subledger Name" },
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

               

               
              </div>
                  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="ml-2 border border-gray-300 text-[11px] px-2 h-[34px] rounded"
  />
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // setCurrentPage(1);
                    // fetchData(1);   // 🔥 API CALL
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4  rounded-[3px] font-source hover:bg-[#071d45] h-[34px]"
                >
                  Search
                </button>

                <button
                  
                  onClick={() => {
                    setSearchQuery("");
                      setSearchHeaders([]);
                      setSelectedDate("")
                    // setCurrentPage(1);
                    // fetchData(1);
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4  rounded-[3px] font-source hover:bg-[#071d45] h-[34px]"
                >
                  Clear
                </button>  
</div>
 
                <button
                 onClick={() => navigate("/Expences/create")}
                  className="w-[100px] h-[30px]  cursor-pointer rounded bg-[#0A2478] text-white text-[11.25px] flex items-center justify-center mt-2 py-2 h-[34px]"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-[74px] h-[30px] h-[34px] cursor-pointer  rounded bg-[#C1121F] text-white text-[10px] mt-2"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden mt-5">
          <table className=" text-left border-collapse w-[500px]" >
            <thead>
              <tr className="bg-[#0D3082] text-white text-[12px] uppercase">
                <th className="p-3 border-r">Expense No</th>
                <th className="p-3 border-r">Expense Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-[13px] bg-white">
              {tableData.map((row,index) => (
                <tr key={row.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>

                  {/* Expense No */}
                  <td className="p-3  font-medium">
                    {row.expense_no}
                  </td>

                  {/* Expense Date */}
                  <td className="p-3 ">
                    {new Date(row.expense_date).toLocaleDateString("en-GB")}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">

                      {/* View */}
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

                      {/* Edit */}
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

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteExpense(row.id)}
                        className="bg-red-600 text-white p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ExpenseList;
