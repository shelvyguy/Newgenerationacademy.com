import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Users } from 'lucide-react';

interface TourBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourBookingModal: React.FC<TourBookingModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    campus: 'Victoria Island Campus',
    preferredDate: '',
    preferredSlot: '10:00 AM - Morning Slot',
    gradeOfInterest: 'Junior Secondary (JSS 1 - JSS 3)',
    attendees: '2 Adults, 1 Prospective Scholar'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#005d42] text-white">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-serif font-bold text-base">Schedule an In-Person Campus Guided Tour</h3>
              <p className="text-xs text-emerald-100">Victoria Island or Ikeja Mainland Campus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded hover:bg-[#064e3b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-[#005d42] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">Tour Booking Confirmed!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                An invitation pass with driving directions and admissions officer briefing has been dispatched to <strong>{formData.email || 'your email'}</strong>.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-left text-xs space-y-1 text-slate-700">
              <p><span className="font-semibold">Campus:</span> {formData.campus}</p>
              <p><span className="font-semibold">Scheduled Date:</span> {formData.preferredDate || 'Upcoming Saturday'}</p>
              <p><span className="font-semibold">Time Slot:</span> {formData.preferredSlot}</p>
              <p><span className="font-semibold">Parent Contact:</span> {formData.parentName} ({formData.phone})</p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#005d42] hover:bg-[#047857] text-white text-xs font-semibold rounded shadow-xs"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent / Guardian Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kehinde Emmanuel"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (+234) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Campus Location *
                  </label>
                  <select
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42] bg-white"
                  >
                    <option value="Victoria Island Campus">Victoria Island Campus (Plot 12 VI Crescent)</option>
                    <option value="Ikeja Mainland Campus">Ikeja Mainland Campus (Mobolaji Bank Anthony)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Tour Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.preferredSlot}
                    onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42] bg-white"
                  >
                    <option value="10:00 AM - Morning Slot">10:00 AM - Morning Slot</option>
                    <option value="1:00 PM - Afternoon Slot">1:00 PM - Afternoon Slot</option>
                    <option value="3:30 PM - Boarding Inspection Slot">3:30 PM - Boarding Inspection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Class of Interest
                  </label>
                  <select
                    value={formData.gradeOfInterest}
                    onChange={(e) => setFormData({ ...formData, gradeOfInterest: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005d42]/30 focus:border-[#005d42] bg-white"
                  >
                    <option value="Junior Secondary (JSS 1 - JSS 3)">Junior Secondary (JSS 1 - JSS 3)</option>
                    <option value="Senior Science Division">Senior Science Division (SS 1 - SS 3)</option>
                    <option value="Senior Commercial & Arts">Senior Commercial & Arts (SS 1 - SS 3)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#005d42] hover:bg-[#047857] rounded shadow-xs"
              >
                Book Guided Campus Tour
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
