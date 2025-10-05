'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Bell, 
  Check, 
  X, 
  MessageCircle, 
  BookOpen, 
  Users, 
  Award,
  Globe,
  Star,
  Clock,
  AlertCircle,
  Info,
  CheckCircle
} from 'lucide-react'

interface Notification {
  id: string
  type: 'message' | 'lesson' | 'achievement' | 'system' | 'friend_request' | 'learning_reminder'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  actionText?: string
  avatar?: string
  sender?: string
}

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all')

  useEffect(() => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'message',
        title: 'הודעה חדשה מ-Sarah',
        message: 'שלום! איך אתה היום? אני רוצה לתרגל עברית איתך.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
        priority: 'high',
        actionUrl: '/learning-chat',
        actionText: 'הגב',
        sender: 'Sarah Johnson'
      },
      {
        id: '2',
        type: 'achievement',
        title: 'הישג חדש! 🎉',
        message: 'השלמת 10 שיעורים ברצף - אתה על האש!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
        priority: 'medium',
        actionUrl: '/profile',
        actionText: 'צפה בהישגים'
      },
      {
        id: '3',
        type: 'learning_reminder',
        title: 'זמן לתרגל! ⏰',
        message: 'לא תרגלת היום. בואו נמשיך את הרצף שלך!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        priority: 'medium',
        actionUrl: '/lessons',
        actionText: 'התחל שיעור'
      },
      {
        id: '4',
        type: 'friend_request',
        title: 'בקשת חברות',
        message: 'Ahmed Al-Rashid רוצה להתחבר איתך',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: false,
        priority: 'low',
        actionUrl: '/connect',
        actionText: 'צפה בבקשה',
        sender: 'Ahmed Al-Rashid'
      },
      {
        id: '5',
        type: 'system',
        title: 'עדכון מערכת',
        message: 'הוספנו תכונות חדשות לצ\'אט הלמידה!',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isRead: true,
        priority: 'low',
        actionUrl: '/learning-chat',
        actionText: 'גלה עכשיו'
      },
      {
        id: '6',
        type: 'lesson',
        title: 'שיעור חדש זמין',
        message: 'שיעור "דקדוק מתקדם" זמין עכשיו!',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        isRead: false,
        priority: 'medium',
        actionUrl: '/lessons',
        actionText: 'התחל שיעור'
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="h-5 w-5 text-blue-500" />
      case 'lesson': return <BookOpen className="h-5 w-5 text-green-500" />
      case 'achievement': return <Award className="h-5 w-5 text-yellow-500" />
      case 'system': return <Info className="h-5 w-5 text-purple-500" />
      case 'friend_request': return <Users className="h-5 w-5 text-orange-500" />
      case 'learning_reminder': return <Clock className="h-5 w-5 text-red-500" />
      default: return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.isRead
      case 'high': return notification.priority === 'high'
      default: return true
    }
  })

  const unreadCount = notifications.filter(n => !n.isRead).length
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `לפני ${minutes} דקות`
    } else if (hours < 24) {
      return `לפני ${hours} שעות`
    } else {
      return `לפני ${days} ימים`
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Notification Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                התראות
              </h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                >
                  <Check className="h-4 w-4 mr-1" />
                  סמן הכל כנקרא
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'הכל', count: notifications.length },
                { id: 'unread', label: 'לא נקראו', count: unreadCount },
                { id: 'high', label: 'חשוב', count: highPriorityCount }
              ].map((filterOption) => (
                <Button
                  key={filterOption.id}
                  variant={filter === filterOption.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption.id as 'all' | 'unread' | 'high')}
                  className="relative"
                >
                  {filterOption.label}
                  {filterOption.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {filterOption.count}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Bell className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  אין התראות
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {filter === 'all' ? 'אין התראות להצגה' :
                   filter === 'unread' ? 'כל ההתראות נקראו' :
                   'אין התראות חשובות'}
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border-l-4 bg-gray-50 dark:bg-gray-700 transition-all hover:shadow-md ${
                      getPriorityColor(notification.priority)
                    } ${!notification.isRead ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              !notification.isRead 
                                ? 'text-gray-900 dark:text-white' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            {notification.sender && (
                              <p className="text-xs text-gray-500 mt-1">
                                מ: {notification.sender}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 h-auto"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 h-auto text-gray-400 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {notification.actionUrl && notification.actionText && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-purple-600"
                              onClick={() => {
                                // Navigate to action URL
                                window.location.href = notification.actionUrl!
                              }}
                            >
                              {notification.actionText}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{filteredNotifications.length} התראות</span>
              <Button variant="ghost" size="sm">
                הגדרות התראות
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
