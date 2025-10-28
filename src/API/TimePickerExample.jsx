import { useState } from "react";
import { TimePicker } from "../Component/ui/TimePicker";

// Example usage component
const TimePickerExample = () => {
  const [savedTime, setSavedTime] = useState('12:00 PM');
  const [showNotification, setShowNotification] = useState(false);

  const handleSaveTime = (time) => {
    setSavedTime(time);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCancelTime = () => {
    console.log('Time selection cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Time Picker Demo</h2>
        <p className="text-gray-600 mb-6">Select a time and save your preference</p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Time
          </label>
          <TimePicker
            initialTime={savedTime}
            onSave={handleSaveTime}
            onCancel={handleCancelTime}
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Saved Time:</h3>
          <p className="text-xl text-blue-600 font-mono">{savedTime}</p>
        </div>

        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            Time saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePickerExample;
