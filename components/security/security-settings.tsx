'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  Smartphone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  User
} from 'lucide-react'
import { useToast } from '@/components/ui/toast'

interface SecuritySettingsProps {
  user: {
    id: string
    email: string
    twoFactorEnabled: boolean
    lastLogin: Date
    loginHistory: Array<{
      id: string
      timestamp: Date
      ip: string
      location: string
      device: string
    }>
  }
}

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [isEnabling2FA, setIsEnabling2FA] = useState(false)
  
  const { success, error } = useToast()

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      error('הסיסמאות אינן תואמות')
      return
    }

    if (newPassword.length < 8) {
      error('הסיסמה חייבת להכיל לפחות 8 תווים')
      return
    }

    setIsChangingPassword(true)
    try {
      const response = await fetch('/api/security/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        }),
      })

      if (!response.ok) {
        throw new Error('Password change failed')
      }

      success('הסיסמה שונתה בהצלחה!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      error('שגיאה בשינוי הסיסמה')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handle2FAToggle = async () => {
    setIsEnabling2FA(true)
    try {
      const response = await fetch('/api/security/two-factor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: user.twoFactorEnabled ? 'disable' : 'enable',
          code: twoFactorCode
        }),
      })

      if (!response.ok) {
        throw new Error('2FA toggle failed')
      }

      success(user.twoFactorEnabled ? 'אימות דו-שלבי בוטל' : 'אימות דו-שלבי הופעל')
      setTwoFactorCode('')
    } catch (err) {
      error('שגיאה בהגדרת אימות דו-שלבי')
    } finally {
      setIsEnabling2FA(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let score = 0
    const feedback = []

    if (password.length >= 8) score += 1
    else feedback.push('לפחות 8 תווים')

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push('אות גדולה')

    if (/[a-z]/.test(password)) score += 1
    else feedback.push('אות קטנה')

    if (/\d/.test(password)) score += 1
    else feedback.push('מספר')

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
    else feedback.push('תו מיוחד')

    return { score, feedback }
  }

  const passwordStrength = getPasswordStrength(newPassword)
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']
  const strengthLabels = ['חלש', 'חלש', 'בינוני', 'חזק', 'מאוד חזק']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          הגדרות אבטחה
        </h2>
      </div>

      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>סקירת אבטחה</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-400">חשבון מאובטח</p>
                <p className="text-sm text-green-600 dark:text-green-300">כל ההגדרות מופעלות</p>
              </div>
            </div>
            
            <div className={`flex items-center gap-3 p-3 rounded-lg ${
              user.twoFactorEnabled 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-yellow-50 dark:bg-yellow-900/20'
            }`}>
              {user.twoFactorEnabled ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              <div>
                <p className={`font-medium ${
                  user.twoFactorEnabled 
                    ? 'text-green-800 dark:text-green-400' 
                    : 'text-yellow-800 dark:text-yellow-400'
                }`}>
                  אימות דו-שלבי
                </p>
                <p className={`text-sm ${
                  user.twoFactorEnabled 
                    ? 'text-green-600 dark:text-green-300' 
                    : 'text-yellow-600 dark:text-yellow-300'
                }`}>
                  {user.twoFactorEnabled ? 'מופעל' : 'לא מופעל'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-400">כניסה אחרונה</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  {user.lastLogin.toLocaleDateString('he-IL')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <span>שינוי סיסמה</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              סיסמה נוכחית
            </label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="הקלד את הסיסמה הנוכחית"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              סיסמה חדשה
            </label>
            <div className="relative">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="הקלד סיסמה חדשה"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">חוזק סיסמה:</span>
                  <span className={`text-sm font-medium ${
                    passwordStrength.score >= 4 ? 'text-green-600' : 
                    passwordStrength.score >= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {strengthLabels[passwordStrength.score]}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded ${
                        level <= passwordStrength.score 
                          ? strengthColors[passwordStrength.score] 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    חסר: {passwordStrength.feedback.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              אישור סיסמה
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="הקלד שוב את הסיסמה החדשה"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-sm text-red-600 mt-1">הסיסמאות אינן תואמות</p>
            )}
          </div>

          <Button
            onClick={handlePasswordChange}
            disabled={isChangingPassword || !currentPassword || !newPassword || newPassword !== confirmPassword}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {isChangingPassword ? 'משנה סיסמה...' : 'שנה סיסמה'}
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            <span>אימות דו-שלבי</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                אימות דו-שלבי
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.twoFactorEnabled 
                  ? 'מופעל - חשבונך מוגן עם אימות נוסף'
                  : 'לא מופעל - מומלץ להפעיל להגנה נוספת'
                }
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.twoFactorEnabled 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {user.twoFactorEnabled ? 'מופעל' : 'לא מופעל'}
            </div>
          </div>

          {!user.twoFactorEnabled && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                איך זה עובד?
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• תקבל קוד SMS או הודעת push בכל כניסה</li>
                <li>• תצטרך להזין את הקוד בנוסף לסיסמה</li>
                <li>• זה מוסיף שכבת הגנה נוספת לחשבונך</li>
              </ul>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              קוד אימות
            </label>
            <Input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              placeholder="הקלד קוד אימות"
              maxLength={6}
            />
          </div>

          <Button
            onClick={handle2FAToggle}
            disabled={isEnabling2FA || !twoFactorCode}
            className={`w-full ${
              user.twoFactorEnabled 
                ? 'bg-gradient-to-r from-red-500 to-pink-600' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600'
            }`}
          >
            {isEnabling2FA 
              ? 'מעבד...' 
              : user.twoFactorEnabled 
                ? 'בטל אימות דו-שלבי' 
                : 'הפעל אימות דו-שלבי'
            }
          </Button>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>היסטוריית כניסות</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {user.loginHistory.map((login) => (
              <div key={login.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {login.device}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {login.location} • {login.ip}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {login.timestamp.toLocaleDateString('he-IL')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {login.timestamp.toLocaleTimeString('he-IL')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
