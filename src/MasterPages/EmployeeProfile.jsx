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
            email:"sakshi.chaudhari@sluwant.com",
            mobile: "4217845963",
            doj: "14-05-2025",
            dob: "45-03-2025",
            address:"Sakshi Arjun Chaudhari,N41/CF 1-1-6,Shivshakti Chowk,Cidco,Nashik",
            isActive: true,
        },
        {
            id: 2,
            employee: "",
            name: "Sakshi Chaudhari",
            email:"sakshi.chaudhari@sluwant.com",
            mobile: "4217845963",
            doj: "14-05-2025",
            dob: "45-03-2025",
            address:"Sakshi Arjun Chaudhari,N41/CF 1-1-6,Shivshakti Chowk,Cidco,Nashik",
            isActive: true,
        },
        {
            id: 3,
            employee: "",
            name: "Sakshi Chaudhari",
            email:"sakshi.chaudhari@sluwant.com",
            mobile: "4217845963",
            doj: "14-05-2025",
            dob: "45-03-2025",
            address:"Sakshi Arjun Chaudhari,N41/CF 1-1-6,Shivshakti Chowk,Cidco,Nashik",
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
         
             

            {/* Modal */}
            {isModalOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm mt-2 p-1 rounded-md w-full mx-auto pl-[120px] pr-[120px] h-full">
                    {/* <div className="bg-white w-[717px] rounded-lg shadow-lg h-[340px] p-10"> */}
                         <h2 className="text-[#0A2478] text-[20px] font-semibold font-source mb-4">
                            Add Charges Profile
                        </h2>
                           {/* personal information */}
                                <div className="bg-white mt-2 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
                                       <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
                                         Personal Information
                                       </p>
                               
                                       <div className="flex justify-between gap-5">
                                         <div>
                                           <div className="grid grid-cols-4 gap-6">
                                             <div>
                                               <label className="text-[14px] font-medium">PAN No.</label>
                                               <div className="flex items-center mt-1 w-full max-w-sm">
                                                 {/* Input with icon inside */}
                                                 <div className="relative flex-1">
                                                   <input
                                                     type="text"
                                                     placeholder="Enter PAN"
                                                     className="border border-[#C4C4C4] border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                                   />
                                                   {/* File attach icon */}
                                                   <FaPaperclip
                                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                                     size={16}
                                                   />
                                                 </div>
                                                 {/* Verify button */}
                                                 <button className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]">
                                                   Verify
                                                 </button>
                                               </div>
                                             </div>
                               
                                             {/* Aadhaar */}
                                             <div>
                                               <label className="text-[14px] font-medium">
                                                 Aadhar Number*
                                               </label>
                               
                                               <div className="flex items-center mt-1 w-[150px] max-w-sm">
                                                 {/* Input with icon inside */}
                                                 <div className="relative flex-1">
                                                   <input
                                                     type="text"
                                                     placeholder="Enter Aadhaar"
                                                     className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-[150px] pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                                   />
                                                   {/* File attach icon */}
                                                   <FaPaperclip
                                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                                     size={16}
                                                   />
                                                 </div>
                                                 {/* Verify button */}
                                                 <button className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]">
                                                   Verify
                                                 </button>
                                               </div>
                                             </div>
                               
                                             {/* Print Name */}
                                             <div>
                                               <label className="text-[14px] font-medium"> Name*</label>
                                               <input
                                                 type="text"
                                                 placeholder="Customer Full Name"
                                                 className="border border-gray-300 px-3 py-2 mt-1 w-[250px] rounded-[8px] bg-white"
                                               />
                                             </div>
                               
                                             {/* Employee Id */}
                                             <div>
                                               <label className="text-[14px] font-medium">Employee Id</label>
                                               <input
                                                 type="text"
                                                 placeholder="Enter Employee Id"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                         </div>
                                              {/* Email Id */}
                                            <div>
                                               <label className="text-[14px] font-medium">Email Id</label>
                                               <input
                                                 type="email"
                                                 placeholder="Enter Email Id"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    
                                    {/* Corresponding addresss */}
                                            <div>
                                               <label className="text-[14px] font-medium">Corresponding Address</label>
                                               <input
                                                 type="text"
                                                 placeholder="Enter Address"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                           </div>

                                    <div>
                                        <input type="radio"/>
                                                 <h2>Permenent address coresponding as a same address?</h2>
                                            </div>
                                    
                                     {/* Permantent addresss */}
                                            <div>
                                               <label className="text-[14px] font-medium">Permenent Address</label>
                                               <input
                                                 type="text"
                                                 placeholder="Enter Address"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    
                                            <div>
                                               <label className="text-[14px] font-medium">Branch</label>
                                               <input
                                                 type="text"
                                                 placeholder="Enter Branch"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                             </div>
                               
                               
                                             
                               
                                            
                                               
                               
                                             {/* Mobile */}
                                             <div>
                                               <label className="text-[14px] font-medium">
                                                 Mobile No.*
                                               </label>
                                               <input
                                                 type="text"
                                                 placeholder="Enter  Mobile"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    

                                                                                 {/* Alternate Mobile */}
                                             <div>
                                               <label className="text-[14px] font-medium">
                                                 Mobile No.*
                                               </label>
                                               <input
                                                 type="text"
                                                 placeholder="Enter Alternative Mobile"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    <div>
                                               <label className="text-[14px] font-medium">
                                                 Date of Joining (dd-mm-yy)*
                                               </label>
                                               <input
                                                 type="date"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    
                                    <div>
                                               <label className="text-[14px] font-medium">
                                                 Designation
                                               </label>
                                               <input
                                                 type="date"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                             </div>
                               
                                             {/* DOB */}
                                             <div>
                                               <label className="text-[14px] font-medium">
                                                 Date of Birth (dd-mm-yy)*
                                               </label>
                                               <input
                                                 type="date"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                             </div>
                               
                                            
                                    <div>
                                               <label className="text-[14px] font-medium">
                                                 Assign Role*
                                               </label>
                                               <input
                                                 type="text"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    
                               
                                    <div>
                                               <label className="text-[14px] font-medium">
                                                 password
                                               </label>
                                               <input
                                                 type="password"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    
                                    
                                    <div>
                                               <label className="text-[14px] font-medium">
                                                Fax
                                               </label>
                                               <input
                                                 type="text"
                                                 className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                                               />
                                    </div>
                                    
                                           
                                           </div>
                                         </div>
                                         <div>
                                           <div className="flex justify-center">
                                             <img
                                               src={profileempty}
                                               alt="logout"
                                               className="w-[156px] h-[156px]"
                                             />
                                           </div>
                               
                                           <div className="flex justify-center mt-2 mb-2">
                                             <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
                                               Upload Customer Profile
                                             </label>
                                           </div>
                               
                                           <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                                             <label
                                               htmlFor="uploadFile"
                                               className="bg-[#D9D9D9] px-4 py-2 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold"
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
                                <h1>Add Proof</h1>
                                <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                                             <label
                                               htmlFor="uploadFile"
                                               className="bg-[#D9D9D9] px-4 py-2 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold"
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
                                <h1>Id Proof</h1>
                                 <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                                             <label
                                               htmlFor="uploadFile"
                                               className="bg-[#D9D9D9] px-4 py-2 cursor-pointer text-[10px] rounded-l border-r border w-[200px] text-black font-bold"
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
                            {/* </div> */}
                            
                        </div>
                        
                          
                        

                        <div className="flex justify-center  gap-3 my-6">
                            <button
                                className="bg-[#0A2478] text-white w-[92px] h-[30px] rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Save
                            </button>
                            <button
                                className="bg-[#C1121F] text-white w-[92px] h-[30px] rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Exit
                            </button>
                        </div>
                     </div> 
                </div> 
        
        
        
    )
}
           

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

export default EmployeeProfile ;
