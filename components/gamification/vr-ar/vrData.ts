// VR/AR scenes and achievements data

import { VRScene, Achievement } from './types'

export const vrScenes: VRScene[] = [
  {
    id: '1',
    name: 'שוק תל אביב',
    description: 'למד עברית בסביבה אמיתית של שוק ישראלי',
    language: 'he',
    difficulty: 'medium',
    duration: 300,
    objectives: [
      'קנה 3 מוצרים בשוק',
      'שאל על המחיר בעברית',
      'התמקח עם המוכר',
      'תודה למוכר'
    ],
    rewards: ['100 נקודות', 'תג "קונה מקצועי"', 'הצלחה בשוק'],
    isCompleted: false,
    progress: 0
  },
  {
    id: '2',
    name: 'מסעדה בפריז',
    description: 'תרגל צרפתית במסעדה צרפתית אותנטית',
    language: 'fr',
    difficulty: 'hard',
    duration: 450,
    objectives: [
      'הזמן מנה מהתפריט',
      'שאל על המרכיבים',
      'בקש את החשבון',
      'תן טיפ'
    ],
    rewards: ['150 נקודות', 'תג "שף צרפתי"', 'ארוחה מושלמת'],
    isCompleted: false,
    progress: 0
  },
  {
    id: '3',
    name: 'פארק טוקיו',
    description: 'למד יפנית בפארק יפני מסורתי',
    language: 'ja',
    difficulty: 'easy',
    duration: 240,
    objectives: [
      'ברך אנשים ביפנית',
      'שאל על הדרך',
      'הזמן אוכל',
      'תודה על העזרה'
    ],
    rewards: ['80 נקודות', 'תג "נימוסים יפניים"', 'חוויה תרבותית'],
    isCompleted: false,
    progress: 0
  }
]

export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'מתחיל נועז',
    description: 'השלם את השיעור הראשון',
    icon: '🎯',
    points: 50,
    isUnlocked: true,
    unlockedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'מלך הרצף',
    description: 'למד 7 ימים ברצף',
    icon: '🔥',
    points: 100,
    isUnlocked: true,
    unlockedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'פוליגלוט',
    description: 'למד 3 שפות שונות',
    icon: '🌍',
    points: 200,
    isUnlocked: false
  },
  {
    id: '4',
    name: 'מאסטר VR',
    description: 'השלם 10 סצנות VR',
    icon: '🥽',
    points: 300,
    isUnlocked: false
  }
]
