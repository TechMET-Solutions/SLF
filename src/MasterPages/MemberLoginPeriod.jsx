// import { useEffect, useState } from "react";
// import axios from "axios";
// import { MdAccessTime } from "react-icons/md";
// import { API } from "../api";
// import { encryptData, decryptData } from "../utils/cryptoHelper";

// const MemberLoginPeriod = () => {
//   useEffect(() => {
//     document.title = "SLF | Member Login Period";
//     fetchMemberLoginPeriod();
//   }, []);

//   const [data, setData] = useState([]);

//   // ✅ Fetch Data from Backend
//   const fetchMemberLoginPeriod = async () => {
//     try {
//       const encryptedPayload = encryptData({});
//       const response = await axios.get(`${API}/Master/Employee_Profile/login-period`, {
//         params: { payload: encryptedPayload },
//       });

//       // 👇 decryptData already returns an object
//       const parsedData = decryptData(response.data.data);

//       if (!parsedData || !parsedData.members) {
//         console.error("Decryption failed or invalid data:", parsedData);
//         return;
//       }

//       setData(
//         parsedData.members.map((m) => ({
//           id: m.id,
//           name: m.emp_name,
//           userId: m.emp_id,
//           startDate: m.start_time || "",
//           endDate: m.end_time || "",
//           ipAddress: m.ip_address || "",
//         }))
//       );
//     } catch (error) {
//       console.error("❌ Error fetching member login period:", error);
//     }
//   };

//   // Function to handle time selection
//   const handleTimeChange = (index, field, value) => {
//     const newData = [...data];
//     newData[index][field] = value;
//     setData(newData);
//   };

//   return (
//     <div className="min-h-screen w-full">
//       {/* Top bar */}
//       <div className="flex justify-center">
//         <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
//           <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
//             Member Login Period
//           </h2>
//           <div className="flex items-center gap-6">
//             <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
//               Exit
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="flex justify-center">
//         <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
//           <table className="w-full border-collapse">
//             <thead className="bg-[#0A2478] text-white text-sm">
//               <tr>
//                 <th className="px-4 py-2 text-left border-r"></th>
//                 <th className="px-4 py-2 text-left border-r">Name</th>
//                 <th className="px-4 py-2 text-left border-r">User Id</th>
//                 <th className="px-4 py-2 text-left border-r">Start Time</th>
//                 <th className="px-4 py-2 text-left border-r">End Time</th>
//                 <th className="px-4 py-2 text-left border-r">IP Address</th>
//               </tr>
//             </thead>
//             <tbody className="text-[12px]">
//               {data.map((row, index) => (
//                 <tr
//                   key={row.id}
//                   className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                 >
//                   <td className="px-4 py-2 flex items-center justify-center">
//                     <input type="checkbox" />
//                   </td>
//                   <td className="px-4 py-2">{row.name}</td>
//                   <td className="px-4 py-2">{row.userId}</td>

//                   {/* Start Time Picker */}
//                   <td className="px-4 py-2">
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="time"
//                         value={row.startDate}
//                         onChange={(e) =>
//                           handleTimeChange(index, "startDate", e.target.value)
//                         }
//                         className="border px-2 py-1 rounded w-[100px]"
//                       />
//                     </div>
//                   </td>

//                   {/* End Time Picker */}
//                   <td className="px-4 py-2">
//                     <div className="flex items-center gap-2">
//                       <input
//                         id={`end-${index}`}
//                         type="time"
//                         value={row.endDate}
//                         onChange={(e) =>
//                           handleTimeChange(index, "endDate", e.target.value)
//                         }
//                         className="border px-2 py-1 rounded w-[100px]"
//                       />
//                     </div>
//                   </td>

//                   <td className="px-4 py-2">{row.ipAddress}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center px-6 py-3 border-t gap-2 mt-4">
//         <button className="px-3 py-1 border rounded-md">Previous</button>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">
//             1
//           </button>
//           <button className="px-3 py-1 border rounded-md">2</button>
//           <button className="px-3 py-1 border rounded-md">3</button>
//           <span className="px-3 py-1">...</span>
//           <button className="px-3 py-1 border rounded-md">10</button>
//         </div>
//         <button className="px-3 py-1 border rounded-md">Next</button>
//       </div>
//     </div>
//   );
// };

// export default MemberLoginPeriod;

