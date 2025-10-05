'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Camera, 
  Trophy,
  Target,
  Mic,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  MicOff,
  X
} from 'lucide-react'

interface VRScene {
  id: string
  name: string
  description: string
  language: string
  difficulty: 'easy' | 'medium' | 'hard'
  duration: number
  objectives: string[]
  rewards: string[]
  isCompleted: boolean
  progress: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  points: number
  isUnlocked: boolean
  unlockedAt?: Date
}

interface PlayerStats {
  level: number
  xp: number
  xpToNext: number
  streak: number
  totalLessons: number
  accuracy: number
  speed: number
  achievements: Achievement[]
}

export default function VRARLearning() {
  const [isVRMode, setIsVRMode] = useState(false)
  const [isARMode, setIsARMode] = useState(false)
  const [currentScene, setCurrentScene] = useState<VRScene | null>(null)
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 12,
    xp: 2450,
    xpToNext: 500,
    streak: 7,
    totalLessons: 45,
    accuracy: 87,
    speed: 120,
    achievements: []
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentObjective, setCurrentObjective] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isRecording, setIsRecording] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  // סימולציה של סצנות VR/AR
  const vrScenes: VRScene[] = [
    {
      id: '1',
      name: 'שוק תל אביב',
      description: 'למד עברית בסביבה אמיתית של שוק ישראלי',
      language: 'he',
      difficulty: 'medium',
      duration: 300,
      objectives: [
        'קנה 3 מוצרים בשוק',
        'שאל על המחיר בעברית',
        'התמקח עם המוכר',
        'תודה למוכר'
      ],
      rewards: ['100 נקודות', 'תג "קונה מקצועי"', 'הצלחה בשוק'],
      isCompleted: false,
      progress: 0
    },
    {
      id: '2',
      name: 'מסעדה בפריז',
      description: 'תרגל צרפתית במסעדה צרפתית אותנטית',
      language: 'fr',
      difficulty: 'hard',
      duration: 450,
      objectives: [
        'הזמן מנה מהתפריט',
        'שאל על המרכיבים',
        'בקש את החשבון',
        'תן טיפ'
      ],
      rewards: ['150 נקודות', 'תג "שף צרפתי"', 'ארוחה מושלמת'],
      isCompleted: false,
      progress: 0
    },
    {
      id: '3',
      name: 'פארק טוקיו',
      description: 'למד יפנית בפארק יפני מסורתי',
      language: 'ja',
      difficulty: 'easy',
      duration: 240,
      objectives: [
        'ברך אנשים ביפנית',
        'שאל על הדרך',
        'הזמן אוכל',
        'תודה על העזרה'
      ],
      rewards: ['80 נקודות', 'תג "נימוסים יפניים"', 'חוויה תרבותית'],
      isCompleted: false,
      progress: 0
    }
  ]

  // סימולציה של הישגים
  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'מתחיל נועז',
      description: 'השלם את השיעור הראשון',
      icon: '🎯',
      points: 50,
      isUnlocked: true,
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'מלך הרצף',
      description: 'למד 7 ימים ברצף',
      icon: '🔥',
      points: 100,
      isUnlocked: true,
      unlockedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      name: 'מאסטר VR',
      description: 'השלם 10 שיעורי VR',
      icon: '🥽',
      points: 200,
      isUnlocked: false
    },
    {
      id: '4',
      name: 'פוליגלוט',
      description: 'למד 5 שפות שונות',
      icon: '🌍',
      points: 500,
      isUnlocked: false
    }
  ]

  useEffect(() => {
    if (currentScene && isPlaying) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentScene, isPlaying])

  const startVRScene = (scene: VRScene) => {
    setCurrentScene(scene)
    setIsVRMode(true)
    setIsPlaying(true)
    setTimeLeft(scene.duration)
    setCurrentObjective(0)
    setScore(0)
  }

  const startARScene = (scene: VRScene) => {
    setCurrentScene(scene)
    setIsARMode(true)
    setIsPlaying(true)
    setTimeLeft(scene.duration)
    setCurrentObjective(0)
    setScore(0)
  }

  const completeObjective = () => {
    if (!currentScene) return

    const newScore = score + 25
    setScore(newScore)
    
    if (currentObjective < currentScene.objectives.length - 1) {
      setCurrentObjective(prev => prev + 1)
    } else {
      // השלמת הסצנה
      setIsPlaying(false)
      setShowAchievements(true)
      
      // עדכון סטטיסטיקות
      setPlayerStats(prev => ({
        ...prev,
        xp: prev.xp + newScore,
        totalLessons: prev.totalLessons + 1,
        streak: prev.streak + 1
      }))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'hard': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* כותרת */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            למידה ב-VR ו-AR
          </h1>
          <p className="text-gray-300 text-lg">
            חווה שפות בסביבות אמיתיות עם טכנולוגיה מתקדמת
          </p>
        </motion.div>

        {/* סטטיסטיקות שחקן */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{playerStats.level}</div>
            <div className="text-sm text-gray-400">רמה</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{playerStats.xp}</div>
            <div className="text-sm text-gray-400">נקודות XP</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{playerStats.streak}</div>
            <div className="text-sm text-gray-400">רצף ימים</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{playerStats.accuracy}%</div>
            <div className="text-sm text-gray-400">דיוק</div>
          </div>
        </motion.div>

        {!currentScene ? (
          /* בחירת סצנה */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vrScenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{scene.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{scene.description}</p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-sm text-gray-400">שפה:</span>
                    <span className="text-sm text-white">{scene.language.toUpperCase()}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(scene.difficulty)}`}>
                      {scene.difficulty === 'easy' ? 'קל' :
                       scene.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="text-white font-medium">מטרות:</h4>
                  {scene.objectives.map((objective, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">{objective}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="text-white font-medium">פרסים:</h4>
                  {scene.rewards.map((reward, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">{reward}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => startVRScene(scene)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    VR
                  </button>
                  <button
                    onClick={() => startARScene(scene)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    AR
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* משחק פעיל */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* פאנל משחק */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{currentScene.name}</h2>
                  <p className="text-gray-300">{currentScene.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{score}</div>
                    <div className="text-sm text-gray-400">נקודות</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{formatTime(timeLeft)}</div>
                    <div className="text-sm text-gray-400">זמן</div>
                  </div>
                </div>
              </div>

              {/* אזור VR/AR */}
              <div className="relative bg-black rounded-xl overflow-hidden mb-6 h-96">
                {isVRMode && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-white text-lg">מצב VR פעיל</p>
                      <p className="text-gray-400">השתמש במשקפי VR שלך</p>
                    </div>
                  </div>
                )}
                
                {isARMode && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <p className="text-white text-lg">מצב AR פעיל</p>
                      <p className="text-gray-400">הצב את המצלמה על הסביבה</p>
                    </div>
                  </div>
                )}

                {/* וידאו AR */}
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className={`w-full h-full object-cover ${isARMode ? 'block' : 'hidden'}`}
                />
              </div>

              {/* מטרה נוכחית */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <h3 className="text-white font-medium mb-2">מטרה נוכחית:</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{currentObjective + 1}</span>
                  </div>
                  <p className="text-white">
                    {currentScene.objectives[currentObjective]}
                  </p>
                </div>
              </div>

              {/* כפתורי פעולה */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'השהה' : 'המשך'}
                  </button>
                  
                  <button
                    onClick={completeObjective}
                    className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    השלם מטרה
                  </button>
                  
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
                    } text-white`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                    {isRecording ? 'עצור הקלטה' : 'הקלט'}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setCurrentScene(null)
                    setIsVRMode(false)
                    setIsARMode(false)
                    setIsPlaying(false)
                  }}
                  className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  יציאה
                </button>
              </div>
            </motion.div>

            {/* פאנל צדדי */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* התקדמות */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-medium mb-3">התקדמות</h3>
                <div className="space-y-2">
                  {currentScene.objectives.map((objective, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      {idx <= currentObjective ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />
                      )}
                      <span className={`text-sm ${idx <= currentObjective ? 'text-white' : 'text-gray-400'}`}>
                        {objective}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* הישגים */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-medium mb-3">הישגים</h3>
                <div className="space-y-2">
                  {achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-2">
                      <span className="text-lg">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className={`text-sm ${achievement.isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                          {achievement.name}
                        </p>
                        <p className="text-xs text-gray-500">{achievement.points} נקודות</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* הגדרות */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-medium mb-3">הגדרות</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">איכות VR</span>
                    <select 
                      aria-label="בחר איכות VR"
                      className="bg-transparent text-white text-sm border-none outline-none"
                    >
                      <option>גבוהה</option>
                      <option>בינונית</option>
                      <option>נמוכה</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">רעש רקע</span>
                    <button 
                      aria-label="החלף רעש רקע"
                      className="w-8 h-4 bg-blue-500 rounded-full relative"
                    >
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* מודל הישגים */}
        <AnimatePresence>
          {showAchievements && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full mx-4"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">כל הכבוד!</h2>
                  <p className="text-gray-300 mb-6">השלמת את הסצנה בהצלחה</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">נקודות:</span>
                      <span className="text-white font-bold">+{score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">XP:</span>
                      <span className="text-white font-bold">+{score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">זמן:</span>
                      <span className="text-white font-bold">{formatTime(currentScene?.duration || 0 - timeLeft)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowAchievements(false)
                      setCurrentScene(null)
                      setIsVRMode(false)
                      setIsARMode(false)
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors"
                  >
                    המשך
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
