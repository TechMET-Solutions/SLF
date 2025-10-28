import React, { useState, useEffect } from 'react';

export const TimePicker = ({ initialTime = '09:00', onSave, onCancel }) => {
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');
  const [isOpen, setIsOpen] = useState(false);

  // Parse initial time
  useEffect(() => {
    if (initialTime) {
      const [time, mod] = initialTime.split(' ');
      const [h, m] = time.split(':');
      setHours(parseInt(h));
      setMinutes(parseInt(m));
      setPeriod(mod || 'AM');
    }
  }, [initialTime]);

  // Update selected time when hours, minutes, or period change
  useEffect(() => {
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    setSelectedTime(`${formattedHours}:${formattedMinutes} ${period}`);
  }, [hours, minutes, period]);

  const handleHourChange = (increment) => {
    let newHours = hours + increment;
    
    if (newHours > 12) newHours = 1;
    if (newHours < 1) newHours = 12;
    
    setHours(newHours);
  };

  const handleMinuteChange = (increment) => {
    let newMinutes = minutes + increment;
    
    if (newMinutes > 59) newMinutes = 0;
    if (newMinutes < 0) newMinutes = 59;
    
    setMinutes(newMinutes);
  };

  const togglePeriod = () => {
    setPeriod(period === 'AM' ? 'PM' : 'AM');
  };

  const handleSave = () => {
    if (onSave) {
      onSave(selectedTime);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setIsOpen(false);
  };

  const formatDisplayTime = () => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="relative">
      {/* Time Display Input */}
      <div
        className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">{formatDisplayTime()}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
          {/* Time Selection Controls */}
          <div className="flex justify-center items-center space-x-8 mb-6">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleHourChange(1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mb-2 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <div className="text-2xl font-semibold text-gray-800 w-12 text-center">
                {hours.toString().padStart(2, '0')}
              </div>
              <button
                onClick={() => handleHourChange(-1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mt-2 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="text-xs text-gray-500 mt-1">HOURS</div>
            </div>

            {/* Separator */}
            <div className="text-2xl font-semibold text-gray-800">:</div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleMinuteChange(1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mb-2 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <div className="text-2xl font-semibold text-gray-800 w-12 text-center">
                {minutes.toString().padStart(2, '0')}
              </div>
              <button
                onClick={() => handleMinuteChange(-1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mt-2 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="text-xs text-gray-500 mt-1">MINUTES</div>
            </div>

            {/* AM/PM Toggle */}
            <div className="flex flex-col items-center">
              <button
                onClick={togglePeriod}
                className="w-16 h-16 flex items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
              >
                <span className="text-lg font-semibold text-blue-800">{period}</span>
              </button>
              <div className="text-xs text-gray-500 mt-2">AM/PM</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



// import React, { useState, useEffect } from "react";

// export const TimePicker = ({ initialTime = "09:00 AM", onSave, onCancel }) => {
//   const [selectedTime, setSelectedTime] = useState(initialTime);
//   const [hours, setHours] = useState(12);
//   const [minutes, setMinutes] = useState(0);
//   const [period, setPeriod] = useState("AM");
//   const [isOpen, setIsOpen] = useState(false);

//   // Parse initial time
//   useEffect(() => {
//     if (initialTime) {
//       const [time, mod] = initialTime.split(" ");
//       const [h, m] = time.split(":");
//       setHours(parseInt(h));
//       setMinutes(parseInt(m));
//       setPeriod(mod || "AM");
//     }
//   }, [initialTime]);

//   // Update selected time
//   useEffect(() => {
//     const formattedHours = hours.toString().padStart(2, "0");
//     const formattedMinutes = minutes.toString().padStart(2, "0");
//     setSelectedTime(`${formattedHours}:${formattedMinutes} ${period}`);
//   }, [hours, minutes, period]);

//   const handleHourChange = (inc) => {
//     let newHours = hours + inc;
//     if (newHours > 12) newHours = 1;
//     if (newHours < 1) newHours = 12;
//     setHours(newHours);
//   };

//   const handleMinuteChange = (inc) => {
//     let newMinutes = minutes + inc;
//     if (newMinutes > 59) newMinutes = 0;
//     if (newMinutes < 0) newMinutes = 59;
//     setMinutes(newMinutes);
//   };

//   const togglePeriod = () => setPeriod(period === "AM" ? "PM" : "AM");

//   const handleSave = () => {
//     if (onSave) onSave(selectedTime);
//     setIsOpen(false);
//   };

//   const handleCancel = () => {
//     if (onCancel) onCancel();
//     setIsOpen(false);
//   };

//   const formatDisplayTime = () =>
//     `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")} ${period}`;

//   return (
//     <div className="relative w-full max-w-sm mx-auto">
//       {/* Display Input */}
//       <div
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex justify-between items-center">
//           <span className="text-gray-700 font-medium text-base sm:text-lg">
//             {formatDisplayTime()}
//           </span>
//           <svg
//             className={`w-5 h-5 text-gray-400 transition-transform ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Time Picker Dropdown */}
//       {isOpen && (
//         <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-4 sm:p-5 transition-all duration-200">
//           {/* Controls */}
//           <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-4 sm:space-y-0 mb-6">
//             {/* Hours */}
//             <div className="flex flex-col items-center">
//               <button
//                 onClick={() => handleHourChange(1)}
//                 className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mb-2"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 15l7-7 7 7"
//                   />
//                 </svg>
//               </button>
//               <div className="text-2xl sm:text-3xl font-semibold text-gray-800 w-12 text-center">
//                 {hours.toString().padStart(2, "0")}
//               </div>
//               <button
//                 onClick={() => handleHourChange(-1)}
//                 className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mt-2"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>
//               <div className="text-xs text-gray-500 mt-1">HOURS</div>
//             </div>

//             {/* Separator */}
//             <div className="text-2xl font-semibold text-gray-800 hidden sm:block">
//               :
//             </div>

//             {/* Minutes */}
//             <div className="flex flex-col items-center">
//               <button
//                 onClick={() => handleMinuteChange(1)}
//                 className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mb-2"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 15l7-7 7 7"
//                   />
//                 </svg>
//               </button>
//               <div className="text-2xl sm:text-3xl font-semibold text-gray-800 w-12 text-center">
//                 {minutes.toString().padStart(2, "0")}
//               </div>
//               <button
//                 onClick={() => handleMinuteChange(-1)}
//                 className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full mt-2"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>
//               <div className="text-xs text-gray-500 mt-1">MINUTES</div>
//             </div>

//             {/* AM/PM */}
//             <div className="flex flex-col items-center">
//               <button
//                 onClick={togglePeriod}
//                 className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-100 hover:bg-blue-200 rounded-full transition"
//               >
//                 <span className="text-base sm:text-lg font-semibold text-blue-800">
//                   {period}
//                 </span>
//               </button>
//               <div className="text-xs text-gray-500 mt-2">AM/PM</div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleCancel}
//               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Save Time
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
