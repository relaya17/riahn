'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Brain,
  MessageCircle,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Zap,
  User,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

interface AITutor {
  name: string
  personality: 'friendly' | 'professional' | 'motivational'
  expertise: string[]
  currentMood: 'happy' | 'focused' | 'encouraging' | 'analytical'
  avatar: string
}

interface LearningSession {
  id: string
  startTime: Date
  duration: number
  topics: string[]
  progress: number
  mistakes: number
  improvements: string[]
}

interface VoiceAnalysis {
  pronunciation: number
  fluency: number
  confidence: number
  accent: string
  suggestions: string[]
}

export function PersonalAITutor() {
  const [tutor, setTutor] = useState<AITutor>({
    name: 'אליה',
    personality: 'friendly',
    expertise: ['עברית', 'אנגלית', 'ערבית', 'דקדוק', 'הגייה'],
    currentMood: 'encouraging',
    avatar: '👩‍🏫'
  })
  
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null)
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceAnalysis | null>(null)
  const [conversation, setConversation] = useState<Array<{
    id: string
    speaker: 'user' | 'tutor'
    message: string
    timestamp: Date
    type: 'text' | 'voice' | 'correction' | 'encouragement'
  }>>([])
  
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize AI Tutor
    const welcomeMessage = {
      id: '1',
      speaker: 'tutor' as const,
      message: `שלום! אני ${tutor.name}, המורה האישי שלך. אני כאן לעזור לך ללמוד שפות בצורה הכי יעילה ומהנה. איך אני יכול לעזור לך היום?`,
      timestamp: new Date(),
      type: 'text' as const
    }
    setConversation([welcomeMessage])
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const audioChunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        await processAudio(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const processAudio = async (audioBlob: Blob) => {
    // Simulate AI processing
    const userMessage = {
      id: Date.now().toString(),
      speaker: 'user' as const,
      message: 'שלום, איך אני יכול לשפר את ההגייה שלי?',
      timestamp: new Date(),
      type: 'voice' as const
    }
    
    setConversation(prev => [...prev, userMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const tutorResponse = {
        id: (Date.now() + 1).toString(),
        speaker: 'tutor' as const,
        message: 'הגייה מעולה! אני רואה שיש לך פוטנציאל גדול. בואו נתמקד בשיפור הצלילים הבעייתיים. נסה להגיד: "שלום, איך שלומך?"',
        timestamp: new Date(),
        type: 'encouragement' as const
      }
      
      setConversation(prev => [...prev, tutorResponse])
      
      // Simulate voice analysis
      setVoiceAnalysis({
        pronunciation: 85,
        fluency: 78,
        confidence: 82,
        accent: 'ישראלית',
        suggestions: [
          'שפר את הגיית האות ר',
          'האט קצת את הדיבור',
          'הדגש יותר על התנועות'
        ]
      })
    }, 2000)
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'he-IL'
      utterance.rate = 0.8
      utterance.pitch = 1.1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      speechSynthesis.speak(utterance)
    }
  }

  const startLearningSession = () => {
    const session: LearningSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      duration: 0,
      topics: ['הגייה', 'דקדוק', 'אוצר מילים'],
      progress: 0,
      mistakes: 0,
      improvements: []
    }
    setCurrentSession(session)
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊'
      case 'focused': return '🤔'
      case 'encouraging': return '💪'
      case 'analytical': return '🧠'
      default: return '😊'
    }
  }

  const getPersonalityColor = (personality: string) => {
    switch (personality) {
      case 'friendly': return 'from-green-400 to-blue-500'
      case 'professional': return 'from-blue-500 to-purple-600'
      case 'motivational': return 'from-orange-400 to-red-500'
      default: return 'from-green-400 to-blue-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Tutor Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-16 h-16 bg-gradient-to-r ${getPersonalityColor(tutor.personality)} rounded-full flex items-center justify-center text-2xl`}>
                {tutor.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tutor.name} - המורה האישי שלך
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getMoodEmoji(tutor.currentMood)} {tutor.currentMood}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  • מומחה ב: {tutor.expertise.join(', ')}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setTutor(prev => ({
                  ...prev,
                  currentMood: prev.currentMood === 'happy' ? 'focused' : 'happy'
                }))}
              >
                <Brain className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>שיחה עם {tutor.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 overflow-y-auto space-y-4 mb-4">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.speaker === 'user'
                        ? 'bg-blue-500 text-white'
                        : message.type === 'correction'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : message.type === 'encouragement'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('he-IL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Voice Controls */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
                className="flex items-center gap-2"
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    עצור ({recordingTime}s)
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    הקלט
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakText(conversation[conversation.length - 1]?.message || '')}
                disabled={isSpeaking}
                className="flex items-center gap-2"
              >
                {isSpeaking ? (
                  <>
                    <Pause className="h-4 w-4" />
                    מדבר...
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    השמע
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Voice Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>ניתוח הגייה</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {voiceAnalysis ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {voiceAnalysis.pronunciation}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      הגייה
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {voiceAnalysis.fluency}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      שטף דיבור
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {voiceAnalysis.confidence}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ביטחון
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    המלצות לשיפור:
                  </h4>
                  <ul className="space-y-1">
                    {voiceAnalysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  הקלט הודעה כדי לקבל ניתוח הגייה
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Learning Session */}
      {currentSession && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>מושב למידה פעיל</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.floor(currentSession.duration / 60)}:{(currentSession.duration % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  זמן למידה
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentSession.progress}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  התקדמות
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {currentSession.mistakes}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  שגיאות
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {currentSession.improvements.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  שיפורים
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={startLearningSession}
          className="h-20 flex flex-col items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600"
        >
          <Play className="h-6 w-6" />
          <span className="text-sm">התחל מושב</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-20 flex flex-col items-center gap-2"
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-sm">שיעור מותאם</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-20 flex flex-col items-center gap-2"
        >
          <Award className="h-6 w-6" />
          <span className="text-sm">בדיקת רמה</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-20 flex flex-col items-center gap-2"
        >
          <TrendingUp className="h-6 w-6" />
          <span className="text-sm">דוח התקדמות</span>
        </Button>
      </div>
    </div>
  )
}
