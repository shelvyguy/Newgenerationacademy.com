import React from 'react';
import { X, Printer, QrCode, Calendar, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Applicant } from '../../types';

interface ExamSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: Applicant;
}

export const ExamSlipModal: React.FC<ExamSlipModalProps> = ({
  isOpen,
  onClose,
  applicant
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#005d42] text-white">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <QrCode className="w-4 h-4 text-emerald-300" />
            <span>Entrance Examination Registration Slip</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-100 bg-[#064e3b] hover:bg-[#065f46] rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-300 hover:text-white rounded hover:bg-[#064e3b] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Examination Slip */}
        <div className="p-6 sm:p-8 font-sans text-slate-900">
          <div className="border border-slate-300 p-5 rounded bg-slate-50/50 mb-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#005d42]">NEW GENERATION ACADEMY</h3>
                <p className="text-xs text-slate-600 font-medium">
                  2024/2025 Computer-Based Entrance Examination (CBT)
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Registration Ref: <span className="font-bold text-slate-900">{applicant.referenceId}</span>
                </p>
              </div>
              <div className="w-16 h-16 bg-white border border-slate-300 rounded flex flex-col items-center justify-center p-1">
                <QrCode className="w-10 h-10 text-slate-800" />
                <span className="text-[8px] font-mono text-slate-500">VERIFY</span>
              </div>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Candidate Name</span>
                <span className="font-bold text-slate-900 text-sm">{applicant.fullName}</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Class Applying For</span>
                <span className="font-semibold text-slate-800">{applicant.classApplying}</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Gender / State</span>
                <span className="font-semibold text-slate-800">{applicant.gender} · {applicant.stateOfOrigin} State</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Guardian Contact</span>
                <span className="font-semibold text-slate-800">{applicant.guardianName} ({applicant.guardianPhone})</span>
              </div>
            </div>
          </div>

          {/* Test Allocation Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <div className="flex items-center gap-1.5 text-[#005d42] mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Exam Date</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{applicant.examDate || '17th May 2025'}</p>
              <p className="text-[11px] text-slate-600 font-medium">{applicant.cbtBatch}</p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <div className="flex items-center gap-1.5 text-[#005d42] mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Reporting Time</span>
              </div>
              <p className="text-sm font-bold text-slate-900">8:30 AM Prompt</p>
              <p className="text-[11px] text-slate-600 font-medium">Exam starts: 9:00 AM</p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <div className="flex items-center gap-1.5 text-[#005d42] mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Hall & Seat</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{applicant.hallNumber || 'Mainland Suite A'}</p>
              <p className="text-[11px] font-mono text-emerald-800 font-semibold">Seat: {applicant.seatNumber || 'VI-092'}</p>
            </div>
          </div>

          {/* Exam Instructions */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded text-xs text-slate-700 space-y-1.5 mb-6">
            <div className="flex items-center gap-1.5 text-amber-800 font-semibold uppercase tracking-wide">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Mandatory Candidate Instructions:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
              <li>Candidates must bring a printed copy of this examination slip and two 2B pencils.</li>
              <li>Calculators, smartphones, smartwatches, and programmable devices are strictly banned in the CBT hall.</li>
              <li>Candidates must be seated in their designated hall at least 30 minutes before exam commencement.</li>
              <li>Results will be published on the NGA Direct Enrollment Portal within 72 hours of examination completion.</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100"
            >
              Done
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-medium text-white bg-[#005d42] hover:bg-[#047857] rounded"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
