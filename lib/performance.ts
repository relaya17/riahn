// Performance optimization utilities for RIAHN
import React from 'react'

export class PerformanceOptimizer {
    private static instance: PerformanceOptimizer
    private cache = new Map<string, { data: unknown; timestamp: number }>()
    private debounceTimers = new Map<string, NodeJS.Timeout>()

    static getInstance(): PerformanceOptimizer {
        if (!PerformanceOptimizer.instance) {
            PerformanceOptimizer.instance = new PerformanceOptimizer()
        }
        return PerformanceOptimizer.instance
    }

    // Image optimization
    static optimizeImage(src: string, width?: number, height?: number, quality = 80): string {
        if (src.startsWith('data:') || src.startsWith('blob:')) return src

        const params = new URLSearchParams()
        if (width) params.set('w', width.toString())
        if (height) params.set('h', height.toString())
        params.set('q', quality.toString())
        params.set('f', 'webp')

        return `${src}?${params.toString()}`
    }

    // Lazy loading for images
    static createLazyImageObserver(): IntersectionObserver {
        return new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement
                        const src = img.dataset.src
                        if (src) {
                            img.src = src
                            img.removeAttribute('data-src')
                            img.classList.remove('lazy')
                        }
                    }
                })
            },
            { rootMargin: '50px' }
        )
    }

    // Debounce function calls
    debounce<T extends (...args: unknown[]) => unknown>(
        key: string,
        func: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        return (...args: Parameters<T>) => {
            const existingTimer = this.debounceTimers.get(key)
            if (existingTimer) {
                clearTimeout(existingTimer)
            }

            const timer = setTimeout(() => {
                func(...args)
                this.debounceTimers.delete(key)
            }, delay)

            this.debounceTimers.set(key, timer)
        }
    }

    // Throttle function calls
    throttle<T extends (...args: unknown[]) => unknown>(
        key: string,
        func: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let inThrottle: boolean
        return (...args: Parameters<T>) => {
            if (!inThrottle) {
                func(...args)
                inThrottle = true
                setTimeout(() => (inThrottle = false), limit)
            }
        }
    }

    // Memory cache
    cacheResult<T>(key: string, factory: () => T, ttl = 300000): T { // 5 minutes default
        const cached = this.cache.get(key)
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.data as T
        }

        const result = factory()
        this.cache.set(key, {
            data: result,
            timestamp: Date.now()
        })

        return result
    }

    // Clear cache
    clearCache(pattern?: string): void {
        if (pattern) {
            const regex = new RegExp(pattern)
            for (const key of this.cache.keys()) {
                if (regex.test(key)) {
                    this.cache.delete(key)
                }
            }
        } else {
            this.cache.clear()
        }
    }

    // Bundle splitting for code
    static async loadComponent(componentPath: string): Promise<React.ComponentType<unknown> | null> {
        try {
            const module = await import(/* webpackChunkName: "[request]" */ `@/components/${componentPath}`)
            return module.default
        } catch (error) {
            console.error(`Failed to load component: ${componentPath}`, error)
            return null
        }
    }

    // Service Worker registration
    static async registerServiceWorker(): Promise<void> {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js')
                console.log('Service Worker registered:', registration)
            } catch (error) {
                console.error('Service Worker registration failed:', error)
            }
        }
    }

    // Preload critical resources
    static preloadResource(href: string, as: string, type?: string): void {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = href
        link.as = as
        if (type) link.type = type
        document.head.appendChild(link)
    }

    // Critical CSS inlining
    static inlineCriticalCSS(css: string): void {
        const style = document.createElement('style')
        style.textContent = css
        document.head.appendChild(style)
    }

    // Resource hints
    static addResourceHints(): void {
        // DNS prefetch for external domains
        const domains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com',
            'api.riahn.com'
        ]

        domains.forEach(domain => {
            const link = document.createElement('link')
            link.rel = 'dns-prefetch'
            link.href = `//${domain}`
            document.head.appendChild(link)
        })

        // Preconnect to critical origins
        const origins = [
            'https://fonts.googleapis.com',
            'https://api.riahn.com'
        ]

        origins.forEach(origin => {
            const link = document.createElement('link')
            link.rel = 'preconnect'
            link.href = origin
            document.head.appendChild(link)
        })
    }

    // Performance monitoring
    static measurePerformance(name: string, fn: () => void): void {
        const start = performance.now()
        fn()
        const end = performance.now()
        console.log(`${name} took ${end - start} milliseconds`)
    }

    // Memory usage monitoring
    static getMemoryUsage(): { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } | null {
        if ('memory' in performance) {
            return (performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory
        }
        return null
    }

    // Web Vitals monitoring
    static measureWebVitals(): void {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            console.log('LCP:', lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay
        new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
                const fidEntry = entry as PerformanceEventTiming
                console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
            })
        }).observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift
        let clsValue = 0
        new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
                const layoutShiftEntry = entry as unknown as { hadRecentInput?: boolean; value: number }
                if (!layoutShiftEntry.hadRecentInput) {
                    clsValue += layoutShiftEntry.value
                }
            })
            console.log('CLS:', clsValue)
        }).observe({ entryTypes: ['layout-shift'] })
    }
}

