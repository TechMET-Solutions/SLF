import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const UserPermissions = () => {
  useEffect(() => {
    document.title = "SLF | User Permissions ";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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

  const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData); // assuming data is in state
  };

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
            User Role Permission
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

      {/* modelforAdd */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[600px] rounded-lg shadow-lg p-6">
            {/* Modal Header */}
            <h2
              className="text-[#0A2478] mb-6"
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              Add Document Proof
            </h2>

            {/* Modal Body */}
            <div className="grid grid-cols-2 gap-4">
              {/* Proof Type Dropdown */}
              <div>
                <label className="text-[14px]">
                  Proof Type Name <span className="text-red-500">*</span>
                </label>
                <select className="border border-gray-300 rounded px-3 py-2 mt-1 w-full">
                  <option value="">Proof type name</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="dl">Driving License</option>
                </select>
              </div>

              {/* Number Input */}
              <div>
                <label className="text-[14px]">
                  Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Any Details"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>

              {/* File Upload */}
              {/* File Upload */}
              <div className="col-span-2 w-[211px] h-[30px]">
                <label className="text-[14px]">
                  Upload Document <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                  <label
                    htmlFor="uploadFile"
                    className="bg-[#D9D9D9] px-4 py-2 cursor-pointer text-[10px] rounded-l border-r border-gray-300 w-[200px]"
                  >
                    Choose File
                  </label>
                  <input
                    id="uploadFile"
                    type="file"
                    className="hidden"
                  //   onChange={(e) =>
                  //     setFileName(e.target.files[0] ? e.target.files[0].name : "No file chosen")
                  //   }
                  />
                  <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                    {/* {fileName || "No file chosen"} */}
                  </span>
                </div>
              </div>


              {/* Checkboxes */}
              <div className="flex items-center space-x-2 mt-10">
                <input type="checkbox" id="idProof" />
                <label htmlFor="idProof" className="text-[14px]">ID Proof</label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <input type="checkbox" id="addressProof" />
                <label htmlFor="addressProof" className="text-[14px]">Address Proof</label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-[#0A2478] text-white px-6 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
              <button
                className="bg-[#C1121F] text-white px-6 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-center gap-2 mt-5 items-center'>
        <div className='w-[228px] h-[31px] border text-center rounded-[5px] hover:bg-[#0A2478] hover:text-white cursor-pointer'>
          Master
        </div>
        <div className='w-[251px] border text-center rounded-[5px] hover:bg-[#0A2478] h-[31px] hover:text-white cursor-pointer'>
          Transaction
        </div >
        <div className='w-[271px] border text-center rounded-[5px] hover:bg-[#0A2478] h-[31px] hover:text-white cursor-pointer'>
          Miscellaneous
        </div >
        <div className='w-[228px] border text-center rounded-[5px] hover:bg-[#0A2478] h-[31px] hover:text-white cursor-pointer'>
          Reports
        </div>
        <div className='w-[264px] border text-center rounded-[5px] hover:bg-[#0A2478] h-[31px] hover:text-white cursor-pointer'>
          Tools/ Utilities
        </div>
      </div>

      <div className="flex  pl-[105px]">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
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
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{row.name}</td>

                  {/* Add */}
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.add || false}
                      onChange={(e) => handleChange(index, "view", e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#0A2478]"
                    />
                  </td>
                  {/* Add */}
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.add || false}
                      onChange={(e) => handleChange(index, "add", e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#0A2478]"
                    />
                  </td>

                  {/* Edit */}
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.edit || false}
                      onChange={(e) => handleChange(index, "edit", e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#0A2478]"
                    />
                  </td>

                  {/* Delete */}
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.delete || false}
                      onChange={(e) => handleChange(index, "delete", e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#0A2478]"
                    />
                  </td>

                  {/* Approve */}
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.approve || false}
                      onChange={(e) => handleChange(index, "approve", e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#0A2478]"
                    />
                  </td>
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