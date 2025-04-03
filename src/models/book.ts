import mongoose, { Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  publishedDate: Date;
  availableCopies: number;
}

const BookSchema = new mongoose.Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publishedDate: { type: Date },
    availableCopies: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);
