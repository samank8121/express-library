import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schema/user.schema';

const router = Router();

// Create User
router.post('/', validateResource(createUserSchema), createUser);

// Get All Users
router.get('/', getUsers);

// Get User by ID

router.get('/:id', validateResource(getUserSchema), getUserById);

// Update User
router.put('/:id', validateResource(updateUserSchema), updateUser);

// Delete User
router.delete('/:id', validateResource(deleteUserSchema), deleteUser);

export default router;
