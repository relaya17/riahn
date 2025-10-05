'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Mail, Lock, User } from 'lucide-react'
import { RegisterForm as RegisterFormType, Language } from '@/types'
import { usePasswordToggle } from '@/hooks/usePasswordToggle'

interface RegisterFormProps {
  onModeChange: (mode: 'login') => void
}

const languages = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
]

const learningLanguages = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
]

export function RegisterForm({ onModeChange }: RegisterFormProps) {
  const passwordToggle = usePasswordToggle()
  const confirmPasswordToggle = usePasswordToggle()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLearningLanguages, setSelectedLearningLanguages] = useState<string[]>(['he'])
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuth()
  const { t } = useLanguage()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormType>()

  const password = watch('password')

  const onSubmit = async (data: RegisterFormType) => {
    setIsLoading(true)
    try {
      const formData = {
        ...data,
        learningLanguages: selectedLearningLanguages as Language[],
      }
      await signUp(formData)
      toast.success(t('auth.registerSuccess'))
    } catch (error: unknown) {
      toast.error((error as Error).message || t('auth.registerError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      toast.success(t('auth.loginSuccess'))
    } catch (error: unknown) {
      toast.error((error as Error).message || t('auth.loginError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithFacebook()
      toast.success(t('auth.loginSuccess'))
    } catch (error: unknown) {
      toast.error((error as Error).message || t('auth.loginError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleLearningLanguageChange = (languageCode: string) => {
    setSelectedLearningLanguages(prev => {
      if (prev.includes(languageCode)) {
        return prev.filter(lang => lang !== languageCode)
      } else {
        return [...prev, languageCode]
      }
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name', {
            required: t('auth.nameRequired'),
            minLength: {
              value: 2,
              message: t('auth.nameMinLength'),
            },
          })}
          type="text"
          label={t('auth.name')}
          placeholder={t('auth.namePlaceholder')}
          leftIcon={<User className="h-4 w-4" />}
          error={errors.name?.message}
        />

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

        <Select
          {...register('nativeLanguage', {
            required: t('auth.nativeLanguageRequired'),
          })}
          label={t('auth.nativeLanguage')}
          placeholder={t('auth.selectNativeLanguage')}
          options={languages.map(lang => ({
            value: lang.code,
            label: `${lang.flag} ${lang.name}`,
          }))}
          error={errors.nativeLanguage?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('auth.learningLanguages')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {learningLanguages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => handleLearningLanguageChange(language.code)}
                className={`p-2 rounded-lg border text-sm flex items-center space-x-2 space-x-reverse ${
                  selectedLearningLanguages.includes(language.code)
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'border-gray-300 bg-white text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
          {selectedLearningLanguages.length === 0 && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {t('auth.selectAtLeastOneLanguage')}
            </p>
          )}
        </div>

        <Input
          {...register('password', {
            required: t('auth.passwordRequired'),
            minLength: {
              value: 8,
              message: t('auth.passwordMinLength'),
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
              message: t('auth.passwordPattern'),
            },
          })}
          type={passwordToggle.getInputType()}
          label={t('auth.password')}
          placeholder={t('auth.passwordPlaceholder')}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={passwordToggle.getIconButton()}
          error={errors.password?.message}
          helperText={t('auth.passwordHelper')}
        />

        <Input
          {...register('confirmPassword', {
            required: t('auth.confirmPasswordRequired'),
            validate: (value) =>
              value === password || t('auth.passwordsDoNotMatch'),
          })}
          type={confirmPasswordToggle.getInputType()}
          label={t('auth.confirmPassword')}
          placeholder={t('auth.confirmPasswordPlaceholder')}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={confirmPasswordToggle.getIconButton()}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading || selectedLearningLanguages.length === 0}
        >
          {t('auth.register')}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
            {t('auth.orContinueWith')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>

        <Button
          variant="outline"
          onClick={handleFacebookSignIn}
          disabled={isLoading}
          className="w-full"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {t('auth.haveAccount')}{' '}
        </span>
        <button
          type="button"
          onClick={() => onModeChange('login')}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t('auth.login')}
        </button>
      </div>
    </div>
  )
}
