import mongoose from "mongoose";

type MongooseConnection = typeof mongoose | null;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/leadflow";
const CONNECT_TIMEOUT_MS = 3000;

declare global {
  var mongooseCache:
    | {
        conn: MongooseConnection;
        promise: Promise<MongooseConnection> | null;
      }
    | undefined;
}

const cached = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("MongoDB connection timed out")), timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

export async function connectDB(): Promise<MongooseConnection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = withTimeout(
      mongoose.connect(MONGODB_URI, {
        dbName: "leadflow",
        serverSelectionTimeoutMS: 3000,
        socketTimeoutMS: 3000,
      }),
      CONNECT_TIMEOUT_MS
    )
      .then((connection) => connection)
      .catch((error) => {
        console.warn("MongoDB connection failed, continuing without a database connection:", error.message);
        cached.conn = null;
        cached.promise = null;
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}