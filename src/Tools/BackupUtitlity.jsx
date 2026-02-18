import React from 'react';

const BackupUtility = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      
      <div className="p-4 flex-grow">
        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          {/* Section Header */}
          <div className="bg-[#107c7c] text-white p-2 px-4 font-semibold text-sm">
            Database Backup
          </div>

          {/* Action Bar */}
          <div className="p-2 border-b border-gray-300 bg-white">
            <button 
              className="bg-[#005a9c] text-white px-8 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-blue-800 transition-colors shadow-sm"
              onClick={() => console.log("Backup initiated")}
            >
              <span className="text-xs">💾</span> Backup
            </button>
          </div>

          {/* Empty Space / Results Area */}
          <div className="h-[400px] bg-white">
            {/* This mimics the empty white space in your screenshot */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#005a9c] text-white text-center py-2 text-[10px]">
        © Copyright Maraekat Infotech Ltd, 2015. All rights reserved
      </footer>
    </div>
  );
};

export default BackupUtility;