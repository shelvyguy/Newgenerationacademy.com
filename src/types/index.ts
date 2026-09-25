export type UserRole = 'public' | 'admin' | 'teacher' | 'parent_student';

export interface Applicant {
  id: string;
  referenceId: string;
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female';
  stateOfOrigin: string;
  classApplying: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelationship: string;
  address: string;
  preferredCampus: 'Victoria Island Campus' | 'Ikeja Mainland Campus';
  cbtBatch: string;
  cbtScore?: number;
  cbtGrade?: string;
  status: 'Pending Review' | 'CBT Scheduled' | 'Provisional Offer' | 'Admitted' | 'Waitlisted';
  appliedDate: string;
  examDate?: string;
  hallNumber?: string;
  seatNumber?: string;
}

export interface CBTBatch {
  id: string;
  name: string;
  stage: string;
  date: string;
  time: string;
  status: 'Concluded' | 'Seats Open' | 'Upcoming';
  capacity: number;
  registeredCount: number;
}

export interface GradeSubject {
  id: string;
  subject: string;
  ca1: number; // Max 20
  ca2: number; // Max 20
  exam: number; // Max 60
  total: number; // Max 100
  grade: 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6' | 'D7' | 'E8' | 'F9';
  remark: string;
}

export interface StudentRecord {
  id: string;
  regNumber: string;
  fullName: string;
  class: string;
  arm: string;
  gender: 'Male' | 'Female';
  passportUrl?: string;
  term: string;
  session: string;
  subjects: GradeSubject[];
  attendance: {
    totalDays: number;
    presentDays: number;
  };
  conductRemark: string;
  teacherRemark: string;
  principalRemark: string;
  feesStatus: 'Fully Cleared' | 'Partial' | 'Outstanding';
  totalFees: number;
  paidFees: number;
}

export interface SchoolCircular {
  id: string;
  category: 'Academic Assessment' | 'Sports & Athletics' | 'Deadline Alert' | 'Administrative';
  date: string;
  title: string;
  summary: string;
  content: string;
  officer: string;
  actionText: string;
  badgeType?: string;
}
