'use client'

import React, { useState, useEffect } from 'react'
import { Brain, Target, TrendingUp, Clock, BookOpen, Users, Award, ChevronRight, Zap } from 'lucide-react'
import { AdvancedCard } from '@/components/ui/advanced-card'
import { ProgressRing } from '@/components/ui/progress-ring'
import { AnimatedCounter } from '@/components/ui/animated-counter'

// Helper function for progress bar width
const getProgressWidth = (percentage: number) => ({ width: `${percentage}%` })

interface LearningGoal {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  prerequisites: string[]
  skills: string[]
}

interface UserProfile {
  currentLevel: string
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  strengths: string[]
  weaknesses: string[]
  interests: string[]
  timeAvailable: number
  goals: string[]
}

interface LearningPath {
  id: string
  title: string
  description: string
  totalDuration: number
  difficulty: string
  goals: LearningGoal[]
  progress: number
  nextStep: LearningGoal | null
  personalizedFor: UserProfile
}

export function AILearningPath() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    currentLevel: 'beginner',
    learningStyle: 'visual',
    strengths: ['vocabulary', 'listening'],
    weaknesses: ['grammar', 'speaking'],
    interests: ['travel', 'business', 'culture'],
    timeAvailable: 30,
    goals: ['conversation', 'business']
  })

  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const generatePersonalizedPath = async () => {
    setIsGenerating(true)
    
    // סימולציה של AI שיוצר מסלול אישי
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newPath: LearningPath = {
      id: 'path-1',
      title: 'מסלול למידה אישי שלך',
      description: 'מסלול מותאם אישית לפי הפרופיל שלך',
      totalDuration: 120,
      difficulty: userProfile.currentLevel,
      progress: 0,
      personalizedFor: userProfile,
      goals: [
        {
          id: 'goal-1',
          title: 'יסודות השפה',
          description: 'לימוד אוצר מילים בסיסי ודקדוק',
          difficulty: 'beginner',
          estimatedTime: 20,
          prerequisites: [],
          skills: ['vocabulary', 'grammar', 'pronunciation']
        },
        {
          id: 'goal-2',
          title: 'שיחות יומיומיות',
          description: 'תרגול שיחות בסיסיות בחיי היומיום',
          difficulty: 'beginner',
          estimatedTime: 25,
          prerequisites: ['goal-1'],
          skills: ['conversation', 'listening', 'speaking']
        },
        {
          id: 'goal-3',
          title: 'שפה עסקית',
          description: 'לימוד ביטויים ומונחים עסקיים',
          difficulty: 'intermediate',
          estimatedTime: 30,
          prerequisites: ['goal-2'],
          skills: ['business-vocabulary', 'formal-conversation', 'presentation']
        },
        {
          id: 'goal-4',
          title: 'תרבות ומנהגים',
          description: 'הכרת התרבות והמנהגים המקומיים',
          difficulty: 'intermediate',
          estimatedTime: 25,
          prerequisites: ['goal-3'],
          skills: ['cultural-awareness', 'idioms', 'social-conversation']
        },
        {
          id: 'goal-5',
          title: 'שליטה מלאה',
          description: 'הגעה לרמת שפת אם',
          difficulty: 'advanced',
          estimatedTime: 20,
          prerequisites: ['goal-4'],
          skills: ['fluency', 'accent', 'cultural-immersion']
        }
      ],
      nextStep: null
    }
    
    newPath.nextStep = newPath.goals[0]
    setLearningPath(newPath)
    setIsGenerating(false)
  }

  const completeGoal = (goalId: string) => {
    if (!learningPath) return
    
    const updatedPath = { ...learningPath }
    const goalIndex = updatedPath.goals.findIndex(g => g.id === goalId)
    
    if (goalIndex !== -1) {
      updatedPath.progress = ((goalIndex + 1) / updatedPath.goals.length) * 100
      updatedPath.nextStep = updatedPath.goals[goalIndex + 1] || null
      setLearningPath(updatedPath)
      setCurrentStep(goalIndex + 1)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLearningStyleIcon = (style: string) => {
    switch (style) {
      case 'visual': return '👁️'
      case 'auditory': return '👂'
      case 'kinesthetic': return '✋'
      case 'reading': return '📖'
      default: return '🧠'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Learning Path
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          מסלול למידה אישי שנוצר על ידי AI מתקדם, מותאם בדיוק עבורך
        </p>
      </div>

      {/* User Profile */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <Users className="w-6 h-6 text-blue-600" />
          <span>הפרופיל שלך</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">רמה נוכחית</h3>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {userProfile.currentLevel}
            </span>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">סגנון למידה</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getLearningStyleIcon(userProfile.learningStyle)}</span>
              <span className="capitalize">{userProfile.learningStyle}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">זמן זמין</h3>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span>{userProfile.timeAvailable} דקות ביום</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Path Button */}
      {!learningPath && (
        <div className="text-center">
          <button
            onClick={generatePersonalizedPath}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>יוצר מסלול אישי...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>צור מסלול למידה אישי</span>
              </div>
            )}
          </button>
        </div>
      )}

      {/* Learning Path */}
      {learningPath && (
        <div className="space-y-6">
          {/* Path Overview */}
          <AdvancedCard
            title={learningPath.title}
            variant="gradient"
            size="lg"
            hover={false}
            glow={true}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {learningPath.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      {learningPath.totalDuration} דקות
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">
                      {learningPath.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-6">
                <ProgressRing
                  progress={learningPath.progress}
                  size={100}
                  strokeWidth={8}
                  color="#3b82f6"
                  showPercentage={true}
                />
              </div>
            </div>
          </AdvancedCard>

          {/* Next Step */}
          {learningPath.nextStep && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold">הצעד הבא שלך</h3>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  {learningPath.nextStep.title}
                </h4>
                <p className="text-blue-700 mb-3">{learningPath.nextStep.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-blue-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{learningPath.nextStep.estimatedTime} דקות</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(learningPath.nextStep.difficulty)}`}>
                    {learningPath.nextStep.difficulty}
                  </span>
                </div>
                
                <button
                  onClick={() => completeGoal(learningPath.nextStep!.id)}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  התחל עכשיו
                </button>
              </div>
            </div>
          )}

          {/* All Goals */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span>כל המטרות במסלול</span>
            </h3>
            
            <div className="grid gap-4">
              {learningPath.goals.map((goal, index) => (
                <div
                  key={goal.id}
                  className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                    index <= currentStep ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < currentStep ? 'bg-green-500 text-white' : 
                        index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index < currentStep ? <Award className="w-4 h-4" /> : index + 1}
                      </div>
                      <h4 className="text-lg font-semibold">{goal.title}</h4>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(goal.difficulty)}`}>
                        {goal.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{goal.estimatedTime} דקות</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {goal.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {index === currentStep && (
                    <button
                      onClick={() => completeGoal(goal.id)}
                      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>התחל</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
