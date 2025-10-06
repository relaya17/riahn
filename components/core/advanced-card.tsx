'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Badge } from './badge'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface AdvancedCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'glass' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  }
  hover?: boolean
  glow?: boolean
}

export function AdvancedCard({
  title,
  description,
  children,
  className,
  variant = 'default',
  size = 'md',
  badge,
  badgeVariant = 'default',
  action,
  hover = true,
  glow = false
}: AdvancedCardProps) {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-800 dark:to-gray-900 border border-emerald-200 dark:border-emerald-800',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50',
    neon: 'bg-gray-900 border border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
  }

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        variantClasses[variant],
        sizeClasses[size],
        hover && 'hover:shadow-lg hover:scale-[1.02]',
        glow && 'shadow-[0_0_30px_rgba(16,185,129,0.2)]',
        className
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </CardTitle>
              {badge && (
                <Badge variant={badgeVariant} className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
          {action && (
            <Button
              variant={action.variant || 'outline'}
              size="sm"
              onClick={action.onClick}
              className="ml-2"
            >
              {action.label}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  )
}
