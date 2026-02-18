import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Customer_list = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [riskCategory, setRiskCategory] = useState("Low"); // default value
  const [partyType, setPartyType] = useState("Individual"); // default value\
  const [isBadDebtor, setIsBadDebtor] = useState(false);
  const [isBlackList, setIsBlackList] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    state: "Maharashtra",
    city: "Nashik",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);

      if (res.data.success) {
        setBranches(res.data.data);

        // ✅ Auto select first branch (optional)
        if (res.data.data.length > 0) {
          setSelectedBranches([res.data.data[0].id]);
        }
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleBranchChange = (branchId) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId],
    );
  };

  const handleView = async () => {
    try {
      setLoading(true);

      const payload = {
        partyType,
        riskCategory,
        badDebtors: isBadDebtor,
        blackList: isBlackList,
        state: formData.state,
        city: formData.city,
        branchIds: selectedBranches,
      };

      const res = await axios.post(
        `${API}/Master/doc/Customer_List`, // 🔁 change to your actual endpoint
        payload,
      );

      if (res.data.success) {
        setCustomers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        {/* Title Bar matching image_4da1dc.jpg */}
        <div className="bg-[#1a8a81] text-white px-3 py-1 font-semibold text-sm">
          Customer List
        </div>

        {/* Filter Section */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex gap-8">
            {/* Left Column Filters */}
            <div className="flex-1 space-y-4 max-w-2xl">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Party Type */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[80px] text-gray-600">
                    Party Type
                  </label>

                  <select
                    value={partyType}
                    onChange={(e) => setPartyType(e.target.value)}
                    className="flex-1 border border-gray-300 px-2 py-0.5 outline-none focus:border-blue-500"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                {/* Risk Category */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[80px] text-gray-600">
                    Risk Category
                  </label>

                  <select
                    value={riskCategory}
                    onChange={(e) => setRiskCategory(e.target.value)}
                    className="flex-1 border border-gray-300 px-2 py-0.5 outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                {/* Checkboxes */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[80px] text-gray-600">
                    Bad Debtors
                  </label>
                  <input
                    type="checkbox"
                    checked={isBadDebtor}
                    onChange={() => setIsBadDebtor(!isBadDebtor)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="min-w-[80px] text-gray-600">
                    Black List
                  </label>
                  <input
                    type="checkbox"
                    checked={isBlackList}
                    onChange={() => setIsBlackList(!isBlackList)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>
                {/* Location Filters */}
                <div className="flex items-center gap-2">
                  <label className="min-w-[80px] text-gray-600">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 px-2 py-0.5 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="min-w-[80px] text-gray-600">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 px-2 py-0.5 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Branch Multi-Select matching image_4da1dc.jpg */}
            <div className="flex gap-2">
              <label className="text-gray-600">Branch</label>

              <div className="border border-gray-300 w-64 h-32 overflow-y-auto p-2 space-y-1 bg-white">
                {branches.map((branch) => (
                  <div key={branch.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBranches.includes(branch.id)}
                      onChange={() => handleBranchChange(branch.id)}
                      className="accent-blue-600"
                    />
                    <span>
                      {branch.branch_name} ({branch.branch_code})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center mt-6 pt-2 border-t border-gray-100">
            <div className="flex gap-0.5">
              <button
                className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-blue-700 shadow-sm rounded-sm font-semibold"
                onClick={handleView}
              >
                💾 View
              </button>
              <button className="bg-[#005a9c] text-white px-10 py-1 flex items-center gap-2 border border-blue-800 hover:bg-red-700 shadow-sm rounded-sm font-semibold">
                ✖ Exit
              </button>
            </div>

            <div className="flex gap-1">
              <button
                title="Print"
                className="p-1 px-2 border border-[#005a9c] bg-[#005a9c] text-white rounded hover:opacity-90"
              >
                🖨️
              </button>
              <button
                title="Excel"
                className="p-1 px-2 border border-[#005a9c] bg-[#005a9c] text-white rounded hover:opacity-90"
              >
                📊
              </button>
            </div>
          </div>
        </div>

        {/* 3. Result Table Header Placeholder */}
        {/* <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[10px]">
            <thead className="bg-[#eeeae3] text-gray-700 font-bold border-b border-gray-300">
              <tr>
                {[
                  "SNo",
                  "Type",
                  "Customer Id",
                  "Name",
                  "Father Name",
                  "Address",
                  "City",
                  "State",
                  "Pincode",
                  "Mobile No",
                  "Status",
                  "BadDebtors",
                  "BlackListed",
                  "Branch",
                  "Add Doc",
                  "Id Doc",
                ].map((head, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 p-1 text-left whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <div className="h-[300px] bg-white"></div>
        </div> */}

        <div className="border border-gray-300">
          {/* Header Table */}
         

          {/* Scrollable Body */}
          <div className="h-[300px] overflow-y-auto">
            <div className="border border-gray-300 overflow-auto">
              <table className="w-full table-fixed border-collapse text-[11px]">
                {/* Header */}
                <thead className="bg-[#eeeae3] text-gray-700 font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="border p-1 w-12">SNo</th>
                    <th className="border p-1 w-24">Type</th>
                    <th className="border p-1 w-32">Customer Id</th>
                    <th className="border p-1 w-36">Name</th>
                    <th className="border p-1 w-36">Father Name</th>
                    <th className="border p-1 w-64">Address</th>
                    <th className="border p-1 w-24">City</th>
                    <th className="border p-1 w-28">State</th>
                    <th className="border p-1 w-24">Pincode</th>
                    <th className="border p-1 w-32">Mobile No</th>
                    <th className="border p-1 w-24">Status</th>
                    <th className="border p-1 w-28">BadDebtors</th>
                    <th className="border p-1 w-28">BlackListed</th>
                    <th className="border p-1 w-28">Branch</th>
                    <th className="border p-1 w-20">Add Doc</th>
                    <th className="border p-1 w-20">Id Doc</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {customers?.length > 0 ? (
                    customers.map((cust, index) => (
                      <tr key={cust.id} className="hover:bg-gray-100">
                        <td className="border p-1 text-center">{index + 1}</td>
                        <td className="border p-1 truncate">
                          {cust.partyType}
                        </td>
                        <td className="border p-1 truncate">
                          {cust.id}
                        </td>
                        <td className="border p-1 truncate">
                          {cust.firstName} {cust.lastName}
                        </td>
                        <td className="border p-1 truncate">
                          {cust.fatherFirstName}
                        </td>
                        <td className="border p-1 truncate">
                          {cust.Permanent_Address}
                        </td>
                        <td className="border p-1 truncate">
                          {cust.Permanent_City}
                        </td>
                        <td className="border p-1 truncate">
                          {cust.Permanent_State}
                        </td>
                        <td className="border p-1 text-center">
                          {cust.Permanent_Pincode}
                        </td>
                        <td className="border p-1">{cust.mobile}</td>
                        <td className="border p-1 text-center">
                          {cust.access === "Yes" ? "Active" : "Inactive"}
                        </td>
                        <td className="border p-1 text-center">
                          {cust.badDebtor ? "Yes" : "No"}
                        </td>
                        <td className="border p-1 text-center">
                          {cust.block ? "Yes" : "No"}
                        </td>
                        <td className="border p-1">{cust.branchId}</td>
                        <td className="border p-1 text-center">📎</td>
                        <td className="border p-1 text-center">🆔</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="16" className="text-center p-4">
                        No Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer_list;
