import { Applicant, CBTBatch, GradeSubject, SchoolCircular, StudentRecord } from '../types';

export const NIGERIAN_STATES = [
  'Lagos',
  'Abuja (FCT)',
  'Ogun',
  'Oyo',
  'Rivers',
  'Delta',
  'Edo',
  'Anambra',
  'Enugu',
  'Imo',
  'Abia',
  'Akwa Ibom',
  'Cross River',
  'Kano',
  'Kaduna',
  'Kwara',
  'Osun',
  'Ondo',
  'Ekiti',
  'Plateau',
  'Benue',
  'Kogi',
  'Niger',
  'Borno',
  'Sokoto',
  'Bauchi'
];

export const INITIAL_BATCHES: CBTBatch[] = [
  {
    id: 'batch-a',
    name: 'Batch A (First Intake)',
    stage: 'First Intake',
    date: 'Saturday, 12th April 2025',
    time: '9:00 AM',
    status: 'Concluded',
    capacity: 350,
    registeredCount: 350
  },
  {
    id: 'batch-b',
    name: 'Batch B (Active Registration)',
    stage: 'Active Registration',
    date: 'Saturday, 17th May 2025',
    time: '9:00 AM',
    status: 'Seats Open',
    capacity: 400,
    registeredCount: 284
  },
  {
    id: 'batch-c',
    name: 'Batch C (Final Supplementary)',
    stage: 'Final Supplementary',
    date: 'Saturday, 28th June 2025',
    time: '9:00 AM',
    status: 'Upcoming',
    capacity: 250,
    registeredCount: 42
  }
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-0482',
    referenceId: 'NGA/2024/0482',
    fullName: 'Adewale Emmanuel',
    dob: '2010-04-14',
    gender: 'Male',
    stateOfOrigin: 'Lagos',
    classApplying: 'Senior Secondary 1 (SS 1 - Science)',
    guardianName: 'Dr. Kehinde Emmanuel',
    guardianPhone: '+234 803 456 7890',
    guardianEmail: 'k.emmanuel@medix.ng',
    guardianRelationship: 'Father',
    address: '14 Admiralty Way, Lekki Phase 1, Lagos',
    preferredCampus: 'Victoria Island Campus',
    cbtBatch: 'Batch A (First Intake)',
    cbtScore: 84,
    cbtGrade: 'Distinction',
    status: 'Provisional Offer',
    appliedDate: '2025-02-10',
    examDate: '12th April 2025',
    hallNumber: 'Hall 2 (Turing Lab)',
    seatNumber: 'V-042'
  },
  {
    id: 'app-0519',
    referenceId: 'NGA/2024/0519',
    fullName: 'ADEKUNLE, Chinedu Ibrahim',
    dob: '2012-08-22',
    gender: 'Male',
    stateOfOrigin: 'Oyo',
    classApplying: 'Junior Secondary 1 (JSS 1 - Fresh Entry)',
    guardianName: 'Engr. Ibrahim Adekunle',
    guardianPhone: '+234 802 334 1122',
    guardianEmail: 'i.adekunle@chevron.com',
    guardianRelationship: 'Father',
    address: 'Block 4B, Dolphin Estate, Ikoyi, Lagos',
    preferredCampus: 'Victoria Island Campus',
    cbtBatch: 'Batch B (Active Registration)',
    cbtScore: 78,
    cbtGrade: 'Credit Pass',
    status: 'CBT Scheduled',
    appliedDate: '2025-02-18',
    examDate: '17th May 2025',
    hallNumber: 'Hall 1 (Main Auditorium)',
    seatNumber: 'VI-118'
  },
  {
    id: 'app-0604',
    referenceId: 'NGA/2024/0604',
    fullName: 'BELLO, Zainab Amina',
    dob: '2011-01-19',
    gender: 'Female',
    stateOfOrigin: 'Kwara',
    classApplying: 'Junior Secondary 2 (JSS 2 - Transfer)',
    guardianName: 'Hajiya Fatima Bello',
    guardianPhone: '+234 818 909 2341',
    guardianEmail: 'fatima.bello@cbn.gov.ng',
    guardianRelationship: 'Mother',
    address: '18 Isaac John Street, GRA Ikeja, Lagos',
    preferredCampus: 'Ikeja Mainland Campus',
    cbtBatch: 'Batch B (Active Registration)',
    status: 'Pending Review',
    appliedDate: '2025-02-23',
    examDate: '17th May 2025',
    hallNumber: 'Mainland CBT Suite A',
    seatNumber: 'IK-055'
  },
  {
    id: 'app-0711',
    referenceId: 'NGA/2024/0711',
    fullName: 'OKONKWO, Somtochukwu David',
    dob: '2009-11-05',
    gender: 'Male',
    stateOfOrigin: 'Anambra',
    classApplying: 'Senior Secondary 1 (SS 1 - Commercial)',
    guardianName: 'Chief Emeka Okonkwo',
    guardianPhone: '+234 805 771 9900',
    guardianEmail: 'emeka@okonkwoholdings.com',
    guardianRelationship: 'Father',
    address: '22 Bourdillon Road, Ikoyi, Lagos',
    preferredCampus: 'Victoria Island Campus',
    cbtBatch: 'Batch A (First Intake)',
    cbtScore: 91,
    cbtGrade: 'Distinction',
    status: 'Admitted',
    appliedDate: '2025-01-30',
    examDate: '12th April 2025',
    hallNumber: 'Hall 3 (Euler Suite)',
    seatNumber: 'V-014'
  }
];

