'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/components/providers'
import { getLetterData } from './letterData'
import { LetterData, PracticeResult, GameState } from './types'
import { LetterDisplay } from './LetterDisplay'
import { PracticeControls } from './PracticeControls'
import { ProgressBar } from './ProgressBar'
import { ResultsSummary } from './ResultsSummary'

export function LetterPracticeGame({ language, difficulty }: { language: string; difficulty: string }) {
  const { t } = useLanguage()

  // Game state
  const [letters, setLetters] = useState<LetterData[]>([])
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showStrokeOrder, setShowStrokeOrder] = useState(false)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [results, setResults] = useState<PracticeResult[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Initialize letters
  useEffect(() => {
    const letterData = getLetterData(language, difficulty)
    setLetters(letterData)
    setResults(letterData.map(letter => ({
      letter: letter.letter,
      attempts: 0,
      accuracy: 0,
      timeSpent: 0,
      completed: false
    })))
  }, [language, difficulty])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !practiceCompleted) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, practiceCompleted])

  const currentLetter = letters[currentLetterIndex]
  const currentResult = results[currentLetterIndex]

  const checkAnswer = () => {
    if (!currentLetter || !userInput.trim()) return

    const isAnswerCorrect = userInput.trim().toLowerCase() === currentLetter.name.toLowerCase()
    setIsCorrect(isAnswerCorrect)
    setShowFeedback(true)
    setCurrentAttempt(prev => prev + 1)

    if (isAnswerCorrect) {
      setStreak(prev => prev + 1)
      setTotalCorrect(prev => prev + 1)
    } else {
      setStreak(0)
    }

    setTotalAttempts(prev => prev + 1)

    // Update results
    setResults(prev => prev.map((result, index) =>
      index === currentLetterIndex
        ? {
            ...result,
            attempts: result.attempts + 1,
            accuracy: isAnswerCorrect ? 100 : Math.max(0, result.accuracy - 20),
            timeSpent: result.timeSpent + time,
            completed: isAnswerCorrect || result.completed
          }
        : result
    ))

    // Auto advance after feedback
    setTimeout(() => {
      setShowFeedback(false)
      setUserInput('')

      if (isAnswerCorrect && currentLetterIndex < letters.length - 1) {
        setCurrentLetterIndex(prev => prev + 1)
        setCurrentAttempt(0)
      } else if (currentLetterIndex >= letters.length - 1) {
        setPracticeCompleted(true)
        setShowResults(true)
      }
    }, 2000)
  }

  const nextLetter = () => {
    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex(prev => prev + 1)
      setCurrentAttempt(0)
      setUserInput('')
      setShowFeedback(false)
      setIsCorrect(false)
    }
  }

  const previousLetter = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1)
      setCurrentAttempt(0)
      setUserInput('')
      setShowFeedback(false)
      setIsCorrect(false)
    }
  }

  const restartPractice = () => {
    setCurrentLetterIndex(0)
    setCurrentAttempt(0)
    setUserInput('')
    setShowFeedback(false)
    setIsCorrect(false)
    setTime(0)
    setGameStarted(false)
    setPracticeCompleted(false)
    setShowResults(false)
    setStreak(0)
    setTotalCorrect(0)
    setTotalAttempts(0)

    // Reset results
    setResults(letters.map(letter => ({
      letter: letter.letter,
      attempts: 0,
      accuracy: 0,
      timeSpent: 0,
      completed: false
    })))
  }

  const startGame = () => {
    setGameStarted(true)
    setTime(0)
  }

  if (!currentLetter) {
    return <div>Loading...</div>
  }

  if (showResults && practiceCompleted) {
    return (
      <ResultsSummary
        results={results}
        totalTime={time}
        totalCorrect={totalCorrect}
        totalAttempts={totalAttempts}
        onRestart={restartPractice}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <ProgressBar
          current={currentLetterIndex + 1}
          total={letters.length}
          time={time}
          streak={streak}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LetterDisplay
          letter={currentLetter}
          showStrokeOrder={showStrokeOrder}
          canvasRef={canvasRef}
          audioRef={audioRef}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />

        <PracticeControls
          userInput={userInput}
          onInputChange={setUserInput}
          onCheckAnswer={checkAnswer}
          onNext={nextLetter}
          onPrevious={previousLetter}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          gameStarted={gameStarted}
          onStartGame={startGame}
          currentAttempt={currentAttempt}
          currentResult={currentResult}
          onToggleStrokeOrder={() => setShowStrokeOrder(!showStrokeOrder)}
          onRestart={restartPractice}
        />
      </div>
    </div>
  )
}
