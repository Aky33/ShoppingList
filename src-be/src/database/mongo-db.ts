import mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
        auth: { username: "admin", password: "admin"},
        authSource: "admin"
    });

    console.log("Připojeno k MongoDB");
  } catch (error) {
    console.error("Chyba připojení k MongoDB:", error);
    throw error;
  }
}