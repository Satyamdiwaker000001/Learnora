import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import StudentItem from "./student-item";
import { Users, UserPlus, ArrowLeft, ChevronRight } from "lucide-react";

export default function StudentsCourseList() {
  const { id } = useParams();
  const course = useLoaderData();
  const studentList = course?.students || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to="/manager/courses" className="hover:text-slate-600 transition-colors">Courses</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/manager/courses/${id}`} className="hover:text-slate-600 transition-colors">{course?.name ?? "Course"}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1D4ED8] font-bold">Enrolled Students</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            Course Enrollment Roster
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage students actively enrolled in <strong className="text-slate-700">{course?.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/manager/courses/students/${id}/add`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold shadow-sm shadow-blue-900/10 transition-all">
            <UserPlus className="w-4 h-4" />
            <span>Enroll Student</span>
          </Link>
        </div>
      </header>

      {/* List Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1D4ED8]" />
            <h2 className="font-bold text-lg text-slate-900">Enrolled Learners</h2>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] font-bold text-xs">
              {studentList.length}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {studentList.length > 0 ? (
            studentList.map((item) => (
              <StudentItem
                key={item._id}
                id={item._id}
                name={item.name}
                imageUrl={item.photo_url ?? null}
              />
            ))
          ) : (
            <div className="text-center py-14">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700 text-base">No students enrolled in this course yet</p>
              <p className="text-xs text-slate-400 mt-1">Enroll your first student into this cohort.</p>
              <Link
                to={`/manager/courses/students/${id}/add`}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1D4ED8] text-white text-xs font-semibold">
                <UserPlus className="w-3.5 h-3.5" />
                Enroll Student
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
