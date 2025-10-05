// API Configuration
export const API_CONFIG = {
    BASE_URL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.languageconnect.com',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
};

// App Configuration
export const APP_CONFIG = {
    NAME: 'LanguageConnect',
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',
    SUPPORTED_LANGUAGES: ['he', 'ar', 'en', 'si', 'ta', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi'],
    DEFAULT_LANGUAGE: 'he',
    DEFAULT_THEME: 'light',
};

// Storage Keys
export const STORAGE_KEYS = {
    LANGUAGE: 'language',
    THEME: 'theme',
    USER_PREFERENCES: 'user_preferences',
    AUTH_TOKEN: 'auth_token',
    LAST_SYNC: 'last_sync',
    OFFLINE_DATA: 'offline_data',
    CACHE_DATA: 'cache_data',
};

// Lesson Configuration
export const LESSON_CONFIG = {
    LEVELS: ['beginner', 'intermediate', 'advanced'],
    CATEGORIES: ['grammar', 'vocabulary', 'pronunciation', 'conversation', 'reading', 'writing'],
    MAX_DURATION: 60, // minutes
    MIN_DURATION: 5, // minutes
    PROGRESS_THRESHOLD: 80, // percentage
};

// Chat Configuration
export const CHAT_CONFIG = {
    MAX_MESSAGE_LENGTH: 1000,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/wav'],
    TYPING_INDICATOR_TIMEOUT: 3000, // milliseconds
    MESSAGE_RETRY_ATTEMPTS: 3,
};

// Audio Configuration
export const AUDIO_CONFIG = {
    SAMPLE_RATE: 44100,
    CHANNELS: 1,
    BITS_PER_SAMPLE: 16,
    MAX_RECORDING_DURATION: 300, // seconds
    MIN_RECORDING_DURATION: 1, // seconds
};

// Camera Configuration
export const CAMERA_CONFIG = {
    QUALITY: 0.8,
    MAX_WIDTH: 1920,
    MAX_HEIGHT: 1080,
    ALLOWS_EDITING: true,
    ASPECT_RATIO: [4, 3],
};

// Animation Configuration
export const ANIMATION_CONFIG = {
    DURATION: {
        SHORT: 200,
        MEDIUM: 300,
        LONG: 500,
    },
    EASING: {
        EASE_IN: 'ease-in',
        EASE_OUT: 'ease-out',
        EASE_IN_OUT: 'ease-in-out',
    },
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'שגיאת רשת. אנא בדוק את החיבור לאינטרנט.',
    AUTH_ERROR: 'שגיאה בהתחברות. אנא נסה שוב.',
    VALIDATION_ERROR: 'אנא מלא את כל השדות הנדרשים.',
    PERMISSION_ERROR: 'נדרשת הרשאה לגישה לתכונה זו.',
    UNKNOWN_ERROR: 'אירעה שגיאה לא ידועה. אנא נסה שוב.',
    OFFLINE_ERROR: 'האפליקציה פועלת במצב לא מקוון.',
    SYNC_ERROR: 'שגיאה בסנכרון הנתונים.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'התחברת בהצלחה!',
    REGISTER_SUCCESS: 'נרשמת בהצלחה!',
    LESSON_COMPLETED: 'שיעור הושלם בהצלחה!',
    MESSAGE_SENT: 'הודעה נשלחה בהצלחה!',
    PROFILE_UPDATED: 'הפרופיל עודכן בהצלחה!',
    SETTINGS_SAVED: 'הגדרות נשמרו בהצלחה!',
};

// UI Constants
export const UI_CONFIG = {
    BORDER_RADIUS: {
        SMALL: 4,
        MEDIUM: 8,
        LARGE: 12,
        EXTRA_LARGE: 16,
    },
    SPACING: {
        XS: 4,
        SM: 8,
        MD: 16,
        LG: 24,
        XL: 32,
        XXL: 48,
    },
    FONT_SIZES: {
        XS: 12,
        SM: 14,
        MD: 16,
        LG: 18,
        XL: 20,
        XXL: 24,
        XXXL: 32,
    },
    ICON_SIZES: {
        SM: 16,
        MD: 20,
        LG: 24,
        XL: 32,
        XXL: 48,
    },
};

// Feature Flags
export const FEATURE_FLAGS = {
    ENABLE_OFFLINE_MODE: true,
    ENABLE_PUSH_NOTIFICATIONS: true,
    ENABLE_ANALYTICS: true,
    ENABLE_CRASH_REPORTING: true,
    ENABLE_DARK_MODE: true,
    ENABLE_BIOMETRIC_AUTH: true,
    ENABLE_VOICE_RECOGNITION: true,
    ENABLE_CAMERA_TRANSLATION: true,
};
