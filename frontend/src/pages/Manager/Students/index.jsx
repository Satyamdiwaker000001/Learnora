import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import StudentItem from "./student-item";
import { Users, UserPlus, Upload } from "lucide-react";

export default function ManageStudentsPage() {
  const students = useLoaderData() || [];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            Manage Students
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor enrolled learners, view course participation, and manage user accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 shadow-sm transition-all">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Import</span>
          </button>

          <Link
            to="/manager/students/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold shadow-sm shadow-blue-900/10 transition-all">
            <UserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </Link>
        </div>
      </header>

      {/* Main Student List Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1D4ED8]" />
            <h2 className="font-bold text-lg text-slate-900">Registered Students</h2>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] font-bold text-xs">
              {students.length}
            </span>
          </div>
        </div>

        {/* Student Items Feed */}
        <div className="flex flex-col gap-4">
          {students.length > 0 ? (
            students.map((item) => (
              <StudentItem
                key={item._id}
                id={item._id}
                imageUrl={item.photo_url}
                name={item.name}
                totalCourse={item.courses?.length ?? 1}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700 text-base">No students registered</p>
              <p className="text-xs text-slate-400 mt-1">Add students to start tracking their progress.</p>
              <Link
                to="/manager/students/create"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1D4ED8] text-white text-xs font-semibold">
                <UserPlus className="w-3.5 h-3.5" />
                Add Student
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {students.length > 0 && (
          <div id="Pagination" className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{students.length}</span> students
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                    num === 1
                      ? "bg-[#1D4ED8] text-white shadow-sm"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}>
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
