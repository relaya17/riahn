'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers'
import { 
  RotateCcw, 
  Trophy, 
  Clock, 
  Target,
  CheckCircle,
  XCircle,
  Volume2,
  VolumeX
} from 'lucide-react'

interface QuizQuestion {
  id: string
  type: 'letter-to-word' | 'word-to-letter' | 'pronunciation' | 'multiple-choice'
  question: string
  correctAnswer: string
  options?: string[]
  audioUrl?: string
  image?: string
}

interface QuizResult {
  correct: number
  total: number
  time: number
  score: number
}

interface LetterQuizProps {
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function LetterQuiz({ language, difficulty }: LetterQuizProps) {
  const { t } = useLanguage()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [time, setTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [results, setResults] = useState<QuizResult>({ correct: 0, total: 0, time: 0, score: 0 })
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Generate quiz questions based on language and difficulty
  const generateQuestions = () => {
    const questionData = getQuizData(language, difficulty)
    const shuffledQuestions = questionData.sort(() => Math.random() - 0.5).slice(0, 10)
    setQuestions(shuffledQuestions)
  }

  const getQuizData = (lang: string, diff: string) => {
    const quizSets = {
      he: {
        beginner: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'איזו מילה מתחילה באות א?',
            correctAnswer: 'אבא',
            options: ['אבא', 'בית', 'גמל', 'דג']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'באיזו אות מתחילה המילה "בית"?',
            correctAnswer: 'ב',
            options: ['א', 'ב', 'ג', 'ד']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'איך כותבים את המילה "גמל"?',
            correctAnswer: 'גמל',
            options: ['גמל', 'גמאל', 'גמלה', 'גמלי']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'איזו מילה מתחילה באות ד?',
            correctAnswer: 'דג',
            options: ['דג', 'דלת', 'דרך', 'דבר']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'איך מבטאים את האות ה?',
            correctAnswer: 'ה',
            options: ['ה', 'ח', 'כ', 'ק']
          }
        ],
        intermediate: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'איזו מילה מתחילה באות ז?',
            correctAnswer: 'זהב',
            options: ['זהב', 'זמן', 'זכר', 'זרע']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'באיזו אות מתחילה המילה "חתול"?',
            correctAnswer: 'ח',
            options: ['ח', 'כ', 'ה', 'ק']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'איך כותבים את המילה "טלפון"?',
            correctAnswer: 'טלפון',
            options: ['טלפון', 'טלפון', 'טלפון', 'טלפון']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'איזו מילה מתחילה באות י?',
            correctAnswer: 'יד',
            options: ['יד', 'ים', 'ילד', 'יום']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'איך מבטאים את האות כ?',
            correctAnswer: 'כ',
            options: ['כ', 'ח', 'ק', 'ר']
          }
        ],
        advanced: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'איזו מילה מתחילה באות ס?',
            correctAnswer: 'ספר',
            options: ['ספר', 'סוף', 'סדר', 'סוג']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'באיזו אות מתחילה המילה "עין"?',
            correctAnswer: 'ע',
            options: ['ע', 'א', 'ה', 'ח']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'איך כותבים את המילה "פרח"?',
            correctAnswer: 'פרח',
            options: ['פרח', 'פרחח', 'פרחך', 'פרחץ']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'איזו מילה מתחילה באות צ?',
            correctAnswer: 'ציפור',
            options: ['ציפור', 'צדק', 'צבע', 'צל']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'איך מבטאים את האות ק?',
            correctAnswer: 'ק',
            options: ['ק', 'כ', 'ח', 'ר']
          }
        ]
      },
      ar: {
        beginner: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'أي كلمة تبدأ بحرف أ؟',
            correctAnswer: 'أب',
            options: ['أب', 'بيت', 'جمل', 'سمك']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'بأي حرف تبدأ كلمة "بيت"؟',
            correctAnswer: 'ب',
            options: ['أ', 'ب', 'ت', 'ث']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'كيف تكتب كلمة "جمل"؟',
            correctAnswer: 'جمل',
            options: ['جمل', 'جمال', 'جملة', 'جملة']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'أي كلمة تبدأ بحرف د؟',
            correctAnswer: 'دجاج',
            options: ['دجاج', 'دولار', 'دقيقة', 'دواء']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'كيف تنطق حرف ه؟',
            correctAnswer: 'ه',
            options: ['ه', 'ح', 'خ', 'ج']
          }
        ],
        intermediate: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'أي كلمة تبدأ بحرف ز؟',
            correctAnswer: 'زرافة',
            options: ['زرافة', 'زمن', 'زهرة', 'زيت']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'بأي حرف تبدأ كلمة "سمك"؟',
            correctAnswer: 'س',
            options: ['س', 'ش', 'ص', 'ض']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'كيف تكتب كلمة "شمس"؟',
            correctAnswer: 'شمس',
            options: ['شمس', 'شمسة', 'شمسي', 'شمسة']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'أي كلمة تبدأ بحرف ص؟',
            correctAnswer: 'صقر',
            options: ['صقر', 'صبر', 'صحة', 'صوت']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'كيف تنطق حرف ض؟',
            correctAnswer: 'ض',
            options: ['ض', 'د', 'ذ', 'ز']
          }
        ],
        advanced: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'أي كلمة تبدأ بحرف ط؟',
            correctAnswer: 'طائر',
            options: ['طائر', 'طبيب', 'طريق', 'طقس']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'بأي حرف تبدأ كلمة "عين"؟',
            correctAnswer: 'ع',
            options: ['ع', 'أ', 'غ', 'ف']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'كيف تكتب كلمة "فيل"؟',
            correctAnswer: 'فيل',
            options: ['فيل', 'فيلة', 'فيلا', 'فيلو']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'أي كلمة تبدأ بحرف ق؟',
            correctAnswer: 'قمر',
            options: ['قمر', 'قلم', 'قصة', 'قوة']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'كيف تنطق حرف ك؟',
            correctAnswer: 'ك',
            options: ['ك', 'ق', 'ج', 'خ']
          }
        ]
      },
      en: {
        beginner: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'Which word starts with letter A?',
            correctAnswer: 'Apple',
            options: ['Apple', 'Ball', 'Cat', 'Dog']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'Which letter does "Ball" start with?',
            correctAnswer: 'B',
            options: ['A', 'B', 'C', 'D']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'How do you spell "Cat"?',
            correctAnswer: 'Cat',
            options: ['Cat', 'Kat', 'Catt', 'Katt']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'Which word starts with letter D?',
            correctAnswer: 'Dog',
            options: ['Dog', 'Door', 'Duck', 'Doll']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'How do you pronounce letter E?',
            correctAnswer: 'E',
            options: ['E', 'I', 'A', 'O']
          }
        ],
        intermediate: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'Which word starts with letter G?',
            correctAnswer: 'Guitar',
            options: ['Guitar', 'Garden', 'Giraffe', 'Grape']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'Which letter does "House" start with?',
            correctAnswer: 'H',
            options: ['H', 'J', 'K', 'L']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'How do you spell "Ice"?',
            correctAnswer: 'Ice',
            options: ['Ice', 'Ise', 'Aice', 'Aise']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'Which word starts with letter J?',
            correctAnswer: 'Jelly',
            options: ['Jelly', 'Jump', 'Jacket', 'Juice']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'How do you pronounce letter K?',
            correctAnswer: 'K',
            options: ['K', 'C', 'Q', 'X']
          }
        ],
        advanced: [
          {
            id: '1',
            type: 'letter-to-word' as const,
            question: 'Which word starts with letter O?',
            correctAnswer: 'Orange',
            options: ['Orange', 'Ocean', 'Office', 'Oxygen']
          },
          {
            id: '2',
            type: 'word-to-letter' as const,
            question: 'Which letter does "Piano" start with?',
            correctAnswer: 'P',
            options: ['P', 'B', 'D', 'Q']
          },
          {
            id: '3',
            type: 'multiple-choice' as const,
            question: 'How do you spell "Queen"?',
            correctAnswer: 'Queen',
            options: ['Queen', 'Quen', 'Kween', 'Kween']
          },
          {
            id: '4',
            type: 'letter-to-word' as const,
            question: 'Which word starts with letter R?',
            correctAnswer: 'Rainbow',
            options: ['Rainbow', 'River', 'Robot', 'Radio']
          },
          {
            id: '5',
            type: 'pronunciation' as const,
            question: 'How do you pronounce letter S?',
            correctAnswer: 'S',
            options: ['S', 'C', 'Z', 'X']
          }
        ]
      }
    }

    return quizSets[lang as keyof typeof quizSets]?.[diff as keyof typeof quizSets.he] || quizSets.he.beginner
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !quizCompleted) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, quizCompleted])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const currentQuestion = questions[currentQuestionIndex]
    const correct = selectedAnswer === currentQuestion.correctAnswer
    
    setIsCorrect(correct)
    setShowResult(true)
    setGameStarted(true)

    if (correct) {
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }))
    }

    // Move to next question after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer('')
        setShowResult(false)
      } else {
        setQuizCompleted(true)
        setGameStarted(false)
        setResults(prev => ({
          ...prev,
          total: questions.length,
          time,
          score: Math.round((prev.correct / questions.length) * 100)
        }))
      }
    }, 2000)
  }

  const resetQuiz = () => {
    generateQuestions()
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setShowResult(false)
    setTime(0)
    setGameStarted(false)
    setQuizCompleted(false)
    setResults({ correct: 0, total: 0, time: 0, score: 0 })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const playSound = (text: string) => {
    if (soundEnabled) {
      // Use Web Speech API for pronunciation
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = language === 'he' ? 'he-IL' : language === 'ar' ? 'ar-SA' : 'en-US'
        speechSynthesis.speak(utterance)
      }
    }
  }

  // Initialize questions on component mount
  useEffect(() => {
    generateQuestions()
  }, [language, difficulty])

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="space-y-6">
      {/* Game Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button onClick={resetQuiz} variant="outline" size="sm">
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
            <span>{t('letters.question')} {currentQuestionIndex + 1}/{questions.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-green-500" />
            <span>{t('letters.time')}: {formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span>{t('letters.score')}: {results.correct}/{results.total}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 letter-quiz-progress"
        />
      </div>

      {/* Question */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentQuestion.question}
            </h3>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`p-4 h-auto text-lg ${
                    showResult 
                      ? option === currentQuestion.correctAnswer
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : selectedAnswer === option
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'opacity-50'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Submit Button */}
            {selectedAnswer && !showResult && (
              <Button onClick={handleSubmitAnswer} size="lg">
                {t('letters.submit')}
              </Button>
            )}

            {/* Result Display */}
            {showResult && (
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
                      {t('letters.incorrect')}. {t('letters.correctAnswer')}: {currentQuestion.correctAnswer}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Pronunciation Button */}
            {currentQuestion.type === 'pronunciation' && (
              <Button
                onClick={() => playSound(currentQuestion.correctAnswer)}
                variant="outline"
                size="sm"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {t('letters.listen')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Completion */}
      {quizCompleted && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('letters.quizCompleted')}!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('letters.finalScore')}: {results.score}%
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{results.correct}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.correct')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{results.total - results.correct}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.incorrect')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{formatTime(results.time)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('letters.time')}
                </div>
              </div>
            </div>
            <Button onClick={resetQuiz} className="mt-4">
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
              <li>• {t('letters.quizInstructions1')}</li>
              <li>• {t('letters.quizInstructions2')}</li>
              <li>• {t('letters.quizInstructions3')}</li>
              <li>• {t('letters.quizInstructions4')}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
