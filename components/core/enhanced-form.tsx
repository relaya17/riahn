'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { RippleEffect, HoverGlow, MagneticButton } from './micro-interactions'

interface EnhancedInputProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
  icon?: React.ReactNode
  floatingLabel?: boolean
  animated?: boolean
}

export function EnhancedInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  className,
  icon,
  floatingLabel = true,
  animated = true
}: EnhancedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isActive = isFocused || value.length > 0

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <div className={cn('relative', className)}>
      <HoverGlow intensity="low">
        <div
          className={cn(
            'relative group',
            'transition-all duration-300 ease-in-out',
            animated && 'hover:scale-[1.02]'
          )}
        >
          {/* Input Container */}
          <div
            className={cn(
              'relative overflow-hidden rounded-lg border-2 transition-all duration-300',
              'bg-white dark:bg-gray-800',
              error
                ? 'border-red-500 shadow-red-500/20'
                : success
                ? 'border-green-500 shadow-green-500/20'
                : isFocused
                ? 'border-blue-500 shadow-blue-500/20 shadow-lg'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Floating Label */}
            {floatingLabel && (
              <label
                className={cn(
                  'absolute right-3 transition-all duration-300 pointer-events-none',
                  'text-gray-500 dark:text-gray-400',
                  isActive
                    ? 'top-2 text-xs text-blue-600 dark:text-blue-400'
                    : 'top-1/2 -translate-y-1/2 text-sm',
                  error && isActive && 'text-red-600 dark:text-red-400',
                  success && isActive && 'text-green-600 dark:text-green-400'
                )}
              >
                {label}
                {required && <span className="text-red-500 mr-1">*</span>}
              </label>
            )}

            {/* Input Field */}
            <RippleEffect>
              <input
                ref={inputRef}
                type={inputType}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={floatingLabel ? undefined : placeholder}
                disabled={disabled}
                required={required}
                className={cn(
                  'w-full px-3 py-4 bg-transparent',
                  'text-gray-900 dark:text-white',
                  'placeholder-gray-400 dark:placeholder-gray-500',
                  'focus:outline-none',
                  floatingLabel && 'pt-6 pb-2',
                  icon && 'pr-10'
                )}
              />
            </RippleEffect>

            {/* Icon */}
            {icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
              </div>
            )}

            {/* Password Toggle */}
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            )}

            {/* Success/Error Icons */}
            {success && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
                ✓
              </div>
            )}
            {error && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
                ✕
              </div>
            )}
          </div>

          {/* Animated Border */}
          {animated && isFocused && (
            <div
              className={cn(
                'absolute inset-0 rounded-lg border-2 pointer-events-none',
                'animate-pulse',
                error
                  ? 'border-red-500'
                  : success
                  ? 'border-green-500'
                  : 'border-blue-500'
              )}
            />
          )}
        </div>
      </HoverGlow>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1 animate-slide-up">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && !error && (
        <div className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1 animate-slide-up">
          <span>✓</span>
          נראה טוב!
        </div>
      )}
    </div>
  )
}

interface EnhancedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: React.ReactNode
  animated?: boolean
  magnetic?: boolean
}

export function EnhancedButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  icon,
  animated = true,
  magnetic = false
}: EnhancedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg shadow-gray-600/25',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    ghost: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const ButtonComponent = magnetic ? MagneticButton : 'button'

  return (
    <RippleEffect>
      <HoverGlow intensity="medium">
        <ButtonComponent
          type={type}
          onClick={onClick}
          disabled={disabled || loading}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          className={cn(
            'relative overflow-hidden rounded-lg font-medium',
            'transition-all duration-300 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variantClasses[variant],
            sizeClasses[size],
            animated && 'hover:scale-105 active:scale-95',
            isPressed && 'scale-95',
            loading && 'cursor-wait',
            className
          )}
        >
          {/* Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-inherit">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            </div>
          )}

          {/* Content */}
          <div className={cn('flex items-center justify-center gap-2', loading && 'opacity-0')}>
            {icon && <span>{icon}</span>}
            {children}
          </div>

          {/* Shine Effect */}
          {animated && (
            <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full hover:translate-x-[-200%]" />
          )}
        </ButtonComponent>
      </HoverGlow>
    </RippleEffect>
  )
}
