// import axios from "axios";
// import { useEffect, useState } from "react";
// import { API } from "../api";
// import reactlogo from "../assets/LoginBanner.png";

// function LoginPage() {
//   const [showExtra, setShowExtra] = useState(false);
//   const [tempLogin, setTempLogin] = useState({});
//   const [emailCorrect, setEmailCorrect] = useState(false);

//   const [branches, setBranches] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const getCurrentFinancialYear = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth(); // 0 = Jan

//     let startYear, endYear;

//     if (month < 3) {
//       // Jan, Feb, Mar
//       startYear = year - 1;
//       endYear = year;
//     } else {
//       // Apr to Dec
//       startYear = year;
//       endYear = year + 1;
//     }

//     return {
//       value: `${startYear}-${endYear}`,
//       label: `01/04/${startYear} - 31/03/${endYear}`,
//     };
//   };

//   const currentFY = getCurrentFinancialYear();

//   const [selectedYear, setSelectedYear] = useState(currentFY.value);
//   console.log(selectedBranch, selectedYear);
//   const fetchBranches = async () => {
//     try {
//       // ✅ Check if employee login (has numeric id & not static)
//       if (tempLogin?.id && tempLogin.role_id !== "static") {
//         const res = await axios.get(
//           `${API}/Master/Master_Profile/EmployeeBranchess/${tempLogin.id}`,
//         );

//         if (res.data.success) {
//           setBranches(res.data.data);
//         }
//       } else {
//         // ✅ Fallback → static/admin users
//         const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);

//         if (res.data.success) {
//           setBranches(res.data.data);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching branches:", error);
//     }
//   };

//   // Fetch branches when step 2 opens
//   useEffect(() => {
//     if (showExtra) {
//       fetchBranches();
//     }
//   }, [showExtra]);

//   const staticUsers = [
//     {
//       id: 0,
//       name: "Admin",
//       email: "admin@gmail.com",
//       password: "123",
//       role: "Admin",
//       permissions: "all",
//     },
//     {
//       id: 1,
//       name: "Tester 1",
//       email: "tester1@gmail.com",
//       password: "123",
//       role: "Admin",
//       permissions: "limited",
//     },
//     {
//       id: 2,
//       name: "Tester 2",
//       email: "tester2@gmail.com",
//       password: "123",
//       role: "Admin",
//       permissions: "limited",
//     },
//     {
//       id: 3,
//       name: "Sumit",
//       email: "sumittest@gmail.com",
//       password: "123",
//       role: "Admin",
//       permissions: "custom",
//     },
//   ];

//   //  const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   const email = e.target.email?.value?.trim();
//   //   const password = e.target.password?.value?.trim();

//   //   // ✅ NEW VALIDATION (first step)
//   //   if (!email && !password) {
//   //     alert("Please enter Email and Password");
//   //     return;
//   //   }

//   //   if (!email) {
//   //     alert("Please enter Email");
//   //     return;
//   //   }

//   //   if (!password) {
//   //     alert("Please enter Password");
//   //     return;
//   //   }

//   //   // ==========================================
//   //   // STEP 1 → EMAIL + PASSWORD CHECK
//   //   // ==========================================
//   //   if (!showExtra) {
//   //     const userByEmail = staticUsers.find(
//   //       (user) => user.email.toLowerCase() === email.toLowerCase()
//   //     );

//   //     if (!userByEmail) {
//   //       alert("Email not found ❌");
//   //       return;
//   //     }

//   //     if (userByEmail.password !== password) {
//   //       alert("Incorrect password ❌");
//   //       return;
//   //     }

//   //     // ✅ Login Success
//   //     setTempLogin({
//   //       id: userByEmail.id,
//   //       name: userByEmail.name,
//   //       email: userByEmail.email,
//   //       role: userByEmail.role,
//   //       isAdmin: userByEmail.role === "Admin",
//   //       permissions: userByEmail.permissions,
//   //     });

//   //     setShowExtra(true);
//   //     return;
//   //   }

//   //   // ==========================================
//   //   // STEP 2 → BRANCH + YEAR
//   //   // ==========================================
//   //   if (!selectedBranch || !selectedYear) {
//   //     alert("Please select branch & financial year");
//   //     return;
//   //   }

//   //   const selectedBranchData = branches.find(
//   //     (b) => b.id.toString() === selectedBranch.toString()
//   //   );

