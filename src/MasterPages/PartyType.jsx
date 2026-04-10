import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { usePermission } from "../API/Context/PermissionContext";
import Loader from "../Component/Loader";

const BASEURL = `${API}/api/party-types`;

function PartyType() {
  const navigate = useNavigate();

  const [partyTypes, setPartyTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [partyName, setPartyName] = useState("");
  const [status, setStatus] = useState(1);
const { permissions, userData } = usePermission();
  // ===============================
  // Fetch All Party Types
  // ===============================
  const fetchPartyTypes = async () => {
    try {
     setLoading(true);

      const res = await axios.get(`${BASEURL}/list`);

      console.log(res.data.data);

      // ✅ Only actual array set karo
      setPartyTypes(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartyTypes();
  }, []);

  // ===============================
  // Open Add Modal
  // ===============================
  const handleAdd = () => {
    setEditId(null);
    setPartyName("");
    setStatus(1);
    setModalOpen(true);
  };

  // ===============================
  // Open Edit Modal
  // ===============================
  const handleEdit = (party) => {
    setEditId(party.id);
    setPartyName(party.party_type);
    setStatus(party.status);
    setModalOpen(true);
  };

  // ===============================
  // Save (Create / Update)
  // ===============================
  const handleSave = async () => {
     setModalOpen(true);
    try {
     
      if (!partyName.trim()) {
        alert("Party Type is required");
        return;
      }

      if (editId) {
        await axios.put(`${BASEURL}/update/${editId}`, {
          party_type: partyName,
          status,
        });
      } else {
        await axios.post(`${BASEURL}/create`, {
          party_type: partyName,
          status,
        });
      }

     
      fetchPartyTypes();
      setLoading(false);
       setModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error occurred");
      setLoading(false);
    }
  };

  // ===============================
  // Toggle Status
  // ===============================
  const handleToggleStatus = async (id) => {
     setLoading(true);
    try {
      await axios.patch(`${BASEURL}/toggle-status/${id}`);
      fetchPartyTypes();
       setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-[Source_Sans_3]">
      {/* Top Bar */}
      <div className="flex sticky top-[50px] z-40 w-full ml-[25px]">
        {/* <div className="z-40 bg-white w-full"> */}
        <div className="flex items-center px-6 py-4 border-b w-full max-w-[1462px] h-[40px] border  border-gray-200 justify-between">
          {/* Title */}
          <h2 className="text-red-600 font-bold text-[20px] whitespace-nowrap">
            Party Type
          </h2>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            
{(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Party Type"
)?.add) && (
   <button
              onClick={handleAdd}
              className="bg-[#0A2478] text-white text-[12px] rounded hover:bg-[#071d45] transition-colors px-4 py-1"
            >
              Add
            </button>
)}
           

            <button
              onClick={() => navigate("/")}
              className="bg-[#C1121F] text-white text-[12px] rounded hover:bg-[#a40f1a] transition-colors px-4 py-1"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-[400px] flex items-start  bg-white self-start ml-[25px] text-sm">
        <table className="w-full">
          <thead className="bg-[#0A2478] text-white">
            <tr>
              <th className="p-1 border-r-2 border-white text-left w-[80px]">
                Sr No
              </th>
              <th className="p-1 border-r-2 border-white text-left w-[150px]">
                Party Type
              </th>
              <th className="p-1 border-r-2 border-white text-left w-[80px]">
                Action
              </th>
              <th className="p-1 border-r-2 border-white text-left w-[80px]">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-left p-4">
                  Loading...
                </td>
              </tr>
            ) : partyTypes.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No Data Found
                </td>
              </tr>
            ) : (
              partyTypes.map((party, index) => (
                <tr
                  key={party.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-1">{index + 1}</td>
                  <td className="p-1">{party.party_type}</td>

                  <td className="p-1 text-left">
                    {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Party Type"
)?.edit) && (
    <button
                      onClick={() => handleEdit(party)}
                      className="bg-green-500 p-1 text-white rounded"
                    >
                      <FiEdit size={14} />
                    </button>
)}
                   
                  </td>

                  <td className="p-1 text-left">
                    {(userData?.isAdmin||permissions?.Master?.find(
  item => item.name === "Party Type"
)?.status) && (
    <button
                      onClick={() => handleToggleStatus(party.id)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        party.status === 1 ? "bg-[#0A2478]" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                          party.status === 1 ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
)}
                   
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Modal ================= */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Party Type" : "Add Party Type"}
            </h3>

            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="Enter Party Type"
              className="w-full border p-2 rounded mb-4"
            />

                      <div className="flex justify-center gap-3">
                           <button
                onClick={handleSave}
                className="px-4 py-1 bg-[#0A2478] text-white rounded"
              >
                {editId ? "Update" : "Save"}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1 bg-[#C1121F] text-white rounded"
              >
                Cancel
              </button>

             
            </div>
          </div>
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
}

export default PartyType;