// React-specific optimizations
export const ReactOptimizations = {
    // Memo wrapper for expensive components
    memo: <T extends React.ComponentType<unknown>>(Component: T) => {
        return React.memo(Component)
    },

    // Virtual scrolling for large lists
    createVirtualList: (items: unknown[], itemHeight: number, containerHeight: number) => {
        const visibleCount = Math.ceil(containerHeight / itemHeight)
        const totalHeight = items.length * itemHeight

        return {
            visibleCount,
            totalHeight,
            getVisibleItems: (scrollTop: number) => {
                const startIndex = Math.floor(scrollTop / itemHeight)
                const endIndex = Math.min(startIndex + visibleCount, items.length)
                return items.slice(startIndex, endIndex).map((item, index) => ({
                    item,
                    index: startIndex + index,
                    top: (startIndex + index) * itemHeight
                }))
            }
        }
    },

    // Intersection Observer hook
    useIntersectionObserver: (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
        const [isIntersecting, setIsIntersecting] = React.useState(false)

        React.useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => setIsIntersecting(entry.isIntersecting),
                options
            )

            if (ref.current) {
                observer.observe(ref.current)
            }

            return () => observer.disconnect()
        }, [ref, options])

        return isIntersecting
    }
}

// SEO optimizations
export const SEOOptimizer = {
    // Generate structured data
    generateStructuredData: (data: Record<string, unknown>) => {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'RIAHN',
            description: 'פלטפורמת לימוד שפות מהפכנית עם AI מתקדם',
            url: 'https://riahn.com',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Web Browser',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
            },
            ...data
        }
    },

    // Generate meta tags
    generateMetaTags: (pageData: {
        title: string
        description: string
        keywords?: string[]
        image?: string
        url?: string
    }) => {
        const tags = [
            { name: 'title', content: pageData.title },
            { name: 'description', content: pageData.description },
            { name: 'keywords', content: pageData.keywords?.join(', ') },
            { property: 'og:title', content: pageData.title },
            { property: 'og:description', content: pageData.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: pageData.url },
            { property: 'og:image', content: pageData.image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageData.title },
            { name: 'twitter:description', content: pageData.description },
            { name: 'twitter:image', content: pageData.image }
        ]

        return tags.filter(tag => tag.content)
    },

    // Generate sitemap
    generateSitemap: (routes: string[]) => {
        const baseUrl = 'https://riahn.com'
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`

        return sitemap
    }
}

// Analytics and A/B Testing
export const AnalyticsManager = {
    // Track events
    track: (event: string, properties?: Record<string, unknown>) => {
        if (typeof window !== 'undefined' && (window as unknown as { gtag?: (command: string, event: string, properties?: Record<string, unknown>) => void }).gtag) {
            (window as unknown as { gtag: (command: string, event: string, properties?: Record<string, unknown>) => void }).gtag('event', event, properties)
        }
    },

    // A/B test variant selection
    getVariant: (testName: string, variants: string[]): string => {
        if (variants.length === 0) return ''
        const hash = AnalyticsManager.hashString(testName + (typeof window !== 'undefined' ? window.location?.href || '' : ''))
        const index = hash % variants.length
        return variants[index] || variants[0]
    },

    // Hash function for consistent variant selection
    hashString: (str: string): number => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash // Convert to 32-bit integer
        }
        return Math.abs(hash)
    },

    // Performance metrics tracking
    trackPerformance: (metric: string, value: number) => {
        AnalyticsManager.track('performance_metric', {
            metric_name: metric,
            metric_value: value,
            page_url: typeof window !== 'undefined' ? window.location?.href || '' : ''
        })
    }
}

export default PerformanceOptimizer