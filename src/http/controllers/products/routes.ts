import { Router } from 'express';

import { CreateProductController } from './create-product-controller';
import { ListProductsController } from './list-products-controller';

import { upload } from '@/config/upload';

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

productsRoutes.post(
  '/',
  upload.single('image'),
  createProductController.handle,
);
productsRoutes.get('/', listProductsController.handle);

export { productsRoutes };
