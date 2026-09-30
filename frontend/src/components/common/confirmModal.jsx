import React from "react";
import PropTypes from "prop-types";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";

/**
 * Reusable confirmation modal component for Learnora
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger" // "danger" | "warning" | "info"
}) => {
  if (!isOpen) return null;

  const variantConfig = {
    danger: {
      button: "bg-[#DC2626] hover:bg-[#B91C1C] text-white",
      icon: <AlertTriangle className="w-6 h-6 text-[#DC2626]" />,
      badgeBg: "bg-red-50"
    },
    warning: {
      button: "bg-[#D97706] hover:bg-[#B45309] text-white",
      icon: <AlertCircle className="w-6 h-6 text-[#D97706]" />,
      badgeBg: "bg-amber-50"
    },
    info: {
      button: "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white",
      icon: <Info className="w-6 h-6 text-[#1D4ED8]" />,
      badgeBg: "bg-blue-50"
    }
  };

  const current = variantConfig[variant] || variantConfig.danger;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-md mx-auto animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${current.badgeBg}`}>
            {current.icon}
          </div>
          <div>
            <h2 id="modal-title" className="font-bold text-lg text-[#0F172A]">
              {title}
            </h2>
          </div>
        </div>

        {/* Message */}
        <div id="modal-description" className="text-slate-600 text-sm mb-6 pl-1">
          {message}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={isLoading}
            aria-label={cancelText}>
            {cancelText}
          </button>
          <button
            type="button"
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${current.button}`}
            onClick={onConfirm}
            disabled={isLoading}
            aria-label={confirmText}>
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(["danger", "warning", "info"])
};

export default ConfirmModal;
