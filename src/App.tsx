import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PublicHome } from './components/PublicHome';
import { AdminPortal } from './components/AdminPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { ParentStudentHub } from './components/ParentStudentHub';
import { AdmissionLetterModal } from './components/Modals/AdmissionLetterModal';
import { ExamSlipModal } from './components/Modals/ExamSlipModal';
import { TourBookingModal } from './components/Modals/TourBookingModal';
import { 
  INITIAL_APPLICANTS, 
  INITIAL_BATCHES, 
  INITIAL_CIRCULARS, 
  INITIAL_STUDENT_RECORD 
} from './data/mockData';
import { Applicant, GradeSubject, UserRole } from './types';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [batches] = useState(INITIAL_BATCHES);
  const [circulars] = useState(INITIAL_CIRCULARS);
  const [studentRecord, setStudentRecord] = useState(INITIAL_STUDENT_RECORD);

  // Modal states
  const [letterModalApplicant, setLetterModalApplicant] = useState<Applicant | null>(null);
  const [slipModalApplicant, setSlipModalApplicant] = useState<Applicant | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  const handleAddApplicant = (newApplicant: Applicant) => {
    setApplicants((prev) => [newApplicant, ...prev]);
  };

  const handleUpdateApplicantStatus = (
    id: string,
    status: Applicant['status'],
    score?: number
  ) => {
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const cbtGrade = score ? (score >= 75 ? 'Distinction' : score >= 60 ? 'Credit Pass' : 'Pass') : app.cbtGrade;
          return {
            ...app,
            status,
            ...(score !== undefined ? { cbtScore: score, cbtGrade } : {})
          };
        }
        return app;
      })
    );
  };

  const handleUpdateSubjects = (updatedSubjects: GradeSubject[]) => {
    setStudentRecord((prev) => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      {/* Top Main Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        onOpenTourModal={() => setIsTourModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentRole === 'public' && (
          <PublicHome
            batches={batches}
            applicants={applicants}
            circulars={circulars}
            onAddApplicant={handleAddApplicant}
            onOpenOfferLetter={(app) => setLetterModalApplicant(app)}
            onOpenExamSlip={(app) => setSlipModalApplicant(app)}
            onSwitchRole={setCurrentRole}
          />
        )}

        {currentRole === 'admin' && (
          <AdminPortal
            applicants={applicants}
            batches={batches}
            onUpdateApplicantStatus={handleUpdateApplicantStatus}
            onOpenOfferLetter={(app) => setLetterModalApplicant(app)}
            onOpenExamSlip={(app) => setSlipModalApplicant(app)}
          />
        )}

        {currentRole === 'teacher' && (
          <TeacherPortal
            studentRecord={studentRecord}
            onUpdateSubjects={handleUpdateSubjects}
          />
        )}

        {currentRole === 'parent_student' && (
          <ParentStudentHub studentRecord={studentRecord} />
        )}
      </main>

      {/* Floating Bottom Quick-Switcher for Mobile / Tablet Viewports */}
      <aside aria-label="Portal Navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around text-[10px] font-semibold text-slate-600 shadow-lg">
        <button
          onClick={() => setCurrentRole('public')}
          className={`flex flex-col items-center gap-0.5 ${currentRole === 'public' ? 'text-[#005d42] font-bold' : ''}`}
        >
          <span>Website</span>
        </button>
        <button
          onClick={() => setCurrentRole('admin')}
          className={`flex flex-col items-center gap-0.5 ${currentRole === 'admin' ? 'text-[#005d42] font-bold' : ''}`}
        >
          <span>Admin</span>
        </button>
        <button
          onClick={() => setCurrentRole('teacher')}
          className={`flex flex-col items-center gap-0.5 ${currentRole === 'teacher' ? 'text-[#005d42] font-bold' : ''}`}
        >
          <span>Teacher</span>
        </button>
        <button
          onClick={() => setCurrentRole('parent_student')}
          className={`flex flex-col items-center gap-0.5 ${currentRole === 'parent_student' ? 'text-[#005d42] font-bold' : ''}`}
        >
          <span>Parent Hub</span>
        </button>
      </aside>

      {/* Modals */}
      {letterModalApplicant && (
        <AdmissionLetterModal
          isOpen={Boolean(letterModalApplicant)}
          onClose={() => setLetterModalApplicant(null)}
          applicant={letterModalApplicant}
        />
      )}

      {slipModalApplicant && (
        <ExamSlipModal
          isOpen={Boolean(slipModalApplicant)}
          onClose={() => setSlipModalApplicant(null)}
          applicant={slipModalApplicant}
        />
      )}

      <TourBookingModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />
    </div>
  );
}