//   //   const finalUserData = {
//   //     ...tempLogin,
//   //     branchId: selectedBranch,
//   //     branchName: selectedBranchData?.branchName || "",
//   //     financialYear: selectedYear,
//   //     loginTime: new Date().toISOString(),
//   //   };

//   //   sessionStorage.setItem("isLoggedIn", "true");
//   //   sessionStorage.setItem("userData", JSON.stringify(finalUserData));

//   //   window.location.href = "/";
//   // };
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const email = e.target.email?.value?.trim();
//     const password = e.target.password?.value?.trim();

//     // ✅ Validation
//     if (!email && !password) {
//       alert("Please enter Email and Password");
//       return;
//     }

//     if (!email) {
//       alert("Please enter Email");
//       return;
//     }

//     if (!password) {
//       alert("Please enter Password");
//       return;
//     }

//     // ==========================================
//     // STEP 1 → STATIC USER CHECK
//     // ==========================================
//     if (!showExtra) {
//       const staticUser = staticUsers.find(
//         (u) => u.email.toLowerCase() === email.toLowerCase(),
//       );

//       // ✅ If static user found
//       if (staticUser) {
//         if (staticUser.password !== password) {
//           alert("Incorrect password ❌");
//           return;
//         }

//         // ✅ Static login success
//         setTempLogin({
//           id: staticUser.id,
//           name: staticUser.name,
//           email: staticUser.email,
//           role_id: "static",
//           branchName: "Default",
//           permissions: staticUser.permissions,
//           isAdmin: true,
//         });

//         setShowExtra(true);
//         return;
//       }

//       // ==========================================
//       // STEP 2 → API LOGIN (if not static)
//       // ==========================================
//       try {
//         setLoading(true);

//         const response = await axios.post(`${API}/Master/Emp-login`, {
//           email,
//           password,
//         });

//         const data = response.data;

//         setLoading(false);

//         if (!data.status) {
//           alert(data.message);
//           return;
//         }

//         const user = data.user;

//         // ✅ API login success
//         setTempLogin({
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role_id: user.role_id,
//           branchName: user.branch_name,
//           permissions: user.permissions,
//           isAdmin: true,
//         });

//         setShowExtra(true);
//       } catch (error) {
//         setLoading(false);
//         alert(error.response?.data?.message || "Login failed. Try again ❌");
//       }

//       return;
//     }

//     // ==========================================
//     // STEP 3 → BRANCH + YEAR
//     // ==========================================
//     if (!selectedBranch || !selectedYear) {
//       alert("Please select branch & financial year");
//       return;
//     }

//     const selectedBranchData = branches.find(
//       (b) => b.id.toString() === selectedBranch.toString(),
//     );

//     const finalUserData = {
//       ...tempLogin,
//       branchId: selectedBranch,
//       branchName: selectedBranchData?.branchName || tempLogin.branchName,
//       financialYear: selectedYear,
//       loginTime: new Date().toISOString(),
//     };

//     sessionStorage.setItem("isLoggedIn", "true");
//     sessionStorage.setItem("userData", JSON.stringify(finalUserData));

//     window.location.href = "/";
//   };
//   return (
//     <>
//       <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-gray-200">
//         <div className="flex border-2 border-blue-200 w-[1156px] h-[650px] bg-gray-200 rounded-lg shadow-lg overflow-hidden">
//           {/* Left Section */}
//           <div className="bg-[#0048B3] w-1/2 h-full flex items-center justify-center relative">
//             <img
//               src={reactlogo}
//               alt="Banner"
//               className="w-[500px] h-auto object-contain"
//             />
//           </div>

//           {/* Right Section */}
//           <div className="w-1/2 h-full bg-[#F7F9FC] overflow-y-auto">
//             <div
//               className={`w-full max-w-md space-y-6 mx-auto px-8 ${
//                 showExtra ? "pt-[20px]" : "pt-[70px]"
//               }`}
//             >
//               <div className="flex justify-center">
//                 <img className="w-16 h-16" src="/logo.svg" alt="Logo" />
//               </div>

//               <h2 className="text-center text-2xl font-semibold text-gray-800">
//                 Login to Secure Portal
//               </h2>

