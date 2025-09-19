'use client'

import React from 'react'
import { LetterLearning } from '@/components/learning/letter-learning'
import { MemoryGame } from '@/components/learning/memory-game'
import { CrosswordGame } from '@/components/learning/crossword-game'
import { LetterQuiz } from '@/components/learning/letter-quiz'
import { LetterPractice } from '@/components/learning/letter-practice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useLanguage } from '@/components/providers'
import { 
  BookOpen, 
  Brain, 
  Puzzle, 
  HelpCircle, 
  PenTool,
  Trophy,
  Target,
  Clock,
  Star
} from 'lucide-react'

type GameMode = 'learning' | 'memory' | 'crossword' | 'quiz' | 'practice'

export default function LettersPage() {
  const { t } = useLanguage()
  const [currentMode, setCurrentMode] = useState<GameMode>('learning')
  const [selectedLanguage, setSelectedLanguage] = useState('he')
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')

  const gameModes = [
    {
      id: 'learning' as GameMode,
      title: 'למידת אותיות',
      description: 'למד אותיות חדשות עם מורה מדברת',
      icon: BookOpen,
      color: 'bg-blue-500',
      difficulty: 'כל הרמות'
    },
    {
      id: 'memory' as GameMode,
      title: 'משחק זיכרון',
      description: 'זכור את האותיות והמילים',
      icon: Brain,
      color: 'bg-purple-500',
      difficulty: 'בינוני-מתקדם'
    },
    {
      id: 'crossword' as GameMode,
      title: 'תשבץ אותיות',
      description: 'פתור תשבצים עם אותיות',
      icon: Puzzle,
      color: 'bg-green-500',
      difficulty: 'מתקדם'
    },
    {
      id: 'quiz' as GameMode,
      title: 'חידון אותיות',
      description: 'בדוק את הידע שלך',
      icon: HelpCircle,
      color: 'bg-orange-500',
      difficulty: 'כל הרמות'
    },
    {
      id: 'practice' as GameMode,
      title: 'תרגול כתיבה',
      description: 'תרגל כתיבת אותיות',
      icon: PenTool,
      color: 'bg-pink-500',
      difficulty: 'כל הרמות'
    }
  ]

  const languages = [
    { value: 'he', label: 'עברית', flag: '🇮🇱' },
    { value: 'ar', label: 'ערבית', flag: '🇸🇦' },
    { value: 'en', label: 'אנגלית', flag: '🇺🇸' },
    { value: 'es', label: 'ספרדית', flag: '🇪🇸' },
    { value: 'fr', label: 'צרפתית', flag: '🇫🇷' }
  ]

  const difficulties = [
    { value: 'beginner', label: 'מתחיל', color: 'text-green-600' },
    { value: 'intermediate', label: 'בינוני', color: 'text-yellow-600' },
    { value: 'advanced', label: 'מתקדם', color: 'text-red-600' }
  ]

  const renderCurrentGame = () => {
    switch (currentMode) {
      case 'learning':
        return <LetterLearning language={selectedLanguage} difficulty={difficulty} />
      case 'memory':
        return <MemoryGame language={selectedLanguage} difficulty={difficulty} />
      case 'crossword':
        return <CrosswordGame language={selectedLanguage} difficulty={difficulty} />
      case 'quiz':
        return <LetterQuiz language={selectedLanguage} difficulty={difficulty} />
      case 'practice':
        return <LetterPractice language={selectedLanguage} difficulty={difficulty} />
      default:
        return <LetterLearning language={selectedLanguage} difficulty={difficulty} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('letters.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('letters.subtitle')}
          </p>
        </div>

        {/* Language and Difficulty Selection */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('letters.selectLanguage')}:
              </span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                title={t('letters.selectLanguage')}
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('letters.difficulty')}:
              </span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                title={t('letters.difficulty')}
              >
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        </div>

        {/* Game Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {gameModes.map((mode) => {
            const Icon = mode.icon
            const isActive = currentMode === mode.id
            
            return (
              <Card
                key={mode.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isActive ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => setCurrentMode(mode.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${mode.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm">{mode.title}</CardTitle>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {t('letters.difficulty')}: {mode.difficulty}
                    </span>
                    {isActive && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Current Game */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const currentModeData = gameModes.find(mode => mode.id === currentMode)
                  const Icon = currentModeData?.icon || BookOpen
                  return (
                    <>
                      <Icon className="h-5 w-5" />
                      {currentModeData?.title}
                    </>
                  )
                })()}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Target className="h-4 w-4" />
                {languages.find(l => l.value === selectedLanguage)?.flag} {languages.find(l => l.value === selectedLanguage)?.label}
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                {difficulties.find(d => d.value === difficulty)?.label}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderCurrentGame()}
          </CardContent>
        </Card>

        {/* Progress and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('letters.achievements')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">0%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('letters.accuracy')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('letters.timeSpent')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('letters.streak')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}