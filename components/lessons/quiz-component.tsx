'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowRight,
  RotateCcw
} from 'lucide-react'
import { LessonContent, QuizOption } from '@/types'

interface QuizComponentProps {
  content: LessonContent
  onComplete?: (score: number) => void
  onNext?: () => void
}

export function QuizComponent({ content, onComplete, onNext }: QuizComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds timer

  const handleAnswerSelect = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleSubmit = () => {
    if (!selectedAnswer || !content.options) return

    const correctOption = content.options.find(option => option.isCorrect)
    const selectedOption = content.options.find(option => option.id === selectedAnswer)
    
    const correct = selectedOption?.isCorrect || false
    setIsCorrect(correct)
    setShowResult(true)

    // Calculate score (100 for correct, 0 for incorrect)
    const score = correct ? 100 : 0
    onComplete?.(score)
  }

  const handleRetry = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(30)
  }

  const handleNext = () => {
    onNext?.()
  }

  if (!content.options) {
    return (
      <Card className="p-6">
        <p className="text-red-600">Quiz options not available</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-6">
      {/* Timer */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Quiz Question</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <p className="text-lg text-gray-900">{content.content}</p>
        
        {content.translation && (
          <p className="text-sm text-gray-600 italic">
            Translation: {content.translation}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {content.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option.id)}
            disabled={showResult}
            className={`
              w-full p-4 text-left rounded-lg border-2 transition-all
              ${selectedAnswer === option.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
              ${showResult && option.isCorrect 
                ? 'border-green-500 bg-green-50' 
                : ''
              }
              ${showResult && selectedAnswer === option.id && !option.isCorrect 
                ? 'border-red-500 bg-red-50' 
                : ''
              }
              disabled:cursor-not-allowed
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-gray-900">{option.text}</span>
              </div>
              
              {showResult && (
                <div>
                  {option.isCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {selectedAnswer === option.id && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          
          {!isCorrect && (
            <p className="text-sm text-gray-600">
              The correct answer was: {content.options.find(o => o.isCorrect)?.text}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        {showResult ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRetry}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}


