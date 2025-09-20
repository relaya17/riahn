'use client'

import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            מדיניות פרטיות
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            הגנה על הפרטיות שלך היא העדיפות הראשונה שלנו
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
                <Eye className="h-5 w-5 text-blue-600" />
                מבוא
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                LanguageConnect מחויבת להגנה על הפרטיות שלך. מדיניות פרטיות זו מסבירה איך אנו אוספים, 
                משתמשים ומגנים על המידע האישי שלך כאשר אתה משתמש באפליקציה שלנו.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                על ידי שימוש באפליקציה, אתה מסכים לאיסוף והשימוש במידע בהתאם למדיניות זו.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                מידע שאנו אוספים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  מידע אישי:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>שם מלא וכתובת אימייל</li>
                  <li>שפת האם ושפות למידה</li>
                  <li>רמת ידע בשפות</li>
                  <li>תמונת פרופיל (אופציונלי)</li>
                  <li>מיקום גיאוגרפי (אופציונלי)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  מידע שימוש:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>שיעורים שנלמדו והתקדמות</li>
                  <li>הודעות וצ&apos;אטים</li>
                  <li>פוסטים בפורומים</li>
                  <li>העדפות משתמש</li>
                  <li>נתוני אנליטיקה</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-purple-600" />
                איך אנו משתמשים במידע
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>לספק שירותי למידה מותאמים אישית</li>
                <li>לחבר בין משתמשים ללימוד משותף</li>
                <li>לשפר את איכות השירותים שלנו</li>
                <li>לשלוח עדכונים והודעות חשובות</li>
                <li>להבטיח אבטחה ומניעת הונאות</li>
                <li>לענות על בקשות תמיכה</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                הגנה על מידע
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                אנו משתמשים באמצעי אבטחה מתקדמים כדי להגן על המידע שלך:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>הצפנה end-to-end בהודעות</li>
                <li>אבטחת שרתים ברמה גבוהה</li>
                <li>גיבויים קבועים ומוצפנים</li>
                <li>מעקב אחר גישה למידע</li>
                <li>הדרכות אבטחה לצוות</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-orange-600" />
                שיתוף מידע
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                אנו לא מוכרים או משתפים את המידע האישי שלך עם צדדים שלישיים, למעט:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>כאשר אתה נותן הסכמה מפורשת</li>
                <li>לצורך אכיפת חוק או צו בית משפט</li>
                <li>להגנה על זכויותינו או בטיחות המשתמשים</li>
                <li>עם ספקי שירותים מהימנים (תחת הסכמי סודיות)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-indigo-600" />
                הזכויות שלך
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                יש לך זכות ל:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>גישה למידע האישי שלך</li>
                <li>תיקון מידע שגוי או לא מעודכן</li>
                <li>מחיקת החשבון והמידע שלך</li>
                <li>הגבלת עיבוד המידע שלך</li>
                <li>העברת המידע שלך לשירות אחר</li>
                <li>התנגדות לעיבוד המידע שלך</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                יצירת קשר
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                אם יש לך שאלות לגבי מדיניות פרטיות זו או ברצונך לממש את הזכויות שלך, 
                אנא צור איתנו קשר:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>אימייל:</strong> privacy@languageconnect.com<br />
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