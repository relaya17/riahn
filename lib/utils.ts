import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
    const d = new Date(date)
    return d.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function formatTime(date: Date | string): string {
    const d = new Date(date)
    return d.toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function formatDateTime(date: Date | string): string {
    const d = new Date(date)
    return d.toLocaleString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function formatRelativeTime(date: Date | string): string {
    const now = new Date()
    const d = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

    if (diffInSeconds < 60) {
        return 'עכשיו'
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
        return `לפני ${diffInMinutes} דקות`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
        return `לפני ${diffInHours} שעות`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
        return `לפני ${diffInDays} ימים`
    }

    return formatDate(d)
}

export function generateId(): string {
    return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
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

export function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function getLanguageInfo(language: string) {
    const languages = {
        he: { name: 'עברית', nativeName: 'עברית', flag: '🇮🇱', direction: 'rtl' as const, code: 'HE' },
        ar: { name: 'ערבית', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' as const, code: 'AR' },
        en: { name: 'אנגלית', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' as const, code: 'EN' },
        es: { name: 'ספרדית', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' as const, code: 'ES' },
        fr: { name: 'צרפתית', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' as const, code: 'FR' },
        de: { name: 'גרמנית', nativeName: 'Deutsch', flag: '🇩🇪', direction: 'ltr' as const, code: 'DE' },
        it: { name: 'איטלקית', nativeName: 'Italiano', flag: '🇮🇹', direction: 'ltr' as const, code: 'IT' },
        pt: { name: 'פורטוגזית', nativeName: 'Português', flag: '🇵🇹', direction: 'ltr' as const, code: 'PT' },
        ru: { name: 'רוסית', nativeName: 'Русский', flag: '🇷🇺', direction: 'ltr' as const, code: 'RU' },
        zh: { name: 'סינית', nativeName: '中文', flag: '🇨🇳', direction: 'ltr' as const, code: 'ZH' },
        ja: { name: 'יפנית', nativeName: '日本語', flag: '🇯🇵', direction: 'ltr' as const, code: 'JA' },
        ko: { name: 'קוריאנית', nativeName: '한국어', flag: '🇰🇷', direction: 'ltr' as const, code: 'KO' },
        hi: { name: 'הינדי', nativeName: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' as const, code: 'HI' },
        si: { name: 'סינהלה', nativeName: 'සිංහල', flag: '🇱🇰', direction: 'ltr' as const, code: 'SI' },
        ta: { name: 'טאמיל', nativeName: 'தமிழ்', flag: '🇱🇰', direction: 'ltr' as const, code: 'TA' },
    }

    return languages[language as keyof typeof languages] || languages.en
}

export function getLevelInfo(level: string) {
    const levels = {
        beginner: { name: 'מתחיל', color: 'bg-green-100 text-green-800', progress: 25 },
        intermediate: { name: 'בינוני', color: 'bg-yellow-100 text-yellow-800', progress: 50 },
        advanced: { name: 'מתקדם', color: 'bg-blue-100 text-blue-800', progress: 75 },
        native: { name: 'שפת אם', color: 'bg-purple-100 text-purple-800', progress: 100 },
    }

    return levels[level as keyof typeof levels] || levels.beginner
}

export function calculateProgress(completed: number, total: number): number {
    if (total === 0) return 0
    return Math.round((completed / total) * 100)
}

export function getProgressColor(progress: number): string {
    if (progress < 30) return 'bg-red-500'
    if (progress < 60) return 'bg-yellow-500'
    if (progress < 90) return 'bg-blue-500'
    return 'bg-green-500'
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileTypeIcon(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase()

    const icons = {
        pdf: '📄',
        doc: '📝',
        docx: '📝',
        txt: '📄',
        jpg: '🖼️',
        jpeg: '🖼️',
        png: '🖼️',
        gif: '🖼️',
        mp4: '🎥',
        avi: '🎥',
        mov: '🎥',
        mp3: '🎵',
        wav: '🎵',
        zip: '📦',
        rar: '📦',
    }

    return icons[extension as keyof typeof icons] || '📄'
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function retry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
): Promise<T> {
    return fn().catch(err => {
        if (retries > 0) {
            return sleep(delay).then(() => retry(fn, retries - 1, delay))
        }
        throw err
    })
}

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
    return array.reduce((groups, item) => {
        const group = String(item[key])
        groups[group] = groups[group] || []
        groups[group].push(item)
        return groups
    }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...array].sort((a, b) => {
        const aVal = a[key]
        const bVal = b[key]

        if (aVal < bVal) return direction === 'asc' ? -1 : 1
        if (aVal > bVal) return direction === 'asc' ? 1 : -1
        return 0
    })
}

export function unique<T>(array: T[]): T[] {
    return [...new Set(array)]
}

export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size))
    }
    return chunks
}
