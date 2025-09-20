'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Video, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff,
  Globe,
  Trophy,
  Send,
  Languages
} from 'lucide-react'

interface User {
  id: string
  name: string
  avatar: string
  language: string
  level: string
  isOnline: boolean
  isSpeaking: boolean
  currentActivity: string
}

interface Message {
  id: string
  userId: string
  userName: string
  content: string
  language: string
  timestamp: number
  type: 'text' | 'voice' | 'video' | 'translation'
  isTranslated?: boolean
  originalText?: string
}

interface LearningSession {
  id: string
  topic: string
  participants: User[]
  messages: Message[]
  isActive: boolean
  language: string
  difficulty: string
}

export default function RealTimeLearningChat() {
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('he')
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // סימולציה של משתמשים אונליין
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'שרה',
        avatar: '👩‍💼',
        language: 'he',
        level: 'advanced',
        isOnline: true,
        isSpeaking: false,
        currentActivity: 'לומדת עברית'
      },
      {
        id: '2',
        name: 'Ahmed',
        avatar: '👨‍🎓',
        language: 'ar',
        level: 'intermediate',
        isOnline: true,
        isSpeaking: true,
        currentActivity: 'לומד ערבית'
      },
      {
        id: '3',
        name: 'Maria',
        avatar: '👩‍🎨',
        language: 'es',
        level: 'beginner',
        isOnline: true,
        isSpeaking: false,
        currentActivity: 'לומדת ספרדית'
      },
      {
        id: '4',
        name: 'דוד',
        avatar: '👨‍💻',
        language: 'he',
        level: 'advanced',
        isOnline: false,
        isSpeaking: false,
        currentActivity: 'לא פעיל'
      }
    ]
    setOnlineUsers(mockUsers)

    // סימולציה של שיעור פעיל
    const mockSession: LearningSession = {
      id: 'session-1',
      topic: 'שיחה יומיומית בעברית',
      participants: mockUsers.filter(u => u.isOnline),
      messages: [
        {
          id: '1',
          userId: '1',
          userName: 'שרה',
          content: 'שלום! איך אתם מרגישים היום?',
          language: 'he',
          timestamp: Date.now() - 300000,
          type: 'text'
        },
        {
          id: '2',
          userId: '2',
          userName: 'Ahmed',
          content: 'مرحبا! أنا بخير، شكرا',
          language: 'ar',
          timestamp: Date.now() - 250000,
          type: 'text',
          isTranslated: true,
          originalText: 'שלום! אני בסדר, תודה'
        },
        {
          id: '3',
          userId: '3',
          userName: 'Maria',
          content: '¡Hola! Estoy muy bien, gracias',
          language: 'es',
          timestamp: Date.now() - 200000,
          type: 'text',
          isTranslated: true,
          originalText: 'שלום! אני מצוין, תודה'
        }
      ],
      isActive: true,
      language: 'he',
      difficulty: 'intermediate'
    }
    setCurrentSession(mockSession)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.messages])

  const sendMessage = () => {
    if (!newMessage.trim() || !currentSession) return

    const message: Message = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'אתה',
      content: newMessage,
      language: selectedLanguage,
      timestamp: Date.now(),
      type: 'text'
    }

    setCurrentSession(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message]
    } : null)

    setNewMessage('')
    setIsTyping(false)

    // סימולציה של תגובה אוטומטית
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        userId: 'ai-tutor',
        userName: 'AI Tutor',
        content: 'נהדר! בואו נמשיך עם המשפט הבא...',
        language: 'he',
        timestamp: Date.now(),
        type: 'text'
      }

      setCurrentSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, autoReply]
      } : null)
    }, 2000)
  }

  const startRecording = () => {
    setIsRecording(true)
    // כאן יהיה קוד להקלטת קול
  }

  const stopRecording = () => {
    setIsRecording(false)
    // כאן יהיה קוד לשליחת הקלטה
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
  }

  const getLanguageFlag = (lang: string) => {
    const flags: Record<string, string> = {
      'he': '🇮🇱',
      'ar': '🇸🇦',
      'en': '🇺🇸',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪'
    }
    return flags[lang] || '🌍'
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* כותרת */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            למידה חברתית בזמן אמת
          </h1>
          <p className="text-gray-300 text-lg">
            למד שפות עם אנשים אמיתיים מכל העולם
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* רשימת משתמשים אונליין */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-400" />
              משתמשים אונליין
            </h2>
            
            <div className="space-y-3">
              {onlineUsers.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border transition-all ${
                    user.isOnline 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-gray-500/10 border-gray-500/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="text-2xl">{user.avatar}</span>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {user.isSpeaking && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <Mic className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{user.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">
                          {getLanguageFlag(user.language)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(user.level)}`}>
                          {user.level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{user.currentActivity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* סטטיסטיקות */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {onlineUsers.filter(u => u.isOnline).length}
                  </div>
                  <div className="text-xs text-gray-400">אונליין</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {onlineUsers.filter(u => u.isSpeaking).length}
                  </div>
                  <div className="text-xs text-gray-400">מדברים</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* צ'אט מרכזי */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex flex-col"
          >
            {/* כותרת השיעור */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {currentSession?.topic}
                  </h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-300">
                      {getLanguageFlag(currentSession?.language || 'he')} 
                      {currentSession?.language === 'he' ? ' עברית' : ' Hebrew'}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${getLevelColor(currentSession?.difficulty || 'intermediate')}`}>
                      {currentSession?.difficulty === 'beginner' ? 'מתחיל' :
                       currentSession?.difficulty === 'intermediate' ? 'בינוני' : 'מתקדם'}
                    </span>
                    <span className="text-sm text-gray-300">
                      {currentSession?.participants.length} משתתפים
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleVideo}
                    className={`p-2 rounded-lg transition-colors ${
                      isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {isVideoOn ? <CameraOff className="w-4 h-4 text-white" /> : <Camera className="w-4 h-4 text-white" />}
                  </button>
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-2 rounded-lg transition-colors ${
                      isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </div>
            </div>

            {/* הודעות */}
            <div className="flex-1 p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {currentSession?.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.userId === 'current-user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 text-white'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{message.userName}</span>
                        <span className="text-xs">{getLanguageFlag(message.language)}</span>
                        {message.isTranslated && (
                          <Globe className="w-3 h-3 text-blue-400" />
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                      {message.isTranslated && message.originalText && (
                        <p className="text-xs text-gray-400 mt-1 italic">
                          תרגום: {message.originalText}
                        </p>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString('he-IL', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 text-white px-4 py-2 rounded-2xl">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">מישהו מקליד</span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce animation-delay-100"></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce animation-delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* שדה הודעה */}
            <div className="p-6 border-t border-white/20">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value)
                      setIsTyping(true)
                      setTimeout(() => setIsTyping(false), 2000)
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="כתוב הודעה..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      aria-label="בחר שפה"
                      className="bg-transparent text-white text-sm border-none outline-none"
                    >
                      <option value="he">🇮🇱 עברית</option>
                      <option value="ar">🇸🇦 عربي</option>
                      <option value="en">🇺🇸 English</option>
                      <option value="es">🇪🇸 Español</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  aria-label="שלח הודעה"
                  className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* תכונות נוספות */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Languages className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">תרגום בזמן אמת</h3>
            <p className="text-gray-400 text-sm">
              כל הודעה מתורגמת אוטומטית לשפה שלך
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">שיחות וידאו</h3>
            <p className="text-gray-400 text-sm">
              תרגול דיבור עם אנשים אמיתיים
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">הישגים חברתיים</h3>
            <p className="text-gray-400 text-sm">
              זכה בנקודות ותגים על השתתפות
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
