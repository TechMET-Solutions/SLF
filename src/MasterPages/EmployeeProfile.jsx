import { useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import GroupData from "../assets/Group 124.svg";
import DeleteData from "../assets/deletimg.png";
import profileempty from "../assets/profileempty.png";

const EmployeeProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data] = useState([
    {
      id: 1,
      employee: "",
      name: "Sakshi Chaudhari",
      email: "sakshi.chaudhari@sluwant.com",
      mobile: "4217845963",
      doj: "14-05-2025",
      dob: "45-03-2025",
      address: "Sakshi Arjun Chaudhari,N41/CF 1-1-6,Shivshakti Chowk,Cidco,Nashik",
      isActive: true,
    },
    {
      id: 2,
      employee: "",
      name: "Sakshi Chaudhari",
      email: "sakshi.chaudhari@sluwant.com",
      mobile: "4217845963",
      doj: "14-05-2025",
      dob: "45-03-2025",
      address: "Sakshi Arjun Chaudhari,N41/CF 1-1-6,Shivshakti Chowk,Cidco,Nashik",
      isActive: true,
    },
    {
      id: 3,
      employee: "",
      name: "Sakshi Chaudhari",
      email: "sakshi.chaudhari@sluwant.com",
      mobile: "4217845963",
      doj: "14-05-2025",
      dob: "45-03-2025",
      address: "Sakshi Arjun Chaudhari,N41/CF 1-1-6,Shivshakti Chowk,Cidco,Nashik",
      isActive: true,
    },
  ]);

  const handleToggle = (id) => {
    // TODO: Toggle active state logic
    console.log("Toggling active state for:", id);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Employee Profile List
          </h2>

          {/* Search & Actions */}
          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Id</p>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Emp Name</p>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                // onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Save
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Add
              </button>
              <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>



      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[920px] max-h-[90vh] rounded-lg shadow-lg p-6 overflow-y-auto">
            {/* Title */}
            <h2 className="text-[#0A2478] text-[20px] font-semibold mb-6">
              Add Charges Profile
            </h2>

            <div className="flex gap-6">
              {/* Left Form */}
              <div className="w-3/4 space-y-4 text-sm">
                {/* PAN + Aadhaar + Name */}
                <div className="grid grid-cols-3 gap-4">
                  {/* PAN */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Pan Card Number*</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="PAN Card Number"
                        className="border border-[#C4C4C4] rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button className="bg-[#0A2478] text-white px-3 py-2 rounded-r-md hover:bg-[#081c5b]">
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* Aadhaar */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Aadhar Card Number*</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Aadhar Card Number"
                        className="border border-[#C4C4C4] rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button className="bg-[#0A2478] text-white px-3 py-2 rounded-r-md hover:bg-[#081c5b]">
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Name*</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Employee ID, Mobile, Email */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Employee ID*</label>
                    <input
                      type="text"
                      placeholder="Employee ID"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Mobile No*</label>
                    <input
                      type="text"
                      placeholder="Mobile No"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Email ID*</label>
                    <input
                      type="email"
                      placeholder="Email ID"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Corresponding Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Corresponding Address*</label>
                    <input
                      type="text"
                      placeholder=" Corresponding Address*"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Radio Option */}
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="sameAddress"
                      name="address"
                      className="border border-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <label htmlFor="sameAddress" className="text-gray-700 font-medium">
                      Permanent Address same as Correspondence Address?
                    </label>
                  </div>

                  {/* Permanent Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Permanent Address*</label>
                    <input
                      type="text"
                      placeholder=" Permanent Address*"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Branch, Joining Date, Designation, DOB */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Branch*</label>
                    <input
                      type="text"
                      placeholder="Branch"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Joining Date*</label>
                    <input
                      type="date"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Designation*</label>
                    <input
                      type="text"
                      placeholder="Designation"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Date of Birth*</label>
                    <input
                      type="date"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Role, Password, Fax */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Assign Role*</label>
                    <input
                      type="text"
                      placeholder="Assign Role"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Password*</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Fax*</label>
                    <input
                      type="text"
                      placeholder="Fax"
                      className="border border-[#C4C4C4] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Upload Section */}
              <div className="w-1/4 p-4">
                <div>
                  <div className="flex justify-center">
                    <img src={profileempty} alt="logout" className="w-[120px] h-[140px]" />
                  </div>

                  <div className="flex justify-center mt-2 mb-2">
                    <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
                      Upload Customer Profile
                    </label>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                    <label htmlFor="uploadFile"
                      className="bg-[#D9D9D9] px-4 py-1.5 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold">
                      Choose File
                    </label>
                    <input id="uploadFile" type="file" className="hidden" // onChange={(e)=>
                    // setFileName(e.target.files[0] ? e.target.files[0].name : "No file chosen")
                    // }
                    />
                    <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                      {/* {fileName || "No file chosen"} */}
                    </span>
                  </div>
                  <h1 className="text-[14px] font-medium">Add Proof</h1>
                  <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                    <label htmlFor="uploadFile"
                      className="bg-[#D9D9D9] px-4 py-1.5 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold">
                      Choose File
                    </label>
                    <input id="uploadFile" type="file" className="hidden" // onChange={(e)=>
                    // setFileName(e.target.files[0] ? e.target.files[0].name : "No file chosen")
                    // }
                    />
                    <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                      {/* {fileName || "No file chosen"} */}
                    </span>
                  </div>
                  <h1 className="text-[14px] font-medium">Id Proof</h1>
                  <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                    <label htmlFor="uploadFile"
                      className="bg-[#D9D9D9] px-4 py-1.5 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold">
                      Choose File
                    </label>
                    <input id="uploadFile" type="file" className="hidden" // onChange={(e)=>
                    // setFileName(e.target.files[0] ? e.target.files[0].name : "No file chosen")
                    // }
                    />
                    <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                      {/* {fileName || "No file chosen"} */}
                    </span>
                  </div>

                  <div className=" mt-4 text-sm w-fit flex justify-end">
                    <p className="bg-green-500 px-2 py-1 text-white rounded-lg">
                      View Document History
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-3 items-center justify-between mt-6">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <input type="checkbox" className="w-4 h-4" /> Is Active
              </label>
              <div className="flex gap-3">
                <button
                  className="bg-[#0A2478] text-white w-[92px] h-[32px] rounded hover:bg-[#081c5b]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Save
                </button>
                <button
                  className="bg-[#C1121F] text-white w-[92px] h-[32px] rounded hover:bg-[#a00e18]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Exit
                </button>
              </div>
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
                <th className="px-4 py-2 text-left border-r">Employee</th>
                <th className="px-4 py-2 text-left border-r">Name</th>
                <th className="px-4 py-2 text-left border-r">Email</th>
                <th className="px-4 py-2 text-left border-r">Mobile</th>
                <th className="px-4 py-2 text-left border-r">DOJ</th>
                <th className="px-4 py-2 text-left border-r">DOB</th>
                <th className="px-4 py-2 text-left border-r">Address</th>
                <th className="px-4 py-2 text-left border-r">Action</th>
                <th className="px-4 py-2 text-left border-r">Active</th>





              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{row.employee}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.mobile}</td>
                  <td className="px-4 py-2">{row.doj}</td>
                  <td className="px-4 py-2">{row.dob}</td>
                  <td className="px-4 py-2">{row.address}</td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-2">
                      <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center  p-0.5 justify-center">
                        <img src={GroupData} alt="logout" className="w-[18px] h-[18px]" />
                      </div>

                      <div className="w-[17px] h-[17px] bg-red-400 rounded-[2.31px] flex items-center  p-0.5 justify-center">
                        <img src={DeleteData} alt="delete" className="w-[12px] h-[14px]" />
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-4 py-2">
                                        <div className="flex items-center gap-2 justify-center">
                                            <img src={GroupData} alt="edit" className="w-[18px] h-[18px] bg-green-400 p-0.5  cursor-pointer" />
                                            <img src={EyeData} alt="view" className="w-[18px] h-[18px] bg-blue-400 p-0.5  cursor-pointer" />
                                            <img src={DeleteData} alt="delete" className="w-[18px] h-[18px] bg-red-400  p-0.5 cursor-pointer" />
                                        </div>
                                    </td> */}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleToggle(row.id)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${row.isActive ? "bg-[#0A2478]" : "bg-gray-300"}`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${row.isActive ? "translate-x-6" : "translate-x-0"}`}
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
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2 mt-4">
        <button className="px-3 py-1 border rounded-md">Previous</button>
        <div className="flex gap-2">
          <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">3</button>
          <span className="px-3 py-1">...</span>
          <button className="px-3 py-1 border rounded-md">10</button>
        </div>
        <button className="px-3 py-1 border rounded-md">Next</button>
      </div>
    </div>
  );
};

export default EmployeeProfile;
