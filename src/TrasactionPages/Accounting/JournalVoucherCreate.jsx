import axios from "axios";
import { Plus, Save, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";

const today = () => new Date().toISOString().split("T")[0];

const JournalVoucherCreate = () => {
  const navigate = useNavigate();

  const [accountList, setAccountList] = useState([]);
  const [banks, setBanks] = useState([]);

  const [voucherData, setVoucherData] = useState({
    voucherDate: today(),
    narration: "",
    depositAmount: 0,
    withdrawalAmount: 0,
    diffAmount: 0,
    bankId: "",
    bankName: "",
    payMode: "Cash", // <--- Initialize here
  });

  const [rows, setRows] = useState([
    {
      accountId: "",
      accountName: "",
      date: today(),
      type: "", // Deposit / Withdrawal
      amount: "",
      remark: "",
    },
  ]);

  // ================= FETCH BANKS =================
  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API}/api/banks/list`);
      setBanks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH ACCOUNTS =================
  useEffect(() => {
    axios
      .get(`${API}/account-code/accounts/cash-subledger`)
      .then((res) => setAccountList(res.data))
      .catch(console.error);
  }, []);

  // ================= AUTO TOTAL =================
  useEffect(() => {
    let deposit = 0;
    let withdrawal = 0;

    rows.forEach((r) => {
      const amt = Number(r.amount || 0);
      if (r.type === "Deposit") deposit += amt;
      if (r.type === "Withdrawal") withdrawal += amt;
    });

    setVoucherData((prev) => ({
      ...prev,
      depositAmount: deposit,
      withdrawalAmount: withdrawal,
      diffAmount: deposit - withdrawal,
    }));
  }, [rows]);

  // ================= ROW CHANGE =================
  const handleRowChange = (i, field, value) => {
    const updated = [...rows];
    updated[i] = { ...updated[i], [field]: value };
    setRows(updated);
  };

  // ================= ADD ROW =================
  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        accountId: "",
        accountName: "",
        date: voucherData.voucherDate,
        type: "",
        amount: "",
        remark: "",
      },
    ]);
  };

  // ================= REMOVE ROW =================
  const removeRow = (i) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, idx) => idx !== i));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    if (!voucherData.narration) {
      alert("Narration required");
      return;
    }

    if (voucherData.diffAmount !== 0) {
      alert("Deposit & Withdrawal must match");
      return;
    }

    try {
      await axios.post(`${API}/api/journalVoucher/create`, {
        ...voucherData,
        rows,
      });

      alert("Journal Voucher Saved");
      navigate("/JournalVoucher/list");
    } catch (err) {
      alert("Error saving voucher");
      console.error(err);
    }
  };

  // ================= STYLES =================
  const navyBlue = "bg-[#0D3082]";
  const tealHeader = "bg-[#008b8b]";
  const inputClass =
    "border border-gray-300 rounded-sm px-1.5 py-0.5 text-[11px] w-full";
  const labelClass =
    "text-[11px] font-bold text-gray-700 whitespace-nowrap min-w-[100px]";

  return (
    <div className="min-h-screen text-gray-800 flex justify-center mt-5">
      <div className="max-w-[1400px] w-full">

        {/* HEADER */}
        <div className="bg-white border rounded-sm mb-2">
          <div className={`${tealHeader} text-white px-3 py-1 text-[11px] font-bold`}>
            Create Journal Voucher
          </div>

          <div className="p-3 grid grid-cols-2 gap-8 max-w-[1000px]">

            {/* LEFT */}
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <label className={labelClass}>Voucher Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={voucherData.voucherDate}
                  onChange={(e) =>
                    setVoucherData({
                      ...voucherData,
                      voucherDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-2 items-center">
                <label className={labelClass}>Narration *</label>
                <textarea
                  className={`${inputClass} h-10`}
                  value={voucherData.narration}
                  onChange={(e) =>
                    setVoucherData({
                      ...voucherData,
                      narration: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex">
                <label className={labelClass}>
                  Bank A/c <span className="text-red-500">*</span>
                </label>
              <select
  name="bankId"
  value={voucherData.bankId}
  onChange={(e) => {
    const selectedId = e.target.value;

    const selectedBank = banks.find(
      (bank) => String(bank.id) === String(selectedId)
    );

    setVoucherData((prev) => ({
      ...prev,
      bankId: selectedId,
      bankName: selectedBank?.bank_name || "",
    }));
  }}
  className="border border-gray-300 rounded  outline-none "
>
  <option value="">--Select Bank--</option>

  {banks.map((bank) => (
    <option key={bank.id} value={bank.id}>
      {bank.bank_name}
    </option>
  ))}
                  
</select>

              </div>

              <div className="flex gap-2 items-center">
  <label className={labelClass}>Pay Mode *</label>
  <select
    className={inputClass}
    value={voucherData.payMode}
    onChange={(e) => {
      const mode = e.target.value;
      setVoucherData((prev) => ({
        ...prev,
        payMode: mode,
        // If "Cash" is selected, reset bank fields to empty strings
        bankId: mode === "Cash" ? "" : prev.bankId,
        bankName: mode === "Cash" ? "" : prev.bankName,
      }));
    }}
  >
    <option value="Cash">Cash</option>
    <option value="Net Banking">Net Banking</option>
  </select>
</div>
            </div>

            {/* RIGHT */}
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <label className={labelClass}>Total Withdrawal</label>
                <input
                  readOnly
                  className={`${inputClass} bg-gray-100 text-right`}
                  value={voucherData.withdrawalAmount}
                />
              </div>

              <div className="flex gap-2 items-center">
                <label className={labelClass}>Total Deposit</label>
                <input
                  readOnly
                  className={`${inputClass} bg-gray-100 text-right`}
                  value={voucherData.depositAmount}
                />
              </div>

              <div className="flex gap-2 items-center">
                <label className={labelClass}>Diff. Amount</label>
                <input
                  readOnly
                  className={`${inputClass} bg-gray-100 text-right`}
                  value={voucherData.diffAmount}
                />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full text-[11px] border">
          <thead className={`${navyBlue} text-white`}>
            <tr>
              <th>SI</th>
              <th>Account</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b">
                <td>{i + 1}</td>

                <td>
                  <select
                    className={inputClass}
                    value={row.accountId}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedAccount = accountList.find(
                        (acc) => String(acc.id) === String(selectedId)
                      );

                      const updated = [...rows];
                      updated[i] = {
                        ...updated[i],
                        accountId: selectedId,
                        accountName: selectedAccount?.name || "",
                      };

                      setRows(updated);
                    }}
                  >
                    <option value="">Select</option>
                    {accountList.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    type="date"
                    className={inputClass}
                    value={row.date}
                    onChange={(e) =>
                      handleRowChange(i, "date", e.target.value)
                    }
                  />
                </td>

                <td>
                  <select
                    className={inputClass}
                    value={row.type}
                    onChange={(e) =>
                      handleRowChange(i, "type", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option>Deposit</option>
                    <option>Withdrawal</option>
                  </select>
                </td>

                <td>
                  <input
                    type="number"
                    className={`${inputClass} text-right`}
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(i, "amount", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className={inputClass}
                    value={row.remark}
                    onChange={(e) =>
                      handleRowChange(i, "remark", e.target.value)
                    }
                  />
                </td>

                <td className="flex gap-1">
                  <button onClick={addRow}>
                    <Plus size={12} />
                  </button>
                  <button onClick={() => removeRow(i)}>
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ACTION */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSave}
            className={`${navyBlue} text-white px-6 py-1 flex gap-2 items-center`}
          >
            <Save size={14} /> Save
          </button>

          <button
            onClick={() => navigate("/JournalVoucher/list")}
            className={`${navyBlue} text-white px-6 py-1 flex gap-2 items-center`}
          >
            <XCircle size={14} /> Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalVoucherCreate;
