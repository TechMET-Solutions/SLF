import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

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

  const [chargesList, setChargesList] = useState([]); // active charges from backend
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

  // ✅ Fetch active charges from backend
  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/Master/GetChargesProfile/Active"
        );
        if (res.data.success) {
          setChargesList(res.data.data);
        } else {
          console.error("⚠️ Unexpected response:", res.data);
        }
      } catch (error) {
        console.error("❌ Error fetching charges:", error);
      }
    };
    fetchCharges();
  }, []);

  useEffect(() => {
    document.title = "SLF | Loan Charges";
  }, []);

  // ✅ Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle row field updates
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // 🔹 Auto-fill account & gross amount when selecting a charge
    if (field === "charges") {
      const selected = chargesList.find((ch) => ch.id === parseInt(value));
      if (selected) {
        updatedRows[index].account = selected.account || "";
        updatedRows[index].grossAmount = selected.amount || "";
      }
    }

    // 🔹 Calculate CGST / SGST amounts & Net Payable
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

  // ✅ Add new row
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

  // ✅ Remove selected row
  const handleRemoveRow = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  // ✅ Total of all Net Payables
  const totalNetPayable = rows.reduce(
    (sum, r) => sum + (parseFloat(r.netPayable) || 0),
    0
  );

  // ✅ Handle Submit
  const handleSubmit = async () => {
    try {
      const payload = { ...formData, charges: rows };
      console.log(payload);
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Error submitting charges!");
    }
  };
  return (
    <div className="min-h-screen w-full">
      {/* 🔹 Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2 className="text-red-600 font-bold text-[20px]">
            Add Loan Charges
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/add-loan-charge")}
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

      {/* 🔹Search*/}
      <div className="bg-[#FFE6E6] mt-5 p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4">
          Search
        </p>

        <div className="flex gap-3">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Party Name</label>
              </div>

              <input
                type="text"
                name="Permanent_Address"
                value={formData.Permanent_Address}
                onChange={handleChange}
                placeholder="Party Name"
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Schemes</label>
              </div>

              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                placeholder="Schemes"
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px] bg-white rounded-[8px]"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Loan No</label>
              </div>
              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                placeholder="Loan No"
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px] bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div></div>
        </div>
      </div>
      {/* 🔹Loan Detils*/}
      <div className="bg-[#F7F7FF]  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <p className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4">
          Loan Detils
        </p>

        <div className="flex gap-3">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Loan No</label>
              </div>

              <input
                type="text"
                name="Permanent_Address"
                value={formData.Permanent_Address}
                onChange={handleChange}
                placeholder="Loan No"
                className="border border-gray-300 px-3 py-2 mt-1 w-[150px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Loan Date</label>
              </div>

              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                placeholder="Loan Date"
                className="border border-gray-300 px-3 py-2 mt-1 w-[150px] bg-white rounded-[8px]"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Scheme</label>
              </div>
              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                placeholder="Scheme"
                className="border border-gray-300 px-3 py-2 mt-1 w-[150 px] bg-white rounded-[8px]"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Party Name</label>
              </div>
              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                placeholder="Party Name"
                className="border border-gray-300 px-3 py-2 mt-1 w-[300px] bg-white rounded-[8px]"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Loan Amt.</label>
              </div>
              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                placeholder="Loan Amt."
                className="border border-gray-300 px-3 py-2 mt-1 w-[150 px] bg-white rounded-[8px]"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Pending Amt.</label>
              </div>
              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                placeholder="Pending Amt."
                className="border border-gray-300 px-3 py-2 mt-1 w-[150 px] bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div></div>
        </div>
      </div>

      <div className="bg-[#FFE6E6]  p-6 rounded-md w-full mx-auto pl-[120px] pr-[120px]">
        <div className="flex gap-3">
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Documnet No</label>
              </div>

              <input
                type="text"
                name="Permanent_Address"
                value={formData.Permanent_Address}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px]  bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Document Date</label>
              </div>

              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px] bg-white rounded-[8px]"
              />
            </div>
          </div>
          <div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">
                  Remark <spam className="text-red-600">*</spam>
                </label>
              </div>
              <input
                type="text"
                name="Permanent_Pincode"
                value={formData.Permanent_Pincode}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 mt-1 w-[385px] bg-white rounded-[8px]"
              />
            </div>
          </div>

          <div></div>
        </div>
      </div>
       <h1 className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4 mt-6 px-30">
        Charges Details
      </h1>

     
     {/* 🔹 Charges Details */}
      <h1 className="font-[Source_Sans_3] font-bold text-[24px] text-[#0A2478] mb-4 mt-6 px-[120px]">
        Charges Details
      </h1>

      <div className="px-[120px]">
        <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#0A2478] text-white text-center">
                <th className="py-2 px-2 border">Sr No</th>
                <th className="py-2 px-2 border">Charges</th>
                <th className="py-2 px-2 border">Account</th>
                <th className="py-2 px-2 border">Date</th>
                <th className="py-2 px-2 border">Gross Amount</th>
                <th className="py-2 px-2 border">CGST(%)</th>
                <th className="py-2 px-2 border">CGST Amt</th>
                <th className="py-2 px-2 border">SGST(%)</th>
                <th className="py-2 px-2 border">SGST Amt</th>
                <th className="py-2 px-2 border">Net Payable</th>
                <th className="py-2 px-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="text-center bg-white">
                  <td className="py-2">{index + 1}</td>

                  {/* Charges Select */}
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
                          {ch.description}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Account */}
                  <td className="py-2">
                    <input
                      type="text"
                      value={row.account}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-gray-100"
                    />
                  </td>

                  {/* Date */}
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

                  {/* Gross Amount */}
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

                  {/* CGST (%) */}
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

                  {/* CGST Amt */}
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.cgstAmount}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                    />
                  </td>

                  {/* SGST (%) */}
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

                  {/* SGST Amt */}
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.sgstAmount}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[90px] bg-gray-100"
                    />
                  </td>

                  {/* Net Payable */}
                  <td className="py-2">
                    <input
                      type="number"
                      value={row.netPayable}
                      readOnly
                      className="border border-gray-300 rounded-md px-2 py-1 w-[120px] bg-gray-100"
                    />
                  </td>

                  {/* Action */}
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

              {/* Total Row */}
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