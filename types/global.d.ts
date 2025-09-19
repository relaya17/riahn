// Global type definitions for the monorepo

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

// Language types
export type Language = 'he' | 'ar' | 'en' | 'si' | 'ta' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' | 'hi';

export type LanguageLevel = 'beginner' | 'intermediate' | 'advanced';

// API types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface TranslationResponse {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    confidence?: number;
}

// Forum types
export interface ForumPost {
    _id: string;
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
        avatar: string | null;
        level: string;
    };
    authorId: string;
    category: string;
    language: string;
    tags: string[];
    likes: number;
    replies: unknown[];
    views: number;
    isPinned: boolean;
    isLocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastReply: Date;
}

export type ForumCategory = 'all' | 'general' | 'grammar-help' | 'pronunciation' | 'culture' | 'resources' | 'success-stories';

// Lesson types
export interface Lesson {
    _id: string;
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
    rating: number;
    savedBy?: string[];
    isCompleted?: boolean;
}

export interface LessonContent {
    id: string;
    type: 'text' | 'image' | 'audio' | 'video' | 'quiz' | 'exercise';
    title: string;
    content: string;
    order: number;
    translation?: string;
    options?: QuizOption[];
}

// Quiz types
export interface QuizOption {
    id: string;
    text: string;
    isCorrect?: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'auto';

// Common component props
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

// Platform types
export type Platform = 'web' | 'mobile' | 'desktop';

// Environment types
export interface Environment {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    APP_NAME: string;
    VERSION: string;
}
