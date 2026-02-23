// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { API } from "../api";

// const RoleMapping = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const rowData = location.state?.data; // received from navigate state
//   console.log(rowData, "rowData");

//   const [roles, setRoles] = useState([
//     { id: 1, name: "Emp", selected: false },
//     { id: 2, name: "No Role", selected: false },
//     { id: 3, name: "Auditor", selected: false },
//     { id: 4, name: "Minor Role", selected: false },
//     { id: 5, name: "Branch Manager", selected: false },
//     { id: 6, name: "Executive", selected: false },
//     { id: 7, name: "Administrator", selected: false },
//   ]);

//   // 🧱 Set document title
//   useEffect(() => {
//     document.title = "SLF | Role Mapping";
//   }, []);

//   // 🟢 Pre-select checkboxes if roles are already saved
//   useEffect(() => {
//     if (rowData?.roles) {
//       let parsedRoles = [];

//       // handle both string and array cases
//       try {
//         parsedRoles = Array.isArray(rowData.roles)
//           ? rowData.roles
//           : JSON.parse(rowData.roles);
//       } catch (err) {
//         console.warn("Invalid roles format:", rowData.roles);
//       }

//       setRoles((prev) =>
//         prev.map((role) => ({
//           ...role,
//           selected: parsedRoles.includes(role.name),
//         }))
//       );
//     }
//   }, [rowData]);

//   // 🟣 Toggle checkbox
//   const toggleRole = (id) => {
//     setRoles((prev) =>
//       prev.map((role) =>
//         role.id === id ? { ...role, selected: !role.selected } : role
//       )
//     );
//   };

//   // 🟢 Save selected roles to backend
//   const saveRoles = async (schemeId, selectedRoles) => {
//     try {
//       const response = await axios.patch(`${API}/scheme/updateSchemeRoles`, {
//         id: schemeId,
//         roles: selectedRoles,
//       });
//       console.log(response.data);
//       alert("✅ Roles updated successfully!");
//       navigate("/Scheme-Details-List")
//     } catch (error) {
//       console.error("❌ Error updating roles:", error);
//       alert("Failed to update roles");
//     }
//   };

//   // 🟣 Handle Save Button
//   const handleSave = async () => {
//     const selectedRoles = roles.filter((r) => r.selected).map((r) => r.name);
//     await saveRoles(rowData.id, selectedRoles);
//   };

//   return (
//     <div className="min-h-screen w-full">
//       {/* Topbar */}
//       <div className="flex justify-center sticky top-[80px] z-40">
//         <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
//           <h2
//             style={{
//               fontFamily: "Source Sans 3, sans-serif",
//               fontWeight: 700,
//               fontSize: "20px",
//               lineHeight: "148%",
//             }}
//             className="text-red-600"
//           >
//             Scheme Role Mapping —{" "}
//             <span className="text-black">{rowData?.schemeName || "N/A"}</span>
//           </h2>

//           <div className="flex gap-3">
//             <button
//               className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center rounded-[3.75px] w-[74px] h-[24px]"
//               onClick={handleSave}
//             >
//               Save
//             </button>

//             <button
//               className="text-white bg-[#C1121F] px-[6.25px] py-[6.25px] rounded-[3.75px] w-[74px] h-[24px] text-[10px]"
//               onClick={() => navigate("/Scheme-Details-List")}
//             >
//               Exit
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="flex justify-center">
//         <div className="overflow-x-auto mt-5 w-[1290px]">
//           <table className="w-full border-collapse text-sm">
//             <thead className="bg-[#0A2478] text-white text-sm">
//               <tr>
//                 <th className="w-[100px] px-4 py-2 text-center border-r border-gray-300 text-[18px]">
//                   Select
//                 </th>
//                 <th className="px-4 py-2 text-left border-gray-300 text-[18px]">
//                   Role Name
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-[20px]">
//               {roles.map((role, index) => (
//                 <tr key={role.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                   <td className="px-8 py-2 text-center ">
//                     <input
//                       type="checkbox"
//                       checked={role.selected}
//                       onChange={() => toggleRole(role.id)}
//                       className="w-3 h-3"
//                     />
//                   </td>
//                   <td className="px-4 py-2 text-sm">{role.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleMapping;
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { fetchRolesApi } from "../API/Master/User_Management/Roles";

