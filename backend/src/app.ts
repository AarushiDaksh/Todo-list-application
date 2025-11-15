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


const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";


app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // using Bearer token, not cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// Optional health / root route
app.get("/", (_req, res) => {
  res.send("todo is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Error handler last
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
  });
