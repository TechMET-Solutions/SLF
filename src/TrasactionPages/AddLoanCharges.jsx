import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function AddLoanCharges() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    partyName: "",
    scheme: "",
    loanNo: "",
    loanDate: "",
    loanAmt: "",
    pendingAmt: "",
    documentNo: "",
    documentDate: "",
    remark: "",
  });

  const [chargesList, setChargesList] = useState([]);
  const [rows, setRows] = useState([
    {
      charges: "",
      account: "",
      date: "",
      grossAmount: "",
      cgstPercent: "",
      cgstAmount: "",
      sgstPercent: "",
      sgstAmount: "",
      netPayable: "",
    },
  ]);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch active charges
  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/Master/GetChargesProfile/Active"
        );
        if (res.data.success) setChargesList(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching charges:", error);
      }
    };
    fetchCharges();
  }, []);

  useEffect(() => {
    document.title = "SLF | Loan Charges";
  }, []);

  // ✅ Handle input change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 🔍 Trigger search when user types in Party Name (Borrower) or Loan No (ID)
    if (["partyName", "loanNo"].includes(name) && value.length >= 2) {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/Transactions/goldloan/search?search=${value}`
        );
        setSearchResults(res.data || []);
      } catch (error) {
        console.error("❌ Search Error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  // ✅ When user selects a search result
  const handleSelectLoan = (loan) => {
    setFormData({
      ...formData,
      partyName: loan.Borrower || "",
      scheme: loan.Scheme || "",
      loanNo: loan.id.toString() || "",
      loanDate: formatDate(loan.created_at) || "",
      loanAmt: loan.Loan_amount || "",
      pendingAmt: loan.Loan_amount || "", // You might want to calculate pending amount based on your business logic
      documentNo: `DOC-${loan.id}` || "",
      documentDate: formatDate(loan.created_at) || "",
      remark: loan.remark || "",
    });
    setSearchResults([]);
  };

  // ✅ Format date for input fields
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // ✅ Handle row updates
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === "charges") {
      const selected = chargesList.find((ch) => ch.id === parseInt(value));
      if (selected) {
        updatedRows[index].account = selected.account || "";
        updatedRows[index].grossAmount = selected.amount || "";
      }
    }

    const gross = parseFloat(updatedRows[index].grossAmount) || 0;
    const cgstPercent = parseFloat(updatedRows[index].cgstPercent) || 0;
    const sgstPercent = parseFloat(updatedRows[index].sgstPercent) || 0;

    const cgstAmount = (gross * cgstPercent) / 100;
    const sgstAmount = (gross * sgstPercent) / 100;
    const netPayable = gross + cgstAmount + sgstAmount;

    updatedRows[index].cgstAmount = cgstAmount.toFixed(2);
    updatedRows[index].sgstAmount = sgstAmount.toFixed(2);
    updatedRows[index].netPayable = netPayable.toFixed(2);

    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        charges: "",
        account: "",
        date: "",
        grossAmount: "",
        cgstPercent: "",
        cgstAmount: "",
        sgstPercent: "",
        sgstAmount: "",
        netPayable: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const totalNetPayable = rows.reduce(
    (sum, r) => sum + (parseFloat(r.netPayable) || 0),
    0
  );

  // ✅ Submit handler
  const handleSubmit = async () => {
    try {
      const payload = { 
        ...formData, 
        charges: rows,
        loanApplicationId: formData.loanNo // Adding loan application ID for reference
      };
      console.log("📦 Payload:", payload);
      
      // Here you would typically send the data to your backend
      // const response = await axios.post("http://localhost:5000/api/loan-charges", payload);
      
      alert("Data prepared for submission (check console)");
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Error submitting charges!");
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Add Loan Charges</h2>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-[#0A2478] text-white text-sm rounded px-6 py-1 cursor-pointer"
            >
              Submit
            </button>
            <button
              onClick={() => navigate("/loan-charges-list")}
              className="bg-[#C1121F] text-white text-sm rounded px-6 py-1 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Search Section */}
      <div className="bg-[#FFE6E6] mt-5 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px] relative">
        <p className="font-bold text-[24px] text-[#0A2478] mb-4">Search Loan Applications</p>

        <div className="flex gap-3">
          {/* Party Name (Borrower) Search */}
          <div>
            <label className="text-[14px] font-medium">Party Name (Borrower)</label>
            <input
              type="text"
              name="partyName"
              value={formData.partyName}
              onChange={handleChange}
              placeholder="Search by Borrower Name"
              className="border border-gray-300 px-3 py-2 mt-1 w-[385px] bg-white rounded-[8px]"
            />
          </div>
          
          {/* Loan No (ID) Search */}
          <div>
            <label className="text-[14px] font-medium">Loan No (ID)</label>
            <input
              type="text"
              name="loanNo"
              value={formData.loanNo}
              onChange={handleChange}
              placeholder="Search by Loan ID"
              className="border border-gray-300 px-3 py-2 mt-1 w-[385px] bg-white rounded-[8px]"
            />
          </div>
        </div>

        {/* 🔽 Search Results Dropdown */}
        {loading && (
          <p className="absolute left-[130px] top-[120px] text-gray-500">Searching...</p>
        )}
        {searchResults.length > 0 && (
          <div className="absolute bg-white shadow-lg rounded-md mt-2 w-[1180px] max-h-[200px] overflow-y-auto border border-gray-300 z-10">
            {searchResults.map((loan) => (
              <div
                key={loan.id}
                onClick={() => handleSelectLoan(loan)}
                className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer text-sm grid grid-cols-4 gap-4"
              >
                <span><strong>ID:</strong> {loan.id}</span>
                <span><strong>Borrower:</strong> {loan.Borrower}</span>
                <span><strong>Scheme:</strong> {loan.Scheme}</span>
                <span><strong>Amount:</strong> {loan.Loan_amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Loan Details Section */}
      <div className="bg-[#F7F7FF] p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px] mt-5">
        <p className="font-bold text-[24px] text-[#0A2478] mb-4">Loan Details</p>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "loanNo", label: "Loan No" },
            { name: "loanDate", label: "Loan Date", type: "date" },
            { name: "scheme", label: "Scheme" },
            { name: "partyName", label: "Party Name", width: "w-[300px]" },
            { name: "loanAmt", label: "Loan Amt.", type: "number" },
            { name: "pendingAmt", label: "Pending Amt.", type: "number" },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-[14px] font-medium">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                className={`border border-gray-300 px-3 py-2 mt-1 ${
                  field.width || "w-[150px]"
                } bg-white rounded-[8px]`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Charges Table */}
      <h1 className="font-bold text-[24px] text-[#0A2478] mb-4 mt-6 px-[120px]">
        Charges Details
      </h1>

      <div className="px-[120px]">
        <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#0A2478] text-white text-center">
                <th className="py-2 border">Sr No</th>
                <th className="py-2 border">Charges</th>
                <th className="py-2 border">Account</th>
                <th className="py-2 border">Date</th>
                <th className="py-2 border">Gross Amount</th>
                <th className="py-2 border">CGST(%)</th>
                <th className="py-2 border">CGST Amt</th>
                <th className="py-2 border">SGST(%)</th>
                <th className="py-2 border">SGST Amt</th>
                <th className="py-2 border">Net Payable</th>
                <th className="py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="text-center bg-white">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    <select
                      value={row.charges}
                      onChange={(e) =>
                        handleRowChange(index, "charges", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-[120px]"
                    >
                      <option value="">Select</option>
                      {chargesList.map((ch) => (
                        <option key={ch.id} value={ch.id}>
                          {ch.code}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2">
                    <input
                      type="text"
                      value={row.account}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-gray-100"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        handleRowChange(index, "date", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.grossAmount}
                      onChange={(e) =>
                        handleRowChange(index, "grossAmount", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-[100px]"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.cgstPercent}
                      onChange={(e) =>
                        handleRowChange(index, "cgstPercent", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-[70px]"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.cgstAmount}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.sgstPercent}
                      onChange={(e) =>
                        handleRowChange(index, "sgstPercent", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 w-[70px]"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.sgstAmount}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.netPayable}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-gray-100"
                    />
                  </td>
                  <td className="py-2 flex justify-center items-center gap-2">
                    <button
                      onClick={handleAddRow}
                      className="bg-[#0A2478] text-white px-2 py-2 rounded hover:bg-blue-700"
                    >
                      <IoIosAddCircleOutline size={17} />
                    </button>
                    <button
                      onClick={() => handleRemoveRow(index)}
                      className="bg-red-600 text-white px-2 py-2 rounded hover:bg-red-700"
                    >
                      <IoIosCloseCircleOutline size={17} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="border font-semibold bg-gray-100">
                <td colSpan="9" className="text-right pr-4 py-2">
                  Total
                </td>
                <td className="text-center">{totalNetPayable.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddLoanCharges;