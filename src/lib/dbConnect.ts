import mongoose from "mongoose";

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB bağlantı hatası:", err);
  }
};
