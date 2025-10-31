// import React from 'react'

// const CustProfile = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default CustProfile
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupData from "../assets/Group 124.svg";
import msg from "../assets/msg.png";
import print from "../assets/print.png";

import axios from "axios";
import blockimg from "../assets/blockimg.png";
import { formatIndianDate } from "../utils/Helpers";
const CustProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenForRemark, setIsModalOpenForRemark] = useState(false);
 
  const [checkedRows, setCheckedRows] = useState({}); // store checked state per row
  const editor = useRef(null);
   
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  console.log(data, "data")
  const [isModalOpenForBlock, setIsModalOpenForblock] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);


 const handleCheckboxChange = async (row, checked) => {
  setCheckedRows((prev) => ({
    ...prev,
    [row.id]: checked,
  }));

  if (checked) {
    // Open confirmation modal for blocking
    setSelectedCustomer(row);
    setIsModalOpenForblock(true);
  } else {
    // Directly call unblock API
    try {
      await axios.post(`http://localhost:5000/Master/doc/blockUnblockCustomer`, {
        id: row.id,
        block: false,
      });
      alert("Customer unblocked successfully");
    } catch (err) {
      console.error("Error unblocking customer:", err);
      alert("Failed to unblock customer");
    }
  }
};

const handleBlockConfirm = async () => {
  try {
    await axios.post(`http://localhost:5000/Master/doc/blockUnblockCustomer`, {
      id: selectedCustomer.id,
      block: true,
    });
    alert("Customer blocked successfully");
    setIsModalOpenForblock(false);
  } catch (err) {
    console.error("Error blocking customer:", err);
    alert("Failed to block customer");
  }
};
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


const fetchCustomers = async (pageNumber = 1) => {
  try {
    const response = await axios.get(`http://localhost:5000/Master/doc/list?page=${pageNumber}&limit=10`);
    setData(response.data.data);
    setTotalPages(response.data.totalPages);
    setPage(response.data.currentPage);
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
  }
};

  
  useEffect(() => {
    document.title = "SLF | Customer List";
    fetchCustomers();
  }, []);


  const handleOpenRemark = (customer) => {
    setSelectedCustomer(customer);
    setContent(customer.Remark || ""); // prefill if remark exists
    setIsModalOpenForRemark(true);
  };

   const handleNavigateToProfile = (row) => {
  navigate("/Add-Customer-Profile", { 
    state: { 
      customerData: row, 
      type: "edit"  // 👈 indicate edit mode
    } 
  });
};
  return (
    <div className=" min-h-screen w-full">



      {/* middletopbar */}
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
            Customer Profile List
          </h2>

          {/* Right section (search + buttons) */}
          <div className="flex items-center gap-6">
            {/* Search section */}
            <div className="flex gap-5 ">
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Field</p>
                <select
                  style={{
                    width: "168.64px",
                    height: "27.49px",
                    borderRadius: "5px",
                    borderWidth: "0.62px",
                  }}
                  className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
                >
                  <option value="">Select Option</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="dl">Driving License</option>
                  <option value="passport">Passport</option>
                </select>

              </div>

              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Search..."
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
                onClick={() => navigate('/Add-Customer-Profile')}
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
        <div className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}>
          <div className="bg-white w-[717px]  rounded-lg shadow-lg h-[322px] p-10">
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



      {isModalOpenForRemark && (
        <div className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}>
          <div className="bg-white w-[829px]  rounded-lg shadow-lg h-[356px] p-10">
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
              Remark
            </h2>

            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />

            <div className="flex justify-center gap-5 items-center">

              <div className="flex justify-end gap-3 mt-6 item-center">
                

                <button
                  className="text-white"
                  style={{
                    backgroundColor: "#C1121F",
                    width: "92.66px",
                    height: "30.57px",
                    borderRadius: "4.67px",

                    opacity: 1,
                  }}
                  onClick={() => setIsModalOpenForRemark(false)}
                >
                  Exit
                </button>

              </div>

            </div>


          </div>
        </div>
      )}

       {isModalOpenForBlock && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[396px] rounded-lg shadow-lg h-[386px] p-5">
            <div className="flex justify-center items-center mt-2">
              <img src={blockimg} alt="action" className="w-[113px] h-[113px]" />
            </div>
            <div className="mt-10">
              <p className="font-[Source_Sans_3] font-normal text-[21.79px] text-center">
                Are you sure to Block this Customer
              </p>
              <p className="font-[Source_Sans_3] font-normal text-[17.43px] text-center text-[#7C7C7C] mt-2">
                You won’t be able to revert this action
              </p>
            </div>

            <div className="mt-5 grid justify-center">
              <div className="pl-3">
                <button
                  className="bg-[#F11717] text-white font-semibold text-[19.61px] w-[67.53px] h-[30.57px] rounded-[2.67px]"
                  onClick={handleBlockConfirm}
                >
                  Ok
                </button>
              </div>

              <div className="mt-4">
                <button
                  className="text-white text-[19px]"
                  style={{
                    backgroundColor: "#0A2478",
                    width: "100.66px",
                    height: "30.57px",
                    borderRadius: "2.67px",
                  }}
                  onClick={() => setIsModalOpenForblock(false)}
                >
                  Cancel
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
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Customer</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Party UID</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">F Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">M Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">L Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">City</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Mobile Number</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Bad
                  Debtor</th>
                <th className="px-4 py-2 text-left text-[13px]">Added On</th>
                <th className="px-4 py-2 text-left text-[13px]">Added By</th>
                <th className="px-4 py-2 text-left text-[13px]">Block</th>
                <th className="px-4 py-2 text-center text-[13px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                 <td className="px-4 py-2 flex items-center gap-3">
  {/* Profile Image */}
  <img
    src={row.profileImage}
    alt={row.customer}
    className="w-10 h-10 rounded-full object-cover border border-gray-300"
  />

  {/* Customer Name */}
  <span className="font-medium text-gray-800">{row.customer}</span>
</td>

                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.firstName}</td>
                  <td className="px-4 py-2">{row.middleNam}</td>
                  <td className="px-4 py-2">{row.lastName}</td>
                  <td className="px-4 py-2">{row.Permanent_City}</td>
                  <td className="px-4 py-2">{row.mobile}</td>
                  <td className="px-4 py-2 text-center">
  {row.badDebtor ? "True" : "False"}
