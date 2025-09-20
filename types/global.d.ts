// Global type definitions for the monorepo

// User types
export interface User {
    id: string;
    _id?: string; // MongoDB ObjectId
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

export type LanguageLevel = 'beginner' | 'intermediate' | 'advanced' | 'native';

// Achievement types
export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
}

// User Progress types
export interface UserProgress {
    userId: string;
    language: Language;
    level: LanguageLevel;
    totalLessons: number;
    completedLessons: number;
    totalTimeSpent: number;
    streak: number;
    achievements: Achievement[];
    lastActivity: Date;
}

// Group types
export interface GroupMember {
    userId: string;
    role: 'member' | 'admin' | 'moderator';
    joinedAt: Date;
}

export interface Group {
    name: string;
    description?: string;
    members: GroupMember[];
}

// Notification types
export type NotificationType = 'lesson_completed' | 'new_message' | 'forum_reply' | 'achievement_unlocked' | 'friend_request' | 'group_invite';

export interface Notification {
    userId: string
    type: string
    title: string
    message: string
    data?: Record<string, unknown>
    isRead: boolean
    createdAt?: Date
    updatedAt?: Date
}

// Message types
export interface Message {
    senderId: string;
    receiverId?: string;
    groupId?: string;
    content: string;
    originalLanguage: Language;
    translatedContent: Map<Language, string>;
    type: 'text' | 'image' | 'audio' | 'video' | 'file';
    attachments: MessageAttachment[];
    isRead: boolean;
}

export interface MessageAttachment {
    type: 'text' | 'image' | 'audio' | 'video' | 'file';
    url: string;
    filename: string;
    size: number;
}

// Forum Reply types
export interface ForumReply {
    _id: string;
    postId: string;
    authorId: string;
    content: string;
    likes: string[];
    dislikes: string[];
    isAccepted: boolean;
    createdAt?: Date;
}

// Socket Events types
export interface SocketEvents {
    'message:send': (message: Message) => void;
    'message:receive': (message: Message) => void;
    'user:online': (userId: string) => void;
    'user:offline': (userId: string) => void;
    'typing:start': (data: { chatId: string; userId: string }) => void;
    'typing:stop': (data: { chatId: string; userId: string }) => void;
}

// Translation types
export interface TranslationRequest {
    text: string;
    sourceLanguage: Language;
    targetLanguage: Language;
    context?: string;
}

export interface TranslationResponse {
    translatedText: string;
    sourceLanguage: Language;
    targetLanguage: Language;
    detectedLanguage?: Language;
    confidence?: number;
}

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

// Auth types
export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    nativeLanguage: string;
    learningLanguages: string[];
    agreeToTerms: boolean;
}

// Web Speech API types
declare global {
    const SpeechSynthesisUtterance: {
        prototype: SpeechSynthesisUtterance;
        new(text?: string): SpeechSynthesisUtterance;
    };

    interface SpeechSynthesisUtterance {
        text: string;
        lang: string;
        voice: SpeechSynthesisVoice | null;
        volume: number;
        rate: number;
        pitch: number;
        onstart: ((event: SpeechSynthesisEvent) => void) | null;
        onend: ((event: SpeechSynthesisEvent) => void) | null;
        onerror: ((event: SpeechSynthesisErrorEvent) => void) | null;
        onpause: ((event: SpeechSynthesisEvent) => void) | null;
        onresume: ((event: SpeechSynthesisEvent) => void) | null;
    }

    interface SpeechSynthesis extends EventTarget {
        speaking: boolean;
        pending: boolean;
        paused: boolean;
        getVoices(): SpeechSynthesisVoice[];
        speak(utterance: SpeechSynthesisUtterance): void;
        pause(): void;
        resume(): void;
        cancel(): void;
        onvoiceschanged: ((event: Event) => void) | null;
    }

    interface SpeechSynthesisVoice {
        voiceURI: string;
        name: string;
        lang: string;
        localService: boolean;
        default: boolean;
    }

    interface SpeechSynthesisEvent extends Event {
        utterance: SpeechSynthesisUtterance;
        charIndex: number;
        charLength: number;
    }

    interface SpeechSynthesisErrorEvent extends Event {
        utterance: SpeechSynthesisUtterance;
        error: SpeechSynthesisErrorCode;
    }

    type SpeechSynthesisErrorCode = 'network' | 'not-allowed' | 'service-not-found' | 'bad-grammar' | 'language-not-supported' | 'voice-unavailable' | 'text-too-long' | 'invalid-argument' | 'synthesis-failed' | 'synthesis-unavailable';

    const speechSynthesis: SpeechSynthesis;

    // Speech Recognition API types
    interface SpeechRecognition extends EventTarget {
        continuous: boolean;
        grammars: SpeechGrammarList;
        interimResults: boolean;
        lang: string;
        maxAlternatives: number;
        serviceURI: string;
        start(): void;
        stop(): void;
        abort(): void;
        onaudiostart: ((event: Event) => void) | null;
        onaudioend: ((event: Event) => void) | null;
        onend: ((event: Event) => void) | null;
        onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
        onnomatch: ((event: SpeechRecognitionEvent) => void) | null;
        onresult: ((event: SpeechRecognitionEvent) => void) | null;
        onsoundstart: ((event: Event) => void) | null;
        onsoundend: ((event: Event) => void) | null;
        onspeechstart: ((event: Event) => void) | null;
        onspeechend: ((event: Event) => void) | null;
        onstart: ((event: Event) => void) | null;
    }

    interface SpeechRecognitionEvent extends Event {
        readonly results: SpeechRecognitionResultList;
        readonly resultIndex: number;
    }

    interface SpeechRecognitionResultList {
        readonly length: number;
        item(index: number): SpeechRecognitionResult;
        [index: number]: SpeechRecognitionResult;
    }

    interface SpeechRecognitionResult {
        readonly length: number;
        item(index: number): SpeechRecognitionAlternative;
        [index: number]: SpeechRecognitionAlternative;
        readonly isFinal: boolean;
    }

    interface SpeechRecognitionAlternative {
        readonly transcript: string;
        readonly confidence: number;
    }

    interface SpeechRecognitionErrorEvent extends Event {
        readonly error: SpeechRecognitionErrorCode;
        readonly message: string;
    }

    type SpeechRecognitionErrorCode = 'no-speech' | 'aborted' | 'audio-capture' | 'not-allowed' | 'service-not-found' | 'bad-grammar' | 'language-not-supported' | 'network';

    interface SpeechGrammarList {
        readonly length: number;
        item(index: number): SpeechGrammar;
        [index: number]: SpeechGrammar;
        addFromURI(src: string, weight?: number): void;
        addFromString(string: string, weight?: number): void;
    }

    interface SpeechGrammar {
        src: string;
        weight: number;
    }

    const SpeechRecognition: {
        prototype: SpeechRecognition;
        new(): SpeechRecognition;
    };

    const webkitSpeechRecognition: {
        prototype: SpeechRecognition;
        new(): SpeechRecognition;
    };
}

// Missing types that were referenced but not defined
export interface LessonContent {
    id: string;
    type: 'text' | 'image' | 'audio' | 'video' | 'quiz' | 'exercise';
    title: string;
    content: string;
    order: number;
    translation?: string;
    options?: QuizOption[];
}

export interface QuizOption {
    id: string;
    text: string;
    isCorrect?: boolean;
}

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
