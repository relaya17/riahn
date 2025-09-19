// Mobile-specific type definitions

// React Native types
export interface MobileComponentProps {
    style?: any;
    onPress?: () => void;
    onLongPress?: () => void;
    testID?: string;
}

// React Native navigation types
export interface MobileNavigation {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
    reset: (state: any) => void;
}

// Mobile-specific API types
export interface MobileApiRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
}

// Mobile storage types
export interface MobileStorage {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
    clear: () => Promise<void>;
}

// Mobile permissions types
export interface MobilePermissions {
    camera: boolean;
    microphone: boolean;
    storage: boolean;
    location: boolean;
}

// Mobile device types
export interface MobileDevice {
    platform: 'ios' | 'android';
    version: string;
    model: string;
    isTablet: boolean;
    hasNotch: boolean;
}

// Mobile animation types
export interface MobileAnimation {
    duration: number;
    easing: string;
    delay?: number;
    iterations?: number;
}
