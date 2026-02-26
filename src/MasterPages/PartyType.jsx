import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api";

const BASEURL = `${API}/api/party-types`;

function PartyType() {
    const navigate = useNavigate();

    const [partyTypes, setPartyTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [partyName, setPartyName] = useState("");
    const [status, setStatus] = useState(1);

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

        } catch (error) {
            console.error(error);
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

            setModalOpen(false);
            fetchPartyTypes();
        } catch (error) {
            alert(error.response?.data?.message || "Error occurred");
        }
    };

    // ===============================
    // Toggle Status
    // ===============================
    const handleToggleStatus = async (id) => {
        try {
            await axios.patch(`${BASEURL}/toggle-status/${id}`);
            fetchPartyTypes();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center">
            {/* Top Bar */}
            <div className="sticky top-[80px] z-40 w-[1290px] mt-5">
                <div className="flex items-center justify-between px-6 py-4 h-[62px] rounded-[11px] border border-gray-200 bg-white shadow-sm">

                    {/* Title */}
                    <h2 className="text-red-600 text-[20px] font-bold">
                        Party Type
                    </h2>

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleAdd}
                            className="bg-[#0A2478] text-white text-[12px] rounded hover:bg-[#071d45] transition-colors px-4 py-1"
                        >
                            Add
                        </button>

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
            <div className="w-[600px] mx-30 flex items-start mt-6 bg-white self-start">
                <table className="w-full ">
                    <thead className="bg-[#0A2478] text-white ">
                        <tr>
                            <th className="p-3 border-r-2 border-white text-left w-[80px]">Sr No</th>
                            <th className="p-3 border-r-2 border-white text-left w-[300px]">Party Type</th>
                            <th className="p-3 border-r-2 border-white text-center w-[100px]">Action</th>
                            <th className="p-3 border-r-2 border-white text-center w-[100px]">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
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
                                <tr key={party.id} className="border-t">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{party.party_type}</td>

                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleEdit(party)}
                                            className="bg-green-500 p-1.5 text-white rounded"
                                        >
                                            <FiEdit size={14} />
                                        </button>
                                    </td>

                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleToggleStatus(party.id)}
                                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${party.status === 1
                                                ? "bg-[#0A2478]"
                                                : "bg-gray-400"
                                                }`}
                                        >
                                            <div
                                                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${party.status === 1
                                                    ? "translate-x-6"
                                                    : "translate-x-0"
                                                    }`}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================= Modal ================= */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
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

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-1 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-4 py-1 bg-[#0A2478] text-white rounded"
                            >
                                {editId ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PartyType;