const RoleMapping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state?.data;

  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Roles and Map with Existing Data
  // const getRolesFromApi = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     // Fetch all roles from API
  //     const response = await fetchRolesApi(1, 100); 
  //     const apiItems = response.items || response.roles || [];

  //     console.log("DATA", apiItems)

  //     // Parse existing roles from navigation state (rowData)
  //     let existingRoleNames = [];
  //     if (rowData?.roles) {
  //       try {
  //         existingRoleNames = Array.isArray(rowData.roles)
  //           ? rowData.roles
  //           : JSON.parse(rowData.roles);
  //       } catch (err) {
  //         console.warn("Could not parse existing roles:", rowData.roles);
  //         // If JSON parse fails, check if it's a comma-separated string
  //         if (typeof rowData.roles === "string") {
  //           existingRoleNames = rowData.roles.split(",").map(r => r.trim());
  //         }
  //       }
  //     }

  //     // Map API items to include 'selected' and normalize property names
  //     const mappedRoles = apiItems.map((role) => {
  //       const roleName = role.role_name || role.name;
  //       return {
  //         id: role.id,
  //         role_name: roleName,
  //         selected: existingRoleNames.includes(roleName),
  //       };
  //     });

  //     setRoles(mappedRoles);
  //   } catch (error) {
  //     console.error("❌ Failed to load roles:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [rowData]);
  
  
  const getRolesFromApi = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch all roles from API
      const response = await fetchRolesApi(1, 100);
      const apiItems = response.items || response.roles || [];

      console.log("DATA BEFORE FILTER", apiItems);

      // ✅ Filter only active roles
      const activeRoles = Array.isArray(apiItems)
        ? apiItems.filter(role => role.is_active === 1)
        : [];

      console.log("DATA AFTER FILTER", activeRoles);

      // Parse existing roles from navigation state (rowData)
      let existingRoleNames = [];
      if (rowData?.roles) {
        try {
          existingRoleNames = Array.isArray(rowData.roles)
            ? rowData.roles
            : JSON.parse(rowData.roles);
        } catch (err) {
          console.warn("Could not parse existing roles:", rowData.roles);
          if (typeof rowData.roles === "string") {
            existingRoleNames = rowData.roles.split(",").map(r => r.trim());
          }
        }
      }

      // Map filtered roles
      const mappedRoles = activeRoles.map((role) => {
        const roleName = role.role_name || role.name;
        return {
          id: role.id,
          role_name: roleName,
          selected: existingRoleNames.includes(roleName),
        };
      });

      setRoles(mappedRoles);

    } catch (error) {
      console.error("❌ Failed to load roles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [rowData]);

  useEffect(() => {
    document.title = "SLF | Role Mapping";
    getRolesFromApi();
  }, [getRolesFromApi]);

  // 2. Toggle Checkbox Logic
  const toggleRole = (id) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === id ? { ...role, selected: !role.selected } : role
      )
    );
  };

  // 3. Save Logic
  const handleSave = async () => {
    // Get list of names for all selected roles
    const selectedRoleNames = roles
      .filter((r) => r.selected)
      .map((r) => r.role_name);

    if (!rowData?.id) {
      alert("❌ Error: Scheme ID not found.");
      return;
    }

    try {
      const response = await axios.patch(`${API}/scheme/updateSchemeRoles`, {
        id: rowData.id,
        roles: JSON.stringify(selectedRoleNames), // Stringify for database storage
      });

      if (response.data) {
        alert("✅ Roles updated successfully!");
        navigate("/Scheme-Details-List");
      }
    } catch (error) {
      console.error("❌ Error updating roles:", error);
      alert(error.response?.data?.message || "Failed to update roles");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border mt-5 w-[1290px] h-[62px] rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2 className="text-red-600 font-bold text-[20px] font-source">
            Scheme Role Mapping —{" "}
            <span className="text-black font-semibold">
              {rowData?.schemeName || "N/A"}
            </span>
          </h2>

          <div className="flex gap-3">
            <button
              className="bg-[#0A2478] hover:bg-[#081d5e] text-white text-[12px] font-medium rounded-[4px] px-6 py-2 transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-[#C1121F] hover:bg-[#a00f1a] text-white text-[12px] font-medium rounded-[4px] px-6 py-2 transition-colors"
              onClick={() => navigate("/Scheme-Details-List")}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="flex  pb-10 pl-[110px]">
        <div className="overflow-x-auto mt-5  bg-white rounded-lg shadow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A2478]"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading available roles...</p>
            </div>
          ) : (
            <table className=" border-collapse">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="w-[120px] px-4 py-4 text-center   text-[16px] font-semibold border-r-2 ">
                    Select
                  </th>
                  <th className="px-6 py-4 text-left text-[16px] font-semibold w-[200px]">
                    Role Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.length > 0 ? (
                  roles.map((role, index) => (
                    <tr
                      key={role.id || index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={role.selected || false}
                          onChange={() => toggleRole(role.id)}
                          className="w-5 h-5 cursor-pointer accent-[#0A2478]"
                        />
                      </td>
                      <td className="px-6 py-3 text-gray-700 font-medium">
                        {role.role_name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-20 text-gray-500 italic">
                      No roles found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleMapping;