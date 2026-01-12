import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import { API } from "../api";

const API_URL = `${API}/grace-period`;

function GracePeriod() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loanType, setLoanType] = useState("");
    const [numValue, setNumValue] = useState("");
    const [graceDays, setGraceDays] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    /** ────────────────────────────────────────────────
     *   FETCH RECORDS FROM API
     * ──────────────────────────────────────────────── */
    const fetchRecords = async () => {
        try {
            const res = await axios.get(`${API_URL}/get`);
            setRecords(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    /** ────────────────────────────────────────────────
     *   CREATE RECORD
     * ──────────────────────────────────────────────── */
    const handleSave = async () => {
        if (!loanType || !numValue || !graceDays) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.post(`${API_URL}/create`, {
                loan_type: loanType,
                num_value: numValue,
                grace_days: graceDays,
            });

            fetchRecords();
            resetForm();
            setIsModalOpen(false);

        } catch (error) {
            console.error("Error creating record:", error);
        }
    };

    /** ────────────────────────────────────────────────
     *   OPEN EDIT MODAL WITH ROW VALUE
     * ──────────────────────────────────────────────── */
    const handleEdit = (row) => {
        setEditMode(true);
        setEditId(row.id);
        setLoanType(row.loan_type);
        setNumValue(row.num_value);
        setGraceDays(row.grace_days);

        setIsModalOpen(true);
    };

    /** ────────────────────────────────────────────────
     *   UPDATE RECORD
     * ──────────────────────────────────────────────── */
    const handleUpdate = async () => {
        if (!loanType || !numValue || !graceDays) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.put(`${API_URL}/update/${editId}`, {
                loan_type: loanType,
                num_value: numValue,
                grace_days: graceDays,
            });

            fetchRecords();
            resetForm();
            setIsModalOpen(false);
            setEditMode(false);

        } catch (error) {
            console.error("Error updating record:", error);
        }
    };

    /** ────────────────────────────────────────────────
     *   DELETE RECORD
     * ──────────────────────────────────────────────── */
    const deleteRecord = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await axios.delete(`${API_URL}/delete/${id}`);
            fetchRecords();
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    /** ────────────────────────────────────────────────
     *   RESET FORM FIELDS
     * ──────────────────────────────────────────────── */
    const resetForm = () => {
        setLoanType("");
        setNumValue("");
        setGraceDays("");
        setEditMode(false);
        setEditId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Page Header */}
            <div className="flex justify-center">
                <div className="flex items-center justify-between px-6 py-4 mt-5 w-[1290px] bg-white border border-gray-200 rounded-xl shadow-sm">

                    <h2 className="text-2xl font-bold text-red-600">
                        Gress Period
                    </h2>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => { setEditMode(false); resetForm(); setIsModalOpen(true); }}
                            className="px-5 py-2 bg-[#0A2478] text-white text-sm font-medium rounded-md hover:bg-[#001f86] transition"
                        >
                            Add
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white w-[720px] rounded-lg shadow-xl p-8">

                        <h2 className="text-xl font-semibold text-[#0A2478] mb-6">
                            {editMode ? "Edit GressPeriod" : "Add GressPeriod"}
                        </h2>

                        {/* Dropdown */}
                        <div className="mb-4">
                            <label className="text-sm block mb-1 text-gray-700">
                                Select Loan Type
                            </label>
                            <select
                                value={loanType}
                                onChange={(e) => setLoanType(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 w-44 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select</option>
                                <option value="monthly">Monthly</option>
                                <option value="daily">Daily</option>
                            </select>
                        </div>

                        {/* Inputs */}
                        {loanType && (
                            <div className="flex gap-6">

                                <div>
                                    <label className="text-sm block mb-1 text-gray-700">
                                        {loanType === "monthly" ? "No. of Months" : "No. of Days"}
                                    </label>
                                    <input
                                        type="number"
                                        value={numValue}
                                        onChange={(e) => setNumValue(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2 w-44 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm block mb-1 text-gray-700">
                                        GressPeriod (in Days)
                                    </label>
                                    <input
                                        type="number"
                                        value={graceDays}
                                        onChange={(e) => setGraceDays(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2 w-44 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 mt-10">

                            {/* Save OR Update */}
                            <button
                                className="px-6 py-2 bg-blue-900 text-white text-sm rounded-md hover:bg-blue-800 transition"
                                onClick={editMode ? handleUpdate : handleSave}
                            >
                                {editMode ? "Update" : "Save"}
                            </button>

                            <button
                                className="px-6 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                                onClick={() => { resetForm(); setIsModalOpen(false); }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TABLE */}
            <div className="flex justify-center mt-6">
                <div className="w-[1290px] rounded-xl shadow-sm bg-white">

                    {loading ? (
                        <p className="text-center text-gray-600 py-10">Loading...</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-[#0A2478] text-white text-sm">
                                <tr>
                                    <th className="px-4 py-3 border-r border-gray-300 text-left">Sr. No</th>
                                    <th className="px-4 py-3 border-r border-gray-300 text-left">Loan Type</th>
                                    <th className="px-4 py-3 border-r border-gray-300 text-left">No. of Months/Days</th>
                                    <th className="px-4 py-3 border-r border-gray-300 text-left">GressPeriod (Days)</th>
                                    <th className="px-4 py-3 border-r border-gray-300 text-left">Action</th>
                                </tr>
                            </thead>

                            <tbody className="text-sm text-gray-700">
                                {records.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={` border`}
                                    >
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3 capitalize">{item.loan_type}</td>
                                        <td className="px-4 py-3">{item.num_value}</td>
                                        <td className="px-4 py-3">{item.grace_days}</td>

                                        <td className="px-4 py-3 flex gap-3">

                                            {/* EDIT BUTTON */}
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-green-600 hover:bg-green-700 p-2 rounded-md text-white"
                                                title="Edit"
                                            >
                                                <FiEdit size={14} />
                                            </button>

                                            {/* DELETE BUTTON */}
                                            <button
                                                onClick={() => deleteRecord(item.id)}
                                                className="bg-red-600 hover:bg-red-700 p-2 rounded-md text-white"
                                                title="Delete"
                                            >
                                                <FiTrash size={14} />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

        </div>
    );
}

export default GracePeriod;
