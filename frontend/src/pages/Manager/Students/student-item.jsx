import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/ErrorToast";
import { useConfirmModal } from "../../../components/common/UseConfirmModal";
import { BookOpen, Trash2, Edit3 } from "lucide-react";

let mockStudents = [
  { id: "s1", name: "Naila", totalCourse: 3 },
  { id: "s2", name: "Husnul", totalCourse: 5 },
  { id: "s3", name: "Fikri", totalCourse: 2 },
  { id: "s4", name: "Hufy", totalCourse: 4 }
];

const deleteMockStudent = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockStudents = mockStudents.filter((s) => s.id !== id);
      resolve({ status: "success", deletedId: id });
    }, 500);
  });
};

export default function StudentItem({
  imageUrl = "/assets/images/photos/photo-profile-blue.svg",
  name = "Learner",
  totalCourse = 1,
  id = "1"
}) {
  const confirmModal = useConfirmModal();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const initial = name?.charAt(0)?.toUpperCase() ?? "S";

  const handleDeleteClick = () => {
    setError(null);
    confirmModal.open(async () => {
      setIsLoading(true);
      try {
        await deleteMockStudent(id);
        setIsDeleted(true);
        console.log(`Deleted student: ${name} (${id})`);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to delete student");
      } finally {
        setIsLoading(false);
        confirmModal.close();
      }
    });
  };

  const handleCloseModal = () => {
    if (!isLoading) confirmModal.close();
  };

  if (isDeleted) return null;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-4 min-w-0">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold text-base overflow-hidden border border-slate-200 shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="w-full h-full object-cover"
                alt={name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/photos/photo-profile-blue.svg";
                }}
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base text-slate-900 line-clamp-1">{name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-[#0D9488]">
                <BookOpen className="w-3 h-3" />
                {totalCourse} {totalCourse === 1 ? "Course Enrolled" : "Courses Enrolled"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <Link
            to={`/manager/students/edit/${id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-sm">
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Profile</span>
          </Link>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isLoading ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>

      <ErrorToast message={error} onClose={() => setError(null)} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={confirmModal.confirm}
        title="Delete Student Record"
        message={
          <>
            Are you sure you want to remove <span className="font-bold text-slate-900">{name}</span> from the platform?
            <span className="text-red-500 text-xs mt-1 block">This will revoke all current course enrollments.</span>
          </>
        }
        confirmText="Delete Student"
        cancelText="Cancel"
        isLoading={isLoading}
        variant="danger"
      />
    </>
  );
}

StudentItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  totalCourse: PropTypes.number,
  id: PropTypes.string
};
