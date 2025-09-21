'use client'

import React, { useState } from 'react'
import { Brain, Zap, Star, Users, Award } from 'lucide-react'
import { AILearningPath } from '@/components/ai/ai-learning-path'
import { AdvancedRPGSystem } from '@/components/gamification/advanced-rpg-system'

interface AdvancedFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  component: React.ComponentType<unknown>
  color: string
  gradient: string
  isNew: boolean
  rating: number
}

export default function AdvancedPage() {
  const [activeFeature, setActiveFeature] = useState<string>('ai-learning-path')

  const advancedFeatures: AdvancedFeature[] = [
    {
      id: 'ai-learning-path',
      title: 'AI Learning Path',
      description: 'מסלול למידה אישי שנוצר על ידי AI מתקדם',
      icon: Brain,
      component: AILearningPath,
      color: 'blue',
      gradient: 'from-blue-600 to-purple-600',
      isNew: true,
      rating: 5.0
    },
    {
      id: 'rpg-system',
      title: 'RPG System',
      description: 'מערכת RPG מתקדמת עם דמויות ומשימות',
      icon: Award,
      component: AdvancedRPGSystem,
      color: 'yellow',
      gradient: 'from-yellow-600 to-orange-600',
      isNew: true,
      rating: 4.9
    }
  ]

  const getActiveComponent = () => {
    const feature = advancedFeatures.find(f => f.id === activeFeature)
    return feature ? feature.component : AILearningPath
  }

  const ActiveComponent = getActiveComponent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Zap className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Advanced Learning Features
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              תכונות למידה מתקדמות שמביאות את העתיד של למידת השפות להווה
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">תכונות מתקדמות</h2>
              
              <div className="space-y-3">
                {advancedFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-full text-right p-4 rounded-xl transition-all duration-300 ${
                      activeFeature === feature.id
                        ? `bg-gradient-to-r ${feature.gradient} text-white shadow-lg`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <feature.icon className={`w-5 h-5 ${
                        activeFeature === feature.id ? 'text-white' : 'text-gray-600'
                      }`} />
                      {feature.isNew && (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          activeFeature === feature.id
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          חדש
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className={`text-sm ${
                      activeFeature === feature.id ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className={`w-4 h-4 ${
                          activeFeature === feature.id ? 'text-yellow-300' : 'text-yellow-500'
                        } fill-current`} />
                        <span className={`text-sm ${
                          activeFeature === feature.id ? 'text-white' : 'text-gray-600'
                        }`}>
                          {feature.rating}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-4">סטטיסטיקות</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">תכונות פעילות</span>
                    <span className="font-semibold text-blue-600">{advancedFeatures.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">דירוג ממוצע</span>
                    <span className="font-semibold text-green-600">
                      {(advancedFeatures.reduce((sum, f) => sum + f.rating, 0) / advancedFeatures.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">תכונות חדשות</span>
                    <span className="font-semibold text-purple-600">
                      {advancedFeatures.filter(f => f.isNew).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="פתח צ'אט קהילה"
        >
          <Users className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
