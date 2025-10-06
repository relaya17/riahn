'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Badge } from '@/components/core/badge'
import { Trophy, RotateCcw } from 'lucide-react'
import { PracticeResult } from './types'

interface ResultsSummaryProps {
  results: PracticeResult[]
  totalTime: number
  totalCorrect: number
  totalAttempts: number
  onRestart: () => void
}

export function ResultsSummary({
  results,
  totalTime,
  totalCorrect,
  totalAttempts,
  onRestart
}: ResultsSummaryProps) {

  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0
  const completedLetters = results.filter(r => r.completed).length

  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' }
    if (accuracy >= 80) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (accuracy >= 70) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (accuracy >= 60) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const grade = getGrade(accuracy)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full ${grade.bg} flex items-center justify-center`}>
              <Trophy className={`w-8 h-8 ${grade.color}`} />
            </div>
          </div>
          <CardTitle className="text-2xl">Practice Complete!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${grade.color}`}>
                {grade.grade}
              </div>
              <div className="text-sm text-muted-foreground">Grade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {accuracy}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {completedLetters}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          {/* Detailed Results */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Detailed Results</h3>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={result.letter} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {result.letter}
                    </Badge>
                    <div>
                      <div className="font-medium">
                        {result.completed ? (
                          <span className="text-green-600">✓ Completed</span>
                        ) : (
                          <span className="text-red-600">✗ Incomplete</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.attempts} attempts • {result.accuracy}% accuracy
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <Button onClick={onRestart} size="lg" className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Practice Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

