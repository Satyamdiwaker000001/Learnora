import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../utils/zodSchema";
import PropTypes from "prop-types";
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from "lucide-react";
import secureLocalStorage from "react-secure-storage";
import { STRORAGE_KEY } from "../../utils/const";

// Mock user accounts for testing
const mockUsers = [
  {
    email: "manager@example.com",
    password: "password123",
    role: "manager",
    name: "Admin Manager"
  },
  {
    email: "student@example.com",
    password: "password123",
    role: "student",
    name: "Husnul"
  }
];

export default function SignInPage({ type = "manager" }) {
  const [activeRole, setActiveRole] = useState(type);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: type === "student" ? "student@example.com" : "manager@example.com",
      password: "password123"
    }
  });

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setAuthError("");
    if (role === "manager") {
      setValue("email", "manager@example.com");
      setValue("password", "password123");
    } else {
      setValue("email", "student@example.com");
      setValue("password", "password123");
    }
  };

  const onSubmit = async (data) => {
    setAuthError("");
    try {
      // Find matching user or fallback to standard demo user based on active role
      let user = mockUsers.find((u) => u.email.toLowerCase() === data.email.toLowerCase());

      if (!user) {
        user = {
          email: data.email,
          role: activeRole,
          name: activeRole === "manager" ? "Admin Manager" : "Student Learner"
        };
      }

      // Store in session storage for loaders
      secureLocalStorage.setItem(STRORAGE_KEY, user);
      localStorage.setItem("mock_auth_user", JSON.stringify(user));

      if (user.role === "manager" || activeRole === "manager") {
        navigate("/manager");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setAuthError("Failed to sign in. Please verify your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Navbar Header */}
      <header className="w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Navbar />
          <div className="flex items-center gap-3">
            <Link
              to="/manager/sign-up"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#1D4ED8] bg-blue-50 hover:bg-blue-100 transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Context */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#1D4ED8] w-fit">
              <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
              Secure Portal Authentication
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#172554] tracking-tight leading-tight">
              Welcome back to <span className="text-[#1D4ED8]">Learnora</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Sign in to manage your educational catalog, evaluate students, or resume your personalized learning pathway.
            </p>

            {/* Demo Quick Fill Helper */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Quick Demo Switcher
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange("manager")}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    activeRole === "manager"
                      ? "border-[#1D4ED8] bg-blue-50/60 ring-1 ring-[#1D4ED8]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}>
                  <ShieldCheck className={`w-5 h-5 ${activeRole === "manager" ? "text-[#1D4ED8]" : "text-slate-400"}`} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Manager Demo</p>
                    <p className="text-xs text-slate-500">Instructor & Admin</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("student")}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    activeRole === "student"
                      ? "border-[#0D9488] bg-teal-50/60 ring-1 ring-[#0D9488]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}>
                  <UserCheck className={`w-5 h-5 ${activeRole === "student" ? "text-[#0D9488]" : "text-slate-400"}`} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Student Demo</p>
                    <p className="text-xs text-slate-500">Learner View</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg shadow-slate-200/50">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#172554]">
                  Sign In as {activeRole === "manager" ? "Manager" : "Student"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Enter your registered email address and credentials below.
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                        errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                      }`}
                      placeholder="name@example.com"
                      {...register("email")}
                    />
                  </div>
                  {errors.email?.message && (
                    <span className="text-xs font-medium text-[#DC2626]">{errors.email?.message}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <Link to="#" className="text-xs font-semibold text-[#1D4ED8] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                        errors.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                      }`}
                      placeholder="••••••••"
                      {...register("password")}
                    />
                  </div>
                  {errors.password?.message && (
                    <span className="text-xs font-medium text-[#DC2626]">{errors.password?.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer disabled:opacity-50">
                  <span>Sign In to {activeRole === "manager" ? "Manager Portal" : "Student Portal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                Don't have an account yet?{" "}
                <Link to="/manager/sign-up" className="font-semibold text-[#1D4ED8] hover:underline">
                  Create free account
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

SignInPage.propTypes = {
  type: PropTypes.string
};
