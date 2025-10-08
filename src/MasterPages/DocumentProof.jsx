import { useState } from "react";
import GroupData from "../assets/Group 124.svg";
import Vectorimg from "../assets/deletimg.png";
const DocumentProof = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    {
      type: "Purity",
      name: "24K Gold",
      addedBy: "John Doe",
      addedOn: "2025-09-20",
      modifiedBy: "Jane Smith",
      modifiedOn: "2025-09-21",
      view: true,
      edit: true,
      active: true,
    },
    {
      type: "Purity",
      name: "22K Gold",
      addedBy: "Alice Johnson",
      addedOn: "2025-09-18",
      modifiedBy: "Bob Williams",
      modifiedOn: "2025-09-19",
      view: true,
      edit: false,
      active: false,
    },
    {
      type: "Product",
      name: "Gold Ring",
      addedBy: "Chris Evans",
      addedOn: "2025-09-15",
      modifiedBy: "Tom Hardy",
      modifiedOn: "2025-09-16",
      view: false,
      edit: true,
      active: true,
    },
  ]);


  return (
    <div className=" min-h-screen w-full">



      {/* middletopbar */}
      <div className="flex justify-center">
        <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
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
            Document Proof List
          </h2>

          <div className="flex gap-3 ">



            <div className="flex justify-between gap-5">
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

      {/* Add Document Proof Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6">
            {/* Modal Header */}
            <h2
              className="text-[#0A2478] mb-6 text-xl font-semibold text-center"
              style={{ fontFamily: "Source Sans 3, sans-serif" }}
            >
              Add Document Proof
            </h2>

            {/* Modal Body */}
            <div className="space-y-4">
              {/* Proof Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proof Type Name <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                >
                  <option value="">Select proof type</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="dl">Driving License</option>
                </select>
              </div>

              {/* Upload & Number */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* File Upload */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Document <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border w-[220px]  border-gray-300 rounded-lg overflow-hidden">
                    <label
                      htmlFor="uploadFile"
                      className="bg-gray-200 px-2 py-2.5 text-sm cursor-pointer hover:bg-gray-300 transition"
                    >
                      Choose
                    </label>
                    <input id="uploadFile" type="file" className="hidden" />
                    <span className="px-3 py-2 text-sm text-gray-500 truncate w-full">
                      No file chosen
                    </span>
                  </div>


                </div>

                {/* Number Input */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                  />
                </div>
              </div>

              <div className="flex gap-8 items-center justify-center">
                <div className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="addressProof" className="w-4 h-4" />
                  <label htmlFor="addressProof" className="text-[14px]">ID Proof</label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="addressProof" className="w-4 h-4" />
                  <label htmlFor="addressProof" className="text-[14px]">Address Proof</label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="bg-[#0A2478] hover:bg-[#081b5b] text-white px-6 py-2 rounded-lg transition"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
              <button
                className="bg-[#C1121F] hover:bg-[#9b0e19] text-white px-6 py-2 rounded-lg transition"
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
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Type</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added By</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added On</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified By</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified On</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Action</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Active</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.addedBy}</td>
                  <td className="px-4 py-2">{row.addedOn}</td>
                  <td className="px-4 py-2">{row.modifiedBy}</td>
                  <td className="px-4 py-2">{row.modifiedOn}</td>

                  {/* Action icons */}
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-2 justify-center">

                      <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
                        <img src={GroupData} alt="view" className="w-[18px] h-[18px]" />
                      </div>


                    </div>
                  </td>

                  {/* Toggle */}
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <button
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${row.active ? "bg-[#0A2478]" : "bg-gray-400"
                        }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${row.active ? "translate-x-6" : "translate-x-0"
                          }`}
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

export default DocumentProof;
