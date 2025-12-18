// import React from 'react'

// const Contactus = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Contactus

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contactus() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // API integration later
  };

  return (
    <div className="bg-[#EEF2F7] min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div>
          <h1 className="text-3xl font-semibold text-orange-500 mb-8">
            Contact us
          </h1>

          <div className="flex items-start gap-4 mb-6">
            <MapPin className="text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">
                S Lunawat Finance Pvt Ltd
              </h3>
              <p className="text-gray-600 mt-1">
                318, Nehru Road, Bhadrug, Nashik,
                <br />
                Maharashtra 422502
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Phone className="text-green-500" />
            <p className="text-gray-700">
              9420406611, 9420406622
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Mail className="text-red-500" />
            <p className="text-gray-700">
              slf.bhagur@gmail.com
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition">
              f
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full border text-pink-600 cursor-pointer hover:bg-pink-600 hover:text-white transition">
              ⦿
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full border text-sky-500 cursor-pointer hover:bg-sky-500 hover:text-white transition">
              t
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-transparent"
        >
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Your Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-10 py-3 rounded-lg transition"
            >
              SUBMIT
            </button>

            <p className="text-green-600 text-sm">
              Your contact page.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
