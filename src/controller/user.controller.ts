import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import User, { IUser } from '../models/user';
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserInput,
  UpdateUserInput,
} from '../schema/user.schema';
import { handleError } from '../utils/error-handler';

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const getUserById: RequestHandler<GetUserInput['params']> = async (
  req,
  res,
  next
) => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const createUser: RequestHandler<
  unknown,
  unknown,
  CreateUserInput['body']
> = async (req, res, next) => {
  try {
    const user: IUser = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    handleError(error, res, next);
  }
};

export const updateUser: RequestHandler<
  UpdateUserInput['params'],
  unknown,
  UpdateUserInput['body']
> = async (req, res, next) => {
  try {
    const user: IUser | null = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    res.json(user);
  } catch (error) {
    handleError(error, res, next);
  }
};

export const deleteUser: RequestHandler<DeleteUserInput['params']> = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    handleError(error, res, next);
  }
};
