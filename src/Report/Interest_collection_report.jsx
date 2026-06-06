import { useEffect, useState } from "react";
import { API } from "../api";

const InterestCollectionReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [fromDate, setFromDate] = useState("2025-04-01");
 const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  // Fetching Schemes for the dropdown
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          `${API}/Scheme/active?page=1&limit=10`,
        );
        const result = await response.json();
        setSchemes(result.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schemes:", error);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);
  const fetchReport = async () => {
  const url = `${API}/api/Reports/interest-collection?fromDate=${fromDate}&toDate=${toDate}&scheme=${selectedScheme}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.success) {
    setRows(data.data || []);

    const sum = (data.data || []).reduce(
      (acc, r) => acc + Number(r.InterestPaidAmount || 0),
      0
    );

    setTotal(sum.toFixed(2));
  }
};


  return (
  

    <div className="min-h-screen  font-sans">
      {/* 🟦 Top Header/Filter Bar */}
      <div className="flex justify-center">
        <div className="flex items-center justify-between px-6  w-full max-w-[1462px] py-1 border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
              Interest Collection Report
            </h2>
          </div>

          {/* 🟡 Middle — Filters (Single Line) */}
          <div className="flex items-center gap-6 flex-1 justify-center">

            {/* From Date */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">From</label>
              <input
                type="date"
                className="border border-gray-300 p-1.5 rounded text-xs w-[130px] bg-white outline-none focus:border-[#0A2478] transition-all"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">To</label>
              <input
                type="date"
                className="border border-gray-300 p-1.5 rounded text-xs w-[130px] bg-white outline-none focus:border-[#0A2478] transition-all"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            {/* Scheme Name Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Scheme</label>
              <select
                className="border border-gray-300 p-1.5 rounded text-xs w-[160px] bg-white outline-none focus:border-[#0A2478]"
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                <option value="">--Select--</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.schemeName}>{s.schemeName}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* 🔵 Right — Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={fetchReport}
              className="w-[85px] h-[34px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              View
            </button>
            <button
              // onClick={fetchReport}
              className="w-[85px] h-[34px] rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-900 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              Excel
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-[85px] h-[34px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
            >
              Print
            </button>
            
          </div>
        </div>
      </div>

      {/* 🟢 Table Section */}
      <div className="flex ml-[25px]">
        <div className=" w-[1462px] bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead>
                <tr className="bg-[#0A2478] text-gray-100 text-[11px] font-bold">
                  <th className="border border-gray-300 p-1 w-12 text-center uppercase">Sr. No.</th>
                  <th className="border border-gray-300 p-1 uppercase">Branch</th>
                  <th className="border border-gray-300 p-1 uppercase">Collector</th>
                  <th className="border border-gray-300 p-1 uppercase">Loan No.</th>
                  <th className="border border-gray-300 p-1 uppercase">Loan Date</th>
                  <th className="border border-gray-300 p-1 uppercase">Scheme</th>
                  <th className="border border-gray-300 p-1 uppercase">Customer ID</th>
                  <th className="border border-gray-300 p-1 uppercase">Customer Name</th>
                  <th className="border border-gray-300 p-1 uppercase">Receipt No.</th>
                  <th className="border border-gray-300 p-1 uppercase">Receipt Date</th>
                  <th className="border border-gray-300 p-1 uppercase w-[120px]">Mode Of Payment</th>
                  <th className="border border-gray-300 p-1 text-right uppercase">Interest Amt.</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {rows.map((r, i) => (
                  <tr key={i} className="text-[11px] hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 p-2 text-center">{i + 1}</td>
                    <td className="border border-gray-300 p-2">{r.branchName}</td>
                    <td className="border border-gray-300 p-2">{r.approved_by || "-"}</td>
                    <td className="border border-gray-300 p-2 font-medium">{r.id}</td>
                    <td className="border border-gray-300 p-2">
                      {r.created_at ? r.created_at.split("T")[0] : ""}
                    </td>
                    <td className="border border-gray-300 p-2">{r.Scheme}</td>
                    <td className="border border-gray-300 p-2">{r.BorrowerId}</td>
                    <td className="border border-gray-300 p-2 font-medium">{r.Borrower}</td>
                    <td className="border border-gray-300 p-2">{r?.latestInstallment?.receiptNumber}</td>
                   <td className="border border-gray-300 p-2">
  {(() => {
    const date =
      r.latestInstallment?.transaction_date ||
      r.latestInstallment?.created_at;

    return date
      ? new Date(date).toLocaleDateString("en-GB") // DD/MM/YYYY
      : "-";
  })()}
</td>
                    <td className="border border-gray-300 p-2">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] uppercase font-semibold">
                        {r.latestInstallment?.paymentInfo?.mode || r.latestInstallment?.payment_mode}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2 text-right font-mono font-bold text-green-700">
                     {r.latestInstallment?.loanInfo?.pendingInt || r.latestInstallment?.interest_amount}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#f2e9e0] font-bold text-[11px] text-gray-800">
                  <td className="border border-gray-300 p-2 text-center uppercase" colSpan="4">Summary</td>
                  <td className="border border-gray-300 p-2 text-center uppercase" colSpan="7">
                    Total Collection
                  </td>
                  <td className="border border-gray-300 p-2 text-right font-mono text-[13px] text-blue-900">
                    {Number(total || 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCollectionReport;
