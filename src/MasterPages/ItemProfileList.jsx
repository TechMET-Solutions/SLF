import { useState } from "react";
import GroupData from "../assets/Group 124.svg";
const ItemProfileList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data] = useState([
    {
      code: "AC001",
      name: "Recoverable",
      status: "Active",
      addBy: "john@example.com",
      addOn: "2025-09-17",
      modifyBy: "jane@example.com",
      modifyOn: "2025-09-18",
      edit: true
    },
    {
      code: "AC002",
      name: "Payable",
      status: "Inactive",
      addBy: "alice@example.com",
      addOn: "2025-09-16",
      modifyBy: "bob@example.com",
      modifyOn: "2025-09-17",
      edit: false
    }
  ]);

  return (
    <div className=" min-h-screen w-full">



      {/* middletopbar */}
      <div className="flex justify-center">
        <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700, // Bold
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            Item profile List
          </h2>

          <div className="flex gap-3">
            <div className="flex gap-5 items-center">
              <p
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "11.25px",
                  lineHeight: "15px",
                  letterSpacing: "0em",
                }}
              >
                Item Code
              </p>

              <input
                type="text"

                style={{
                  width: "168.64px",
                  height: "27.49px",
                  borderRadius: "5px",
                  borderWidth: "0.62px",
                }}
                className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
              />

            </div>

            <div className="flex gap-5 items-center">
              <p
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "11.25px",
                  lineHeight: "15px",
                  letterSpacing: "0em",
                }}
              >
                Item Name
              </p>

              <input
                type="text"

                style={{
                  width: "168.64px",
                  height: "27.49px",
                  borderRadius: "5px",
                  borderWidth: "0.62px",
                }}
                className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
              />
              <button
                style={{
                  width: "84.36px",
                  height: "26.87px",
                  borderRadius: "5px",
                }}
                className="bg-[#0b2c69] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Search
              </button>

            </div>
            <div className="flex justify-center item-center gap-5">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",

                  gap: "6.25px",
                }}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Add
              </button>

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
              >
                Exit
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* modelforAdd */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[717px] p-10 rounded-lg shadow-lg">
            <h2
              className="text-[#0A2478] mb-6"
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              Add New Item
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-[14px] font-medium">
                  Item Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Code"
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-[14px] font-medium">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Name"
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-[14px] font-medium">
                  Print Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Print Name"
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>





              <div>
                <label className="text-[14px] font-medium">
                  Remark 
                </label>
                <input
                  type="text"
                  placeholder="Remark"
                  className="border border-gray-300 rounded w-[420px] px-3 py-2 mt-1 "
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-4">
               <div className="col-span-2 flex gap-4 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 border border-gray-300 rounded"
                />
                <label className="text-[14px] font-medium mr-3">
                  Action <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="bg-[#0A2478] text-white px-6 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
              <button
                className="bg-[#C1121F] text-white px-6 py-2 rounded-md"
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
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Code</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Status</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added By</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added On</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified By</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified On</th>

                <th className="px-4 py-2 text-left text-[13px]">Action</th>
                <th className="px-4 py-2 text-left text-[13px]">Active</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{row.code}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.status}</td>
                  <td className="px-4 py-2">{row.addBy}</td>
                  <td className="px-4 py-2">{row.addOn}</td>
                  <td className="px-4 py-2">{row.modifyBy}</td>
                  <td className="px-4 py-2">{row.modifyOn}</td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex justify-center">
                      <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center  p-0.5 justify-center">
                        <img src={GroupData} alt="logout" className="w-[18px] h-[18px]" />
                      </div>
                    </div>

                  </td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <button
                      // onClick={() => handleToggle(row.id)} // toggle handler
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors bg-[#0A2478]`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform translate-x-6 `}
                      />
                    </button>
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
          <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
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

export default ItemProfileList;
