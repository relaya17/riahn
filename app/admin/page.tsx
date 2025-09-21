'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { WorldMap } from '@/components/map/world-map'
import { AnalyticsDashboard } from '@/components/analytics/analytics-dashboard'
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  Globe, 
  TrendingUp,
  Shield,
  Settings,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Database,
  Server,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Download
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalLessons: number
  completedLessons: number
  totalMessages: number
  onlineUsers: number
  newUsersToday: number
  systemHealth: 'healthy' | 'warning' | 'critical'
}

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'moderator' | 'admin'
  status: 'active' | 'suspended' | 'pending'
  joinDate: Date
  lastLogin: Date
  totalLessons: number
  completedLessons: number
  totalMessages: number
  isOnline: boolean
  language: string
  location: string
}

export default function AdminDashboard() {
  const [stats, _setStats] = useState<AdminStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalLessons: 5432,
    completedLessons: 3210,
    totalMessages: 15678,
    onlineUsers: 156,
    newUsersToday: 23,
    systemHealth: 'healthy'
  })

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'analytics' | 'settings'>('overview')

  // Mock user data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'user',
        status: 'active',
        joinDate: new Date('2024-01-15'),
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
        totalLessons: 45,
        completedLessons: 32,
        totalMessages: 156,
        isOnline: true,
        language: 'en',
        location: 'New York, USA'
      },
      {
        id: '2',
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
        role: 'moderator',
        status: 'active',
        joinDate: new Date('2024-02-20'),
        lastLogin: new Date(Date.now() - 30 * 60 * 1000),
        totalLessons: 67,
        completedLessons: 58,
        totalMessages: 234,
        isOnline: false,
        language: 'ar',
        location: 'Riyadh, Saudi Arabia'
      },
      {
        id: '3',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        role: 'user',
        status: 'suspended',
        joinDate: new Date('2024-03-10'),
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
        totalLessons: 23,
        completedLessons: 15,
        totalMessages: 89,
        isOnline: false,
        language: 'es',
        location: 'Madrid, Spain'
      }
    ]
    setUsers(mockUsers)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'moderator': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'user': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const tabs = [
    { id: 'overview', name: 'סקירה כללית', icon: BarChart3 },
    { id: 'users', name: 'משתמשים', icon: Users },
    { id: 'content', name: 'תוכן', icon: BookOpen },
    { id: 'analytics', name: 'אנליטיקה', icon: TrendingUp },
    { id: 'settings', name: 'הגדרות', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                דשבורד אדמין
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                ניהול מערכת LanguageConnect
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              ייצא נתונים
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              משתמש חדש
            </Button>
          </div>
        </div>

        {/* System Health */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  stats.systemHealth === 'healthy' ? 'bg-green-100 dark:bg-green-900/20' :
                  stats.systemHealth === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                  'bg-red-100 dark:bg-red-900/20'
                }`}>
                  {stats.systemHealth === 'healthy' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : stats.systemHealth === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    מצב המערכת
                  </h3>
                  <p className={`text-sm font-medium ${getHealthColor(stats.systemHealth)}`}>
                    {stats.systemHealth === 'healthy' ? 'תקין' :
                     stats.systemHealth === 'warning' ? 'אזהרה' : 'קריטי'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Server className="h-4 w-4" />
                  <span>שרת: פעיל</span>
                </div>
                <div className="flex items-center gap-1">
                  <Database className="h-4 w-4" />
                  <span>מסד נתונים: מחובר</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  <span>זמן תגובה: 45ms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id as 'overview' | 'users' | 'content' | 'analytics' | 'settings')}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </Button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-2">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">סה&quot;כ משתמשים</div>
                  <div className="text-xs text-green-600 mt-1">+{stats.newUsersToday} היום</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-2">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{stats.onlineUsers}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">משתמשים מחוברים</div>
                  <div className="text-xs text-gray-500 mt-1">{stats.activeUsers} פעילים</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-2">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{stats.totalLessons}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">סה&quot;כ שיעורים</div>
                  <div className="text-xs text-gray-500 mt-1">{stats.completedLessons} הושלמו</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full w-fit mx-auto mb-2">
                    <MessageCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{stats.totalMessages}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">הודעות נשלחו</div>
                  <div className="text-xs text-gray-500 mt-1">היום</div>
                </CardContent>
              </Card>
            </div>

            {/* World Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>מפת משתמשים גלובלית</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WorldMap onUserClick={(user) => console.log('User clicked:', user)} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="חיפוש משתמשים..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <Select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    options={[
                      { value: 'all', label: 'כל התפקידים' },
                      { value: 'user', label: 'משתמש' },
                      { value: 'moderator', label: 'מנחה' },
                      { value: 'admin', label: 'אדמין' }
                    ]}
                  />
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    options={[
                      { value: 'all', label: 'כל הסטטוסים' },
                      { value: 'active', label: 'פעיל' },
                      { value: 'suspended', label: 'מושעה' },
                      { value: 'pending', label: 'ממתין' }
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>רשימת משתמשים ({filteredUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role === 'admin' ? 'אדמין' :
                               user.role === 'moderator' ? 'מנחה' : 'משתמש'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status === 'active' ? 'פעיל' :
                               user.status === 'suspended' ? 'מושעה' : 'ממתין'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {user.totalLessons} שיעורים • {user.completedLessons} הושלמו
                        </div>
                        <div className="text-xs text-gray-500">
                          הצטרף: {user.joinDate.toLocaleDateString('he-IL')}
                        </div>
                        <div className="text-xs text-gray-500">
                          כניסה אחרונה: {user.lastLogin.toLocaleDateString('he-IL')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === 'content' && (
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ניהול תוכן
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                כאן תוכל לנהל שיעורים, מאמרים ותוכן אחר
              </p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {activeTab === 'settings' && (
          <Card>
            <CardContent className="p-6 text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                הגדרות מערכת
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                כאן תוכל להגדיר את הגדרות המערכת והאפליקציה
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
