import React from "react";
import TableContent from "./table-content";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { Users, Tag, BookOpen, Award, ArrowLeft, Edit, Play, ChevronRight } from "lucide-react";

export default function ManageCourseDetailPage() {
  const { id } = useParams();
  const course = useLoaderData();
  const detailsList = course?.details ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to="/manager" className="hover:text-slate-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/manager/courses" className="hover:text-slate-600 transition-colors">Courses</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1D4ED8] font-bold">{course?.name ?? "Course Detail"}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            {course?.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {course?.tagline ?? "Detailed curriculum overview and published modules."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/manager/courses/edit/${id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 shadow-sm transition-all">
            <Edit className="w-4 h-4 text-slate-500" />
            <span>Edit Course</span>
          </Link>

          <Link
            to={`/manager/courses/${id}/preview`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold shadow-sm shadow-blue-900/10 transition-all">
            <Play className="w-4 h-4" />
            <span>Preview Player</span>
          </Link>
        </div>
      </header>

      {/* Course Info Banner */}
      <section id="CourseInfo" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-3 flex items-center justify-center">
          <div className="w-full h-56 rounded-xl bg-slate-100 overflow-hidden relative">
            <img
              src={course?.thumbnail_url ?? "/assets/images/thumbnails/th-blue.png"}
              className="w-full h-full object-cover"
              alt="Course cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/thumbnails/th-blue.png";
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Enrolled Students</p>
              <h3 className="text-xl font-extrabold text-[#0F172A] mt-0.5">
                {course?.students?.length ?? 11} Learners
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center mb-3">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</p>
              <h3 className="text-xl font-extrabold text-[#0F172A] mt-0.5">
                {course?.category?.name ?? "Frontend"}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#1D4ED8] flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Curriculum Content</p>
              <h3 className="text-xl font-extrabold text-[#0F172A] mt-0.5">
                {detailsList.length} {detailsList.length === 1 ? "Lesson" : "Lessons"}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Certification</p>
              <h3 className="text-xl font-extrabold text-[#0F172A] mt-0.5">
                Official Credential
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content & Lessons Table */}
      <TableContent details={detailsList} courseId={course?._id || id} />
    </div>
  );
}
