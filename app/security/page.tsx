'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SecuritySettings } from '@/components/security/security-settings'
import { SecurityMonitor } from '@/components/security/security-monitor'
import { 
  Shield, 
  Settings, 
  Monitor,
  Lock,
  AlertTriangle,
  CheckCircle,
  Globe,
  Smartphone
} from 'lucide-react'

type SecurityTab = 'settings' | 'monitor'

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<SecurityTab>('settings')

  // Mock user data
  const user = {
    id: 'user-123',
    email: 'user@example.com',
    twoFactorEnabled: false,
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    loginHistory: [
      {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        ip: '192.168.1.1',
        location: 'תל אביב, ישראל',
        device: 'Chrome on Windows'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        ip: '192.168.1.1',
        location: 'תל אביב, ישראל',
        device: 'Chrome on Windows'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        ip: '10.0.0.1',
        location: 'חיפה, ישראל',
        device: 'Safari on iPhone'
      }
    ]
  }

  const tabs = [
    {
      id: 'settings' as SecurityTab,
      name: 'הגדרות אבטחה',
      icon: Settings,
      description: 'נהל את הגדרות האבטחה שלך'
    },
    {
      id: 'monitor' as SecurityTab,
      name: 'ניטור אבטחה',
      icon: Monitor,
      description: 'צפה באירועי אבטחה ופעילות'
    }
  ]

  const securityFeatures = [
    {
      icon: Lock,
      title: 'הצפנת נתונים',
      description: 'כל הנתונים מוצפנים עם AES-256',
      status: 'active'
    },
    {
      icon: Shield,
      title: 'הגנה מפני התקפות',
      description: 'מערכת הגנה מתקדמת מפני XSS, CSRF ו-SQL Injection',
      status: 'active'
    },
    {
      icon: Globe,
      title: 'Rate Limiting',
      description: 'הגבלת בקשות למניעת התקפות DDoS',
      status: 'active'
    },
    {
      icon: Smartphone,
      title: 'אימות דו-שלבי',
      description: 'הגנה נוספת עם SMS או אפליקציה',
      status: user.twoFactorEnabled ? 'active' : 'inactive'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              מרכז האבטחה
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            הגן על החשבון שלך עם כלי אבטחה מתקדמים וניטור פעילות
          </p>
        </div>

        {/* Security Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="text-center">
                <CardContent className="p-6">
                  <div className={`p-3 rounded-full w-fit mx-auto mb-4 ${
                    feature.status === 'active' 
                      ? 'bg-green-100 dark:bg-green-900/20' 
                      : 'bg-gray-100 dark:bg-gray-900/20'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      feature.status === 'active' 
                        ? 'text-green-600' 
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {feature.description}
                  </p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {feature.status === 'active' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        פעיל
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3" />
                        לא פעיל
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <CardTitle className="flex items-center gap-2">
              {activeTab === 'settings' ? (
                <>
                  <Settings className="h-6 w-6 text-blue-500" />
                  <span>הגדרות אבטחה</span>
                </>
              ) : (
                <>
                  <Monitor className="h-6 w-6 text-blue-500" />
                  <span>ניטור אבטחה</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {activeTab === 'settings' ? (
              <SecuritySettings user={user} />
            ) : (
              <SecurityMonitor userId={user.id} />
            )}
          </CardContent>
        </Card>

        {/* Security Tips */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            טיפים לאבטחה
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">סיסמה חזקה</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  השתמש בסיסמה ארוכה עם אותיות, מספרים ותווים מיוחדים
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">אימות דו-שלבי</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  הפעל אימות דו-שלבי להגנה נוספת על החשבון שלך
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-4">
                  <Monitor className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">ניטור פעילות</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  בדוק באופן קבוע את היסטוריית הכניסות והפעילות
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
