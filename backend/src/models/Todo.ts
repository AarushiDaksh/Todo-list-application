import { Schema, model, Document, Types } from "mongoose";

export interface ITodo extends Document {
  user: Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);
