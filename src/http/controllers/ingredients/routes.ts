import { Router } from 'express';

import { CreateIngredientController } from './create-ingredient-controller';

const ingredientsRoutes = Router();

const createIngredientsController = new CreateIngredientController();

ingredientsRoutes.post('/', createIngredientsController.handle);

export { ingredientsRoutes };
