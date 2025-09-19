'use client'

import React, { useState, useEffect } from 'react'
import { Smartphone, Wifi, WifiOff, Battery, BatteryLow, Volume2, VolumeX, Sun, Moon, RotateCcw, Download, Upload, Share2, Camera, Mic, MicOff, MapPin, Bell, BellOff } from 'lucide-react'

interface MobileSettings {
  offlineMode: boolean
  batterySaver: boolean
  darkMode: boolean
  autoDownload: boolean
  pushNotifications: boolean
  locationServices: boolean
  cameraAccess: boolean
  microphoneAccess: boolean
  dataUsage: {
    wifi: boolean
    cellular: boolean
    limit: number
    used: number
  }
}

interface OfflineContent {
  id: string
  title: string
  type: 'lesson' | 'audio' | 'video' | 'image'
  size: number
  downloaded: boolean
  lastUpdated: Date
  priority: 'high' | 'medium' | 'low'
}

interface PushNotification {
  id: string
  title: string
  message: string
  type: 'reminder' | 'achievement' | 'social' | 'lesson'
  timestamp: Date
  read: boolean
  action?: string
}

export function MobileFirstFeatures() {
  const [settings, setSettings] = useState<MobileSettings>({
    offlineMode: false,
    batterySaver: false,
    darkMode: false,
    autoDownload: true,
    pushNotifications: true,
    locationServices: false,
    cameraAccess: false,
    microphoneAccess: false,
    dataUsage: {
      wifi: true,
      cellular: false,
      limit: 1000, // MB
      used: 250
    }
  })

  const [offlineContent, setOfflineContent] = useState<OfflineContent[]>([])
  const [notifications, setNotifications] = useState<PushNotification[]>([])
  const [activeTab, setActiveTab] = useState<'settings' | 'offline' | 'notifications' | 'performance'>('settings')
  const [deviceInfo, setDeviceInfo] = useState({
    battery: 85,
    connection: 'wifi',
    storage: { used: 2.5, total: 8.0 }, // GB
    memory: { used: 1.2, total: 4.0 } // GB
  })

  const sampleOfflineContent: OfflineContent[] = [
    {
      id: '1',
      title: 'שיעור עברית בסיסי',
      type: 'lesson',
      size: 15.2,
      downloaded: true,
      lastUpdated: new Date('2024-01-15'),
      priority: 'high'
    },
    {
      id: '2',
      title: 'אוצר מילים יומי',
      type: 'audio',
      size: 8.7,
      downloaded: true,
      lastUpdated: new Date('2024-01-14'),
      priority: 'high'
    },
    {
      id: '3',
      title: 'סרטון תרבות ישראלי',
      type: 'video',
      size: 45.3,
      downloaded: false,
      lastUpdated: new Date('2024-01-13'),
      priority: 'medium'
    }
  ]

  const sampleNotifications: PushNotification[] = [
    {
      id: '1',
      title: 'זמן לתרגול!',
      message: 'הגיע הזמן לתרגל עברית',
      type: 'reminder',
      timestamp: new Date('2024-01-15T10:00:00'),
      read: false,
      action: 'start_lesson'
    },
    {
      id: '2',
      title: 'הישג חדש!',
      message: 'השגת את ההישג "אדון הרצף"',
      type: 'achievement',
      timestamp: new Date('2024-01-15T09:30:00'),
      read: true
    },
    {
      id: '3',
      title: 'הודעה חדשה',
      message: 'מארי שלחה לך הודעה',
      type: 'social',
      timestamp: new Date('2024-01-15T08:45:00'),
      read: false,
      action: 'open_chat'
    }
  ]

  useEffect(() => {
    setOfflineContent(sampleOfflineContent)
    setNotifications(sampleNotifications)
  }, [])

  const toggleSetting = (key: keyof MobileSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const downloadContent = (contentId: string) => {
    setOfflineContent(prev => 
      prev.map(content => 
        content.id === contentId 
          ? { ...content, downloaded: true, lastUpdated: new Date() }
          : content
      )
    )
  }

  const deleteContent = (contentId: string) => {
    setOfflineContent(prev => 
      prev.map(content => 
        content.id === contentId 
          ? { ...content, downloaded: false }
          : content
      )
    )
  }

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) return `${(sizeInMB * 1024).toFixed(0)} KB`
    return `${sizeInMB.toFixed(1)} MB`
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚'
      case 'audio': return '🎵'
      case 'video': return '🎬'
      case 'image': return '🖼️'
      default: return '📄'
    }
  }

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return '⏰'
      case 'achievement': return '🏆'
      case 'social': return '👥'
      case 'lesson': return '📖'
      default: return '📢'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Smartphone className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mobile-First Features
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          תכונות מתקדמות המותאמות במיוחד למובייל ולחוויית משתמש ניידת
        </p>
      </div>

      {/* Device Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-gray-600" />
          <span>סטטוס המכשיר</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Battery className={`w-6 h-6 mx-auto mb-2 ${deviceInfo.battery < 20 ? 'text-red-500' : 'text-green-500'}`} />
            <div className="text-lg font-bold">{deviceInfo.battery}%</div>
            <div className="text-sm text-gray-600">סוללה</div>
          </div>
          
          <div className="text-center">
            {deviceInfo.connection === 'wifi' ? (
              <Wifi className="w-6 h-6 text-green-500 mx-auto mb-2" />
            ) : (
              <WifiOff className="w-6 h-6 text-red-500 mx-auto mb-2" />
            )}
            <div className="text-lg font-bold capitalize">{deviceInfo.connection}</div>
            <div className="text-sm text-gray-600">חיבור</div>
          </div>
          
          <div className="text-center">
            <div className="w-6 h-6 mx-auto mb-2 text-blue-500">💾</div>
            <div className="text-lg font-bold">{deviceInfo.storage.used}/{deviceInfo.storage.total}GB</div>
            <div className="text-sm text-gray-600">אחסון</div>
          </div>
          
          <div className="text-center">
            <div className="w-6 h-6 mx-auto mb-2 text-purple-500">🧠</div>
            <div className="text-lg font-bold">{deviceInfo.memory.used}/{deviceInfo.memory.total}GB</div>
            <div className="text-sm text-gray-600">זיכרון</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'settings', name: 'הגדרות', icon: Smartphone },
          { id: 'offline', name: 'אופליין', icon: Download },
          { id: 'notifications', name: 'התראות', icon: Bell },
          { id: 'performance', name: 'ביצועים', icon: RotateCcw }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">הגדרות מובייל</h3>
            
            <div className="space-y-6">
              {/* Offline Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <WifiOff className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold text-gray-800">מצב אופליין</div>
                    <div className="text-sm text-gray-600">למד גם ללא חיבור לאינטרנט</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('offlineMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.offlineMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.offlineMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Battery Saver */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BatteryLow className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold text-gray-800">חיסכון בסוללה</div>
                    <div className="text-sm text-gray-600">הפחת צריכת סוללה</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('batterySaver')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.batterySaver ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.batterySaver ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {settings.darkMode ? (
                    <Moon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <div className="font-semibold text-gray-800">מצב כהה</div>
                    <div className="text-sm text-gray-600">עיצוב כהה לחיסכון בסוללה</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Auto Download */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold text-gray-800">הורדה אוטומטית</div>
                    <div className="text-sm text-gray-600">הורד תוכן חדש אוטומטית</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('autoDownload')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoDownload ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoDownload ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {settings.pushNotifications ? (
                    <Bell className="w-5 h-5 text-gray-600" />
                  ) : (
                    <BellOff className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <div className="font-semibold text-gray-800">התראות דחיפה</div>
                    <div className="text-sm text-gray-600">קבל התראות על פעילות חדשה</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('pushNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">שימוש בנתונים</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">חיבור WiFi</span>
                <button
                  onClick={() => setSettings(prev => ({
                    ...prev,
                    dataUsage: { ...prev.dataUsage, wifi: !prev.dataUsage.wifi }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.dataUsage.wifi ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.dataUsage.wifi ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-semibold">חיבור סלולרי</span>
                <button
                  onClick={() => setSettings(prev => ({
                    ...prev,
                    dataUsage: { ...prev.dataUsage, cellular: !prev.dataUsage.cellular }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.dataUsage.cellular ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.dataUsage.cellular ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">שימוש חודשי</span>
                  <span className="text-sm text-gray-600">{settings.dataUsage.used}MB / {settings.dataUsage.limit}MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(settings.dataUsage.used / settings.dataUsage.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offline Tab */}
      {activeTab === 'offline' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">תוכן אופליין</h3>
            
            <div className="space-y-4">
              {offlineContent.map((content) => (
                <div key={content.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getContentTypeIcon(content.type)}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{content.title}</h4>
                      <div className="text-sm text-gray-600">
                        {formatFileSize(content.size)} • {content.type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {content.downloaded ? (
                      <button
                        onClick={() => deleteContent(content.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        מחק
                      </button>
                    ) : (
                      <button
                        onClick={() => downloadContent(content.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        הורד
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">התראות</h3>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                    notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-xl">{getNotificationTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        {notification.timestamp.toLocaleString('he-IL')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">ביצועים</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">זיכרון</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>זיכרון RAM</span>
                    <span>{deviceInfo.memory.used}GB / {deviceInfo.memory.total}GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deviceInfo.memory.used / deviceInfo.memory.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">אחסון</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>אחסון פנימי</span>
                    <span>{deviceInfo.storage.used}GB / {deviceInfo.storage.total}GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deviceInfo.storage.used / deviceInfo.storage.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-700">פעולות מהירות</h4>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  ניקוי זיכרון
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  אופטימיזציה
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  עדכון אפליקציה
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
