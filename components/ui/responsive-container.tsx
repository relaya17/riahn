'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  center?: boolean
  breakpoint?: 'mobile' | 'tablet' | 'desktop' | 'all'
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  center = true,
  breakpoint = 'all'
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-2 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-4',
    xl: 'px-8 py-6'
  }

  const breakpointClasses = {
    mobile: 'block md:hidden',
    tablet: 'hidden md:block lg:hidden',
    desktop: 'hidden lg:block',
    all: 'block'
  }

  return (
    <div
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        center && 'mx-auto',
        breakpointClasses[breakpoint],
        className
      )}
    >
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
}

export function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md'
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }

  const gridColsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }

  return (
    <div
      className={cn(
        'grid',
        gridColsClasses[cols.mobile || 1],
        `md:${gridColsClasses[cols.tablet || 2]}`,
        `lg:${gridColsClasses[cols.desktop || 3]}`,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  size?: {
    mobile?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
    tablet?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
    desktop?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  }
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
}

export function ResponsiveText({
  children,
  className,
  size = { mobile: 'base', tablet: 'lg', desktop: 'xl' },
  weight = 'normal',
  align = 'left'
}: ResponsiveTextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  return (
    <div
      className={cn(
        sizeClasses[size.mobile || 'base'],
        `md:${sizeClasses[size.tablet || 'lg']}`,
        `lg:${sizeClasses[size.desktop || 'xl']}`,
        weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  )
}

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  sizes?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
  priority?: boolean
  quality?: number
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes = { mobile: '100vw', tablet: '50vw', desktop: '33vw' },
  priority = false,
  quality = 75
}: ResponsiveImageProps) {
  return (
    <picture className={cn('block', className)}>
      <source
        media="(min-width: 1024px)"
        srcSet={`${src}?w=800&q=${quality}`}
        sizes={sizes.desktop}
      />
      <source
        media="(min-width: 768px)"
        srcSet={`${src}?w=600&q=${quality}`}
        sizes={sizes.tablet}
      />
      <img
        src={`${src}?w=400&q=${quality}`}
        alt={alt}
        className="w-full h-auto"
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes.mobile}
      />
    </picture>
  )
}

interface ResponsiveButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: {
    mobile?: 'sm' | 'md' | 'lg'
    tablet?: 'sm' | 'md' | 'lg'
    desktop?: 'sm' | 'md' | 'lg'
  }
  fullWidth?: {
    mobile?: boolean
    tablet?: boolean
    desktop?: boolean
  }
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function ResponsiveButton({
  children,
  className,
  variant = 'primary',
  size = { mobile: 'md', tablet: 'md', desktop: 'lg' },
  fullWidth = { mobile: true, tablet: false, desktop: false },
  onClick,
  disabled = false,
  type = 'button'
}: ResponsiveButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const fullWidthClasses = {
    true: 'w-full',
    false: 'w-auto'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size.mobile || 'md'],
        `md:${sizeClasses[size.tablet || 'md']}`,
        `lg:${sizeClasses[size.desktop || 'lg']}`,
        fullWidthClasses[fullWidth.mobile ? 'true' : 'false'],
        `md:${fullWidthClasses[fullWidth.tablet ? 'true' : 'false']}`,
        `lg:${fullWidthClasses[fullWidth.desktop ? 'true' : 'false']}`,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}

interface ResponsiveCardProps {
  children: ReactNode
  className?: string
  padding?: {
    mobile?: 'sm' | 'md' | 'lg'
    tablet?: 'sm' | 'md' | 'lg'
    desktop?: 'sm' | 'md' | 'lg' | 'xl'
  }
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
}

export function ResponsiveCard({
  children,
  className,
  padding = { mobile: 'md', tablet: 'lg', desktop: 'xl' },
  shadow = 'md',
  rounded = 'lg',
  hover = false
}: ResponsiveCardProps) {
  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
        paddingClasses[padding.mobile || 'md'],
        `md:${paddingClasses[padding.tablet || 'lg']}`,
        `lg:${paddingClasses[padding.desktop || 'xl']}`,
        shadowClasses[shadow],
        roundedClasses[rounded],
        hover && 'hover:shadow-lg transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  )
}
