import { Router } from 'express';

import { ListProductsByCategoryController } from '../products/list-products-by-category-controller';

import { CreateCategoryController } from './create-category-controller';
import { ListCategoriesController } from './list-categories-controller';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const listProductsByCategoryController = new ListProductsByCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.get(
  '/:categoryId/products',
  listProductsByCategoryController.handle,
);

export { categoriesRoutes };
