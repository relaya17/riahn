import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './loading'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
  fallback?: React.ReactNode
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  lazy?: boolean
  intersectionThreshold?: number
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  loading = 'lazy',
  onLoad,
  onError,
  fallback,
  aspectRatio = 'auto',
  objectFit = 'cover',
  lazy = true,
  intersectionThreshold = 0.1
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(!lazy || priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: intersectionThreshold }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [lazy, priority, isInView, intersectionThreshold])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setIsError(true)
    onError?.()
  }

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: ''
  }

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  }

  if (isError && fallback) {
    return <>{fallback}</>
  }

  if (isError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-200 dark:bg-gray-700',
          'text-gray-500 dark:text-gray-400',
          aspectRatioClasses[aspectRatio],
          className
        )}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm">שגיאה בטעינת התמונה</div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        className
      )}
      style={{ width, height }}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <LoadingSpinner size="md" variant="pulse" />
        </div>
      )}

      {/* Blur placeholder */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{ backgroundImage: `url(${blurDataURL})` }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  )
}

// Image gallery component
interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  className?: string
  aspectRatio?: OptimizedImageProps['aspectRatio']
  showCaptions?: boolean
  lazy?: boolean
}

export function ImageGallery({
  images,
  className,
  aspectRatio = 'video',
  showCaptions = true,
  lazy = true
}: ImageGalleryProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {images.map((image, index) => (
        <div key={index} className="group">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            aspectRatio={aspectRatio}
            lazy={lazy}
            className="rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
            fallback={
              <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg h-48">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="text-2xl mb-2">🖼️</div>
                  <div className="text-sm">תמונה לא זמינה</div>
                </div>
              </div>
            }
          />
          {showCaptions && image.caption && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

// Avatar component with optimization
interface OptimizedAvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallback?: React.ReactNode
  priority?: boolean
}

export function OptimizedAvatar({
  src,
  alt,
  size = 'md',
  className,
  fallback,
  priority = false
}: OptimizedAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const fallbackContent = fallback || (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
      {alt.charAt(0).toUpperCase()}
    </div>
  )

  return (
    <OptimizedImage
      src={src || ''}
      alt={alt}
      aspectRatio="square"
      objectFit="cover"
      className={cn(
        'rounded-full border-2 border-white dark:border-gray-800 shadow-md',
        sizeClasses[size],
        className
      )}
      fallback={fallbackContent}
      priority={priority}
      lazy={!priority}
    />
  )
}

// Background image component
interface OptimizedBackgroundProps {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
  overlay?: boolean
  overlayOpacity?: number
  priority?: boolean
}

export function OptimizedBackground({
  src,
  alt,
  className,
  children,
  overlay = false,
  overlayOpacity = 0.5,
  priority = false
}: OptimizedBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
        priority={priority}
        lazy={!priority}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}
