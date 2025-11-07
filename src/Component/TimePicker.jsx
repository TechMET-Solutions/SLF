import React, { useState, useEffect } from "react";

export const TimePicker = ({ 
  initialTime = "", 
  onSave, 
  onCancel 
}) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState("AM");
  const [isOpen, setIsOpen] = useState(false);

  // 🕒 Parse the initial time correctly
  useEffect(() => {
    if (initialTime) {
      const [time, mod] = initialTime.split(" ");
      const [h, m] = time.split(":").map(Number);
      setHours(h);
      setMinutes(m);
      setPeriod(mod || "AM");
    }
  }, [initialTime]);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  // ⬆️ Increment/decrement handlers
  const changeHour = (delta) => {
    let newH = hours + delta;
    if (newH > 12) newH = 1;
    if (newH < 1) newH = 12;
    setHours(newH);
  };

  const changeMinute = (delta) => {
    let newM = minutes + delta;
    if (newM >= 60) newM = 0;
    if (newM < 0) newM = 59;
    setMinutes(newM);
  };

  const togglePeriod = () => {
    setPeriod(period === "AM" ? "PM" : "AM");
  };

  const handleSave = () => {
    onSave?.(formattedTime);
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <div className="relative w-[120px]">
      {/* Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 py-1 border border-gray-300 rounded cursor-pointer bg-white text-center hover:border-blue-500"
      >
        {formattedTime}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-1 left-0 bg-white border rounded-lg shadow-lg w-56 p-3">
          <div className="flex justify-center items-center gap-5">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => changeHour(1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1"
              >
                ▲
              </button>
              <div className="text-xl font-semibold">
                {hours.toString().padStart(2, "0")}
              </div>
              <button
                onClick={() => changeHour(-1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1"
              >
                ▼
              </button>
              <div className="text-xs text-gray-500 mt-1">HOUR</div>
            </div>

            <div className="text-xl font-semibold">:</div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => changeMinute(1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1"
              >
                ▲
              </button>
              <div className="text-xl font-semibold">
                {minutes.toString().padStart(2, "0")}
              </div>
              <button
                onClick={() => changeMinute(-1)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1"
              >
                ▼
              </button>
              <div className="text-xs text-gray-500 mt-1">MIN</div>
            </div>

            {/* AM/PM */}
            <div className="flex flex-col items-center">
              <button
                onClick={togglePeriod}
                className="bg-blue-100 hover:bg-blue-200 rounded-full px-3 py-2 font-bold text-blue-800"
              >
                {period}
              </button>
              <div className="text-xs text-gray-500 mt-1">PERIOD</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex mt-3 gap-2">
            <button
              onClick={handleCancel}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white rounded px-2 py-1 text-sm hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
