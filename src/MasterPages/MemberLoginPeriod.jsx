import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import { encryptData, decryptData } from "../utils/cryptoHelper";
import { TimePicker } from "../Component/TimePicker";
import Pagination from "../Component/Pagination";
import { useNavigate } from "react-router-dom";

const MemberLoginPeriod = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "SLF | Member Login Period";
    fetchMemberLoginPeriod();
  }, []);

  const navigate = useNavigate();
  const fetchMemberLoginPeriod = async (page = 1) => {
    try {
      const encryptedPayload = encryptData({});

      const response = await axios.get(`${API}/Master/Employee_Profile/login-period`, {
        params: {
          payload: encryptedPayload,
          page, // send current page number
          limit: itemsPerPage, // number of rows per page
        },
      });

      const parsedData = decryptData(response.data.data);

      console.log(parsedData)
      if (!parsedData || !parsedData.members) {
        console.error("❌ Invalid or decrypted data:", parsedData);
        return;
      }

      // 🧮 Update table data
      setData(
        parsedData.members.map((m) => ({
          id: m.id,
          name: m.emp_name,
          email: m.email,
          startDate: m.start_time || "",
          endDate: m.end_time || "",
          ipAddress: m.ip_address || "",
        }))
      );

      // 📊 Set total count (use backend's total count or members.length fallback)
      setTotalItems(parsedData.total || parsedData.members.length);
      setShowPagination(true);
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const itemsPerPage = 10;

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchMemberLoginPeriod(page);
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
            Member Login Period
            {loading && <span className="text-sm text-gray-500">Updating...</span>}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
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
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2 flex items-center justify-center">
                    <input type="checkbox" className="w-4 h-4 accent-blue-900" />
                  </td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.email}</td>

                  {/* Start Time */}
                  <td className="px-4 py-2">
                    <TimePicker
                      initialTime={row.startDate}
                      onSave={(newTime) => {
                        handleChange(index, "startDate", newTime);
                        handleBlur(index);
                      }}
                      onCancel={() => console.log("Cancelled")}
                    />
                  </td>

                  <td className="px-4 py-2">
                    <TimePicker
                      initialTime={row.endDate}
                      onSave={(newTime) => {
                        handleChange(index, "endDate", newTime);
                        handleBlur(index);
                      }}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

    </div>
  );
};

export default MemberLoginPeriod;