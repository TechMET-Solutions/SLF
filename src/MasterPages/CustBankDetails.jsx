import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import GroupData from "../assets/Group 124.svg";
import File from "../assets/text.png";
import Vectorimg from "../assets/Vectorimg.png";
const CustBankDetails = ({ bankData, setBankData, mode, setMode,updatemode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [previewUrls, setPreviewUrls] = useState({});

  const [showChequeModal, setShowChequeModal] = useState(false);
const [selectedCheque, setSelectedCheque] = useState(null);

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bankName: "",
    customerName: "",
    accountNo: "",
    ifsc: "",
    bankAddress: "",
    cancelCheque: null,
  });
    
    console.log(formData,"formData in the update bank")

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const verifyBankDetails = async () => {
  // 1. Basic Validation
  if (!formData.accountNo || !formData.ifsc) {
    alert("Please enter both Account Number and IFSC code.");
    return;
  }

  try {
    // 2. API Call to your backend
    const response = await axios.post(`${API}/kyc/bank/verify`, {
      account_number: formData.accountNo,
      ifsc: formData.ifsc
    });

    if (response.data.status) {
      const bankInfo = response.data.data.data; // Path from Surepass response

      // 3. Auto-fill the form fields
      setFormData((prev) => ({
        ...prev,
        customerName: bankInfo.full_name || prev.customerName,
        bankName: bankInfo.ifsc_details?.bank_name || prev.bankName,
        bankAddress: `${bankInfo.ifsc_details?.branch}, ${bankInfo.ifsc_details?.city}` || prev.bankAddress,
        isBankVerified: true // Helpful for disabling fields later
      }));
      
      alert("Bank Details Verified Successfully!");
    }
  } catch (error) {
    console.error("Verification Error:", error);
    alert(error.response?.data?.message || "Verification failed. Please check details.");
  }
};
  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        cancelCheque: file,
      }));
    }
  };

  // 🔄 Generate previews whenever bankData changes
  useEffect(() => {
    const newPreviews = {};
    bankData.forEach((row, index) => {
      if (row.cancelCheque && typeof row.cancelCheque === "object") {
        newPreviews[index] = URL.createObjectURL(row.cancelCheque);
      } else if (typeof row.cancelCheque === "string") {
        newPreviews[index] = row.cancelCheque;
      }
    });
    setPreviewUrls(newPreviews);

    // Cleanup blob URLs
    return () => {
      Object.values(newPreviews).forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [bankData]);

  // 🧩 Save or Update Bank Data
  const handleSave = () => {
    if (
      !formData.bankName ||
      !formData.customerName ||
      !formData.accountNo ||
      !formData.ifsc
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (mode === "add") {
      const newEntry = {
        bankName: formData.bankName,
        Customer_Name: formData.customerName,
        Account_No: formData.accountNo,
        IFSC: formData.ifsc,
        Bank_Address: formData.bankAddress,
        cancelCheque: formData.cancelCheque,
        Update_By: "Admin",
        Update_On: new Date().toLocaleDateString(),
      };
      setBankData((prev) => [...prev, newEntry]);
    } else if (mode === "edit" && editIndex !== null) {
      const updatedData = [...bankData];
      updatedData[editIndex] = {
        ...updatedData[editIndex],
        bankName: formData.bankName,
        Customer_Name: formData.customerName,
        Account_No: formData.accountNo,
        IFSC: formData.ifsc,
        Bank_Address: formData.bankAddress,
        cancelCheque: formData.cancelCheque, // ✅ keep latest file or URL
        Update_By: "Admin",
        Update_On: new Date().toLocaleDateString(),
      };
      setBankData(updatedData);
      setPreviewUrls({ ...previewUrls }); // force rerender
    }

    handleCloseModal();
  };

  // Reset form + close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      bankName: "",
      customerName: "",
      accountNo: "",
      ifsc: "",
      bankAddress: "",
      cancelCheque: null,
    });
    setEditIndex(null);
    setMode("add");
  };

  // View bank details
  const handleView = (index) => {
    const data = bankData[index];
    setFormData({
      bankName: data.bankName,
      customerName: data.Customer_Name,
      accountNo: data.Account_No,
      ifsc: data.IFSC,
      bankAddress: data.Bank_Address,
      cancelCheque: data.cancelCheque,
    });
    setMode("view");
    setIsModalOpen(true);
  };

  // Edit existing entry
  const handleEdit = (index) => {
    const data = bankData[index];
    setFormData({
      bankName: data.bankName,
      customerName: data.Customer_Name,
      accountNo: data.Account_No,
      ifsc: data.IFSC,
      bankAddress: data.Bank_Address,
      cancelCheque: data.cancelCheque,
      customerId: data.customerId,
      id:data.id
    });
    setMode("edit");
    setEditIndex(index);
    setIsModalOpen(true);
  };

    
   const updateBankDetails = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("bankData", JSON.stringify(formData));

      // 🖼️ Only append cheque file if new one selected
      if (formData.cancelCheque && typeof formData.cancelCheque === "object") {
        formDataToSend.append("cancelCheque", formData.cancelCheque);
      }

      const response = await axios.put(`${API}/bank/updateBankDetails`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Bank details updated:", response.data);

      // 🟢 Navigate after success
      navigate("/Customer-Profile-List");

    } catch (error) {
      console.error("❌ Error updating bank details:", error);
      alert("Failed to update bank details. Please try again.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto mt-5 w-[1250px] h-auto mb-5">
        {/* Header + Add Button */}
        <div className="flex justify-between">
          <p className="font-[Source_Sans_3] font-semibold text-[14px] underline">
            Bank Details
                  </p>
                  {
                      updatemode !== "edit" && (
                           <button
            className="w-[72.7px] h-[33.7px] bg-[#0A2478] text-white rounded-[3.12px] flex items-center justify-center text-[14px] font-[Source_Sans_3] font-semibold"
            onClick={() => {
              setMode("add");
              setIsModalOpen(true);
            }}
          >
            Add New
          </button>
                      )
                  }
         
        </div>

        {/* Table */}
        <table className="w-full border-collapse mt-5">
          <thead className="bg-[#0A2478] text-white text-sm">
            <tr>
              <th className="px-4 py-2 border-r">Bank Name</th>
              <th className="px-4 py-2 border-r">Customer Name</th>
              <th className="px-4 py-2 border-r">Account No</th>
              <th className="px-4 py-2 border-r">IFSC</th>
              {/* <th className="px-4 py-2 border-r">Cancelled Cheque</th> */}
              <th className="px-4 py-2 border-r">Bank Address</th>
              <th className="px-4 py-2 border-r">Update By</th>
              <th className="px-4 py-2 border-r">Update On</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="text-[12px]">
            {bankData.map((row, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">{row.bankName}</td>
                <td className="px-4 py-2">{row.Customer_Name}</td>
                <td className="px-4 py-2">{row.Account_No}</td>
                <td className="px-4 py-2">{row.IFSC}</td>

                {/* Cancel Cheque Image */}
                {/* <td className="px-4 py-2">
                  {row.cancelCheque ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={previewUrls[index]}
                        alt="Cheque"
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <span className="text-blue-600 underline">
                        {typeof row.cancelCheque === "object"
                          ? row.cancelCheque.name
                          : "Cheque Image"}
                      </span>
                    </div>
                  ) : (
                    "-"
                  )}
                </td> */}

                <td className="px-4 py-2">{row.Bank_Address}</td>
                <td className="px-4 py-2">{row.Update_By}</td>
                <td className="px-4 py-2">{row.Update_On}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <div
                      className="w-[17px] h-[17px] bg-[#56A869] rounded flex items-center justify-center p-0.5 cursor-pointer"
                      onClick={() => handleEdit(index)}
                      title="Edit"
                    >
                      <img
                        src={GroupData}
                        alt="edit"
                        className="w-[18px] h-[18px]"
                      />
                    </div>
                    <div
                      className="w-[17px] h-[17px] bg-[#C5644E] rounded flex items-center justify-center p-0.5 cursor-pointer"
                      onClick={() => handleView(index)}
                      title="View"
                    >
                      <img src={Vectorimg} alt="view" />
                    </div>

                     <div
                      className="w-[17px] h-[17px] bg-[#C5644E] rounded flex items-center justify-center p-0.5 cursor-pointer"
                     onClick={() => {
    setSelectedCheque(previewUrls[index]); // or row.cancelCheque URL
    setShowChequeModal(true);
  }}
                      title="View"
                    >
                     <img src={File} alt="view" />
                    </div>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
{showChequeModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-4 w-[400px] relative">
      <button
        onClick={() => setShowChequeModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      <h3 className="text-sm font-semibold mb-3">Cancelled Cheque</h3>

      {selectedCheque ? (
        <img
          src={selectedCheque}
          alt="Cheque"
          className="w-full h-[200px] border rounded"
        />
      ) : (
        <p className="text-sm text-gray-500">No image available</p>
      )}
    </div>
  </div>
)}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "#0101017A", backdropFilter: "blur(6.8px)" }}
          >
            <div className="bg-white w-[800px] rounded-lg shadow-lg h-auto p-10">
              <h2 className="text-[#0A2478] mb-4 font-semibold text-[20px]">
                {mode === "add"
                  ? "Add Bank Details"
                  : mode === "view"
                  ? "View Bank Details"
                  : "Edit Bank Details"}
              </h2>

              <div className="gap-4">
                {/* Bank Name / Holder / Account No */}
                <div className="flex flex-row items-end gap-3">
  {/* Account Number */}
  <div className="flex flex-col">
    <label className="text-[13px] font-medium mb-1">Account No <span className="text-red-500">*</span></label>
    <input
      name="accountNo"
      value={formData.accountNo}
      onChange={handleChange}
      type="text"
      disabled={mode === "view"}
      placeholder="Enter Account No"
      className="border border-gray-300 rounded w-[250px] h-[32px] px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
    />
  </div>

  {/* IFSC Code + Verify Button */}
  <div className="flex flex-col">
    <label className="text-[13px] font-medium mb-1">IFSC Code <span className="text-red-500">*</span></label>
    <div className="flex">
      <input
        name="ifsc"
        value={formData.ifsc}
        onChange={handleChange}
        type="text"
        disabled={mode === "view"}
        placeholder="IFSC Code"
        className="border border-gray-300 rounded-l w-[130px] h-[32px] px-3 text-xs border-r-0 focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase disabled:bg-gray-100"
      />
      <button
        type="button"
        onClick={verifyBankDetails}
        className="bg-[#0A2478] text-white px-3 h-[32px] rounded-r text-[11px] font-bold hover:bg-[#081c5b] transition-colors"
      >
        Verify
      </button>
    </div>
  </div>

  {/* Bank Name */}
  <div className="flex flex-col">
    <label className="text-[13px] font-medium mb-1">Bank Name <span className="text-red-500">*</span></label>
    <input
      name="bankName"
      value={formData.bankName}
      onChange={handleChange}
      type="text"
      disabled={mode === "view"}
      placeholder="Bank Name"
      className="border border-gray-300 rounded w-[280px] h-[32px] px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
    />
  </div>
</div>

                {/* IFSC / Address / Cheque */}
               <div className="flex flex-row items-start mt-4 gap-4">
  {/* Account Holder Name */}
  <div className="flex flex-col">
    <label className="text-[13px] font-medium mb-1">Account Holder Name <span className="text-red-500">*</span></label>
    <input
      name="customerName"
      value={formData.customerName}
      onChange={handleChange}
      type="text"
      disabled={mode === "view"}
      placeholder="Holder Name"
      className="border border-gray-300 rounded w-[220px] h-[32px] px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
    />
  </div>

  {/* Bank Address */}
  <div className="flex flex-col">
    <label className="text-[13px] font-medium mb-1">Bank Address <span className="text-red-500">*</span></label>
    <input
      name="bankAddress"
      value={formData.bankAddress}
      onChange={handleChange}
      type="text"
      disabled={mode === "view"}
      placeholder="Address"
      className="border border-gray-300 rounded w-[250px] h-[32px] px-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
    />
  </div>

  {/* File Upload Component */}
  <div className="flex flex-col">
    <label className="text-[13px] font-medium mb-1">Attach Cancel Cheque</label>
    <div className="flex items-center">
      <div className={`flex items-center border border-gray-300 rounded h-[32px] w-[240px] bg-white overflow-hidden ${mode === "view" ? "bg-gray-50" : ""}`}>
        <label
          htmlFor="uploadFile"
          className={`${
            mode === "view"
              ? "bg-gray-200 cursor-not-allowed text-gray-500"
              : "bg-gray-100 cursor-pointer text-[#0A2478] hover:bg-gray-200"
          } px-3 h-full flex items-center text-[11px] font-bold border-r border-gray-300 transition-colors`}
        >
          Choose File
        </label>
        <input
          id="uploadFile"
          type="file"
          className="hidden"
          disabled={mode === "view"}
          onChange={handleFileChange}
        />
        <span className="px-3 text-[11px] text-gray-500 truncate flex-1">
          {formData.cancelCheque
            ? typeof formData.cancelCheque === "object"
              ? formData.cancelCheque.name
              : "Cheque Attached"
            : "No file chosen"}
        </span>
      </div>

      {/* Small Preview Thumbnail (Inline) */}
      {formData.cancelCheque && (
        <div className="ml-2 group relative">
          <img
            src={
              typeof formData.cancelCheque === "object"
                ? URL.createObjectURL(formData.cancelCheque)
                : formData.cancelCheque
            }
            alt="Preview"
            className="w-[32px] h-[32px] object-cover border rounded shadow-sm cursor-pointer"
          />
          {/* Tooltip on hover for larger view */}
          <div className="hidden group-hover:block absolute bottom-10 left-0 z-50 p-1 bg-white border rounded shadow-lg">
             <img 
               src={typeof formData.cancelCheque === "object" ? URL.createObjectURL(formData.cancelCheque) : formData.cancelCheque}
               className="w-40 h-auto rounded"
             />
          </div>
        </div>
      )}
    </div>
  </div>
</div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-5 mt-6">
                {mode === "add" && (
                  <button
                    className="bg-[#0A2478] text-white w-[92.66px] h-[30.57px] rounded"
                                      onClick={handleSave}
                                       
                  >
                    {mode === "edit" ? "Update" : "Save"}
                  </button>
                )}
                {mode === "edit" && (
                  <button
                    className="bg-[#0A2478] text-white w-[92.66px] h-[30.57px] rounded"
                                     
                                        onClick={() => updateBankDetails(formData)}
                  >
                    {mode === "edit" ? "Update" : "Save"}
                  </button>
                )}
                <button
                  className="bg-[#C1121F] text-white w-[92.66px] h-[30.57px] rounded"
                  onClick={handleCloseModal}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustBankDetails;
