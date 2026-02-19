import axios from "axios";
import { useEffect, useState } from "react";
import { LuPrinter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { formatIndianDate } from "../utils/Helpers";

function CreditNote() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };
  useEffect(() => {
    document.title = "SLF | Credit Note";
    fetchCreditNotes();
  }, []);

  // FETCH ALL CREDIT NOTES
  // const fetchCreditNotes = async () => {
  //   try {
  //     const res = await axios.get(`${API}/credit-note/credit-notes`);
  //     setData(res.data.data || []);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to fetch credit notes");
  //   }
  // };
  const fetchCreditNotes = async () => {
    try {
      const params = {};

      if (searchQuery?.trim()) {
        params.search = searchQuery;
      }

      if (searchHeaders?.length > 0) {
        params.headers = searchHeaders.join(",");
      }

      if (selectedDate) {
        params.date = selectedDate;
      }

      const res = await axios.get(`${API}/credit-note/credit-notes`, {
        params,
      });

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
        <div className="flex justify-center sticky top-[80px] z-40">
          <div className="flex items-center justify-between border border-gray-200 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-sm bg-white">
            <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap">
              Customer Credit Notes
            </h2>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[500px]">
                  {/* Multi-Select Header Dropdown */}
                  <div className="relative border-r border-gray-300 pr-2 mr-2">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none h-full"
                    >
                      Headers ({searchHeaders.length}){" "}
                      <span className="text-[8px]">▼</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                        {[
                          { id: "credit_note_id", label: "Credit Note No" },
                          { id: "customer_id", label: "Customer Id" },
                          { id: "customer_name", label: "Customer Name" },
                          { id: "address", label: "Customer Address" },
                          { id: "mobile_number", label: "mobile_number" },
                        ].map((col) => (
                          <label
                            key={col.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
                          >
                            <input
                              type="checkbox"
                              checked={searchHeaders.includes(col.id)}
                              onChange={() => toggleHeader(col.id)}
                              className="w-3 h-3 accent-[#0A2478]"
                            />
                            <span className="text-[11px] font-source text-gray-700">
                              {col.label}
                            </span>
                          </label>
                        ))}
                        <div className="border-t mt-1 pt-1 text-center">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="text-[10px] text-[#0A2478] font-bold"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Input Field */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type multiple items (e.g. Cash, Asset)..."
                    className="flex-grow text-[11px] font-source outline-none h-full"
                  />

                  {/* Search Button */}
                </div>
              </div>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-[5px] h-[32px] px-2 text-[11px] outline-none"
              />

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  fetchCreditNotes();
                }}
                className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[24px] rounded-[3px] font-source hover:bg-[#071d45]"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchHeaders([]);
                  setSelectedDate("");
                  fetchCreditNotes();
                }}
                className="text-[10px] text-gray-500 hover:text-red-500 underline"
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
        <div className="p-6 ">
          <table className="min-w-full border-collapse bg-white text-sm text-gray-700">
            <thead className=" text-white text-left ">
              <tr>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[150px]">
                  Credit Note No.
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[100px]">
                  Customer Id.
                </th>

                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[200px]">
                  Customer Name
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[200px]">
                  Customer Address
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[120px]">
                  Phone No.
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[120px]">
                  Credit Note Amount
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[120px]">
                  Utilized Amount
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[120px]">
                  Un-Utilized Amount
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 font-semibold w-[80px]">
                  Date
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-4 py-2 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td
                      className="px-4 py-2 text-blue-500 hover:cursor-pointer"
                      onClick={() =>
                        navigate("/View-Credit-Note", { state: { id: row.id } })
                      }
                    >
                      {row.credit_note_no}
                    </td>
                    <td className="px-4 py-2">{row.customer_no}</td>

                    <td className="px-4 py-2">{row.customer_name}</td>
                    <td
                      className="px-4 py-2 max-w-[200px] truncate"
                      title={row.customer_address}
                    >
                      {row.customer_address}
                    </td>
                    <td className="px-4 py-2">{row.phone_no}</td>
                    <td className="px-4 py-2">{row.CreditAmount}</td>
                    <td className="px-4 py-2">{row.Utilized_Amount}</td>
                    <td className="px-4 py-2">{row.Unutilized_Amount}</td>
                    <td className="px-4 py-2">{formatIndianDate(row.date)}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      {/* VIEW BUTTON (passing id via state instead of URL param) */}

                      {/* PRINT BUTTON (passing id via state instead of URL param) */}
                      <button
                        onClick={() =>
                          navigate("/Print-Credit-Note", {
                            state: { id: row.id },
                          })
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
