import { useEffect, useState } from "react";
import { API } from "../api";
import axios from "axios";

const LoanApplicationHistory = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
const [bankList, setBankList] = useState([]);
  console.log(bankList,"bankList")


   useEffect(() => {
    const fetchBanks = async () => {
      debugger;
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));

        const branchId =
          typeof userData?.branchId === "object"
            ? userData?.branchId?.id
            : userData?.branchId;

        console.log("BranchId:", branchId);

        if (!branchId) {
          console.error("BranchId missing!");
          return;
        }

        const res = await axios.get(`${API}/api/banks/GetBanklist`, {
          params: { branchId },
        });

        const formattedBanks = res.data.map((bank) => ({
          id: bank.id,
          name: bank.name,
        }));

        setBankList(formattedBanks);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);
  const [fromDate, setFromDate] = useState("2025-04-01");
const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const [schemeId, setSchemeId] = useState("");
  const [status, setStatus] = useState("Approved");

  const [rows, setRows] = useState([]);
  console.log(rows,"rows")
  const [tableLoading, setTableLoading] = useState(false);

  // Fetch Schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          `${API}/Scheme/active?page=1&limit=50`,
        );
        const result = await response.json();
        setSchemes(result.data || []);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const handleView = async () => {
    try {
      setTableLoading(true);
      const url = `${API}/api/Reports/loan-history?fromDate=${fromDate}&toDate=${toDate}&schemeId=${schemeId}&status=${status}`;
      const res = await fetch(url);
      const result = await res.json();

      if (result.success) {
        setRows(result.data);
      } else {
        setRows([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTableLoading(false);
    }
  };
const show = (val) =>
  val === undefined || val === null || val === "" ? "0" : val;

  return (
    <div className="min-h-screen w-full">
      {/* Top Bar */}
      <div className="flex sticky top-[50px] z-40 w-full ml-[25px]">
        <div className="flex items-center px-2 py-4 border-b w-full max-w-[1462px] h-[40px] border  border-gray-200 justify-between bg-white">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600  font-bold text-[18px] whitespace-nowrap">
              Loan Application History
            </h2>
          </div>

          {/* 🟡 Middle — Filters (Label and Input on same line) */}
          <div className="hidden lg:flex  items-center gap-6 flex-1 justify-center">

            {/* From Date */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">From</label>
              <input
                type="date"
                className="border border-gray-300 p-1 rounded text-xs w-[120px] outline-none focus:border-[#0A2478]"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">To</label>
              <input
                type="date"
                className="border border-gray-300 p-1 rounded text-xs w-[120px] outline-none focus:border-[#0A2478]"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            {/* Scheme */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Scheme</label>
              <select
                className="border border-gray-300 p-1 rounded text-xs w-[140px] bg-white outline-none focus:border-[#0A2478]"
                value={schemeId}
                onChange={(e) => setSchemeId(e.target.value)}
              >
                <option value="">All</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.schemeName}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Status</label>
              <select
                className="border border-gray-300 p-1 rounded text-xs w-[110px] bg-white outline-none focus:border-[#0A2478]"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>
                 <option value="Pending">Pending</option>
                <option value="Approved">Active</option>
               
               <option value="Cancelled">Cancelled</option>
    <option value="Closed">Closed</option>
                <option value="Auction">Auction</option>
                <option value="Auctioned">Auctioned</option>
              </select>
            </div>
          </div>

          {/* 🔵 Right — Action Button */}
          <div className="flex-shrink-0 flex gap-2">
            <button
              onClick={handleView}
              className="bg-[#0A2478] text-white w-[74px] h-[24px] rounded text-[10px]"

            >
              View
            </button>
            <button
              // onClick={handleView}
              className="bg-green-600 text-white w-[74px] h-[24px] rounded text-[10px]"
            >
              Excel
            </button>
            <button
              // onClick={handleView}
              className="bg-[#C1121F] text-white w-[74px] h-[24px] rounded text-[10px]"
            >
              PDF
            </button>
          </div>
        </div>
      </div>



      <div className=" ml-[25px]  overflow-auto">
       <div className="">
          <div className="flex">
            <div className="overflow-x-auto  h-[800px]">
             <table className="w-full border-collapse">
  <thead className="bg-[#0A2478] text-white text-[10px] sm:text-[12px] md:text-sm">
    <tr>
      <th className="border p-2">SNo</th>
      <th className="border p-2">Loan No</th>
      <th className="border p-2">Loan Date</th>
      <th className="border p-2">Product</th>
      <th className="border p-2">Scheme</th>
      <th className="border p-2">Customer ID</th>
      <th className="border p-2">Customer Name</th>
      <th className="border p-2">Mobile No</th>
      <th className="border p-2">Status</th>
      <th className="border p-2">Ref No</th>
      <th className="border p-2">Approval Date</th>
      <th className="border p-2">Eligible Amt</th>
      <th className="border p-2">Loan Amt</th>

      <th className="border p-2">Cash</th>

      {/* ✅ Dynamic Bank Headers */}
      {bankList.map((bank) => (
        <th key={bank.id} className="border p-2">
          {bank.name}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {tableLoading ? (
      <tr>
        <td colSpan={14 + bankList.length} className="p-4 text-center">
          Loading...
        </td>
      </tr>
    ) : rows.length === 0 ? (
      <tr>
        <td colSpan={14 + bankList.length} className="p-4 text-center">
          No Records Found
        </td>
      </tr>
    ) : (
      rows.map((row, index) => (
        <tr
          key={row.id}
          className="hover:bg-blue-50 odd:bg-white even:bg-gray-50 text-[11px]"
        >
          <td className="border p-2">{index + 1}</td>
          <td className="border p-2">{show(row.id)}</td>
          <td className="border p-2">
            {show(row.created_at?.slice(0, 10))}
          </td>
          <td className="border p-2">{show(row.Product_Name)}</td>
          <td className="border p-2">{show(row.Scheme)}</td>
          <td className="border p-2">{show(row.BorrowerId)}</td>
          <td className="border p-2">{show(row.Borrower)}</td>
          <td className="border p-2">{show(row.Mobile_Number)}</td>
          <td className="border p-2">{show(row.status)}</td>
          <td className="border p-2">{show(row.Loan)}</td>
          <td className="border p-2">
            {show(row.approval_date?.slice(0, 10))}
          </td>
          <td className="border p-2">{show(row.Min_Loan)}</td>
          <td className="border p-2">{show(row.Loan_amount)}</td>

          {/* ✅ CASH COLUMN */}
          <td className="border p-2 text-center">
            {row.payments_Details
              ?.filter((p) => p.paidBy === "Cash")
              .reduce((sum, p) => sum + (p.customerAmount || 0), 0)}
          </td>

          {/* ✅ BANK WISE DYNAMIC VALUES */}
          {bankList.map((bank) => {
            const total = row.payments_Details
              ?.filter((p) => p.bankId === bank.id)
              .reduce((sum, p) => sum + (p.customerAmount || 0), 0);

            return (
              <td key={bank.id} className="border p-2 text-center">
                {total || 0}
              </td>
            );
          })}
        </tr>
      ))
    )}
  </tbody>
</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationHistory;
