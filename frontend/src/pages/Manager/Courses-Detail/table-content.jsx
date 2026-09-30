import React from "react";
import ContentItem from "./content-item";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Plus, Layers, BookOpen } from "lucide-react";

export default function TableContent({ details = [], courseId }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#1D4ED8]" />
          <h2 className="font-bold text-lg text-slate-900">Curriculum Modules & Lessons</h2>
          <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D4ED8] font-bold text-xs">
            {details.length}
          </span>
        </div>

        <Link
          to={`/manager/courses/${courseId}/create`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-xs shadow-sm transition-all w-fit">
          <Plus className="w-4 h-4" />
          <span>Add Lesson Content</span>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {details.length > 0 ? (
          details.map((content, i) => (
            <ContentItem
              key={content._id || i}
              type={content.type}
              title={content.title}
              id={content._id}
              index={i + 1}
              courseId={courseId}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700 text-sm">No lessons added yet</p>
            <p className="text-xs text-slate-400 mt-0.5">Add your first video or rich text lesson.</p>
          </div>
        )}
      </div>
    </div>
  );
}

TableContent.propTypes = {
  details: PropTypes.array,
  courseId: PropTypes.string
};
