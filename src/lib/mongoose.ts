import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// 👇 Khai báo type mở rộng cho globalThis
declare global {
    // Dùng globalThis thay vì global để an toàn hơn
    // (global trong TypeScript đôi khi không có type)
    var _mongooseCache:
        | {
              conn: typeof mongoose | null;
              promise: Promise<typeof mongoose> | null;
          }
        | undefined;
}

// 👇 Tạo biến cache an toàn
const cached = globalThis._mongooseCache || {
    conn: null,
    promise: null,
};
globalThis._mongooseCache = cached;

// 👇 Hàm connect
async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = { bufferCommands: false };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
