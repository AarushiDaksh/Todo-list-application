import { Request, Response, NextFunction } from "express";
import { Log } from "../models/Log";

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  // log to Mongo
  try {
    await Log.create({
      message: err.message || "Unknown error",
      stack: err.stack,
      statusCode,
      route: req.originalUrl,
      method: req.method,
    });
  } catch (logError) {
    console.error("Failed to write log", logError);
  }

  console.error(err);

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
  });
};
