import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Users, ArrowRight, BookOpen } from "lucide-react";

export default function Students() {
  const overview = useLoaderData();
  const students = overview?.students?.slice(0, 4) || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#172554]">Recent Students</h3>
          <p className="text-xs text-slate-500 mt-0.5">Active learners enrolled in your courses</p>
        </div>
        <Link
          to="/manager/students"
          className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1">
          <span>All Students</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto">
        {students.map((student) => {
          const initial = student.name?.charAt(0)?.toUpperCase() ?? "S";
          return (
            <div
              key={student._id}
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col items-center text-center hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all duration-200">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-lg flex items-center justify-center mb-3 shadow-inner overflow-hidden">
                {student.photo_url ? (
                  <img src={student.photo_url} className="w-full h-full object-cover" alt={student.name} />
                ) : (
                  <span>{initial}</span>
                )}
              </div>

              <p className="font-bold text-sm text-slate-900 line-clamp-1 w-full">{student.name}</p>

              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-600">
                <BookOpen className="w-3 h-3 text-[#0D9488]" />
                <span>{student.courses?.length ?? 1} Courses</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Managing {overview?.students?.length ?? 4} total students</span>
        <Link to="/manager/students/create" className="font-bold text-[#1D4ED8] hover:underline">
          + Add New Student
        </Link>
      </div>
    </div>
  );
}
