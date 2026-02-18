import { useEffect, useState } from "react";

const InterestDueReport = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedScheme, setSelectedScheme] = useState("");
  const [loanSearch, setLoanSearch] = useState("");
  const [loanNumbers, setLoanNumbers] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("");
  const [reportRows, setReportRows] = useState([]);

  // Fetch Schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10",
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

  // Fetch Loan Numbers based on Scheme + Search
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/loan-numbers?scheme=${selectedScheme}&search=${loanSearch}`,
        );
        const data = await res.json();
        setLoanNumbers(data.data || []);
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };

    fetchLoans();
  }, [selectedScheme, loanSearch]);
  const handleView = async () => {
    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/interest-due-report?loanNo=${selectedLoan}&scheme=${selectedScheme}`,
      );
      const data = await res.json();
      setReportRows(data.data || []);
    } catch (err) {
      console.error("Error loading report:", err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-sm">
      <div className="">
        <div className="flex justify-center mt-5 px-4">
          <div className="flex items-center justify-between px-6 py-4 w-full max-w-[1290px] min-h-[75px] rounded-[11px] border border-gray-200 shadow-sm bg-white gap-4">

            {/* 🔴 Left — Title */}
            <div className="flex-shrink-0">
              <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap">
                Interest Due Report
              </h2>
            </div>

            {/* 🟡 Middle — Filters (Single Line) */}
            <div className="flex items-center gap-6 flex-1 justify-center">

              {/* As On Section */}
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">As On</label>
                <input
                  type="date"
                  className="border border-gray-300 p-1 rounded text-xs w-[130px] bg-white outline-none focus:border-[#0A2478]"
                  defaultValue="2026-01-25"
                />
              </div>

              {/* Schemes Section */}
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Schemes</label>
                <select
                  className="border border-gray-300 p-1 rounded text-xs w-[160px] bg-white outline-none focus:border-[#0A2478]"
                  onChange={(e) => setSelectedScheme(e.target.value)}
                >
                  <option value="">--Select--</option>
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    schemes.map((s) => (
                      <option key={s.id} value={s.schemeName}>
                        {s.schemeName}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Loan No Section (Combined Input/Select) */}
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Loan No</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="--Select All--"
                    className="border border-gray-300 p-1 px-2 rounded-l text-xs w-[140px] bg-white outline-none focus:border-[#0A2478]"
                    onChange={(e) => setLoanSearch(e.target.value)}
                  />
                  <select
                    className="border border-l-0 border-gray-300 p-1 rounded-r text-xs w-[32px] bg-gray-50 outline-none"
                    onChange={(e) => setSelectedLoan(e.target.value)}
                  >
                    <option value=""></option>
                    {loanNumbers.map((l) => (
                      <option key={l.id} value={l.id}>{l.id}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Due Days Section */}
              <div className="flex items-center gap-2">
                <label className="text-[12px] font-bold text-gray-600 whitespace-nowrap">Due Days</label>
                <input
                  type="number"
                  className="border border-gray-300 p-1 rounded text-xs w-[60px] text-center outline-none"
                  defaultValue="0"
                />
              </div>
            </div>

            {/* 🔵 Right — Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleView}
                className="w-[75px] h-[32px] rounded bg-[#0A2478] text-white text-[12px] font-bold hover:bg-[#071d45] transition-colors flex items-center justify-center gap-1"
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
                onClick={() => window.history.back()}
                className="w-[75px] h-[32px] rounded bg-[#C1121F] text-white text-[12px] font-bold hover:bg-[#a0101a] transition-colors flex items-center justify-center"
              >
                PDF
              </button>
            </div>
          </div>
        </div>

        <div className="">
          {/* Filters */}
          {/* <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-4 p-3 border rounded bg-gray-50 text-[13px] text-gray-700">

          
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">As On</label>
              <div className="flex items-center">
                <input
                  type="date"
                  className="border border-gray-300 p-1 px-2 rounded-l w-28 bg-white outline-none"
                  defaultValue="25/01/2026"
                />
                
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label>Schemes</label>
              <select
                className="border border-gray-300 p-1 rounded w-44 bg-white outline-none focus:border-teal-600"
                onChange={(e) => setSelectedScheme(e.target.value)}
              >
                <option value="">--Select--</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  schemes.map((s) => (
                    <option key={s.id} value={s.schemeName}>
                      {s.schemeName}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">Loan No</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="--Select All--"
                  className="border border-gray-300 p-1 px-2 rounded-l w-44 bg-white outline-none focus:border-teal-600"
                  onChange={(e) => setLoanSearch(e.target.value)}
                />
                <select
                  className="border border-l-0 border-gray-300 p-1 rounded-r w-10 bg-white outline-none"
                  onChange={(e) => setSelectedLoan(e.target.value)}
                >
                  <option value=""></option>
                  {loanNumbers.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">Due Days</label>
              <input
                type="number"
                className="border border-gray-300 p-1 rounded w-16 text-center outline-none"
                defaultValue="0"
              />
            </div>

          </div>

          <div className="flex gap-2 mb-4 border-b pb-4">
            <button
              onClick={handleView}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-1 rounded flex items-center gap-2 text-xs transition-colors"
            >
              💾 View
            </button>

            <button className="bg-blue-700 text-white px-8 py-1 rounded text-xs">
              ✖ Exit
            </button>
          </div> */}

          {/* Table */}
          <div className="overflow-x-auto mt-6  mx-24">
            {/* <div className="overflow-x-auto"></div> */}
            <table className="w-full text-left  rounded-lg border-collapse min-w-[1500px]">
              <thead className="bg-[#0A2478] text-white text-xs">
                <tr className="">
                  <th className="border p-1">SI No</th>
                  <th className="border p-1">Loan No</th>
                  <th className="border p-1">Loan Date</th>
                  <th className="border p-1">Scheme</th>
                  <th className="border p-1">Customer ID</th>
                  <th className="border p-1">Customer Name</th>
                  <th className="border p-1">Customer Address</th>
                  <th className="border p-1">Mobile No</th>
                  <th className="border p-1">Loan Amount</th>
                  <th className="border p-1">Interest Due Amt.</th>
                  <th className="border p-1">Interest Due Days</th>
                  <th className="border p-1">Last Reciept No.</th>
                  <th className="border p-1">Last Reciept Date</th>
                  <th className="border p-1">Last Receipt Amt</th>
                  <th className="border p-1">Interest Paid Upto</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map((row, i) => (
                  <tr key={row.id} className="text-[11px]">
                    <td className="border p-1 text-center">{i + 1}</td>
                    <td className="border p-1">{row.id}</td>

                    {/* Loan Date */}
                    <td className="border p-1">
                      {row.created_at
                        ? new Date(row.created_at).toLocaleDateString()
                        : ""}
                    </td>

                    <td className="border p-1">{row.Scheme}</td>

                    {/* Customer ID */}
                    <td className="border p-1">{row.BorrowerId}</td>

                    {/* Customer Name */}
                    <td className="border p-1">{row.Borrower}</td>

                    {/* Address नाहीये API मध्ये */}
                    <td className="border p-1">-</td>

                    <td className="border p-1">{row.Mobile_Number}</td>

                    {/* Loan Amount */}
                    <td className="border p-1 text-right">
                      {row.Loan_amount}
                    </td>

                    {/* Interest Due Amount */}
                    <td className="border p-1 text-right">
                      {row.InterestDueAmount ?? 0}
                    </td>

                    {/* Interest Due Days */}
                    <td className="border p-1 text-center">
                      {row.InterestPaidDayCount ?? 0}
                    </td>

                    {/* Last Receipt No – data नाही */}
                    <td className="border p-1">-</td>

                    {/* Last Receipt Date */}
                    <td className="border p-1">
                      {row.LastEmiPaidDate || "-"}
                    </td>

                    {/* Last Receipt Amount */}
                    <td className="border p-1 text-right">
                      {row.LoanEmiAmountpaid || 0}
                    </td>

                    {/* Interest Paid Upto */}
                    <td className="border p-1">
                      {row.InterestPaidUpto || "-"}
                    </td>
                  </tr>
                ))}

                <tr className="bg-[#F2EBE3] font-bold text-[11px]">
                  <td className="border p-1" colSpan="9">
                    Total
                  </td>
                  <td className="border p-1 text-right">
                    {reportRows.reduce(
                      (s, r) => s + Number(r.InterestDueAmount || 0),
                      0
                    )}
                  </td>
                  <td className="border p-1" colSpan="5"></td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestDueReport;
