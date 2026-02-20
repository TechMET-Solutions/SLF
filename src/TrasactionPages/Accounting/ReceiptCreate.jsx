import axios from "axios";
import { Plus, Save, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../api";

const ReceiptCreate = () => {
  const navyBlue = "bg-[#0D3082]";
  const tealGreen = "bg-[#008b8b]";
  const inputClass =
    "w-full border border-gray-300 rounded-sm px-1.5 py-1 text-[12px] outline-none focus:border-blue-500 focus:bg-[#ffffcc]";
  const labelClass = "text-[12px] font-bold text-gray-700 mb-1";
  const location = useLocation();
  const receiptDataFromList = location.state?.receipt;
  const mode = location.state?.mode;
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [partyList, setPartyList] = useState([]);
  console.log(partyList, "partyList");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedParty, setSelectedParty] = useState(null);
  console.log(selectedParty, "selectedParty");

  const getTodayDate = () => {
    const d = new Date();
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  };
  const [receiptData, setReceiptData] = useState({
    docDate: getTodayDate(),
    partyType: "All",
    partyId: "",
    partyName: "",
    payMode: "Cash",
    selectedBank: null,
    bankName: "",
    accountId: "",
    chequeNo: "",
    chequeDate: "",
    remarks: "",
    totalAmount: 0,
  });
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  console.log(receiptData, "receiptData");
  const [rows, setRows] = useState([
    {
      subLedgerId: "",
      ledgerName: "",
      date: "",
      amount: "",
      // remark: "",
    },
  ]);







//   const fetchBanks = async () => {
//   try {
//     setLoadingBanks(true);
//     const res = await fetch("https://slunawat.co.in/api/banks/list");
//     const data = await res.json();
//     setBanks(data || []);
//   } catch (err) {
//     console.error("Bank API error", err);
//   } finally {
//     setLoadingBanks(false);
//   }
// };

  useEffect(() => {
    fetchAccounts();
    fetchBanks()
  }, []);
  useEffect(() => {
    if (receiptData.payMode === "Net Banking") {
      fetchBanks();
    } else {
      // reset bank when switching back to Cash
      setReceiptData((prev) => ({ ...prev, bankId: "" }));
    }
  }, [receiptData.payMode]);

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
    const total = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
    setReceiptData((prev) => ({ ...prev, totalAmount: total }));
  }, [rows]);
  useEffect(() => {
    if (receiptDataFromList) {
      setReceiptData({
        docDate: receiptDataFromList.docDate,
        partyType: receiptDataFromList.partyType,
        partyId: receiptDataFromList.partyId,
        payMode: receiptDataFromList.payMode,
        partyName: receiptDataFromList.partyName,
        accountId: receiptDataFromList.accountId,
        chequeNo: receiptDataFromList.chequeNo,
        chequeDate: receiptDataFromList.chequeDate,
        remarks: receiptDataFromList.remarks,
        totalAmount: receiptDataFromList.totalAmount,
      });

      setRows(receiptDataFromList.voucherRows);
    }
  }, [receiptDataFromList]);

  const fetchAccounts = async () => {
    const res = await axios.get(`${API}/account-code/accounts/cash-subledger`);
    setAccounts(res.data);
  };

  const fetchParties = async (value) => {
    if (value.length < 2) return;
    const res = await axios.get(`${API}/party/search?keyword=${value}`);
    setPartyList(res.data.data);
    setShowDropdown(true);
  };

  const handleLedgerChange = (index, id) => {
    const selected = accounts.find((acc) => acc.id === parseInt(id));
    const updated = [...rows];
    updated[index].subLedgerId = selected.id;
    updated[index].ledgerName = selected.name;
    setRows(updated);
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // const handleSaveReceipt = async () => {
  //   debugger;
  //   if (!receiptData.docDate) return alert("Doc Date required");
  //   if (!receiptData.partyId) return alert("Select Party");
  //   if (!receiptData.payMode) return alert("Select Pay Mode");

  //   const payload = { ...receiptData, rows };

  //   console.log(payload);
  //   if (mode === "edit") {
  //     await axios.put(
  //       `${API}/receipt/update/${receiptDataFromList.id}`,
  //       payload,
  //     );
  //   } else {
  //     await axios.post(`${API}/receipt/create`, payload);
  //   }

  //   alert("Receipt Created Successfully");
  // };

  const handleSaveReceipt = async () => {
    if (!receiptData.docDate) return alert("Doc Date required");
    if (!receiptData.partyId) return alert("Select Party");
    if (!receiptData.payMode) return alert("Select Pay Mode");

    let payload = {
      ...receiptData,
      rows,
    };

    // ✅ If PayMode is Bank → attach bank details
    if (receiptData.payMode === "Net Banking") {
      payload = {
        ...payload,
        bankId: receiptData.bankId,
        bankName: receiptData.bankName,
        bankDetails: receiptData.selectedBank, // full object
      };
    }

    console.log("Final Payload:", payload);

    try {
      if (mode === "edit") {
        await axios.put(
          `${API}/receipt/update/${receiptDataFromList.id}`,
          payload,
        );
      } else {
        await axios.post(`${API}/receipt/create`, payload);
      }

      alert("Receipt Saved Successfully");
      navigate("/Receipt_List");
    } catch (error) {
      console.error(error);
      alert("Error saving receipt");
    }
  };

  const addNewRow = () => {
    setRows((prev) => [
      ...prev,
      {
        subLedgerId: "",
        ledgerName: "",
        date: "",
        amount: "",
        // remark: "",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="bg-white border rounded-sm shadow-sm mb-6">
          <div className={`${tealGreen} text-white px-4 py-2`}>
            <h1 className="text-sm font-bold uppercase">
              Create Receipt Voucher
            </h1>
          </div>

          <div className="p-6 grid grid-cols-4 gap-6">
            <div className="flex flex-col">
              <label className={labelClass}>Doc Date</label>
              <input
                type="date"
                className={inputClass}
                disabled={mode === "view"}
                value={
                  receiptData.docDate ? receiptData.docDate.split("T")[0] : ""
                }
                onChange={(e) =>
                  setReceiptData({ ...receiptData, docDate: e.target.value })
                }
              />
            </div>

            {/* <div className="flex flex-col">
              <label className={labelClass}>Party Type</label>
              <select className={inputClass} disabled={mode === "view"}>
                <option>All</option>
              </select>
            </div> */}

            <div className="flex flex-col relative">
              <label className={labelClass}>Party</label>
              <input
                type="text"
                disabled={mode === "view"}
                value={
                  search ||
                  selectedParty?.party_name ||
                  receiptData.partyName ||
                  ""
                }
                onChange={(e) => {
                  setSearch(e.target.value);
                  fetchParties(e.target.value);
                }}
                className={inputClass}
                placeholder="Select Party"
              />

              {showDropdown && (
                <div className="absolute top-16 w-full bg-white border shadow max-h-40 overflow-y-auto">
                  {partyList.map((party) => (
                    <div
                      key={party.id}
                      disabled={mode === "view"}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedParty(party);
                        setReceiptData({
                          ...receiptData,
                          partyId: party.id,
                          partyName: party.party_name,
                        });
                        setSearch("");
                        setShowDropdown(false);
                      }}
                    >
                      {party.party_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Pay Mode</label>
              <select
                className={inputClass}
                disabled={mode === "view"}
                value={receiptData.payMode}
                onChange={(e) =>
                  setReceiptData({ ...receiptData, payMode: e.target.value })
                }
              >
                <option value="">--Select--</option>
                <option value="Cash">Cash</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            {/* <div className="flex flex-col">
              <label className={labelClass}>Account</label>
              <select
                className={inputClass}
                disabled={mode === "view"}
                value={receiptData.accountId}
                onChange={(e) =>
                  setReceiptData({ ...receiptData, accountId: e.target.value })
                }
              >
                <option value="">--Select--</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div> */}
            {/* {receiptData.payMode === "Cash" && (
              <div className="flex flex-col">
                <label className={labelClass}>Cash A/c</label>

                <select
                  className={inputClass}
                  disabled={mode === "view"}
                  value={receiptData.accountId || "CASH"}
                  onChange={(e) =>
                    setReceiptData({
                      ...receiptData,
                      accountId: e.target.value,
                    })
                  }
                >
                  <option value="CASH">Cash</option>
                </select>
              </div>
            )} */}

          
              <div className="flex flex-col">
                <label className={labelClass}>Bank A/C</label>
                {/* <select
                  className={inputClass}
                  disabled={mode === "view" || loadingBanks}
                  value={receiptData.bankId}
                  onChange={(e) =>
                    setReceiptData({ ...receiptData, bankId: e.target.value })
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
                </select> */}
                <select
                  className={inputClass}
                  disabled={mode === "view" || loadingBanks}
                  value={receiptData.bankId}
                  onChange={(e) => {
                    const value = e.target.value;

                    const selectedBank = banks.find(
                      (bank) => bank.id.toString() === value,
                    );

                    setReceiptData({
                      ...receiptData,
                      bankId: value,
                      bankName: selectedBank?.bank_name || "",
                      selectedBank: selectedBank || null,
                    });
                  }}
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
           

            {/* <div className="flex flex-col">
              <label className={labelClass}>Cheque/Ref No</label>
              <input
                type="text"
                className={inputClass}
                disabled={mode === "view"}
                value={receiptData.chequeNo}
                onChange={(e) =>
                  setReceiptData({ ...receiptData, chequeNo: e.target.value })
                }
              />
            </div> */}

            {/* <div className="flex flex-col">
              <label className={labelClass}>Cheque/Ref Date</label>
              <input
                type="date"
                disabled={mode === "view"}
                className={inputClass}
                value={
                  receiptData.chequeDate
                    ? receiptData.chequeDate.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setReceiptData({ ...receiptData, chequeDate: e.target.value })
                }
              />
            </div> */}

            <div className="flex flex-col col-span-2">
              <label className={labelClass}>Remarks</label>
              <textarea
                className={inputClass}
                disabled={mode === "view"}
                value={receiptData.remarks}
                onChange={(e) =>
                  setReceiptData({ ...receiptData, remarks: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Amount</label>
              <input
                type="text"
                disabled={mode === "view"}
                readOnly
                value={receiptData.totalAmount}
                className={`${inputClass} bg-gray-50 text-right`}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        {/* <table className="w-full border">
          <thead className={`${navyBlue} text-white`}>
            <tr>
              <th>Sl</th>
              <th>Sub Ledger</th>
              <th>Ledger Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    className={inputClass}
                    disabled={mode === "view"}
                    value={row.subLedgerId}
                    onChange={(e) => handleLedgerChange(index, e.target.value)}
                  >
                    <option value="">Select</option>
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{row.ledgerName}</td>
                <td>
                  <input
                    type="date"
                    disabled={mode === "view"}
                    className={inputClass}
                    value={row.date}
                    onChange={(e) =>
                      handleRowChange(index, "date", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    disabled={mode === "view"}
                    className={inputClass}
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(index, "amount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    disabled={mode === "view"}
                    className={inputClass}
                    value={row.remark}
                    onChange={(e) =>
                      handleRowChange(index, "remark", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    disabled={mode === "view"}
                    onClick={() => setRows([...rows, row])}
                  >
                    <Plus size={14} disabled={mode === "view"} />
                  </button>
                  {rows.length > 1 && (
                    <button
                      onClick={() =>
                        setRows(rows.filter((_, i) => i !== index))
                      }
                      disabled={mode === "view"}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <table className="w-full border">
          <thead className={`${navyBlue} text-white`}>
            <tr>
              <th>Sl</th>
              <th>Sub Ledger</th>
              <th>Ledger Name</th>
              <th>Date</th>
              <th>Amount</th>
              {/* <th>Remark</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    className={inputClass}
                    disabled={mode === "view"}
                    value={row.subLedgerId}
                    onChange={(e) => handleLedgerChange(index, e.target.value)}
                  >
                    <option value="">Select</option>
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{row.ledgerName}</td>
                <td>
                  <input
                    type="date"
                    className={inputClass}
                    disabled={mode === "view"}
                    value={row.date || getTodayDate()}
                    onChange={(e) =>
                      handleRowChange(index, "date", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className={inputClass}
                    disabled={mode === "view"}
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(
                        index,
                        "amount",
                        e.target.value.replace(/[^0-9.]/g, ""),
                      )
                    }
                  />
                </td>
                {/* <td>
                  <input
                    type="text"
                    className={inputClass}
                    disabled={mode === "view"}
                    value={row.remark}
                    onChange={(e) =>
                      handleRowChange(index, "remark", e.target.value)
                    }
                  />
                </td> */}
                <td>
                  <button onClick={addNewRow} disabled={mode === "view"}>
                    <Plus size={16} />
                  </button>
                  {rows.length > 1 && (
                    <button
                      disabled={mode === "view"}
                      onClick={() =>
                        setRows(rows.filter((_, i) => i !== index))
                      }
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       <div className="mt-6 flex flex-wrap gap-4">

  {/* Save Button */}
  {mode !== "view" && (
    <button
      type="button"
      onClick={handleSaveReceipt}
      className={`
        ${navyBlue}
        text-white 
        px-4 py-2 
        w-[200px]
        rounded-lg 
        flex items-center justify-center gap-2
        transition-all duration-200
        hover:opacity-90
        active:scale-95
      `}
    >
      <Save size={18} />
      <span>Save</span>
    </button>
  )}

  {/* Exit Button */}
  <button
    type="button"
    onClick={() => navigate("/Receipt_List")}
    className="
      bg-red-600 
      text-white 
      px-4 py-2 
      w-[200px]
      rounded-lg 
      flex items-center justify-center gap-2
      transition-all duration-200
      hover:bg-red-700
      active:scale-95
    "
  >
    <XCircle size={18} />
    <span>Exit</span>
  </button>

</div>

      </div>
    </div>
  );
};

export default ReceiptCreate;
