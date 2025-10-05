'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingPage } from '@/components/ui/loading'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Volume2,
  Heart,
  Share,
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  RotateCcw
} from 'lucide-react'
import { Lesson, QuizOption } from '@/types'

export default function LessonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchLesson(params.id as string)
    }
  }, [params.id])

  const fetchLesson = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/lessons/${id}`)
      const data = await response.json()
      
      if (data.success) {
        setLesson(data.data)
        setProgress(data.data.progress || 0)
        setIsSaved(data.data.savedBy?.includes('current-user-id') || false)
      }
    } catch (error) {
      console.error('Error fetching lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveLesson = async () => {
    if (!lesson) return
    
    try {
      const endpoint = isSaved ? 'unsave' : 'save'
      const response = await fetch(`/api/lessons/${lesson._id}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user-id' })
      })
      
      if (response.ok) {
        setIsSaved(!isSaved)
      }
    } catch (error) {
      console.error('Error saving lesson:', error)
    }
  }

  const handleCompleteLesson = async () => {
    if (!lesson) return
    
    try {
      const response = await fetch(`/api/lessons/${lesson._id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: 'current-user-id',
          timeSpent: 30, // Calculate actual time spent
          score: 95 // Calculate based on exercises
        })
      })
      
      if (response.ok) {
        setLesson((prev: Lesson | null) => prev ? { ...prev, isCompleted: true, progress: 100 } : null)
        setProgress(100)
      }
    } catch (error) {
      console.error('Error completing lesson:', error)
    }
  }

  const handleUpdateProgress = async (newProgress: number) => {
    if (!lesson) return
    
    try {
      const response = await fetch(`/api/lessons/${lesson._id}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: 'current-user-id',
          progress: newProgress,
          timeSpent: 5 // Add time spent for this step
        })
      })
      
      if (response.ok) {
        setProgress(newProgress)
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const nextStep = () => {
    if (!lesson || currentStep >= lesson.content.length - 1) return
    
    const newStep = currentStep + 1
    setCurrentStep(newStep)
    
    // Update progress based on current step
    const newProgress = Math.round(((newStep + 1) / lesson.content.length) * 100)
    handleUpdateProgress(newProgress)
  }

  const prevStep = () => {
    if (currentStep <= 0) return
    setCurrentStep(currentStep - 1)
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (loading) {
    return <LoadingPage />
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson not found</h2>
          <p className="text-gray-600 mb-4">The lesson you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const currentContent = lesson.content[currentStep]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-gray-600">{lesson.description}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveLesson}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-red-500' : ''}`} />
          </Button>
          
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-label={`Lesson progress: ${progress}%`}>
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all lesson-progress"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Step {currentStep + 1} of {lesson.content.length}</span>
          <span>{formatTime(lesson.duration)} remaining</span>
        </div>
      </Card>

      {/* Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            {currentContent && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {currentContent.type === 'text' && 'Reading'}
                    {currentContent.type === 'audio' && 'Listening'}
                    {currentContent.type === 'video' && 'Video'}
                    {currentContent.type === 'quiz' && 'Quiz'}
                    {currentContent.type === 'exercise' && 'Exercise'}
                  </h2>
                  
                  {currentContent.type === 'audio' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  )}
                </div>

                <div className="prose max-w-none">
                  <p>{currentContent.content}</p>
                  
                  {currentContent.translation && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Translation:</p>
                      <p className="text-gray-800">{currentContent.translation}</p>
                    </div>
                  )}

                  {currentContent.type === 'quiz' && currentContent.options && (
                    <div className="mt-4 space-y-2">
                      {currentContent.options.map((option: QuizOption, index: number) => (
                        <Button
                          key={option.id}
                          variant="outline"
                          className="w-full text-left justify-start"
                          onClick={() => {
                            // TODO: Implement quiz answer handling
                            console.log('Quiz answer selected:', option.text)
                          }}
                        >
                          {String.fromCharCode(65 + index)}. {option.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <SkipBack className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep === lesson.content.length - 1 ? (
                <Button onClick={handleCompleteLesson}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Lesson
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  Next
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Lesson Info */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Lesson Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{lesson.duration} minutes</span>
              </div>
              
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-sm capitalize">{lesson.level}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm">{lesson.rating.toFixed(1)} rating</span>
              </div>
            </div>
          </Card>

          {/* Vocabulary */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Key Vocabulary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">שלום</span>
                <span className="text-sm text-gray-600">Hello</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">תודה</span>
                <span className="text-sm text-gray-600">Thank you</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">בבקשה</span>
                <span className="text-sm text-gray-600">Please</span>
              </div>
            </div>
          </Card>

          {/* Tools */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Tools</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Volume2 className="w-4 h-4 mr-2" />
                Audio Settings
              </Button>
              
              <Button variant="outline" size="sm" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart Lesson
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}


