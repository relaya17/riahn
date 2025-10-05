'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  className?: string
  showPercentage?: boolean
  animated?: boolean
  children?: React.ReactNode
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#10b981',
  backgroundColor = '#e5e7eb',
  className,
  showPercentage = true,
  animated = true,
  children
}: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (animated && circleRef.current) {
      circleRef.current.style.strokeDashoffset = circumference.toString()
      circleRef.current.style.transition = 'stroke-dashoffset 0.5s ease-in-out'
      
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = strokeDashoffset.toString()
        }
      }, 100)
    }
  }, [progress, circumference, strokeDashoffset, animated])

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={animated ? circumference : strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.3))'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (
          showPercentage && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(progress)}%
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
