'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Clock, 
  Star, 
  BookOpen, 
  CheckCircle,
  Heart,
  Share
} from 'lucide-react'
import { Lesson } from '@/types'

interface LessonCardProps {
  lesson: Lesson
  onStart?: (lessonId: string) => void
  onSave?: (lessonId: string) => void
}

export function LessonCard({ lesson, onStart, onSave }: LessonCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.(lesson._id)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'grammar': return '📝'
      case 'vocabulary': return '📚'
      case 'conversation': return '💬'
      case 'pronunciation': return '🗣️'
      case 'culture': return '🏛️'
      case 'business': return '💼'
      default: return '📖'
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{getCategoryIcon(lesson.category)}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(lesson.level)}`}>
                {lesson.level}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {lesson.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {lesson.description}
            </p>
          </div>

          <div className="flex gap-1 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="p-2"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-red-500' : 'text-gray-400'}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <Share className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {lesson.duration} min
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            4.5
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {lesson.content?.length || 0} steps
          </div>
        </div>

        {/* Progress Bar */}
        {lesson.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{lesson.progress}%</span>
            </div>
            <div 
              className="w-full bg-gray-200 rounded-full h-2" 
              role="progressbar" 
              aria-label={`Lesson progress: ${lesson.progress}%`}
            >
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all lesson-progress"
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={() => onStart?.(lesson._id)}
            disabled={false} // Add logic for locked lessons
          >
            {lesson.isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Review
              </>
            ) : lesson.progress > 0 ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Continue
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
