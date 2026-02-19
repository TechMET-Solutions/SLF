import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

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
  const [loanData, setLoanData] = useState([]);
  console.log(loanData, "loanData");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [selectedLoans, setSelectedLoans] = useState([]);

  const handleSelectLoan = (loanId) => {
    setSelectedLoans((prev) =>
      prev.includes(loanId)
        ? prev.filter((id) => id !== loanId)
        : [...prev, loanId],
    );
  };

  // const fetchLoans = async () => {
  //   try {
  //     setLoading(true);

  //     const url = `${API}/Transactions/getApprovedLoanApplications/all?page=${page}&limit=${limit}&search=${search}`;

  //     const res = await fetch(url);
  //     const json = await res.json();

  //     if (json.success) {
  //       setLoanData(json.data);
  //       setTotalPages(json.totalPages || 1);
  //     }
  //   } catch (err) {
  //     console.log("Error fetching loans", err);
  //   }

  //   setLoading(false);
  // };
const fetchLoans = async () => {
  try {
    setLoading(true);

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);

    if (searchQuery.trim()) {
      params.append("search", searchQuery);
    }

    if (searchHeaders.length > 0) {
      params.append("headers", searchHeaders.join(","));
    }

    if (selectedDate) {
      params.append("loan_date", selectedDate);
    }

    const url = `${API}/Transactions/getApprovedLoanApplications/all?${params.toString()}`;

    const res = await fetch(url);
    const json = await res.json();

    if (json.success) {
      setLoanData(json.data);
      setTotalPages(json.totalPages || 1);
    }

  } catch (err) {
    console.log("Error fetching loans", err);
  }

  setLoading(false);
};


  useEffect(() => {
    fetchLoans();
  }, [page]); 
  const parsePledgeItems = (value) => {
    try {
      if (!value) return [];

      // Already array
      if (Array.isArray(value)) return value;

      // Already object — not valid list
      if (typeof value === "object") return [];

      // "[object Object]" case
      if (value === "[object Object]") return [];

      // First parse
      const first = JSON.parse(value);

      // If first result is array → DONE
      if (Array.isArray(first)) return first;

      // If first is string → try second parse
      if (typeof first === "string") {
        try {
          const second = JSON.parse(first);
          return Array.isArray(second) ? second : [];
        } catch {
          return [];
        }
      }

      return [];
    } catch {
      return [];
    }
  };

  const prepareLoanDetails = () => {
    return selectedLoans.map((loanId) => {
      const loan = loanData.find((l) => l.id === loanId);

      const pledgeItems = parsePledgeItems(loan?.Pledge_Item_List);

      return {
        loanId,
        pledge_items: pledgeItems,
      };
    });
  };

  const handleSubmitAuction = async () => {
    debugger;
    if (!formData.venue || !formData.date || !formData.time || !formData.fees) {
      alert("Please fill all fields");
      return;
    }

    if (selectedLoans.length === 0) {
      alert("Please select at least one loan");
      return;
    }

    const loanDetails = prepareLoanDetails();

    const auctionData = {
      ...formData,
      loanIds: selectedLoans,
      loanDetails: loanDetails,
    };

    try {
      const res = await fetch(`${API}/Transactions/createAuction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auctionData),
      });

      const json = await res.json();
      if (json.success) {
        alert("Auction Created Successfully!");
        navigate("/Auction-Creation");
      } else {
        alert("Error: " + json.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white">
          <h2 className="text-red-600 font-bold text-[20px]">
            Auction Creation
          </h2>
          <div className="flex gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-gray-400 rounded-[5px] h-[32px] px-2 relative w-[500px]">
                {/* Multi-Select Header Dropdown */}
                <div className="relative border-r border-gray-300 pr-2 mr-2">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-[11px] font-source font-bold text-[#0A2478] flex items-center gap-1 outline-none "
                  >
                    Headers ({searchHeaders.length}){" "}
                    <span className="text-[8px]">▼</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-[35px] left-[-8px] bg-white border border-gray-300 shadow-xl rounded-md z-[100] w-[160px] p-2">
                      {[
                        { id: "id", label: "Loan No" },
                        { id: "Scheme", label: "Loan Scheme" },
                        { id: "Borrower", label: "Customer Name" },
                         { id: "Mobile_Number", label: "Mobile No" },
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

            <div className="flex gap-3">

               <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                     fetchLoans();
                  }}
                  className="ml-2 bg-[#0b2c69] text-white text-[11px] px-4 h-[32px] rounded-[3px] font-source hover:bg-[#071d45] "
                >
                  Search
                </button>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchHeaders([]);
                  setSelectedDate("")
                  fetchLoans();
                }}
                className="text-[10px] text-gray-500 hover:text-red-500 underline"
              >
                Clear
              </button>
              <button
                className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer h-[32px]"
                onClick={handleSubmitAuction}
              >
                Submit
              </button>
              <button
                className="bg-[#C1121F] text-white text-sm rounded px-4 py-1 cursor-pointer h-[32px]"
                onClick={() => navigate("/Auction-Creation")}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Form Section */}
      <div className="mr-[110px] ml-[110px] mt-5 p-4 bg-[#F7F7FF] rounded-md">
        <div className="flex  mt-2    gap-2 ">
          <div className="flex flex-col ">
            <label className="text-xs font-medium mb-1">
              Venue <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2  py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px] bg-white"
              placeholder="Location"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-xs font-medium mb-1">
              Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2  py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-xs font-medium mb-1">
              Time <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-xs font-medium mb-1">
              Fees <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleInputChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className=" no-spinner border border-gray-300 rounded px-2 w-30 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Enter fees"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1 ">Charges</label>
            <input
              type="number"
              name="charges"
              value={formData.charges}
              onChange={handleInputChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="  no-spinner border border-gray-300 rounded px-2 w-30 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* 🔹 Title */}
        <h2 className="font-bold text-[20px] text-[#0A2478] pt-5 ">
          Add Loans
        </h2>

        {/* 🔹 Table Section */}
        <div className="flex justify-center">
          <div className="overflow-x-auto mt-6 w-[1300px] h-[500px] ">
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r">Select</th>
                  <th className="px-4 py-2 text-left border-r">Loan No</th>
                  <th className="px-4 py-2 text-left border-r">Loan Scheme</th>

                  <th className="px-4 py-2 text-left border-r">Loan Date</th>
                  <th className="px-4 py-2 text-left border-r">
                    Extended Date
                  </th>
                  <th className="px-4 py-2 text-left border-r">
                    Customer Name
                  </th>
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
                        {/* <HiMiniArrowsUpDown className="inline w-4 h-4" /> */}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="text-[12px]">
                {loanData?.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedLoans.includes(row.id)}
                        onChange={() => handleSelectLoan(row.id)}
                      />
                    </td>
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">{row.Scheme}</td>

                    <td className="px-4 py-2">
                      {row.approval_date
                        ? new Date(row.approval_date).toLocaleDateString(
                            "en-GB",
                          )
                        : "-"}
                    </td>

                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">{row.Borrower}</td>
                    <td className="px-4 py-2">
                      {(() => {
                        try {
                          const items = JSON.parse(
                            JSON.parse(row.Pledge_Item_List),
                          );
                          return items[0]?.valuation || "--";
                        } catch (e) {
                          return "--";
                        }
                      })()}
                    </td>

                    <td className="px-4 py-2">{row.Mobile_Number}</td>
                    <td className="px-4 py-2">{row.Loan_amount}</td>
                    <td className="px-4 py-2">{row.LoanAmountPaid}</td>
                    <td className="px-4 py-2">{row.LoanPendingAmount}</td>
                    <td className="px-4 py-2">{row.branch_id}</td>
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

export default AddAuctionCreation;
