// Types and interfaces for Letter Practice components

export interface LetterData {
  letter: string
  name: string
  pronunciation: string
  strokeOrder: string[]
  examples: string[]
  audioUrl?: string
}

export interface PracticeResult {
  letter: string
  attempts: number
  accuracy: number
  timeSpent: number
  completed: boolean
}

export interface LetterPracticeProps {
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface GameState {
  letters: LetterData[]
  currentLetterIndex: number
  userInput: string
  showStrokeOrder: boolean
  time: number
  gameStarted: boolean
  practiceCompleted: boolean
  results: PracticeResult[]
  streak: number
  totalCorrect: number
  totalAttempts: number
  isListening: boolean
  showResults: boolean
  canvasRef: React.RefObject<HTMLCanvasElement>
  audioRef: React.RefObject<HTMLAudioElement>
}
