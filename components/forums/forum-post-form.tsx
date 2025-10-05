'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { 
  Send, 
  Image, 
  Link, 
  Tag,
  X
} from 'lucide-react'
import { ForumCategory } from '@/types'

interface ForumPostFormProps {
  onSubmit: (data: ForumPostFormData) => void
  onCancel?: () => void
  initialData?: Partial<ForumPostFormData>
  isEditing?: boolean
}

export interface ForumPostFormData {
  title: string
  content: string
  category: ForumCategory
  tags: string[]
  language: string
}

export function ForumPostForm({ 
  onSubmit, 
  onCancel, 
  initialData,
  isEditing = false 
}: ForumPostFormProps) {
  const [formData, setFormData] = useState<ForumPostFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    category: initialData?.category || 'general',
    tags: initialData?.tags || [],
    language: initialData?.language || 'he'
  })
  
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'general', label: 'כללי' },
    { value: 'grammar-help', label: 'עזרה בדקדוק' },
    { value: 'pronunciation', label: 'הגייה' },
    { value: 'culture', label: 'תרבות' },
    { value: 'resources', label: 'משאבים' },
    { value: 'success-stories', label: 'סיפורי הצלחה' }
  ]

  const languages = [
    { value: 'he', label: 'עברית' },
    { value: 'ar', label: 'ערבית' },
    { value: 'en', label: 'אנגלית' },
    { value: 'si', label: 'סינהלית' },
    { value: 'ta', label: 'טמילית' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{isEditing ? 'עריכת פוסט' : 'פוסט חדש'}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="כותרת"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="כתוב כותרת מעניינת..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                קטגוריה
              </label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ForumCategory })}
                options={categories}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                שפה
              </label>
              <Select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                options={languages}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              תוכן
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="שתף את השאלה או הרעיון שלך..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              תגיות
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="הוסף תגית..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
                size="sm"
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-blue-600"
                      aria-label={`הסר תגית ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Image className="h-4 w-4" />
                תמונה
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Link className="h-4 w-4" />
                קישור
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                >
                  ביטול
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                className="flex items-center gap-1"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'שולח...' : (isEditing ? 'עדכן' : 'פרסם')}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
