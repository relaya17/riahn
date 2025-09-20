import mongoose from 'mongoose'

const cached: {
    conn: mongoose.Mongoose | null
    promise: Promise<mongoose.Mongoose> | null
} = globalThis._mongo || { conn: null, promise: null }

declare global {

    // eslint-disable-next-line no-var
    var _mongo: typeof cached
}

if (!globalThis._mongo) globalThis._mongo = cached

export async function connectToDB(): Promise<mongoose.Mongoose> {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const uri = process.env.MONGODB_URI
        if (!uri) throw new Error('MONGODB_URI not defined')

        cached.promise = mongoose.connect(uri).then((mongooseInstance) => {
            return mongooseInstance as mongoose.Mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}
