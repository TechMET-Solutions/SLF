import React from 'react'
import { useNavigate } from 'react-router-dom'

function GracePeriod() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="flex justify-center">
                {/* Header Card */}
                <div className="flex items-center justify-between px-6 py-4 mt-5 w-[1290px] h-[62px] bg-white border border-gray-200 rounded-xl shadow-sm">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-red-600 font-source-sans">
                        Grace Period
                    </h2>


                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                         {/* Dropdown */}
                    <div>
                        <select
                            name="loan_type"
                            className="border border-gray-300 rounded px-2 w-32 h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select</option>
                            <option value="monthly">Monthly</option>
                            <option value="daily">Daily</option>
                        </select>
                    </div>
                        <button
                            className="px-4 py-1.5 bg-blue-900 text-white text-xs font-medium rounded hover:bg-blue-800 transition-colors"
                        >
                            Add
                        </button>
                        <button 
                            className="px-4 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                            onClick={() => navigate("/")}
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area - You can add table or form here */}
            <div className="flex justify-center mt-6">
                <div className="w-[1290px] bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="text-center text-gray-500 py-12">
                        <p className="text-lg">Grace Period Management Content</p>
                        <p className="text-sm mt-2">Add your form or table here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GracePeriod