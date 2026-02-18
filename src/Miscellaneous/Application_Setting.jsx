import { useNavigate } from "react-router-dom";

const Application_Setting = () => {
  const navigate = useNavigate();

  // 1. For Edit Mode
  const handleEdit = (rowData) => {
    navigate("/AdvSettings", { state: { rowData } });
  };

  // 2. For Add Mode
  const handleAdd = () => {
    navigate("/AdvSettings", { state: { rowData: null } });
  };
  const settingsData = [
    {
      type: "B",
      code: "AWOTBRNPAY",
      display: "Allow Other Branch Loan Repayment?",
      value: "No",
      category: "GOLDLOAN",
    },
    {
      type: "V",
      code: "BKDENTRY",
      display: "Back date entry uptill date?",
      value: "01/05/2018",
      category: "GOLDLOAN",
    },
    {
      type: "B",
      code: "BRNCUID",
      display: "Branch wise Customer Unique ID?",
      value: "Yes",
      category: "GOLDLOAN",
    },
    {
      type: "B",
      code: "CANLLOAN",
      display: "Consider cancelled loanno?",
      value: "No",
      category: "GOLDLOAN",
    },
    {
      type: "D",
      code: "CSHNOTGL",
      display: "Show Cashier Notification of Approved Loan Below?",
      value: "20001",
      category: "GOLDLOAN",
    },
    {
      type: "D",
      code: "CTRCBSHLMT",
      display: "Cash Limit For Cash Transaction Report.",
      value: "199000",
      category: "GOLDLOAN",
    },
    {
      type: "B",
      code: "CUIDBNTYPE",
      display: "Customer Unique Id contains branch code and type?",
      value: "Yes",
      category: "GOLDLOAN",
    },
  ];

  return (
    <div className="m-2 border border-[#008080] bg-white shadow-sm font-sans">
      {/* Header Bar */}
      <div className="bg-[#008080] text-white px-4 py-1.5 flex justify-between items-center text-sm font-semibold">
        <span>Advance Setting List</span>
        <button
          className="bg-[#1a5d9b] hover:bg-blue-800 border border-white px-3 py-0.5 rounded-sm text-xs transition-colors flex items-center gap-1"
          onClick={() => handleAdd()}
        >
          <span className="text-lg leading-none">+</span> Add
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700 w-20">
                Data Type
              </th>
              <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700">
                Data Code
              </th>
              <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700">
                Data Display
              </th>
              <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700">
                DataValue
              </th>
              <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700">
                Setting Category
              </th>
              <th className="p-2 text-left font-medium text-gray-700 w-16">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {settingsData.map((item, index) => (
              <tr
                key={item.code}
                className={`border-b border-gray-200 hover:bg-teal-50/50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border-r border-gray-200 p-2">{item.type}</td>
                <td className="border-r border-gray-200 p-2 font-mono text-[11px] text-gray-600">
                  {item.code}
                </td>
                <td className="border-r border-gray-200 p-2 text-gray-800">
                  {item.display}
                </td>
                <td className="border-r border-gray-200 p-2 text-gray-600">
                  {item.value}
                </td>
                <td className="border-r border-gray-200 p-2 text-gray-500 italic">
                  {item.category}
                </td>
                <td className="p-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Application_Setting;
