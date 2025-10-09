// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Masters
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isMasterProfileOpen, setIsMasterProfileOpen] = useState(false);
  const [isMasterSchemeMaster, setIsMasterSchemeMaster] = useState(false);
  const [isMasterSchemeEmployeeProfile, setIsMasterSchemeEmployeeProfile] =
    useState(false);
  const [isMasterSchemeUserManagement, setIsMasterSchemeUserManagement] =
    useState(false);

  // Transactions
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isGoldLoanOpen, setIsGoldLoanOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ✅ Close all dropdowns when clicking outside
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
        setIsMasterSchemeUserManagement(false);
        setIsTransactionsOpen(false);
        setIsGoldLoanOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-[#0A2478] text-white flex items-center justify-between relative mt-5 p-5 w-[1360px] h-[50px] rounded-[10px]">
        {/* Left side placeholder */}
        <div></div>

        {/* ===== Center Menu ===== */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex gap-10"
          ref={dropdownRef}
        >
          {/* ================== MASTERS ================== */}
          <div className="relative">
            <button
              className="hover:underline text-[20px] flex items-center gap-1"
              onClick={() => {
                setIsMasterOpen(!isMasterOpen);
                setIsTransactionsOpen(false);
              }}
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
                {/* Master Profile */}
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => {
                      setIsMasterProfileOpen(!isMasterProfileOpen);
                      setIsMasterSchemeMaster(false);
                      setIsMasterSchemeEmployeeProfile(false);
                      setIsMasterSchemeUserManagement(false);
                    }}
                  >
                    Master Profile
                    {isMasterProfileOpen ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronRight className="inline-block" />
                    )}
                  </button>

                  {isMasterProfileOpen && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                      {[
                        { name: "Account Group", path: "/account-groups" },
                        { name: "Account Code", path: "/account-code-list" },
                        { name: "Branch Details", path: "/Branch-Profile-List" },
                        { name: "Item Profile", path: "/Item-Profile-List" },
                        {
                          name: "Product Purity Profile",
                          path: "/Product-Purity-profile",
                        },
                        {
                          name: "Document Proof",
                          path: "/Document-Proof-List",
                        },
                        {
                          name: "Customer Profile",
                          path: "/Customer-Profile-List",
                        },
                        { name: "Push Gold Rate", path: "/Push-Gold-Rate-List" },
                        { name: "Charges Profile", path: "/Charges-Profile-List" },
                         { name: "Area", path: "/Area" },
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="px-4 py-2 hover:bg-gray-100 text-left"
                          onClick={() => setIsMasterOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
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
                      setIsMasterSchemeUserManagement(false);
                    }}
                  >
                    Scheme Master
                    {isMasterSchemeMaster ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronRight className="inline-block" />
                    )}
                  </button>

                  {isMasterSchemeMaster && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                      <Link
                        to="/Scheme-Details-List"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setIsMasterOpen(false)}
                      >
                        Scheme Details
                      </Link>
                      <Link
                        to="/Branch-Scheme-Mapping-List"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
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
                      setIsMasterSchemeEmployeeProfile(
                        !isMasterSchemeEmployeeProfile
                      );
                      setIsMasterProfileOpen(false);
                      setIsMasterSchemeMaster(false);
                      setIsMasterSchemeUserManagement(false);
                    }}
                  >
                    Employee Profile
                    {isMasterSchemeEmployeeProfile ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronRight className="inline-block" />
                    )}
                  </button>

                  {isMasterSchemeEmployeeProfile && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                      <Link
                        to="/Employee-Profile-list"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setIsMasterOpen(false)}
                      >
                        Employee Profile
                      </Link>
                      <Link
                        to="/Member-Login-Period"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setIsMasterOpen(false)}
                      >
                        Member Login Period
                      </Link>
                      <Link
                        to="/Member-Login-Details"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setIsMasterOpen(false)}
                      >
                        Member Login Details
                      </Link>
                    </div>
                  )}
                </div>

                {/* User Management */}
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => {
                      setIsMasterSchemeUserManagement(
                        !isMasterSchemeUserManagement
                      );
                      setIsMasterProfileOpen(false);
                      setIsMasterSchemeMaster(false);
                      setIsMasterSchemeEmployeeProfile(false);
                    }}
                  >
                    User Management
                    {isMasterSchemeUserManagement ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronRight className="inline-block" />
                    )}
                  </button>

                  {isMasterSchemeUserManagement && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                      <Link
                        to="/User-Role-Permission"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setIsMasterOpen(false)}
                      >
                        User Role Permission
                      </Link>
                      <Link
                        to="/Member-Branch-Mapping"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setIsMasterOpen(false)}
                      >
                        Member Branch Mapping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================== TRANSACTIONS ================== */}
          <div className="relative">
            <button
              className="hover:underline text-[20px] flex items-center gap-1"
              onClick={() => {
                setIsTransactionsOpen(!isTransactionsOpen);
                setIsMasterOpen(false);
              }}
            >
              Transactions
              {isTransactionsOpen ? (
                <FiChevronUp className="inline-block" />
              ) : (
                <FiChevronDown className="inline-block" />
              )}
            </button>

            {isTransactionsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => setIsGoldLoanOpen(!isGoldLoanOpen)}
                  >
                    Gold Loan
                    {isGoldLoanOpen ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronRight className="inline-block" />
                    )}
                  </button>

                  {isGoldLoanOpen && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                      <Link
                        to="/Loan-Application"
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                        onClick={() => {
                        //   setIsTransactionsOpen(false);
                        //   setIsGoldLoanOpen(false);
                        }}
                      >
                        Loan Application
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================== OTHER BUTTONS ================== */}
          <button className="hover:underline text-[20px]">Miscellaneous</button>
          <button className="hover:underline text-[20px]">Reports</button>
          <button className="hover:underline text-[20px]">
            Tools/Utilities
          </button>
        </div>

        {/* ===== Logout Button ===== */}
        <button className="w-[130px] h-[36px] bg-[#FFFFFF] rounded-[4.8px] flex items-center text-[#0b2c69] font-medium p-2 gap-3">
          <span className="flex gap-2 font-semibold text-xl items-center">
            <FiLogOut className="text-xl" />
            Logout
            <FiChevronDown />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
