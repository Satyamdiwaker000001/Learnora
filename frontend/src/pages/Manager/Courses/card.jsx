import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/ErrorToast";
import { useConfirmModal } from "../../../components/common/UseConfirmModal";
import { mockCourses as initialMockCourses } from "../../../utils/mockData";
import { Users, Tag, Trash2, Settings2, UserPlus } from "lucide-react";

let mockCourses = [...initialMockCourses];

const deleteMockCourse = async (_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockCourses.some((c) => c._id === _id);
      if (!exists) {
        reject(new Error("Course not found"));
      } else {
        mockCourses = mockCourses.filter((c) => c._id !== _id);
        resolve({ status: "success", deletedId: _id });
      }
    }, 500);
  });
};

export default function CardCourse({
  _id,
  thumbnail_url = "/assets/images/thumbnails/th-blue.png",
  name = "Untitled Course",
  students = [],
  category = { name: "Uncategorized" }
}) {
  const confirmModal = useConfirmModal();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const totalStudents = students?.length ?? 0;

  const handleDeleteClick = () => {
    setError(null);
    confirmModal.open(async () => {
      setIsLoading(true);
      try {
        await deleteMockCourse(_id);
        setIsDeleted(true);
        console.log(`Deleted course: ${name} (${_id})`);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to delete course");
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
          {/* Thumbnail */}
          <div className="w-24 h-20 rounded-xl bg-blue-50 border border-slate-200 overflow-hidden shrink-0">
            <img
              src={thumbnail_url}
              className="w-full h-full object-cover"
              alt={`${name} thumbnail`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/thumbnails/th-blue.png";
              }}
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <Link
              to={`/manager/courses/${_id}`}
              className="font-bold text-base text-[#0F172A] hover:text-[#1D4ED8] line-clamp-1 transition-colors block">
              {name}
            </Link>

            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1D4ED8]">
                <Tag className="w-3 h-3" />
                {category?.name ?? "General"}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Users className="w-3.5 h-3.5 text-[#0D9488]" />
                {totalStudents} {totalStudents === 1 ? "Student" : "Students"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <Link
            to={`/manager/courses/students/${_id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-sm">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Students</span>
          </Link>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isLoading ? "Deleting..." : "Delete"}</span>
          </button>

          <Link
            to={`/manager/courses/${_id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold shadow-sm transition-colors">
            <Settings2 className="w-3.5 h-3.5" />
            <span>Manage</span>
          </Link>
        </div>
      </div>

      <ErrorToast message={error} onClose={() => setError(null)} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={confirmModal.confirm}
        title="Delete Course"
        message={
          <>
            Are you sure you want to delete <span className="font-bold text-slate-900">{name}</span>?
            <span className="text-red-500 text-xs mt-1 block">
              This action will remove all student enrollments and course content.
            </span>
          </>
        }
        confirmText="Delete Course"
        cancelText="Cancel"
        isLoading={isLoading}
        variant="danger"
      />
    </>
  );
}

CardCourse.propTypes = {
  _id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string,
  name: PropTypes.string,
  students: PropTypes.array,
  category: PropTypes.object
};
