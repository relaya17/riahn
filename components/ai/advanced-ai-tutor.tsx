'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { useLanguage } from '@/components/providers'
import { 
  Brain, 
  Mic, 
  MicOff, 
  Volume2, 
  Send, 
  MessageCircle,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Zap,
  Lightbulb,
  RotateCcw
} from 'lucide-react'

interface LearningSession {
  id: string
  type: 'conversation' | 'grammar' | 'vocabulary' | 'pronunciation'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  progress: number
  score: number
  timeSpent: number
  completed: boolean
}

interface AIResponse {
  type: 'question' | 'correction' | 'explanation' | 'encouragement'
  content: string
  audioUrl?: string
  suggestions?: string[]
  nextAction?: string
}

export function AdvancedAITutor() {
  const { t: _t, currentLanguage } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const [_isSpeaking, setIsSpeaking] = useState(false)
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null)
  const [conversation, setConversation] = useState<AIResponse[]>([])
  const [userInput, setUserInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [learningStats, setLearningStats] = useState({
    totalSessions: 0,
    averageScore: 0,
    streak: 0,
    wordsLearned: 0,
    timeSpent: 0
  })
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const _synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      type SpeechRecognitionConstructor = new () => SpeechRecognition
      const SpeechRecognitionCtor =
        (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition
      recognitionRef.current = SpeechRecognitionCtor ? new SpeechRecognitionCtor() : null
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = currentLanguage === 'he' ? 'he-IL' : 
                                   currentLanguage === 'ar' ? 'ar-SA' : 'en-US'

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setUserInput(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }
    }

    // Load learning stats
    loadLearningStats()
  }, [currentLanguage])

  const loadLearningStats = () => {
    const saved = localStorage.getItem('ai-tutor-stats')
    if (saved) {
      setLearningStats(JSON.parse(saved))
    }
  }

  const saveLearningStats = (newStats: typeof learningStats) => {
    setLearningStats(newStats)
    localStorage.setItem('ai-tutor-stats', JSON.stringify(newStats))
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const _stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = currentLanguage === 'he' ? 'he-IL' : 
                      currentLanguage === 'ar' ? 'ar-SA' : 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      speechSynthesis.speak(utterance)
    }
  }

  const startNewSession = (type: LearningSession['type'], difficulty: LearningSession['difficulty']) => {
    const newSession: LearningSession = {
      id: Date.now().toString(),
      type,
      difficulty,
      progress: 0,
      score: 0,
      timeSpent: 0,
      completed: false
    }
    
    setCurrentSession(newSession)
    setConversation([])
    
    // Start with AI greeting
    const greeting = generateAIGreeting(type, difficulty)
    setConversation([greeting])
    speakText(greeting.content)
  }

  const generateAIGreeting = (type: LearningSession['type'], difficulty: LearningSession['difficulty']): AIResponse => {
    const greetings = {
      conversation: {
        beginner: 'שלום! בואו נתחיל שיחה פשוטה. איך אתה מרגיש היום?',
        intermediate: 'שלום! היום נעסוק בשיחה מתקדמת יותר. בואו נדבר על התחביבים שלך.',
        advanced: 'שלום! היום נעסוק בשיחה מורכבת. בואו נדון בנושאים מעמיקים.'
      },
      grammar: {
        beginner: 'היום נלמד דקדוק בסיסי. בואו נתחיל עם זמנים פשוטים.',
        intermediate: 'היום נעסוק בדקדוק מתקדם יותר. בואו נלמד על מבנים מורכבים.',
        advanced: 'היום נעסוק בדקדוק מתקדם. בואו נעמיק במבנים מורכבים.'
      },
      vocabulary: {
        beginner: 'היום נלמד מילים חדשות! בואו נתחיל עם מילים בסיסיות.',
        intermediate: 'היום נעסוק באוצר מילים מתקדם. בואו נלמד ביטויים שימושיים.',
        advanced: 'היום נעסוק באוצר מילים מתקדם. בואו נלמד ניבים וביטויים מורכבים.'
      },
      pronunciation: {
        beginner: 'היום נתרגל הגייה! בואו נתחיל עם צלילים בסיסיים.',
        intermediate: 'היום נעסוק בהגייה מתקדמת. בואו נתרגל מילים מורכבות.',
        advanced: 'היום נעסוק בהגייה מתקדמת. בואו נתרגל משפטים מורכבים.'
      }
    }

    return {
      type: 'question',
      content: greetings[type][difficulty],
      nextAction: 'wait_for_response'
    }
  }

  const processUserInput = async () => {
    if (!userInput.trim() || !currentSession) return

    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(userInput, currentSession)
      setConversation(prev => [...prev, response])
      
      if (response.audioUrl) {
        speakText(response.content)
      }
      
      setUserInput('')
      setIsProcessing(false)
      
      // Update session progress
      updateSessionProgress()
    }, 1000)
  }

  const generateAIResponse = (input: string, session: LearningSession): AIResponse => {
    // Simulate AI analysis
    const responses = {
      conversation: [
        {
          type: 'correction' as const,
          content: 'נהדר! אבל בואו נשפר את המשפט הזה...',
          suggestions: ['נסה להשתמש במילה "מעניין" במקום "טוב"', 'הוסף יותר פרטים']
        },
        {
          type: 'encouragement' as const,
          content: 'מעולה! אתה משתפר מאוד! בואו נמשיך...',
          nextAction: 'continue_conversation'
        }
      ],
      grammar: [
        {
          type: 'explanation' as const,
          content: 'המשפט שלך נכון! בואו נבין למה...',
          suggestions: ['הזמן הנכון כאן הוא עבר', 'המילה "היה" מתאימה כאן']
        }
      ],
      vocabulary: [
        {
          type: 'question' as const,
          content: 'נהדר! המילה הזו נכונה. עכשיו בואו נלמד מילה חדשה...',
          nextAction: 'teach_new_word'
        }
      ],
      pronunciation: [
        {
          type: 'correction' as const,
          content: 'כמעט נכון! בואו נתרגל את הצליל הזה...',
          suggestions: ['השפה צריכה להיות יותר קדימה', 'נסה להגות יותר לאט']
        }
      ]
    }

    const sessionResponses = responses[session.type]
    return sessionResponses[Math.floor(Math.random() * sessionResponses.length)]
  }

  const updateSessionProgress = () => {
    if (!currentSession) return

    const newProgress = Math.min(100, currentSession.progress + 10)
    const newScore = Math.min(100, currentSession.score + 5)
    
    setCurrentSession(prev => prev ? {
      ...prev,
      progress: newProgress,
      score: newScore,
      timeSpent: prev.timeSpent + 1
    } : null)

    if (newProgress === 100) {
      completeSession()
    }
  }

  const completeSession = () => {
    if (!currentSession) return

    const completedSession = { ...currentSession, completed: true }
    
    // Update stats
    const newStats = {
      ...learningStats,
      totalSessions: learningStats.totalSessions + 1,
      averageScore: (learningStats.averageScore + completedSession.score) / 2,
      streak: learningStats.streak + 1,
      wordsLearned: learningStats.wordsLearned + 5,
      timeSpent: learningStats.timeSpent + completedSession.timeSpent
    }
    
    saveLearningStats(newStats)
    
    // Add completion message
    const completionMessage: AIResponse = {
      type: 'encouragement',
      content: `מזל טוב! סיימת את השיעור עם ציון של ${completedSession.score}%!`,
      nextAction: 'session_complete'
    }
    
    setConversation(prev => [...prev, completionMessage])
    speakText(completionMessage.content)
  }

  const resetSession = () => {
    setCurrentSession(null)
    setConversation([])
    setUserInput('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-purple-600" />
          מורה AI מתקדם
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          למידה אישית עם בינה מלאכותית מתקדמת
        </p>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{learningStats.totalSessions}</div>
            <div className="text-sm text-gray-600">שיעורים</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{learningStats.averageScore.toFixed(0)}%</div>
            <div className="text-sm text-gray-600">ציון ממוצע</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{learningStats.streak}</div>
            <div className="text-sm text-gray-600">רצף ימים</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{learningStats.wordsLearned}</div>
            <div className="text-sm text-gray-600">מילים נלמדו</div>
          </CardContent>
        </Card>
      </div>

      {/* Session Controls */}
      {!currentSession ? (
        <Card>
          <CardHeader>
            <CardTitle>בחר סוג שיעור</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: 'conversation' as const, label: 'שיחה', icon: MessageCircle, color: 'bg-blue-500' },
                { type: 'grammar' as const, label: 'דקדוק', icon: BookOpen, color: 'bg-green-500' },
                { type: 'vocabulary' as const, label: 'אוצר מילים', icon: Lightbulb, color: 'bg-yellow-500' },
                { type: 'pronunciation' as const, label: 'הגייה', icon: Volume2, color: 'bg-purple-500' }
              ].map(({ type, label, icon: _Icon }) => (
                <div key={type} className="space-y-2">
                  <h3 className="font-medium">{label}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant="outline"
                        size="sm"
                        onClick={() => startNewSession(type, difficulty)}
                        className="text-xs"
                      >
                        {difficulty === 'beginner' ? 'מתחיל' : 
                         difficulty === 'intermediate' ? 'בינוני' : 'מתקדם'}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                שיעור פעיל
              </CardTitle>
              <Button variant="outline" size="sm" onClick={resetSession}>
                <RotateCcw className="h-4 w-4 mr-2" />
                סיים שיעור
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>התקדמות</span>
                <span>{currentSession.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  data-progress={currentSession.progress}
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Conversation */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {conversation.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'question' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'question' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, i) => (
                          <div key={i} className="text-xs text-gray-600 dark:text-gray-400">
                            💡 {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && processUserInput()}
                  placeholder="הקלד תשובה או שאלה..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isProcessing}
                />
              </div>
              
              <Button
                onClick={startListening}
                disabled={isListening}
                variant={isListening ? "destructive" : "outline"}
                size="sm"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button
                onClick={processUserInput}
                disabled={!userInput.trim() || isProcessing}
                size="sm"
              >
                {isProcessing ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Session Info */}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>ציון: {currentSession.score}%</span>
              <span>זמן: {currentSession.timeSpent} דקות</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

