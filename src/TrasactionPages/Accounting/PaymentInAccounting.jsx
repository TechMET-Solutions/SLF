import { Edit, Eye, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const PaymentInAccounting = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH API ================= */
  const fetchVouchers = async (currentPage = 1) => {
    try {
      const res = await fetch(`${API}/party/all?page=${currentPage}&limit=10`);
      const result = await res.json();

      if (result.success) {
        setTableData(result.data);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchVouchers(page);
  }, [page]);
  const handleDeleteVoucher = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this voucher?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/party/delete/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      alert("Voucher Deleted ✅");
      fetchVouchers(page); // refresh list
    } catch (error) {
      alert(error.message || "Delete failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow border">
          <h1 className="text-[#D32F2F] text-xl font-bold">
            Payment Voucher List
          </h1>

          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/PaymentVoucher/create")}
              className="bg-[#0D3082] text-white px-5 py-1.5 rounded text-xs font-bold"
            >
              Add
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden border border-gray-400 rounded-sm shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0D3082] text-white text-[11px] uppercase">
                <th className="p-3 border-r">Doc No</th>
                <th className="p-3 border-r">Party</th>

                <th className="p-3 border-r">Account Ledger</th>
                <th className="p-3 border-r text-center">Txn No</th>

                <th className="p-3 border-r text-right">Amount</th>
                <th className="p-3 border-r">MOP</th>
                <th className="p-3 border-r text-center">Voucher Date</th>
                <th className="p-3 border-r">Doc Date</th>
                <th className="p-3 border-r text-right">Due</th>
                <th className="p-3 border-r text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-[12px] bg-white">
              {tableData.map((row, i) => {
                const vouchers = row.voucherDetails || [];

                // 👉 Ledger Names: Ledger1, Ledger2, Ledger3
                const ledgerNames = vouchers
                  .map((v) => v.ledgerName)
                  .filter(Boolean)
                  .join(", ");

                // 👉 Voucher Dates: 01/02/2026, 02/02/2026
                const voucherDates = vouchers
                  .map((v) =>
                    v.date
                      ? new Date(v.date).toLocaleDateString("en-GB")
                      : null,
                  )
                  .filter(Boolean)
                  .join(", ");

                // 👉 Total Amount of all rows
                const totalAmount = vouchers.reduce(
                  (sum, v) => sum + Number(v.amount || 0),
                  0,
                );

                // 👉 Bill Date format
                const billDateFormatted = row.billDate
                  ? new Date(row.billDate).toLocaleDateString("en-GB")
                  : "-";

                return (
                  <tr key={i} className="border-b hover:bg-blue-50">
                    {/* Doc No */}
                    <td className="p-2 px-3 border-r">{row.billNo}</td>
                    <td className="p-2 px-3 border-r">{row.partyName}</td>
                    {/* Doc Date */}

                    {/* Ledger Names from array */}
                    <td className="p-2 px-3 border-r font-medium">
                      {ledgerNames || "-"}
                    </td>

                    {/* Transaction No */}
                    <td className="p-2 px-3 border-r text-center">
                      {row.bankDetails?.transactionNo || "-"}
                    </td>

                    {/* Voucher Dates from array */}

                    {/* Total Amount */}
                    <td className="p-2 px-3 border-r text-right font-semibold">
                      ₹ {totalAmount}
                    </td>

                    {/* Mode of Payment */}
                    <td className="p-2 px-3 border-r">{row.payMode}</td>
                    <td className="p-2 px-3 border-r text-center">
                      {voucherDates || "-"}
                    </td>
                    {/* Party Name */}
                    <td className="p-2 px-3 border-r">{billDateFormatted}</td>
                    {/* Action */}
                    <td className="p-2 px-3 border-r text-right font-semibold text-red-600">
                      ₹ {row.dueAmount}
                    </td>

                    <td className="p-2 px-3 border-r text-center">
                      <span
                        className={`px-2 py-1 rounded text-white text-[10px] ${
                          row.paymentStatus === "FULL"
                            ? "bg-green-600"
                            : "bg-orange-500"
                        }`}
                      >
                        {row.paymentStatus}
                      </span>
                    </td>

                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                        {/* View */}
                        <button
                          onClick={() =>
                            navigate("/PaymentVoucher/create", {
                              state: { voucher: row, view: true },
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
                            navigate("/PaymentVoucher/create", {
                              state: { voucher: row },
                            })
                          }
                          className="bg-[#4CAF50] text-white p-1 rounded"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteVoucher(row.id)}
                          className="bg-red-600 text-white p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                        {/* <button
                          onClick={() =>
                            navigate("/PaymentVoucher/create", {
                              state: { voucher: row, repayment: true },
                            })
                          }
                          className="bg-yellow-500 text-white p-1 rounded"
                          title="Repayment"
                        >
                          <RotateCcw size={14} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-8 flex justify-center space-x-1">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="border px-3 py-1 text-xs"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 text-xs ${
                page === i + 1 ? "bg-[#0D3082] text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="border px-3 py-1 text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInAccounting;
