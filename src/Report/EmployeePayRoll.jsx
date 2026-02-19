import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeePayRoll = () => {
  const navigate = useNavigate();

  const [selectedEmpId, setSelectedEmpId] = useState(2);
  
  // Navbar Colors from your screenshot
  const navBlue = "bg-[#0c1a44]";
  const textBlue = "text-[#0c1a44]";

  // 1. Mock Employee Data
  const employees = [
    { id: 1, name: "Arjun Sharma", role: "Manager", baseSalary: 85000 },
    { id: 2, name: "John Doe", role: "UI Designer", baseSalary: 45000 },
    { id: 14, name: "Rahul Verma", role: "Developer", baseSalary: 60000 }
  ];

  // 2. Mock Attendance Data (Matches your phpMyAdmin structure)
  const attendanceRecords = [
    { emp_id: 2, date: '2026-02-01', punch_in: '09:00 AM' },
    { emp_id: 2, date: '2026-02-02', punch_in: '09:15 AM' },
    { emp_id: 2, date: '2026-02-03', punch_in: '09:05 AM' },
    { emp_id: 2, date: '2026-02-05', punch_in: '08:55 AM' },
    // ... add more records
  ];

  // Helper to generate days of the month
  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);

  const currentEmp = employees.find(e => e.id === selectedEmpId);
  const presentDaysCount = attendanceRecords.filter(r => r.emp_id === selectedEmpId).length;
  const totalDays = 28; // February
  const absentDays = totalDays - presentDaysCount;

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center px-6 py-4 w-[1290px] h-[62px] rounded-[11px] border border-gray-200 justify-between shadow-sm bg-white">
          {/* Left Side: Title */}
          <h2 className="text-red-600 font-bold text-[20px] leading-[148%] whitespace-nowrap">
            Payroll & Attendance
          </h2>

          <div className="flex items-center gap-3  pl-6 border-gray-200">
            <button
              onClick={() => navigate("/")}
              className="w-[70px] h-[26px] rounded-[4px] bg-[#C1121F] text-white text-[11px] font-medium transition-colors hover:bg-[#a40f1a]"
            >
              Exit
            </button>
          </div>
        </div>

        <div className={`${navBlue} text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center`}>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Payroll & Attendance</h1>
            <p className="text-blue-200 text-sm">Reviewing records for Feb 2026</p>
          </div>
          <select 
            className="mt-4 md:mt-0 p-2 rounded bg-white/10 border border-white/20 text-white outline-none cursor-pointer"
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(Number(e.target.value))}
          >
            {employees.map(emp => <option key={emp.id} value={emp.id} className="text-black">{emp.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Profile & Attendance Visual */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 ${navBlue} text-white rounded-full flex items-center justify-center text-xl font-bold`}>
                  {currentEmp.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">{currentEmp.name}</h2>
                  <p className="text-gray-500 text-sm">{currentEmp.role}</p>
                </div>
              </div>

              {/* Attendance Tracker Grid */}
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Attendance Calendar</h3>
              <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map(day => {
                  const dateStr = `2026-02-${day.toString().padStart(2, '0')}`;
                  const isPresent = attendanceRecords.some(r => r.emp_id === selectedEmpId && r.date === dateStr);
                  return (
                    <div 
                      key={day}
                      title={isPresent ? `Present on Feb ${day}` : `Absent on Feb ${day}`}
                      className={`h-8 flex items-center justify-center text-[10px] font-bold rounded ${
                        isPresent ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-50 text-red-400 border border-red-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-between text-xs font-medium border-t pt-4">
                <span className="text-green-600">● Present: {presentDaysCount}</span>
                <span className="text-red-500">● Absent: {absentDays}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Salary Report */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
              <div className="bg-gray-50 border-b p-4 flex justify-between items-center">
                <span className="font-bold text-gray-700">Salary Breakdown</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase">₹ Rupees</span>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Earnings */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Earnings (+)</p>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-600">Basic Salary</span>
                      <span className="font-bold">₹{currentEmp.baseSalary.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-red-400">Deductions (-)</p>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 text-sm">Loss of Pay ({absentDays} days)</span>
                      <span className="text-red-500 font-bold">-₹{Math.round((currentEmp.baseSalary / totalDays) * absentDays).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600 text-sm">PF (12%)</span>
                      <span className="text-red-500 font-bold">-₹{Math.round(currentEmp.baseSalary * 0.12).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Final Net Pay */}
                <div className="mt-12 p-8 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-sm font-bold text-blue-900/60 uppercase mb-1">Total Net Payable</p>
                    <p className={`text-5xl font-black ${textBlue}`}>
                      ₹{Math.round(currentEmp.baseSalary - ((currentEmp.baseSalary / totalDays) * absentDays) - (currentEmp.baseSalary * 0.12) - 200).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button className={`${navBlue} text-white px-10 py-4 rounded-xl font-black tracking-widest shadow-xl hover:scale-105 transition-all`}>
                    PRINT PAYSLIP
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeePayRoll;