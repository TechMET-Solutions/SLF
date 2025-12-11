import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const UserPermissions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Extract user/role data passed from previous page
  const { row } = location.state || {};

  console.log("Received Role/User Row:", row);

  useEffect(() => {
    document.title = "SLF | User Permissions";
  }, []);

  // Active Tab
  const [activeTab, setActiveTab] = useState("Master");

  // Permissions structure
  const [tabData, setTabData] = useState({
   Master: [
      { name: "Account Group", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Account Code", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Branch Details", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Item Profile", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Product Purity", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Document Proof", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Employee Profile", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Push Rate", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Charges Profile", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Area", view: false, add: false, edit: false, delete: false, approve: false },
     
      { name: "Scheme Details", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Scheme Branch Mapping", view: false, add: false, edit: false, delete: false, approve: false },
    


       { name: "Employee Profile", view: false, add: false, edit: false, delete: false, approve: false },
       { name: "Member Login Period", view: false, add: false, edit: false, delete: false, approve: false },
       { name: "Member Login Details", view: false, add: false, edit: false, delete: false, approve: false },
       { name: "Employee Designation", view: false, add: false, edit: false, delete: false, approve: false },




      
      { name: "User Role Permission", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Member Branch Mapping", view: false, add: false, edit: false, delete: false, approve: false },
       
      

     
      { name: "Tax Master", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Tax Mapping", view: false, add: false, edit: false, delete: false, approve: false },
    ],
    Transaction: [
      { name: "Loan Application", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Loan Charges List", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Customer Profile", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Loan RePayment", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Auction Creation", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Bidder Registration", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Auction Application", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Credit Note", view: false, add: false, edit: false, delete: false, approve: false },
    ],
    Reports: [
      { name: "Daily Report", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Monthly Report", view: false, add: false, edit: false, delete: false, approve: false },
    ],
    Miscellaneous: [
      { name: "Backup Settings", view: false, add: false, edit: false, delete: false, approve: false },
    ],
    "Tools/Utilities": [
      { name: "Import Tool", view: false, add: false, edit: false, delete: false, approve: false },
      { name: "Export Tool", view: false, add: false, edit: false, delete: false, approve: false },
    ],
  });

  console.log(tabData,"tabdata")
useEffect(() => {
    if (row?.permissions) {
      try {
        // If permissions is string (e.g. from DB), parse it
        const parsedPermissions =
          typeof row.permissions === "string"
            ? JSON.parse(row.permissions)
            : row.permissions;

        // ✅ Merge with default tabData to ensure structure consistency
        setTabData((prev) => ({
          ...prev,
          ...parsedPermissions,
        }));
      } catch (err) {
        console.error("❌ Invalid permissions JSON:", err);
      }
    }
  }, [row]);

  const handleSavePermissions = async () => {
   
    try {
      const payload = {
        role_id: row?.id || "DefaultRole",
        permissions:tabData,
      };

      const response = await axios.post(`${API}/Master/save_Roles`, payload);

      if (response.data.success) {
        alert("✅ Permissions saved successfully!");
        navigate("/User-Role-Permission"); // 👈 Redirect after save
      } else {
        alert("❌ Failed to save permissions.");
      }
    } catch (error) {
      console.error("Error saving permissions:", error);
      alert("Something went wrong while saving permissions!");
    }
  };


  // Handle checkbox change
  const handleChange = (tab, index, field, value) => {
    const updated = { ...tabData };
    updated[tab][index][field] = value;
    setTabData(updated);
  };

  // ✅ Create JSON payload to send to API
  const generatePermissionJSON = () => {
    const permissions = Object.entries(tabData).flatMap(([tab, rows]) =>
      rows.map((r) => ({
        module: tab,
        name: r.name,
        view: r.view ? 1 : 0,
        add: r.add ? 1 : 0,
        edit: r.edit ? 1 : 0,
        delete: r.delete ? 1 : 0,
        approve: r.approve ? 1 : 0,
      }))
    );

    return {
      user_id: row?.id || null,
      role_name: row?.role_name || "",
      system_name: row?.system_name || "",
      is_system_role: row?.is_system_role || 0,
      permissions,
    };
  };

  // Handle Save click
  const handleSave = () => {
    const finalJSON = generatePermissionJSON();
    console.log("Final Permission JSON:", finalJSON);

  
    alert("Permissions saved successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-10">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white shadow">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
            }}
            className="text-[#0A2478]"
          >
            User Role Permission — {row?.role_name || "Unknown Role"}
          </h2>

          <div className="flex gap-3">
            <button
              style={{ width: "74px", height: "30px", borderRadius: "4px" }}
           onClick={handleSavePermissions}
              className="bg-[#0A2478] text-white text-[12px] px-3 py-1"
            >
              Save
            </button>
            <button
              className="bg-[#C1121F] text-white text-[12px] px-3 py-1 rounded"
              onClick={() => navigate(-1)}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mt-5 items-center">
        {Object.keys(tabData).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer text-center rounded-[5px] border h-[31px] flex items-center justify-center px-4 transition 
              ${activeTab === tab ? "bg-[#0A2478] text-white" : "hover:bg-[#0A2478] hover:text-white"}
            `}
            style={{ minWidth: "200px" }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300">Name</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">View</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Add</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Edit</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Delete</th>
                <th className="px-4 py-2 text-center">Approve</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {tabData[activeTab].map((r, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{r.name}</td>
                  {["view", "add", "edit", "delete", "approve"].map((field) => (
                    <td key={field} className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={r[field]}
                        onChange={(e) =>
                          handleChange(activeTab, index, field, e.target.checked)
                        }
                        className="w-4 h-4 accent-[#0A2478] cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPermissions;
