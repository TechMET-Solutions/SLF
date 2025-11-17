import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";

function CreditNote() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "SLF | Credit Note";
    fetchCreditNotes();
  }, []);

  // FETCH ALL CREDIT NOTES
  const fetchCreditNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/credit-note/credit-notes");
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch credit notes");
    }
  };

  // FILTER LOGIC
  const filteredData = data.filter((item) => {
    return (
      item.credit_note_no?.toLowerCase().includes(search.toLowerCase()) ||
      item.customer_no?.toLowerCase().includes(search.toLowerCase()) ||
      item.customer_name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center w-full bg-white">

        {/* Header */}
        <div className="flex justify-center">
          <div className="flex items-center justify-between border border-gray-200 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-sm">

            <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap">
              Customer Credit Notes
            </h2>

            <div className="flex items-center gap-3">

              {/* Search */}
              <div className="flex items-center border border-gray-300 rounded-md h-[32px] w-[230px] px-2">
                <FaMagnifyingGlass className="text-gray-600 mr-2 text-sm" />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>

              <button
                onClick={() => setSearch("")}
                className="border border-[#0A2478] text-[#0A2478] bg-white text-sm rounded-md px-6 py-[6px]"
              >
                Clear
              </button>

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
          <table className="min-w-full border-collapse bg-white text-sm text-gray-700">
            <thead className=" text-white text-left ">
              <tr>
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
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold">
                  Un-utilized amount
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-gray-200 hover:bg-blue-50"
                  >
                    <td className="px-4 py-2">{row.credit_note_no}</td>
                    <td className="px-4 py-2">{row.customer_no}</td>
                    <td className="px-4 py-2">{row.date}</td>
                    <td className="px-4 py-2">{row.customer_name}</td>
                    <td
                      className="px-4 py-2 max-w-[200px] truncate"
                      title={row.customer_address}
                    >
                      {row.customer_address}
                    </td>
                    <td className="px-4 py-2">{row.phone_no}</td>
                    <td className="px-4 py-2">{row.credit_note_amount}</td>
                    <td className="px-4 py-2">{row.un_utilized_amount}</td>

                    <td className="px-4 py-2 flex justify-center gap-2">
                      {/* VIEW BUTTON (passing id via state instead of URL param) */}
                      <button
                        onClick={() =>
                          navigate("/View-Credit-Note", { state: { id: row.id } })
                        }
                        className="bg-[#646AD9] text-white p-2 rounded-md hover:bg-[#4e53b8]"
                      >
                        <IoMdEye size={12} />
                      </button>

                      {/* PRINT BUTTON (passing id via state instead of URL param) */}
                      <button
                        onClick={() =>
                          navigate("/Print-Credit-Note", { state: { id: row.id } })
                        }
                        className="bg-[#6D5300] text-white p-2 rounded-md hover:bg-[#8b6c00]"
                      >
                        <LuPrinter size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No Credit Notes Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default CreditNote;
