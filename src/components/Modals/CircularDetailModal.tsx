import React from 'react';
import { X, FileText, Calendar, UserCheck, Printer } from 'lucide-react';
import { SchoolCircular } from '../../types';

interface CircularDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  circular: SchoolCircular | null;
}

export const CircularDetailModal: React.FC<CircularDetailModalProps> = ({
  isOpen,
  onClose,
  circular
}) => {
  if (!isOpen || !circular) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Official School Circular · {circular.category}
              </span>
              <h3 className="font-serif font-bold text-sm sm:text-base line-clamp-1">{circular.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 text-slate-800 font-sans">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published: {circular.date}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <UserCheck className="w-4 h-4 text-[#005d42]" />
              <span>Issuing Desk: {circular.officer}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded border-l-4 border-[#005d42] text-xs font-medium text-slate-700 leading-relaxed">
            {circular.summary}
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
            {circular.content}
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-[11px] text-slate-500 italic">
              New Generation Academy Secretariat • Verified Official Circular
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#005d42] hover:bg-[#047857] rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
