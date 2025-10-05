import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

// Don't throw error during build time, only at runtime
function validateMongoUri() {
    if (!MONGODB_URI) {
        throw new Error('Please define MONGODB_URI in your environment variables')
    }
}

interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

// שימוש ב-var בתוך declare global מותאם ל-TypeScript
declare global {
    // eslint-disable-next-line no-var
    var _mongoose: MongooseCache | undefined
}

// השתמש ב-const במקום let כי לא משנים את המשתנה
const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null }

if (!global._mongoose) {
    global._mongoose = cached
}

export async function connectDB() {
    validateMongoUri() // Validate only when actually connecting
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
    }
    cached.conn = await cached.promise
    return cached.conn
}
