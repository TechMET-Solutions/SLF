import { useEffect, useState } from "react";

const LoanApplicationHistory = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("2025-04-01");
const [toDate, setToDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const [schemeId, setSchemeId] = useState("");
  const [status, setStatus] = useState("Approved");

  const [rows, setRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  // Fetch Schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=50",
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
      const url = `https://slunawat.co.in/api/Reports/loan-history?fromDate=${fromDate}&toDate=${toDate}&schemeId=${schemeId}&status=${status}`;
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
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-sm">

      {/* ===== Header ===== */}
      <div className="flex justify-center mt-5 px-4">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[70px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

          {/* 🔴 Left — Title */}
          <div className="flex-shrink-0">
            <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
              Advance Setting List
            </h2>
          </div>

          {/* 🟡 Middle — Filters (Label and Input on same line) */}
          <div className="flex items-center gap-6 flex-1 justify-center">

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
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* 🔵 Right — Action Button */}
          <div className="flex-shrink-0 flex gap-2">
            <button
              onClick={handleView}
              className="w-[75px] h-[30px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-colors"
            >
              View
            </button>
            <button
              // onClick={handleView}
              className="w-[75px] h-[30px] rounded bg-green-600 text-white text-[12px] font-bold hover:bg-green-700 transition-colors"
            >
              Excel
            </button>
            <button
              // onClick={handleView}
              className="w-[75px] h-[30px] rounded bg-red-600 text-white text-[12px] font-bold hover:bg-red-700 transition-colors"
            >
              PDF
            </button>
          </div>
        </div>
      </div>



      <div className=" mt-6">
       <div className="">
          {/* Filters */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-end border p-4 rounded bg-gray-50">
            <div>
              <label className="block mb-1">From Date</label>
              <input
                type="date"
                className="w-full border p-1 rounded"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1">To Date</label>
              <input
                type="date"
                className="w-full border p-1 rounded"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Scheme
              </label>
              <select
                className="w-full border p-1 rounded bg-white"
                value={schemeId}
                onChange={(e) => setSchemeId(e.target.value)}
              >
                <option value="">-- Select Scheme --</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.schemeName} ({s.product})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Status
              </label>
              <select
                className="w-full border p-1 rounded bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Approved">Approve</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
                <option value="Closed">Close</option>
              </select>
            </div>
          </div> */}

          {/* Actions */}
          {/* <div className="flex gap-2 mb-4 border-b pb-4">
            <button
              onClick={handleView}
              className="bg-blue-800 text-white px-6 py-1 rounded flex items-center gap-2"
            >
              <span>💾</span> View
            </button>
          </div> */}

          {/* Table */}
          <div className="overflow-x-auto  mx-24">
            <div className="overflow-x-auto ">
              <table className="w-full text-left  rounded-lg border-collapse min-w-[1500px]">
              <thead className="bg-[#0A2478] text-white text-xs">
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

                  <th className="border p-2">Bandhan Bank</th>
                  <th className="border p-2">MGB Bhagur</th>
                  <th className="border p-2">UBI Bhagur</th>
                  <th className="border p-2">Yes Bank</th>
                  <th className="border p-2">HO HDFC</th>
                  <th className="border p-2">Federal Bank</th>
                  <th className="border p-2">Nrd_Cor</th>
                  <th className="border p-2">Cidco_Cor</th>
                  <th className="border p-2">Payment Gateway</th>
                  <th className="border p-2">B1 HDFC</th>
                  <th className="border p-2">B2 HDFC</th>
                  <th className="border p-2">B3 HDFC</th>
                  <th className="border p-2">V1 Patsanstha</th>
                </tr>
              </thead>

              <tbody>
                {tableLoading ? (
                  <tr>
                    <td colSpan="28" className="p-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan="28" className="p-4 text-center">
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
                 

                      {/* Example for payment columns */}
                      <td className="border p-2">
                        {show(row.payments_Details?.[0]?.paidBy)}
                      </td>

                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
                      <td className="border p-2">0</td>
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
