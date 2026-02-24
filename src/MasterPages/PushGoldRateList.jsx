import { useEffect, useState } from "react";
import { useAuth } from "../API/Context/AuthContext";
import {
  addGoldRateApi,
  fetchGoldRatesApi,
} from "../API/Master/Master_Profile/Gold_Rate_Details";
import {
  addSilverRateApi,
  fetchSilverRatesApi,
} from "../API/Master/Master_Profile/Silver_Rate_Details";
import Pagination from "../Component/Pagination";
import { formatIndianDate } from "../utils/Helpers";

const PushGoldRateList = () => {
  useEffect(() => {
    document.title = "SLF | Push Gold Rate List ";
  }, []);
  const [data, setData] = useState([]);
  const [Silverdata, setSilverData] = useState([]);
  const [pushDate, setPushDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [goldRate, setGoldRate] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const [currentPageForSilver, setCurrentPageForSilver] = useState(1);
  const [totalItemsForSilver, setTotalItemsForSilver] = useState(0);
  const [showPaginationForSilver, setShowPaginationForSilver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const itemsPerPageForSilver = 10;
  const [metalType, setMetalType] = useState("Gold");
  const [actualRate, setActualRate] = useState("");
  const [filterDateGold, setFilterDateGold] = useState("");
  const [filterDateSilver, setFilterDateSilver] = useState("");
  const { loginUser } = useAuth();

  const [filterRange, setFilterRange] = useState({ from: "", to: "" });

// Shared function to trigger both fetches
// const handleGlobalFilter = (from, to) => {
//   fetchGoldRates(1, from, to);
//   fetchSilverRates(1, from, to);
// };

const handleGlobalReset = () => {
  setFilterRange({ from: "", to: "" });
  handleGlobalFilter("", "");
};

  console.log("Logged in user:", loginUser);
  // 🔹 Fetch gold rates with pagination
  // const fetchGoldRates = async (page = 1) => {
  //   debugger;
  //   setIsLoading(true);
  //   try {
  //     const result = await fetchGoldRatesApi(
  //       page,
  //       itemsPerPage,
  //       filterDateGold,
  //     );
  //     if (result?.items) {
  //       setData(result.items);
  //       setTotalItems(result.total);
  //       setCurrentPage(result.page);
  //       setShowPagination(result.showPagination || false);
  //     } else {
  //       setData([]);
  //       setShowPagination(false);
  //     }
  //   } catch (err) {
  //     console.error("❌ Fetch Error:", err);
  //     setData([]);
  //     setShowPagination(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchGoldRates = async (page = 1, from = "", to = "") => {
  setIsLoading(true);
  try {
    const result = await fetchGoldRatesApi(
      page,
      itemsPerPage,
      from,
      to
    );

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
  // const fetchSilverRates = async (page = 1) => {
  //   debugger;
  //   setIsLoading(true);
  //   try {
  //     const result = await fetchSilverRatesApi(
  //       page,
  //       itemsPerPage,
  //       filterDateSilver,
  //     );
  //     if (result?.items) {
  //       setSilverData(result.items);
  //       setTotalItemsForSilver(result.total);
  //       setCurrentPageForSilver(result.page);
  //       setShowPaginationForSilver(result.showPagination || false);
  //     } else {
  //       setSilverData([]);
  //       setShowPaginationForSilver(false);
  //     }
  //   } catch (err) {
  //     console.error("❌ Fetch Error:", err);
  //     setSilverData([]);
  //     setShowPaginationForSilver(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const fetchSilverRates = async (page = 1, from = "", to = "") => {
  setIsLoading(true);
  try {
    const result = await fetchSilverRatesApi(
      page,
      itemsPerPageForSilver,
      from,
      to
    );

    if (result?.items) {
      setSilverData(result.items);
      setTotalItemsForSilver(result.total);
      setCurrentPageForSilver(result.page);
      setShowPaginationForSilver(result.showPagination || false);
    } else {
      setSilverData([]);
      setShowPaginationForSilver(false);
    }
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    setSilverData([]);
    setShowPaginationForSilver(false);
  } finally {
    setIsLoading(false);
  }
  };
  
  const handleGlobalFilter = (from, to) => {
  fetchGoldRates(1, from, to);
  fetchSilverRates(1, from, to);
};

  
  const handleSave = async () => {
    debugger;
    if (!pushDate || !goldRate) return;

    const payload = {
      push_date: pushDate,
      gold_rate: goldRate,
      actual_rate: actualRate,
      metalType: metalType,
      added_on: new Date().toISOString(),
      added_by: loginUser,
    };

    try {
      if (metalType === "Gold") {
        // Save gold
        await addGoldRateApi(payload);
        fetchGoldRates(currentPage); // refresh gold table
      } else {
        // Save silver
        await addSilverRateApi(payload);
        fetchSilverRates(currentPage); // refresh silver table
      }

      // Reset fields
      setGoldRate("");
      setPushDate("");
      setActualRate("");
      setMetalType("Gold");
    } catch (err) {
      console.error("❌ Save Error:", err.response?.data || err.message);
    }
  };

  // 🔹 Pagination Controls
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalPagesForSilver = Math.ceil(
    totalItemsForSilver / itemsPerPageForSilver,
  );
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchGoldRates(page);
  };

  const handlePageChangeForSilver = (page) => {
    if (page < 1 || page > totalPagesForSilver) return;
    fetchSilverRates(page);
  };

  useEffect(() => {
    fetchGoldRates();
  }, [filterDateGold]);
  useEffect(() => {
    fetchSilverRates();
  }, [filterDateSilver]);

  return (
    <div className="min-h-screen w-full">
      {/* Top Bar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] font-source">
            Rate List
          </h2>

          {/* Input & Actions */}
          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">
                  Push Date <span className="text-red-500">*</span>
                </p>
                <input
                  type="date"
                  value={pushDate}
                  onChange={(e) => setPushDate(e.target.value)}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>

              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">
                  Type <span className="text-red-500">*</span>
                </p>
                <select
                  value={metalType}
                  onChange={(e) => setMetalType(e.target.value)}
                  className="border border-gray-400 rounded px-2 py-1 text-[11.25px] w-[120px] h-[28px]"
                >
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                </select>
              </div>

              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">
                   Funding Rate <span className="text-red-500">*</span>
                </p>
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(e.target.value)}
                  style={{ MozAppearance: "textfield" }}
                  onWheel={(e) => e.target.blur()}
                  className="border border-gray-400 rounded px-3 py-1 text-[11.25px] w-[168px] h-[28px]"
                />
              </div>

              {/* New Actual Rate Field */}
              <div className="flex gap-3 items-center">
                <p className="text-[11.25px] font-source">
                  Actual Rate <span className="text-red-500">*</span>
                </p>
                <input
                  type="number"
                  value={actualRate}
                  onChange={(e) => setActualRate(e.target.value)}
                  style={{ MozAppearance: "textfield" }}
                  onWheel={(e) => e.target.blur()}
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
      <div className='ml-[110px] mr-[110px]'>
<div className="flex flex-col gap-4  mt-5">
  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
    <div className="flex items-center gap-6">
      {/* <p className="font-semibold text-[#0A2478] text-[18px]">Global Date Filter</p> */}
      
      <div className="flex items-center border border-gray-300 rounded-[4px] overflow-hidden h-[36px] bg-white">
        {/* From Date */}
        <div className="flex items-center px-2 border-r border-gray-200">
          <label className="text-[10px] uppercase text-gray-400 mr-2">From</label>
          <input
            type="date"
            value={filterRange.from}
            onChange={(e) => setFilterRange({ ...filterRange, from: e.target.value })}
            className="text-[12px] outline-none border-none bg-transparent"
          />
        </div>

        {/* To Date */}
        <div className="flex items-center px-2">
          <label className="text-[10px] uppercase text-gray-400 mr-2">To</label>
          <input
            type="date"
            value={filterRange.to}
            onChange={(e) => setFilterRange({ ...filterRange, to: e.target.value })}
            className="text-[12px] outline-none border-none bg-transparent"
          />
        </div>

        {/* Action Buttons */}
        <button
          onClick={() => handleGlobalFilter(filterRange.from, filterRange.to)}
          className="bg-[#0A2478] text-white text-[12px] px-5 h-full font-medium hover:bg-[#071d45] transition-colors"
        >
          Apply Filter
        </button>
        <button
          onClick={handleGlobalReset}
          className="bg-[#C1121F] text-white text-[12px] px-5 h-full font-medium hover:bg-red-700 transition-colors border-l border-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</div>
      </div>
      <div className="flex justify-center">
        <div className="overflow-x-auto  flex gap-10 h-auto">
          <div className="mt-5">
            

            {/* <div className="flex items-center gap-4 mb-2 w-full">
             
              <p
                className="font-semibold text-[#0A2478]"
                style={{
                  fontFamily: "Playfair Display",
                  fontSize: "23.23px",
                  lineHeight: "148%",
                }}
              >
                Gold rate
              </p>

            
              <div className="flex items-center">
                <div className="flex items-center border border-gray-300 rounded-[4px] overflow-hidden h-[32px]">
                  <input
                    type="date"
                    value={filterDateGold}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      setFilterDateGold(newDate);
                      
                    }}
                    className="px-2 py-1 text-[11px] outline-none border-none h-full bg-white"
                  />

                  <button
                    onClick={() => {
                      setFilterDateGold("");
                      fetchGoldRates(1, "");
                    }}
                    className="bg-[#0A2478] text-white text-[10px] px-3 h-full font-medium hover:bg-[#071d45] transition-colors border-l border-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div> */}

            <div className="overflow-x-auto  w-[620px] h-[500px]">
              <table className="w-[620px] border-collapse mt-2">
                <thead className="bg-[#0A2478] text-white text-sm">
                  <tr>
                    <th className="px-4 py-2 text-left border-r w-[100px]">Date</th>
                    <th className="px-4 py-2 text-left border-r">Type</th>
                    <th className="px-4 py-2 text-left border-r w-[100px]">Funding Rate</th>
                    <th className="px-4 py-2 text-left border-r w-[100px]">Actual Rate</th>
                    <th className="px-4 py-2 text-left border-r w-[200px]">Added By</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  {data.length === 0 && !isLoading ? (
                    <tr>
                      <td colSpan="5" className="py-10 text-center">
                        <p className="text-lg text-gray-500">No Data Found</p>
                      </td>
                    </tr>
                  ) : (
                    data.map((row, index) => (
                      <tr
                        key={row.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2">{formatIndianDate(row.push_date)}</td>
                        <td className="px-4 py-2">{row.metalType}</td>
                        <td className="px-4 py-2">{row.gold_rate}</td>
                        <td className="px-4 py-2">{row.actual_rate}</td>
                        <td className="px-4 py-2">{row.added_by}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="mt-5">
           

            {/* <div className="flex items-center gap-4 mb-2 w-full">
             
              <p
                className="font-semibold text-[#0A2478]"
                style={{
                  fontFamily: "Playfair Display",
                  fontSize: "23.23px",
                  lineHeight: "148%",
                }}
              >
                Silver rate
              </p>

           
              <div className="flex items-center">
                <div className="flex items-center border border-gray-300 rounded-[4px] overflow-hidden h-[32px]">
                  <input
                    type="date"
                    value={filterDateSilver}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      setFilterDateSilver(newDate);
                      fetchSilverRates(1, newDate);
                    }}
                    className="px-2 py-1 text-[11px] outline-none border-none h-full bg-white"
                  />

                  <button
                    onClick={() => {
                      setFilterDateSilver("");
                      fetchSilverRates(1, "");
                    }}
                    className="bg-[#0A2478] text-white text-[10px] px-3 h-full font-medium hover:bg-[#071d45] transition-colors border-l border-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div> */}

            <div className="overflow-x-auto  w-[620px] h-[500px]">
              <table className="w-[620px] border-collapse mt-2">
                <thead className="bg-[#0A2478] text-white text-sm">
                  <tr>
                    <th className="px-4 py-2 text-left border-r w-[100px]">Date</th>
                    <th className="px-4 py-2 text-left border-r">Type</th>
                    <th className="px-4 py-2 text-left border-r w-[100px]">Funding Rate</th>
                    <th className="px-4 py-2 text-left border-r w-[100px]">Actual Rate</th>
                    <th className="px-4 py-2 text-left border-r w-[200px]">Added By</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  {Silverdata.length === 0 && !isLoading ? (
                    <tr>
                      <td colSpan="5" className="py-20 text-center">
                        <p className="text-lg text-gray-500">No Data Found</p>
                      </td>
                    </tr>
                  ) : (
                    Silverdata.map((row, index) => (
                      <tr
                        key={row.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2">{formatIndianDate(row.push_date)}</td>
                        <td className="px-4 py-2">{row.metalType}</td>
                        <td className="px-4 py-2">{row.Silver_rate}</td>
                        <td className="px-4 py-2">{row.actual_rate}</td>
                        <td className="px-4 py-2">{row.added_by}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPageForSilver}
              totalPages={totalPagesForSilver}
              onPageChange={handlePageChangeForSilver}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushGoldRateList;
