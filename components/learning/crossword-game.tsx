'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers'
import { 
  RotateCcw, 
  Trophy, 
  Clock, 
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react'

interface CrosswordCell {
  letter: string
  isGiven: boolean
  isCorrect: boolean
  isSelected: boolean
  wordId: string
  position: number
}

interface CrosswordWord {
  id: string
  word: string
  clue: string
  direction: 'across' | 'down'
  startRow: number
  startCol: number
  isCompleted: boolean
}

interface CrosswordGameProps {
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function CrosswordGame({ language, difficulty }: CrosswordGameProps) {
  const { t } = useLanguage()
  const [grid, setGrid] = useState<CrosswordCell[][]>([])
  const [words, setWords] = useState<CrosswordWord[]>([])
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null)
  const [currentInput, setCurrentInput] = useState('')
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  const GRID_SIZE = 10

  // Generate crossword data based on language and difficulty
  const generateCrossword = () => {
    const crosswordData = getCrosswordData(language, difficulty)
    const newGrid: CrosswordCell[][] = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({
        letter: '',
        isGiven: false,
        isCorrect: false,
        isSelected: false,
        wordId: '',
        position: 0
      }))
    )

    const newWords: CrosswordWord[] = []

    // Place words in grid
    crosswordData.forEach((wordData, index) => {
      const { word, clue, direction, startRow, startCol } = wordData
      const wordId = `word-${index}`
      
      newWords.push({
        id: wordId,
        word,
        clue,
        direction,
        startRow,
        startCol,
        isCompleted: false
      })

      // Place letters in grid
      for (let i = 0; i < word.length; i++) {
        const row = direction === 'across' ? startRow : startRow + i
        const col = direction === 'across' ? startCol + i : startCol
        
        if (row < GRID_SIZE && col < GRID_SIZE) {
          newGrid[row][col] = {
            letter: word[i],
            isGiven: true,
            isCorrect: true,
            isSelected: false,
            wordId,
            position: i
          }
        }
      }
    })

    // Clear some letters for the player to fill
    const newGridWithBlanks = newGrid.map(row => 
      row.map(cell => {
        if (cell.isGiven && Math.random() < 0.6) { // 60% chance to hide letter
          return {
            ...cell,
            letter: '',
            isGiven: false
          }
        }
        return cell
      })
    )

    setGrid(newGridWithBlanks)
    setWords(newWords)
  }

  const getCrosswordData = (lang: string, diff: string) => {
    const crosswordSets = {
      he: {
        beginner: [
          { word: 'בית', clue: 'מקום מגורים', direction: 'across' as const, startRow: 2, startCol: 1 },
          { word: 'אמא', clue: 'אם המשפחה', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'אבא', clue: 'אב המשפחה', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'ילד', clue: 'בן קטן', direction: 'down' as const, startRow: 1, startCol: 4 }
        ],
        intermediate: [
          { word: 'ספר', clue: 'אוסף דפים עם סיפור', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'שמש', clue: 'כוכב שנותן אור', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'מים', clue: 'נוזל שקוף', direction: 'across' as const, startRow: 3, startCol: 1 },
          { word: 'ארץ', clue: 'מקום גדול עם אנשים', direction: 'down' as const, startRow: 1, startCol: 4 }
        ],
        advanced: [
          { word: 'אוניברסיטה', clue: 'מקום לימודים גבוהים', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'טכנולוגיה', clue: 'מדע של מכשירים', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'דמוקרטיה', clue: 'שלטון העם', direction: 'across' as const, startRow: 3, startCol: 1 },
          { word: 'ארכיאולוגיה', clue: 'חקר העבר', direction: 'down' as const, startRow: 1, startCol: 5 }
        ]
      },
      ar: {
        beginner: [
          { word: 'بيت', clue: 'مكان السكن', direction: 'across' as const, startRow: 2, startCol: 1 },
          { word: 'أم', clue: 'والدة العائلة', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'أب', clue: 'والد العائلة', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'ولد', clue: 'ابن صغير', direction: 'down' as const, startRow: 1, startCol: 4 }
        ],
        intermediate: [
          { word: 'كتاب', clue: 'مجموعة أوراق مع قصة', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'شمس', clue: 'نجم يعطي الضوء', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'ماء', clue: 'سائل شفاف', direction: 'across' as const, startRow: 3, startCol: 1 },
          { word: 'أرض', clue: 'مكان كبير مع الناس', direction: 'down' as const, startRow: 1, startCol: 4 }
        ],
        advanced: [
          { word: 'جامعة', clue: 'مكان للدراسة العليا', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'تكنولوجيا', clue: 'علم الأجهزة', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'ديمقراطية', clue: 'حكم الشعب', direction: 'across' as const, startRow: 3, startCol: 1 },
          { word: 'آثار', clue: 'دراسة الماضي', direction: 'down' as const, startRow: 1, startCol: 5 }
        ]
      },
      en: {
        beginner: [
          { word: 'CAT', clue: 'Feline pet', direction: 'across' as const, startRow: 2, startCol: 1 },
          { word: 'DOG', clue: 'Canine pet', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'SUN', clue: 'Bright star', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'MOON', clue: 'Night light', direction: 'down' as const, startRow: 1, startCol: 4 }
        ],
        intermediate: [
          { word: 'COMPUTER', clue: 'Electronic device', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'INTERNET', clue: 'Global network', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'SCIENCE', clue: 'Study of nature', direction: 'across' as const, startRow: 3, startCol: 1 },
          { word: 'TECHNOLOGY', clue: 'Applied science', direction: 'down' as const, startRow: 1, startCol: 5 }
        ],
        advanced: [
          { word: 'PHILOSOPHY', clue: 'Study of wisdom', direction: 'across' as const, startRow: 1, startCol: 1 },
          { word: 'PSYCHOLOGY', clue: 'Study of mind', direction: 'down' as const, startRow: 1, startCol: 2 },
          { word: 'ARCHAEOLOGY', clue: 'Study of past', direction: 'across' as const, startRow: 3, startCol: 1 },
          { word: 'ANTHROPOLOGY', clue: 'Study of humans', direction: 'down' as const, startRow: 1, startCol: 5 }
        ]
      }
    }

    return crosswordSets[lang as keyof typeof crosswordSets]?.[diff as keyof typeof crosswordSets.he] || crosswordSets.he.beginner
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

  const handleCellClick = (row: number, col: number) => {
    const cell = grid[row][col]
    if (cell.isGiven) return

    setSelectedCell({ row, col })
    setCurrentInput(cell.letter)
    setGameStarted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase()
    if (input.length <= 1) {
      setCurrentInput(input)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedCell && currentInput) {
      submitLetter()
    }
  }

  const submitLetter = () => {
    if (!selectedCell || !currentInput) return

    const { row, col } = selectedCell
    const newGrid = [...grid]
    newGrid[row][col] = {
      ...newGrid[row][col],
      letter: currentInput
    }

    setGrid(newGrid)
    setSelectedCell(null)
    setCurrentInput('')

    // Check if word is completed
    checkWordCompletion()
  }

  const checkWordCompletion = () => {
    const newWords = words.map(word => {
      const wordLetters = getWordLetters(word)
      const isCompleted = wordLetters.every(letter => letter !== '')
      return { ...word, isCompleted }
    })

    setWords(newWords)

    // Check if all words are completed
    const allCompleted = newWords.every(word => word.isCompleted)
    if (allCompleted) {
      setGameCompleted(true)
      setGameStarted(false)
    }
  }

  const getWordLetters = (word: CrosswordWord) => {
    const letters: string[] = []
    for (let i = 0; i < word.word.length; i++) {
      const row = word.direction === 'across' ? word.startRow : word.startRow + i
      const col = word.direction === 'across' ? word.startCol + i : word.startCol
      letters.push(grid[row]?.[col]?.letter || '')
    }
    return letters
  }

  const useHint = () => {
    if (hintsUsed >= 3) return

    const incompleteWords = words.filter(word => !word.isCompleted)
    if (incompleteWords.length === 0) return

    const randomWord = incompleteWords[Math.floor(Math.random() * incompleteWords.length)]
    const wordLetters = getWordLetters(randomWord)
    const emptyIndex = wordLetters.findIndex(letter => letter === '')

    if (emptyIndex !== -1) {
      const row = randomWord.direction === 'across' ? randomWord.startRow : randomWord.startRow + emptyIndex
      const col = randomWord.direction === 'across' ? randomWord.startCol + emptyIndex : randomWord.startCol
      
      const newGrid = [...grid]
      newGrid[row][col] = {
        ...newGrid[row][col],
        letter: randomWord.word[emptyIndex]
      }
      setGrid(newGrid)
      setHintsUsed(prev => prev + 1)
    }
  }

  const resetGame = () => {
    generateCrossword()
    setSelectedCell(null)
    setCurrentInput('')
    setTime(0)
    setGameStarted(false)
    setGameCompleted(false)
    setHintsUsed(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Initialize crossword on component mount
  useEffect(() => {
    generateCrossword()
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
            onClick={useHint}
            variant="outline"
            size="sm"
            disabled={hintsUsed >= 3}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            {t('letters.hint')} ({3 - hintsUsed})
          </Button>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-blue-500" />
            <span>{t('letters.wordsCompleted')}: {words.filter(w => w.isCompleted).length}/{words.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-green-500" />
            <span>{t('letters.time')}: {formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>{t('letters.hintsUsed')}: {hintsUsed}/3</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crossword Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        aspect-square border border-gray-300 dark:border-gray-600 
                        flex items-center justify-center text-lg font-bold
                        cursor-pointer transition-all
                        ${cell.isGiven 
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' 
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                        ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : ''
                        }
                        ${cell.isCorrect && cell.letter 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-900 dark:text-white'
                        }
                      `}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell.letter}
                    </div>
                  ))
                )}
              </div>

              {/* Input Field */}
              {selectedCell && (
                <div className="mt-4 text-center">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="w-16 h-16 text-2xl font-bold text-center border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={1}
                    autoFocus
                    title={t('letters.enterLetter')}
                    placeholder="?"
                  />
                  <Button onClick={submitLetter} className="ml-2">
                    {t('letters.submit')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Clues */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">{t('letters.clues')}</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {words.map((word) => (
                  <div
                    key={word.id}
                    className={`p-3 rounded-lg border ${
                      word.isCompleted
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {word.direction === 'across' ? '→' : '↓'}
                      </span>
                      <span className="text-sm font-medium">
                        {word.word.length} {t('letters.letters')}
                      </span>
                      {word.isCompleted && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {word.clue}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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
              {t('letters.crosswordCompleted')}
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{formatTime(time)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.time')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{hintsUsed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.hintsUsed')}
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
              <li>• {t('letters.crosswordInstructions1')}</li>
              <li>• {t('letters.crosswordInstructions2')}</li>
              <li>• {t('letters.crosswordInstructions3')}</li>
              <li>• {t('letters.crosswordInstructions4')}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
