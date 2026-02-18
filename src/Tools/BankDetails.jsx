import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Landmark,
  Trash2,
  X,
  Save,
} from "lucide-react";
import { API } from "../api";

// const API = "http://localhost:5000/api/banks"; // 🔁 change to your server URL

const BankDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankName, setBankName] = useState("");
  const [banks, setBanks] = useState([]);

  // ✅ Fetch banks on load
  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API}/api/banks/list`);
      setBanks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Save Bank
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/banks/create`, { bankName });
      setBankName("");
      setIsModalOpen(false);
      fetchBanks();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Bank
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/banks/delete/${id}`);
      fetchBanks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans relative">
      {/* Header */}
      <div className="m-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 flex items-center gap-3 border-b border-gray-100">
          <h2 className="text-red-600 font-bold text-lg mr-4 uppercase">
            Bank Master
          </h2>

          <div className="flex-1"></div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#002d72] text-white px-6 py-1.5 rounded text-sm font-semibold flex items-center gap-2"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-[#002d72] text-white font-semibold">
              <tr>
                <th className="px-4 py-3 text-center w-16">Sr No</th>
                <th className="px-4 py-3">Bank Name</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {banks.map((bank, index) => (
                <tr key={bank.id} className="hover:bg-blue-50">
                  <td className="px-4 py-3 text-center font-bold">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 uppercase font-medium">
                    {bank.bank_name}
                  </td>

                  <td className="px-4 py-3 text-center text-green-600 font-bold">
                    {bank.status}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(bank.id)}
                      className="p-1.5 bg-gray-200 rounded hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl">
            <div className="bg-[#002d72] p-4 text-white flex justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Landmark size={18} /> Add New Bank
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              <label className="block text-xs font-bold mb-2">
                Bank Name *
              </label>

              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                required
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#002d72] text-white rounded flex items-center gap-2"
                >
                  <Save size={16} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDetails;