export const INITIAL_CIRCULARS: SchoolCircular[] = [
  {
    id: 'circ-1',
    category: 'Academic Assessment',
    date: 'Feb 24, 2025',
    title: '2nd Term Mid-Term Break Notice & Continuous Assessment (CA 2) Test Schedule',
    summary: 'Parents are reminded that all students in JSS 1 through SS 3 will commence CA 2 online & paper assessments from Wednesday next week. Mid-term break follows immediately from Friday 28th February to Tuesday 4th March 2025.',
    content: `Dear Parents & Guardians,

Please be notified that the Second Term Continuous Assessment 2 (CA 2) tests across all faculties will commence on Wednesday, 26th February 2025 and conclude on Friday, 28th February 2025. 

Key Assessment Guidelines:
1. Students in JSS 1 - SS 2 must have completed all laboratory journals and continuous assessment notebooks.
2. SS 3 mock practical examinations in Physics, Chemistry, Biology, and Technical Drawing will run concurrently.
3. The boarding house will be open for students choosing guided revision over the mid-term break.

Resumption date after mid-term break is Wednesday, 5th March 2025 by 7:30 AM prompt.`,
    officer: 'Vice Principal (Academics)',
    actionText: 'Read Circular',
    badgeType: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    id: 'circ-2',
    category: 'Sports & Athletics',
    date: 'March 14, 2025',
    title: 'Annual Inter-House Sports Festival 2025 @ Teslim Balogun Stadium, Surulere',
    summary: 'Red, Emerald, Gold, and Sapphire houses gear up for track & field glory! Parents and alumni are cordially invited. Transportation buses depart Victoria Island and Ikeja campuses from 7:00 AM.',
    content: `The Management, Staff, and Sports Council of New Generation Academy joyfully invite our esteemed parents, guardians, and alumni to the 14th Annual Inter-House Sports Athletics Championship.

Venue: Main Bowl, Teslim Balogun Stadium, Surulere, Lagos
Date: Friday, 14th March 2025
Time: 8:30 AM prompt (March Past begins at 9:00 AM)

Competing Houses:
• Emerald House (Defending Champions) - Patron: Dr. Folashade Adeleke
• Sapphire House - Patron: Engr. Babatunde Macaulay
• Gold House - Patron: Justice (Mrs.) C. N. Alabi
• Red House - Patron: Chief Emeka Okonkwo

VIP Parent Pavilion passes can be collected at the administrative desk or downloaded from the Parent Hub.`,
    officer: 'Sports Directorate',
    actionText: 'Event Itinerary',
    badgeType: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    id: 'circ-3',
    category: 'Deadline Alert',
    date: 'Final Call',
    title: 'WAEC & NECO Registration Final Verification for SS 3 Candidates',
    summary: 'All SS 3 parents must review the biometrics verification slip and NIN concordance documents at the Bursary and Exam Registry to forestall WAEC/NECO portal disqualification.',
    content: `URGENT NOTICE TO ALL SS 3 PARENTS & SCHOLARS:

The West African Examinations Council (WAEC) and the National Examinations Council (NECO) registration portals will close officially on March 31, 2025. 

Action Required:
1. Confirm that student legal names match the National Identification Number (NIN) exactly.
2. Sign off on the biometric passport photograph verification sheet in the Examinations Office.
3. Clear all outstanding mock fee levies and terminal examination insurance.

Students with discrepancies must see the Examination Officer immediately before close of business this Friday.`,
    officer: 'Registry Officer',
    actionText: 'Verify Portal Slip',
    badgeType: 'bg-red-50 text-red-800 border-red-200'
  }
];

