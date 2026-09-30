import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
        <img src="/assets/images/logos/logo.svg" className="h-9 w-auto" alt="Learnora logo" />
      </Link>
      
      <ul className="hidden md:flex items-center gap-8 ml-auto">
        <li>
          <Link
            to="/"
            className={`font-semibold text-sm transition-colors duration-200 ${
              location.pathname === "/" ? "text-[#1D4ED8]" : "text-[#64748B] hover:text-[#0F172A]"
            }`}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/manager/sign-up/pricing"
            className={`font-semibold text-sm transition-colors duration-200 ${
              location.pathname.includes("/pricing") ? "text-[#1D4ED8]" : "text-[#64748B] hover:text-[#0F172A]"
            }`}>
            Pricing
          </Link>
        </li>
        <li>
          <a
            href="#features"
            className="font-semibold text-sm text-[#64748B] hover:text-[#0F172A] transition-colors duration-200">
            Features
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            className="font-semibold text-sm text-[#64748B] hover:text-[#0F172A] transition-colors duration-200">
            Testimonials
          </a>
        </li>
      </ul>
    </div>
  );
}
