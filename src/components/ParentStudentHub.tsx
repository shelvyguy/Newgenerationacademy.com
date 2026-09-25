import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  CheckCircle, 
  CreditCard, 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  Check, 
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { StudentRecord } from '../types';
import { CBT_MOCK_QUESTIONS } from '../data/mockData';

interface ParentStudentHubProps {
  studentRecord: StudentRecord;
}

export const ParentStudentHub: React.FC<ParentStudentHubProps> = ({ studentRecord }) => {
  const [activeTab, setActiveTab] = useState<'report' | 'fees' | 'cbt_mock' | 'timetable'>('report');

  // CBT Mock Simulator State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [cbtSubmitted, setCbtSubmitted] = useState(false);
  const [cbtScore, setCbtScore] = useState<number | null>(null);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (cbtSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleCbtSubmit = () => {
    let score = 0;
    CBT_MOCK_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 20; // 5 questions * 20 = 100%
      }
    });
    setCbtScore(score);
    setCbtSubmitted(true);
  };

  const handleResetCbt = () => {
    setSelectedAnswers({});
    setCbtSubmitted(false);
    setCbtScore(null);
  };

  // Fees state
  const [paymentDone, setPaymentDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8ff] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Student Profile Card Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#005d42] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              AE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {studentRecord.fullName}
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Active Scholar
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Reg: <span className="font-mono text-slate-800 font-bold">{studentRecord.regNumber}</span> · {studentRecord.class} ({studentRecord.arm})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-slate-500 block text-[11px]">Term Attendance</span>
              <strong className="text-slate-900 font-mono text-sm">
                {studentRecord.attendance.presentDays}/{studentRecord.attendance.totalDays} Days
              </strong>
              <span className="text-emerald-700 block text-[10px] font-semibold">(98.5% Excellent)</span>
            </div>

            <div className="border-l border-slate-200 pl-4 text-right">
              <span className="text-slate-500 block text-[11px]">Bursary Clearance</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                {studentRecord.feesStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'report'
                ? 'bg-[#005d42] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Terminal Report Sheet (WAEC Standard)
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'fees'
                ? 'bg-[#005d42] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Bursary & Fee Statement
          </button>
          <button
            onClick={() => setActiveTab('cbt_mock')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'cbt_mock'
                ? 'bg-[#005d42] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            CBT Entrance & Practice Simulator
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'timetable'
                ? 'bg-[#005d42] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Academic Timetable
          </button>
        </div>
      </div>

      {/* TAB 1: TERMINAL REPORT SHEET */}
      {activeTab === 'report' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          {/* Printable Report Header */}
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-[#005d42] text-white rounded-md flex flex-col items-center justify-center font-serif">
                  <span className="font-bold text-sm">NGA</span>
                  <span className="text-[9px] uppercase tracking-widest text-emerald-200">LAGOS</span>
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#005d42]">
                    NEW GENERATION ACADEMY
                  </h2>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Continuous Assessment & Terminal Examination Report Card
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Dual Nigerian & British Curriculum • Ministry Centre: #LAG-908241
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#005d42] hover:bg-[#047857] text-white text-xs font-semibold rounded shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report Sheet</span>
                </button>
              </div>
            </div>

            {/* Student Particulars Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Scholar Name</span>
                <span className="font-bold text-slate-900">{studentRecord.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Class & Arm</span>
                <span className="font-bold text-slate-900">{studentRecord.class} ({studentRecord.arm})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Term & Session</span>
                <span className="font-semibold text-slate-800">{studentRecord.term}, {studentRecord.session}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Terminal Position</span>
                <span className="font-bold text-[#005d42] font-mono text-sm">1st out of 38 Scholars</span>
              </div>
            </div>
          </div>

          {/* Subject Grades Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-3 text-center">CA 1 (20)</th>
                  <th className="py-3 px-3 text-center">CA 2 (20)</th>
                  <th className="py-3 px-3 text-center">Exam (60)</th>
                  <th className="py-3 px-3 text-center font-bold">Total (100)</th>
                  <th className="py-3 px-3 text-center">WAEC Grade</th>
                  <th className="py-3 px-4">Subject Master Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentRecord.subjects.map((sub) => {
                  const isA1 = sub.grade === 'A1';
                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4 font-bold text-slate-900">{sub.subject}</td>
                      <td className="py-3 px-3 text-center font-mono">{sub.ca1}</td>
                      <td className="py-3 px-3 text-center font-mono">{sub.ca2}</td>
                      <td className="py-3 px-3 text-center font-mono">{sub.exam}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-sm text-slate-900">
                        {sub.total}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs ${
                            isA1
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {sub.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{sub.remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Remarks Section */}
          <div className="p-6 sm:p-8 bg-slate-50/70 border-t border-slate-200 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  Class Tutor's Remark
                </span>
                <p className="text-slate-800 leading-relaxed italic">
                  "{studentRecord.teacherRemark}"
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#005d42]">
                  — Mr. O. Bakare (Head of Sciences)
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  Principal & Executive Director's Remark
                </span>
                <p className="text-slate-800 leading-relaxed italic">
                  "{studentRecord.principalRemark}"
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#005d42]">
                  — Dr. (Mrs.) Folashade Adeleke, Ph.D.
                </div>
              </div>
            </div>

            {/* Psychomotor & Grading Key */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <p>
                <strong>WAEC Grading Key:</strong> A1 (75-100% Distinction) · B2 (70-74%) · B3 (65-69%) · C4-C6 (50-64% Credit) · D7-E8 (40-49% Pass) · F9 (Fail).
              </p>
              <p className="font-semibold text-slate-700">Resumption Date for Next Term: 28th April 2025</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BURSARY & FEE STATEMENT */}
      {activeTab === 'fees' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
                Office of the Bursar
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Tuition & Academic Levies Statement
              </h2>
              <p className="text-xs text-slate-600">
                Official electronic bursary reconciliation slip for Second Term 2024/2025.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Account Balance</span>
              <span className="font-mono text-xl font-bold text-emerald-800">₦0.00</span>
              <span className="text-[10px] text-emerald-700 block font-semibold">Fully Cleared</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-3 px-4">Fee Item Description</th>
                  <th className="py-3 px-4">Account Code</th>
                  <th className="py-3 px-4 text-right">Amount (NGN)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Term 2 Senior Secondary Tuition</td>
                  <td className="py-3 px-4 font-mono text-slate-500">REV-TUI-01</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">₦550,000</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">STEM, Robotics & Science Lab Practical Levy</td>
                  <td className="py-3 px-4 font-mono text-slate-500">REV-LAB-04</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">₦120,000</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">ICT Fiber-Optic & E-Library Subscription</td>
                  <td className="py-3 px-4 font-mono text-slate-500">REV-ICT-02</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">₦80,000</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">PTA Development Levy & Insurance Cover</td>
                  <td className="py-3 px-4 font-mono text-slate-500">REV-PTA-01</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">₦50,000</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Co-Curricular Athletics & Inter-House Sports Levy</td>
                  <td className="py-3 px-4 font-mono text-slate-500">REV-SPT-03</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">₦50,000</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">Paid</span>
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={2} className="py-3 px-4 uppercase text-slate-700">Cumulative Total Paid</td>
                  <td className="py-3 px-4 text-right font-mono text-sm text-[#005d42]">₦850,000</td>
                  <td className="py-3 px-4 text-center text-emerald-700 font-semibold">100% Cleared</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
            <p className="text-xs text-slate-500">
              Payments reconciled via Paystack / Zenith Bank Remita Gateway · Receipt Ref: <strong className="font-mono text-slate-800">REC-2025-0814</strong>
            </p>
            <button
              onClick={() => alert('Official Bursary Receipt REC-2025-0814 downloaded (PDF).')}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Payment Receipt</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: CBT ENTRANCE & PRACTICE SIMULATOR */}
      {activeTab === 'cbt_mock' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
                Computer-Based Test (CBT) Simulator
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                New Generation Academy Entrance Mock Exam
              </h2>
              <p className="text-xs text-slate-600">
                Experience the exact timed CBT testing interface used for JSS 1 and SS 1 admissions.
              </p>
            </div>

            {cbtSubmitted && cbtScore !== null ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Exam Score</span>
                <span className="font-mono text-2xl font-bold text-[#005d42]">{cbtScore}%</span>
                <span className="text-[10px] text-emerald-800 block font-semibold">
                  {cbtScore >= 70 ? 'Distinction Pass (Offer Qualified)' : 'Credit Pass'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded">
                <Clock className="w-4 h-4 text-[#005d42]" />
                <span>Timer: 10:00 Mins</span>
              </div>
            )}
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {CBT_MOCK_QUESTIONS.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const selectedOpt = selectedAnswers[q.id];

              return (
                <div key={q.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-lg text-xs space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#005d42] uppercase tracking-wider">
                      Question {idx + 1} of 5 · {q.subject}
                    </span>
                    {cbtSubmitted && (
                      <span className={`font-semibold ${selectedOpt === q.correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {selectedOpt === q.correct ? 'Correct (+20 marks)' : 'Incorrect (0 marks)'}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-900 font-semibold text-xs sm:text-sm leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100';

                      if (isSelected) {
                        btnStyle = 'bg-[#005d42] text-white border-[#005d42]';
                      }

                      if (cbtSubmitted) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                        } else if (isSelected && optIdx !== q.correct) {
                          btnStyle = 'bg-rose-600 text-white border-rose-600';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-2.5 text-left rounded border text-xs font-medium transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isSelected && !cbtSubmitted && (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {cbtSubmitted && (
                    <div className="p-2.5 bg-white border border-slate-200 rounded text-[11px] text-slate-600 mt-2">
                      <strong className="text-slate-800">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex justify-between items-center border-t border-slate-200">
            {cbtSubmitted ? (
              <button
                onClick={handleResetCbt}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Practice Test</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">
                {Object.keys(selectedAnswers).length} of 5 questions answered
              </span>
            )}

            {!cbtSubmitted && (
              <button
                onClick={handleCbtSubmit}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#005d42] hover:bg-[#047857] disabled:opacity-50 text-white text-xs font-semibold rounded shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>Submit CBT Test</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: ACADEMIC TIMETABLE */}
      {activeTab === 'timetable' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
                Weekly Schedule
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                SS 1 Science (Diamond) Master Timetable
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-200">Day</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">8:00 - 9:00 AM</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">9:00 - 10:00 AM</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 bg-amber-50 text-amber-900 text-center">10:00 - 10:30</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">10:30 - 11:30 AM</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">11:30 - 12:30 PM</th>
                  <th className="py-2.5 px-3">1:30 - 3:00 PM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">Monday</td>
                  <td className="py-3 px-3 border-r border-slate-200">Further Maths</td>
                  <td className="py-3 px-3 border-r border-slate-200">English Language</td>
                  <td rowSpan={5} className="py-3 px-2 bg-amber-50/50 border-r border-slate-200 text-center text-[10px] font-bold text-amber-800 uppercase tracking-widest writing-mode-vertical">
                    RECESS
                  </td>
                  <td className="py-3 px-3 border-r border-slate-200">Physics Theory</td>
                  <td className="py-3 px-3 border-r border-slate-200">Chemistry</td>
                  <td className="py-3 px-3 font-semibold text-[#005d42]">Robotics & AI Lab</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">Tuesday</td>
                  <td className="py-3 px-3 border-r border-slate-200">General Maths</td>
                  <td className="py-3 px-3 border-r border-slate-200">Biology</td>
                  <td className="py-3 px-3 border-r border-slate-200">Technical Drawing</td>
                  <td className="py-3 px-3 border-r border-slate-200">Civic Education</td>
                  <td className="py-3 px-3 font-semibold text-[#005d42]">Physics Lab Practical</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">Wednesday</td>
                  <td className="py-3 px-3 border-r border-slate-200">Chemistry Lab</td>
                  <td className="py-3 px-3 border-r border-slate-200">English Language</td>
                  <td className="py-3 px-3 border-r border-slate-200">Computer Science (Python)</td>
                  <td className="py-3 px-3 border-r border-slate-200">Further Maths</td>
                  <td className="py-3 px-3 font-semibold text-blue-800">Debate & MUN Club</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">Thursday</td>
                  <td className="py-3 px-3 border-r border-slate-200">Biology Lab</td>
                  <td className="py-3 px-3 border-r border-slate-200">Physics</td>
                  <td className="py-3 px-3 border-r border-slate-200">General Maths</td>
                  <td className="py-3 px-3 border-r border-slate-200">Economics / French</td>
                  <td className="py-3 px-3 font-semibold text-emerald-800">JET Club Experiments</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">Friday</td>
                  <td className="py-3 px-3 border-r border-slate-200">Assembly & Mentorship</td>
                  <td className="py-3 px-3 border-r border-slate-200">Mathematics Quiz</td>
                  <td className="py-3 px-3 border-r border-slate-200">Civic & Moral Instruction</td>
                  <td className="py-3 px-3 border-r border-slate-200">Library & Research</td>
                  <td className="py-3 px-3 font-semibold text-amber-800">Inter-House Sports Practice</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
