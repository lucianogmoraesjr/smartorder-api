import { Router } from 'express';

import { CreateIngredientController } from './create-ingredient-controller';
import { ListIngredientsController } from './list-ingredients-controller';

const ingredientsRoutes = Router();

const createIngredientController = new CreateIngredientController();
const listIngredientsController = new ListIngredientsController();

ingredientsRoutes.post('/', createIngredientController.handle);
ingredientsRoutes.get('/', listIngredientsController.handle);

export { ingredientsRoutes };
