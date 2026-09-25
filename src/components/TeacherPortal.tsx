import React, { useState } from 'react';
import { 
  BookOpen, 
  Save, 
  Printer, 
  CheckCircle, 
  GraduationCap, 
  Sliders, 
  Download,
  AlertCircle
} from 'lucide-react';
import { GradeSubject, StudentRecord } from '../types';
import { computeGrade, INITIAL_STUDENT_RECORD } from '../data/mockData';

interface TeacherPortalProps {
  studentRecord: StudentRecord;
  onUpdateSubjects: (subjects: GradeSubject[]) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  studentRecord,
  onUpdateSubjects
}) => {
  const [selectedClass, setSelectedClass] = useState('SS 1 Science (Diamond)');
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [subjectsList, setSubjectsList] = useState<GradeSubject[]>(studentRecord.subjects);
  const [saveToast, setSaveToast] = useState(false);

  const handleScoreChange = (
    id: string,
    field: 'ca1' | 'ca2' | 'exam',
    val: number
  ) => {
    const updated = subjectsList.map((sub) => {
      if (sub.id === id) {
        const ca1 = field === 'ca1' ? Math.min(20, Math.max(0, val)) : sub.ca1;
        const ca2 = field === 'ca2' ? Math.min(20, Math.max(0, val)) : sub.ca2;
        const exam = field === 'exam' ? Math.min(60, Math.max(0, val)) : sub.exam;
        const total = ca1 + ca2 + exam;
        const { grade, remark } = computeGrade(total);
        return { ...sub, ca1, ca2, exam, total, grade, remark };
      }
      return sub;
    });

    setSubjectsList(updated);
    onUpdateSubjects(updated);
  };

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Metrics
  const classAvg = Math.round(
    subjectsList.reduce((acc, curr) => acc + curr.total, 0) / subjectsList.length
  );
  const distinctions = subjectsList.filter((s) => s.grade === 'A1').length;
  const credits = subjectsList.filter((s) => ['B2', 'B3', 'C4', 'C5', 'C6'].includes(s.grade)).length;

  return (
    <div className="min-h-screen bg-[#faf8ff] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-[#005d42] text-white rounded">
              Faculty Gradebook Portal
            </span>
            <span className="text-xs text-slate-500 font-mono">Continuous Assessment (CA) System</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Teacher Assessment & Result Sheet
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Log CA 1 (20%), CA 2 (20%), and Terminal Exam (60%) scores. WAEC/NECO standard grades computed automatically.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#005d42] hover:bg-[#047857] rounded shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save & Publish Marks</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Master Sheet</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="mb-6 p-3 bg-emerald-100 border border-emerald-300 text-[#005d42] rounded-md text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#005d42]" />
            <span className="font-semibold">All continuous assessment marks and WAEC grade equivalents saved successfully!</span>
          </div>
          <span className="text-[11px] text-emerald-800">Sync complete</span>
        </div>
      )}

      {/* Class & Subject Selector Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Select Class / Arm</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005d42]"
          >
            <option value="SS 1 Science (Diamond)">SS 1 Science (Diamond Arm)</option>
            <option value="SS 1 Commercial (Sapphire)">SS 1 Commercial (Sapphire Arm)</option>
            <option value="SS 2 Science (Emerald)">SS 2 Science (Emerald Arm)</option>
            <option value="JSS 1 (Ruby)">JSS 1 (Ruby Arm)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Term & Session</label>
          <div className="px-3 py-2 text-xs border border-slate-200 rounded bg-slate-50 text-slate-700 font-semibold">
            Second Term · 2024 / 2025 Session
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Grading Scale</label>
          <div className="px-3 py-2 text-xs border border-slate-200 rounded bg-slate-50 text-[#005d42] font-semibold">
            WAEC 9-Point Standard (A1 to F9)
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 p-3.5 rounded-lg shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Subjects Tracked</span>
          <div className="font-serif text-2xl font-bold text-slate-900 mt-0.5">{subjectsList.length}</div>
          <span className="text-[10px] text-slate-500">Core + Electives</span>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-lg shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Class Average</span>
          <div className="font-serif text-2xl font-bold text-[#005d42] mt-0.5 font-mono">{classAvg}%</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Distinction Benchmark</span>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-lg shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">A1 Distinctions</span>
          <div className="font-serif text-2xl font-bold text-amber-700 mt-0.5 font-mono">{distinctions}</div>
          <span className="text-[10px] text-slate-500">75% - 100% bracket</span>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-lg shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Credits (B2 - C6)</span>
          <div className="font-serif text-2xl font-bold text-blue-700 mt-0.5 font-mono">{credits}</div>
          <span className="text-[10px] text-slate-500">WAEC Qualified</span>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#005d42]" />
            <h3 className="font-semibold text-xs sm:text-sm text-slate-900">
              Candidate: {studentRecord.fullName} ({studentRecord.regNumber})
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Editable score inputs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-3 text-center">CA 1 (Max 20)</th>
                <th className="py-3 px-3 text-center">CA 2 (Max 20)</th>
                <th className="py-3 px-3 text-center">Exam (Max 60)</th>
                <th className="py-3 px-3 text-center">Total (100)</th>
                <th className="py-3 px-3 text-center">WAEC Grade</th>
                <th className="py-3 px-4">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjectsList.map((sub) => {
                const isA1 = sub.grade === 'A1';
                return (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{sub.subject}</td>
                    
                    {/* CA 1 */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={sub.ca1}
                        onChange={(e) => handleScoreChange(sub.id, 'ca1', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-center font-mono font-bold text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#005d42]"
                      />
                    </td>

                    {/* CA 2 */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={sub.ca2}
                        onChange={(e) => handleScoreChange(sub.id, 'ca2', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-center font-mono font-bold text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#005d42]"
                      />
                    </td>

                    {/* Exam */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={sub.exam}
                        onChange={(e) => handleScoreChange(sub.id, 'exam', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-center font-mono font-bold text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#005d42]"
                      />
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 text-center font-mono font-bold text-sm text-slate-900">
                      {sub.total}
                    </td>

                    {/* Grade */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded font-mono font-bold text-xs ${
                          isA1
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : ['B2', 'B3'].includes(sub.grade)
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {sub.grade}
                      </span>
                    </td>

                    {/* Remark */}
                    <td className="py-3 px-4">
                      <span className="text-slate-700 font-medium">{sub.remark}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Notes */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>CA 1 + CA 2 + Terminal Exam scores automatically reflect in the Student & Parent Hub.</span>
          </div>
          <button
            onClick={handleSave}
            className="text-[#005d42] font-semibold hover:underline"
          >
            Update Student Term Master →
          </button>
        </div>
      </div>
    </div>
  );
};
