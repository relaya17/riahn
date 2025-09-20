'use client'

import React, { useState, useEffect } from 'react'
import { Brain, Activity, Zap, Eye, Ear, Hand, BookOpen, Clock, Target, TrendingUp, BarChart3, Cpu, Wifi, WifiOff } from 'lucide-react'

interface BrainActivity {
  timestamp: Date
  alpha: number
  beta: number
  theta: number
  delta: number
  gamma: number
  attention: number
  meditation: number
  focus: number
}

interface LearningStyle {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  characteristics: string[]
  optimalConditions: string[]
  brainWaves: {
    dominant: string
    secondary: string
  }
}

interface CognitiveLoad {
  intrinsic: number
  extraneous: number
  germane: number
  total: number
  optimal: boolean
}

interface LearningSession {
  id: string
  startTime: Date
  endTime?: Date
  duration: number
  brainActivity: BrainActivity[]
  cognitiveLoad: CognitiveLoad
  performance: number
  retention: number
  optimalTime: boolean
  recommendations: string[]
}

export function BrainLearningOptimizer() {
  const [brainActivity, setBrainActivity] = useState<BrainActivity | null>(null)
  const [learningStyle, setLearningStyle] = useState<LearningStyle | null>(null)
  const [cognitiveLoad, setCognitiveLoad] = useState<CognitiveLoad | null>(null)
  const [activeTab, setActiveTab] = useState<'monitor' | 'analysis' | 'optimization' | 'sessions'>('monitor')
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [learningSessions, setLearningSessions] = useState<LearningSession[]>([])
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null)

  const learningStyles: LearningStyle[] = [
    {
      id: 'visual',
      name: 'למידה ויזואלית',
      description: 'לומדים טוב יותר דרך תמונות, גרפים ודיאגרמות',
      icon: Eye,
      color: 'blue',
      characteristics: ['זוכרים תמונות טוב יותר', 'אוהבים מפות מנטליות', 'מעדיפים צבעים ואיורים'],
      optimalConditions: ['תמונות ברורות', 'גרפים וטבלאות', 'צבעים שונים', 'מבנה ויזואלי'],
      brainWaves: { dominant: 'alpha', secondary: 'beta' }
    },
    {
      id: 'auditory',
      name: 'למידה שמיעתית',
      description: 'לומדים טוב יותר דרך צלילים ומוזיקה',
      icon: Ear,
      color: 'green',
      characteristics: ['זוכרים צלילים טוב יותר', 'אוהבים מוזיקה ברקע', 'מעדיפים דיונים'],
      optimalConditions: ['מוזיקה מרגיעה', 'דיונים קבוצתיים', 'הקלטות אודיו', 'סביבה שקטה'],
      brainWaves: { dominant: 'theta', secondary: 'alpha' }
    },
    {
      id: 'kinesthetic',
      name: 'למידה תנועתית',
      description: 'לומדים טוב יותר דרך תנועה ומגע',
      icon: Hand,
      color: 'purple',
      characteristics: ['צריכים לזוז בזמן למידה', 'אוהבים פעילות פיזית', 'מעדיפים ניסויים'],
      optimalConditions: ['תנועה קבועה', 'פעילות פיזית', 'ניסויים מעשיים', 'הפסקות תכופות'],
      brainWaves: { dominant: 'beta', secondary: 'gamma' }
    },
    {
      id: 'reading',
      name: 'למידה קריאה',
      description: 'לומדים טוב יותר דרך קריאה וכתיבה',
      icon: BookOpen,
      color: 'orange',
      characteristics: ['אוהבים לקרוא', 'כותבים הערות', 'מעדיפים טקסט'],
      optimalConditions: ['טקסט ברור', 'הערות מפורטות', 'סביבה שקטה', 'זמן לקריאה'],
      brainWaves: { dominant: 'beta', secondary: 'alpha' }
    }
  ]

  const sampleBrainActivity: BrainActivity = {
    timestamp: new Date(),
    alpha: 0.65,
    beta: 0.45,
    theta: 0.35,
    delta: 0.15,
    gamma: 0.25,
    attention: 0.75,
    meditation: 0.60,
    focus: 0.70
  }

  const sampleCognitiveLoad: CognitiveLoad = {
    intrinsic: 0.6,
    extraneous: 0.3,
    germane: 0.4,
    total: 1.3,
    optimal: true
  }

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate brain activity monitoring
        const newActivity = {
          ...sampleBrainActivity,
          timestamp: new Date(),
          alpha: Math.random() * 0.4 + 0.5,
          beta: Math.random() * 0.3 + 0.3,
          theta: Math.random() * 0.2 + 0.2,
          delta: Math.random() * 0.1 + 0.1,
          gamma: Math.random() * 0.2 + 0.2,
          attention: Math.random() * 0.3 + 0.6,
          meditation: Math.random() * 0.3 + 0.5,
          focus: Math.random() * 0.3 + 0.6
        }
        setBrainActivity(newActivity)
        
        // Update cognitive load
        const newCognitiveLoad = {
          intrinsic: Math.random() * 0.3 + 0.4,
          extraneous: Math.random() * 0.2 + 0.2,
          germane: Math.random() * 0.3 + 0.3,
          total: 0,
          optimal: true
        }
        newCognitiveLoad.total = newCognitiveLoad.intrinsic + newCognitiveLoad.extraneous + newCognitiveLoad.germane
        newCognitiveLoad.optimal = newCognitiveLoad.total < 1.5
        setCognitiveLoad(newCognitiveLoad)
        
        // Detect learning style based on brain waves
        detectLearningStyle(newActivity)
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const detectLearningStyle = (activity: BrainActivity) => {
    // Simple learning style detection based on brain wave patterns
    if (activity.alpha > 0.6 && activity.beta > 0.4) {
      setLearningStyle(learningStyles[0]) // Visual
    } else if (activity.theta > 0.4 && activity.alpha > 0.5) {
      setLearningStyle(learningStyles[1]) // Auditory
    } else if (activity.beta > 0.5 && activity.gamma > 0.3) {
      setLearningStyle(learningStyles[2]) // Kinesthetic
    } else if (activity.beta > 0.4 && activity.alpha > 0.4) {
      setLearningStyle(learningStyles[3]) // Reading
    }
  }

  const startMonitoring = () => {
    setIsMonitoring(true)
    const newSession: LearningSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      duration: 0,
      brainActivity: [],
      cognitiveLoad: sampleCognitiveLoad,
      performance: 0,
      retention: 0,
      optimalTime: true,
      recommendations: []
    }
    setCurrentSession(newSession)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        endTime: new Date(),
        duration: Math.floor((new Date().getTime() - currentSession.startTime.getTime()) / 1000 / 60),
        performance: Math.random() * 40 + 60,
        retention: Math.random() * 30 + 70,
        recommendations: generateRecommendations()
      }
      setLearningSessions(prev => [completedSession, ...prev])
      setCurrentSession(null)
    }
  }

  const generateRecommendations = (): string[] => {
    const recommendations = []
    
    if (brainActivity && brainActivity.attention < 0.5) {
      recommendations.push('רמת הקשב נמוכה - נסה הפסקה קצרה')
    }
    
    if (cognitiveLoad && cognitiveLoad.total > 1.5) {
      recommendations.push('עומס קוגניטיבי גבוה - פשט את החומר')
    }
    
    if (learningStyle) {
      recommendations.push(`התאם את הלמידה לסגנון שלך: ${learningStyle.name}`)
    }
    
    return recommendations
  }

  const getBrainWaveColor = (wave: string) => {
    switch (wave) {
      case 'alpha': return 'text-blue-600'
      case 'beta': return 'text-green-600'
      case 'theta': return 'text-purple-600'
      case 'delta': return 'text-red-600'
      case 'gamma': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'text-green-600'
    if (performance >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="w-12 h-12 text-purple-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Brain Learning Optimizer
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          אופטימיזציה של למידה באמצעות מדעי המוח וזיהוי סגנונות למידה
        </p>
      </div>

      {/* Real-time Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <span>סטטוס בזמן אמת</span>
          </h2>
          
          <div className="flex items-center space-x-4">
            {isMonitoring ? (
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">מנטר</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="font-semibold">לא פעיל</span>
              </div>
            )}
            
            <button
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                isMonitoring
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isMonitoring ? 'עצור ניטור' : 'התחל ניטור'}
            </button>
          </div>
        </div>

        {brainActivity && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(brainActivity.attention * 100)}%
              </div>
              <div className="text-sm text-gray-600">קשב</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(brainActivity.focus * 100)}%
              </div>
              <div className="text-sm text-gray-600">ריכוז</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(brainActivity.meditation * 100)}%
              </div>
              <div className="text-sm text-gray-600">רגיעה</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {cognitiveLoad ? Math.round(cognitiveLoad.total * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">עומס קוגניטיבי</div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'monitor', name: 'ניטור', icon: Activity },
          { id: 'analysis', name: 'ניתוח', icon: BarChart3 },
          { id: 'optimization', name: 'אופטימיזציה', icon: Target },
          { id: 'sessions', name: 'מפגשים', icon: Clock }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'monitor' | 'analysis' | 'optimization' | 'sessions')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Monitor Tab */}
      {activeTab === 'monitor' && (
        <div className="space-y-6">
          {brainActivity && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brain Waves */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>גלי מוח</span>
                </h3>
                
                <div className="space-y-4">
                  {[
                    { name: 'Alpha', value: brainActivity.alpha, description: 'רגיעה וערנות' },
                    { name: 'Beta', value: brainActivity.beta, description: 'ריכוז ופעילות' },
                    { name: 'Theta', value: brainActivity.theta, description: 'יצירתיות וחלימה' },
                    { name: 'Delta', value: brainActivity.delta, description: 'שינה עמוקה' },
                    { name: 'Gamma', value: brainActivity.gamma, description: 'תפיסה גבוהה' }
                  ].map((wave) => (
                    <div key={wave.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">{wave.name}</span>
                        <span className="text-sm text-gray-600">{wave.description}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getBrainWaveColor(wave.name.toLowerCase())}`}
                          data-width={`${wave.value * 100}%`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cognitive Load */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  <span>עומס קוגניטיבי</span>
                </h3>
                
                {cognitiveLoad && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">עומס פנימי</span>
                        <span>{Math.round(cognitiveLoad.intrinsic * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          data-width={`${cognitiveLoad.intrinsic * 100}%`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">עומס חיצוני</span>
                        <span>{Math.round(cognitiveLoad.extraneous * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full transition-all duration-300"
                          data-width={`${cognitiveLoad.extraneous * 100}%`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">עומס רלוונטי</span>
                        <span>{Math.round(cognitiveLoad.germane * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          data-width={`${cognitiveLoad.germane * 100}%`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${cognitiveLoad.optimal ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <div className={`font-semibold ${cognitiveLoad.optimal ? 'text-green-800' : 'text-red-800'}`}>
                        {cognitiveLoad.optimal ? 'עומס אופטימלי' : 'עומס גבוה מדי'}
                      </div>
                      <div className={`text-sm ${cognitiveLoad.optimal ? 'text-green-600' : 'text-red-600'}`}>
                        {cognitiveLoad.optimal ? 'המוח יכול לעבד את המידע ביעילות' : 'נדרש להפחית את העומס'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {learningStyle && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <learningStyle.icon className={`w-5 h-5 text-${learningStyle.color}-600`} />
                <span>סגנון למידה זוהה</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{learningStyle.name}</h4>
                  <p className="text-gray-600">{learningStyle.description}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">מאפיינים:</h5>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {learningStyle.characteristics.map((char, index) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">תנאים אופטימליים:</h5>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {learningStyle.optimalConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">גלי מוח דומיננטיים:</h5>
                  <div className="flex space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getBrainWaveColor(learningStyle.brainWaves.dominant)}`}>
                      {learningStyle.brainWaves.dominant.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getBrainWaveColor(learningStyle.brainWaves.secondary)}`}>
                      {learningStyle.brainWaves.secondary.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Optimization Tab */}
      {activeTab === 'optimization' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>המלצות אופטימיזציה</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningStyles.map((style) => (
                <div key={style.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <style.icon className={`w-6 h-6 text-${style.color}-600`} />
                    <h4 className="font-semibold text-gray-800">{style.name}</h4>
                  </div>
                  
                  <div className="space-y-2">
                    {style.optimalConditions.slice(0, 3).map((condition, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 rounded px-2 py-1">
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>מפגשי למידה</span>
            </h3>
            
            <div className="space-y-4">
              {learningSessions.map((session) => (
                <div key={session.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        מפגש {session.startTime.toLocaleDateString('he-IL')}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {session.duration} דקות • {session.startTime.toLocaleTimeString('he-IL')}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getPerformanceColor(session.performance)}`}>
                        {Math.round(session.performance)}%
                      </div>
                      <div className="text-sm text-gray-600">ביצועים</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-600">זמן אופטימלי</div>
                      <div className={`font-semibold ${session.optimalTime ? 'text-green-600' : 'text-red-600'}`}>
                        {session.optimalTime ? 'כן' : 'לא'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">שמירה</div>
                      <div className="font-semibold text-blue-600">{Math.round(session.retention)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">עומס</div>
                      <div className={`font-semibold ${session.cognitiveLoad.optimal ? 'text-green-600' : 'text-red-600'}`}>
                        {session.cognitiveLoad.optimal ? 'אופטימלי' : 'גבוה'}
                      </div>
                    </div>
                  </div>
                  
                  {session.recommendations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h5 className="font-semibold text-gray-700 mb-2">המלצות:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {session.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              
              {learningSessions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>אין מפגשי למידה עדיין</p>
                  <p className="text-sm">התחל ניטור כדי לראות נתונים</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
