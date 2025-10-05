'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ThumbsUp, 
  Reply, 
  MoreVertical,
  Clock,
  User,
  Flag
} from 'lucide-react'
import { ForumReply as ForumReplyType } from '@/types'

interface ForumReplyProps {
  reply: ForumReplyType
  onLike?: (replyId: string) => void
  onReply?: (replyId: string) => void
  onReport?: (replyId: string) => void
  isNested?: boolean
}

export function ForumReply({ 
  reply, 
  onLike, 
  onReply, 
  onReport,
  isNested = false 
}: ForumReplyProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(reply._id)
  }

  const formatDate = (date: Date | undefined) => {
    const actualDate = date || new Date()
    return new Date(actualDate).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className={`${isNested ? 'ml-6 border-l-2 border-blue-200' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                משתמש
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{formatDate(reply.createdAt)}</span>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="p-1">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {reply.content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{reply.likes.length + (isLiked ? 1 : 0)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply?.(reply._id)}
              className="flex items-center gap-1 text-sm text-gray-500"
            >
              <Reply className="h-4 w-4" />
              <span>הגב</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReport?.(reply._id)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
          >
            <Flag className="h-4 w-4" />
            <span>דווח</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
