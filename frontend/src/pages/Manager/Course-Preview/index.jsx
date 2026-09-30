import React, { useState } from "react";
import Header from "../../../components/Header";
import ContentText from "./content-text";
import ContentVideo from "./content-video";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { ArrowLeft, Video, FileText, CheckCircle2, BookOpen, Layers } from "lucide-react";

export default function ManageCoursePreviewPage({ isAdmin = true }) {
  const course = useLoaderData();
  const { id } = useParams();

  const [activeContent, setActiveContent] = useState(course?.details?.[0]);
  const [completedIds, setCompletedIds] = useState([]);

  const handleChangeContent = (content) => {
    setActiveContent(content);
  };

  const handleNextContent = (content) => {
    if (content?._id && !completedIds.includes(content._id)) {
      setCompletedIds([...completedIds, content._id]);
    }
    const currIndex = course?.details?.findIndex((val) => val._id === content._id);
    if (currIndex !== undefined && currIndex < (course?.details?.length ?? 0) - 1) {
      handleChangeContent(course.details[currIndex + 1]);
    }
  };

  const isActive = (item) => activeContent?._id === item._id;
  const isCompleted = (item) => completedIds.includes(item._id);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Player Sidebar */}
      <aside className="fixed top-3 left-3 bottom-3 w-[300px] bg-[#172554] text-white rounded-2xl flex flex-col z-30 shadow-xl border border-slate-800/60 overflow-hidden">
        {/* Header Back link */}
        <div className="p-5 border-b border-white/10 flex flex-col gap-3">
          <Link
            to={isAdmin ? `/manager/courses/${id || course?._id}` : "/student"}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>{isAdmin ? "Exit Course Preview" : "Back to Learning Dashboard"}</span>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <BookOpen className="w-5 h-5 text-[#2DD4BF] shrink-0" />
            <h2 className="font-bold text-base text-white line-clamp-1">{course?.name}</h2>
          </div>
        </div>

        {/* Lessons List */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-3 flex flex-col gap-2">
          <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            <span>Course Lessons</span>
            <span>{completedIds.length}/{course?.details?.length ?? 0} Done</span>
          </div>

          <ul className="flex flex-col gap-1.5">
            {course?.details?.map((item, idx) => {
              const active = isActive(item);
              const done = isCompleted(item);
              const isVideo = item.type === "video";

              return (
                <li key={item._id || idx}>
                  <button
                    type="button"
                    className={`w-full text-left p-3 rounded-xl flex items-center gap-3 text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-[#1D4ED8] text-white shadow-md shadow-blue-900/30"
                        : done
                        ? "bg-white/5 text-emerald-300 hover:bg-white/10"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => handleChangeContent(item)}>
                    
                    <div className="shrink-0">
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      ) : isVideo ? (
                        <Video className="w-4 h-4 opacity-80" />
                      ) : (
                        <FileText className="w-4 h-4 opacity-80" />
                      )}
                    </div>

                    <span className="flex-1 line-clamp-1">{item.title}</span>

                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/20 uppercase tracking-wider">
                      {idx + 1}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-slate-900/40 text-xs text-slate-400">
          <p className="font-semibold text-white">Learnora Learning Engine</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Continuous progress tracking active</p>
        </div>
      </aside>

      {/* Main Learning Content Viewer */}
      <main className="flex flex-col flex-1 gap-6 p-6 md:p-8 ml-[320px] max-w-[calc(100vw-340px)] min-h-screen">
        <Header type={isAdmin ? "manager" : "student"} />
        <div className="flex-1 mt-2">
          {activeContent?.type === "text" ? (
            <ContentText content={activeContent} handleNext={handleNextContent} />
          ) : (
            <ContentVideo content={activeContent} handleNext={handleNextContent} />
          )}
        </div>
      </main>
    </div>
  );
}
