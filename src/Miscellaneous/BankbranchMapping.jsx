import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const BankbranchMapping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const branchInfo = location.state?.branch || {};
  console.log(branchInfo, "branchInfo");
  const [selectedBanks, setSelectedBanks] = useState([]);

  // Mock Bank List from image
  const [bankList, setBankList] = useState([]);
  const toggleBank = (bank) => {
    setSelectedBanks((prev) =>
      prev.includes(bank) ? prev.filter((b) => b !== bank) : [...prev, bank],
    );
  };

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API}/api/banks/list`);
      setBankList(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const saveMapping = async () => {
    try {
      await axios.post(`${API}/api/banks/assign-banks`, {
        branchId: branchInfo.id,
        banks: selectedBanks,
      });

      alert("Banks mapped successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchMappedBanks = async () => {
    try {
      const res = await axios.get(
        `${API}/api/banks/branch-banks/${branchInfo.id}`,
      );

      setSelectedBanks(res.data.banks); // [1,3,5]
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBanks();
    fetchMappedBanks();
  }, []);
  return (
    <div className="m-2 border border-[#008080] bg-white shadow-sm font-sans">
      <div className="bg-[#008080] text-white px-4 py-1.5 text-sm font-semibold">
        Branch Bank Mapping
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Branch Info (Read Only) */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] text-gray-600 mb-1">
              Branch Code
            </label>
            <input
              type="text"
              readOnly
              value={branchInfo.branch_code || ""}
              className="w-full border border-gray-300 bg-gray-100 p-1.5 text-xs outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-600 mb-1">
              Branch Name
            </label>
            <input
              type="text"
              readOnly
              value={branchInfo.branch_name || ""}
              className="w-full border border-gray-300 bg-gray-100 p-1.5 text-xs outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-600 mb-1">
              Branch Address 1
            </label>
            <input
              type="text"
              readOnly
              value={branchInfo.address_line1 || ""}
              className="w-full border border-gray-300 bg-gray-100 p-1.5 text-xs outline-none"
            />
          </div>
          {/* <div>
            <label className="block text-[11px] text-gray-600 mb-1">
              Branch Address 2
            </label>
            <input
              type="text"
              readOnly
              value={branchInfo.address2 || ""}
              className="w-full border border-gray-300 bg-gray-100 p-1.5 text-xs outline-none"
            />
          </div> */}
        </div>

        {/* Right Side: Bank Selection */}
        <div className="flex flex-col">
          <label className="text-[11px] text-gray-600 mb-1 font-semibold uppercase">
            Bank
          </label>
          <div className="border border-gray-300 h-64 overflow-y-auto p-2 bg-white scrollbar-thin scrollbar-thumb-gray-400">
            {bankList?.map((bank) => (
              <label
                key={bank.id}
                className="flex items-center gap-2 py-1 px-1 hover:bg-gray-50 cursor-pointer text-xs"
              >
                <input
                  type="checkbox"
                  checked={selectedBanks.includes(bank.id)}
                  onChange={() => toggleBank(bank.id)}
                />

                {/* ✅ print only string */}
                <span className="text-gray-700">{bank.bank_name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons Footer */}
      <div className="p-4 border-t border-gray-100 flex gap-1">
        <button
          className="bg-[#1a5d9b] text-white px-6 py-1.5 text-xs font-semibold flex items-center gap-2 hover:bg-blue-800"
          onClick={saveMapping}
        >
          <span>💾</span> Save
        </button>
        <button
          className="bg-[#1a5d9b] text-white px-6 py-1.5 text-xs font-semibold flex items-center gap-2 hover:bg-blue-800"
          onClick={() => navigate(-1)}
        >
          <span>✖</span> Exit
        </button>
      </div>

      
    </div>
  );
};

export default BankbranchMapping;
