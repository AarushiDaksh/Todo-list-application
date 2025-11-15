import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { randomBytes } from "crypto";
import crypto from "crypto";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT secret not configured");
  }
  return secret;
};


export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if email exists
      return res.json({ message: "If that email exists, a reset link has been generated." });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();

  
    console.log("Password reset token:", token);

    res.json({
      message: "Reset token generated wroking on it to send email viya firebase",
      token
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiresAt: { $gt: new Date() } // not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
    });

    const token = jwt.sign(
      { userId: user._id },
      getJwtSecret(),
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      getJwtSecret(),
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
