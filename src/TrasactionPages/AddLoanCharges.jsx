import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import Loader from "../Component/Loader";

function AddLoanCharges() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    partyName: "",
    scheme: "",
    loanNo: "",
    loanDate: "",
    loanAmt: "",
    pendingAmt: "",
    remark: "",
  });
  const location = useLocation();
  const loanId = location.state?.loanId;
  const type = location.state?.type || "add"; // default = add

  const isView = type === "view";
  const isEdit = type === "edit";

  const [chargesList, setChargesList] = useState([]);
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };
  const [rows, setRows] = useState([
    {
      charges: "",
      account: "",
      date: getTodayDate(),
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
  const [remarkError, setRemarkError] = useState("");

  useEffect(() => {
    const fetchLoanCharges = async () => {
      if (!loanId) return;

      try {
 setLoading(true);

        const res = await axios.get(`${API}/loan-charges/getById/${loanId}`);

        if (res.data.success) {
          const data = res.data.data;

          // ✅ FIX HERE
          setFormData({
            partyName: data.party_name || "",
            scheme: data.scheme || "",
            loanNo: data.loan_no || "",
            loanDate: formatDate(data.loan_date) || "",
            loanAmt: data.loan_amt || "",
            pendingAmt: data.pending_amt || "",
            remark: data.remark || "",
          });

          // ✅ Set rows
          setRows(data.charges_details || []);
           setLoading(false);
        } else {
          alert("⚠️ Loan charge not found!");
           setLoading(false);
          navigate("/loan-charges-list");
        }
      } catch (error) {
        console.error("❌ Error fetching loan charges:", error);
         setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanCharges();
  }, [loanId, navigate]);
  // ✅ Fetch active charges
  useEffect(() => {
    const fetchCharges = async () => {
       setLoading(true);
      try {
        const res = await axios.get(`${API}/Master/GetChargesProfile/Active`);
        if (res.data.success) setChargesList(res.data.data);
         setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching charges:", error);
         setLoading(false);
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

    // 🔍 Search logic
    if (["partyName", "loanNo"].includes(name) && value.length >= 1) {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API}/Transactions/goldloan/search?search=${value}`,
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
      pendingAmt: loan.Loan_amount || "",
      remark: loan.remark || "",
    });
    setSearchResults([]);
  };

  // ✅ Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // ✅ Handle table row changes
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
    0,
  );
  const validateCharges = () => {
    const validRows = rows.filter(
      (row) =>
        row.charges &&
        row.date &&
        row.grossAmount &&
        Number(row.grossAmount) > 0,
    );

    if (validRows.length === 0) {
      return "At least one valid charge entry is required!";
    }

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];

      // Skip fully empty row
      if (!r.charges && !r.date && !r.grossAmount) {
        continue;
      }

      if (!r.charges) {
        return `Row ${i + 1}: Please select charge`;
      }

      if (!r.date) {
        return `Row ${i + 1}: Date is required`;
      }

      if (!r.grossAmount || Number(r.grossAmount) <= 0) {
        return `Row ${i + 1}: Enter valid gross amount`;
      }
    }

    return null;
  };

  // ✅ Submit handler
  const handleSubmit = async () => {
    if (!formData.remark.trim()) {
      setRemarkError("Remark is required");
      return;
    }

    const errorMsg = validateCharges();
    if (errorMsg) {
      alert(`❌ ${errorMsg}`);
      return;
    }
 setLoading(true);
    try {
      const payload = {
        loan_no: formData.loanNo,
        loan_date: formData.loanDate,
        scheme: formData.scheme,
        party_name: formData.partyName,
        loan_amt: formData.loanAmt,
        pending_amt: formData.pendingAmt,
        remark: formData.remark,
        charges_details: rows.filter(
          (r) => r.charges && r.date && r.grossAmount,
        ), // ✅ send only valid rows
        total_charges: totalNetPayable.toFixed(2),
        added_by: "Admin",
      };

      const res = await axios.post(`${API}/loan-charges/add`, payload);

      if (res.data.success) {
        alert("✅ Loan charges added successfully!");
        setLoading(false);
        navigate("/loan-charges-list");
      } else {
        alert("⚠️ Failed to add loan charges");
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Submit Error:", err);
      
      alert("Server error while submitting loan charges!");
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (!formData.remark.trim()) {
      setRemarkError("Remark is required");
      return;
    }

    const errorMsg = validateCharges();
    if (errorMsg) {
      alert(`❌ ${errorMsg}`);
      return;
    }

    try {
      const payload = {
        loan_no: formData.loanNo,
        loan_date: formData.loanDate,
        scheme: formData.scheme,
        party_name: formData.partyName,
        loan_amt: formData.loanAmt,
        pending_amt: formData.pendingAmt,
        remark: formData.remark,
        charges_details: rows.filter(
          (r) => r.charges && r.date && r.grossAmount,
        ),
        updated_by: "Admin",
        total_charges: totalNetPayable.toFixed(2),
      };

      const res = await axios.put(
        `${API}/loan-charges/update/${loanId}`,
        payload,
      );

      if (res.data.success) {
        alert("✅ Loan charges updated successfully!");
        setLoading(false);
        navigate("/loan-charges-list");
      } else {
        alert("⚠️ Update failed!");
        setLoading(false);
      }
    } catch (error) {
      console.error("❌ Update Error:", error);
      alert("Server error while updating loan charges!");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b w-[1462px] h-[40px] border  border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">
            {isView
              ? "View Loan Charges"
              : isEdit
                ? "Edit Loan Charges"
                : "Add Loan Charges"}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={isEdit ? handleUpdate : handleSubmit}
              disabled={isView}
              className={`text-white text-sm rounded px-6 py-1 cursor-pointer ${
                isView
                  ? "bg-gray-400 cursor-not-allowed"
                  : isEdit
                    ? "bg-[#0A2478] hover:bg-blue-700"
                    : "bg-[#0A2478] hover:bg-blue-700"
              }`}
            >
              {isView ? "View Mode" : isEdit ? "Update" : "Submit"}
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
      <div className=" w-[1462px] ml-[25px]">
        <div className="bg-[#FFE6E6] mt-2 p-3  w-full  ">
          <p className="font-bold text-[20px] text-[#0A2478] ">Loan Details</p>

          {/* 🔹 Search Fields Row */}
          <div className="flex items-end justify-start gap-6 flex-wrap">
            {/* Party Name Field */}
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">Party Name</label>
              <input
                type="text"
                name="partyName"
                value={formData.partyName}
                disabled={isView}
                onChange={handleChange}
                placeholder="Enter Party Name"
                className="border border-gray-300 px-3 py-2 w-[200px] bg-white rounded-[8px] text-xs"
              />
            </div>

            {/* Loan No Field */}
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">Loan No</label>
              <input
                type="text"
                name="loanNo"
                disabled={isView}
                value={formData.loanNo}
                onChange={handleChange}
                placeholder="Enter Loan No"
                className="border border-gray-300 px-3 py-2 w-[200px] bg-white rounded-[8px] text-xs"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">Loan Date</label>
              <input
                type="date"
                name="loanDate"
                value={formData.loanDate}
                disabled
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px] text-xs cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              />
            </div>

            {/* Scheme */}
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">Scheme</label>
              <input
                type="text"
                name="scheme"
                value={formData.scheme}
                disabled
                onChange={handleChange}
                placeholder="Scheme"
                className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px] text-xs disabled:bg-gray-200 disabled:text-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">Loan Amt.</label>
              <input
                type="number"
                name="loanAmt"
                value={formData.loanAmt}
                disabled
                onChange={handleChange}
                placeholder="Loan Amt."
                style={{
                  MozAppearance: "textfield",
                }}
                onWheel={(e) => e.target.blur()}
                className="border border-gray-300 px-3 py-2 w-[150px] bg-white rounded-[8px] text-xs disabled:bg-gray-200 disabled:text-gray-500"
              />
            </div>

            {/* Pending Amount */}
            <div className="flex flex-col">
              <label className="text-[14px] font-medium mb-1">
                Pending Amt.
              </label>
              <input
                type="number"
                name="pendingAmt"
                value={formData.pendingAmt}
                disabled
                onChange={handleChange}
                placeholder="Pending Amt."
                style={{
                  MozAppearance: "textfield",
                }}
                onWheel={(e) => e.target.blur()}
                className="border border-gray-300 px-3 py-2 w-[150px] bg-white rounded-[8px] text-xs disabled:bg-gray-200 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* 🔹 Loading Indicator */}
          {loading && (
            <p className="absolute left-[130px] top-[130px] text-gray-500 text-sm">
              Searching...
            </p>
          )}

          {/* 🔹 Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute bg-white shadow-lg rounded-md mt-3 left-[120px] w-[calc(100%-240px)] max-h-[220px] overflow-y-auto border border-gray-300 z-10">
              <div className="top-0 bg-[#F7F7FF] font-medium text-sm grid grid-cols-4 gap-4 px-4 py-2 border-b border-gray-200">
                <span>ID</span>
                <span>Borrower</span>
                <span>Scheme</span>
                <span>Amount</span>
              </div>

              {searchResults.map((loan) => (
                <div
                  key={loan.id}
                  onClick={() => handleSelectLoan(loan)}
                  className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer text-sm grid grid-cols-4 gap-4 border-b border-gray-100"
                >
                  <span>{loan.id}</span>
                  <span>{loan.Borrower}</span>
                  <span>{loan.Scheme}</span>
                  <span>₹{loan.Loan_amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className=" w-[1462px] ml-[25px]">
        <div className="bg-[#F7F7FF] p-3  w-full ">
          {/* Section Title */}
          {/* <p className="font-bold text-[20px] text-[#0A2478] ">Loan Details</p> */}

          {/* Loan Fields Row */}
          <div className="flex  gap-2">
            {/* Loan No */}
            {/* <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-1">Loan No</label>
            <input
              type="text"
              name="loanNo"
              value={formData.loanNo}
              onChange={handleChange}
              placeholder="Loan No"
              className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px] text-xs"
            />
          </div> */}

            {/* Loan Date */}
          </div>

          {/* Remark Section */}
          <div className="flex flex-col ">
            <label className="text-[14px] font-medium mb-1">
              Remark <span className="text-red-600">*</span>
            </label>
            <textarea
              name="remark"
              value={formData.remark}
              disabled={isView}
              onChange={(e) => {
                handleChange(e);
                setRemarkError("");
              }}
              placeholder="Enter any remark"
              className="border border-gray-300 px-3 py-2 w-full h-[50px] bg-white rounded-[8px] text-xs"
            ></textarea>

            {remarkError && (
              <span className="text-red-600 text-sm mt-1">{remarkError}</span>
            )}
          </div>
        </div>
      </div>
      {/* 🔹 Loan Details Section */}

      <div
        className="   w-[1462px] ml-[25px] p-2
bg-[#FFE6E6]"
      >
        <h1 className="font-bold text-[20px] text-[#0A2478] mb-2 ">
          Charges Details
        </h1>

        <div className="p-2">
          <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#0A2478] text-white text-center">
                  <th className="py-1 border">Sr No</th>
                  <th className="py-1 border">Charges</th>
                  <th className="py-1 border">Account</th>
                  <th className="py-1 border">Date</th>
                  <th className="py-1 border">Gross Amount</th>
                  <th className="py-1 border">CGST(%)</th>
                  <th className="py-1 border">CGST Amt</th>
                  <th className="py-1 border">SGST(%)</th>
                  <th className="py-1 border">SGST Amt</th>
                  <th className="py-1 border">Net Payable</th>
                  <th className="py-1 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="text-center bg-white">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">
                      <select
                        value={row.charges}
                        disabled={isView}
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
                        disabled={isView}
                        value={row.account}
                        readOnly
                        className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-gray-100"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="date"
                        value={row.date}
                        disabled={isView}
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
                        disabled={isView}
                        onChange={(e) =>
                          handleRowChange(index, "grossAmount", e.target.value)
                        }
                        style={{
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
                        className="border border-gray-300 rounded-md px-2 py-1 w-[100px]"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={row.cgstPercent}
                        disabled={isView}
                        onChange={(e) =>
                          handleRowChange(index, "cgstPercent", e.target.value)
                        }
                        style={{
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
                        className="border border-gray-300 rounded-md px-2 py-1 w-[70px]"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={row.cgstAmount}
                        disabled={isView}
                        readOnly
                        style={{
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
                        className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={row.sgstPercent}
                        disabled={isView}
                        onChange={(e) =>
                          handleRowChange(index, "sgstPercent", e.target.value)
                        }
                        style={{
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
                        className="border border-gray-300 rounded-md px-2 py-1 w-[70px]"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={row.sgstAmount}
                        disabled={isView}
                        readOnly
                        style={{
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
                        className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        style={{
                          MozAppearance: "textfield",
                        }}
                        disabled={isView}
                        onWheel={(e) => e.target.blur()}
                        value={row.netPayable}
                        readOnly
                        className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-gray-100"
                      />
                    </td>
                    <td className="py-2 flex justify-center items-center gap-2">
                      <button
                        onClick={handleAddRow}
                        disabled={isView}
                        className={`px-2 py-2 rounded text-white ${
                          isView
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#0A2478] hover:bg-blue-700"
                        }`}
                      >
                        <IoIosAddCircleOutline size={17} />
                      </button>

                      <button
                        onClick={() => handleRemoveRow(index)}
                        disabled={isView}
                        className={`px-2 py-2 rounded text-white ${
                          isView
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
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
      {/* Charges Table Section */}
      {loading && <Loader />}
    </div>
  );
}

export default AddLoanCharges;
