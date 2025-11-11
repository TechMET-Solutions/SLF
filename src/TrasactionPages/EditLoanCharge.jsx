import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { API } from "../api";

function ViewLoanCharges() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loanId } = location.state || {}; // 🔹 Passed from LoanChargesList page

  const [loanData, setLoanData] = useState(null);
  const [chargesList, setChargesList] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all available charges
  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const res = await axios.get(`${API}/Master/GetChargesProfile/Active`);
        if (res.data.success) setChargesList(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching charges:", error);
      }
    };
    fetchCharges();
  }, []);

  // ✅ Fetch loan charge details by ID
  useEffect(() => {
    const fetchLoanCharges = async () => {
      if (!loanId) return;
      try {
        setLoading(true);
        const res = await axios.get(`${API}/loan-charges/getById/${loanId}`);
        if (res.data.success) {
          const data = res.data.data;
          setLoanData({
            partyName: data.party_name,
            scheme: data.scheme,
            loanNo: data.loan_no,
            loanDate: formatDate(data.loan_date),
            loanAmt: data.loan_amt,
            pendingAmt: data.pending_amt,
            remark: data.remark,
          });
          setRows(data.charges_details || []);
        } else {
          alert("⚠️ Loan charge not found!");
          navigate("/loan-charges-list");
        }
      } catch (error) {
        console.error("❌ Error fetching loan charges:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoanCharges();
  }, [loanId, navigate]);

  // ✅ Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // ✅ Handle loan details change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle row changes
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

  // ✅ Handle update
  const handleUpdate = async () => {
    try {
      const payload = {
        loan_no: loanData.loanNo,
        loan_date: loanData.loanDate,
        scheme: loanData.scheme,
        party_name: loanData.partyName,
        loan_amt: loanData.loanAmt,
        pending_amt: loanData.pendingAmt,
        remark: loanData.remark,
        charges_details: rows,
        updated_by: "Admin",
        total_charges: totalNetPayable.toFixed(2)
      };

      const res = await axios.put(`${API}/loan-charges/update/${loanId}`, payload);
      if (res.data.success) {
        alert("✅ Loan charges updated successfully!");
        navigate("/loan-charges-list");
      } else {
        alert("⚠️ Update failed!");
      }
    } catch (error) {
      console.error("❌ Update Error:", error);
      alert("Server error while updating loan charges!");
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (!loanData) return null;

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">Edit Loan Charges</h2>
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-[#0A2478] text-white text-sm rounded px-6 py-1 cursor-pointer"
            >
              Update
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

      {/* Loan Details Section */}
      <div className="bg-[#F7F7FF] p-8 rounded-md w-full mx-auto px-[120px]">
        <p className="font-bold text-[24px] text-[#0A2478] mb-6">Loan Details</p>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-1">Loan No</label>
            <input
              type="text"
              name="loanNo"
              value={loanData.loanNo}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-1">Loan Date</label>
            <input
              type="date"
              name="loanDate"
              value={loanData.loanDate}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-1">Scheme</label>
            <input
              type="text"
              name="scheme"
              value={loanData.scheme}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-[180px] bg-white rounded-[8px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-1">Party Name</label>
            <input
              type="text"
              name="partyName"
              value={loanData.partyName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-[280px] bg-white rounded-[8px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-1">Loan Amt.</label>
            <input
              type="number"
              name="loanAmt"
              value={loanData.loanAmt}
              onChange={handleChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 px-3 py-2 w-[150px] bg-white rounded-[8px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-1">Pending Amt.</label>
            <input
              type="number"
              name="pendingAmt"
              value={loanData.pendingAmt}
              onChange={handleChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 px-3 py-2 w-[150px] bg-white rounded-[8px]"
            />
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label className="text-[14px] font-medium mb-1">
            Remark <span className="text-red-600">*</span>
          </label>
          <textarea
            name="remark"
            value={loanData.remark}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 w-[600px] h-[90px] bg-white rounded-[8px]"
          ></textarea>
        </div>
      </div>

      {/* Charges Table */}
      <h1 className="font-bold text-[24px] text-[#0A2478] mb-4 mt-6 px-[120px]">Charges Details</h1>

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
                      onChange={(e) => handleRowChange(index, "charges", e.target.value)}
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
                      onChange={(e) => handleRowChange(index, "date", e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.grossAmount}
                      onChange={(e) => handleRowChange(index, "grossAmount", e.target.value)}
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
                      onChange={(e) => handleRowChange(index, "cgstPercent", e.target.value)}
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
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.sgstPercent}
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => handleRowChange(index, "sgstPercent", e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 w-[70px]"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.sgstAmount}
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.netPayable}
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
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

export default ViewLoanCharges;
