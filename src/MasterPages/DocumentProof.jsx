import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";
import GroupData from "../assets/Group 124.svg";
import { decryptData, encryptData } from "../utils/cryptoHelper";
import { formatIndianDate } from "../utils/Helpers";

const DocumentProof = () => {
  useEffect(() => {
    document.title = "SLF | Document Proof";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    proof_type: "",
    is_id_proof: false,
    is_address_proof: false,
    added_by: "",
    modified_by: "",
    status: "Active",
  });
  const [selectedDataid, setselectedDataid] = useState(null);

  console.log(formData,"formData")
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [previewUrl, setPreviewUrl] = useState("");
  // handle input change
  const [documents, setDocuments] = useState([]);
  console.log(documents, "documents")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    setIsEditModalOpen(false)
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
    is_id_proof: doc.is_id_proof === 1,         // convert number → boolean
    is_address_proof: doc.is_address_proof === 1,
    added_by: doc.added_by || "",
    modified_by: doc.modified_by || "",
    status: doc.status === 1 ? "Active" : "Inactive",
  });
  setselectedDataid(doc.id)

  setFileName(doc.file_path?.split("/")?.pop() || "");
  setIsModalOpen(true);
  setIsEditModalOpen(true);
};

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/Master/Master_Profile/get_document`);

      // Decrypt the response safely
      const decryptedRaw = decryptData(response.data.data);
      const decrypted = typeof decryptedRaw === "string" ? JSON.parse(decryptedRaw) : decryptedRaw;

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

  const handleSubmit = async () => {

    try {
      if (!formData.proof_type?.trim()) {
  alert("Please select or enter the Proof Type!");
  return;
}

// ✅ Check that at least one proof type is true
if (!formData.is_id_proof && !formData.is_address_proof) {
  alert("Please select at least one: ID Proof or Address Proof!");
  return;
}

      const encryptedData = encryptData(JSON.stringify(formData));
      const payload = new FormData();
      payload.append("data", encryptedData);
     

      const response = await axios.post(`${API}/Master/Master_Profile/add_Document`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data;
      console.log("✅ API Response:", result);
      alert("Document proof added successfully!");
      setIsModalOpen(false);
      fetchDocuments()
      setFormData({
    proof_type: "",
    is_id_proof: false,
    is_address_proof: false,
    added_by: "",
    modified_by: "",
    status: "Active",
  });
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to add document proof.");
    }
  };

  const handleUpdateSubmit = async () => {
    debugger
  try {
    if (!formData.proof_type) {
      alert("Please fill all required fields!");
      return;
    }

    // add id in object
    const updatePayloadObject = {
      ...formData,
      id: selectedDataid,  // <-- this will come from selected row
    };

    const encryptedData = encryptData(JSON.stringify(updatePayloadObject));

    const payload = new FormData();
    payload.append("data", encryptedData);

   
   
    const response = await axios.post(
      `${API}/Master/Master_Profile/update_document`,
      payload,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const result = response.data;
    console.log("✅ UPDATE RESPONSE:", result);

    alert("Document proof updated successfully!");
    setIsModalOpen(false);
    fetchDocuments();
  } catch (error) {
    console.error("❌ UPDATE Error:", error);
    alert("Failed to update document proof.");
  }
};


  const updateDocumentStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus ? "0" : "1";
      const payload = { id, status: newStatus };
      const encryptedPayload = encryptData(JSON.stringify(payload));

      const response = await axios.post(
        `${API}/Master/Master_Profile/update_document_status`,
        { data: encryptedPayload }
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



  return (
    <div className=" min-h-screen w-full">



      {/* middletopbar */}
      <div className="flex justify-center">
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

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
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
              Add Document Proof
            </h2>

            {/* Form Inputs */}
            <div className="">
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


             

              {/* Checkboxes */}
              <div className="flex justify-center gap-10">

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

            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
             { isEditModalOpen ? (
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
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Type</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Name</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added By</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Added On</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified By</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Modified On</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Action</th>
                <th className="px-4 py-2 text-left border-r border-gray-300 text-[13px]">Active</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {documents.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
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
                  <td className="px-4 py-2">{formatIndianDate(row.added_on)}</td>
                  <td className="px-4 py-2">{row.modified_by || "-"}</td>
                  <td className="px-4 py-2">{formatIndianDate(row.modified_on)}</td>

                  {/* Action icons */}
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-2 justify-center">
                      <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5" onClick={() => handleEditClick(row)}>
                        <img src={GroupData} alt="view" className="w-[18px] h-[18px] " title="Edit" />
                      </div>
                    </div>
                  </td>

                  {/* Toggle */}
                  <td>
                    <button
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${row.status ? "bg-[#0A2478]" : "bg-gray-400"
                        }`}
                      onClick={() => updateDocumentStatus(row.id, row.status)}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${row.status ? "translate-x-6" : "translate-x-0"
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

export default DocumentProof;
