import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createStudentSchema, updateStudentSchema } from "../../../utils/zodSchema";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User, Mail, Lock, Upload, ArrowLeft, Check, UserPlus } from "lucide-react";

// Mock Students
const mockStudents = [
  {
    _id: "s1",
    name: "Naila",
    email: "naila@example.com",
    photo_url: "/assets/images/photos/photo-profile-blue.svg"
  },
  {
    _id: "s2",
    name: "Husnul",
    email: "husnul@example.com",
    photo_url: "/assets/images/photos/photo-profile-blue.svg"
  }
];

export default function ManageStudentCreatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const existingStudent = mockStudents.find((s) => s._id === id);
  const isEditMode = !!existingStudent || !!id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(isEditMode ? updateStudentSchema : createStudentSchema),
    defaultValues: {
      name: existingStudent?.name || (id ? "Student Name" : ""),
      email: existingStudent?.email || (id ? "student@example.com" : "")
    }
  });

  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const onSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        avatar: file ? file.name : existingStudent?.photo_url || null
      };

      console.log(isEditMode ? "Updated Student:" : "Created Student:", formData);
      navigate("/manager/students");
    } catch (error) {
      console.error("Error submitting student:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Header & Back Navigation */}
      <div className="flex items-center gap-3">
        <Link
          to="/manager/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1D4ED8] transition-colors p-2 rounded-lg hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </Link>
      </div>

      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            {isEditMode ? "Edit Student Profile" : "Add New Student"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isEditMode
              ? "Update student contact information and details."
              : "Register a student to grant course access and issue certifications."}
          </p>
        </div>
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col gap-6">
        
        {/* Avatar Upload */}
        <div className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <div
            className="w-24 h-24 rounded-full bg-blue-50 border-2 border-slate-200 overflow-hidden flex items-center justify-center cursor-pointer relative group shadow-inner"
            onClick={() => inputFileRef.current?.click()}>
            {file || existingStudent?.photo_url ? (
              <img
                src={file ? URL.createObjectURL(file) : existingStudent?.photo_url}
                className="w-full h-full object-cover"
                alt="Avatar preview"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <Upload className="w-6 h-6 text-[#1D4ED8]" />
              </div>
            )}
            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
              Change
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-700 mt-3">Student Profile Picture</p>
          <p className="text-[11px] text-slate-400">Click avatar circle to upload image file</p>

          <input
            type="file"
            {...register("avatar")}
            ref={inputFileRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const fileUploaded = e.target.files?.[0];
              if (fileUploaded) {
                setFile(fileUploaded);
                setValue("avatar", fileUploaded, { shouldValidate: true });
              }
            }}
          />
          {errors?.avatar?.message && (
            <span className="text-xs font-medium text-[#DC2626] mt-2">{errors.avatar.message}</span>
          )}
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="e.g. Alex Morgan"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                errors?.name ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
              }`}
            />
          </div>
          {errors?.name?.message && (
            <span className="text-xs font-medium text-[#DC2626]">{errors.name.message}</span>
          )}
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="alex@example.com"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                errors?.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
              }`}
            />
          </div>
          {errors?.email?.message && (
            <span className="text-xs font-medium text-[#DC2626]">{errors.email.message}</span>
          )}
        </div>

        {/* Password (for Add mode) */}
        {!isEditMode && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Initial Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="At least 6 characters"
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                  errors?.password ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                }`}
              />
            </div>
            {errors?.password?.message && (
              <span className="text-xs font-medium text-[#DC2626]">{errors.password.message}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate("/manager/students")}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all">
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer disabled:opacity-50">
            <Check className="w-4 h-4" />
            <span>{isEditMode ? "Save Changes" : "Create Student"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
