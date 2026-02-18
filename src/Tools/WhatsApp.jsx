import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";

const WhatsApp = () => {
  const [form, setForm] = useState({
    apiUrl: "",
    token: "",
    instanceId: "",
    phoneNumberId: "",
    webhookUrl: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  // 🔹 Fetch existing config
  const fetchConfig = async () => {
    try {
      const res = await axios.get(`${API}/whatsapp/config`);
      if (res.data) {
        setForm(res.data);
      }
    } catch (err) {
      console.error("Error fetching config", err);
    }
  };

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Save / Update config
  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(`${API}/whatsapp/config`, form);
      alert("WhatsApp configuration saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving config");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Test API connection
  const testConnection = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/whatsapp/test`, form);
      alert(res.data.message || "Connection successful");
    } catch (err) {
      console.error(err);
      alert("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-[900px] bg-white shadow rounded-lg p-6 border">
        <h2 className="text-[#0A2472] font-bold text-xl mb-6">
          WhatsApp API Configuration
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
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
              type="text"
              name="token"
              value={form.token}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Instance ID</label>
            <input
              type="text"
              name="instanceId"
              value={form.instanceId}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Phone Number ID</label>
            <input
              type="text"
              name="phoneNumberId"
              value={form.phoneNumberId}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Webhook URL</label>
            <input
              type="text"
              name="webhookUrl"
              value={form.webhookUrl}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-[#0A2472] text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Configuration"}
          </button>

          <button
            onClick={testConnection}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Test Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
