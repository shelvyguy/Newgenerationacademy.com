import React, { useState } from 'react';
import { 
  User, 
  Search, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { Applicant, CBTBatch } from '../types';
import { NIGERIAN_STATES } from '../data/mockData';

interface AdmissionWizardProps {
  batches: CBTBatch[];
  applicants: Applicant[];
  onAddApplicant: (applicant: Applicant) => void;
  onOpenOfferLetter: (applicant: Applicant) => void;
  onOpenExamSlip: (applicant: Applicant) => void;
}

export const AdmissionWizard: React.FC<AdmissionWizardProps> = ({
  batches,
  applicants,
  onAddApplicant,
  onOpenOfferLetter,
  onOpenExamSlip
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'track'>('new');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Search/Lookup State
  const [searchRef, setSearchRef] = useState('NGA/2024/0482');
  const [searchedApplicant, setSearchedApplicant] = useState<Applicant | null>(
    applicants.find(a => a.referenceId === 'NGA/2024/0482') || applicants[0]
  );
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Male' as 'Male' | 'Female',
    stateOfOrigin: 'Lagos',
    classApplying: 'Junior Secondary 1 (JSS 1 - Fresh Entry)',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelationship: 'Father',
    address: '',
    preferredCampus: 'Victoria Island Campus' as 'Victoria Island Campus' | 'Ikeja Mainland Campus',
    cbtBatch: 'Batch B (Active Registration)',
    previousSchool: '',
    lastTermScore: '82%',
    hasAcceptedTerms: false
  });

  const [formSuccess, setFormSuccess] = useState<Applicant | null>(null);

  const handleLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLookupError(null);
    const cleanRef = searchRef.trim().toUpperCase();
    const found = applicants.find(
      a => a.referenceId.toUpperCase() === cleanRef || a.id.toUpperCase() === cleanRef
    );

    if (found) {
      setSearchedApplicant(found);
    } else {
      setSearchedApplicant(null);
      setLookupError(`No candidate record found matching "${cleanRef}". Try reference "NGA/2024/0482" or "NGA/2024/0519".`);
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRef = `NGA/2024/${randomNum}`;

    const newApplicant: Applicant = {
      id: `app-${randomNum}`,
      referenceId: newRef,
      fullName: formData.fullName || 'ADEKUNLE, Chinedu Ibrahim',
      dob: formData.dob || '2012-05-15',
      gender: formData.gender,
      stateOfOrigin: formData.stateOfOrigin,
      classApplying: formData.classApplying,
      guardianName: formData.guardianName || 'Engr. Ibrahim Adekunle',
      guardianPhone: formData.guardianPhone || '+234 803 987 6543',
      guardianEmail: formData.guardianEmail || 'guardian@gmail.com',
      guardianRelationship: formData.guardianRelationship,
      address: formData.address || 'Victoria Island, Lagos',
      preferredCampus: formData.preferredCampus,
      cbtBatch: formData.cbtBatch,
      status: 'CBT Scheduled',
      appliedDate: new Date().toISOString().split('T')[0],
      examDate: '17th May 2025',
      hallNumber: formData.preferredCampus.includes('Victoria') ? 'Island Hall 2' : 'Mainland Hall 1',
      seatNumber: `S-${Math.floor(100 + Math.random() * 899)}`
    };

    onAddApplicant(newApplicant);
    setFormSuccess(newApplicant);
    setSearchedApplicant(newApplicant);
    setSearchRef(newApplicant.referenceId);
  };

  return (
    <section id="admissions" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
            Direct Enrollment Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            2024/2025 Online Admission Wizard
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Complete the 3-step rapid registration to book entrance examination slots and interview dates.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-lg self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'new'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Application
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'track'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Track Existing Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Application Area (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
          {formSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-[#005d42] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#005d42] uppercase tracking-wider">
                  Registration Successful
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                  Examination Slot Confirmed
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Application reference <strong className="text-slate-900 font-mono">{formSuccess.referenceId}</strong> has been created for candidate <strong>{formSuccess.fullName}</strong>.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-700">
                <p><span className="font-semibold">Candidate:</span> {formSuccess.fullName}</p>
                <p><span className="font-semibold">Class Applying:</span> {formSuccess.classApplying}</p>
                <p><span className="font-semibold">Assigned Exam Date:</span> {formSuccess.examDate} (9:00 AM)</p>
                <p><span className="font-semibold">Hall & Seat:</span> {formSuccess.hallNumber} · Seat {formSuccess.seatNumber}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => onOpenExamSlip(formSuccess)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#005d42] hover:bg-[#047857] text-white text-xs font-semibold rounded shadow-xs transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Print Entrance Exam Slip
                </button>
                <button
                  onClick={() => {
                    setFormSuccess(null);
                    setCurrentStep(1);
                    setFormData({
                      ...formData,
                      fullName: '',
                      guardianName: '',
                      guardianPhone: ''
                    });
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded transition-colors"
                >
                  Start Another Registration
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* 3-Step Wizard Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
                  
                  {/* Step 1 Indicator */}
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep >= 1 ? 'bg-[#005d42] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                    }`}>
                      1
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 mt-1.5 whitespace-nowrap">
                      Candidate Info
                    </span>
                  </button>

                  {/* Step 2 Indicator */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep >= 2 ? 'bg-[#005d42] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                    }`}>
                      2
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 mt-1.5 whitespace-nowrap">
                      Guardian Details
                    </span>
                  </button>

                  {/* Step 3 Indicator */}
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === 3 ? 'bg-[#005d42] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                    }`}>
                      3
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 mt-1.5 whitespace-nowrap">
                      Documents & Submit
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 1: Candidate Info */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <User className="w-4 h-4 text-[#005d42]" />
                    <h3 className="font-semibold text-sm text-slate-900">Candidate Particulars</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name (Surname First) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ADEKUNLE, Chinedu Ibrahim"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42] transition-colors"
                      required
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Must match student primary school leaving certificate or national ID.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State of Origin (Nigeria) *
                      </label>
                      <select
                        value={formData.stateOfOrigin}
                        onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st} State</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Class Applying For *
                      </label>
                      <select
                        value={formData.classApplying}
                        onChange={(e) => setFormData({ ...formData, classApplying: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      >
                        <option value="Junior Secondary 1 (JSS 1 - Fresh Entry)">Junior Secondary 1 (JSS 1 - Fresh Entry)</option>
                        <option value="Junior Secondary 2 (JSS 2 - Transfer)">Junior Secondary 2 (JSS 2 - Transfer)</option>
                        <option value="Junior Secondary 3 (JSS 3 - Transfer)">Junior Secondary 3 (JSS 3 - Transfer)</option>
                        <option value="Senior Secondary 1 (SS 1 - Science)">Senior Secondary 1 (SS 1 - Science)</option>
                        <option value="Senior Secondary 1 (SS 1 - Commercial)">Senior Secondary 1 (SS 1 - Commercial)</option>
                        <option value="Senior Secondary 1 (SS 1 - Arts & Humanities)">Senior Secondary 1 (SS 1 - Arts & Humanities)</option>
                        <option value="Senior Secondary 2 (SS 2 - Senior Transfer)">Senior Secondary 2 (SS 2 - Senior Transfer)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#005d42] hover:bg-[#047857] text-white text-xs font-semibold rounded shadow-xs transition-colors"
                    >
                      <span>Continue to Parent Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Guardian Details */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-[#005d42]" />
                    <h3 className="font-semibold text-sm text-slate-900">Parent & Guardian Information</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Guardian Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Engr. Babatunde Macaulay"
                        value={formData.guardianName}
                        onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Relationship to Candidate *
                      </label>
                      <select
                        value={formData.guardianRelationship}
                        onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                        <option value="Sponsor">Corporate / Family Sponsor</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Guardian Telephone (+234) *
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 803 123 4567"
                        value={formData.guardianPhone}
                        onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Guardian Email *
                      </label>
                      <input
                        type="email"
                        placeholder="parent@company.com"
                        value={formData.guardianEmail}
                        onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Residential Home Address in Nigeria *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 14 Victoria Garden City (VGC), Lekki-Epe Expressway, Lagos"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Candidate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#005d42] hover:bg-[#047857] text-white text-xs font-semibold rounded shadow-xs transition-colors"
                    >
                      <span>Continue to Exam & Verification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Documents & Submit */}
              {currentStep === 3 && (
                <form onSubmit={handleSubmitApplication} className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <FileText className="w-4 h-4 text-[#005d42]" />
                    <h3 className="font-semibold text-sm text-slate-900">CBT Center Selection & Academic Background</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Campus Examination Centre *
                      </label>
                      <select
                        value={formData.preferredCampus}
                        onChange={(e) => setFormData({ ...formData, preferredCampus: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      >
                        <option value="Victoria Island Campus">Victoria Island Campus (Plot 12 VI Crescent)</option>
                        <option value="Ikeja Mainland Campus">Ikeja Mainland Campus (Mobolaji Bank Anthony)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        CBT Entrance Exam Batch *
                      </label>
                      <select
                        value={formData.cbtBatch}
                        onChange={(e) => setFormData({ ...formData, cbtBatch: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      >
                        <option value="Batch B (Active Registration)">Batch B (Active Registration) - Saturday, 17th May 2025</option>
                        <option value="Batch C (Final Supplementary)">Batch C (Final Supplementary) - Saturday, 28th June 2025</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Previous School Attended
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Corona Primary School, Victoria Island"
                        value={formData.previousSchool}
                        onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Last Term Cumulative Average (%)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 84%"
                        value={formData.lastTermScore}
                        onChange={(e) => setFormData({ ...formData, lastTermScore: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                      />
                    </div>
                  </div>

                  {/* Document Upload Simulation */}
                  <div className="p-4 border border-dashed border-slate-300 rounded-md bg-slate-50 text-center">
                    <p className="text-xs font-semibold text-slate-700">Attach Birth Certificate & Primary 6 Testimonial (Optional)</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">PDF or JPG formats up to 5MB. Verified upon CBT arrival.</p>
                    <div className="mt-2.5">
                      <span className="inline-block px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded text-xs cursor-pointer hover:bg-slate-100">
                        Select Documents
                      </span>
                    </div>
                  </div>

                  {/* Declaration Checkbox */}
                  <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={formData.hasAcceptedTerms}
                      onChange={(e) => setFormData({ ...formData, hasAcceptedTerms: e.target.checked })}
                      className="mt-0.5 rounded text-[#005d42] focus:ring-[#005d42]"
                    />
                    <span>
                      I solemnly certify that the information provided is accurate and agree to abide by the academic code and regulations of New Generation Academy.
                    </span>
                  </label>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.hasAcceptedTerms}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#005d42] hover:bg-[#047857] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded shadow-xs transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Application & Book CBT Seat</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar: Track Application Status & CBT Batches (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Track Application Status Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-[#005d42]" />
              <h3 className="font-semibold text-sm text-slate-900">Track Application Status</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Check entrance examination score, admission letter release, or clearance schedule.
            </p>

            <form onSubmit={handleLookup} className="space-y-2 mb-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Application Reference ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchRef}
                    onChange={(e) => setSearchRef(e.target.value)}
                    placeholder="NGA/2024/0482"
                    className="w-full pl-3 pr-8 py-2 text-xs font-mono font-semibold bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                    #
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#005d42] hover:bg-[#047857] text-white text-xs font-semibold rounded transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Lookup Status</span>
              </button>
            </form>

            {lookupError && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-1.5 mb-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{lookupError}</span>
              </div>
            )}

            {/* Live Lookup Result Display Card */}
            {searchedApplicant && (
              <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-md text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-slate-600">
                    Ref: {searchedApplicant.referenceId}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {searchedApplicant.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {searchedApplicant.fullName}
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    {searchedApplicant.classApplying}
                  </p>
                </div>
                {searchedApplicant.cbtScore !== undefined ? (
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
                    <span className="text-[11px] text-slate-600">
                      CBT Exam: <strong className="font-mono text-slate-900">{searchedApplicant.cbtScore}%</strong> ({searchedApplicant.cbtGrade || 'Distinction'})
                    </span>
                    <button
                      onClick={() => onOpenOfferLetter(searchedApplicant)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#005d42] hover:underline"
                    >
                      <span>Download Offer</span>
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
                    <span className="text-[11px] text-slate-600">
                      Exam: <strong className="text-slate-900">{searchedApplicant.examDate}</strong>
                    </span>
                    <button
                      onClick={() => onOpenExamSlip(searchedApplicant)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#005d42] hover:underline"
                    >
                      <span>View Exam Slip</span>
                      <FileText className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2024/2025 CBT Batches Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
                2024/2025 CBT Batches
              </h3>
              <span className="text-[10px] font-semibold text-[#005d42] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Mainland & Island
              </span>
            </div>

            <div className="space-y-2.5">
              {batches.map((batch) => {
                const isConcluded = batch.status === 'Concluded';
                const isOpen = batch.status === 'Seats Open';
                return (
                  <div
                    key={batch.id}
                    className={`p-3 rounded border text-xs transition-all ${
                      isOpen
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-slate-200 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{batch.name}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          isConcluded
                            ? 'bg-slate-200 text-slate-700'
                            : isOpen
                            ? 'bg-[#005d42] text-white shadow-xs'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {batch.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{batch.date} · {batch.time}</span>
                    </div>
                    {isOpen && (
                      <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-mono">
                          {batch.capacity - batch.registeredCount} seats remaining
                        </span>
                        <button
                          onClick={() => {
                            setFormData({ ...formData, cbtBatch: batch.name });
                            setCurrentStep(1);
                            setFormSuccess(null);
                          }}
                          className="text-[#005d42] font-semibold hover:underline"
                        >
                          Select Batch →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
