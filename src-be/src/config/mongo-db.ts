import mongoose from "mongoose";

const URI = "mongodb://localhost:27017";

export async function connectDB() {
  try {
    await mongoose.connect(URI, {
        auth: { username: "admin", password: "admin"},
        authSource: "admin"
    });

    console.log("Připojeno k MongoDB");
  } catch (error) {
    console.error("Chyba připojení k MongoDB:", error);
    throw error;
  }
}