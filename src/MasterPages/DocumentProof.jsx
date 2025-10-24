import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";
import GroupData from "../assets/Group 124.svg";
import { decryptData, encryptData } from "../utils/cryptoHelper";

const DocumentProof = () => {
  useEffect(() => {
    document.title = "SLF | Document Proof";
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    {
      type: "Purity",
      name: "24K Gold",
      addedBy: "John Doe",
      addedOn: "2025-09-20",
      modifiedBy: "Jane Smith",
      modifiedOn: "2025-09-21",
      view: true,
      edit: true,
      active: true,
    },
    {
      type: "Purity",
      name: "22K Gold",
      addedBy: "Alice Johnson",
      addedOn: "2025-09-18",
      modifiedBy: "Bob Williams",
      modifiedOn: "2025-09-19",
      view: true,
      edit: false,
      active: false,
    },
    {
      type: "Product",
      name: "Gold Ring",
      addedBy: "Chris Evans",
      addedOn: "2025-09-15",
      modifiedBy: "Tom Hardy",
      modifiedOn: "2025-09-16",
      view: false,
      edit: true,
      active: true,
    },
  ]);
  const [formData, setFormData] = useState({
    proof_type: "",
    proof_number: "",
    is_id_proof: false,
    is_address_proof: false,
    added_by: "",
    modified_by: "",
    status: "Active",
  });

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
      if (!formData.proof_type || !formData.proof_number || !file) {
        alert("Please fill all required fields!");
        return;
      }

      const encryptedData = encryptData(JSON.stringify(formData));
      const payload = new FormData();
      payload.append("data", encryptedData);
      payload.append("file", file);

      const response = await axios.post(`${API}/Master/Master_Profile/add_Document`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = response.data;
      console.log("✅ API Response:", result);
      alert("Document proof added successfully!");
      setIsModalOpen(false);
      fetchDocuments()
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to add document proof.");
    }
  };

  const updateDocumentStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus ? "0" : "1";
      const payload = { id, status: newStatus };
      const encryptedPayload = encryptData(JSON.stringify(payload));

      const response = await axios.post(
        "http://localhost:5000/Master/Master_Profile/update_document_status",
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

      {/* modelforAdd */}
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
                <select
                  name="proof_type"
                  value={formData.proof_type}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                >
                  <option value="">Select proof type</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Driving License">Driving License</option>
                </select>
              </div>

              {/* Proof Number */}


              {/* Added By */}
              {/* <div>
          <label className="text-[14px]">
            Added By <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="added_by"
            placeholder="Enter name"
            value={formData.added_by}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
          />
        </div> */}



              {/* File Upload */}
              <div className="flex justify-between gap-10 mt-5">

                <div className="col-span-2">
                  <label className="text-[14px]">
                    Upload Document <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded mt-1 w-full">
                    <label
                      htmlFor="uploadFile"
                      className="bg-[#D9D9D9] px-4 py-2 cursor-pointer text-[10px] rounded-l border-r border-gray-300 w-[150px]"
                    >
                      Choose File
                    </label>
                    <input
                      id="uploadFile"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
                      {fileName || "No file chosen"}
                    </span>
                  </div>



                </div>
                <div>
                  <label className="text-[14px]">
                    Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="proof_number"
                    placeholder="Enter number"
                    value={formData.proof_number}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2  w-full"
                  />
                </div>
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
              <button
                className="bg-[#0A2478] text-white px-6 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-[#C1121F] text-white px-6 py-2 rounded"
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
                  <td className="px-4 py-2">{new Date(row.added_on).toLocaleString()}</td>
                  <td className="px-4 py-2">{row.modified_by || "-"}</td>
                  <td className="px-4 py-2">{new Date(row.modified_on).toLocaleString()}</td>

                  {/* Action icons */}
                  <td className="px-4 py-2 text-[#1883EF] cursor-pointer">
                    <div className="flex gap-2 justify-center">
                      <div className="w-[17px] h-[17px] bg-[#56A869] rounded-[2.31px] flex items-center justify-center p-0.5">
                        <img src={GroupData} alt="view" className="w-[18px] h-[18px]" />
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
