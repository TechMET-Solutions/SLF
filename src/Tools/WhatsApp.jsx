import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const WhatsApp = () => {
  const [form, setForm] = useState({
    apiUrl: "",
    token: "",
    instanceId: "",
    phoneNumberId: "",
    webhookUrl: "",
    interest_due_reminder_1: "",
    emi_due_reminder_days: "",
    emi_due_upcoming: "",
    emi_overdue_alert: "",
    emi_bounce_charge_alert: "",
    loan_tenure_ends_reminder_1: "",
    loan_tenure_ends_reminder_2: "",
    loan_tenure_extension_update: "", // 🆕 New Field
    auction_notice_reminder_1: "",
    auction_notice_reminder_2: "",
    loan_auction_grace_period_alert: "", // 🆕 New Field
    tenurereminderone: "",
    auctionnoticeone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await axios.get(`${API}/api/whatsapp/config`);
      if (res.data) {
        setForm((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error("Error fetching config", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(`${API}/api/whatsapp/Addconfig`, form);
      alert("WhatsApp configuration and reminders saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving config");
    } finally {
      setLoading(false);
    }
  };

  // const testConnection = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(`${API}/whatsapp/test`, form);
  //     alert(res.data.message || "Connection successful");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Connection failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Helper for rendering labeled inputs
  const renderInput = (label, name, placeholder = "Days") => (
    <div className="flex flex-col">
      <label className="font-semibold text-gray-700 text-xs mb-1 uppercase tracking-tight">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={form[name] || ""}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="flex justify-center mt-8 pb-20">
      <div className="w-[1000px] bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <h2 className="text-[#0A2472] font-bold text-2xl mb-8 border-b pb-4">
          WhatsApp API Configuration
        </h2>

        {/* SECTION 1: API SETTINGS */}
        <div className="mb-10">
          <h3 className="text-blue-600 font-bold mb-4 text-sm uppercase">
            Connection Details
          </h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="col-span-2">
              <label className="font-semibold">API URL</label>
              <input
                type="text"
                name="apiUrl"
                value={form.apiUrl}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
                placeholder="https://api.whatsapp.com/..."
              />
            </div>
            <div>
              <label className="font-semibold">Access Token</label>
              <input
                type="password"
                name="token"
                value={form.token}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            {/* <div>
              <label className="font-semibold">Webhook URL</label>
              <input
                type="text"
                name="webhookUrl"
                value={form.webhookUrl}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div> */}
            {/* {renderInput("Instance ID", "instanceId", "ID")}
            {renderInput("Phone Number ID", "phoneNumberId", "ID")} */}
          </div>
        </div>

        {/* SECTION 2: REMINDER SETTINGS */}
        <h3 className="text-blue-600 font-bold mb-6 text-sm uppercase border-t pt-8">
          Notification Intervals (In Days)
        </h3>

        <div className="space-y-8">
          {/* EMI & Interest Group */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 font-bold text-[10px] mb-3 uppercase italic">
              EMI & Interest Reminders
            </p>
            <div className="grid grid-cols-4 gap-4">
              {renderInput("Interest Due (1)", "interest_due_reminder_1")}
              {renderInput("EMI Due Days", "emi_due_reminder_days")}
              {renderInput("EMI Upcoming", "emi_due_upcoming")}
              {renderInput("EMI Overdue", "emi_overdue_alert")}
              {renderInput("EMI Bounce", "emi_bounce_charge_alert")}
            </div>
          </div>

          {/* Tenure Group */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 font-bold text-[10px] mb-3 uppercase italic">
              Loan Tenure Reminders
            </p>
            <div className="grid grid-cols-4 gap-4">
              {/* {renderInput("Tenure Rem (1)", "tenurereminderone")} */}
              {renderInput("Ends Rem (1)", "loan_tenure_ends_reminder_1")}
              {renderInput("Ends Rem (2)", "loan_tenure_ends_reminder_2")}
              {renderInput("Extension Update", "loan_tenure_extension_update")}
            </div>
          </div>

          {/* Auction Group */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 font-bold text-[10px] mb-3 uppercase italic">
              Auction & Legal Notices
            </p>
            <div className="grid grid-cols-4 gap-4">
              {renderInput("Auction Notice (1)", "auctionnoticeone")}
              {renderInput("Auction Rem (1)", "auction_notice_reminder_1")}
              {renderInput("Auction Rem (2)", "auction_notice_reminder_2")}
              {renderInput(
                "Grace Period Alert",
                "loan_auction_grace_period_alert",
              )}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-12 border-t pt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#0A2472] hover:bg-[#143085] text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Saving Settings..." : "Save Configuration"}
          </button>

          {/* <button
            onClick={testConnection}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            Test Connection
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
