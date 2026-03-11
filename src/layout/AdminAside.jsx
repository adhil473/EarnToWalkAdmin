import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import dashboard from "../assets/dashboard.png";
import dashboardSelected from '../assets/dashboardSelected.png'
import plan from "../assets/plan.png";
import planSelected from '../assets/planSelected.png'
import reports from "../assets/reports.png";
import reportsSelected from '../assets/reportsSelected.png'
import withdraw from "../assets/withdraw.png";
import withdrawSelected from '../assets/withdrawSelected.png'
import support from "../assets/support.png";
import supportSelected from '../assets/supportSelected.png'
import logout from "../assets/logout.png";
import logoutSelected from '../assets/logoutSelected.png'
import logoutt from '../assets/logout/logout.png'
import { GiTrophyCup } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";


const AdminAside = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showReportsSubmenu, setShowReportsSubmenu] = useState(false);

  const menuItems = [
    { name: "Dashboard", redirect_url: "/dashboard", icon: dashboard, iconSelected: dashboardSelected },
    { name: "Members", redirect_url: "/member", icon: plan, iconSelected: planSelected },
     { name: "Challenges", redirect_url: "/challenges", icon: GiTrophyCup, iconSelected: GiTrophyCup },
    { 
      name: "Reports", 
      hasSubmenu: true, 
      icon: reports, 
      iconSelected: reportsSelected,
      submenu: [
        { name: "Withdraw", redirect_url: "/reports/deposit-log" },
        { name: "Withdraw Log", redirect_url: "/reports/withdraw-log" },
      ]
    },
    { name: "Settings", redirect_url: "/settings", icon: IoSettingsSharp, iconSelected: IoSettingsSharp },
    { name: "Support", redirect_url: "/support", icon: support, iconSelected: supportSelected },
    { name: "Logout", isLogout: true, icon: logoutt, iconSelected: logoutSelected },
  ];

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="bg-gray-700">
      {window.innerWidth < 768 && open && (
        <button
          type="button"
          className="fixed inset-0 p-4 bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
          style={{ border: "none", background: "rgba(0,0,0,0.5)", padding: 0, margin: 0 }}
        />
      )}

      <div
        className={`z-50 overflow-y-auto sidebar ${
          open ? "sidebar-open shadow-xl px-5" : "sidebar-closed px-3"
        } bg-black text-white h-screen py-5 pt-6  border-r-2 border-[#050D0F] ${
          window.innerWidth < 768 ? "fixed top-0" : "fixed"
        }`}
        style={{
          width: open ? "14rem" : "6rem",
          transition: "transform 0.3s ease-in-out, width 0.3s ease-in-out",
          transform: window.innerWidth < 768 && !open ? "translateX(-100%)" : "translateX(0)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // border: "2px solid black",
          padding: "10px"
        }}
      >
        <div>
          <div className="flex gap-x-4 items-center justify-center">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center text-xl font-bold cursor-pointer"
            >
              <img src={logo} className="w-12" />
              <p className={`text-xl ml-2 ${!open && "hidden"}`}>Earn To Walk</p>
            </button>
          </div>

          <ul className="pt-10 space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.redirect_url || index}>
                <button
                  type="button"
                  className={`flex rounded-lg py-2 px-2 cursor-pointer hover:bg-[#282828] text-sm items-center ${
                    !open && "justify-center"
                  } gap-x-4 ${
                    item.hasSubmenu && showReportsSubmenu
                      ? "bg-[#282828] text-[#31BDD0]"
                      : location.pathname === item.redirect_url
                      ? "bg-[#282828] text-[#31BDD0]"
                      : "text-[#D1D5DB]"
                  } w-full text-left font-bold`}
                  onClick={() => {
                    if (item.isLogout) {
                      setShowLogoutModal(true);
                    } else if (item.hasSubmenu) {
                      setShowReportsSubmenu(!showReportsSubmenu);
                    } else {
                      navigate(item.redirect_url);
                      if (window.innerWidth < 768) setOpen(false);
                    }
                  }}
                >
                  {item.icon && (typeof item.icon === 'string' ? (
                    <img 
                      src={item.hasSubmenu && showReportsSubmenu ? item.iconSelected : location.pathname === item.redirect_url ? item.iconSelected : item.icon} 
                      alt={item.name} 
                      className="w-5 h-5" 
                    />
                  ) : (
                    <item.icon className="w-5 h-5" />
                  ))}
                  <span className={`text-md font-normal tracking-wide font-inter ${!open && "hidden"}`}>{item.name}</span>
                  {item.hasSubmenu && open && (
                    <svg 
                      className={`w-4 h-4 ml-auto transition-transform ${showReportsSubmenu ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                
                {/* Submenu */}
                {item.hasSubmenu && showReportsSubmenu && open && (
                  <ul className="ml-9 mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => {
                      const getIcon = () => {
                        switch(subIndex) {
                          case 0: // Transaction Log
                            return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
                          case 1: // Deposit Log
                            return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>;
                          case 2: // Withdraw Log
                            return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16V8m0 0l-4 4m4-4l4 4M7 8v8m0 0l-4-4m4 4l4-4" /></svg>;
                          case 3: // Invest Log
                            return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
                          // case 4: // Referral Commissions
                          //   return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
                          case 4: // Binary Commissions
                            return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                          case 5: // Staking Reward
                            return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
                          default:
                            return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
                        }
                      };
                      return (
                        <li key={subItem.redirect_url}>
                          <button
                            type="button"
                            className={`flex items-center gap-2 rounded-lg py-2 px-2 cursor-pointer hover:bg-[#282828] text-sm w-full text-left ${
                              location.pathname === subItem.redirect_url
                                ? "bg-[#282828] text-[#31BDD0]"
                                : "text-[#D1D5DB]"
                            }`}
                            onClick={() => {
                              navigate(subItem.redirect_url);
                              if (window.innerWidth < 768) setOpen(false);
                            }}
                          >
                            {getIcon()}
                            <span className="text-sm font-normal">{subItem.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#050D0F] border border-[#1f2e2e] rounded-xl p-6 w-full max-w-sm relative">
            <div className="flex justify-start">
              <img src={logoutt} alt="logout" className="w-16 h-16" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-3 text-white">Log out?</h2>
            <p className="text-sm text-gray-400 mb-6">Are you Sure You Want to Log Out This Account?</p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="flex-1 bg-transparent border border-[#4B5563] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout} 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAside;
