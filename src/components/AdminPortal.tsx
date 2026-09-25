import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Award, 
  Printer, 
  Plus, 
  Calendar,
  Building,
  GraduationCap
} from 'lucide-react';
import { Applicant, CBTBatch } from '../types';

interface AdminPortalProps {
  applicants: Applicant[];
  batches: CBTBatch[];
  onUpdateApplicantStatus: (id: string, status: Applicant['status'], score?: number) => void;
  onOpenOfferLetter: (applicant: Applicant) => void;
  onOpenExamSlip: (applicant: Applicant) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  applicants,
  batches,
  onUpdateApplicantStatus,
  onOpenOfferLetter,
  onOpenExamSlip
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(applicants[0] || null);

  // Score modal state
  const [isScoringOpen, setIsScoringOpen] = useState(false);
  const [scoringApplicant, setScoringApplicant] = useState<Applicant | null>(null);
  const [inputScore, setInputScore] = useState<number>(85);

  const filteredApplicants = applicants.filter((app) => {
    const matchSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchClass = classFilter === 'All' || app.classApplying.includes(classFilter);
    return matchSearch && matchStatus && matchClass;
  });

  const handleOpenScoreModal = (app: Applicant) => {
    setScoringApplicant(app);
    setInputScore(app.cbtScore || 75);
    setIsScoringOpen(true);
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (scoringApplicant) {
      const newStatus = inputScore >= 70 ? 'Provisional Offer' : inputScore >= 50 ? 'CBT Scheduled' : 'Waitlisted';
      onUpdateApplicantStatus(scoringApplicant.id, newStatus as any, inputScore);
      setIsScoringOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-[#005d42] rounded">
              Admissions & Records Office
            </span>
            <span className="text-xs text-slate-500 font-mono">Session 2024/2025</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Manage applicant vetting, assign CBT entrance examination marks, and dispatch provisional offer letters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Roster</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 uppercase font-semibold">Total Applicants</div>
          <div className="font-serif text-2xl font-bold text-slate-900 mt-1">{applicants.length}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Active registration window</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 uppercase font-semibold">CBT Scheduled</div>
          <div className="font-serif text-2xl font-bold text-[#005d42] mt-1">
            {applicants.filter(a => a.status === 'CBT Scheduled').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Mainland & Island halls</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 uppercase font-semibold">Offers Issued</div>
          <div className="font-serif text-2xl font-bold text-amber-700 mt-1">
            {applicants.filter(a => a.status === 'Provisional Offer' || a.status === 'Admitted').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Letters downloadable</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 uppercase font-semibold">Active Batches</div>
          <div className="font-serif text-2xl font-bold text-slate-900 mt-1">
            {batches.filter(b => b.status === 'Seats Open').length} Open
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Batch B registration live</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name or ref ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="CBT Scheduled">CBT Scheduled</option>
            <option value="Provisional Offer">Provisional Offer</option>
            <option value="Admitted">Admitted</option>
          </select>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded bg-white text-slate-700 focus:outline-none"
          >
            <option value="All">All Academic Divisions</option>
            <option value="Junior Secondary">Junior Secondary (JSS 1-3)</option>
            <option value="SS 1 - Science">Senior Science (SS 1)</option>
            <option value="SS 1 - Commercial">Senior Commercial (SS 1)</option>
            <option value="SS 1 - Arts">Senior Arts (SS 1)</option>
          </select>
        </div>
      </div>

      {/* Main Table & Selected Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-3 px-4">Ref & Name</th>
                  <th className="py-3 px-3">Class Applying</th>
                  <th className="py-3 px-3">CBT Result</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No applicant records found matching search filters.
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApplicant(app)}
                      className={`cursor-pointer transition-colors ${
                        selectedApplicant?.id === app.id ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{app.fullName}</div>
                        <div className="text-[11px] font-mono text-slate-500">{app.referenceId}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-800 font-medium">{app.classApplying}</div>
                        <div className="text-[10px] text-slate-500">{app.preferredCampus}</div>
                      </td>
                      <td className="py-3 px-3">
                        {app.cbtScore !== undefined ? (
                          <span className="font-mono font-bold text-slate-900">
                            {app.cbtScore}% <span className="text-[10px] font-normal text-emerald-700">({app.cbtGrade})</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Not scored</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                            app.status === 'Provisional Offer' || app.status === 'Admitted'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : app.status === 'CBT Scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenScoreModal(app);
                          }}
                          className="px-2 py-1 text-[11px] font-semibold text-[#005d42] bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200"
                        >
                          Grade CBT
                        </button>
                        {app.status === 'Provisional Offer' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenOfferLetter(app);
                            }}
                            className="px-2 py-1 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded border border-slate-300"
                          >
                            Letter
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Applicant Card (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          {selectedApplicant ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                    Candidate File
                  </span>
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    {selectedApplicant.fullName}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#005d42]">
                  {selectedApplicant.referenceId}
                </span>
              </div>

              <div className="space-y-3 pt-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Class & Campus</span>
                  <p className="font-semibold text-slate-800">{selectedApplicant.classApplying}</p>
                  <p className="text-slate-500 text-[11px]">{selectedApplicant.preferredCampus}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Gender / Origin</span>
                    <span className="font-semibold text-slate-800">{selectedApplicant.gender}, {selectedApplicant.stateOfOrigin}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Date of Birth</span>
                    <span className="font-semibold text-slate-800">{selectedApplicant.dob}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Parent / Guardian</span>
                  <p className="font-semibold text-slate-800">{selectedApplicant.guardianName} ({selectedApplicant.guardianRelationship})</p>
                  <p className="text-slate-500 text-[11px]">{selectedApplicant.guardianPhone} · {selectedApplicant.guardianEmail}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{selectedApplicant.address}</p>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">CBT Entrance Status:</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {selectedApplicant.cbtScore !== undefined ? `${selectedApplicant.cbtScore}%` : 'Pending'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">Batch: {selectedApplicant.cbtBatch}</p>
                  <p className="text-[11px] text-slate-600">Exam Hall: {selectedApplicant.hallNumber || 'Not Allocated'} · Seat: {selectedApplicant.seatNumber || 'N/A'}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleOpenScoreModal(selectedApplicant)}
                    className="w-full py-2 bg-[#005d42] hover:bg-[#047857] text-white text-xs font-semibold rounded shadow-xs"
                  >
                    Enter / Edit CBT Score
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenExamSlip(selectedApplicant)}
                      className="py-1.5 px-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded text-xs font-semibold"
                    >
                      Print Exam Slip
                    </button>
                    <button
                      onClick={() => onOpenOfferLetter(selectedApplicant)}
                      className="py-1.5 px-3 bg-emerald-50 border border-emerald-300 text-[#005d42] hover:bg-emerald-100 rounded text-xs font-semibold"
                    >
                      Admission Letter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-6">Select an applicant to view file details.</p>
          )}
        </div>
      </div>

      {/* CBT Score Entry Modal */}
      {isScoringOpen && scoringApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 max-w-sm w-full p-6">
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
              Record CBT Entrance Score
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Candidate: <strong>{scoringApplicant.fullName}</strong> ({scoringApplicant.referenceId})
            </p>

            <form onSubmit={handleSaveScore} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CBT Score Percentage (0 - 100%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={inputScore}
                  onChange={(e) => setInputScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono font-bold border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Scores $\ge$ 70% automatically qualify for Provisional Admission Offer.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScoringOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#005d42] hover:bg-[#047857] rounded"
                >
                  Save & Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
