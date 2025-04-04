import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Book, { IBook } from '../models/book';
import {
  CreateBookInput,
  DeleteBookInput,
  GetBookInput,
  UpdateBookInput,
} from '../schema/book.schema';
import { handleError } from '../utils/error-handler';

export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const books: IBook[] = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
export const getBookById: RequestHandler<GetBookInput['params']> = async (
  req,
  res,
  next
) => {
  try {
    const book: IBook | null = await Book.findById(req.params.id);
    if (!book) {
      throw createHttpError(404, 'Book not found');
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};
export const createBook: RequestHandler<
  unknown,
  unknown,
  CreateBookInput['body']
> = async (req, res, next) => {
  try {
    const book: IBook = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    handleError(error, res, next);
  }
};

export const updateBook: RequestHandler<
  UpdateBookInput['params'],
  unknown,
  UpdateBookInput['body']
> = async (req, res, next) => {
  try {
    const book: IBook | null = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!book) {
      throw createHttpError(404, 'Book not found');
    }
    res.json(book);
  } catch (error) {
    handleError(error, res, next);
  }
};

export const deleteBook: RequestHandler<DeleteBookInput['params']> = async (
  req,
  res,
  next
) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw createHttpError(404, 'Book not found');
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    handleError(error, res, next);
  }
};
