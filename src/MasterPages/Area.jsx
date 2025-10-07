// import React from 'react'

// const Area = () => {
//   return (
//     <div>
//      <div className="flex justify-center ">
//         <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//           {/* Left heading */}
//           <h2
//             style={{
//               fontFamily: "Source Sans 3, sans-serif",
//               fontWeight: 700,
//               fontSize: "20px",
//               lineHeight: "148%",
//               letterSpacing: "0em",
//             }}
//             className="text-red-600"
//           >
//             Area
//           </h2>

//           {/* Right section (search + buttons) */}
//           <div className="flex items-center gap-6">
//             {/* Search section */}

//             {/* Buttons stuck to right */}
//             <div className="flex gap-3">
//               <button
//                 style={{
//                   width: "74px",
//                   height: "24px",
//                   borderRadius: "3.75px",
//                 }}
//                 // onClick={() => setIsModalOpen(true)}
//                 className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
//               >
//                 Add
//               </button>

//               <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Area

import { useState } from "react";
const Area = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
   const [data, setData] = useState([
    {
      number: 1,
      area: "MG Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      landmark: "Near Bus Stand",
    },
    {
      number: 2,
      area: "Brigade Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      landmark: "Opposite Mall",
    },
    {
      number: 3,
      area: "Connaught Place",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      landmark: "Central Park",
    },
    {
      number: 4,
      area: "Marine Drive",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002",
      landmark: "Sea View",
    },
    {
      number: 5,
      area: "Park Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016",
      landmark: "Near Church",
    },
  ]);

  return (
    <div className=" min-h-screen w-full">

     
      
     
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
Area
</h2>

          <div className="flex gap-3">
            
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
        <div  className="fixed inset-0 flex items-center justify-center z-50"
    style={{
      background: "#0101017A",
      backdropFilter: "blur(6.8px)",
    }}>
          <div className="bg-white w-[717px] p-6 rounded-lg shadow-lg h-[322px] p-10">
           <h2
  className="text-[#0A2478] mb-4"
  style={{
    fontFamily: "Source Sans 3, sans-serif",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "0%",
  }}
>
 Add Area
</h2>


            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[14px] ">Area / Locality <span className="text-red-500">*</span></label>
               <input
  type="text"
  placeholder="Enter area or locality"
  className="border border-gray-300 rounded"
  style={{
    width: "280px",
    height: "38px",
    padding: "10px 14px",
    borderRadius: "5px",
    borderWidth: "1px",
    opacity: 1,
  }}
/>

              </div>
            <div>
                <label className="text-[14px] ">City <span className="text-red-500">*</span></label>
               <input
  type="text"
  placeholder="Eg.Nashik"
  className="border border-gray-300 rounded"
  style={{
    width: "280px",
    height: "38px",
    padding: "10px 14px",
    borderRadius: "5px",
    borderWidth: "1px",
    opacity: 1,
  }}
/>

              </div>
             <div>
                {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                  <label className="text-[14px] ">State <span className="text-red-500"></span></label>
                {/* <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  placeholder="Enter Account Type"
                /> */}

                <select className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]" style={{
    width: "280px",
    height: "38px",
    padding: "10px 14px",
    borderRadius: "5px",
    borderWidth: "1px",
    opacity: 1,
  }}>
                  <option>Maharashtra</option>
                  <option>Goa</option>
                </select>

              </div>
             <div>
                <label className="text-[14px] ">Pincode <span className="text-red-500">*</span></label>
               <input
  type="text"
  placeholder="Pincode"
  className="border border-gray-300 rounded"
  style={{
    width: "280px",
    height: "38px",
    padding: "10px 14px",
    borderRadius: "5px",
    borderWidth: "1px",
    opacity: 1,
  }}
/>

              </div>
            </div>
            <div className="flex justify-center gap-5 items-center">

 <div className="flex justify-end gap-3 mt-6 item-center">
             <button
  className="bg-[#0A2478] text-white"
  style={{
    width: "92.66px",
    height: "30.57px",
    borderRadius: "4.67px",
  
    opacity: 1,
  }}
  onClick={() => setIsModalOpen(false)}
>
Submit
</button>

            <button
  className="text-white"
  style={{
    backgroundColor: "#C1121F",
    width: "92.66px",
    height: "30.57px",
    borderRadius: "4.67px",
  
    opacity: 1,
  }}
  onClick={() => setIsModalOpen(false)}
>
  Close
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
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Sr No</th>
<th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Area/Locality</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]"> City</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">State</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Pin code</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Landmark</th>
              
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
      key={index}
      className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
    >
      <td className="px-4 py-2">{row.number}</td>
      <td className="px-4 py-2">{row.area}</td>
      <td className="px-4 py-2">{row.city}</td>
      <td className="px-4 py-2">{row.state}</td>
      <td className="px-4 py-2">{row.pincode}</td>
      <td className="px-4 py-2">{row.landmark}</td>
      
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

export default Area;
