import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import GroupData from "../assets/Group 124.svg";
import { decryptData, encryptData } from "../utils/cryptoHelper";
import { formatIndianDate } from "../utils/Helpers";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const DocumentProof = () => {
  useEffect(() => {
    document.title = "SLF | Document Proof";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  console.log("Logged in user:", loginUser);
  const [formData, setFormData] = useState({
    proof_type: "",
    is_id_proof: false,
    is_address_proof: false,
    // added_by: loginUser,
    // modified_by: loginUser,
    status: "Active",
  });
  const [selectedDataid, setselectedDataid] = useState(null);

  console.log(formData, "formData");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [previewUrl, setPreviewUrl] = useState("");
  // handle input change
  const [documents, setDocuments] = useState([]);
  console.log(documents, "documents");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const [searchFilters, setSearchFilters] = useState({
    type: "",
    name: "",
  });

  // 2. Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Define the missing handleKeyPress function
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 4. Search Logic

  const handleClearSearch = () => {
    setSearchFilters({ type: "", name: "" });
  };
  const resetModal = () => {
    setFormData({
      proof_type: "",
      is_id_proof: false,
      is_address_proof: false,
      added_by: "",
      modified_by: "",
      status: "Active",
    });

    setFileName("");
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  // handle file select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // ✅ show the selected file name
    } else {
      setFile(null);
      setFileName("No file chosen");
    }
  };
  const handleEditClick = (doc) => {
    setFormData({
      proof_type: doc.proof_type || "",
      is_id_proof: doc.is_id_proof === 1, // convert number → boolean
      is_address_proof: doc.is_address_proof === 1,
      added_by: doc.added_by || "",
      modified_by: doc.modified_by || "",
      status: doc.status === 1 ? "Active" : "Inactive",
    });
    setselectedDataid(doc.id);

    setFileName(doc.file_path?.split("/")?.pop() || "");
    setIsModalOpen(true);
    setIsEditModalOpen(true);
  };

  // const fetchDocuments = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `${API}/Master/Master_Profile/get_document`,
  //     );

  //     // Decrypt the response safely
  //     const decryptedRaw = decryptData(response.data.data);
  //     const decrypted =
  //       typeof decryptedRaw === "string"
  //         ? JSON.parse(decryptedRaw)
  //         : decryptedRaw;

  //     setDocuments(decrypted);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error("Error fetching documents:", err);
  //     setError("Failed to fetch documents");
  //     setLoading(false);
  //   }
  // };

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/Master/Master_Profile/get_document`,
        {
          params: {
            type: searchFilters.type,
            name: searchFilters.name,
          },
        },
      );

      const decryptedRaw = decryptData(response.data.data);
      const decrypted =
        typeof decryptedRaw === "string"
          ? JSON.parse(decryptedRaw)
          : decryptedRaw;

      setDocuments(decrypted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to fetch documents");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchFilters);
    fetchDocuments();
    // Add your API call or filtering logic here using searchFilters.type and searchFilters.name
  };

  //   const handleSubmit = async () => {

  //     try {
  //       if (!formData.proof_type?.trim()) {
  //   alert("Please select or enter the Proof Type!");
  //   return;
  // }

  // // ✅ Check that at least one proof type is true
  // if (!formData.is_id_proof && !formData.is_address_proof) {
  //   alert("Please select at least one: ID Proof or Address Proof!");
  //   return;
  // }

  //       const encryptedData = encryptData(JSON.stringify(formData));
  //       const payload = new FormData();
  //       payload.append("data", encryptedData);

  //       const response = await axios.post(`${API}/Master/Master_Profile/add_Document`, payload, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });

  //       const result = response.data;
  //       console.log("✅ API Response:", result);
  //       alert("Document proof added successfully!");
  //       setIsModalOpen(false);
  //       fetchDocuments()
  //       setFormData({
  //     proof_type: "",
  //     is_id_proof: false,
  //     is_address_proof: false,
  //     added_by: "",
  //     modified_by: "",
  //     status: "Active",
  //   });
  //     } catch (error) {
  //       console.error("❌ Error:", error);
  //       alert("Failed to add document proof.");
  //     }
  //   };
  // const resetForm = () => {
  //   setFormData({
  //     proof_type: "",
  //     is_id_proof: false,
  //     is_address_proof: false,
  //     status: "Active",
  //   });
  // };

  const handleSubmit = async () => {
    try {
      if (!formData.proof_type?.trim()) {
        alert("Please select or enter the Proof Type!");
        return;
      }

      if (!formData.is_id_proof && !formData.is_address_proof) {
        alert("Please select at least one: ID Proof or Address Proof!");
        return;
      }

      const payload = {
        ...formData,
        proof_type: formData.proof_type.trim(),
        added_by: loginUser,
        modified_by: "",
        status: "Active",
      };

      const response = await axios.post(
        `${API}/Master/Master_Profile/add_Document`,
        payload,
      );

      alert(response.data.message);

      setIsModalOpen(false);
      fetchDocuments();
      resetForm();
    } catch (error) {
      console.error("❌ Error:", error);

      alert(error.response?.data?.message || "Failed to add document proof.");
    }
  };

  //   const handleUpdateSubmit = async () => {
  //     debugger
  //   try {
  //     if (!formData.proof_type) {
  //       alert("Please fill all required fields!");
  //       return;
  //     }

  //     // add id in object
  //     const updatePayloadObject = {
  //       ...formData,
  //       id: selectedDataid,  // <-- this will come from selected row
  //     };

  //     const encryptedData = encryptData(JSON.stringify(updatePayloadObject));

  //     const payload = new FormData();
  //     payload.append("data", encryptedData);

  //     const response = await axios.post(
  //       `${API}/Master/Master_Profile/update_document`,
  //       payload,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     const result = response.data;
  //     console.log("✅ UPDATE RESPONSE:", result);

  //     alert("Document proof updated successfully!");
  //     setIsModalOpen(false);
  //     fetchDocuments();
  //   } catch (error) {
  //     console.error("❌ UPDATE Error:", error);
  //     alert("Failed to update document proof.");
  //   }
  // };

  const resetForm = () => {
    setFormData({
      proof_type: "",
      status: "",
      // jo jo fields hain formData me sab yahan empty kar do
    });
  };

//   const handleUpdateSubmit = async () => {
//     debugger;
//     try {
//       if (!formData.proof_type?.trim()) {
//         alert("Please fill all required fields!");
//         return;
//       }

//       const updateObj = {
//         ...formData,
//         id: selectedDataid,
//         modified_by: loginUser,
//       };

//       const encryptedData = encryptData(JSON.stringify(updateObj));
//       const payload = new FormData();
//       payload.append("data", encryptedData);

//       const response = await axios.post(
//         `${API}/Master/Master_Profile/update_document`,
//         payload,
//       );

//       // ✅ Decrypt success response
//       const decryptedResponse = JSON.parse(decryptData(response.data.data));
// console.log("✅ UPDATE RESPONSE:", decryptedResponse);
//       alert(decryptedResponse.message);

//       setIsModalOpen(false);
//       fetchDocuments();
//       resetForm();
//     } catch (error) {
//       console.error("❌ UPDATE Error:", error);

//       // ✅ Handle backend validation message properly
//       if (error.response && error.response.data) {
//         alert(error.response.data.message);
//       } else {
//         alert("Failed to update document proof.");
//       }
//     }
//   };
const handleUpdateSubmit = async () => {
  try {
    if (!formData.proof_type?.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    const updateObj = {
      ...formData,
      id: selectedDataid,
      modified_by: loginUser,
    };

    // ✅ Send normal JSON
    const response = await axios.post(
      `${API}/Master/Master_Profile/update_document`,
      updateObj
    );

    console.log("✅ UPDATE RESPONSE:", response.data);

    alert(response.data.message);

    setIsModalOpen(false);
    fetchDocuments();
    resetForm();

  } catch (error) {
    console.error("❌ UPDATE Error:", error);

    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("Failed to update document proof.");
    }
  }
};

  const updateDocumentStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus ? "0" : "1";
      const payload = { id, status: newStatus };
      const encryptedPayload = encryptData(JSON.stringify(payload));

      const response = await axios.post(
        `${API}/Master/Master_Profile/update_document_status`,
        { data: encryptedPayload },
      );

      // Safely handle response
      let decryptedResponse;
      try {
        decryptedResponse =
          typeof response.data.data === "string"
            ? JSON.parse(decryptData(response.data.data))
            : response.data.data;
      } catch (parseError) {
        // If parsing fails, fallback to raw response
        decryptedResponse = response.data;
      }

      console.log("Status updated:", decryptedResponse);

      // Refresh documents
      await fetchDocuments();
    } catch (err) {
      console.error("Failed to update status:", err);
      // Only alert if it's really a network/server error
      if (!err.response) {
        alert("Failed to update status");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?",
      );

      if (!confirmDelete) return;

      const response = await axios.delete(
        `${API}/Master/delete_document/${id}`,
      );

      alert(response.data.message);

      fetchDocuments(); // refresh table
    } catch (error) {
      console.error("❌ Delete Error:", error);

      alert(error.response?.data?.message || "Failed to delete document.");
    }
  };

  return (
    <div className=" min-h-screen w-full">
      {/* middletopbar */}
      {/* <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700, // Bold
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
            Document Proof List
          </h2>

          <div className="flex gap-3 ">
            <div className="flex justify-between gap-5">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",

                  gap: "6.25px",
                }}
                onClick={() => setIsModalOpen(true)}
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
      </div> */}
      <div className="flex justify-center sticky top-[80px] z-40">
        {/* Changed justify-around to justify-between to push content to the edges */}
        <div className="flex items-center px-6 py-4 border mt-5 w-[1290px] h-[62px] rounded-[11px] border-gray-200 justify-between bg-white shadow-sm">
          {/* LEFT SIDE: Name */}
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
            }}
            className="text-red-600 whitespace-nowrap"
          >
            Document Proof List
          </h2>

          {/* RIGHT SIDE: All Inputs and Buttons Grouped */}
          <div className="flex items-center gap-4">
            {/* Search Input Fields */}
            <div className="flex items-center gap-3">
              {/* Type Input */}
              <div className="flex items-center gap-2">
                <p className="text-[11.25px] font-semibold whitespace-nowrap">
                  Type
                </p>
                <select
                  name="type"
                  value={searchFilters.type}
                  onChange={handleInputChange}
                  className="border border-gray-400 px-2 text-[11.25px] rounded outline-none focus:border-[#0A2478] bg-white"
                  style={{ width: "140px", height: "27.49px" }}
                >
                  <option value="">Select</option>
                  <option value="Address Proof">Address Proof</option>
                  <option value="ID Proof">ID Proof</option>
                </select>
              </div>

              {/* Name Input */}
              <div className="flex items-center gap-2">
                <p className="text-[11.25px] font-semibold whitespace-nowrap">
                  Name
                </p>
                <input
                  type="text"
                  name="name" // Matches the state key
                  value={searchFilters.name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="border border-gray-400 px-3 py-1 text-[11.25px] rounded outline-none focus:border-[#0A2478]"
                  style={{ width: "120px", height: "27.49px" }}
                />
              </div>
            </div>

            {/* Action Buttons Container */}
            <div className="flex items-center gap-2 ml-2 border-l pl-4 border-gray-200">
              <button
                onClick={handleSearch}
                className="bg-[#0b2c69] text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                style={{ width: "70px", height: "27.49px" }}
              >
                Search
              </button>

              {/* <button
                onClick={handleClearSearch}
                className="bg-[#6c757d] text-white text-[11.25px] rounded cursor-pointer hover:bg-gray-700 transition-colors"
                style={{ width: "70px", height: "27.49px" }}
              >
                Clear
              </button> */}
              <button
                onClick={() => {
                  setSearchFilters({
                    type: "",
                    name: "",
                  });

                  fetchDocuments(); // reload all data
                }}
                className="bg-[#0A2478] text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                style={{ width: "60px", height: "27.49px" }}
              >
                Clear
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                style={{ width: "60px", height: "27.49px" }}
              >
                Add
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-[#C1121F] text-white text-[10px] rounded cursor-pointer hover:bg-[#a40f1a] transition-colors"
                style={{ width: "60px", height: "27.49px" }}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[600px] rounded-lg shadow-lg p-6">
            <h2
              className="text-[#0A2478] mb-6"
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              {isEditModalOpen ? "Edit Document Proof" : "Add Document Proof"}
            </h2>

            {/* Form Inputs */}
            <div className=" flex justify-center gap-5">
              {/* Proof Type Dropdown */}
              <div>
                <label className="text-[14px]">
                  Proof Type Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="proof_type"
                  value={formData.proof_type}
                  onChange={handleChange}
                  placeholder="Enter Proof Type Name"
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                />
              </div>

              <div className="flex items-center space-x-2 mt-10">
                <input
                  type="checkbox"
                  id="idProof"
                  name="is_id_proof"
                  checked={formData.is_id_proof}
                  onChange={handleChange}
                  className="w-[24px] h-[24px]"
                />
                <label htmlFor="idProof" className="text-[14px]">
                  ID Proof
                </label>
              </div>
              <div className="flex items-center space-x-2 mt-10">
                <input
                  type="checkbox"
                  id="addressProof"
                  name="is_address_proof"
                  checked={formData.is_address_proof}
                  onChange={handleChange}
                  className="w-[24px] h-[24px]"
                />
                <label htmlFor="addressProof" className="text-[14px]">
                  Address Proof
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              {isEditModalOpen ? (
                <button
                  className="bg-[#0A2478] text-white px-6 py-2 rounded"
                  onClick={handleUpdateSubmit}
                >
                  Update
                </button>
              ) : (
                <button
                  className="bg-[#0A2478] text-white px-6 py-2 rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
              <button
                className="bg-[#C1121F] text-white px-6 py-2 rounded"
                onClick={resetModal}
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
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[200px]">
                  Type
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[150px]">
                  Name
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[150px]">
                  Added By
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[100px]">
                  Added On
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[150px]">
                  Modified By
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]  w-[100px]">
                  Modified On
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[80px]">
                  Action
                </th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px] w-[80px]">
                  Active
                </th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {documents.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2">
                    {row.is_id_proof && row.is_address_proof
                      ? "ID Proof, Address Proof"
                      : row.is_id_proof
                        ? "ID Proof"
                        : row.is_address_proof
                          ? "Address Proof"
                          : "-"}
                  </td>

                  <td className="px-4 py-2">{row.proof_type}</td>
                  <td className="px-4 py-2">{row.added_by}</td>
                  <td className="px-4 py-2">
                    {formatIndianDate(row.added_on)}
                  </td>
                  <td className="px-4 py-2">{row.modified_by || "-"}</td>
                  <td className="px-4 py-2">
                    {formatIndianDate(row.modified_on)}
                  </td>

                  
                  <td className="px-4 py-2 text-[#1883EF]">
                    <div className="flex gap-2 justify-center">
                      {/* Edit */}
                      <div
                        className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                        onClick={() => handleEditClick(row)}
                        title="Edit"
                      >
                       <FiEdit className="text-white text-[11px]" />
                      </div>

                      {/* Delete */}
                      <div
                        className="bg-[#f51111ec] cursor-pointer p-1.5 text-white rounded-sm"
                        onClick={() => handleDelete(row.id)}
                        title="Delete"
                      >
                        <FiTrash2 className="text-white text-[11px]" />
                      </div>
                    </div>
                  </td>

                  {/* Toggle */}
                  <td className="flex justify-center items-center">
                    <button
                      className={`w-12 h-6 flex  rounded-full p-1 transition-colors mt-2 ${
                        row.status ? "bg-[#0A2478]" : "bg-gray-400"
                      }`}
                      onClick={() => updateDocumentStatus(row.id, row.status)}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          row.status ? "translate-x-6" : "translate-x-0"
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

      {/* Pagination */}
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
        <button className="px-3 py-1 border rounded-md">Previous</button>
        <div className="flex gap-2">
          <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">
            1
          </button>
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

export default DocumentProof;
