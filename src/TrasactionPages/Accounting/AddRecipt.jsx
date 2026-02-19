// import React from 'react'

// const AddRecipt = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AddRecipt
import {
  CheckCircle2,
  FileText,
  Plus,
  Save,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../api";
import axios from "axios";

const AddRecipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.voucher;
  const isViewMode = location.state?.view;

  // Modals State
  const [isModalOpen, setIsModalOpen] = useState(false); // Party Modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // Details Modal
  const [banks, setBanks] = useState([]);
  

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

  // Main Data State
  const [bankAccounts, setBankAccounts] = useState([]);
  const [voucherRows, setVoucherRows] = useState([
    {
      subLedgerCode: "",
      ledgerName: "",
      date: "",
      sign: "C",
      amount: "0",
      remark: "",
    },
  ]);

  // Row Specific Details State (Stores metadata for each row index)
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [rowDetails, setRowDetails] = useState({});
  const [detailForm, setDetailForm] = useState({
    billNumber: "",
    billAmount: "",
    payMode: "Cash",
    bankId: "",
    billImage: null,
    partyName: "",
    employeeName: "",
  });

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

  // --- Row Details Logic ---
  const openDetailsModal = (index) => {
    setCurrentRowIndex(index);
    // Load existing details if they exist, else reset
    if (rowDetails[index]) {
      setDetailForm(rowDetails[index]);
    } else {
      setDetailForm({
        billNumber: "",
        billAmount: voucherRows[index].amount || "",
        payMode: "Cash",
        bankId: "",
        billImage: null,
        partyName: "",
        employeeName: "",
      });
    }
    setIsDetailsModalOpen(true);
  };

  const handleSaveDetails = () => {
    setRowDetails((prev) => ({ ...prev, [currentRowIndex]: detailForm }));
    // Automatically update the amount in the main table row
    handleVoucherChange(currentRowIndex, "amount", detailForm.billAmount);
    setIsDetailsModalOpen(false);
  };

  // --- Main Form Logic ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoucherChange = (index, field, value) => {
    const updatedRows = [...voucherRows];
    updatedRows[index][field] = value;
    setVoucherRows(updatedRows);
  };

  const handleMainSave = async () => {
    // This collects all row data + their specific details
    const finalPayload = {
      expenses: voucherRows.map((row, index) => ({
        ...row,
        details: rowDetails[index] || null,
      })),
    };

    console.log("Saving Final Data:", finalPayload);
    // Add your API POST call here for saving the entire Expense
    alert("Expense Saved Successfully (Check Console for Payload)");
  };

  const handlePartySave = async () => {
    try {
      if (!partyData.partyName) {
        alert("Party Name is required");
        return;
      }
      const response = await fetch(`${API}/party/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partyData),
      });
      if (response.ok) {
        setIsModalOpen(false);
        setPartyData({
          partyName: "",
          shopName: "" /* reset other fields... */,
        });
      }
    } catch (error) {
      alert("Error saving party");
    }
  };

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
    // Clean up rowDetails if row is removed
    const newDetails = { ...rowDetails };
    delete newDetails[index];
    setRowDetails(newDetails);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#333] ml-[110px] mr-[110px]">
      <div className="mx-auto p-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow border">
          <h1 className="text-[#D32F2F] text-xl font-bold">Add Receipt</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0D3082] text-white p-1.5 rounded hover:bg-blue-800"
              title="Add New Party"
            >
              <UserPlus size={16} />
            </button>
            <button
              onClick={handleMainSave}
              className="bg-[#0D3082] text-white px-5 py-1.5 rounded text-xs font-bold"
            >
              Save Expense
            </button>
            <button
      onClick={() => navigate("/")}
      className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px] font-medium transition-colors hover:bg-[#a40f1a]"
    >
      Exit
    </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="border-[#008080] rounded-sm overflow-hidden">
         

           <p className="font-[Source_Sans_3] font-bold text-[18px] leading-[100%] tracking-[0.03em] text-[#0A2478] mb-4">
            Receipt Voucher Details
          </p>

          <table className=" text-left border-collapse bg-white">
            <thead>
              <tr className="bg-[#0D3082] text-white text-[11px] uppercase">
                <th className="p-2 border-r font-bold w-12 text-center">
                  Sl No
                </th>
                <th className="p-2 border-r font-bold">
                  SubLedger Name
                </th>
                <th className="p-2 border-r font-bold w-28 text-center">
                  Date
                </th>
                <th className="p-2 border-r font-bold w-28 text-center">
                  Amount
                </th>
                <th className="p-2 font-bold w-[500px]">Remark & Details</th>
              </tr>
            </thead>
            <tbody>
              {voucherRows.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-1 border-r border-gray-300 text-center">
                    {index + 1}
                  </td>
                  <td className="p-1 border-r border-gray-300">
                    <select
                      value={row.subLedgerCode}
                      disabled={isViewMode}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const bank = bankAccounts.find(
                          (b) => b.id.toString() === selectedId,
                        );
                        handleVoucherChange(index, "subLedgerCode", selectedId);
                        handleVoucherChange(
                          index,
                          "ledgerName",
                          bank?.name || "",
                        );
                      }}
                      className="w-full border border-gray-300 rounded-sm px-1 py-1 outline-none focus:bg-[#ffffcc] bg-white"
                    >
                      <option value="">Select Account</option>
                      {bankAccounts?.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-1 border-r border-gray-300">
                    <input
                      type="date"
                      disabled={isViewMode}
                      value={row.date || todayDate}
                      onChange={(e) =>
                        handleVoucherChange(index, "date", e.target.value)
                      }
                      className="w-full bg-white border border-gray-300 rounded-sm px-1 py-0.5 outline-none text-center"
                    />
                  </td>
                  <td className="p-1 border-r border-gray-300">
                    <input
                      type="text"
                      disabled={isViewMode}
                      value={row.amount}
                      onChange={(e) =>
                        handleVoucherChange(index, "amount", e.target.value)
                      }
                      className="w-full bg-white border border-gray-300 rounded-sm px-1 py-0.5 outline-none text-right"
                    />
                  </td>
                  <td className="p-1 ">
                    <div className="flex gap-1 items-center">
                      <input
                        type="text"
                        disabled={isViewMode}
                        value={row.remark}
                        onChange={(e) =>
                          handleVoucherChange(index, "remark", e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-sm px-1 py-0.5 outline-none bg-white"
                        placeholder="Remark"
                      />

                      <button
                        onClick={addNewRow}
                        className="bg-[#0D3082] text-white p-1.5 rounded-sm hover:bg-[#0a2669]"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeRow(index)}
                        className="bg-red-600 text-white p-1.5 rounded-sm hover:bg-red-700"
                      >
                        <Trash2 size={12} />
                      </button>

                      <button
                        onClick={() => openDetailsModal(index)}
                        className={`px-2 py-1 rounded-sm flex items-center font-bold uppercase text-[10px] transition-colors shadow-sm ${
                          rowDetails[index]
                            ? "bg-green-600 text-white"
                            : "bg-[#008080] text-white"
                        }`}
                      >
                        {rowDetails[index] ? (
                          <CheckCircle2 size={10} className="mr-1" />
                        ) : (
                          <Plus size={10} className="mr-1" />
                        )}
                        {rowDetails[index] ? "Details Added" : "Add Details"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD DETAILS MODAL --- */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border">
            <div className=" px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">
                  Bill Details (Row {currentRowIndex + 1})
                </h2>
              </div>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="hover:rotate-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 gap-4 text-[12px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">
                    Bill Number
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080]"
                    value={detailForm.billNumber}
                    onChange={(e) =>
                      setDetailForm({
                        ...detailForm,
                        billNumber: e.target.value,
                      })
                    }
                    placeholder="e.g. INV-001"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">
                    Bill Amount
                  </label>
                  <input
                    type="number"
                    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080]"
                    value={detailForm.billAmount}
                    onChange={(e) =>
                      setDetailForm({
                        ...detailForm,
                        billAmount: e.target.value,
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">
                    Pay Mode
                  </label>
                  <select
                    className="border border-gray-300 p-2 rounded outline-none"
                    value={detailForm.payMode}
                    onChange={(e) =>
                      setDetailForm({ ...detailForm, payMode: e.target.value })
                    }
                  >
                    <option value="Cash">Cash</option>
                    <option value="Netbanking">Netbanking</option>
                  </select>
                </div>
               <div className="flex flex-col">
  <label className="font-bold text-gray-700 mb-1">
    Select Bank / Cash Account
  </label>
  <select
    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080] bg-white"
    value={detailForm.bankId}
    onChange={(e) =>
      setDetailForm({ ...detailForm, bankId: e.target.value })
    }
  >
    <option value="">-- Choose Account --</option>
    
    {/* Mapping your bankAccounts data */}
    {banks && banks.length > 0 ? (
      banks.map((bank) => (
        <option key={bank.id} value={bank.id}>
          {bank.bank_name}
        </option>
      ))
    ) : (
      <option disabled>No accounts found</option>
    )}
  </select>
  <span className="text-[10px] text-gray-500 mt-1">
    Current Mode: <span className="font-bold text-[#0D3082]">{detailForm.payMode}</span>
  </span>
</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">
                    Party Name
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080]"
                    value={detailForm.partyName}
                    onChange={(e) =>
                      setDetailForm({
                        ...detailForm,
                        partyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080]"
                    value={detailForm.employeeName}
                    onChange={(e) =>
                      setDetailForm({
                        ...detailForm,
                        employeeName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
                <label className="font-bold text-gray-700 mb-1">
                  Upload Bill Image
                </label>
                <input
                  type="file"
                  className="text-[11px] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) =>
                    setDetailForm({
                      ...detailForm,
                      billImage: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>

            <div className=" p-4 flex gap-2 justify-center">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded font-bold uppercase text-[10px] bg-red-600 text-white transition-colors"
              >
                Exit
              </button>
              <button
                onClick={handleSaveDetails}
                className="px-6 py-2 text-white rounded font-bold uppercase text-[10px] hover:bg-[#006666] shadow-md transition-all active:scale-95 bg-[#0D3082]"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PARTY MODAL (Existing) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-200">
            {/* Header - Fixed */}
            <div className="  px-6 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    Add New Party
                  </h2>
                  
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
            <div className="p-6 overflow-y-auto custom-scrollbar ">
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
            <div className="bg-white p-4 flex justify-center gap-3 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 font-bold text-[11px] hover:bg-gray-50 transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              {!isViewMode && (
                <button
                  onClick={handlePartySave}
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

export default AddRecipt;
