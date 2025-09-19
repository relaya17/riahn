'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { ForgotPasswordForm } from './forgot-password-form'
import { LanguageSelector } from './language-selector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Users, BookOpen, MessageCircle } from 'lucide-react'

type AuthMode = 'login' | 'register' | 'forgot-password'

export function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login')
  const { t, isRTL } = useLanguage()

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      title: t('auth.features.lessons'),
      description: t('auth.features.lessonsDesc'),
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: t('auth.features.connect'),
      description: t('auth.features.connectDesc'),
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
      title: t('auth.features.chat'),
      description: t('auth.features.chatDesc'),
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-500" />,
      title: t('auth.features.translate'),
      description: t('auth.features.translateDesc'),
    },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-50/90 via-white/90 to-purple-50/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('app.title')}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('app.subtitle')}
              </p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('auth.welcomeTitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('auth.welcomeDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 space-x-reverse"
                >
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mode === 'login' && t('auth.login')}
                    {mode === 'register' && t('auth.register')}
                    {mode === 'forgot-password' && t('auth.forgotPassword')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mode === 'login' && (
                    <LoginForm onModeChange={setMode} />
                  )}
                  {mode === 'register' && (
                    <RegisterForm onModeChange={setMode} />
                  )}
                  {mode === 'forgot-password' && (
                    <ForgotPasswordForm onModeChange={setMode} />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{t('auth.footer')}</p>
        </div>
      </div>
      </div>
    </div>
  )
}
