import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import Loader from "../Component/Loader";

const UserPermissions = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [loading, setLoading] = useState(false);
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
      {

        name: "Group Ledger",
        Navbar:false,
        view: false,
        add: false,
        edit: false,
        //  delete: false,
      },
      {
        name: "Ledger", Navbar:false, view: false, add: false, edit: false,
        // delete: false
      },
      {
        name: "Branch Details",
         Navbar:false,
        view: false,
        add: false,
        
        edit: false,
        // delete: false,
        status: false,
      },
      {
        name: "Item Profile",
         Navbar:false,
        // view: false,
        add: false,
        edit: false,
        // delete: false,
        status: false,
      },
      {
        name: "Product Purity",
         Navbar:false,
        // view: false,
        add: false,
        edit: false,
        delete: false,
        status: false,
      },
      {
        name: "Document Proof",
         Navbar:false,
        // view: false,
        add: false,
        edit: false,
        delete: false,
         status: false,
      },

      {
        name: "Push Rate",
         Navbar:false,
        // view: false,
        add: false,
        // edit: false,
        // delete: false,
      },
      {
        name: "Charges Profile",
         Navbar:false,
        view: false,
        add: false,
        edit: false,
        delete: false,
         status: false,
      },
      {
        name: "Area",
         Navbar:false,
        // view: false,
        add: false,
        
        edit: false,
        delete: false
      },
      {
        name: "Party Type",
         Navbar:false,
        // view: false,
        add: false,
        edit: false,
        // delete: false,
        status: false,
      },

      {
        name: "Scheme Details",
         Navbar:false,
        view: false,
        add: false,
        edit: false,
        delete: false,
        status: false,
        RoleMapping: false,
        Copy: false,
        RenewScheme: false,
      },
      {
        name: "Scheme Branch Mapping",
         Navbar:false,
        Mapping: false,
        
      },
      {
        name: "Employee Profile",
         Navbar:false,
        view: false,
        valuation:false,
        add: false,
        edit: false,
        delete: false,
        status: false,
      },
      {
        name: "Member Details",
         Navbar:false,
        view: false,
        add: false,
        edit: false,
        delete: false,
       
        OTPOverride: false,
        Manager_Mob_No: false,
        Admin_Mob_No: false,
        Start_Time: false,
        End_Time: false,
        IP_Address: false,
         BranchMapping: false,
        Bulk_Start_Time: false,
        Bulk_End_Time: false




      },
      {
        name: "Employee Attendance",
         Navbar:false,
        view: false,
         add: false,
        // edit: false,
        // delete: false,
      },
      {
        name: "Employee Designation",
         Navbar:false,
        view: false,
        add: false,
        edit: false,
        delete: false,
      },

      {
        name: "User Role Permission",
         Navbar:false,
        view: false,
        add: false,
        edit: false,
        delete: false,
        rights: false,
        status: false,
      },
     
      {
        name: "Tax Master",
         Navbar:false,
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
        name: "Tax Mapping",
         Navbar:false,
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
    ],
    Transaction: [
      {
         Navbar:false,
        name: "Loan Application",
        view: false,
        add: false,
        edit: false,
        delete: false,
        Approve: false,
        Repay: false,
        Noc: false,
        Cancelled: false,
        Upload_Documents: false,
        Print: false,
      },
      {
        // Navbar:false,
        name: "Add Loan Application",
        Submit: false,
        AssignedPurity: false,
      },
      {
         Navbar:false,
        name: "Loan Repayment",
        view: false,
        // add: false,
        // edit: false,
        // delete: false,a
        Print: false,
        View_RepaymentDetails: false,
      },
      { Navbar:false, name: "Loan Approve", view: false, add: false },
      { Navbar:false, name: "Repay", view: false, add: false, edit: false, delete: false },
      {
         Navbar:false,
        name: "Loan Charges List",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },

      {
         Navbar:false,
        name: "Customer Profile",
        view: false,
        add: false,
        edit: false,
        delete: false,
        print: false,
        Block: false,
      },
       { Navbar:false, name: "Accounting", view: false },
        { Navbar:false, name: "Auction", view: false },
      {
         Navbar:false,name: "Add Customer Profile", Save: false
      },

      {
         Navbar:false,
        name: "Expense List",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "Receipt List",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "Journal Voucher List",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "FT Issue", view: false, add: false,
        // edit: false,
        delete: false
      },
      {
         Navbar:false,
        name: "FT Receipt",
        view: false,
        add: false,
        // edit: false,
        delete: false,
      },

      {
         Navbar:false,
        name: "Auction List",
        view: false,
        add: false,
        Auction_Details: false,
        // edit: false,
        // delete: false,
      },
      {
          Navbar:false,
        name: "Auction Creation",
        view: false,
        Submit: false,
        // edit: false,
        // delete: false,
      },
      {
         Navbar:false,
        name: "Bidder Registration",
        view: false,
        View_BidderDetails: false,
        add: false,
        edit: false,
        // delete: false,
      },
      {
         Navbar:false,
        name: "Auction Application",
        view: false,
        Submit: false,
        // edit: false,
        // delete: false,
      },
      {
         Navbar:false,
        name: "Credit Note",
        view: false,
        CreditNote_View: false,
        print:false,
        add: false,
        // edit: false,
        // delete: false,
      },
      {
         Navbar:false,
        name: "Cash Balance",
        view: false,
        add: false,
        // edit: false,
        // delete: false,
      },
    ],
    Miscellaneous: [
      {
         Navbar:false,
        name: "Bank Branch Mapping",
        view: false,
        Branch_Mapping:false
        // add: false,
        // edit: false,
        // delete: false,
      },
      {
         Navbar:false,
        name: "Account Opening Balance ",
        view: false,
        add: false,
        edit: false,
        // delete: false,
      },
    ],
    Reports: [
      {
         Navbar:false,
        name: "Transaction Report",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "Cash/ Bank/ Financial Report",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "MIS Report",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "Loan Follow Up",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "Customer History",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
      {
         Navbar:false,
        name: "PaymentGetWay History",
        view: false,
        add: false,
        edit: false,
        delete: false,
      },
    ],
  });
  console.log(tabData, "tabdata");
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
      setLoading(true);
    try {
      const payload = {
        role_id: row?.id || "DefaultRole",
        permissions: tabData,
      };
      const response = await axios.post(`${API}/Master/save_Roles`, payload);
      if (response.data.success) {
        alert("✅ Permissions saved successfully!");
          setLoading(false);
        navigate("/User-Role-Permission"); // 👈 Redirect after save
      } else {
        alert("❌ Failed to save permissions.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error saving permissions:", error);
      alert("Something went wrong while saving permissions!");
      setLoading(false);
    }
  };

  // Handle checkbox change
  const handleChange = (tab, index, field, value) => {
    const updated = { ...tabData };
    updated[tab][index][field] = value;
    setTabData(updated);
  };

  return (
    <div className="min-h-screen w-full  pb-10">
      {/* Header */}
      <div className="flex justify-center sticky top-[50px] z-40">
        <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border  border-gray-200 justify-between bg-white shadow">
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
              style={{ width: "74px", height: "30px", borderRadius: "4px" }}
              className="bg-[#C1121F] text-white text-[12px] px-3 py-1 rounded"
              onClick={() => navigate(-1)}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex  gap-2 mt-5 ml-[22px] ">
        {Object.keys(tabData).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer text-center rounded-[5px] border h-[31px] flex items-center justify-center px-4 transition 
              ${activeTab === tab ? "bg-[#0A2478] text-white" : "hover:bg-[#0A2478] hover:text-white"}
            `}
            style={{ minWidth: "100px" }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex  mt-2 ml-[22px]">
        <div className="overflow-x-auto mt-2 ">
          <table className="w-full border-collapse">
            {/* <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 w-[250px]">
                  Name
                </th>
                <th className="px-4 py-2 text-center border-r border-gray-300 w-[100px]">
                  View
                </th>
                <th className="px-4 py-2 text-center border-r border-gray-300 w-[100px]">
                  Add
                </th>
                <th className="px-4 py-2 text-center border-r border-gray-300 w-[100px]">
                  Edit
                </th>
                <th className="px-4 py-2 text-center border-r border-gray-300 w-[100px]">
                  Delete
                </th>

              </tr>
            </thead> */}

            {/* <thead className="bg-[#0A2478] text-white text-sm">
  <tr>
    <th className="px-4 py-2 text-left border-r border-gray-300 w-[250px]">
      Name
    </th>

    {permissionKeys.map((perm) => (
      <th
        key={perm}
        className="px-4 py-2 text-center border-r border-gray-300 w-[100px]"
      >
        {perm.toUpperCase()}
      </th>
    ))}
  </tr>
</thead> */}
            {/* <tbody className="text-[13px]">
              {tabData[activeTab].map((r, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{r.name}</td>
                  {["view", "add", "edit", "delete",].map((field) => (
                    <td key={field} className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={r[field]}
                        onChange={(e) =>
                          handleChange(
                            activeTab,
                            index,
                            field,
                            e.target.checked,
                          )
                        }
                        className="w-4 h-4 accent-[#0A2478] cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody> */}

          <tbody className="text-[13px]">
  {tabData[activeTab].map((r, index) => {
    
    const permissionKeys = Object.keys(r).filter(
      (key) => key !== "name"
    );

    return (
      <tr
        key={index}
        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
      >
        {/* Name */}
        <td className="px-4 py-2 w-[250px]">{r.name}</td>

        {/* Permissions */}
        <td className="px-4 py-2">
          <div className="flex flex-wrap gap-4">
            
            {permissionKeys.map((field) => (
              <label key={field} className="flex items-center gap-1">
                
                {/* TEXT */}
                <span className="text-xs capitalize">
                  {field}
                </span>

                {/* CHECKBOX */}
                <input
                  type="checkbox"
                  checked={r[field] || false}
                  onChange={(e) =>
                    handleChange(
                      activeTab,
                      index,
                      field,
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 accent-[#0A2478] cursor-pointer"
                />
              </label>
            ))}

          </div>
        </td>
      </tr>
    );
  })}
</tbody>
          </table>
        </div>
      </div>

      {loading && <Loader />}

    </div>
  );
};

export default UserPermissions;
