import { Router } from 'express';

import { categoriesRoutes } from './http/controllers/categories/routes';
import { ingredientsRoutes } from './http/controllers/ingredients/routes';
import { ordersRoutes } from './http/controllers/orders/routes';
import { productsRoutes } from './http/controllers/products/routes';
import { usersRoutes } from './http/controllers/users/routes';

export const router = Router();

router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/orders', ordersRoutes);
router.use('/products', productsRoutes);
router.use('/ingredients', ingredientsRoutes);