</td>

                  {/* <td className="px-4 py-2">{row.Added_On}</td> */}
                  <td className="px-4 py-2">{formatIndianDate(row.Added_On)}</td>
                  <td className="px-4 py-2">{row.Added_By}</td>

              <td className="px-4 py-2">
  <input
    type="checkbox"
    className="w-[25px] h-[25px]"
    checked={checkedRows[row.id] ?? row.block === 1}
    onChange={(e) => handleCheckboxChange(row, e.target.checked)}
  />
</td>


                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-5">
                    <div
        className="w-[17px] h-[17px] bg-[#6D5300] rounded-[2.31px] flex items-center justify-center cursor-pointer"
        onClick={() => handleOpenRemark(row)} // pass full row object
      >
        <img src={msg} alt="action" className="w-[12px] h-[12px]" />
      </div>

                      <div
                className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center cursor-pointer"
                onClick={() => handleNavigateToProfile(row)}
              >
                <img src={GroupData} alt="action" className="w-[12px] h-[12px]" />
              </div>
                      <div className="w-[17px] h-[17px] bg-[#83090B] rounded-[2.31px] flex items-center justify-center">
                        <img src={print} alt="action" className="w-[12px] h-[12px]" />
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
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-3 py-1 border rounded-md disabled:opacity-50"
  >
    Previous
  </button>

  <div className="flex gap-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setPage(i + 1)}
        className={`px-3 py-1 border rounded-md ${
          page === i + 1 ? "bg-[#0b2c69] text-white" : ""
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>

  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className="px-3 py-1 border rounded-md disabled:opacity-50"
  >
    Next
  </button>
</div>


    </div>
  );
};

export default CustProfile;
