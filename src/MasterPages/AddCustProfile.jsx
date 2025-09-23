import { FaPaperclip } from "react-icons/fa";

import profileempty from "../assets/profileempty.png";

import send from "../assets/send.svg";

import righttick from "../assets/righttick.png";

const AddCustProfile = () => {
  return (
    <div>
      <div className="flex justify-center ">
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
            Add Customer Profile Form
          </h2>

          {/* Right section (search + buttons) */}
          <div className="flex items-center gap-6">
            {/* Search section */}

            {/* Buttons stuck to right */}
            <div className="flex gap-3">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                }}
                // onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                save
              </button>

              <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* personal information */}
      <div className="bg-[#FFE6E6] mt-2 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
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
                <label className="text-[14px] font-medium">Print Name*</label>
                <input
                  type="text"
                  placeholder="Customer Full Name"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[250px] rounded-[8px] bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[14px] font-medium">Email Id</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="text-[14px] font-medium">Mobile No.*</label>
                <div className="flex items-center mt-1 w-[150px] max-w-sm">
                  {/* Input with icon inside */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-[180px] pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                  </div>
                  {/* Verify button */}

                  <button className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]">
                    <div className="flex gap-2 justify-center">
                      <img src={send} alt="logout" className="" />
                      <span>OTP</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="relative w-full mt-7">
                <input
                  type="text"
                  placeholder="Verify OTP"
                  className="border border-gray-300 rounded-[8px] px-3 py-2 w-full pr-10 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <img
                  src={righttick}
                  alt="tick"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px]"
                />
              </div>

              {/* Alternate Mobile */}
              <div>
                <label className="text-[14px] font-medium">
                  Alternate Mobile No.*
                </label>
                <input
                  type="text"
                  placeholder="Enter Alternate Mobile"
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

              {/* Gender */}
              <div>
                <label className="text-[14px] font-medium">Gender</label>
                <select className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Marital */}
              <div>
                <label className="text-[14px] font-medium">Marital</label>
                <select className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white">
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="text-[14px] font-medium">Age</label>
                <input
                  type="number"
                  placeholder="Enter Age"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
                />
              </div>

              {/* GST */}
              <div>
                <label className="text-[14px] font-medium">GST No.</label>
                <input
                  type="text"
                  placeholder="Enter GST No."
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
          </div>
        </div>
      </div>
      {/* Documents */}

      <div className="bg-[#F7F7FF] p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
          Documents
        </p>
        <div className="flex gap-3">
          <div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">Party Type</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[140px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Risk Category</label>
              </div>

              <select className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[146px] bg-white">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Customer Id</label>
              </div>

              <input
                type="text"
                placeholder="Customer Id"
                className="border border-gray-300 px-3 py-2 mt-1 w-[179px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">First Name</label>
              </div>

              <input
                type="text"
                placeholder="Customer First Name"
                className="border border-gray-300 px-3 py-2 mt-1 w-[244px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Middle Name</label>
              </div>

              <input
                type="text"
                placeholder="Customer First Name"
                className="border border-gray-300 px-3 py-2 mt-1 w-[246px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Last Name</label>
              </div>

              <input
                type="text"
                placeholder="Customer First Name"
                className="border border-gray-300 px-3 py-2 mt-1 w-[245px] rounded-[8px] bg-white"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Father/Husbands First Name
                </label>
              </div>

              <input
                type="text"
                placeholder="Father/Husbands First Name "
                className="border border-gray-300 px-3 py-2 mt-1 w-[246px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Father/Husbands Middle Name
                </label>
              </div>

              <input
                type="text"
                placeholder="Father/Husbands Middle Name "
                className="border border-gray-300 px-3 py-2 mt-1 w-[246px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Father/Husbands Last Name
                </label>
              </div>

              <input
                type="text"
                placeholder="Father/Husbands Last Name "
                className="border border-gray-300 px-3 py-2 mt-1 w-[246px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Landline Number
                </label>
              </div>

              <input
                type="text"
                placeholder="Enter Landline Number "
                className="border border-gray-300 px-3 py-2 mt-1 w-[134px] rounded-[8px] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">
                  Religious Belief
                </label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[96px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">Education</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[230px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className=" pl-[115px] pr-[120px] flex  mb-10 gap-[100px] mt-10">
        {/* Header */}
        <p className="font-['Source_Sans_3'] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-2">
          Additional User Access
        </p>

        {/* Question */}
        <p className="mt-1">
          <label className="flex items-center gap-2 font-['Roboto'] text-[16px]">
            <input type="radio" name="access" className="accent-[#0A2478]" />
            <span className="font-['Roboto'] font-normal text-[16px] leading-[100%] tracking-[0.03em] text-[#000000] ">
              Allow Customers to access Mobile App?
            </span>
          </label>
        </p>

        {/* Single radio button */}
      </div>

      <div className="bg-[#FFE6E6] mt-2 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
          Corresponding Address
        </p>

        <div className="flex gap-3">
         

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Address</label>
              </div>

              <input
                type="text"
                placeholder="Address"
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Pincode*</label>
              </div>

              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[131px] rounded-[8px] bg-white"
              />
            </div>
          </div>
<div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">State</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">City</label>
              </div>

              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>

           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Country</label>
              </div>

              <input
                type="text"
                placeholder="Country"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>

         
        </div>
      </div>

      <div className="bg-[#F7F7FF]  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
         <p className="mt-1">
          <label className="flex items-center gap-2 font-['Roboto'] text-[16px]">
            <input type="radio" name="access" className="accent-[#0A2478]" />
            <span className="font-['Roboto'] font-normal text-[16px] leading-[100%] tracking-[0.03em] text-[#000000] ">
             Permanent Address same as Correspondence Address?
            </span>
          </label>
        </p>
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
Permanent Address
        </p>

        <div className="flex gap-3">
         

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Address</label>
              </div>

              <input
                type="text"
                placeholder="Address"
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Pincode*</label>
              </div>

              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[131px] rounded-[8px] bg-white"
              />
            </div>
          </div>
<div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">State</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">City</label>
              </div>

              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>

           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Country</label>
              </div>

              <input
                type="text"
                placeholder="Country"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>

         
        </div>


         <div className="flex gap-3 mt-5">
         

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Resi. Status</label>
              </div>

             <select className="border border-gray-300  px-3 py-2 mt-1 w-[196px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Resi. since (in years)</label>
              </div>

              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[196px] rounded-[8px] bg-white"
              />
            </div>
          </div>
<div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">Category</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Company Type</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[196px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Industry Type</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[196px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Business working since( in year)</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[201px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

         
        </div>
      </div>


      <div className="  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
Address Proof
        </p>

        <div className="flex gap-3">
         

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Address Proof*</label>
              </div>

             <select className="border border-gray-300  px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          
<div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">Any Details</label>
              </div>

                 <input
                type="text"
                placeholder="0000 0000 0000"
                className="border border-gray-300 px-3 py-2 mt-1 w-[196px] rounded-[8px] bg-white"
              />
            </div>
          </div>
         

           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">ID Proof*</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[196px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Any Details</label>
              </div>

               <input
                type="text"
                placeholder="Any Details"
                className="border border-gray-300 px-3 py-2 mt-1 w-[212px] rounded-[8px] bg-white"
              />
            </div>
          </div>

         
        </div>


         <div className="flex gap-3 mt-5">

        </div>
      </div>


         <div className="bg-[#FFE6E6] mt-2 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
         Nominee Details
        </p>

        <div className="flex gap-3">
         

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Nominee*</label>
              </div>

              <input
                type="text"
                placeholder="Nominee Name"
                className="border border-gray-300 px-3 py-2 mt-1 w-[300px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Relation</label>
              </div>

              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[90px] rounded-[8px] bg-white"
              />
            </div>
          </div>


          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Address</label>
              </div>

              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-300 px-3 py-2 mt-1 w-[300px] rounded-[8px] bg-white"
              />
            </div>
          </div>
<div>
            <div className="">
              <div>
                {" "}
                <label className="text-[14px] font-medium">State</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[220px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">City</label>
              </div>

              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 px-3 py-2 mt-1 w-[131px] rounded-[8px] bg-white"
              />
            </div>
          </div>

           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Reference 1</label>
              </div>

              <input
                type="text"
                placeholder="Country"
                className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
              />
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default AddCustProfile;
