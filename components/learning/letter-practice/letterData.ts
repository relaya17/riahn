// Letter data for different languages and difficulties

import { LetterData } from './types'

export const getLetterData = (language: string, difficulty: string): LetterData[] => {
  const letterSets: Record<string, Record<string, LetterData[]>> = {
    he: {
      beginner: [
        {
          letter: 'א',
          name: 'אלף',
          pronunciation: 'alef',
          strokeOrder: ['א'],
          examples: ['אבא', 'אמא', 'ארץ']
        },
        {
          letter: 'ב',
          name: 'בית',
          pronunciation: 'bet',
          strokeOrder: ['ב'],
          examples: ['בית', 'בן', 'בת']
        },
        {
          letter: 'ג',
          name: 'גימל',
          pronunciation: 'gimel',
          strokeOrder: ['ג'],
          examples: ['גמל', 'גן', 'גל']
        },
        {
          letter: 'ד',
          name: 'דלת',
          pronunciation: 'dalet',
          strokeOrder: ['ד'],
          examples: ['דג', 'דלת', 'דרך']
        },
        {
          letter: 'ה',
          name: 'הי',
          pronunciation: 'hey',
          strokeOrder: ['ה'],
          examples: ['הר', 'הב', 'הם']
        }
      ],
      intermediate: [
        {
          letter: 'ו',
          name: 'ויו',
          pronunciation: 'vav',
          strokeOrder: ['ו'],
          examples: ['ורד', 'וילון', 'ויכוח']
        },
        {
          letter: 'ז',
          name: 'זין',
          pronunciation: 'zayin',
          strokeOrder: ['ז'],
          examples: ['זהב', 'זמן', 'זכר']
        },
        {
          letter: 'ח',
          name: 'חית',
          pronunciation: 'chet',
          strokeOrder: ['ח'],
          examples: ['חתול', 'חלון', 'חבר']
        },
        {
          letter: 'ט',
          name: 'טית',
          pronunciation: 'tet',
          strokeOrder: ['ט'],
          examples: ['טלפון', 'טוב', 'טעם']
        },
        {
          letter: 'י',
          name: 'יוד',
          pronunciation: 'yod',
          strokeOrder: ['י'],
          examples: ['יד', 'ים', 'ירוק']
        }
      ],
      advanced: [
        {
          letter: 'כ',
          name: 'כף',
          pronunciation: 'kaf',
          strokeOrder: ['כ'],
          examples: ['כדור', 'כוכב', 'כסף']
        },
        {
          letter: 'ל',
          name: 'למד',
          pronunciation: 'lamed',
          strokeOrder: ['ל'],
          examples: ['לב', 'לילה', 'לימון']
        },
        {
          letter: 'מ',
          name: 'מם',
          pronunciation: 'mem',
          strokeOrder: ['מ'],
          examples: ['מים', 'מכונית', 'מורה']
        },
        {
          letter: 'נ',
          name: 'נון',
          pronunciation: 'nun',
          strokeOrder: ['נ'],
          examples: ['נחש', 'נס', 'נשר']
        },
        {
          letter: 'ס',
          name: 'סמך',
          pronunciation: 'samekh',
          strokeOrder: ['ס'],
          examples: ['ספר', 'סוס', 'סתיו']
        }
      ]
    }
  }

  return letterSets[language]?.[difficulty] || letterSets.he.beginner
}
