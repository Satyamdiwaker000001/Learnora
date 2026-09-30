import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function SuccesCheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Navbar />
          <div className="flex items-center gap-3">
            <Link
              to="/manager/sign-in"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#1D4ED8] bg-blue-50 hover:bg-blue-100 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 sm:p-12 max-w-lg w-full text-center animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-extrabold text-[#172554] tracking-tight mb-3">
            Subscription Confirmed!
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            Your Learnora workspace plan is now active. Please sign in with your credentials to access your courses and administrative dashboard.
          </p>

          <Link
            to="/manager/sign-in"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm shadow-md shadow-blue-900/15 transition-all">
            <span>Sign In to Learnora</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
