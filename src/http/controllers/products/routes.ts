import { Router } from 'express';

import { CreateProductController } from './create-product-controller';
import { DeleteProductController } from './delete-product-controller';
import { ListProductsController } from './list-products-controller';

import { upload } from '@/config/upload';

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();

productsRoutes.post(
  '/',
  upload.single('image'),
  createProductController.handle,
);

productsRoutes.get('/', listProductsController.handle);
productsRoutes.delete('/:productId', deleteProductController.handle);
export { productsRoutes };
