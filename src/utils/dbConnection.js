import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://ashok_db:Dnx8F0WfWsRL8DK@clock-app.gwhonkx.mongodb.net/db_clock_app?retryWrites=true&w=majority&appName=clock-app';;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;