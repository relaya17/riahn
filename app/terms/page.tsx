'use client'

import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Scale, AlertTriangle, Users, Shield, Globe } from 'lucide-react'

export default function TermsOfServicePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            תנאי שימוש
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            תנאים ותנאים לשימוש באפליקציה LanguageConnect
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" />
                מבוא
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                ברוכים הבאים ל-LanguageConnect. תנאי שימוש אלה מגדירים את הכללים והתקנות 
                לשימוש באפליקציה שלנו.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                על ידי שימוש באפליקציה, אתה מסכים לתנאים אלה. אם אינך מסכים לתנאים, 
                אנא אל תשתמש באפליקציה.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                קבלת התנאים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                על ידי יצירת חשבון או שימוש באפליקציה, אתה מאשר כי:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>יש לך לפחות 13 שנים</li>
                <li>יש לך את הזכות החוקית להסכים לתנאים אלה</li>
                <li>המידע שסיפקת נכון ומעודכן</li>
                <li>תשתמש באפליקציה בהתאם לחוק</li>
                <li>תכבד את זכויות המשתמשים האחרים</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                אחריות המשתמש
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                כמשתמש באפליקציה, אתה מתחייב:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>לא לפרסם תוכן פוגעני, אלים או לא הולם</li>
                <li>לא להפר זכויות יוצרים או קניין רוחני</li>
                <li>לא לנסות לפרוץ או לפגוע באבטחת האפליקציה</li>
                <li>לא ליצור חשבונות מרובים או מזויפים</li>
                <li>לא לספאם או להטריד משתמשים אחרים</li>
                <li>לא להשתמש באפליקציה לפעילות בלתי חוקית</li>
                <li>לשמור על סודיות הסיסמה שלך</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                שימושים אסורים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                השימושים הבאים אסורים בהחלט:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>הפצת תוכן פורנוגרפי או לא הולם</li>
                <li>הטרדה, בריונות או איומים</li>
                <li>הפצת מידע כוזב או מטעה</li>
                <li>פעילות מסחרית ללא רשות</li>
                <li>שימוש בוטים או אוטומציה</li>
                <li>ניסיון לפרוץ לאפליקציה או לשרתים</li>
                <li>הפרת זכויות יוצרים או סימני מסחר</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                מדיניות תוכן
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                התוכן שאתה מפרסם באפליקציה:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>חייב להיות רלוונטי ללימוד שפות</li>
                <li>חייב להיות בעברית, ערבית או אנגלית</li>
                <li>לא יכול להכיל קללות או שפה פוגענית</li>
                <li>חייב לכבד את כל המשתמשים</li>
                <li>לא יכול להכיל מידע אישי של אחרים</li>
                <li>חייב להיות חוקי ולא להפר זכויות</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-600" />
                קניין רוחני
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                כל הזכויות באפליקציה, כולל:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>הקוד, העיצוב והממשק</li>
                <li>התוכן החינוכי והשיעורים</li>
                <li>הלוגו והסימנים המסחריים</li>
                <li>האלגוריתמים והטכנולוגיה</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                שייכים ל-LanguageConnect או לשותפינו. אסור להעתיק, לשנות או להפיץ 
                ללא רשות מפורשת בכתב.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                סיום השירות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                אנו רשאים להפסיק או להשעות את החשבון שלך אם:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>הפרת את תנאי השימוש</li>
                <li>פרסמת תוכן לא הולם</li>
                <li>התנהגת בצורה פוגענית כלפי משתמשים אחרים</li>
                <li>השתמשת באפליקציה לפעילות בלתי חוקית</li>
                <li>לא השתמשת בחשבון במשך תקופה ארוכה</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                אתה רשאי לסגור את החשבון שלך בכל עת על ידי יצירת קשר עם התמיכה.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-gray-600" />
                הגבלת אחריות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                LanguageConnect לא תהיה אחראית לנזקים עקיפים, מקריים או מיוחדים 
                הנובעים משימוש באפליקציה, כולל:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>אובדן רווחים או הזדמנויות עסקיות</li>
                <li>נזקים למוניטין או לפרטיות</li>
                <li>הפרעה לשירות או אובדן נתונים</li>
                <li>נזקים הנובעים מתוכן של משתמשים אחרים</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                שינויים בתנאים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                אנו רשאים לעדכן את תנאי השימוש מעת לעת. שינויים משמעותיים יועברו 
                לך בהודעה באפליקציה או באימייל.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                המשך השימוש באפליקציה לאחר השינויים מהווה הסכמה לתנאים החדשים.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                יצירת קשר
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                אם יש לך שאלות לגבי תנאי השימוש, אנא צור איתנו קשר:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>אימייל:</strong> legal@languageconnect.com<br />
                  <strong>טלפון:</strong> +972-50-123-4567<br />
                  <strong>כתובת:</strong> רחוב הטכנולוגיה 123, תל אביב, ישראל
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}