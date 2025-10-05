'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Users, 
  Globe, 
  ZoomIn, 
  ZoomOut,
  Navigation,
  MessageCircle,
  Star,
  Clock
} from 'lucide-react'

interface UserLocation {
  id: string
  name: string
  avatar?: string
  latitude: number
  longitude: number
  language: string
  isOnline: boolean
  lastSeen: Date
  learningLanguages: string[]
  nativeLanguage: string
  level: 'beginner' | 'intermediate' | 'advanced'
}

interface WorldMapProps {
  onUserClick?: (user: UserLocation) => void
}

export function WorldMap({ onUserClick }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [users, setUsers] = useState<UserLocation[]>([])
  const [selectedUser, setSelectedUser] = useState<UserLocation | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 31.7683, lng: 35.2137 }) // Jerusalem
  const [zoom, setZoom] = useState(2)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Mock user data with real locations
  useEffect(() => {
    const mockUsers: UserLocation[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        latitude: 40.7128,
        longitude: -74.0060,
        language: 'en',
        isOnline: true,
        lastSeen: new Date(),
        learningLanguages: ['he', 'es'],
        nativeLanguage: 'en',
        level: 'intermediate'
      },
      {
        id: '2',
        name: 'Ahmed Al-Rashid',
        latitude: 24.7136,
        longitude: 46.6753,
        language: 'ar',
        isOnline: false,
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
        learningLanguages: ['he', 'en'],
        nativeLanguage: 'ar',
        level: 'beginner'
      },
      {
        id: '3',
        name: 'Maria Garcia',
        latitude: 40.4168,
        longitude: -3.7038,
        language: 'es',
        isOnline: true,
        lastSeen: new Date(),
        learningLanguages: ['he', 'fr'],
        nativeLanguage: 'es',
        level: 'advanced'
      },
      {
        id: '4',
        name: 'Jean Dubois',
        latitude: 48.8566,
        longitude: 2.3522,
        language: 'fr',
        isOnline: false,
        lastSeen: new Date(Date.now() - 30 * 60 * 1000),
        learningLanguages: ['he', 'en'],
        nativeLanguage: 'fr',
        level: 'intermediate'
      },
      {
        id: '5',
        name: 'Yuki Tanaka',
        latitude: 35.6762,
        longitude: 139.6503,
        language: 'ja',
        isOnline: true,
        lastSeen: new Date(),
        learningLanguages: ['he', 'en'],
        nativeLanguage: 'ja',
        level: 'beginner'
      },
      {
        id: '6',
        name: 'Li Wei',
        latitude: 39.9042,
        longitude: 116.4074,
        language: 'zh',
        isOnline: true,
        lastSeen: new Date(),
        learningLanguages: ['he', 'en'],
        nativeLanguage: 'zh',
        level: 'intermediate'
      },
      {
        id: '7',
        name: 'Anna Müller',
        latitude: 52.5200,
        longitude: 13.4050,
        language: 'de',
        isOnline: false,
        lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000),
        learningLanguages: ['he', 'en'],
        nativeLanguage: 'de',
        level: 'advanced'
      },
      {
        id: '8',
        name: 'David Cohen',
        latitude: 31.7683,
        longitude: 35.2137,
        language: 'he',
        isOnline: true,
        lastSeen: new Date(),
        learningLanguages: ['en', 'ar'],
        nativeLanguage: 'he',
        level: 'intermediate'
      }
    ]
    setUsers(mockUsers)
  }, [])

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Geolocation error:', error)
        }
      )
    }
  }, [])

  const getLanguageFlag = (language: string) => {
    const flags: Record<string, string> = {
      'en': '🇺🇸',
      'he': '🇮🇱',
      'ar': '🇸🇦',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'ja': '🇯🇵',
      'zh': '🇨🇳',
      'de': '🇩🇪'
    }
    return flags[language] || '🌍'
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const handleUserClick = (user: UserLocation) => {
    setSelectedUser(user)
    setMapCenter({ lat: user.latitude, lng: user.longitude })
    setZoom(8)
    onUserClick?.(user)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 10))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 1))
  }

  const handleCenterOnUser = () => {
    if (userLocation) {
      setMapCenter(userLocation)
      setZoom(6)
    }
  }

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            מפת משתמשים גלובלית
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
            {zoom}x
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 10}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          {userLocation && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCenterOnUser}
            >
              <Navigation className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Map Container */}
      <Card className="h-[500px] overflow-hidden">
        <CardContent className="p-0 h-full relative">
          {/* Simple SVG World Map */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden map-container">
            {/* World Map Background */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full world-map-svg"
            >
              {/* Continents (simplified) */}
              <g fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1">
                {/* North America */}
                <path d="M100 100 L300 80 L350 150 L200 200 L100 180 Z" />
                {/* South America */}
                <path d="M200 250 L250 240 L280 320 L220 350 L200 300 Z" />
                {/* Europe */}
                <path d="M450 80 L550 70 L580 120 L520 140 L450 100 Z" />
                {/* Africa */}
                <path d="M480 150 L520 140 L540 250 L500 280 L480 200 Z" />
                {/* Asia */}
                <path d="M550 70 L800 60 L850 120 L750 150 L550 100 Z" />
                {/* Australia */}
                <path d="M750 300 L850 290 L870 350 L800 380 L750 320 Z" />
              </g>

              {/* User Markers */}
              {users.map((user) => {
                // Convert lat/lng to SVG coordinates (simplified)
                const x = ((user.longitude + 180) / 360) * 1000
                const y = ((90 - user.latitude) / 180) * 500
                
                return (
                  <g key={user.id}>
                    {/* Marker Circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={user.isOnline ? "8" : "6"}
                      fill={user.isOnline ? getLevelColor(user.level) : "#9ca3af"}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-10 transition-all"
                      onClick={() => handleUserClick(user)}
                    />
                    {/* Online Indicator */}
                    {user.isOnline && (
                      <circle
                        cx={x + 6}
                        cy={y - 6}
                        r="3"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="1"
                      />
                    )}
                    {/* Language Flag */}
                    <text
                      x={x}
                      y={y + 2}
                      textAnchor="middle"
                      fontSize="8"
                      className="pointer-events-none"
                    >
                      {getLanguageFlag(user.nativeLanguage)}
                    </text>
                  </g>
                )
              })}

              {/* User's Location */}
              {userLocation && (
                <g>
                  <circle
                    cx={((userLocation.lng + 180) / 360) * 1000}
                    cy={((90 - userLocation.lat) / 180) * 500}
                    r="10"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                  <text
                    x={((userLocation.lng + 180) / 360) * 1000}
                    y={((90 - userLocation.lat) / 180) * 500 + 3}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    אתה
                  </text>
                </g>
              )}
            </svg>

            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  משתמשים מחוברים
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.isOnline).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                מתוך {users.length} משתמשים
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card
            key={user.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedUser?.id === user.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleUserClick(user)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{getLanguageFlag(user.nativeLanguage)}</span>
                    <span>{user.nativeLanguage.toUpperCase()}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.level === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      user.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {user.level === 'beginner' ? 'מתחיל' :
                       user.level === 'intermediate' ? 'בינוני' : 'מתקדם'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {user.latitude.toFixed(2)}, {user.longitude.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {user.isOnline ? 'מחובר' : `נראה לאחרונה ${user.lastSeen.toLocaleTimeString('he-IL')}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {user.learningLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs"
                    >
                      {getLanguageFlag(lang)} {lang.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected User Details */}
      {selectedUser && (
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <span>פרטי משתמש</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  דובר {selectedUser.nativeLanguage.toUpperCase()} • לומד {selectedUser.learningLanguages.join(', ').toUpperCase()}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    התחל צ&apos;אט
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    הוסף לחברים
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
