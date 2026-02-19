import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const CustomerLedger = () => {
  const [searchText, setSearchText] = useState("");
  const [partyList, setPartyList] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [totals, setTotals] = useState({ debit: 0, credit: 0 });

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔎 SEARCH PARTY */
  const searchCustomers = async (value) => {
    const res = await axios.get(`${API}/Master/doc/Customer_list`, {
      params: { search: value },
    });
    setPartyList(res.data);
    setShowDropdown(true);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchText.trim()) searchCustomers(searchText);
    }, 400);
    return () => clearTimeout(t);
  }, [searchText]);

  /* 📄 FETCH LEDGER */
  // const fetchLedger = async () => {
  //   if (!selectedParty || !fromDate || !toDate) {
  //     alert("Select Party & Date Range");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       `${API}/api/customer-ledger/customer-ledger`,
  //       {
  //         params: {
  //           customerId: selectedParty.id,
  //           fromDate,
  //           toDate,
  //         },
  //       },
  //     );
  //     setLedgerData(res.data.ledger || []);
  //   } catch (err) {
  //     alert("Ledger fetch failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchLedger = async () => {
    if (!selectedParty || !fromDate || !toDate) {
      alert("Select Party & Date Range");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${API}/api/customer-ledger/customer-ledger`,
        {
          params: {
            customerId: selectedParty.id,
            fromDate,
            toDate,
          },
        },
      );

      const ledger = res.data.ledger || [];

      // 🔹 CALCULATE TOTALS
      let totalDebit = 0;
      let totalCredit = 0;

      ledger.forEach((r) => {
        totalDebit += Number(r.debit || 0);
        totalCredit += Number(r.credit || 0);
      });

      setLedgerData(ledger);
      setTotals({
        debit: totalDebit,
        credit: totalCredit,
      });
    } catch (err) {
      alert("Ledger fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-2 text-[11px]">
      <div className="">
        {/* HEADER */}
        {/* <div className="bg-[#1a8a81] text-white px-3 py-1 font-bold">
          Party Ledger
        </div> */}

        {/* FILTER */}
        {/* <div className="p-4 space-y-4 border-b">
          <div className="flex gap-6">
            <div>
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border ml-2 px-2"
              />
            </div>

            <div>
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border ml-2 px-2"
              />
            </div>
          </div>

          <div className="relative w-[350px]">
            <label>Party Name *</label>
            <input
              className="border w-full px-2 py-1"
              value={selectedParty ? selectedParty.printName : searchText}
              onChange={(e) => {
                setSelectedParty(null);
                setSearchText(e.target.value);
              }}
            />

            {showDropdown && partyList.length > 0 && (
              <div className="absolute bg-white border w-full max-h-48 overflow-auto z-10">
                {partyList.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedParty(p);
                      setShowDropdown(false);
                      setSearchText("");
                    }}
                    className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                  >
                    {p.printName}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={fetchLedger}
            className="bg-blue-700 text-white px-10 py-1 rounded"
          >
            View
          </button>
        </div> */}

        <div className="flex justify-center mt-5 px-4">
          <div className="flex flex-col w-full max-w-[1290px] rounded-[11px] border border-gray-200 shadow-sm bg-white overflow-hidden">

           {/* 2. Filter Bar - Inline Sequence */}
            <div className="flex items-center justify-between px-6 py-4 gap-4">

              <div className="flex-shrink-0">
                <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
                  Custermer Ledger
                </h2>
              </div>

              {/* Date Section */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-teal-500 w-36"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-teal-500 w-36"
                  />
                </div>
              </div>

              {/* Party Search Section (Flexible Width) */}
              <div className="relative flex-1 max-w-md">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Party Name *</label>
                  <input
                    className="border border-gray-300 rounded w-full px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Search party..."
                    value={selectedParty ? selectedParty.printName : searchText}
                    onChange={(e) => {
                      setSelectedParty(null);
                      setSearchText(e.target.value);
                    }}
                  />
                </div>

                {/* Search Dropdown */}
                {showDropdown && partyList.length > 0 && (
                  <div className="absolute left-[85px] right-0 bg-white border border-gray-200 mt-1 max-h-48 overflow-auto z-50 shadow-xl rounded-b-md">
                    {partyList.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedParty(p);
                          setShowDropdown(false);
                          setSearchText("");
                        }}
                        className="px-3 py-2 hover:bg-teal-50 cursor-pointer text-sm border-b last:border-none"
                      >
                        {p.printName}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* View Button Section */}
              <div className="flex-shrink-0">
                <button
                  onClick={fetchLedger}
                  className="bg-[#005a9c] hover:bg-blue-800 text-white px-8 py-2 rounded text-sm font-bold transition-all shadow-sm"
                >
                  View
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto mt-4  mx-28">
          <table className="w-full text-left  rounded-lg border-collapse max-w-3xl">
          <thead className="bg-[#0A2478] text-white text-xs">
            <tr>
              <th className="border p-1">Date</th>
              <th className="border p-1">Particulars</th>
              <th className="border p-1 ">Deposit</th>
              <th className="border p-1  w-[180px]">Withdrawal</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : ledgerData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No Data
                </td>
              </tr>
            ) : (
              <>
                {ledgerData.map((r, i) => (
                  <tr key={i}>
                    <td className="border p-1">{formatDate(r.ledgerDate)}</td>
                    <td className="border p-1">{r.particulars}</td>
                    <td className="border p-1 text-right">
                      {Number(r.debit || 0).toFixed(2)}
                    </td>
                    <td className="border p-1 text-right">
                      {Number(r.credit || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}

                {/* TOTAL */}
                <tr className="font-bold bg-gray-100">
                  <td className="border p-1"></td>
                  <td className="border p-1 text-right">Total</td>
                  <td className="border p-1 text-right">
                    {totals.debit.toFixed(2)}
                  </td>
                  <td className="border p-1 text-right">
                    {totals.credit.toFixed(2)}
                  </td>
                </tr>
              </>
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerLedger;
