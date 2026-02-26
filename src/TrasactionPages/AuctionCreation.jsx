import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function AuctionCreation() {
  useEffect(() => {
    document.title = "SLF | Auction Creation";
  }, []);

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");

  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    time: "",
    fees: "",
    charges: "",
  });

  // ✅ Dummy auction data
  const [data, setData] = useState([]);

  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

  useEffect(() => {
    fetchAuctions();
  }, []);


  const fetchAuctions = async () => {
    try {
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        params.append("search", searchQuery);
      }

      if (searchHeaders.length > 0) {
        params.append("headers", searchHeaders.join(","));
      }

      // ✅ Pass selected date
      if (selectedDate) {
        params.append("date", selectedDate);
      }

      const res = await fetch(
        `${API}/Transactions/GetAuction?${params.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (error) {
      console.log("Error fetching auctions:", error);
    }
  };

  const allHeaderIds = [
    "id",
    "venue",
    "loanIds"
  ];

  const handleSelectAll = () => {
    if (searchHeaders.length === allHeaderIds.length) {
      setSearchHeaders([]);
    } else {
      setSearchHeaders(allHeaderIds);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white">
          <h2 className="text-red-600 font-bold text-[20px]">Auction List</h2>
          <div className="flex gap-5">
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
                     
                     <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded border-b border-gray-200 mb-1"
                      >
                        <input
                          type="checkbox"
                          checked={allHeaderIds.every((id) => searchHeaders.includes(id))}
                          onChange={handleSelectAll}
                          className="w-3 h-3 accent-[#0A2478]"
                        />
                        <span className="text-[11px] font-source font-bold text-[#0A2478]">
                          Select All
                        </span>
                      </button>

                      {[
                        { id: "id", label: "Auction Id" },
                        { id: "venue", label: "Venue" },
                        { id: "loanIds", label: "Loan Id" },
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
                  onClick={() => setIsDropdownOpen(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type multiple items (e.g. Cash, Asset)..."
                  className="flex-grow text-[11px] font-source outline-none h-full"
                />
              </div>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ml-2 border border-gray-300 text-[11px] px-2 h-[px] rounded-[3px] outline-none"
            />
<div className="flex gap-2 mt-0.5">
            <button
              className="ml-2 bg-[#0b2c69] cursor-pointer text-white text-[11px] px-4 h-[28px] rounded-[3px] font-source hover:bg-[#071d45]"
              onClick={() => {
                setIsDropdownOpen(false);
                fetchAuctions();
              }}
            >
              Search
            </button>

            <button
              className="bg-[#0b2c69] cursor-pointer text-white text-[11px] px-4 h-[28px] rounded-[3px]  hover:bg-[#071d45]"
              onClick={() => {
                setSearchQuery("");
                setSearchHeaders([]);
                setSelectedDate("");
                setIsDropdownOpen(false);
                fetchAuctions();
              }}
            >
              Clear
              </button>
            </div>

            <div className="flex gap-2 mt-0.5">
              <button
                onClick={() => navigate("/Add-Auction-Creation")}
                className="bg-[#0A2478] text-white text-[11px] px-4  h-[28px] rounded-[3px] cursor-pointer"
              >
                Add
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-[#C1121F] text-white text-[11px] px-4 h-[28px] rounded-[3px] cursor-pointer"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Table Section */}
      <div className="mr-[110px] ml-[110px]">
        <div className="flex justify-center ">
          <div className="overflow-x-auto mt-6 w-[1300px]">
            <table className=" border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r w-[100px]">
                    Auction Id
                  </th>
                  <th className="px-4 py-2 text-left border-r">Loan Id</th>
                  <th className="px-4 py-2 text-left border-r w-[400px]">
                    Venue
                  </th>
                  <th className="px-4 py-2 text-left border-r">Date</th>
                  <th className="px-4 py-2 text-left border-r">Time</th>
                  <th className="px-4 py-2 text-left border-r">Fees</th>

                  <th className="px-4 py-2 flex gap-3">Status</th>
                </tr>
              </thead>

              <tbody className="text-[13px]">
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                  >
                    {/* Auction ID + Navigation */}
                    <td
                      className="px-4 py-2 cursor-pointer text-blue-400"
                      onClick={() =>
                        navigate("/Auction-Items-List", {
                          state: {
                            loanIds: row.loanDetails.map((d) => d.loanId),
                            AuctionData: row,
                          },
                        })
                      }
                    >
                      {row.id}
                    </td>
                    <td className="px-4 py-2">
                      {row.loanDetails && row.loanDetails.length > 0
                        ? row.loanDetails.map((d) => d.loanId).join(", ")
                        : "No Loan IDs"}
                    </td>
                    {/* Venue */}
                    <td className="px-4 py-2">{row.venue}</td>

                    {/* Date */}
                    <td className="px-4 py-2">{row.date?.slice(0, 10)}</td>

                    {/* Time */}
                    <td className="px-4 py-2">{row.time}</td>

                    {/* Fees */}
                    <td className="px-4 py-2">{row.fees}</td>

                    {/* Loan IDs */}

                    {/* Status */}
                    <td
                      className={`px-4 py-2 ${row.status === "OPEN"
                          ? "text-green-600"
                          : "text-red-600"
                        }`}
                    >
                      {row.status}
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

export default AuctionCreation;
