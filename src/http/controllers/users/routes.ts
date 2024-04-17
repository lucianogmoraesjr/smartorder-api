import { Router } from 'express';

import { CreateUserController } from './create-user-controller';
import { DeleteUserController } from './delete-user-controller';
import { GetUserByIdController } from './get-user-by-id-controller';
import { GetUserProfileController } from './get-user-profile-controller';
import { ListUsersController } from './list-users-controller';
import { UpdateUserController } from './update-user-controller';

import { ensureAdmin } from '@/middlewares/ensure-admin';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const getUserByIdController = new GetUserByIdController();
const getUserProfileController = new GetUserProfileController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/', ensureAdmin, createUserController.handle);
usersRoutes.get('/', ensureAdmin, listUsersController.handle);
usersRoutes.get('/me', getUserProfileController.handle);
usersRoutes.get('/:userId', getUserByIdController.handle);
usersRoutes.put('/:userId', ensureAdmin, updateUserController.handle);
usersRoutes.delete('/:userId', ensureAdmin, deleteUserController.handle);

export { usersRoutes };
