import axios from "axios";
import { Save, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../api";

const FundTransferceissueCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.fundData;
  const navyBlue = "bg-[#0D3082]";
  const tealHeader = "bg-[#008b8b]";

  const inputClass =
    "border border-gray-300 rounded-sm px-1 py-0.5 text-[11px] outline-none focus:border-blue-500 focus:bg-[#ffffcc] w-full h-[22px]";
  const labelClass = "text-[11px] text-gray-700 whitespace-nowrap min-w-[85px]";
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  // ✅ Main Form State
  const [formData, setFormData] = useState({
    // docNo: "",
    docDate: "",
    payMode: "Cash",
    account: "",
    chequeNo: "",
    chequeDate: "",
    remarks: "",
  });

  // ✅ Table Rows State
  const [rows, setRows] = useState([
    {
      brachId: "",
      toBranch: "",
      onBehalf: "",
      amount: "",
      // remark: "",
    },
  ]);
  const [branches, setBranches] = useState([]);
  useEffect(() => {
  
      fetchBanks();
   
      // reset bank when switching back to Cash
      setFormData((prev) => ({ ...prev, bankId: "" }));
   
  }, [formData.payMode]);

  const fetchBanks = async () => {
    try {
      setLoadingBanks(true);
      const res = await fetch("https://slunawat.co.in/api/banks/list");
      const data = await res.json();
      setBanks(data || []);
    } catch (err) {
      console.error("Bank API error", err);
    } finally {
      setLoadingBanks(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);
  useEffect(() => {
    if (editData) {
      setFormData({
        docDate: editData.doc_date,
        payMode: editData.pay_mode,
        account: editData.account,
        chequeNo: editData.cheque_no,
        chequeDate: editData.cheque_date,
        remarks: editData.remarks,
      });

      setRows(editData.transferDetails);
    }
  }, [editData]);

  const fetchBranches = async () => {
    try {
      const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);
      setBranches(res.data.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // 🔹 Handle Header Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Table Inputs
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // 🔹 Add Row
  const addRow = () => {
    setRows([...rows, { toBranch: "", onBehalf: "", amount: "", remark: "" }]);
  };

  // 🔹 Remove Row
  const removeRow = () => {
    if (rows.length === 1) return;
    setRows(rows.slice(0, -1));
  };

  // 🔹 Save Data
  const handleSave = async () => {
    const finalData = {
      ...formData,
      transferDetails: rows,
    };

    try {
      const res = await axios.post(`${API}/FundTransfer/create`, finalData);

      if (res.data.success) {
        alert("Fund Transfer Saved Successfully ✅");
        navigate("/FundTransfer/issue");
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("Error while saving data ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-gray-800">
      <div className="p-1">
        {/* Header Form */}
        <div className="bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden mb-1">
          <div
            className={`${tealHeader} text-white px-2 py-0.5 text-[11px] font-bold`}
          >
            Create Fund Transfer
          </div>

          <div className="p-2 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1">
            {/* <div className="flex items-center gap-1">
              <label className={labelClass}>Doc No.</label>
              <input
                name="docNo"
                value={formData.docNo}
                onChange={handleChange}
                className={`${inputClass} bg-gray-100`}
                // readOnly
              />
            </div> */}

            <div className="flex items-center gap-1">
              <label className={labelClass}>Doc Date</label>
              <input
                type="Date"
                name="docDate"
                value={formData.docDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-1">
              <label className={labelClass}>Pay Mode *</label>
              <select
                name="payMode"
                value={formData.payMode}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">--Select--</option>
                <option value="Cash">Cash</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            {/* <div className="flex items-center gap-1">
              <label className={labelClass}>Account *</label>
              <input
                name="account"
                value={formData.account}
                onChange={handleChange}
                className={inputClass}
              />
            </div> */}
            {/* {formData.payMode === "Cash" && (
              <div className="flex ">
                <label className={labelClass}>Cash A/c</label>

                <select
                  className={inputClass}
                  // disabled={mode === "view"}
                  value={"CASH"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accountId: e.target.value,
                    })
                  }
                >
                  <option value="CASH">Cash</option>
                </select>
              </div>
            )} */}

            
              <div className="flex ">
                <label className={labelClass}>Bank A/c</label>
                <select
                  className={inputClass}
                  // disabled={mode === "view" || loadingBanks}
                  value={formData.bankId}
                  onChange={(e) =>
                    setFormData({ ...formData, bankId: e.target.value })
                  }
                >
                  <option value="">
                    {loadingBanks ? "Loading..." : "--Select Bank--"}
                  </option>

                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.bank_name}
                    </option>
                  ))}
                </select>
              </div>
          
           
            <div className="flex items-start gap-1 lg:col-span-4 mt-0.5">
              <label className={labelClass}>Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className={`${inputClass} h-10 resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className=" border-teal-600/40 rounded-sm overflow-hidden border-l-2 border-l-teal-600 p-5">
          <table className="w-[600px] text-left table-fixed border-collapse bg-white ">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-[10px] font-bold border-b border-gray-300">
                <th className="p-1 border-r border-gray-300 w-[50px] text-center">
                  SI
                </th>
                <th className="p-1 border-r border-gray-300">To Branch</th>
                {/* <th className="p-1 border-r border-gray-300">On Behalf Of</th> */}
                <th className="p-1 border-r border-gray-300 w-[120px]">
                  Amount
                </th>
                {/* <th className="p-1 border-r border-gray-300">Remark</th> */}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="p-1 border-r text-center">{index + 1}</td>

                  <td className="p-1 border-r">
                    <select
                      className={inputClass}
                      value={row.brachId}
                      onChange={(e) => {
                        const selectedBranch = branches.find(
                          (branch) => branch.id.toString() === e.target.value,
                        );

                        if (selectedBranch) {
                          const updatedRows = [...rows];
                          updatedRows[index].brachId = selectedBranch.id;
                          updatedRows[index].toBranch =
                            selectedBranch.branch_name;
                          setRows(updatedRows);
                        }
                      }}
                    >
                      <option value="">--Select Branch--</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* <td className="p-1 border-r">
                    <input
                      className={inputClass}
                      value={row.onBehalf}
                      onChange={(e) =>
                        handleRowChange(index, "onBehalf", e.target.value)
                      }
                    />
                  </td> */}

                  <td className="p-1 border-r">
                    <input
                      type="number"
                      className={`${inputClass} text-right`}
                      value={row.amount}
                      onChange={(e) =>
                        handleRowChange(index, "amount", e.target.value)
                      }
                    />
                  </td>

                  {/* <td className="p-1 border-r">
                    <input
                      className={inputClass}
                      value={row.remark}
                      onChange={(e) =>
                        handleRowChange(index, "remark", e.target.value)
                      }
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* <div className="p-1 bg-gray-50 flex gap-2 justify-center">
            <button
              onClick={addRow}
              className={`${navyBlue} text-white px-3 py-0.5 text-[10px] font-bold flex items-center gap-1`}
            >
              <Plus size={12} /> Add
            </button>
            <button
              onClick={removeRow}
              className={`${navyBlue} text-white px-3 py-0.5 text-[10px] font-bold flex items-center gap-1`}
            >
              <Trash2 size={12} /> Remove
            </button>
          </div> */}
        </div>

        {/* Footer */}
        <div className="mt-2 flex gap-1">
          {!editData && (
            <button
              onClick={handleSave}
              className={`${navyBlue} text-white px-6 py-0.5 text-[11px] font-bold flex items-center gap-1`}
            >
              <Save size={14} /> Save
            </button>
          )}

          <button
            onClick={() => navigate("/FundTransfer/issue")}
            className={`${navyBlue} text-white px-6 py-0.5 text-[11px] font-bold flex items-center gap-1`}
          >
            <XCircle size={14} /> Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundTransferceissueCreate;
