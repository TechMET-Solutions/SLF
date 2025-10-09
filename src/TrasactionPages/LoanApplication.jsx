import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiEdit, CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import calender from "../assets/calender.png";
import goldlogo from "../assets/goldlogo.svg";
import msg from "../assets/msg.png";
import printwithobject from "../assets/printwithobject.png";

import envImg from "../assets/envImg.jpg";
import text from "../assets/text.png";
import upload from "../assets/upload.png";
import { formatIndianDate } from '../utils/Helpers';
const LoanApplication = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const options = [
    "01", "02", "03", "04", "11", "13",
    "BGR-01", "BGR-02", "COR-01", "COR-02",
    "IND-01", "IND-02", "IND-03", "IND-04"
  ];
const [isRemarkOpen, setIsRemarkOpen] = useState(false);

  const handleOpenRemark = () => {
    setIsRemarkOpen(true);
  };

  const handleCloseRemark = () => {
    setIsRemarkOpen(false);
  };
 const [loanApplication, setLoanApplication] = useState([
  {
    loan_no: "LN001",
    party_name: "John Doe",
    loan_date: "2025-10-01",
    loan_amount: 50000,
    status: "1", // 1 = Active, 0 = Inactive
    added_by: "Admin",
    approved_by: "Manager",
    action: "view", // you can customize this
    loan_repayment: "Pending"
  },
  {
    loan_no: "LN002",
    party_name: "Mary Jane",
    loan_date: "2025-09-25",
    loan_amount: 75000,
    status: "0",
    added_by: "Staff",
    approved_by: "Supervisor",
    action: "edit",
    loan_repayment: "Completed"
   },
  {
    loan_no: "LN003",
    party_name: "Mary Jane",
    loan_date: "2025-09-25",
    loan_amount: 75000,
    status: "2",
    added_by: "Staff",
    approved_by: "Supervisor",
    action: "edit",
    loan_repayment: "Completed"
  }
]);

  const handleClick = (row) => {
    if (row.status === "2") {
      // 2 means Cancelled
      navigate("/Cancelled-Loan");
    } else {
      navigate("/Loan-Enquiry");
    }
  };
  return (
    <div>
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
         Loan Application
          </h2>

          <div className="flex gap-3">
                      <div className="flex gap-5 items-center">
                           <div>
                {/* <label className="text-[14px]">Lead Person</label> */}
                <select
                  name="lead_person"
                //   value={branchData.lead_person}
                //   onChange={handleChange}
                  className="border border-gray-300 rounded pl-2 w-[111px] h-[31px]"
                >
                  <option value="" >
                   Field
                  </option>
                  <option value="john">Loan No</option>
                  <option value="mary">Party Name</option>
                                  <option value="alex">Loan Date</option>
                                   <option value="alex">Added on</option>
                                  <option value="alex">Added By</option>
                                   
                </select>
              </div>
            
                          <div className='flex gap-2'>
                           <input
                type="text"
placeholder='Search'
                style={{
                  width: "134.64px",
                  height: "31.49px",
                  borderRadius: "5px",
                  borderWidth: "0.62px",
                }}
                className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
                          />
                          <button
                style={{
                  width: "30px",
                  height: "31px",
                  borderRadius: "5px",
                }}
                className="bg-[#0b2c69] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
               <CiSearch className='w-[14px] h-[14px] font-bold'/>
              </button>    
</div>
             
 <div className="relative w-[111px]">
      <button
        className="border border-gray-300 rounded pl-2 h-[31px] w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || "Scheme"}
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white mt-1 rounded">
          {options.map((opt, index) => (
            <li
              key={index}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelected(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
            </div>

            <div className="flex gap-5 items-center">
             
                       <div className='relative w-[134px]'>
      <div className='border rounded-[8px] h-[31px] border-[#D0D5DD] p-2 flex justify-between items-center'>
        <p className='text-[12px] font-semibold'>
          {selectedDate ? selectedDate.toLocaleDateString() : "Loan Date"}
        </p>
        <img 
          src={calender} 
          alt="calendar" 
          className="w-[18px] h-[18px] cursor-pointer" 
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className="absolute top-10 right-0 z-50">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setOpen(false);
            }}
            inline
          />
        </div>
      )}
    </div>
            </div>
            

                  </div>
                  <div className="flex justify-center item-center gap-5">
             <button
      style={{
        width: "74px",
        height: "24px",
        borderRadius: "3.75px",
        gap: "6.25px",
      }}
      onClick={() => navigate("/Add-Gold-Loan-Application")}
      className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
    >
      Add
    </button>


            </div>
        </div>
          </div>
          
 <div className="flex justify-center text-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm ">
              <tr>
                <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[103px] ">Loan No</th>
                <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[204px]">Party Name</th>
                <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[101px]"> loan Date</th>

                <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[104px]">Loan Amount</th>
               <th className="px-4 py-2 border-r border-gray-300 text-[14px] w-[128px]">
  <select
    className=" rounded text-[13px] w-full"
    defaultValue=""
  >
    <option value="" className='text-black'>
      Status
    </option>
    <option value="approve" className='text-black'>Approve</option>
    <option value="pending" className='text-black'>Pending</option>
  </select>
</th>

                <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[187px]">Added By</th>
                <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[176px]">Approved By</th>
                              <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[156px]">Action</th>
                               <th className="px-4 py-2  border-r border-gray-300 text-[14px] w-[156px]">Payment</th>
                               <th className="px-4 py-2  border-r border-gray-300 text-[13px] w-[111px]">Loan Repayment</th>
              </tr>
            </thead>
           <tbody className="text-[12px]">
  {loanApplication.map((row, index) => (
    <tr
      key={index}
      className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
    >
       <td
            className="px-4 py-2 text-blue-600 cursor-pointer hover:underline"
            onClick={() => handleClick(row)}
          >
            {row.loan_no}
          </td>
      <td className="px-4 py-2">{row.party_name}</td>
      <td className="px-4 py-2">{formatIndianDate(row.loan_date)}</td>
      <td className="px-4 py-2">₹{row.loan_amount.toLocaleString("en-IN")}</td>
<td
  className={`px-4 py-2 font-semibold ${
    row.status === "1"
      ? "text-green-600" // Approved
      : row.status === "0"
      ? "text-orange-500" // Pending
      : "text-red-600" // Cancelled
  }`}
>
  {row.status === "1"
    ? "Approved"
    : row.status === "0"
    ? "Pending"
    : "Cancelled"}
</td>

      <td className="px-4 py-2">{row.added_by}</td>
      <td className="px-4 py-2">{row.approved_by}</td>
      

      {/* Action buttons */}
    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
        <div className="flex gap-2 justify-center">
           <div className="w-[24px] h-[24px] bg-[#4A90E2] text-white rounded flex items-center justify-center 
                    transition-transform duration-200 hover:scale-110 cursor-pointer">
      <CiEdit />
    </div>
    <div
        className="w-[24px] h-[24px] bg-[#F5A623] rounded flex items-center justify-center 
                   transition-transform duration-200 hover:scale-110 cursor-pointer"
        onClick={handleOpenRemark}
      >
        <img src={msg} alt="message" className="w-[14px] h-[14px]" />
      </div>
    <div className="w-[24px] h-[24px] bg-[#28A745] rounded flex items-center justify-center 
                    transition-transform duration-200 hover:scale-110 cursor-pointer">
      <img src={upload} alt="upload" className="w-[14px] h-[14px]" />
    </div>
    
    <div className="w-[24px] h-[24px] bg-[#50E3C2] rounded flex items-center justify-center 
                    transition-transform duration-200 hover:scale-110 cursor-pointer">
      <img src={printwithobject} alt="print object" className="w-[14px] h-[14px]" />
    </div>
    <div className="w-[24px] h-[24px] bg-[#8B572A] rounded flex items-center justify-center 
                    transition-transform duration-200 hover:scale-110 cursor-pointer">
      <img src={text} alt="text" className="w-[14px] h-[14px]" />
          </div>
           <div className="w-[24px] h-[24px] border rounded flex items-center justify-center 
                    transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: "2px solid black" }}>
      <img src={goldlogo} alt="print object" className="w-[14px] h-[14px]" />
    </div>
           <div className="w-[24px] h-[24px] bg-[#C72828] rounded flex items-center justify-center 
                    transition-transform duration-200 hover:scale-110 cursor-pointer text-white">
     <MdOutlineCancel />
    </div>
  </div>
</td>

  <td className="px-4 py-2">view</td>

      {/* Loan Repayment toggle */}
      <td className="px-4 py-2">
       
              Repay
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

      

       {isRemarkOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "  style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}>
          <div className="bg-white w-[829px] h-[356px] p-6  shadow-lg relative rounded-[8px]">
         <h2 className="font-semibold text-[24px] leading-[100%] tracking-[0.03em] mb-4 text-[#0A2478]" style={{ fontFamily: 'Source Sans 3' }}>
  Remark
</h2>
            <div className="w-[728px] border border-gray-300  p-5 resize-none h-[183px] rounded-[16px] flex justify-between">
              <div>
                <p className='text-black font-bold text-[14px]'>Documents Pending</p>
                <p className='text-[14px] mt-2 text-[#000000C7]'>Some required documents are missing from your application. To continue processing your<br></br> loan request, please upload the pending documents at the earliest. These may include<br></br> identity proof, address proof, income statements, or bank records, depending on your loan type. </p>
              </div>
              <div>
                 <img src={envImg} alt="print object" className="w-[156px] h-[156px] rounded-[10px]" />
                </div>
              </div>
            
            <div className="flex justify-center mt-4 gap-2">
              <button
                className=" px-4 py-2 rounded w-[119px] h-[38px] bg-[#C1121F] text-white font-semibold cursor-pointer" 
                onClick={handleCloseRemark}
              >
               Close
              </button>
              {/* <button className="bg-[#0A2478] text-white px-4 py-2 rounded">
                Save
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoanApplication

