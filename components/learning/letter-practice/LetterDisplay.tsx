'use client'

import { Card, CardContent } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Volume2, VolumeX } from 'lucide-react'
import { LetterData } from './types'

interface LetterDisplayProps {
  letter: LetterData
  showStrokeOrder: boolean
  canvasRef: React.RefObject<HTMLCanvasElement>
  audioRef: React.RefObject<HTMLAudioElement>
  soundEnabled: boolean
  onToggleSound: () => void
}

export function LetterDisplay({
  letter,
  showStrokeOrder,
  canvasRef,
  audioRef,
  soundEnabled,
  onToggleSound
}: LetterDisplayProps) {

  const playAudio = () => {
    if (audioRef.current && letter.audioUrl) {
      audioRef.current.src = letter.audioUrl
      audioRef.current.play()
    }
  }

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        {/* Letter Display */}
        <div className="text-center mb-6">
          <div className="text-8xl font-bold mb-4 text-primary">
            {letter.letter}
          </div>

          {/* Sound Controls */}
          <div className="flex justify-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSound}
              className="flex items-center gap-2"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={playAudio}
              disabled={!soundEnabled || !letter.audioUrl}
              className="flex items-center gap-2"
            >
              🔊
              Play Sound
            </Button>
          </div>
        </div>

        {/* Letter Information */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Letter Name</h3>
            <p className="text-muted-foreground">{letter.name}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Pronunciation</h3>
            <p className="text-muted-foreground">{letter.pronunciation}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Examples</h3>
            <div className="flex flex-wrap gap-2">
              {letter.examples.map((example, index) => (
                <span key={index} className="px-3 py-1 bg-secondary rounded-full text-sm">
                  {example}
                </span>
              ))}
            </div>
          </div>

          {/* Stroke Order Canvas */}
          {showStrokeOrder && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Stroke Order</h3>
              <canvas
                ref={canvasRef}
                width={200}
                height={200}
                className="border border-gray-300 rounded-lg mx-auto block"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

