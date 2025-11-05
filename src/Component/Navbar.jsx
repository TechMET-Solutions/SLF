// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiLogOut,
} from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [isBranchModelOpen, setIsBranchModelOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Nashik Road"); // default branch
  const [selectedYear, setSelectedYear] = useState("2025");

  // Temporary states for modal selection before confirming
  const [tempBranch, setTempBranch] = useState("");
  const [tempYear, setTempYear] = useState("");

  const handleOk = () => {
    if (tempBranch) setSelectedBranch(tempBranch);
    if (tempYear) setSelectedYear(tempYear);
    setIsBranchModelOpen(false);
  };
  // Masters
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  // const [isBranchModelOpen, setIsBranchModelOpen] = useState(false);
  const [isMasterProfileOpen, setIsMasterProfileOpen] = useState(false);
  const [isMasterSchemeMaster, setIsMasterSchemeMaster] = useState(false);
  const [isMasterSchemeEmployeeProfile, setIsMasterSchemeEmployeeProfile] =
    useState(false);
  const [isMasterSchemeUserManagement, setIsMasterSchemeUserManagement] =
    useState(false);

  // Transactions
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isGoldLoanOpen, setIsGoldLoanOpen] = useState(false);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);


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
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12 object-contain" />
        </div>


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
                      <Link
                        to="/Employee-Designation"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setIsMasterOpen(false)}
                      >
                        Employee Designation
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
                {/* Gold Loan Section */}
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => {
                      setIsGoldLoanOpen(!isGoldLoanOpen);
                      setIsAuctionOpen(false); // close other submenu
                    }}
                  >
                    Gold Loan
                    {isGoldLoanOpen ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronRight className="inline-block" />
                    )}
                  </button>

                  {isGoldLoanOpen && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1 z-50">
                      <Link
                        to="/Loan-Application"
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                        onClick={() => {
                          setIsTransactionsOpen(false);
                          setIsGoldLoanOpen(false);
                        }}
                      >
                        Loan Application
                      </Link>
                      <Link
                        to="/Loan-Charges-List"
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                        onClick={() => {
                          setIsTransactionsOpen(false);
                          setIsGoldLoanOpen(false);
                        }}
                      >
                        Loan Charges List
                      </Link>
                    </div>
                  )}
                </div>

                {/* Auction Section */}
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => {
                      setIsAuctionOpen(!isAuctionOpen);
                      setIsGoldLoanOpen(false); // close other submenu
                    }}
                  >
                    Auction
                    {isAuctionOpen ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronRight className="inline-block" />
                    )}
                  </button>

                  {isAuctionOpen && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1 z-50">
                      <Link
                        to="/Auction-Creation"
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                        onClick={() => {
                          setIsTransactionsOpen(false);
                          setIsAuctionOpen(false);
                        }}
                      >
                        Auction Creation
                      </Link>
                      <Link
                        to="/Bidder-Registration-List"
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                        onClick={() => {
                          setIsTransactionsOpen(false);
                          setIsAuctionOpen(false);
                        }}
                      >
                        Bidder Registration
                      </Link>
                      <Link
                        to="/Credit-Note"
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                        onClick={() => {
                          setIsTransactionsOpen(false);
                          setIsAuctionOpen(false);
                        }}
                      >
                        Credit Note
                      </Link>
                      <Link
                        to="/Debit-Note"
                        className="px-4 py-2 hover:bg-gray-100 text-left"
                        onClick={() => {
                          setIsTransactionsOpen(false);
                          setIsAuctionOpen(false);
                        }}
                      >
                        Debit Note
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
        <div className="flex gap-3">
          {/* <button
            onClick={() => setIsBranchModelOpen(true)}
            className="w-[80px] h-[36px] flex items-center justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium p-2"
          >
            Branch
          </button> */}
          <button
            onClick={() => setIsBranchModelOpen(true)}
            className="w-[150px] h-[40px] flex items-center gap-2 justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium border border-gray-300"
          >
            {selectedBranch}
            <TfiReload className="text-lg size-5" />
          </button>
          <button
            className="w-[50px] h-[36px] flex items-center justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium p-2"
          >
            <span className="flex items-center gap-1 text-xl font-semibold">
              <FiLogOut className="text-xl" />
              {/* <span className="text-sm font-medium">Logout</span>
         <FiChevronDown className="text-sm" /> */}
            </span>
          </button>
        </div>
        {/* modelforAdd */}
        {isBranchModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0101017A] backdrop-blur-md">
            <div className="bg-white w-[396px] rounded-lg shadow-xl h-auto p-6">
              <h1 className="text-xl font-bold text-[#0A2478] mb-6 text-center">
                Change Branch
              </h1>

              {/* Change Branch Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="w-full border border-gray-300 text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                  defaultValue=""
                  onChange={(e) => setTempBranch(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a branch
                  </option>
                  <option value="Nashik Road">Nashik Road</option>
                  <option value="Bhagur">Bhagur</option>
                  <option value="Nashik">Nashik</option>
                </select>
              </div>

              {/* Change Year Dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Year
                </label>
                <select
                  id="year"
                  name="year"
                  className="w-full border border-gray-300 text-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2478]"
                  defaultValue=""
                  onChange={(e) => setTempYear(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a year
                  </option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  className="bg-[#F11717] hover:bg-red-700 text-white px-5 py-2 rounded text-base font-medium"
                  onClick={handleOk}
                >
                  OK
                </button>
                <button
                  className="bg-[#0A2478] hover:bg-[#081a5e] text-white px-5 py-2 rounded text-base font-medium"
                  onClick={() => setIsBranchModelOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>


  );
};

export default Navbar;
