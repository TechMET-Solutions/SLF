import { Plus, Save, Trash2, UserPlus, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../api";
import axios from "axios";

const AddpaymentAccounting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [partyList, setPartyList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const location = useLocation();
  const editData = location.state?.voucher;
  const isViewMode = location.state?.view;
  const isRepayment = location.state?.repayment;
  const [partyData, setPartyData] = useState({
    partyName: "",
    shopName: "",
    address: "",
    contactNumber: "",
    alternateMobileNumber: "",
    personalAddress: "",
    shopAddress: "",
    gstNo: "",
    aadharNo: "",
    panNo: "",
    accountNumber: "",
    ifscNumber: "",
    bankName: "",
    bankAddress: "",
    accountHolderName: "",
  });
  const [payMode, setPayMode] = useState("cash");
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNo: "",
    transactionNo: "",
  });
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const [formData, setFormData] = useState({
    billDate: getTodayDate(),
    partyType: "All",
    billNo: "",
    billAmount: "",
    todayPayAmount: "",

    billImage: null,
    partyName: "",

    account: "",
    accountName:""
  });


  const [existingBillImage, setExistingBillImage] = useState(null); // 👈 URL
  console.log(formData, "formData");
  const [dueAmount, setDueAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      const res = await fetch(`${API}/account-code/Bank-accounts`);
      const data = await res.json();
      setBankAccounts(data);
    } catch (error) {
      console.error("Failed to fetch bank accounts", error);
    }
  };

  const navigate = useNavigate();
  console.log(formData, "formData");
  const [voucherRows, setVoucherRows] = useState([
    {
      subLedgerCode: "", // yaha id store hoga
      ledgerName: "", // yaha name store hoga
      date: "",
      sign: "C",
      amount: "0",
      remark: "",
    },
  ]);
const [banks, setBanks] = useState([]);

  console.log(voucherRows, "voucherRows");
  const handleVoucherChange = (index, field, value) => {
    const updatedRows = [...voucherRows];
    updatedRows[index][field] = value;
    setVoucherRows(updatedRows);
  };

  useEffect(() => {
  fetchBanks();
}, []);

