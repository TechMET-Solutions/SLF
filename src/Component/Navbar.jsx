// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiChevronDown, FiChevronUp, FiLogOut } from "react-icons/fi";


const Navbar = () => {
    const [isMasterOpen, setIsMasterOpen] = useState(false);
    const [isMasterProfileOpen, setIsMasterProfileOpen] = useState(false);
    const [isMasterSchemeMaster, setIsMasterSchemeMaster] = useState(false);
    const [isMasterSchemeEmployeeProfile, setIsMasterSchemeEmployeeProfile] =
        useState(false);

    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsMasterOpen(false);
                setIsMasterProfileOpen(false);
                setIsMasterSchemeMaster(false);
                setIsMasterSchemeEmployeeProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-center">
            <div className="bg-[#0A2478] text-white flex items-center justify-between relative mt-5 p-5 w-[1360px] h-[50px] rounded-[10px]">
                <div></div>

                {/* Center Menu */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-10">
                        {/* Masters Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="hover:underline text-[20px] flex items-center gap-1"
                                onClick={() => setIsMasterOpen(!isMasterOpen)}
                            >
                                Masters
                                {isMasterOpen ? (
                                    <FiChevronUp className="inline-block" />
                                ) : (
                                    <FiChevronDown className="inline-block" />
                                )}
                            </button>


                            {isMasterOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
                                    {/* Master Profile with fly-out */}
                                    <div className="relative">
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                                            onClick={() => {
                                                setIsMasterProfileOpen(!isMasterProfileOpen);
                                                setIsMasterSchemeMaster(false);
                                                setIsMasterSchemeEmployeeProfile(false);
                                            }}
                                        >
                                            Master Profile
                                            <span>
                                                {isMasterProfileOpen ? (
                                                    <FiChevronDown className="inline-block" />
                                                ) : (
                                                    <FiChevronRight className="inline-block" />
                                                )}
                                            </span>

                                        </button>

                                        {/* Fly-out submenu */}
                                        {isMasterProfileOpen && (
                                            <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/account-groups"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Account Group
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/account-code-list"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Account Code
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/Branch-Profile-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Branch Details
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/Item-Profile-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Item Profile
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/Product-Purity-profile"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Product Purity Profile
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/Document-Proof-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Document Proof
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/Customer-Profile-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Customer Profile
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/Push-Gold-Rate-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Push Gold Rate
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left"
                                                    to="/Charges-Profile-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Charges Profile
                                                </Link>
                                                <button className="px-4 py-2 hover:bg-gray-100 text-left">
                                                    Tax Master
                                                </button>
                                                <button className="px-4 py-2 hover:bg-gray-100 text-left">
                                                    Tax Mapping
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Scheme Master */}
                                    <div className="relative">
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                                            onClick={() => {
                                                setIsMasterSchemeMaster(!isMasterSchemeMaster);
                                                setIsMasterProfileOpen(false);
                                                setIsMasterSchemeEmployeeProfile(false);
                                            }}
                                        >
                                            Scheme Master
                                            <span>
                                                {isMasterSchemeMaster ? (
                                                    <FiChevronDown className="inline-block" />
                                                ) : (
                                                    <FiChevronRight className="inline-block" />
                                                )}
                                            </span>

                                        </button>

                                        {isMasterSchemeMaster && (
                                            <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                                                    to="/Scheme-Details-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Scheme Details
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                                                    to="/Branch-Scheme-Mapping-List"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Scheme Branch Mapping
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    {/* Employee Profile */}
                                    <div className="relative">
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                                            onClick={() => {
                                                setIsMasterSchemeEmployeeProfile(!isMasterSchemeEmployeeProfile);
                                                setIsMasterProfileOpen(false);
                                                setIsMasterSchemeMaster(false);
                                            }}
                                        >
                                            Employee Profile
                                            <span>
                                                {isMasterSchemeEmployeeProfile ? (
                                                    <FiChevronDown className="inline-block" />
                                                ) : (
                                                    <FiChevronRight className="inline-block" />
                                                )}
                                            </span>

                                        </button>

                                        {isMasterSchemeEmployeeProfile && (
                                            <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                                                    to="/Employee-Profile"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Employee Profile
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                                                    to="/Member-Login-Period"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Member Login Period
                                                </Link>
                                                <Link
                                                    className="px-4 py-2 hover:bg-gray-100 text-left text-sm"
                                                    to="/Member-Login-Details"
                                                    onClick={() => setIsMasterOpen(false)}
                                                >
                                                    Member Login Details
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                        User Management
                                    </button>
                                </div>
                            )}
                        </div>

                        <button className="hover:underline text-[20px]">Transactions</button>
                        <button className="hover:underline text-[20px]">
                            Miscellaneous
                        </button>
                        <button className="hover:underline text-[20px]">Reports</button>
                        <button className="hover:underline text-[20px]">
                            Tools/Utilities
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
                <button className="w-[130px] h-[36px] bg-[#FFFFFF] rounded-[4.8px] flex items-center text-[#0b2c69] font-medium p-2 gap-3">
                    <span className="flex gap-2 font-semibold text-xl items-center">
                        <FiLogOut className="text-xl" />
                        Logout
                        <FiChevronDown />
                    </span>
                </button>
            </div>
        </div >
    );
};

export default Navbar;
