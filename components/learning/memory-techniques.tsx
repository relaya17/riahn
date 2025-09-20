'use client'

import React, { useState, useEffect } from 'react'
import { Brain, Clock, Eye, BookOpen, Ear, Hand } from 'lucide-react'

/** ----- טיפוסים ----- */
interface MemoryCard {
  id: string
  word: string
  translation: string
  image?: string
  mnemonic?: string
  difficulty: number
  lastReviewed: Date | null
  nextReview: Date | null
  repetitions: number
  interval: number
  easeFactor: number
}

interface MemoryRoom {
  id: string
  name: string
  description: string
  image: string
  words: MemoryCard[]
  position: { x: number; y: number }
}

interface MemoryPalace {
  id: string
  name: string
  description: string
  rooms: MemoryRoom[]
  totalWords: number
  masteredWords: number
}

type Technique = 'spaced-repetition' | 'memory-palace' | 'mnemonics'

/** ----- קומפוננטה ----- */
export function MemoryTechniques() {
  const [activeTechnique, setActiveTechnique] = useState<Technique>('spaced-repetition')
  const [currentCard, setCurrentCard] = useState<MemoryCard | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [memoryPalaces, setMemoryPalaces] = useState<MemoryPalace[]>([])
  const [selectedPalace, setSelectedPalace] = useState<MemoryPalace | null>(null)

  /** ----- דוגמאות ----- */
  const sampleCards: MemoryCard[] = [
    { id: '1', word: 'שלום', translation: 'Hello', mnemonic: 'שלום = שלום עליכם', difficulty: 1, lastReviewed: null, nextReview: null, repetitions: 0, interval: 1, easeFactor: 2.5 },
    { id: '2', word: 'תודה', translation: 'Thank you', mnemonic: 'תודה = תודה רבה', difficulty: 1, lastReviewed: null, nextReview: null, repetitions: 0, interval: 1, easeFactor: 2.5 },
    { id: '3', word: 'בית', translation: 'House', mnemonic: 'בית = בית ספר', difficulty: 2, lastReviewed: null, nextReview: null, repetitions: 0, interval: 1, easeFactor: 2.5 }
  ]

  const samplePalaces: MemoryPalace[] = [
    {
      id: '1',
      name: 'הבית שלי',
      description: 'ארמון זיכרון של הבית שלי',
      totalWords: 20,
      masteredWords: 8,
      rooms: [
        { id: '1', name: 'סלון', description: 'החדר הראשי בבית', image: '/images/living-room.jpg', position: { x: 50, y: 50 }, words: sampleCards.slice(0,2) },
        { id: '2', name: 'מטבח', description: 'המקום שבו מכינים אוכל', image: '/images/kitchen.jpg', position: { x: 150, y: 50 }, words: sampleCards.slice(2,3) }
      ]
    }
  ]

  /** ----- אתחול ----- */
  useEffect(() => {
    setMemoryPalaces(samplePalaces)
    setSelectedPalace(samplePalaces[0])
    setCurrentCard(sampleCards[0])
  }, [])

  /** ----- פונקציות Spaced Repetition ----- */
  const getNextCard = () => {
    const now = new Date()
    const dueCards = sampleCards.filter(card => !card.nextReview || card.nextReview <= now)
    setCurrentCard(dueCards.length > 0 ? dueCards[0] : sampleCards[0])
    setShowAnswer(false)
    setUserAnswer('')
    setIsCorrect(null)
  }

  const reviewCard = (quality: number) => {
    if (!currentCard) return
    const card: MemoryCard = { ...currentCard }

    // עדכון interval ו-repetitions
    if (quality >= 3) {
      card.interval = card.repetitions === 0 ? 1 : card.repetitions === 1 ? 6 : Math.round(card.interval * card.easeFactor)
      card.repetitions += 1
    } else {
      card.repetitions = 0
      card.interval = 1
    }

    // עדכון easeFactor
    card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

    card.lastReviewed = new Date()
    card.nextReview = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000)

    setCurrentCard(card)
    getNextCard()
  }

  /** ----- בדיקה של תשובה ----- */
  const checkAnswer = () => {
    if (!currentCard) return
    const correct = userAnswer.toLowerCase().trim() === currentCard.translation.toLowerCase().trim()
    setIsCorrect(correct)
    setShowAnswer(true)
  }

  /** ----- איקונים ----- */
  const getTechniqueIcon = (technique: Technique) => {
    switch (technique) {
      case 'spaced-repetition': return <Clock className="w-5 h-5" />
      case 'memory-palace': return <Eye className="w-5 h-5" />
      case 'mnemonics': return <Brain className="w-5 h-5" />
    }
  }

  const getLearningStyleIcon = (style: 'visual' | 'auditory' | 'kinesthetic' | 'reading') => {
    switch (style) {
      case 'visual': return <Eye className="w-4 h-4" />
      case 'auditory': return <Ear className="w-4 h-4" />
      case 'kinesthetic': return <Hand className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  /** ----- תצוגה ----- */
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="w-12 h-12 text-purple-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            טכניקות זיכרון מתקדמות
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          שיטות מדעיות מוכחות לשיפור הזיכרון והלמידה
        </p>
      </div>

      {/* Selector */}
      <div className="flex justify-center space-x-4">
        {['spaced-repetition','memory-palace','mnemonics'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTechnique(t as Technique)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTechnique === t ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            {getTechniqueIcon(t as Technique)}
            <span>{t}</span>
          </button>
        ))}
      </div>

      {/* Spaced Repetition */}
      {activeTechnique === 'spaced-repetition' && currentCard && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Clock className="w-6 h-6 text-purple-600" /> Spaced Repetition
          </h2>

          <div className="text-3xl font-bold text-purple-800">{currentCard.word}</div>

          {!showAnswer ? (
            <div className="space-y-4 mt-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer((e.target as HTMLInputElement).value)}
                placeholder="הקלד את התשובה..."
                className="w-full max-w-md mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={e => e.key === 'Enter' && checkAnswer()}
              />
              <button
                onClick={checkAnswer}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                בדוק תשובה
              </button>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              <div className={`text-2xl font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {currentCard.translation}
              </div>
              {currentCard.mnemonic && (
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">{currentCard.mnemonic}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
