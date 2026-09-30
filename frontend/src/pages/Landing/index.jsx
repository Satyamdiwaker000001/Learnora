import React from "react";
import { Link } from "react-router-dom";
import { Video, BookOpen, Users, Award, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function LandingPage() {
  const features = [
    {
      icon: <Video className="w-6 h-6 text-[#1D4ED8]" />,
      title: "Expert-Led Video Courses",
      desc: "Learn directly from industry veterans with proven track records and comprehensive real-world curriculum."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#0D9488]" />,
      title: "Hands-On Practical Learning",
      desc: "Reinforce concepts through guided lessons, interactive exercises, and project-based assignments."
    },
    {
      icon: <Users className="w-6 h-6 text-[#1D4ED8]" />,
      title: "Collaborative Student Community",
      desc: "Connect with thousands of ambitious learners, share insights, and get fast feedback on your work."
    },
    {
      icon: <Award className="w-6 h-6 text-[#0D9488]" />,
      title: "Verified Industry Certificates",
      desc: "Earn shareable, verified credentials to highlight your achievements and accelerate career progress."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header / Navbar */}
      <header className="w-full sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center gap-6">
          <Navbar />
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/manager/sign-in"
              className="hidden sm:inline-flex items-center justify-center font-semibold text-sm text-slate-700 hover:text-[#1D4ED8] px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link
              to="/manager/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm px-5 py-2.5 shadow-sm shadow-blue-900/10 transition-all">
              <span>My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#1D4ED8] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
            Next-Generation Learning Experience
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#172554] tracking-tight leading-[1.15]">
            Master New Skills with <span className="text-[#1D4ED8]">Expert Guidance</span>
          </h1>

          <p className="text-slate-600 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners and teams worldwide. Access structured courses, build real-world capability, and accelerate your growth.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/manager/sign-up"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-base rounded-xl shadow-md shadow-blue-700/15 transition-all">
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/manager/sign-in"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base rounded-xl border border-slate-200 shadow-sm transition-all">
              Sign In to Portal
            </Link>
          </div>

          {/* Quick value highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Verified Curriculum
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Self-Paced Video & Text
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> No Credit Card Required
            </span>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-4 md:pt-0">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#1D4ED8] tracking-tight">50,000+</h3>
              <p className="text-slate-600 font-medium mt-1">Active Students & Learners</p>
            </div>
            <div className="pt-6 md:pt-0">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#172554] tracking-tight">500+</h3>
              <p className="text-slate-600 font-medium mt-1">Curated Courses & Modules</p>
            </div>
            <div className="pt-6 md:pt-0">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#0D9488] tracking-tight">95%</h3>
              <p className="text-slate-600 font-medium mt-1">Completion & Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Why Learnora</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172554] mt-2">
              Everything You Need to Excel
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              A comprehensive platform designed for student learning and intuitive instructor administration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Trust banner */}
      <section id="testimonials" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 text-amber-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-semibold text-slate-800 leading-snug">
            "Learnora provides the cleanest, most structured learning environment we've ever used. Managing courses and tracking student progress is effortless."
          </blockquote>
          <div className="mt-6">
            <p className="font-bold text-[#172554]">Sarah Jenkins</p>
            <p className="text-xs text-slate-500">Director of Learning & Development</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/images/logos/logo-white.svg" className="h-8 w-auto" alt="Learnora" />
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/manager/sign-up/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/manager/sign-in" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/manager/sign-up" className="hover:text-white transition-colors">Register</Link>
          </div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Learnora. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
