'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Globe,
  User,
  Smartphone,
  Monitor,
  RefreshCw
} from 'lucide-react'

interface SecurityEvent {
  id: string
  timestamp: Date
  event: string
  severity: 'low' | 'medium' | 'high'
  ip: string
  userAgent: string
  details: Record<string, unknown>
}

interface SecurityMonitorProps {
  userId: string
}

export function SecurityMonitor({ userId }: SecurityMonitorProps) {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  useEffect(() => {
    fetchSecurityEvents()
  }, [userId])

  const fetchSecurityEvents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/security/events?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Failed to fetch security events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />
      case 'medium': return <Clock className="h-4 w-4" />
      case 'low': return <CheckCircle className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getEventIcon = (event: string) => {
    if (event.includes('LOGIN')) return <User className="h-4 w-4" />
    if (event.includes('PASSWORD')) return <Shield className="h-4 w-4" />
    if (event.includes('2FA')) return <Smartphone className="h-4 w-4" />
    if (event.includes('RATE_LIMIT')) return <Clock className="h-4 w-4" />
    return <Globe className="h-4 w-4" />
  }

  const getEventDescription = (event: string) => {
    const descriptions = {
      'LOGIN_SUCCESS': 'כניסה מוצלחת',
      'LOGIN_FAILED': 'כניסה נכשלה',
      'PASSWORD_CHANGED': 'סיסמה שונתה',
      'PASSWORD_RESET': 'איפוס סיסמה',
      '2FA_ENABLED': 'אימות דו-שלבי הופעל',
      '2FA_DISABLED': 'אימות דו-שלבי בוטל',
      'RATE_LIMIT_EXCEEDED': 'חריגה ממגבלת בקשות',
      'SUSPICIOUS_ACTIVITY': 'פעילות חשודה',
      'ACCOUNT_LOCKED': 'חשבון ננעל',
      'ACCOUNT_UNLOCKED': 'חשבון נפתח'
    }
    return descriptions[event as keyof typeof descriptions] || event
  }

  const filteredEvents = events.filter(event => 
    filter === 'all' || event.severity === filter
  )

  const severityCounts = {
    high: events.filter(e => e.severity === 'high').length,
    medium: events.filter(e => e.severity === 'medium').length,
    low: events.filter(e => e.severity === 'low').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ניטור אבטחה
          </h2>
        </div>
        <Button
          onClick={fetchSecurityEvents}
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          רענן
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full w-fit mx-auto mb-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{severityCounts.high}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">אירועים חמורים</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full w-fit mx-auto mb-2">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{severityCounts.medium}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">אירועים בינוניים</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{severityCounts.low}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">אירועים קלים</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-2">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{events.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">סה&quot;כ אירועים</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            {(['all', 'high', 'medium', 'low'] as const).map((severity) => (
              <Button
                key={severity}
                variant={filter === severity ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(severity)}
                className={filter === severity ? '' : ''}
              >
                {severity === 'all' ? 'הכל' : 
                 severity === 'high' ? 'חמור' :
                 severity === 'medium' ? 'בינוני' : 'קל'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>אירועי אבטחה</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">טוען אירועים...</span>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center p-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">אין אירועי אבטחה להצגה</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {getEventIcon(event.event)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {getEventDescription(event.event)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.ip} • {event.userAgent}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {getSeverityIcon(event.severity)}
                      {event.severity.toUpperCase()}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.timestamp.toLocaleDateString('he-IL')} {event.timestamp.toLocaleTimeString('he-IL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
