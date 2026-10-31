import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows DNS resolvers failing SRV lookups on MongoDB Atlas (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('[Database] Could not configure Google DNS servers:', e.message);
}

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_mystery_room';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    return null;
  }
};
