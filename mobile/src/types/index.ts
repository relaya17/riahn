// User types
export interface User {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
    nativeLanguage: string;
    learningLanguages: string[];
    currentLevel: string;
    role: string;
    isOnline: boolean;
    lastSeen: Date;
    preferences: {
        theme: string;
        notifications: {
            lessons: boolean;
            messages: boolean;
            forums: boolean;
            achievements: boolean;
        };
        privacy: {
            showOnlineStatus: boolean;
            allowMessages: boolean;
            showProgress: boolean;
        };
    };
    createdAt: Date;
    updatedAt: Date;
}

// Lesson types
export interface Lesson {
    id: string;
    title: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    progress: number;
    completed: boolean;
    language: string;
    category: string;
    thumbnail?: string;
    content: LessonContent[];
}

export interface LessonContent {
    id: string;
    type: 'text' | 'image' | 'audio' | 'video' | 'quiz';
    title: string;
    content: string;
    order: number;
}

// Quiz types
export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    type: 'multiple-choice' | 'true-false' | 'fill-blank';
}

// Chat types
export interface Message {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    timestamp: Date;
    isTranslated?: boolean;
    originalLanguage?: string;
    translatedText?: string;
    type: 'text' | 'image' | 'audio' | 'file';
    status: 'sending' | 'sent' | 'delivered' | 'read';
}

// Language types
export type Language = 'he' | 'ar' | 'en' | 'si' | 'ta' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' | 'hi';

export type LanguageLevel = 'beginner' | 'intermediate' | 'advanced';

// Navigation types
export type RootStackParamList = {
    Auth: undefined;
    Dashboard: undefined;
    Profile: undefined;
    Lessons: undefined;
    Chat: undefined;
    Settings: undefined;
    LessonDetail: { lessonId: string };
    ChatDetail: { userId: string };
};

// API types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'auto';

// Notification types
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
    data?: Record<string, unknown>;
}
