import { initializeApp, getApps } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key-for-development",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
}

// Initialize Firebase
let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

    // Initialize Firebase services
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
} catch (error) {
    console.warn('Firebase initialization failed, using mock services for development:', error)

    // Mock Firebase services for development
    auth = {
        currentUser: null,
        signInWithEmailAndPassword: () => Promise.resolve({ user: null }),
        createUserWithEmailAndPassword: () => Promise.resolve({ user: null }),
        signOut: () => Promise.resolve(),
        onAuthStateChanged: (callback: (user: User | null) => void) => callback(null),
        emulatorConfig: null
    }

    db = {
        collection: () => ({
            doc: () => ({
                get: () => Promise.resolve({ exists: false, data: () => null }),
                set: () => Promise.resolve(),
                update: () => Promise.resolve(),
                delete: () => Promise.resolve()
            }),
            add: () => Promise.resolve({ id: 'mock-id' }),
            where: () => ({
                get: () => Promise.resolve({ docs: [] })
            })
        })
    }

    storage = {
        ref: () => ({
            put: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('mock-url') } })
        })
    }
}

export { auth, db, storage }

// Initialize Analytics only on client side
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && app) {
    try {
        // Auth emulator
        if (auth && !auth.emulatorConfig) {
            connectAuthEmulator(auth, 'http://localhost:9099')
        }

        // Firestore emulator
        if (db && !(db as Firestore & { _delegate?: { _databaseId?: { projectId?: string } } })._delegate?._databaseId?.projectId?.includes('demo-')) {
            connectFirestoreEmulator(db, 'localhost', 8080)
        }

        // Storage emulator
        if (storage && !(storage as FirebaseStorage & { _delegate?: { _host?: string } })._delegate?._host?.includes('localhost')) {
            connectStorageEmulator(storage, 'localhost', 9199)
        }
    } catch (error) {
        console.log('Firebase emulators already connected or not available')
    }
}

export default app
