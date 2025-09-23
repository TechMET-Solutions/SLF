import { useState } from "react";

import GroupData from "../assets/Group 124.svg";
const AccountGroupList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [data] = useState([
    {
      groupName: "Recoverable",
      appForm: "29-05-2025",
      comments: "TDS of interest on FDR",
      under: "Balance sheet",
      addByEmail: "mjpl@mareakat.com",
      docPercentOfLoanAmt: 0,
      addOn: "22-09-2017",
      modifyBy: "",
      edit: true,
    },
    {
      groupName: "IND 95",
      appForm: "29-05-2025",
      comments: "Test",
      under: "Profit & loss",
      addByEmail: "mjpl@mareakat.com",
      docPercentOfLoanAmt: 0,
      addOn: "22-09-2017",
      modifyBy: "",
      edit: true,
    },
    {
      groupName: "IND 95",
      appForm: "29-05-2025",
      comments: "",
      under: "Balance sheet",
      addByEmail: "mjpl@mareakat.com",
      docPercentOfLoanAmt: 0,
      addOn: "22-09-2017",
      modifyBy: "",
      edit: true,
    },
  ]);

  return (
    <div className=" min-h-screen w-full">

     
      
      {/* middletopbar */}
      <div className="flex justify-center ">
          {/* <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around shadow">
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
  Account Group List
</h2>

          <div className="flex gap-5 ">
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
  Account Type
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
 Account Group
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
            </div>
            <div className="flex justify-end">
 <div className="flex  item-center gap-5 justify-end">
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
        </div> */}
       <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
  {/* Left heading */}
  <h2
    style={{
      fontFamily: "Source Sans 3, sans-serif",
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "148%",
      letterSpacing: "0em",
    }}
    className="text-red-600"
  >
    Account Group List
  </h2>

  {/* Right section (search + buttons) */}
  <div className="flex items-center gap-6">
    {/* Search section */}
    <div className="flex gap-5 ">
      <div className="flex gap-3 items-center">
        <p className="text-[11.25px] font-source">Account Type</p>
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

      <div className="flex gap-3 items-center">
        <p className="text-[11.25px] font-source">Account Group</p>
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
    </div>

    {/* Buttons stuck to right */}
    <div className="flex gap-3">
      <button
        style={{
          width: "74px",
          height: "24px",
          borderRadius: "3.75px",
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
  Add New Account Group
</h2>


            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[14px] ">Group Name <span className="text-red-500">*</span></label>
               <input
  type="text"
  placeholder="Interest Accrued on FDR"
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
                  <label className="text-[14px] ">Account Type <span className="text-red-500">*</span></label>
                {/* <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  placeholder="Enter Account Type"
                /> */}

                <input
  type="text"
   placeholder="Current Assets"
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
                <label className="text-[12px] font-medium">Under</label>
                <select className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]" style={{
    width: "280px",
    height: "38px",
    padding: "10px 14px",
    borderRadius: "5px",
    borderWidth: "1px",
    opacity: 1,
  }}>
                  <option>Balance Sheet</option>
                  <option>Income Statement</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-medium">Comments</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  placeholder="Test"
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
  Save
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
  Exit
</button>

            </div>

              </div>

           
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex justify-center ">
 <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Group Name</th>
<th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">App form</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Comments</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Under</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added by Email</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Doc % Of Loan Amt</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added On</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified On</th>
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
                  <td className="px-4 py-2">{row.groupName}</td>
                  <td className="px-4 py-2">{row.appForm}</td>
                  <td className="px-4 py-2">{row.comments}</td>
                  <td className="px-4 py-2">{row.under}</td>
                  <td className="px-4 py-2">{row.addByEmail}</td>
                  <td className="px-4 py-2">{row.docPercentOfLoanAmt}</td>
                  <td className="px-4 py-2">{row.addOn}</td>
                  <td className="px-4 py-2">{row.modifyBy}</td>
                 <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
  <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center  p-0.5 justify-center">
    <img src={GroupData} alt="logout" className="w-[18px] h-[18px]" />
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

export default AccountGroupList;
