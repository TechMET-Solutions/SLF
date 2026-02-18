// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Bank_Branch_Mapping = () => {
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [branchData, setBranchData] = useState([]);

//   const navigate = useNavigate();

//   const handleBankClick = (branch) => {
//     navigate("/BankBranchMapping", { state: { branch } });
//   };

//   // ✅ Correct fetch function
//   const fetchBranches = async (pageNo = page, pageSize = limit) => {
//     try {
//       const res = await axios.get(
//         `https://slunawat.co.in/Master/Master_Profile/get_Branches?page=${pageNo}&limit=${pageSize}&search=`
//       );

//       const data = res.data;

//       console.log(data)

//       if (data) {
//         setBranchData(data.branches || []);
//         setPage(data.page || 1);
//         setLimit(data.limit || 10);
//         setTotal(data.total || 0);
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   // ✅ Only ONE correct useEffect
//   useEffect(() => {
//     fetchBranches(page, limit);
//   }, [page, limit]);

//   const totalPages = Math.ceil(total / limit);



//   return (
    // <div className="bg-white shadow-sm font-sans">
    //   {/* Title Bar */}
    //   <div className="flex justify-center mb-2">
    //     <div className="flex justify-center mt-5">
    //       <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
    //         {/* Left Side: Title */}
    //         <h2 className="text-red-600 font-bold text-[20px] leading-[148%] whitespace-nowrap">
    //           Branch List
    //         </h2>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex justify-start ml-30">
    //     {/* Table Section */}
    //     <div className="overflow-x-auto mt-2 max-w-3xl h-[500px]">
    //       <table className="w-full border-collapse text-[12px]">
    //         <thead className="bg-[#0A2478] text-white text-sm">
    //           <tr>
    //             <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[100px]">
    //               Branch Id
    //             </th>
    //             <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[80px]">
    //               Code
    //             </th>
    //             <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[180px]">
    //               Name
    //             </th>
    //             <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[280px]">
    //               Address 1
    //             </th>
    //             <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[280px]">
    //               Address 2
    //             </th>
    //             <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[180px]">
    //               Branch Mapping
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {branchData.map((branch, index) => (
    //             <tr
    //               key={branch.id}
    //               className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
    //             >
    //               {/* Branch Id */}
    //               <td className="px-4 py-2 text-center">{branch.id}</td>

    //               {/* Code */}
    //               <td className="px-4 py-2 text-center">
    //                 {branch.branch_code}
    //               </td>

    //               {/* Name */}
    //               <td className="px-4 py-2 text-center">
    //                 {branch.branch_name}
    //               </td>

    //               {/* Address 1 */}
    //               <td className="px-4 py-2 text-left text-gray-600">
    //                 {branch.address_line1}
    //               </td>

    //               {/* Address 2 (we don’t have, so show print_name / lead_person nicely) */}
    //               <td className="px-4 py-2 text-left text-gray-600">
    //                 <div>{branch.print_name}</div>
    //                 <div className="text-[11px] text-gray-400">
    //                   {branch.lead_person}
    //                 </div>
    //               </td>

    //               {/* Branch Mapping */}
    //               <td className="p-2 text-center">
    //                 <button
    //                   onClick={() => handleBankClick(branch)}
    //                   className="text-blue-600 hover:underline font-bold"
    //                 >
    //                   Bank
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
//     </div>
//   );
// };

// export default Bank_Branch_Mapping;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api"; // Ensure this path is correct

const Bank_Branch_Mapping = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [branchData, setBranchData] = useState([]);

  // Modal & Selection States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);

  // ✅ Fetch Branches for Table
  const fetchBranches = async (pageNo = page, pageSize = limit) => {
    try {
      const res = await axios.get(
        `https://slunawat.co.in/Master/Master_Profile/get_Branches?page=${pageNo}&limit=${pageSize}&search=`
      );
      if (res.data) {
        setBranchData(res.data.branches || []);
        setTotal(res.data.total || 0);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // ✅ Fetch All Available Banks (for the checklist)
  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API}/api/banks/list`);
      setBankList(res.data);
    } catch (err) {
      console.error("Error fetching bank list:", err);
    }
  };

  // ✅ Fetch Banks already mapped to the specific branch
  const fetchMappedBanks = async (branchId) => {
    setLoadingBanks(true);
    try {
      const res = await axios.get(`${API}/api/banks/branch-banks/${branchId}`);
      setSelectedBanks(res.data.banks || []); // Expected [1, 3, 5]
    } catch (err) {
      console.error("Error fetching mapped banks:", err);
      setSelectedBanks([]);
    } finally {
      setLoadingBanks(false);
    }
  };

  useEffect(() => {
    fetchBranches(page, limit);
    fetchBanks();
  }, [page, limit]);

  // ✅ Handle Open Modal
  const handleBankClick = (branch) => {
    setSelectedBranch(branch);
    fetchMappedBanks(branch.id);
    setIsModalOpen(true);
  };

  const toggleBank = (bankId) => {
    setSelectedBanks((prev) =>
      prev.includes(bankId) ? prev.filter((id) => id !== bankId) : [...prev, bankId]
    );
  };

  const handleSaveMapping = async () => {
    try {
      await axios.post(`${API}/api/banks/assign-banks`, {
        branchId: selectedBranch.id,
        banks: selectedBanks,
      });
      alert("Banks mapped successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save Error:", err);
      alert("Failed to save mapping");
    }
  };

  return (


    <div className="bg-white shadow-sm font-sans">
      {/* Title Bar */}
      <div className="flex justify-center mb-2">
        <div className="flex justify-center mt-5">
          <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
            {/* Left Side: Title */}
            <h2 className="text-red-600 font-bold text-[20px] leading-[148%] whitespace-nowrap">
              Branch List
            </h2>
          </div>
        </div>
      </div>

      <div className="flex justify-start ml-30">
        {/* Table Section */}
        <div className="overflow-x-auto mt-2 max-w-3xl h-[500px]">
          <table className="w-full border-collapse text-[12px]">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[100px]">
                  Branch Id
                </th>
                <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[80px]">
                  Code
                </th>
                <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[180px]">
                  Name
                </th>
                <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[280px]">
                  Address 1
                </th>
                <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[280px]">
                  Address 2
                </th>
                <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[180px]">
                  Branch Mapping
                </th>
              </tr>
            </thead>
            <tbody>
              {branchData.map((branch, index) => (
                <tr
                  key={branch.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  {/* Branch Id */}
                  <td className="px-4 py-2 text-center">{branch.id}</td>

                  {/* Code */}
                  <td className="px-4 py-2 text-center">
                    {branch.branch_code}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2 text-center">
                    {branch.branch_name}
                  </td>

                  {/* Address 1 */}
                  <td className="px-4 py-2 text-left text-gray-600">
                    {branch.address_line1}
                  </td>

                  {/* Address 2 (we don’t have, so show print_name / lead_person nicely) */}
                  <td className="px-4 py-2 text-left text-gray-600">
                    <div>{branch.print_name}</div>
                    <div className="text-[11px] text-gray-400">
                      {branch.lead_person}
                    </div>
                  </td>

                  {/* Branch Mapping */}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleBankClick(branch)}
                      className="text-blue-600 hover:underline font-bold"
                    >
                      Bank
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrated Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-6">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-xl overflow-hidden">

            {/* Modal Header */}
            <div className="text-[#0A2478] px-6 py-3 text-lg font-semibold ">
              Branch Bank Mapping - {selectedBranch?.branch_name}
            </div>

            <div className="px-6 space-y-6">

              {/* 🔹 Branch Info — One Line */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Branch Code */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Branch Code
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedBranch?.branch_code || ""}
                    className="w-full h-9 px-3 rounded border border-gray-300 bg-gray-100 text-xs outline-none"
                  />
                </div>

                {/* Branch Name */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedBranch?.branch_name || ""}
                    className="w-full h-9 px-3 rounded border border-gray-300 bg-gray-100 text-xs outline-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Address
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedBranch?.address_line1 || ""}
                    className="w-full h-9 px-3 rounded border border-gray-300 bg-gray-100 text-xs outline-none"
                  />
                </div>
              </div>

              {/* 🔹 Select Banks — Bottom */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider block">
                  Select Banks
                </label>

                {/* <div className="border border-gray-300 rounded-lg h-56 overflow-y-auto bg-gray-50 p-2">
                  {loadingBanks ? (
                    <div className="flex items-center justify-center h-full text-xs text-gray-500">
                      Loading...
                    </div>
                  ) : (
                    bankList?.map((bank) => (
                      <label
                        key={bank.id}
                        className="flex items-center gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors border-b border-gray-200 last:border-0"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#0A2478]"
                          checked={selectedBanks.includes(bank.id)}
                          onChange={() => toggleBank(bank.id)}
                        />
                        <span className="text-xs text-gray-700 font-medium">
                          {bank.bank_name}
                        </span>
                      </label>
                    ))
                  )}
                </div> */}

                <div className="border border-gray-300 rounded-lg max-h-56 overflow-y-auto bg-gray-50 p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {bankList?.map((bank) => (
                      <label
                        key={bank.id}
                        className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors border border-gray-200"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#0A2478]"
                          checked={selectedBanks.includes(bank.id)}
                          onChange={() => toggleBank(bank.id)}
                        />

                        <span className="text-xs text-gray-700 font-medium truncate">
                          {bank.bank_name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* 🔹 Action Buttons */}
              <div className="flex justify-center gap-4 pb-6">
                <button
                  className="h-10 px-10 rounded-lg bg-[#0A2478] text-white text-sm font-medium hover:bg-[#1a3c89] transition-all"
                  onClick={handleSaveMapping}
                >
                  Save Mapping
                </button>

                <button
                  className="h-10 px-10 rounded-lg bg-[#C1121F] text-white text-sm font-medium hover:bg-[#d12330] transition-all"
                  onClick={() => setIsModalOpen(false)}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Bank_Branch_Mapping;