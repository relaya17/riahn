'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { BookOpen, CheckCircle, XCircle, RotateCcw, Trophy, Clock, Star } from 'lucide-react'

interface Word {
  id: number
  word: string
  translation: string
  emoji: string
  category: string
}

export default function SpellingGamesPage() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [wordsCompleted, setWordsCompleted] = useState(0)

  const words: Word[] = [
    { id: 1, word: 'cat', translation: 'חתול', emoji: '🐱', category: 'חיות' },
    { id: 2, word: 'dog', translation: 'כלב', emoji: '🐶', category: 'חיות' },
    { id: 3, word: 'house', translation: 'בית', emoji: '🏠', category: 'מקומות' },
    { id: 4, word: 'car', translation: 'מכונית', emoji: '🚗', category: 'כלי רכב' },
    { id: 5, word: 'book', translation: 'ספר', emoji: '📚', category: 'חפצים' },
    { id: 6, word: 'apple', translation: 'תפוח', emoji: '🍎', category: 'פירות' },
    { id: 7, word: 'water', translation: 'מים', emoji: '💧', category: 'טבע' },
    { id: 8, word: 'sun', translation: 'שמש', emoji: '☀️', category: 'טבע' },
    { id: 9, word: 'moon', translation: 'ירח', emoji: '🌙', category: 'טבע' },
    { id: 10, word: 'star', translation: 'כוכב', emoji: '⭐', category: 'טבע' }
  ]

  const [usedWords, setUsedWords] = useState<number[]>([])

  const getRandomWord = () => {
    const availableWords = words.filter(word => !usedWords.includes(word.id))
    if (availableWords.length === 0) {
      setUsedWords([])
      return words[Math.floor(Math.random() * words.length)]
    }
    return availableWords[Math.floor(Math.random() * availableWords.length)]
  }

  const startGame = () => {
    setGameStarted(true)
    setGameEnded(false)
    setScore(0)
    setStreak(0)
    setTimeLeft(60)
    setWordsCompleted(0)
    setUsedWords([])
    setCurrentWord(getRandomWord())
    setUserInput('')
    setFeedback(null)
  }

  const checkAnswer = () => {
    if (!currentWord || !userInput.trim()) return

    const isCorrect = userInput.toLowerCase().trim() === currentWord.word.toLowerCase()
    
    if (isCorrect) {
      setScore(prev => prev + 10 + (streak * 5))
      setStreak(prev => prev + 1)
      setWordsCompleted(prev => prev + 1)
      setFeedback('correct')
    } else {
      setStreak(0)
      setFeedback('incorrect')
    }

    setUsedWords(prev => [...prev, currentWord.id])
    
    setTimeout(() => {
      setCurrentWord(getRandomWord())
      setUserInput('')
      setFeedback(null)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer()
    }
  }

  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameEnded(true)
    }
  }, [gameStarted, gameEnded, timeLeft])

  const getFeedbackColor = () => {
    if (feedback === 'correct') return 'text-green-600 bg-green-100'
    if (feedback === 'incorrect') return 'text-red-600 bg-red-100'
    return 'text-gray-600 bg-gray-100'
  }

  const getFeedbackIcon = () => {
    if (feedback === 'correct') return <CheckCircle className="h-5 w-5" />
    if (feedback === 'incorrect') return <XCircle className="h-5 w-5" />
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            משחקי איות
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            תרגל איות באנגלית עם משחקים מהנים
          </p>
        </div>

        {!gameStarted ? (
          /* Game Start */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <BookOpen className="h-8 w-8 text-emerald-500" />
                  איך לשחק?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-right space-y-2">
                  <p>• תראה תמונה ומילה בעברית</p>
                  <p>• הקלד את המילה באנגלית</p>
                  <p>• זכה נקודות על תשובות נכונות</p>
                  <p>• שמור על רצף לניקוד נוסף</p>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={startGame} className="px-8 py-4 text-lg">
              <Play className="h-6 w-6 mr-2" />
              התחל משחק
            </Button>
          </div>
        ) : (
          /* Game Board */
          <div className="max-w-4xl mx-auto">
            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">זמן</p>
                  <p className="text-lg font-bold">{timeLeft}s</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">ניקוד</p>
                  <p className="text-lg font-bold">{score}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-6 w-6 text-green-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">רצף</p>
                  <p className="text-lg font-bold">{streak}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">הושלמו</p>
                  <p className="text-lg font-bold">{wordsCompleted}</p>
                </CardContent>
              </Card>
            </div>

            {/* Current Word */}
            {currentWord && (
              <Card className="mb-8">
                <CardContent className="p-8 text-center">
                  <div className="text-8xl mb-4">{currentWord.emoji}</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentWord.translation}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {currentWord.category}
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="הקלד את המילה באנגלית..."
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                      autoFocus
                    />
                    
                    {feedback && (
                      <div className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${getFeedbackColor()}`}>
                        {getFeedbackIcon()}
                        <span className="font-medium">
                          {feedback === 'correct' ? 'נכון!' : 'לא נכון'}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Game Controls */}
            <div className="flex justify-center gap-4">
              <Button onClick={checkAnswer} disabled={!userInput.trim()}>
                בדוק תשובה
              </Button>
              <Button variant="outline" onClick={startGame}>
                <RotateCcw className="h-4 w-4 mr-2" />
                משחק חדש
              </Button>
            </div>

            {/* Game Over Modal */}
            {gameEnded && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-md">
                  <CardHeader className="text-center">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl">המשחק הסתיים!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">הניקוד הסופי: {score}</p>
                      <p className="text-gray-600">מילים שהושלמו: {wordsCompleted}</p>
                      <p className="text-gray-600">רצף מקסימלי: {streak}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={startGame} className="flex-1">
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
