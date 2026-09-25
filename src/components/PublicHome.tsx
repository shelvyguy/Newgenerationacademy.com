import React, { useState } from 'react';
import { 
  CheckCircle, 
  Download, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Compass, 
  Users, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  FileText, 
  ChevronRight,
  Lightbulb,
  Heart,
  Target,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { AdmissionWizard } from './AdmissionWizard';
import { Applicant, CBTBatch, SchoolCircular, UserRole } from '../types';
import { CAMPUS_FACILITIES, HERO_ASSETS } from '../data/mockData';
import { TourBookingModal } from './Modals/TourBookingModal';
import { CircularDetailModal } from './Modals/CircularDetailModal';

interface PublicHomeProps {
  batches: CBTBatch[];
  applicants: Applicant[];
  circulars: SchoolCircular[];
  onAddApplicant: (applicant: Applicant) => void;
  onOpenOfferLetter: (applicant: Applicant) => void;
  onOpenExamSlip: (applicant: Applicant) => void;
  onSwitchRole: (role: UserRole) => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({
  batches,
  applicants,
  circulars,
  onAddApplicant,
  onOpenOfferLetter,
  onOpenExamSlip,
  onSwitchRole
}) => {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedCircular, setSelectedCircular] = useState<SchoolCircular | null>(null);
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const scrollToAdmissions = () => {
    const el = document.getElementById('admissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadProspectus = () => {
    // Generate or show curriculum prospectus alert
    alert('Downloading New Generation Academy 2024/2025 Academic Prospectus & Subject Syllabus (PDF)...');
  };

  const handleInstallPwa = () => {
    setPwaInstalled(true);
    setTimeout(() => {
      alert('New Generation Academy Parent PWA added to home screen successfully.');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e]">
      {/* 1. TOP TICKER / NOTIFICATION BAR */}
      <div className="bg-[#044e37] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-8 border-b border-[#033b2a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 font-medium">
          <div className="flex items-center gap-2 tracking-wide">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="uppercase text-[10px] sm:text-[11px] tracking-wider">
              GOVERNMENT APPROVED • WAEC & NECO ACCREDITED CENTER • STEM & ARTS EXCELLENCE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-100">Session: 2024 / 2025 Admissions Open</span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-8 pb-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block">
              <span className="text-xs font-bold uppercase tracking-wider text-[#005d42] bg-emerald-100/70 border border-emerald-300/60 px-3 py-1 rounded">
                PIONEERING 21ST-CENTURY NIGERIAN EDUCATION
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18] text-balance">
              Nurturing Visionary Leaders Through{' '}
              <span className="italic text-[#005d42] font-semibold">Academic Rigour</span> & Character.
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
              At New Generation Academy, we blend the British-Nigerian curriculum with moral uprightness, modern coding, laboratory inquiry, and creative expression across JSS 1 through SS 3.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToAdmissions}
                className="flex items-center gap-2 px-5 py-3 bg-[#005d42] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold rounded shadow-sm hover:shadow transition-all group"
              >
                <span>Apply for 2024/2025 Admission</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onSwitchRole('parent_student')}
                className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold rounded border border-slate-300 shadow-xs transition-colors"
              >
                <Users className="w-4 h-4 text-[#005d42]" />
                <span>Portal Login</span>
              </button>

              <button
                onClick={handleDownloadProspectus}
                className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold rounded border border-slate-300 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Prospectus (PDF)</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#005d42]" />
                <span>WAEC Reg: <strong className="text-slate-800 font-mono">#LAG-908241</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#005d42]" />
                <span>NECO Center: <strong className="text-slate-800 font-mono">#019238-SS</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-800">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Lagos State Model School of Year</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-xl group">
              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-md shadow-md border border-slate-200 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#005d42]" />
                <div className="leading-tight text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                    CURRICULUM STANDARD
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    British - Nigerian Dual Pathway
                  </span>
                </div>
              </div>

              {/* Main Photo of Students */}
              <div className="aspect-4/3 w-full overflow-hidden bg-slate-800">
                <img
                  src={HERO_ASSETS.students}
                  alt="New Generation Academy Nigerian scholars in emerald blazer uniforms"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Bottom Card */}
              <div className="p-3.5 bg-white/95 backdrop-blur-xs border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-emerald-100 text-[#005d42] font-bold text-xs flex items-center justify-center font-serif">
                    A+
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Lagos STEM Olympiad Champion
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      2023 & 2024 Consecutive Winners
                    </p>
                  </div>
                </div>
                <div className="p-1.5 bg-amber-100 text-amber-800 rounded">
                  <Award className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR METRIC STATS BAR */}
      <section className="bg-white border-y border-slate-200 py-8 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005d42] tabular-nums flex items-baseline">
              1,420<span className="text-amber-600 text-xl font-sans ml-0.5">+</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">Active Scholars</div>
            <div className="text-[11px] text-slate-500">Across JSS 1 to SS 3 dual campuses</div>
          </div>

          <div className="space-y-1 border-l-0 sm:border-l border-slate-200 pl-0 sm:pl-6">
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005d42] tabular-nums flex items-baseline">
              98.4%
              <span className="text-[11px] font-sans font-bold text-amber-700 uppercase bg-amber-100 px-1.5 py-0.5 rounded ml-2">
                5 CREDITS+
              </span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">WAEC Distinction Rate</div>
            <div className="text-[11px] text-slate-500">Including English & Mathematics</div>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-slate-200 pl-0 md:pl-6">
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005d42] tabular-nums flex items-baseline">
              1:18
              <span className="text-xs font-sans font-medium text-slate-500 ml-1.5">ratio</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">Teacher-Student Ratio</div>
            <div className="text-[11px] text-slate-500">Targeted personalized mentorship</div>
          </div>

          <div className="space-y-1 border-l-0 sm:border-l border-slate-200 pl-0 sm:pl-6">
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005d42] tabular-nums flex items-baseline">
              100%
              <CheckCircle className="w-4 h-4 text-emerald-600 ml-1.5 inline" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">University Placement</div>
            <div className="text-[11px] text-slate-500">Local federal, state & UK/US universities</div>
          </div>
        </div>
      </section>

      {/* 4. DIRECT ENROLLMENT PORTAL WIZARD */}
      <AdmissionWizard
        batches={batches}
        applicants={applicants}
        onAddApplicant={onAddApplicant}
        onOpenOfferLetter={onOpenOfferLetter}
        onOpenExamSlip={onOpenExamSlip}
      />

      {/* 5. DUAL-TRACK EXCELLENCE: Integrated Nigerian & British Curriculum */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-3 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
              DUAL-TRACK EXCELLENCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Integrated Nigerian & British Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              From foundational junior broad-spectrum learning to specialised senior disciplinary pathways geared towards WAEC, NECO, IGCSE, and Cambridge A-Levels.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#005d42] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded">
            <BookOpen className="w-4 h-4 text-[#005d42]" />
            <span>100% Syllabus Coverage with Continuous Assessment (CA)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: JSS 1 - JSS 3 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between hover:border-slate-300 shadow-xs transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-[#005d42] rounded">
                  JSS 1 – JSS 3
                </span>
                <Compass className="w-4 h-4 text-[#005d42]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Junior Secondary Academy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Foundational holistic development fostering cognitive critical thinking, digital numeracy, and moral integrity.
              </p>

              {/* Subject Badges */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Basic Science & Tech',
                    'ICT & Scratch Coding',
                    'Pre-Vocational Studies',
                    'Business Studies',
                    'Creative & Cultural Arts',
                    'French Language',
                    'Civic Education'
                  ].map((sub) => (
                    <span
                      key={sub}
                      className="px-2 py-0.5 text-[11px] font-medium bg-slate-50 text-slate-700 rounded border border-slate-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#005d42]">
              <span>Terminal Exam: Lagos BECE / NECO JSCE</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Card 2: SS 1 - SS 3 */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between hover:border-slate-300 shadow-xs transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                  SS 1 – SS 3 (Senior)
                </span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Senior Academic Divisions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Intensive collegiate specialisation structured across three distinct faculties tailored to university admissions.
              </p>

              <div className="space-y-2.5 text-xs pt-1">
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Science & Technology:</span>
                  <p className="text-slate-600 text-[11px]">
                    Further Mathematics, Physics, Chemistry, Biology, Technical Drawing, Data Processing.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Arts & Humanities:</span>
                  <p className="text-slate-600 text-[11px]">
                    Literature-in-English, Government, History, Christian/Islamic Studies, Visual Arts.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Commercial Department:</span>
                  <p className="text-slate-600 text-[11px]">
                    Financial Accounting, Commerce, Economics, Marketing, Office Practice.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#005d42]">
              <span>Target: WAEC SSCE / NECO SSCE / UTME</span>
              <ArrowRight className="w-4 h-4 text-[#005d42]" />
            </div>
          </div>

          {/* Card 3: Character & Societies */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between hover:border-slate-300 shadow-xs transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded">
                  Character & Societies
                </span>
                <Users className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Co-Curricular & Leadership
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every pupil engages in minimum two society clubs weekly to hone team leadership, public speech, and physical fitness.
              </p>

              <div className="space-y-2 text-xs pt-1">
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-800 text-[11px]">🤖 Robotics & AI Club:</span>
                  <span className="text-slate-600 text-[11px]">Arduino, Lego Mindstorms</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-800 text-[11px]">🧬 JET Club:</span>
                  <span className="text-slate-600 text-[11px]">Junior Engineers, Technicians & Scientists</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-800 text-[11px]">🌐 Model United Nations:</span>
                  <span className="text-slate-600 text-[11px]">(MUN) & Debate Club</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-800 text-[11px]">⚽ Athletics:</span>
                  <span className="text-slate-600 text-[11px]">Inter-house Sports, Swimming, Basketball</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-800 text-[11px]">🎵 Music Academy:</span>
                  <span className="text-slate-600 text-[11px]">Classical Piano, Saxophone & Orchestra</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#005d42]">
              <span>Leadership Prefect Council</span>
              <Award className="w-4 h-4 text-[#005d42]" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. OFFICE OF THE PRINCIPAL */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl my-6 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Principal Image with Title Overlay (5 cols) */}
          <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-slate-200 shadow-md">
            <div className="aspect-3/4 w-full bg-slate-800 relative">
              <img
                src={HERO_ASSETS.principal}
                alt="Dr. Mrs. Folashade Adeleke, Principal of New Generation Academy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <h4 className="font-serif text-lg sm:text-xl font-bold">
                  Dr. (Mrs.) Folashade Adeleke
                </h4>
                <p className="text-xs text-emerald-300 font-medium">
                  Ph.D. Educational Administration (Ibadan), F.N.I.M.
                </p>
                <p className="text-[11px] text-slate-300">
                  Principal & Executive Director of Studies
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Letter & Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
                OFFICE OF THE PRINCIPAL
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 text-balance">
                Welcome to an Academic Sanctuary Built for Modern Africa.
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <p className="italic font-serif text-slate-600">
                "Dear Parents, Guardians, and Prospective Scholars,"
              </p>
              <p>
                When we established New Generation Academy in Lagos, our conviction was simple yet uncompromising: that a secondary school should not merely instruct, but fundamentally transform. Here, academic rigour does not breed anxiety; it cultivates resilience, analytical thought, and unwavering intellectual curiosity.
              </p>
              <p>
                Whether your child is taking their first steps into Junior Secondary or preparing for WAEC, NECO, and international entrance assessments, our faculty of licensed subject masters walk beside them every day. We welcome you to experience our vibrant community.
              </p>
            </div>

            {/* 5 Pillars of Excellence */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-2.5">
                Our Pillars of Excellence:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <ShieldCheck className="w-4 h-4 mx-auto text-[#005d42] mb-1" />
                  <span className="font-bold text-slate-900 block text-[11px]">Integrity</span>
                  <span className="text-[10px] text-slate-500">Truth & Honour</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <Lightbulb className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                  <span className="font-bold text-slate-900 block text-[11px]">Innovation</span>
                  <span className="text-[10px] text-slate-500">Problem Solving</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <Target className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <span className="font-bold text-slate-900 block text-[11px]">Diligence</span>
                  <span className="text-[10px] text-slate-500">Persistent Focus</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <Heart className="w-4 h-4 mx-auto text-rose-600 mb-1" />
                  <span className="font-bold text-slate-900 block text-[11px]">Compassion</span>
                  <span className="text-[10px] text-slate-500">Kind Leadership</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 mx-auto text-purple-600 mb-1" />
                  <span className="font-bold text-slate-900 block text-[11px]">Competence</span>
                  <span className="text-[10px] text-slate-500">Global Stature</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCHOOL COMMUNICATIONS DESK: NEWS, CIRCULARS & CALENDAR */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
              SCHOOL COMMUNICATIONS DESK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              News, Circulars & Calendar
            </h2>
          </div>
          <button
            onClick={() => setSelectedCircular(circulars[0])}
            className="flex items-center gap-1 text-xs font-semibold text-[#005d42] hover:underline"
          >
            <span>View All Academic Circulars</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {circulars.map((circ) => (
            <div
              key={circ.id}
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-slate-300 shadow-xs transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`px-2 py-0.5 rounded font-semibold border ${circ.badgeType || 'bg-slate-100 text-slate-800'}`}>
                    {circ.category}
                  </span>
                  <span className="text-slate-400 font-mono">{circ.date}</span>
                </div>

                <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {circ.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {circ.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">
                  {circ.officer}
                </span>
                <button
                  onClick={() => setSelectedCircular(circ)}
                  className="font-semibold text-[#005d42] hover:underline"
                >
                  {circ.actionText} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WORLD-CLASS INFRASTRUCTURE: CAMPUS FACILITIES */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005d42]">
            WORLD-CLASS INFRASTRUCTURE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Campus Facilities Tailored for Discovery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Purpose-built learning environments engineered to inspire scientific enquiry, creative arts, and physical vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPUS_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs group hover:border-slate-300 transition-all flex flex-col"
            >
              <div className="aspect-16/9 w-full bg-slate-200 overflow-hidden relative">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-400"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-sm font-bold text-slate-900 mb-1">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parent Testimonial */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="italic text-xs sm:text-sm text-slate-700 leading-relaxed">
              "The transformation in our son since entering JSS 1 has been extraordinary. Not only did he finish with 8 A1s in his WAEC exams, but the school's robotics club also earned him an international engineering scholarship to Imperial College London."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#005d42] text-white flex items-center justify-center font-bold text-xs">
                BM
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Engr. Babatunde Macaulay
                </h4>
                <p className="text-[11px] text-slate-500">
                  Chairman, Parents Teachers Association (PTA)
                </p>
              </div>
            </div>
          </div>

          {/* Alumna Testimonial */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="italic text-xs sm:text-sm text-slate-700 leading-relaxed">
              "New Generation Academy taught us that integrity is non-negotiable. The debate society and leadership mentorship prepared me for law school at the University of Lagos better than I could have ever imagined."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                AO
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Amara Okonkwo (Class of '22)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Best Overall WAEC Candidate • First Class Law Student
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GUIDED TOUR CTA BANNER */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#005d42] text-white rounded-xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-200 bg-[#064e3b] px-3 py-1 rounded">
                Admissions Hotline Open Mon – Sat (8:00 AM – 5:00 PM)
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Schedule an In-Person Campus Guided Tour
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Visit our Victoria Island or Ikeja campuses. Meet class tutors, explore our lab complexes, and inspect boarding accommodations.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200 pt-1">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  +234 (0) 803 123 4567
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  admissions@newgenerationacademy.edu.ng
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Plot 12, Victoria Island Crescent, Lagos
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setIsTourModalOpen(true)}
                className="px-5 py-3 bg-white text-[#005d42] hover:bg-slate-100 text-xs sm:text-sm font-bold rounded shadow-md transition-colors"
              >
                Book Guided Tour
              </button>
              <button
                onClick={scrollToAdmissions}
                className="flex items-center gap-2 px-5 py-3 bg-[#044e37] hover:bg-[#033b2a] border border-emerald-400/40 text-white text-xs sm:text-sm font-semibold rounded shadow-md transition-colors"
              >
                <span>Begin Online Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold uppercase tracking-wider text-xs">Accreditation & Registry</h4>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Fully chartered by Federal Ministry of Education & Lagos State Ministry of Basic Education. Operating premier British-Nigerian curricula.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
              <p>WAEC Center: #LAG-908241</p>
              <p>NECO Center: #019238-SS</p>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold uppercase tracking-wider text-xs">Dual Campuses</h4>
            </div>
            <div className="space-y-2 text-[11px] text-slate-400">
              <p>
                <strong className="text-slate-200 block">Victoria Island Campus:</strong>
                Plot 14 Ahmadu Bello Way, VI, Lagos.
              </p>
              <p>
                <strong className="text-slate-200 block">Ikeja Mainland Campus:</strong>
                8 Mobolaji Bank Anthony Way, Ikeja, Lagos.
              </p>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Phone className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold uppercase tracking-wider text-xs">Immediate Inquiries</h4>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400">
              <p>Administrative Desk: +234 (1) 234-5678</p>
              <p>Emergency Health Bay: +234 800-NGA-CARE</p>
              <p>Bursary & Accounts: bursary@nga.edu.ng</p>
            </div>
          </div>

          {/* Col 4: PWA Experience */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold uppercase tracking-wider text-xs">NGA Mobile Experience</h4>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Instant continuous assessment alerts, attendance feeds, and term results directly on your smartphone.
            </p>
            <button
              onClick={handleInstallPwa}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[11px] font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{pwaInstalled ? 'PWA Installed ✓' : 'Install NGA Parent PWA App'}</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2024–2025 New Generation Academy. All rights reserved. Registered Educational Institution.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-slate-400">Academic Regulations</a>
            <span>·</span>
            <a href="#" className="hover:text-slate-400">Bursary Terms</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TourBookingModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

      <CircularDetailModal
        isOpen={Boolean(selectedCircular)}
        onClose={() => setSelectedCircular(null)}
        circular={selectedCircular}
      />
    </div>
  );
};
