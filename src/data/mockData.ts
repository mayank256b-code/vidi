export interface Tutor {
  id: string;
  name: string;
  nameNe: string;
  avatar: string;
  subjects: string[];
  grades: string[];
  location: string;
  ward: string;
  hourlyRate: number;
  monthlyRate: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  badge: 'gold' | 'silver' | 'bronze' | 'new';
  experience: number;
  studentsTaught: number;
  qualifications: string[];
  about: string;
  aboutNe: string;
  availability: string[];
  onlineAvailable: boolean;
  certificates: string[];
  trialAvailable: boolean;
  trialPrice: number;
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  mode: 'online' | 'in-person';
  meetingLink?: string;
  amount: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface ChatThread {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export interface Review {
  id: string;
  tutorId: string;
  studentName: string;
  rating: number;
  text: string;
  date: string;
}

export const tutors: Tutor[] = [
  {
    id: '1',
    name: 'Ram Sharma',
    nameNe: 'राम शर्मा',
    avatar: '',
    subjects: ['mathematics', 'physics'],
    grades: ['9', '10', '11', '12'],
    location: 'kathmandu',
    ward: 'Ward 7, Baneshwor',
    hourlyRate: 500,
    monthlyRate: 8000,
    rating: 4.8,
    reviewCount: 45,
    verified: true,
    badge: 'gold',
    experience: 12,
    studentsTaught: 200,
    qualifications: ['M.Sc. Mathematics - Tribhuvan University', 'B.Ed. - Kathmandu University', 'CLE Mathematics Certification'],
    about: 'Passionate mathematics teacher with 12 years of experience. Specializing in SEE and +2 preparation. My students consistently achieve top marks.',
    aboutNe: '१२ वर्षको अनुभव भएका उत्साही गणित शिक्षक। SEE र +2 तयारीमा विशेषज्ञता। मेरा विद्यार्थीहरू सधैं उत्कृष्ट अंक ल्याउँछन्।',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    onlineAvailable: true,
    certificates: ['M.Sc. Certificate', 'B.Ed. Certificate', 'Teaching License'],
    trialAvailable: true,
    trialPrice: 0,
  },
  {
    id: '2',
    name: 'Sita Thapa',
    nameNe: 'सीता थापा',
    avatar: '',
    subjects: ['english', 'nepali', 'socialStudies'],
    grades: ['6', '7', '8', '9', '10'],
    location: 'pokhara',
    ward: 'Ward 12, Lakeside',
    hourlyRate: 400,
    monthlyRate: 6500,
    rating: 4.6,
    reviewCount: 32,
    verified: true,
    badge: 'silver',
    experience: 8,
    studentsTaught: 150,
    qualifications: ['M.A. English - Pokhara University', 'B.A. Education', 'IELTS 7.5'],
    about: 'Experienced English and Nepali language teacher. Focus on grammar, composition, and literature. Preparing students for board exams.',
    aboutNe: 'अनुभवी अंग्रेजी र नेपाली भाषा शिक्षक। व्याकरण, रचना र साहित्यमा जोड। विद्यार्थीहरूलाई बोर्ड परीक्षाको तयारी।',
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    onlineAvailable: true,
    certificates: ['M.A. Certificate', 'Teaching License'],
    trialAvailable: true,
    trialPrice: 200,
  },
  {
    id: '3',
    name: 'Bikash Gurung',
    nameNe: 'विकास गुरुङ',
    avatar: '',
    subjects: ['science', 'biology', 'chemistry'],
    grades: ['8', '9', '10', '11', '12'],
    location: 'kathmandu',
    ward: 'Ward 4, Kalanki',
    hourlyRate: 600,
    monthlyRate: 9000,
    rating: 4.9,
    reviewCount: 58,
    verified: true,
    badge: 'gold',
    experience: 15,
    studentsTaught: 300,
    qualifications: ['M.Sc. Biology - TU', 'B.Sc. Biology (Hons)', 'Medical Entrance Coaching Certified'],
    about: 'Senior science teacher specializing in biology and chemistry. 15 years of experience in medical and engineering entrance preparation.',
    aboutNe: 'जीवविज्ञान र रसायनशास्त्रमा विशेषज्ञ वरिष्ठ विज्ञान शिक्षक। मेडिकल र इन्जिनियरिङ प्रवेश तयारीमा १५ वर्षको अनुभव।',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    onlineAvailable: true,
    certificates: ['M.Sc. Certificate', 'Medical Coaching Certificate', 'Teaching License'],
    trialAvailable: true,
    trialPrice: 0,
  },
  {
    id: '4',
    name: 'Anjali Maharjan',
    nameNe: 'अञ्जली महर्जन',
    avatar: '',
    subjects: ['computerScience', 'mathematics'],
    grades: ['9', '10', '11', '12', '+2'],
    location: 'lalitpur',
    ward: 'Ward 3, Pulchowk',
    hourlyRate: 700,
    monthlyRate: 10000,
    rating: 4.7,
    reviewCount: 28,
    verified: true,
    badge: 'silver',
    experience: 6,
    studentsTaught: 80,
    qualifications: ['B.E. Computer Engineering - IOE', 'M.Sc. IT - Kathmandu University', 'Programming Certifications'],
    about: 'Young and energetic computer science teacher. Expert in programming, algorithms, and web development. Making coding fun and accessible.',
    aboutNe: 'उत्साही कम्प्युटर विज्ञान शिक्षक। प्रोग्रामिङ, एल्गोरिदम र वेब डेभलपमेन्टमा विशेषज्ञ। कोडिङलाई रमाइलो र सुलभ बनाउँदै।',
    availability: ['Tue', 'Thu', 'Sat', 'Sun'],
    onlineAvailable: true,
    certificates: ['B.E. Certificate', 'M.Sc. Certificate', 'AWS Certification'],
    trialAvailable: false,
    trialPrice: 0,
  },
  {
    id: '5',
    name: 'Prakash Adhikari',
    nameNe: 'प्रकाश अधिकारी',
    avatar: '',
    subjects: ['economics', 'accounting', 'mathematics'],
    grades: ['11', '12', '+2', 'Bachelor'],
    location: 'butwal',
    ward: 'Ward 8, Station Road',
    hourlyRate: 450,
    monthlyRate: 7000,
    rating: 4.5,
    reviewCount: 22,
    verified: true,
    badge: 'bronze',
    experience: 5,
    studentsTaught: 60,
    qualifications: ['MBS - Tribhuvan University', 'BBS - Tribhuvan University', 'CA Intermediate'],
    about: 'Commerce specialist teaching economics and accounting. Helping students build strong foundations in business studies.',
    aboutNe: 'अर्थशास्त्र र लेखाशास्त्र पढाउने वाणिज्य विशेषज्ञ। विद्यार्थीहरूलाई व्यापयिक अध्ययनमा बलियो आधार बनाउन मद्दत।',
    availability: ['Mon', 'Wed', 'Fri'],
    onlineAvailable: false,
    certificates: ['MBS Certificate', 'CA Intermediate Certificate'],
    trialAvailable: true,
    trialPrice: 200,
  },
  {
    id: '6',
    name: 'Maya Rai',
    nameNe: 'माया राई',
    avatar: '',
    subjects: ['nepali', 'socialStudies', 'english'],
    grades: ['1', '2', '3', '4', '5', '6', '7', '8'],
    location: 'kathmandu',
    ward: 'Ward 10, Koteshwor',
    hourlyRate: 300,
    monthlyRate: 5000,
    rating: 4.4,
    reviewCount: 15,
    verified: false,
    badge: 'new',
    experience: 2,
    studentsTaught: 30,
    qualifications: ['B.Ed. - Nepal Education University', 'Primary Teaching Certificate'],
    about: 'Patient and caring primary level teacher. Specializing in foundational learning for young students. Making education enjoyable.',
    aboutNe: 'धैर्य र हेरचाह गर्ने प्राथमिक स्तरकी शिक्षिका। साना विद्यार्थीहरूको आधारभूत सिकाइमा विशेषज्ञता। शिक्षालाई आनन्दमय बनाउँदै।',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    onlineAvailable: true,
    certificates: ['B.Ed. Certificate'],
    trialAvailable: true,
    trialPrice: 0,
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    tutorId: '1',
    tutorName: 'Ram Sharma',
    subject: 'Mathematics',
    date: '2026-01-20',
    time: '4:00 PM - 5:00 PM',
    status: 'upcoming',
    mode: 'online',
    meetingLink: 'https://zoom.us/j/123456789',
    amount: 500,
  },
  {
    id: 'b2',
    tutorId: '3',
    tutorName: 'Bikash Gurung',
    subject: 'Biology',
    date: '2026-01-22',
    time: '5:00 PM - 6:30 PM',
    status: 'upcoming',
    mode: 'in-person',
    amount: 600,
  },
  {
    id: 'b3',
    tutorId: '2',
    tutorName: 'Sita Thapa',
    subject: 'English',
    date: '2026-01-15',
    time: '3:00 PM - 4:00 PM',
    status: 'completed',
    mode: 'online',
    amount: 400,
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: 'c1',
    tutorId: '1',
    tutorName: 'Ram Sharma',
    tutorAvatar: '',
    lastMessage: 'Sure, see you tomorrow at 4 PM!',
    lastTimestamp: '2 hours ago',
    unread: 1,
    online: true,
    messages: [
      { id: 'm1', senderId: 'tutor', text: 'Hello! How can I help you today?', timestamp: '10:00 AM', read: true },
      { id: 'm2', senderId: 'student', text: 'Hi Sir, I wanted to ask about tomorrow\'s class timing.', timestamp: '10:05 AM', read: true },
      { id: 'm3', senderId: 'tutor', text: 'Yes, we can have the class at 4 PM as usual.', timestamp: '10:08 AM', read: true },
      { id: 'm4', senderId: 'student', text: 'Great! Should I prepare anything specific?', timestamp: '10:10 AM', read: true },
      { id: 'm5', senderId: 'tutor', text: 'Please review the algebra chapter. We\'ll solve practice problems.', timestamp: '10:15 AM', read: true },
      { id: 'm6', senderId: 'tutor', text: 'Sure, see you tomorrow at 4 PM!', timestamp: '10:16 AM', read: false },
    ],
  },
  {
    id: 'c2',
    tutorId: '3',
    tutorName: 'Bikash Gurung',
    tutorAvatar: '',
    lastMessage: 'I\'ll share the notes before the class.',
    lastTimestamp: '1 day ago',
    unread: 0,
    online: false,
    messages: [
      { id: 'm7', senderId: 'tutor', text: 'Welcome to the Biology class!', timestamp: 'Yesterday 3:00 PM', read: true },
      { id: 'm8', senderId: 'student', text: 'Thank you Sir! Looking forward to it.', timestamp: 'Yesterday 3:05 PM', read: true },
      { id: 'm9', senderId: 'tutor', text: 'I\'ll share the notes before the class.', timestamp: 'Yesterday 3:10 PM', read: true },
    ],
  },
];

export const reviews: Review[] = [
  { id: 'r1', tutorId: '1', studentName: 'Aarav P.', rating: 5, text: 'Excellent teacher! My son improved from 60% to 90% in mathematics.', date: '2026-01-10' },
  { id: 'r2', tutorId: '1', studentName: 'Sunita K.', rating: 5, text: 'Very patient and explains concepts clearly. Highly recommended!', date: '2026-01-08' },
  { id: 'r3', tutorId: '1', studentName: 'Bijay M.', rating: 4, text: 'Good teaching methodology. Sometimes classes run over time.', date: '2026-01-05' },
  { id: 'r4', tutorId: '3', studentName: 'Priya S.', rating: 5, text: 'Best biology teacher! Helped me crack medical entrance.', date: '2026-01-12' },
  { id: 'r5', tutorId: '3', studentName: 'Rohan T.', rating: 5, text: 'Amazing explanations with real-world examples.', date: '2026-01-09' },
  { id: 'r6', tutorId: '2', studentName: 'Anisha G.', rating: 4, text: 'Very good English teacher. Helped improve my writing skills.', date: '2026-01-07' },
];

export const subjects = [
  'mathematics', 'science', 'english', 'nepali', 'socialStudies',
  'physics', 'chemistry', 'biology', 'computerScience', 'economics', 'accounting'
];

export const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '+2', 'Bachelor'];

export const locations = ['kathmandu', 'pokhara', 'butwal', 'lalitpur', 'bhaktapur'];

export const timeSlots = [
  '6:00 AM - 7:00 AM',
  '7:00 AM - 8:00 AM',
  '8:00 AM - 9:00 AM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
];
