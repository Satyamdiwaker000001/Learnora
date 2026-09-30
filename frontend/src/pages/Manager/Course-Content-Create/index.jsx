import React, { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutateContentSchema } from "../../../utils/zodSchema";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Video, FileText, Youtube, Check, ChevronRight } from "lucide-react";

// Mock Data
const mockContents = [
  { _id: "ct1", courseId: "c1", title: "Introduction to React", type: "video", youtubeId: "dQw4w9WgXcQ", text: "" },
  {
    _id: "ct2",
    courseId: "c1",
    title: "JSX and Components",
    type: "text",
    youtubeId: "",
    text: "<p>JSX is a syntax extension for JavaScript that allows you to write HTML-like structures inside JavaScript code.</p>"
  }
];

export default function ManageCourseContentCreatePage() {
  const { id, contentId } = useParams(); // id = courseId
  const navigate = useNavigate();

  const existingContent = mockContents.find((c) => c._id === contentId);
  const isEditMode = !!existingContent || !!contentId;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(mutateContentSchema),
    defaultValues: {
      title: existingContent?.title ?? (contentId ? "Introduction Lesson" : ""),
      type: existingContent?.type ?? (contentId ? "video" : ""),
      youtubeId: existingContent?.youtubeId ?? (contentId ? "dQw4w9WgXcQ" : ""),
      text: existingContent?.text ?? ""
    }
  });

  useEffect(() => {
    if (existingContent?.type) {
      setValue("type", existingContent.type, { shouldValidate: true });
    }
  }, [existingContent, setValue]);

  const type = watch("type");

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, courseId: id };
      console.log(isEditMode ? "Updated Content:" : "Created Content:", payload);
      navigate(`/manager/courses/${id}`);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to={`/manager/courses/${id}`} className="hover:text-slate-600 transition-colors">
          Course Detail
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1D4ED8] font-bold">
          {isEditMode ? "Edit Lesson Content" : "New Lesson Content"}
        </span>
      </nav>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
            {isEditMode ? "Edit Lesson Content" : "Add Lesson Content"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Provide video links or rich editorial documentation for this lesson.
          </p>
        </div>
      </header>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col gap-6">
        
        {/* Lesson Title */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-semibold text-slate-700">
            Lesson Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              {...register("title")}
              type="text"
              id="title"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                errors?.title ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#1D4ED8]"
              }`}
              placeholder="e.g. Setting up the Development Environment"
            />
          </div>
          {errors?.title?.message && (
            <span className="text-xs font-medium text-[#DC2626]">{errors.title.message}</span>
          )}
        </div>

        {/* Content Type Selector */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-sm font-semibold text-slate-700">
            Content Delivery Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                type === "video"
                  ? "border-[#1D4ED8] bg-blue-50/60 ring-1 ring-[#1D4ED8]"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}>
              <input
                {...register("type")}
                type="radio"
                value="video"
                className="hidden"
              />
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1D4ED8] flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Video Lesson</p>
                <p className="text-xs text-slate-500">Embedded stream or YouTube ID</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                type === "text"
                  ? "border-[#0D9488] bg-teal-50/60 ring-1 ring-[#0D9488]"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}>
              <input
                {...register("type")}
                type="radio"
                value="text"
                className="hidden"
              />
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-[#0D9488] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Rich Text Guide</p>
                <p className="text-xs text-slate-500">Formatted documentation & code</p>
              </div>
            </label>
          </div>
          {errors?.type?.message && (
            <span className="text-xs font-medium text-[#DC2626]">{errors.type.message}</span>
          )}
        </div>

        {/* Video Type Input */}
        {type === "video" && (
          <div className="flex flex-col gap-1.5 animate-fade-in">
            <label htmlFor="youtubeId" className="text-sm font-semibold text-slate-700">
              YouTube Video ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-500">
                <Youtube className="w-4 h-4" />
              </div>
              <input
                {...register("youtubeId")}
                type="text"
                id="youtubeId"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all"
                placeholder="e.g. dQw4w9WgXcQ (11 character ID from URL)"
              />
            </div>
            <p className="text-xs text-slate-400">
              Paste the unique video identifier from your YouTube video URL (e.g. watch?v=<strong>dQw4w9WgXcQ</strong>).
            </p>
            {errors?.youtubeId?.message && (
              <span className="text-xs font-medium text-[#DC2626]">{errors.youtubeId.message}</span>
            )}
          </div>
        )}

        {/* Text / CKEditor Input */}
        {type === "text" && (
          <div className="flex flex-col gap-1.5 animate-fade-in">
            <label className="text-sm font-semibold text-slate-700">
              Lesson Content Body
            </label>
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: "Write complete step-by-step instructions, code snippets, or lesson guides..." }}
                data={watch("text") || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue("text", data, { shouldValidate: true });
                }}
              />
            </div>
            {errors?.text?.message && (
              <span className="text-xs font-medium text-[#DC2626]">{errors.text.message}</span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
          <button
            type="button"
            onClick={() => navigate(`/manager/courses/${id}`)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all">
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm shadow-md shadow-blue-900/10 transition-all cursor-pointer disabled:opacity-50">
            <Check className="w-4 h-4" />
            <span>{isEditMode ? "Save Lesson" : "Publish Lesson"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
