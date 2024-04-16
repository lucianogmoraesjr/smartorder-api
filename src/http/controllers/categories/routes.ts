import { Router } from 'express';

import { ListProductsByCategoryController } from '../products/list-products-by-category-controller';

import { CreateCategoryController } from './create-category-controller';
import { DeleteCategoryController } from './delete-category-controller';
import { GetCategoryByIdController } from './get-category-by-id-controller';
import { ListCategoriesController } from './list-categories-controller';
import { UpdateCategoryController } from './update-category-controller';

import { ensureAdmin } from '@/middlewares/ensure-admin';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const getCategoryByIdController = new GetCategoryByIdController();

const listProductsByCategoryController = new ListProductsByCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.get('/:categoryId', getCategoryByIdController.handle);

categoriesRoutes.get(
  '/:categoryId/products',
  listProductsByCategoryController.handle,
);

categoriesRoutes.post('/', ensureAdmin, createCategoryController.handle);

categoriesRoutes.put(
  '/:categoryId',
  ensureAdmin,
  updateCategoryController.handle,
);

categoriesRoutes.delete(
  '/:categoryId',
  ensureAdmin,
  deleteCategoryController.handle,
);

export { categoriesRoutes };
