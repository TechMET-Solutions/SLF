// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// const AddMemberBranchMapping = () => {
//     useEffect(() => {
//     document.title = "SLF | Add Member Branch Mapping";
//   }, []);

//     const branches = [
//         "01 - Bhagur B1",
//         "02 - Nasikroad B2",
//         "03 - Nashik B3",
//         "999 - Head Office",
//         "V1 - Bhagur V1",
//         "V2 - Nasikroad V2",
//         "V3 - Nasikroad V3",
//         "01 - Bhagur B1",
//         "02 - Nasikroad B2",

//     ];

//     return (
//         <div className="min-h-screen w-full">
//             {/* Top bar */}
//             <div className="flex justify-center">
//                 <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//                     <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
//                         Member Branch Mapping
//                     </h2>



//                     {/* Search & Actions */}
//                     <div className="flex items-center gap-6">
//                         <div className="flex gap-3">
//                             <button
//                                 className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
//                             >
//                                 Save
//                             </button>
//                             <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
//                                 Exit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="flex flex-col gap-9 p-8">

//                 <div className="flex flex-col gap-2 w-[540px]">
//                     <label className="text-gray-700 font-medium">username</label>
//                     <input
//                         type="text"
//                         placeholder="username"
//                         className="border border-[#C4C4C4] rounded-md px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label className="text-gray-700 font-medium">Branch</label>
//                     <div className="flex flex-wrap gap-12">
//                         {branches.map((branch) => (
//                             <label
//                                 key={branch}
//                                 className="flex items-center gap-2 cursor-pointer"
//                             >
//                                 <input
//                                     type="checkbox"
//                                     className="h-4 w-4 border-gray-300 rounded"
//                                 />
//                                 <span>{branch}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>


//             </div>
//         </div>
//     );
// };

// export default AddMemberBranchMapping;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// const MemberBranchMapping = () => {
//     useEffect(() => {
//     document.title = "SLF | Member Branch Mapping";
//   }, []);
//     const [data] = useState([
//         {
//             id: 1,
//             name: "kundan",
//             mobile: "8805789654",
//             email: "ssl@slunawat.com",
//         },
//         {
//             id: 3,
//             name: "omkar",
//             mobile: "8805789654",
//             email: "ssl@slunawat.com",
//         },
//         {
//             id: 2,
//             name: "tejas",
//             mobile: "8805789654",
//             email: "ssl@slunawat.com",
//         },


//     ]);

//     return (
//         <div className="min-h-screen w-full">
//             {/* Top bar */}
//             <div className="flex justify-center">
//                 <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//                     <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
//                         Member Branch Mapping
//                     </h2>

//                     {/* Search & Actions */}
//                     <div className="flex items-center gap-6">
//                         <div className="flex gap-3">
//                             <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
//                                 Exit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="flex justify-center">
//                 <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
//                     <table className="w-full border-collapse">
//                         <thead className="bg-[#0A2478] text-white text-sm">
//                             <tr>
//                                 <th className="px-4 py-2 text-left border-r">Empl Id</th>
//                                 <th className="px-4 py-2 text-left border-r">Name</th>
//                                 <th className="px-4 py-2 text-left border-r">Email</th>
//                                 <th className="px-4 py-2 text-left border-r">Mobile</th>
//                                 <th className="px-4 py-2 text-left border-r">Branch Mapping</th>

//                             </tr>
//                         </thead>
//                         <tbody className="text-[12px]">
//                             {data.map((row, index) => (
//                                 <tr
//                                     key={row.id}
//                                     className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                                 >
//                                     <td className="px-4 py-2">{row.id}</td>
//                                     <td className="px-4 py-2">{row.name}</td>
//                                     <td className="px-4 py-2">{row.email}</td>
//                                     <td className="px-4 py-2">{row.mobile}</td>
//                                     <td className="px-4 py-2">
//                                         <Link
//                                             to="/Add-Member-Branch-Mapping"
//                                             className="text-blue-700">
//                                             Branch
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center px-6 py-3 border-t gap-2 mt-4">
//                 <button className="px-3 py-1 border rounded-md">Previous</button>
//                 <div className="flex gap-2">
//                     <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
//                     <button className="px-3 py-1 border rounded-md">2</button>
//                     <button className="px-3 py-1 border rounded-md">3</button>
//                     <span className="px-3 py-1">...</span>
//                     <button className="px-3 py-1 border rounded-md">10</button>
//                 </div>
//                 <button className="px-3 py-1 border rounded-md">Next</button>
//             </div>
//         </div>
//     );
// };

