import { useState, useEffect } from "react";
import { fetchGoldRatesApi, addGoldRateApi } from "../API/Master/Master_Profile/Gold_Rate_Details";
import { formatIndianDate } from "../utils/Helpers";
import Pagination from "../Component/Pagination";

const PushGoldRateList = () => {
  useEffect(() => {
    document.title = "SLF | Push Gold Rate List ";
  }, []);
  const [data, setData] = useState([]);
  const [pushDate, setPushDate] = useState("");
  const [goldRate, setGoldRate] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // 🔹 Fetch gold rates with pagination
  const fetchGoldRates = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await fetchGoldRatesApi(page, itemsPerPage);
      if (result?.items) {
        setData(result.items);
        setTotalItems(result.total);
        setCurrentPage(result.page);
        setShowPagination(result.showPagination || false);
      } else {
        setData([]);
        setShowPagination(false);
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setData([]);
      setShowPagination(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Save new gold rate
  const handleSave = async () => {
    if (!pushDate || !goldRate) return;

    const payload = {
      push_date: pushDate,
      gold_rate: goldRate,
      added_on: new Date().toISOString(),
      added_by: "ssl@slunawat.com",
    };

    try {
      await addGoldRateApi(payload);
      fetchGoldRates(currentPage); // refresh table with current page
      setGoldRate("");
      setPushDate("");
    } catch (err) {
      console.error("❌ Save Error:", err.response?.data || err.message);
    }
  };

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchGoldRates(page);
  };

  useEffect(() => {
    fetchGoldRates();
  }, []);

  return (
    <div className="min-h-screen w-full">
      {/* Top Bar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Push Gold Rate List
          </h2>

          {/* Input & Actions */}
          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Push Date <span className="text-red-500">*</span></p>
                <input
                  type="date"
                  value={pushDate}
                  onChange={(e) => setPushDate(e.target.value)}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">Gold Rate <span className="text-red-500">*</span></p>
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(e.target.value)}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-[#0A2478] cursor-pointer text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
              >
                Save
              </button>
              <button
                className="bg-[#C1121F] cursor-pointer text-white text-[10px] w-[74px] h-[24px] rounded"
                onClick={() => window.history.back()}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <div className="overflow-x-auto mt-5 w-[1290px] h-[500px]">
          {data.length === 0 && !isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg text-gray-500">No Data Found</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-[#0A2478] text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left border-r">ID</th>
                  <th className="px-4 py-2 text-left border-r">Push Date</th>
                  <th className="px-4 py-2 text-left border-r">Gold Rate</th>
                  <th className="px-4 py-2 text-left border-r">Added On</th>
                  <th className="px-4 py-2 text-left border-r">Added By</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">{formatIndianDate(row.push_date)}</td>
                    <td className="px-4 py-2">{row.gold_rate}</td>
                    <td className="px-4 py-2">{formatIndianDate(row.added_on)}</td>
                    <td className="px-4 py-2">{row.added_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PushGoldRateList;