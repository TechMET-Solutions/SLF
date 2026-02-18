import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
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

  // ✅ Dummy loan data
  // const [data] = useState([
  //   {
  //     id: 1,
  //     loanScheme: "Gold Loan",
  //     loanNo: "LN00123",
  //     loanDate: "2025-03-10",
  //     extendedDate: "2025-09-10",
  //     customerName: "Rohan Sharma",
  //     valuation: "₹1,50,000",
  //     mobileNo: "9876543210",
  //     totalAmt: "₹1,80,000",
  //     loanAmtPaid: "₹1,20,000",
  //     outstandingAmt: "₹60,000",
  //     branch: "Nashik Main",
  //   },
  //   {
  //     id: 2,
  //     loanScheme: "Silver Loan",
  //     loanNo: "LN00124",
  //     loanDate: "2025-04-15",
  //     extendedDate: "2025-09-15",
  //     customerName: "Vikas Kohli",
  //     valuation: "₹2,00,000",
  //     mobileNo: "9988776655",
  //     totalAmt: "₹2,40,000",
  //     loanAmtPaid: "₹1,50,000",
  //     outstandingAmt: "₹90,000",
  //     branch: "Pune East",
  //   },
  //   {
  //     id: 3,
  //     loanScheme: "Diamond Loan",
  //     loanNo: "LN00125",
  //     loanDate: "2025-05-05",
  //     extendedDate: "2025-09-25",
  //     customerName: "Harsh Pandya",
  //     valuation: "₹3,00,000",
  //     mobileNo: "9123456780",
  //     totalAmt: "₹3,50,000",
  //     loanAmtPaid: "₹2,80,000",
  //     outstandingAmt: "₹70,000",
  //     branch: "Mumbai West",
  //   },
  //   {
  //     id: 4,
  //     loanScheme: "Diamond Loan",
  //     loanNo: "LN00125",
  //     loanDate: "2025-05-05",
  //     extendedDate: "2025-09-25",
  //     customerName: "Raj Panta",
  //     valuation: "₹3,00,000",
  //     mobileNo: "9123456780",
  //     totalAmt: "₹3,50,000",
  //     loanAmtPaid: "₹2,80,000",
  //     outstandingAmt: "₹70,000",
  //     branch: "Mumbai West",
  //   },
  //   {
  //     id: 4,
  //     loanScheme: "Diamond Loan",
  //     loanNo: "LN00125",
  //     loanDate: "2025-05-05",
  //     extendedDate: "2025-09-25",
  //     customerName: "Poonam Soni",
  //     valuation: "₹3,00,000",
  //     mobileNo: "9123456780",
  //     totalAmt: "₹3,50,000",
  //     loanAmtPaid: "₹2,80,000",
  //     outstandingAmt: "₹70,000",
  //     branch: "Mumbai West",
  //   },
  // ]);
  const fetchLoans = async () => {
    try {
      setLoading(true);

      const url = `${API}/Transactions/getApprovedLoanApplications/all?page=${page}&limit=${limit}&search=${search}`;

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
  }, [page]); // Fetch loans when page changes
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
          {/* 🔹 Search Box */}
          {/* <div className="flex items-right gap-3 ml-130">
            <input
              type="text"
              placeholder="Loan No"
              className="border border-gray-300 rounded-l-md px-3 py-2 text-sm w-56  focus:outline-none focus:ring-2 focus:ring-[#0A2478] placeholder-gray-500"
            />
            <button className="bg-[#0A2478] px-3 py-2 rounded-r-md flex items-center justify-center">
              <HiMagnifyingGlass className="text-white w-5 h-5" />
            </button>
          </div> */}
          <div className="flex gap-3">
            <button
              className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
              onClick={handleSubmitAuction}
            >
              Submit
            </button>
            <button
              className="bg-[#C1121F] text-white text-sm rounded px-4 py-1 cursor-pointer"
              onClick={() => navigate("/Auction-Creation")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Form Section */}
      <div className="mr-[110px] ml-[110px] mt-5 p-4 bg-[#F7F7FF] rounded-md">
        <div className="flex  mt-2   p-4  ">
          <div className="flex flex-col pr-10">
            <label className="text-xs font-medium mb-1">
              Venue <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2  py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
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
              className="border border-gray-300 rounded px-3  py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-[120px]"
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
              className="border border-gray-300 rounded px-3  py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-[80px]"
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
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className=" no-spinner border border-gray-300 rounded px-3 w-30 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="  no-spinner border border-gray-300 rounded px-3 w-30 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
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
