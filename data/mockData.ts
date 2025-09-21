export interface MockUser {
  id: string
  _id: string
  email: string
  name: string
  profileImage?: string | null
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  isOnline: boolean
  lastActive: Date
  createdAt: Date
  updatedAt: Date
  nativeLanguage?: string
  learningLanguages?: string[]
  currentLevel?: string
  role?: 'user' | 'moderator' | 'admin'
  status?: 'active' | 'suspended' | 'pending'
  joinDate?: Date
  lastLogin?: Date
  totalLessons?: number
  completedLessons?: number
  totalMessages?: number
  location?: string
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    _id: '1',
    email: 'sarah.cohen@example.com',
    name: 'שרה כהן',
    profileImage: null,
    language: 'he',
    nativeLanguage: 'he',
    learningLanguages: ['ar', 'en'],
    level: 'intermediate',
    currentLevel: 'intermediate',
    isOnline: true,
    lastActive: new Date(),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    role: 'user',
    status: 'active',
    joinDate: new Date('2024-01-15'),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalLessons: 45,
    completedLessons: 32,
    totalMessages: 156,
    location: 'תל אביב, ישראל'
  },
  {
    id: '2',
    _id: '2',
    email: 'ahmed.hassan@example.com',
    name: 'אחמד חסן',
    profileImage: null,
    language: 'ar',
    nativeLanguage: 'ar',
    learningLanguages: ['he', 'en'],
    level: 'advanced',
    currentLevel: 'advanced',
    isOnline: true,
    lastActive: new Date(),
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date(),
    role: 'moderator',
    status: 'active',
    joinDate: new Date('2024-02-20'),
    lastLogin: new Date(Date.now() - 30 * 60 * 1000),
    totalLessons: 67,
    completedLessons: 58,
    totalMessages: 234,
    location: 'ריאד, ערב הסעודית'
  },
  {
    id: '3',
    _id: '3',
    email: 'john.smith@example.com',
    name: 'ג\'ון סמית',
    profileImage: null,
    language: 'en',
    nativeLanguage: 'en',
    learningLanguages: ['he', 'ar'],
    level: 'beginner',
    currentLevel: 'beginner',
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date(),
    role: 'user',
    status: 'active',
    joinDate: new Date('2024-03-10'),
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
    totalLessons: 23,
    completedLessons: 15,
    totalMessages: 89,
    location: 'ניו יורק, ארה"ב'
  },
  {
    id: '4',
    _id: '4',
    email: 'maria.garcia@example.com',
    name: 'מריה גרסיה',
    profileImage: null,
    language: 'es',
    nativeLanguage: 'es',
    learningLanguages: ['he', 'en'],
    level: 'intermediate',
    currentLevel: 'intermediate',
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date(),
    role: 'user',
    status: 'suspended',
    joinDate: new Date('2024-03-10'),
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
    totalLessons: 23,
    completedLessons: 15,
    totalMessages: 89,
    location: 'מדריד, ספרד'
  },
  {
    id: '5',
    _id: '5',
    email: 'raj.patel@example.com',
    name: 'ראג\' פטל',
    profileImage: null,
    language: 'hi',
    nativeLanguage: 'hi',
    learningLanguages: ['he', 'en'],
    level: 'beginner',
    currentLevel: 'beginner',
    isOnline: true,
    lastActive: new Date(),
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date(),
    role: 'user',
    status: 'active',
    joinDate: new Date('2024-04-01'),
    lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
    totalLessons: 12,
    completedLessons: 8,
    totalMessages: 45,
    location: 'מומבאי, הודו'
  }
]

export interface MockLesson {
  id: string
  title: string
  description: string
  progress: number
  level: 'beginner' | 'intermediate' | 'advanced'
  language: string
  duration: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  content?: Array<{ type: string; data: string }>
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

export const mockLessons: MockLesson[] = [
  {
    id: '1',
    title: 'מילים בסיסיות בעברית',
    description: 'למד את המילים הבסיסיות הראשונות בעברית',
    progress: 75,
    level: 'beginner',
    language: 'he',
    duration: 15,
    category: 'vocabulary',
    difficulty: 'easy',
    tags: ['בסיסי', 'מילים', 'התחלה'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'דקדוק בסיסי',
    description: 'היכרות עם כללי הדקדוק הבסיסיים',
    progress: 45,
    level: 'beginner',
    language: 'he',
    duration: 20,
    category: 'grammar',
    difficulty: 'medium',
    tags: ['דקדוק', 'כללים', 'בסיסי'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'שיחה יומיומית',
    description: 'ביטויים ומשפטים לשיחה יומיומית',
    progress: 30,
    level: 'intermediate',
    language: 'he',
    duration: 25,
    category: 'conversation',
    difficulty: 'medium',
    tags: ['שיחה', 'יומיום', 'ביטויים'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date()
  }
]

export interface MockForumPost {
  _id: string
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string | null
    level: string
  }
  authorId: string
  category: string
  tags: string[]
  language: string
  likes: number
  views: number
  replies: Array<{ id: string; content: string; author: string; createdAt: Date }>
  isPinned: boolean
  isLocked: boolean
  createdAt: Date
  updatedAt: Date
  lastReply: Date
}

export const mockForumPosts: MockForumPost[] = [
  {
    _id: '1',
    id: '1',
    title: 'איך לשפר את ההגייה בעברית?',
    content: 'אני מתקשה עם ההגייה של כמה אותיות בעברית. יש לכם טיפים?',
    author: { name: 'ג\'ון סמית', avatar: null, level: 'beginner' },
    authorId: '3',
    category: 'questions',
    tags: ['הגייה', 'עברית', 'טיפים'],
    language: 'he',
    likes: 12,
    views: 45,
    replies: [],
    isPinned: false,
    isLocked: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastReply: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    _id: '2',
    id: '2',
    title: 'משאבים מומלצים ללימוד ערבית',
    content: 'רשימה של משאבים שעזרו לי ללמוד ערבית בצורה יעילה',
    author: { name: 'שרה כהן', avatar: null, level: 'intermediate' },
    authorId: '1',
    category: 'tips',
    tags: ['ערבית', 'משאבים', 'למידה'],
    language: 'ar',
    likes: 28,
    views: 89,
    replies: [],
    isPinned: true,
    isLocked: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastReply: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
]

export const mockAchievements = [
  {
    id: '1',
    title: 'מתחיל חדש',
    description: 'השלמת השיעור הראשון',
    icon: 'Star',
    unlocked: true,
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'רצף למידה',
    description: '7 ימים רצופים של למידה',
    icon: 'Clock',
    unlocked: true,
    date: '2024-01-20',
  },
  {
    id: '3',
    title: 'מתקדם',
    description: 'השלמת 10 שיעורים',
    icon: 'Target',
    unlocked: false,
    date: null,
  },
]
