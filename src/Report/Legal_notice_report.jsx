import { useEffect, useState } from "react";

const Legal_notice_report = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("2025-04-01");
  const [toDate, setToDate] = useState("2026-01-25");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [partyQuery, setPartyQuery] = useState("");
  const [partyList, setPartyList] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");

  const [rows, setRows] = useState([]);
  const [searching, setSearching] = useState(false);

  // Fetch Schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://slunawat.co.in/Scheme/getAllSchemes?page=1&limit=10",
        );
        const result = await response.json();
        setSchemes(result.data || []);
        if (result.data?.length) setSelectedScheme(result.data[0].id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  // Fetch Party Suggestions
  useEffect(() => {
    if (!partyQuery || !selectedScheme) {
      setPartyList([]);
      return;
    }

    const fetchParties = async () => {
      try {
        const res = await fetch(
          `https://slunawat.co.in/api/Reports/legal-parties?schemeId=${selectedScheme}&q=${partyQuery}`,
        );
        const data = await res.json();
        setPartyList(data.data || []);
      } catch (err) {
        console.error(err);
        setPartyList([]);
      }
    };

    const t = setTimeout(fetchParties, 300);
    return () => clearTimeout(t);
  }, [partyQuery, selectedScheme]);

  const handleView = async () => {
    if (!selectedScheme || !selectedParty) {
      alert("Select Scheme and Party");
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(
        `https://slunawat.co.in/api/Reports/legal-notice?schemeId=${selectedScheme}&fromDate=${fromDate}&toDate=${toDate}&party=${encodeURIComponent(
          selectedParty,
        )}`,
      );
      const data = await res.json();
      setRows(data.data || []);
    } catch (err) {
      console.error(err);
      setRows([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[12px]">
      <div className="m-3 border border-gray-300 bg-white shadow-md">
        <div className="bg-[#008282] text-white px-3 py-1.5 font-bold text-[13px]">
          Loan Legal Notice Report
        </div>

        {/* Filters */}
        <div className="p-4 bg-white border-b border-gray-200 space-y-3">
          <div className="flex gap-6">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border px-2 py-1"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border px-2 py-1"
            />
          </div>

          <div className="flex gap-4 items-center">
            <select
              className="border px-2 py-1 w-56"
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
            >
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

            <div className="relative">
              <input
                type="text"
                placeholder="Type Party Name"
                value={partyQuery}
                onChange={(e) => {
                  setPartyQuery(e.target.value);
                  setSelectedParty("");
                }}
                className="border px-2 py-1 w-56"
              />

              {partyList.length > 0 && (
                <div className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                  {partyList.map((p, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setSelectedParty(p.Print_Name);
                        setPartyQuery(p.Print_Name);
                        setPartyList([]);
                      }}
                    >
                      {p.Print_Name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleView}
              disabled={searching}
              className="bg-[#005da3] text-white px-6 py-1"
            >
              {searching ? "Loading..." : "View"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full border-collapse text-[11px]">
            <thead className="bg-[#e9e4db] border-b border-gray-400">
              <tr className="text-left text-gray-700">
                <th className="border p-1 font-semibold">S.No</th>
                <th className="border p-1 font-semibold">Branch</th>
                <th className="border p-1 font-semibold">Loan No</th>
                <th className="border p-1 font-semibold">Loan Date</th>
                <th className="border p-1 font-semibold">Party Name</th>
                <th className="border p-1 font-semibold">Mobile</th>
                <th className="border p-1 font-semibold">Address</th>
                <th className="border p-1 font-semibold">Particular</th>
                <th className="border p-1 font-semibold text-right">Gross</th>
                <th className="border p-1 font-semibold text-right">
                  Net Weight
                </th>
                <th className="border p-1 font-semibold text-right">
                  Loan Amount
                </th>
                <th className="border p-1 font-semibold text-right">
                  Pending Amt.
                </th>
                <th className="border p-1 font-semibold">Due Days</th>
                <th className="border p-1 font-semibold text-right">
                  Int. Due
                </th>
                <th className="border p-1 font-semibold">Charge Raised</th>
                <th className="border p-1 font-semibold">Notice Raised</th>
                <th className="border p-1 font-semibold">Notice Released</th>
                <th className="border p-1 font-semibold">Auction Raised</th>
              </tr>
            </thead>

            <tbody>
              {rows.length ? (
                rows.map((r, i) => {
                  const gross = r.Pledge_Item_List?.reduce(
                    (s, x) => s + Number(x.gross || 0),
                    0,
                  );
                  const net = r.Pledge_Item_List?.reduce(
                    (s, x) => s + Number(x.netWeight || 0),
                    0,
                  );
                  const particular = r.Pledge_Item_List?.map(
                    (p) => p.particular,
                  ).join(", ");

                  return (
                    <tr key={i} className="border-b">
                      <td className="border p-1">{i + 1}</td>
                      <td className="border p-1">{r.branch_id}</td>
                      <td className="border p-1">{r.loan_no || r.loanId}</td>
                      <td className="border p-1">
                        {r.loanDate
                          ? new Date(r.loanDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td className="border p-1">{r.partyName}</td>
                      <td className="border p-1">{r.mobile}</td>
                      <td className="border p-1"></td>
                      <td className="border p-1">{particular}</td>
                      <td className="border p-1 text-right">
                        {gross.toFixed(3)}
                      </td>
                      <td className="border p-1 text-right">
                        {net.toFixed(3)}
                      </td>
                      <td className="border p-1 text-right">{r.Loan_amount}</td>
                      <td className="border p-1 text-right">
                        {r.LoanPendingAmount || 0}
                      </td>
                      <td className="border p-1"></td>
                      <td className="border p-1 text-right">
                        {r.total_charges || 0}
                      </td>
                      <td className="border p-1"></td>
                      <td className="border p-1"></td>
                      <td className="border p-1"></td>
                      <td className="border p-1"></td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="18" className="p-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Legal_notice_report;
