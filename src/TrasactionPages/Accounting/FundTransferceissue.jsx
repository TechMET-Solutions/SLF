import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const FundTransferList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [payMode, setPayMode] = useState("");
  useEffect(() => {
    fetchFundTransfers();
  }, []);

  const fetchFundTransfers = async () => {
    try {
      const res = await axios.get(`${API}/FundTransfer/FundTransfer/list`);
      setList(res.data.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  // Exact system colors from screenshots
  const navyBlue = "bg-[#0D3082]";
  const tealHeader = "bg-[#008b8b]";

  // Compact input style for the search bar
  const inputClass =
    "border border-gray-300 rounded-sm px-1 py-0.5 text-[11px] outline-none focus:border-blue-500 w-[140px] h-[22px]";
  const labelClass = "text-[11px] font-bold text-gray-700";
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`${API}/FundTransfer/FundTransfer/delete/${id}`);

      alert("Deleted Successfully ✅");
      fetchFundTransfers(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 ">
      <div className="p-5 w-[1500px]">
        {/* 2. List Header with +Add Button */}
        <div
          className={`${tealHeader} text-white px-3 py-1 text-[12px] font-bold flex justify-between items-center rounded-t-sm`}
        >
          <span>Fund Transfer List</span>
          <button
            onClick={() => navigate("/FundTransfer/create")}
            className={`${navyBlue} hover:bg-blue-900 px-2 py-0.5 rounded-sm text-[10px] flex items-center gap-1 border border-white/20`}
          >
            <Plus size={12} /> Add
          </button>
        </div>

        {/* 3. Search Bar Area */}
        <div className="p-2 border-x border-b border-gray-200 flex items-center gap-4 bg-white mb-1">
          <div className="flex items-center gap-2">
            <label className={labelClass}>
              Pay Mode <span className="text-red-500">*</span>
            </label>

            <select
              className={inputClass}
              value={payMode}
              onChange={(e) => setPayMode(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="Cash">Cash</option>
              <option value="NetBanking">Net Banking</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className={labelClass}>
              Account <span className="text-red-500">*</span>
            </label>
            <select className={inputClass}>
              <option>--Select All--</option>
            </select>
          </div>
          <button
            className={`${navyBlue} text-white px-4 py-0.5 rounded-sm text-[11px] font-bold flex items-center gap-1`}
          >
            <Search size={12} /> Search
          </button>
        </div>

        {/* 4. Data Grid */}
        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-[10px] font-bold border-b border-gray-300">
                <th className="p-1.5 border-r border-gray-300">Doc No</th>
                <th className="p-1.5 border-r border-gray-300">Doc Date</th>
                <th className="p-1.5 border-r border-gray-300">Paymode</th>
                <th className="p-1.5 border-r border-gray-300">Branch Name</th>
                {/* <th className="p-1.5 border-r border-gray-300">
                  Account Ledger Name
                </th> */}
                <th className="p-1.5 border-r border-gray-300">Amount</th>
                <th className="p-1.5 border-r border-gray-300">MOP</th>
                <th className="p-1.5 border-r border-gray-300">Add By</th>
                <th className="p-1.5 border-r border-gray-300">Add On</th>
                <th className="p-1.5 border-r border-gray-300">
                  Receipt Status
                </th>
                <th className="p-1.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-[11px] divide-y divide-gray-200">
              {list.map((item, i) =>
                item.transfer_details.map((td, index) => (
                  <tr key={`${i}-${index}`} className="hover:bg-blue-50/50">
                    <td className="p-1.5 border-r text-blue-800">{item.id}</td>

                    <td className="p-1.5 border-r">
                      {new Date(item.doc_date).toLocaleDateString("en-GB")}
                    </td>

                    <td className="p-1.5 border-r">{item.pay_mode}</td>

                    <td className="p-1.5 border-r">{td.toBranch}</td>

                    {/* <td className="p-1.5 border-r font-medium">
                      {item.account}
                    </td> */}

                    <td className="p-1.5 border-r font-bold">
                      {td.amount || "-"}
                    </td>

                    <td className="p-1.5 border-r">{item.pay_mode}</td>

                    <td className="p-1.5 border-r text-gray-500">Admin</td>

                    <td className="p-1.5 border-r">
                      {item.created_at?.split("T")[0]}
                    </td>

                    <td className="p-1.5 border-r text-green-700 font-bold">
                      Received
                    </td>

                    <td className="p-1.5 text-center whitespace-nowrap">
                      <span
                        className="text-blue-600 cursor-pointer font-bold mr-2"
                        onClick={() =>
                          navigate("/FundTransfer/create", {
                            state: {
                              fundData: {
                                ...item,
                                transferDetails: item.transfer_details,
                              },
                            },
                          })
                        }
                      >
                        View
                      </span>

                      <span
                        className="text-red-600 cursor-pointer font-bold"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {/* <div className={`${navyBlue} text-white text-[10px] text-center py-1.5 mt-2 rounded-sm uppercase`}>
          © Copyright Maraekat Infotech Ltd, 2015. All rights reserved.
        </div> */}
      </div>
    </div>
  );
};

export default FundTransferList;
