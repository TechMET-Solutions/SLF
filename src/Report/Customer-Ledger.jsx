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
    <div className="min-h-screen text-[11px]">
      <div className="z-10">
      
      <div className="flex justify-center">
  <div className="flex flex-col w-[1462px] border border-gray-200 shadow-sm bg-white overflow-visible">

    {/* Filter Bar */}
    <div className="flex items-center justify-between px-6 py-2 gap-4">

      {/* Title */}
      <div className="flex-shrink-0">
        <h2 className="text-red-600 font-bold text-[18px] uppercase">
          Customer Ledger
        </h2>
      </div>

      {/* Date Section */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-36"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-36"
          />
        </div>
      </div>

      {/* 🔥 SEARCH SECTION */}
      <div className="relative flex-1 max-w-md">

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold whitespace-nowrap">
            Customer Name *
          </label>

          <input
            className="border rounded w-full px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="Search party..."
            value={selectedParty ? selectedParty.printName : searchText}
            onChange={(e) => {
              setSelectedParty(null);
              setSearchText(e.target.value);
              setShowDropdown(true); // 🔥 important
            }}
          />
        </div>

        {/* 🔥 DROPDOWN */}
        {showDropdown && partyList.length > 0 && (
          <div className="absolute left-[140px] right-0 top-full mt-1 bg-white border border-gray-300 max-h-52 overflow-y-auto z-[9999] shadow-lg rounded-md">
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

      {/* Button */}
      <div className="flex-shrink-0">
        <button
          onClick={fetchLedger}
          className="bg-[#005a9c] hover:bg-blue-800 text-white px-8 py-2 rounded text-sm font-bold shadow-sm"
        >
          View
        </button>
      </div>

    </div>
  </div>
</div>

        {/* TABLE */}
        <div className="overflow-x-auto ml-[18px]">
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
