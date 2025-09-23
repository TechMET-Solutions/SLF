// import React from 'react'

// const PurityProfile = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default PurityProfile
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
import Vectorimg from "../assets/deletimg.png";
const PurityProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
const [data, setData] = useState([
  {
    purityName: "24K Gold",
    purityPercent: "99.9%",
    productName: "Gold Bar",
    addedBy: "John Doe",
    view: true,
    edit: true,
    active: true,
  },
  {
    purityName: "22K Gold",
    purityPercent: "91.6%",
    productName: "Gold Ring",
    addedBy: "Jane Smith",
    view: true,
    edit: false,
    active: false,
  },
  {
    purityName: "18K Gold",
    purityPercent: "75%",
    productName: "Gold Chain",
    addedBy: "Mike Johnson",
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
Product Purity profile
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
          <div className="bg-white w-[540px] rounded-lg shadow-lg p-5">
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
            Add New Purity
            </h2>

            {/* Modal Body */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[14px]">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Gold"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div>
                <label className="text-[14px]">
                 Purity Name*<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Purity Name*"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>
              <div>
                <label className="text-[14px]">
                 Purity Percent* <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Purity Percent*"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
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
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Purity Name</th>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Purity Percent</th>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Product Name</th>
          <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added By</th>
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
            <td className="px-4 py-2">{row.purityName}</td>
            <td className="px-4 py-2">{row.purityPercent}</td>
            <td className="px-4 py-2">{row.productName}</td>
            <td className="px-4 py-2">{row.addedBy}</td>

            {/* Action icons */}
            <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
              <div className="flex gap-2 justify-center">
                
                  <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
                    <img src={GroupData} alt="view" className="w-[18px] h-[18px]" />
                  </div>
                
                
                  <div className="w-[17px] h-[17px] bg-[#C5644E] rounded-[2.31px] flex items-center justify-center p-0.5">
                    <img src={Vectorimg} alt="edit" />
                  </div>
               
              </div>
            </td>

            {/* Toggle */}
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

export default PurityProfile;
