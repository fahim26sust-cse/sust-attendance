// const mongoose = require('mongoose');

// const MONGODB_URI = process.env.MONGODB_URI;

// let cached = global.mongoose || { conn: null, promise: null };

// async function connectToDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       dbName: 'sust-attendance',
//       bufferCommands: false,
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// global.mongoose = cached;

// module.exports = { connectToDB };

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MongoDB URI is not set in the environment variables.");
  process.exit(1); // Exit the process to avoid further errors
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'sust-attendance',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;

module.exports = { connectToDB };
