'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  Smile, 
  Frown, 
  Meh, 
  Eye, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  Camera,
  Zap
} from 'lucide-react'

interface EmotionData {
  emotion: 'happy' | 'sad' | 'neutral' | 'excited' | 'frustrated' | 'confused'
  confidence: number
  timestamp: number
}

interface LearningState {
  currentLesson: string
  difficulty: 'easy' | 'medium' | 'hard'
  userMood: EmotionData
  aiResponse: string
  suggestions: string[]
}

export default function EmotionAITutor() {
  const [isListening, setIsListening] = useState(false)
  const [isWatching, setIsWatching] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData>({
    emotion: 'neutral',
    confidence: 0.8,
    timestamp: Date.now()
  })
  const [learningState, setLearningState] = useState<LearningState>({
    currentLesson: 'שלום, איך אתה מרגיש היום?',
    difficulty: 'medium',
    userMood: currentEmotion,
    aiResponse: '',
    suggestions: []
  })
  const [aiPersonality, setAiPersonality] = useState({
    name: 'רינה',
    mood: 'encouraging',
    teachingStyle: 'adaptive'
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // סימולציה של זיהוי רגשות (בפועל יהיה עם AI אמיתי)
  useEffect(() => {
    const emotionInterval = setInterval(() => {
      const emotions: EmotionData['emotion'][] = ['happy', 'sad', 'neutral', 'excited', 'frustrated', 'confused']
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
      
      setCurrentEmotion({
        emotion: randomEmotion,
        confidence: 0.7 + Math.random() * 0.3,
        timestamp: Date.now()
      })
    }, 5000)

    return () => clearInterval(emotionInterval)
  }, [])

  // התאמת שיעור לפי רגש
  useEffect(() => {
    const adaptLesson = () => {
      let newLesson = learningState.currentLesson
      let newDifficulty = learningState.difficulty
      let newSuggestions: string[] = []

      switch (currentEmotion.emotion) {
        case 'frustrated':
          newLesson = 'בואו ננסה משהו קל יותר. איך אומרים "תודה" בעברית?'
          newDifficulty = 'easy'
          newSuggestions = ['נסה לנשום עמוק', 'בואו נקח הפסקה קצרה', 'אני כאן לעזור לך']
          break
        case 'excited':
          newLesson = 'נהדר! בואו ננסה אתגר קשה יותר. איך אומרים "אני אוהב ללמוד שפות"?'
          newDifficulty = 'hard'
          newSuggestions = ['אתה עושה התקדמות מדהימה!', 'בואו נמשיך עם זה', 'אתה מוכן לאתגר הבא']
          break
        case 'confused':
          newLesson = 'בואו נסביר את זה שוב. מה זה "שלום" באנגלית?'
          newDifficulty = 'easy'
          newSuggestions = ['אל תדאג, זה בסדר', 'בואו נחזור על הבסיס', 'אני אסביר שוב']
          break
        case 'happy':
          newLesson = 'מעולה! בואו נמשיך עם השיעור הבא. איך אומרים "אני שמח"?'
          newDifficulty = 'medium'
          newSuggestions = ['אתה עושה עבודה נהדרת!', 'בואו נמשיך', 'המשך כך!']
          break
        default:
          newLesson = 'בואו נמשיך ללמוד. איך אומרים "אני לומד עברית"?'
          newDifficulty = 'medium'
          newSuggestions = ['בואו נמשיך', 'אתה עושה טוב', 'המשך כך']
      }

      setLearningState(prev => ({
        ...prev,
        currentLesson: newLesson,
        difficulty: newDifficulty,
        userMood: currentEmotion,
        suggestions: newSuggestions
      }))
    }

    adaptLesson()
  }, [currentEmotion])

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="w-6 h-6 text-green-500" />
      case 'sad': return <Frown className="w-6 h-6 text-red-500" />
      case 'excited': return <Zap className="w-6 h-6 text-yellow-500" />
      case 'frustrated': return <Frown className="w-6 h-6 text-orange-500" />
      case 'confused': return <Meh className="w-6 h-6 text-gray-500" />
      default: return <Meh className="w-6 h-6 text-blue-500" />
    }
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'bg-green-500/20 border-green-500'
      case 'sad': return 'bg-red-500/20 border-red-500'
      case 'excited': return 'bg-yellow-500/20 border-yellow-500'
      case 'frustrated': return 'bg-orange-500/20 border-orange-500'
      case 'confused': return 'bg-gray-500/20 border-gray-500'
      default: return 'bg-blue-500/20 border-blue-500'
    }
  }

  const startEmotionDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsWatching(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const stopEmotionDetection = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setIsWatching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* כותרת */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Tutor עם זיהוי רגשות
          </h1>
          <p className="text-gray-300 text-lg">
            רינה - המורה הפרטית שלך שמבינה איך אתה מרגיש
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* פאנל רגשות */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-400" />
              זיהוי רגשות
            </h2>
            
            <div className={`p-4 rounded-xl border-2 ${getEmotionColor(currentEmotion.emotion)} mb-4`}>
              <div className="flex items-center justify-between mb-2">
                {getEmotionIcon(currentEmotion.emotion)}
                <span className="text-white font-medium capitalize">
                  {currentEmotion.emotion}
                </span>
              </div>
              <div className="text-sm text-gray-300">
                רמת ביטחון: {Math.round(currentEmotion.confidence * 100)}%
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={startEmotionDetection}
                disabled={isWatching}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded-lg transition-colors"
              >
                <Camera className="w-4 h-4 mr-2" />
                {isWatching ? 'מזהה רגשות...' : 'התחל זיהוי'}
              </button>
              
              <button
                onClick={stopEmotionDetection}
                disabled={!isWatching}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                עצור זיהוי
              </button>
            </div>

            {/* וידאו לזיהוי */}
            <div className="mt-4">
              <video
                ref={videoRef}
                autoPlay
                muted
                className={`w-full h-32 object-cover rounded-lg bg-gray-800 ${isWatching ? 'block' : 'hidden'}`}
              />
            </div>
          </motion.div>

          {/* שיעור מרכזי */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-400" />
                שיעור מותאם אישית
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">רמת קושי:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  learningState.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  learningState.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {learningState.difficulty === 'easy' ? 'קל' :
                   learningState.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                </span>
              </div>
            </div>

            {/* תוכן השיעור */}
            <motion.div
              key={learningState.currentLesson}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 rounded-xl p-6 mb-6"
            >
              <p className="text-white text-lg leading-relaxed">
                {learningState.currentLesson}
              </p>
            </motion.div>

            {/* הצעות AI */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-white">הצעות מותאמות:</h3>
              {learningState.suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <p className="text-gray-300">{suggestion}</p>
                </motion.div>
              ))}
            </div>

            {/* כפתורי פעולה */}
            <div className="flex space-x-4 mt-6">
              <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                <Mic className="w-4 h-4 mr-2" />
                דיבור
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                <Volume2 className="w-4 h-4 mr-2" />
                האזנה
              </button>
              <button className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                <Zap className="w-4 h-4 mr-2" />
                שיעור הבא
              </button>
            </div>
          </motion.div>
        </div>

        {/* מידע נוסף על AI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            איך זה עובד?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-white font-medium mb-2">זיהוי רגשות</h4>
              <p className="text-gray-400 text-sm">
                AI מזהה את הרגש שלך דרך הבעות פנים וטון דיבור
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-medium mb-2">התאמה אישית</h4>
              <p className="text-gray-400 text-sm">
                השיעור משתנה בהתאם לרגש ולקצב הלמידה שלך
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-white font-medium mb-2">תמיכה רגשית</h4>
              <p className="text-gray-400 text-sm">
                AI מספק עידוד ותמיכה בהתאם למצב הרגשי שלך
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
