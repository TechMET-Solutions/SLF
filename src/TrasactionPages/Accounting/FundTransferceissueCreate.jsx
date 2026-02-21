import axios from "axios";
import { Save, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../api";

const FundTransferIssueCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.fundData;
const isViewMode = editData;
  // Constants
  const navyBlue = "bg-[#0D3082]";
  const inputClass =
    "border border-gray-300 rounded-sm px-2 py-1 text-[11px] w-full outline-none focus:border-blue-500 focus:bg-[#ffffcc] bg-white";
  const labelClass = "text-[11px] font-bold text-gray-700 uppercase";
  // States
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [branches, setBranches] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [formData, setFormData] = useState({
    docDate: new Date().toISOString().split("T")[0],
    payMode: "Cash",
    bankId: "",
  });

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");

  const [rows, setRows] = useState([
    {
      FromBrachId: selectedBranchId,
      FromBranch: "",
      ToBrachId: selectedBranchId,
      toBranch: "",
      amount: "",
      remark: "",
    },
  ]);
  console.log(rows, "FromBrachId");

  useEffect(() => {
    debugger;
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.branchId) {
      console.log("Branch ID:", userData.branchId.branch_code);
      console.log("Branch Name:", userData.branchId.branch_name);

      setSelectedBranch(userData.branchId.branch_name);
      // setRows(userData.branchId.id);
      if (editData) {
        if (editData) {

          const formattedDate = editData.doc_date
      ? editData.doc_date.split("T")[0]
      : "";
          setFormData({
            docDate: formattedDate,
            payMode: editData.pay_mode,
            bankId: editData.bank_id || "",
          });

          setRows([
            {
              FromBrachId: editData.from_branch_id,
              FromBranch: editData.from_branch_name,
              ToBrachId: editData.to_branch_id,
              toBranch: editData.to_branch_name,
              amount: editData.amount,
              remark: editData.remark,
            },
          ]);
        }
      } else {
        setRows([
          {
            FromBrachId: userData.branchId.id,
            FromBranch: userData.branchId.branch_name,
            ToBrachId: "",
            toBranch: "",
            amount: "",
            remark: "",
          },
        ]);
      }
    }
  }, [!editData]);
  console.log(selectedBranch, selectedBranchId, "id and selectedbranch");
  // Fetching Data
  useEffect(() => {
    fetchBranches();
    fetchBanks();
  }, []);

  useEffect(() => {
    const total = rows.reduce((acc, row) => acc + Number(row.amount || 0), 0);
    setTotalAmount(total);
  }, [rows]);

  const fetchBanks = async () => {
    try {
      setLoadingBanks(true);
      const res = await axios.get(`https://slunawat.co.in/api/banks/list`);
      setBanks(res.data || []);
    } catch (err) {
      console.error("Bank API error", err);
    } finally {
      setLoadingBanks(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);
      setBranches(res.data.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSave = async () => {
    if (totalAmount <= 0) return alert("Please enter at least one amount");
    const finalData = { ...formData, transferDetails: rows };
    try {
      const res = await axios.post(
        `${API}/api/FundTransfer/create`,
        finalData,
      );
      if (res.data.success) {
        alert("Fund Transfer Saved Successfully ✅");
        navigate("/FundTransfer/issue");
      }
    } catch (error) {
      alert("Error while saving data ❌");
    }
  };

  return (
    <div className="min-h-screen  flex justify-center p-2">
      <div className="max-w-[1300px] w-full space-y-2 p-6">
        {/* STICKY HEADER ACTIONS */}
        <div className="sticky top-0 z-10 bg-white border rounded-lg shadow-sm p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-red-600 font-bold text-lg">
              Fund Transfer Issue
            </h2>
            {/* <div className="h-6 w-[1px] bg-gray-300 mx-2"></div> */}
            {/* <p className="text-[12px] font-bold text-blue-900">TOTAL: ₹{totalAmount.toLocaleString()}</p> */}
          </div>
          <div className="flex gap-2">
            {
              !editData && (
                 <button
              onClick={handleSave}
              className={`${navyBlue} text-white px-6 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 hover:opacity-90`}
            >
              <Save size={14} /> SAVE
            </button>
              )
            }
           
            <button
              onClick={() => navigate(-1)}
              className="bg-red-700 text-white px-6 py-1.5 rounded text-[11px] font-bold flex items-center gap-2 hover:bg-red-700"
            >
              EXIT
            </button>
          </div>
        </div>

        {/* MASTER INFORMATION TABLE */}
        <div className="bg-white border rounded shadow-sm overflow-hidden mt-5 w-[500px]">
          <div
            className={`${navyBlue} text-white px-3 py-1 text-[15px] font-bold`}
          >
            Fund Transfer Issue
          </div>
          <div className="p-3 flex gap-4">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Doc Date</label>
              <input
                type="date"
                disabled={isViewMode}
                value={formData.docDate}
                onChange={(e) =>
                  setFormData({ ...formData, docDate: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1 w-[150px]">
              <label className={labelClass}>Pay Mode</label>
              <select
                className={inputClass}
                disabled={isViewMode}
                value={formData.payMode}
                onChange={(e) =>
                  setFormData({ ...formData, payMode: e.target.value })
                }
              >
                <option value="Cash">Cash</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className={labelClass}>Bank Account (If Banking)</label>
              <select
                className={inputClass}
                
                disabled={formData.payMode === "Cash" || isViewMode}
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
            {/* <div className="flex flex-col gap-1 col-span-4 mt-1">
              <label className={labelClass}>Remarks</label>
              <textarea value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} className={`${inputClass} h-8 resize-none`} placeholder="Narrative for this transfer..." />
            </div> */}
          </div>
        </div>

        {/* TRANSFER ROWS TABLE */}
        <div className="bg-white border rounded shadow-sm overflow-hidden w-[800px]">
          <table className=" text-[11px] border-collapse">
            <thead className={`${navyBlue} text-white`}>
              <tr>
                <th className="p-2 border-r  w-12 text-center">SI</th>
                <th className="p-2 border-r  text-left w-[200px]">To Branch</th>
                {/* <th className="p-2 border-r  text-left">On Behalf Of</th> */}
                <th className="p-2 border-r text-left ">Amount (₹)</th>
                <th className="p-2 border-r  text-left w-[400px]">Remark</th>
                {/* <th className="p-2 w-20 text-center">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-2 text-center   font-bold text-gray-500">
                    {index + 1}
                  </td>
                  <td className="p-2 ">
                    {/* <select
                      className={inputClass}
                      value={row.brachId}
                      onChange={(e) => {
                        const branch = branches.find(
                          (b) => b.id.toString() === e.target.value,
                        );
                        if (branch) {
                          const updated = [...rows];
                          updated[index].ToBrachId = branch.id;
                          updated[index].toBranch = branch.branch_name;
                          setRows(updated);
                        }
                      }}
                    >
                      <option value="">--Select Branch--</option>
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.branch_name}
                        </option>
                      ))}
                    </select> */}
                    <select
                      className={inputClass}
                      disabled={isViewMode}
  value={row.ToBrachId || ""}
  onChange={(e) => {
    const branch = branches.find(
      (b) => b.id.toString() === e.target.value
    );

    if (branch) {
      const updated = [...rows];
      updated[index].ToBrachId = branch.id;
      updated[index].toBranch = branch.branch_name;
      setRows(updated);
    }
  }}
>
  <option value="">--Select Branch--</option>
  {branches.map((b) => (
    <option key={b.id} value={b.id}>
      {b.branch_name}
    </option>
  ))}
</select>
                  </td>
                  {/* <td className="p-2 border-r">
                    <input className={inputClass} value={row.onBehalf} onChange={(e) => handleRowChange(index, "onBehalf", e.target.value)} />
                  </td> */}
                  <td className="p-2">
                    <input
                      type="number"
                      className={`${inputClass} text-right font-bold text-blue-800`}
                      value={row.amount}
                      disabled={isViewMode}
                      onChange={(e) =>
                        handleRowChange(index, "amount", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-2 ">
                    <input
                      className={inputClass}
                      disabled={isViewMode}
                      value={row.remark}
                      onChange={(e) =>
                        handleRowChange(index, "remark", e.target.value)
                      }
                    />
                  </td>
                  {/* <td className="p-2">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleAddRow(index)} className="text-blue-600 hover:scale-125" title="Copy Row">
                        <Plus size={16} strokeWidth={3} />
                      </button>
                      <button onClick={() => removeRow(index)} className="text-red-500 hover:scale-125" title="Delete Row">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td
                  colSpan="3"
                  className="p-2 text-right uppercase text-[10px]"
                >
                  Total Transfer Amount:
                </td>
                <td className="p-2 text-right text-blue-900 text-[12px]">
                  ₹{totalAmount.toLocaleString()}
                </td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundTransferIssueCreate;
