'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers'
import { 
  RotateCcw, 
  Trophy, 
  Clock, 
  Target,
  Volume2,
  VolumeX,
  CheckCircle,
  XCircle,
  PenTool
} from 'lucide-react'

interface LetterData {
  letter: string
  name: string
  pronunciation: string
  strokeOrder: string[]
  examples: string[]
  audioUrl?: string
}

interface PracticeResult {
  letter: string
  attempts: number
  accuracy: number
  timeSpent: number
  completed: boolean
}

interface LetterPracticeProps {
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function LetterPractice({ language, difficulty }: LetterPracticeProps) {
  const { t } = useLanguage()
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
  // const canvasRef = useRef<HTMLCanvasElement>(null) // Not currently used

  // Generate letters based on language and difficulty
  const generateLetters = () => {
    const letterData = getLetterData(language, difficulty)
    setLetters(letterData)
    setResults(letterData.map(letter => ({
      letter: letter.letter,
      attempts: 0,
      accuracy: 0,
      timeSpent: 0,
      completed: false
    })))
  }

  const getLetterData = (lang: string, diff: string) => {
    const letterSets = {
      he: {
        beginner: [
          {
            letter: 'א',
            name: 'אלף',
            pronunciation: 'alef',
            strokeOrder: ['א'],
            examples: ['אבא', 'אמא', 'ארץ']
          },
          {
            letter: 'ב',
            name: 'בית',
            pronunciation: 'bet',
            strokeOrder: ['ב'],
            examples: ['בית', 'בן', 'בת']
          },
          {
            letter: 'ג',
            name: 'גימל',
            pronunciation: 'gimel',
            strokeOrder: ['ג'],
            examples: ['גמל', 'גן', 'גל']
          },
          {
            letter: 'ד',
            name: 'דלת',
            pronunciation: 'dalet',
            strokeOrder: ['ד'],
            examples: ['דג', 'דלת', 'דרך']
          },
          {
            letter: 'ה',
            name: 'הי',
            pronunciation: 'hey',
            strokeOrder: ['ה'],
            examples: ['הר', 'הב', 'הם']
          }
        ],
        intermediate: [
          {
            letter: 'ו',
            name: 'ויו',
            pronunciation: 'vav',
            strokeOrder: ['ו'],
            examples: ['ורד', 'וילון', 'ויכוח']
          },
          {
            letter: 'ז',
            name: 'זין',
            pronunciation: 'zayin',
            strokeOrder: ['ז'],
            examples: ['זהב', 'זמן', 'זכר']
          },
          {
            letter: 'ח',
            name: 'חית',
            pronunciation: 'chet',
            strokeOrder: ['ח'],
            examples: ['חתול', 'חלון', 'חבר']
          },
          {
            letter: 'ט',
            name: 'טית',
            pronunciation: 'tet',
            strokeOrder: ['ט'],
            examples: ['טלפון', 'טוב', 'טעם']
          },
          {
            letter: 'י',
            name: 'יוד',
            pronunciation: 'yod',
            strokeOrder: ['י'],
            examples: ['יד', 'ים', 'ילד']
          }
        ],
        advanced: [
          {
            letter: 'כ',
            name: 'כף',
            pronunciation: 'kaf',
            strokeOrder: ['כ'],
            examples: ['כלב', 'כתב', 'כסף']
          },
          {
            letter: 'ל',
            name: 'למד',
            pronunciation: 'lamed',
            strokeOrder: ['ל'],
            examples: ['לב', 'לחם', 'למד']
          },
          {
            letter: 'מ',
            name: 'מם',
            pronunciation: 'mem',
            strokeOrder: ['מ'],
            examples: ['מים', 'מלך', 'מקום']
          },
          {
            letter: 'נ',
            name: 'נון',
            pronunciation: 'nun',
            strokeOrder: ['נ'],
            examples: ['נחש', 'נהר', 'נפש']
          },
          {
            letter: 'ס',
            name: 'סמך',
            pronunciation: 'samech',
            strokeOrder: ['ס'],
            examples: ['ספר', 'סוף', 'סדר']
          }
        ]
      },
      ar: {
        beginner: [
          {
            letter: 'ا',
            name: 'ألف',
            pronunciation: 'alif',
            strokeOrder: ['ا'],
            examples: ['أب', 'أم', 'أرض']
          },
          {
            letter: 'ب',
            name: 'باء',
            pronunciation: 'ba',
            strokeOrder: ['ب'],
            examples: ['بيت', 'بنت', 'بحر']
          },
          {
            letter: 'ت',
            name: 'تاء',
            pronunciation: 'ta',
            strokeOrder: ['ت'],
            examples: ['تفاح', 'تلميذ', 'تاجر']
          },
          {
            letter: 'ث',
            name: 'ثاء',
            pronunciation: 'tha',
            strokeOrder: ['ث'],
            examples: ['ثعبان', 'ثمرة', 'ثوب']
          },
          {
            letter: 'ج',
            name: 'جيم',
            pronunciation: 'jim',
            strokeOrder: ['ج'],
            examples: ['جمل', 'جبل', 'جنة']
          }
        ],
        intermediate: [
          {
            letter: 'ح',
            name: 'حاء',
            pronunciation: 'ha',
            strokeOrder: ['ح'],
            examples: ['حوت', 'حجر', 'حقل']
          },
          {
            letter: 'خ',
            name: 'خاء',
            pronunciation: 'kha',
            strokeOrder: ['خ'],
            examples: ['خروف', 'خبز', 'خضار']
          },
          {
            letter: 'د',
            name: 'دال',
            pronunciation: 'dal',
            strokeOrder: ['د'],
            examples: ['دجاج', 'دولار', 'دقيقة']
          },
          {
            letter: 'ذ',
            name: 'ذال',
            pronunciation: 'dhal',
            strokeOrder: ['ذ'],
            examples: ['ذئب', 'ذهب', 'ذرة']
          },
          {
            letter: 'ر',
            name: 'راء',
            pronunciation: 'ra',
            strokeOrder: ['ر'],
            examples: ['رجل', 'رعد', 'رمل']
          }
        ],
        advanced: [
          {
            letter: 'ز',
            name: 'زاي',
            pronunciation: 'zay',
            strokeOrder: ['ز'],
            examples: ['زرافة', 'زهرة', 'زيت']
          },
          {
            letter: 'س',
            name: 'سين',
            pronunciation: 'sin',
            strokeOrder: ['س'],
            examples: ['سمك', 'ساعة', 'سوق']
          },
          {
            letter: 'ش',
            name: 'شين',
            pronunciation: 'shin',
            strokeOrder: ['ش'],
            examples: ['شمس', 'شجرة', 'شهر']
          },
          {
            letter: 'ص',
            name: 'صاد',
            pronunciation: 'sad',
            strokeOrder: ['ص'],
            examples: ['صقر', 'صبر', 'صحة']
          },
          {
            letter: 'ض',
            name: 'ضاد',
            pronunciation: 'dad',
            strokeOrder: ['ض'],
            examples: ['ضفدع', 'ضرس', 'ضغط']
          }
        ]
      },
      en: {
        beginner: [
          {
            letter: 'A',
            name: 'A',
            pronunciation: 'ay',
            strokeOrder: ['A'],
            examples: ['Apple', 'Ant', 'Art']
          },
          {
            letter: 'B',
            name: 'B',
            pronunciation: 'bee',
            strokeOrder: ['B'],
            examples: ['Ball', 'Book', 'Bird']
          },
          {
            letter: 'C',
            name: 'C',
            pronunciation: 'see',
            strokeOrder: ['C'],
            examples: ['Cat', 'Car', 'Cake']
          },
          {
            letter: 'D',
            name: 'D',
            pronunciation: 'dee',
            strokeOrder: ['D'],
            examples: ['Dog', 'Door', 'Duck']
          },
          {
            letter: 'E',
            name: 'E',
            pronunciation: 'ee',
            strokeOrder: ['E'],
            examples: ['Elephant', 'Egg', 'Eye']
          }
        ],
        intermediate: [
          {
            letter: 'F',
            name: 'F',
            pronunciation: 'eff',
            strokeOrder: ['F'],
            examples: ['Fish', 'Flower', 'Fire']
          },
          {
            letter: 'G',
            name: 'G',
            pronunciation: 'jee',
            strokeOrder: ['G'],
            examples: ['Guitar', 'Garden', 'Grape']
          },
          {
            letter: 'H',
            name: 'H',
            pronunciation: 'aitch',
            strokeOrder: ['H'],
            examples: ['House', 'Hat', 'Hand']
          },
          {
            letter: 'I',
            name: 'I',
            pronunciation: 'eye',
            strokeOrder: ['I'],
            examples: ['Ice', 'Island', 'Iron']
          },
          {
            letter: 'J',
            name: 'J',
            pronunciation: 'jay',
            strokeOrder: ['J'],
            examples: ['Jelly', 'Jump', 'Jacket']
          }
        ],
        advanced: [
          {
            letter: 'K',
            name: 'K',
            pronunciation: 'kay',
            strokeOrder: ['K'],
            examples: ['Kite', 'Key', 'King']
          },
          {
            letter: 'L',
            name: 'L',
            pronunciation: 'ell',
            strokeOrder: ['L'],
            examples: ['Lion', 'Light', 'Love']
          },
          {
            letter: 'M',
            name: 'M',
            pronunciation: 'em',
            strokeOrder: ['M'],
            examples: ['Moon', 'Mountain', 'Music']
          },
          {
            letter: 'N',
            name: 'N',
            pronunciation: 'en',
            strokeOrder: ['N'],
            examples: ['Nose', 'Night', 'Nature']
          },
          {
            letter: 'O',
            name: 'O',
            pronunciation: 'oh',
            strokeOrder: ['O'],
            examples: ['Orange', 'Ocean', 'Owl']
          }
        ]
      }
    }

    return letterSets[lang as keyof typeof letterSets]?.[diff as keyof typeof letterSets.he] || letterSets.he.beginner
  }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUserInput(input)
    setGameStarted(true)
  }