//               <form onSubmit={handleLogin} className="space-y-2 mt-4">
//                 {/* FIRST STEP FIELDS */}
//                 <label className="text-sm font-semibold">Email-ID</label>
//                 <div className="w-full flex items-center bg-white border border-gray-300 px-2 py-1.5 shadow-sm rounded-md">
//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Email-ID"
//                     autoComplete="off"
//                     disabled={showExtra} // lock after step 1
//                     className="flex-1 focus:outline-none"
//                   />
//                 </div>

//                 <label className="text-sm font-semibold">Password</label>
//                 <div className="w-full flex items-center bg-white border border-gray-300 px-3 py-2 shadow-sm rounded-md">
//                   <input
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     autoComplete="off"
//                     disabled={showExtra} // lock after step 1
//                     className="flex-1 bg-transparent focus:outline-none"
//                   />
//                 </div>

//                 {!showExtra && (
//                   <div className="flex items-center space-x-2">
//                     <input type="checkbox" className="h-4 w-4" />
//                     <label className="text-sm">Remember me</label>
//                   </div>
//                 )}

//                 {/* SECOND STEP FIELDS */}
//                 {showExtra && (
//                   <>
//                     <label className="text-sm font-semibold">Branch</label>
//                     <select
//                       value={selectedBranch?.id || ""}
//                       onChange={(e) => {
//                         const branchObj = branches.find(
//                           (b) => b.id.toString() === e.target.value,
//                         );
//                         setSelectedBranch(branchObj); // ✅ store full object
//                       }}
//                       className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white"
//                     >
//                       <option value="">Select Branch</option>
//                       {branches.map((branch) => (
//                         <option key={branch.id} value={branch.id}>
//                           {branch.branch_name}
//                         </option>
//                       ))}
//                     </select>

//                     <div>
//                       <label className="text-sm font-semibold">
//                         Financial Year
//                       </label>

//                       <select
//                         name="year"
//                         value={selectedYear}
//                         onChange={(e) => setSelectedYear(e.target.value)}
//                         className="w-full border border-gray-300 bg-white px-3 py-2 shadow-sm rounded-md"
//                       >
//                         <option value={currentFY.value}>
//                           {currentFY.label}
//                         </option>
//                       </select>
//                     </div>
//                   </>
//                 )}

//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
//                 >
//                   {showExtra ? "Continue to Dashboard" : "Login"}
//                 </button>
//               </form>

//               <div className="text-center text-sm text-gray-500 pt-4">
//                 <a href="#" className="hover:underline">
//                   Privacy Policy
//                 </a>{" "}
//                 |{" "}
//                 <a href="#" className="hover:underline">
//                   Terms
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginPage;
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";
import reactlogo from "../assets/LoginBanner.png";

