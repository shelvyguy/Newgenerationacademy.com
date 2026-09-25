import React, { useState } from 'react';
import { 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  Shield, 
  Award, 
  BookOpen, 
  User, 
  Check, 
  Sparkles,
  School
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenTourModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  onOpenTourModal
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Batch B Registration Filling Fast',
      desc: '116 seats left for Mainland & Island CBT centers.',
      time: '10m ago'
    },
    {
      id: 2,
      title: 'Adewale Emmanuel (SS 1)',
      desc: 'Provisional Offer of Admission letter released.',
      time: '1h ago'
    },
    {
      id: 3,
      title: 'Continuous Assessment 2',
      desc: 'Teachers can now input CA 2 marks in the portal.',
      time: '3h ago'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left Brand Lockup (Exactly matching screenshot) */}
          <div
            onClick={() => onSelectRole('public')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            {/* School Crest Shield */}
            <div className="w-10 h-10 rounded-full bg-[#005d42] border-2 border-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <School className="w-5 h-5 text-emerald-100" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                  NEW GENERATION ACADEMY
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-amber-500 text-white tracking-widest">
                  EXCELLENCE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Excellence & Character • Secondary Education (JSS 1 – SS 3)
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Matching screenshot) */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => onSelectRole('public')}
              className={`px-3.5 py-2 rounded-md transition-colors ${
                currentRole === 'public'
                  ? 'bg-[#005d42] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Public Website
            </button>

            <button
              onClick={() => onSelectRole('admin')}
              className={`px-3.5 py-2 rounded-md transition-colors ${
                currentRole === 'admin'
                  ? 'bg-[#005d42] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Admin Command
            </button>

            <button
              onClick={() => onSelectRole('teacher')}
              className={`px-3.5 py-2 rounded-md transition-colors ${
                currentRole === 'teacher'
                  ? 'bg-[#005d42] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Teacher Portal (CA/Results)
            </button>

            <button
              onClick={() => onSelectRole('parent_student')}
              className={`px-3.5 py-2 rounded-md transition-colors ${
                currentRole === 'parent_student'
                  ? 'bg-[#005d42] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Student & Parent Hub
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Switch Role Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded hover:bg-slate-100 transition-colors"
              >
                <span>Switch Role</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-50 text-xs">
                  <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    Select Interface Mode
                  </div>
                  <button
                    onClick={() => {
                      onSelectRole('public');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      currentRole === 'public' ? 'text-[#005d42] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Public Website & Admissions</span>
                    {currentRole === 'public' && <Check className="w-3.5 h-3.5 text-[#005d42]" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      currentRole === 'admin' ? 'text-[#005d42] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Admin Command (Admissions)</span>
                    {currentRole === 'admin' && <Check className="w-3.5 h-3.5 text-[#005d42]" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('teacher');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      currentRole === 'teacher' ? 'text-[#005d42] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Teacher Portal (CA/Results)</span>
                    {currentRole === 'teacher' && <Check className="w-3.5 h-3.5 text-[#005d42]" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectRole('parent_student');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      currentRole === 'parent_student' ? 'text-[#005d42] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Student & Parent Hub</span>
                    {currentRole === 'parent_student' && <Check className="w-3.5 h-3.5 text-[#005d42]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 relative transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-semibold text-slate-800">
                    <span>School Alerts</span>
                    <span className="text-[10px] text-[#005d42] cursor-pointer">Mark read</span>
                  </div>
                  <div className="space-y-2.5 pt-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="flex items-center justify-between font-semibold text-slate-900 text-[11px]">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tour / Help Icon */}
            <button
              onClick={onOpenTourModal}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              title="Schedule Campus Tour or Inquiries"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* User Avatar */}
            <div
              onClick={() => onSelectRole('parent_student')}
              className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center cursor-pointer text-xs font-bold hover:ring-2 hover:ring-[#005d42] transition-all"
              title="Adewale Emmanuel (Parent/Scholar Account)"
            >
              AE
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
