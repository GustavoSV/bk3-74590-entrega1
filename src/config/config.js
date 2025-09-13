import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "src/.env") });

export const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL,
};