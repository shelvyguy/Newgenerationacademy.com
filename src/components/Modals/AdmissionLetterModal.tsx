import React from 'react';
import { X, Download, Printer, CheckCircle, Shield, Award } from 'lucide-react';
import { Applicant } from '../../types';

interface AdmissionLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: Applicant;
}

export const AdmissionLetterModal: React.FC<AdmissionLetterModalProps> = ({
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
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official Provisional Offer of Admission</span>
            <span className="text-slate-400 text-xs">· Ref: {applicant.referenceId}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Letter</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-10 font-sans text-slate-900 print:p-0">
          {/* Official Letterhead */}
          <div className="border-b-2 border-[#005d42] pb-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-md bg-[#005d42] text-white flex flex-col items-center justify-center font-serif shadow-xs">
                  <span className="text-xs font-bold tracking-wider">NGA</span>
                  <span className="text-[9px] uppercase tracking-tight text-emerald-200">1998</span>
                </div>
                <div>
                  <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#005d42]">
                    NEW GENERATION ACADEMY
                  </h1>
                  <p className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                    British - Nigerian Dual Curriculum • Approved Centre No. #LAG-908241
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Plot 12 Victoria Island Crescent, Lagos & 8 Mobolaji Bank Anthony Way, Ikeja
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right text-xs text-slate-500 space-y-0.5">
                <p className="font-semibold text-slate-800">Office of the Registrar</p>
                <p>admissions@newgenerationacademy.edu.ng</p>
                <p>+234 (0) 1 234-5678</p>
              </div>
            </div>
          </div>

          {/* Letter Meta */}
          <div className="flex justify-between items-start text-xs text-slate-600 mb-6">
            <div>
              <p><span className="font-semibold text-slate-800">Date:</span> 24th February 2025</p>
              <p><span className="font-semibold text-slate-800">Candidate Ref:</span> <span className="font-mono font-bold text-[#005d42]">{applicant.referenceId}</span></p>
              <p><span className="font-semibold text-slate-800">Candidate Name:</span> {applicant.fullName}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle className="w-3.5 h-3.5" />
                PROVISIONAL OFFER
              </span>
            </div>
          </div>

          {/* Letter Heading */}
          <div className="text-center my-6">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-slate-900 underline decoration-[#005d42] underline-offset-4">
              Offer of Provisional Admission for 2024/2025 Academic Session
            </h2>
            <p className="text-xs font-medium text-slate-600 mt-1">
              Class Allocated: <strong className="text-slate-900">{applicant.classApplying}</strong>
            </p>
          </div>

          {/* Body Prose */}
          <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
            <p>
              Dear <strong>{applicant.fullName}</strong> (Care of {applicant.guardianName}),
            </p>
            <p>
              Following your stellar performance in the New Generation Academy Computer-Based Entrance Examination (CBT Score: <span className="font-mono font-bold text-slate-900">{applicant.cbtScore || 84}% - Distinction</span>) and subsequent Academic Board review, the Governing Board is pleased to offer you <strong>Provisional Admission</strong> into <strong>{applicant.classApplying}</strong> at our <strong>{applicant.preferredCampus}</strong> for the 2024/2025 Academic Session.
            </p>
            <p>
              New Generation Academy upholds the highest standards of scholastic inquiry, integrity, and leadership discipline. In accepting this offer, you pledge to abide by the collegiate traditions, academic honor code, and moral standards of the Academy.
            </p>

            {/* Conditions Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5 text-slate-700">
              <p className="font-semibold text-slate-900 uppercase tracking-wide">Key Acceptance Requirements:</p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>Acceptance fee payment within 14 working days of letter issuance to confirm reserved seat.</li>
                <li>Submission of primary school testimonial / previous junior secondary continuous assessment transcripts.</li>
                <li>Medical fitness clearance from a certified public or missionary healthcare facility.</li>
                <li>Mandatory parent-scholar orientation conference at the campus assembly auditorium.</li>
              </ul>
            </div>

            <p>
              Please present this official offer letter alongside proof of tuition deposit at the Admissions Registry for your student matriculation kit and uniform sizing.
            </p>
            <p>
              On behalf of the Faculty and Academic Council, congratulations on joining our community of visionary scholars.
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-end justify-between">
            <div className="space-y-1">
              <div className="font-serif italic text-base text-[#005d42] font-bold">
                Dr. (Mrs.) Folashade Adeleke
              </div>
              <p className="text-xs font-semibold text-slate-800">Principal & Executive Director of Studies</p>
              <p className="text-[11px] text-slate-500">Ph.D. Educational Administration (Ibadan), F.N.I.M.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#005d42] flex flex-col items-center justify-center p-1 text-[9px] text-[#005d42] font-semibold uppercase leading-tight tracking-tighter">
                <Shield className="w-4 h-4 mb-0.5 text-[#005d42]" />
                OFFICIAL SEAL
                <span>REGISTRAR</span>
                <span>LAGOS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            For admissions inquiries: <span className="font-medium text-slate-700">+234 (0) 803 123 4567</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#005d42] hover:bg-[#047857] rounded shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Official PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
