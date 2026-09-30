import React from "react";
import PropTypes from "prop-types";
import { CheckCircle2, Video, ArrowRight } from "lucide-react";

export default function ContentVideo({ content, handleNext }) {
  const youtubeId = content?.youtubeId;

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Video player card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col gap-5">
        <div className="w-full aspect-video rounded-xl bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center relative">
          {youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
              title={content?.title || "Video lesson player"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
              <Video className="w-12 h-12 text-slate-600" />
              <p className="text-sm font-medium">Video preview unavailable or processing</p>
            </div>
          )}
        </div>

        {/* Lesson Title & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#1D4ED8] text-xs font-semibold mb-1.5">
              <Video className="w-3.5 h-3.5" /> Video Module
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#172554] tracking-tight">
              {content?.title}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => handleNext(content)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-xs shadow-md shadow-blue-900/15 transition-all cursor-pointer shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Completed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

ContentVideo.propTypes = {
  content: PropTypes.shape({
    _id: PropTypes.string,
    youtubeId: PropTypes.string,
    title: PropTypes.string
  }),
  handleNext: PropTypes.func
};
