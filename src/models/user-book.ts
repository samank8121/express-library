import mongoose, { Document } from 'mongoose';

export interface IUserBook extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  bookId: mongoose.Schema.Types.ObjectId;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt: Date;
}

const UserBookSchema = new mongoose.Schema<IUserBook>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    borrowedAt: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUserBook>('UserBook', UserBookSchema);
