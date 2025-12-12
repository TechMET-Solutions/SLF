import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

function GracePeriod() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loanType, setLoanType] = useState("");
    const [numValue, setNumValue] = useState("");
    const [graceDays, setGraceDays] = useState("");

    return (
        <div className= " min-h-screen bg-gray-100 p-6">

            {/* Page Header */}
            <div className="flex  justify-center">
                <div className="flex items-center justify-between px-6 py-4 mt-5 w-[1290px] bg-white border border-gray-200 rounded-xl shadow-sm">

                    <h2 className="text-2xl font-bold text-[#C1121F]">
                        Grace Period
                    </h2>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition"
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
                            Add Grace Period
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

                        {/* Conditional Inputs */}
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
                                        Grace Period (in Days)
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

                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-4 mt-10">
                            <button
                                className="px-6 py-2 bg-blue-900 text-white text-sm rounded-md hover:bg-blue-800 transition"
                                onClick={() => {
                                    console.log({ loanType, numValue, graceDays });
                                    setIsModalOpen(false);
                                }}
                            >
                                Save
                            </button>

                            <button
                                className="px-6 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-6">
                <div className="w-[1290px] rounded-xl shadow-sm">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#0A2478] text-white text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left">Sr. No</th>
                                <th className="px-4 py-3 text-left">Loan Type</th>
                                <th className="px-4 py-3 text-left">No. of Months/Days</th>
                                <th className="px-4 py-3 text-left">Grace Period (Days)</th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-700">
                            <tr className="border-b hover:bg-gray-50 transition">
                                <td className="px-4 py-3">1</td>
                                <td className="px-4 py-3">Daily</td>
                                <td className="px-4 py-3">30</td>
                                <td className="px-4 py-3">5</td>
                                <td className="px-4 py-3 flex gap-3">
                                    <button className="bg-green-600 hover:bg-green-700 p-2 rounded-md text-white">
                                        <FiEdit size={14} />
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 p-2 rounded-md text-white">
                                        <FiTrash size={14} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default GracePeriod;
