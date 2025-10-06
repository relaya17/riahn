'use client'

interface ProgressBarProps {
  current: number
  total: number
  time: number
  streak: number
}

export function ProgressBar({ current, total, time, streak }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          Letter {current} of {total}
        </div>
        <div className="text-sm text-muted-foreground">
          Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {streak > 0 && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
            🔥 Streak: {streak} letters in a row!
          </div>
        </div>
      )}
    </div>
  )
}
