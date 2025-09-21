'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  MessageCircle,
  Phone,
  Video,
  Globe,
  Star,
  MapPin
} from 'lucide-react'
import { User, Language, LanguageLevel } from '@/types'
import { mockUsers } from '@/data/mockData'
import { OptimizedAvatar } from '@/components/ui/optimized-image'

interface UserListProps {
  currentUser: User
  onStartChat?: (user: User) => void
  onStartCall?: (user: User, type: 'audio' | 'video') => void
}

export function UserList({ currentUser, onStartChat, onStartCall }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all')
  const [selectedLevel, setSelectedLevel] = useState<LanguageLevel | 'all'>('all')
  const [onlineOnly, setOnlineOnly] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchQuery, selectedLanguage, selectedLevel, onlineOnly])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      // Use centralized mock data
      // Convert mock users to User type
      const convertedUsers = mockUsers.map(mockUser => ({
        id: mockUser.id,
        _id: mockUser._id,
        email: mockUser.email,
        name: mockUser.name,
        profileImage: mockUser.profileImage || undefined,
        nativeLanguage: (mockUser.language as Language) || 'en',
        learningLanguages: ['en'] as Language[],
        currentLevel: mockUser.level,
        role: 'user' as const,
        isOnline: mockUser.isOnline,
        lastSeen: mockUser.lastActive,
        preferences: {
          theme: 'light' as const,
          notifications: {
            lessons: true,
            messages: true,
            forums: true,
            achievements: true
          },
          privacy: {
            showOnlineStatus: true,
            allowMessages: true,
            showProgress: true
          }
        },
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt
      }))
      setUsers(convertedUsers.filter(user => user._id !== currentUser._id))
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(user => user.nativeLanguage === selectedLanguage)
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(user => user.currentLevel === selectedLevel)
    }

    // Filter by online status
    if (onlineOnly) {
      filtered = filtered.filter(user => user.isOnline)
    }

    setFilteredUsers(filtered)
  }

  const getLanguageInfo = (language: Language) => {
    const languages = {
      'he': { name: 'Hebrew', flag: '🇮🇱', nativeName: 'עברית' },
      'ar': { name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
      'en': { name: 'English', flag: '🇺🇸', nativeName: 'English' },
      'si': { name: 'Sinhala', flag: '🇱🇰', nativeName: 'සිංහල' },
      'ta': { name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
      'fr': { name: 'French', flag: '🇫🇷', nativeName: 'Français' },
      'es': { name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
      'de': { name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
      'it': { name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
      'pt': { name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
      'ru': { name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
      'zh': { name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
      'ja': { name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
      'ko': { name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
      'hi': { name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' }
    }
    return languages[language] || languages['en']
  }

  const getLevelColor = (level: LanguageLevel) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading users...</div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language | 'all')}
              options={[
                { value: 'all', label: 'All Languages' },
                { value: 'he', label: 'Hebrew (עברית)' },
                { value: 'ar', label: 'Arabic (العربية)' },
                { value: 'en', label: 'English' },
                { value: 'si', label: 'Sinhala (සිංහල)' },
                { value: 'ta', label: 'Tamil (தமிழ்)' },
                { value: 'fr', label: 'French (Français)' },
                { value: 'es', label: 'Spanish (Español)' },
                { value: 'de', label: 'German (Deutsch)' },
                { value: 'it', label: 'Italian (Italiano)' },
                { value: 'pt', label: 'Portuguese (Português)' },
                { value: 'ru', label: 'Russian (Русский)' },
                { value: 'zh', label: 'Chinese (中文)' },
                { value: 'ja', label: 'Japanese (日本語)' },
                { value: 'ko', label: 'Korean (한국어)' },
                { value: 'hi', label: 'Hindi (हिन्दी)' },
              ]}
            />

            <Select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as LanguageLevel | 'all')}
              options={[
                { value: 'all', label: 'All Levels' },
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
              ]}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlineOnly}
                onChange={(e) => setOnlineOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Online only</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.isOnline).length}</div>
          <div className="text-sm text-gray-600">Online Now</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{filteredUsers.length}</div>
          <div className="text-sm text-gray-600">Available</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">5</div>
          <div className="text-sm text-gray-600">Languages</div>
        </Card>
      </div>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => {
          const languageInfo = getLanguageInfo(user.nativeLanguage)
          
          return (
            <Card key={user._id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <OptimizedAvatar
                      src={user.profileImage}
                      alt={user.name}
                      size="md"
                      className="w-12 h-12"
                      fallback={
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      }
                    />
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {user.isOnline ? 'Online' : formatLastSeen(user.lastSeen)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">4.8</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Language:</span>
                  <div className="flex items-center gap-1">
                    <span>{languageInfo.flag}</span>
                    <span className="text-sm">{languageInfo.name}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(user.currentLevel)}`}>
                    {user.currentLevel}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">Tel Aviv</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onStartChat?.(user)}
                  className="flex-1"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStartCall?.(user, 'audio')}
                >
                  <Phone className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStartCall?.(user, 'video')}
                >
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <Card className="p-12 text-center">
          <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">
            {searchQuery || selectedLanguage !== 'all' || selectedLevel !== 'all' || onlineOnly
              ? 'Try adjusting your filters to find more users.'
              : 'No users are available right now. Check back later!'
            }
          </p>
        </Card>
      )}
    </div>
  )
}


