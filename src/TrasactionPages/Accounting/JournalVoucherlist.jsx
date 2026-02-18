import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
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
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [payMode, setPayMode] = useState("All");
  const [account, setAccount] = useState("All");

  // ================= API CALL =================
  const fetchVouchers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/journalVoucher/list`, {
        params: {
          page,
          limit: 10,
          payMode,
          account,
        },
      });

      setVoucherList(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
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

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <div className="p-4 max-w-[1500px] mx-auto">
        {/* Header */}
        <div
          className={`${tealHeader} text-white px-4 py-1.5 flex justify-between items-center`}
        >
          <h1 className="text-sm font-bold uppercase">Journal Voucher List</h1>
          <button
            onClick={() => navigate("/JournalVoucher/create")}
            className="bg-[#0A2478] text-white text-[11px] font-bold py-1 px-3 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> ADD
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 border flex items-end gap-4 mb-4">
          <div>
            <label className="text-[11px] font-bold p-1">Pay Mode</label>
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
            <Search size={14} /> Search
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${tableHeaderBg} text-[11px] font-bold border-b`}>
                <th className="p-2">Voucher No</th>
                <th className="p-2">Voucher Date</th>
                <th className="p-2">Narration</th>
                <th className="p-2">Debit</th>
                <th className="p-2">Credit</th>
                <th className="p-2">Created At</th>
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
                voucherList?.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 font-bold text-[#0A2478]">
                      JV-{item.id}
                    </td>
                    <td className="p-2">{formatDate(item.voucherDate)}</td>
                    <td className="p-2">{item.narration}</td>
                    <td className="p-2">{item.debitAmount}</td>
                    <td className="p-2">{item.creditAmount}</td>
                    <td className="p-2">{formatDate(item.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-4 flex justify-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border"
            >
              Previous
            </button>

            <span className="px-3 py-1">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalVoucherlist;
