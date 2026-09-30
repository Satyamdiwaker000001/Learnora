import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addStudentCourseSchema } from "../../../utils/zodSchema";
import { UserCheck, ArrowLeft, Check, Users } from "lucide-react";

const mockStudents = [
  { _id: "s1", name: "Naila" },
  { _id: "s2", name: "Husnul" },
  { _id: "s3", name: "Fikri" },
  { _id: "s4", name: "Hufy" }
];

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(addStudentCourseSchema)
  });

  const onSubmit = async (values) => {
    console.log("Submitted values:", values);
    navigate(`/manager/courses/students/${id}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Back button */}
      <div className="flex items-center gap-3">
        <Link
          to={`/manager/courses/students/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1D4ED8] transition-colors p-2 rounded-lg hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Roster</span>
        </Link>
      </div>

      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            Enroll Student in Course
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Grant course curriculum access to a registered student.
          </p>
        </div>
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="studentId" className="text-sm font-semibold text-slate-700">
            Select Student
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Users className="w-4 h-4" />
            </div>
            <select
              {...register("studentId")}
              id="studentId"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                errors?.studentId ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
              }`}>
              <option value="">Choose a registered student</option>
              {mockStudents.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {errors?.studentId?.message && (
            <span className="text-xs font-medium text-[#DC2626]">{errors.studentId.message}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate(`/manager/courses/students/${id}`)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all">
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer disabled:opacity-50">
            <Check className="w-4 h-4" />
            <span>Confirm Enrollment</span>
          </button>
        </div>
      </form>
    </div>
  );
}
