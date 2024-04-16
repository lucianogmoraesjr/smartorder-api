import { Router } from 'express';

import { CreateUserController } from './create-user-controller';

import { ensureAdmin } from '@/middlewares/ensure-admin';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', ensureAdmin, createUserController.handle);

export { usersRoutes };
