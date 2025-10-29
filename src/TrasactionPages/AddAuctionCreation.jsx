import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { HiMagnifyingGlass } from "react-icons/hi2";


function AddAuctionCreation() {
  useEffect(() => {
    document.title = "SLF | Add Auction Creation";
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    time: "",
    fees: "",
    charges: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Dummy loan data
  const [data] = useState([
    {
      id: 1,
      loanScheme: "Gold Loan",
      loanNo: "LN00123",
      loanDate: "2025-03-10",
      extendedDate: "2025-09-10",
      customerName: "Rohan Sharma",
      valuation: "₹1,50,000",
      mobileNo: "9876543210",
      totalAmt: "₹1,80,000",
      loanAmtPaid: "₹1,20,000",
      outstandingAmt: "₹60,000",
      branch: "Nashik Main",
    },
    {
      id: 2,
      loanScheme: "Silver Loan",
      loanNo: "LN00124",
      loanDate: "2025-04-15",
      extendedDate: "2025-09-15",
      customerName: "Vikas Kohli",
      valuation: "₹2,00,000",
      mobileNo: "9988776655",
      totalAmt: "₹2,40,000",
      loanAmtPaid: "₹1,50,000",
      outstandingAmt: "₹90,000",
      branch: "Pune East",
    },
    {
      id: 3,
      loanScheme: "Diamond Loan",
      loanNo: "LN00125",
      loanDate: "2025-05-05",
      extendedDate: "2025-09-25",
      customerName: "Harsh Pandya",
      valuation: "₹3,00,000",
      mobileNo: "9123456780",
      totalAmt: "₹3,50,000",
      loanAmtPaid: "₹2,80,000",
      outstandingAmt: "₹70,000",
      branch: "Mumbai West",
    },
    {
      id: 4,
      loanScheme: "Diamond Loan",
      loanNo: "LN00125",
      loanDate: "2025-05-05",
      extendedDate: "2025-09-25",
      customerName: "Raj Panta",
      valuation: "₹3,00,000",
      mobileNo: "9123456780",
      totalAmt: "₹3,50,000",
      loanAmtPaid: "₹2,80,000",
      outstandingAmt: "₹70,000",
      branch: "Mumbai West",
    },
    {
      id: 4,
      loanScheme: "Diamond Loan",
      loanNo: "LN00125",
      loanDate: "2025-05-05",
      extendedDate: "2025-09-25",
      customerName: "Poonam Soni",
      valuation: "₹3,00,000",
      mobileNo: "9123456780",
      totalAmt: "₹3,50,000",
      loanAmtPaid: "₹2,80,000",
      outstandingAmt: "₹70,000",
      branch: "Mumbai West",
    },
  ]);

  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">
            Auction Creation
          </h2>
           {/* 🔹 Search Box */}
    <div className="flex items-right gap-3 ml-130">
      <input
        type="text"
        placeholder="Loan No"
        className="border border-gray-300 rounded-l-md px-3 py-2 text-sm w-56  focus:outline-none focus:ring-2 focus:ring-[#0A2478] placeholder-gray-500"
      />
      <button className="bg-[#0A2478] px-3 py-2 rounded-r-md flex items-center justify-center">
        <HiMagnifyingGlass className="text-white w-5 h-5" />
      </button>
    </div>
          <div className="flex gap-3">
            <button className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer">
              Submit
            </button>
            <button
              className="bg-[#C1121F] text-white text-sm rounded px-4 py-1 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Form Section */}
      <div className="flex gap-6 mt-4 flex-wrap w-[1300px] mx-auto p-4  ">
        <div className="flex flex-col pr-10">
          <label className="text-xs font-medium mb-1">
            Venue <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 w-60 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Location"
          />
        </div>

        <div className="flex flex-col pr-10">
          <label className="text-xs font-medium mb-1">
            Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 w-40 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col pr-10">
          <label className="text-xs font-medium mb-1">
            Time <span className="text-red-600">*</span>
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 w-40 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col pr-10">
          <label className="text-xs font-medium mb-1">
            Fees <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleInputChange}
            className=" no-spinner border border-gray-300 rounded px-3 w-30 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter fees"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1 ">
            Charges <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="charges"
            value={formData.charges}
            onChange={handleInputChange}
            className="  no-spinner border border-gray-300 rounded px-3 w-30 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 🔹 Title */}
      <h2 className="font-bold text-[20px] text-[#0A2478] pt-5 ml-27">
        Add Loans
      </h2>

      {/* 🔹 Table Section */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-6 w-[1300px] h-[500px] ">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r">Select</th>
                <th className="px-4 py-2 text-left border-r">Loan Scheme</th>
                <th className="px-4 py-2 text-left border-r">Loan No</th>
                <th className="px-4 py-2 text-left border-r">Loan Date</th>
                <th className="px-4 py-2 text-left border-r">Extended Date</th>
                <th className="px-4 py-2 text-left border-r">Customer Name</th>
                <th className="px-4 py-2 text-left border-r">Valuation</th>
                <th className="px-4 py-2 text-left border-r">Mobile No.</th>

                {[
                  "Total Amt",
                  "Loan Amt Paid",
                  "Outstanding Amt",
                  "Branch",
                ].map((label, i) => (
                  <th key={i} className="px-2 py-2 text-left border-r">
                    <div className="flex items-center gap-1">
                      {label}
                      <HiMiniArrowsUpDown className="inline w-4 h-4" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 flex items-center justify-center">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2">{row.loanScheme}</td>
                  <td className="px-4 py-2">{row.loanNo}</td>
                  <td className="px-4 py-2">{row.loanDate}</td>
                  <td className="px-4 py-2">{row.extendedDate}</td>
                  <td className="px-4 py-2">{row.customerName}</td>
                  <td className="px-4 py-2">{row.valuation}</td>
                  <td className="px-4 py-2">{row.mobileNo}</td>
                  <td className="px-4 py-2">{row.totalAmt}</td>
                  <td className="px-4 py-2">{row.loanAmtPaid}</td>
                  <td className="px-4 py-2">{row.outstandingAmt}</td>
                  <td className="px-4 py-2">{row.branch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddAuctionCreation;
