import React from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'gradient' | 'pulse' | 'dots'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1 space-x-reverse', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-blue-600 animate-bounce',
              size === 'sm' ? 'h-2 w-2' : 
              size === 'md' ? 'h-3 w-3' :
              size === 'lg' ? 'h-4 w-4' : 'h-5 w-5'
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div
        className={cn(
          'rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-glow',
          sizeClasses[size],
          className
        )}
      />
    )
  }

  if (variant === 'gradient') {
    return (
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-transparent',
          'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
          'bg-clip-border',
          sizeClasses[size],
          className
        )}
        style={{
          background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          borderRadius: '50%',
        }}
      />
    )
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
        'shadow-lg shadow-blue-600/20',
        sizeClasses[size],
        className
      )}
    />
  )
}

interface LoadingCardProps {
  className?: string
  lines?: number
}

export function LoadingCard({ className, lines = 3 }: LoadingCardProps) {
  return (
    <div className={cn('p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm', className)}>
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
        
        {/* Content lines */}
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2',
              i === lines - 1 ? 'w-2/3' : 'w-full'
            )}
          />
        ))}
      </div>
    </div>
  )
}

interface LoadingPageProps {
  message?: string
  className?: string
}

export function LoadingPage({ 
  message = 'טוען...', 
  className 
}: LoadingPageProps) {
  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center',
      'bg-gradient-to-br from-emerald-50 to-teal-100',
      'dark:from-gray-900 dark:to-gray-800',
      className
    )}>
      <div className="text-center">
        <div className="mb-6">
          <LoadingSpinner size="xl" variant="gradient" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {message}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          אנא המתן...
        </p>
      </div>
    </div>
  )
}

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
  className?: string
}

export function LoadingOverlay({ 
  isVisible, 
  message = 'טוען...',
  className 
}: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className={cn(
      'fixed inset-0 bg-black/50 backdrop-blur-sm',
      'flex items-center justify-center z-50',
      'animate-fade-in',
      className
    )}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl">
        <div className="text-center">
          <LoadingSpinner size="lg" variant="gradient" className="mb-4" />
          <p className="text-gray-900 dark:text-white font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  width?: string | number
  height?: string | number
}

export function Skeleton({ 
  className, 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-300 dark:bg-gray-600'
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  }

  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height })
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={style}
    />
  )
}

// Progress loading component
interface ProgressLoaderProps {
  progress: number
  message?: string
  className?: string
}

export function ProgressLoader({ 
  progress, 
  message = 'טוען...',
  className 
}: ProgressLoaderProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {message}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}
