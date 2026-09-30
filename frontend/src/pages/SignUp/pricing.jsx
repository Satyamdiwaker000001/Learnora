import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Check, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export default function PricingPage({ data }) {
  console.log("Signup data (if any):", data);

  const plans = [
    {
      name: "Starter Plan",
      badge: "Self-Paced",
      price: "$0",
      period: "/month",
      description: "Ideal for individual students exploring fundamental programming and design courses.",
      popular: false,
      ctaText: "Get Started Free",
      features: [
        "Access to foundational courses",
        "Community discussion forums",
        "Self-paced learning pathway",
        "Standard course completion badges"
      ]
    },
    {
      name: "Pro Professional",
      badge: "Most Popular",
      price: "$49",
      period: "/month",
      description: "Designed for ambitious developers, designers, and career switchers seeking mastery.",
      popular: true,
      ctaText: "Choose Pro Plan",
      features: [
        "Unlimited access to 500+ courses",
        "Direct instructor Q&A sessions",
        "Official verified certificates",
        "Interactive assignments & code reviews",
        "Priority 24/7 technical support"
      ]
    },
    {
      name: "Enterprise Team",
      badge: "Organizations",
      price: "$99",
      period: "/month",
      description: "Customized learning management and analytics for engineering teams and institutions.",
      popular: false,
      ctaText: "Select Enterprise",
      features: [
        "Unlimited cohort student seats",
        "Admin analytics & completion reporting",
        "Custom learning path creator",
        "Dedicated account manager",
        "SSO & custom domain integration"
      ]
    }
  ];

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
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#1D4ED8] mb-4">
            <Sparkles className="w-4 h-4 text-[#0D9488]" />
            Flexible Educational Plans
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172554] tracking-tight">
            Choose the Plan that Fits Your <span className="text-[#1D4ED8]">Learning Journey</span>
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg">
            Whether you are just getting started or managing a team of learners, we have the right tier for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl flex flex-col justify-between p-8 transition-all duration-200 relative ${
                plan.popular
                  ? "bg-white border-2 border-[#1D4ED8] shadow-xl shadow-blue-900/10 ring-1 ring-[#1D4ED8]/20"
                  : "bg-white border border-slate-200 shadow-sm hover:border-slate-300"
              }`}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#172554]">{plan.name}</h3>
                  {!plan.popular && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
                </div>

                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Plan Highlights
                  </p>
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5 text-[#0D9488]">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to="/success-checkout"
                className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white shadow-md shadow-blue-900/20"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
                }`}>
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

PricingPage.propTypes = {
  data: PropTypes.object
};
