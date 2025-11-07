import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import GroupData from "../assets/Group 124.svg";
import Vectorimg from "../assets/Vectorimg.png";

const CustBankDetails = ({ bankData, setBankData, mode, setMode,updatemode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [previewUrls, setPreviewUrls] = useState({});
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
      <div className="overflow-x-auto mt-5 w-[1290px] h-auto mb-5">
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
              <th className="px-4 py-2 border-r">Cancelled Cheque</th>
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
                <td className="px-4 py-2">
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
                </td>

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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "#0101017A", backdropFilter: "blur(6.8px)" }}
          >
            <div className="bg-white w-[896px] rounded-lg shadow-lg h-auto p-10">
              <h2 className="text-[#0A2478] mb-4 font-semibold text-[20px]">
                {mode === "add"
                  ? "Add Bank Details"
                  : mode === "view"
                  ? "View Bank Details"
                  : "Edit Bank Details"}
              </h2>

              <div className="gap-4">
                {/* Bank Name / Holder / Account No */}
                <div className="flex gap-2">
                   <div>
                    <label className="text-[14px]">Account No <span className="text-red-500">*</span></label>
                    <input
                      name="accountNo"
                      value={formData.accountNo}
                      onChange={handleChange}
                      type="text"
                      disabled={mode === "view"}
                      placeholder="Account No"
                      className="border border-gray-300 rounded w-[238px] h-[38px] p-[10px_14px]"
                    />
                  </div>
<div>
                    <label className="text-[14px]">IFSC Code <span className="text-red-500">*</span></label>
                    <input
                      name="ifsc"
                      value={formData.ifsc}
                      onChange={handleChange}
                      type="text"
                      disabled={mode === "view"}
                      placeholder="IFSC Code"
                      className="border border-gray-300 rounded w-[238px] h-[38px] p-[10px_14px]"
                    />
                  </div>
                  <div>
                    <label className="text-[14px]">Bank Name <span className="text-red-500">*</span></label>
                    <input
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      type="text"
                      disabled={mode === "view"}
                      placeholder="Bank Name"
                      className="border border-gray-300 rounded w-[238px] h-[38px] p-[10px_14px]"
                    />
                  </div>

                 

                 
                </div>

                {/* IFSC / Address / Cheque */}
                <div className="flex mt-5 gap-2">
                   <div>
                    <label className="text-[14px]">Account Holder Name <span className="text-red-500">*</span></label>
                    <input
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      type="text"
                      disabled={mode === "view"}
                      placeholder="Holder Name"
                      className="border border-gray-300 rounded w-[300px] h-[38px] p-[10px_14px]"
                    />
                  </div>
                  

                  <div>
                    <label className="text-[14px]">Bank Address <span className="text-red-500">*</span></label>
                    <input
                      name="bankAddress"
                      value={formData.bankAddress}
                      onChange={handleChange}
                      type="text"
                      disabled={mode === "view"}
                      placeholder="Address"
                      className="border border-gray-300 rounded w-[300px] h-[38px] p-[10px_14px]"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="text-[14px]">Attach Cancel Cheque <span className="text-red-500">*</span></label>
                    <div className="flex flex-col mt-1">
                      <div className="flex items-center border border-gray-300 rounded w-[230px]">
                        <label
                          htmlFor="uploadFile"
                          className={`${
                            mode === "view"
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-[#D9D9D9] cursor-pointer"
                          } px-4 py-2 text-[12px] rounded-l border-r border w-[200px] text-black font-semibold`}
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
                        <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                          {formData.cancelCheque
                            ? typeof formData.cancelCheque === "object"
                              ? formData.cancelCheque.name
                              : "Existing cheque selected"
                            : "No file chosen"}
                        </span>
                      </div>

                      {/* Image Preview */}
                      {formData.cancelCheque && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-1">
                            Cheque Preview:
                          </p>
                          <img
                            src={
                              typeof formData.cancelCheque === "object"
                                ? URL.createObjectURL(formData.cancelCheque)
                                : formData.cancelCheque
                            }
                            alt="Cheque Preview"
                            className="w-40 h-40 object-cover border rounded"
                          />
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