export const INITIAL_STUDENT_RECORD: StudentRecord = {
  id: 'stu-0482',
  regNumber: 'NGA/2024/0482',
  fullName: 'Adewale Emmanuel',
  class: 'Senior Secondary 1 (SS 1)',
  arm: 'Science Division (Diamond)',
  gender: 'Male',
  term: 'Second Term',
  session: '2024 / 2025 Academic Session',
  attendance: {
    totalDays: 65,
    presentDays: 64
  },
  conductRemark: 'Exemplary conduct. Demonstrates outstanding leadership in the Robotics & AI Club and maintains stellar academic rigor.',
  teacherRemark: 'Emmanuel continues to excel in all sciences. Exceptional analytical aptitude in Further Mathematics and Physics.',
  principalRemark: 'An exceptional scholar with profound intellectual promise. Commended for representing the academy at the Lagos STEM Olympiad.',
  feesStatus: 'Fully Cleared',
  totalFees: 850000,
  paidFees: 850000,
  subjects: [
    {
      id: 'sub-1',
      subject: 'English Language',
      ca1: 18,
      ca2: 17,
      exam: 52,
      total: 87,
      grade: 'A1',
      remark: 'Distinction'
    },
    {
      id: 'sub-2',
      subject: 'General Mathematics',
      ca1: 20,
      ca2: 19,
      exam: 55,
      total: 94,
      grade: 'A1',
      remark: 'Distinction'
    },
    {
      id: 'sub-3',
      subject: 'Further Mathematics',
      ca1: 19,
      ca2: 18,
      exam: 54,
      total: 91,
      grade: 'A1',
      remark: 'Distinction'
    },
    {
      id: 'sub-4',
      subject: 'Physics',
      ca1: 17,
      ca2: 18,
      exam: 49,
      total: 84,
      grade: 'A1',
      remark: 'Distinction'
    },
    {
      id: 'sub-5',
      subject: 'Chemistry',
      ca1: 16,
      ca2: 17,
      exam: 48,
      total: 81,
      grade: 'A1',
      remark: 'Distinction'
    },
    {
      id: 'sub-6',
      subject: 'Biology',
      ca1: 16,
      ca2: 15,
      exam: 45,
      total: 76,
      grade: 'A1',
      remark: 'Distinction'
    },
    {
      id: 'sub-7',
      subject: 'Computer Science & Scratch / Python',
      ca1: 20,
      ca2: 20,
      exam: 56,
      total: 96,
      grade: 'A1',
      remark: 'Distinction'
    },
    {
      id: 'sub-8',
      subject: 'Civic Education',
      ca1: 15,
      ca2: 16,
      exam: 42,
      total: 73,
      grade: 'B2',
      remark: 'Very Good'
    },
    {
      id: 'sub-9',
      subject: 'Technical Drawing',
      ca1: 17,
      ca2: 16,
      exam: 46,
      total: 79,
      grade: 'A1',
      remark: 'Distinction'
    }
  ]
};

