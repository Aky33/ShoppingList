import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGO_URI: process.env.MONGO_URI as string,
  ACCESS_SECRET: process.env.ACCESS_SECRET as string,
  REFRESH_SECRET: process.env.REFRESH_SECRET as string
};