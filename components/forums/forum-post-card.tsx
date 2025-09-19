'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MessageCircle, 
  ThumbsUp, 
  Share, 
  Bookmark, 
  MoreVertical,
  Clock,
  User,
  Tag,
  Pin,
  Lock,
  Trash2,
  Edit
} from 'lucide-react'
import { ForumPost } from '@/types'

interface ForumPostCardProps {
  post: ForumPost
  onLike?: (postId: string) => void
  onBookmark?: (postId: string) => void
  onShare?: (postId: string) => void
  onReply?: (postId: string) => void
  onDelete?: (postId: string) => void
}

export function ForumPostCard({ 
  post, 
  onLike, 
  onBookmark, 
  onShare, 
  onReply,
  onDelete 
}: ForumPostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(post._id)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.(post._id)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-blue-100 text-blue-800'
      case 'grammar-help': return 'bg-green-100 text-green-800'
      case 'pronunciation': return 'bg-purple-100 text-purple-800'
      case 'culture': return 'bg-orange-100 text-orange-800'
      case 'resources': return 'bg-yellow-100 text-yellow-800'
      case 'success-stories': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return '💬'
      case 'grammar-help': return '📝'
      case 'pronunciation': return '🗣️'
      case 'culture': return '🏛️'
      case 'resources': return '📚'
      case 'success-stories': return '🏆'
      default: return '💭'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {post.isPinned && (
                <Pin className="h-4 w-4 text-blue-500" />
              )}
              {post.isLocked && (
                <Lock className="h-4 w-4 text-gray-500" />
              )}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                {getCategoryIcon(post.category)} {post.category}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
              {post.content}
            </p>
          </div>

          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-[120px]">
                <button
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  onClick={() => {
                    setShowMenu(false)
                    // Add edit functionality here
                  }}
                >
                  <Edit className="h-4 w-4" />
                  ערוך
                </button>
                <button
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  onClick={() => {
                    setShowMenu(false)
                    onDelete?.(post._id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  מחק
                </button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>מחבר</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.replies.length} תגובות</span>
            </div>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes + (isLiked ? 1 : 0)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply?.(post._id)}
              className="flex items-center gap-1 text-gray-500"
            >
              <MessageCircle className="h-4 w-4" />
              <span>הגב</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(post._id)}
              className="flex items-center gap-1 text-gray-500"
            >
              <Share className="h-4 w-4" />
              <span>שתף</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`p-2 ${isBookmarked ? 'text-yellow-600' : 'text-gray-500'}`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
