import mongoose from 'mongoose';
import { number, object, string, TypeOf, date, preprocess } from 'zod';

const payload = {
  body: object({
    title: string().min(1, 'Title is required'),
    author: string().min(1, 'Author is required'),
    isbn: string().min(1, 'ISBN is required'),
    publishedDate: preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      date().optional()
    ),
    availableCopies: number().int().min(0).default(1),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: 'id of book is required',
    }).refine((id) => id && mongoose.isValidObjectId(id), {
      message: 'Invalid ID for Book',
    }),
  }),
};
export const createBookSchema = object({ ...payload });
export const updateBookSchema = object({
  ...payload,
  ...params,
});
export const deleteBookSchema = object({
  ...params,
});

export const getBookSchema = object({
  ...params,
});

export type GetBookInput = TypeOf<typeof getBookSchema>;
export type CreateBookInput = TypeOf<typeof createBookSchema>;
export type UpdateBookInput = TypeOf<typeof updateBookSchema>;
export type DeleteBookInput = TypeOf<typeof deleteBookSchema>;
