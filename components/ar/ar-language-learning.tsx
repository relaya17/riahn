'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Camera, 
  Eye, 
  EyeOff,
  Target,
  Globe,
  BookOpen,
  Zap,
  Award,
  Settings,
  Download,
  Share,
  Star,
  Volume2
} from 'lucide-react'

interface ARObject {
  id: string
  name: string
  hebrewName: string
  englishName: string
  arabicName: string
  category: 'food' | 'transport' | 'building' | 'nature' | 'clothing'
  position: { x: number; y: number; z: number }
  scale: number
  model: string
  pronunciation: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface ARSession {
  id: string
  startTime: Date
  objectsFound: string[]
  score: number
  timeSpent: number
  language: string
  mode: 'explore' | 'quiz' | 'story'
}

export function ARLanguageLearning() {
  const [isARActive, setIsARActive] = useState(false)
  const [currentSession, setCurrentSession] = useState<ARSession | null>(null)
  const [detectedObjects, setDetectedObjects] = useState<ARObject[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('he')
  const [arMode, setArMode] = useState<'explore' | 'quiz' | 'story'>('explore')
  const [cameraPermission, setCameraPermission] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock AR objects data
  const arObjects: ARObject[] = [
    {
      id: '1',
      name: 'apple',
      hebrewName: 'תפוח',
      englishName: 'Apple',
      arabicName: 'تفاحة',
      category: 'food',
      position: { x: 0, y: 0, z: -2 },
      scale: 1,
      model: '🍎',
      pronunciation: 'ta-pu-ach',
      description: 'פרי מתוק ואדום',
      difficulty: 'beginner'
    },
    {
      id: '2',
      name: 'car',
      hebrewName: 'מכונית',
      englishName: 'Car',
      arabicName: 'سيارة',
      category: 'transport',
      position: { x: 1, y: 0, z: -3 },
      scale: 1.2,
      model: '🚗',
      pronunciation: 'me-cho-nit',
      description: 'כלי רכב עם ארבעה גלגלים',
      difficulty: 'beginner'
    },
    {
      id: '3',
      name: 'building',
      hebrewName: 'בניין',
      englishName: 'Building',
      arabicName: 'مبنى',
      category: 'building',
      position: { x: -1, y: 0, z: -4 },
      scale: 2,
      model: '🏢',
      pronunciation: 'bin-yan',
      description: 'מבנה גבוה עם קומות רבות',
      difficulty: 'intermediate'
    }
  ]

  useEffect(() => {
    checkCameraPermission()
  }, [])

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraPermission(true)
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      setCameraPermission(false)
    }
  }

  const startARSession = async () => {
    if (!cameraPermission) {
      alert('נדרש אישור לשימוש במצלמה')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      
      setIsARActive(true)
      setIsScanning(true)
      
      const session: ARSession = {
        id: Date.now().toString(),
        startTime: new Date(),
        objectsFound: [],
        score: 0,
        timeSpent: 0,
        language: selectedLanguage,
        mode: arMode
      }
      setCurrentSession(session)
      
      // Simulate object detection
      setTimeout(() => {
        simulateObjectDetection()
      }, 2000)
      
    } catch (error) {
      console.error('Error starting AR session:', error)
    }
  }

