const mongoose = require('mongoose');

let cachedConnection = null;

async function connectDB() {
  if (cachedConnection) return cachedConnection;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Copy server/.env.example to server/.env and provide a connection string.'
    );
  }

  mongoose.set('strictQuery', true);

  cachedConnection = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });

  console.log(
    `[db] MongoDB connected → ${cachedConnection.connection.host}/${cachedConnection.connection.name}`
  );

  return cachedConnection;
}

module.exports = connectDB;
