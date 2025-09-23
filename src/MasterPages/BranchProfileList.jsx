// import React from 'react'

// const BranchProfileList = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default BranchProfileList

import { useState } from "react";
import GroupData from "../assets/Group 124.svg";
import Vectorimg from "../assets/Vectorimg.png";
const BranchProfileList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [data] = useState([
  {
    "branchCode": "BR001",
    "branchName": "Main Branch",
    "branchAddress1": "123 Main Street",
    "branchAddress2": "Downtown",
    "branchPhone": "123-456-7890",
    "branchLead": "John Doe",
    "branchAddon": "Addon Info",
    "view": true,
    "edit": true
  },
  {
    "branchCode": "BR002",
    "branchName": "Secondary Branch",
    "branchAddress1": "456 Elm Street",
    "branchAddress2": "Uptown",
    "branchPhone": "987-654-3210",
    "branchLead": "Jane Smith",
    "branchAddon": "Addon Info",
    "view": true,
    "edit": false
  }
]
);

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
Branch profile List
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
 Code
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
 Name
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
          <div className="bg-white w-[752px] rounded-lg shadow-lg p-5">
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
              Add Branch Details
            </h2>

            {/* Modal Body */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[14px]">
                  Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Branch Code"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div>
                <label className="text-[14px]">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Branch Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div>
                <label className="text-[14px]">
                  Print Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Print Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>

              <div>
                <label className="text-[14px]">
                  Address  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
            
              <div>
                <label className="text-[14px]">
                  Address 3 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Address Line 3"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>

             
              <div>
                <label className="text-[14px]">
                  Mobile No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="+91 8456645752"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
             <div>
  <label className="text-[14px]">Lead Person</label>
  <select
    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
    defaultValue=""
  >
    <option value="" disabled>
      Select Lead Person
    </option>
    <option value="john">John Doe</option>
    <option value="mary">Mary Smith</option>
    <option value="alex">Alex Johnson</option>
  </select>
</div>


              <div className="flex items-center mt-4">
                <input type="checkbox" className="mr-2" />
                <label className="text-[14px]">Is Main <span className="text-red-500">*</span></label>
              </div>
              <div className="flex items-center mt-4">
                <input type="checkbox" className="mr-2" />
                <label className="text-[14px]">Status <span className="text-red-500">*</span></label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-[#0A2478] text-white px-5 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
              <button
                className="bg-[#C1121F] text-white px-5 py-2 rounded"
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
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Code</th>
<th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]"> Branch Address</th>
                
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Phone</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Branch Lead</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added on</th>
               <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Action</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Active</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
              <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
        <td className="px-4 py-2">{row.branchCode}</td>
        <td className="px-4 py-2">{row.branchName}</td>
        <td className="px-4 py-2">{row.branchAddress1}</td>
        
        <td className="px-4 py-2">{row.branchPhone}</td>
        <td className="px-4 py-2">{row.branchLead}</td>
        <td className="px-4 py-2">{row.branchAddon}</td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    
                    <div className="flex gap-2 justify-center">
 <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center  p-0.5 justify-center">
            <img src={GroupData} alt="logout" className="w-[18px] h-[18px]" />
                      </div>
                      
                      <div className="w-[17px] h-[17px] bg-[#646AD9] rounded-[2.31px] flex items-center  p-0.5 justify-center">
            <img src={Vectorimg} alt="logout" className="" />
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

export default BranchProfileList;
