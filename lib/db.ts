import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Next.js runs in a hot-reload environment during development.
 * Without caching, every hot reload opens a new connection and
 * quickly exhausts the MongoDB Atlas connection pool.
 *
 * We store the connection promise on the global object so it
 * persists across hot reloads in development, while in production
 * the module cache handles it naturally.
 */

// 1. Tell TypeScript about our custom global property
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

// 2. Use the custom global property (falling back to an empty object if undefined)
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

// 3. Define the return type of the function
export async function connectDB(): Promise<typeof mongoose> {
  // Already connected — return the existing connection immediately
  if (cached!.conn) {
    return cached!.conn;
  }

  // Connection is in-flight — wait for it instead of opening a second one
  if (!cached!.promise) {
    // 4. Type the connection options
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,          // Fail fast if not connected rather than queuing
      maxPoolSize: 10,                // Max simultaneous connections in the pool
      serverSelectionTimeoutMS: 5000, // Give up finding a server after 5s
      socketTimeoutMS: 45000,         // Close sockets idle for 45s
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI as string, opts) // <--- Fixed with "as string"
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        cached!.promise = null; // Reset so the next call retries
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}