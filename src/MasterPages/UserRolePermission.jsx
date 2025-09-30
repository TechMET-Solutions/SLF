// import React from 'react'

// const UserRolePermission = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default UserRolePermission

import { useState } from "react";
import GroupData from "../assets/Group 124.svg";

import { useNavigate } from "react-router-dom";
import Rights from "../assets/Rights.png";
const UserRolePermission = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
     const navigate = useNavigate();
const [data, setData] = useState([
  {
    name: "emp",
    SystemName: "abc",
    addedBy: "John Doe",
    addedOn: "2025-09-20",
    modifiedBy: "Jane Smith",
    modifiedOn: "2025-09-21",
    view: true,
    edit: true,
    active: true,
  },
  {
    name: "emp",
    SystemName: "abcd",
    addedBy: "Alice Johnson",
    addedOn: "2025-09-18",
    modifiedBy: "Bob Williams",
    modifiedOn: "2025-09-19",
    view: true,
    edit: false,
    active: false,
  },
  {
    name: "emp",
    SystemName: "abcde",
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
User Role List & Role Permission
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
       Add New User Group
      </h2>

      {/* Modal Body */}
      <div className="flex gap-4">
        {/* Proof Type Dropdown */}
        {/* <div>
          <label className="text-[14px]">
            Proof Type Name <span className="text-red-500">*</span>
          </label>
          <select className="border border-gray-300 rounded px-3 py-2 mt-1 w-full">
            <option value="">Proof type name</option>
            <option value="aadhar">Aadhar Card</option>
            <option value="pan">PAN Card</option>
            <option value="dl">Driving License</option>
          </select>
        </div> */}

        {/* Number Input */}
        <div>
          <label className="text-[14px]">
           Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </div>
         <div>
          <label className="text-[14px]">
          System Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="ABC"
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </div>

                    
                        

        
      </div>
 <div className="flex gap-10  justify-center items-center mt-5">
  <div className="flex items-center space-x-2">
    <label htmlFor="idProof" className="text-[14px]">Is System Role *</label>
    <input type="checkbox" id="idProof" className="w-[24px] h-[24px]" />
  </div>

  <div className="flex items-center space-x-2">
    <label htmlFor="addressProof" className="text-[14px]">Is Active *</label>
    <input type="checkbox" id="addressProof" className="w-[24px] h-[24px]" />
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


      {/* Table */}
     <div className="flex  pl-[110px]">
  <div className="overflow-x-auto mt-5 w-[984px] h-[500px]">
    <table className="w-full border-collapse">
      <thead className="bg-[#0A2478] text-white text-sm">
        <tr>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[320px]">Name</th>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[363px]">SystemName</th>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[92px]"> Active</th>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[98px]">Action</th>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[98px]">Rights</th>
          
        </tr>
      </thead>
      <tbody className="text-[12px]">
        {data.map((row, index) => (
          <tr
            key={index}
            className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.SystemName}</td>
                 <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
              <button
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  row.active ? "bg-[#0A2478]" : "bg-gray-400"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    row.active ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </td>
 <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
              <div className="flex gap-2 justify-center">
                
                  <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
                    <img src={GroupData} alt="view" className="w-[18px] h-[18px]" />
                  </div>
               
               
              </div>
            </td>

                
           <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
              <div className="flex gap-2 justify-center">
                
                  <div className="bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
      <img
        src={Rights}
        alt="view"
        className="w-[18px] h-[18px] cursor-pointer"
        onClick={() => navigate("/User-Role")}
      />
    </div>
               
               
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

export default UserRolePermission;
