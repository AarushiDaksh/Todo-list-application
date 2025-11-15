import { Schema, model, Document } from "mongoose";

export interface ILog extends Document {
  message: string;
  stack?: string;
  statusCode?: number;
  route?: string;
  method?: string;
  timestamp: Date;
}

const logSchema = new Schema<ILog>({
  message: { type: String, required: true },
  stack: { type: String },
  statusCode: { type: Number },
  route: { type: String },
  method: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export const Log = model<ILog>("Log", logSchema);
