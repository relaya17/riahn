'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  Award,
  Star,
  Target,
  Settings,
  VolumeX,
  Play,
  Speaker
} from 'lucide-react'

interface LetterLearningProps {
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface Letter {
  id: string
  character: string
  name: string
  sound: string
  pronunciation: string
  words: string[]
  examples: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  description: string
  culturalNotes?: string[]
}

interface VoiceTeacher {
  id: string
  name: string
  language: string
  gender: 'male' | 'female'
  age: 'child' | 'adult'
  accent: string
  region: string
  avatar: string
  voice: string
}

interface LearningProgress {
  letterId: string
  attempts: number
  correct: number
  lastAttempt: Date
  mastered: boolean
  streak: number
}

export function LetterLearning({ language, difficulty }: LetterLearningProps) {
  // Use language and difficulty props for filtering if needed
  console.log('Language:', language, 'Difficulty:', difficulty);
  const { t } = useLanguage()
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<VoiceTeacher | null>(null)
  const [progress, setProgress] = useState<LearningProgress[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const [showSettings, setShowSettings] = useState(false)
  
  const recognitionRef = useRef<{ lang: string; continuous: boolean; interimResults: boolean; onstart: () => void; onresult: (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void; onerror: () => void; onend: () => void; start: () => void } | null>(null)

  // Demo letters data
  const letters: Letter[] = [
    {
      id: 'alef',
      character: 'א',
      name: 'אלף',
      sound: 'a',
      pronunciation: 'ah',
      words: ['אבא', 'אמא', 'ארץ', 'אור'],
      examples: ['אבא אוהב אותי', 'אמא מבשלת טעים'],
      difficulty: 'easy',
      category: 'vowels',
      description: 'האות הראשונה באלפבית העברי',
      culturalNotes: ['האות אלף מסמלת התחלה חדשה', 'בגימטריה ערכה 1']
    },
    {
      id: 'bet',
      character: 'ב',
      name: 'בית',
      sound: 'b',
      pronunciation: 'beh',
      words: ['בית', 'בן', 'בת', 'בוקר'],
      examples: ['הבית שלנו יפה', 'הבן שלי חכם'],
      difficulty: 'easy',
      category: 'consonants',
      description: 'האות השנייה באלפבית העברי',
      culturalNotes: ['בית הוא מקום מגורים', 'האות ב יכולה להיות רכה או קשה']
    },
    {
      id: 'gimel',
      character: 'ג',
      name: 'גימל',
      sound: 'g',
      pronunciation: 'geh',
      words: ['גמל', 'גן', 'גל', 'גשם'],
      examples: ['הגמל הולך במדבר', 'הגן מלא פרחים'],
      difficulty: 'medium',
      category: 'consonants',
      description: 'האות השלישית באלפבית העברי',
      culturalNotes: ['גימל מסמלת גמול וטוב', 'האות ג נהגית כמו G באנגלית']
    },
    {
      id: 'dalet',
      character: 'ד',
      name: 'דלת',
      sound: 'd',
      pronunciation: 'deh',
      words: ['דלת', 'דג', 'דרך', 'דבר'],
      examples: ['הדלת פתוחה', 'הדג שוחה במים'],
      difficulty: 'medium',
      category: 'consonants',
      description: 'האות הרביעית באלפבית העברי',
      culturalNotes: ['דלת היא פתח לכניסה', 'האות ד נהגית כמו D באנגלית']
    },
    {
      id: 'he',
      character: 'ה',
      name: 'הי',
      sound: 'h',
      pronunciation: 'heh',
      words: ['הר', 'הבית', 'הדרך', 'השמש'],
      examples: ['ההר גבוה', 'הבית שלנו יפה'],
      difficulty: 'easy',
      category: 'consonants',
      description: 'האות החמישית באלפבית העברי',
      culturalNotes: ['הי משמשת גם כה"א הידיעה', 'האות ה נהגית כמו H באנגלית']
    }
  ]

  // Demo voice teachers
  const teachers: VoiceTeacher[] = [
    {
      id: 'sarah',
      name: 'שרה',
      language: 'he',
      gender: 'female',
      age: 'adult',
      accent: 'israeli',
      region: 'תל אביב',
      avatar: '👩‍🏫',
      voice: 'he-IL'
    },
    {
      id: 'david',
      name: 'דוד',
      language: 'he',
      gender: 'male',
      age: 'adult',
      accent: 'israeli',
      region: 'ירושלים',
      avatar: '👨‍🏫',
      voice: 'he-IL'
    },
    {
      id: 'noa',
      name: 'נועה',
      language: 'he',
      gender: 'female',
      age: 'child',
      accent: 'israeli',
      region: 'חיפה',
      avatar: '👧',
      voice: 'he-IL'
    }
  ]

  useEffect(() => {
    if (letters.length > 0) {
      setCurrentLetter(letters[0])
      setSelectedTeacher(teachers[0])
    }
  }, [])

  useEffect(() => {
    if (currentLetter && selectedTeacher) {
      speakLetter(currentLetter, selectedTeacher)
    }
  }, [currentLetter, selectedTeacher])

  const speakLetter = (letter: Letter, teacher: VoiceTeacher) => {
    if (isMuted) return
    
    const text = `${letter.name}, ${letter.character}, ${letter.sound}`
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = teacher.voice
    utterance.rate = playbackSpeed
    utterance.volume = 0.8
    
    // Try to find a Hebrew voice
    const voices = speechSynthesis.getVoices()
    const hebrewVoice = voices.find(voice => 
      voice.lang.startsWith('he') || voice.lang.startsWith('iw')
    )
    
    if (hebrewVoice) {
      utterance.voice = hebrewVoice
    }
    
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    
    speechSynthesis.speak(utterance)
  }

  const speakWord = (word: string, teacher: VoiceTeacher) => {
    if (isMuted) return
    
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = teacher.voice
    utterance.rate = playbackSpeed
    utterance.volume = 0.8
    
    const voices = speechSynthesis.getVoices()
    const hebrewVoice = voices.find(voice => 
      voice.lang.startsWith('he') || voice.lang.startsWith('iw')
    )
    
    if (hebrewVoice) {
      utterance.voice = hebrewVoice
    }
    
    speechSynthesis.speak(utterance)
  }

  const speakExample = (example: string, teacher: VoiceTeacher) => {
    if (isMuted) return
    
    const utterance = new SpeechSynthesisUtterance(example)
    utterance.lang = teacher.voice
    utterance.rate = playbackSpeed * 0.8 // Slower for examples
    utterance.volume = 0.8
    
    const voices = speechSynthesis.getVoices()
    const hebrewVoice = voices.find(voice => 
      voice.lang.startsWith('he') || voice.lang.startsWith('iw')
    )
    
    if (hebrewVoice) {
      utterance.voice = hebrewVoice
    }
    
    speechSynthesis.speak(utterance)
  }

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition || (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
      recognitionRef.current = new (SpeechRecognition as new () => { lang: string; continuous: boolean; interimResults: boolean; onstart: () => void; onresult: (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void; onerror: () => void; onend: () => void; start: () => void })()
      
      recognitionRef.current.lang = 'he-IL'
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      
      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }
      
      recognitionRef.current.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
        const transcript = event.results[0][0].transcript
        checkPronunciation(transcript)
        setIsListening(false)
      }
      
      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
      
      recognitionRef.current.start()
    }
  }

  const checkPronunciation = (userInput: string) => {
    if (!currentLetter) return
    
    const isCorrect = userInput.toLowerCase().includes(currentLetter.sound.toLowerCase()) ||
                     userInput.includes(currentLetter.character) ||
                     userInput.includes(currentLetter.name)
    
    if (isCorrect) {
      setScore(prev => prev + 10)
      setStreak(prev => prev + 1)
      updateProgress(currentLetter.id, true)
    } else {
      setStreak(0)
      updateProgress(currentLetter.id, false)
    }
  }

  const updateProgress = (letterId: string, isCorrect: boolean) => {
    setProgress(prev => {
      const existing = prev.find(p => p.letterId === letterId)
      if (existing) {
        return prev.map(p => 
          p.letterId === letterId 
            ? { ...p, attempts: p.attempts + 1, correct: p.correct + (isCorrect ? 1 : 0), lastAttempt: new Date(), streak: isCorrect ? p.streak + 1 : 0, mastered: p.correct >= 3 }
            : p
        )
      } else {
        return [...prev, { letterId, attempts: 1, correct: isCorrect ? 1 : 0, lastAttempt: new Date(), mastered: false, streak: isCorrect ? 1 : 0 }]
      }
    })
  }

  const nextLetter = () => {
    if (currentIndex < letters.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setCurrentLetter(letters[currentIndex + 1])
    }
  }

  const previousLetter = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setCurrentLetter(letters[currentIndex - 1])
    }
  }

  const getProgressForLetter = (letterId: string) => {
    return progress.find(p => p.letterId === letterId)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (!currentLetter || !selectedTeacher) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('letters.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('letters.teacher')}: {selectedTeacher.avatar} {selectedTeacher.name}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">{streak}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('letters.voice')}</label>
                  <select
                    value={selectedTeacher.id}
                    onChange={(e) => {
                      const teacher = teachers.find(t => t.id === e.target.value)
                      if (teacher) setSelectedTeacher(teacher)
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={t('letters.voice')}
                  >
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.avatar} {teacher.name} ({teacher.gender === 'male' ? t('letters.male') : t('letters.female')})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('letters.speed')}</label>
                  <select
                    value={playbackSpeed.toString()}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={t('letters.speed')}
                  >
                    <option value="0.5">{t('letters.slow')}</option>
                    <option value="1.0">{t('letters.normal')}</option>
                    <option value="1.5">{t('letters.fast')}</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <span className="text-sm">{isMuted ? t('letters.muted') : t('letters.unmuted')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Learning Area */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {currentLetter.character} - {currentLetter.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentLetter.difficulty)}`}>
                    {t(`letters.${currentLetter.difficulty}`)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} / {letters.length}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Letter Display */}
              <div className="text-center">
                <div className="text-8xl font-bold text-blue-600 mb-4">
                  {currentLetter.character}
                </div>
                <div className="text-2xl text-gray-700 mb-2">
                  {currentLetter.name}
                </div>
                <div className="text-lg text-gray-500 mb-4">
                  {currentLetter.description}
                </div>
                
                {/* Audio Controls */}
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    onClick={() => speakLetter(currentLetter, selectedTeacher)}
                    disabled={isPlaying}
                    className="px-6"
                  >
                    {isPlaying ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="ml-2">{t('letters.listen')}</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={startListening}
                    disabled={isListening}
                  >
                    {isListening ? (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                    <span className="ml-2">{t('letters.repeat')}</span>
                  </Button>
                </div>
              </div>

              {/* Words Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">{t('letters.words')}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentLetter.words.map((word, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => speakWord(word, selectedTeacher)}
                      className="justify-start"
                    >
                      <Speaker className="w-4 h-4 mr-2" />
                      {word}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Examples Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">{t('letters.examples')}</h3>
                <div className="space-y-2">
                  {currentLetter.examples.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => speakExample(example, selectedTeacher)}
                      className="w-full justify-start text-left"
                    >
                      <Speaker className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{example}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Cultural Notes */}
              {currentLetter.culturalNotes && currentLetter.culturalNotes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t('letters.culturalNotes')}</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ul className="space-y-1">
                      {currentLetter.culturalNotes.map((note, index) => (
                        <li key={index} className="text-sm text-blue-800 dark:text-blue-200">
                          • {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={previousLetter}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  {t('letters.previous')}
                </Button>
                
                <Button
                  onClick={nextLetter}
                  disabled={currentIndex === letters.length - 1}
                >
                  {t('letters.next')}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Sidebar */}
        <div className="space-y-4">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('letters.progress')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{t('letters.score')}</span>
                  <span className="font-semibold">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('letters.streak')}</span>
                  <span className="font-semibold">{streak}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('letters.mastered')}</span>
                  <span className="font-semibold">
                    {progress.filter(p => p.mastered).length} / {letters.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Letters List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('letters.alphabet')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {letters.map((letter, index) => {
                  const letterProgress = getProgressForLetter(letter.id)
                  const isCurrent = index === currentIndex
                  
                  return (
                    <button
                      key={letter.id}
                      onClick={() => {
                        setCurrentIndex(index)
                        setCurrentLetter(letter)
                      }}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        isCurrent 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">{letter.character}</span>
                          <div>
                            <div className="font-medium">{letter.name}</div>
                            <div className="text-sm text-gray-500">{letter.sound}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {letterProgress?.mastered && (
                            <Award className="w-4 h-4 text-green-500" />
                          )}
                          {letterProgress && (
                            <span className="text-xs text-gray-500">
                              {letterProgress.correct}/{letterProgress.attempts}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
