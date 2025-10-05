'use client'

import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accessibility, Eye, Ear, Hand, Brain, Keyboard, Monitor, Smartphone } from 'lucide-react'

export default function AccessibilityPage() {
  const { t: _t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Accessibility className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            נגישות
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            LanguageConnect מחויבת לנגישות מלאה לכל המשתמשים
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            עומד בתקן WCAG 2.1 AA
          </p>
        </div>

        <div className="space-y-6">
          {/* Our Commitment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-purple-600" />
                המחויבות שלנו
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                LanguageConnect מחויבת לספק חוויה נגישה ושוויונית לכל המשתמשים, 
                ללא קשר ליכולותיהם הפיזיות, הקוגניטיביות או הטכניות.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                אנו עומדים בתקני הנגישות הבינלאומיים WCAG 2.1 AA וממשיכים לשפר 
                את הנגישות של האפליקציה שלנו.
              </p>
            </CardContent>
          </Card>

          {/* Visual Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                נגישות ויזואלית
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  תמיכה בטכנולוגיות מסייעות:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>תמיכה מלאה בקוראי מסך (Screen Readers)</li>
                  <li>ניווט באמצעות מקלדת בלבד</li>
                  <li>תמיכה בהגדלת טקסט עד 200%</li>
                  <li>מצב כהה ובהיר</li>
                  <li>ניגודיות צבעים גבוהה</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  עיצוב נגיש:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>גופנים ברורים וקריאים</li>
                  <li>גדלי כפתורים מינימליים של 44x44 פיקסלים</li>
                  <li>מרחקים נאותים בין אלמנטים</li>
                  <li>אינדיקטורים ויזואליים ברורים</li>
                  <li>תמיכה ב-RTL (עברית וערבית)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Audio Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ear className="h-5 w-5 text-green-600" />
                נגישות שמיעתית
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  תכונות אודיו:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>הקראה אוטומטית של טקסטים</li>
                  <li>הגייה נכונה של מילים בשפות שונות</li>
                  <li>בקרת עוצמת קול</li>
                  <li>תמיכה במכשירי שמיעה</li>
                  <li>כתוביות וידאו (כאשר רלוונטי)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  חלופות ויזואליות:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>אינדיקטורים ויזואליים להודעות</li>
                  <li>אנימציות עדינות להדגשה</li>
                  <li>צבעים וסמלים להעברת מידע</li>
                  <li>הודעות טקסט מפורטות</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Motor Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hand className="h-5 w-5 text-orange-600" />
                נגישות מוטורית
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ניווט ושליטה:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>ניווט מלא באמצעות מקלדת</li>
                  <li>תמיכה במתגים (Switch Control)</li>
                  <li>זמני תגובה מותאמים</li>
                  <li>אפשרות לבטל פעולות</li>
                  <li>כפתורים גדולים ונגישים</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  התאמות אישיות:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>הגדרת זמני timeout</li>
                  <li>הגדרת מהירות אנימציות</li>
                  <li>הגדרת רגישות מגע</li>
                  <li>מצב ניווט פשוט</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cognitive Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600" />
                נגישות קוגניטיבית
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  עיצוב פשוט וברור:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>ממשק משתמש פשוט ואינטואיטיבי</li>
                  <li>הוראות ברורות ופשוטות</li>
                  <li>הודעות שגיאה מובנות</li>
                  <li>ניווט עקבי ולוגי</li>
                  <li>הדגשת מידע חשוב</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  תמיכה בלמידה:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>התקדמות הדרגתית</li>
                  <li>חזרה על חומר</li>
                  <li>הדגמות ויזואליות</li>
                  <li>משוב חיובי ומעודד</li>
                  <li>אפשרות לחזור לשלבים קודמים</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-red-600" />
                ניווט במקלדת
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  קיצורי מקלדת:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> - ניווט בין אלמנטים</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> - הפעלת כפתורים</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd> - סגירת חלונות</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Space</kbd> - בחירת אפשרויות</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">↑↓</kbd> - ניווט ברשימות</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  תכונות נוספות:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>מעקב ויזואלי אחר המיקוד</li>
                  <li>ניווט לוגי ועקבי</li>
                  <li>דילוג על תוכן חוזר</li>
                  <li>ניווט מהיר לאזורים עיקריים</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Device Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-cyan-600" />
                תמיכה במכשירים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    מחשבים:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Windows עם NVDA/JAWS</li>
                    <li>macOS עם VoiceOver</li>
                    <li>Linux עם Orca</li>
                    <li>דפדפנים: Chrome, Firefox, Safari, Edge</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    ניידים:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>iOS עם VoiceOver</li>
                    <li>Android עם TalkBack</li>
                    <li>תמיכה במגע ובמקלדת</li>
                    <li>אפליקציה נגישה</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-purple-600" />
                משוב ושיפור
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                אנו מחויבים לשיפור מתמיד של הנגישות. אם נתקלת בבעיה נגישות 
                או יש לך הצעות לשיפור, אנא צור איתנו קשר:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>אימייל:</strong> accessibility@languageconnect.com<br />
                  <strong>טלפון:</strong> +972-50-123-4567<br />
                  <strong>שעות פעילות:</strong> א׳-ה׳ 9:00-17:00
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                נשמח לשמוע ממך ונעבוד יחד כדי לשפר את החוויה שלך.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}