// Facility image paths from generated images
export const CAMPUS_FACILITIES = [
  {
    id: 'lab',
    title: 'Ultra-modern Science Labs',
    description: 'Dedicated Chemistry, Physics & Biology bays with full digital sensors and safety hoods.',
    image: '/src/assets/images/science_lab_1790339852796.jpg'
  },
  {
    id: 'ict',
    title: 'Fiber-Optic ICT & AI Suite',
    description: '120 individual workstations powered with high-speed fiber, coding IDEs, and 3D printing equipment.',
    image: '/src/assets/images/ict_suite_1790339864782.jpg'
  },
  {
    id: 'library',
    title: 'Comprehensive E-Library',
    description: 'Access to over 45,000 academic journals, JSTOR database, and classical world literature volumes.',
    image: '/src/assets/images/school_library_1790339893236.jpg'
  },
  {
    id: 'sports',
    title: 'Sports Arena & Pitch',
    description: 'FIFA-grade astroturf football stadium, heated swimming bay, and indoor badminton court.',
    image: '/src/assets/images/sports_arena_1790339876325.jpg'
  }
];

export const HERO_ASSETS = {
  students: '/src/assets/images/curriculum_students_1790339827344.jpg',
  principal: '/src/assets/images/principal_adeleke_1790339841917.jpg'
};

export const CBT_MOCK_QUESTIONS = [
  {
    id: 1,
    subject: 'General Mathematics',
    question: 'Solve for x in the equation: 3(2x - 5) + 4 = 25',
    options: ['x = 4', 'x = 6', 'x = 5', 'x = 7'],
    correct: 1,
    explanation: '3(2x - 5) = 21 -> 2x - 5 = 7 -> 2x = 12 -> x = 6.'
  },
  {
    id: 2,
    subject: 'English Language',
    question: 'Choose the option that is NEAREST IN MEANING to the italicized word: The principal commended the boy for his "impeccable" manners.',
    options: ['Flawless', 'Humble', 'Timid', 'Loud'],
    correct: 0,
    explanation: 'Impeccable means in accordance with the highest standards; faultless, flawless.'
  },
  {
    id: 3,
    subject: 'Integrated Science',
    question: 'Which of the following cellular organelles is primarily responsible for ATP aerobic cellular respiration?',
    options: ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Endoplasmic reticulum'],
    correct: 1,
    explanation: 'Mitochondria generate most of the chemical energy needed to power the cell (ATP).'
  },
  {
    id: 4,
    subject: 'Quantitative Aptitude',
    question: 'If the ratio of boys to girls in JSS 1 is 3 : 5 and there are 120 scholars in total, how many girls are in the class?',
    options: ['45 girls', '75 girls', '60 girls', '80 girls'],
    correct: 1,
    explanation: 'Total parts = 3 + 5 = 8. Girls = (5/8) * 120 = 75 girls.'
  },
  {
    id: 5,
    subject: 'Computer & Logic',
    question: 'Which logic gate produces a TRUE (1) output ONLY when both of its inputs are TRUE (1)?',
    options: ['OR gate', 'AND gate', 'NOT gate', 'XOR gate'],
    correct: 1,
    explanation: 'An AND gate gives a 1 output strictly if both inputs are 1.'
  }
];

export function computeGrade(total: number): { grade: GradeSubject['grade']; remark: string } {
  if (total >= 75) return { grade: 'A1', remark: 'Distinction' };
  if (total >= 70) return { grade: 'B2', remark: 'Very Good' };
  if (total >= 65) return { grade: 'B3', remark: 'Good' };
  if (total >= 60) return { grade: 'C4', remark: 'Credit' };
  if (total >= 55) return { grade: 'C5', remark: 'Credit' };
  if (total >= 50) return { grade: 'C6', remark: 'Credit' };
  if (total >= 45) return { grade: 'D7', remark: 'Pass' };
  if (total >= 40) return { grade: 'E8', remark: 'Pass' };
  return { grade: 'F9', remark: 'Fail' };
}
