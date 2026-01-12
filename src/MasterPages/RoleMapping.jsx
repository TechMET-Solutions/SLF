import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const RoleMapping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state?.data; // received from navigate state
  console.log(rowData, "rowData");

  const [roles, setRoles] = useState([
    { id: 1, name: "Emp", selected: false },
    { id: 2, name: "No Role", selected: false },
    { id: 3, name: "Auditor", selected: false },
    { id: 4, name: "Minor Role", selected: false },
    { id: 5, name: "Branch Manager", selected: false },
    { id: 6, name: "Executive", selected: false },
    { id: 7, name: "Administrator", selected: false },
  ]);

  // 🧱 Set document title
  useEffect(() => {
    document.title = "SLF | Role Mapping";
  }, []);

  // 🟢 Pre-select checkboxes if roles are already saved
  useEffect(() => {
    if (rowData?.roles) {
      let parsedRoles = [];

      // handle both string and array cases
      try {
        parsedRoles = Array.isArray(rowData.roles)
          ? rowData.roles
          : JSON.parse(rowData.roles);
      } catch (err) {
        console.warn("Invalid roles format:", rowData.roles);
      }

      setRoles((prev) =>
        prev.map((role) => ({
          ...role,
          selected: parsedRoles.includes(role.name),
        }))
      );
    }
  }, [rowData]);

  // 🟣 Toggle checkbox
  const toggleRole = (id) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === id ? { ...role, selected: !role.selected } : role
      )
    );
  };

  // 🟢 Save selected roles to backend
  const saveRoles = async (schemeId, selectedRoles) => {
    try {
      const response = await axios.patch(`${API}/scheme/updateSchemeRoles`, {
        id: schemeId,
        roles: selectedRoles,
      });
      console.log(response.data);
      alert("✅ Roles updated successfully!");
      navigate("/Scheme-Details-List")
    } catch (error) {
      console.error("❌ Error updating roles:", error);
      alert("Failed to update roles");
    }
  };

  // 🟣 Handle Save Button
  const handleSave = async () => {
    const selectedRoles = roles.filter((r) => r.selected).map((r) => r.name);
    await saveRoles(rowData.id, selectedRoles);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Topbar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
            }}
            className="text-red-600"
          >
            Scheme Role Mapping —{" "}
            <span className="text-black">{rowData?.schemeName || "N/A"}</span>
          </h2>

          <div className="flex gap-3">
            <button
              className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center rounded-[3.75px] w-[74px] h-[24px]"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="text-white bg-[#C1121F] px-[6.25px] py-[6.25px] rounded-[3.75px] w-[74px] h-[24px] text-[10px]"
              onClick={() => navigate("/Scheme-Details-List")}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="w-[100px] px-4 py-2 text-center border-r border-gray-300 text-[18px]">
                  Select
                </th>
                <th className="px-4 py-2 text-left border-gray-300 text-[18px]">
                  Role Name
                </th>
              </tr>
            </thead>
            <tbody className="text-[20px]">
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="px-8 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={role.selected}
                      onChange={() => toggleRole(role.id)}
                      className="w-5 h-5"
                    />
                  </td>
                  <td className="px-4 py-2">{role.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleMapping;
