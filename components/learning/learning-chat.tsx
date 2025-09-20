'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Send, 
  Volume2, 
  VolumeX,
  Languages,
  BookOpen,
  Users,
  Mic,
  MicOff,
  Lightbulb,
  Star
} from 'lucide-react'
import { useToast } from '@/components/ui/toast'

interface ChatMessage {
  id: string
  text: string
  translatedText?: string
  originalLanguage: string
  targetLanguage: string
  sender: 'user' | 'partner'
  timestamp: Date
  isLearning: boolean
  difficulty?: 'easy' | 'medium' | 'hard'
  pronunciation?: string
  culturalNote?: string
}

interface LearningChatProps {
  targetLanguage: string
  userLanguage: string
  partnerName: string
  partnerAvatar?: string
}

export function LearningChat({ 
  targetLanguage, 
  userLanguage, 
  partnerName
}: LearningChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showTranslation, setShowTranslation] = useState(true)
  const [showPronunciation, setShowPronunciation] = useState(true)
  const [showCulturalNotes] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { error } = useToast()

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Mock initial messages
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        text: 'שלום! איך אתה היום?',
        translatedText: 'Hello! How are you today?',
        originalLanguage: 'he',
        targetLanguage: 'en',
        sender: 'partner',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isLearning: true,
        difficulty: 'easy',
        pronunciation: 'shalom! eich ata hayom?',
        culturalNote: 'שלום הוא ברכה נפוצה בעברית, משמעותה "שלום" או "להתראות"'
      },
      {
        id: '2',
        text: 'I am good, thank you! How about you?',
        translatedText: 'אני בסדר, תודה! מה איתך?',
        originalLanguage: 'en',
        targetLanguage: 'he',
        sender: 'user',
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        isLearning: true,
        difficulty: 'easy',
        pronunciation: 'ai am gud, tenk yu! hau abaut yu?',
        culturalNote: 'באנגלית, "How about you?" הוא דרך נפוצה לשאול "מה איתך?"'
      }
    ]
    setMessages(initialMessages)
  }, [])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      originalLanguage: userLanguage,
      targetLanguage: targetLanguage,
      sender: 'user',
      timestamp: new Date(),
      isLearning: true,
      difficulty: 'medium'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTranslating(true)
    setIsTyping(true)

    try {
      // Translate the message
      const translationResponse = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newMessage,
          from: userLanguage,
          to: targetLanguage
        }),
      })

      if (translationResponse.ok) {
        const translationData = await translationResponse.json()
        userMessage.translatedText = translationData.translatedText
        userMessage.pronunciation = translationData.pronunciation
        userMessage.culturalNote = translationData.culturalNote
        userMessage.difficulty = translationData.difficulty
      }

      // Simulate partner response
      setTimeout(async () => {
        const partnerText = generatePartnerResponse(newMessage, targetLanguage)
        const translatedText = await translateText(partnerText, targetLanguage, userLanguage)
        
        const partnerResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: partnerText,
          translatedText: translatedText,
          originalLanguage: targetLanguage,
          targetLanguage: userLanguage,
          sender: 'partner',
          timestamp: new Date(),
          isLearning: true,
          difficulty: 'medium'
        }
        
        setMessages(prev => [...prev, partnerResponse])
        setIsTyping(false)
      }, 2000)

    } catch (err) {
      error('שגיאה בתרגום ההודעה')
    } finally {
      setIsTranslating(false)
    }
  }

  const generatePartnerResponse = (userMessage: string, language: string): string => {
    const responses = {
      en: [
        "That's interesting! Tell me more about it.",
        "I understand. What do you think about that?",
        "Great! I'm learning too. How do you practice?",
        "That sounds wonderful! Can you explain more?",
        "I see! What's your favorite part about learning?"
      ],
      he: [
        "זה מעניין! ספר לי עוד על זה.",
        "אני מבין. מה אתה חושב על זה?",
        "נהדר! גם אני לומד. איך אתה מתרגל?",
        "זה נשמע נפלא! אתה יכול להסביר עוד?",
        "אני רואה! מה החלק האהוב עליך בלמידה?"
      ],
      es: [
        "¡Eso es interesante! Cuéntame más sobre eso.",
        "Entiendo. ¿Qué piensas sobre eso?",
        "¡Genial! Yo también estoy aprendiendo. ¿Cómo practicas?",
        "¡Eso suena maravilloso! ¿Puedes explicar más?",
        "¡Veo! ¿Cuál es tu parte favorita del aprendizaje?"
      ],
      fr: [
        "C'est intéressant ! Raconte-moi plus à ce sujet.",
        "Je comprends. Qu'est-ce que tu en penses ?",
        "Génial ! J'apprends aussi. Comment pratiques-tu ?",
        "Ça a l'air merveilleux ! Peux-tu expliquer plus ?",
        "Je vois ! Quelle est ta partie préférée de l'apprentissage ?"
      ],
      ar: [
        "هذا مثير للاهتمام! أخبرني المزيد عن ذلك.",
        "أفهم. ما رأيك في ذلك؟",
        "رائع! أنا أتعلم أيضاً. كيف تتدرب؟",
        "يبدو رائعاً! هل يمكنك شرح المزيد؟",
        "أرى! ما هو الجزء المفضل لديك في التعلم؟"
      ]
    }
    
    const langResponses = responses[language as keyof typeof responses] || responses.en
    return langResponses[Math.floor(Math.random() * langResponses.length)]
  }

  const translateText = async (text: string, from: string, to: string): Promise<string> => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          from,
          to
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return data.translatedText
      }
      return text
    } catch {
      return text
    }
  }

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      error('דפדפן זה לא תומך בהכרת דיבור')
      return
    }

    const SpeechRecognition = (window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown }).webkitSpeechRecognition || (window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown }).SpeechRecognition
    const recognition = new (SpeechRecognition as new () => { lang: string; continuous: boolean; interimResults: boolean; onstart: () => void; onresult: (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void; onerror: () => void; onend: () => void; start: () => void })()
    
    recognition.lang = userLanguage === 'he' ? 'he-IL' : userLanguage === 'en' ? 'en-US' : userLanguage
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
      const transcript = event.results[0][0].transcript
      setNewMessage(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
      error('שגיאה בהכרת דיבור')
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'he' ? 'he-IL' : language === 'en' ? 'en-US' : language
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'קל'
      case 'medium': return 'בינוני'
      case 'hard': return 'קשה'
      default: return 'לא ידוע'
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-white">{partnerName}</CardTitle>
              <p className="text-blue-100 text-sm">
                לומד {targetLanguage === 'he' ? 'עברית' : 
                       targetLanguage === 'en' ? 'אנגלית' :
                       targetLanguage === 'es' ? 'ספרדית' :
                       targetLanguage === 'fr' ? 'צרפתית' : 'ערבית'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-white hover:bg-white/20"
            >
              <Languages className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPronunciation(!showPronunciation)}
              className="text-white hover:bg-white/20"
            >
              {showPronunciation ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              {/* Original Message */}
              <div className="font-medium mb-1">
                {message.text}
              </div>

              {/* Translation */}
              {showTranslation && message.translatedText && (
                <div className={`text-sm mb-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  <div className="flex items-center gap-1 mb-1">
                    <Languages className="h-3 w-3" />
                    <span className="font-medium">תרגום:</span>
                  </div>
                  {message.translatedText}
                </div>
              )}

              {/* Pronunciation */}
              {showPronunciation && message.pronunciation && (
                <div className={`text-sm mb-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  <div className="flex items-center gap-1 mb-1">
                    <Volume2 className="h-3 w-3" />
                    <span className="font-medium">הגייה:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="italic">{message.pronunciation}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(message.text, message.originalLanguage)}
                      className="p-1 h-auto"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Cultural Note */}
              {showCulturalNotes && message.culturalNote && (
                <div className={`text-sm mb-2 p-2 rounded ${
                  message.sender === 'user' 
                    ? 'bg-white/20 text-blue-100' 
                    : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                }`}>
                  <div className="flex items-center gap-1 mb-1">
                    <Lightbulb className="h-3 w-3" />
                    <span className="font-medium">הערה תרבותית:</span>
                  </div>
                  {message.culturalNote}
                </div>
              )}

              {/* Difficulty and Timestamp */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  {message.difficulty && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(message.difficulty)}`}>
                      {getDifficultyLabel(message.difficulty)}
                    </span>
                  )}
                  {message.isLearning && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span className="text-xs">למידה</span>
                    </div>
                  )}
                </div>
                <span className={`text-xs ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('he-IL', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce chat-typing-dot-2"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce chat-typing-dot-3"></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{partnerName} כותב...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`כתוב הודעה ב${userLanguage === 'he' ? 'עברית' : 'אנגלית'}...`}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTranslating}
            />
            {isTranslating && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleVoiceInput}
            disabled={isListening}
            className={isListening ? 'bg-red-100 text-red-600' : ''}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTranslating}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Learning Tips */}
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-400">
            <Star className="h-4 w-4" />
            <span className="font-medium">טיפ ללמידה:</span>
            <span>נסה להשתמש במילים חדשות שלמדת בשיעורים!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
