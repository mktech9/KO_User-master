"use server";

import mongoose from "mongoose";
import "@/utils/mongo-models";

// const MONGO_URI =
//   "mongodb+srv://projectko365:project365@cluster0.kpm8o4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const MONGO_URI = "mongodb://127.0.0.1:27017/test";
const MONGO_URI = process.env.MONGO_URI;
const cached = {};

const connectMongo = async () => {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local",
    );
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }

  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection;
};

export default connectMongo;
