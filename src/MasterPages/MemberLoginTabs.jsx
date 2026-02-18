import { useState } from "react";
import MemberLoginPeriod from "./MemberLoginPeriod";
import MemberLoginDetails from "./MemberLoginDetails"; // you will create this

const MemberLoginTabs = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="min-h-screen w-full">
      {/* Tabs Header */}
      <div className="flex justify-center mt-6">
        <div className="flex border rounded overflow-hidden shadow">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-6 py-2 text-sm font-semibold ${
              activeTab === "details"
                ? "bg-[#0A2472] text-white"
                : "bg-white text-[#0A2472]"
            }`}
          >
            Member Login Details
          </button>

          <button
            onClick={() => setActiveTab("period")}
            className={`px-6 py-2 text-sm font-semibold ${
              activeTab === "period"
                ? "bg-[#0A2472] text-white"
                : "bg-white text-[#0A2472]"
            }`}
          >
            Member Login Period
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "details" && <MemberLoginDetails />}
        {activeTab === "period" && <MemberLoginPeriod />}
      </div>
    </div>
  );
};

export default MemberLoginTabs;
