'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Users, MessageCircle, Globe, Heart } from 'lucide-react'

export default function ConnectPage() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const users = [
    {
      id: 1,
      name: 'אנה',
      country: 'ספרד',
      nativeLanguage: 'ספרדית',
      learningLanguage: 'עברית',
      level: 'בינוני',
      interests: ['מוזיקה', 'טיולים', 'בישול'],
      avatar: '👩‍🦰',
      online: true
    },
    {
      id: 2,
      name: 'מרקו',
      country: 'איטליה',
      nativeLanguage: 'איטלקית',
      learningLanguage: 'עברית',
      level: 'מתחיל',
      interests: ['ספורט', 'קולנוע', 'אוכל'],
      avatar: '👨‍💼',
      online: true
    },
    {
      id: 3,
      name: 'סופיה',
      country: 'צרפת',
      nativeLanguage: 'צרפתית',
      learningLanguage: 'עברית',
      level: 'מתקדם',
      interests: ['אמנות', 'ספרות', 'תרבות'],
      avatar: '👩‍🎨',
      online: false
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'מתחיל': return 'text-green-600 bg-green-100'
      case 'בינוני': return 'text-yellow-600 bg-yellow-100'
      case 'מתקדם': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            חיבור גלובלי
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            התחבר עם דוברי שפה מקומיים מכל העולם
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,247</h3>
              <p className="text-gray-600 dark:text-gray-300">משתמשים פעילים</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
              <p className="text-gray-600 dark:text-gray-300">מדינות</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3,892</h3>
              <p className="text-gray-600 dark:text-gray-300">שיחות השבוע</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{user.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-xs text-gray-500">
                      {user.online ? 'מחובר' : 'לא מחובר'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>שפת אם:</strong> {user.nativeLanguage}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>לומד:</strong> {user.learningLanguage}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(user.level)}`}>
                      {user.level}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">תחומי עניין:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.interests.map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setSelectedUser(user.id)
                        setTimeout(() => {
                          alert(`Connecting with ${user.name} from ${user.country}`)
                        }, 100)
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      התחל שיחה
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected User Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>התחל שיחה</CardTitle>
              </CardHeader>
              <CardContent>
                <p>כאן יוצג ממשק הצ'אט עם המשתמש הנבחר...</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => setSelectedUser(null)}>
                    סגור
                  </Button>
                  <Button variant="outline">
                    שלח הודעה
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}