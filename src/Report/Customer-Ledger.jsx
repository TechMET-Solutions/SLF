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
      <div className="bg-white border border-teal-700">
        {/* HEADER */}
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-bold">
          Party Ledger
        </div>

        {/* FILTER */}
        <div className="p-4 space-y-4 border-b">
          {/* DATES */}
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

          {/* PARTY SEARCH */}
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

          {/* BUTTON */}
          <button
            onClick={fetchLedger}
            className="bg-blue-700 text-white px-10 py-1 rounded"
          >
            View
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-1">Date</th>
              <th className="border p-1">Particulars</th>
              <th className="border p-1 text-right">Deposit</th>
              <th className="border p-1 text-right">Withdrawal</th>
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
  );
};

export default CustomerLedger;
