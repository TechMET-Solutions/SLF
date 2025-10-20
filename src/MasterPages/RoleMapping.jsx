import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleMapping = () => {
  useEffect(() => {
    document.title = "SLF | Role Mapping";
  }, []);
  const [roles, setRoles] = useState([
    { id: 1, name: "Emp", selected: true },
    { id: 2, name: "No Role", selected: true },
    { id: 3, name: "Auditor", selected: true },
    { id: 4, name: "Minor Role", selected: true },
    { id: 5, name: "Branch Manager", selected: true },
    { id: 6, name: "Executive", selected: true },
    { id: 7, name: "Administrator", selected: true },
  ]);

  const navigate = useNavigate();

  const toggleRole = (id) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === id ? { ...role, selected: !role.selected } : role
      )
    );
  };

  return (
    <div className="min-h-screen w-full">
      {/* Topbar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          {/* Heading */}
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            Scheme Role Mapping
          </h2>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              style={{
                width: "74px",
                height: "24px",
                borderRadius: "3.75px",
              }}
              className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              onClick={() => alert("Roles saved!")}
            >
              Save
            </button>

            <button
              className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
              onClick={() => navigate("/")}
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
