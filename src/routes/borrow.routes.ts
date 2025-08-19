import { Router } from 'express';
import {
  getBorrowByFilters,
  createBorrow,
  updateBorrow,
  deleteBorrow,
  getBorrowById,
} from '../controller/borrow.controller';
import validateResource from '../middleware/validateResource';
import {
  createBorrowSchema,
  deleteBorrowSchema,
  getBorrowSchema,
  getParamBorrowSchema,
  updateBorrowSchema,
} from '../schema/borrow.schema';

const router = Router();

// Create Borrow
router.post('/', validateResource(createBorrowSchema), createBorrow);

// Get Borrows by Filter
router.get('/', validateResource(getBorrowSchema), getBorrowByFilters);

// Get Borrows by Id
router.get('/:id', validateResource(getParamBorrowSchema), getBorrowById);

// Update Borrow
router.put('/:id', validateResource(updateBorrowSchema), updateBorrow);

// Delete Borrow
router.delete('/:id', validateResource(deleteBorrowSchema), deleteBorrow);

export default router;
