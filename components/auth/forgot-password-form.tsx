'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, ArrowLeft } from 'lucide-react'

interface ForgotPasswordFormProps {
  onModeChange: (mode: 'login') => void
}

interface ForgotPasswordData {
  email: string
}

export function ForgotPasswordForm({ onModeChange }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const { resetPassword } = useAuth()
  const { t } = useLanguage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>()

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    try {
      await resetPassword(data.email)
      setIsEmailSent(true)
      toast.success(t('auth.resetEmailSent'))
    } catch (error: unknown) {
      toast.error((error as Error).message || t('auth.resetError'))
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('auth.checkYourEmail')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.resetEmailInstructions')}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => setIsEmailSent(false)}
            variant="outline"
            className="w-full"
          >
            {t('auth.sendAnotherEmail')}
          </Button>
          
          <Button
            onClick={() => onModeChange('login')}
            variant="ghost"
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('auth.backToLogin')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('auth.forgotPassword')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('auth.forgotPasswordInstructions')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('email', {
            required: t('auth.emailRequired'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('auth.emailInvalid'),
            },
          })}
          type="email"
          label={t('auth.email')}
          placeholder={t('auth.emailPlaceholder')}
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {t('auth.sendResetEmail')}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onModeChange('login')}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center justify-center space-x-2 space-x-reverse"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('auth.backToLogin')}</span>
        </button>
      </div>
    </div>
  )
}
