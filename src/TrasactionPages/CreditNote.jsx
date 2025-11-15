import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";

function CreditNote() {
  useEffect(() => {
    document.title = "SLF | Credit Note";
  }, []);

  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      creditNoteNo: "01CN3400001",
      customerNo: "02P560396",
      date: "25-07-2025",
      customerName: "MAHESH DONDE",
      customerAddress: "8, Samruddhi Apt, Nashik.wdfsjlknakdlvjflksjkflajgjskdvmnfkjvm",
      phoneNo: "8976234567",
      creditAmount: "61980",
      unutilizedAmount: "6000",
    },
  ]);

  // Map 7 rows of same data (for display demo)
  const displayData = Array(7).fill(data[0]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center w-full bg-white">
        {/* Header */}

        <div className="flex justify-center">
          <div className="flex items-center justify-between border border-gray-200 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-sm">

            {/* Title */}
            <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap">
              Customer Credit Notes
            </h2>

            {/* Right Section */}
            <div className="flex items-center gap-3">

              {/* Search Box */}
              <div className="flex items-center border border-gray-300 rounded-md h-[32px] w-[230px] px-2">
                <FaMagnifyingGlass className="text-gray-600 mr-2 text-sm" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* Search Button */}
              <button className="bg-[#0A2478] hover:bg-[#091d5f] text-white text-sm rounded-md px-6 py-[6px]">
                Search
              </button>

              {/* Clear Button */}
              <button className="border border-[#0A2478] text-[#0A2478] bg-white text-sm rounded-md px-6 py-[6px]">
                Clear
              </button>

              {/* Add Credit Note */}
              <button
                onClick={() => navigate("/add-credit-note-page")}
                className="bg-[#0A2478] hover:bg-[#091d5f] text-white text-sm rounded-md px-4 py-[6px]"
              >
                Add Credit Note
              </button>

            </div>
          </div>
        </div>


        {/* Table */}
        <div className="p-6 w-[1335px]">
          <div>
            <table className="min-w-full border-collapse bg-white text-sm text-gray-700">
              <thead className=" text-white text-left ">
                <tr className="border-r-white">
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                    Credit Note No.
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                    Customer No.
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                    Date
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                    Customer Name
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                    Customer Address
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                    Phone no.
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                    Credit note amount
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-3 font-semibold">
                    Un-utilized amount
                  </th>
                  <th className="bg-[#0A2478] border-r-2 border-white px-4 py-3 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {displayData.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-t border-gray-200 hover:bg-blue-50 `}
                  >
                    <td className="px-4 py-1.5">{row.creditNoteNo}</td>
                    <td className="px-4 py-1.5">{row.customerNo}</td>
                    <td className="px-4 py-1.5">{row.date}</td>
                    <td className="px-4 py-1.5">{row.customerName}</td>
                    <td className="px-4 py-1.5  max-w-[200px] truncate" title={row.customerAddress}>{row.customerAddress}</td>
                    <td className="px-4 py-1.5">{row.phoneNo}</td>
                    <td className="px-4 py-1.5">{row.creditAmount}</td>
                    <td className="px-4 py-1.5">{row.unutilizedAmount}</td>
                    <td className="px-4 py-1.5 flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/View-Credit-Note`)}
                        className="bg-[#646AD9] text-white p-2 rounded-md hover:bg-[#4e53b8]"
                      >
                        <IoMdEye size={12} />
                      </button>
                      <button
                        onClick={() => navigate(`/Print-Credit-Note`)}
                        className="bg-[#6D5300] text-white p-2 rounded-md hover:bg-[#8b6c00]"
                      >
                        <LuPrinter size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditNote;
