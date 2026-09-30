import React, { useState, useRef, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { MANAGER_SESSION, STRORAGE_KEY, STUDENT_SESSION } from "../utils/const";
import { useNavigate, useRouteLoaderData, Link } from "react-router-dom";
import { Search, User, CreditCard, Settings, LogOut, ChevronDown } from "lucide-react";

export default function Header({ type = "manager" }) {
  const session = useRouteLoaderData(type === "manager" ? MANAGER_SESSION : STUDENT_SESSION);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    secureLocalStorage.removeItem(STRORAGE_KEY);
    localStorage.removeItem("mock_auth_user");
    navigate(`/${type}/sign-in`, { replace: true });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = session?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div id="TopBar" className="flex items-center justify-between gap-6 py-2">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all shadow-sm"
          placeholder="Search courses, students, topics..."
        />
      </div>

      {/* User Profile dropdown */}
      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        <button
          type="button"
          id="profileButton"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 p-1.5 pl-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">{session?.name ?? "User"}</p>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              <p className="text-xs font-medium text-slate-500 capitalize">{session?.role ?? "User"}</p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden shrink-0">
            {session?.role === "student" && session?.photo_url ? (
              <img src={session.photo_url} className="w-full h-full object-cover" alt="profile" />
            ) : (
              <span>{initial}</span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 mr-1" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            id="ProfileDropdown"
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg py-1.5 z-40 animate-scale-in">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
              <p className="text-sm font-bold text-slate-900 truncate">{session?.email ?? session?.name}</p>
            </div>

            <div className="py-1">
              <Link
                to="#"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1D4ED8] transition-colors">
                <User className="w-4 h-4 text-slate-400" />
                <span>My Account</span>
              </Link>

              <Link
                to="#"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1D4ED8] transition-colors">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span>Subscription</span>
              </Link>

              <Link
                to="#"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1D4ED8] transition-colors">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-1">
              <button
                onClick={handleLogout}
                type="button"
                className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
