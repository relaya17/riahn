'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers'
import { 
  RotateCcw, 
  Trophy, 
  Clock, 
  Target,
  Volume2,
  VolumeX
} from 'lucide-react'

interface MemoryCard {
  id: string
  letter: string
  word: string
  image: string
  isFlipped: boolean
  isMatched: boolean
}

interface MemoryGameProps {
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function MemoryGame({ language, difficulty }: MemoryGameProps) {
  const { t } = useLanguage()
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Generate cards based on language and difficulty
  const generateCards = () => {
    const cardData = getCardData(language, difficulty)
    const shuffledCards = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: `${card.letter}-${index}`,
        isFlipped: false,
        isMatched: false
      }))
    
    setCards(shuffledCards)
  }

  const getCardData = (lang: string, diff: string) => {
    const cardSets = {
      he: {
        beginner: [
          { letter: 'א', word: 'אבא', image: '👨' },
          { letter: 'ב', word: 'בית', image: '🏠' },
          { letter: 'ג', word: 'גמל', image: '🐪' },
          { letter: 'ד', word: 'דג', image: '🐟' },
          { letter: 'ה', word: 'הר', image: '⛰️' },
          { letter: 'ו', word: 'ורד', image: '🌹' }
        ],
        intermediate: [
          { letter: 'ז', word: 'זהב', image: '🥇' },
          { letter: 'ח', word: 'חתול', image: '🐱' },
          { letter: 'ט', word: 'טלפון', image: '📞' },
          { letter: 'י', word: 'יד', image: '✋' },
          { letter: 'כ', word: 'כלב', image: '🐕' },
          { letter: 'ל', word: 'לב', image: '❤️' },
          { letter: 'מ', word: 'מים', image: '💧' },
          { letter: 'נ', word: 'נחש', image: '🐍' }
        ],
        advanced: [
          { letter: 'ס', word: 'ספר', image: '📚' },
          { letter: 'ע', word: 'עין', image: '👁️' },
          { letter: 'פ', word: 'פרח', image: '🌸' },
          { letter: 'צ', word: 'ציפור', image: '🐦' },
          { letter: 'ק', word: 'קרח', image: '🧊' },
          { letter: 'ר', word: 'רכבת', image: '🚂' },
          { letter: 'ש', word: 'שמש', image: '☀️' },
          { letter: 'ת', word: 'תפוח', image: '🍎' }
        ]
      },
      ar: {
        beginner: [
          { letter: 'ا', word: 'أب', image: '👨' },
          { letter: 'ب', word: 'بيت', image: '🏠' },
          { letter: 'ت', word: 'تفاح', image: '🍎' },
          { letter: 'ث', word: 'ثعبان', image: '🐍' },
          { letter: 'ج', word: 'جمل', image: '🐪' },
          { letter: 'ح', word: 'حوت', image: '🐋' }
        ],
        intermediate: [
          { letter: 'خ', word: 'خروف', image: '🐑' },
          { letter: 'د', word: 'دجاج', image: '🐔' },
          { letter: 'ذ', word: 'ذئب', image: '🐺' },
          { letter: 'ر', word: 'رجل', image: '🚶' },
          { letter: 'ز', word: 'زرافة', image: '🦒' },
          { letter: 'س', word: 'سمك', image: '🐟' },
          { letter: 'ش', word: 'شمس', image: '☀️' },
          { letter: 'ص', word: 'صقر', image: '🦅' }
        ],
        advanced: [
          { letter: 'ض', word: 'ضفدع', image: '🐸' },
          { letter: 'ط', word: 'طائر', image: '🐦' },
          { letter: 'ظ', word: 'ظبي', image: '🦌' },
          { letter: 'ع', word: 'عين', image: '👁️' },
          { letter: 'غ', word: 'غزال', image: '🦌' },
          { letter: 'ف', word: 'فيل', image: '🐘' },
          { letter: 'ق', word: 'قمر', image: '🌙' },
          { letter: 'ك', word: 'كتاب', image: '📚' }
        ]
      },
      en: {
        beginner: [
          { letter: 'A', word: 'Apple', image: '🍎' },
          { letter: 'B', word: 'Ball', image: '⚽' },
          { letter: 'C', word: 'Cat', image: '🐱' },
          { letter: 'D', word: 'Dog', image: '🐕' },
          { letter: 'E', word: 'Elephant', image: '🐘' },
          { letter: 'F', word: 'Fish', image: '🐟' }
        ],
        intermediate: [
          { letter: 'G', word: 'Guitar', image: '🎸' },
          { letter: 'H', word: 'House', image: '🏠' },
          { letter: 'I', word: 'Ice', image: '🧊' },
          { letter: 'J', word: 'Jelly', image: '🍮' },
          { letter: 'K', word: 'Kite', image: '🪁' },
          { letter: 'L', word: 'Lion', image: '🦁' },
          { letter: 'M', word: 'Moon', image: '🌙' },
          { letter: 'N', word: 'Nose', image: '👃' }
        ],
        advanced: [
          { letter: 'O', word: 'Orange', image: '🍊' },
          { letter: 'P', word: 'Piano', image: '🎹' },
          { letter: 'Q', word: 'Queen', image: '👑' },
          { letter: 'R', word: 'Rainbow', image: '🌈' },
          { letter: 'S', word: 'Sun', image: '☀️' },
          { letter: 'T', word: 'Tree', image: '🌳' },
          { letter: 'U', word: 'Umbrella', image: '☂️' },
          { letter: 'V', word: 'Violin', image: '🎻' }
        ]
      }
    }

    return cardSets[lang as keyof typeof cardSets]?.[diff as keyof typeof cardSets.he] || cardSets.he.beginner
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameCompleted])

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards
      const firstCard = cards.find(card => card.id === firstId)
      const secondCard = cards.find(card => card.id === secondId)

      if (firstCard && secondCard && firstCard.letter === secondCard.letter) {
        // Match found
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        )
        setFlippedCards([])
        
        // Check if game is completed
        setTimeout(() => {
          const allMatched = cards.every(card => card.isMatched || card.id === firstId || card.id === secondId)
          if (allMatched) {
            setGameCompleted(true)
            setGameStarted(false)
          }
        }, 500)
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              flippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
        }, 1000)
      }
      setMoves(prev => prev + 1)
    }
  }, [flippedCards, cards])

  const handleCardClick = (cardId: string) => {
    if (!gameStarted) {
      setGameStarted(true)
    }

    if (flippedCards.length >= 2) return

    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    setCards(prevCards =>
      prevCards.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    )
    setFlippedCards(prev => [...prev, cardId])

    // Play sound
    if (soundEnabled) {
      playSound()
    }
  }

  const playSound = () => {
    const audio = new Audio('/sounds/card-flip.mp3')
    audio.play().catch(() => {}) // Ignore errors if sound file doesn't exist
  }

  const resetGame = () => {
    generateCards()
    setFlippedCards([])
    setMoves(0)
    setTime(0)
    setGameStarted(false)
    setGameCompleted(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScore = () => {
    if (moves === 0) return 0
    const maxMoves = cards.length
    const timeBonus = Math.max(0, 300 - time) // Bonus for faster completion
    const moveBonus = Math.max(0, maxMoves - moves)
    return Math.max(0, 1000 + timeBonus + moveBonus * 10)
  }

  // Initialize cards on component mount
  useEffect(() => {
    generateCards()
  }, [language, difficulty])

  return (
    <div className="space-y-6">
      {/* Game Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            {t('letters.resetGame')}
          </Button>
          
          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="outline"
            size="sm"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 mr-2" />
            ) : (
              <VolumeX className="h-4 w-4 mr-2" />
            )}
            {soundEnabled ? t('letters.soundOn') : t('letters.soundOff')}
          </Button>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-blue-500" />
            <span>{t('letters.moves')}: {moves}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-green-500" />
            <span>{t('letters.time')}: {formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>{t('letters.score')}: {getScore()}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              card.isFlipped || card.isMatched
                ? 'rotate-y-180'
                : 'hover:shadow-lg'
            } ${card.isMatched ? 'opacity-75' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-4 aspect-square flex items-center justify-center">
              {card.isFlipped || card.isMatched ? (
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.letter}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                    {card.word}
                  </div>
                  <div className="text-2xl">
                    {card.image}
                  </div>
                </div>
              ) : (
                <div className="text-4xl">❓</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Game Completion */}
      {gameCompleted && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('letters.congratulations')}!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('letters.gameCompleted')}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{moves}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.moves')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{formatTime(time)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.time')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{getScore()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.score')}
                </div>
              </div>
            </div>
            <Button onClick={resetGame} className="mt-4">
              {t('letters.playAgain')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {!gameStarted && (
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t('letters.howToPlay')}:
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• {t('letters.memoryInstructions1')}</li>
              <li>• {t('letters.memoryInstructions2')}</li>
              <li>• {t('letters.memoryInstructions3')}</li>
              <li>• {t('letters.memoryInstructions4')}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
