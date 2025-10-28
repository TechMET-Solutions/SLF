import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserPermissions = () => {
  useEffect(() => {
    document.title = "SLF | User Permissions ";
  }, []);

  const navigate = useNavigate();

  // Active tab
  const [activeTab, setActiveTab] = useState("Master");

  // Data for all tabs
  const [tabData, setTabData] = useState({
    Master: [
      { name: "Account Group", view: true, add: false, edit: true, delete: false, approve: true },
      { name: "Account Code", view: true, add: false, edit: true, delete: false, approve: true },
      { name: "Item Profile", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Product Purity Profile", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Address Proof", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "ID Proof", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Customer Profile", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Employee Profile", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Push Gold Rate", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Scheme Type", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Scheme Details", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Scheme Process", view: false, add: true, edit: false, delete: true, approve: false },
      { name: "Scheme Process", view: true, add: true, edit: true, delete: false, approve: true },
      { name: "User Role", view: true, add: false, edit: true, delete: false, approve: false },
      { name: "User Role Permission", view: true, add: true, edit: false, delete: false, approve: true },
      { name: "Branch Profile", view: true, add: true, edit: true, delete: true, approve: true },
      { name: "Scheme Renewal", view: false, add: true, edit: false, delete: false, approve: false },
      { name: "Preference Shares Scheme Details", view: true, add: true, edit: false, delete: false, approve: true },
      { name: "Preference Shares Scheme Process", view: true, add: false, edit: true, delete: false, approve: false },
      { name: "Auction Notice Template", view: true, add: false, edit: false, delete: false, approve: true },
      { name: "Charges Profile", view: true, add: true, edit: true, delete: true, approve: true },
      { name: "Member Branch Mapping", view: true, add: true, edit: false, delete: false, approve: false },
      { name: "Member Login Time Period", view: true, add: false, edit: true, delete: false, approve: false },
      { name: "Branch Scheme Mapping", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Tax Master", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Tax Mapping", view: true, add: true, edit: false, delete: false, approve: false },
    ],
    Transaction: [
      { name: "Loan Application", view: true, add: true, edit: false, delete: false, approve: true },
      { name: "Loan Application Process", view: true, add: true, edit: true, delete: false, approve: true },
      { name: "Gold Purity Check", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Gold Packaging Profile", view: true, add: true, edit: false, delete: false, approve: false },
      { name: "Loan RePayment", view: true, add: true, edit: true, delete: false, approve: true },
      { name: "Loan Installment Profile", view: true, add: true, edit: true, delete: false, approve: false },
      { name: "Journal Voucher", view: true, add: true, edit: false, delete: false, approve: false },
      { name: "Deposit Withdrawal", view: true, add: true, edit: true, delete: false, approve: false },
      { name: "Fund Transfer", view: true, add: true, edit: false, delete: false, approve: true },
      { name: "Over Draft", view: true, add: true, edit: false, delete: false, approve: false },
      { name: "Receipt Voucher", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Payment Voucher", view: true, add: true, edit: false, delete: false, approve: false },
      { name: "Loan Auction Notice", view: true, add: true, edit: false, delete: false, approve: true },
      { name: "Auction of Ornaments", view: true, add: false, edit: false, delete: false, approve: true },
      { name: "Auction Loan Closure", view: true, add: true, edit: true, delete: false, approve: true },
      { name: "Loan Approval Payment", view: true, add: false, edit: false, delete: false, approve: true },
      { name: "Bank Reconciliation", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Loan Cancellation", view: true, add: true, edit: false, delete: false, approve: true },
      { name: "Packaging Tag Print", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Receipt/Payment Voucher", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Charges Againts Loan", view: true, add: true, edit: false, delete: false, approve: false },
      { name: "Generate Legal Notice", view: true, add: false, edit: false, delete: false, approve: true },
      { name: "Auction Invoice", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Loan Release Legal Notice", view: true, add: false, edit: false, delete: false, approve: true },
    ],
    Miscellaneous: [
      { name: "Backup Settings", view: true, add: false, edit: false, delete: false, approve: false },
    ],
    Reports: [
      { name: "Daily Report", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Monthly Report", view: true, add: false, edit: false, delete: false, approve: false },
    ],
    "Tools/Utilities": [
      { name: "Import Tool", view: true, add: false, edit: false, delete: false, approve: false },
      { name: "Export Tool", view: true, add: false, edit: false, delete: false, approve: false },
    ],
  });

  // Handle checkbox change
  const handleChange = (tab, index, field, value) => {
    const updated = { ...tabData };
    updated[tab][index][field] = value;
    setTabData(updated);
  };

  return (
    <div className="min-h-screen w-full">

      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
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
            User Role Permission
          </h2>

          <div className="flex gap-3">
            <div className="flex justify-between gap-5">
              <button
                style={{ width: "74px", height: "24px", borderRadius: "3.75px" }}
                // onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Save
              </button>

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] text-[10px]"
                onClick={() => navigate(-1)}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mt-5 items-center">
        {["Master", "Transaction", "Miscellaneous", "Reports", "Tools/Utilities"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer text-center rounded-[5px] border h-[31px] flex items-center justify-center px-4 transition 
              ${activeTab === tab
                ? "bg-[#0A2478] text-white"
                : "hover:bg-[#0A2478] hover:text-white"
              }`}
            style={{
              width:
                tab === "Master"
                  ? "228px"
                  : tab === "Transaction"
                    ? "251px"
                    : tab === "Miscellaneous"
                      ? "271px"
                      : tab === "Reports"
                        ? "228px"
                        : "264px",
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] mb-10">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[370px]">Name</th>
                <th className="px-4 py-2 text-center border-r border-gray-300 text-[13px] w-[183px]">View</th>
                <th className="px-4 py-2 text-center border-r border-gray-300 text-[13px] w-[183px]">Add</th>
                <th className="px-4 py-2 text-center border-r border-gray-300 text-[13px] w-[177px]">Edit</th>
                <th className="px-4 py-2 text-center border-r border-gray-300 text-[13px] w-[181px]">Delete</th>
                <th className="px-4 py-2 text-center border-r border-gray-300 text-[13px] w-[183px]">Approve</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {tabData[activeTab].map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{row.name}</td>
                  {["view", "add", "edit", "delete", "approve"].map((field) => (
                    <td key={field} className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={row[field]}
                        onChange={(e) => handleChange(activeTab, index, field, e.target.checked)}
                        className="w-4 h-4 cursor-pointer accent-[#0A2478]"
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
