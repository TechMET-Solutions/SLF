import React from 'react'

function GoldOrnamentBill() {
  return (
            <div className="min-h-screen w-full">
            {/* 🔹 Header */}
            <div className="flex justify-center">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
                    <h2 className="text-[#0A2478] font-bold text-[20px]">
                        Gold Purchase Bill - NBFC Auction
                    </h2>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/Add-Auction-Creation")}
                            className="bg-red-600 text-white text-sm rounded px-4 py-2 cursor-pointer"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>
            
            </div>
  )
}

export default GoldOrnamentBill