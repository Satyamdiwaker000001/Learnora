import React from "react";
import Courses from "./courses";
import Students from "./students";
import { Link, useLoaderData } from "react-router-dom";
import { Users, BookOpen, Video, FileText, ArrowRight, Download, Plus, TrendingUp } from "lucide-react";

export default function ManagerHome() {
  const overview = useLoaderData();
  const totalStudents = overview?.students?.length ?? 4;
  const totalCourses = overview?.courses?.length ?? 6;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome to your Learnora administrative command center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Data</span>
          </button>
          
          <Link
            to="/manager/courses/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold shadow-sm shadow-blue-900/10 transition-all">
            <Plus className="w-4 h-4" />
            <span>New Course</span>
          </Link>
        </div>
      </header>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enrolled</p>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">{totalStudents}</h3>
            <p className="text-xs text-[#16A34A] font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Active Learners
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Courses</p>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">{totalCourses}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Across 4 Categories</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0D9488]">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Video Modules</p>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">12</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">HD Video Lessons</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#1D4ED8]">
            <Video className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Text Content</p>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">18</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Guides & Articles</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Middle Row: Completion Status + Students */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Course completion status */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#172554]">Course Completion Rate</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#16A34A]">
                On Track
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Average aggregate progress across all active cohorts and enrolled students.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" className="stroke-slate-100" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  className="stroke-[#1D4ED8]"
                  strokeWidth="3.5"
                  strokeDasharray="94.2"
                  strokeDashoffset="23.55"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#0F172A]">75%</span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Completed</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
              <span className="text-slate-600">75% Finished</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span className="text-slate-400">25% In Progress</span>
            </div>
            <Link to="/manager/courses" className="text-[#1D4ED8] hover:underline font-bold">
              View details →
            </Link>
          </div>
        </div>

        {/* Latest Students */}
        <div className="lg:col-span-7">
          <Students />
        </div>
      </div>

      {/* Latest Courses Grid */}
      <div className="w-full">
        <Courses />
      </div>
    </div>
  );
}
