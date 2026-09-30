import React from "react";
import { Link } from "react-router-dom";
import { mockCourses } from "../../../utils/mockData";
import { BookOpen, Users, Tag, ArrowRight } from "lucide-react";

export default function Courses() {
  const courses = mockCourses.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#172554]">Active Course Catalog</h3>
          <p className="text-xs text-slate-500 mt-0.5">Explore recent curriculum modules and student enrollment</p>
        </div>
        <Link
          to="/manager/courses"
          className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1">
          <span>Manage All Courses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((item) => (
          <div
            key={item._id}
            className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200">
            <div className="w-20 h-16 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
              <img
                src={item.thumbnail_url}
                className="w-full h-full object-cover"
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/thumbnails/th-blue.png";
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1D4ED8]">
                  <Tag className="w-2.5 h-2.5" />
                  {item.category?.name ?? "General"}
                </span>
              </div>

              <Link
                to={`/manager/courses/${item._id}`}
                className="font-bold text-sm text-[#0F172A] hover:text-[#1D4ED8] line-clamp-1 transition-colors block">
                {item.name}
              </Link>

              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                <span>{item.students?.length ?? 0} Enrolled Students</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
