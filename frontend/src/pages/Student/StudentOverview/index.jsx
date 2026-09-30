import React from "react";
import CardCourse from "./CardCourse";
import { useLoaderData, Link } from "react-router-dom";
import { BookOpen, Award, CheckCircle2, Play, Sparkles } from "lucide-react";

export default function StudentPage() {
  const courses = useLoaderData() || [];

  return (
    <div className="flex flex-col gap-8">
      {/* Student Welcome Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            Student Learning Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            My Enrolled Courses
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Pick up right where you left off and complete your learning milestones.
          </p>
        </div>
      </header>

      {/* Course Cards Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1D4ED8]" />
            <h2 className="font-bold text-lg text-slate-900">Active Curriculum Modules</h2>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] font-bold text-xs">
              {courses.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map((item) => (
            <CardCourse
              key={item._id}
              id={item._id}
              category={item.category?.name ?? "Frontend"}
              title={item.name}
              imageUrl={item.thumbnail_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
