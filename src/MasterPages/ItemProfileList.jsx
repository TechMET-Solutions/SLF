
import { useState, useEffect } from "react";
import axios from "axios";
import { encryptData, decryptData } from "../utils/cryptoHelper";
import GroupData from "../assets/Group 124.svg";
import { API } from "../api";

const ItemProfileList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Search states (kept for UI but no functionality)
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  
  // Form states
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    name: "",
    printName: "",
    remark: "",
    addedBy: "Admin",
    status: 1
  });

  const API_BASE = `${API}/Master/Master_Profile`;

  // Fetch all items on component mount
  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const encryptedPayload = encryptData({});
      
      const response = await axios({
        method: 'get',
        url: `${API_BASE}/all_Item`,
        headers: { "Content-Type": "application/json" },
        data: { data: encryptedPayload }
      });

      console.log("API Response:", response.data);

      if (response.data && response.data.data) {
        const decryptedData = decryptData(response.data.data);
        console.log("Decrypted Data:", decryptedData);
        
        if (decryptedData && Array.isArray(decryptedData)) {
          setData(decryptedData);
        } else {
          console.log("No valid data array found");
          setData([]);
        }
      } else {
        console.log("No data in response");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error.response || error);
      setData([]);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      // Edit mode
      setIsEditMode(true);
      setFormData({
        id: item.id,
        code: item.code,
        name: item.name,
        printName: item.name,
        remark: item.remark || "",
        addedBy: item.added_by || "Admin",
        status: item.status
      });
    } else {
      // Add mode
      setIsEditMode(false);
      setFormData({
        id: null,
        code: "",
        name: "",
        printName: "",
        remark: "",
        addedBy: "Admin",
        status: 1
      });
    }
    setIsModalOpen(true);
  };

const handleSave = async () => {
  if (!formData.code || !formData.name) return;

  try {
    const payload = {
      code: formData.code,
      name: formData.name,
      added_by: formData.addedBy,
      add_on: new Date().toISOString(),
      remark: formData.remark,
      status: formData.status,
      modified_by: isEditMode && formData.id ? formData.addedBy : "",
      modified_on: isEditMode && formData.id ? new Date().toISOString() : "",
    };

    if (isEditMode && formData.id) {
      payload.id = formData.id;
    }

    const encryptedPayload = encryptData(payload);
    const url = isEditMode ? `${API_BASE}/update_Item` : `${API_BASE}/add_Item`;
    const method = isEditMode ? "put" : "post";

    const response = await axios({
      method: method,
      url: url,
      headers: { "Content-Type": "application/json" },
      data: { data: encryptedPayload },
    });

    if (response.status === 200) {
      setIsModalOpen(false);
      fetchAllItems();
    }
  } catch (error) {
    console.error("Error saving item:", error.response || error);
  }
};




  const handleToggleStatus = async (item) => {
    try {
      const newStatus = item.status === 1 ? 0 : 1;
      const payload = { id: item.id, status: newStatus };
      const encryptedPayload = encryptData(payload);

      const response = await axios.put(
        `${API_BASE}/edit_Item_Status`,
        { data: encryptedPayload },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        fetchAllItems();
      }
    } catch (error) {
      console.error("Error toggling status:", error.response || error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Top Bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            Item profile List
          </h2>

          <div className="flex gap-3">
            <div className="flex gap-5 items-center">
              <p
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "11.25px",
                  lineHeight: "15px",
                  letterSpacing: "0em",
                }}
              >
                Item Code
              </p>
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                style={{
                  width: "168.64px",
                  height: "27.49px",
                  borderRadius: "5px",
                  borderWidth: "0.62px",
                }}
                className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
              />
            </div>

            <div className="flex gap-5 items-center">
              <p
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "11.25px",
                  lineHeight: "15px",
                  letterSpacing: "0em",
                }}
              >
                Item Name
              </p>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{
                  width: "168.64px",
                  height: "27.49px",
                  borderRadius: "5px",
                  borderWidth: "0.62px",
                }}
                className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
              />
              <button
                style={{
                  width: "84.36px",
                  height: "26.87px",
                  borderRadius: "5px",
                }}
                className="bg-[#0b2c69] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Search
              </button>
            </div>

            <div className="flex justify-center item-center gap-5">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                  gap: "6.25px",
                }}
                onClick={() => handleOpenModal()}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Add
              </button>
              <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[717px] p-10 rounded-lg shadow-lg">
            <h2
              className="text-[#0A2478] mb-6"
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              {isEditMode ? "Edit Item" : "Add New Item"}
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-[14px] font-medium">
                  Item Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Code"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-[14px] font-medium">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-[14px] font-medium">
                  Print Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Print Name"
                  value={formData.printName}
                  onChange={(e) => setFormData({...formData, printName: e.target.value})}
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-[14px] font-medium">Added By</label>
                <select
                  value={formData.addedBy}
                  onChange={(e) => setFormData({...formData, addedBy: e.target.value})}
                  className="border border-gray-300 rounded w-full px-3 py-2 mt-1"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="EMG">EMG</option>
                </select>
              </div>

              <div>
                <label className="text-[14px] font-medium">Remark</label>
                <input
                  type="text"
                  placeholder="Remark"
                  value={formData.remark}
                  onChange={(e) => setFormData({...formData, remark: e.target.value})}
                  className="border border-gray-300 rounded w-[420px] px-3 py-2 mt-1"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-4">
              <div className="col-span-2 flex gap-4 items-center">
                <input
                  type="checkbox"
                  checked={formData.status === 1}
                  onChange={(e) => setFormData({...formData, status: e.target.checked ? 1 : 0})}
                  className="w-5 h-5 border border-gray-300 rounded"
                />
                <label className="text-[14px] font-medium mr-3">
                  Active <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="bg-[#0A2478] text-white px-6 py-2 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-[#C1121F] text-white px-6 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
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
          {data.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg text-gray-500">No Data Found</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Code</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Name</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Status</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added By</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added On</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified By</th>
                  <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified On</th>
                  <th className="px-4 py-2 text-left text-[13px]">Action</th>
                  <th className="px-4 py-2 text-left text-[13px]">Active</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-2">{row.code}</td>
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">{row.status === 1 ? "Active" : "Inactive"}</td>
                    <td className="px-4 py-2">{row.added_by || "-"}</td>
                    <td className="px-4 py-2">{row.add_on ? new Date(row.add_on).toLocaleDateString() : "-"}</td>
                    <td className="px-4 py-2">{row.modified_by || "-"}</td>
                    <td className="px-4 py-2">{row.modified_on ? new Date(row.modified_on).toLocaleDateString() : "-"}</td>
                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <div className="flex justify-center">
                        <div 
                          className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center p-0.5 justify-center cursor-pointer"
                          onClick={() => handleOpenModal(row)}
                        >
                          <img src={GroupData} alt="edit" className="w-[18px] h-[18px]" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                      <button
                        onClick={() => handleToggleStatus(row)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          row.status === 1 ? "bg-[#0A2478]" : "bg-gray-400"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            row.status === 1 ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
        <button className="px-3 py-1 border rounded-md">Previous</button>
        <div className="flex gap-2">
          <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">3</button>
          <button className="px-3 py-1 border rounded-md">...</button>
          <button className="px-3 py-1 border rounded-md">10</button>
        </div>
        <button className="px-3 py-1 border rounded-md">Next</button>
      </div>
    </div>
  );
};

export default ItemProfileList;