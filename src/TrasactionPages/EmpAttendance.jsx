import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { decryptData } from "../utils/cryptoHelper";
import { formatIndianDate } from "../utils/Helpers";
// <-- your decode function import

const EmpAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  console.log(employees, "employees");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState([]);
  const [showPagination, setShowPagination] = useState(false);

  console.log(attendanceData, "attendanceData");

  const navigate = useNavigate();
  useEffect(() => {
    fetchEmployees();
  }, [page]);

 const fetchEmployees = async () => {
  try {
    const res = await fetch(
      `${API}/Master/Employee_Profile/getAll-employees?page=${page}&limit=${limit}`
    );

    const response = await res.json();

    // console.log(response, "employee response");

    // 🔥 Direct use response
    setEmployees(response.items);
    setTotalPages(response.total);
    setShowPagination(response.pagination.showPagination);

  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

  const getMonthlyAttendance = async () => {
    debugger;
    try {
      const res = await fetch(
        `${API}/Transactions/monthly?emp_id=${selectedEmp.id}&month=${month}&year=${year}`,
      );

      const data = await res.json();

      if (data.status) {
        setAttendanceData(data.data);
      } else {
        setAttendanceData([]);
      }
    } catch (err) {
      console.error("Error fetching monthly attendance:", err);
    }
  };
  useEffect(() => {
    if (selectedEmp) {
      getMonthlyAttendance();
    }
  }, [selectedEmp, month, year]);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 mt-5 w-[1462px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
            }}
            className="text-red-600"
          >
            Employee Attendance
          </h2>

          <button
            onClick={() => navigate("/")}
            className="text-white px-[6px] py-[6px] rounded bg-[#C1121F] w-[74px] h-[24px] text-[10px]"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex  mt-4 mx-auto w-[1462px] ">
        <table className=" ">
          <thead className="bg-[#0A2478] text-white text-sm">
            <tr>
              <th className="px-1 py-1 border w-[80px]">Emp Id</th>
              <th className="px-1 py-1 border w-[250px]">Name</th>
              <th className="px-1 py-1 border w-[250px]">Email</th>
              <th className="px-1 py-1 border w-[100px]">Mobile</th>
              <th className="px-1 py-1 border w-[150px]">Branch</th>
              <th className="px-1 py-1 border w-[100px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees?.length > 0 ? (
              employees.map((emp, i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 0 ? "bg-gray-50 text-sm" : "bg-white text-sm"
                  }
                >
                  <td className="px-1 py-1 ">{emp.id}</td>
                  <td className="px-1 py-1 ">{emp.emp_name}</td>
                  <td className="px-1 py-1 ">{emp.email}</td>
                  <td className="px-1 py-1 ">{emp.mobile_no}</td>
                  <td className="px-1 py-1 ">{emp.branch}</td>
                  <td
                    className="px-1 py-1 text-blue-500 hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedEmp(emp);
                      setShowModal(true);
                    }}
                  >
                     Attendance
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex justify-center gap-3 mt-4 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full h-auto"
          style={{
            background: "#0101017A",
            backdropFilter: "blur(6.8px)",
          }}
        >
          <div className="bg-white p-6 w-[800px] rounded-lg shadow-lg h-[500px] relative">
            {/* ❌ Close Icon (TOP RIGHT) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3 text-center text-[#0A2478]">
              Attendance – {selectedEmp?.emp_name}
            </h2>

            {/* Employee Info */}
            <div className="mb-4 text-sm text-gray-700">
              <p>
                <b>ID:</b> {selectedEmp?.id}
              </p>
              <p>
                <b>Mobile:</b> {selectedEmp?.mobile_no}
              </p>
              <p>
                <b>Branch:</b> {selectedEmp?.branch}
              </p>
            </div>

            {/* Month & Year Selector */}
            <div className="flex gap-4 mb-4">
              {/* Month */}
              <select
                className="border px-1 py-1 rounded w-1/2"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("en", { month: "long" })}
                  </option>
                ))}
              </select>

              {/* Year */}
              <select
                className="border px-1 py-1 rounded w-1/2"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {Array.from(
                  { length: 5 },
                  (_, i) => new Date().getFullYear() - i,
                ).map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Placeholder */}
            <div className="max-h-[260px] overflow-y-auto border rounded mt-3">
              <table className="w-full text-sm text-center">
                <thead className="bg-[#0A2478] text-white">
                  <tr>
                    <th className="px-1 py-1 border">Date</th>
                    <th className="px-1 py-1 border">Punch In</th>
                    <th className="px-1 py-1 border">Punch Out</th>
                  </tr>
                </thead>

                <tbody>
                  {attendanceData.length > 0 ? (
                    attendanceData.map((row, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="px-1 py-1 border">
                          {formatIndianDate(row.date)}
                        </td>

                        <td className="px-1 py-1 border">
                          {row.punch_in ? (
                            row.punch_in
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-1 py-1 border">
                          {row.punch_out ? (
                            row.punch_out
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-3 text-gray-500">
                        No Attendance Records Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Close Button (Optional, you can remove) */}
            <div className="text-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpAttendance;
