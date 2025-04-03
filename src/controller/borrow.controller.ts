import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserBook, { IUserBook } from '../models/user-book';
import {
  CreateBorrowInput,
  DeleteBorrowInput,
  GetBorrowInput,
  GetParamBorrowInput,
  UpdateBorrowInput,
} from '../schema/borrow.schema';

export const getBorrowByFilters: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetBorrowInput['query']
> = async (req, res, next) => {
  try {
    const { bookId, userId } = req.query;
    const filters: Record<string, any> = {};
    if (bookId) filters.bookId = bookId;
    if (userId) filters.userId = userId;
    const borrows: IUserBook[] = await UserBook.find(filters);

    if (!borrows) {
      throw createHttpError(404, 'No borrow found');
    }
    res.status(200).json(borrows);
  } catch (error) {
    next(error);
  }
};

export const createBorrow: RequestHandler<
  unknown,
  unknown,
  CreateBorrowInput['body']
> = async (req, res, next) => {
  try {
    const borrow: IUserBook = await UserBook.create(req.body);
    res.status(201).json(borrow);
  } catch (error) {
    next(error);
  }
};
export const getBorrowById: RequestHandler<
  GetParamBorrowInput['params']
> = async (req, res, next) => {
  try {
    const borrow: IUserBook | null = await UserBook.findById(req.params.id);
    if (!borrow) {
      throw createHttpError(404, 'No borrow found');
    }
    res.status(200).json(borrow);
  } catch (error) {
    next(error);
  }
};
export const updateBorrow: RequestHandler<
  UpdateBorrowInput['params'],
  unknown,
  UpdateBorrowInput['body']
> = async (req, res, next) => {
  try {
    const borrow: IUserBook | null = await UserBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!borrow) {
      throw createHttpError(404, 'No borrow found');
    }
    res.json(borrow);
  } catch (error) {
    next(error);
  }
};

export const deleteBorrow: RequestHandler<DeleteBorrowInput['params']> = async (
  req,
  res,
  next
) => {
  try {
    await UserBook.findByIdAndDelete(req.params.id);
    res.json({ message: 'Borrow deleted successfully' });
  } catch (error) {
    next(error);
  }
};
