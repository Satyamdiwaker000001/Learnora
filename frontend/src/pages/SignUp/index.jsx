import React from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../utils/zodSchema";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, BookOpen, Award } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = (data) => {
    console.log("SignUp Data:", data);
    localStorage.setItem("mockSignUpData", JSON.stringify(data));
    navigate("/manager/sign-up/pricing", { state: { data } });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Navbar Header */}
      <header className="w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Navbar />
          <div className="flex items-center gap-3">
            <Link
              to="/manager/sign-in"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#1D4ED8] transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Context & Benefits */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#1D4ED8] w-fit">
              <Sparkles className="w-4 h-4 text-[#0D9488]" />
              Start Your Educational Journey
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#172554] tracking-tight leading-tight">
              Empower your future with <span className="text-[#1D4ED8]">Learnora</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Create an account to access our full course catalog, organize cohorts, track assessments, and earn industry-recognized credentials.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-[#1D4ED8]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Comprehensive Course Library</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Explore 500+ curated modules across engineering, design, and business.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 text-[#0D9488]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Verified Certifications</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Track your progress and receive certificates upon lesson completion.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Signup Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg shadow-slate-200/50">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#172554]">Create Your Account</h2>
                <p className="text-sm text-slate-500 mt-1">Get started in seconds. No credit card required.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                        errors.name ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                      }`}
                      placeholder="Jane Doe"
                      {...register("name")}
                    />
                  </div>
                  {errors.name?.message && (
                    <span className="text-xs font-medium text-[#DC2626]">{errors.name?.message}</span>
                  )}
                </div>

                {/* Email Address */}
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
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
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

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                        errors.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                      }`}
                      placeholder="At least 6 characters"
                      {...register("password")}
                    />
                  </div>
                  {errors.password?.message && (
                    <span className="text-xs font-medium text-[#DC2626]">{errors.password?.message}</span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                        errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                      }`}
                      placeholder="Repeat password"
                      {...register("confirmPassword")}
                    />
                  </div>
                  {errors.confirmPassword?.message && (
                    <span className="text-xs font-medium text-[#DC2626]">{errors.confirmPassword?.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer disabled:opacity-50">
                  <span>Continue to Plan Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/manager/sign-in" className="font-semibold text-[#1D4ED8] hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
