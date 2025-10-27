import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md"; // clock icon

const MemberLoginPeriod = () => {
  useEffect(() => {
    document.title = "SLF | Member Login Period";
  }, []);

  const [data, setData] = useState([
    { id: 1, name: "ssl@slunawat.com", userId: "ssl@slunawat.com", startDate: "", endDate: "" },
    { id: 2, name: "ssl@slunawat.com", userId: "ssl@slunawat.com", startDate: "", endDate: "" },
    { id: 3, name: "ssl@slunawat.com", userId: "ssl@slunawat.com", startDate: "", endDate: "" },
  ]);

  // Function to handle time selection
  const handleTimeChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Top bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Member Login Period
          </h2>
          <div className="flex items-center gap-6">
            <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded">
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                <th className="px-4 py-2 text-left border-r"></th>
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
                  <td className="px-4 py-2 flex items-center justify-center">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.userId}</td>

                  {/* Start Time Picker */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={row.startDate}
                        onChange={(e) =>
                          handleTimeChange(index, "startDate", e.target.value)
                        }
                        className="border px-2 py-1 rounded w-[100px]"
                      />
                     
                    </div>
                  </td>

                  {/* End Time Picker */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <input
                        id={`end-${index}`}
                        type="time"
                        value={row.endDate}
                        onChange={(e) =>
                          handleTimeChange(index, "endDate", e.target.value)
                        }
                        className="border px-2 py-1 rounded w-[100px]"
                      />
                      
                    </div>
                  </td>

                  <td className="px-4 py-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2 mt-4">
        <button className="px-3 py-1 border rounded-md">Previous</button>
        <div className="flex gap-2">
          <button className="px-3 py-1 border bg-[#0b2c69] text-white rounded-md">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">3</button>
          <span className="px-3 py-1">...</span>
          <button className="px-3 py-1 border rounded-md">10</button>
        </div>
        <button className="px-3 py-1 border rounded-md">Next</button>
      </div>
    </div>
  );
};

export default MemberLoginPeriod;
