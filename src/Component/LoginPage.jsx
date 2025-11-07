import React, { useState } from "react";
import reactlogo from "../assets/LoginBanner.png";

function LoginPage() {
    const [showExtra, setShowExtra] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setShowExtra(true);
        setSuccess(true);
    };

    return (
        <>
            {/* Hide scrollbar + full-screen view */}
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
                            className={`w-full max-w-md space-y-6 mx-auto px-8 ${showExtra ? "pt-[20px]" : "pt-[70px]"}`}>
                            {/* Logo */}
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                                    <img className="w-64 h-64" src="/logo.svg" alt="Logo" />
                                </div>
                            </div>

                            <h2 className="text-center text-2xl font-semibold text-gray-800">Login to Secure Portal</h2>
                            <p className="text-center text-gray-600 text-sm">Empowering seamless digital governance & secure workflows.</p>

                            <form onSubmit={handleLogin} className="space-y-2 mt-4">
                                <label className="text-sm font-semibold">Email-ID</label>
                                <div className="w-full flex items-center bg-white border border-gray-300 px-2 py-1.5 shadow-sm rounded-md">
                                    <input
                                        type="email"
                                        placeholder="Email-ID"
                                        autoComplete="off"
                                        className="flex-1 focus:outline-none"
                                    />

                                </div>

                                <label className="text-sm font-semibold">Password</label>
                                <div className="w-full flex items-center bg-white border border-gray-300 px-3 py-2 shadow-sm rounded-md">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        className="flex-1 bg-transparent focus:outline-none"
                                    />

                                </div>

                                {!showExtra && (
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" className="h-4 w-4" />
                                        <label className="text-sm">Remember me</label>
                                    </div>
                                )}

                                {showExtra && (
                                    <>
                                        <label className="text-sm font-semibold">Branch</label>
                                        <select className="w-full border border-gray-300 bg-white px-3 py-2 shadow-sm rounded-md">
                                            <option disabled> Select </option>
                                            <option>Nashik-Road</option>
                                            <option>Nashik</option>
                                            <option>Bhagur</option>
                                        </select>

                                        <label className="text-sm font-semibold">
                                            Financial Year
                                        </label>
                                        <select className="w-full border border-gray-300 bg-white px-3 py-2 shadow-sm rounded-md">
                                            <option disabled> Select </option>
                                            <option>01/04/2023-31/03/2024</option>
                                            <option>01/04/2024-31/03/2025</option>
                                        </select>
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                                >
                                    Login
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
