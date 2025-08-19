import { Router } from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controller/book.controller';
import validateResource from '../middleware/validateResource';
import {
  createBookSchema,
  deleteBookSchema,
  getBookSchema,
  updateBookSchema,
} from '../schema/book.schema';

const router = Router();

// Create Book
router.post('/', validateResource(createBookSchema), createBook);

// Get All Books
router.get('/', getBooks);

// Get Book by ID

router.get('/:id', validateResource(getBookSchema), getBookById);

// Update Book
router.put('/:id', validateResource(updateBookSchema), updateBook);

// Delete Book
router.delete('/:id', validateResource(deleteBookSchema), deleteBook);

export default router;
