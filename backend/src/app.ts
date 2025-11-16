import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";




const rawClient = process.env.CLIENT_URL || "https://todo-list-application-ten-gamma.vercel.app";

let CLIENT_ORIGIN = rawClient;
try {
  CLIENT_ORIGIN = new URL(rawClient).origin;
} catch {
  CLIENT_ORIGIN = rawClient;
}

const allowedOrigins = [
  "http://localhost:5173",
  CLIENT_ORIGIN,
  "https://todo-list-application-wheat.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("todo is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
      console.log(`Server listening on http://${HOST}:${PORT}`);
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
  });
