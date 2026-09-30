import React, { useRef, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createCourseSchema, updateCourseSchema } from "../../../utils/zodSchema";
import { BookOpen, Tag, Sparkles, Upload, FileText, ArrowLeft, Image, Check } from "lucide-react";

// Mock Categories
const mockCategories = [
  { _id: "cat1", name: "Frontend" },
  { _id: "cat2", name: "Backend" },
  { _id: "cat3", name: "Database" },
  { _id: "cat4", name: "DevOps" }
];

const mockCourses = [
  {
    _id: "c1",
    name: "React for Beginners",
    tagline: "Learn React the easy way",
    categoryId: "cat1",
    description: "A complete introduction to React for building modern UIs.",
    thumbnail: null
  }
];

export default function ManageCreateCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingCourse = mockCourses.find((c) => c._id === id);
  const isEditMode = !!existingCourse || !!id;

  const [file, setFile] = useState(existingCourse?.thumbnail ?? null);
  const inputFileRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(isEditMode ? updateCourseSchema : createCourseSchema),
    defaultValues: {
      name: existingCourse?.name ?? (id ? "React for Beginners" : ""),
      tagline: existingCourse?.tagline ?? (id ? "Learn React the easy way" : ""),
      categoryId: existingCourse?.categoryId ?? (id ? "cat1" : ""),
      description: existingCourse?.description ?? (id ? "A complete introduction to React for building modern UIs." : "")
    }
  });

  useEffect(() => {
    if (existingCourse?.categoryId) {
      setValue("categoryId", existingCourse.categoryId);
    }
  }, [existingCourse, setValue]);

  const onSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        thumbnail: file ? file.name : null
      };

      console.log(isEditMode ? "Updated Course:" : "Created Course:", formData);
      navigate("/manager/courses");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header & Back Navigation */}
      <div className="flex items-center gap-3">
        <Link
          to="/manager/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1D4ED8] transition-colors p-2 rounded-lg hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </Link>
      </div>

      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            {isEditMode ? "Edit Course Details" : "Create New Course"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isEditMode
              ? "Update course curriculum information, tags, and descriptive copy."
              : "Publish a new learning module to your organization's course library."}
          </p>
        </div>
      </header>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col gap-8">
        
        {/* Core Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Course Title</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <input
                {...register("name")}
                placeholder="e.g. Modern Web Development with React"
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                  errors?.name ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                }`}
              />
            </div>
            {errors?.name?.message && (
              <span className="text-xs font-medium text-[#DC2626]">{errors.name.message}</span>
            )}
          </div>

          {/* Tagline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Short Tagline</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Sparkles className="w-4 h-4 text-[#0D9488]" />
              </div>
              <input
                {...register("tagline")}
                placeholder="e.g. Build production-grade fullstack apps"
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                  errors?.tagline ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                }`}
              />
            </div>
            {errors?.tagline?.message && (
              <span className="text-xs font-medium text-[#DC2626]">{errors.tagline.message}</span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Course Category</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Tag className="w-4 h-4" />
              </div>
              <select
                {...register("categoryId")}
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                  errors?.categoryId ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
                }`}>
                <option value="">Select a category</option>
                {mockCategories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {errors?.categoryId?.message && (
              <span className="text-xs font-medium text-[#DC2626]">{errors.categoryId.message}</span>
            )}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Course Cover Thumbnail</label>
          <div
            className="relative h-48 w-full border-2 border-dashed border-slate-200 hover:border-[#1D4ED8]/50 rounded-2xl overflow-hidden bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer transition-all group"
            onClick={() => inputFileRef?.current?.click()}>
            {file ? (
              <div className="relative w-full h-full">
                <img
                  src={typeof file === "string" ? file : URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                  alt="Thumbnail preview"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                  Click to replace thumbnail
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1D4ED8] shadow-sm">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Click to upload thumbnail</p>
                  <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, or WebP (Recommended 16:9 ratio)</p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
                setValue("thumbnail", e.target.files[0]);
              }
            }}
          />
          {errors?.thumbnail?.message && (
            <span className="text-xs font-medium text-[#DC2626]">{errors.thumbnail.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Detailed Description</label>
          <div className="relative">
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Explain the goals, learning outcomes, and prerequisites of this course..."
              className={`w-full p-4 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                errors?.description ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
              }`}
            />
          </div>
          {errors?.description?.message && (
            <span className="text-xs font-medium text-[#DC2626]">{errors.description.message}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate("/manager/courses")}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all">
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer disabled:opacity-50">
            <Check className="w-4 h-4" />
            <span>{isEditMode ? "Save Changes" : "Publish Course"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
