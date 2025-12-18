import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../API/Context/AuthContext";
import { API } from "../api";
import GroupData from "../assets/Group 124.svg";
import DeleteData from "../assets/deletimg.png";
import { decryptData, encryptData } from "../utils/cryptoHelper";

const ChargesProfileList = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null); // To track which profile is being edited
  const [isview, setIsview] = useState(null);
  const [accountList, setAccountList] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    amount: "",
    account: "",
    isActive: true,
    addedBy: "",
  });
  const { loginUser } = useAuth();

  console.log("Logged in user:", loginUser);
  useEffect(() => {
    fetchChargeProfiles();
  }, []);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(`${API}/account-code/get`);
        setAccountList(res.data); // res.data = [ { id, name, ... } ]
      } catch (err) {
        console.log("Error fetching account list", err);
      }
    };

    fetchAccounts();
  }, []);
  // ✅ Fetch data
  const fetchChargeProfiles = async () => {
    try {
      const response = await axios.get(`${API}/Master/GetChargesProfile/get`);
      if (response.status === 200 && response.data?.data) {
        const decrypted = decryptData(response.data.data);
        const parsedData = typeof decrypted === "string" ? JSON.parse(decrypted) : decrypted;
        setData(parsedData.data || []);
      }
    } catch (error) {
      console.error("❌ Error fetching charge profiles:", error);
      alert("❌ Failed to fetch charge profiles");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Save or Update form
  // const handleSave = async () => {
  //   try {
  //     const encryptedPayload = encryptData(
  //       JSON.stringify(editingId ? { ...formData, id: editingId } : formData)
  //     );

  //     let response;
  //     if (editingId) {
  //       // Update API
  //       response = await axios.put(
  //         `${API}/Master/updateChargesProfile`,
  //         { data: encryptedPayload }
  //       );
  //     } else {
  //       // Add API
  //       response = await axios.post(
  //         `${API}/Master/ChargesProfile/add`,
  //         { data: encryptedPayload }
  //       );
  //       console.log(data)
  //     }

  //     if (response.status === 200 || response.status === 201) {
  //       const decryptedText = decryptData(response.data.data);
  //       const parsedData =
  //         typeof decryptedText === "string" ? JSON.parse(decryptedText) : decryptedText;

  //       alert(`✅ ${parsedData.message}`);
  //       setIsModalOpen(false);
  //       setEditingId(null);
  //       setFormData({
  //         code: "",
  //         description: "",
  //         amount: "",
  //         account: "",
  //         isActive: true,
  //         addedBy: "",
  //       });
  //       fetchChargeProfiles();
  //     }
  //   } catch (error) {
  //     console.error("❌ Error saving/updating charge profile:", error);
  //     alert("❌ Failed to save/update. Please try again.");
  //   }
  // };

  const handleSave = async () => {
  try {
    let payloadObj;

    if (editingId) {
      // 🟡 UPDATE
      payloadObj = {
        ...formData,
        id: editingId,
      };
    } else {
      // 🟢 ADD
      payloadObj = {
        ...formData,
        addedBy: loginUser,   // ⭐ Add logged-in user on save
      };
    }

    const encryptedPayload = encryptData(JSON.stringify(payloadObj));

    let response;
    if (editingId) {
      response = await axios.put(
        `${API}/Master/updateChargesProfile`,
        { data: encryptedPayload }
      );
    } else {
      response = await axios.post(
        `${API}/Master/ChargesProfile/add`,
        { data: encryptedPayload }
      );
    }

    if (response.status === 200 || response.status === 201) {
      const decryptedText = decryptData(response.data.data);
      const parsedData =
        typeof decryptedText === "string" ? JSON.parse(decryptedText) : decryptedText;

      alert(`✅ ${parsedData.message}`);
      setIsModalOpen(false);
      setEditingId(null);

      setFormData({
        code: "",
        description: "",
        amount: "",
        account: "",
        isActive: true,
        addedBy: "",
      });

      fetchChargeProfiles();
    }
  } catch (error) {
    console.error("❌ Error saving/updating charge profile:", error);
    alert("❌ Failed to save/update. Please try again.");
  }
};


  // ✅ Edit a profile
  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setFormData({
      code: profile.code,
      description: profile.description,
      amount: profile.amount,
      account: profile.account,
      isActive: profile.isActive,
      addedBy: profile.addedBy || "",
    });
    setIsModalOpen(true);
  };
  const handleView = (profile) => {
    setIsview(true);
    setFormData({
      code: profile.code,
      description: profile.description,
      amount: profile.amount,
      account: profile.account,
      isActive: profile.isActive,
      addedBy: profile.addedBy || "",
    });
    setIsModalOpen(true);
  };
  const handleDelete = async (profile) => {
    debugger
    if (!window.confirm("Are you sure you want to delete this charge profile?")) {
      return;
    }

    try {
      // Prepare encrypted payload
      const payload = {
        id: profile.id,
      };
      const encryptedPayload = encryptData(JSON.stringify(payload));

      // Call DELETE API
      const response = await axios.delete(`${API}/Master/charge-profile/delete`, {
        data: { data: encryptedPayload },
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Decrypt response
      const decryptedResponse = decryptData(response.data.data);
      const result = typeof decryptedResponse === "string" ? JSON.parse(decryptedResponse) : decryptedResponse;

      if (result.message) {
        // Remove deleted profile from local state
        // setChargeProfiles((prev) => prev.filter((p) => p.id !== profile.id));
        alert(result.message);
        fetchChargeProfiles()
      }
    } catch (err) {
      console.error("Error deleting charge profile:", err);
      alert("Failed to delete charge profile");
    }
  };

  // ✅ Toggle active state
  const handleToggle = async (id, currentState) => {
    try {
      const payload = encryptData(JSON.stringify({ id, isActive: !currentState }));
      const response = await axios.patch(
        `${API}/Master/statusChangeChargesProfile`,
        { data: payload }
      );

      if (response.status === 200 && response.data?.data) {
        const decrypted = decryptData(response.data.data);
        const parsed = typeof decrypted === "string" ? JSON.parse(decrypted) : decrypted;
        alert(`✅ ${parsed.message}`);
        fetchChargeProfiles();
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      alert("❌ Failed to update status");
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header and Add Button */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Charges Profile List
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    code: "",
                    description: "",
                    amount: "",
                    account: "",
                    isActive: false,
                    addedBy: "",
                  });
                  setIsModalOpen(true);
                }}
                className="bg-[#0A2478] cursor-pointer text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Add
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-[#C1121F] text-white text-[10px] px-4 py-1 rounded cursor-pointer">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[717px] rounded-lg shadow-lg h-[400px] p-10">
            <h2 className="text-[#0A2478] text-[20px] font-semibold font-source mb-4">
              {isview
                ? "View Charges Profile"
                : editingId
                  ? "Update Charges Profile"
                  : "Add Charges Profile"}
            </h2>


            <div className="grid grid-cols-2 gap-4">
              {/* Form Fields */}
              <div>
                <label className="text-[14px]">Code <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  disabled={isview}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-[280px] h-[38px] px-3"
                />
              </div>

              <div>
                <label className="text-[14px]">Description <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  disabled={isview}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-[280px] h-[38px] px-3"
                />
              </div>
              <div>
                <label className="text-[12px] font-medium">Amount <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  disabled={isview}
                  onChange={handleChange}
                  style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                  className="border border-gray-300 rounded w-[280px] h-[38px] px-3"
                />
              </div>
              <div>
                <label className="text-[12px] font-medium">Account <span className="text-red-500">*</span></label>
                <select
                  name="account"
                  value={formData.account}
                  disabled={isview}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-[280px] h-[38px] px-3"
                >
                  <option value="">-- Select --</option>

                  {accountList.map((acc) => (
                    <option key={acc.id} value={acc.name}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="flex justify-center gap-3 m-4">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                disabled={isview}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label className="text-[14px] font-medium">is Active</label>
            </div> */}

            <div className="flex justify-center gap-3 my-6 mt-10">
              {
                !isview && (
                  <button
                    className="bg-[#0A2478] cursor-pointer text-white w-[92px] h-[30px] rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                )
              }

              <button
                className="bg-[#C1121F] cursor-pointer text-white w-[92px] h-[30px] rounded"
                onClick={() => {
                  setIsModalOpen(false);    // close modal
                  setEditingId(null);       // reset edit tracking
                  setIsview(null);          // reset view mode
                  setFormData({             // reset form fields
                    code: "",
                    description: "",
                    amount: "",
                    account: "",
                    isActive: false,
                    addedBy: "",
                  });
                }}
              >
                Exit
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r">Code</th>
                <th className="px-4 py-2 text-left border-r">Description</th>
                <th className="px-4 py-2 text-left border-r">Amount</th>
                <th className="px-4 py-2 text-left border-r">Added By</th>
                <th className="px-4 py-2 text-left border-r">Added On</th>
                <th className="px-4 py-2 text-left border-r">Action</th>
                <th className="px-4 py-2 text-left">Active</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {data?.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-blue-500 cursor-pointer" onClick={() => handleView(row)}>{row.code}</td>
                  <td className="px-4 py-2">{row.description}</td>
                  <td className="px-4 py-2">{row.amount}</td>
                  <td className="px-4 py-2">{row.addedBy}</td>
                  <td className="px-4 py-2">{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-2">
                      <div
                        className="w-[20px] h-[20px] bg-[#56A869] rounded flex items-center justify-center p-1"
                        onClick={() => handleEdit(row)}
                      >
                        <img src={GroupData} alt="edit" className="w-[18px] h-[18px]" title="Edit" />
                      </div>
                      {/* <div className="w-[20px] h-[20px] bg-[#646AD9] rounded flex items-center justify-center p-1" onClick={() => handleView(row)}>
                        <img src={EyeData} alt="view" className="w-[18px] h-[18px]" title="view" />
                      </div> */}
                      <div className="w-[20px] h-[20px] bg-red-400 rounded flex items-center justify-center p-1"
                        onClick={() => handleDelete(row)}>
                        <img src={DeleteData} alt="delete" className="w-[12px] h-[14px]" title="Delete" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleToggle(row.id, row.isActive)}
                      className={`w-12 h-6 flex cursor-pointer items-center rounded-full p-1 transition-colors ${row.isActive ? "bg-[#0A2478]" : "bg-gray-300"
                        }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${row.isActive ? "translate-x-6" : "translate-x-0"
                          }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChargesProfileList;
