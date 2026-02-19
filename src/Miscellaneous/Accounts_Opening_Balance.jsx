import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

const Accounts_Opening_Balance = () => {

  const navigate = useNavigate();

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
      

      <div className="flex justify-center mb-2">
        <div className="flex justify-center mt-5">
          <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
            {/* Left Side: Title */}
            <h2 className="text-red-600 font-bold text-[20px] leading-[148%] whitespace-nowrap">
              Opening Account Balance
            </h2>

            <div className="flex items-center gap-3  pl-6 border-gray-200">
              <button
                onClick={() => navigate("/")}
                className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px] font-medium transition-colors hover:bg-[#a40f1a]"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start ml-30">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
            <div className="overflow-x-auto mt-2 max-w-3xl h-[500px]">
              <table className="w-full border-collapse text-[12px]">
                <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                    <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[50px]">ID</th>
                    <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[130px]">Account Group</th>
                    <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[150px]">Name</th>
                    <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[150px]">Opening Balance</th>
                </tr>
              </thead>
              <tbody>
                  {balances.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <td className="px-4 py-2 text-center">
                      {row.id}
                    </td>

                    <td className="px-4 py-2 text-left">
                      {row.accountGroup}
                    </td>

                    <td className="px-4 py-2 text-left">
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
