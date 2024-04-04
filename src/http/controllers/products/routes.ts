import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { CreateProductController } from './create-product-controller';
import { ListProductsController } from './list-products-controller';

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
