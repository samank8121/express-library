import mongoose from 'mongoose';
import { object, string, TypeOf, date, preprocess } from 'zod';

const payload = {
  body: object({
    userId: string({
      required_error: 'id of user is required',
    }).refine((id) => id && mongoose.isValidObjectId(id), {
      message: 'Invalid Id for user',
    }),
    bookId: string({
      required_error: 'id of book is required',
    }).refine((id) => id && mongoose.isValidObjectId(id), {
      message: 'Invalid Id for book',
    }),
    borrowedAt: preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      date().optional()
    ),
    dueDate: preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      date({ required_error: 'Due Date of is required' })
    ).refine((d) => d.getTime() > Date.now(), {
      message: 'Due Date must be in the future',
    }),
    returnedAt: preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      date().optional()
    ),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: 'id of borrow is required',
    }).refine((id) => id && mongoose.isValidObjectId(id), {
      message: 'Invalid ID for Borrow',
    }),
  }),
};
const filters = {
  query: object({
    bookId: string()
      .optional()
      .refine((id) => !id || mongoose.isValidObjectId(id), {
        message: 'Invalid ID for Book',
      }),
    userId: string()
      .optional()
      .refine((id) => !id || mongoose.isValidObjectId(id), {
        message: 'Invalid ID for User',
      }),
  }),
};
export const createBorrowSchema = object({ ...payload });
export const updateBorrowSchema = object({
  ...payload,
  ...params,
});
export const deleteBorrowSchema = object({
  ...params,
});

export const getParamBorrowSchema = object({
  ...params,
});
export const getBorrowSchema = object({
  ...filters,
});

export type GetBorrowInput = TypeOf<typeof getBorrowSchema>;
export type GetParamBorrowInput = TypeOf<typeof getParamBorrowSchema>;
export type CreateBorrowInput = TypeOf<typeof createBorrowSchema>;
export type UpdateBorrowInput = TypeOf<typeof updateBorrowSchema>;
export type DeleteBorrowInput = TypeOf<typeof deleteBorrowSchema>;
