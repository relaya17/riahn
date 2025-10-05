'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading'
import {
  Users,
  MessageCircle,
  Video,
  Phone,
  Search,
  Filter,
  Globe,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { getLanguageInfo, getLevelInfo } from '@/lib/utils'

export function GlobalConnectPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const [users] = useState([
    {
      id: '1',
      name: 'אחמד חסן',
      profileImage: null,
      nativeLanguage: 'ar',
      learningLanguages: ['he', 'en'],
      currentLevel: 'intermediate',
      isOnline: true,
      lastSeen: new Date(),
      location: 'ירושלים',
      interests: ['תרבות', 'עבודה', 'ספורט'],
      rating: 4.8,
      totalConnections: 45,
      bio: 'אני לומד עברית ואני אוהב לפגוש אנשים חדשים',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      profileImage: null,
      nativeLanguage: 'en',
      learningLanguages: ['he', 'ar'],
      currentLevel: 'beginner',
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: 'תל אביב',
      interests: ['מוזיקה', 'אמנות', 'טיולים'],
      rating: 4.6,
      totalConnections: 32,
      bio: 'Hello! I am learning Hebrew and Arabic. Love to chat!',
    },
    {
      id: '3',
      name: 'ראגה קומאר',
      profileImage: null,
      nativeLanguage: 'si',
      learningLanguages: ['he', 'en'],
      currentLevel: 'advanced',
      isOnline: true,
      lastSeen: new Date(),
      location: 'חיפה',
      interests: ['טכנולוגיה', 'מדע', 'ספרות'],
      rating: 4.9,
      totalConnections: 67,
      bio: 'I am passionate about learning new languages and cultures',
    },
    {
      id: '4',
      name: 'מחמוד עבדאללה',
      profileImage: null,
      nativeLanguage: 'ar',
      learningLanguages: ['he', 'en'],
      currentLevel: 'intermediate',
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      location: 'נצרת',
      interests: ['היסטוריה', 'דת', 'משפחה'],
      rating: 4.7,
      totalConnections: 28,
      bio: 'أحب تعلم العبرية وأريد أن أتواصل مع أشخاص جدد',
    },
  ])

  const [groups] = useState([
    {
      id: '1',
      name: 'לומדי עברית מתחילים',
      description: 'קבוצה ללומדי עברית ברמת מתחיל',
      language: 'he',
      level: 'beginner',
      memberCount: 25,
      maxMembers: 50,
      isPublic: true,
      createdBy: 'מורה עברית',
    },
    {
      id: '2',
      name: 'Arabic-Hebrew Exchange',
      description: 'Language exchange between Arabic and Hebrew speakers',
      language: 'ar',
      level: 'intermediate',
      memberCount: 18,
      maxMembers: 30,
      isPublic: true,
      createdBy: 'Ahmed Hassan',
    },
    {
      id: '3',
      name: 'תרבות ישראלית',
      description: 'דיון על התרבות והמסורות הישראליות',
      language: 'he',
      level: 'advanced',
      memberCount: 12,
      maxMembers: 20,
      isPublic: false,
      createdBy: 'רבקה כהן',
    },
  ])

  const languages = [
    { value: 'all', label: t('globalConnect.allLanguages') },
    { value: 'he', label: t('globalConnect.hebrew') },
    { value: 'ar', label: t('globalConnect.arabic') },
    { value: 'en', label: t('globalConnect.english') },
    { value: 'si', label: t('globalConnect.sinhala') },
    { value: 'ta', label: t('globalConnect.tamil') },
    { value: 'fr', label: 'צרפתית' },
    { value: 'es', label: 'ספרדית' },
    { value: 'de', label: 'גרמנית' },
    { value: 'it', label: 'איטלקית' },
    { value: 'pt', label: 'פורטוגזית' },
    { value: 'ru', label: 'רוסית' },
    { value: 'zh', label: 'סינית' },
    { value: 'ja', label: 'יפנית' },
    { value: 'ko', label: 'קוריאנית' },
    { value: 'hi', label: 'הינדי' },
  ]

  const levels = [
    { value: 'all', label: t('globalConnect.allLevels') },
    { value: 'beginner', label: t('globalConnect.beginner') },
    { value: 'intermediate', label: t('globalConnect.intermediate') },
    { value: 'advanced', label: t('globalConnect.advanced') },
  ]

  const statusOptions = [
    { value: 'all', label: t('globalConnect.allStatuses') },
    { value: 'online', label: t('globalConnect.online') },
    { value: 'offline', label: t('globalConnect.offline') },
  ]

  const filteredUsers = users.filter(userItem => {
    const matchesSearch = userItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userItem.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLanguage = selectedLanguage === 'all' || 
                           userItem.nativeLanguage === selectedLanguage ||
                           userItem.learningLanguages.includes(selectedLanguage)
    const matchesLevel = selectedLevel === 'all' || userItem.currentLevel === selectedLevel
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'online' && userItem.isOnline) ||
                         (selectedStatus === 'offline' && !userItem.isOnline)
    
    return matchesSearch && matchesLanguage && matchesLevel && matchesStatus
  })

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return t('globalConnect.now')
    if (diffInMinutes < 60) return t('globalConnect.minutesAgo', { minutes: diffInMinutes })
    if (diffInMinutes < 1440) return t('globalConnect.hoursAgo', { hours: Math.floor(diffInMinutes / 60) })
    return t('globalConnect.daysAgo', { days: Math.floor(diffInMinutes / 1440) })
  }

  const handleStartChat = () => {
    router.push('/learning-chat')
  }

  const handleVideoCall = () => {
    // TODO: Implement video call functionality
    console.log('Starting video call...')
  }

  const handleUserChat = (userId: string) => {
    router.push(`/cross-language-chat?user=${userId}`)
  }

  const handleUserVideo = (userId: string) => {
    // TODO: Implement user video call
    console.log('Starting video call with user:', userId)
  }

  const handleJoinGroup = (groupId: string) => {
    // Find the group to join
    const group = groups.find(g => g.id === groupId)
    if (group) {
      // Navigate to the group learning page
      router.push(`/lessons?group=${groupId}`)
      console.log('Joining group:', groupId, group.name)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('globalConnect.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('globalConnect.subtitle')}
          </p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <Button variant="outline" onClick={handleStartChat}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {t('globalConnect.startChat')}
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-blue-600" onClick={handleVideoCall}>
            <Video className="h-4 w-4 mr-2" />
            {t('globalConnect.videoCall')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('globalConnect.stats.onlineUsers')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter(u => u.isOnline).length}
                </p>
              </div>
              <Wifi className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('globalConnect.stats.totalUsers')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('globalConnect.stats.groups')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {groups.length}
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('globalConnect.stats.connections')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.reduce((sum, u) => sum + u.totalConnections, 0)}
                </p>
              </div>
              <Globe className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('globalConnect.searchUsers')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              options={languages}
              placeholder={t('globalConnect.selectLanguage')}
            />
            
            <Select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              options={levels}
              placeholder={t('globalConnect.selectLevel')}
            />
            
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={statusOptions}
              placeholder={t('globalConnect.selectStatus')}
            />
            
            <Button variant="outline" className="justify-start">
              <Filter className="h-4 w-4 mr-2" />
              {t('globalConnect.moreFilters')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Users List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Users className="h-5 w-5" />
                <span>{t('globalConnect.availableUsers')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((userItem) => {
                  const nativeLangInfo = getLanguageInfo(userItem.nativeLanguage)
                  const levelInfo = getLevelInfo(userItem.currentLevel)
                  
                  return (
                    <div
                      key={userItem.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="relative">
                          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {userItem.profileImage ? (
                              <img
                                src={userItem.profileImage}
                                alt={userItem.name}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                            ) : (
                              userItem.name.charAt(0)
                            )}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                            userItem.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {userItem.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {userItem.rating}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 space-x-reverse mt-1">
                            <span className="text-xs text-gray-500">
                              {nativeLangInfo.name} → {userItem.learningLanguages.map(lang => getLanguageInfo(lang).name).join(', ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${levelInfo.color}`}>
                              {levelInfo.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 space-x-reverse mt-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{userItem.location}</span>
                            {userItem.isOnline ? (
                              <span className="text-xs text-green-600">{t('globalConnect.online')}</span>
                            ) : (
                              <span className="text-xs text-gray-500">
                                {t('globalConnect.lastSeen')} {formatLastSeen(userItem.lastSeen)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline" onClick={() => handleUserChat(userItem.id)}>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {t('globalConnect.chat')}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleUserVideo(userItem.id)}>
                          <Video className="h-3 w-3 mr-1" />
                          {t('globalConnect.video')}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Groups */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <MessageCircle className="h-5 w-5" />
                <span>{t('globalConnect.groups')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groups.map((group) => {
                  const languageInfo = getLanguageInfo(group.language)
                  const levelInfo = getLevelInfo(group.level)
                  
                  return (
                    <div
                      key={group.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {group.name}
                        </h4>
                        {!group.isPublic && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            {t('globalConnect.private')}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {group.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span>{languageInfo.name}</span>
                          <span>•</span>
                          <span className={levelInfo.color}>{levelInfo.name}</span>
                        </div>
                        <span>{group.memberCount}/{group.maxMembers} {t('globalConnect.members')}</span>
                      </div>
                      
                      <Button size="sm" className="w-full" onClick={() => handleJoinGroup(group.id)}>
                        {t('globalConnect.joinGroup')}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
