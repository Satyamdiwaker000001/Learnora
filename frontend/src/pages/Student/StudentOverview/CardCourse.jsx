import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Tag, Play, ArrowRight } from "lucide-react";

export default function CardCourse({
  id = "1",
  imageUrl = "/assets/images/thumbnails/th-blue.png",
  category = "Programming",
  title = "Responsive Web Design"
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-20 h-16 rounded-xl bg-blue-50 border border-slate-200 overflow-hidden shrink-0">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/images/thumbnails/th-blue.png";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#1D4ED8] mb-1">
            <Tag className="w-3 h-3" />
            {category}
          </span>
          <Link
            to={`/student/detail-course/${id}`}
            className="font-bold text-sm sm:text-base text-slate-900 hover:text-[#1D4ED8] line-clamp-1 transition-colors block">
            {title}
          </Link>
        </div>
      </div>

      <Link
        to={`/student/detail-course/${id}`}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold shadow-sm transition-all self-end sm:self-center shrink-0">
        <Play className="w-3.5 h-3.5" />
        <span>Resume Course</span>
      </Link>
    </div>
  );
}

CardCourse.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string
};
