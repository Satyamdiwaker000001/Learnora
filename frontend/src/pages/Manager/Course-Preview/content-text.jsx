import React from "react";
import PropTypes from "prop-types";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ContentText({ content, handleNext }) {
  return (
    <div className="flex flex-col gap-6 max-w-4xl pb-24">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-xs font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
          Editorial Lesson Guide
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight mb-6">
          {content?.title}
        </h1>
        
        {/* Rendered HTML */}
        <article
          id="Content-wrapper"
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content?.text || "<p>Welcome to this lesson. Review the curriculum material and mark as completed when you are finished.</p>" }}
        />
      </div>

      {/* Floating Completion Footer */}
      <div className="fixed bottom-6 right-8 z-30 flex items-center gap-3 p-3 px-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl">
        <div className="hidden sm:block text-right mr-2">
          <p className="text-xs font-bold text-slate-900">Finished this module?</p>
          <p className="text-[11px] text-slate-500">Advance to the next lesson</p>
        </div>
        <button
          type="button"
          onClick={() => handleNext(content)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-xs shadow-md shadow-blue-900/15 transition-all cursor-pointer">
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark as Completed</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

ContentText.propTypes = {
  content: PropTypes.object,
  handleNext: PropTypes.func
};
