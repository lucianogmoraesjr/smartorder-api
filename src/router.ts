import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from './app/controllers/categories/create-category-controller';
import { ListCategoriesController } from './app/controllers/categories/list-categories-controller';
import { CancelOrderController } from './app/controllers/orders/cancel-order-controller';
import { CreateOrderController } from './app/controllers/orders/create-order-controller';
import { ListOrdersController } from './app/controllers/orders/list-orders-controller';
import { UpdateOrderStatusController } from './app/controllers/orders/update-order-status-controller';
import { CreateProductController } from './app/controllers/products/create-product-controller';
import { ListProductsByCategoryController } from './app/controllers/products/list-products-by-category-controller';
import { ListProductsController } from './app/controllers/products/list-products-controller';

export const router = Router();

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();

const listProductsController = new ListProductsController();
const listProductsByCategoryController = new ListProductsByCategoryController();
const createProductController = new CreateProductController();

const listOrdersController = new ListOrdersController();
const createOrderController = new CreateOrderController();
const updateOrderStatusController = new UpdateOrderStatusController();
const cancelOrderController = new CancelOrderController();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'tmp'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.get('/categories', listCategoriesController.handle);

router.post('/categories', createCategoryController.handle);

router.get('/products', listProductsController.handle);

router.post(
  '/products',
  upload.single('image'),
  createProductController.handle,
);

router.get(
  '/categories/:categoryId/products',
  listProductsByCategoryController.handle,
);

router.get('/orders', listOrdersController.handle);

router.post('/orders', createOrderController.handle);

router.patch('/orders/:orderId', updateOrderStatusController.handle);

router.delete('/orders/:orderId', cancelOrderController.handle);
