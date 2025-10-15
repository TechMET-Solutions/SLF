import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";



function AuctionCreation() {

    useEffect(() => {
        document.title = "SLF | Auction Creation";
    }, []);
    
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full">
            {/* Header */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
                    <h2 className="text-red-600 font-bold text-[20px]">Auction Creation</h2>
                    <div className="flex gap-3">
                        <button
                            className="bg-[#0A2478] text-white text-sm rounded px-4 py-1 cursor-pointer"
                        // onClick={() => handleOpenModal(null)}
                        >
                            Add
                        </button>
                        <button
                            className="bg-[#C1121F] text-white text-sm rounded px-4 py-1 cursor-pointer"
                            onClick={() => navigate("/dashboard")}
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuctionCreation