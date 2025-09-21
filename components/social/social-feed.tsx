'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Users,
  Globe,
  Star,
  Award,
  BookOpen,
  TrendingUp,
  Filter,
  Search,
  Image,
  Video,
  Mic
} from 'lucide-react'

interface Post {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
    level: string
    isVerified: boolean
  }
  content: string
  type: 'text' | 'lesson' | 'achievement' | 'milestone'
  language: string
  timestamp: Date
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  media?: {
    type: 'image' | 'video'
    url: string
    thumbnail?: string
  }
  lesson?: {
    id: string
    title: string
    progress: number
    difficulty: string
  }
  achievement?: {
    id: string
    title: string
    description: string
    rarity: string
  }
}

interface SocialFeedProps {
  userId?: string
}

export function SocialFeed({ userId: _userId }: SocialFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [filter, setFilter] = useState<'all' | 'following' | 'lessons' | 'achievements'>('all')

  useEffect(() => {
    // Mock posts data
    const mockPosts: Post[] = [
      {
        id: '1',
        author: {
          id: '1',
          name: 'Sarah Johnson',
          level: 'advanced',
          isVerified: true
        },
        content: 'השלמתי היום את השיעור על דקדוק עברי מתקדם! זה היה מאתגר אבל מאוד מעניין. מומלץ לכל מי שלומד עברית! 🎉',
        type: 'lesson',
        language: 'he',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        isBookmarked: false,
        lesson: {
          id: '1',
          title: 'דקדוק עברי מתקדם',
          progress: 100,
          difficulty: 'advanced'
        }
      },
      {
        id: '2',
        author: {
          id: '2',
          name: 'Ahmed Al-Rashid',
          level: 'intermediate',
          isVerified: false
        },
        content: 'הישג חדש! 🏆 השלמתי 30 ימים רצופים של למידה עברית. הרגשה מדהימה!',
        type: 'achievement',
        language: 'he',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 45,
        comments: 12,
        shares: 7,
        isLiked: true,
        isBookmarked: true,
        achievement: {
          id: '1',
          title: 'מלך הרצף',
          description: '30 ימים רצופים של למידה',
          rarity: 'legendary'
        }
      },
      {
        id: '3',
        author: {
          id: '3',
          name: 'Maria Garcia',
          level: 'beginner',
          isVerified: false
        },
        content: 'היום למדתי מילים חדשות בעברית. "שלום" ו"תודה" - המילים הראשונות שלי! 😊',
        type: 'text',
        language: 'he',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 18,
        comments: 5,
        shares: 2,
        isLiked: false,
        isBookmarked: false
      },
      {
        id: '4',
        author: {
          id: '4',
          name: 'David Cohen',
          level: 'expert',
          isVerified: true
        },
        content: 'טיפ ללומדי עברית: נסו לקרוא עיתונים בעברית פשוטה. זה יעזור לכם להבין את השפה הטבעית!',
        type: 'text',
        language: 'he',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        likes: 67,
        comments: 23,
        shares: 15,
        isLiked: true,
        isBookmarked: true
      }
    ]

    setPosts(mockPosts)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  const handleCreatePost = async () => {
    if (!newPost.trim()) return

    setIsCreatingPost(true)
    
    // Simulate API call
    setTimeout(() => {
      const newPostData: Post = {
        id: Date.now().toString(),
        author: {
          id: 'current-user',
          name: 'אתה',
          level: 'intermediate',
          isVerified: false
        },
        content: newPost,
        type: 'text',
        language: 'he',
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false
      }

      setPosts(prev => [newPostData, ...prev])
      setNewPost('')
      setIsCreatingPost(false)
    }, 1000)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'מתחיל'
      case 'intermediate': return 'בינוני'
      case 'advanced': return 'מתקדם'
      case 'expert': return 'מומחה'
      default: return 'לא ידוע'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      case 'rare': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'epic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'legendary': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen
      case 'achievement': return Award
      case 'milestone': return TrendingUp
      default: return MessageCircle
    }
  }

  const filteredPosts = posts.filter(post => {
    switch (filter) {
      case 'following': return true // In real app, filter by following
      case 'lessons': return post.type === 'lesson'
      case 'achievements': return post.type === 'achievement'
      default: return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            פיד חברתי
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            חיפוש
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            מסננים
          </Button>
        </div>
      </div>

      {/* Create Post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              אתה
            </div>
            <div className="flex-1">
              <Input
                placeholder="מה אתה לומד היום?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-3"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim() || isCreatingPost}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {isCreatingPost ? 'מפרסם...' : 'פרסם'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'הכל', icon: Globe },
          { id: 'following', label: 'עוקבים', icon: Users },
          { id: 'lessons', label: 'שיעורים', icon: BookOpen },
          { id: 'achievements', label: 'הישגים', icon: Award }
        ].map((filterOption) => {
          const Icon = filterOption.icon
          return (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption.id as 'all' | 'following' | 'lessons' | 'achievements')}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {filterOption.label}
            </Button>
          )
        })}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const PostIcon = getPostIcon(post.type)
          void PostIcon // Suppress unused variable warning
          
          return (
            <Card key={post.id} className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {post.author.name}
                        </h3>
                        {post.author.isVerified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <Star className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(post.author.level)}`}>
                          {getLevelLabel(post.author.level)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.timestamp.toLocaleDateString('he-IL')} {post.timestamp.toLocaleTimeString('he-IL')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-900 dark:text-white mb-3">
                    {post.content}
                  </p>
                  
                  {/* Lesson Card */}
                  {post.lesson && (
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-900 dark:text-blue-100">
                              {post.lesson.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-blue-700 dark:text-blue-300">
                                {post.lesson.progress}% הושלם
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                post.lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              }`}>
                                {post.lesson.difficulty === 'beginner' ? 'מתחיל' :
                                 post.lesson.difficulty === 'intermediate' ? 'בינוני' : 'מתקדם'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Achievement Card */}
                  {post.achievement && (
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-500 rounded-lg">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
                              {post.achievement.title}
                            </h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              {post.achievement.description}
                            </p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRarityColor(post.achievement.rarity)}`}>
                              {post.achievement.rarity === 'common' ? 'נפוץ' :
                               post.achievement.rarity === 'rare' ? 'נדיר' :
                               post.achievement.rarity === 'epic' ? 'אפי' : 'אגדי'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 ${
                        post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500">
                      <Share className="h-4 w-4" />
                      {post.shares}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(post.id)}
                    className={post.isBookmarked ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}
                  >
                    <Star className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
