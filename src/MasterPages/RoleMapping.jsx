
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { fetchRolesApi } from "../API/Master/User_Management/Roles";
import Loader from "../Component/Loader";

const RoleMapping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state?.data;

  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getRolesFromApi = useCallback(async () => {
    
    try {
      setIsLoading(true);
      // Fetch all roles from API
      const response = await fetchRolesApi(1, 100);
      const apiItems = response.items || response.roles || [];

      console.log("DATA BEFORE FILTER", apiItems);

      // ✅ Filter only active roles
      const activeRoles = Array.isArray(apiItems)
        ? apiItems.filter((role) => role.is_active === 1)
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
            existingRoleNames = rowData.roles.split(",").map((r) => r.trim());
          }
        }
      }

      // Map filtered roles
      const mappedRoles = activeRoles.map((role) => {
        const roleName = role.role_name || role.name;
          setIsLoading(false);
        return {
          id: role.id,
          role_name: roleName,
          selected: existingRoleNames.includes(roleName),
        };
      });
      setIsLoading(false);
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
        role.id === id ? { ...role, selected: !role.selected } : role,
      ),
    );
  };
  // 3. Save Logic
  const handleSave = async () => {

     setIsLoading(true);
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
          setIsLoading(false);
      }
    } catch (error) {
      console.error("❌ Error updating roles:", error);
      alert(error.response?.data?.message || "Failed to update roles");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Top Navigation Bar */}
      <div className="flex justify-center sticky top-[50px] z-40">
        <div className="flex items-center px-6 py-4 border w-[1462px] h-[40px] border-gray-200 justify-between  bg-white">
          <h2 className="text-red-600 font-bold text-[20px] font-source">
            Scheme Role Mapping —{" "}
            <span className="text-black font-semibold">
              {rowData?.schemeName || "N/A"}
            </span>
          </h2>

          <div className="flex gap-3">
            <button
              className="bg-[#0A2478] hover:bg-[#081d5e] text-white text-[12px] font-medium rounded-[4px] px-6 py-1 transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-[#C1121F] hover:bg-[#a00f1a] text-white text-[12px] font-medium rounded-[4px] px-6 py-1 transition-colors"
              onClick={() => navigate("/Scheme-Details-List")}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="flex ml-[25px] ">
        <div className="overflow-x-auto bg-white">
          
            <table className=" border-collapse ">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="w-[120px] px-1 py-1 text-left font-semibold border-r-2 ">
                    Select
                  </th>
                  <th className="px-1 py-1 text-left font-semibold w-[200px]">
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
                      <td className="px-2 py-1 ">
                        <input
                          type="checkbox"
                          checked={role.selected || false}
                          onChange={() => toggleRole(role.id)}
                          className="w-5 h-5 cursor-pointer accent-[#0A2478]"
                        />
                      </td>
                      <td className="  text-gray-700 font-medium">
                        {role.role_name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-center py-20 text-gray-500 italic"
                    >
                      No roles found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
         
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default RoleMapping;
