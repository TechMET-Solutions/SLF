// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchBranchesApi } from "../API/Master/Master_Profile/Branch_Details";

// const BranchSchemeMappingList = () => {
//   const navigate = useNavigate();
//   const [branches, setBranches] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const limit = 10;

//   useEffect(() => {
//     document.title = "SLF | Branch Scheme Mapping List";
//     fetchBranches(page);
//   }, [page]);

//   const fetchBranches = async (pageNum) => {
//     const result = await fetchBranchesApi(pageNum, limit);
//     if (result) {
//       setBranches(result.branches);
//       setTotal(result.total);
//     }
//   };

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div className="min-h-screen w-full">
//       {/* Topbar */}
//       <div className="flex justify-center sticky top-[80px] z-40">
//         <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
//           <h2 className="text-red-600 font-bold text-[20px]">
//             Branch Scheme Mapping List (User List)
//           </h2>
//           <button
//           onClick={() => navigate("/")}
//           className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
//             Exit
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="flex pl-[115px]">
//         <div className="overflow-x-auto mt-5  h-[500px]">
//           <table className="w-full border-collapse">
//             <thead className="bg-[#0A2478] text-white text-sm">
//               <tr>
//                 {/* <th className="px-4 py-2 text-left border-r text-[13px]">Branch Id</th> */}
//                 <th className="px-4 py-2 text-left border-r text-[13px]"> Branch Code</th>
//                 <th className="px-4 py-2 text-left border-r text-[13px]">Name</th>

//                 <th className="px-4 py-2 text-left border-r text-[13px] w-[350px]">Address</th>

//                 <th className="px-4 py-2 text-left text-[13px]">Scheme Mapping</th>
//               </tr>
//             </thead>
//             <tbody className="text-[12px]">
//               {branches.map((row, index) => (
//                 <tr
//                   key={row.id}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   {/* <td className="px-4 py-2">{row.id}</td> */}
//                   <td className="px-4 py-2">{row.branch_code}</td>
//                   <td className="px-4 py-2">{row.branch_name}</td>

//                   <td className="px-4 py-2">{row.address_line1}, {row.address_line3}</td>

//                   <td
//                     className="px-4 py-2 text-blue-600 font-medium cursor-pointer"
//                     onClick={() => navigate("/Scheme-Role-Mapping", { state: row })}
//                   >
//                     Map
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-3 py-1 border rounded-md disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span className="px-3 py-1 border rounded-md bg-[#0b2c69] text-white">
//           {page}
//         </span>
//         <span>/ {totalPages}</span>

//         <button
//           disabled={page >= totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-3 py-1 border rounded-md disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BranchSchemeMappingList;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBranchesApi } from "../API/Master/Master_Profile/Branch_Details";
import { API } from "../api";
import { encryptData } from "../utils/cryptoHelper";

