import { useState } from "react";
import { API } from "../api";
import reactlogo from "../assets/LoginBanner.png";

function LoginPage() {
  const [showExtra, setShowExtra] = useState(false);
  const [tempLogin, setTempLogin] = useState({});
const [emailCorrect, setEmailCorrect] = useState(false);

    
const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target.email?.value;
  const password = e.target.password?.value;
  const branch = e.target.branch?.value;
  const year = e.target.year?.value;

  // -----------------------------
  // STEP 1 → Admin Login (NO API)
  // -----------------------------
  if (!showExtra && email === "admin@gmail.com" && password === "123") {
    setTempLogin({
      id: 0,
      email: "admin@gmail.com",
      role: "Admin",
      isAdmin: true,              // IMPORTANT FLAG
      permissions: "all",         // full access
    });

    setShowExtra(true);           // show Branch + Year
    setEmailCorrect(true);        // allow Step 2
    return;                       // stop here
  }

  // -----------------------------------
  // STEP 1 → Non-admin Login (Call API)
  // -----------------------------------
  if (!showExtra) {
    try {
      const res = await fetch(`${API}/Master/Emp-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.status) {
        alert(data.message);
        return;
      }

      // Save user info for Step 2
      setTempLogin(data.user);
      setShowExtra(true);
      setEmailCorrect(true);

    } catch (err) {
      alert("Server Problem");
    }

    return;
  }

  // -------------------------------
  // STEP 2 → Validate Branch + Year
  // -------------------------------
  if (!branch || !year) {
    alert("Please select branch & financial year");
    return;
  }

  // -------------------------------
  // STEP 2 → Save final user session
  // -------------------------------
  const finalUserData = {
    ...tempLogin,
    branch,
    financialYear: year,
    loginTime: new Date().toISOString(),
  };

  sessionStorage.setItem("isLoggedIn", "true");
  sessionStorage.setItem("userData", JSON.stringify(finalUserData));

  // Redirect to dashboard
  window.location.href = "/";
};


  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-gray-200">
        <div className="flex border-2 border-blue-200 w-[1156px] h-[650px] bg-gray-200 rounded-lg shadow-lg overflow-hidden">
          
          {/* Left Section */}
          <div className="bg-[#0048B3] w-1/2 h-full flex items-center justify-center relative">
            <img
              src={reactlogo}
              alt="Banner"
              className="w-[500px] h-auto object-contain"
            />
          </div>

          {/* Right Section */}
          <div className="w-1/2 h-full bg-[#F7F9FC] overflow-y-auto">
            <div
              className={`w-full max-w-md space-y-6 mx-auto px-8 ${
                showExtra ? "pt-[20px]" : "pt-[70px]"
              }`}
            >
              <div className="flex justify-center">
                <img className="w-16 h-16" src="/logo.svg" alt="Logo" />
              </div>

              <h2 className="text-center text-2xl font-semibold text-gray-800">
                Login to Secure Portal
              </h2>

              <form onSubmit={handleLogin} className="space-y-2 mt-4">
                
                {/* FIRST STEP FIELDS */}
                <label className="text-sm font-semibold">Email-ID</label>
                <div className="w-full flex items-center bg-white border border-gray-300 px-2 py-1.5 shadow-sm rounded-md">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email-ID"
                    autoComplete="off"
                    disabled={showExtra}   // lock after step 1
                    className="flex-1 focus:outline-none"
                  />
                </div>

                <label className="text-sm font-semibold">Password</label>
                <div className="w-full flex items-center bg-white border border-gray-300 px-3 py-2 shadow-sm rounded-md">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    disabled={showExtra}   // lock after step 1
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                </div>

                {!showExtra && (
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <label className="text-sm">Remember me</label>
                  </div>
                )}

                {/* SECOND STEP FIELDS */}
                {showExtra && (
                  <>
                    <label className="text-sm font-semibold">Branch</label>
                    <select
                      name="branch"
                      className="w-full border border-gray-300 bg-white px-3 py-2 shadow-sm rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="Nashik-Road">Nashik-Road</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Bhagur">Bhagur</option>
                    </select>

                    <label className="text-sm font-semibold">
                      Financial Year
                    </label>
                    <select
                      name="year"
                      className="w-full border border-gray-300 bg-white px-3 py-2 shadow-sm rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="2023-2024">01/04/2023-31/03/2024</option>
                      <option value="2024-2025">01/04/2024-31/03/2025</option>
                    </select>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                >
                  {showExtra ? "Continue to Dashboard" : "Login"}
                </button>
              </form>

              <div className="text-center text-sm text-gray-500 pt-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a href="#" className="hover:underline">
                  Terms
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default LoginPage;