  const stopARSession = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    setIsARActive(false)
    setIsScanning(false)
    setDetectedObjects([])
  }

  const simulateObjectDetection = () => {
    // Simulate detecting objects in the environment
    const randomObjects = arObjects.slice(0, Math.floor(Math.random() * 3) + 1)
    setDetectedObjects(randomObjects)
    setIsScanning(false)
    
    if (currentSession) {
      setCurrentSession(prev => prev ? {
        ...prev,
        objectsFound: randomObjects.map(obj => obj.id),
        score: prev.score + randomObjects.length * 10
      } : null)
    }
  }

  const speakWord = (word: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = language === 'he' ? 'he-IL' : language === 'ar' ? 'ar-SA' : 'en-US'
      utterance.rate = 0.7
      speechSynthesis.speak(utterance)
    }
  }



  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* AR Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  למידה במציאות רבודה
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  למד שפות על ידי סריקת העולם סביבך
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isARActive ? "destructive" : "default"}
                onClick={isARActive ? stopARSession : startARSession}
                className="flex items-center gap-2"
              >
                {isARActive ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    עצור AR
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    התחל AR
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AR Camera View */}
      {isARActive && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              <span>תצוגת AR</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-96 object-cover rounded-lg"
                autoPlay
                muted
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full ar-canvas"
              />
              
              {/* AR Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="bg-black/50 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>סורק אובייקטים...</span>
                  </div>
                </div>
                <div className="bg-black/50 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{currentSession?.score || 0} נקודות</span>
                  </div>
                </div>
              </div>
              
              {/* Detected Objects Overlay */}
              {detectedObjects.map((obj) => (
                <div
                  key={obj.id}
                  className="absolute bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-lg ar-overlay-item"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{obj.model}</span>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {selectedLanguage === 'he' ? obj.hebrewName :
                         selectedLanguage === 'ar' ? obj.arabicName : obj.englishName}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {obj.pronunciation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => speakWord(
                        selectedLanguage === 'he' ? obj.hebrewName :
                        selectedLanguage === 'ar' ? obj.arabicName : obj.englishName,
                        selectedLanguage
                      )}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(obj.difficulty)}`}>
                      {obj.difficulty === 'beginner' ? 'מתחיל' :
                       obj.difficulty === 'intermediate' ? 'בינוני' : 'מתקדם'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>הגדרות שפה</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { code: 'he', name: 'עברית', flag: '🇮🇱' },
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'ar', name: 'العربية', flag: '🇸🇦' }
              ].map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? 'default' : 'outline'}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="w-full justify-start"
                >
                  <span className="text-lg mr-2">{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>מצב למידה</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'explore', name: 'מחקר', icon: '🔍', description: 'גלה אובייקטים בסביבה' },
                { id: 'quiz', name: 'חידון', icon: '❓', description: 'בדוק את הידע שלך' },
                { id: 'story', name: 'סיפור', icon: '📖', description: 'למד דרך סיפורים' }
              ].map((mode) => (
                <Button
                  key={mode.id}
                  variant={arMode === mode.id ? 'default' : 'outline'}
                  onClick={() => setArMode(mode.id as 'vocabulary' | 'pronunciation' | 'quiz' | 'story')}
                  className="w-full justify-start h-auto p-3"
                >
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{mode.icon}</span>
                      <span className="font-medium">{mode.name}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {mode.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>סטטיסטיקות</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentSession ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">נקודות:</span>
                  <span className="font-semibold">{currentSession.score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">אובייקטים נמצאו:</span>
                  <span className="font-semibold">{currentSession.objectsFound.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">זמן:</span>
                  <span className="font-semibold">
                    {Math.floor((Date.now() - currentSession.startTime.getTime()) / 1000)}s
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  התחל מושב AR כדי לראות סטטיסטיקות
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detected Objects List */}
      {detectedObjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>אובייקטים שזוהו</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {detectedObjects.map((obj) => (
                <div key={obj.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{obj.model}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {selectedLanguage === 'he' ? obj.hebrewName :
                         selectedLanguage === 'ar' ? obj.arabicName : obj.englishName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {obj.pronunciation}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {obj.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(obj.difficulty)}`}>
                      {obj.difficulty === 'beginner' ? 'מתחיל' :
                       obj.difficulty === 'intermediate' ? 'בינוני' : 'מתקדם'}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => speakWord(
                        selectedLanguage === 'he' ? obj.hebrewName :
                        selectedLanguage === 'ar' ? obj.arabicName : obj.englishName,
                        selectedLanguage
                      )}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          הורד מודלים
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          שתף התקדמות
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          הגדרות מתקדמות
        </Button>
      </div>
    </div>
  )
}
