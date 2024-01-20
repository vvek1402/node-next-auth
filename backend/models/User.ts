import mongoose, { Schema } from 'mongoose';
import User from "../interfaces/User";

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: { type: String },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<User>("User", userSchema);
