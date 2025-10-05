'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { LearningChat } from '@/components/learning/learning-chat'
import { 
  MessageCircle, 
  Users, 
  Globe, 
  BookOpen,
  Star,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'

export const dynamic = 'force-dynamic'

interface LearningPartner {
  id: string
  name: string
  avatar?: string
  nativeLanguage: string
  learningLanguage: string
  level: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  isOnline: boolean
  lastSeen?: Date
}

export default function LearningChatPage() {
  const [selectedPartner, setSelectedPartner] = useState<LearningPartner | null>(null)
  const [userLanguage, setUserLanguage] = useState('he')
  const [targetLanguage, setTargetLanguage] = useState('en')

  const learningPartners: LearningPartner[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      nativeLanguage: 'en',
      learningLanguage: 'he',
      level: 'intermediate',
      interests: ['תרבות', 'מוזיקה', 'טיולים'],
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: '2',
      name: 'Ahmed Al-Rashid',
      nativeLanguage: 'ar',
      learningLanguage: 'he',
      level: 'beginner',
      interests: ['ספרות', 'היסטוריה', 'בישול'],
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Maria Garcia',
      nativeLanguage: 'es',
      learningLanguage: 'he',
      level: 'advanced',
      interests: ['אמנות', 'פילוסופיה', 'ספורט'],
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: '4',
      name: 'Jean Dubois',
      nativeLanguage: 'fr',
      learningLanguage: 'he',
      level: 'intermediate',
      interests: ['קולנוע', 'מוזיקה', 'טבע'],
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000)
    }
  ]

  const languages = [
    { value: 'he', label: 'עברית', flag: '🇮🇱' },
    { value: 'en', label: 'אנגלית', flag: '🇺🇸' },
    { value: 'es', label: 'ספרדית', flag: '🇪🇸' },
    { value: 'fr', label: 'צרפתית', flag: '🇫🇷' },
    { value: 'ar', label: 'ערבית', flag: '🇸🇦' }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'מתחיל'
      case 'intermediate': return 'בינוני'
      case 'advanced': return 'מתקדם'
      default: return 'לא ידוע'
    }
  }

  const stats = {
    totalPartners: learningPartners.length,
    onlinePartners: learningPartners.filter(p => p.isOnline).length,
    totalMessages: 1247,
    learningStreak: 12
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              צ&apos;אט ללמידה
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            תרגל שפות עם דוברי שפת אם מכל העולם ותלמד תוך כדי שיחה
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalPartners}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">שותפי למידה</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-2">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{stats.onlinePartners}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">מחוברים עכשיו</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-2">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{stats.totalMessages}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">הודעות נשלחו</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full w-fit mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{stats.learningStreak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ימי למידה רצופים</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partners List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>שותפי למידה</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedPartner?.id === partner.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedPartner(partner)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {partner.name.charAt(0)}
                        </div>
                        {partner.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          selectedPartner?.id === partner.id ? 'text-white' : 'text-gray-900 dark:text-white'
                        }`}>
                          {partner.name}
                        </h3>
                        <p className={`text-sm ${
                          selectedPartner?.id === partner.id ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {partner.isOnline ? 'מחובר' : `נראה לאחרונה ${partner.lastSeen?.toLocaleTimeString('he-IL')}`}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(partner.level)}`}>
                        {getLevelLabel(partner.level)}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className={`text-xs ${
                        selectedPartner?.id === partner.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        לומד: {languages.find(l => l.value === partner.learningLanguage)?.label}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partner.interests.slice(0, 2).map((interest) => (
                          <span
                            key={interest}
                            className={`px-2 py-1 rounded-full text-xs ${
                              selectedPartner?.id === partner.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>הגדרות שפה</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    השפה שלי
                  </label>
                  <Select
                    value={userLanguage}
                    onChange={(e) => setUserLanguage(e.target.value)}
                    options={languages}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    השפה שאני לומד
                  </label>
                  <Select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    options={languages.filter(l => l.value !== userLanguage)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedPartner ? (
              <Card className="h-[600px]">
                <LearningChat
                  targetLanguage={targetLanguage}
                  userLanguage={userLanguage}
                  partnerName={selectedPartner.name}
                  partnerAvatar={selectedPartner.avatar}
                />
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    בחר שותף למידה
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    בחר שותף למידה מהרשימה כדי להתחיל לצ&apos;אט
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            טיפים לצ&apos;אט ללמידה
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">השתמש במילים חדשות</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
נסה להשתמש במילים שלמדת בשיעורים בצ&apos;אט                                         {/*  */}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">שאל שאלות</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  אל תפחד לשאול על מילים או ביטויים שלא מובנים לך
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">תרגל באופן קבוע</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  צ&apos;אט קצר כל יום יעזור לך יותר מצ&apos;אט ארוך פעם בשבוע
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full w-fit mx-auto mb-4">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">תהנה מהתהליך</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  למידה דרך שיחה היא כיף - אל תשכח ליהנות!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
