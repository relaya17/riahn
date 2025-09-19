import { format, formatDistanceToNow } from 'date-fns';
import { he, ar, enUS } from 'date-fns/locale';

// Date formatting
export const formatDate = (date: Date | string, locale: string = 'he'): string => {
    const d = new Date(date);
    const localeMap = {
        he: he,
        ar: ar,
        en: enUS,
    };

    return format(d, 'dd/MM/yyyy', { locale: localeMap[locale as keyof typeof localeMap] || he });
};

export const formatTime = (date: Date | string): string => {
    const d = new Date(date);
    return format(d, 'HH:mm');
};

export const formatRelativeTime = (date: Date | string, locale: string = 'he'): string => {
    const d = new Date(date);
    const localeMap = {
        he: he,
        ar: ar,
        en: enUS,
    };

    return formatDistanceToNow(d, {
        addSuffix: true,
        locale: localeMap[locale as keyof typeof localeMap] || he,
    });
};

// Language utilities
export const getLanguageInfo = (language: string) => {
    const languages = {
        he: { name: 'עברית', nativeName: 'עברית', flag: '🇮🇱' },
        ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
        en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
        si: { name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
        ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰' },
        fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
        es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
        de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
        it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
        pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
        ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
        zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
        ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
        ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
        hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    };

    return languages[language as keyof typeof languages] || languages.en;
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

// Storage utilities
export const storageKeys = {
    LANGUAGE: 'language',
    THEME: 'theme',
    USER_PREFERENCES: 'user_preferences',
    AUTH_TOKEN: 'auth_token',
    LAST_SYNC: 'last_sync',
};

// Color utilities
export const colors = {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#4ade80',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    light: '#f8f9fa',
    dark: '#1f2937',
    white: '#ffffff',
    black: '#000000',
    gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
    },
};

// Animation utilities
export const animations = {
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    slideInFromBottom: {
        from: { transform: [{ translateY: 100 }], opacity: 0 },
        to: { transform: [{ translateY: 0 }], opacity: 1 },
    },
    slideInFromRight: {
        from: { transform: [{ translateX: 100 }], opacity: 0 },
        to: { transform: [{ translateX: 0 }], opacity: 1 },
    },
    scaleIn: {
        from: { transform: [{ scale: 0.8 }], opacity: 0 },
        to: { transform: [{ scale: 1 }], opacity: 1 },
    },
};

// Device utilities
export const isIOS = () => {
    return require('react-native').Platform.OS === 'ios';
};

export const isAndroid = () => {
    return require('react-native').Platform.OS === 'android';
};

// Text utilities
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

// Number utilities
export const formatNumber = (num: number): string => {
    return num.toLocaleString();
};

export const formatPercentage = (num: number): string => {
    return `${Math.round(num)}%`;
};
