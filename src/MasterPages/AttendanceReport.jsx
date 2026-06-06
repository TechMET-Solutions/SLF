import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../api';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
const AttendanceReport = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState({ month: new Date().toISOString().slice(0, 7) });
  const [loading, setLoading] = useState(false);

  // 1. Generate array of dates for the selected month
  const getDaysInMonth = (monthStr) => {
    const [year, month] = monthStr.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(filters.month);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [empRes, attRes] = await Promise.all([
          axios.get(`${API}/Master/Employee_Profile/getAll-employees?limit=100`),
          axios.get(`${API}/Master/get-records`, { params: { month: filters.month } })
        ]);
        setEmployees(empRes.data.items || []);
        setRecords(attRes.data.records || []);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters.month]);

  // 2. Helper to find record for a specific cell
  const getAttendanceStatus = (empId, date) => {
    const dateStr = date.toISOString().split('T')[0];
    const record = records.find(r => 
      r.emp_id === empId && 
      new Date(r.date).toISOString().split('T')[0] === dateStr
    );
    
    if (!record) return { label: '-', class: 'bg-white' };
    if (record.status === 'Leave' || !record.punch_in) {
      return { label: 'LEAVE', class: 'bg-red-600 text-white font-bold' };
    }
    return { label: `${record.punch_in} - ${record.punch_out || '??'}`, class: 'bg-white text-[10px]' };
  };

  const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Attendance Report');

  // Define Columns: First is Date, then all Employee Names
  const columns = [
    { header: 'Date \\ Name', key: 'date', width: 15 },
    ...employees.map(emp => ({ header: emp.emp_name, key: emp.id.toString(), width: 20 }))
  ];
  worksheet.columns = columns;

  // Add Data Rows
  days.forEach((day) => {
    const isSunday = day.getDay() === 0;
    const rowData = { date: day.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) };
    
    employees.forEach(emp => {
      const status = getAttendanceStatus(emp.id, day);
      rowData[emp.id] = isSunday ? 'SUNDAY' : status.label;
    });

    const row = worksheet.addRow(rowData);

    // Styling logic for each cell in the row
    row.eachCell((cell, colNumber) => {
      cell.border = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'} };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };

      if (colNumber > 1) { // Skip the Date column for these styles
        const empId = employees[colNumber - 2].id;
        const status = getAttendanceStatus(empId, day);

        if (isSunday) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } }; // Grey
        } else if (status.label === 'LEAVE') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } }; // Red
          cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
        }
      }
    });
  });

  // Style Header
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).eachCell(cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0A2478' } };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `Attendance_${filters.month}.xlsx`);
};

const exportToPDF = () => {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(16);
    doc.text(`Master Attendance Report - ${filters.month}`, 14, 15);

    const tableColumn = ["Date", ...employees.map(emp => emp.emp_name)];
    
    const tableRows = days.map(day => {
      const isSunday = day.getDay() === 0;
      const dateStr = day.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      
      return [
        dateStr,
        ...employees.map(emp => {
          const status = getAttendanceStatus(emp.id, day);
          return isSunday ? 'SUNDAY' : status.label;
        })
      ];
    });

    // CHANGE IS HERE: Use autoTable(doc, { ... })
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: 'grid',
      styles: { 
        fontSize: 6, 
        cellPadding: 1, 
        halign: 'center', 
        valign: 'middle' 
      },
      headStyles: { fillColor: [10, 36, 120] },
      didParseCell: (data) => {
        if (data.section === 'body') {
          const cellValue = data.cell.text.join('').trim();
          if (cellValue === 'SUNDAY') {
            data.cell.styles.fillColor = [220, 220, 220];
          } 
          if (cellValue === 'LEAVE') {
            data.cell.styles.fillColor = [255, 0, 0];
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    doc.save(`Attendance_Report_${filters.month}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Check console: " + error.message);
  }
};
  return (
    <div className="p-5 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
       
        {/* Filter Header */}
        <div className="p-4 bg-[#0A2478] flex justify-between items-center">
                  <h2 className="font-bold uppercase tracking-wider text-white ">Master Attendance Sheet</h2>
                  <div className="flex gap-2">
                      <div className="flex gap-2">
  <button onClick={exportToExcel} className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">EXCEL</button>
  <button onClick={exportToPDF} className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">PDF</button>
  <button onClick={() => window.location.reload()} className="text-xs bg-white text-blue-700 px-3 py-1 rounded font-bold">REFRESH</button>
</div>
          <input 
            type="month" 
            className=" bg-white p-1 rounded" 
            value={filters.month} 
            onChange={(e) => setFilters({ month: e.target.value })}
          /> 
                  </div>
                  
        </div>

        {/* Scrollable Container */}
        <div className="overflow-auto max-h-[80vh]">
          <table className="w-full border-collapse table-fixed min-w-[max-content]">
            <thead>
              <tr className="bg-gray-200">
                <th className="sticky left-0 z-20 bg-gray-300 p-2 border w-32 shadow-md">Date \ Name</th>
                {employees.map(emp => (
                  <th key={emp.id} className="p-2 border text-[10px] w-28 text-center bg-gray-200 sticky top-0">
                    <div className="font-bold text-blue-900 truncate">{emp.emp_name}</div>
                    <div className="text-[9px] text-gray-500 uppercase">{emp.designation || 'Staff'}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const isSunday = day.getDay() === 0;
                return (
                  <tr key={day.toString()} className={isSunday ? "bg-yellow-50" : ""}>
                    {/* Date Column */}
                    <td className="sticky left-0 z-10 bg-gray-100 p-2 border text-xs font-bold shadow-sm">
                      {day.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', weekday: 'short' })}
                    </td>

                    {/* Employee Cells */}
                    {employees.map(emp => {
                      const data = getAttendanceStatus(emp.id, day);
                      return (
                        <td key={emp.id} className={`border p-1 text-center text-[9px] h-10 ${isSunday ? 'bg-gray-300' : data.class}`}>
                          {isSunday ? 'SUNDAY' : data.label}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;