import axios from "axios";
import { CheckCircle2, Plus, Trash2, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../api";

const ExpenceCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const expenseId = location.state?.expenseId;
  const isViewMode = location.state?.view;

  // Modals State

  const [isModalOpen, setIsModalOpen] = useState(false); // Party Modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // Details Modal
  const [banks, setBanks] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [showDropdownForEmployee, setShowDropdownForemployee] = useState(false);

  const fetchExpenseById = async (id) => {
    try {
      const res = await axios.get(`${API}/api/expense/details/${id}`);

      if (res.data.success) {
        const { master, details } = res.data;

        // 🔹 Set Main Voucher Row
        setVoucherRows([
          {
            subLedgerCode: details[0]?.sub_ledger_code || "",
            ledgerName: details[0]?.ledger_name || "",
            date: master.expense_date,
            sign: details[0]?.sign || "C",
            remark: details[0]?.remark || "",
            amount: details.reduce(
              (sum, d) => sum + Number(d.bill_amount || 0),
              0,
            ),
          },
        ]);

        // 🔹 Convert details into rowDetails format
        setRowDetails({
          0: details.map((d) => ({
            billNumber: d.bill_number,
            billAmount: d.bill_amount,
            billPaidAmount: d.bill_paid_amount,
            payMode: d.pay_mode,
            bankId: d.bank_id,
            billImage: d.bill_image, // URL string
            partyName: d.party_name,
            employeeName: d.employee_name,
            partyId: d.party_id,
            employeeId: d.employee_id,
          })),
        });
      }
    } catch (error) {
      console.error("Fetch Expense Error:", error);
    }
  };

  useEffect(() => {
    if (expenseId) {
      fetchExpenseById(expenseId);
    }
  }, [expenseId]);
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
  const todayDate = new Date().toISOString().split("T")[0];
  // Main Data State
  const [bankAccounts, setBankAccounts] = useState([]);
  const [voucherRows, setVoucherRows] = useState([
    {
      subLedgerCode: "",
      ledgerName: "",
      date: todayDate,
      sign: "C",
      // amount: "0",
      remark: "",
    },
  ]);
  console.log(voucherRows, "voucherRows");
  // Row Specific Details State (Stores metadata for each row index)
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [rowDetails, setRowDetails] = useState({});
  console.log(rowDetails, "rowDetails");
  const [detailForm, setDetailForm] = useState({
    billNumber: "",
    billAmount: "",
    billPaidAmount: "",
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [partyList, setPartyList] = useState([]);

  // 1. Handle Input Change
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Update the form state
    setDetailForm({ ...detailForm, partyName: value });

    // Only search if there is text (e.g., more than 1 character)
    if (value.length > 1) {
      fetchParties(value);
    } else {
      setPartyList([]);
      setShowDropdown(false);
    }
  };
  // Function to fetch from your API
  const fetchEmployees = async (searchTerm) => {
    try {
      // Using the 'name' parameter as per your backend logic
      const response = await fetch(
        `${API}/Master/Employee_Profile/getAll-employees?name=${searchTerm}&limit=10`,
      );
      const result = await response.json();

      // Your API returns the list in 'items'
      if (result.items) {
        setEmployeeList(result.items);
        setShowDropdownForemployee(true);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChangeFortheSelectEmployee = (e) => {
    const value = e.target.value;
    setDetailForm({ ...detailForm, employeeName: value });

    if (value.trim().length > 0) {
      fetchEmployees(value);
    } else {
      setEmployeeList([]);
      setShowDropdownForemployee(false);
    }
  };

  const handleSelectEmployee = (emp) => {
    setDetailForm({
      ...detailForm,
      employeeName: emp.emp_name, // Name to show in input
      employeeId: emp.id, // Store ID for your database
    });
    setShowDropdownForemployee(false);
  };

  // 2. Handle Selection
  const handleSelectParty = (party) => {
    setDetailForm({
      ...detailForm,
      partyName: party.party_name, // Set the display name
      partyId: party.id, // Usually you want to save the ID too
    });
    setShowDropdown(false);
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

  useEffect(() => {
    fetchBankAccounts();
    fetchParties;
  }, []);
  const [editingBillIndex, setEditingBillIndex] = useState(null);

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
  // const openDetailsModal = (index) => {
  //   setCurrentRowIndex(index);
  //   // Load existing details if they exist, else reset
  //   if (rowDetails[index]) {
  //     setDetailForm(rowDetails[index]);
  //   } else {
  //     setDetailForm({
  //       billNumber: "",
  //       billAmount: voucherRows[index].amount || "",
  //       payMode: "Cash",
  //       bankId: "",
  //       billImage: null,
  //       partyName: "",
  //       employeeName: "",
  //     });
  //   }
  //   setIsDetailsModalOpen(true);
  // };

  //  const handleSaveDetails = () => {
  //   setRowDetails((prev) => {
  //     const existing = prev[currentRowIndex] || [];

  //     const updatedDetails = [...existing, detailForm];

  //     return {
  //       ...prev,
  //       [currentRowIndex]: updatedDetails,
  //     };
  //   });

  //   // Calculate total amount of all bills for this ledger
  //   const existingBills = rowDetails[currentRowIndex] || [];

  //   const total =
  //     existingBills.reduce(
  //       (sum, item) => sum + Number(item.billAmount || 0),
  //       0
  //     ) + Number(detailForm.billAmount || 0);

  //   handleVoucherChange(currentRowIndex, "amount", total);

  //   setIsDetailsModalOpen(false);

  //   // Reset form for next bill entry
  //   setDetailForm({
  //     billNumber: "",
  //     billAmount: "",
  //     payMode: "Cash",
  //     bankId: "",
  //     billImage: null,
  //     partyName: "",
  //     employeeName: "",
  //   });
  // };
  const handleSaveDetails = () => {
    setRowDetails((prev) => {
      const existing = prev[currentRowIndex] || [];

      let updatedDetails;

      if (editingBillIndex !== null) {
        // 🔵 UPDATE existing bill
        updatedDetails = existing.map((item, index) =>
          index === editingBillIndex ? detailForm : item,
        );
      } else {
        // 🟢 ADD new bill
        updatedDetails = [...existing, detailForm];
      }

      // 🔥 Recalculate total
      const total = updatedDetails.reduce(
        (sum, item) => sum + Number(item.billAmount || 0),
        0,
      );

      handleVoucherChange(currentRowIndex, "amount", total);

      return {
        ...prev,
        [currentRowIndex]: updatedDetails,
      };
    });

    setEditingBillIndex(null);
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

  // const handleMainSave = async () => {
  //   debugger;
  //   try {
  //     const finalPayload = {
  //       expenses: voucherRows.map((row, index) => ({
  //         ...row,
  //         details: rowDetails[index] || [],
  //       })),
  //     };

  //     console.log("Sending Data:", finalPayload);

  //     const response = await axios.post(
  //       "http://localhost:5000/api/expense/create-expense",
  //       finalPayload,
  //     );

  //     if (response.data.success) {
  //       alert("Expense Saved Successfully ✅");
  //     }
  //   } catch (error) {
  //     console.error("Save Error:", error);
  //     alert("Something went wrong ❌");
  //   }
  // };

  const handleMainSave = async () => {
    debugger;
    try {
      const formData = new FormData();

      const cleanedExpenses = voucherRows.map((row, index) => ({
        ...row,
        date: row.date ? (typeof row.date === 'string' && row.date.includes('T')
          ? row.date.split('T')[0]
          : row.date) : '',
        details:
          rowDetails[index]?.map((detail) => ({
            ...detail,
            billImage: undefined,
          })) || [],
      }));

      formData.append("expenses", JSON.stringify(cleanedExpenses));

      Object.values(rowDetails).forEach((detailsArr) => {
        detailsArr?.forEach((detail) => {
          if (detail.billImage instanceof File) {
            formData.append("billImage", detail.billImage);
          }
        });
      });

      const response = await axios.post(
        `${API}/api/expense/create-expense`,
        formData,
      );

      if (response.data.success) {
        alert("Expense Saved Successfully ✅");

        // 🔥 Reset States
        setCurrentRowIndex(null);
        setRowDetails({});
        setDetailForm({
          billNumber: "",
          billAmount: "",
          billPaidAmount: "",
          payMode: "Cash",
          bankId: "",
          billImage: null,
          partyName: "",
          employeeName: "",
        });

        // Optional: reset main rows also
        setVoucherRows([
          {
            subLedgerCode: "",
            ledgerName: "",
            date: "",
            sign: "",
            remark: "",
            amount: "",
          },
        ]);
      }
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handleUpdate = async (expenseId) => {
    try {
      const formData = new FormData();

      const cleanedExpenses = [
        {
          ...voucherRows[0],
          date: voucherRows[0].date ? (typeof voucherRows[0].date === 'string' && voucherRows[0].date.includes('T')
            ? voucherRows[0].date.split('T')[0]
            : voucherRows[0].date) : '',
          details:
            rowDetails[0]?.map((detail) => ({
              ...detail,
              billImage: undefined,
            })) || [],
        },
      ];

      formData.append("expenses", JSON.stringify(cleanedExpenses));

      Object.values(rowDetails).forEach((detailsArr) => {
        detailsArr?.forEach((detail) => {
          if (detail.billImage instanceof File) {
            formData.append("billImage", detail.billImage);
          }
        });
      });

      const response = await axios.put(
        `${API}/api/expense/update/${expenseId}`,
        formData,
      );

      if (response.data.success) {
        alert("Expense Updated Successfully ✅");

        // Optional: reset form after update
        setCurrentRowIndex(null);
        setRowDetails({});
        setDetailForm({
          billNumber: "",
          billAmount: "",
          billPaidAmount: "",
          payMode: "Cash",
          bankId: "",
          billImage: null,
          partyName: "",
          employeeName: "",
        });
        navigate("/Expences_list");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update expense ❌");
    }
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
        date: todayDate,
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

  const openDetailsModal = (index) => {
    setCurrentRowIndex(index);

    // If that ledger already has records
    if (rowDetails[index]?.length > 0) {
      // Load first record by default
      setDetailForm(rowDetails[index][0]);
      setEditingBillIndex(0); // Optional if editing enabled
    } else {
      // Reset form if no records
      setDetailForm({
        billNumber: "",
        billAmount: "",
        payMode: "Cash",
        bankId: "",
        billImage: null,
        partyName: "",
        employeeName: "",
      });
      setEditingBillIndex(null);
    }

    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#333] ml-[110px] mr-[110px]">
      <div className="mx-auto p-6 mt-5">
        <div className="flex items-center justify-between px-6 py-4 border-b w-[1290px] h-[61px] border rounded-[11px] border-gray-200 bg-white">
          <h1 className="text-[#D32F2F] text-xl font-bold">Add Expenses</h1>
          <div className="flex space-x-2">
            {!expenseId && !isViewMode && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white p-1.5 rounded hover:bg-blue-800"
                title="Add New Party"
              >
                <UserPlus size={16} />
              </button>
            )}

            {/* ADD MODE */}
            {!expenseId && !isViewMode && (
              <button
                onClick={handleMainSave}
                className="bg-[#0A2478] text-white px-5 py-1.5 rounded text-xs font-bold"
              >
                Save Expense
              </button>
            )}

            {/* EDIT MODE */}
            {expenseId && !isViewMode && (
              <button
                onClick={() => handleUpdate(expenseId)}
                className="bg-[#0A2478] text-white px-5 py-1.5 rounded text-xs font-bold"
              >
                Update Expense
              </button>
            )}

            {/* VIEW MODE */}
            {isViewMode && null}

            <button
              onClick={() => navigate("/Expences_list")}
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
            Expense Voucher Details
          </p>

          <table className=" text-left border-collapse bg-white">
            <thead>
              <tr className="bg-[#0A2478] text-white text-[11px] uppercase">
                <th className="p-2 border-r font-bold w-18 text-center">No</th>
                <th className="p-2 border-r font-bold">Sub Ledger Name</th>
                <th className="p-2 border-r font-bold w-28 text-center">
                  Date
                </th>
                {/* <th className="p-2 border-r font-bold w-28 text-center">
                  Amount
                </th> */}
                <th className="p-2 font-bold w-[400px]">Remark & Details</th>
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
                    <div className="flex flex-col gap-1">
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
                        className="w-full border border-gray-300 rounded-sm px-1 py-1 outline-none bg-white text-[12px]"
                      >
                        <option value="">Select Account</option>
                        {bankAccounts?.map((bank) => (
                          <option key={bank.id} value={bank.id}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                      {row.ledgerName && (
                        <div className="text-[11px] font-semibold text-[#0A2478] px-1 py-0.5 bg-blue-50 rounded">
                          {row.ledgerName}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-1 border-r border-gray-300">
                    <input
                      type="date"
                      disabled={isViewMode}
                      value={
                        row.date
                          ? new Date(row.date).toISOString().split("T")[0]
                          : todayDate
                      }
                      onChange={(e) =>
                        handleVoucherChange(index, "date", e.target.value)
                      }
                      className="w-full bg-white border border-gray-300 rounded-sm px-1 py-0.5 outline-none text-center"
                    />
                  </td>

                  {/* <td className="p-1 border-r border-gray-300">
                    <input
                      type="text"
                      disabled={isViewMode}
                      value={row.amount}
                      onChange={(e) =>
                        handleVoucherChange(index, "amount", e.target.value)
                      }
                      className="w-full bg-white border border-gray-300 rounded-sm px-1 py-0.5 outline-none text-right"
                    />
                  </td> */}
                  <td className="p-1 ">
                    <div className="flex gap-1 items-center">
                      <input
                        type="text"
                        disabled={isViewMode}
                        value={row.remark}
                        onChange={(e) =>
                          handleVoucherChange(index, "remark", e.target.value)
                        }
                        className="flex-1 bg-white border border-gray-300 rounded-sm px-1 py-0.5 outline-none"
                        placeholder="Remark"
                      />

                      <button
                        onClick={addNewRow}
                        disabled={isViewMode}
                        className="bg-[#0A2478] text-white p-1.5 rounded-sm hover:bg-[#0a2669]"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeRow(index)}
                        disabled={isViewMode}
                        className="bg-red-600  text-white p-1.5 rounded-sm hover:bg-red-700"
                      >
                        <Trash2 size={12} />
                      </button>

                      <button
                        onClick={() => openDetailsModal(index)}
                        className={`px-2 py-1 rounded-sm flex items-center font-bold uppercase text-[10px] transition-colors shadow-sm ${rowDetails[index]
                          ? "bg-green-600 text-white"
                          : "bg-[#0A2478] text-white"
                          }`}
                      >
                        {rowDetails[index] ? (
                          <CheckCircle2 size={10} className="mr-1" />
                        ) : (
                          <Plus size={10} className="mr-1" />
                        )}
                        {isViewMode
                          ? rowDetails[index]?.length > 0
                            ? `View Details (${rowDetails[index].length})`
                            : "View Details"
                          : rowDetails[index]?.length > 0
                            ? `Details Added (${rowDetails[index].length})`
                            : "Add Details"}
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
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[700px] overflow-hidden border">
            <div className=" px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-sm text-[#0A2478] font-bold uppercase tracking-wider">
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
              <div className="grid grid-cols-3 gap-4">
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
                    disabled={isViewMode}
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

                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">
                    Bill Paid Amount
                  </label>
                  <input
                    type="number"
                    disabled={isViewMode}
                    min="0"
                    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080]"
                    value={detailForm.billPaidAmount}
                    onChange={(e) => {
                      const paid = Number(e.target.value);
                      const total = Number(detailForm.billAmount || 0);

                      if (paid < 0) {
                        alert("Paid amount cannot be negative");
                        return;
                      }

                      if (paid > total) {
                        alert("Paid amount cannot be greater than Bill Amount");
                        return;
                      }

                      setDetailForm({
                        ...detailForm,
                        billPaidAmount: e.target.value,
                      });
                    }}
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
                    disabled={isViewMode}
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
                    disabled={isViewMode}
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
                    Current Mode:{" "}
                    <span className="font-bold text-[#0D3082]">
                      {detailForm.payMode}
                    </span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col relative">
                  {" "}
                  {/* Added relative here */}
                  <label className="font-bold text-gray-700 mb-1">
                    Party Name
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080]"
                    value={detailForm.partyName}
                    disabled={isViewMode}
                    onChange={handleInputChange}
                    onFocus={() =>
                      detailForm.partyName && setShowDropdown(true)
                    }
                    placeholder="Type to search..."
                  />
                  {/* Dropdown Menu */}
                  {showDropdown && partyList.length > 0 && (
                    <div className="absolute top-[100%] left-0 z-50 w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto mt-1">
                      {partyList.map((party) => (
                        <div
                          key={party.id}
                          className="px-3 py-2 hover:bg-teal-50 hover:text-[#008080] cursor-pointer text-sm border-b last:border-none"
                          onClick={() => handleSelectParty(party)}
                        >
                          <span className="font-medium">
                            {party.party_name}
                          </span>
                          {party.shop_name && (
                            <span className="text-gray-400 text-xs ml-2">
                              ({party.shop_name})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col relative">
                  <label className="font-bold text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    className="border border-gray-300 p-2 rounded outline-none focus:border-[#008080]"
                    placeholder="Search employee..."
                    value={detailForm.employeeName}
                    disabled={isViewMode}
                    onChange={handleInputChangeFortheSelectEmployee}
                    onFocus={() =>
                      employeeList.length > 0 &&
                      setShowDropdownForemployee(true)
                    }
                  />

                  {/* Dropdown Suggestion List */}
                  {showDropdownForEmployee && employeeList.length > 0 && (
                    <div className="absolute top-[100%] left-0 z-50 w-full bg-white border border-gray-200 rounded-b shadow-lg max-h-60 overflow-y-auto mt-1">
                      {employeeList.map((emp) => (
                        <div
                          key={emp.id}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-none transition-colors"
                          onClick={() => handleSelectEmployee(emp)}
                        >
                          {/* If your API provides an image, we can show it */}
                          {emp.emp_image && (
                            <img
                              src={emp.emp_image}
                              alt=""
                              className="w-8 h-8 rounded-full mr-3 object-cover border"
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">
                              {emp.emp_name}
                            </span>
                            <span className="text-xs text-gray-500">
                              ID: {emp.emp_id_no || emp.id}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
                <label className="font-bold text-gray-700 mb-1">
                  Upload Bill Image
                </label>
                <input
                  type="file"
                  disabled={isViewMode}
                  className="text-[11px] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) =>
                    setDetailForm({
                      ...detailForm,
                      billImage: e.target.files[0],
                    })
                  }
                />
              </div>
              {/* 🔹 Show Existing Image Preview */}
              {detailForm.billImage && (
                <div className="mt-1">
                  <p className="text-[11px] font-semibold mb-1">
                    Current Image:
                  </p>

                  <img
                    src={
                      typeof detailForm.billImage === "string"
                        ? detailForm.billImage // For backend URL
                        : URL.createObjectURL(detailForm.billImage) // For newly selected file
                    }
                    alt="Bill Preview"
                    className="w-40 h-20 object-cover border rounded"
                  />
                </div>
              )}
            </div>

            <div className=" p-4 flex gap-2 justify-center">
              {!isViewMode && (
                <button
                  onClick={handleSaveDetails}
                  className="px-6 py-2 text-white rounded font-bold uppercase text-[10px] shadow-md transition-all active:scale-95 bg-[#0A2478]"
                >
                  Save Details
                </button>
              )}
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded font-bold uppercase text-[10px] bg-red-600 text-white transition-colors"
              >
                Exit
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
              {!isViewMode && (
                <button
                  onClick={handlePartySave}
                  className="px-8 py-2 bg-[#0A2478] text-white rounded-lg font-bold text-[11px] flex items-center gap-2 hover:bg-[#0a2669] shadow-lg shadow-blue-900/20 transition-all active:scale-95 uppercase tracking-wider"
                >
                  Save Party
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-white font-bold text-[11px] transition-colors uppercase tracking-wider bg-red-600"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenceCreate;
