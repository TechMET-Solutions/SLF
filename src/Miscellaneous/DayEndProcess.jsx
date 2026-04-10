import axios from "axios";
import { Save, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "../api";

const DayEndProcess = () => {
  const [dayEndDate, setDayEndDate] = useState("");
const [originalDate, setOriginalDate] = useState("");
  const user = JSON.parse(sessionStorage.getItem("userData"));

  const getFormattedToday = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Jan is 0
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const today = getFormattedToday();
const getTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

const tomorrow = getTomorrow();
  // 2. Strict Comparison
  const isAlreadyProcessed = dayEndDate === tomorrow;
  useEffect(() => {
    fetchDate();
  }, []);
  const fetchDate = async () => {
  try {
    const res = await axios.get(`${API}/Master/getDayEndDate`, {
      params: {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
    });

    const apiDate = res.data.date;
    setOriginalDate(apiDate); // ✅ store original

    if (apiDate) {
      const [day, month, year] = apiDate.split("/");
      const dateObj = new Date(year, month - 1, day);

      dateObj.setDate(dateObj.getDate() + 1);

      const dd = String(dateObj.getDate()).padStart(2, "0");
      const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
      const yyyy = dateObj.getFullYear();

      setDayEndDate(`${dd}/${mm}/${yyyy}`);
    }
  } catch (err) {
    console.log(err);
  }
};

  // =========================
  // UPDATE DAY END
  // =========================
  const handleUpdate = async () => {
    try {
      const res = await axios.post(`${API}/Master/updateDayEnd`, {
        userId: user.id,
        isAdmin: user.isAdmin,
        dayEndDate: originalDate, // ✅ pass here
      });

      alert("Day End Completed ✅");

      const updatedUser = {
        ...user,
        dayEndProcess: res.data.date,
      };

      sessionStorage.setItem("userData", JSON.stringify(updatedUser));
      fetchDate();
      // window.location.href = "/";
    } catch (err) {
      alert("Failed ❌");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex w-[1462px] ml-[25px]">
        <div className="w-full bg-white px-6 py-1 border">
          <h2 className="text-red-600 font-bold text-xl">Day-End Process</h2>
        </div>
      </div>

      <main className="p-5">
        <div className="border bg-white">
          <div className="bg-blue-900 text-white p-2">Day-End Process</div>

          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm">Day-End Process as On *</label>

              <input
                type="text"
                value={dayEndDate}
                disabled
                className="border bg-gray-100 p-1 w-48"
              />
            </div>

            <div className="flex">
              <button
                onClick={handleUpdate}
                disabled={isAlreadyProcessed}
                className={`flex items-center px-4 py-1 text-white transition-all ${
                  isAlreadyProcessed
                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md active:transform active:scale-95"
                }`}
              >
                <Save size={16} className="mr-2" />
                {isAlreadyProcessed ? "Process Already Done" : "Update Day End"}
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="bg-blue-600 text-white px-4 py-1 flex items-center ml-2"
              >
                <XCircle size={16} className="mr-2" />
                Exit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DayEndProcess;
