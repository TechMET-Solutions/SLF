// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

// const Dashboard = () => {
//   return (
//     <div>
//        this is dashbaord 
//     </div>
//   )
// }

// export default Dashboard

// BankingDashboard.jsx
// Tailwind CSS required. No extra dependencies.

export default function Dashboard() {
  const stats = [
    { id: 1, title: "Total Deposits", value: "₹ 124,58,320", icon: "💰" },
    { id: 2, title: "Active Accounts", value: "4,120", icon: "👥" },
    { id: 3, title: "New Loans", value: "₹ 25,90,000", icon: "💳" },
    { id: 4, title: "Net Growth", value: "+3.8%", icon: "📈" },
  ];

  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

// If Admin → FULL ACCESS
if (userData.isAdmin || userData.permissions === "all") {
  window.userIsAdmin = true;
  console.log("ADMIN → FULL ACCESS ENABLED");
} else {
  window.userIsAdmin = false;
}

  const loggedUser = JSON.parse(sessionStorage.getItem("userData") || "{}");
const isAdmin = loggedUser.isAdmin || loggedUser.permissions === "all";
const empIdToUse = isAdmin ? loggedUser?.id : loggedUser?.id;
console.log(empIdToUse,"empIdToUse")
const [isPunchedIn, setIsPunchedIn] = useState(false);
const [isPunchedOut, setIsPunchedOut] = useState(false);

  const quickActions = [
    "Create Account",
    "Approve Loan",
    "Funds Transfer",
    "Generate Statement",
  ];

  const transactions = [
    { id: 1, name: "Ravi Sharma", type: "Credit", amount: "₹ 25,000", date: "2025-09-16", status: "Completed" },
    { id: 2, name: "Asha Patel", type: "Debit", amount: "₹ 4,500", date: "2025-09-16", status: "Pending" },
    { id: 3, name: "MF Holdings", type: "Credit", amount: "₹ 1,20,000", date: "2025-09-15", status: "Completed" },
    { id: 4, name: "Rajesh & Co.", type: "Debit", amount: "₹ 75,900", date: "2025-09-14", status: "Failed" },
  ];

  const handlePunchIn = async () => {
  try {
    if (!empIdToUse) {
      alert("Employee ID missing!");
      return;
    }

    const payload = {
      emp_id: empIdToUse,
      punch_in: new Date().toLocaleTimeString(),
      date: new Date().toISOString().split("T")[0]  // YYYY-MM-DD
    };

    await axios.post(`${API}/Transactions/punch-in`, payload, {
      headers: { "Content-Type": "application/json" }
    });

    setIsPunchedIn(true);
    alert("Punch In Successful");
  } catch (err) {
    console.error(err);
    alert("Punch In failed");
  }
};



const handlePunchOut = async () => {
  try {
    if (!empIdToUse) {
      alert("Employee ID missing!");
      return;
    }

    const payload = {
      emp_id: empIdToUse,
      punch_out: new Date().toLocaleTimeString(),
      date: new Date().toISOString().split("T")[0]
    };

    await axios.post(`${API}/Transactions/punch-out`, payload, {
      headers: { "Content-Type": "application/json" }
    });

    setIsPunchedOut(true);
    alert("Punch Out Successful");
  } catch (err) {
    console.error(err);
    alert("Punch Out failed");
  }
};

const checkTodayPunch = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const res = await axios.get(`${API}/Transactions/get-today`, {
      params: {
        emp_id: empIdToUse,
        date: today
      }
    });

    const data = res.data;

    // If punch-in already done
    if (data.punch_in) {
      setIsPunchedIn(true);
    }

    // If punch-out already done
    if (data.punch_out) {
      setIsPunchedOut(true);
    }

  } catch (err) {
    console.error("Error checking today punch:", err);
  }
  };
  useEffect(() => {
  if (empIdToUse) {
    checkTodayPunch();
  }
}, [empIdToUse]);


  return (
    <div className="min-h-screen bg-[#F6F3EE] text-slate-800 flex">
      {/* Sidebar */}
     
      {/* Main */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <span className="text-sm text-slate-500">Overview of banking operations</span>
          </div>

          <div className="flex items-center gap-3">
            {!window.userIsAdmin && (
              <>
                <button
  onClick={handlePunchIn}
  disabled={isPunchedIn}
  className={`px-4 py-2 rounded text-white 
    ${isPunchedIn ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}`}
>
  {isPunchedIn ? "Punched In" : "Punch In"}
            </button>
            
            <button
  onClick={handlePunchOut}
  disabled={isPunchedOut}
  className={`px-4 py-2 rounded text-white 
    ${isPunchedOut ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}`}
>
  {isPunchedOut ? "Punched Out" : "Punch Out"}
</button>
              </>
         

            )}
            <div className="relative">
              <input className="border rounded-lg px-3 py-2 w-64 bg-white" placeholder="Search transactions, accounts..." />
              <span className="absolute right-3 top-2.5 text-slate-400">🔍</span>
            </div>
            <button className="p-2 rounded-lg bg-white shadow-sm">🔔</button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0A2478] text-white flex items-center justify-center">SP</div>
              <div className="text-sm">
                <div className="font-medium">Sumit Pathak</div>
                <div className="text-xs text-slate-400">Branch Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">{s.title}</div>
                  <div className="text-lg font-semibold mt-1">{s.value}</div>
                </div>
                <div className="p-3 bg-[#F1F6FF] rounded-lg text-[#0A2478] text-lg">{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: charts / KPIs */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Deposit & Loan Trend</h3>
                <div className="text-xs text-slate-400">Last 30 days</div>
              </div>
              <div className="h-56 flex items-center justify-center border rounded-md border-dashed border-slate-200">
                <div className="text-slate-400">[Chart Placeholder]</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-3">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-slate-400 text-xs">
                    <tr>
                      <th className="py-2">Name</th>
                      <th className="py-2">Type</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="border-b">
                        <td className="py-3">{t.name}</td>
                        <td className="py-3">{t.type}</td>
                        <td className="py-3 font-medium">{t.amount}</td>
                        <td className="py-3 text-xs text-slate-500">{t.date}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${t.status === 'Completed' ? 'bg-green-100 text-green-700' : t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Right: widgets */}
          <aside className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <h4 className="font-semibold">Loan Pipeline</h4>
              <div className="mt-3 text-sm text-slate-500">Applications in different stages</div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs">Sanctioned</div>
                  <div className="font-medium">420</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs">Under Review</div>
                  <div className="font-medium">78</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs">Rejected</div>
                  <div className="font-medium">12</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <h4 className="font-semibold">Branch Performance</h4>
              <div className="mt-3 text-sm text-slate-500">Top 3 branches</div>
              <ol className="mt-3 list-decimal ml-5 text-sm">
                <li>Andheri — ₹ 48L</li>
                <li>Bandra — ₹ 39L</li>
                <li>Powai — ₹ 31L</li>
              </ol>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <h4 className="font-semibold">Compliance</h4>
              <div className="mt-3 text-sm text-slate-500">No pending alerts</div>
            </div>
          </aside>
        </div>

        <footer className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} BankX — Internal Dashboard</footer>
      </main>
    </div>
  );
}