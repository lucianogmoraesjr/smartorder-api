import { Router } from 'express';

import { CreateUserController } from './create-user-controller';
import { DeleteUserController } from './delete-user-controller';
import { GetUserByIdController } from './get-user-by-id-controller';
import { ListUsersController } from './list-users-controller';

import { ensureAdmin } from '@/middlewares/ensure-admin';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const getUserByIdController = new GetUserByIdController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/', ensureAdmin, createUserController.handle);
usersRoutes.get('/', ensureAdmin, listUsersController.handle);
usersRoutes.get('/:userId', getUserByIdController.handle);
usersRoutes.delete('/:userId', deleteUserController.handle);

export { usersRoutes };