  const handleSubmit = () => {
    if (!userInput.trim()) return

    const currentLetter = letters[currentLetterIndex]
    const correct = userInput.trim() === currentLetter.letter
    
    setIsCorrect(correct)
    setShowFeedback(true)
    setCurrentAttempt(prev => prev + 1)

    // Update results
    setResults(prev => prev.map(result => 
      result.letter === currentLetter.letter
        ? {
            ...result,
            attempts: result.attempts + 1,
            accuracy: correct ? 100 : Math.max(0, result.accuracy - 20),
            timeSpent: result.timeSpent + time,
            completed: correct || result.attempts >= 2
          }
        : result
    ))

    // Move to next letter after 2 seconds
    setTimeout(() => {
      if (currentLetterIndex < letters.length - 1) {
        setCurrentLetterIndex(prev => prev + 1)
        setUserInput('')
        setShowFeedback(false)
        setCurrentAttempt(0)
        setTime(0)
      } else {
        setPracticeCompleted(true)
        setGameStarted(false)
      }
    }, 2000)
  }

  const resetPractice = () => {
    generateLetters()
    setCurrentLetterIndex(0)
    setUserInput('')
    setShowFeedback(false)
    setTime(0)
    setGameStarted(false)
    setPracticeCompleted(false)
    setCurrentAttempt(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const playSound = (text: string) => {
    if (soundEnabled) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = language === 'he' ? 'he-IL' : language === 'ar' ? 'ar-SA' : 'en-US'
        speechSynthesis.speak(utterance)
      }
    }
  }

