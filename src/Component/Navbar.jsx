import { useState } from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../assets/arrow.svg";
import LogoutIcon from "../assets/logouticon.svg";

const Navbar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  // const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isMasterProfileOpen, setIsMasterProfileOpen] = useState(false);
   const [isMasterSchemeMaster, setIsMasterSchemeMaster] = useState(false);
 const [isMasterSchemeEmployeeProfile, setIsMasterSchemeEmployeeProfile] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="bg-[#0A2478] text-white flex items-center justify-between  relative mt-5 p-5 w-[1360px] h-[50px] rounded-[10px]">
        <div></div>

        {/* Center Menu */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex gap-10">
            {/* Masters Dropdown */}
            <div className="relative">
              <button
                className="hover:underline text-[20px]"
                onClick={() => setIsMasterOpen(!isMasterOpen)}
              >
                Masters
              </button>

              {isMasterOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-[200px] z-50">
                  {/* Master Profile with fly-out */}
                  <div className="relative group ">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center "
                      onClick={() => setIsMasterProfileOpen(!isMasterProfileOpen)}
                    >
                      Master Profile
                      <span>{isMasterProfileOpen ? "▲" : "▶"}</span>
                    </button>

                    {/* Fly-out submenu */}
                    {isMasterProfileOpen && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left" to='/account-groups' onClick={() => setIsMasterOpen(prev => !prev)}>
                          Account Group
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left" to='/account-code-list' onClick={() => setIsMasterOpen(prev => !prev)}>
                          Account Code
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left" to='/Branch-Profile-List' onClick={() => setIsMasterOpen(prev => !prev)}>
                          Branch Details
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left" to='/Item-Profile-List' onClick={() => setIsMasterOpen(prev => !prev)}>
                          Item Profile
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left" to='/Product-Purity-profile' onClick={() => setIsMasterOpen(prev => !prev)}>
                          Product Purity Profile
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left" to='/Document-Proof-List' onClick={() => setIsMasterOpen(prev => !prev)}>
                          Document Proof
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left"
                          to='/Customer-Profile-List'
                          onClick={() => setIsMasterOpen(prev => !prev)}>
                          Customer Profile
                        </Link>

                        <button className="px-4 py-2 hover:bg-gray-100 text-left">
                          Employee Profile
                        </button>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left"
                          to='/Push-Gold-Rate-List'
                          onClick={() => setIsMasterOpen(prev => !prev)}>
                          Push Gold Rate
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left"
                          to='/Charges-Profile-List'
                          onClick={() => setIsMasterOpen(prev => !prev)}>
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

                  {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Scheme Master
                  </button> */}
                  <div>

<button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center "
                      onClick={() => setIsMasterSchemeMaster(!isMasterSchemeMaster)}
                    >
                      Scheme Master
                      <span>{isMasterSchemeMaster ? "▲" : "▶"}</span>
                  </button>


                     {isMasterSchemeMaster && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left text-sm" to='Scheme-Details-List' onClick={() => setIsMasterSchemeMaster(prev => !prev)}>
                         Scheme Details
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left text-sm" to='' onClick={() => setIsMasterSchemeMaster(prev => !prev)}>
                        Scheme Branch Mapping
                        </Link>
                        
                      </div>
                    )}
                  </div>
                   
                  

                  {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                   Employee Profile
                  </button> */}

                  <div>

<button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center "
                      onClick={() => setIsMasterSchemeEmployeeProfile(!isMasterSchemeEmployeeProfile)}
                    >
                      Employee Profile
                      <span>{isMasterSchemeEmployeeProfile ? "▲" : "▶"}</span>
                  </button>


                     {isMasterSchemeEmployeeProfile && (
                      <div className="absolute top-0 left-full ml-1 w-[200px] bg-white text-black rounded shadow-lg flex flex-col gap-1">
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left text-sm" to='' onClick={() => setIsMasterSchemeEmployeeProfile(prev => !prev)}>
Employee Profile
                        </Link>
                        <Link className="px-4 py-2 hover:bg-gray-100 text-left text-sm" to='/Member-Login-Period' onClick={() => setIsMasterSchemeEmployeeProfile(prev => !prev)}>
                       Member Login Period
                        </Link>
                          <Link className="px-4 py-2 hover:bg-gray-100 text-left text-sm" to='/Member-Login-Details' onClick={() => setIsMasterSchemeEmployeeProfile(prev => !prev)}>
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
            <button className="hover:underline text-[20px]" >Miscellaneous</button>
            <button className="hover:underline text-[20px]">Reports</button>
            <button className="hover:underline text-[20px]">Tools/Utilities</button>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-[154px] h-[36px] bg-[#FFFFFF] rounded-[4.8px] flex items-center text-[#0b2c69] font-medium p-2 gap-3">
          <img src={LogoutIcon} alt="logout" className="w-[27px] h-[27px]" />
          <span
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "17.91px",
              lineHeight: "100%",
              letterSpacing: "2%",
            }}
          >
            Logout
          </span>
          <img src={arrowIcon} alt="arrow" className="w-[21px] h-[21px]" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