// src/pages/MemberLoginPeriod.jsx


import { useEffect, useState } from "react";
import axios from "axios";
import { MdAccessTime } from "react-icons/md";
import { API } from "../api";
import { encryptData, decryptData } from "../utils/cryptoHelper";

const MemberLoginPeriod = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "SLF | Member Login Period";
    fetchMemberLoginPeriod();
  }, []);

  // ✅ Fetch all employees
  const fetchMemberLoginPeriod = async () => {
    try {
      const encryptedPayload = encryptData({});
      const response = await axios.get(
        `${API}/Master/Employee_Profile/login-period`,
        { params: { payload: encryptedPayload } }
      );

      const parsedData = decryptData(response.data.data);

      if (!parsedData || !parsedData.members) {
        console.error("❌ Invalid or decrypted data:", parsedData);
        return;
      }

      setData(
        parsedData.members.map((m) => ({
          id: m.id,
          name: m.emp_name,
          userId: m.emp_id,
          startDate: m.start_time || "",
          endDate: m.end_time || "",
          ipAddress: m.ip_address || "",
        }))
      );
    } catch (error) {
      console.error("❌ Error fetching member login period:", error);
    }
  };

  // ✅ Update Member Login Period - FIXED
  const updateMemberLoginPeriod = async (payload) => {
    try {
      setLoading(true);
      
      // Clean payload - convert empty strings to null
      const cleanPayload = {
        id: payload.id,
        start_time: payload.start_time || null,
        end_time: payload.end_time || null,
        ip_address: payload.ip_address || null,
      };

      console.log("📤 Clean Payload:", cleanPayload);

      const encryptedPayload = encryptData(cleanPayload);

      // Send as form data or JSON directly
      const response = await axios.put(
        `${API}/Master/Employee_Profile/update-login-period`,
        { data: encryptedPayload },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data && response.data.data) {
        const decrypted = decryptData(response.data.data);
        console.log("✅ Updated Successfully:", decrypted);
        
        // Refresh data after successful update
        fetchMemberLoginPeriod();
      } else {
        console.error("❌ No data in response");
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      if (error.response) {
        console.error("❌ Backend error:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Trigger update on blur - FIXED
  const handleBlur = async (index) => {
    const record = data[index];
    if (!record?.id) {
      console.error("❌ Missing Employee ID in record:", record);
      return;
    }

    const payload = {
      id: record.id,
      start_time: record.startDate || null,
      end_time: record.endDate || null,
      ip_address: record.ipAddress || null,
    };

    console.log("📤 Sending Update Payload:", payload);
    await updateMemberLoginPeriod(payload);
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] flex items-center gap-2">
            <MdAccessTime /> Member Login Period
            {loading && <span className="text-sm text-gray-500">Updating...</span>}
          </h2>
          <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
            Exit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2472] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r">Sr.</th>
                <th className="px-4 py-2 text-left border-r">Name</th>
                <th className="px-4 py-2 text-left border-r">User Id</th>
                <th className="px-4 py-2 text-left border-r">Start Time</th>
                <th className="px-4 py-2 text-left border-r">End Time</th>
                <th className="px-4 py-2 text-left border-r">IP Address</th>
              </tr>
            </thead>

            <tbody className="text-[12px]">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.userId}</td>

                  {/* Start Time */}
                  <td className="px-4 py-2">
                    <input
                      type="time"
                      value={row.startDate}
                      onChange={(e) =>
                        handleChange(index, "startDate", e.target.value)
                      }
                      onBlur={() => handleBlur(index)}
                      className="border px-2 py-1 rounded w-[100px]"
                      disabled={loading}
                    />
                  </td>

                  {/* End Time */}
                  <td className="px-4 py-2">
                    <input
                      type="time"
                      value={row.endDate}
                      onChange={(e) =>
                        handleChange(index, "endDate", e.target.value)
                      }
                      onBlur={() => handleBlur(index)}
                      className="border px-2 py-1 rounded w-[100px]"
                      disabled={loading}
                    />
                  </td>

                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={row.ipAddress}
                      onChange={(e) =>
                        handleChange(index, "ipAddress", e.target.value)
                      }
                      onBlur={() => handleBlur(index)}
                      className="border px-2 py-1 rounded w-[120px]"
                      placeholder="IP Address"
                      disabled={loading}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberLoginPeriod;