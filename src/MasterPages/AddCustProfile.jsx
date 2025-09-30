import { FaPaperclip } from "react-icons/fa";

import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import GroupData from "../assets/Group 124.svg";
import Vectorimg from "../assets/Vectorimg.png";
import profileempty from "../assets/profileempty.png";
import righttick from "../assets/righttick.png";
import send from "../assets/send.svg";

const AddCustProfile = () => {
  const editor = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const bankData = [
    {
      bankName: "HDFC Bank",
      Customer_Name: "sumit pathak",
      Account_No: "323902010133409",
      IFSC: "UBIN0532398",

      Bank_Address: "Bhagur",
      Update_By: "rasika.gade@slunawat.com",
      Update_On: "25-Jul-2025", 
    },
    {
      bankName: "HDFC Bank",
      Customer_Name: "sumit pathak",
      Account_No: "323902010133409",
      IFSC: "UBIN0532398",

      Bank_Address: "Bhagur",
      Update_By: "rasika.gade@slunawat.com",
      Update_On: "25-Jul-2025",
    },
  ];

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
         
            <div className="">
             <div className="flex items-center gap-4 w-full">
  {/* PAN No */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">PAN No.</label>
    <div className="flex items-center mt-1 w-[220px]">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Enter PAN"
          className="border border-[#C4C4C4] border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        />
        <FaPaperclip
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          size={16}
        />
      </div>
      <button className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]">
        Verify
      </button>
    </div>
  </div>

  {/* Aadhaar */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Aadhar Number*</label>
    <div className="flex items-center mt-1 w-[220px]">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Enter Aadhaar"
          className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        />
        <FaPaperclip
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          size={16}
        />
      </div>
      <button className="bg-[#0A2478] text-white px-5 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b]">
        Verify
      </button>
    </div>
  </div>

  {/* Print Name */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Print Name*</label>
    <input
      type="text"
      placeholder="Customer Full Name"
      className="border border-gray-300 px-3 py-2 mt-1 w-[220px] rounded-[8px] bg-white"
    />
  </div>

  {/* Email */}
  <div className="flex flex-col flex-1">
    <label className="text-[14px] font-medium">Email Id</label>
    <input
      type="email"
      placeholder="Enter Email"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
    />
  </div>
</div>

             <div className="flex items-end gap-4 w-full mt-5">
  {/* Mobile Number + OTP Button */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Mobile No.*</label>
    <div className="flex items-center mt-1 w-[220px]">
      <input
        type="text"
        placeholder="Mobile Number"
        className="border border-gray-300 border-r-0 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
      />
      <button className="bg-[#0A2478] text-white px-4 py-2 rounded-r border border-gray-300 border-l-0 hover:bg-[#081c5b] flex items-center gap-2">
        <img src={send} alt="otp" className="w-4 h-4" />
        <span>OTP</span>
      </button>
    </div>
  </div>

  {/* OTP Verification */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Verify OTP</label>
    <div className="relative mt-1 w-[180px]">
      <input
        type="text"
        placeholder="Enter OTP"
        className="border border-gray-300 rounded-[8px] px-3 py-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <img
        src={righttick}
        alt="tick"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-[13px] h-[13px]"
      />
    </div>
  </div>

  {/* Alternate Mobile */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Alternate Mobile No.*</label>
    <input
      type="text"
      placeholder="Enter Alternate Mobile"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[200px] bg-white"
    />
  </div>

  {/* DOB */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Date of Birth (dd-mm-yy)*</label>
    <input
      type="date"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
    />
  </div>

  {/* Gender */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Gender</label>
    <select className="border border-gray-300 rounded px-3 py-2 mt-1 w-[150px] bg-white">
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>
</div>

             

             <div className="flex items-end gap-4 w-full mt-5">
  {/* Marital */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Marital</label>
    <select className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white">
      <option>Single</option>
      <option>Married</option>
    </select>
  </div>
 <div className="flex flex-col flex-1">
    <label className="text-[14px] font-medium">GST No.</label>
    <input
      type="text"
      placeholder="Enter GST No."
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-white"
    />
                </div>
                
                <div className="flex flex-col">
    <label className="text-[14px] font-medium">Religious Belief</label>
    <select className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[96px] bg-white">
      <option>Single</option>
      <option>Married</option>
    </select>
                </div>
                
                 <div className="flex flex-col">
    <label className="text-[14px] font-medium">Education</label>
    <select className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[211px] bg-white">
      <option>Single</option>
      <option>Married</option>
    </select>
                </div>
                <div className="flex flex-col flex-1">
    <label className="text-[14px] font-medium">Occupation *</label>
    <input
      type="text"
      placeholder="Employee."
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[158px] bg-white"
    />
                </div>

                <div className="flex flex-col">
    <label className="text-[14px] font-medium">Party Type</label>
    <select className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[140px] bg-white">
      <option>Single</option>
      <option>Married</option>
    </select>
                </div>
  {/* Age */}
  {/* <div className="flex flex-col">
    <label className="text-[14px] font-medium">Age</label>
    <input
      type="number"
      placeholder="Enter Age"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[120px] bg-white"
    />
  </div> */}

  {/* GST */}
 
</div>


               <div className="flex items-end gap-4 w-full mt-5">
  {/* Marital */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Risk Category</label>
    <select className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[146px] bg-white">
      <option>Single</option>
      <option>Married</option>
    </select>
  </div>
 <div className="flex flex-col flex-1">
    <label className="text-[14px] font-medium">First Name.</label>
    <input
      type="text"
      placeholder="Customer First Name"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[148px] bg-white"
    />
                </div>
                
                <div className="flex flex-col">
    <label className="text-[14px] font-medium">Middle Name</label>
   <input
      type="text"
      placeholder="Customer Middle Name"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[148px] bg-white"
    />
                </div>
                
                  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Last Name</label>
   <input
      type="text"
      placeholder="Customer Last Name"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[148px] bg-white"
    />
                </div>
                
                 <div className="flex flex-col">
    <label className="text-[14px] font-medium">Father/Husbands First Name</label>
   <input
      type="text"
      placeholder="Father/Husbands First Name"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[184px] bg-white"
    />
                </div>

                 <div className="flex flex-col">
    <label className="text-[14px] font-medium">Father/Husbands Middle Name</label>
   <input
      type="text"
      placeholder="Father/Husbands Middle Name"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[184px] bg-white"
    />
                </div>
  
 
              </div>
              
<div className="flex gap-6 mt-5">
  {/* Father/Husband's Last Name */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Father/Husband's Last Name</label>
    <input
      type="text"
      placeholder="Customer Last Name"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[200px] bg-white"
    />
  </div>

  {/* Landline Number */}
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">Landline Number</label>
    <input
      type="text"
      placeholder="+91 9658426853"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
    />
  </div>

  {/* Politically Exposed Person */}
  <div className="flex flex-col mt-2">
    <label className="text-[14px] font-medium">Politically Exposed Person?</label>
    <div className="flex items-center gap-4 mt-2">
      <label className="flex items-center gap-2">
        <input type="radio" name="pep" value="yes" className="cursor-pointer" />
        Yes
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="pep" value="no" className="cursor-pointer" />
        No
      </label>
    </div>
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

            <div className="flex justify-center mt-5 mb-2">
              <label className="font-roboto font-bold text-[16px] leading-[100%] tracking-[0.03em] text-center">
                Upload Customer Profile
              </label>
            </div>

            <div className="flex items-center border border-gray-300 rounded mt-2 w-full">
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

       <div className="bg-[#F7F7FF]  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
       
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
                <label className="text-[14px] font-medium">
                  Resi. since (in years)
                </label>
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
                <label className="text-[14px] font-medium">
                  Business working since( in year)
                </label>
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


      <div className="bg-[#FFE6E6]  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="mt-1">
          <label className="flex items-center gap-2 font-['Roboto'] text-[16px]">
            <input type="radio" name="access2" className="accent-[#0A2478]" />
            <span className="font-['Roboto'] font-normal text-[16px] leading-[100%] tracking-[0.03em] text-[#000000] ">
              Permanent Address same as Correspondence Address?
            </span>
          </label>
        </p>
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-4">
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
        <div className="mt-2">
           <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Area*</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[243px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    <div className="p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
  <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
    Additional Documents
  </p>

  <div className="flex items-center gap-4">
    {/* Address Proof */}
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Address Proof*</label>
      <select className="border border-gray-300 px-3 py-2 mt-1 w-[200px] bg-white rounded-[8px]">
        <option>Passport</option>
        <option>Aadhar</option>
        <option>Driving License</option>
      </select>
    </div>

    {/* Address Details */}
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Any Details</label>
      <input
        type="text"
        placeholder="0000 0000 0000"
        className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
      />
    </div>

    {/* ID Proof */}
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">ID Proof*</label>
      <select className="border border-gray-300 px-3 py-2 mt-1 w-[200px] bg-white rounded-[8px]">
        <option>PAN Card</option>
        <option>Voter ID</option>
        <option>Other</option>
      </select>
    </div>

    {/* ID Details */}
    <div className="flex flex-col">
      <label className="text-[14px] font-medium">Any Details</label>
      <input
        type="text"
        placeholder="Any Details"
        className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
      />
    </div>

    {/* Upload Button */}
    <div className="mt-6">
      <button className="w-[180px] h-[40px] border rounded-[8px] bg-[#0A2478] text-[12px] text-white flex justify-center items-center gap-2">
        <p>Upload Document</p>
        <MdOutlineFileUpload />
      </button>
    </div>
        </div>
        <div className="flex items-center gap-4 mt-5">
  <div className="flex flex-col">
      <label className="text-[14px] font-medium">Reference 1</label>
      <input
        type="text"
        placeholder=""
        className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
      />
    </div>

      <div className="flex flex-col">
      <label className="text-[14px] font-medium">Reference 2</label>
      <input
        type="text"
        placeholder=""
        className="border border-gray-300 px-3 py-2 mt-1 w-[200px] rounded-[8px] bg-white"
      />
    </div>
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
     

    
      

     

     

     

      <div className="p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px] bg-[#F7F7FF]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4 mt-5">
          Remark
        </p>

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-auto mb-5">
          <div className="flex justify-between">
            <p className="font-[Source_Sans_3] font-semibold text-[14px] leading-[14px] tracking-[0em] underline">
              Bank Details
            </p>
            <button className="w-[72.7px] h-[33.7px] bg-[#0A2478] text-white rounded-[3.12px] px-[9.36px] flex items-center justify-center gap-[7.8px] text-[14px] font-[Source_Sans_3] font-semibold"  onClick={() => setIsModalOpen(true)}>
              Add New
            </button>
          </div>
          <table className="w-full border-collapse mt-5">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Bank Name
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Customer Name
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Account No
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  IFSC
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Cancelled Cheques
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Bank Address
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Update By
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">
                  Update On
                </th>
                <th className="px-4 py-2 text-left text-[13px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {bankData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{row.bankName}</td>
                  <td className="px-4 py-2">{row.Customer_Name}</td>
                  <td className="px-4 py-2">{row.Account_No}</td>
                  <td className="px-4 py-2">{row.IFSC}</td>
                  <td className="px-4 py-2">download</td>
                  <td className="px-4 py-2">{row.Bank_Address}</td>
                  <td className="px-4 py-2">{row.Update_By || "-"}</td>
                  <td className="px-4 py-2">{row.Update_On || "-"}</td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-2 justify-center">
                      <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
                        <img
                          src={GroupData}
                          alt="view"
                          className="w-[18px] h-[18px]"
                        />
                      </div>

                      <div className="w-[17px] h-[17px] bg-[#C5644E] rounded-[2.31px] flex items-center justify-center p-0.5">
                        <img src={Vectorimg} alt="edit" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[896px]  rounded-lg shadow-lg h-[322px] p-10">
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
             Add Bank Details
            </h2>

            <div className=" gap-4">
              <div className="flex gap-2"> <div>
                <label className="text-[14px] ">
                 Bank Name* <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Bank Name"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "238px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                />
              </div>
               <div>
                <label className="text-[14px] ">
                Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Bank Name"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "300px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                />
              </div>
               <div>
                <label className="text-[14px] ">
                Account No<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Bank Name"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "238px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                />
              </div></div>
              <div className="flex mt-5 gap-2">
                <div>
                {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                <label className="text-[14px] ">
                 IFSC Code* <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="IFSC Code"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "238px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                />
                {/* <select
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  style={{
                    width: "280px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                >
                  <option>Balance Sheet</option>
                  <option>Income Statement</option>
                </select> */}
              </div>
              <div>
                {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                <label className="text-[14px] ">
                 Bank Address<span className="text-red-500"></span>
                </label>
               <input
                  type="text"
                  placeholder="Address"
                  className="border border-gray-300 rounded"
                  style={{
                    width: "300px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                />

                {/* <select
                  className="border border-gray-300 rounded px-2 py-1 w-full mt-1 text-[12px]"
                  style={{
                    width: "300px",
                    height: "38px",
                    padding: "10px 14px",
                    borderRadius: "5px",
                    borderWidth: "1px",
                    opacity: 1,
                  }}
                >
                  <option>Balance Sheet</option>
                  <option>Income Statement</option>
                </select> */}
              </div>
              <div>
                {/* <label className="text-[12px] font-medium">Account Type *</label> */}
                <label className="text-[14px] ">
                 Attached Cancel Cheque <span className="text-red-500"></span>
                </label>
                 <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
              <label
  htmlFor="uploadFile"
  className="bg-[#D9D9D9] px-4 py-2 cursor-pointer text-[12px] rounded-l border-r border w-[200px] text-black font-[Source_Sans_3] font-semibold leading-[100%] tracking-[0.03em]"
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
    </div>
  );
};

export default AddCustProfile;
