import mongoose from 'mongoose'

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

async function connectDB(): Promise<typeof mongoose> {
  if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null }
  }

  if (global.mongoose.conn) {
    return global.mongoose.conn
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      console.log('✅ MongoDB connected')
      return mongooseInstance
    })
  }

  global.mongoose.conn = await global.mongoose.promise
  return global.mongoose.conn
}

export default connectDB
