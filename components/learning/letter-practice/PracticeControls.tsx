'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Badge } from '@/components/core/badge'
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Play,
  Eye
} from 'lucide-react'
import { PracticeResult } from './types'

interface PracticeControlsProps {
  userInput: string
  onInputChange: (value: string) => void
  onCheckAnswer: () => void
  onNext: () => void
  onPrevious: () => void
  showFeedback: boolean
  isCorrect: boolean
  gameStarted: boolean
  onStartGame: () => void
  currentAttempt: number
  currentResult: PracticeResult | undefined
  onToggleStrokeOrder: () => void
  onRestart: () => void
}

export function PracticeControls({
  userInput,
  onInputChange,
  onCheckAnswer,
  onNext,
  onPrevious,
  showFeedback,
  isCorrect,
  gameStarted,
  onStartGame,
  currentAttempt,
  currentResult,
  onToggleStrokeOrder,
  onRestart
}: PracticeControlsProps) {

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onCheckAnswer()
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Practice Controls</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleStrokeOrder}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Stroke Order
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Game Status */}
        {!gameStarted ? (
          <div className="text-center py-8">
            <Button onClick={onStartGame} size="lg" className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Practice
            </Button>
          </div>
        ) : (
          <>
            {/* Input Area */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={userInput}
                  onChange={(e) => onInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter the letter name..."
                  disabled={showFeedback}
                  className="flex-1"
                />
                <Button
                  onClick={onCheckAnswer}
                  disabled={!userInput.trim() || showFeedback}
                  className="px-6"
                >
                  Check
                </Button>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`p-3 rounded-lg text-center ${
                  isCorrect
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {isCorrect ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Correct! Well done!
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Try again!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {currentResult?.attempts || 0}
                </div>
                <div className="text-sm text-muted-foreground">Attempts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {currentResult?.accuracy || 0}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentAttempt > 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Badge variant="secondary">
                Letter {currentAttempt + 1}
              </Badge>

              <Button
                variant="outline"
                onClick={onNext}
                disabled={currentAttempt === 0}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onRestart}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

