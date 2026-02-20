import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const ExpenseList = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

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

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      <div className="ml-[110px] mr-[110px] mx-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow border">
          <h1 className="text-[#D32F2F] text-xl font-bold">
            Expense List
          </h1>

          <button
            onClick={() => navigate("/Expences/create")}
            className="bg-[#0D3082] text-white px-5 py-1.5 rounded text-xs font-bold"
          >
            Add Expense
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden ">
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