const fetchBanks = async () => {
  try {
    const res = await axios.get(`${API}/api/banks/list`);
    setBanks(res.data); // assuming API returns array
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    if (editData) {
      // Header fields
      setFormData({
        billDate: editData.billDate?.split("T")[0],
        partyType: editData.partyType,
        billNo: editData.billNo,
        billAmount: editData.billAmount,
        todayPayAmount: editData.todayPayAmount,
        account: editData.account,
      });

      // Pay mode
      setPayMode(editData.payMode);

      // Bank Details
      setBankDetails(editData.bankDetails || {});

      // Voucher Rows
      setVoucherRows(editData.voucherDetails || []);

      // Party
      setSelectedParty({
        party_name: editData.partyName,
        id: editData.partyId,
      });
      setExistingBillImage(editData.billImage || null);
    }
  }, [editData]);
  useEffect(() => {
    if (isRepayment && editData) {
      // Header fields
      setFormData({
        billDate: editData.billDate?.split("T")[0],
        partyType: editData.partyType,
        billNo: editData.billNo,
        billAmount: editData.billAmount,
        todayPayAmount: editData.todayPayAmount,
        account: editData.account,
      });

      // Pay mode
      setPayMode(editData.payMode);

      // Bank Details
      setBankDetails(editData.bankDetails || {});

      // Voucher Rows
      setVoucherRows(editData.voucherDetails || []);

      // Party
      setSelectedParty({
        party_name: editData.partyName,
        id: editData.partyId,
      });
    }
  }, [isRepayment, editData]);
  useEffect(() => {
    const total = voucherRows.reduce((sum, row) => {
      const amt = parseFloat(row.amount || 0);
      return sum + amt;
    }, 0);

    setFormData((prev) => ({
      ...prev,
      todayPayAmount: total.toFixed(2),
    }));
  }, [voucherRows]);

  const addNewRow = () => {
    setVoucherRows([
      ...voucherRows,
      {
        subLedgerCode: "",
        ledgerName: "",
        date: "",
        sign: "C",
        amount: "",
        remark: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (voucherRows.length === 1) return;
    const filtered = voucherRows.filter((_, i) => i !== index);
    setVoucherRows(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!partyData.partyName) {
        alert("Party Name is required");
        return;
      }

      const response = await fetch(`${API}/party/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partyData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save party");
      }

      console.log("Party Saved:", result);

      // reset form
      setPartyData({
        partyName: "",
        shopName: "",
        address: "",
        contactNumber: "",
        date: "",
        remark: "",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Save Party Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  const fetchParties = async (value) => {
    try {
      const res = await fetch(`${API}/party/search?keyword=${value}`);
      const result = await res.json();

      if (result.success) {
        setPartyList(result.data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const HandleSaveTrasaction = async () => {
  //   try {
  //     if (!formData.billDate) {
  //       alert("Bill Date required");
  //       return;
  //     }

  //     if (!formData.account) {
  //       alert("Account required");
  //       return;
  //     }

  //     if (voucherRows.length === 0) {
  //       alert("Add at least one voucher row");
  //       return;
  //     }

  //     const filteredRows = voucherRows.filter(
  //       (row) => row.amount && row.subLedgerCode,
  //     );

  //     const payload = {
  //       header: {
  //         billDate: formData.billDate,
  //         partyType: formData.partyType,
  //         billNo: formData.billNo,
  //         billAmount: formData.billAmount,
  //         todayPayAmount: formData.todayPayAmount,
  //         payMode: payMode,
  //         account: formData.account,
  //         party: selectedParty.party_name,
  //         partyId: selectedParty.id,
  //       },
  //       bankDetails: bankDetails,
  //       voucherDetails: filteredRows.map((row, index) => ({
  //         srNo: index + 1,
  //         subLedgerCode: row.subLedgerCode,
  //         ledgerName: row.ledgerName,
  //         date: row.date,
  //         sign: row.sign,
  //         amount: row.amount,
  //         remark: row.remark,
  //       })),
  //       isRepayment: isRepayment || false,
  //     };

  //     console.log("🔥 FINAL PAYMENT VOUCHER PAYLOAD", payload);

  //     const url = editData
  //       ? `${API}/party/update/${editData.id}`
  //       : `${API}/party/create_Payment_Voucher`;

  //     const method = editData ? "PUT" : "POST";

  //     const response = await fetch(url, {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || "Failed to save voucher");
  //     }

  //     alert(editData ? "✅ Voucher Updated" : "✅ Voucher Saved");
  //     navigate("/PaymentVoucher");
  //   } catch (error) {
  //     console.error("Save Voucher Error:", error);
  //     alert(error.message || "Something went wrong");
  //   }
  // };
  const HandleSaveTrasaction = async () => {
    try {
      if (!formData.billDate) {
        alert("Bill Date required");
        return;
      }

      if (!formData.account) {
        alert("Account required");
        return;
      }

      if (voucherRows.length === 0) {
        alert("Add at least one voucher row");
        return;
      }

      const filteredRows = voucherRows.filter(
        (row) => row.amount && row.subLedgerCode,
      );

      const fd = new FormData();

      // 🔹 Header fields
      fd.append("billDate", formData.billDate);
      fd.append("partyType", formData.partyType);
      fd.append("billNo", formData.billNo);
      fd.append("billAmount", formData.billAmount);
      fd.append("todayPayAmount", formData.todayPayAmount);
      fd.append("payMode", payMode);
      fd.append("account", formData.account);
      fd.append("accountName", formData.accountName);
      fd.append("party", selectedParty.party_name);
      fd.append("partyId", selectedParty.id);

      // 🔹 Bill Image
      if (formData.billImage) {
        fd.append("billImage", formData.billImage);
      }

      // 🔹 Complex objects stringify karke bhejo
      fd.append("bankDetails", JSON.stringify(bankDetails));
      fd.append(
        "voucherDetails",
        JSON.stringify(
          filteredRows.map((row, index) => ({
            srNo: index + 1,
            subLedgerCode: row.subLedgerCode,
            ledgerName: row.ledgerName,
            date: row.date,
            sign: row.sign,
            amount: row.amount,
            remark: row.remark,
          })),
        ),
      );

      fd.append("isRepayment", isRepayment || false);

      const url = editData
        ? `${API}/party/update/${editData.id}`
        : `${API}/party/create_Payment_Voucher`;

      const method = editData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: fd, // ✅ JSON nahi
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save voucher");
      }

      alert(editData ? "✅ Voucher Updated" : "✅ Voucher Saved");
      navigate("/Expences_list");
    } catch (error) {
      console.error("Save Voucher Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#333] relative">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-t-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h1 className="text-[#D32F2F] text-xl font-bold uppercase tracking-tight">
            Expences
            </h1>
          </div>

          {/* Upper Form Fields */}
          <div className="p-6 grid grid-cols-4 gap-y-4 gap-x-8 text-[12px]">
            <div className="flex flex-col">
              <label className="font-bold text-gray-600 mb-1">Bill Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="billDate"
                  disabled={isViewMode}
                  value={formData.billDate}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 outline-none"
                />
              </div>
            </div>
           
            <div className="flex flex-col relative">
              <label className="font-bold text-gray-600 mb-1">Party</label>

              <div className="flex gap-1">
                <input
                  type="text"
                  disabled={isViewMode}
                  value={selectedParty ? selectedParty.party_name : search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedParty(null);
                    fetchParties(e.target.value);
                  }}
                  onFocus={() => search && setShowDropdown(true)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1.5 outline-none"
                  placeholder="Select Party"
                />
                {!(isViewMode || editData) && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#0D3082] text-white p-1.5 rounded hover:bg-blue-800"
                    title="Add New Party"
                  >
                    <UserPlus size={16} />
                  </button>
                )}
              </div>

              {/* 🔽 Dropdown */}
              {showDropdown && partyList.length > 0 && (
                <div className="absolute top-[70px] z-10 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
                  {partyList.map((party) => (
                    <div
                      key={party.id}
                      disabled={isViewMode}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedParty(party);
                        setSearch("");
                        setShowDropdown(false);
                      }}
                    >
                      {party.party_name}
                      {party.shop_name && (
                        <span className="text-gray-400 text-xs">
                          {" "}
                          ({party.shop_name})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row 2 & 3 (Keeping your original layout) */}
            <div className="flex flex-col">
              <label className="font-bold text-gray-600 mb-1">
                Pay Mode <span className="text-red-500">*</span>
              </label>

              <select
                value={payMode}
                disabled={isViewMode}
                onChange={(e) => setPayMode(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1.5 outline-none"
              >
                <option value="">--Select--</option>
                <option value="cash">Cash</option>
                <option value="net_banking">Net Banking</option>
              </select>
            </div>

         <div className="flex flex-col">
  <label className="font-bold text-gray-600 mb-1">
    Bank A/c <span className="text-red-500">*</span>
  </label>

  <select
    disabled={isViewMode}
    value={formData.account}
    onChange={(e) => {
      const selectedId = e.target.value;

      const selectedBank = banks.find(
        (bank) => String(bank.id) === String(selectedId)
      );

      setFormData((prev) => ({
        ...prev,
        account: selectedId,
        accountName: selectedBank?.bank_name || "",
      }));
    }}
    className="border border-gray-300 rounded px-2 py-1.5 outline-none"
  >
    <option value="">--Select Bank--</option>

    {banks.map((bank) => (
      <option key={bank.id} value={bank.id}>
        {bank.bank_name}
      </option>
    ))}
  </select>
</div>



            <div className="flex flex-col">
              <label className="font-bold text-gray-600 mb-1">Bill No</label>
              <input
                type="text"
                disabled={isViewMode}
                name="billNo" // 👈 ye sabse important
                value={formData.billNo}
                onChange={handleFormChange}
                className="border border-gray-300 rounded px-2 py-1.5 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-600 mb-1">
                Bill Amount
              </label>
              <input
                type="text"
                disabled={isViewMode}
                name="billAmount"
                value={formData.billAmount}
                onChange={handleFormChange}
                className="border border-gray-300  rounded px-2 py-1.5 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-gray-600 mb-1">
                Paid Amount
              </label>
              <input
                type="text"
                readOnly
                value={formData.todayPayAmount}
                className="border border-gray-300 rounded px-2 py-1.5 outline-none bg-gray-100"
              />
            </div>
          
            <div className="flex flex-col">
              <label className="font-bold text-gray-600 mb-1">Bill Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billImage: e.target.files[0],
                  })
                }
                className="border border-gray-300 rounded px-2 py-1.5 outline-none"
              />

              <div className="flex gap-3 mt-2">
                {/* Existing image */}
                {!formData.billImage && existingBillImage && (
                  <button
                    type="button"
                    onClick={() => window.open(existingBillImage, "_blank")}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    View Existing Image
                  </button>
                )}

                {/* New selected image */}
                {formData.billImage && (
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        URL.createObjectURL(formData.billImage),
                        "_blank",
                      )
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    View Selected Image
                  </button>
                )}
              </div>
            </div>

            {isRepayment && (
              <div className="flex flex-col">
                <label className="font-bold text-red-600 mb-1">
                  Due Amount
                </label>
                <input
                  type="text"
                  value={`₹ ${dueAmount}`}
                  readOnly
                  className="border border-red-400 bg-red-50 rounded px-2 py-1.5"
                />
              </div>
            )}

            {payMode === "net_banking" && (
              <div className="col-span-4 grid grid-cols-3 gap-4 mt-2">
                <div className="flex flex-col">
                  <label className="font-bold text-gray-600 mb-1">
                    Bank Name
                  </label>
                  <input
                    name="bankName"
                    disabled={isViewMode}
                    value={bankDetails.bankName}
                    onChange={handleBankChange}
                    className="border rounded px-2 py-1.5"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-gray-600 mb-1">
                    Account No
                  </label>
                  <input
                    name="accountNo"
                    disabled={isViewMode}
                    value={bankDetails.accountNo}
                    onChange={handleBankChange}
                    className="border rounded px-2 py-1.5"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold text-gray-600 mb-1">
                    Transaction No
                  </label>
                  <input
                    name="transactionNo"
                    disabled={isViewMode}
                    value={bankDetails.transactionNo}
                    onChange={handleBankChange}
                    className="border rounded px-2 py-1.5"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details Table Section */}
        {/* Details Table Section - Updated to match Image exactly */}
        <div className="mt-4 border border-[#008080] rounded-sm overflow-hidden">
          {/* Fieldset-style Header */}
          <div className="bg-white px-2 py-1 border-b border-[#008080]">
            <span className="text-[#008080] font-bold text-[11px] uppercase">
              Receipt Voucher Details
            </span>
          </div>

          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-[#0D3082] text-white text-[10px] uppercase">
                <th className="p-1.5 border-r border-white/20 font-bold w-12 text-center">
                  Sl No
                </th>
                {/* <th className="p-1.5 border-r border-white/20 font-bold w-40">
                  Sub. Ledger Code
                </th> */}
                <th className="p-1.5 border-r border-white/20 font-bold">
                  Account Ledger Name
                </th>
                <th className="p-1.5 border-r border-white/20 font-bold w-28 text-center">
                  Date
                </th>
                {/* <th className="p-1.5 border-r border-white/20 font-bold w-20 text-center">
                  Sign
                </th> */}
                <th className="p-1.5 border-r border-white/20 font-bold w-28 text-center">
                  Amount
                </th>
                <th className="p-1.5 font-bold">Remark</th>
              </tr>
            </thead>
            <tbody>
              {voucherRows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 text-[11px]"
                >
                  {/* SL No */}
                  <td className="p-1 border-r border-gray-300 text-center">
                    {index + 1}
                  </td>

                  {/* Sub Ledger Code */}
                  <td className="p-1 border-r border-gray-300">
                    <select
                      value={row.subLedgerCode}
                      disabled={isViewMode}
                      onChange={(e) => {
                        const selectedId = e.target.value;

                        const selectedLedger = bankAccounts.find(
                          (bank) => bank.id.toString() === selectedId,
                        );

                        handleVoucherChange(
                          index,
                          "subLedgerCode",
                          selectedLedger.id,
                        );
                        handleVoucherChange(
                          index,
                          "ledgerName",
                          selectedLedger.name,
                        );
                      }}
                      className="w-full border border-gray-300 rounded-sm px-1 py-0.5 outline-none focus:bg-[#ffffcc]"
                    >
                      <option value="">Select</option>

                      {bankAccounts?.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Account Ledger Name */}
                  {/* <td className="p-1 border-r border-gray-300">
                    <input
                      type="text"
                      disabled={isViewMode}
                      value={row.ledgerName}
                      readOnly
                      className="w-full border border-gray-300 bg-[#eeeeee] rounded-sm px-1 py-0.5 outline-none"
                    />
                  </td> */}

                  {/* Date */}
                  <td className="p-1 border-r border-gray-300">
                    <input
                      type="date"
                      disabled={isViewMode}
                      value={row.date || todayDate}
                      onChange={(e) =>
                        handleVoucherChange(index, "date", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-sm px-1 py-0.5 outline-none text-center"
                    />
                  </td>

                  {/* Sign */}
                  {/* <td className="p-1 border-r border-gray-300 text-center">
                    <input
                      type="text"
                      disabled={isViewMode}
                      value={row.sign}
                      readOnly
                      className="w-full border border-gray-300 bg-[#eeeeee] rounded-sm px-1 py-0.5 outline-none text-center"
                    />
                  </td> */}

                  {/* Amount */}
                  <td className="p-1 border-r border-gray-300">
                    <input
                      type="text"
                      disabled={isViewMode}
                      value={row.amount}
                      onChange={(e) =>
                        handleVoucherChange(index, "amount", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-sm px-1 py-0.5 outline-none text-right"
                    />
                  </td>

                  {/* Remark + Buttons */}
                  <td className="p-1 bg-white">
                    <div className="flex gap-1 items-center">
                      <input
                        type="text"
                        disabled={isViewMode}
                        value={row.remark}
                        onChange={(e) =>
                          handleVoucherChange(index, "remark", e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-sm px-1 py-0.5 outline-none"
                      />

                      <button
                        onClick={addNewRow}
                        disabled={isViewMode}
                        className="bg-[#0D3082] text-white px-2 py-1 rounded-sm flex items-center text-[9px] font-bold uppercase"
                      >
                        <Plus size={10} className="mr-1" /> Add
                      </button>

                      <button
                        onClick={() => removeRow(index)}
                        disabled={isViewMode}
                        className="bg-[#005a9e] text-white px-2 py-1 rounded-sm flex items-center text-[9px] font-bold uppercase"
                      >
                        <Trash2 size={10} className="mr-1" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex space-x-2">
          {/* Save / Update */}
          {!isViewMode && (
            <button
              className="bg-[#0D3082] text-white px-8 py-1.5 rounded flex items-center text-xs font-bold shadow-sm hover:opacity-90"
              onClick={() => HandleSaveTrasaction()}
            >
              <Save size={14} className="mr-2" />
              {editData ? "Update" : "Save"}
            </button>
          )}

          {/* Exit - always show */}
          <button
            onClick={() => navigate("/Expences_list")}
            className="bg-[#555] text-white px-8 py-1.5 rounded flex items-center text-xs font-bold shadow-sm hover:opacity-90"
          >
            <XCircle size={14} className="mr-2" /> Exit
          </button>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-200">
            {/* Header - Fixed */}
            <div className="bg-[#0D3082] text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    Add New Party
                  </h2>
                  <p className="text-[10px] text-blue-100 opacity-80">
                    Fill in the details to register a new entity
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body - Scrollable Grid */}
            <div className="p-6 overflow-y-auto custom-scrollbar bg-gray-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-[12px]">
                {/* Section: Basic Info */}
                <div className="md:col-span-2 border-b pb-1 mb-1">
                  <span className="text-[#0D3082] font-bold uppercase text-[10px] tracking-widest">
                    General Information
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Party Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="partyName"
                    disabled={isViewMode}
                    value={partyData.partyName}
                    onChange={handleChange}
                    placeholder="Enter party name"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Shop Name
                  </label>
                  <input
                    name="shopName"
                    disabled={isViewMode}
                    value={partyData.shopName}
                    onChange={handleChange}
                    placeholder="Enter shop name"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    disabled={isViewMode}
                    value={partyData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Alt. Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="alternateMobileNumber"
                    disabled={isViewMode}
                    value={partyData.alternateMobileNumber}
                    onChange={handleChange}
                    placeholder="Enter alternate number"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                {/* Section: Tax & Identity */}
                <div className="md:col-span-2 border-b pb-1 mt-4 mb-1">
                  <span className="text-[#0D3082] font-bold uppercase text-[10px] tracking-widest">
                    Tax & Identity
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    GST No
                  </label>
                  <input
                    name="gstNo"
                    disabled={isViewMode}
                    value={partyData.gstNo}
                    onChange={handleChange}
                    placeholder="Enter GST No"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all uppercase"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    PAN No
                  </label>
                  <input
                    name="panNo"
                    disabled={isViewMode}
                    value={partyData.panNo}
                    onChange={handleChange}
                    placeholder="Enter PAN No"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all uppercase"
                  />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Aadhar No
                  </label>
                  <input
                    name="aadharNo"
                    disabled={isViewMode}
                    value={partyData.aadharNo}
                    onChange={handleChange}
                    placeholder="Enter 12 digit Aadhar number"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                {/* Section: Bank Details */}
                <div className="md:col-span-2 border-b pb-1 mt-4 mb-1">
                  <span className="text-[#0D3082] font-bold uppercase text-[10px] tracking-widest">
                    Banking Details
                  </span>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Account Holder Name
                  </label>
                  <input
                    name="accountHolderName"
                    disabled={isViewMode}
                    value={partyData.accountHolderName}
                    onChange={handleChange}
                    placeholder="As per bank records"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Account Number
                  </label>
                  <input
                    name="accountNumber"
                    disabled={isViewMode}
                    value={partyData.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    IFSC Code
                  </label>
                  <input
                    name="ifscNumber"
                    disabled={isViewMode}
                    value={partyData.ifscNumber}
                    onChange={handleChange}
                    placeholder="IFSC code"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                {/* Section: Addresses */}
                <div className="md:col-span-2 border-b pb-1 mt-4 mb-1">
                  <span className="text-[#0D3082] font-bold uppercase text-[10px] tracking-widest">
                    Location Details
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Personal Address
                  </label>
                  <textarea
                    name="personalAddress"
                    rows="2"
                    disabled={isViewMode}
                    value={partyData.personalAddress}
                    onChange={handleChange}
                    placeholder="Enter home address"
                    className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Shop Address
                  </label>
                  <textarea
                    name="shopAddress"
                    rows="2"
                    disabled={isViewMode}
                    value={partyData.shopAddress}
                    onChange={handleChange}
                    placeholder="Enter shop address"
                    className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    disabled={isViewMode}
                    value={partyData.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1.5 ml-1">
                    Remark
                  </label>
                  <input
                    name="remark"
                    disabled={isViewMode}
                    value={partyData.remark}
                    onChange={handleChange}
                    placeholder="Any internal notes"
                    className="border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#0D3082] focus:ring-1 focus:ring-[#0D3082] bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="bg-white p-4 flex justify-end gap-3 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 font-bold text-[11px] hover:bg-gray-50 transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              {!isViewMode && (
                <button
                  onClick={handleSave}
                  className="px-8 py-2 bg-[#0D3082] text-white rounded-lg font-bold text-[11px] flex items-center gap-2 hover:bg-[#0a2669] shadow-lg shadow-blue-900/20 transition-all active:scale-95 uppercase tracking-wider"
                >
                  <Save size={14} /> Save Party
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddpaymentAccounting;
