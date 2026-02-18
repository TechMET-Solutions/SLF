import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";

const Accounts_Opening_Balance = () => {

  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/account-code/accounts/opening-balance`);
      setBalances(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Change (Only Update State)
  const handleInputChange = (id, newValue) => {
    setBalances((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, opening_balance: newValue } : row
      )
    );
  };

  // 🔹 Auto Update API (on blur)
  const updateOpeningBalance = async (id, opening_balance) => {
    try {
      await axios.put(
        `${API}/account-code/accounts/opening-balance/${id}`,
        { opening_balance }
      );
    } catch (err) {
      console.error(err);
      alert("Error updating balance");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen font-sans">
      <div className="bg-teal-700 text-white p-2 text-sm font-bold mb-4">
        Opening Account Balance
      </div>

      <div className="bg-white border border-teal-600 rounded-sm shadow-sm">
        <div className="p-2 border-b border-gray-300 bg-gray-50 text-xs text-teal-800 font-semibold">
          Opening Account Balance
        </div>

        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-2 border-r w-12">ID</th>
                  <th className="p-2 border-r w-1/4">Account Group</th>
                  <th className="p-2 border-r w-1/3">Name</th>
                  <th className="p-2">Opening Balance</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50">
                    <td className="p-2 border-r text-gray-500">
                      {row.id}
                    </td>

                    <td className="p-2 border-r">
                      {row.accountGroup}
                    </td>

                    <td className="p-2 border-r">
                      {row.name}
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        value={row.opening_balance}
                        onChange={(e) =>
                          handleInputChange(row.id, e.target.value)
                        }
                        onBlur={() =>
                          updateOpeningBalance(row.id, row.opening_balance)
                        }
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-right"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts_Opening_Balance;
