import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AlertCircle, X } from "lucide-react";

const ErrorToast = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (message && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-[#FFFFFF] border border-red-200 text-slate-900 px-5 py-4 rounded-xl shadow-xl z-50 animate-slide-up max-w-md flex items-start gap-3.5">
      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 text-[#DC2626]">
        <AlertCircle className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm text-slate-900">Action Failed</p>
        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
        aria-label="Close notification">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

ErrorToast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number
};

export default ErrorToast;
