// Web-specific type definitions

// Next.js types
export interface NextPageProps {
    params: { [key: string]: string | string[] | undefined };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Web-specific component props
export interface WebComponentProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

// Web API types
export interface WebApiRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: unknown;
}

// Web storage types
export interface WebStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
    clear: () => void;
}

// Web navigation types
export interface WebNavigation {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
}
