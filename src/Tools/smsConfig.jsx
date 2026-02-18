import React from 'react';

const SmsConfig = () => {
  // Helper to render section blocks to keep code clean
  const FormSection = ({ title, hasCheckbox = true, hasNumberInput = false }) => (
    <div className="bg-white p-4 border rounded shadow-sm mb-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-semibold text-gray-700 underline cursor-pointer">
          {title}
        </label>
        {hasCheckbox && <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-600" />}
        {hasNumberInput && (
          <input 
            type="number" 
            defaultValue="0" 
            className="w-12 border rounded px-1 text-sm outline-none focus:border-teal-500" 
          />
        )}
      </div>
      <textarea className="w-full h-20 border rounded p-2 text-sm bg-gray-50 mb-2 focus:ring-1 focus:ring-teal-500 outline-none" />
      <div className="flex flex-col">
        <label className="text-xs font-bold text-gray-600">
          Data Url <span className="text-red-500">*</span>
        </label>
        <input type="text" className="w-full border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-teal-500 outline-none" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
     
      <div className="p-4">
        <div className="bg-white border rounded shadow-sm">
          {/* Form Title Bar */}
          <div className="bg-[#107c7c] text-white p-2 px-4 font-semibold text-sm rounded-t">
            SMS Config
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {/* Left Column */}
            <div>
              {/* Top Global Config */}
              <div className="mb-6 space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Provider <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Web Url <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border rounded px-2 py-1 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Data Url <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border rounded px-2 py-1 text-sm" />
                </div>
              </div>

              <FormSection title="When Loan Create ?" />
              <FormSection title="Interest Due Reminder 1" hasNumberInput={true} />
              <FormSection title="Loan Tenure ends Reminder 1" hasNumberInput={true} />
              <FormSection title="Auction Notice Reminder 1" hasNumberInput={true} />
              <FormSection title="Login OTP" />
            </div>

            {/* Right Column */}
            <div className="mt-0">
              <FormSection title="When Loan Receipt made ?" />
              <FormSection title="When Loan Redemption made ?" />
              <FormSection title="When Loan Approved ?" />
              <FormSection title="Interest Due Reminder 2" hasNumberInput={true} />
              <FormSection title="Loan Tenure ends Reminder 2" hasNumberInput={true} />
              <FormSection title="Auction Notice Reminder 2" hasNumberInput={true} />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="bg-gray-50 p-4 border-t flex justify-center gap-4">
            <button className="bg-[#005a9c] text-white px-6 py-1 rounded flex items-center gap-2 text-sm hover:bg-blue-800 shadow">
              💾 Save
            </button>
            <button className="bg-[#005a9c] text-white px-6 py-1 rounded flex items-center gap-2 text-sm hover:bg-blue-800 shadow">
              ✖ Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsConfig;