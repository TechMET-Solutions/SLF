import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { Edit, Eye, Trash2 } from "lucide-react";
// import { BASEURL } from "../../url"; // your existing url.jsx

const JournalVoucherlist = () => {
  const navigate = useNavigate();

  const systemBlue = "bg-[#0A2478]";
  const tealHeader = "bg-[#008b8b]";
  const tableHeaderBg = "bg-gray-100";
  const inputClass =
    "border border-gray-300 rounded-sm px-2 py-1 text-[12px] outline-none";

  // ================= STATES =================
  const [voucherList, setVoucherList] = useState([]);

  console.log(voucherList, "voucherList");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [payMode, setPayMode] = useState("All");
  const [account, setAccount] = useState("All");

  // ================= API CALL =================
  const fetchVouchers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/journalVoucher/list`,
      );

      if (res.data.success) {
        setVoucherList(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
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

    try {
      const response = await axios.delete(
        `${API}/api/journalVoucher/delete/${id}`,
      );

      if (response.data.success) {
        alert("Journal Voucher Deleted Successfully ✅");

        // 🔥 Refresh List After Delete
        fetchVouchers();
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert(
        error.response?.data?.message || "Failed to delete Journal Voucher ❌",
      );
    }
  };

  return (
    <div className="min-h-screen ">
      <div className=" ml-[110px] mr-[110px] mx-auto">
        <div className="flex justify-center sticky top-[80px] z-40">
          <div className="flex justify-center p-6">
            <div className="flex items-center justify-between px-6 py-4 border-b w-[1290px] h-[61px] border rounded-[11px] border-gray-200 bg-white">
              <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
                Journal Voucher List
              </h2>

              <div className="flex gap-5">
                <div className="   flex items-end gap-5">
                  <div>
                    <label className="text-[11px] font-bold p-1">
                      Pay Mode
                    </label>
                    <select
                      value={payMode}
                      onChange={(e) => setPayMode(e.target.value)}
                      className={`${inputClass} w-48`}
                    >
                      <option value="All">--Select All--</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">Net Banking</option>
                      {/* <option value="Bank">Bank</option> */}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold p-1">Account</label>
                    <select
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      className={`${inputClass} w-48`}
                    >
                      <option value="All">--Select All--</option>
                      <option value="Cash Account">Cash Account</option>
                      <option value="Bank Account">Bank Account</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSearch}
                    className={`${systemBlue} text-white px-6 py-1 rounded text-xs font-bold flex items-center gap-2`}
                  >
                    Search
                  </button>
                </div>
                <button
                  onClick={() => navigate("/JournalVoucher/create")}
                  className="w-[74px] h-[24px]  cursor-pointer rounded bg-[#0A2478] text-white text-[11.25px] flex items-center justify-center mt-2"
                >
                  Add
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-[74px] h-[24px] cursor-pointer  rounded bg-[#C1121F] text-white text-[10px] mt-2"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <table className="text-left border-collapse ">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr className="font-bold border-b">
                  <th className="p-2 border border-r w-[160px]">Voucher No</th>
                  <th className="p-2 border border-r w-[100px]">
                    Voucher Date
                  </th>
                  <th className="p-2 border border-r w-[100px]">Deposit</th>
                  <th className="p-2 border border-r w-[100px]">Withdrawal</th>
                  <th className="p-2 border border-r w-[120px]">Date</th>
                  {/* Added Action Header */}
                  <th className="p-2 border w-[150px] text-center">Action</th>
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
                        JV-{item.voucher_no}
                      </td>
                      <td className="p-2">{formatDate(item.voucher_date)}</td>
                      <td className="p-2">{item.deposit_amount}</td>
                      <td className="p-2">{item.withdrawal_amount}</td>
                      <td className="p-2">{formatDate(item.created_at)}</td>

                      {/* --- Action Buttons Column --- */}
                      <td className="p-2  flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleView(item)}

                          className="bg-blue-500 text-white p-1 rounded"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-green-600 text-white p-1 rounded"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 text-white p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalVoucherlist;
