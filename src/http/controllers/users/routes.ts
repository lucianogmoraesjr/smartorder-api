import { Router } from 'express';

import { CreateUserController } from './create-user-controller';
import { ListUsersController } from './list-users-controller';

import { ensureAdmin } from '@/middlewares/ensure-admin';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.post('/', ensureAdmin, createUserController.handle);
usersRoutes.get('/', ensureAdmin, listUsersController.handle);

export { usersRoutes };
