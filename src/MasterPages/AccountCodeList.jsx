import { useState } from "react";
import LogoutIcon from "../assets/logouticon.svg";
import GroupData from "../assets/Group 124.svg";

const AccountCodeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data] = useState([
    {
      name: "Recoverable",
      financialDate: "29-05-2025",
      accountGroup: "Balance Sheet",
      type: "TDS of interest on FDR",
      addedBy: "mjpl@mareakat.com",
      addedOn: "22-09-2017",
      modifiedBy: "",
      editable: true,
    },
    {
      name: "IND 95",
      financialDate: "29-05-2025",
      accountGroup: "Profit & Loss",
      type: "Test",
      addedBy: "mjpl@mareakat.com",
      addedOn: "22-09-2017",
      modifiedBy: "",
      editable: true,
    },
    {
      name: "IND 96",
      financialDate: "29-05-2025",
      accountGroup: "Balance Sheet",
      type: "Some Comment",
      addedBy: "mjpl@mareakat.com",
      addedOn: "22-09-2017",
      modifiedBy: "",
      editable: true,
    },
  ]);

  return (
    <div className="min-h-screen w-full font-[Source_Sans_3]">
      {/* Topbar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-around">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%]">
            Account Code list
          </h2>

          <div className="flex gap-3">
            {/* Account Group Search */}
            <div className="flex gap-5 items-center">
              <p className="text-[11.25px] leading-[15px] font-normal">
                Account Group
              </p>
              <input
                type="text"
                className="w-[168.64px] h-[27.49px] rounded-md border border-gray-400 px-3 py-1 text-[11.25px]"
              />
            </div>

            {/* Account Name Search */}
            <div className="flex gap-5 items-center">
              <p className="text-[11.25px] leading-[15px] font-normal">
                Account Name
              </p>
              <input
                type="text"
                className="w-[168.64px] h-[27.49px] rounded-md border border-gray-400 px-3 py-1 text-[11.25px]"
              />
              <button className="w-[84.36px] h-[26.87px] rounded-md bg-[#0b2c69] text-white text-[11.25px] flex items-center justify-center">
                Search
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-[74px] h-[24px] rounded-[3.75px] bg-[#0A2478] text-white text-[11.25px] flex items-center justify-center"
              >
                Add
              </button>
              <button className="w-[74px] h-[24px] rounded-[3.75px] bg-[#C1121F] text-white text-[10px]">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Modal for Add */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full rounded-lg max-w-2xl p-8 mx-4">
            <h2 className="text-[#0A2478] mb-6 font-semibold text-xl">
              Create New Account
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Account Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Group Name"
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Financial <span className="text-red-500">*</span>
                </label>
                <select className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
                  <option>Balance Sheet</option>
                  <option>Income Statement</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Head
                </label>
                <select className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
                  <option>Bank Account</option>
                  <option>Bank O\D Account</option>
                  <option>Captical Account</option>
                  <option>Cash in Hand</option>
                  <option>Income (DE)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Type
                </label>
                <select className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white">
                  <option>Balance Sheet</option>
                  <option>Income Statement</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                className="h-10 px-6 rounded-lg bg-[#0A2478] text-white text-sm font-medium hover:bg-[#1a3c89] transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
              <button
                className="h-10 px-6 rounded-lg bg-[#C1121F] text-white text-sm font-medium hover:bg-[#d12330] transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Name
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Financial
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Account Group
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Type
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Added by Email
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Added On
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Modified by
                </th>
                <th className="px-4 py-2 text-left text-[13px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.financialDate}</td>
                  <td className="px-4 py-2">{row.accountGroup}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.addedBy}</td>
                  <td className="px-4 py-2">{row.addedOn}</td>
                  <td className="px-4 py-2">{row.modifiedBy || "-"}</td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
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

      {/* Pagination */}
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
        <button className="px-3 py-1 border rounded-md">Previous</button>
        <div className="flex gap-2">
          <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">3</button>
          <button className="px-3 py-1 border rounded-md">...</button>
          <button className="px-3 py-1 border rounded-md">10</button>
        </div>
        <button className="px-3 py-1 border rounded-md">Next</button>
      </div>
    </div>
  );
};

export default AccountCodeList;
