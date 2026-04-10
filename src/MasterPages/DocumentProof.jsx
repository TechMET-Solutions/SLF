import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown } from 'lucide-react';
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { API } from "../api";
import { useAuth } from "../API/Context/AuthContext";
import { decryptData, encryptData } from "../utils/cryptoHelper";
import { formatIndianDate } from "../utils/Helpers";
import { usePermission } from "../API/Context/PermissionContext";
import Loader from "../Component/Loader";

const DocumentProof = () => {
  useEffect(() => {
    document.title = "SLF | Document Proof";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
   
const [loading, setLoading] = useState(false);
  const { permissions, userData } = usePermission();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  console.log("Logged in user:", loginUser);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    proof_type: "",
    is_id_proof: false,
    is_address_proof: false,
    validation_rules: [], 
    status: "Active",

     min_length: "",
  max_length: "",
    format_type: "",
   validation_value: "" // NEW FIELD
  });
  const [selectedDataid, setselectedDataid] = useState(null);

  console.log(formData, "formData");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [previewUrl, setPreviewUrl] = useState("");
  // handle input change
  const [documents, setDocuments] = useState([]);
  console.log(documents, "documents");
  // const [loading, setLoading] = useState(true);
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

  const handleSort = (key) => {
  setSortConfig((prev) => {
    let direction = "asc";

    if (prev.key === key && prev.direction === "asc") {
      direction = "desc";
    }

    return { key, direction };
  });
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
      min_length: doc.min_length,
      max_length: doc.max_length,
      format_type: doc.format_type,
      validation_value: doc.validation_value
      
    });
    setselectedDataid(doc.id);

    setFileName(doc.file_path?.split("/")?.pop() || "");
    setIsModalOpen(true);
    setIsEditModalOpen(true);
  };

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/Master/Master_Profile/get_document`,
        {
          params: {
            type: searchFilters.type,
            name: searchFilters.name,
            sortKey: sortConfig.key,          // ✅ add this
            sortOrder: sortConfig.direction,
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
  }, [sortConfig]);

  const handleSearch = () => {
    console.log("Searching for:", searchFilters);
    fetchDocuments();
    // Add your API call or filtering logic here using searchFilters.type and searchFilters.name
  };
  const options = [
    { value: 'number', label: 'Number Only' },
    { value: 'character', label: 'Character Only' },
    { value: 'alphanumeric', label: 'Both (A-Z + 0-9)' },
  ];

  const toggleOption = (val) => {
    setFormData((prev) => {
      const current = prev.validation_rules;
      const next = current.includes(val)
        ? current.filter((item) => item !== val)
        : [...current, val];
      return { ...prev, validation_rules: next };
    });
  };

  const validateForm = () => {
  const errors = {};

  // ✅ Proof Type
  if (!formData.proof_type?.trim()) {
    errors.proof_type = "Proof Type is required";
  }

  // ✅ Checkbox validation
  if (!formData.is_id_proof && !formData.is_address_proof) {
    errors.proof_selection = "Select at least ID Proof or Address Proof";
  }

  // ✅ Min Length
  if (!formData.min_length) {
    errors.min_length = "Min length is required";
  } else if (isNaN(formData.min_length) || Number(formData.min_length) < 0) {
    errors.min_length = "Min length must be a valid positive number";
  }

  // ✅ Max Length
  if (!formData.max_length) {
    errors.max_length = "Max length is required";
  } else if (isNaN(formData.max_length) || Number(formData.max_length) <= 0) {
    errors.max_length = "Max length must be greater than 0";
  }

  // ✅ Min < Max check
  if (
    formData.min_length &&
    formData.max_length &&
    Number(formData.min_length) > Number(formData.max_length)
  ) {
    errors.max_length = "Max length must be greater than Min length";
  }

  // ✅ Format Type
  if (!formData.format_type?.trim()) {
    errors.format_type = "Format type is required";
  }

  // ✅ Validation Value (based on format type)
  if (!formData.validation_value?.trim()) {
    errors.validation_value = "Validation value is required";
  }

  // ✅ Validation Rules Array (optional but useful)
  if (!formData.validation_rules || formData.validation_rules.length === 0) {
    errors.validation_rules = "At least one validation rule is required";
  }

  return errors;
};
  // const handleSubmit = async () => {
  //   try {
  //     if (!formData.proof_type?.trim()) {
  //       alert("Please select or enter the Proof Type!");
  //       return;
  //     }

  //     if (!formData.is_id_proof && !formData.is_address_proof) {
  //       alert("Please select at least one: ID Proof or Address Proof!");
  //       return;
  //     }
  //      if (!formData.max_length) {
  //   errors.max_length = "Max length is required";
  // } else if (isNaN(formData.max_length) || Number(formData.max_length) <= 0) {
  //   errors.max_length = "Max length must be greater than 0";
  // }

  // // ✅ Min < Max check
  // if (
  //   formData.min_length &&
  //   formData.max_length &&
  //   Number(formData.min_length) > Number(formData.max_length)
  // ) {
  //   errors.max_length = "Max length must be greater than Min length";
  // }

  // // ✅ Format Type
  // if (!formData.format_type?.trim()) {
  //   errors.format_type = "Format type is required";
  // }

  // // ✅ Validation Value (based on format type)
  // if (!formData.validation_value?.trim()) {
  //   errors.validation_value = "Validation value is required";
  // }


  //     const payload = {
  //       ...formData,
  //       proof_type: formData.proof_type.trim(),
  //       added_by: loginUser,
  //       modified_by: "",
  //       status: "Active",
  //     };

  //     const response = await axios.post(
  //       `${API}/Master/Master_Profile/add_Document`,
  //       payload,
  //     );

  //     alert(response.data.message);

  //     setIsModalOpen(false);
  //     fetchDocuments();
  //     resetForm();
  //   } catch (error) {
  //     console.error("❌ Error:", error);

  //     alert(error.response?.data?.message || "Failed to add document proof.");
  //   }
  // };

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
const handleSubmit = async () => {
  try {
    // ✅ Proof Type
    if (!formData.proof_type?.trim()) {
      alert("Please select or enter the Proof Type!");
      return;
    }

    // ✅ Checkbox validation
    if (!formData.is_id_proof && !formData.is_address_proof) {
      alert("Please select at least one: ID Proof or Address Proof!");
      return;
    }

    // ✅ Min Length
    if (!formData.min_length) {
      alert("Min length is required");
      return;
    }
    if (isNaN(formData.min_length) || Number(formData.min_length) < 0) {
      alert("Min length must be a valid positive number");
      return;
    }

    // ✅ Max Length
    if (!formData.max_length) {
      alert("Max length is required");
      return;
    }
    if (isNaN(formData.max_length) || Number(formData.max_length) <= 0) {
      alert("Max length must be greater than 0");
      return;
    }

    // ✅ Min < Max
    if (Number(formData.min_length) > Number(formData.max_length)) {
      alert("Max length must be greater than Min length");
      return;
    }

    // ✅ Format Type
    if (!formData.format_type?.trim()) {
      alert("Format type is required");
      return;
    }

    // ✅ Validation Value
    if (!formData.validation_value?.trim()) {
      alert("Validation value is required");
      return;
    }

    // ✅ Optional: Regex validation
    if (formData.format_type === "regex") {
      try {
        new RegExp(formData.validation_value);
      } catch {
        alert("Invalid regex pattern");
        return;
      }
    }
setLoading(true);
    // ✅ Payload
    const payload = {
      ...formData,
      proof_type: formData.proof_type.trim(),
      added_by: loginUser,
      modified_by: "",
      status: "Active",
    };

    const response = await axios.post(
      `${API}/Master/Master_Profile/add_Document`,
      payload
    );

    alert(response?.data?.message || "Success");

    setIsModalOpen(false);
    fetchDocuments();
    resetForm();
    setLoading(false);

  } catch (error) {
    console.error("❌ Error:", error);
 
    alert(
      error?.response?.data?.message || "Failed to add document proof."
    );
     setLoading(false);
  }
};
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
  // const handleUpdateSubmit = async () => {
  //   try {
  //     if (!formData.proof_type?.trim()) {
  //       alert("Please fill all required fields!");
  //       return;
  //     }

  //     const updateObj = {
  //       ...formData,
  //       id: selectedDataid,
  //       modified_by: loginUser,
  //     };

  //     // ✅ Send normal JSON
  //     const response = await axios.post(
  //       `${API}/Master/Master_Profile/update_document`,
  //       updateObj,
  //     );

  //     console.log("✅ UPDATE RESPONSE:", response.data);

  //     alert(response.data.message);

  //     setIsModalOpen(false);
  //     fetchDocuments();
  //     resetForm();
  //   } catch (error) {
  //     console.error("❌ UPDATE Error:", error);

  //     if (error.response && error.response.data) {
  //       alert(error.response.data.message);
  //     } else {
  //       alert("Failed to update document proof.");
  //     }
  //   }
  // };
const handleUpdateSubmit = async () => {
  try {
    // ✅ Proof Type
    if (!formData.proof_type?.trim()) {
      alert("Please select or enter the Proof Type!");
      return;
    }

    // ✅ Checkbox validation
    if (!formData.is_id_proof && !formData.is_address_proof) {
      alert("Please select at least one: ID Proof or Address Proof!");
      return;
    }

    // ✅ Min Length
    if (!formData.min_length) {
      alert("Min length is required");
      return;
    }
    if (isNaN(formData.min_length) || Number(formData.min_length) < 0) {
      alert("Min length must be a valid positive number");
      return;
    }

    // ✅ Max Length
    if (!formData.max_length) {
      alert("Max length is required");
      return;
    }
    if (isNaN(formData.max_length) || Number(formData.max_length) <= 0) {
      alert("Max length must be greater than 0");
      return;
    }

    // ✅ Min < Max
    if (Number(formData.min_length) > Number(formData.max_length)) {
      alert("Max length must be greater than Min length");
      return;
    }

    // ✅ Format Type
    if (!formData.format_type?.trim()) {
      alert("Format type is required");
      return;
    }

    // ✅ Validation Value
    if (!formData.validation_value?.trim()) {
      alert("Validation value is required");
      return;
    }

    // ✅ Optional: Regex validation
    if (formData.format_type === "regex") {
      try {
        new RegExp(formData.validation_value);
      } catch {
        alert("Invalid regex pattern");
        return;
      }
    }
setLoading(true);
    // ✅ Prepare update object
    const updateObj = {
      ...formData,
      proof_type: formData.proof_type.trim(),
      id: selectedDataid,
      modified_by: loginUser,
    };

    // ✅ API call
    const response = await axios.post(
      `${API}/Master/Master_Profile/update_document`,
      updateObj
    );

    console.log("✅ UPDATE RESPONSE:", response.data);

    alert(response?.data?.message || "Updated successfully");

    setIsModalOpen(false);
    fetchDocuments();
    resetForm();
setLoading(false);
  } catch (error) {
    console.error("❌ UPDATE Error:", error);

    alert(
      error?.response?.data?.message ||
      "Failed to update document proof."
    );
    setLoading(false);
  }
};
  const updateDocumentStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (err) {
      console.error("Failed to update status:", err);
      // Only alert if it's really a network/server error
      if (!err.response) {
        alert("Failed to update status");
      }
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?",
      );

      if (!confirmDelete) return;

      const response = await axios.delete(
        `${API}/Master/delete_document/${id}`,
      );

      alert(response.data.message);

      fetchDocuments(); // refresh table
      setLoading(false);
    } catch (error) {
      console.error("❌ Delete Error:", error);

      alert(error.response?.data?.message || "Failed to delete document.");
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen w-full">
      <div className="z-40 bg-white w-full px-[25px]">
        <div
          className="flex items-center px-6 py-4 border-b 
    w-full max-w-[1462px] lg:h-[40px] 
    border  border-gray-200 justify-between"
        >
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
            <div className="hidden lg:flex items-center bg-white h-[32px] px-1 relative w-[500px]">
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

              <div className="flex ml-2 gap-2">
                <button
                  onClick={handleSearch}
                  className="bg-[#0b2c69] text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                  style={{ width: "70px", height: "27.49px" }}
                >
                  Search
                </button>
                <button
                  onClick={() => {
                    setSearchFilters({
                      type: "",
                      name: "",
                    });

                    fetchDocuments(); // reload all data
                  }}
                  className="bg-[#0A2478]  text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                  style={{ width: "60px", height: "27.49px" }}
                >
                  Clear
                </button>
              </div>
            </div>
            {/* Action Buttons Container */}
            <div className="flex items-center gap-2 ml-2 border-l pl-4 border-gray-200">
              {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Document Proof"
)?.add) && (
   <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] rounded cursor-pointer hover:bg-[#071d45] transition-colors"
                style={{ width: "60px", height: "27.49px" }}
              >
                Add
              </button>
)}
             

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
            {/* Validation Fields */}
<div className="flex justify-center gap-5 mt-4">

  {/* Min Length */}
  <div>
    <label className="text-[14px]">
      Min Length <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      name="min_length"
      value={formData.min_length}
      onChange={handleChange}
      placeholder="Min"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[120px]"
    />
  </div>

  {/* Max Length */}
  <div>
    <label className="text-[14px]">
      Max Length <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      name="max_length"
      value={formData.max_length}
      onChange={handleChange}
      placeholder="Max"
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[120px]"
    />
  </div>

  {/* Format Type */}
  <div>
    <label className="text-[14px]">
      Format Type <span className="text-red-500">*</span>
    </label>

    <div className="flex gap-3 mt-2">
      <label className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          name="format_type"
          value="A"
          checked={formData.format_type === "A"}
          onChange={handleChange}
        />
        A
      </label>

      <label className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          name="format_type"
          value="1"
          checked={formData.format_type === "1"}
          onChange={handleChange}
        />
        1
      </label>

      <label className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          name="format_type"
          value="A-1"
          checked={formData.format_type === "A-1"}
          onChange={handleChange}
        />
        A-1
      </label>
    </div>
  </div>

            </div>
            {formData.format_type && (
  <div className="mt-2 flex gap-2 items-center">
    <label className="text-[14px]">
      {formData.format_type === "A" && "Enter Only Characters"}
      {formData.format_type === "1" && "Enter Only Numbers"}
      {formData.format_type === "A-1" && "Enter Alphanumeric Value"}
    </label>

    <input
      type="text"
      name="validation_value"
      value={formData.validation_value || ""}
      onChange={handleChange}
      placeholder={
        formData.format_type === "A"
          ? "Example: ABCDEF"
          : formData.format_type === "1"
          ? "Example: 123456"
          : "Example: ABC123"
      }
      className="border border-gray-300 rounded px-3 py-2 mt-1 w-[250px]"
    />
  </div>
)}
{/* <div className="w-full max-w-sm mt-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Validation Rules <span className="text-red-500">*</span>
      </label>
      
      <div className="relative">
       
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="min-h-[42px] w-[320px] flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 bg-white cursor-pointer hover:border-blue-400 transition-colors focus-within:ring-2 focus-within:ring-blue-100"
        >
          {formData?.validation_rules.length === 0 && (
            <span className="text-gray-400 text-sm">Select rules...</span>
          )}
          
          {formData.validation_rules.map((rule) => (
            <span 
              key={rule} 
              className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md border border-blue-100"
            >
              {options.find(o => o.value === rule)?.label}
              <button 
                onClick={(e) => { e.stopPropagation(); toggleOption(rule); }}
                className="hover:text-blue-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          
          <div className="ml-auto text-gray-400">
            <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

      
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                  formData.validation_rules.includes(option.value) ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                {option.label}
                {formData.validation_rules.includes(option.value) && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div> */}
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
      <div className="flex ml-[25px]">
        <div className="overflow-x-auto  w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[200px]">
                  Type
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[150px] flex justify-between"  onClick={() => handleSort("proof_type")}>
                  Name
                  {sortConfig.key !== "proof_type" && (
                      <FaSort className="text-gray-400 text-xs" />
                    )}
                    {sortConfig.key === "proof_type" &&
                      sortConfig.direction === "asc" && (
                        <FaSortUp className="text-blue-600 text-xs" />
                      )}
                    {sortConfig.key === "proof_type" &&
                      sortConfig.direction === "desc" && (
                        <FaSortDown className="text-blue-600 text-xs" />
                      )}
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[150px]">
                  Added By
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[100px]">
                  Added On
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[150px]">
                  Modified By
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px]  w-[100px]">
                  Modified On
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">
                  Action
                </th>
                <th className="px-1 py-1 text-left border-r border-gray-300 text-[13px] w-[80px]">
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
                  <td className="px-1 py-1">
                    {row.is_id_proof && row.is_address_proof
                      ? "ID Proof, Address Proof"
                      : row.is_id_proof
                        ? "ID Proof"
                        : row.is_address_proof
                          ? "Address Proof"
                          : "-"}
                  </td>

                  <td className="px-1 py-1">{row.proof_type}</td>
                  <td className="px-1 py-1">{row.added_by}</td>
                  <td className="px-1 py-1">
                    {formatIndianDate(row.added_on)}
                  </td>
                  <td className="px-1 py-1">{row.modified_by || "-"}</td>
                  <td className="px-1 py-1">
                    {formatIndianDate(row.modified_on)}
                  </td>

                  <td className="px-1 py-1 text-[#1883EF]">
                    <div className="flex gap-2 ">
                      {/* Edit */}
                      {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Document Proof"
)?.edit) && (
   <div
                        className="bg-[#3dbd5a] cursor-pointer p-1.5 text-white rounded-sm"
                        onClick={() => handleEditClick(row)}
                        title="Edit"
                      >
                        <FiEdit className="text-white text-[11px]" />
                      </div>

)}
                      {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Document Proof"
)?.delete) && (
   <div
                        className="bg-[#f51111ec] cursor-pointer p-1.5 text-white rounded-sm"
                        onClick={() => handleDelete(row.id)}
                        title="Delete"
                      >
                        <FiTrash2 className="text-white text-[11px]" />
                      </div>

)}
                      {/* Delete */}
                     
                    </div>
                  </td>

                  {/* Toggle */}
                  <td className="flex  items-center">
                    {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Document Proof"
)?.status) && (
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

)}
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
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
      </div> */}

      {loading && <Loader />}
    </div>
  );
};

export default DocumentProof;
