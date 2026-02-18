import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function AuctionCreation() {
    useEffect(() => {
        document.title = "SLF | Auction Creation";
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        venue: "",
        date: "",
        time: "",
        fees: "",
        charges: "",
    });

    // ✅ Dummy auction data
  const [data, setData] = useState([]);

useEffect(() => {
  fetchAuctions();
}, []);

const fetchAuctions = async () => {
  try {
    const res = await fetch(`${API}/Transactions/GetAuction`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    if (json.success) {
      setData(json.data);
    }
  } catch (error) {
    console.log("Error fetching auctions:", error);
  }
};

    return (
        <div className="min-h-screen w-full">
            {/* 🔹 Header */}
            <div className="flex justify-center sticky top-[80px] z-40">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between bg-white">
                    <h2 className="text-red-600 font-bold text-[20px]">
                       Auction List
                    </h2>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/Add-Auction-Creation")}
                            className="bg-[#0A2478] text-white text-sm rounded px-4 py-2 cursor-pointer"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#C1121F] text-white text-sm rounded px-4 py-2 cursor-pointer"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>

        {/* 🔹 Table Section */}
        <div className='mr-[110px] ml-[110px]'>
          <div className="flex justify-center ">
  <div className="overflow-x-auto mt-6 w-[1300px]">
    <table className=" border-collapse">
      <thead className="bg-[#0A2478] text-white text-sm">
        <tr>
          <th className="px-4 py-2 text-left border-r w-[100px]">Auction Id</th>
          <th className="px-4 py-2 text-left border-r w-[400px]">Venue</th>
          <th className="px-4 py-2 text-left border-r">Date</th>
          <th className="px-4 py-2 text-left border-r">Time</th>
          <th className="px-4 py-2 text-left border-r">Fees</th>
          <th className="px-4 py-2 text-left border-r">Loans</th>
          <th className="px-4 py-2 flex gap-3">
            Status 
          </th>
        </tr>
      </thead>

      <tbody className="text-[13px]">
        {data.map((row, index) => (
          <tr
            key={row.id}
            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
          >
            {/* Auction ID + Navigation */}
            <td
              className="px-4 py-2 cursor-pointer text-blue-400"
              onClick={() =>
                navigate("/Auction-Items-List", {
                  state: {
                    loanIds: row.loanDetails.map((d) => d.loanId),
                    AuctionData: row
                  }
                })
              }
            >
              {row.id}
            </td>

            {/* Venue */}
            <td className="px-4 py-2">{row.venue}</td>

            {/* Date */}
            <td className="px-4 py-2">{row.date?.slice(0, 10)}</td>

            {/* Time */}
            <td className="px-4 py-2">{row.time}</td>

            {/* Fees */}
            <td className="px-4 py-2">{row.fees}</td>

            {/* Loan IDs */}
            <td className="px-4 py-2">
              {row.loanDetails && row.loanDetails.length > 0
                ? row.loanDetails.map((d) => d.loanId).join(", ")
                : "No Loan IDs"}
            </td>

            {/* Status */}
            <td
              className={`px-4 py-2 ${
                row.status === "OPEN" ? "text-green-600" : "text-red-600"
              }`}
            >
              {row.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </div>
         

        </div>
    );
}

export default AuctionCreation;
