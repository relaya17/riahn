'use client'

import React, { useState, useEffect } from 'react'
import { Users, MessageCircle, Video, Calendar, Star, Award, Clock, MapPin, Heart, Send, Phone, Mail, Camera, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

interface Mentor {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  languages: string[]
  specialties: string[]
  experience: number
  rating: number
  students: number
  sessions: number
  pricePerHour: number
  currency: string
  availability: {
    timezone: string
    schedule: TimeSlot[]
  }
  isOnline: boolean
  isVerified: boolean
  badges: string[]
  responseTime: string
}

interface Mentee {
  id: string
  name: string
  avatar: string
  level: string
  goals: string[]
  interests: string[]
  learningStyle: string
  timezone: string
  preferredTimes: string[]
}

interface TimeSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  isAvailable: boolean
  isBooked: boolean
}

interface Session {
  id: string
  mentorId: string
  menteeId: string
  title: string
  description: string
  date: Date
  duration: number
  type: 'video' | 'audio' | 'chat'
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  meetingLink?: string
  notes?: string
  feedback?: {
    rating: number
    comment: string
  }
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file' | 'voice'
  isRead: boolean
}

export function MentorshipSystem() {
  const [activeTab, setActiveTab] = useState<'find' | 'sessions' | 'chat' | 'profile'>('find')
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const sampleMentors: Mentor[] = [
    {
      id: '1',
      name: 'דוד כהן',
      title: 'מורה עברית מומחה',
      avatar: '/images/david-cohen.jpg',
      bio: 'מורה עברית עם 15 שנות ניסיון. מומחה בהוראת עברית לדוברי שפות אחרות.',
      languages: ['עברית', 'אנגלית', 'ערבית'],
      specialties: ['עברית למתחילים', 'דקדוק', 'שיחה', 'ביטחון עצמי'],
      experience: 15,
      rating: 4.9,
      students: 1250,
      sessions: 3200,
      pricePerHour: 120,
      currency: 'ILS',
      availability: {
        timezone: 'Asia/Jerusalem',
        schedule: [
          { id: '1', day: 'ראשון', startTime: '09:00', endTime: '17:00', isAvailable: true, isBooked: false },
          { id: '2', day: 'שני', startTime: '09:00', endTime: '17:00', isAvailable: true, isBooked: false },
          { id: '3', day: 'שלישי', startTime: '09:00', endTime: '17:00', isAvailable: true, isBooked: false }
        ]
      },
      isOnline: true,
      isVerified: true,
      badges: ['מומחה', 'מורה מוביל', 'מנטור השנה'],
      responseTime: 'תוך שעה'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'English Conversation Expert',
      avatar: '/images/sarah-johnson.jpg',
      bio: 'Native English speaker with 10 years of teaching experience. Specialized in business English and conversation skills.',
      languages: ['אנגלית', 'ספרדית'],
      specialties: ['אנגלית עסקית', 'שיחה', 'הכנה לראיונות', 'כתיבה'],
      experience: 10,
      rating: 4.8,
      students: 2100,
      sessions: 4500,
      pricePerHour: 45,
      currency: 'USD',
      availability: {
        timezone: 'America/New_York',
        schedule: [
          { id: '1', day: 'ראשון', startTime: '14:00', endTime: '22:00', isAvailable: true, isBooked: false },
          { id: '2', day: 'שני', startTime: '14:00', endTime: '22:00', isAvailable: true, isBooked: false }
        ]
      },
      isOnline: false,
      isVerified: true,
      badges: ['מומחה', 'מורה מוביל'],
      responseTime: 'תוך 2 שעות'
    }
  ]

  const sampleSessions: Session[] = [
    {
      id: '1',
      mentorId: '1',
      menteeId: 'user1',
      title: 'שיעור עברית - דקדוק בסיסי',
      description: 'לימוד דקדוק עברי בסיסי עם דגש על זמנים',
      date: new Date('2024-01-20T10:00:00'),
      duration: 60,
      type: 'video',
      status: 'scheduled',
      meetingLink: 'https://meet.riahn.com/session-1'
    },
    {
      id: '2',
      mentorId: '2',
      menteeId: 'user1',
      title: 'English Conversation Practice',
      description: 'Practice speaking English in real-world scenarios',
      date: new Date('2024-01-22T15:00:00'),
      duration: 45,
      type: 'video',
      status: 'scheduled',
      meetingLink: 'https://meet.riahn.com/session-2'
    }
  ]

  const sampleMessages: Message[] = [
    {
      id: '1',
      senderId: '1',
      receiverId: 'user1',
      content: 'שלום! אני שמח להיות המנטור שלך. איך אתה מרגיש עם העברית שלך?',
      timestamp: new Date('2024-01-15T10:00:00'),
      type: 'text',
      isRead: true
    },
    {
      id: '2',
      senderId: 'user1',
      receiverId: '1',
      content: 'שלום דוד! אני מתחיל ללמוד עברית ואני מתרגש מאוד',
      timestamp: new Date('2024-01-15T10:05:00'),
      type: 'text',
      isRead: true
    }
  ]

  useEffect(() => {
    setMessages(sampleMessages)
  }, [])

  const filteredMentors = sampleMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLanguage = selectedLanguage === 'all' || mentor.languages.includes(selectedLanguage)
    const matchesSpecialty = selectedSpecialty === 'all' || mentor.specialties.includes(selectedSpecialty)
    
    return matchesSearch && matchesLanguage && matchesSpecialty
  })

  const startSession = (session: Session) => {
    setCurrentSession(session)
    setIsInCall(true)
    setActiveTab('chat')
  }

  const endSession = () => {
    setIsInCall(false)
    setCurrentSession(null)
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'user1',
        receiverId: selectedMentor?.id || '1',
        content: newMessage,
        timestamp: new Date(),
        type: 'text',
        isRead: false
      }
      setMessages(prev => [...prev, message])
      setNewMessage('')
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: currency === 'ILS' ? 'ILS' : 'USD'
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Users className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mentorship System
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          חיבור בין מנטורים מומחים לתלמידים ללמידה אישית ומקצועית
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'find', name: 'מצא מנטור', icon: Users },
          { id: 'sessions', name: 'מפגשים', icon: Calendar },
          { id: 'chat', name: 'צ\'אט', icon: MessageCircle },
          { id: 'profile', name: 'פרופיל', icon: Award }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'find' | 'sessions' | 'chat' | 'profile')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Find Mentor Tab */}
      {activeTab === 'find' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="חפש מנטורים לפי שם או התמחות..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="בחר שפה"
                >
                  <option value="all">כל השפות</option>
                  <option value="עברית">עברית</option>
                  <option value="אנגלית">אנגלית</option>
                  <option value="ערבית">ערבית</option>
                  <option value="ספרדית">ספרדית</option>
                </select>
                
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="בחר התמחות"
                >
                  <option value="all">כל ההתמחויות</option>
                  <option value="עברית למתחילים">עברית למתחילים</option>
                  <option value="דקדוק">דקדוק</option>
                  <option value="שיחה">שיחה</option>
                  <option value="אנגלית עסקית">אנגלית עסקית</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedMentor(mentor)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-gray-800">{mentor.name}</h3>
                      {mentor.isVerified && (
                        <Award className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-gray-600">{mentor.title}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">דירוג</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{mentor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">תלמידים</span>
                    <span className="font-semibold">{mentor.students.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">מחיר לשעה</span>
                    <span className="font-semibold text-green-600">
                      {formatPrice(mentor.pricePerHour, mentor.currency)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-gray-700">התמחויות:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    בחר מנטור
                  </button>
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="שלח הודעה"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">מפגשי מנטורינג</h2>
          
          <div className="space-y-4">
            {sampleSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{session.title}</h3>
                    <p className="text-gray-600">{session.description}</p>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">תאריך</div>
                    <div className="font-semibold">{session.date.toLocaleDateString('he-IL')}</div>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">זמן</div>
                    <div className="font-semibold">{session.date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">משך</div>
                    <div className="font-semibold">{session.duration} דקות</div>
                  </div>
                  
                  <div className="text-center">
                    {session.type === 'video' ? (
                      <Video className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    ) : (
                      <MessageCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    )}
                    <div className="text-sm text-gray-600">סוג</div>
                    <div className="font-semibold">{session.type === 'video' ? 'וידאו' : 'צ\'אט'}</div>
                  </div>
                </div>
                
                {session.status === 'scheduled' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startSession(session)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>התחל מפגש</span>
                    </button>
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="קבע פגישה"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {selectedMentor?.name || 'דוד כהן'}
                    </h3>
                    <p className="text-sm text-gray-600">מנטור עברית</p>
                  </div>
                </div>
                
                {isInCall && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2 rounded-full ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                      aria-label={isMuted ? "הפעל מיקרופון" : "השתק מיקרופון"}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-2 rounded-full ${isVideoOn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                      aria-label={isVideoOn ? "כבה מצלמה" : "הפעל מצלמה"}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={endSession}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      aria-label="סיים שיחה"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === 'user1'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === 'user1' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="הקלד הודעה..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="שלח הודעה"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">פרופיל המנטורינג שלי</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">מפגשים</h3>
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-600">השנה</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">דירוג ממוצע</h3>
                <p className="text-3xl font-bold text-green-600">4.8</p>
                <p className="text-sm text-gray-600">מתוך 5</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">הישגים</h3>
                <p className="text-3xl font-bold text-purple-600">8</p>
                <p className="text-sm text-gray-600">תעודות</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
