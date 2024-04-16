import { Router } from 'express';

import { CreateIngredientController } from './create-ingredient-controller';
import { ListIngredientsController } from './list-ingredients-controller';

import { ensureAdmin } from '@/middlewares/ensure-admin';

const ingredientsRoutes = Router();

const createIngredientController = new CreateIngredientController();
const listIngredientsController = new ListIngredientsController();

ingredientsRoutes.get('/', listIngredientsController.handle);
ingredientsRoutes.post('/', ensureAdmin, createIngredientController.handle);

export { ingredientsRoutes };
