import mongoose from 'mongoose';
import { number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    age: number({
      required_error: 'Age is required',
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: 'id of book is required',
    }).refine((id) => id && mongoose.isValidObjectId(id), {
      message: 'Invalid ID for User',
    }),
  }),
};
export const createUserSchema = object({ ...payload });
export const updateUserSchema = object({
  ...payload,
  ...params,
});
export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type GetUserInput = TypeOf<typeof getUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
