// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiLogOut,
  FiSettings,
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
  const [isMasterProfileOpen, setIsMasterProfileOpen] = useState(false);
  const [isMasterSchemeMaster, setIsMasterSchemeMaster] = useState(false);
  const [isMasterSchemeEmployeeProfile, setIsMasterSchemeEmployeeProfile] = useState(false);
  const [isMasterSchemeUserManagement, setIsMasterSchemeUserManagement] = useState(false);

  // Transactions
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isGoldLoanOpen, setIsGoldLoanOpen] = useState(false);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);

  // Tools/Utilities
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  const dropdownRef = useRef(null);

  function convertPermissions(permissions) {
    const result = {};

    if (!permissions || typeof permissions !== "object") return result;

    Object.keys(permissions)?.forEach(section => {
      // ensure section is an array
      if (!Array.isArray(permissions[section])) return;

      result[section] = {};

      permissions[section].forEach(item => {
        result[section][item.name] = {
          view: item.view,
          add: item.add,
          edit: item.edit,
          delete: item.delete,
          approve: item.approve
        };
      });
    });

    return result;
  }


  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

  // If Admin → FULL ACCESS
  if (userData.isAdmin || userData.permissions === "all") {
    window.userIsAdmin = true;
    // Skip conversion
    console.log("ADMIN → FULL ACCESS ENABLED");
  } else {
    window.userIsAdmin = false;

    // Convert array-based permissions → object format
    userData.permissions = convertPermissions(userData.permissions);
  }

  const userPermissions = userData.permissions || {};

  console.log("Converted Permissions", userPermissions);

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
        setIsToolsOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleLogout = () => {
    sessionStorage.clear();      // remove all saved data
    window.location.href = "/login";   // redirect to login
  };

  const isAdmin = window.userIsAdmin;

  const masterPermissions = isAdmin ? "all" : userPermissions.Master || {};
  const TrasactionPermissions = isAdmin ? "all" : userPermissions.Transaction || {};

  const canSeeMaster = isAdmin
    ? true
    : Object.values(masterPermissions).some(p => p.view === true);

  const canSeeScheme = isAdmin
    ? true
    : Object.values(TrasactionPermissions).some(p => p.view === true);


  const masterProfileItems = [
    "Account Group",
    "Account Code",
    "Branch Details",
    "Item Profile",
    "Product Purity Profile",
    "Document Proof",
    "Push Gold Rate",
    "Charges Profile",
    "Area"
  ];

  const canSeeMasterProfile = isAdmin
    ? true
    : masterProfileItems.some(
      (name) => masterPermissions[name]?.view === true
    );

  console.log(canSeeMasterProfile, "canSeeMasterProfile")


  const masterProfileList = [
    { name: "Account Group", path: "/account-groups" },
    { name: "Account Code", path: "/account-code-list" },
    { name: "Branch Details", path: "/Branch-Profile-List" },
    { name: "Item Profile", path: "/Item-Profile-List" },
    { name: "Product Purity", path: "/Product-Purity" },
    { name: "Document Proof", path: "/Document-Proof-List" },
    { name: "Push Rate", path: "/Push-Rate-List" },
    { name: "Charges Profile", path: "/Charges-Profile-List" },
    { name: "Area", path: "/Area" },
  ];


  const filteredMasterProfile = isAdmin
    ? masterProfileList
    : masterProfileList.filter(
      (item) => masterPermissions[item.name]?.view === true
    );

  const schemeMasterItems = [
    { name: "Scheme Details", path: "/Scheme-Details-List" },
    { name: "Scheme Branch Mapping", path: "/Branch-Scheme-Mapping-List" },
  ];


  const filteredSchemeMaster = isAdmin
    ? schemeMasterItems
    : schemeMasterItems.filter(
      (item) => masterPermissions[item.name]?.view === true
    );

  const canSeeSchemeMaster = filteredSchemeMaster.length > 0;

  const employeeProfileItems = [
    { name: "Employee Profile", path: "/Employee-Profile-list" },
    { name: "Member Login Period", path: "/Member-Login-Period" },
    { name: "Member Login Details", path: "/Member-Login-Details" },
    { name: "Employee Attendance", path: "/Employee-Attendance" },
    { name: "Employee Designation", path: "/Employee-Designation" },
  ];


  const filteredEmployeeProfile = isAdmin
    ? employeeProfileItems
    : employeeProfileItems.filter(
      (item) => masterPermissions[item.name]?.view === true
    );


  const canSeeEmployeeProfile = filteredEmployeeProfile.length > 0;


  const userManagementItems = [
    { name: "User Role Permission", path: "/User-Role-Permission" },
    { name: "Member Branch Mapping", path: "/Member-Branch-Mapping" },
  ];

  const filteredUserManagement = isAdmin
    ? userManagementItems
    : userManagementItems.filter(
      (item) => masterPermissions[item.name]?.view === true
    );

  const canSeeUserManagement = filteredUserManagement.length > 0;


  const loanItems = [
    { name: "Loan Application", path: "/Loan-Application" },
    { name: "Loan Charges List", path: "/Loan-Charges-List" }
  ];

  const customerProfileItem = {
    name: "Customer Profile",
    path: "/Customer-Profile-List"
  };


  const auctionItems = [
    { name: "Auction Creation", path: "/Auction-Creation" },
    { name: "Bidder Registration", path: "/Bidder-Registration-List" },
    { name: "Auction Application", path: "/Auction_Application_form" },
    { name: "Credit Note", path: "/Credit-Note" }
  ];


  const filteredLoan = isAdmin
    ? loanItems
    : loanItems.filter(item => TrasactionPermissions[item.name]?.view === true);

  const canSeeLoan = filteredLoan.length > 0;

  const canSeeCustomerProfile = isAdmin
    ? true
    : TrasactionPermissions["Customer Profile"]?.view === true;

  const filteredAuction = isAdmin
    ? auctionItems
    : auctionItems.filter(item => TrasactionPermissions[item.name]?.view === true);

  const canSeeAuction = filteredAuction.length > 0;


  const canSeeTransactions =
    canSeeLoan || canSeeCustomerProfile || canSeeAuction;

  return (
    <div className="flex justify-center relative py-4 z-20 overflow-visible">
      <div className="bg-[#0A2478] text-white flex items-center justify-between relative mt-5 p-5 w-[1360px] h-[50px] rounded-[10px]">
        {/* Left side placeholder */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12 object-contain" />
        </div>


        {/* ===== Center Menu ===== */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex gap-8"
          ref={dropdownRef}
        >
          {/* ================== MASTERS ================== */}
          <div className="relative">


            {canSeeMaster && (
              <button
                className="hover:underline text-[20px] flex items-center gap-1"
                onClick={() => {
                  setIsMasterOpen(!isMasterOpen);
                  setIsTransactionsOpen(false);
                  setIsToolsOpen(false);
                }}
              >
                Masters
                {isMasterOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            )}

            {isMasterOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
                {/* Master Profile */}
                <div className="relative">
                  {canSeeMasterProfile && (
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
                      {isMasterProfileOpen ? <FiChevronDown /> : <FiChevronRight />}
                    </button>
                  )}

                  {isMasterProfileOpen && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col text-sm">
                      {filteredMasterProfile.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsMasterOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}

                </div>

                {/* Scheme Master */}
                <div className="relative">

                  {canSeeSchemeMaster && (
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
                      {isMasterSchemeMaster ? <FiChevronDown /> : <FiChevronRight />}
                    </button>
                  )}


                  {isMasterSchemeMaster && canSeeSchemeMaster && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                      {filteredSchemeMaster.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => setIsMasterOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}

                </div>

                {/* Employee Profile */}
                <div className="relative">
                  {canSeeEmployeeProfile && (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => {
                        setIsMasterSchemeEmployeeProfile(!isMasterSchemeEmployeeProfile);
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
                  )}


                  {isMasterSchemeEmployeeProfile && canSeeEmployeeProfile && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                      {filteredEmployeeProfile.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => setIsMasterOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}

                </div>

                {/* User Management */}
                <div className="relative">
                  {canSeeUserManagement && (
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => {
                        setIsMasterSchemeUserManagement(!isMasterSchemeUserManagement);
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
                  )}


                  {isMasterSchemeUserManagement && canSeeUserManagement && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">

                      {filteredUserManagement.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => setIsMasterOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}

                    </div>
                  )}

                </div>
              </div>
            )}
          </div>

          {/* ================== TRANSACTIONS ================== */}
          <div className="relative">


            {canSeeScheme && (
              <button
                className="hover:underline text-[20px] flex items-center gap-1"
                onClick={() => {
                  setIsTransactionsOpen(!isTransactionsOpen);
                  setIsMasterOpen(false);
                  setIsToolsOpen(false);
                }}
              >
                Transactions
                {isTransactionsOpen ? (
                  <FiChevronUp className="inline-block" />
                ) : (
                  <FiChevronDown className="inline-block" />
                )}
              </button>
            )}

            {isTransactionsOpen && canSeeTransactions && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">

                {/* 🔹 Loan Section */}
                {canSeeLoan && (
                  <div className="relative">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => {
                        setIsGoldLoanOpen(!isGoldLoanOpen);
                        setIsAuctionOpen(false);
                      }}
                    >
                      Loan
                      {isGoldLoanOpen ? <FiChevronDown /> : <FiChevronRight />}
                    </button>

                    {isGoldLoanOpen && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1 z-50 text-sm">
                        {filteredLoan.map(item => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100 text-left"
                            onClick={() => {
                              setIsTransactionsOpen(false);
                              setIsGoldLoanOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 🔹 Customer Profile */}
                {canSeeCustomerProfile && (
                  <Link
                    to={customerProfileItem.path}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center "
                    onClick={() => {
                      setIsTransactionsOpen(false);
                      setIsGoldLoanOpen(false);
                      setIsAuctionOpen(false);
                    }}
                  >
                    <span>Customer Profile</span>
                  </Link>
                )}

                {/* 🔹 Auction */}
                {canSeeAuction && (
                  <div className="relative mt-1 text-sm">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => {
                        setIsAuctionOpen(!isAuctionOpen);
                        setIsGoldLoanOpen(false);
                      }}
                    >
                      Auction
                      {isAuctionOpen ? <FiChevronDown /> : <FiChevronRight />}
                    </button>

                    {isAuctionOpen && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1 z-50">
                        {filteredAuction.map(item => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="px-4 py-2 hover:bg-gray-100 text-left"
                            onClick={() => {
                              setIsTransactionsOpen(false);
                              setIsAuctionOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>

          {/* ================== OTHER BUTTONS ================== */}
          <button className="hover:underline text-[20px]">Miscellaneous</button>
          <button className="hover:underline text-[20px]">Reports</button>
          
          {/* ================== TOOLS/UTILITIES ================== */}
          <div className="relative">
            <button 
              className="hover:underline text-[20px] flex items-center gap-1"
              onClick={() => {
                setIsToolsOpen(!isToolsOpen);
                setIsMasterOpen(false);
                setIsTransactionsOpen(false);
              }}
            >
              Tools / Utilities
              {isToolsOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {isToolsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[220px] z-50">
                {/* Settings Submenu */}
                <div className="relative">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  >
                    <div className="flex items-center gap-2">
                      Settings
                    </div>
                    {isSettingsOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </button>

                  {isSettingsOpen && (
                    <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col z-50">
                      <Link
                        to="/Grace-Period"
                        className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                        onClick={() => {
                          setIsToolsOpen(false);
                          setIsSettingsOpen(false);
                        }}
                      >
                        Grace Period
                      </Link>
                      {/* You can add more settings items here */}
                      {/* <Link
                        to="/another-setting"
                        className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                        onClick={() => {
                          setIsToolsOpen(false);
                          setIsSettingsOpen(false);
                        }}
                      >
                        Another Setting
                      </Link> */}
                    </div>
                  )}
                </div>

                {/* You can add more Tools/Utilities items here */}
                {/* <Link
                  to="/another-tool"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setIsToolsOpen(false)}
                >
                  <FiTool className="text-gray-600" size={16} />
                  Another Tool
                </Link> */}
              </div>
            )}
          </div>

        </div>

        {/* ===== Logout Button ===== */}
        <div className="flex gap-3">

          <button
            onClick={() => setIsBranchModelOpen(true)}
            className="w-[150px] h-[40px] flex items-center gap-2 justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium border border-gray-300"
          >
            {selectedBranch}
            <TfiReload className="text-lg size-5" />
          </button>
          <button
            onClick={handleLogout}
            className="w-[50px] h-[36px] flex items-center justify-center bg-white rounded-[4.8px] text-[#0b2c69] font-medium p-2"
          >
            <span className="flex items-center gap-1 text-xl font-semibold">
              <FiLogOut className="text-xl" />
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