// export default MemberBranchMapping;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// const AddMemberBranchMapping = () => {
//     useEffect(() => {
//     document.title = "SLF | Add Member Branch Mapping";
//   }, []);

//     const branches = [
//         "01 - Bhagur B1",
//         "02 - Nasikroad B2",
//         "03 - Nashik B3",
//         "999 - Head Office",
//         "V1 - Bhagur V1",
//         "V2 - Nasikroad V2",
//         "V3 - Nasikroad V3",
//         "01 - Bhagur B1",
//         "02 - Nasikroad B2",

//     ];

//     return (
//         <div className="min-h-screen w-full">
//             {/* Top bar */}
//             <div className="flex justify-center">
//                 <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//                     <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
//                         Member Branch Mapping
//                     </h2>



//                     {/* Search & Actions */}
//                     <div className="flex items-center gap-6">
//                         <div className="flex gap-3">
//                             <button
//                                 className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
//                             >
//                                 Save
//                             </button>
//                             <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
//                                 Exit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="flex flex-col gap-9 p-8">

//                 <div className="flex flex-col gap-2 w-[540px]">
//                     <label className="text-gray-700 font-medium">username</label>
//                     <input
//                         type="text"
//                         placeholder="username"
//                         className="border border-[#C4C4C4] rounded-md px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <label className="text-gray-700 font-medium">Branch</label>
//                     <div className="flex flex-wrap gap-12">
//                         {branches.map((branch) => (
//                             <label
//                                 key={branch}
//                                 className="flex items-center gap-2 cursor-pointer"
//                             >
//                                 <input
//                                     type="checkbox"
//                                     className="h-4 w-4 border-gray-300 rounded"
//                                 />
//                                 <span>{branch}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>


//             </div>
//         </div>
//     );
// };

// export default AddMemberBranchMapping;


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchBranchesApi } from "../API/Master/Master_Profile/Branch_Details";
import Loader from "../Component/Loader";

const AddMemberBranchMapping = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get employeeId from URL: /Add-Member-Branch-Mapping?empId=1
  const queryParams = new URLSearchParams(location.search);
  const employeeId = queryParams.get("empId");

  // ✅ Fetch branches on mount
  useEffect(() => {
    document.title = "SLF | Add Member Branch Mapping";
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setIsLoading(true);
      const result = await fetchBranchesApi(1, 100); // fetch all active branches
      if (result?.branches || result?.data) {
        const branchList = result.branches || result.data;
        setBranches(branchList);
      } else {
        setBranches([]);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle checkbox toggle
  const handleCheckboxChange = (branchId) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId]
    );
  };

  // ✅ Save branch mapping
  const handleSave = async () => {
    if (!employeeId) {
      alert("Employee ID not found!");
      return;
    }

    if (selectedBranches.length === 0) {
      alert("Please select at least one branch to assign!");
      return;
    }

    try {
      const API_URL = "http://localhost:5000/Master/User-Management/assign-branches";
      await axios.post(API_URL, {
        employee_id: employeeId,
        branch_ids: selectedBranches,
      });
      alert("Branches assigned successfully!");
      navigate("/Member-Branch-Mapping");
    } catch (error) {
      console.error("Error assigning branches:", error);
      alert("Error assigning branches. Try again!");
    }
  };
  if (isLoading) return <div className="text-center py-10"><Loader /></div>;


  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Member Branch Mapping
          </h2>

          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => navigate("/Member-Branch-Mapping")}
                className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col  gap-9 px-32 py-10">
        {/* Username */}
        <div className="flex flex-col gap-2 w-[540px]">
          <label className="text-gray-700 font-medium">Username</label>
          <input
            type="text"
            placeholder="Employee name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-[#C4C4C4] rounded-md px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Branch checkboxes */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Branches</label>

          {isLoading ? (
            <div className="text-gray-500">Loading branches...</div>
          ) : branches.length === 0 ? (
            <div className="text-gray-500">No branches found</div>
          ) : (
            <div className="flex flex-wrap gap-8">
              {branches.map((branch) => (
                <label
                  key={branch.id || branch.branch_code}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                    checked={selectedBranches.includes(branch.id)}
                    onChange={() => handleCheckboxChange(branch.id)}
                  />
                  <span>
                    {branch.branch_code} - {branch.branch_name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMemberBranchMapping;
