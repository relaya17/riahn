'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Brain, RotateCcw, Trophy, Clock, Star, Play, Target } from 'lucide-react'

interface Card {
  id: number
  emoji: string
  name: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryGamesPage() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  const gameSets = [
    {
      id: 'animals',
      title: 'חיות',
      description: 'זהה חיות זהות',
      emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
      difficulty: 'קל'
    },
    {
      id: 'fruits',
      title: 'פירות',
      description: 'זהה פירות זהים',
      emojis: ['🍎', '🍊', '🍌', '🍇', '🍓', '🍑', '🥝', '🍍'],
      difficulty: 'בינוני'
    },
    {
      id: 'vehicles',
      title: 'כלי רכב',
      description: 'זהה כלי רכב זהים',
      emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑'],
      difficulty: 'קשה'
    }
  ]

  const [selectedSet, setSelectedSet] = useState(gameSets[0])

  const initializeGame = () => {
    const gameCards: Card[] = []
    const emojis = [...selectedSet.emojis, ...selectedSet.emojis]
    
    // Shuffle cards
    for (let i = emojis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [emojis[i], emojis[j]] = [emojis[j], emojis[i]]
    }

    emojis.forEach((emoji, index) => {
      gameCards.push({
        id: index,
        emoji,
        name: selectedSet.title,
        isFlipped: false,
        isMatched: false
      })
    })

    setCards(gameCards)
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
    setTime(0)
    setGameStarted(true)
    setGameCompleted(false)
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ))

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      setTimeout(() => {
        const [first, second] = newFlippedCards
        const firstCard = cards[first]
        const secondCard = cards[second]

        if (firstCard.emoji === secondCard.emoji) {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true, isFlipped: false }
              : card
          ))
          setMatches(prev => prev + 1)
        } else {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ))
        }
        setFlippedCards([])
      }, 1000)
    }
  }

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const timer = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameCompleted])

  useEffect(() => {
    if (matches === selectedSet.emojis.length) {
      setGameCompleted(true)
    }
  }, [matches, selectedSet.emojis.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScore = () => {
    if (time === 0) return 0
    return Math.max(0, 1000 - (moves * 10) - (time * 2))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            משחקי זיכרון
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            תרגל את הזיכרון שלך עם משחקים מהנים
          </p>
        </div>

        {!gameStarted ? (
          /* Game Selection */
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {gameSets.map((set) => (
                <Card 
                  key={set.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedSet.id === set.id ? 'ring-2 ring-emerald-500' : ''
                  }`}
                  onClick={() => setSelectedSet(set)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{set.emojis[0]}</span>
                      {set.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {set.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-600">
                        {set.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        {set.emojis.length} זוגות
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={initializeGame}
                className="px-8 py-4 text-lg"
              >
                <Play className="h-6 w-6 mr-2" />
                התחל משחק
              </Button>
            </div>
          </div>
        ) : (
          /* Game Board */
          <div className="max-w-4xl mx-auto">
            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">זמן</p>
                  <p className="text-lg font-bold">{formatTime(time)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-6 w-6 text-green-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">מהלכים</p>
                  <p className="text-lg font-bold">{moves}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">זוגות</p>
                  <p className="text-lg font-bold">{matches}/{selectedSet.emojis.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">ניקוד</p>
                  <p className="text-lg font-bold">{getScore()}</p>
                </CardContent>
              </Card>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  className={`aspect-square cursor-pointer transition-all duration-300 hover:scale-105 ${
                    card.isFlipped || card.isMatched 
                      ? 'bg-emerald-100 dark:bg-emerald-900' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <CardContent className="p-0 h-full flex items-center justify-center">
                    {card.isFlipped || card.isMatched ? (
                      <span className="text-3xl">{card.emoji}</span>
                    ) : (
                      <span className="text-3xl">❓</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Game Controls */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={initializeGame}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                משחק חדש
              </Button>
            </div>

            {/* Game Completed Modal */}
            {gameCompleted && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-md">
                  <CardHeader className="text-center">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl">כל הכבוד!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      השלמת את המשחק ב-{formatTime(time)} עם {moves} מהלכים!
                    </p>
                    <div className="text-3xl font-bold text-emerald-600">
                      {getScore()} נקודות
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={initializeGame} className="flex-1">
                        משחק חדש
                      </Button>
                      <Button variant="outline" onClick={() => setGameStarted(false)}>
                        חזור לתפריט
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