  // Initialize letters on component mount
  useEffect(() => {
    generateLetters()
  }, [language, difficulty])

  if (letters.length === 0) {
    return <div>Loading...</div>
  }

  const currentLetter = letters[currentLetterIndex]
  // const currentResult = results.find(r => r.letter === currentLetter.letter) // Not currently used

  return (
    <div className="space-y-6">
      {/* Game Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button onClick={resetPractice} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            {t('letters.resetGame')}
          </Button>
          
          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="outline"
            size="sm"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 mr-2" />
            ) : (
              <VolumeX className="h-4 w-4 mr-2" />
            )}
            {soundEnabled ? t('letters.soundOn') : t('letters.soundOff')}
          </Button>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-blue-500" />
            <span>{t('letters.letter')} {currentLetterIndex + 1}/{letters.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-green-500" />
            <span>{t('letters.time')}: {formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>{t('letters.attempts')}: {currentAttempt}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 letter-practice-progress"
        />
      </div>

      {/* Practice Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Letter Display */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-center">
              {t('letters.practiceLetter')}
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Large Letter Display */}
            <div className="text-center">
              <div className="text-8xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLetter.letter}
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                {currentLetter.name}
              </div>
              <div className="text-lg text-gray-500 dark:text-gray-500">
                {t('letters.pronunciation')}: {currentLetter.pronunciation}
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {t('letters.examples')}:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentLetter.examples.map((example, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>

            {/* Audio Button */}
            <div className="text-center">
              <Button
                onClick={() => playSound(currentLetter.letter)}
                variant="outline"
                size="sm"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {t('letters.listen')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Practice Input */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-center">
              {t('letters.writeLetter')}
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Field */}
            <div className="text-center">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="w-32 h-32 text-6xl font-bold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={1}
                autoFocus
                disabled={showFeedback}
                title={t('letters.writeLetter')}
                placeholder="?"
              />
            </div>

            {/* Submit Button */}
            {userInput && !showFeedback && (
              <div className="text-center">
                <Button onClick={handleSubmit} size="lg">
                  {t('letters.submit')}
                </Button>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-lg">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className="text-green-600 font-semibold">
                        {t('letters.correct')}!
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-500" />
                      <span className="text-red-600 font-semibold">
                        {t('letters.incorrect')}
                      </span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.correctAnswer')}: {currentLetter.letter}
                </div>
              </div>
            )}

            {/* Stroke Order Toggle */}
            <div className="text-center">
              <Button
                onClick={() => setShowStrokeOrder(!showStrokeOrder)}
                variant="outline"
                size="sm"
              >
                <PenTool className="h-4 w-4 mr-2" />
                {showStrokeOrder ? t('letters.hideStrokeOrder') : t('letters.showStrokeOrder')}
              </Button>
            </div>

            {/* Stroke Order Display */}
            {showStrokeOrder && (
              <div className="text-center">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {t('letters.strokeOrder')}:
                </h4>
                <div className="text-4xl font-bold text-gray-700 dark:text-gray-300">
                  {currentLetter.strokeOrder.join(' → ')}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Practice Completion */}
      {practiceCompleted && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('letters.practiceCompleted')}!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('letters.wellDone')}
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {results.filter(r => r.completed).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.lettersCompleted')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.averageAccuracy')}
                </div>
              </div>
            </div>
            <Button onClick={resetPractice} className="mt-4">
              {t('letters.practiceAgain')}
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
              <li>• {t('letters.practiceInstructions1')}</li>
              <li>• {t('letters.practiceInstructions2')}</li>
              <li>• {t('letters.practiceInstructions3')}</li>
              <li>• {t('letters.practiceInstructions4')}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
