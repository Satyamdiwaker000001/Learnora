import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Users,
  CreditCard,
  Award,
  Settings
} from "lucide-react";

export default function Sidebar({ isAdmin = true }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/manager" && location.pathname === "/manager") return true;
    if (path === "/student" && location.pathname === "/student") return true;
    if (path !== "/manager" && path !== "/student" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItemClass = (active) =>
    `flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      active
        ? "bg-[#1D4ED8] text-white shadow-sm shadow-blue-900/20"
        : "text-slate-300 hover:text-white hover:bg-white/10"
    }`;

  return (
    <aside className="fixed top-3 left-3 bottom-3 w-[260px] bg-[#172554] text-white rounded-2xl flex flex-col z-30 shadow-xl border border-slate-800/60 overflow-hidden">
      {/* Brand Header */}
      <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
        <Link to={isAdmin ? "/manager" : "/student"} className="flex items-center gap-2">
          <img src="/assets/images/logos/logo-white.svg" className="h-8 w-auto" alt="Learnora logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 flex flex-col gap-6">
        <div>
          <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            {isAdmin ? "Admin Portal" : "Learning Portal"}
          </p>
          <ul className="flex flex-col gap-1.5">
            <li>
              <Link to={isAdmin ? "/manager" : "/student"} className={navItemClass(isActive(isAdmin ? "/manager" : "/student"))}>
                <LayoutDashboard className="w-5 h-5 shrink-0" />
                <span>Overview</span>
              </Link>
            </li>

            {isAdmin && (
              <>
                <li>
                  <Link to="/manager/courses" className={navItemClass(isActive("/manager/courses"))}>
                    <BookOpen className="w-5 h-5 shrink-0" />
                    <span>Courses</span>
                  </Link>
                </li>

                <li>
                  <Link to="/manager/categories" className={navItemClass(isActive("/manager/categories"))}>
                    <FolderTree className="w-5 h-5 shrink-0" />
                    <span>Categories</span>
                  </Link>
                </li>

                <li>
                  <Link to="/manager/students" className={navItemClass(isActive("/manager/students"))}>
                    <Users className="w-5 h-5 shrink-0" />
                    <span>Students</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Preferences
          </p>
          <ul className="flex flex-col gap-1.5">
            <li>
              <Link to="/manager/subscription" className={navItemClass(isActive("/manager/subscription"))}>
                <CreditCard className="w-5 h-5 shrink-0" />
                <span>Subscription</span>
              </Link>
            </li>

            <li>
              <Link to="/manager/rewards" className={navItemClass(isActive("/manager/rewards"))}>
                <Award className="w-5 h-5 shrink-0" />
                <span>Certifications</span>
              </Link>
            </li>

            <li>
              <Link to="/manager/settings" className={navItemClass(isActive("/manager/settings"))}>
                <Settings className="w-5 h-5 shrink-0" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Role Badge Footer */}
      <div className="p-4 border-t border-white/10 bg-slate-900/30">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0D9488] animate-pulse" />
          <div className="text-xs">
            <p className="font-semibold text-white capitalize">{isAdmin ? "Manager Mode" : "Student Mode"}</p>
            <p className="text-slate-400 text-[11px]">Learnora Platform</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
