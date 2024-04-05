import { Router } from 'express';

import { ListProductsByCategoryController } from '../products/list-products-by-category-controller';

import { CreateCategoryController } from './create-category-controller';
import { DeleteCategoryController } from './delete-category-controller';
import { ListCategoriesController } from './list-categories-controller';
import { UpdateCategoryController } from './update-category-controller';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

const listProductsByCategoryController = new ListProductsByCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.put('/:categoryId', updateCategoryController.handle);
categoriesRoutes.delete('/:categoryId', deleteCategoryController.handle);

categoriesRoutes.get(
  '/:categoryId/products',
  listProductsByCategoryController.handle,
);

export { categoriesRoutes };
