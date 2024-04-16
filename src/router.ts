import { Router } from 'express';

import { categoriesRoutes } from './http/controllers/categories/routes';
import { ingredientsRoutes } from './http/controllers/ingredients/routes';
import { ordersRoutes } from './http/controllers/orders/routes';
import { productsRoutes } from './http/controllers/products/routes';
import { AuthenticateController } from './http/controllers/users/authenticate-controller';
import { usersRoutes } from './http/controllers/users/routes';
import { ensureAuthenticated } from './middlewares/ensure-authenticated';

export const router = Router();

const authenticateController = new AuthenticateController();

router.use('/authenticate', authenticateController.handle);

router.use(ensureAuthenticated);
router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/orders', ordersRoutes);
router.use('/products', productsRoutes);
router.use('/ingredients', ingredientsRoutes);
