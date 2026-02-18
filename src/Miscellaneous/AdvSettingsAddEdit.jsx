import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdvSettingsAddEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Data passed from the Listing page via navigation state
  const editData = location.state?.rowData || null;
  const isEditMode = !!editData;

  const [formData, setFormData] = useState({
    dataType: '',
    dataCode: '',
    dataDisplay: '',
    dataValue: '',
    settingCategory: ''
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        dataType: editData.type || '',
        dataCode: editData.code || '',
        dataDisplay: editData.display || '',
        dataValue: editData.value || '',
        settingCategory: editData.category || ''
      });
    }
  }, [editData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="m-2 border border-[#008080] bg-white shadow-sm font-sans">
      {/* Dynamic Header based on mode */}
      <div className="bg-[#008080] text-white px-4 py-1.5 text-sm font-semibold">
        {isEditMode ? 'Modify Advance Setting' : 'Add Advance Setting'}
      </div>

      <div className="p-4 space-y-4">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center">
            <label className="w-32 text-xs text-gray-700">
              Data Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dataType"
              value={formData.dataType}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-1 text-xs focus:outline-none focus:border-[#008080] bg-gray-50"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-xs text-gray-700">
              Data Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dataCode"
              value={formData.dataCode}
              onChange={handleChange}
              disabled={isEditMode} // Usually codes are primary keys and shouldn't change
              className={`flex-1 border border-gray-300 p-1 text-xs focus:outline-none bg-gray-50 ${isEditMode ? 'cursor-not-allowed opacity-70' : ''}`}
            />
          </div>
        </div>

        {/* Second Row (Full Width Display) */}
        <div className="flex items-center">
          <label className="w-32 text-xs text-gray-700">
            Data Display <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="dataDisplay"
            value={formData.dataDisplay}
            onChange={handleChange}
            className="flex-1 border border-gray-300 p-1 text-xs focus:outline-none focus:border-[#008080] bg-gray-100"
          />
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center">
            <label className="w-32 text-xs text-gray-700">
              Data Value <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="dataValue"
              value={formData.dataValue}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-1 text-xs focus:outline-none focus:border-[#008080]"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-xs text-gray-700">
              Setting Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="settingCategory"
              value={formData.settingCategory}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-1 text-xs focus:outline-none focus:border-[#008080] bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-0.5 pt-2">
          <button 
            className="bg-[#1a5d9b] text-white px-8 py-1.5 text-xs flex items-center gap-2 hover:bg-blue-800 transition-colors"
            onClick={() => console.log("Saving:", formData)}
          >
            <span className="text-base">💾</span> Save
          </button>
          <button 
            className="bg-[#1a5d9b] text-white px-8 py-1.5 text-xs flex items-center gap-2 hover:bg-blue-800 transition-colors"
            onClick={() => navigate(-1)}
          >
            <span className="text-base">✖</span> Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvSettingsAddEdit;