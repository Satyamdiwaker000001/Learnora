import React, { useState } from "react";
import PropTypes from "prop-types";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/ErrorToast";
import { useConfirmModal } from "../../../components/common/UseConfirmModal";
import { UserMinus } from "lucide-react";

let mockCourseStudents = [
  { _id: "s1", name: "Naila" },
  { _id: "s2", name: "Husnul" },
  { _id: "s3", name: "Fikri" },
  { _id: "s4", name: "Hufy" }
];

const deleteMockStudentFromCourse = async (studentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockCourseStudents = mockCourseStudents.filter((s) => s._id !== studentId);
      resolve({ status: "success", deletedId: studentId });
    }, 500);
  });
};

export default function StudentItem({ imageUrl, name, id }) {
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
        await deleteMockStudentFromCourse(id);
        setIsDeleted(true);
        console.log(`Removed student ${name} (${id})`);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to remove student");
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
          <div className="w-11 h-11 rounded-full bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-bold text-base overflow-hidden border border-slate-200 shrink-0">
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

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base text-slate-900 line-clamp-1">{name}</h4>
            <p className="text-xs text-slate-500 mt-0.5">Enrolled Student</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer">
            <UserMinus className="w-3.5 h-3.5" />
            <span>{isLoading ? "Removing..." : "Remove from Course"}</span>
          </button>
        </div>
      </div>

      <ErrorToast message={error} onClose={() => setError(null)} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={confirmModal.confirm}
        title="Remove Student from Course"
        message={
          <>
            Are you sure you want to remove <span className="font-bold text-slate-900">{name}</span> from this course?
            <span className="text-red-500 text-xs mt-1 block">The student will lose access to the curriculum content.</span>
          </>
        }
        confirmText="Remove from Course"
        cancelText="Cancel"
        isLoading={isLoading}
        variant="danger"
      />
    </>
  );
}

StudentItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
