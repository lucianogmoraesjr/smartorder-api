import { Router } from 'express';

import { CreateProductController } from './create-product-controller';
import { DeleteProductController } from './delete-product-controller';
import { GetProductByIdController } from './get-product-by-id-controller';
import { ListProductsController } from './list-products-controller';
import { UpdateProductController } from './update-product-controller';

import { upload } from '@/config/upload';
import { ensureAdmin } from '@/middlewares/ensure-admin';

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const getProductByIdController = new GetProductByIdController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRoutes.post(
  '/',
  ensureAdmin,
  upload.single('image'),
  createProductController.handle,
);

productsRoutes.put(
  '/:productId',
  ensureAdmin,
  upload.single('image'),
  updateProductController.handle,
);

productsRoutes.delete(
  '/:productId',
  ensureAdmin,
  deleteProductController.handle,
);

productsRoutes.get('/', listProductsController.handle);
productsRoutes.get('/:productId', getProductByIdController.handle);

export { productsRoutes };
