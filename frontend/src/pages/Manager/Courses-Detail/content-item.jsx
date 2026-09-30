import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/ErrorToast";
import { useConfirmModal } from "../../../components/common/UseConfirmModal";
import { Video, FileText, Trash2, Edit3 } from "lucide-react";

// Mock content storage
let mockContents = [
  { _id: "ct1", title: "Introduction to React", type: "video", courseId: "c1" },
  { _id: "ct2", title: "JSX and Components", type: "text", courseId: "c1" }
];

const deleteMockContent = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exists = mockContents.some((item) => item._id === id);
      if (!exists) {
        mockContents = mockContents.filter((item) => item._id !== id);
        resolve({ status: "success", deletedId: id });
      } else {
        mockContents = mockContents.filter((item) => item._id !== id);
        resolve({ status: "success", deletedId: id });
      }
    }, 500);
  });
};

export default function ContentItem({ id, index, type, title, courseId }) {
  const confirmModal = useConfirmModal();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    setError(null);
    confirmModal.open(async () => {
      setIsLoading(true);
      try {
        await deleteMockContent(id);
        setIsDeleted(true);
        console.log(`Deleted content ${id}`);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to delete content");
      } finally {
        setIsLoading(false);
        confirmModal.close();
      }
    });
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      confirmModal.close();
    }
  };

  if (isDeleted) return null;

  const isVideo = type === "video";

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200">
        
        {/* Index Badge & Details */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#172554] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {index}
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
            {isVideo ? (
              <Video className="w-5 h-5 text-[#1D4ED8]" />
            ) : (
              <FileText className="w-5 h-5 text-[#0D9488]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-slate-900 line-clamp-1" title={title}>
              {title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                isVideo ? "bg-blue-50 text-[#1D4ED8]" : "bg-teal-50 text-[#0D9488]"
              }`}>
                {isVideo ? "Video Lesson" : "Reading Material"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
            aria-label={`Delete ${title} content`}>
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isLoading ? "Deleting..." : "Delete"}</span>
          </button>

          <Link
            to={`/manager/courses/${courseId}/edit/${id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
            aria-label={`Edit ${title} content`}>
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Lesson</span>
          </Link>
        </div>
      </div>

      <ErrorToast message={error} onClose={() => setError(null)} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={confirmModal.confirm}
        title="Delete Lesson Content"
        message={
          <>
            Are you sure you want to delete <span className="font-bold text-slate-900">{title}</span>?
            <span className="text-red-500 text-xs mt-1 block">This action cannot be undone.</span>
          </>
        }
        confirmText="Delete Lesson"
        cancelText="Cancel"
        isLoading={isLoading}
        variant="danger"
      />
    </>
  );
}

ContentItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired
};