const BranchSchemeMappingList = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // --- Modal & Mapping States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [allSchemes, setAllSchemes] = useState([]);
  const [selectedSchemeIds, setSelectedSchemeIds] = useState([]);
  const [loadingSchemes, setLoadingSchemes] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    document.title = "SLF | Branch Scheme Mapping List";
    fetchBranches(page);
  }, [page]);

  const fetchBranches = async (pageNum) => {
    const result = await fetchBranchesApi(pageNum, limit);
    if (result) {
      setBranches(result.branches);
      setTotal(result.total);
    }
  };

  // --- Modal Logic ---
  const openMappingModal = async (branch) => {
    setSelectedBranch(branch);
    setIsModalOpen(true);
    setLoadingSchemes(true);

    try {
      // 1. Fetch all available schemes
      const response = await axios.get(`${API}/Scheme/getAllSchemes`);
      const schemes = response.data.items || [];
      setAllSchemes(schemes);

      // 2. Handle "Already Checked" logic
      // Assuming branch.schemes contains the mapped schemes for this branch
      if (branch.schemes) {
        const parsedMapped =
          typeof branch.schemes === "string"
            ? JSON.parse(branch.schemes)
            : branch.schemes;

        const mappedIds = parsedMapped.map((s) => s.id);
        setSelectedSchemeIds(mappedIds);
      } else {
        setSelectedSchemeIds([]);
      }
    } catch (error) {
      console.error("Error loading schemes:", error);
    } finally {
      setLoadingSchemes(false);
    }
  };

  const toggleScheme = (id) => {
    setSelectedSchemeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSaveMapping = async () => {
    try {
      const payload = {
        branchId: selectedBranch.id,
        schemes: allSchemes
          .filter((s) => selectedSchemeIds.includes(s.id))
          .map((s) => ({ id: s.id, schemeName: s.schemeName })),
      };

      const encryptedData = encryptData(JSON.stringify(payload));
      await axios.post(`${API}/Master/Master_Profile/updateBranchSchemes`, {
        data: encryptedData,
      });

      alert("Mapping updated successfully!");
      setIsModalOpen(false);
      fetchBranches(page); // Refresh list to show updated mappings
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to update mapping");
    }
  };

  const totalPages = Math.ceil(total / limit);
const filteredSchemes = allSchemes.filter((scheme) =>
  scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="min-h-screen w-full relative">
      {/* Topbar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2 className="text-red-600 font-bold text-[20px]">
            Branch Scheme Mapping List
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-white px-4 py-1 rounded bg-[#C1121F] text-[12px]"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className=" border-collapse shadow-sm">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r w-[100px]">Branch Code</th>
                <th className="px-4 py-2 text-left border-r w-[250px]">Name</th>
                <th className="px-4 py-2 text-left border-r w-[350px]">
                  Address
                </th>
                <th className="px-4 py-2 text-left w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {branches.map((row, index) => (
                <tr
                  key={row.id}
                  className={
                    index % 2 === 0 ? "bg-gray-50" : "bg-white border-b"
                  }
                >
                  <td className="px-4 py-2">{row.branch_code}</td>
                  <td className="px-4 py-2">{row.branch_name}</td>
                  <td className="px-4 py-2">
                    {row.address_line1}, {row.address_line3}
                  </td>
                  <td
                    className="px-4 py-2 text-blue-600 font-medium cursor-pointer hover:underline"
                    onClick={() => openMappingModal(row)}
                  >
                    Map
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (Existing Logic) */}
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1 border rounded bg-[#0b2c69] text-white">
          {page}
        </span>
        <span>/ {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* --- MAPPING MODAL --- */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-[500px] flex flex-col max-h-[80vh]">
            <div className="p-4 border-b flex justify-between items-center bg-[#0A2478] text-white rounded-t-lg">
              <h3 className="font-bold">Map Schemes for {selectedBranch?.branch_name}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-xl">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {loadingSchemes ? (
                <p className="text-center text-gray-500">Loading Schemes...</p>
              ) : (
                <div className="space-y-2">
                  {allSchemes.map(scheme => (
                    <label key={scheme.id} className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        className="w-5 h-5 mr-3 accent-[#0A2478]"
                        checked={selectedSchemeIds.includes(scheme.id)}
                        onChange={() => toggleScheme(scheme.id)}
                      />
                      <span className="text-sm font-medium text-gray-700">{scheme.schemeName}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-lg">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveMapping}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#0A2478] rounded-md hover:bg-blue-900"
              >
                Update Mapping
              </button>
            </div>
          </div>
        </div>
      )} */}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-[550px] flex flex-col max-h-[85vh] border border-white/20 animate-in fade-in zoom-in duration-200 p-2">
            {/* Header */}
            <div className='p-2'>
 <h2
                  className="text-[#0A2478] mb-4"
                  style={{
                    fontFamily: "Source Sans 3, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                  }}
                >
                Branch Mapping for {selectedBranch?.branch_name}
                </h2>

              </div>
           
            {/* Search & Select All Bar */}
           <div className="px-6 py-3  ">
  <input 
    type="text"
    placeholder="Search schemes..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#0A2478]/20 focus:border-[#0A2478]"
  />
</div>

{/* Body */}
<div className="p-6 overflow-y-auto flex-1 max-h-[400px]">
  {loadingSchemes ? (
    <p className="text-center text-gray-500">Loading Schemes...</p>
  ) : filteredSchemes.length > 0 ? (
    <div className="flex flex-wrap gap-3">
      {filteredSchemes.map((scheme) => {
        const isChecked = selectedSchemeIds.includes(scheme.id);
        return (
          <label
            key={scheme.id}
            className={`flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 w-[200px] `}
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 mr-3 accent-[#0A2478] cursor-pointer"
                checked={isChecked}
                onChange={() => toggleScheme(scheme.id)}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 truncate">
              {scheme.schemeName}
            </span>
          </label>
        );
      })}
    </div>
  ) : (
    /* IF NO RECORDS MATCH */
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-gray-400 font-medium">No schemes match your search.</p>
      <button 
        onClick={() => setSearchTerm("")}
        className="text-[#0A2478] text-xs underline mt-2"
      >
        Clear Search
      </button>
    </div>
  )}
</div>

          

            {/* Footer */}
            <div className="p-4  flex justify-center items-center gap-3 bg-white rounded-b-xl">
              
              <button
                onClick={() => setIsModalOpen(false)}

                style={{
                    backgroundColor: "#C1121F",
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",

                    opacity: 1,
                  }}
                className=" text-sm font-bold text-white transition-colors"
              >
                Exit
              </button>
              <button
                onClick={handleSaveMapping}
                  style={{
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",

                    opacity: 1,
                }}
                className="bg-[#0A2478] text-white"
              >
                Save 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchSchemeMappingList;
