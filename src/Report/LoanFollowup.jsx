import axios from "axios";
import { Save, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../api";

const LoanFollowup = () => {
  const location = useLocation();
  const loanData = location.state?.loanData;
  const [followupHistory, setFollowupHistory] = useState([]);
  console.log("Received loanData:", loanData);
  const [formData, setFormData] = useState({
    loanNo: "",
    partyName: "",
    mobileNo: "",
    address: "",
    followUpDate: "",
    nextFollowDate: "",
    followUpBy: "",
    followUpMethod: "",
    followUpRemarks: "",
    employeeRemarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchFollowupHistory = async () => {
    try {
      if (!loanData?.id || !loanData?.BorrowerId) return;

      const res = await axios.get(
        `${API}/api/loan-followup-report/loan-followup-history`,
        {
          params: {
            borrowerId: loanData.BorrowerId,
            loanId: loanData.id,
          },
        },
      );

      if (res.data.success) {
        setFollowupHistory(res.data.data);
      }
    } catch (error) {
      console.error("History Fetch Error:", error);
    }
  };
  useEffect(() => {
    if (loanData) {
      const fullAddress = `
      ${loanData.Permanent_Address || ""}
      ${loanData.Permanent_City ? ", " + loanData.Permanent_City : ""}
      ${loanData.Permanent_State ? ", " + loanData.Permanent_State : ""}
      ${loanData.Permanent_Pincode ? " - " + loanData.Permanent_Pincode : ""}
    `;

      setFormData({
        loanNo: loanData.id || "",
        partyName: loanData.Print_Name || "",
        mobileNo: loanData.Mobile_Number || "",
        address: fullAddress.trim(),
        followUpDate: "",
        nextFollowDate: "",
        followUpBy: "",
        followUpMethod: "",
        followUpRemarks: "",
        employeeRemarks: "",
      });

      fetchFollowupHistory(); // 🔥 important
    }
  }, [loanData]);
  const handleSave = async () => {
    try {
      const payload = {
        loanId: loanData?.id,
        customerId: loanData?.BorrowerId,
        followUpDate: formData.followUpDate,
        nextFollowDate: formData.nextFollowDate,
        followUpBy: formData.followUpBy,
        followUpMethod: formData.followUpMethod,
        followUpRemarks: formData.followUpRemarks,
        employeeRemarks: formData.employeeRemarks,
      };

      console.log("Payload:", payload);

      const response = await axios.post(
        `${API}/api/loan-followup-report/loan-followup-Add`,
        payload,
      );

      if (response.data.success) {
        alert("Followup saved successfully ✅");

        // Clear fields after save
        setFormData((prev) => ({
          ...prev,
          followUpDate: "",
          nextFollowDate: "",
          followUpBy: "",
          followUpMethod: "",
          followUpRemarks: "",
          employeeRemarks: "",
        }));
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("Error saving followup ❌");
    }
  };
  const handleUpload = async (e, row) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("attachment", file);
      formData.append("followupId", row.id);
      formData.append("loanId", loanData.id);
      formData.append("customerId", loanData.BorrowerId);

      const res = await axios.post(
        `${API}/api/loan-followup-report/upload-followup-attachment`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.data.success) {
        alert("File uploaded successfully ✅");
        fetchFollowupHistory(); // refresh table
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-sm">
      <main className="p-4">
        {/* Form Container */}
        <div className="bg-white border border-gray-300 rounded shadow-sm">
          <div className="bg-[#008080] text-white px-4 py-2 font-medium rounded-t">
            Add New Follow Up
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 items-center">
                <label className="text-gray-600">
                  Loan No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.loanNo}
                  readOnly
                  className="col-span-2 border p-1 bg-gray-50 rounded"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-gray-600">
                  Party Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.partyName}
                  readOnly
                  className="col-span-2 border p-1 bg-gray-50 rounded"
                />
              </div>
              <div className="grid grid-cols-3 items-center">
                <label className="text-gray-600">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  readOnly
                  className="col-span-2 border p-1 bg-gray-50 rounded"
                />
              </div>
            </div>

            {/* Right Column (Mobile) */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 items-center">
                <label className="text-gray-600">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.mobileNo}
                  readOnly
                  className="col-span-2 border p-1 bg-gray-50 rounded"
                />
              </div>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-3 items-center">
              <label className="text-gray-600">
                Follow Up Date <span className="text-red-500">*</span>
              </label>
              <div className="col-span-2 flex border rounded overflow-hidden">
                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleChange}
                  className="w-full p-1 outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center">
              <label className="text-gray-600">
                Next Follow Date <span className="text-red-500">*</span>
              </label>
              <div className="col-span-2 flex border rounded overflow-hidden">
                <input
                  type="date"
                  name="nextFollowDate"
                  value={formData.nextFollowDate}
                  onChange={handleChange}
                  className="w-full p-1 outline-none"
                />
              </div>
            </div>

            {/* Method Row */}
            <div className="grid grid-cols-3 items-center">
              <label className="text-gray-600">
                Follow up by <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="followUpBy"
                value={formData.followUpBy}
                onChange={handleChange}
                placeholder="Follow Up By"
                className="col-span-2 border p-1 rounded"
              />
            </div>
            <div className="grid grid-cols-3 items-center">
              <label className="text-gray-600">
                Follow up Method <span className="text-red-500">*</span>
              </label>
              <select
                name="followUpMethod"
                value={formData.followUpMethod}
                onChange={handleChange}
                className="col-span-2 border p-1 rounded"
              >
                <option value="">Select Method</option>
                <option value="Call">Call</option>
                <option value="Visit">Visit</option>
                <option value="Notice">Notice</option>
              </select>
            </div>

            {/* Full Width Text Areas */}
            <div className="md:col-span-2 grid grid-cols-6 items-start">
              <label className="text-gray-600 pt-1">Follow Up Remarks</label>
              <textarea
                name="followUpRemarks"
                value={formData.followUpRemarks}
                onChange={handleChange}
                className="col-span-5 border p-1 rounded h-12"
                placeholder="Follow Up Remarks"
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-6 items-start">
              <label className="text-gray-600 pt-1">Employee Remarks</label>
              <textarea
                name="employeeRemarks"
                value={formData.employeeRemarks}
                onChange={handleChange}
                className="col-span-5 border p-1 rounded h-12"
                placeholder="Employee Remarks"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-[#f8f9fa] p-2 flex space-x-2 border-t">
            <button
              className="bg-[#005a8d] text-white px-6 py-1 rounded flex items-center text-sm hover:bg-blue-800"
              onClick={handleSave}
            >
              <Save size={14} className="mr-2" /> Save
            </button>
            <button className="bg-[#005a8d] text-white px-6 py-1 rounded flex items-center text-sm hover:bg-blue-800">
              <XCircle size={14} className="mr-2" /> Exit
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-6 overflow-x-auto border border-gray-300 rounded shadow-sm">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-gray-200 text-gray-700 text-[12px] uppercase">
              <tr>
                <th className="p-2 border">Loan No</th>
                <th className="p-2 border">Customer ID</th>
                <th className="p-2 border">Party Name</th>
                <th className="p-2 border">FollowUp Date</th>
                <th className="p-2 border">Method</th>
                <th className="p-2 border">By</th>
                <th className="p-2 border">Details</th>
                <th className="p-2 border">Upload</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {followupHistory.length > 0 ? (
                followupHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2 border text-blue-700 font-medium">
                      {loanData.id}
                    </td>

                    <td className="p-2 border text-blue-700">
                      {loanData.BorrowerId}
                    </td>

                    <td className="p-2 border font-semibold">
                      {loanData.Print_Name}
                    </td>

                    <td className="p-2 border">
                      {new Date(row.followUpDate).toLocaleDateString("en-GB")}
                    </td>

                    <td className="p-2 border">{row.followUpMethod}</td>

                    <td className="p-2 border">{row.followUpBy}</td>

                    <td className="p-2 border">{row.followUpRemarks}</td>

                    <td className="p-2 border">
                      <label className="cursor-pointer text-blue-600 underline">
                        Upload
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleUpload(e, row)}
                        />
                      </label>

                      {row.attachment && (
                        <div>
                          <a
                            href={`${API}/uploads/followups/${loanData.id}/${row.attachment}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-600 text-xs"
                          >
                            View
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No Followup History Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default LoanFollowup;
