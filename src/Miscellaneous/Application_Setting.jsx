import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import GroupData from "../assets/Group 124.svg";

const Application_Setting = () => {
  // const navigate = useNavigate();

  // --- State Management ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    code: "",
    display: "",
    value: "",
    category: "",
  });

  const settingsData = [
    { type: "B", code: "AWOTBRNPAY", display: "Allow Other Branch Loan Repayment?", value: "No", category: "GOLDLOAN" },
    { type: "V", code: "BKDENTRY", display: "Back date entry uptill date?", value: "01/05/2018", category: "GOLDLOAN" },
    { type: "B", code: "BRNCUID", display: "Branch wise Customer Unique ID?", value: "Yes", category: "GOLDLOAN" },
    { type: "B", code: "CANLLOAN", display: "Consider cancelled loanno?", value: "No", category: "GOLDLOAN" },
    { type: "D", code: "CSHNOTGL", display: "Show Cashier Notification of Approved Loan Below?", value: "20001", category: "GOLDLOAN" },
    { type: "D", code: "CTRCBSHLMT", display: "Cash Limit For Cash Transaction Report.", value: "199000", category: "GOLDLOAN" },
    { type: "B", code: "CUIDBNTYPE", display: "Customer Unique Id contains branch code and type?", value: "Yes", category: "GOLDLOAN" },
  ];

  // --- Handlers ---
  const handleEdit = (rowData) => {
    setEditMode(true);
    setFormData({
      type: rowData.type,
      code: rowData.code,
      display: rowData.display,
      value: rowData.value,
      category: rowData.category,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ type: "", code: "", display: "", value: "", category: "" });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log("Saving Data:", formData);
    // Add your API call logic here
    setIsModalOpen(false);
  };

  return (
   

    <div className=" bg-white shadow-sm font-sans">
      {/* Header Bar */}
      <div className="flex justify-center mb-4">
        <div className="flex justify-center mt-5">
          <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
            {/* Left Side: Title */}
            <h2 className="text-red-600 font-bold text-[20px] leading-[148%] whitespace-nowrap">
              Advance Setting List
            </h2>

            {/* Right Side: Filters and Buttons Container */}
            <div className="flex items-center gap-6">

              {/* 2. Action Buttons (Clear, Add, Exit) */}
              <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                <button
                  onClick={() => handleAdd()}
                  className="w-[70px] h-[26px] rounded-[4px] bg-[#0A2478] text-white text-[11px] font-medium transition-colors hover:bg-[#071d45]"
                >
                  Add
                </button>

                {/* <button className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px] font-medium transition-colors hover:bg-[#a40f1a]">
                  Exit
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Table Section */}
      <div className="flex justify-start ml-30">
        <div className="overflow-x-auto mt-5 max-w-3xl h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr className="">
                <th className="px-2 py-2 text-center border-r border-gray-300 text-[13px] w-[80px]">
                  Data Type
                </th>
                <th className="px-4 py-2 text-center border-r border-gray-300 text-[13px] w-[80px]">
                  Data Code
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[280px]">
                  Data Display
                </th>
                <th className="px-4 py-2 text-center border-r border-gray-300 text-[13px] w-[50px]">
                  DataValue
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[140px]">
                  Setting Category
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[50px]">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {settingsData.map((item, index) => (
                <tr
                  key={item.code}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2 text-center">{item.type}</td>
                  <td className="px-4 py-2">
                    {item.code}
                  </td>
                  <td className="px-4 py-2">
                    {item.display}
                  </td>
                  <td className="px-4 py-2">
                    {item.value}
                  </td>
                  <td className="px-4 py-2">
                    {item.category}
                  </td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div
                      className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5"
                      onClick={() => handleEdit(item)}
                    >
                      <img
                        src={GroupData}
                        alt="action-icon"
                        className="w-[18px] h-[18px]"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    {/* </div> */}

      {/* Integrated Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 mx-4">

            {/* Modal Header */}
            <div className="text-[#0A2478] font-semibold text-xl mb-4">
              {editMode ? "Modify Advance Setting" : "Add Advance Setting"}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Data Type */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Data Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="e.g. B, V, D"
                />
              </div>

              {/* Data Code */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Data Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  disabled={editMode}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className={`w-full h-10 px-3 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${editMode ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
                    }`}
                  placeholder="Enter Code"
                />
              </div>

              {/* Data Display - Full Width */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Data Display <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.display}
                  onChange={(e) =>
                    setFormData({ ...formData, display: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Data Value */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Data Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Setting Category */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Setting Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-8">
              <button
                className="h-10 px-8 rounded-lg bg-[#0A2478] text-white text-sm font-medium hover:bg-[#1a3c89] transition-all"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="h-10 px-8 rounded-lg bg-[#C1121F] text-white text-sm font-medium hover:bg-[#d12330] transition-all"
                onClick={() => setIsModalOpen(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Application_Setting;