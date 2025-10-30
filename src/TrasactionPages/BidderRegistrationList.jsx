// import { useState } from "react";
// import { FiEdit, FiEye } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const BidderRegistrationList = () => {
//   const navigate = useNavigate();

//   const [data] = useState([
//     {
//       id: 1,
//       BidderID: "BID0001",
//       BidderName: "MAYUR SUDAM TARLE",
//       MobileNo: "9874521456",
//       ShopAddress: "H.No. 444-31, BHAGUR, NASHIK 422502, INDIA",
//       LandlineNo: "0253-123456",
//       GSTNo: "27AAACC1206D1ZG",
//       FirmName: "Tarle Traders",
//       EmailID: "mayur.tarle@example.com",
//     },
//     {
//       id: 2,
//       BidderID: "BID0002",
//       BidderName: "RAHUL SHARMA",
//       MobileNo: "9823456789",
//       ShopAddress: "Plot 12, MG Road, Pune 411001",
//       LandlineNo: "020-456789",
//       GSTNo: "27BBBCD1234E1ZF",
//       FirmName: "Sharma Enterprises",
//       EmailID: "rahul.sharma@example.com",
//     },
//   ]);

//   return (
//     <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 py-8">
//       {/* Header Section */}
//       <div className="w-[90%] max-w-[1300px] bg-white shadow-md rounded-lg p-4 flex justify-between items-center border border-gray-200">
//         <h2 className="text-red-600 font-semibold text-xl">
//           Bidder Registration List
//         </h2>

//         <button
//           onClick={() => navigate("/Bidder-Registration")}
//           className="bg-[#0A2478] hover:bg-[#0c2b94] text-white text-sm px-6 py-2 transition-all duration-200"
//         >
//           Register 
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="w-[90%] max-w-[1300px] mt-6 bg-white">
//         <table className="w-full text-sm border-collapse">
//           <thead className="bg-[#0A2478] text-white">
//             <tr>
//               <th className="px-4 py-2 text-left border-r">Bidder ID</th>
//               <th className="px-4 py-2 text-left border-r">Bidder Name</th>
//               <th className="px-4 py-2 text-left border-r">Mobile No</th>
//               <th className="px-6 py-2 text-left border-r ">Shop Address</th>
//               <th className="px-4 py-2 text-left border-r">Landline No</th>
//               <th className="px-4 py-2 text-left border-r">GST No</th>
//               <th className="px-6 py-2 text-left border-r">Firm Name</th>
//               <th className="px-6 py-2 text-left border-r">Email ID</th>
//               <th className="px-4 py-2 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.length > 0 ? (
//               data.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className={`${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   } hover:bg-blue-50 transition-colors duration-150`}
//                 >
//                   <td className="px-4 py-2">{item.BidderID}</td>
//                   <td className="px-4 py-2">{item.BidderName}</td>
//                   <td className="px-4 py-2 ">{item.MobileNo}</td>
//                   <td className="px-6 py-2 max-w-[200px] truncate" title={item.ShopAddress}>{item.ShopAddress}</td>
//                   <td className="px-4 py-2">{item.LandlineNo}</td>
//                   <td className="px-4 py-2">{item.GSTNo}</td>
//                   <td className="px-6 py-2">{item.FirmName}</td>
//                   <td className="px-6 py-2">{item.EmailID}</td>
//                   <td className="px-4 py-2 flex justify-center gap-2">
//                     <button
//                       onClick={() => navigate(`/View-Bidder-Details`)}
//                       className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
//                       title="View"
//                     >
//                       <FiEye className="text-sm" />
//                     </button>
//                     <button
//                       onClick={() => navigate(`/EditBidderDetails`)}
//                       className="bg-green-500 hover:bg-green-600 p-2 rounded text-white"
//                       title="Edit"
//                     >
//                       <FiEdit className="text-sm" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="9"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   No bidders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BidderRegistrationList;


import { useEffect, useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { fetchBidderApi } from "../API/Transaction/Auction/BidderApi"; // ✅ import API

const BidderRegistrationList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // bidder list
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error handling

  // 🔹 Fetch bidders from backend
  useEffect(() => {
    const getBidders = async () => {
      try {
        setLoading(true);
        const res = await fetchBidderApi(); // call API
        setData(res?.bidders || []); // set result
      } catch (err) {
        console.error("❌ Error fetching bidders:", err);
        setError(err?.message || "Failed to fetch bidders");
      } finally {
        setLoading(false);
      }
    };

    getBidders();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 py-8">
      {/* Header Section */}
      <div className="w-[90%] max-w-[1300px] bg-white shadow-md rounded-lg p-4 flex justify-between items-center border border-gray-200">
        <h2 className="text-red-600 font-semibold text-xl">
          Bidder Registration List
        </h2>

        <button
          onClick={() => navigate("/Bidder-Registration")}
          className="bg-[#0A2478] hover:bg-[#0c2b94] text-white text-sm px-6 py-2 transition-all duration-200"
        >
          Register
        </button>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <div className="mt-8 text-gray-600">Loading bidders...</div>
      ) : error ? (
        <div className="mt-8 text-red-500">{error}</div>
      ) : (
        <div className="w-[90%] max-w-[1300px] mt-6 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-[#0A2478] text-white">
              <tr>
                <th className="px-4 py-2 text-left border-r">ID</th>
                <th className="px-4 py-2 text-left border-r">Bidder Name</th>
                <th className="px-4 py-2 text-left border-r">Mobile No</th>
                <th className="px-6 py-2 text-left border-r">Shop Address</th>
                <th className="px-4 py-2 text-left border-r">Landline No</th>
                <th className="px-4 py-2 text-left border-r">GST No</th>
                <th className="px-6 py-2 text-left border-r">Firm Name</th>
                <th className="px-6 py-2 text-left border-r">Email ID</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors duration-150`}
                  >
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.bidder_name}</td>
                    <td className="px-4 py-2">{item.mobile_no}</td>
                    <td
                      className="px-6 py-2 max-w-[200px] truncate"
                      title={item.shop_address}
                    >
                      {item.shop_address}
                    </td>
                    <td className="px-4 py-2">{item.landline_no || "-"}</td>
                    <td className="px-4 py-2">{item.gst_no}</td>
                    <td className="px-6 py-2">{item.firm_name}</td>
                    <td className="px-6 py-2">{item.email}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/View-Bidder-Details/${item.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
                        title="View"
                      >
                        <FiEye className="text-sm" />
                      </button>
                      <button
                        onClick={() => navigate(`/EditBidderDetails/${item.id}`)}
                        className="bg-green-500 hover:bg-green-600 p-2 rounded text-white"
                        title="Edit"
                      >
                        <FiEdit className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No bidders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BidderRegistrationList;
