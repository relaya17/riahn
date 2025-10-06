'use client'

import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'shimmer'
}

export function LoadingSkeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer'
}: LoadingSkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700'
  
  const variantClasses = {
    text: 'h-4 w-full',
    rectangular: 'w-full',
    circular: 'rounded-full aspect-square',
    rounded: 'rounded-lg w-full'
  }
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    shimmer: 'shimmer'
  }

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  )
}

// Pre-built skeleton components
export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 space-y-4', className)}>
      <LoadingSkeleton variant="circular" width={40} height={40} />
      <div className="space-y-2">
        <LoadingSkeleton variant="text" height={20} />
        <LoadingSkeleton variant="text" height={16} width="80%" />
      </div>
    </div>
  )
}

export function AvatarSkeleton({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <LoadingSkeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  )
}
