'use client'

import React, { useState, useEffect } from 'react'
import { Brain, Clock, Target, Star, Zap, BookOpen, Eye, Ear, Hand, RefreshCw, CheckCircle, XCircle } from 'lucide-react'

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

interface MemoryPalace {
  id: string
  name: string
  description: string
  rooms: MemoryRoom[]
  totalWords: number
  masteredWords: number
}

interface MemoryRoom {
  id: string
  name: string
  description: string
  image: string
  words: MemoryCard[]
  position: { x: number; y: number }
}

export function MemoryTechniques() {
  const [activeTechnique, setActiveTechnique] = useState<'spaced-repetition' | 'memory-palace' | 'mnemonics'>('spaced-repetition')
  const [currentCard, setCurrentCard] = useState<MemoryCard | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [memoryPalaces, setMemoryPalaces] = useState<MemoryPalace[]>([])
  const [selectedPalace, setSelectedPalace] = useState<MemoryPalace | null>(null)

  // Sample data
  const sampleCards: MemoryCard[] = [
    {
      id: '1',
      word: 'שלום',
      translation: 'Hello',
      mnemonic: 'שלום = שלום עליכם (peace be upon you)',
      difficulty: 1,
      lastReviewed: null,
      nextReview: null,
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5
    },
    {
      id: '2',
      word: 'תודה',
      translation: 'Thank you',
      mnemonic: 'תודה = תודה רבה (thank you very much)',
      difficulty: 1,
      lastReviewed: null,
      nextReview: null,
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5
    },
    {
      id: '3',
      word: 'בית',
      translation: 'House',
      mnemonic: 'בית = בית ספר (school house)',
      difficulty: 2,
      lastReviewed: null,
      nextReview: null,
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5
    }
  ]

  const samplePalaces: MemoryPalace[] = [
    {
      id: '1',
      name: 'הבית שלי',
      description: 'ארמון זיכרון של הבית שלי',
      totalWords: 20,
      masteredWords: 8,
      rooms: [
        {
          id: '1',
          name: 'סלון',
          description: 'החדר הראשי בבית',
          image: '/images/living-room.jpg',
          position: { x: 50, y: 50 },
          words: sampleCards.slice(0, 2)
        },
        {
          id: '2',
          name: 'מטבח',
          description: 'המקום שבו מכינים אוכל',
          image: '/images/kitchen.jpg',
          position: { x: 150, y: 50 },
          words: sampleCards.slice(2, 3)
        }
      ]
    }
  ]

  useEffect(() => {
    setMemoryPalaces(samplePalaces)
    setSelectedPalace(samplePalaces[0])
    setCurrentCard(sampleCards[0])
  }, [])

  const getNextCard = () => {
    const now = new Date()
    const dueCards = sampleCards.filter(card => 
      !card.nextReview || new Date(card.nextReview) <= now
    )
    
    if (dueCards.length > 0) {
      setCurrentCard(dueCards[0])
    } else {
      setCurrentCard(sampleCards[0])
    }
    setShowAnswer(false)
    setUserAnswer('')
    setIsCorrect(null)
  }

  const reviewCard = (quality: number) => {
    if (!currentCard) return

    const card = { ...currentCard }
    
    // Spaced Repetition Algorithm (SM-2)
    if (quality >= 3) {
      if (card.repetitions === 0) {
        card.interval = 1
      } else if (card.repetitions === 1) {
        card.interval = 6
      } else {
        card.interval = Math.round(card.interval * card.easeFactor)
      }
      card.repetitions += 1
    } else {
      card.repetitions = 0
      card.interval = 1
    }

    // Update ease factor
    card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    
    // Set next review date
    card.nextReview = new Date(Date.now() + card.interval * 24 * 60 * 60 * 1000)
    card.lastReviewed = new Date()

    setCurrentCard(card)
    getNextCard()
  }

  const checkAnswer = () => {
    if (!currentCard) return
    
    const correct = userAnswer.toLowerCase().trim() === currentCard.translation.toLowerCase().trim()
    setIsCorrect(correct)
    setShowAnswer(true)
  }

  const getTechniqueIcon = (technique: string) => {
    switch (technique) {
      case 'spaced-repetition': return <Clock className="w-5 h-5" />
      case 'memory-palace': return <Eye className="w-5 h-5" />
      case 'mnemonics': return <Brain className="w-5 h-5" />
      default: return <Brain className="w-5 h-5" />
    }
  }

  const getLearningStyleIcon = (style: string) => {
    switch (style) {
      case 'visual': return <Eye className="w-4 h-4" />
      case 'auditory': return <Ear className="w-4 h-4" />
      case 'kinesthetic': return <Hand className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
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

      {/* Technique Selector */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'spaced-repetition', name: 'Spaced Repetition', description: 'חזרה במרווחים' },
          { id: 'memory-palace', name: 'Memory Palace', description: 'ארמון זיכרון' },
          { id: 'mnemonics', name: 'Mnemonics', description: 'אסוציאציות' }
        ].map((technique) => (
          <button
            key={technique.id}
            onClick={() => setActiveTechnique(technique.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTechnique === technique.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            {getTechniqueIcon(technique.id)}
            <div className="text-left">
              <div className="font-semibold">{technique.name}</div>
              <div className="text-sm opacity-75">{technique.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Spaced Repetition */}
      {activeTechnique === 'spaced-repetition' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Clock className="w-6 h-6 text-purple-600" />
              <span>Spaced Repetition</span>
            </h2>
            <p className="text-gray-600 mb-6">
              אלגוריתם מדעי שמתאים את תדירות החזרה לפי רמת הזיכרון שלך
            </p>

            {currentCard && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-purple-800">
                    {currentCard.word}
                  </div>
                  
                  {!showAnswer ? (
                    <div className="space-y-4">
                      <p className="text-gray-600">מה המשמעות של המילה הזו?</p>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="הקלד את התשובה..."
                        className="w-full max-w-md mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                      />
                      <button
                        onClick={checkAnswer}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        בדוק תשובה
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-2xl font-semibold text-green-600">
                        {currentCard.translation}
                      </div>
                      
                      {currentCard.mnemonic && (
                        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                          <div className="font-semibold text-purple-700 mb-2">אסוציאציה:</div>
                          <div className="text-gray-700">{currentCard.mnemonic}</div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                        <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {isCorrect ? 'נכון!' : 'לא נכון'}
                        </span>
                      </div>
                      
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => reviewCard(1)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          קשה (1)
                        </button>
                        <button
                          onClick={() => reviewCard(2)}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          בינוני (2)
                        </button>
                        <button
                          onClick={() => reviewCard(3)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                          טוב (3)
                        </button>
                        <button
                          onClick={() => reviewCard(4)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          קל (4)
                        </button>
                        <button
                          onClick={() => reviewCard(5)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          מושלם (5)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Memory Palace */}
      {activeTechnique === 'memory-palace' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Eye className="w-6 h-6 text-purple-600" />
              <span>Memory Palace</span>
            </h2>
            <p className="text-gray-600 mb-6">
              צור ארמון זיכרון וירטואלי כדי לשמור מילים במקומות מוכרים
            </p>

            {selectedPalace && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    {selectedPalace.name}
                  </h3>
                  <p className="text-purple-700 mb-4">{selectedPalace.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span>{selectedPalace.totalWords} מילים</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{selectedPalace.masteredWords} שולט</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedPalace.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{room.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                      <div className="text-xs text-purple-600">
                        {room.words.length} מילים
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mnemonics */}
      {activeTechnique === 'mnemonics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>Mnemonics - אסוציאציות</span>
            </h2>
            <p className="text-gray-600 mb-6">
              צור אסוציאציות יצירתיות כדי לזכור מילים חדשות
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6"
                >
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-bold text-purple-800">
                      {card.word}
                    </div>
                    <div className="text-lg text-gray-700">
                      {card.translation}
                    </div>
                    {card.mnemonic && (
                      <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                        <div className="font-semibold text-purple-700 mb-2">אסוציאציה:</div>
                        <div className="text-gray-700">{card.mnemonic}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Learning Styles */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <Zap className="w-6 h-6 text-purple-600" />
          <span>סגנונות למידה</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'visual', name: 'ויזואלי', description: 'למידה דרך תמונות וצבעים' },
            { id: 'auditory', name: 'שמיעתי', description: 'למידה דרך צלילים ומוזיקה' },
            { id: 'kinesthetic', name: 'תחושתי', description: 'למידה דרך תנועה ומגע' }
          ].map((style) => (
            <div
              key={style.id}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                {getLearningStyleIcon(style.id)}
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