function LoginPage() {
  const [showExtra, setShowExtra] = useState(false);
  const [showOtp, setShowOtp] = useState(false); // New state for OTP step
  const [otpValue, setOtpValue] = useState(""); // State to hold OTP input
  const [tempLogin, setTempLogin] = useState({});
  const [emailCorrect, setEmailCorrect] = useState(false);

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFinancialYears = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    let startYear;
    if (month < 3) {
      startYear = year - 1;
    } else {
      startYear = year;
    }

    const years = [];

    for (let i = 0; i < 2; i++) {
      const start = startYear - i;
      const end = start + 1;

      years.push({
        value: `${start}-${end}`,
        label: `01/04/${start} - 31/03/${end}`,
      });
    }

    return years;
  };
  const financialYears = getFinancialYears();
  const [selectedYear, setSelectedYear] = useState(financialYears[0].value);

  const fetchBranches = async () => {
    debugger;
    try {
      if (tempLogin?.id && tempLogin.role_id !== "static") {
        const res = await axios.get(
          `${API}/Master/Master_Profile/EmployeeBranchess/${tempLogin.id}`,
        );
        if (res.data.success) setBranches(res.data.data);
      } else {
        const res = await axios.get(`${API}/Master/Master_Profile/Branchess`);
        if (res.data.success) setBranches(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    if (showExtra) {
      fetchBranches();
    }
  }, [showExtra]);

  const staticUsers = [
    {
      id: 0,
      name: "Admin",
      email: "admin@gmail.com",
      password: "123",
      role: "Admin",
      permissions: "all",
    },
    {
      id: 1,
      name: "Tester 1",
      email: "tester1@gmail.com",
      password: "123",
      role: "Admin",
      permissions: "limited",
    },
    {
      id: 2,
      name: "Tester 2",
      email: "tester2@gmail.com",
      password: "123",
      role: "Admin",
      permissions: "limited",
    },
    {
      id: 3,
      name: "Sumit",
      email: "sumittest@gmail.com",
      password: "123",
      role: "Admin",
      permissions: "custom",
    },
  ];

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const email = e.target.email?.value?.trim();
  //   const password = e.target.password?.value?.trim();

  //   // 1. Validation
  //   if (!showOtp && !showExtra) {
  //     if (!email || !password) {
  //       alert("Please enter Email and Password");
  //       return;
  //     }
  //   }

  //   // ==========================================
  //   // STEP 1 → LOGIN / OTP TRIGGER
  //   // ==========================================
  //   if (!showExtra && !showOtp) {
  //     const staticUser = staticUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

  //     if (staticUser) {
  //       if (staticUser.password !== password) {
  //         alert("Incorrect password ❌");
  //         return;
  //       }
  //       // ✅ Static login success - BYPASS OTP
  //       setTempLogin({
  //         id: staticUser.id,
  //         name: staticUser.name,
  //         email: staticUser.email,
  //         role_id: "static",
  //         branchName: "Default",
  //         permissions: staticUser.permissions,
  //         isAdmin: true,
  //       });
  //       setShowExtra(true);
  //       return;
  //     }

  //     // API LOGIN (Employee)
  //     try {
  //       setLoading(true);
  //       const response = await axios.post(`${API}/Master/Emp-login`, { email, password });
  //       const data = response.data;
  //       setLoading(false);

  //       if (!data.status) {
  //         alert(data.message);
  //         return;
  //       }

  //       const user = data.user;
  //       setTempLogin({
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         role_id: user.role_id,
  //         branchName: user.branch_name,
  //         permissions: user.permissions,
  //         isAdmin: false,
  //       });

  //       // ✅ Employee login success - SHOW OTP
  //       setShowOtp(true);
  //     } catch (error) {
  //       setLoading(false);
  //       alert(error.response?.data?.message || "Login failed. Try again ❌");
  //     }
  //     return;
  //   }

  //   // ==========================================
  //   // STEP 2 → OTP VERIFICATION (Employee Only)
  //   // ==========================================
  //   if (showOtp && !showExtra) {
  //     if (!otpValue) {
  //       alert("Please enter the OTP");
  //       return;
  //     }

  //     // Bypass check: currently accepting "1234" or any logic you want
  //     if (otpValue === "1234") {
  //       setShowOtp(false);
  //       setShowExtra(true);
  //     } else {
  //       alert("Invalid OTP ❌");
  //     }
  //     return;
  //   }

  //   // ==========================================
  //   // STEP 3 → BRANCH + YEAR
  //   // ==========================================
  //   if (showExtra) {
  //     if (!selectedBranch || !selectedYear) {
  //       alert("Please select branch & financial year");
  //       return;
  //     }

  //     const selectedBranchData = branches.find((b) => b.id.toString() === selectedBranch.id.toString());

  //     const finalUserData = {
  //       ...tempLogin,
  //       branchId: selectedBranch,
  //       branchName: selectedBranchData?.branch_name || tempLogin.branchName,
  //       financialYear: selectedYear,
  //       loginTime: new Date().toISOString(),
  //     };

  //     sessionStorage.setItem("isLoggedIn", "true");
  //     sessionStorage.setItem("userData", JSON.stringify(finalUserData));
  //     window.location.href = "/";
  //   }
  // };
  const handleLogin = async (e) => {
    debugger;
    e.preventDefault();

    const email = e.target.email?.value?.trim();
    const password = e.target.password?.value?.trim();

    // =========================
    // STEP 1 → LOGIN
    // =========================
    if (!showOtp && !showExtra) {
      if (!email || !password) {
        alert("Please enter Email and Password");
        return;
      }

      try {
        setLoading(true);

        const response = await axios.post(`${API}/Master/Emp-login`, {
          email,
          password,
        });

        const data = response.data;
        setLoading(false);

        if (!data.status) {
          alert(data.message);
          return;
        }

        const user = data.user;

        // ✅ TEMP LOGIN STORE
        setTempLogin({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || user.role_id,
          branchName: user.branch_name || "Default",
          permissions: user.permissions,
          isAdmin: user.isAdmin,
          dayEndProcess: user.dayEndProcess || null,
        });

        // ✅ FLOW CONTROL
        if (user.isAdmin) {
          setShowExtra(true); // Admin → no OTP
        } else {
          setShowOtp(true); // Employee → OTP
        }
      } catch (error) {
        setLoading(false);
        alert(error.response?.data?.message || "Login failed ❌");
      }

      return;
    }

    // =========================
    // STEP 2 → OTP
    // =========================
    if (showOtp && !showExtra) {
      if (!otpValue) {
        alert("Please enter OTP");
        return;
      }

      if (otpValue === "1234") {
        setShowOtp(false);
        setShowExtra(true);
      } else {
        alert("Invalid OTP ❌");
      }

      return;
    }

    // =========================
    // STEP 3 → BRANCH + YEAR
    // =========================
    if (showExtra) {
      if (!selectedBranch || !selectedYear) {
        alert("Please select branch & financial year");
        return;
      }

      // ✅ GET BRANCH DATA
      const selectedBranchData = branches.find(
        (b) => b.id.toString() === selectedBranch.toString(),
      );

      const finalUserData = {
        id: tempLogin.id,
        name: tempLogin.name,
        email: tempLogin.email,

        role: tempLogin.role,
        isAdmin: tempLogin.isAdmin,
        permissions: tempLogin.permissions,

        branchId: selectedBranch,
        branchName: selectedBranch?.branch_name || tempLogin.branchName,

        financialYear: selectedYear,
        dayEndProcess: tempLogin.dayEndProcess,

        loginTime: new Date().toISOString(),
      };

      console.log("FINAL USER:", finalUserData);

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userData", JSON.stringify(finalUserData));

      window.location.href = "/";
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-gray-200">
      <div className="flex border-2 border-blue-200 w-[1156px] h-[650px] bg-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#0048B3] w-1/2 h-full flex items-center justify-center relative">
          <img
            src={reactlogo}
            alt="Banner"
            className="w-[500px] h-auto object-contain"
          />
        </div>

        <div className="w-1/2 h-full bg-[#F7F9FC] overflow-y-auto">
          <div
            className={`w-full max-w-md space-y-6 mx-auto px-8 ${showExtra || showOtp ? "pt-[20px]" : "pt-[70px]"}`}
          >
            <div className="flex justify-center">
              <img className="w-16 h-16" src="/logo.svg" alt="Logo" />
            </div>

            <h2 className="text-center text-2xl font-semibold text-gray-800">
              Login to Secure Portal
            </h2>

            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              {/* STEP 1 FIELDS */}
              {!showOtp && !showExtra && (
                <>
                  <div>
                    <label className="text-sm font-semibold">Email-ID</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email-ID"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Password</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none mt-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <label className="text-sm">Remember me</label>
                  </div>
                </>
              )}

              {/* OTP STEP (Only for Employee) */}
              {showOtp && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <label className="text-sm font-bold text-blue-700">
                    Enter OTP (Bypass: 1234)
                  </label>
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    placeholder="Enter 4-digit OTP"
                    className="w-full border-2 border-blue-300 px-3 py-3 rounded-md focus:border-blue-500 outline-none text-center text-xl tracking-widest mt-2"
                  />
                </div>
              )}

              {/* BRANCH STEP */}
              {showExtra && (
                <>
                  <div>
                    <label className="text-sm font-semibold">Branch</label>
                    <select
                      value={selectedBranch?.id || ""}
                      onChange={(e) =>
                        setSelectedBranch(
                          branches.find(
                            (b) => b.id.toString() === e.target.value,
                          ),
                        )
                      }
                      className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white mt-1"
                    >
                      <option value="">Select Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">
                      Financial Year
                    </label>

                    <select
                      name="year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full border border-gray-300 bg-white px-3 py-2 rounded-md mt-1"
                    >
                      {financialYears.map((fy) => (
                        <option key={fy.value} value={fy.value}>
                          {fy.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all font-medium"
              >
                {loading
                  ? "Verifying..."
                  : showOtp
                    ? "Verify OTP"
                    : showExtra
                      ? "Continue to Dashboard"
                      : "Login"}
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
  );
}

export default LoginPage;
