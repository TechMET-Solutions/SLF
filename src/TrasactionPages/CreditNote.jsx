import axios from "axios";
import { useEffect, useState } from "react";
import { LuPrinter, LuWallet } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { usePermission } from "../API/Context/PermissionContext";
import { formatIndianDate } from "../utils/Helpers";

function CreditNote() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchHeaders, setSearchHeaders] = useState([]); // Array of active headers
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const { permissions, userData } = usePermission();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawalId, setWithdrawalId] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [loadingRecord, setLoadingRecord] = useState(false);
  
  const toggleHeader = (headerId) => {
    setSearchHeaders((prev) =>
      prev.includes(headerId)
        ? prev.filter((id) => id !== headerId)
        : [...prev, headerId],
    );
  };

 const handleFetchForWithdrawal = async () => {
  if (!withdrawalId) return alert("Please enter Credit Note ID");

  setLoadingRecord(true);

  try {
    const res = await axios.get(
      `${API}/credit-note/credit-note/details/${withdrawalId}`
    );

    // ✅ SUCCESS CASE
    setSelectedNote(res.data.data);

  } catch (err) {
    const status = err.response?.status;

    // 🔴 ALREADY WITHDRAWN (BEST WAY - using 409)
    if (status === 409) {
      alert("❌ This Credit Note is already withdrawn");

      // optional: show data if backend sends it
      // setSelectedNote(err.response?.data?.data || null);
    }

    // ❌ NOT FOUND
    else if (status === 404) {
      alert("❌ Credit Note not found");
      setSelectedNote(null);
    }

    // ❌ BAD REQUEST
    else if (status === 400) {
      alert(err.response?.data?.message || "Invalid request");
      setSelectedNote(null);
    }

    // ❌ OTHER ERROR
    else {
      alert("❌ Server error");
      setSelectedNote(null);
    }
  } finally {
    setLoadingRecord(false);
  }
};

  const handleWithdrawAction = async () => {
  if (!selectedNote?.credit_note_id) {
    return alert("Invalid Credit Note");
  }

  try {
    // setLoading(true);

    const res = await axios.post(`${API}/credit-note/credit-note/withdraw`, {
      creditNoteId: selectedNote.credit_note_id,
    });

    if (res.data.success) {
      alert("Withdrawal successful ✅");

      // Update UI instantly
      setSelectedNote((prev) => ({
        ...prev,
        status: 1,
      }));

      setIsModalOpen(false);
    } else {
      alert(res.data.message || "Withdrawal failed");
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Server Error");
  } finally {
    // setLoading(false);
  }
};
  useEffect(() => {
    document.title = "SLF | Credit Note";
    fetchCreditNotes();
  }, []);

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

  const allHeaderIds = [
    "credit_note_id",
    "customer_id",
    "customer_name",
    "address",
    "mobile_number",
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
      <div className="flex flex-col  w-full bg-white">
        {/* Header */}
        <div className="z-40 ml-[25px] bg-white w-full sticky top-[50px]">
          <div className="flex items-center px-6 py-4 border-b w-full max-w-[1462px] h-[40px] border  border-gray-200 justify-between ">
            <h2 className="text-red-600 font-bold text-[20px] whitespace-nowrap">
              Customer Credit Notes
            </h2>

            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-3">
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
                            checked={allHeaderIds.every((id) =>
                              searchHeaders.includes(id),
                            )}
                            onChange={handleSelectAll}
                            className="w-3 h-3 accent-[#0A2478]"
                          />
                          <span className="text-[11px] font-source font-bold text-[#0A2478]">
                            Select All
                          </span>
                        </button>
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
                    onClick={() => setIsDropdownOpen(false)}
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
                className="hidden lg:flex border border-gray-300 rounded-[5px] h-[32px] px-2 text-[11px] outline-none"
              />

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  fetchCreditNotes();
                }}
                className="ml-2 bg-[#0b2c69] hidden lg:flex text-white text-[11px] px-4 h-[28px] rounded-[3px] font-source hover:bg-[#071d45]"
              >
                <span className="mt-1">Search</span>
              </button>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchHeaders([]);
                  setSelectedDate("");
                  fetchCreditNotes();
                }}
                className=" bg-[#0b2c69] hidden lg:flex text-white text-[11px] px-4 h-[28px] rounded-[3px] font-source hover:bg-[#071d45]"
              >
                <span className="mt-1">Clear</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white text-[11px] px-3 h-[28px] rounded-[3px] font-source hover:bg-orange-700 flex items-center gap-1"
              >
                <LuWallet size={14} /> Withdraw
              </button>
              {/* {(userData?.isAdmin ||
                permissions?.Transaction?.find(
                  (item) => item.name === "Credit Note",
                )?.add) && (
                <button
                  onClick={() => navigate("/add-credit-note-page")}
                  className="bg-[#0b2c69] text-white text-[11px] px-2 h-[28px] rounded-[3px] font-source hover:bg-[#071d45]"
                >
                  Add Credit Note
                </button>
              )} */}

              <button
                onClick={() => navigate("/")}
                className="bg-red-600 w-[46px] text-white text-[11px] px-2 h-[28px] rounded-[3px] font-source"
              >
                Exit
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="ml-[25px] flex w-[1462px] ">
          <table className="min-w-full border-collapse bg-white text-sm text-gray-700">
            <thead className="text-left bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[150px]">
                  Credit Note No.
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[100px]">
                  Customer Id.
                </th>

                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[200px]">
                  Customer Name
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[200px]">
                  Customer Address
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[100px]">
                  Phone No.
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[120px]">
                  Credit Note Amount
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[120px]">
                  Utilized Amount
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[120px]">
                  Un-Utilized Amount
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">
                  Date
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-1 py-1 text-center font-semibold">
                  Action
                </th>
                <th className="bg-[#0A2478] border-r-2 border-white px-1 py-1 text-center font-semibold">
                  Status
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
                      className="px-1 py-1 text-blue-500 cursor-pointer"
                      onClick={() =>
                        (userData?.isAdmin ||
                          permissions?.Transaction?.find(
                            (item) => item.name === "Credit Note",
                          )?.CreditNote_View) &&
                        navigate("/View-Credit-Note", {
                          state: { id: row.id },
                        })
                      }
                    >
                      {row.credit_note_no}
                    </td>
                    <td className="px-1 py-1">{row.customer_no}</td>

                    <td className="px-1 py-1">{row.customer_name}</td>
                    <td
                      className="px-1 py-1 max-w-[400px] truncate"
                      title={row.customer_address}
                    >
                      {row.customer_address}
                    </td>
                    <td className="px-1 py-1">{row.phone_no}</td>
                    <td className="px-1 py-1">{row.CreditAmount}</td>
                    <td className="px-1 py-1">{row.Utilized_Amount}</td>
                    <td className="px-1 py-1">{row.Unutilized_Amount}</td>
                    <td className="px-1 py-1">{formatIndianDate(row.date)}</td>
                    <td className="px-1 py-1 flex justify-center gap-2">
                      {(userData?.isAdmin ||
                        permissions?.Transaction?.find(
                          (item) => item.name === "Credit Note",
                        )?.print) && (
                        <button
                          onClick={() =>
                            navigate("/Print-Credit-Note", {
                              state: { id: row.id },
                            })
                          }
                          className="bg-[#0A2478] text-white p-2 rounded-md"
                        >
                          <LuPrinter size={12} />
                        </button>
                      )}
                    </td>
                     <td className="px-1 py-1">
  {row.status === 1 ? "Withdrawn" : "Available"}
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

      {isModalOpen && (
        /* Added 'backdrop-blur-sm' to the overlay div */
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white rounded-lg w-[450px] p-6 shadow-2xl border-t-4 border-[#0A2478]">
            <h3 className="text-lg font-bold text-[#0A2478] mb-4">
              Credit Note Withdrawal
            </h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[12px] font-bold text-gray-600">
                  Enter Credit Note ID
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={withdrawalId}
                    onChange={(e) => setWithdrawalId(e.target.value)}
                    className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
                    placeholder="e.g. CN-001"
                  />
                  <button
                    onClick={handleFetchForWithdrawal}
                    className="bg-[#0A2478] text-white px-3 py-1 rounded text-xs hover:bg-[#071d45]"
                  >
                    {loadingRecord ? "..." : "Fetch"}
                  </button>
                </div>
              </div>

              {selectedNote && (
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 animate-in fade-in zoom-in duration-200">
                  <div className="grid grid-cols-2 gap-2 text-[13px]">
                    <span className="font-semibold text-gray-700">
                      Customer ID:
                    </span>
                    <span className="text-gray-900">
                      {selectedNote.customer_id}
                    </span>

                    <span className="font-semibold text-gray-700">Name:</span>
                    <span className="text-gray-900">
                      {selectedNote.customer_name}
                    </span>

                    <span className="font-semibold text-gray-700">
                      Credit Amount:
                    </span>
                    <span className="text-green-600 font-bold">
                      ₹{selectedNote.CreditAmount}
                    </span>

                    <span className="font-semibold text-gray-700">
                      Unutilized:
                    </span>
                    <span className="text-red-600 font-bold">
                      ₹{selectedNote.Unutilized_Amount}
                    </span>
                  </div>

                  <button
                    onClick={handleWithdrawAction}
                    className="w-full mt-4 bg-[#0A2478] text-white py-2 rounded font-bold  transition-colors shadow-md"
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              )}

              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedNote(null);
                    setWithdrawalId("");
                  }}
                  className="text-gray-500 text-sm font-bold hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreditNote;
