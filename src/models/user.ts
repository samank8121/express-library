import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
